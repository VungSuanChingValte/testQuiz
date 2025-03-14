const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let pacmanX = 50, pacmanY = 50;
const pacmanSize = 30;
const speed = 5;

const ws = new WebSocket("ws://localhost:8080/game");

// WebSocket Event Listeners
ws.onopen = () => console.log("Connected to WebSocket Server");

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    pacmanX = data.pacmanX;
    pacmanY = data.pacmanY;
};

ws.onerror = (error) => console.error("WebSocket Error:", error);
ws.onclose = () => console.log("WebSocket Disconnected");

// Handle Key Presses
document.addEventListener("keydown", (event) => {
    let direction = "";
    if (event.key === "ArrowLeft") direction = "left";
    if (event.key === "ArrowRight") direction = "right";
    if (event.key === "ArrowUp") direction = "up";
    if (event.key === "ArrowDown") direction = "down";

    if (direction && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ direction }));
    }
});

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Pac-Man
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(pacmanX, pacmanY, pacmanSize / 2, 0.2 * Math.PI, 1.8 * Math.PI);
    ctx.lineTo(pacmanX, pacmanY);
    ctx.fill();

    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();