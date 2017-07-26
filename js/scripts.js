const body = document.querySelector('body');
const header = document.querySelector('.main-header');
const name = document.querySelector('.name');
const mobileSelect = document.querySelector('.mobile-select');
const infoDiv = document.querySelector('.info');
//
let numbers = []; // holds random nums for card indexes 
const gallerySection = document.querySelector('.gallery-section');
const galleryList = gallerySection.querySelector('.gallery-list');

// landing page
const landingWrap = document.querySelector('.landing');
const outerBox = document.querySelector('.outer-box');
const bubbleLink = document.querySelector('.box');
const gallerySelectBtn = document.querySelector('.gallery-select-btn');
const mtgBtn = document.querySelector('.mtg-gallery-btn');
const pokeBtn = document.querySelector('.poke-gallery-btn');
// Card Box 
const cardBox = document.querySelector('.cardBox');
const cardBoxCloseBtn = cardBox.querySelector('.cardBox-closeBtn');
const cardBoxRightArw = cardBox.querySelector('.cardBox-rightArw');
const cardBoxLeftArw = cardBox.querySelector('.cardBox-leftArw');
const cardBoxContainer = cardBox.querySelector('.cardBox-container');
//Poke Section
const pokeWrap = document.querySelector('.main-poke');


// landing page
landingWrap.addEventListener('click', (e) => {
	let target = e.target;
	if (target.classList.contains('gallery-select-btn')) {// remove landing overlay and show header
		outerBox.classList.add('bubble-stick');
		infoDiv.style.display = 'none';
		/*landingWrap.style.display = 'none';*/
		header.style.display = 'flex';
		header.classList.add('headerReveal');
		header.classList.remove('hide');

		// get landing out of way for clicks
		landingWrap.classList.add('landing-out-of-way');

		gallerySelectBtn.classList.add('btn-position-click');
		if (target.classList.contains('mtg-gallery-btn')) { // show mobileSelect and MtG
			name.textContent = "MtG API Gallery";
			mobileSelect.style.display = 'flex';
			mobileSelect.classList.remove('hide');
			gallerySection.classList.remove('hide');
			pokeWrap.classList.add('hide');
		}
		if (target.classList.contains('poke-gallery-btn')) {
			name.textContent = "PokeAPI Gallery";
			pokeWrap.style.display = 'flex';
			pokeWrap.classList.remove('hide');
			mobileSelect.classList.add('hide');
			gallerySection.classList.add('hide');
		}
	}
});


// Generate list of random numbers between 1-100 to use as array indexes
function getRandomNumbers(x) {
	numbers.length = 0;
	for (let i = 0; i < x; i += 1) {
		let number = Math.floor(Math.random() * 100) + 1;
		numbers.push(number);
	}
	return numbers;
}

// Build HTML for gallery 

function buildBoxHTML(card) {
	let cardImg = card.imageUrl;
	let boxHTML = '<h2>' + card.name + '</h2>';
	boxHTML += '<img src="' + cardImg + '" alt="">';
	boxHTML += '<p>' + card.type + '</p>';
	boxHTML += '<p>Rarity: ' + card.rarity + '</p>';
	cardBoxContainer.innerHTML = boxHTML;
}

let pageCards = []; // current card objects on page
let dataPosition; // data-position attribute of card clicked on page
let counter = 0;
function populateLightbox(cards, counter) {
	
	buildBoxHTML(pageCards[counter]);
	// click right arrow
	cardBoxRightArw.addEventListener('click', () => {
		if (counter < 11) {
			counter ++;
		} else {
			counter = 0;
		}
		buildBoxHTML(pageCards[counter]);
	});
	// click left arrow
	cardBoxLeftArw.addEventListener('click', () => {
		if (counter > 0) {
			counter --;
		} else if (counter <= 0) {
			counter = 11;
		}
		
		buildBoxHTML(pageCards[counter]);
	});
	// Click image to set counter to data-position load lightbox
	galleryList.addEventListener('click', (e) => {
	let target = e.target;
	if (target.tagName === 'IMG') {
			dataPosition = target.getAttribute("data-position"); // sets number in data position variable 
			counter = dataPosition;
			buildBoxHTML(pageCards[counter]);
		}
	});
	buildBoxHTML(pageCards[counter]);
}

function buildGallery(cards, numbers) {
	galleryList.innerHTML = ""; // clears page for new cards
	pageCards.length = 0; // clear card Obj array

	for (let i = 0; i < numbers.length; i += 1) {
		let li = document.createElement("li");
		let img = document.createElement("img");
		let curNum = numbers[i];
		let imgSrc = cards[curNum].imageUrl;
		img.setAttribute("src", imgSrc);
		img.setAttribute("alt", "Randomly generated card");
		img.setAttribute("data-index", curNum);
		img.setAttribute("data-position", i); // use this index to open lightbox at right place???
		let span = document.createElement("span");
		span.textContent = cards[curNum].name;
		li.appendChild(img);
		li.appendChild(span);
		galleryList.appendChild(li);
		
		// store current page card objects in pageCards array
		let cardObj = cards[curNum];
		pageCards.push(cardObj);	
	}
}

mobileSelect.addEventListener('click', (e) => {
	infoDiv.style.display = 'none';
	// sets .selected class on nav items
	if (e.target.tagName === 'LI') {
		let selected = e.target;
		let selects = mobileSelect.querySelectorAll('LI'); // references all list items
		for (let i = 0; i < selects.length; i += 1) {
			let curSelect = selects[i];
			curSelect.classList.remove('selected');
		}
		selected.classList.add('selected');
		// API stuff
		const color = selected.textContent;
		let magicAPI = "https://api.magicthegathering.io/v1/cards";
		const magicRed = "?colors=red";
		const magicBlack = "?colors=black";
		const magicWhite = "?colors=white";
		const magicBlue = "?colors=blue";
		const magicGreen = "?colors=green";
		// check button color and filter server response for matching color set
		if (color === 'red') {
			magicAPI += magicRed;
		} else if (color === 'black') {
			magicAPI += magicBlack;
		} else if (color === 'white') {
			magicAPI += magicWhite;
		} else if (color === 'blue') {
			magicAPI += magicBlue;
		} else if (color === 'green') {
			magicAPI += magicGreen;
		}
		function displayCards(data) {  // server callback function
			const output = document.querySelector('.output');
			const cards = data.cards; // Stores server response (array of card objects)
			getRandomNumbers(12); // get specified number of random numbers
			// Build card gallery
			buildGallery(cards, numbers);

			populateLightbox(cards, counter);

		}
		$.getJSON(magicAPI, displayCards);
	}
});

// PokeAPI code

// img on sides of cube
const front = document.querySelector('.front');
const back = document.querySelector('.back');
const left = document.querySelector('.left');
const right = document.querySelector('.right');

const pokeButton = document.querySelector('.poke-btn');

let jasFavs = [197, 1, 78, 196];

// display jasmine's fav pokemon
/*let bulbasaur = "http://pokeapi.co/api/v2/pokemon/1/";
function displayBulbasaur(data) {
	let name = data.name;
	let image = data.sprites.front_default;
	front.setAttribute("src", image);
}
$.getJSON(bulbasaur, displayBulbasaur);

let umbreon = "http://pokeapi.co/api/v2/pokemon/197/";
function displayUmbreon(data) {
	let name = data.name;
	let image = data.sprites.front_default;
	back.setAttribute("src", image);
}
$.getJSON(umbreon, displayUmbreon);

let rapidash = "http://pokeapi.co/api/v2/pokemon/78/";
function displayRapidash(data) {
	let name = data.name;
	let image = data.sprites.front_default;
	left.setAttribute("src", image);
}
$.getJSON(rapidash, displayRapidash);

let espeon = "http://pokeapi.co/api/v2/pokemon/196/";
function displayEspeon(data) {
	let name = data.name;
	let image = data.sprites.front_default;
	right.setAttribute("src", image);
}
$.getJSON(espeon, displayEspeon);*/

pokeButton.addEventListener('click', () => {
	// display jasmine's fav pokemon
	let bulbasaur = "https://pokeapi.co/api/v2/pokemon/1/";
	function displayBulbasaur(data) {
		let image = data.sprites.front_default;
		front.setAttribute("src", image);
	}
	$.getJSON(bulbasaur, displayBulbasaur);

	let umbreon = "https://pokeapi.co/api/v2/pokemon/197/";
	function displayUmbreon(data) {
		let image = data.sprites.front_default;
		back.setAttribute("src", image);
	}
	$.getJSON(umbreon, displayUmbreon);

	let rapidash = "https://pokeapi.co/api/v2/pokemon/78/";
	function displayRapidash(data) {
		let image = data.sprites.front_default;
		left.setAttribute("src", image);
	}
	$.getJSON(rapidash, displayRapidash);

	let espeon = "https://pokeapi.co/api/v2/pokemon/196/";
	function displayEspeon(data) {
		let image = data.sprites.front_default;
		right.setAttribute("src", image);
	}
	$.getJSON(espeon, displayEspeon);
});

// Lightbox fucntionality

galleryList.addEventListener('click', (e) => {
	let target = e.target;
	if (target.tagName === 'IMG') {
		cardBox.classList.add('cardBoxReveal');
		dataPosition = target.getAttribute("data-position"); // sets number in data position variable 
	}
});


// close lightbox
cardBoxCloseBtn.addEventListener('click', () => {
	cardBox.classList.remove('cardBoxReveal');
});

// Info Div effect

$(document).ready(function() {
	infoDiv.classList.add('reveal');
});



