var tilanne = false;
let pelitid = null;
let moveindex = 0;
function start() {
    const pelaaja1 = document.getElementById("p1").value.trim();
    const pelaaja2 = document.getElementById("p2").value.trim();

    fetch("replay_save.php",{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({pelaaja1, pelaaja2})
})
.then( (res) => res.json()).then (json => {pelitid = json.pelitid; moveindex = 0; console.log(pelitid);})
.catch(function(res){ console.log(res) })



    if (pelaaja1 != "" || pelaaja2 != ""){
        for (let a = 1; a <= 9; a++) {
        const cell = document.getElementById(a);
        cell.innerHTML = "";
        cell.setAttribute("class", "restart");
        }
        currentValue = "O";
        tilanne = true;
        console.log("toimii");
    }
}

function end() {
    tilanne = false;
    console.log("toimii");
}
function playerplace(e)
{

    if (!tilanne ) return;
    const cellDiv = e.target;

    if (e.target.innerHTML == ""){
        if (currentValue != "X"){
            currentValue = "X";
            e.target.innerHTML = currentValue;
            checkwin()
        } 
        else{
            currentValue = "O";
            e.target.innerHTML = currentValue;
            checkwin()
        }
    }

moveindex ++
    // Get row and col from the clicked cell
        const row = parseInt(cellDiv.getAttribute("row"));
        const col = parseInt(cellDiv.getAttribute("col"));

        // Send move to the server
        fetch("replay_move_save.php", {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: "POST",
  body: JSON.stringify({
    game_id: pelitid,
    move_index: moveindex,
    row: row,
    col: col
  })
})
.then(res => res.json()).then(json => {console.log("saved:", json);})
.catch(function(res){ console.log(res) })
checkwin();
}

    
function checkwin(){
       
        const s1 = document.getElementById("1")
        const s2 = document.getElementById("2")
        const s3 = document.getElementById("3")
        const s4 = document.getElementById("4")
        const s5 = document.getElementById("5")
        const s6 = document.getElementById("6")
        const s7 = document.getElementById("7")
        const s8 = document.getElementById("8")
        const s9 = document.getElementById("9")

        if (s1.innerHTML === currentValue && s2.innerHTML === currentValue && s3.innerHTML === currentValue)
        {
                s1.removeAttribute("class");
                s2.removeAttribute("class");
                s3.removeAttribute("class");
                s1.setAttribute("class", "winning-cell");
                s2.setAttribute("class", "winning-cell");
                s3.setAttribute("class", "winning-cell");
                tilanne = false;
        }
        else if (s4.innerHTML === currentValue && s5.innerHTML === currentValue && s6.innerHTML === currentValue)
        {
                s4.removeAttribute("class");
                s5.removeAttribute("class");
                s6.removeAttribute("class");
                s4.setAttribute("class", "winning-cell");
                s5.setAttribute("class", "winning-cell");
                s6.setAttribute("class", "winning-cell");
                tilanne = false;
        }
        else if (s7.innerHTML === currentValue && s8.innerHTML === currentValue && s9.innerHTML === currentValue)
        {
                s7.removeAttribute("class");
                s8.removeAttribute("class");
                s9.removeAttribute("class");
                s7.setAttribute("class", "winning-cell");
                s8.setAttribute("class", "winning-cell");
                s9.setAttribute("class", "winning-cell");
                tilanne = false;
        }
        else if (s1.innerHTML === currentValue && s4.innerHTML === currentValue && s7.innerHTML === currentValue)
        {
                s1.removeAttribute("class");
                s4.removeAttribute("class");
                s7.removeAttribute("class");
                s1.setAttribute("class", "winning-cell");
                s4.setAttribute("class", "winning-cell");
                s7.setAttribute("class", "winning-cell");
                tilanne = false;
        }
        else if (s2.innerHTML === currentValue && s5.innerHTML === currentValue && s8.innerHTML === currentValue)
        {
                s2.removeAttribute("class");
                s5.removeAttribute("class");
                s8.removeAttribute("class");
                s2.setAttribute("class", "winning-cell");
                s5.setAttribute("class", "winning-cell");
                s8.setAttribute("class", "winning-cell");
                tilanne = false;
        }
        else if (s3.innerHTML === currentValue && s6.innerHTML === currentValue && s9.innerHTML === currentValue)
        {
                s3.removeAttribute("class");
                s6.removeAttribute("class");
                s9.removeAttribute("class");
                s3.setAttribute("class", "winning-cell");
                s6.setAttribute("class", "winning-cell");
                s9.setAttribute("class", "winning-cell");
                tilanne = false;
        }
        else if (s1.innerHTML === currentValue && s5.innerHTML === currentValue && s9.innerHTML === currentValue)
        {
                s1.removeAttribute("class");
                s5.removeAttribute("class");
                s9.removeAttribute("class");
                s1.setAttribute("class", "winning-cell");
                s5.setAttribute("class", "winning-cell");
                s9.setAttribute("class", "winning-cell");
                tilanne = false;
        }
        else if (s3.innerHTML === currentValue && s5.innerHTML === currentValue && s7.innerHTML === currentValue)
        {
                s3.removeAttribute("class");
                s5.removeAttribute("class");
                s7.removeAttribute("class");
                s3.setAttribute("class", "winning-cell");
                s5.setAttribute("class", "winning-cell");
                s7.setAttribute("class", "winning-cell");
                tilanne = false;
        }
}