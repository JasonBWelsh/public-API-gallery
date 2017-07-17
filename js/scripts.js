const mobileSelect = document.querySelector('.mobile-select');
let numbers = []; // holds random nums for card indexes 

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

mobileSelect.addEventListener('click', (e) => {
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
		// check button color and filter server response for matching color set
		if (color === 'red') {
			magicAPI += magicRed;
		} else if (color === 'black') {
			magicAPI += magicBlack;
		} else if (color === 'white') {
			magicAPI += magicWhite;
		}
		function displayCards(data) {
			const output = document.querySelector('.output');
			const cards = data.cards; // Stores server response (array of card objects)
			const cardList = []; // holds individial cards
			// loop over random numbers array and use each number for index
			// number for cardList
			getRandomNumbers(10); // get specified number of random numbers
			for (let i = 0; i < numbers.length; i += 1) {
				let curNum = numbers[i];
				cardList.push(cards[curNum]);
			}
			output.innerHTML = cardList[0].name; 
			console.log(cardList);
			// testing setting card img
			const image = document.querySelector('.photo');
			const imgSrc = cardList[0].imageUrl;
			image.setAttribute("src", imgSrc);
		}
		console.log(magicAPI);
		$.getJSON(magicAPI, displayCards);
	}
});