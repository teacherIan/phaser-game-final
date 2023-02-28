import { collection, addDoc, getDocs } from 'firebase/firestore';
import { firebaseDB } from './Firebase.js';
export default class DB extends Phaser.Scene {
  constructor() {
    super('highScores');
  }

  init(data) {
    // this.newScore = data.score;
    this.currentID = data.id;
  }

  preload() {
    this.dataAdded = false;
  }

  create() {
    this.scaleSettings = {
      textScale: window.innerWidth / 800,
    };

    this.getData(localStorage.getItem('db'));

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
      .bitmapText(window.innerWidth / 2, 150, 'knighthawks', 'HIGH SCORES')
      .setScale(this.scaleSettings.textScale)
      .setOrigin(0.5, 0.5);

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
  }

  async getData(collectionToQuery) {
    this.dataAdded = false;
    const querySnapshot = await getDocs(
      collection(firebaseDB, collectionToQuery)
    );
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      this.databaseData.push({
        name: data.name,
        score: data.highScore,
        id: doc.id,
      });
    });

    this.updatesScores();
  }

  async addData() {
    try {
      const docRef = await addDoc(
        collection(firebaseDB, localStorage.getItem('db')),
        {
          name: 'New Test',
          highScore: this.newScore,
        }
      );
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

    for (let i = 0; i < 10; i++) {
      let highScoreName = filteredData[i].name;
      let highScoreAmount = filteredData[i].score;
      let highScoreID = filteredData[i].id;

      let nameText = this.add.bitmapText(
        40,
        window.innerHeight / 4 + 70 * i,
        'arcadeFont',
        `${(i + 1).toString().padStart(2, ' ')} ${highScoreName} `,
        this.scaleSettings.textScale * 25
      );

      let scoreText = this.add.bitmapText(
        window.innerWidth - window.innerWidth / 3,
        window.innerHeight / 4 + 70 * i,
        'arcadeFont',
        highScoreAmount.toString().padStart(8, '0'),
        this.scaleSettings.textScale * 25
      );

      if (highScoreID == this.currentID) {
        nameText.setTint(0xc11c22);
        scoreText.setTint(0xc11c22);
      }
    }
  }
}
