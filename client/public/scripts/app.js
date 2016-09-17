'use strict';

/* jQuery plugin to serialize form to Obj */
$.fn.serializeToObject = function () {
  let o = {},
      a = this.serializeArray();

  $.each(a, function() {
    if (o[this.name] != undefined) {
      if (!o[this.name].push) o[this.name] = [o[this.name]];
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

/* Socket Router class */
class MagicSocketRouter {
  constructor (socket) {
    this.socket = socket;
  }

  listenForm (form, paramsList = []) {
    const event = paramsList[0][0],
          formParams = paramsList[0][1],
          successEvent = paramsList[1][0],
          onSuccess = paramsList[1][1],
          errorEvent = paramsList[2][0],
          onError = paramsList[2][1];

    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      this.socket.emit(event, formParams(form));
    });

    this.socket.on(successEvent, onSuccess);
    this.socket.on(errorEvent, onError);
  }
}

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
      window.location = `profile/${msg.id}`;
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
      window.new_person.reset();
      $(window.new_person_modal).closeModal();
      Materialize.toast(`Person ${msg.first_name} ${msg.last_name} was created!`, 4000);
    }],
    ['new person error', (msg) => {
      console.log(msg);
      $(window.new_person_error).text(msg.error);
    }]
  ]);
  
  $('.modal-trigger').leanModal();

  let picker = $('#birth_date').pickadate({
    selectMonths: true,
    selectYears: 55
  }).pickadate('picker');

  picker.on('set', function (e) {
    this.close();
    $('#birth_place').trigger('focus');
  });

});

