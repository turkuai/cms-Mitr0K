var currentValue = "O";
function logit(e){
    if (e.target.innerHTML == ""){
        if (currentValue != "X"){
            currentValue= "X";
            checkwin()
            e.target.innerHTML = currentValue;
        }
        else{
            currentValue= "O";
            checkwin()
            e.target.innerHTML = currentValue;
        }
    }

    function checkwin(){
        const box11 = document.getElementById("box-1-1")
        const box12 = document.getElementById("box-1-2")
        const box13 = document.getElementById("box-1-3")
        const box21 = document.getElementById("box-2-1")
        const box22 = document.getElementById("box-2-2")
        const box23 = document.getElementById("box-2-3")
        const box31 = document.getElementById("box-3-1")
        const box32 = document.getElementById("box-3-2")
        const box33 = document.getElementById("box-3-3")
        const cellDiv = e.target;
        let row = cellDiv.getAttribute("row");
        let col = cellDiv.getAttribute("col");
    if (row == "1" && col == "1")
        {
            if ((box12.innerHTML == currentValue && box13.innerHTML == currentValue)||
                (box21.innerHTML == currentValue && box31.innerHTML == currentValue)||
                (box22.innerHTML == currentValue && box33.innerHTML == currentValue))
                {
                    console.log(`${currentValue} wins!`);
                }
        } else if (row == "1" && col == "2")
        {
            if ((box11.innerHTML == currentValue && box13.innerHTML == currentValue)||
                (box22.innerHTML == currentValue && box32.innerHTML == currentValue))
                {
                    console.log(`${currentValue} wins!`);
                }
        } else if (row == "1" && col == "3")
        {
            if ((box11.innerHTML == currentValue && box12.innerHTML == currentValue)||
                (box22.innerHTML == currentValue && box31.innerHTML == currentValue)||
                (box23.innerHTML == currentValue && box33.innerHTML == currentValue))
                {
                    console.log(`${currentValue} wins!`);
                }
        }
    if (row == "2" && col == "1")
        {
            if ((box11.innerHTML == currentValue && box31.innerHTML == currentValue)||
                (box22.innerHTML == currentValue && box23.innerHTML == currentValue))
                {
                    console.log(`${currentValue} wins!`);
                }
        }
        else if (row === "2" && col === "2") {
            if (
                (box21.innerHTML === currentValue && box23.innerHTML === currentValue) ||
                (box12.innerHTML === currentValue && box32.innerHTML === currentValue) ||
                (box11.innerHTML === currentValue && box33.innerHTML === currentValue) ||
                (box13.innerHTML === currentValue && box31.innerHTML === currentValue)   
            ) {
                console.log(`${currentValue} wins!`);
            }
        } else if (row === "2" && col === "3") {
            if (
                (box21.innerHTML === currentValue && box22.innerHTML === currentValue) ||
                (box13.innerHTML === currentValue && box33.innerHTML === currentValue)   
            ) {
                console.log(`${currentValue} wins!`);
        }
    }
        if (row === "3" && col === "1") {
            if (
                (box11.innerHTML === currentValue && box21.innerHTML === currentValue) || 
                (box32.innerHTML === currentValue && box33.innerHTML === currentValue) || 
                (box13.innerHTML === currentValue && box22.innerHTML === currentValue)    
            ) {
                console.log(`${currentValue} wins!`);
            }
        } else if (row === "3" && col === "2") {
            if (
                (box12.innerHTML === currentValue && box22.innerHTML === currentValue) ||
                (box31.innerHTML === currentValue && box33.innerHTML === currentValue)   
            ) {
                console.log(`${currentValue} wins!`);
            }
        } else if (row === "3" && col === "3") {
            if (
                (box11.innerHTML === currentValue && box22.innerHTML === currentValue) ||
                (box13.innerHTML === currentValue && box23.innerHTML === currentValue) ||
                (box31.innerHTML === currentValue && box32.innerHTML === currentValue)   
            ) {
                console.log(`${currentValue} wins!`);
            }
        }
    }
    
}

function TimeToPlay(playero, playerx){
    const playero = document.getElementById("player1")
    const playerx = document.getElementById("player2")
    console.log(playero, playerx)
    }