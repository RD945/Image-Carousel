const track = document.getElementById("image-track");
const overlay = document.getElementById("fullscreen-overlay");
const fullscreenImage = document.getElementById("fullscreen-image");
const closeButton = document.getElementById("close-button");

let targetPercentage = -50; // Start with the leftmost image centered
let currentPercentage = targetPercentage; // Track the current position

// Initialize the image track with smooth scrolling
window.onload = () => {
    track.dataset.percentage = targetPercentage;
    track.style.transform = `translate(${targetPercentage}%, -50%)`;
    smoothScroll(); // Start the smooth scrolling animation
};

function smoothScroll() {
    currentPercentage += (targetPercentage - currentPercentage) * 0.1; // Smooth interpolation
    track.style.transform = `translate(${currentPercentage}%, -50%)`;
    requestAnimationFrame(smoothScroll); // Continue the smooth scrolling
}

// Update target percentage on mouse move
window.onmousemove = e => {
    const screenWidth = window.innerWidth;
    const mouseX = e.clientX;

    // Calculate the percentage based on mouse position
    // -100% is the leftmost, 0% is the rightmost
    const percentage = ((mouseX / screenWidth) - 0.5) * -200;  // Multiply by -200 for a wider range of movement
    targetPercentage = Math.max(Math.min(percentage, 0), -100); // Adjust bounds

    // Ensure the targetPercentage doesn't go beyond the bounds
    targetPercentage = Math.min(targetPercentage, 0);  // Rightmost at 0% and leftmost at -100%
};

// Handle image clicks for full-screen view
track.addEventListener("click", e => {
    if (e.target.classList.contains("image")) {
        fullscreenImage.src = e.target.src;
        overlay.classList.remove("hidden");
        overlay.classList.add("visible");
    }
});

// Close the overlay on clicking the close button
closeButton.addEventListener("click", () => {
    overlay.classList.remove("visible");
    overlay.classList.add("hidden");
    fullscreenImage.src = ""; // Clear the source
});

// Keyboard navigation
window.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") {
        targetPercentage = Math.min(targetPercentage + 10, 0); // Move right (toward 0%)
    } else if (e.key === "ArrowRight") {
        targetPercentage = Math.max(targetPercentage - 10, -100); // Move left (toward -100%)
    } else if (e.key === "Escape" && overlay.classList.contains("visible")) {
        // Close full-screen overlay with Escape key
        overlay.classList.remove("visible");
        overlay.classList.add("hidden");
        fullscreenImage.src = "";
    }
});
