document.getElementById("Submit").addEventListener("click", function(){  
    
    const countryName = document.getElementById("country").value;   

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then(response => response.json()) 
        .then(data => {
            const country = data[0]; 

            const capital = country.capital;
            const population = country.population;
            const region = country.region;
            const flag = country.flags.svg;

            
            document.getElementById("country-flag").src = flag;
            document.getElementById("capital").textContent = capital;
            document.getElementById("population").textContent = population;
            document.getElementById("region").textContent = region;
            const borders = country.borders || [];

            if (borders.length > 0) {
                displayNeighboringCountries(borders);
            } else {
                document.getElementById("bordering-countries").innerHTML = "<li>No neighboring countries</li>";
            }
        })
        .catch(error => {
            console.error("Error fetching country data:", error);
            alert("Country does not exist");

        });
});

function displayNeighboringCountries(borders) {
    const neighborUrls = borders.map(code => `https://restcountries.com/v3.1/alpha/${code}`);



    
    Promise.all(neighborUrls.map(url =>
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const neighbor = data[0]; 
                const neighborName = neighbor.name.common;
                const neighborFlag = neighbor.flags.svg;


             
                document.getElementById("neighbors-list").innerHTML += `
                <li>
                    <h2>${neighborName}</h2>
                    <img src="${neighborFlag}" alt="Flag of ${neighborName}" width="300" height="300">
                </li>
                `;
            })
            .catch(error => {
                console.error("Error fetching neighboring country data:", error);
            })
    ));
}
