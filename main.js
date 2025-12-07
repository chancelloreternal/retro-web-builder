// Global variables
const GIPHY_API_KEY = "KKDsobxyi7sfcmve7nwIASleRZcSd3jM" // Public demo key

let draggedElement = null
let elementCounter = 0
let currentTheme = "dark"

// Game URLs for embedding
const GAME_URLS = {
  run3: "https://run3.online/",
  pacman: "https://pacman.platzh1rsch.ch/",
  doom: "https://diekmann.github.io/wasm-fizzbuzz/doom/",
  tetris: "https://chvin.github.io/react-tetris/",
  "2048": "https://play2048.co/",
  snake: "https://patorjk.com/games/snake/",
  asteroids: "https://freeasteroids.org/",
  flappy: "https://flappybird.io/",
  invaders: "https://freeinvaders.org/",
  breakout: "https://elgoog.im/breakout/",
  minesweeper: "https://minesweeperonline.com/",
  chess: "https://lichess.org/"
}

const JSZip = window.JSZip

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  initializeDragAndDrop()
  setupCanvas()
})

// Initialize drag and drop functionality
function initializeDragAndDrop() {
  const draggableElements = document.querySelectorAll(".draggable-element")
  const canvas = document.getElementById("canvas")

  draggableElements.forEach((element) => {
    element.addEventListener("dragstart", handleDragStart)
    element.addEventListener("dragend", handleDragEnd)
    element.setAttribute("draggable", "true")
  })

  canvas.addEventListener("dragover", handleDragOver)
  canvas.addEventListener("drop", handleDrop)
}

function handleDragStart(e) {
  draggedElement = e.target.closest(".draggable-element")
  e.dataTransfer.effectAllowed = "copy"
  e.target.style.opacity = "0.5"
}

function handleDragEnd(e) {
  e.target.style.opacity = "1"
}

function handleDragOver(e) {
  e.preventDefault()
  e.dataTransfer.dropEffect = "copy"
}

function handleDrop(e) {
  e.preventDefault()

  if (!draggedElement) return

  const canvas = document.getElementById("canvas")
  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  createElement(draggedElement.dataset.type, x, y, draggedElement.dataset)
  draggedElement = null
}

// Create element on canvas
function createElement(type, x, y, data = {}) {
  const canvas = document.getElementById("canvas")
  const element = document.createElement("div")
  element.className = "canvas-element"
  element.style.left = x + "px"
  element.style.top = y + "px"
  element.id = "element-" + ++elementCounter

  element.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) return
    e.stopPropagation()

    document.querySelectorAll(".canvas-element").forEach((el) => {
      el.classList.remove("selected")
    })

    element.classList.add("selected")
  })

  // Add delete button
  const deleteBtn = document.createElement("button")
  deleteBtn.className = "delete-btn"
  deleteBtn.innerHTML = "×"
  deleteBtn.onclick = () => element.remove()
  element.appendChild(deleteBtn)

  // Create content based on type
  let content = ""
  switch (type) {
    case "text":
      content = '<div class="retro-text" contenteditable="true">Click to edit this text!</div>'
      break
    case "heading":
      content = '<div class="retro-heading" contenteditable="true">Your Fortress Heading!</div>'
      break
    case "marquee":
      content = '<div class="retro-marquee"><marquee>⚔️ Welcome to The Citadel! ⚔️</marquee></div>'
      break
    case "gif":
      content = `<img class="retro-gif" src="${data.src}" alt="GIF" width="150" height="150">`
      break
    case "construction":
      content = '<div class="construction-sign">🚧 UNDER CONSTRUCTION 🚧<br>Expanding the fortress!</div>'
      break
    case "guestbook":
      content = `
        <div class="guestbook">
          <h3>📖 Sign the Guestbook!</h3>
          <textarea placeholder="Leave your mark..." rows="3" cols="30"></textarea><br>
          <button>Sign</button>
        </div>
      `
      break
    case "counter":
      content = `
        <div class="visitor-counter">
          <div>Visitor #</div>
          <div style="font-size: 1.5em;">${Math.floor(Math.random() * 999999) + 1}</div>
        </div>
      `
      break
    case "game":
      const gameName = data.game
      const gameUrl = GAME_URLS[gameName]
      content = `
        <div class="game-container" style="width: 600px; height: 400px; background: #000; border: 3px solid #d4af37; box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);">
          <iframe src="${gameUrl}" style="width: 100%; height: 100%; border: none;"></iframe>
        </div>
      `
      break
    case "musicplayer":
      content = `
        <div class="citadel-music-player" style="width: 400px; background: linear-gradient(145deg, #2d1b4e, #1a0a2e); border: 3px solid #d4af37; padding: 20px; box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);">
          <h3 style="font-family: Cinzel, serif; color: #d4af37; text-align: center; margin: 0 0 15px 0;">🎵 Music Chamber</h3>
          <input type="file" id="musicFiles-${elementCounter}" accept="audio/*" multiple style="display: none;">
          <label for="musicFiles-${elementCounter}" style="display: block; background: linear-gradient(145deg, #c0c0c0, #a8a8a8); border: 2px solid #d4af37; color: #1a0a2e; padding: 10px; text-align: center; cursor: pointer; font-weight: bold; margin-bottom: 10px;">Upload Music</label>
          <div class="playlist-${elementCounter}" style="max-height: 150px; overflow-y: auto; margin-bottom: 10px;"></div>
          <audio id="audio-${elementCounter}" controls style="width: 100%; margin-top: 10px;"></audio>
          <div style="text-align: center; color: #d4af37; font-size: 0.9em; margin-top: 10px;">No track loaded</div>
        </div>
      `
      // Add music player functionality after element is added
      setTimeout(() => {
        initMusicPlayer(elementCounter)
      }, 100)
      break
    case "chatroom":
      content = `
        <div class="chatroom-widget" style="width: 300px; background: linear-gradient(145deg, #2d1b4e, #1a0a2e); border: 3px solid #d4af37; padding: 20px; text-align: center; box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);">
          <h3 style="font-family: Cinzel, serif; color: #d4af37; margin: 0 0 15px 0;">💬 War Council</h3>
          <button onclick="window.open('https://chatwith.io/s/the-citadel', '_blank', 'width=800,height=600')" style="background: linear-gradient(145deg, #c0c0c0, #a8a8a8); border: 2px solid #d4af37; color: #1a0a2e; padding: 15px 25px; cursor: pointer; font-weight: bold; font-size: 1em;">Enter Chatroom</button>
        </div>
      `
      break
  }

  element.innerHTML = content + element.innerHTML
  canvas.appendChild(element)

  makeElementDraggable(element)

  const welcomeMessage = document.querySelector(".welcome-message")
  if (welcomeMessage) {
    welcomeMessage.style.display = "none"
  }
}

// Initialize music player functionality
function initMusicPlayer(id) {
  const fileInput = document.getElementById(`musicFiles-${id}`)
  const playlist = document.querySelector(`.playlist-${id}`)
  const audioPlayer = document.getElementById(`audio-${id}`)
  let songs = []

  if (!fileInput || !playlist || !audioPlayer) return

  fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files)
    files.forEach(file => {
      if (file.type.startsWith('audio/')) {
        const url = URL.createObjectURL(file)
        songs.push({ name: file.name, url: url })
        
        const songItem = document.createElement('div')
        songItem.textContent = file.name
        songItem.style.cssText = 'padding: 8px; margin: 3px 0; background: rgba(107, 91, 149, 0.2); border: 1px solid #6b5b95; cursor: pointer; color: #e0e0e0; font-size: 0.9em;'
        songItem.onclick = () => {
          audioPlayer.src = url
          audioPlayer.play()
        }
        playlist.appendChild(songItem)
      }
    })
  })
}

// Make canvas elements draggable
function makeElementDraggable(element) {
  let isDragging = false
  let startX, startY, initialX, initialY

  element.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("delete-btn")) return
    if (e.target.tagName === 'IFRAME') return
    if (e.target.tagName === 'BUTTON') return
    if (e.target.tagName === 'INPUT') return
    if (e.target.tagName === 'TEXTAREA') return

    isDragging = true
    startX = e.clientX
    startY = e.clientY
    initialX = Number.parseInt(element.style.left) || 0
    initialY = Number.parseInt(element.style.top) || 0

    element.classList.add("selected")

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  })

  function handleMouseMove(e) {
    if (!isDragging) return

    const deltaX = e.clientX - startX
    const deltaY = e.clientY - startY

    element.style.left = initialX + deltaX + "px"
    element.style.top = initialY + deltaY + "px"
  }

  function handleMouseUp() {
    isDragging = false
    element.classList.remove("selected")
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }
}

// Setup canvas
function setupCanvas() {
  const canvas = document.getElementById("canvas")

  canvas.addEventListener("click", (e) => {
    if (e.target === canvas) {
      document.querySelectorAll(".canvas-element.selected").forEach((el) => {
        el.classList.remove("selected")
      })
    }
  })
}

// Change theme
function changeTheme(theme) {
  currentTheme = theme
  const body = document.body

  body.classList.remove("theme-neon", "theme-classic", "theme-dark")
  body.classList.add("theme-" + theme)

  const canvas = document.getElementById("canvas")
  switch (theme) {
    case "neon":
      canvas.style.background = "linear-gradient(45deg, #6b5b95, #d4af37)"
      break
    case "classic":
      canvas.style.background = "#2d1b4e"
      break
    case "dark":
      canvas.style.background = "#0d0520"
      break
  }
}

// Clear canvas
function clearCanvas() {
  if (confirm("Are you sure you want to clear The Citadel?")) {
    const canvas = document.getElementById("canvas")
    const elements = canvas.querySelectorAll(".canvas-element")
    elements.forEach((el) => el.remove())

    const welcomeMessage = document.querySelector(".welcome-message")
    if (welcomeMessage) {
      welcomeMessage.style.display = "block"
    }
  }
}

// Export, preview, and utility functions
function exportSite() {
  const canvas = document.getElementById("canvas")
  const elements = canvas.querySelectorAll(".canvas-element")

  if (elements.length === 0) {
    alert("Add elements to The Citadel before exporting!")
    return
  }

  const htmlContent = generateHTML()
  const cssContent = generateCSS()

  const zip = new JSZip()
  zip.file("index.html", htmlContent)
  zip.file("style.css", cssContent)

  const readme = `# The Citadel 

Your exported fortress website!

Built with The Citadel Builder ⚔️
`

  zip.file("README.md", readme)

  zip.generateAsync({ type: "blob" }).then((content) => {
    const link = document.createElement("a")
    link.href = URL.createObjectURL(content)
    link.download = "the-citadel.zip"
    link.click()
  })
}

function generateHTML() {
  const canvas = document.getElementById("canvas")
  const elements = canvas.querySelectorAll(".canvas-element")

  let bodyContent = ""

  elements.forEach((element) => {
    const left = element.style.left
    const top = element.style.top

    const content = element.cloneNode(true)
    const deleteBtn = content.querySelector(".delete-btn")
    if (deleteBtn) deleteBtn.remove()

    bodyContent += `
      <div style="position: absolute; left: ${left}; top: ${top};">
        ${content.innerHTML}
      </div>`
  })

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Citadel ⚔️</title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="exported-site theme-${currentTheme}">
    <div class="site-container">
        ${bodyContent}
    </div>
    
    <div class="footer">
        <p>⚔️ Built with The Citadel ⚔️</p>
    </div>
</body>
</html>`
}

function generateCSS() {
  return `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Orbitron:wght@400;500&display=swap');

* { box-sizing: border-box; }

body {
    font-family: 'Orbitron', sans-serif;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: linear-gradient(180deg, #1a0a2e, #2d1b4e, #1a0a2e);
}

.site-container {
    position: relative;
    min-height: 100vh;
    padding: 20px;
}

.retro-text {
    font-family: 'Orbitron', sans-serif;
    background: linear-gradient(145deg, #3d2b5f, #2d1b4e);
    border: 2px solid #d4af37;
    padding: 10px;
    color: #e0e0e0;
}

.retro-heading {
    font-family: 'Cinzel', serif;
    font-size: 2em;
    font-weight: bold;
    color: #d4af37;
    text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
    background: linear-gradient(145deg, #2d1b4e, #1a0a2e);
    padding: 10px;
    border: 3px solid #d4af37;
}

.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(45, 27, 78, 0.9);
    text-align: center;
    padding: 10px;
    border-top: 2px solid #d4af37;
    font-weight: bold;
    color: #d4af37;
}
`
}

function previewSite() {
  const htmlContent = generateHTML()
  const cssContent = generateCSS()

  const fullHTML = htmlContent.replace('<link rel="stylesheet" href="style.css">', `<style>${cssContent}</style>`)

  const modal = document.getElementById("previewModal")
  const frame = document.getElementById("previewFrame")

  modal.style.display = "block"

  const blob = new Blob([fullHTML], { type: "text/html" })
  const url = URL.createObjectURL(blob)

  frame.src = url

  setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 1000)
}

function closePreview() {
  document.getElementById("previewModal").style.display = "none"
}

window.onclick = (event) => {
  const modal = document.getElementById("previewModal")
  if (event.target === modal) {
    modal.style.display = "none"
  }
}

function handleAIPrompt() {
  const prompt = document.getElementById("aiPrompt").value.toLowerCase()
  const response = document.getElementById("aiResponse")
  if (!prompt.trim()) return

  let found = false
  const x = 100 + Math.floor(Math.random() * 400)
  const y = 100 + Math.floor(Math.random() * 300)

  if (prompt.includes("pac") || prompt.includes("pacman")) {
    createElement("game", x, y, { game: "pacman" })
    found = true
  }
  if (prompt.includes("run")) {
    createElement("game", x, y, { game: "run3" })
    found = true
  }
  if (prompt.includes("doom")) {
    createElement("game", x, y, { game: "doom" })
    found = true
  }
  if (prompt.includes("tetris")) {
    createElement("game", x, y, { game: "tetris" })
    found = true
  }
  if (prompt.includes("music")) {
    createElement("musicplayer", x, y)
    found = true
  }
  if (prompt.includes("chat")) {
    createElement("chatroom", x, y)
    found = true
  }

  response.innerText = found ? "✨ Elements added!" : "❌ Didn't understand."
  setTimeout(() => response.innerText = "", 3000)
}

function changeFont(fontFamily) {
  const selected = document.querySelector(".canvas-element.selected")
  if (selected) {
    selected.style.fontFamily = fontFamily
    selected.querySelectorAll("*").forEach((child) => {
      child.style.fontFamily = fontFamily
    })
  } else {
    alert("Select an element first!")
  }
}

function changeColor(color) {
  const selected = document.querySelector(".canvas-element.selected")
  if (selected) {
    selected.style.color = color
  } else {
    alert("Select an element first!")
  }
}

function uploadImage(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = function (e) {
    const imgSrc = e.target.result

    const canvas = document.getElementById("canvas")
    const imgDiv = document.createElement("div")
    imgDiv.className = "canvas-element"
    imgDiv.style.left = "100px"
    imgDiv.style.top = "100px"
    imgDiv.id = "element-" + ++elementCounter

    const deleteBtn = document.createElement("button")
    deleteBtn.className = "delete-btn"
    deleteBtn.innerHTML = "×"
    deleteBtn.onclick = () => imgDiv.remove()
    imgDiv.appendChild(deleteBtn)

    const img = document.createElement("img")
    img.src = imgSrc
    img.alt = "Uploaded"
    img.style.width = "150px"
    img.style.height = "auto"
    img.style.border = "3px solid #d4af37"
    img.style.boxShadow = "0 0 15px rgba(212, 175, 55, 0.4)"
    img.style.display = "block"
    imgDiv.appendChild(img)

    canvas.appendChild(imgDiv)
    makeElementDraggable(imgDiv)

    const welcomeMessage = document.querySelector(".welcome-message")
    if (welcomeMessage) welcomeMessage.style.display = "none"
  }

  reader.readAsDataURL(file)
}

function searchGiphy(query) {
  if (!query.trim()) return alert("Enter a search term!")

  fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=6`)
    .then(res => res.json())
    .then(data => {
      if (!data.data || data.data.length === 0) {
        alert("No GIFs found!")
        return
      }

      const results = data.data.map(gif => gif.images.fixed_height.url)
      showGiphyResults(results)
    })
    .catch(err => {
      console.error("GIPHY fetch failed:", err)
      alert("Failed to load GIFs.")
    })
}

function showGiphyResults(urls) {
  const oldDiv = document.querySelector(".giphy-results")
  if (oldDiv) oldDiv.remove()

  const resultDiv = document.createElement("div")
  resultDiv.className = "giphy-results"
  resultDiv.style.cssText = "position: fixed; bottom: 10px; left: 10px; background: #2d1b4e; border: 2px solid #d4af37; padding: 10px; z-index: 9999; display: flex; flex-wrap: wrap; max-width: 90vw;"

  const closeBtn = document.createElement("button")
  closeBtn.innerText = "❌"
  closeBtn.style.cssText = "position: absolute; top: 5px; right: 5px; background: #8b4513; color: #fff; border: none; font-size: 16px; cursor: pointer;"
  closeBtn.onclick = () => resultDiv.remove()
  resultDiv.appendChild(closeBtn)

  urls.forEach(url => {
    const img = document.createElement("img")
    img.src = url
    img.style.cssText = "width: 100px; margin: 5px; cursor: pointer; border: 2px solid #d4af37;"
    img.onclick = () => {
      createElement("gif", 150, 150, { src: url })
      resultDiv.remove()
    }
    resultDiv.appendChild(img)
  })

  document.body.appendChild(resultDiv)
}

function exportScreenshot() {
  const canvas = document.getElementById("canvas")
  html2canvas(canvas).then((canvasImage) => {
    const link = document.createElement("a")
    link.download = "citadel-screenshot.png"
    link.href = canvasImage.toDataURL()
    link.click()
  })
}
