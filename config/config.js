//config file for entire game
export default {
  type: Phaser.AUTO,
  powerPreference: 'high-performance',

  backgroundColor: 0x000000,

  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
    },
  },

  //Creates a slow runtime
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: 'body',
    width: window.innerWidth,
    height: window.innerHeight,
  },
};
