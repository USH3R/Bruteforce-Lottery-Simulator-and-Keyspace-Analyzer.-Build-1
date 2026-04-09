// ===== Brute Force Lottery Simulator =====

// Constants
const ticketPrice = 2; // $2 per ticket
const winningNumbersCount = 6;

// State
let ticketsBought = 0;
let totalSpent = 0;
let autoRunInterval = null;
let isAutoRunning = false;

// Generate winning numbers and jackpot
let winningNumbers = generateWinningNumbers();
let lotteryJackpot = generateJackpot();

// DOM Elements
const ticketsBoughtEl = document.getElementById("ticketsBought");
const totalSpentEl = document.getElementById("totalSpent");
const statusEl = document.getElementById("status");
const numbersEl = document.getElementById("winningNumbers");
const jackpotEl = document.getElementById("jackpotAmount");
const eventLog = document.getElementById("eventLog");

// Initialize UI
updateUI();
logEvent("System ready. Waiting for ticket purchase...");

// ===== Helper Functions =====

function generateWinningNumbers() {
    let nums = [];
    while (nums.length < winningNumbersCount) {
        let n = Math.floor(Math.random() * 50) + 1;
        if (!nums.includes(n)) nums.push(n);
    }
    return nums.sort((a,b) => a-b);
}

function generateJackpot() {
    // Random from 1M to 1B in 500K increments
    let min = 1_000_000;
    let max = 1_000_000_000;
    let step = 500_000;
    let count = Math.floor((max - min) / step);
    return min + step * Math.floor(Math.random() * count);
}

function updateUI() {
    ticketsBoughtEl.textContent = ticketsBought.toLocaleString();
    totalSpentEl.textContent = `$${totalSpent.toLocaleString()}`;
    numbersEl.textContent = winningNumbers.join(", ");
    jackpotEl.textContent = `$${lotteryJackpot.toLocaleString()}`;
    statusEl.textContent = isAutoRunning ? "Running" : "Paused";
}

function logEvent(message) {
    eventLog.innerHTML = `[LOG] ${message}<br>` + eventLog.innerHTML;
    eventLog.scrollTop = 0; // newest on top
}

// Simulate buying tickets
function buyTickets(count) {
    for (let i = 0; i < count; i++) {
        ticketsBought++;
        totalSpent += ticketPrice;

        // Each ticket generates random numbers
        let ticket = [];
        while (ticket.length < winningNumbersCount) {
            let n = Math.floor(Math.random() * 50) + 1;
            if (!ticket.includes(n)) ticket.push(n);
        }
        ticket.sort((a,b) => a-b);

        // Check jackpot
        if (arraysEqual(ticket, winningNumbers)) {
            logEvent(`JACKPOT HIT after ${ticketsBought.toLocaleString()} tickets!`);
            stopAutoRun();
            isAutoRunning = false;
            updateUI();
            return;
        }

        // Log every 10k tickets
        if (ticketsBought % 10000 === 0) {
            logEvent(`${ticketsBought.toLocaleString()} attempts. No match.`);
        }
    }
    updateUI();
}

// ===== Button Handlers =====
document.getElementById("buyOne").addEventListener("click", () => buyTickets(1));
document.getElementById("buyHundred").addEventListener("click", () => buyTickets(100));

document.getElementById("autoRun").addEventListener("click", () => {
    if (!isAutoRunning) startAutoRun();
});

document.getElementById("pauseRun").addEventListener("click", () => {
    if (isAutoRunning) stopAutoRun();
});

document.getElementById("reset").addEventListener("click", () => {
    stopAutoRun();
    ticketsBought = 0;
    totalSpent = 0;
    winningNumbers = generateWinningNumbers();
    lotteryJackpot = generateJackpot();
    logEvent("Simulator reset. New winning numbers generated.");
    updateUI();
});

// ===== Auto Run =====
function startAutoRun() {
    isAutoRunning = true;
    updateUI();
    logEvent("Auto-Run started.");

    autoRunInterval = setInterval(() => {
        buyTickets(10000); // buys 10k tickets per tick
        if (!isAutoRunning) stopAutoRun();
    }, 100);
}

function stopAutoRun() {
    isAutoRunning = false;
    clearInterval(autoRunInterval);
    logEvent("Auto-Run paused.");
    updateUI();
}

// ===== Utility =====
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
}
