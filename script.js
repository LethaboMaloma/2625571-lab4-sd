document.getElementById("Submit").addEventListener("click", function(){  
    
    const countryName = document.getElementById("country").value;  // Get the country name entered by the user

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then(response => response.json())  // Parse the response as JSON
        .then(data => {
            const country = data[0];  // Get the first country in the data array

            // Extract country details
            const countryName = country.name.common;
            const capital = country.capital;
            const population = country.population;  // Format population with commas
            const region = country.region;
            const flag = country.flags.svg;

            // Update the DOM with the country details
            document.getElementById("country-flag").src = flag;
            document.getElementById("capital").textContent = capital;
            document.getElementById("population").textContent = population;
            document.getElementById("region").textContent = region;

        });
});
