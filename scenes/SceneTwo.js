import * as Phaser from 'phaser';
import Beam from '../helper_files/Beam';
import EnemyBeam from '../helper_files/EnemyBeam.js';
import EnemyBeamDiagonal from '../helper_files/EnemyBeamDiagonal';
import Explosion from '../helper_files/Explosion';
import NewBeam from '../helper_files/NewBeam.js';

export default class SceneTwo extends Phaser.Scene {
  constructor() {
    //Scene reference name
    super('playGame');
  }

  resize() {
    // console.log('Resized called');
    // this.scaleSettings.textScale = window.innerWidth / 800;
    this.cameras.resize(window.innerWidth, window.innerHeight);
    this.background.setSize(window.innerWidth, window.innerHeight);
  }

  create() {
    /**
     * Settings
     */

    this.scale.on('resize', this.resize, this);

    this.settings = {
      smallEnemy: 1,
      mediumEnemy: 1,
      largeEnemy: 1,
      playerSpeed: 200,
      currentDirection: 'forward',
      score: 0,
      canShoot: true,
      bullets: 10,
      bulletsInTimeout: 0,
      weaponsPowerUp: false,
      playerBeamSpeed: -350,
      playerSpeed: 250,
      lives: 3,
      totalEnemies: 0,
    };

    /**
     * Play Music
     */

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

    this.enemyGroup = this.physics.add.group();
    this.addEnemies();

    /**
     * Deal with player taking damage
     */

    this.enemyProjectiles = this.add.group();
    this.physics.add.overlap(
      this.player,
      this.enemyProjectiles,
      this.playerDamaged,
      null,
      this
    );

    this.projectiles = this.add.group();

    /**
     * check for collisions between projectiles and enemies
     */

    this.physics.add.overlap(
      this.projectiles,
      this.enemyGroup,
      this.enemyHit,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.enemyGroup,
      this.playerDamaged,
      null,
      this
    );

    /**
     * Text
     */

    this.score = this.add.bitmapText(
      50,
      50,
      'font',
      'Score :' + this.settings.score,
      50
    );

    this.bulletText = this.add.bitmapText(
      50,
      90,
      'font',
      'Bullets :' + this.settings.bullets,
      50
    );
    this.livesText = this.add.bitmapText(
      50,
      130,
      'font',
      'Lives :' + this.settings.lives,
      50
    );

    this.gunPowerUps = this.physics.add.group();

    this.addGunPowerUp();

    this.physics.add.overlap(
      this.gunPowerUps,
      this.projectiles,
      this.weaponsPowerUp,
      null,
      this
    );
  }

  update() {
    this.score.setText('Score : ' + this.settings.score);
    this.bulletText.setText('Bullets : ' + this.settings.bullets);
    this.livesText.setText('Lives : ' + this.settings.lives);

    if (this.settings.bullets > 10) {
      this.settings.bullets = 10;
    }
    if (this.settings.bullets + this.settings.bulletsInTimeout < 10) {
      this.settings.bulletsInTimeout += 1;
      setTimeout(() => {
        this.settings.bullets += 1;
        this.settings.bulletsInTimeout -= 1;
      }, 4000);
    }
    /**
     * Enemy Fire
     */

    for (let i = 0; i < this.enemyGroup.getChildren().length; i++) {
      this.enemyFire(this.enemyGroup.getChildren()[i]);
      if (this.enemyGroup.getChildren()[i].name == 'shipLarge') {
        this.enemyDiagonalFire(this.enemyGroup.getChildren()[i]);
      }

      if (this.enemyGroup.getChildren()[i].y > window.innerHeight + 20) {
        this.resetBaddie(this.enemyGroup.getChildren()[i]);
      }
    }

    /**
     * destroy offscreen projectiles
     */

    for (let i = 0; i < this.enemyProjectiles.getChildren().length; i++) {
      if (this.enemyProjectiles.getChildren()[i].y > window.innerHeight) {
        this.enemyProjectiles.getChildren()[i].destroy(true);
      }
    }

    this.background.tilePositionY -= 0.1;
    this.playerManager();
  }

  /**
   * Methods
   */

  playerManager() {
    /**
     * Shoot laser
     */
    if (this.player.active || this.player.opacity < 1) {
      if (this.settings.weaponsPowerUp) {
        if (this.keyboardControls.space.isDown && this.settings.canShoot) {
          let beamLeft = new Beam(
            this,
            -this.settings.playerBeamSpeed,
            this.settings.playerBeamSpeed
          );
          let beamMiddle = new Beam(this, 0, this.settings.playerBeamSpeed);
          let beamRight = new Beam(
            this,
            this.settings.playerBeamSpeed,
            this.settings.playerBeamSpeed
          );
          beamLeft.setScale(2);
          beamMiddle.setScale(3);
          beamRight.setScale(2);

          this.settings.canShoot = false;
        }
      } else if (
        this.keyboardControls.space.isDown &&
        this.settings.canShoot &&
        this.settings.bullets > 0
      ) {
        this.settings.bullets -= 1;
        let leftBeam = new NewBeam(
          this,
          0,
          this.settings.playerBeamSpeed,
          true
        );
        let rightBeam = new NewBeam(
          this,
          0,
          this.settings.playerBeamSpeed,
          false
        );
        rightBeam.setScale(0.7);
        leftBeam.setScale(0.7);

        /**
         * Only allow one shot each time keyboard is pressed
         */
        this.settings.canShoot = false;
      }
      /**
       * Reset canShot when space bar is released
       */

      if (this.keyboardControls.space.isUp) {
        this.settings.canShoot = true;
      }
    }

    if (
      this.keyboardControls.down.isDown &&
      this.settings.currentDirection != 'down'
    ) {
      this.player.setVelocityY(this.settings.playerSpeed);
      this.player.setVelocityX(0);
      this.player.play('player_forward');
      this.settings.currentDirection = 'down';
    }
    if (
      this.keyboardControls.up.isDown &&
      this.settings.currentDirection != 'up'
    ) {
      this.player.setVelocityY(-this.settings.playerSpeed);
      this.player.setVelocityX(0);
      this.player.play('player_forward');
      this.settings.currentDirection = 'up';
    }
    if (
      this.keyboardControls.left.isDown &&
      this.settings.currentDirection != 'left'
    ) {
      this.settings.currentDirection = 'left';
      this.player.setVelocityX(-this.settings.playerSpeed);
      this.player.setVelocityY(0);
      this.player.play('player_left');
    }
    if (
      this.keyboardControls.right.isDown &&
      this.settings.currentDirection != 'right'
    ) {
      this.player.setVelocityX(this.settings.playerSpeed);
      this.player.setVelocityY(0);
      this.settings.currentDirection = 'right';
      this.player.play('player_right');
    }
  }

  resetBaddie(ship) {
    ship.y = -10;
    ship.x = Math.random() * window.innerWidth;
  }

  enemyFire(ship) {
    let randomNumber = Math.floor(Math.random() * 200);
    if (randomNumber == 20) {
      let beam = new EnemyBeam(this, ship.x, ship.y);
    }
  }

  /**
   * Damaged player
   */

  playerDamaged() {
    if (this.player.alpha == 1) {
      console.log(this.settings.lives);
      this.settings.lives -= 1;

      if (this.settings.lives == 0) {
        let explosion = new Explosion(this, this.player.x, this.player.y);
        explosion.on('animationcomplete', () => {
          explosion.destroy();
        });

        explosion.setScale(4);
        this.player.setAlpha(0);

        this.time.addEvent({
          delay: 2000,
          callback: this.gameOver,
          callbackScope: this,
          loop: false,
        });
      }

      this.settings.bullets = 10;
      this.settings.currentDirection = '';
      if (this.player.alpha < 1) {
        return;
      }

      this.player.alpha = 0.5;
      let explosion = new Explosion(this, this.player.x, this.player.y);
      explosion.setScale(5);
      explosion.on('animationcomplete', () => {
        explosion.destroy();
      });
      this.player.disableBody(true, true);
      this.time.addEvent({
        delay: 1000,
        callback: this.resetPlayer,
        callbackScope: this,
        loop: false,
      });
    }
  }

  resetPlayer() {
    this.settings.currentDirection = '';
    this.player.enableBody(
      true,
      window.innerWidth / 2,
      window.innerHeight + 300,
      true,
      true
    );

    let tween = this.tweens.add({
      targets: this.player,
      y: window.innerHeight - 100,
      duration: 500,
      ease: 'power1',
      repeat: 0,
      onComplete: function () {
        setTimeout(() => {
          this.player.alpha = 1;
          this.settings.currentDirection = '';
        }, 2000);
      },
      callbackScope: this,
    });
  }

  gameOver() {
    console.log('Game over');
    this.scene.start('newHighScore', { score: this.settings.score });
  }

  enemyHit(projectile, enemy) {
    console.log(this.settings.totalEnemies);
    this.settings.totalEnemies -= 1;

    if (this.settings.totalEnemies == 0) {
      console.log('next Level');
      this.addEnemies();
    }

    let explosion = new Explosion(this, enemy.x, enemy.y);
    explosion.setScale(4);
    explosion.on('animationcomplete', () => {
      explosion.destroy();
    });
    projectile.destroy();

    if (enemy.getData('lives') >= 0) {
      enemy.x = Math.random() * window.innerWidth;
      enemy.y = -10;
    } else {
      enemy.destroy();
    }

    this.settings.score += 10;

    /**
     * Update enemy lives
     */
    enemy.setData('lives', enemy.getData('lives') - 1);
  }

  enemyDiagonalFire(ship) {
    let random = Math.floor(Math.random() * 300);
    if (random == 50) {
      let beam = new EnemyBeamDiagonal(this, ship.x, ship.y);
      let beamRight = new EnemyBeamDiagonal(this, ship.x, ship.y);
      beamRight.body.setVelocityX(-250);
    }
  }

  weaponsPowerUp(powerUp, projectile) {
    powerUp.destroy();
    projectile.destroy();

    this.settings.weaponsPowerUp = true;
    this.time.addEvent({
      delay: 10000,
      callback: () => (this.settings.weaponsPowerUp = false),
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 20000,
      callback: this.addGunPowerUp,
      callbackScope: this,
      loop: false,
    });
  }

  addGunPowerUp() {
    let powerUpGuns = this.physics.add.sprite(
      Math.random() * window.innerWidth,
      (Math.random() * window.innerHeight) / 2,
      'powerUps'
    );

    this.gunPowerUps.add(powerUpGuns);
    powerUpGuns.setBounce(1);
    powerUpGuns.body.setCollideWorldBounds(true);
    powerUpGuns.body.setVelocityX(100);
    powerUpGuns.body.setVelocityY(100);
    powerUpGuns.setScale(3);
    powerUpGuns.play('powerUpGuns');
  }

  addEnemies() {
    for (let i = 0; i < this.settings.smallEnemy; i++) {
      let smallEnemy = this.add
        .sprite(Math.random() * window.innerWidth, -50, 'shipSmall')
        .setScale(3)
        .play('enemySmallAnimation')
        .setName('shipSmall')
        .setData('lives', 3);

      this.enemyGroup.add(smallEnemy);
    }

    for (let i = 0; i < this.settings.mediumEnemy; i++) {
      let mediumEnemy = this.add
        .sprite(Math.random() * window.innerWidth, -50, 'shipMedium')
        .setScale(3)
        .play('enemyMediumAnimation')
        .setName('shipMedium')
        .setData('lives', 3);

      this.enemyGroup.add(mediumEnemy);
    }

    for (let i = 0; i < this.settings.largeEnemy; i++) {
      let largeEnemy = this.add
        .sprite(Math.random() * window.innerWidth, -50, 'shipLarge')
        .setScale(3)
        .play('enemyLargeAnimation')
        .setName('shipLarge')
        .setData('lives', 3);

      this.enemyGroup.add(largeEnemy);
    }

    this.settings.totalEnemies =
      this.settings.smallEnemy * 4 +
      this.settings.mediumEnemy * 4 +
      this.settings.largeEnemy * 4;

    //prepare settings for next level
    this.settings.smallEnemy += 1;
    this.settings.mediumEnemy += 1;
    this.settings.largeEnemy += 1;

    /**
     * Set EnemyShip Speed
     */

    for (let i = 0; i < this.enemyGroup.getChildren().length; i++) {
      let enemySpeed = Math.random() * 60 + 60;
      this.enemyGroup.getChildren()[i].body.setVelocityY(enemySpeed);
    }
  }
}
