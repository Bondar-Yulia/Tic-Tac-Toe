const gameBoard = (() => {        
    const moduleContainer = document.querySelector(".moduleContainer");
    let signs = [
        [0, 0, 0], 
        [0, 0, 0],
        [0, 0, 0]
    ];
    const newRound = () => {
        signs = [
            [0, 0, 0], 
            [0, 0, 0],
            [0, 0, 0]
        ]; 
        moduleContainer.classList.add("hidden");
    }
    const checkRowAndColumn = (x, y) => {
        return (signs[x][0] == signs[x][1] && signs[x][1] == signs[x][2]) || (signs[0][y] == signs[1][y] && signs[1][y] == signs[2][y]);
    }
    const checkCrossing = (x, y) => {
        let result = false;
        if (x == y) result = (signs[0][0] == signs[1][1] && signs[1][1] == signs[2][2]);
        if (x + y == 2) result = (signs[0][2] == signs[1][1]) && (signs[1][1] == signs[2][0]);
        return result;
    }    
    const showResult = (name) => {
        moduleContainer.querySelector(".result").textContent = name ? `${name} has wone!` : "It's a draw";
        moduleContainer.classList.remove("hidden");
    }
    const findResult = (x, y, name) => {
        if((checkRowAndColumn(x, y)) || checkCrossing(x, y)) showResult(name);
        else if(signs.every(row => row.every(sign => sign))) showResult();
    }   
    const addSign = (Player, currentBlock) => {
        currentBlock.textContent = Player.sign;
        currentBlock.classList.add(`block${Player.turn}`);
        let number = currentBlock.dataset['number'];
        let x = parseInt((number - 1)/3);
        let y = (number - 1) % 3;
        signs[x][y] = Player.sign;
        findResult(x, y, Player.name);
    }
    return {addSign, newRound};
})()

const Player = (sign, turn) => {
    let name = document.querySelector("form").elements[turn-1].value || `Player${turn}`;
    document.querySelector(`.name${turn}`).textContent = name;
    return {name, sign, turn};
}

const displayController = (() => {
    const tittle = document.querySelector(".tittle");
    const playerDisplays = document.querySelectorAll(".player");
    const gameBoardGrid = document.querySelector(".gameBoardGrid");
    let Player1;
    let Player2;    
    let turn1 = true;
    const startGame = (e) => {
        e.preventDefault();
        tittle.classList.add("hidden");
        Player1 = Player("x", 1);
        Player2 = Player("o", 2);
    }
    const addSign = (e) => {
        let currentPlayer = turn1 ? Player1 : Player2; 
        playerDisplays.forEach(player => player.classList.toggle("active"));
        gameBoard.addSign(currentPlayer, e.target);
        e.target.removeEventListener('click', addSign);
        turn1 = !turn1;
    }
    const newRound = () => {
        gameBoardGrid.childNodes.forEach(block => {
            block.textContent = '';
            block.classList = '';
            block.addEventListener('click', addSign);
        });
        playerDisplays[0].classList.value = "player one active";
        playerDisplays[1].classList.value = "player two";
        gameBoard.newRound();
    }
    const newGame = () => {
        tittle.classList.remove("hidden");
        newRound();
    }
    const createGameBoardGrid = (() => {
        for(let i = 1; i < 10; i++){
            const gameBlock = document.createElement(`div`);
            gameBlock.dataset['number'] = i;
            gameBlock.addEventListener('click', addSign);
            gameBoardGrid.append(gameBlock);
        }
    })()    
    document.querySelector("form").addEventListener("submit", startGame);
    document.querySelector(".newRoundBtn").addEventListener("click", newRound);
    document.querySelector(".newGameBtn").addEventListener("click", newGame); 
})()

