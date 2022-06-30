'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/socket-to-me');

socket.on('NEW-ORDER', restaurantEvent);

function restaurantEvent(payload) {
  setTimeout(() => {
    console.log(`${payload.customer} has submitted an order for ${payload.restaurant}`);
    socket.emit('OUT-FOR-DELIVERY', payload);
  }, 3000);

  setTimeout(() => {
    console.log(`Delivered ${payload.customer}'s order to ${payload.address}`);
    socket.emit('DELIVERED', payload);
  }, 4000);
}