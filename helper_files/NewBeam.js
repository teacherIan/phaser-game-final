export default class NewBeam extends Phaser.GameObjects.Sprite {
  constructor(scene, velocityX, velocityY, leftBeam) {
    var y = scene.player.y - 50;
    if (leftBeam) {
      var x = scene.player.x - 25;
    } else {
      var x = scene.player.x + 25;
    }

    super(scene, x, y, 'beam');

    scene.add.existing(this);
    this.setFlipY(true);
    this.play('newBoltAnimation');
    scene.physics.world.enableBody(this);
    this.body.velocity.y = velocityY;
    this.body.velocity.x = velocityX;
    this.setAngle(90);
    // this.setScale(0.1);

    scene.projectiles.add(this);
  }
}
