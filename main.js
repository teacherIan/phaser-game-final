import './style.css';
import * as Phaser from 'phaser';
import config from './config/config.js';

//Always import any new scenes you create
import SceneOne from './scenes/SceneOne.js';
import SceneTwo from './scenes/SceneTwo.js';
import SceneThree from './scenes/SceneThree.js';

//Creates a new phaser game
class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('loadGame', SceneOne);
    this.scene.add('playGame', SceneTwo);
    this.scene.add('sceneThree', SceneThree);
    this.scene.start('loadGame');
  }
}

//start game after all assets have been loaded
window.onload = function () {
  window.game = new Game(config);
};
