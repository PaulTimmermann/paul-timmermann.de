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
	
	const tab1Visible = document.querySelector("#tab_1").style.display !== "none";
	const tab2Visible = document.querySelector("#tab_2").style.display !== "none";
	
	if (!tab1Visible && !tab2Visible) {
		document.querySelector("#tabs").innerHTML = `
			<div style="font-family: Courier, monospace; color: white; text-align: center; padding: 20px;">
				<p>bad for you :(</p>
				<p style="font-size: 12px; opacity: 0.7;">you closed all the tabs</p>
				<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" style="color: #92d024; font-size: 14px;">here's a reward</a>
				<br><br>
				<a href="#" onclick="resetTabs(); return false;" style="color: #af1b3e; font-size: 12px;">get tabs back</a>
			</div>
		`;
	}
}

const resetTabs = () => {
	document.querySelector("#tab_1").style.display = "";
	document.querySelector("#x_1").style.display = "";
	document.querySelector("#tab_2").style.display = "";
	document.querySelector("#x_2").style.display = "";
	
	document.querySelector("#tabs").innerHTML = `
		<a id="tab_1" href="/">	<span><p>index.html</p></span></a>	<a id="x_1" onclick="closetab(1)">x</a>
		<a id="tab_2" href="/whatelse">		<span><p>what_else.html</p></span></a>	<a id="x_2" onclick="closetab(2)">x</a>
	`;
	
	if (isIndex) {
		document.querySelector("#tab_1").style.display = "none";
		document.querySelector("#x_1").style.display = "none";
	} else {
		document.querySelector("#tab_2").style.display = "none";
		document.querySelector("#x_2").style.display = "none";
	}
}