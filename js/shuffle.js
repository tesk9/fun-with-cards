var Shuffle = function () {

  var Deck = function () {
    var deck = [];

    var Card = function (suit, rank) {
      return {
        suit: suit,
        rank: rank
      };
    };

    var ranks = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    var suits = ["symbols/hearts.png", "symbols/spades.png", "symbols/diamonds.png", "symbols/clubs.png"]; // "French suits" by F l a n k e r - Own work. Licensed under Public domain via Wikimedia Commons - http://commons.wikimedia.org/wiki/File:French_suits.svg#mediaviewer/File:French_suits.svg
    suits.forEach(function (suit) {
      ranks.forEach(function (rank) {
        deck.push(new Card(suit, rank));
      });
    });

    return deck;
  };

  var cutDeck = function (deck) {
    var deckLength = deck.length;

    var getCutIndex = function () {
      var dist = distribution();
        var rand = Math.random();
        for (var i = 0; i<51; i++) {
            if (rand >= dist[i] && rand <= dist[i+1]){
                return i;
            }
        }
    };

    var distribution = function () {
      var dist = [];

      for (var k = 0; k < deckLength; k++) {
        var chanceCutLeft = binomialDist(deckLength, k);
        var distSumVar = dist[dist.length-1] || 0;
        dist[dist.length] = distSumVar + chanceCutLeft;    
      }
      
      return dist;
    };

    var binomialDist = function (n, k) {
      var diff = n - k;
      var dividend = factorial(n);
      var divisor = factorial(k) * factorial(diff);
      return (dividend/divisor)/Math.pow(2,n);
    };


    var factorial = function (top, bottom) {
      var bottom = bottom || 1;
      var mult = 1;
      while (top >= bottom) {
        mult *= top;
        top--
      }
      return mult;
    };

      var deckLeft = deck.splice(0, getCutIndex()).slice();
      var deckRight = deck.slice();
    
    return [deckLeft, deckRight];
  }

  var shuffle = function (deckLeft, deckRight) {

    var fallsLeft = function (leftHeapSize, rightHeapSize) {
      var probFallsLeft = leftHeapSize/(leftHeapSize + rightHeapSize);
      if (Math.random() <= probFallsLeft) {
        return true;
      } else {
        return false;
      }
    };

    var combine = function () {
      var topCard;
      var leftSize = deckLeft.length, rightSize = deckRight.length;
      var deck = [];
      var i = 0, j = 0;
      while (deck.length < 52) {
        if (fallsLeft(leftSize, rightSize)) {
          topCard = deckLeft[i];
          leftSize--;
          i++;
        } else {
          topCard = deckRight[j];
          rightSize--;
          j++;
        }
        deck.push(topCard);
      }
      return deck;
    };


    return combine();
  };
  
  var oneShuffle = function (deck) {
    var deck = deck || new Deck();
    var deckSplit = cutDeck(deck);
    return shuffle(deckSplit[0], deckSplit[1]);
  }

  return {
    oneShuffle: oneShuffle,
    deck: new Deck()
  }
}();


// The Gilbert-Shannon-Reeds shuffle, as cited here: http://statweb.stanford.edu/~cgates/PERSI/papers/bayer92.pdf

// Cards cut into two according to a binomial distribution
// chance k cards cut off is n choose k over 2^2 for 0 <=k<=n

// Then cards are riffled together:
// The likelihood that the next card that falls is from any given side
// is proportional to the size of 
// each respective "heap" of cards
// So, if there are A cards in the left hand and B in the right,
// the probability that the next card will be from the left heap is A/(A+B)


var template = Handlebars.compile($("#deck").html());

var displayCount = function (count) {
  $("#shuffleCount").text("Shuffle Count: " + count);
}

$(document).ready(function (){
  var shuffleCount = 0;
  displayCount(shuffleCount)
  var deck = Shuffle.deck;
  data = {cards: deck};
  $('.main').append(template(data));

  $('#shuffle').on("click", function () {
    deck = Shuffle.oneShuffle(deck);
    data = {cards: deck}
    shuffleCount++;
    displayCount(shuffleCount);
    $('.main').prepend(template(data));
  })

});