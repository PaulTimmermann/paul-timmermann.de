// Menu
const nav_selector = document.querySelector(".nav");
const tabs_selector = document.querySelector("#tabs");

const currentPath = window.location.pathname;
const isIndex = currentPath === '/' || currentPath.endsWith('/index.html') || currentPath === '/index';

if (!isIndex) {
	document.querySelector("#tab_1").style.display = "none";
	document.querySelector("#x_1").style.display = "none";
} else {
	document.querySelector("#tab_2").style.display = "none";
	document.querySelector("#x_2").style.display = "none";
}

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
	const isCurrentPageTab = (tabNumber === 1 && isIndex) || (tabNumber === 2 && !isIndex);
	
	if (isCurrentPageTab) {
		const targetPage = tabNumber === 1 ? '/whatelse' : '/';
		window.location.href = targetPage;
		return;
	}
	
	document.querySelector("#tab_" + tabNumber).style.display = "none";
	document.querySelector("#x_" + tabNumber).style.display = "none";
}