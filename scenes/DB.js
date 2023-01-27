import { collection, addDoc, getDocs } from 'firebase/firestore';
import { firebaseDB } from './Firebase.js';
export default class DB extends Phaser.Scene {
  constructor() {
    super('highScores');
  }

  init(data) {
    this.newScore = data.score;
  }

  preload() {
    this.dataAdded = false;

    // this.load.image('knighthawks', '../assets/font/knight3.png');
    // this.load.bitmapFont(
    //   'arcadeFont',
    //   '../assets/font/arcade.png',
    //   '../assets/font/arcade.xml'
    // );

    //test data
  }

  create() {
    // this.addData();

    this.getData('high_scores');

    this.databaseData = [];

    var textConfig = {
      image: 'knighthawks',
      width: 31,
      height: 25,
      chars: Phaser.GameObjects.RetroFont.TEXT_SET6,
      charsPerRow: 10,
      spacing: { x: 1, y: 1 },
    };

    this.cache.bitmapFont.add(
      'knighthawks',
      Phaser.GameObjects.RetroFont.Parse(this, textConfig)
    );

    this.header = this.add
      .bitmapText(window.innerWidth / 2, 200, 'knighthawks', 'HIGH SCORES')
      .setScale(3)
      .setOrigin(0.5, 0.5);

    this.back = this.add
      .bitmapText(300, 50, 'knighthawks', 'RETURN TO MENU')
      .setScale(1)
      .setOrigin(0.5, 0.5);

    this.back.setInteractive({ cursor: 'pointer' });
    this.back.on('pointerover', () => {
      this.tweens.add({
        targets: this.back,
        scaleX: 1.3,
        scaleY: 1.3,
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
      this.scene.start('menu');
    });
  }

  async getData(collectionToQuery) {
    this.dataAdded = false;
    const querySnapshot = await getDocs(
      collection(firebaseDB, collectionToQuery)
    );
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      this.databaseData.push({ name: data.name, score: data.highScore });
    });

    this.updatesScores();
  }

  async addData() {
    try {
      const docRef = await addDoc(collection(firebaseDB, 'high_scores'), {
        name: 'New Test',
        highScore: this.newScore,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  updatesScores() {
    let filteredData = [
      ...this.databaseData.sort((a, b) => {
        return b.score - a.score;
      }),
    ];

    if (
      filteredData.length < 10 ||
      (filteredData[9].score < this.newScore && !this.dataAdded)
    ) {
      // this.addData();
    }

    for (let i = 0; i < filteredData.length; i++) {
      let highScoreName = filteredData[i].name;
      let highScoreAmount = filteredData[i].score;

      let nameText = this.add.bitmapText(
        window.innerWidth / 6,
        window.innerHeight / 3 + 60 * i,
        'arcadeFont',
        `${i + 1} ${highScoreName} `,
        50
      );

      let ageText = this.add.bitmapText(
        window.innerWidth - window.innerWidth / 3,
        window.innerHeight / 3 + 60 * i,
        'arcadeFont',
        highScoreAmount.toString().padStart(8, '0'),
        50
      );
    }
  }
}
