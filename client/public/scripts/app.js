'use strict';

window.addEventListener('load', () => {
  const socket = io();
  const sRouter = new MagicSocketRouter(socket);

  /* Find Person socket */
  const findPersonForm = window.find_person;
  sRouter.listenForm(findPersonForm, [
    ['find person', (form) => {
      return $('input', form).val();
    }],
    ['person found', (msg) => {
      console.log(msg);
      window.location = `profile/${msg.uuid}`;
    }],
    ['find person error', (msg) => {
      console.log(msg);
      $('pre').text(msg.error);
    }]
  ]);

  /* New Person socket */
  const newPersonForm = window.new_person;
  sRouter.listenForm(newPersonForm, [
    ['new person', (form) => {
      return $(form).serializeToObject();
    }],
    ['person created', (msg) => {
      console.log(msg);
      $(window.new_person_modal).closeModal();
      window.location = '/profile/' + msg.uuid;
    }],
    ['new person error', (msg) => {
      console.log(msg);
      $(window.new_person_error).text(msg.error);
    }]
  ]);

  let picker = $('#birth_date').pickadate({
    selectMonths: true,
    selectYears: 55
  }).pickadate('picker');

  picker.on('set', function (e) {
    this.close();
    $('#birth_place').trigger('focus');
  });

  $('#passport_series').on('keyup', (e) => {
    let v = $(e.currentTarget).val();
    if (v.length > 4) {
      v = v.slice(0, 4);
      $(e.currentTarget).val(v);
    }
    if (v.length === 4) $('#passport_number').trigger('focus');
  });

  $('#passport_number').on('keydown', (e) => {
    let v = $(e.currentTarget).val();
    if (v.length > 5) {
      e.preventDefault();
    }
  });

  $('.modal-trigger').leanModal();

});

