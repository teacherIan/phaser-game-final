export default class Beam extends Phaser.GameObjects.Sprite {
  constructor(scene, velocityX, velocityY) {
    var x = scene.player.x;
    var y = scene.player.y - 16;

    super(scene, x, y, 'beam');

    scene.add.existing(this);
    this.setFlipY(true);
    this.play('ballBeam_animation');
    scene.physics.world.enableBody(this);
    this.body.velocity.y = velocityY;
    this.body.velocity.x = velocityX;

    scene.projectiles.add(this);
  }
}
