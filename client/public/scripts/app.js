"use strict";

window.addEventListener("load", () => {
  const socket = io();

  socket.on('test', (str) => {
    document.querySelector('pre').innerText = `${str}\n`;
  });
});
