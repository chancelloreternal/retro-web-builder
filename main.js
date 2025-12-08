// Toggle section expansion
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.toggle('expanded');
    }
}

// Function to open radio
function openRadio() {
    // Option 1: Open in new window
    window.open('YOUR_RADIO_URL_HERE', '_blank', 'width=800,height=600');
    
    // Option 2: Open in modal/overlay (uncomment to use instead)
    /*
    const modal = document.createElement('div');
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 9999; display: flex; align-items: center; justify-content: center;';
    modal.innerHTML = `
        <div style="position: relative; width: 90%; max-width: 800px; height: 80%;">
            <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: -40px; right: 0; background: #d4af37; border: none; color: #1a0a2e; padding: 10px 20px; cursor: pointer; font-weight: bold;">Close</button>
            <iframe src="YOUR_RADIO_URL_HERE" style="width: 100%; height: 100%; border: 3px solid #d4af37;"></iframe>
        </div>
    `;
    document.body.appendChild(modal);
    */
}

// Function to open music playlist
function openMusicPlaylist() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.id = 'music-modal';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(13, 5, 32, 0.95); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px;';
    
    modal.innerHTML = `
        <div style="position: relative; width: 100%; max-width: 700px; background: linear-gradient(145deg, #2d1b4e, #1a0a2e); border: 3px solid #d4af37; padding: 40px; box-shadow: 0 0 30px rgba(212, 175, 55, 0.5);">
            <button onclick="document.getElementById('music-modal').remove()" style="position: absolute; top: 10px; right: 10px; background: linear-gradient(145deg, #8b4513, #6b3410); border: 2px solid #d4af37; color: #fff; padding: 8px 15px; cursor: pointer; font-weight: bold; font-family: Orbitron, sans-serif;">✕ Close</button>
            
            <h2 style="font-family: Cinzel, serif; color: #d4af37; text-align: center; margin-bottom: 30px; font-size: 2em; text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);">🎵 Music Playlist</h2>
            
            <div style="text-align: center; margin-bottom: 20px;">
                <input type="file" id="musicFiles" accept="audio/*" multiple style="display: none;">
                <label for="musicFiles" style="display: inline-block; background: linear-gradient(145deg, #c0c0c0, #a8a8a8); border: 2px solid #d4af37; color: #1a0a2e; padding: 15px 30px; cursor: pointer; font-weight: bold; font-family: Orbitron, sans-serif; box-shadow: 0 0 0 1px #d4af37, 2px 2px 5px rgba(0, 0, 0, 0.5);">Upload Music Files</label>
            </div>
            
            <div id="playlist" style="max-height: 250px; overflow-y: auto; margin-bottom: 20px; background: rgba(13, 5, 32, 0.5); border: 2px solid #6b5b95; padding: 10px;"></div>
            
            <audio id="audioPlayer" controls style="width: 100%; margin-top: 20px; background: #000;"></audio>
            
            <div id="nowPlaying" style="text-align: center; color: #d4af37; margin-top: 15px; font-size: 0.9em; font-family: Orbitron, sans-serif;">No track loaded</div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialize music player after adding to DOM
    setTimeout(() => initMusicPlayer(), 100);
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
                songItem.textContent = `▶ ${file.name}`;
                songItem.style.cssText = 'padding: 10px; margin: 5px 0; background: rgba(107, 91, 149, 0.2); border: 1px solid #6b5b95; cursor: pointer; color: #e0e0e0; transition: all 0.3s ease; font-family: Orbitron, sans-serif; font-size: 0.9em;';
                
                songItem.onmouseover = () => {
                    songItem.style.background = 'rgba(212, 175, 55, 0.3)';
                    songItem.style.borderColor = '#d4af37';
                };
                songItem.onmouseout = () => {
                    songItem.style.background = 'rgba(107, 91, 149, 0.2)';
                    songItem.style.borderColor = '#6b5b95';
                };
                
                songItem.onclick = () => {
                    audioPlayer.src = url;
                    audioPlayer.play();
                    nowPlaying.textContent = `Now Playing: ${file.name}`;
                    
                    // Highlight current song
                    document.querySelectorAll('#playlist > div').forEach(item => {
                        item.style.background = 'rgba(107, 91, 149, 0.2)';
                    });
                    songItem.style.background = 'rgba(212, 175, 55, 0.4)';
                };
                
                playlist.appendChild(songItem);
            }
        });
    });

    // Auto-play next song when current ends
    audioPlayer.addEventListener('ended', () => {
        const currentIndex = songs.findIndex(song => song.url === audioPlayer.src);
        if (currentIndex >= 0 && currentIndex < songs.length - 1) {
            const nextSong = songs[currentIndex + 1];
            audioPlayer.src = nextSong.url;
            audioPlayer.play();
            nowPlaying.textContent = `Now Playing: ${nextSong.name}`;
        }
    });
}

// Function to open guide
function openGuide() {
    const modal = document.createElement('div');
    modal.id = 'guide-modal';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(13, 5, 32, 0.95); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; overflow-y: auto;';
    
    modal.innerHTML = `
        <div style="position: relative; width: 100%; max-width: 900px; background: linear-gradient(145deg, #2d1b4e, #1a0a2e); border: 3px solid #d4af37; padding: 40px; box-shadow: 0 0 30px rgba(212, 175, 55, 0.5); margin: 20px 0;">
            <button onclick="document.getElementById('guide-modal').remove()" style="position: absolute; top: 10px; right: 10px; background: linear-gradient(145deg, #8b4513, #6b3410); border: 2px solid #d4af37; color: #fff; padding: 8px 15px; cursor: pointer; font-weight: bold; font-family: Orbitron, sans-serif;">✕ Close</button>
            
            <h2 style="font-family: Cinzel, serif; color: #d4af37; text-align: center; margin-bottom: 30px; font-size: 2.5em; text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);">📖 Guide</h2>
            
            <div style="color: #e0e0e0; line-height: 1.8; font-family: Orbitron, sans-serif;">
                <h3 style="color: #d4af37; font-family: Cinzel, serif; margin-top: 30px; font-size: 1.5em;">Welcome to The Citadel</h3>
                <p style="margin: 15px 0;">This is your personal fortress on the web. Explore the various sections and customize them to your needs.</p>
                
                <h3 style="color: #d4af37; font-family: Cinzel, serif; margin-top: 30px; font-size: 1.5em;">How to Navigate</h3>
                <p style="margin: 15px 0;">• Click the section headers to expand/collapse them<br>
                • Use the sidebar for quick access to Radio, Music, and Chat<br>
                • Add your own games and tools by editing the HTML file</p>
                
                <h3 style="color: #d4af37; font-family: Cinzel, serif; margin-top: 30px; font-size: 1.5em;">Sections Overview</h3>
                <p style="margin: 15px 0;"><strong style="color: #d4af37;">Tools Section:</strong> Utilities and productivity tools<br>
                <strong style="color: #d4af37;">Entertainment Quarter:</strong> Games and fun activities<br>
                <strong style="color: #d4af37;">Map Section:</strong> Your custom fantasy map</p>
                
                <!-- ADD MORE GUIDE CONTENT HERE -->
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Function to open chatroom
function openChatroom() {
    window.open('https://chatwith.io/s/the-citadel', '_blank', 'width=800,height=600');
}
