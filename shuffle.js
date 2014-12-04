var Deck = function () {
  var deck = [];

  var Card = function (suit, rank) {
    return {
      suit: suit,
      rank: rank
    }
  }

  var ranks = ["A",2,3,4,5,6,7,8,9,10,"J","Q","K"];
  var suits = ["Hearts", "Diamonds", "Spades", "Clubs"];

  suits.forEach(function (suit) {
    ranks.forEach(function (rank) {
      deck.push(new Card(suit, rank));
    });
  });

  return deck;
}

var cutDeck = function (deck) {
  var deckLength = deck.length;

  var unifTrans = function () {
    var dist = distribution();
      var rand = Math.random();
      for (var i = 0; i<51; i++) {
          if (rand >= dist[i] && rand <= dist[i+1]){
              return i;
          }
      }
  }

  var distribution = function () {
    var dist = [];

    for (var k = 0; k < deckLength; k++) {
      var chanceCutLeft = binomialDist(deckLength, k);
      var distSumVar = dist[dist.length-1] || 0;
      dist[dist.length] = distSumVar + chanceCutLeft;    
    }
    
    return dist;
  }

  var binomialDist = function (n, k) {
    var diff = n - k;
    var dividend = factorial(n);
    var divisor = factorial(k) * factorial(diff);
    return (dividend/divisor)/Math.pow(2,n);
  }


  var factorial = function (top, bottom) {
    var bottom = bottom || 1;
    var mult = 1;
    while (top >= bottom) {
      mult *= top;
      top--
    }
    return mult;
  }

  return [deck]
}

var deck = new Deck();

var shuffleTimes = 1;

// The Gilbert-Shannon-Reeds shuffle, as cited here: http://statweb.stanford.edu/~cgates/PERSI/papers/bayer92.pdf

// Cards cut into two according to a binomial distribution
// chance k cards cut off is n choose k over 2^2 for 0 <=k<=n


// Then cards are riffled together:
// The likelihood that the next card that falls is from any given side
// is proportional to the size of 
// each respective "heap" of cards
// So, if there are A cards in the left hand and B in the right,
// the probability that the next card will be from the left heap is A/(A+B)

// if cards shuffled together starting with 
// half face up and half face down, the order of up to down 
// will become random