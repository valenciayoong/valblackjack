/* 
This is a simple game of blackjack.
Rules:
1. There will be only two players. One human and one computer (for the Base solution).
2. The computer will always be the dealer.
3. Each player gets dealt two cards to start.
4. The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
5. The dealer has to hit if their hand is below 17.
6. Each player's score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
7. The player who is closer to, but not above 21, wins the hand.
*/

// Declare game modes
var inputUserName = "input username";
var drawCards = "draw cards";
var showResults = "show results";
var hitOrStand = "hit or stand";
var gameResults = "game results";
var gameMode = inputUserName;

var cardDeck = [];
var playerHand = [];
var dealerHand = [];
var dealerHandValue = 0;
var playerHandValue = 0;

// Function that creates a deck of cards, used by createNewDeck function
var createDeck = [
  {
    name: "ace",
    suit: "hearts",
    rank: 1,
  },
  {
    name: "2",
    suit: "hearts",
    rank: 2,
  },
  {
    name: "3",
    suit: "hearts",
    rank: 3,
  },
  {
    name: "4",
    suit: "hearts",
    rank: 4,
  },
  {
    name: "5",
    suit: "hearts",
    rank: 5,
  },
  {
    name: "6",
    suit: "hearts",
    rank: 6,
  },
  {
    name: "7",
    suit: "hearts",
    rank: 7,
  },
  {
    name: "8",
    suit: "hearts",
    rank: 8,
  },
  {
    name: "9",
    suit: "hearts",
    rank: 9,
  },
  {
    name: "10",
    suit: "hearts",
    rank: 10,
  },
  {
    name: "jack",
    suit: "hearts",
    rank: 11,
  },
  {
    name: "queen",
    suit: "hearts",
    rank: 12,
  },
  {
    name: "king",
    suit: "hearts",
    rank: 13,
  },
  {
    name: "ace",
    suit: "diamonds",
    rank: 1,
  },
  {
    name: "2",
    suit: "diamonds",
    rank: 2,
  },
  {
    name: "3",
    suit: "diamonds",
    rank: 3,
  },
  {
    name: "4",
    suit: "diamonds",
    rank: 4,
  },
  {
    name: "5",
    suit: "diamonds",
    rank: 5,
  },
  {
    name: "6",
    suit: "diamonds",
    rank: 6,
  },
  {
    name: "7",
    suit: "diamonds",
    rank: 7,
  },
  {
    name: "8",
    suit: "diamonds",
    rank: 8,
  },
  {
    name: "9",
    suit: "diamonds",
    rank: 9,
  },
  {
    name: "10",
    suit: "diamonds",
    rank: 10,
  },
  {
    name: "jack",
    suit: "diamonds",
    rank: 11,
  },
  {
    name: "queen",
    suit: "diamonds",
    rank: 12,
  },
  {
    name: "king",
    suit: "diamonds",
    rank: 13,
  },
  {
    name: "ace",
    suit: "clubs",
    rank: 1,
  },
  {
    name: "2",
    suit: "clubs",
    rank: 2,
  },
  {
    name: "3",
    suit: "clubs",
    rank: 3,
  },
  {
    name: "4",
    suit: "clubs",
    rank: 4,
  },
  {
    name: "5",
    suit: "clubs",
    rank: 5,
  },
  {
    name: "6",
    suit: "clubs",
    rank: 6,
  },
  {
    name: "7",
    suit: "clubs",
    rank: 7,
  },
  {
    name: "8",
    suit: "clubs",
    rank: 8,
  },
  {
    name: "9",
    suit: "clubs",
    rank: 9,
  },
  {
    name: "10",
    suit: "clubs",
    rank: 10,
  },
  {
    name: "jack",
    suit: "clubs",
    rank: 11,
  },
  {
    name: "queen",
    suit: "clubs",
    rank: 12,
  },
  {
    name: "king",
    suit: "clubs",
    rank: 13,
  },
  {
    name: "ace",
    suit: "spades",
    rank: 1,
  },
  {
    name: "2",
    suit: "spades",
    rank: 2,
  },
  {
    name: "3",
    suit: "spades",
    rank: 3,
  },
  {
    name: "4",
    suit: "spades",
    rank: 4,
  },
  {
    name: "5",
    suit: "spades",
    rank: 5,
  },
  {
    name: "6",
    suit: "spades",
    rank: 6,
  },
  {
    name: "7",
    suit: "spades",
    rank: 7,
  },
  {
    name: "8",
    suit: "spades",
    rank: 8,
  },
  {
    name: "9",
    suit: "spades",
    rank: 9,
  },
  {
    name: "10",
    suit: "spades",
    rank: 10,
  },
  {
    name: "jack",
    suit: "spades",
    rank: 11,
  },
  {
    name: "queen",
    suit: "spades",
    rank: 12,
  },
  {
    name: "king",
    suit: "spades",
    rank: 13,
  },
];

// Function that generates a random number, used by shuffle deck function
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
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
  var shuffledDeck = shuffleDeck(createDeck);
  return shuffledDeck;
};

// Function that displays cards drawn by player and dealer (name and suit)
var displayHands = function (playerHand, dealerHand) {
  var playerHandValue = calcHandValues(playerHand);
  var dealerHandValue = calcHandValues(dealerHand);

  var playerMessage = `<u><b>Your hand (${playerHandValue}):</b></u><br>`;
  var index = 0;
  while (index < playerHand.length) {
    playerMessage =
      playerMessage +
      `${playerHand[index].name} of ${playerHand[index].suit}<br>`;
    index += 1;
  }
  var index = 0;
  var dealerMessage = `<u><b>Dealer hand (${dealerHandValue}):</b></u><br>`;
  while (index < dealerHand.length) {
    dealerMessage =
      dealerMessage +
      `${dealerHand[index].name} of ${dealerHand[index].suit}<br>`;
    index += 1;
  }
  return `${playerMessage} <br> ${dealerMessage}`;
};

// Function that calculate hand values
var calcHandValues = function (hand) {
  var totalHandValue = 0;
  var aceCounter = 0;
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
      aceCounter += 1;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index += 1;
  }

  index = 0;
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index += 1;
  }

  return totalHandValue;
};

// Function that checks first two cards for blackjack win
var checkBlackJack = function (hand) {
  var firstCard = hand[0];
  var secondCard = hand[1];

  // blackjack when ace (11) + 10/king/queen/jack (10)
  if (
    (firstCard.name == "ace" && secondCard.rank >= 10) ||
    (secondCard.name == "ace" && firstCard.rank >= 10)
  ) {
    var isBlackJack = true;
  } else isBlackJack = false;

  return isBlackJack;
};

// Function that draws for dealer if needed
var dealerDrawsIfNeeded = function (dealerHand) {

  var dealerHandValue = calcHandValues(dealerHand); 
  
  while (dealerHandValue < 17) {
    dealerHand.push(shuffledDeck.pop());
    dealerHandValue = calcHandValues(dealerHand); 
  }
  return dealerHandValue;
};

// Generate shuffled deck for new game
var shuffledDeck = createNewDeck();

var main = function (input) {
  var myOutputValue = ``;

  // Mode 1: Input username
  if (gameMode == inputUserName) {
    myOutputValue = `Hi <b>${input}</b>! Hope you're ready for a round of blackjack!<br><br> Click <b>"Submit"</b> to draw your cards.`;
    // Update game mode to Mode 2: Draw cards
    gameMode = drawCards;
    return myOutputValue;
  }

  // Mode 2: Draw cards
  if (gameMode == drawCards) {
    // Draw cards from the top of the deck (2 each for player and dealer)
    playerHand.push(shuffledDeck.pop());
    dealerHand.push(shuffledDeck.pop());
    playerHand.push(shuffledDeck.pop());
    dealerHand.push(shuffledDeck.pop());

    // Let player know their cards have been drawn
    myOutputValue = `Your cards have been drawn!<br><br> Click <b>"Submit"</b> to see your results.`;

    // Update game mode to Mode 3: Show results
    gameMode = showResults;
    return myOutputValue;
  }

  // Mode 3: Check for Blackjacks; Show results
  if (gameMode == showResults) {
    var playerHasBlackJack = checkBlackJack(playerHand);
    var dealerHasBlackJack = checkBlackJack(dealerHand);

    if (playerHasBlackJack == true || dealerHasBlackJack == true) {
      outputMsg = displayHands(playerHand, dealerHand);

      // 3 scenarios regarding Blackjack wins

      if (playerHasBlackJack == true && dealerHasBlackJack == true) {
        outputMsg = outputMsg + "<br>It's a blackjack tie!";
      } else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        outputMsg = outputMsg + `<br>Congrats! You win by blackjack! 🥳`;
        gameMode = gameResults;
      } else
        outputMsg =
          outputMsg +
          `<br>Dealer wins by blackjack.<br><br> Better luck next time!`;
      gameMode = gameResults;
      return outputMsg;
    } else {
      outputMsg = `${displayHands(
        playerHand,
        dealerHand
      )} <br>There are no blackjacks. <br><br> To continue, please input <b>"hit"</b> or <b>"stand"</b>.`;
      gameMode = hitOrStand;
      return outputMsg;
    }
  }

  // Mode 4: Hit or Stand
  if (gameMode == hitOrStand) {
    // Input validation (either "hit" or "stand")
    if (!(input.toLowerCase() == "hit" || input.toLowerCase() == "stand")) {
      outputMsg = `Please input either <b>"hit"</b> or <b>"stand"</b>. <br><br> ${displayHands(
        playerHand,
        dealerHand
      )}`;
      return outputMsg;
    }

    // If player enters "Hit"
    if (input.toLowerCase() == "hit") {
      // Draw card and let player know it has been drawn
      playerHand.push(shuffledDeck.pop());
      outputMsg = "You draw another card.<br><br>";

      // Calculate new total hand value
      var playerHandValue = calcHandValues(playerHand);

      // 2 scenarios: //

      // Scenario 1: Player hand value is < 21. Player continues to "hit" or "stand".
      if (playerHandValue < 21) {
        outputMsg =
          outputMsg +
          displayHands(playerHand, dealerHand) +
          '<br>Please input <b>"hit"</b> or <b>"stand"</b>.<br><br>';
      }

      // Scenario 2: Player hand value is >= 21. Player cannot "hit" any more. Game ends.
      // Tie if player and dealer both got 21 or both busted
      // Else, the person who gets 21 wins.

      if (playerHandValue >= 21) {
        // Calculate dealer hand value and draws if < 17
        var dealerHandValue = calcHandValues(dealerHand);
        var dealerHandValue = dealerDrawsIfNeeded(dealerHand);
        outputMsg = outputMsg + `${displayHands(playerHand, dealerHand)}`;

        // Tie if player value is == 21 and dealer value is == 21, OR if both bust.
        if (playerHandValue == 21 && dealerHandValue == 21) {
          outputMsg = outputMsg + "<br>It's a tie!";
          // Update game mode to Mode 4: Game results
          gameMode = gameResults;
        } else if (playerHandValue > 21 && dealerHandValue > 21) {
          outputMsg = outputMsg + "<br>Both bust - it's a tie!";
          // Update game mode to Mode 4: Game results
          gameMode = gameResults;
        }
        // Player wins if == 21 and dealer hand value is not 21 (either < 21 or > 21).
        else if (playerHandValue == 21) {
          outputMsg = outputMsg + `<br>Congrats! You win! 🥳`;
          // Update game mode to Mode 4: Game results
          gameMode = gameResults;
        }
        // Else dealer wins
        else {
          outputMsg =
            outputMsg +
            `<br> Oops, it's a bust! 🙈 <br><br>Better luck next time!`;
          // Update game mode to Mode 4: Game results
          gameMode = gameResults;
        }
      }
    }

    // If player enters "Stand"
    else if (input.toLowerCase() == "stand") {
      // Calculate player hand value
      var playerHandValue = calcHandValues(playerHand);

      // Calculate dealer hand value and draws if < 17
      var dealerHandValue = calcHandValues(dealerHand);
      var dealerHandValue = dealerDrawsIfNeeded(dealerHand);

      // Calculates if it is a tie (same value or both bust)
      if (
        playerHandValue == dealerHandValue ||
        (playerHandValue > 21 && dealerHandValue > 21)
      ) {
        outputMsg = `${displayHands(
          playerHand,
          dealerHand
        )}<br>It's a tie!`;
      }
      // Checks if player or dealer wins
      else if (
        (playerHandValue <= 21 && playerHandValue > dealerHandValue) ||
        (playerHandValue <= 21 && dealerHandValue > 21)
      ) {
        outputMsg = `${displayHands(
          playerHand,
          dealerHand
        )}<br>Congrats! You win! 🎉`;
      } else
        outputMsg = `${displayHands(
          playerHand,
          dealerHand
        )}<br>Sorry, the dealer wins.<br><br>Better luck next time!`;

      // Update game mode to Mode 5: Game results
      gameMode = gameResults;
    }

    return outputMsg;
  }
  // Mode 5: Game results
  if (gameMode == gameResults) {
    myOutputValue = `Game END!`;
  }
  return myOutputValue;
};
