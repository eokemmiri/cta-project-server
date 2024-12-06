document.getElementById("getDirectionBtn").addEventListener("click", async () => {
    const startStop = document.getElementById("startStop").value;
    const endStop = document.getElementById("endStop").value;

    // Ensure the user selects two different stops
    if (startStop === endStop) {
        document.getElementById("result").innerHTML = "Please select two different stops.";
        return;
    }

    try {
        // Make the API call
        const response = await fetch(`http://localhost:8080/directions-between-stops?routeId=1&startStop=${startStop}&endStop=${endStop}`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch direction.");
        }

        const data = await response.json();

        // Display the result
        if (data.message) {
            document.getElementById("result").innerHTML = `<strong>Direction:</strong> ${data.message}`;
        } else if (data.error) {
            document.getElementById("result").innerHTML = `<strong>Error:</strong> ${data.error}`;
        }
    } catch (error) {
        console.error(error);
        document.getElementById("result").innerHTML = "An error occurred while fetching the direction.";
    }
});
