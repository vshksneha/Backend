// eventListenerModule.js

const { eventEmitter } = require('./eventEmitterModule');

// Listener for the customEvent
eventEmitter.on('customEvent', () => {
  console.log("Event handled in eventListenerModule");
});

