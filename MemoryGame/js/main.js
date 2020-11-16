
const gameState = {
    numPlayers: 1,  // Future implementation for multiple players
    currentPlayer: 0,  // Future implementation for multiple players
    players_namnes: [],    //future implementation for multiple players
    firstChoice: null,
    secondChoice: null,
    boardCards: [], // The board cards
}

function shuffleArray(arr){
    for(let i=arr.length - 1; i > 0; i--){
        // grab a random position
        const p = Math.floor(Math.random() * i);
        // grab the last value of the processed array (decrementing each step)
        const temp = arr[i];
        // switch the values
        arr[i] = arr [p]
        arr[p] = temp;
    }
}

function buildCards(){
    if(gameState.numPlayers>4){
        window.alert("Número máximo de jogadores: 4");
        return;
    }

    let numCardsPerPlayers = [6, 8, 12, 16];

    // build the list of all cards
    const allCards = [];
    for(let i = 1; i<=60; i++){
        card_img = (i<10)? `assets/img/FantasyCardsPack_00${i}.png` : `assets/img/FantasyCardsPack_0${i}.png`;
        allCards.push(card_img);
    }

    shuffleArray(allCards);

    for(let i=0; i < numCardsPerPlayers[gameState.numPlayers-1]; i++){
        // It is a memory game. Push twice        
        gameState.boardCards.push(allCards[i]);
        gameState.boardCards.push(allCards[i]);
    }

    shuffleArray(gameState.boardCards)
}

function buildBoard(){
    const board = document.querySelector(".memory-game");
    // Clear the board
    while(board.firstChild) board.removeChild(board.lastChild);

    buildCards();

    // Build the cards and add them to the board
    for(let c = 0; c < gameState.boardCards.length; c++){
        const card = document.createElement('div');
        card.className = "card";
        const face = document.createElement('img');
        face.className = "card-front";
        face.src = gameState.boardCards[c];
        face.alt = gameState.boardCards[c];

        const back = document.createElement('img');
        back.className = "card-back";
        back.src = "assets/img/BlueCardTemplate_b_01.png"
        back.alt = "Verso da Carta"

        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', flipCard)

        board.appendChild(card);
    }
}

function flipCard(){

    if (gameState.firstChoice && gameState.secondChoice) return;
    if (this == gameState.firstChoice) return;

    this.classList.add('flip');
    if(!gameState.firstChoice){
        gameState.firstChoice=this;
        return;
    }

    gameState.secondChoice=this;
    checkForMatch();
}

function checkForMatch(){
    const first_card = gameState.firstChoice.querySelector(".card-front");
    const second_card = gameState.secondChoice.querySelector(".card-front");
    if(first_card.src === second_card.src){
        disableCards();
        return;
    }
    
    unflipCards();
}

function disableCards(){

    gameState.firstChoice.removeEventListener('click', flipCard);
    gameState.secondChoice.removeEventListener('click', flipCard);
    resetPlay()

}

function unflipCards(){
    setTimeout(()=>{
        gameState.firstChoice.classList.remove('flip');
        gameState.secondChoice.classList.remove('flip');
        resetPlay();
    }, 1500)
}

function resetPlay(){
    gameState.firstChoice=null;
    gameState.secondChoice=null;
}

buildBoard()