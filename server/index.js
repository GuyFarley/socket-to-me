'use strict';

const { Server } = require('socket.io');
// const { io } = require('socket.io-client');

const PORT = process.env.PORT || 3002;

// instance of a listening Event Server at http://localhost:3002
const server = new Server(PORT);

// create a namespace "off of" our server
// same url, just at an endpoint:  http://localhost:3002/caps
const socketToMe = server.of('/socket-to-me');

// connect socket to caps namespace
socketToMe.on('connection', (socket) => {
  console.log('Socket connected to Socket-to-Me namespace', socket.id);

  // how to join a room
  socket.on('JOIN', (room) => {
    console.log(`You've joined the ${room} room!`);
    socket.join(room);
  });

  // NEW-ORDER
  socket.on('NEW-ORDER', (payload) => {
    logEvent('NEW-ORDER', payload);
    socketToMe.emit('NEW-ORDER', payload);
  });


  // OUT-FOR-DELIVERY
  socket.on('OUT-FOR-DELIVERY', (payload) => {
    logEvent('OUT-FOR-DELIVERY', payload);
    socketToMe.to(payload.restaurant).emit('OUT-FOR-DELIVERY', payload);
  });

  // DELIVERED
  socket.on('DELIVERED', (payload) => {
    logEvent('DELIVERED', payload);
    socketToMe.to(payload.restaurant).emit('DELIVERED', payload);
  });

});

function logEvent(event, payload) {
  let time = new Date();
  console.log('EVENT', { event, time, payload });
}