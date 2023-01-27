import { firebaseDB } from './Firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import '../style.css';

export default class NewHighScore extends Phaser.Scene {
  constructor() {
    super('newHighScore');
  }

  init(data) {
    this.newScore = data.score;
  }

  create() {
    this.inputted = false;
    this.userInputText = '';

    let config = {
      image: 'knighthawks',
      width: 31,
      height: 25,
      chars: Phaser.GameObjects.RetroFont.TEXT_SET6,
      charsPerRow: 10,
      spacing: { x: 1, y: 1 },
    };

    this.cache.bitmapFont.add(
      'knighthawks',
      Phaser.GameObjects.RetroFont.Parse(this, config)
    );

    this.schoolText = this.add
      .bitmapText(
        window.innerWidth / 2,
        window.innerHeight / 4,
        'knighthawks',
        'NEW HIGH SCORE:'
      )
      .setScale(2.5)
      .setOrigin(0.5, 0.5);

    this.userScoreText = this.add
      .bitmapText(
        window.innerWidth / 2,
        window.innerHeight / 4 + 125,
        'knighthawks',
        this.newScore
      )
      .setScale(3)
      .setOrigin(0.5, 0.5);

    this.userInput = this.add
      .bitmapText(
        window.innerWidth / 2,
        window.innerHeight / 2,
        'knighthawks',
        'TYPE NAME'
      )
      .setScale(2.5)
      .setOrigin(0.5, 0.5);

    this.submit = this.add
      .bitmapText(
        window.innerWidth / 2,
        window.innerHeight / 2 + window.innerHeight / 4,
        'knighthawks',
        'SUBMIT'
      )
      .setScale(2.5)
      .setOrigin(0.5, 0.5);

    this.submit.setInteractive({ cursor: 'pointer' });
    this.submit.on('pointerover', () => {
      this.hover = this.tweens.add({
        targets: this.submit,
        scaleX: 2.7,
        scaleY: 2.7,
        ease: 'Linear',
        duration: 1000,
        yoyo: true,
        repeat: -1,
        callbackScope: this,
      });
    });

    this.submit.on('pointerout', () => {
      this.tweens.remove(this.hover);
      this.tweens.add({
        targets: this.submit,
        scaleX: 2.5,
        scaleY: 2.5,
        ease: 'Linear',
        duration: 1000,
        yoyo: false,
        repeat: 0,
        callbackScope: this,
      });
    });

    this.submit.on('pointerdown', () => {
      this.addData();
    });

    this.input.keyboard.on('keydown', (event) => {
      // console.log(event.keyCode);
      if ((event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode == 32) {
        const input = event.key;
        this.userInputText += input;
        this.inputted = true;
      }

      if (event.keyCode == 8) {
        this.userInputText = new String(this.userInputText).slice(0, -1);
      }

      if (event.keyCode == 13) {
        this.addData();
      }
    });
  }

  update() {
    if (this.inputted) {
      this.userInput.text = new String(this.userInputText).toUpperCase();
    }
  }

  async addData() {
    this.submit.destroy();
    try {
      const docRef = await addDoc(collection(firebaseDB, 'high_scores'), {
        name: this.userInput.text,
        highScore: this.newScore,
      });
      this.scene.start('highScores', { id: docRef.id });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
}
