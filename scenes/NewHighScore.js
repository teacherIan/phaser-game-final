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
    this.scaleSettings = {
      textScale: window.innerWidth / 700,
    };

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

    this.back = this.add
      .bitmapText(250, 50, 'knighthawks', 'RETURN TO MENU')
      .setScale(0.9)
      .setOrigin(0.5, 0.5);

    this.back.setInteractive({ cursor: 'pointer' });
    this.back.on('pointerover', () => {
      this.tweens.add({
        targets: this.back,
        scaleX: 1.1,
        scaleY: 1.1,
        ease: 'Linear',
        duration: 1000,
        yoyo: false,
        repeat: 0,
        callbackScope: this,
      });
    });

    this.back.setInteractive({ cursor: 'pointer' });
    this.back.on('pointerout', () => {
      this.tweens.add({
        targets: this.back,
        scaleX: 1,
        scaleY: 1,
        ease: 'Linear',
        duration: 1000,
        yoyo: false,
        repeat: 0,
        callbackScope: this,
      });
    });

    this.back.on('pointerdown', () => {
      location.reload();
    });

    this.schoolText = this.add
      .bitmapText(
        window.innerWidth / 2,
        window.innerHeight / 4,
        'knighthawks',
        'NEW HIGH SCORE:'
      )
      .setScale(this.scaleSettings.textScale)
      .setOrigin(0.5, 0.5);

    this.userScoreText = this.add
      .bitmapText(
        window.innerWidth / 2,
        window.innerHeight / 4 + 125,
        'knighthawks',
        this.newScore
      )
      .setScale(this.scaleSettings.textScale)
      .setOrigin(0.5, 0.5);

    this.userInput = this.add
      .bitmapText(
        window.innerWidth / 2,
        window.innerHeight / 2,
        'knighthawks',
        'TYPE NAME'
      )
      .setScale(this.scaleSettings.textScale)
      .setOrigin(0.5, 0.5);

    this.blink = this.tweens.add({
      targets: this.userInput,
      alpha: 0,
      ease: 'Sine.easeInOut',
      duration: 2000,
      yoyo: true,
      repeat: -1,
      callbackScope: this,
    });

    this.submit = this.add
      .bitmapText(
        window.innerWidth / 2,
        window.innerHeight / 2 + window.innerHeight / 4,
        'knighthawks',
        'SUBMIT'
      )
      .setScale(this.scaleSettings.textScale)
      .setOrigin(0.5, 0.5);

    this.submit.setInteractive({ cursor: 'pointer' });
    this.submit.on('pointerover', () => {
      this.hover = this.tweens.add({
        targets: this.submit,
        scaleX: this.scaleSettings.textScale + 0.3,
        scaleY: this.scaleSettings.textScale + 0.3,
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
        scaleX: this.scaleSettings.textScale,
        scaleY: this.scaleSettings.textScale,
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
      const docRef = await addDoc(collection(firebaseDB, 'competition'), {
        name: this.userInput.text,
        highScore: this.newScore,
        house: localStorage.getItem('house'),
        event: localStorage.getItem('event'),
      });
      this.scene.start('highScores', { id: docRef.id });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
}
