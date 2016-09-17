"use strict";

window.addEventListener("load", () => {
  const socket = io();

  // const findPersonForm = window.find_person;
  // findPersonForm.addEventListener('submit', function (ev) {
  //   ev.preventDefault();
  //   socket.emit("find person", findPersonForm.querySelector('input').value);
  // });
  //
  // socket.on('find person error', (msg) => {
  //   console.log(msg);
  //   document.querySelector('pre').innerText = msg.error;
  // });
  //
  // socket.on('person found', (msg) => {
  //   console.log(msg);
  //   window.location = `profile/${msg.id}`;
  // });
});
