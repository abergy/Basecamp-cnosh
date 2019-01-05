jsonData = 'cnosh.json';

function load() {
  console.log('CNosh JSON loaded');
  var request = new XMLHttpRequest();
  function transferComplete() {
	var data = JSON.parse(this.responseText);
	build_feedingtimes(data);
  };
  function transferFailed(evt) {
    console.log(
        'Looks like there was a problem. Status Code: ' + request.status);
    addElementToDom(
        'h1', 'error', 'Could not load configuration: ' + request.status,
        {'style': 'color:red'});
    return;
  };
  request.addEventListener('load', transferComplete);
  request.addEventListener('error', transferFailed);
  request.open('GET', jsonData);
  request.send();
};

function build_feedingtimes(data) {
  console.log("build_feedingtimes entered");
	let feedingtimes = document.getElementById("form");
  // form
  let form = document.createElement('form');
  form.setAttribute('action', '#');
  form.setAttribute('onsubmit', 'collect_feedingtimes()');

  for (let i = 0; i < 4; i++) {
    // row
    let row = document.createElement('div');
    row.setAttribute('class', 'row');
    // col-15
    let col_15 = document.createElement('div');
    col_15.setAttribute('class', 'col-15');
    // feedingtime label
    let time_label = document.createElement('label');
    time_label.setAttribute('for', 'feeding_time_' + (i + 1));
    time_label.innerHTML = 'Futterzeit ' + (i + 1);
    // col-85
    let col_85 = document.createElement('div');
    col_85.setAttribute('class', 'col-85');
    // hour
    let hour_label = document.createElement('label');
    hour_label.setAttribute('for', 'feeding_time_' + (i + 1));
    hour_label.innerHTML = 'Stunde';

    let button_dec_h = document.createElement('div');
    button_dec_h.setAttribute('class', 'value-button');
    button_dec_h.setAttribute('id', 'decrease');
    button_dec_h.setAttribute(
        'onclick', 'decreaseValue(\'feeding_time_' + (i + 1) + '_h\')');
    button_dec_h.setAttribute('value', 'Decrease Value');

    let input_h = document.createElement('input');
    input_h.setAttribute('type', 'number');
    input_h.setAttribute('class', 'number');
    input_h.setAttribute('id', 'feeding_time_' + (i + 1) + '_h');
    input_h.setAttribute('value', data.feedingtimes['time_' + (i + 1) + '_h']);

    let button_inc_h = document.createElement('div');
    button_inc_h.setAttribute('class', 'value-button');
    button_inc_h.setAttribute('id', 'increase');
    button_inc_h.setAttribute(
        'onclick', 'increaseValue(\'feeding_time_' + (i + 1) + '_h\')');
    button_inc_h.setAttribute('value', 'Increase Value');
    // minute
    let minute_label = document.createElement('label');
    minute_label.setAttribute('for', 'feeding_time_' + (i + 1));
    minute_label.innerHTML = 'Minute';

    let button_dec_m = document.createElement('div');
    button_dec_m.setAttribute('class', 'value-button');
    button_dec_m.setAttribute('id', 'decrease');
    button_dec_m.setAttribute(
        'onclick', 'decreaseValue(\'feeding_time_' + (i + 1) + '_m\')');
    button_dec_m.setAttribute('value', 'Decrease Value');

    let input_m = document.createElement('input');
    input_m.setAttribute('type', 'number');
    input_m.setAttribute('class', 'number');
    input_m.setAttribute('id', 'feeding_time_' + (i + 1) + '_m');
    input_m.setAttribute('value', data.feedingtimes['time_' + (i + 1) + '_m']);

    let button_inc_m = document.createElement('div');
    button_inc_m.setAttribute('class', 'value-button');
    button_inc_m.setAttribute('id', 'increase');
    button_inc_m.setAttribute(
        'onclick', 'increaseValue(\'feeding_time_' + (i + 1) + '_m\')');
    button_inc_m.setAttribute('value', 'Increase Value');

    col_85.appendChild(hour_label);
    col_85.appendChild(button_dec_h);
    col_85.appendChild(input_h);
    col_85.appendChild(button_inc_h);
    col_85.appendChild(minute_label);
    col_85.appendChild(button_dec_m);
    col_85.appendChild(input_m);
    col_85.appendChild(button_inc_m);

    col_15.appendChild(time_label);

    row.appendChild(col_15);
    row.appendChild(col_85);

    form.appendChild(row);
  }
  // row
  let row_amount = document.createElement('div');
  row_amount.setAttribute('class', 'row');
  // col-15
  let col_15 = document.createElement('div');
  col_15.setAttribute('class', 'col-15');
  // amount label
  let amount_label = document.createElement('label');
  amount_label.setAttribute('for', 'amount');
  amount_label.innerHTML = 'Portionsgröße';
  // col-85
  let col_85 = document.createElement('div');
  col_85.setAttribute('class', 'col-85');

  let button_dec_amount = document.createElement('div');
  button_dec_amount.setAttribute('class', 'value-button');
  button_dec_amount.setAttribute('id', 'decrease');
  button_dec_amount.setAttribute('onclick', 'decreaseValue(\'amount\')');
  button_dec_amount.setAttribute('value', 'Decrease Value');

  let input_amount = document.createElement('input');
  input_amount.setAttribute('type', 'number');
  input_amount.setAttribute('class', 'number');
  input_amount.setAttribute('id', 'amount');
  input_amount.setAttribute('value', data.feedingtimes['time_amount_size']);

  let button_inc_amount = document.createElement('div');
  button_inc_amount.setAttribute('class', 'value-button');
  button_inc_amount.setAttribute('id', 'increase');
  button_inc_amount.setAttribute('onclick', 'increaseValue(\'amount\')');
  button_inc_amount.setAttribute('value', 'Increase Value');
  col_85.appendChild(button_dec_amount);
  col_85.appendChild(input_amount); 
  col_85.appendChild(button_inc_amount);
  col_15.appendChild(amount_label);
  
  row_amount.appendChild(col_15);
  row_amount.appendChild(col_85);

  form.appendChild(row_amount);

  // row
  let row_input = document.createElement('div');
  row_input.setAttribute('class', 'row');
  let input_save = document.createElement('input');
  input_save.setAttribute('type', 'submit');
  input_save.setAttribute('value', 'Speichern');
  row_input.appendChild(input_save);

  form.appendChild(row_input);

  feedingtimes.appendChild(form);
}

function collect_feedingtimes() {
  console.log('Button pressed')
}

window.onload = function() {
  load();
}