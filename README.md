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

# Running the Game via GitHub Codespaces or Terminal  
1. Open this repository in **GitHub Codespaces** (or any environment that lets you open a terminal from the repo).  
2. In the terminal, navigate to the project folder containing `run.sh`.  
3. Run the following command:  bash run.sh  
This will automatically launch the game in a new browser tab, where you can play it exactly like you would if you had cloned the repo locally.  
Playing the Game  
Buy 1 Ticket – generates a single lottery ticket  
Buy 100 Tickets – generates 100 tickets at once  
Auto-Run – automatically generates tickets until a jackpot is hit  
  
The game will show:    
Total tickets generated  
Total money spent  
Time taken until the jackpot  

Note: The game runs entirely in the browser. The terminal command bash run.sh is just a launcher — the simulation never runs inside the terminal.
