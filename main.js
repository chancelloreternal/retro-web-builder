// Function to open sections
function openSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Hide welcome screen
    const welcome = document.getElementById('welcome');
    if (welcome) {
        welcome.style.display = 'none';
    }

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

// Function to open radio
function openRadio() {
    // Hide all sections and welcome
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    document.getElementById('welcome').style.display = 'none';

    // You can either:
    // 1. Open radio in a new window/tab:
    window.open('YOUR_RADIO_URL_HERE', '_blank', 'width=800,height=600');
    
    // 2. Or embed it in the content area (uncomment below and comment out window.open above):
    /*
    const contentArea = document.querySelector('.content-area');
    contentArea.innerHTML = `
        <div class="content-section" style="display: block;">
            <h2>Radio Station</h2>
            <div style="text-align: center;">
                <iframe src="YOUR_RADIO_URL_HERE" width="600" height="400" style="border: 3px solid #d4af37;"></iframe>
            </div>
        </div>
    `;
    */
}

// Function to open music playlist
function openMusicPlaylist() {
    // Hide all sections and welcome
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    document.getElementById('welcome').style.display = 'none';

    // Create music playlist section
    const contentArea = document.querySelector('.content-area');
    contentArea.innerHTML = `
        <div class="content-section" style="display: block;">
            <h2>Music Playlist</h2>
            <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(145deg, #1a0a2e, #0d0520); padding: 30px; border: 2px solid #6b5b95;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <input type="file" id="musicFiles" accept="audio/*" multiple style="display: none;">
                    <label for="musicFiles" style="display: inline-block; background: linear-gradient(145deg, #c0c0c0, #a8a8a8); border: 2px solid #d4af37; color: #1a0a2e; padding: 15px 30px; cursor: pointer; font-weight: bold;">
                        Upload Music Files
                    </label>
                </div>
                <div id="playlist" style="max-height: 300px; overflow-y: auto; margin-bottom: 20px;"></div>
                <audio id="audioPlayer" controls style="width: 100%; margin-top: 20px;"></audio>
                <div id="nowPlaying" style="text-align: center; color: #d4af37; margin-top: 15px; font-size: 0.9em;">No track loaded</div>
            </div>
        </div>
    `;

    // Initialize music player
    initMusicPlayer();
}

// Music player functionality
function initMusicPlayer() {
    const fileInput = document.getElementById('musicFiles');
    const playlist = document.getElementById('playlist');
    const audioPlayer = document.getElementById('audioPlayer');
    const nowPlaying = document.getElementById('nowPlaying');
    let songs = [];

    if (!fileInput || !playlist || !audioPlayer) return;

    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            if (file.type.startsWith('audio/')) {
                const url = URL.createObjectURL(file);
                const index = songs.length;
                songs.push({ name: file.name, url: url });
                
                const songItem = document.createElement('div');
                songItem.textContent = file.name;
                songItem.style.cssText = 'padding: 10px; margin: 5px 0; background: rgba(107, 91, 149, 0.2); border: 1px solid #6b5b95; cursor: pointer; color: #e0e0e0; transition: all 0.3s ease;';
                songItem.onmouseover = () => songItem.style.background = 'rgba(212, 175, 55, 0.2)';
                songItem.onmouseout = () => songItem.style.background = 'rgba(107, 91, 149, 0.2)';
                songItem.onclick = () => {
                    audioPlayer.src = url;
                    audioPlayer.play();
                    nowPlaying.textContent = `Now Playing: ${file.name}`;
                };
                playlist.appendChild(songItem);
            }
        });
    });

    // Auto-play next song when current ends
    audioPlayer.addEventListener('ended', () => {
        const currentIndex = songs.findIndex(song => song.url === audioPlayer.src);
        if (currentIndex < songs.length - 1) {
            const nextSong = songs[currentIndex + 1];
            audioPlayer.src = nextSong.url;
            audioPlayer.play();
            nowPlaying.textContent = `Now Playing: ${nextSong.name}`;
        }
    });
}

// Function to open guide
function openGuide() {
    // Hide all sections and welcome
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    document.getElementById('welcome').style.display = 'none';

    // Create guide section
    const contentArea = document.querySelector('.content-area');
    contentArea.innerHTML = `
        <div class="content-section" style="display: block;">
            <h2>Guide</h2>
            <div style="max-width: 800px; margin: 0 auto; padding: 20px; color: #e0e0e0; line-height: 1.8;">
                <h3 style="color: #d4af37; font-family: Cinzel, serif; margin-top: 30px;">Welcome to The Citadel</h3>
                <p>This is your guide section. Add your content here.</p>
                
                <h3 style="color: #d4af37; font-family: Cinzel, serif; margin-top: 30px;">How to Navigate</h3>
                <p>Use the sidebar buttons to explore different sections of The Citadel.</p>
                
                <!-- ADD MORE GUIDE CONTENT HERE -->
            </div>
        </div>
    `;
}

// Function to open chatroom
function openChatroom() {
    // Open chatroom in new window
    window.open('https://chatwith.io/s/the-citadel', '_blank', 'width=800,height=600');
}
