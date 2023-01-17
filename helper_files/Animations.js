this.anims.create({
  key: 'shipOne_anims',
  frames: this.anims.generateFrameNumbers('shipOne'),
  frameRate: 20,
  repeat: -1,
});

this.anims.create({
  key: 'shipTwo_anims',
  frames: this.anims.generateFrameNumbers('shipTwo'),
  frameRate: 20,
  repeat: -1,
});

this.anims.create({
  key: 'shipThree_anims',
  frames: this.anims.generateFrameNumbers('shipThree'),
  frameRate: 20,
  repeat: -1,
});

this.anims.create({
  key: 'explosion',
  frames: this.anims.generateFrameNumbers('explosion'),
  frameRate: 20,
  repeat: 3,
  hideOnComplete: true,
});

this.anims.create({
  key: 'redPowerUp',
  frames: this.anims.generateFrameNumbers('powerUp', {
    start: 0,
    end: 1,
  }),
  frameRate: 20,
  repeat: -1,
});

this.anims.create({
  key: 'grayPowerUp',
  frames: this.anims.generateFrameNumbers('powerUp', {
    start: 2,
    end: 3,
  }),
  frameRate: 20,
  repeat: -1,
});

this.anims.create({
  key: 'thrust',
  frames: this.anims.generateFrameNumbers('player'),
  frameRate: 20,
  repeat: -1,
});

this.anims.create({
  key: 'beam',
  frames: this.anims.generateFrameNames('beam'),
  frameRate: 20,
  repeat: -1,
});
