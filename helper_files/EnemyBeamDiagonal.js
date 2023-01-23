export default class EnemyBeam extends Phaser.GameObjects.Sprite {
  constructor(scene, shipX, shipY) {
    var x = shipX;
    var y = shipY + 20;

    super(scene, x, y, 'beam');

    scene.add.existing(this);

    this.play('ballBeam_animation');
    scene.physics.world.enableBody(this);
    this.toggleFlipY();
    this.body.velocity.y = 250;
    this.body.velocity.x = 250;

    this.setScale(2);

    scene.enemyProjectiles.add(this);
  }

  update() {}
}
