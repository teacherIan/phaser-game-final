export default class Menu extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  preload() {
    this.value = 0;
  }

  create() {
    /**
     * Background
     */
    this.background = this.add.tileSprite(
      0,
      0,
      window.innerWidth,
      window.innerHeight,
      'background'
    );
    this.background.setOrigin(0, 0);
    this.background.setScale(8, 6);
    this.background.setAlpha(0.3);

    this.enemyGroup = this.physics.add.group();

    for (let i = 0; i < 50; i++) {
      let smallEnemy = this.add
        .sprite(
          Math.random() * window.innerWidth,
          Math.random() * -1000,
          'shipSmall'
        )
        .setScale(3)
        .play('enemySmallAnimation')
        .setName('shipSmall')
        .setData('lives', 3)
        .setAlpha(0.7);

      this.enemyGroup.add(smallEnemy);
    }

    for (let i = 0; i < 50; i++) {
      let mediumEnemy = this.add
        .sprite(
          Math.random() * window.innerWidth,
          Math.random() * -1000,
          'shipMedium'
        )
        .setScale(3)
        .play('enemyMediumAnimation')
        .setName('shipMedium')
        .setData('lives', 3)
        .setAlpha(0.7);

      this.enemyGroup.add(mediumEnemy);
    }

    for (let i = 0; i < 50; i++) {
      let largeEnemy = this.add
        .sprite(
          Math.random() * window.innerWidth,
          Math.random() * -1000,
          'shipLarge'
        )
        .setScale(3)
        .play('enemyLargeAnimation')
        .setName('shipLarge')
        .setData('lives', 3)
        .setAlpha(1);

      this.enemyGroup.add(largeEnemy);
    }

    for (let i = 0; i < this.enemyGroup.getChildren().length; i++) {
      let enemySpeed = Math.random() * 60 + 40;
      this.enemyGroup.getChildren()[i].body.setVelocityY(enemySpeed);
    }

    /**
     * TEXT
     */

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
        window.innerHeight / 2 - 350,
        'knighthawks',
        'SSIS PRESENTS'
      )
      .setScale(2.5)
      .setOrigin(0.5, 0.5);

    this.titleText = this.add
      .bitmapText(
        window.innerWidth / 2,
        window.innerHeight / 2 - 150,
        'knighthawks',
        'RETRO SPACE SHOOTER'
      )
      .setScale(2.5)
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
      this.playTextTween = this.tweens.add({
        targets: this.playText,
        scaleX: 3.5,
        scaleY: 3.5,
        ease: 'Linear',
        duration: 1000,
        yoyo: true,
        repeat: -1,
        callbackScope: this,
      });
    });

    this.playText.setInteractive({ cursor: 'pointer' });
    this.playText.on('pointerout', () => {
      this.playTextTween.complete();
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
      this.scene.start('playGame');
    });

    this.highScoresText.setInteractive({ cursor: 'pointer' });
    this.highScoresText.on('pointerover', () => {
      this.highScoreTween = this.tweens.add({
        targets: this.highScoresText,
        scaleX: 3.3,
        scaleY: 3.3,
        ease: 'Linear',
        duration: 1000,
        yoyo: true,
        repeat: -1,
        callbackScope: this,
      });
    });

    this.highScoresText.on('pointerout', () => {
      this.highScoreTween.complete();

      this.tweens.add({
        targets: this.highScoresText,
        scaleX: 3,
        scaleY: 3,
        ease: 'Linear',
        duration: 1500,
        yoyo: false,
        repeat: 0,
        callbackScope: this,
      });
    });

    this.highScoresText.on('pointerdown', () => {
      this.scene.start('highScores');
    });
  }

  update() {
    this.background.tilePositionY -= 0.05;

    for (let i = 0; i < this.enemyGroup.getChildren().length; i++) {
      if (this.enemyGroup.getChildren()[i].y > window.innerHeight + 20) {
        this.resetBaddie(this.enemyGroup.getChildren()[i]);
      }
    }
  }

  resetBaddie(ship) {
    ship.y = -40;
    ship.x = Math.random() * window.innerWidth;
  }
}
