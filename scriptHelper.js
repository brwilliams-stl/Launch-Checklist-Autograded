// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    /*
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: </li>
                     <li>Diameter: </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: </li>
                     <li>Number of Moons: </li>
                 </ol>
                 <img src="">
    */

    let target = document.querySelector("#missionTarget");
    target.innerHTML = `
    <h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">
    `
 }
 
 function validateInput(testInput) {
    let validation;

    if (testInput === "") {
        validation = "Empty";
    } else if (isNaN(testInput)) {
        validation = "Not a Number";
    } else {
        validation = "Is a Number";
    }

    return validation;
 }
 
 function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let status = {};

    let pilotStatus = list.querySelector("#pilotStatus");
    let copilotStatus = list.querySelector("#copilotStatus");
    let fuelStatus = list.querySelector("#fuelStatus");
    let cargoStatus = list.querySelector("#cargoStatus");

    if (validateInput(pilot) != "Empty") {
        status.pilot = "ready";
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    } else {
        status.pilot = "empty";
        pilotStatus.innerHTML = "No Pilot";
    }

    if (validateInput(copilot) != "Empty") {
        status.copilot = "ready";
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    } else {
        status.copilot = "empty";
        copilotStatus.innerHTML = "No Co-pilot";
    }

    if (validateInput(fuelLevel) != "Empty") {
        if (validateInput(fuelLevel) == "Is a Number") {
            if (fuelLevel >= 10000) {
                status.fuel = "ready";
                fuelStatus.innerHTML = "Fuel level high enough for launch";
            } else {
                status.fuel = "low";
                fuelStatus.innerHTML = "Fuel level too low for launch";
            }
        } else {
            status.fuel = "NaN";
            fuelStatus.innerHTML = "Fuel input is Not a Number";
        }
    } else {
        status.fuel = "empty";
        fuelStatus.innerHTML = "Fuel input is empty.";
    }

    if (validateInput(cargoLevel) != "Empty") {
        if (validateInput(cargoLevel) == "Is a Number") {
            if (cargoLevel <= 10000) {
                status.cargo = "ready";
                cargoStatus.innerHTML = "Cargo mass low enough for launch";
            } else {
                status.cargo = "exceeds limit";
                cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            }
        } else {
            status.cargo = "NaN";
            cargoStatus.innerHTML = "Cargo input is Not a Number";
        }
    } else {
        status.cargo = "empty";
        cargoStatus.innerHTML = "Cargo input is empty.";
    }

    let launchStatus = document.querySelector("#launchStatus");

    if (status.pilot != "ready"
    || status.copilot != "ready"
    || status.fuel != "ready"
    || status.cargo != "ready") {
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style = "color: red";
    } else {
        launchStatus.innerHTML = "Shuttle is Ready for Launch";
        launchStatus.style = "color: green";
    }

    list.style = "visibility: visible";
    
    return status;
 }
 
 async function myFetch() {
     let planetsReturned;
 
     planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
     .then((response) => response.json()
        .then(((data) => data))
        );
 
     return planetsReturned;
 }
 
 function pickPlanet(planets) {
    let index = Math.floor(Math.random()*planets.length);
    return planets[index];
 }
 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;