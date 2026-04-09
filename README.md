Build 1 of Bruteforce Simulator and Analyzer
Build 1 is only the simulator portion of the game.

/bruteforce-lottery-simulator
│
├── index.html        # Browser version
├── style.css         # Browser styling
├── script.js         # Game logic
├── simulator.py      # Optional terminal version
├── run.sh            # Bash script to run terminal version
└── README.md         # Instructions

# Playing the Game
You can run the game in two ways: **Browser Version** (interactive with buttons) or  
**Terminal Version** (works anywhere, including Codespaces).  
---  
### 1️⃣ Browser Version (Desktop Only)  
1. Clone or download this repository to your computer.  
2. Click on to open the `index.html` file in your favorite web browser.  
3. Use the buttons to generate tickets:  
   - **Buy 1 Ticket** – generates a single ticket  
   - **Buy 100 Tickets** – generates 100 tickets at once  
   - **Auto-Run** – automatically generates tickets until a jackpot is hit  
4. Watch the simulator run and see your stats:  
   - Total tickets generated  
   - Total money spent  
   - Time taken until jackpot  
> Note: The browser version is visual and interactive but only works on desktop or laptops.  
---  
### 2️⃣ Terminal Version (Any Device, Including Codespaces)  
1. Open your GitHub repository in **Codespaces** or any terminal environment.  
2. Ensure the terminal is in the project folder where `run.sh` exists.  
3. Run the simulator with a single command:  bash run.sh  
