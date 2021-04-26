//get modal id
var modal2 = document.getElementById("myModal2");

//get button id
var btn2 = document.getElementById("myBtn2");

//get span id for closing modal
var span2 = document.getElementsByClassName("close2")[0];

//display the modal on click
btn2.onclick = function() {
    modal2.style.display = "block";
}

//close the modal when the 'x' is clicked
span2.onclick = function() {
    modal2.style.display = "none";
}

//close the modal when anything off the modal is clicked
window.onclick = function(event2) {
    if (event2.target == modal2){
        modal2.style.display = "none";
    }
}