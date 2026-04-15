// 			 Contact-form
window.onload = function() {
    var $recaptcha = document.querySelector('#g-recaptcha-response');

    if($recaptcha) {
        $recaptcha.setAttribute("required", "required");
    }
};

function onSubmit(token) {
     document.getElementById("contact-form").submit();
   };


const send = () => {
var template_params = {
   "clientName": document.querySelector("#name").value,
   "clientMail": document.querySelector(".mail").value,
   "service": document.querySelector(".service").value,
   "message": document.querySelector("#mssg").value
}

var service_id = "default_service";
var template_id = "service_1";
emailjs.send(service_id, template_id, template_params);
alert("Email Versendet")
}

// 		Menu
const nav_selector = document.querySelector(".nav"); // background black
const tabs_selector = document.querySelector("#tabs"); // hide

const fold = () => {
	if (nav_selector.style.backgroundColor === "black") {
	nav_selector.style.backgroundColor = "#0e0e0e";
	tabs_selector.style.display = "flex";
	document.querySelector(".fold_out").className = "fold_in";
	}
	else{
	nav_selector.style.backgroundColor = "black";
	tabs_selector.style.display = "none";
	document.querySelector(".fold_in").className = "fold_out";
	}
}

const closetab = (tabNumber) =>{
	document.querySelector("#tab_" + tabNumber).style.display = "none";
	document.querySelector("#x_" + tabNumber).style.display = "none";
}