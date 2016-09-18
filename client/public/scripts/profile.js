"use strict";

window.addEventListener("load", () => {
  const socket = io();
  const sRouter = new MagicSocketRouter(socket);

  /* New Loan socket */
  const newLoanForm = window.new_loan;
  sRouter.listenForm(newLoanForm, [
    ['new loan', (form) => {
      return $(form).serializeToObject();
    }],
    ['loan created', (msg) => {
      console.log('Create new loan', msg);
      cleanForm(new_loan);
      Materialize.toast(`Loan was sexesfully created!`, 4000);
      $(window.new_loan_modal).closeModal();
    }],
    ['new loan error', (msg) => {
      console.log(msg);
      $(window.new_loan_error).text(msg.error);
    }]
  ]);

  /* Check Loan socket */
  const checkLoanForm = window.check_loan;
  sRouter.listenForm(checkLoanForm, [
    ['check loan eligibility', (form) => {
      return $(form).serializeToObject();
    }],
    ['check loan result', (msg) => {
      console.log('Check loan', msg);
      let txt = (msg.result === 'accept') ? 'Можно' : 'Нельзя';
      $('.loan-check-result')
        .removeClass('accept')
        .removeClass('decline')
        .addClass(msg.result)
        .html(txt);
    }],
    ['check loan error', (msg) => {
      console.log(msg);
    }]
  ]);
  //
  // $('.check-loan-btn').addEventListener('click', (ev) => {
  //   ev.preventDefault();
  //   // $('#check_loan_modal').setAttribute('style', '');
  // });

  // eligibility_check.addEventListener('submit', (ev) => {
  //   ev.preventDefault();
  //   socket.emit('check loan eligibility', {amount: eligibility_check_amount.value});
  // });

  // socket.on('check loan result', (msg) => {
  //   eligibility_result.innerText = msg.result;
  // });


  $('.modal-trigger').leanModal();
});
