'use strict';

const Chance = require('chance');
const chance = new Chance();
const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/socket-to-me');

socket.on('OUT-FOR-DELIVERY', (payload => {
  console.log(`${payload.customer}'s order from ${payload.restaurant} is out for delivery!`);
}));

socket.on('DELIVERED', (payload) => {
  console.log(`${payload.customer}'s order from ${payload.restaurant} has been delivered!`);
});

setInterval(() => {
  let order = {
    restaurant: `${chance.word({ syllables: 4 })} Restaurant`,
    orderId: chance.guid(),
    customer: chance.name(),
    address: `${chance.city()}, ${chance.state()}`,
  };
  console.log(`${order.customer} submitted an order for ${order.restaurant}`);

  const clientRoom = order.restaurant;
  socket.emit('JOIN', clientRoom);

  socket.emit('NEW-ORDER', order);
}, 4000);