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
