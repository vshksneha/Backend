// eventEmitterModule.js

const EventEmitter = require('events');

// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

// Function to raise an event
function raiseEvent() {
  console.log("Event raised!");
  eventEmitter.emit('customEvent');
}

module.exports = {
  raiseEvent,
  eventEmitter
};
