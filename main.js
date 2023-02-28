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

//options

if (localStorage.getItem('bd')) {
  console.log('Is null');
  localStorage.setItem('db', 'default');
}

const optionsSlider = document.querySelector('.options');
const showOptionsButton = document.querySelector('.showOptionsButton');

let showOptions = true;

function optionsHandler() {
  showOptions = !showOptions;

  if (showOptions) {
    optionsSlider.classList.add('show');
    showOptionsButton.innerHTML = 'Show Options';
  } else {
    optionsSlider.classList.remove('show');

    showOptionsButton.innerHTML = 'Hide Options';
  }
}

showOptionsButton.addEventListener('click', optionsHandler);

const collectionInput = document.getElementById('input');
let input = '';

function inputHandler(e) {
  input = e.target.value;
}

collectionInput.addEventListener('input', inputHandler);

const selectCollectionButton = document.getElementById(
  'selectCollectionButton'
);

const collectionName = document.querySelector('.collectionName');
collectionName.innerHTML =
  'Current collection is: ' + localStorage.getItem('db');

function updateCollectionHandler() {
  console.log('From update collection');
  if (input == '') {
    alert('enter a collection name');
  } else {
    localStorage.setItem('db', input);
    collectionName.innerHTML =
      'Current collection is: ' + localStorage.getItem('db');
  }
}

selectCollectionButton.addEventListener('click', updateCollectionHandler);
