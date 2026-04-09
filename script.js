let ticketsBought = 0;
let totalSpent = 0;
let autoRunInterval = null;

const ticketCost = 2;           // $2 per ticket
const maxAutoPurchases = 50;    // Auto-run limit
const ticketsPerAuto = 10000;   // Tickets per auto-run batch
const maxGuaranteedWin = 500000; // Jackpot guaranteed in this many tickets

// DOM Elements
const winningNumbersElem = document.getElementById("numbers");
const jackpotElem = document.getElementById("jackpotAmount");
const ticketsBoughtElem = document.getElementById("ticketsBought");
const totalSpentElem = document.getElementById("totalSpent");
const statusElem = document.getElementById("status");
const eventLog = document.getElementById("eventLog");

// Generate 6 unique numbers 1-50
function generateWinningNumbers() {
    let nums = [];
    while (nums.length < 6) {
        let n = Math.floor(Math.random() * 50) + 1;
        if (!nums.includes(n)) nums.push(n);
    }
    return nums;
}

// Generate jackpot $1M - $1B increments of $500k
function generateJackpot() {
    const min = 1000000;
    const max = 1000000000;
    const step = 500000;
    const rand = Math.floor(Math.random() * ((max - min) / step + 1));
    return min + rand * step;
}

// Current numbers, jackpot, guaranteed win ticket
let winningNumbers = generateWinningNumbers();
let jackpot = generateJackpot();
let guaranteedWinTicket = Math.floor(Math.random() * maxGuaranteedWin) + 1;

// ===== Display Update =====
function updateDisplay() {
    winningNumbersElem.textContent = winningNumbers.join(", ");
    jackpotElem.textContent = `$${jackpot.toLocaleString()}`;
    ticketsBoughtElem.textContent = ticketsBought.toLocaleString();
    totalSpentElem.textContent = `$${totalSpent.toLocaleString()}`;
}

// ===== Event Log =====
function logEvent(message) {
    eventLog.innerHTML = `[LOG] ${message}<br>` + eventLog.innerHTML;
    eventLog.scrollTop = 0; // newest at top
}

// ===== Ticket Checking =====
function checkTickets(purchaseCount) {
    for (let i = 0; i < purchaseCount; i++) {
        ticketsBought++;
        totalSpent += ticketCost;

        // Auto jackpot trigger within guaranteed range
        let match = ticketsBought === guaranteedWinTicket;

        if (!match) {
            // Only check random match if NOT guaranteed
            let userTicket = [];
            while (userTicket.length < 6) {
                let n = Math.floor(Math.random() * 50) + 1;
                if (!userTicket.includes(n)) userTicket.push(n);
            }
            match = winningNumbers.every(num => userTicket.includes(num));
        }

        if (match) {
            logEvent(`JACKPOT HIT after ${ticketsBought.toLocaleString()} tickets!`);
            statusElem.textContent = "Paused - Jackpot Won!";
            clearInterval(autoRunInterval);
            autoRunInterval = null;
            break;
        } else if (purchaseCount === 1 || purchaseCount === 100 || ticketsBought % 10000 === 0) {
            logEvent(`${ticketsBought.toLocaleString()} attempts. No match.`);
        }
    }
    updateDisplay();
}

// ===== Button Handlers =====
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
    }, 100);
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
    guaranteedWinTicket = Math.floor(Math.random() * maxGuaranteedWin) + 1;
    statusElem.textContent = "Paused";
    logEvent("[SYSTEM] Reset completed. Ready for brute force...");
    updateDisplay();
});

// ===== Initial Update =====
updateDisplay();
logEvent("[SYSTEM] Ready for brute force...");
