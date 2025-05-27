let currentValue = "O";
let gameId = 1
let moveIndex = 0

// TODO: For the interval:
// https://www.w3schools.com/jsref/met_win_setinterval.asp
// https://www.w3schools.com/jsref/met_html_click.asp
// do not post to server current move info in case of reply


function playerplace(e) {

        const cellDiv = e.target;

        if (cellDiv.innerHTML == "") {
                if (currentValue != "X") {
                        currentValue = "X";
                        cellDiv.innerHTML = currentValue;
                        moveIndex++
                        checkwin()
                }
                else {
                        currentValue = "O";
                        cellDiv.innerHTML = currentValue;
                        moveIndex++
                        checkwin()
                }

                const row = cellDiv.getAttribute("row")
                const col = cellDiv.getAttribute("col")

                fetch("replay-move-save.php",
                        {
                                headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                },
                                method: "POST",
                                body: JSON.stringify({ gameId, moveIndex, row, col })
                        })
                        .then((res) => res.json()).then(json => { console.log("move saved") })
                        .catch(function (res) { console.log(res) })

        }

        function checkwin() {
                const box11 = document.getElementById("box-1-1")
                const box12 = document.getElementById("box-1-2")
                const box13 = document.getElementById("box-1-3")
                const box21 = document.getElementById("box-2-1")
                const box22 = document.getElementById("box-2-2")
                const box23 = document.getElementById("box-2-3")
                const box31 = document.getElementById("box-3-1")
                const box32 = document.getElementById("box-3-2")
                const box33 = document.getElementById("box-3-3")
                if (box11.innerHTML === currentValue && box12.innerHTML === currentValue && box13.innerHTML === currentValue) {
                        box11.removeAttribute("class");
                        box12.removeAttribute("class");
                        box13.removeAttribute("class");
                        box11.setAttribute("class", "winning-cell");
                        box12.setAttribute("class", "winning-cell");
                        box13.setAttribute("class", "winning-cell");
                }
                else if (box21.innerHTML === currentValue && box22.innerHTML === currentValue && box23.innerHTML === currentValue) {
                        box21.removeAttribute("class");
                        box22.removeAttribute("class");
                        box23.removeAttribute("class");
                        box21.setAttribute("class", "winning-cell");
                        box22.setAttribute("class", "winning-cell");
                        box23.setAttribute("class", "winning-cell");
                }
                else if (box31.innerHTML === currentValue && box32.innerHTML === currentValue && box33.innerHTML === currentValue) {
                        box31.removeAttribute("class");
                        box32.removeAttribute("class");
                        box33.removeAttribute("class");
                        box31.setAttribute("class", "winning-cell");
                        box32.setAttribute("class", "winning-cell");
                        box33.setAttribute("class", "winning-cell");
                }
                else if (box11.innerHTML === currentValue && box21.innerHTML === currentValue && box31.innerHTML === currentValue) {
                        box11.removeAttribute("class");
                        box21.removeAttribute("class");
                        box31.removeAttribute("class");
                        box11.setAttribute("class", "winning-cell");
                        box21.setAttribute("class", "winning-cell");
                        box31.setAttribute("class", "winning-cell");
                }
                else if (box12.innerHTML === currentValue && box22.innerHTML === currentValue && box32.innerHTML === currentValue) {
                        box12.removeAttribute("class");
                        box22.removeAttribute("class");
                        box32.removeAttribute("class");
                        box12.setAttribute("class", "winning-cell");
                        box22.setAttribute("class", "winning-cell");
                        box32.setAttribute("class", "winning-cell");
                }
                else if (box13.innerHTML === currentValue && box23.innerHTML === currentValue && box33.innerHTML === currentValue) {
                        box13.removeAttribute("class");
                        box23.removeAttribute("class");
                        box33.removeAttribute("class");
                        box13.setAttribute("class", "winning-cell");
                        box23.setAttribute("class", "winning-cell");
                        box33.setAttribute("class", "winning-cell");
                }
                else if (box11.innerHTML === currentValue && box22.innerHTML === currentValue && box33.innerHTML === currentValue) {
                        box11.removeAttribute("class");
                        box22.removeAttribute("class");
                        box33.removeAttribute("class");
                        box11.setAttribute("class", "winning-cell");
                        box22.setAttribute("class", "winning-cell");
                        box33.setAttribute("class", "winning-cell");
                }
                else if (box13.innerHTML === currentValue && box22.innerHTML === currentValue && box31.innerHTML === currentValue) {
                        box13.removeAttribute("class");
                        box22.removeAttribute("class");
                        box31.removeAttribute("class");
                        box13.setAttribute("class", "winning-cell");
                        box22.setAttribute("class", "winning-cell");
                        box31.setAttribute("class", "winning-cell");
                }
        }
}

function startGame() {
        moveIndex = 0

        const playerX = document.getElementById("p1").value
        const playerO = document.getElementById("p2").value
        fetch("replay-save.php",
                {
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify({ playerX, playerO })
                })
                .then((res) => res.json()).then(json => { gameId = json.gameid; console.log(gameId) })
                .catch(function (res) { console.log(res) })
}

function replay() {
        fetch("replay-get.php",
                {
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify({ gameId: 6 })
                })
                .then((res) => res.json()).then(moves => { replayMoves(moves) })
                .catch(function (res) { console.log(res) })


}

function replayMoves(moves){
        let index = 0
        const myInterval = setInterval(function () {
                const move = moves[index]
                const id = `box-${move.row}-${move.col}`
                document.getElementById(id).click()
                index ++
                if (index == moves.length){
                        clearInterval(myInterval)
                }                



        }, 1000)
}
