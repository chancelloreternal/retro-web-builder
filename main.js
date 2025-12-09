document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navItems = document.querySelectorAll('.nav-item');
    const expandBtns = document.querySelectorAll('.expand-btn');
    const entertainmentQuarter = document.querySelector('.entertainment-quarter');
    const chatModal = document.getElementById('chat-modal');
    const closeChat = document.querySelector('.close-chat');
    const sendMessageBtn = document.getElementById('send-message');
    const messageInput = document.getElementById('message-input');
    const chatMessages = document.getElementById('chat-messages');
    const gameCards = document.querySelectorAll('.game-card:not(.coming-soon)');
// Game loader functions
function loadPacman(container) {
    const iframe = document.createElement('iframe');
    iframe.src = 'games/pacman/index.html';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    container.appendChild(iframe);
}

function loadTetris(container) {
    const iframe = document.createElement('iframe');
    iframe.src = 'games/tetris/index.html';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    container.appendChild(iframe);
}

function load2048(container) {
    const iframe = document.createElement('iframe');
    iframe.src = 'games/2048/index.html';  // Update this path if needed
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    container.appendChild(iframe);
}
    // Initialize
    initChat();
    setupEventListeners();

    function setupEventListeners() {
        // Navigation
        navItems.forEach(item => {
            item.addEventListener('click', handleNavClick);
        });

        // Expand buttons
        expandBtns.forEach(btn => {
            btn.addEventListener('click', handleExpandClick);
        });

        // Chat
        closeChat.addEventListener('click', () => {
            chatModal.style.display = 'none';
        });

        sendMessageBtn.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        // Game cards
        gameCards.forEach(card => {
            card.addEventListener('click', handleGameCardClick);
        });
    }

    function handleNavClick() {
        navItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        const section = this.dataset.section;
        if (section === 'chat') {
            chatModal.style.display = 'flex';
            messageInput.focus();
        }
    }

    function handleExpandClick(e) {
        e.stopPropagation();
        const panel = this.dataset.panel;
        
        if (panel === 'entertainment') {
            entertainmentQuarter.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-chevron-left');
            icon.classList.toggle('fa-chevron-right');
        }
    }

    function initChat() {
        const sampleMessages = [
            { user: "System", text: "Welcome to Citadel Chat" },
            { user: "Traveler", text: "Hello everyone! Just arrived at Citadel." },
            { user: "Guide", text: "Welcome! Check out the Entertainment Quarter!" }
        ];

        sampleMessages.forEach(msg => addChatMessage(msg.user, msg.text));
    }

    function addChatMessage(user, text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `
            <span class="username">${user}:</span>
            <span class="message-text">${text}</span>
        `;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            addChatMessage('You', message);
            messageInput.value = '';
            
            // Simulate response
            if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
                setTimeout(() => {
                    addChatMessage('Citizen', 'Hello there! Welcome to Citadel!');
                }, 500);
            }
        }
    }

function handleGameCardClick() {
    const game = this.dataset.game;
    const gameTitle = this.querySelector('h3').textContent;
    
    // Set game title
    document.getElementById('game-title').textContent = gameTitle;
    
    // Get the game modal and frame
    const gameModal = document.getElementById('game-modal');
    const gameFrame = document.getElementById('game-frame');
    
    // Clear previous game
    gameFrame.innerHTML = '';
    
    // Load the appropriate game
    switch(game) {
        case 'pacman':
            loadPacman(gameFrame);
            break;
        case 'tetris':
            loadTetris(gameFrame);
            break;
        case '2048':
            load2048(gameFrame);
            break;
        default:
            gameFrame.innerHTML = `
                <div class="game-placeholder">
                    <p>Game loading...</p>
                    <p class="small">(Game not implemented yet: ${gameTitle})</p>
                </div>
            `;
    }
    
    // Show the modal
    gameModal.style.display = 'block';
    
    // Close button
    const closeBtn = gameModal.querySelector('.close-game');
    closeBtn.onclick = () => {
        gameModal.style.display = 'none';
    };
    
    // Close when clicking outside
    window.onclick = (event) => {
        if (event.target === gameModal) {
            gameModal.style.display = 'none';
        }
    };
}
        document.body.appendChild(gameContainer);
    // Add some retro console logging for fun
    console.log('%c CITADEL v1.0', 'color: #ffd700; font-size: 2em; font-weight: bold;');
    console.log('%c Welcome to the Digital Metropolis', 'color: #e0e0e0;');
    console.log('%c Explore, Connect, Entertain', 'color: #b3b3b3; font-style: italic;');
});

// Add some retro effects
document.addEventListener('mousemove', function(e) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
    document.body.appendChild(cursor);
    
    // Remove cursor trail after animation
    setTimeout(() => {
        cursor.remove();
    }, 1000);
});
