export default class SceneThree extends Phaser.Scene {
  constructor() {
    //Scene reference name
    super('sceneThree');
  }

  init(data) {
    this.score = data.score;
  }

  create() {
    console.log(this.score);
    this.text = this.add.text(
      window.innerWidth / 2,
      window.innerHeight / 2,
      `your score is: ` + this.score
    );

    this.text.setOrigin(0.5, 0.5);
    console.log('Hello from Scene Three');
  }
}
