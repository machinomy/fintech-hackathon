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
};

window.MagicSocketRouter = MagicSocketRouter;
