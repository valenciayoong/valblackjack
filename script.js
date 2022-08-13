/* 
1. There will be only two players. One human and one computer (for the Base solution).

2. The computer will always be the dealer.

3. Each player gets dealt two cards to start.

4. The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).

5. The dealer has to hit if their hand is below 17.

6. Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.

7. The player who is closer to, but not above 21 wins the hand.

*/

/*
// Access the rank attribute
playingCard.rank;
// Access the suit attribute
playingCard.suit;
// Access the name attribute
playingCard.name;
*/

var cardDeck = [];
var playerHand = [];
var dealerHand = [];

// Full deck of cards
var createDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Function that shuffles a deck, used by createNewDeck function
var shuffleDeck = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }
  return cards;
};

// Function that creates and shuffles a deck
var createNewDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

// Displays cards drawn by player and dealer (name and suit)
var displayHands = function (playerHand, dealerHand) {
  var index = 0;
  while (index < playerHand.length) {
    var playerMessage = `${playerHand[index].name} of ${playerHand[index].suit}`;
    index += 1;
  }
  var index = 0;
  while (index < dealerHand.length) {
    var dealerMessage = `${dealerHand[index].name} of ${dealerHand[index].suit}`;
    index += 1;
  }
  return `Player hand: ${playerMessage} <br> Dealer hand: ${dealerMessage}`;
};

// Calculate hand values
var calcHandValues = function (hand) {
  var totalHandValue = 0;
  var index = 0;

  while (index < hand.length) {
    var currentCard = hand[index];
    if (
      currentCard.name == "king" ||
      currentCard.name == "queen" ||
      currentCard.name == "jack"
    ) {
      totalHandValue = totalHandValue + 10;
    } else if (currentCard.name == "ace") {
      totalHandValue = totalHandValue + 11;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index += 1;
  }
  return totalHandValue;
};

var main = function (input) {
  var shuffledDeck = createNewDeck();

  // Draw 2 cards from the top of the deck
  playerHand.push(shuffledDeck.pop());
  dealerHand.push(shuffledDeck.pop());
  playerHand.push(shuffledDeck.pop());
  dealerHand.push(shuffledDeck.pop());

  // Construct an output string to communicate which cards were drawn
  // var myOutputValue = `Computer had ${computerCard1.name} of ${computerCard1.suit} and ${computerCard2.name} of ${computerCard2.suit}. <br> Player had ${playerCard1.name} of ${playerCard1.suit} and ${playerCard2.name} of ${playerCard2.suit}. </br>`;

  var playerHandValue = calcHandValues(playerHand);

  return `${playerHandValue}`;

  // Check for black jack

  /*
  // Compare computer and player cards by rank attribute
  // If computer card rank is greater than player card rank, computer wins
  if (computerCard.rank > playerCard.rank) {
    // Add conditional-dependent text to the output string
    myOutputValue = myOutputValue + "Computer wins.";
    // Else if computer card rank is less than player card rank, player wins
  } else if (computerCard.rank < playerCard.rank) {
    myOutputValue = myOutputValue + "Player wins!";
    // Otherwise (i.e. ranks are equal), it's a tie
  } else {
    myOutputValue = myOutputValue + "It's a tie.";
  } */

  // Return the fully-constructed output string
  return myOutputValue;
};
