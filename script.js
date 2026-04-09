// script.js

let ticketsBought = 0;
let totalSpent = 0;
let autoRunInterval = null;
const ticketCost = 2; // $2 per ticket
const maxAutoPurchases = 50;
const ticketsPerAuto = 10000;

const winningNumbersElem = document.getElementById("numbers");
const jackpotElem = document.getElementById("jackpotAmount");
const ticketsBoughtElem = document.getElementById("ticketsBought");
const totalSpentElem = document.getElementById("totalSpent");
const statusElem = document.getElementById("status");
const eventLog = document.getElementById("eventLog");

// Generate winning numbers 1-50 for simulation
function generateWinningNumbers() {
    let nums = [];
    while (nums.length < 6) {
        let n = Math.floor(Math.random() * 50) + 1;
        if (!nums.includes(n)) nums.push(n);
    }
    return nums;
}

// Generate jackpot random $1M - $1B increments $500k
function generateJackpot() {
    const min = 1000000;
    const max = 1000000000;
    const step = 500000;
    let rand = Math.floor(Math.random() * ((max - min) / step + 1));
    return min + rand * step;
}

// Current winning numbers and jackpot
let winningNumbers = generateWinningNumbers();
let jackpot = generateJackpot();

// Display
function updateDisplay() {
    winningNumbersElem.textContent = winningNumbers.join(", ");
    jackpotElem.textContent = "$" + jackpot.toLocaleString();
    ticketsBoughtElem.textContent = ticketsBought.toLocaleString();
    totalSpentElem.textContent = "$" + totalSpent.toLocaleString();
}

function logEvent(message) {
    eventLog.innerHTML = `[LOG] ${message}<br>` + eventLog.innerHTML;
    eventLog.scrollTop = 0; // keep newest at top
}

function checkTickets(purchaseCount) {
    for (let i = 0; i < purchaseCount; i++) {
        ticketsBought++;
        totalSpent += ticketCost;

        let userTicket = [];
        while (userTicket.length < 6) {
            let n = Math.floor(Math.random() * 50) + 1;
            if (!userTicket.includes(n)) userTicket.push(n);
        }

        let match = winningNumbers.every(num => userTicket.includes(num));
        if (match) {
            logEvent(`JACKPOT HIT after ${ticketsBought.toLocaleString()} tickets!`);
            statusElem.textContent = "Paused - Jackpot Won!";
            clearInterval(autoRunInterval);
            autoRunInterval = null;
            break;
        } else if (ticketsBought % 10000 === 0 || purchaseCount === 1) {
            logEvent(`${ticketsBought.toLocaleString()} attempts. No match.`);
        }
    }
    updateDisplay();
}

// Button handlers
document.getElementById("buyOne").addEventListener("click", () => checkTickets(1));
document.getElementById("buyHundred").addEventListener("click", () => checkTickets(100));

document.getElementById("autoRun").addEventListener("click", () => {
    if (autoRunInterval) return;
    statusElem.textContent = "Running";
    let purchases = 0;
    autoRunInterval = setInterval(() => {
        checkTickets(ticketsPerAuto);
        purchases++;
        if (purchases >= maxAutoPurchases) {
            clearInterval(autoRunInterval);
            autoRunInterval = null;
            statusElem.textContent = "Paused - Auto-Run Complete";
        }
    }, 100); // small delay for UI updates
});

document.getElementById("pauseRun").addEventListener("click", () => {
    if (autoRunInterval) {
        clearInterval(autoRunInterval);
        autoRunInterval = null;
        statusElem.textContent = "Paused";
    }
});

document.getElementById("reset").addEventListener("click", () => {
    ticketsBought = 0;
    totalSpent = 0;
    winningNumbers = generateWinningNumbers();
    jackpot = generateJackpot();
    statusElem.textContent = "Paused";
    logEvent("[SYSTEM] Reset completed. Ready for brute force...");
    updateDisplay();
});

// Initial display
updateDisplay();
logEvent("[SYSTEM] Ready for brute force...");// ===== Brute Force Lottery Simulator =====

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
