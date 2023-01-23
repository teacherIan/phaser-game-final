export default class LoadingScene extends Phaser.Scene {
  constructor() {
    //Scene reference name
    super('loadGame');
  }

  preload() {
    let pickBackground = Math.random();

    if (pickBackground > 0.5) {
      this.load.image(
        'background',
        '../assets/Desert/backgrounds/desert-backgorund.png'
      );
    } else {
      this.load.image('background', '../assets/River/PNG/background.png');
    }

    this.load.spritesheet('player', '../assets/spritesheets/ship.png', {
      frameWidth: 16,
      frameHeight: 24,
    });

    this.load.spritesheet(
      'shipSmall',
      '../assets/spritesheets/enemy-small.png',
      {
        frameWidth: 16,
        frameHeight: 16,
      }
    );
    this.load.spritesheet(
      'shipMedium',
      '../assets/spritesheets/enemy-medium.png',
      {
        frameWidth: 32,
        frameHeight: 16,
      }
    );
    this.load.spritesheet('shipLarge', '../assets/spritesheets/enemy-big.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    /**
     * Beam
     */

    this.load.spritesheet('beam', '../assets/spritesheets/laser-bolts.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    /**
     * PowerUps
     */

    this.load.spritesheet('powerUps', '../assets/spritesheets/power-up.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('explosion', '../assets/spritesheets/explosion.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    /**
     * Fonts
     */

    this.load.bitmapFont(
      'font',
      '../assets/font/font.png',
      '../assets/font/font.xml'
    );

    /**
     * Try out new Files
     */

    this.load.spritesheet('newBolt', '../assets/NewAssets/boltFixed.png', {
      frameWidth: 48,
      frameHeight: 32,
    });

    this.load.audio(
      'backgroundMusic',
      '../assets/Music/warped-shooting-fx.ogg'
    );
  }

  create() {
    /**
     * Player Animations
     */
    this.anims.create({
      key: 'player_forward',
      frames: this.anims.generateFrameNumbers('player', { frames: [2, 7] }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'player_left',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 6] }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'player_right',
      frames: this.anims.generateFrameNumbers('player', { frames: [3, 8] }),
      frameRate: 20,
      repeat: -1,
    });

    /**
     * Baddie Animations
     */
    this.anims.create({
      key: 'enemySmallAnimation',
      frames: this.anims.generateFrameNumbers('shipSmall'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'enemyMediumAnimation',
      frames: this.anims.generateFrameNumbers('shipMedium'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'enemyLargeAnimation',
      frames: this.anims.generateFrameNumbers('shipLarge'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'beam_animation',
      frames: this.anims.generateFrameNumbers('beam', { frames: [2, 3] }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'ballBeam_animation',
      frames: this.anims.generateFrameNumbers('beam', { frames: [0, 1] }),
      frameRate: 20,
      repeat: -1,
    });

    /**
     * PowerUp Animation
     */

    this.anims.create({
      key: 'powerUpGuns',
      frames: this.anims.generateFrameNumbers('powerUps', {
        frames: [0, 1],
      }),
      frameRate: 5,
      repeat: -1,
    });

    //Explosion Animation
    this.anims.create({
      key: 'explosionAnimation',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 20,
      repeat: 3,
    });

    this.anims.create({
      key: 'newBoltAnimation',
      frames: this.anims.generateFrameNumbers('newBolt'),
      frameRate: 20,
      repeat: -1,
    });

    //Start game after loading assets
    this.scene.start('playGame');
  }
}
