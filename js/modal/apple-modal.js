//get modal id
var modal1 = document.getElementById("myModal1");

//get buttom id
var btn1 = document.getElementById("myBtn1");

//get span id for closing modal
var span1 = document.getElementsByClassName("close1")[0];

//display the modal on click
btn1.onclick = function() {
    modal1.style.display = "block";
}

//close the modal when the 'x' is clicked
span1.onclick = function() {
    modal1.style.display = "none";
}

//close the modal when anything off the modal is clicked
window.onclick = function(event1) {
    if (event1.target == modal1){
        modal1.style.display = "none";
    }
}

