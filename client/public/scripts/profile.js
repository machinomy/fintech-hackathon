"use strict";

window.addEventListener("load", () => {
  const socket = io();
  const sRouter = new MagicSocketRouter(socket);

  /* New Loan socket */
  const newLoanForm = window.new_loan;
  sRouter.listenForm(newLoanForm, [
    ['new loan', (form) => {
      let form2 = $(form).serializeToObject();
      form2.uuid = profile_uuid.getAttribute('data-uuid');
      return form2;
    }],
    ['loan created', (msg) => {
      console.log('Create new loan', msg);
      location.reload();
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

  /* Check Loan socket */
  const newPaymentForm = window.new_payment;
  sRouter.listenForm(newPaymentForm, [
    ['new payment', (form) => {
      let form2 = $(form).serializeToObject();
      form2.uuid = profile_uuid.getAttribute('data-uuid');
      form2.cuuid = new_payment.getAttribute('data-cuuid')
      return form2;
    }],
    ['payment created', (msg) => {
      console.log('Create payment', msg);
      location.reload();
    }],
    ['new payment error', (msg) => {
      console.log(msg);
    }]
  ]);
  
  /* Check Loan socket */
  $('.close-loan').on('click', (ev) => {
    ev.preventDefault();
    let $this = $(ev.currentTarget);
    let creditUuid = $this.closest('li').attr('data-uuid');
    let personUuid = profile_uuid.getAttribute('data-uuid');

    socket.emit('close loan', {personUuid, creditUuid});
    socket.on('close loan result', (_) => {
      location.reload();
    });
  });


  $('.modal-trigger').each((_i, el) => {
    $(el).leanModal({
      ready: function(e) { $(window.new_payment).attr('data-cuuid', $(el).attr('cuuid')); }
    });
  });
});
