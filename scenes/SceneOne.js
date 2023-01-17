export default class SceneOne extends Phaser.Scene {
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

    this.load.spritesheet('shipOne', '../assets/spritesheets/enemy-small.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    // this.load.spritesheet('shipTwo', '../assets/spritesheets/enemy-small.png', {
    //   frameWidth: 16,
    //   frameHeight: 16,
    // });

    /**
     * Beam
     */

    this.load.spritesheet('beam', '../assets/spritesheets/laser-bolts.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
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
      key: 'baddie_one',
      frames: this.anims.generateFrameNumbers('shipOne'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'baddie_two',
      frames: this.anims.generateFrameNumbers('shipTwo'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'beam_animation',
      frames: this.anims.generateFrameNumbers('beam', { frames: [2, 3] }),
      frameRate: 20,
      repeat: -1,
    });

    this.scene.start('playGame');
  }
}
