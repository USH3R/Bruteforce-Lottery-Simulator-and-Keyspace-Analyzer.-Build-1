// Keyspace Analyzer Simulation

let totalComb = 0;
let timeEst = 0;
let running = false;
let interval;

const totalCombSpan = document.getElementById("totalComb");
const timeEstSpan = document.getElementById("timeEst");
const statusSpan = document.getElementById("status");
const logDiv = document.getElementById("eventLog");

function logEvent(message) {
    logDiv.innerHTML = `[LOG] ${message}<br>` + logDiv.innerHTML;
}

// Estimate keyspace function
function calculateKeyspace(numbers = 6, maxNum = 49) {
    totalComb = factorial(maxNum) / (factorial(numbers) * factorial(maxNum - numbers));
    timeEst = (totalComb / 1000000).toFixed(2); // assuming 1M attempts/sec
    totalCombSpan.textContent = totalComb.toLocaleString();
    timeEstSpan.textContent = `${timeEst} sec`;
    logEvent(`Calculated keyspace for ${numbers} numbers from 1-${maxNum}`);
}

function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Auto-simulate brute force
function autoSimulate() {
    if (running) return;
    running = true;
    statusSpan.textContent = "Running";

    let attempts = 0;
    interval = setInterval(() => {
        attempts += Math.floor(Math.random() * 10000) + 1;
        logEvent(`Simulated ${attempts.toLocaleString()} attempts`);
        if (attempts >= totalComb) {
            clearInterval(interval);
            statusSpan.textContent = "Completed";
            logEvent("Brute force completed!");
            running = false;
        }
    }, 100);
}

// Reset analyzer
function resetAnalyzer() {
    clearInterval(interval);
    totalComb = 0;
    timeEst = 0;
    running = false;
    totalCombSpan.textContent = "0";
    timeEstSpan.textContent = "0 sec";
    statusSpan.textContent = "Idle";
    logEvent("Analyzer reset.");
}

// Event listeners
document.getElementById("calcOne").addEventListener("click", () => calculateKeyspace());
document.getElementById("calcAuto").addEventListener("click", autoSimulate);
document.getElementById("resetBtn").addEventListener("click", resetAnalyzer);
