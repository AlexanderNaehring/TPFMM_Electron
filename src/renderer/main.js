// renderer process for main window

'use strict';
const electron = require('electron');
const fs = require('fs');

// https://stackoverflow.com/questions/32621988/electron-jquery-is-not-defined
window.$ = window.jQuery = require('jQuery');

// called when document is ready (fully loaded)
$(document).ready(() => {

  /* Setup routine */

  // load nav-bar
  let navEntries = require('../res/nav-bar.json');
  // using some sort of template... e.g. <template>, or string in js...
  // https://stackoverflow.com/questions/18673860/defining-a-html-template-to-append-using-jquery
  const navTemplate = ({ name, text }) => `
    <li>
      <a href='#${name}'>
        <svg><use xlink:href='#icon-${name}' /></svg>
        <span>${text}</span>
      </a>
    </li>`;
  $('.nav-bar ul').html(navEntries.map(navTemplate).join(''));

  // load icons (async)
  fs.readFile('src/img/icons.svg', 'utf8', (err, data) => {
    $('#icons').html(data);
  });

  // load content (based on navEntries)
  const contentTemplate = ({ name, content }) => `
    <section id='${name}'>${content}</section>`;
  navEntries.forEach( (entry, idx, arr) => {
    // laod content synchronous (wait with execution)
    let content = fs.readFileSync('./src/pages/'+entry.file, 'utf8');
    arr[idx].content = content; // write content to navEntries array
  });
  // write templae (with content) to main page
  $('.content').html(navEntries.map(contentTemplate).join(''));


  // CONTENT LOADED, now can apply handler to all elements
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



  // start: activate mods tab
  $('.nav-bar a[href="#mods"]').click();


});
