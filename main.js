import './style.css';
import * as Phaser from 'phaser';
import config from './config/config.js';

//Always import any new scenes you create
import LoadingScene from './scenes/LoadingScene.js';
import SceneTwo from './scenes/SceneTwo.js';

import Menu from './scenes/Menu';
import DB from './scenes/DB';
import NewHighScore from './scenes/NewHighScore';

//Creates a new phaser game
class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('loadGame', LoadingScene);
    this.scene.add('playGame', SceneTwo);

    this.scene.add('highScores', DB);
    this.scene.add('menu', Menu);
    this.scene.add('newHighScore', NewHighScore);

    this.scene.start('loadGame');
  }
}

//start game after all assets have been loaded
window.onload = function () {
  window.game = new Game(config);
};
