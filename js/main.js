var shuffle = require("../shuffle.js");
var template = Handlebars.compile($("#deck").html());


$(document).ready(function (){
  var cards = shuffle.deck;
  var firstShuffle = shuffle.oneShuffle();
  console.log(firstShuffle);
  // $('.main').append(template({firstDeck}));
});