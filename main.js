import './style.css';
import * as Phaser from 'phaser';
import config from './config/config.js';
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

/**
 * Handle Options Tab
 */

//set options to default values if not set

let houseCheck = localStorage.getItem('house');
let eventCheck = localStorage.getItem('event');

if (houseCheck === null) {
  localStorage.setItem('house', 'None');
  houseCheck = localStorage.getItem('house');
}

if (eventCheck === null) {
  localStorage.setItem('event', 'None');
  eventCheck = localStorage.getItem('event');
}

const optionsSlider = document.querySelector('.options');
const showOptionsButton = document.querySelector('.showOptionsButton');

//toggle options view on button click
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

//handle form submission

const form = document.getElementById('form');
const houseName = document.querySelector('.houseName');
const eventName = document.querySelector('.eventName');

houseName.innerHTML = 'House: ' + houseCheck;
eventName.innerHTML = 'Event Name: ' + eventCheck;

function handleFormSubmit(e) {
  e.preventDefault();

  const data = new FormData(form);

  const house = data.get('house');
  const event = data.get('event');

  if (house == null || event == '') {
    console.log('Data incorrect');
    alert('Must fill in both house and event name');
    return;
  }
  localStorage.setItem('house', house);
  localStorage.setItem('event', event);

  houseName.innerHTML = 'House: ' + house;
  eventName.innerHTML = 'Event Name: ' + event;
}

form.addEventListener('submit', handleFormSubmit);
