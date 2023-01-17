import * as Phaser from 'phaser';
import Beam from '../helper_files/Beam';
import EnemyBeam from '../helper_files/EnemyBeam.js';

export default class SceneTwo extends Phaser.Scene {
  constructor() {
    //Scene reference name
    super('playGame');
  }

  create() {
    this.settings = {
      baddies: 6,
      playerSpeed: 200,
      currentDirection: 'forward',
      score: 0,
      canShoot: true,
    };

    /**
     * Add Background
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

    /**
     * Add Player
     */

    this.player = this.physics.add.sprite(
      window.innerWidth / 2,
      window.innerHeight - 100,
      'player'
    );
    this.player.setScale(4);
    this.player.play('player_forward');
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(13, 16);

    /**
     * Keyboard Controls
     */

    this.keyboardControls = this.input.keyboard.createCursorKeys();

    /**
     * Add Enemies
     */

    this.enemyOne = this.physics.add
      .sprite(window.innerWidth / 2, -10, 'shipOne')
      .setScale(3)
      .play('baddie_one');

    this.enemyOne.setVelocityY(50);

    this.enemyProjectiles = this.add.group();
    this.physics.add.overlap(
      this.player,
      this.enemyProjectiles,
      this.gameOver,
      null,
      this
    );

    this.projectiles = this.add.group();

    /**
     * check for collisions between projectiles and enemies
     */
  }

  update() {
    for (let i = 0; i < this.enemyProjectiles.getChildren().length; i++) {
      if (this.enemyProjectiles.getChildren()[i].y > window.innerHeight) {
        this.enemyProjectiles.getChildren()[i].destroy(true);
      }
    }

    if (this.enemyOne.y > window.innerHeight + 20) {
      this.resetBaddie(this.enemyOne);
    }
    this.enemyFire(this.enemyOne);

    this.background.tilePositionY -= 0.05;
    this.playerManager();
  }

  /**
   * Methods
   */

  playerManager() {
    /**
     * Shoot laser
     */

    if (this.keyboardControls.space.isDown && this.settings.canShoot) {
      let beam = new Beam(this);
      beam.setScale(3);

      /**
       * Only allow one shot each time keyboard is pressed
       */
      this.settings.canShoot = false;
    }
    /**
     * Reset canShot when spacebar is released
     */

    if (this.keyboardControls.space.isUp) {
      this.settings.canShoot = true;
    }

    if (
      this.keyboardControls.down.isDown &&
      this.settings.currentDirection != 'down'
    ) {
      this.player.setVelocityY(200);
      this.player.setVelocityX(0);
      this.player.play('player_forward');
      this.settings.currentDirection = 'down';
    }
    if (
      this.keyboardControls.up.isDown &&
      this.settings.currentDirection != 'up'
    ) {
      this.player.setVelocityY(-200);
      this.player.setVelocityX(0);
      this.player.play('player_forward');
      this.settings.currentDirection = 'up';
    }
    if (
      this.keyboardControls.left.isDown &&
      this.settings.currentDirection != 'left'
    ) {
      this.settings.currentDirection = 'left';
      this.player.setVelocityX(-200);
      this.player.setVelocityY(0);
      this.player.play('player_left');
    }
    if (
      this.keyboardControls.right.isDown &&
      this.settings.currentDirection != 'right'
    ) {
      this.player.setVelocityX(200);
      this.player.setVelocityY(0);
      this.settings.currentDirection = 'right';
      this.player.play('player_right');
    }
  }

  resetBaddie(ship) {
    ship.y = -10;
  }

  enemyFire(ship) {
    let randomNumber = Math.floor(Math.random() * 50);
    if (randomNumber == 20) {
      let beam = new EnemyBeam(this, ship.x, ship.y);
    }
  }

  gameOver() {
    console.log('Game over');
    this.scene.start('sceneThree', { score: this.settings.score });
  }
}
