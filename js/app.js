

// make a list of cards
let card = document.querySelectorAll('.card');
let cards = [...card];
const deck = document.querySelector('.deck');
// for star rating
let star = document.querySelectorAll('.fa-star');
let stars = [...star];
// variables to check matching
let hasFlipped = false;
let cardOne, cardTwo;
let twoCardsOnly = false;
// for rating
let move;
let movesCounter = document.querySelector('.moves');
// for timer
let minutes, seconds;
let timer = document.querySelector('.timer');
let clock;
// matched card List
let matchedCards;
// winner popup
const winnerPopup = document.querySelector('.popup');



restartGame();
// to restart the game by shuffling and remove classes
function restartGame() {
    let shuffled = shuffle(cards);
    for (var i = 0; i < shuffled.length; i++) {
        [].forEach.call(shuffled, function (item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove('show', 'open', 'match');
    }
    // set move to zero
    move=0;
    movesCounter.innerText = `${move}`;
    // reset timer
    seconds= 0;
    minutes=0;
    resettimer();
    // remove congratulation popup
    document.getElementById("myPopup").style.display = "none";
    // add eventListiner to flipped Card
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', flippedCard);
    };
}


function flippedCard() {

if (twoCardsOnly) return;
// add CSS classes for the flipped Card
this.classList.toggle('open');
this.classList.toggle('show');

// check if the cards flipped  
if (!hasFlipped) {
    hasFlipped = true;
    cardOne = this;
    // disable first card from clicking on it again
    cardOne.removeEventListener('click', flippedCard);
    return;
}

cardTwo = this;
hasFlipped = false;
// go to match function to check if the cards match or not
matchCards();
}

function matchCards() {
    
    if (cardOne.dataset.framework === cardTwo.dataset.framework) {
        // add match CSS class
        cardOne.classList.add("match");
        cardTwo.classList.add("match");
        // remove open and show CSS classes
        cardOne.classList.remove("show", "open");
        cardTwo.classList.remove("show", "open");
        // disable the matched cards from clicking on it again
        cardOne.removeEventListener('click', flippedCard);
        cardTwo.removeEventListener('click', flippedCard);
        win();
    }
    // if the cards don't match flip it
    else 
    {
        twoCardsOnly=true;
            setTimeout(() => {
                cardOne.classList.remove("show", "open");
                cardTwo.classList.remove("show", "open");
                cardOne.addEventListener('click', flippedCard);
                twoCardsOnly=false;
        }, 1000);
    } 

    moveCounter();
    return;    
}

function moveCounter() {
    move++;
    movesCounter.innerHTML = `${move}`;

    // change star rating
    if (move > 16 ) 
        stars[0].style.visibility='hidden';
        
    if (move > 25) 
        stars[1].style.visibility ='hidden';     
}


function resettimer(){

        clock = setInterval(function () {
            timer.innerHTML = `${minutes} mins ${seconds} secs`
            seconds++;
            if (seconds == 60) {
                minutes++;
                seconds = 0;
            }
        }, 1000);
    }

// winner popup
function win(){
    matchedCards = document.querySelectorAll(".match");
    if (matchedCards.length==16){
        document.getElementById("myPopup").style.display = "block";
        document.getElementById("move").innerHTML = `${move}`;
    }
}

function closePopup() {
    document.getElementById("myPopup").style.display = "none";
    restartGame();
}     


// shuffle method
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

