// Brute Force Lottery Simulator with Event Log

// Game settings
const TICKET_PRICE = 2;      // Cost per ticket
const NUMBERS_PER_TICKET = 6;
const MAX_NUMBER = 49;

// State variables
let winningNumbers = generateWinningNumbers();
let ticketsBought = 0;
let totalSpent = 0;
let autoRunInterval = null;

// UI Elements
const winningNumbersEl = document.getElementById("winningNumbers");
const ticketsBoughtEl = document.getElementById("ticketsBought");
const totalSpentEl = document.getElementById("totalSpent");
const statusEl = document.getElementById("status");
const eventLogEl = document.getElementById("eventLog");

const buy1Btn = document.getElementById("buy1");
const buy100Btn = document.getElementById("buy100");
const autoRunBtn = document.getElementById("autoRun");

// Initialize UI
winningNumbersEl.textContent = [...winningNumbers].join(", ");
updateUI();

// Event Listeners
buy1Btn.addEventListener("click", () => buyTickets(1));
buy100Btn.addEventListener("click", () => buyTickets(100));
autoRunBtn.addEventListener("click", toggleAutoRun);

// Functions
function generateWinningNumbers() {
    let numbers = new Set();
    while (numbers.size < NUMBERS_PER_TICKET) {
        numbers.add(Math.floor(Math.random() * MAX_NUMBER) + 1);
    }
    return numbers;
}

function generateTicket() {
    let ticket = new Set();
    while (ticket.size < NUMBERS_PER_TICKET) {
        ticket.add(Math.floor(Math.random() * MAX_NUMBER) + 1);
    }
    return ticket;
}

function buyTickets(count) {
    for (let i = 0; i < count; i++) {
        ticketsBought++;
        totalSpent += TICKET_PRICE;
        let ticket = generateTicket();

        // Jackpot check
        if (isJackpot(ticket)) {
            updateUI();
            statusEl.textContent = "🎉 JACKPOT HIT! 🎉";
            logEvent(`[SUCCESS] Jackpot hit after ${ticketsBought.toLocaleString()} tickets!`);
            if (autoRunInterval) clearInterval(autoRunInterval);
            return;
        }

        // Event log update every 10k tickets
        if (ticketsBought % 10000 === 0) {
            logEvent(`[LOG] ${ticketsBought.toLocaleString()} attempts. No match.`);
        }
    }
    updateUI();
}

function isJackpot(ticket) {
    if (ticket.size !== winningNumbers.size) return false;
    for (let num of ticket) {
        if (!winningNumbers.has(num)) return false;
    }
    return true;
}

function updateUI() {
    ticketsBoughtEl.textContent = ticketsBought;
    totalSpentEl.textContent = totalSpent;
}

function toggleAutoRun() {
    if (autoRunInterval) {
        clearInterval(autoRunInterval);
        autoRunInterval = null;
        autoRunBtn.textContent = "Auto-Run";
        statusEl.textContent = "Paused";
        logEvent("[SYSTEM] Auto-Run paused.");
    } else {
        autoRunBtn.textContent = "Stop Auto-Run";
        statusEl.textContent = "Running...";
        logEvent("[SYSTEM] Auto-Run started.");
        autoRunInterval = setInterval(() => buyTickets(1000), 50);
    }
}

// Utility function to add events to the log
function logEvent(message) {
    eventLogEl.innerHTML = message + "<br>" + eventLogEl.innerHTML;
    eventLogEl.scrollTop = 0; // Keep newest at top
}// Brute Force Lottery Simulator with Event Log

// Game settings
const TICKET_PRICE = 2;      // Cost per ticket
const NUMBERS_PER_TICKET = 6;
const MAX_NUMBER = 49;

// State variables
let winningNumbers = generateWinningNumbers();
let ticketsBought = 0;
let totalSpent = 0;
let autoRunInterval = null;

// UI Elements
const winningNumbersEl = document.getElementById("winningNumbers");
const ticketsBoughtEl = document.getElementById("ticketsBought");
const totalSpentEl = document.getElementById("totalSpent");
const statusEl = document.getElementById("status");
const eventLogEl = document.getElementById("eventLog");

const buy1Btn = document.getElementById("buy1");
const buy100Btn = document.getElementById("buy100");
const autoRunBtn = document.getElementById("autoRun");

// Initialize
winningNumbersEl.textContent = [...winningNumbers].join(", ");
eventLogEl.innerHTML = "[SYSTEM] Ready for brute force...<br>";

// Event Listeners
buy1Btn.addEventListener("click", () => buyTickets(1));
buy100Btn.addEventListener("click", () => buyTickets(100));
autoRunBtn.addEventListener("click", toggleAutoRun);

// Functions
function generateWinningNumbers() {
    let numbers = new Set();
    while (numbers.size < NUMBERS_PER_TICKET) {
        numbers.add(Math.floor(Math.random() * MAX_NUMBER) + 1);
    }
    return numbers;
}

function generateTicket() {
    let ticket = new Set();
    while (ticket.size < NUMBERS_PER_TICKET) {
        ticket.add(Math.floor(Math.random() * MAX_NUMBER) + 1);
    }
    return ticket;
}

function buyTickets(count) {
    for (let i = 0; i < count; i++) {
        ticketsBought++;
        totalSpent += TICKET_PRICE;
        let ticket = generateTicket();

        // Jackpot check
        if (isJackpot(ticket)) {
            updateUI();
            statusEl.textContent = "🎉 JACKPOT HIT! 🎉";
            logEvent(`[SUCCESS] Jackpot hit after ${ticketsBought.toLocaleString()} tickets!`);
            if (autoRunInterval) clearInterval(autoRunInterval);
            return;
        }

        // Event log update every 10k tickets
        if (ticketsBought % 10000 === 0) {
            logEvent(`[LOG] ${ticketsBought.toLocaleString()} attempts. No match.`);
        }
    }
    updateUI();
}

function isJackpot(ticket) {
    if (ticket.size !== winningNumbers.size) return false;
    for (let num of ticket) {
        if (!winningNumbers.has(num)) return false;
    }
    return true;
}

function updateUI() {
    ticketsBoughtEl.textContent = ticketsBought;
    totalSpentEl.textContent = totalSpent;
}

function toggleAutoRun() {
    if (autoRunInterval) {
        clearInterval(autoRunInterval);
        autoRunInterval = null;
        autoRunBtn.textContent = "Auto-Run";
        statusEl.textContent = "Paused";
        logEvent("[SYSTEM] Auto-Run paused.");
    } else {
        autoRunBtn.textContent = "Stop Auto-Run";
        statusEl.textContent = "Running...";
        logEvent("[SYSTEM] Auto-Run started.");
        autoRunInterval = setInterval(() => buyTickets(1000), 50);
    }
}

// Utility function to add events to the log
function logEvent(message) {
    eventLogEl.innerHTML = message + "<br>" + eventLogEl.innerHTML;
    eventLogEl.scrollTop = 0; // Keep newest at top
}
