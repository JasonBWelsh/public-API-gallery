const body = document.querySelector('body');
const mobileSelect = document.querySelector('.mobile-select');
let numbers = []; // holds random nums for card indexes 
const gallerySection = document.querySelector('.gallery-section');
const galleryList = gallerySection.querySelector('.gallery-list');
const infoDiv = document.querySelector('.info');
// Card Box 
const cardBox = document.querySelector('.cardBox');
const cardBoxCloseBtn = cardBox.querySelector('.cardBox-closeBtn');
const cardBoxRightArw = cardBox.querySelector('.cardBox-rightArw');
const cardBoxContainer = cardBox.querySelector('.cardBox-container');
//

// Generate list of random numbers between 1-100 to use as array indexes
function getRandomNumbers(x) {
	numbers.length = 0;
	for (let i = 0; i < x; i += 1) {
		let number = Math.floor(Math.random() * 100) + 1;
		numbers.push(number);
	}
	console.log(numbers);
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
function populateLightbox(cards) {
	let counter = 0;
	buildBoxHTML(pageCards[counter]);
	cardBoxRightArw.addEventListener('click', () => {
		if (counter < 11) {
			counter ++;
		} else {
			counter = 0;
		}
		buildBoxHTML(pageCards[counter]);
	});
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
		let span = document.createElement("span");
		span.textContent = cards[curNum].name;
		li.appendChild(img);
		li.appendChild(span);
		galleryList.appendChild(li);
		
		// store current page card objects in pageCards array
		let cardObj = cards[curNum];
		pageCards.push(cardObj);	
	}
	console.log('CArd objects? ' + pageCards);
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

			/*buildLightbox();*/
			console.log(cards);
			populateLightbox(cards);

		}
		console.log(magicAPI);
		$.getJSON(magicAPI, displayCards);
	}
});

// Lightbox fucntionality
// use data-index value of images to populate array of objects

galleryList.addEventListener('click', (e) => {
	let target = e.target;
	if (target.tagName === 'IMG') {
		cardBox.classList.add('cardBoxReveal');
	}
});


function buildLightbox () {
	let displayedCards = galleryList.querySelectorAll('img');
	console.log(displayedCards); // remove this *test*
}

// close lightbox
cardBoxCloseBtn.addEventListener('click', () => {
	cardBox.classList.remove('cardBoxReveal');
});

// Info Div effect

$(document).ready(function() {
	infoDiv.classList.add('reveal');
});

