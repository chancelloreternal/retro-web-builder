/*
 * CITADEL - MAIN JAVASCRIPT FILE
 * This file handles all the game loading and UI interactions
 */

// ============================================================================
// GAME LOADER FUNCTIONS
// ============================================================================
// Each game should have its own loader function that takes a container element
// and loads the game into it using an iframe

// Example for 2048 game
function load2048(container) {
    /* 
     * Loads the 2048 game
     * Make sure you have a folder at: /games/2048/ with index.html inside
     */
    const iframe = document.createElement('iframe');
    iframe.src = 'games/2048/index.html';  // Path to your game's main HTML file
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    container.appendChild(iframe);
}

/* 
 * HOW TO ADD ANOTHER GAME:
 * 
 * 1. Create a loader function like this:
 * 
 * function loadGameName(container) {
 *     const iframe = document.createElement('iframe');
 *     iframe.src = 'games/GAME_FOLDER_NAME/index.html';
 *     iframe.style.width = '100%';
 *     iframe.style.height = '100%';
 *     iframe.style.border = 'none';
 *     container.appendChild(iframe);
 * }
 * 
 * 2. Add a case in the handleGameCardClick function below
 */

// ============================================================================
// EVENT LISTENERS
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Game card click handler
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', handleGameCardClick);
    });

    // Navigation
    document.querySelectorAll('.side-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });

    // Toggle entertainment panel
    document.querySelector('.toggle-panel').addEventListener('click', () => {
        document.querySelector('.entertainment-quarter').classList.toggle('collapsed');
    });

    // Close game modal
    document.querySelector('.close-game').addEventListener('click', () => {
        document.getElementById('game-modal').style.display = 'none';
    });
});

// ============================================================================
// GAME CARD CLICK HANDLER
// ============================================================================
function handleGameCardClick() {
    const game = this.dataset.game;
    const gameTitle = this.querySelector('h3').textContent;
    
    // Set game title in modal
    document.getElementById('game-title').textContent = gameTitle;
    
    const gameModal = document.getElementById('game-modal');
    const gameFrame = document.getElementById('game-frame');
    
    // Clear previous game
    gameFrame.innerHTML = '';
    
    // ===========================================
    // ADD NEW GAMES HERE
    // ===========================================
    // For each new game, add a new case like this:
    // case 'GAME_FOLDER_NAME':
    //     loadGameFunction(gameFrame);
    //     break;
    // ===========================================
    
    switch(game) {
        case '2048':
            load2048(gameFrame);
            break;
        // Add more games here following the same pattern
        // case 'pacman':
        //     loadPacman(gameFrame);
        //     break;
        default:
            gameFrame.innerHTML = `
                <div class="game-placeholder">
                    <p>Game loading...</p>
                    <p class="small">(Game not implemented yet: ${gameTitle})</p>
                    <p class="small">To add this game:</p>
                    <ol class="small">
                        <li>Create a folder in /games/${game}/</li>
                        <li>Add the game files there</li>
                        <li>Create a loader function in main.js</li>
                        <li>Add a case in the switch statement</li>
                    </ol>
                </div>
            `;
    }
    
    // Show the modal
    gameModal.style.display = 'block';
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
}

// Close modal when clicking outside
window.onclick = (event) => {
    const modal = document.getElementById('game-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
