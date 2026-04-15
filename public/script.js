// Menu
const nav_selector = document.querySelector(".nav");
const tabs_selector = document.querySelector("#tabs");

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

const closetab = (tabNumber) => {
	document.querySelector("#tab_" + tabNumber).style.display = "none";
	document.querySelector("#x_" + tabNumber).style.display = "none";
}