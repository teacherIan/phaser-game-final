export default class Menu extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  preload() {
    this.load.image('knighthawks', '../assets/font/knight3.png');
    this.value = 0;
  }

  create() {
    var config = {
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
        window.innerHeight / 2 - 300,
        'knighthawks',
        'SSIS'
      )
      .setScale(3)
      .setOrigin(0.5, 0.5);

    this.titleText = this.add
      .bitmapText(
        window.innerWidth / 2,
        window.innerHeight / 2 - 100,
        'knighthawks',
        'RETRO GAME'
      )
      .setScale(3)
      .setOrigin(0.5, 0.5);

    this.playText = this.add
      .bitmapText(
        window.innerWidth / 2,
        window.innerHeight / 2 + 100,
        'knighthawks',
        'PLAY'
      )
      .setScale(3)
      .setOrigin(0.5, 0.5);

    this.highScoresText = this.add
      .bitmapText(
        window.innerWidth / 2,
        window.innerHeight / 2 + 310,
        'knighthawks',
        'VIEW HIGH SCORES'
      )
      .setScale(3)
      .setOrigin(0.5, 0.5);

    this.playText.setInteractive({ cursor: 'pointer' });
    this.playText.on('pointerover', () => {
      this.tweens.add({
        targets: this.playText,
        scaleX: 3.5,
        scaleY: 3.5,
        ease: 'Linear',
        duration: 1000,
        yoyo: false,
        repeat: 0,
        callbackScope: this,
      });
    });

    this.playText.setInteractive({ cursor: 'pointer' });
    this.playText.on('pointerout', () => {
      this.tweens.add({
        targets: this.playText,
        scaleX: 3,
        scaleY: 3,
        ease: 'Linear',
        duration: 1000,
        yoyo: false,
        repeat: 0,
        callbackScope: this,
      });
    });

    this.playText.on('pointerdown', () => {
      this.scene.start('loadGame');
    });

    this.highScoresText.setInteractive({ cursor: 'pointer' });
    this.highScoresText.on('pointerover', () => {
      console.log('hover high scores');

      this.tweens.add({
        targets: this.highScoresText,
        scaleX: 3.5,
        scaleY: 3.5,
        ease: 'Linear',
        duration: 1000,
        yoyo: false,
        repeat: 0,
        callbackScope: this,
      });
    });

    this.highScoresText.on('pointerout', () => {
      console.log('hover high scores');

      this.tweens.add({
        targets: this.highScoresText,
        scaleX: 3,
        scaleY: 3,
        ease: 'Linear',
        duration: 1000,
        yoyo: false,
        repeat: 0,
        callbackScope: this,
      });
    });
  }

  update() {
    // this.text.text = 'VER ' + this.value.toFixed(2);
    // this.value += 0.01;
  }
}
