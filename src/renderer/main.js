// renderer process for main window

'use strict';
const electron = require('electron');

// https://stackoverflow.com/questions/32621988/electron-jquery-is-not-defined
window.$ = window.jQuery = require('jQuery');

// called when document is ready (fully loaded)
$(document).ready(() => {

  // nav-bar
  $('.nav-bar a').click( function () {
    // make tab active (li)
    $('.nav-bar li').removeClass('active');
    $(this).parent().addClass('active');
  });
});
