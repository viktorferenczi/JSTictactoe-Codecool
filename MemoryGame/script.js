const cards = document.querySelectorAll('.memory-card')//get the cards


let hasFlippedCard = false
let lockBoard = false
let firstCard, secondCard

function flipCard(){
   //flipping card
   if(lockBoard) return
   if(this === firstCard) return

   this.classList.add('flip')

   if(!hasFlippedCard){
      //first click
      hasFlippedCard = true
      firstCard = this
      return
   } 
      //second click
      secondCard = this
     checkForMatch()
}

function checkForMatch(){
   //checking for a match
   let isMatch = firstCard.dataset.framework === secondCard.dataset.framework
   isMatch ? disableCards() : unflipCards()
}

function disableCards(){
   //removing click from cards and reset
   firstCard.removeEventListener('click',flipCard)
   secondCard.removeEventListener('click', flipCard)
   resetBoard()
}

function unflipCards(){
   //remove the flip with timing
   lockBoard = true

   setTimeout(() => {
      firstCard.classList.remove('flip')
      secondCard.classList.remove('flip')
      resetBoard()
      },1500)
}

function resetBoard(){
   //resetting everything
   [hasFlippedCard, lockBoard] = [false,false]
   [firstCard, secondCard] = [null,null]
}

// IIIFE Immediately Invoked Function Expression : 
// will be executed right after its definition
(function shuffle(){
   //shuffle the card in the beginning
   cards.forEach(card => {
   let randomPos = Math.floor(Math.random() * 12)
   card.style.order = randomPos
   })
})()

cards.forEach(card => card.addEventListener('click',flipCard)) //add click to every card