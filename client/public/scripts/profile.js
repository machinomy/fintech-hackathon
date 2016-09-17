"use strict";

window.addEventListener("load", () => {
  const socket = io();

  socket.on('check loan result', (msg) => {
  });

  eligibility_check_btn.addEventListener('click', (ev) => {
    ev.preventDefault();
    check_modal.setAttribute('style', '');
  });

  eligibility_check.addEventListener('submit', (ev) => {
    ev.preventDefault();
    socket.emit('check loan eligibility', {amount: eligibility_check_amount.value});
  });

  socket.on('check loan result', (msg) => {
    eligibility_result.innerText = msg.result;
  });
});
