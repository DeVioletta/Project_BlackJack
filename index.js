//ALGORITHM
let cards = []
    let firstCard
    let secondCard
let sum 
let dealerSum
let dealerCards = []
    let dealerFirstCard
    let dealerSecondCard
let isAlive = false
let balance = 200
let winner = "none"


//TEXT
let cardsEl = document.querySelector("#cards-el");
let sumEl = document.querySelector("#sum-el");
let messageEl = document.querySelector("#message-el");
let winnerEl = document.getElementById("winner-el")
let balanceEl = document.getElementById("balance-el")

//in game function
function startGame() {
  if (balance > 0){
    startEl.style.display = 'none'
    gameButtonEl.style.display = 'flex';
    balanceEl.style.display = 'none'
    firstCard = getRandomCard()
    secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard;
    isAlive = true
    console.log(isAlive)
    renderGame()
  } else {
    messageEl.textContent = "You can't play cuz u don't have any money"
  }
  
}

function getRandomCard(){
  let card = Math.floor(Math.random() * 13) + 1
  if (card === 1) {
    return 11
  } else if (card > 10) {
    return 10
  } else {
    return card
  }
}


function renderGame() {
  cardsEl.textContent = ""
  for (let i = 0; i < cards.length ; i++ ) {
    cardsEl.textContent += cards[i] + " "
  }

  sumEl.textContent = "Sum : " + sum;
  
  if (sum == 21) {
    messageEl.textContent = "You've got a blackjack!";
    winnerEl.textContent = "Congrats, You WON!!🎉🎉"
    isAlive = false
    winner = "player"
  } else if (sum > 21 ){
    messageEl.textContent = "You Busted HAHAHAHAA";
    isAlive = false
    winner = "dealer"
  }

  if (isAlive == false) {
    balanceCalc()
  }
}

function hitCard() {
  if (isAlive === true){
    let card = getRandomCard()
    cards.push(card) 
    sum += card
    renderGame() 
  }

}

function quitGame(){
  if (isAlive == false) {
  gameButtonEl.style.display = 'none'
  startEl.style.display = 'block'
  balanceEl.style.display = 'block'
  cards = []
    sum = 0
  dealerCards = []
    dealerSum = 0
  winner = "none"
  messageEl.textContent = "Want to play a round";
  cardsEl.textContent = ""
  sumEl.textContent = "Sum : "
  winnerEl.textContent = ""
  } else {
    messageEl.textContent = "Finish the game first!!!"
  }
  
}

function decideWinner(){
  if (dealerSum > 21) {
    winnerEl.textContent = "Dealer Busted, You WON!!🎉🎉"
    winner="player"
  }
  else{
    if (sum > dealerSum) {
      winnerEl.textContent = "Congrats, You WON!!🎉🎉"
      winner = "player"
    } else if (sum == dealerSum) {
      winnerEl.textContent = "Its A Tie 🤣"    
    } else if (dealerSum > sum) {
      winnerEl.textContent = "You LOSE HAHAHAHAHA"
      winner = "dealer"
    }
  }
  balanceCalc()
}

function dealerTurn(){
  if (isAlive == true){
    isAlive = false
    dealerFirstCard = getRandomCard()
    dealerSecondCard = getRandomCard()
    dealerCards = [dealerFirstCard, dealerSecondCard]
    dealerSum = dealerFirstCard + dealerSecondCard
    
    messageEl.textContent = "The dealer cards is " 

    while (dealerSum < 16) {
        let dealerCard = getRandomCard()
        dealerCards.push(dealerCard)
        dealerSum += dealerCard
    }
    for (let i = 0; i < dealerCards.length ; i++) {
      messageEl.textContent += dealerCards[i] + " "
    }
    messageEl.textContent += ", " + "total: " + dealerSum

    decideWinner()
  } 
}

function balanceCalc(){

  if (winner == "player") {
    balance += 100
    winnerEl.textContent += " +$100"
  } else if (winner == "dealer") {
    balance -= 100
    winnerEl.textContent += " -$100"
  }
  balanceEl.textContent = "$" + balance
  
}


//BUTTON
let startEl = document.getElementById("start-btn")
let gameButtonEl = document.getElementById("game-btn")
    let hitEl = document.getElementById("hit-btn")
    let standEl = document.getElementById("stand-btn")
    let quitEl = document.getElementById("quit-btn")


startEl.addEventListener("click", startGame);
hitEl.addEventListener("click", hitCard)
quitEl.addEventListener("click", quitGame)
standEl.addEventListener("click", dealerTurn)

