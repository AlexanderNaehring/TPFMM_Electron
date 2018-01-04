// renderer process for main window

'use strict';
const electron = require('electron');
const fs = require('fs');

// https://stackoverflow.com/questions/32621988/electron-jquery-is-not-defined
window.$ = window.jQuery = require('jQuery');

// called when document is ready (fully loaded)
$(document).ready(() => {

  /* Define event handler */

  // nav-bar
  $('.nav-bar a').click( function () {
    // make tab active (li)
    $('.nav-bar li').removeClass('active');
    $(this).parent().addClass('active');

    // show content
    $('.content > section:visible').hide();
    $($(this).attr('href')).show();
  });


  /* Setup routine */

  // load icons
  fs.readFile('src/img/icons.svg', 'utf8', (err, data) => {
    $('#icons').html(data);
  });

  // start: activate mods tab
  $('.nav-bar a[href="#mods"]').click();


});
