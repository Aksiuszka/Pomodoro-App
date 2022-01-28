//Navigacja
const navbar = document.querySelector('.navigation');
const navList = document.querySelector('.nav-list');
const buttonNav = document.querySelector('.button');
const search = document.querySelector('.search-bar');
const hidethatridiculousshit = document.querySelectorAll('.name');

function toggleClass() {
	navbar.classList.toggle('navigationactive');
	navList.classList.toggle('nav-listactive');
	buttonNav.classList.toggle('buttonactive');
	hidethatridiculousshit[0].classList.toggle('nameactive');
	hidethatridiculousshit[1].classList.toggle('nameactive');
}
buttonNav.addEventListener('click', toggleClass);
