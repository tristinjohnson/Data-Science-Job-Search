//get modal id
var modal = document.getElementById("myModal");

//get buttom id
var btn = document.getElementById("myBtn");

//get span id for closing modal
var span = document.getElementsByClassName("close")[0];

//display the modal on click
btn.onclick = function() {
    modal.style.display = "block";
}

//close the modal when the 'x' is clicked
span.onclick = function() {
    modal.style.display = "none";
}

//close the modal when anything off the modal is clicked
window.onclick = function(event) {
    if (event.target == modal){
        modal.style.display = "none";
    }
}

