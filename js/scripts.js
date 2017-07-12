const starWarsAPI = "http://swapi.co/api/";
const shipsAPI = "http://swapi.co/api/starships/3";


function printShip(ship) {
	const output = document.querySelector('.output');
	let curShip;
	console.log(ship);
	output.innerHTML = ship.name;
}

$.getJSON(shipsAPI, printShip);

printShip(shipsAPI);