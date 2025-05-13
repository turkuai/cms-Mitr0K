var currentValue = "O";
function logit(e){

    if (e.target.innerHTML == ""){
        if (currentValue != "X"){
            currentValue= "X";
            e.target.innerHTML = currentValue;
        }
        else{
            currentValue= "O";
            e.target.innerHTML = currentValue;
        }
    }
}