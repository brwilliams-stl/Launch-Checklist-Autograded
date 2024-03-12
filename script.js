// Write your JavaScript code here!

window.addEventListener("load", function() {

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then((result) => {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(() => {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let planet = pickPlanet(listedPlanets);
        addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image);
    })

    document.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();

        let formFields = document.getElementsByClassName("formField");
        let pilot = formFields[0].querySelector("input").value;
        let copilot = formFields[1].querySelector("input").value;
        let fuelLevel = formFields[2].querySelector("input").value;
        let cargoMass = formFields[3].querySelector("input").value;

        let launchStatus = formSubmission(document, document.querySelector("#faultyItems"), pilot, copilot, fuelLevel, cargoMass);

        if (launchStatus.pilot != "ready"
        || launchStatus.copilot != "ready"
        || launchStatus.fuel != "ready"
        || launchStatus.cargo != "ready") {
            let alertMessage = [];

            let alertEmpty = (field, name) => {
                if (field == "empty") {
                    alertMessage.push(`${name} cannot be empty`);
                }
            }

            let alertNaN = (field, name) => {
                if (field == "NaN") {
                    alertMessage.push(`${name} must be a number`);
                }
            }

            alertEmpty(launchStatus.pilot, "Pilot Name");
            alertEmpty(launchStatus.copilot, "Co-pilot Name");
            alertEmpty(launchStatus.fuel, "Fuel Level");
            alertEmpty(launchStatus.cargo, "Cargo Mass");

            alertNaN(launchStatus.fuel, "Fuel Level");
            alertNaN(launchStatus.cargo, "Cargo Mass");

            if (launchStatus.fuel == "low") {
                alertMessage.push("Fuel Level is too low");
            }
            if (launchStatus.cargo == "exceeds limit") {
                alertMessage.push("Cargo Mass is too high");
            }

            window.alert("NOT READY: " + alertMessage.join("; "));
        }
    });
 });