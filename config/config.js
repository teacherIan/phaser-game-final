//config file for entire game
export default {
  type: Phaser.AUTO,
  powerPreference: 'high-performance',
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x000000,
  parent: 'body',
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
  },
};
