const taglines = [
    "Hold on, we're setting things up...",
    "Fetching the best for you...",
    "Just a moment, we're almost ready...",
    "Almost there, stay tuned...",
    "Hold tight, we're nearly done...",
    "Just a few more seconds...",
  ];

  let index = 0;

  function changeTagline() {
    const taglineElement = document.getElementById("tagline");
    taglineElement.style.animation = "none"; // Reset animation
    taglineElement.offsetHeight; // Trigger reflow
    taglineElement.style.animation = ""; // Re-apply animation
    taglineElement.textContent = taglines[index];
    index = (index + 1) % taglines.length;
  }

  document.addEventListener("DOMContentLoaded", () => {
    changeTagline();
    setInterval(changeTagline, 6000); // Change tagline every 4 seconds
  });
  $(".full-screen-loader").hide();