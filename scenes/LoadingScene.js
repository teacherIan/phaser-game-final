import backgroundImageOne from '../assets/Desert/backgrounds/desert-backgorund.png';
import backgroundImageTwo from '../assets/River/PNG/background.png';
import playerImage from '../assets/spritesheets/ship.png';
import smallShipImage from '../assets/spritesheets/enemy-small.png';
import mediumShipImage from '../assets/spritesheets/enemy-medium.png';
import largeShipImage from '../assets/spritesheets/enemy-big.png';
import beamImage from '../assets/spritesheets/laser-bolts.png';
import powerUpImage from '../assets/spritesheets/power-up.png';
import explosionImage from '../assets/spritesheets/explosion.png';
import fontPNG from '../assets/font/font.png';
import fontXML from '../assets/font/font.xml';
import newBolt from '../assets/NewAssets/boltFixed.png';
import music from '../assets/Music/warped-shooting-fx.ogg';
import arcadeFontPNG from '../assets/font/arcade.png';
import arcadeFontXML from '../assets/font/arcade.xml';
import knightHawksFont from '../assets/font/knight3.png';

export default class LoadingScene extends Phaser.Scene {
  constructor() {
    //Scene reference name
    super('loadGame');
  }

  preload() {
    let pickBackground = Math.random();

    if (pickBackground > 0.5) {
      this.load.image('background', backgroundImageOne);
    } else {
      this.load.image('background', backgroundImageTwo);
    }

    this.load.spritesheet('player', playerImage, {
      frameWidth: 16,
      frameHeight: 24,
    });

    this.load.spritesheet('shipSmall', smallShipImage, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('shipMedium', mediumShipImage, {
      frameWidth: 32,
      frameHeight: 16,
    });
    this.load.spritesheet('shipLarge', largeShipImage, {
      frameWidth: 32,
      frameHeight: 32,
    });

    /**
     * Beam
     */

    this.load.spritesheet('beam', beamImage, {
      frameWidth: 16,
      frameHeight: 16,
    });

    /**
     * PowerUps
     */

    this.load.spritesheet('powerUps', powerUpImage, {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('explosion', explosionImage, {
      frameWidth: 16,
      frameHeight: 16,
    });

    /**
     * Fonts
     */

    this.load.bitmapFont('font', fontPNG, fontXML);

    this.load.bitmapFont('arcadeFont', arcadeFontPNG, arcadeFontXML);

    this.load.image('knighthawks', knightHawksFont);

    /**
     * Try out new Files
     */

    this.load.spritesheet('newBolt', newBolt, {
      frameWidth: 48,
      frameHeight: 32,
    });

    this.load.audio('backgroundMusic', music);
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

    this.backgroundMusic = this.sound.add('backgroundMusic', {
      loop: true,
    });

    this.backgroundMusic.play();

    //Start game after loading assets
    this.scene.start('menu');
  }
}
