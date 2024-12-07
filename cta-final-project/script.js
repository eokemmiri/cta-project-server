const startStopSelect = document.getElementById('startStop');
const endStopSelect = document.getElementById('endStop');
const getDirectionBtn = document.getElementById('getDirectionBtn');
const resultDiv = document.getElementById('result');

// Stops array with stopid and direction
const stops = [
    { stopid: '101', stopnm: 'Sheridan & Lincoln', direction: 'Eastbound' },
    { stopid: '102', stopnm: 'Sheridan & Foster', direction: 'Eastbound' },
    { stopid: '103', stopnm: 'Chicago & Clark', direction: 'Eastbound' },
    { stopid: '104', stopnm: 'Davis & Orrington', direction: 'Eastbound' },
    { stopid: '105', stopnm: 'Ridge & Davis', direction: 'Eastbound' },

    { stopid: '201', stopnm: 'Dodge & Brummel', direction: 'Westbound' },
    { stopid: '202', stopnm: 'Howard & Ridge', direction: 'Westbound' },
    { stopid: '203', stopnm: 'Ridge & Main', direction: 'Westbound' },
    { stopid: '204', stopnm: 'Ridge & Greenleaf', direction: 'Westbound' },
    { stopid: '205', stopnm: 'Ridge & Oakton', direction: 'Westbound' }
];


// Function to populate Start Stop dropdown with a placeholder
function populateStartStop() {
    startStopSelect.innerHTML = '<option value="" disabled selected>Select Start Stop</option>';
    // Shuffle the stops array
    const shuffledStops = stops.sort(() => Math.random() - 0.5);

    shuffledStops.forEach(stop => {
        const option = document.createElement('option');
        option.value = stop.stopid;
        option.textContent = stop.stopnm;
        startStopSelect.appendChild(option);
    });
}

// Function to filter End Stop options based on selected Start Stop
function updateEndStopOptions() {
    endStopSelect.innerHTML = '<option value="" disabled selected>Select End Stop</option>';

    const selectedStartStopId = startStopSelect.value;
    const selectedStartStop = stops.find(stop => stop.stopid === selectedStartStopId);

    if (!selectedStartStop) return;

    // Filter stops based on the same direction as the selected Start Stop
    stops
        .filter(stop => stop.direction === selectedStartStop.direction && stop.stopid !== selectedStartStopId)
        .forEach(stop => {
            const option = document.createElement('option');
            option.value = stop.stopid;
            option.textContent = stop.stopnm;
            endStopSelect.appendChild(option);
        });
}

// Initial call to populate Start Stop dropdown
populateStartStop();

// Update End Stop options when Start Stop changes
startStopSelect.addEventListener('change', updateEndStopOptions);

// Fetch direction when the button is clicked
getDirectionBtn.addEventListener('click', async () => {
    const startStop = startStopSelect.value;
    const endStop = endStopSelect.value;

    if (!startStop || !endStop) {
        resultDiv.textContent = 'Please select both start and end stops.';
        resultDiv.style.color = 'red';
        return;
    }

    try {
        const response = await fetch(`/directions-between-stops?routeId=1&startStop=${startStop}&endStop=${endStop}`);
        const data = await response.json();

        if (data.error) {
            resultDiv.textContent = `Error: ${data.error}`;
            resultDiv.style.color = 'red';
        } else {
            resultDiv.textContent = data.message;
            resultDiv.style.color = 'green';
        }
    } catch (error) {
        resultDiv.textContent = 'Failed to fetch direction';
        resultDiv.style.color = 'red';
    }
});


const stops201 = {
    eastbound: [
        { stopid: 17301, name: "Sheridan & Lincoln" },
        { stopid: 18357, name: "Sheridan & Haven" },
        { stopid: 17295, name: "Sheridan & Foster" },
        { stopid: 17302, name: "Chicago & Sheridan" },
        { stopid: 15318, name: "Chicago & Clark" },
        { stopid: 14403, name: "Chicago Avenue & Church" },
        { stopid: 14692, name: "Chicago Avenue & Davis" },
        { stopid: 14693, name: "Davis & Orrington" },
        { stopid: 14405, name: "Davis & Benson" },
        { stopid: 12686, name: "Davis & Maple" },
        { stopid: 12687, name: "Davis & Oak" },
        { stopid: 12691, name: "Ridge & Davis" },
        { stopid: 12692, name: "Ridge & Grove" },
        { stopid: 14271, name: "Ridge & Lake" },
        { stopid: 14269, name: "Ridge & Greenwood" },
        { stopid: 18709, name: "Howard & Dempster" },
        { stopid: 14267, name: "Ridge & Crain" },
        { stopid: 14265, name: "Ridge & Greenleaf" },
        { stopid: 14263, name: "Ridge & Lee" },
        { stopid: 12695, name: "Ridge & Main" },
        { stopid: 14261, name: "Ridge & Washington" },
        { stopid: 14259, name: "Ridge & Monroe" },
        { stopid: 14257, name: "Ridge & Seward" },
        { stopid: 14255, name: "Ridge & Oakton" },
        { stopid: 13148, name: "Ridge & Hull Terrace" },
        { stopid: 14338, name: "Ridge & Mulford" },
        { stopid: 14334, name: "Ridge & Brummel" },
        { stopid: 3629, name: "Howard & Ridge" }
    ],
    westbound: [
        { stopid: 3517, name: "Howard & Ridge" },
        { stopid: 14333, name: "Ridge & Brummel" },
        { stopid: 18322, name: "Ridge & Mulford" },
        { stopid: 13149, name: "Ridge & Hull Terrace" },
        { stopid: 14270, name: "Ridge & Austin" },
        { stopid: 14254, name: "Ridge & Oakton" },
        { stopid: 14256, name: "Ridge & Seward" },
        { stopid: 14258, name: "Ridge & Monroe" },
        { stopid: 12694, name: "Ridge & Washington" },
        { stopid: 14262, name: "Ridge & Main" },
        { stopid: 14264, name: "Ridge & Lee" },
        { stopid: 14266, name: "Ridge & Greenleaf" },
        { stopid: 14267, name: "Ridge & Crain" },
        { stopid: 14269, name: "Ridge & Dempster" },
        { stopid: 14271, name: "Ridge & Greenwood" },
        { stopid: 12692, name: "Ridge & Lake" },
        { stopid: 12693, name: "Ridge & Grove" },
        { stopid: 12690, name: "Ridge & Davis" },
        { stopid: 12689, name: "Ridge & Church" },
        { stopid: 12680, name: "Church & Maple" },
        { stopid: 12708, name: "Church & Benson" },
        { stopid: 12648, name: "Church & Sherman" },
        { stopid: 3513, name: "Church & Chicago Avenue" },
        { stopid: 18354, name: "Sheridan & Emerson" },
        { stopid: 17296, name: "Sheridan & Foster" },
        { stopid: 18355, name: "Sheridan & Haven" },
        { stopid: 18356, name: "Sheridan & Lincoln" }
    ]
};
const directionSelect = document.getElementById('direction');
const currentStopSelect = document.getElementById('currentStop');
const destStopSelect = document.getElementById('destStop');
directionSelect.addEventListener('change', function() {
    const direction = directionSelect.value;
    updateStops(direction);
});
function updateStops(direction) {
    // Clear existing options
    currentStopSelect.innerHTML = '<option value="" disabled selected>Select Start Stop</option>';
    destStopSelect.innerHTML = '<option value="" disabled selected>Select End Stop</option>';

    // Get stops based on direction
    const stopsList = stops201[direction];
    stopsList.forEach(stop => {
        const option = document.createElement('option');
        option.value = stop.stopid;
        option.textContent = stop.name;
        currentStopSelect.appendChild(option);
        destStopSelect.appendChild(option.cloneNode(true));
    });
}
document.getElementById('getStopsAwayBtn').addEventListener('click', async function() {
    const currentStop = document.getElementById('currentStop').value;
    const direction = document.getElementById('direction').value;
    const destinationStop = document.getElementById('destStop').value;
    const resultDiv = document.getElementById('stopsresult');
    // console.log(currentStop, direction, destinationStop, resultDiv);
    
    try {
        // http://localhost:8080/stopsaway?cstop=14334&dir=Eastbound&dstop=17301
        const response = await fetch(`/stopsaway?cstop=${currentStop}&dir=${direction}&dstop=${destinationStop}`);
        const data = await response.json();
        console.log(data);

        if (data) {
            resultDiv.textContent = `There are ${data} stops between your chosen locations.`;
            resultDiv.style.color = 'green';
        } else {
            resultDiv.textContent = `Error: ${data.error}`;
            resultDiv.style.color = 'red';
        }
    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
    }
});