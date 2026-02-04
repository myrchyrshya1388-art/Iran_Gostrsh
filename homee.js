const canvas = document.getElementById('codeCanvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const letters = "0101010110011101001010"; // می‌تونی طول و ترکیب کد رو تغییر بدی
  const fontSize = 18;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(0);

  function draw() {
    ctx.fillStyle = "rgba(10,10,10,0.15)"; // شفافیت پس‌زمینه برای trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ffcc"; // رنگ کد
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }


  setInterval(draw, 50);

function openMenu() {
    document.getElementById("drawer").classList.add("active");
    document.getElementById("overlay").classList.add("active");
}

function closeMenu() {
    document.getElementById("drawer").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
}
console.log("cart.js loaded");
function toggleMore() {
    const list = document.getElementById("more-list");
    const arrow = document.getElementById("more-arrow");

    list.classList.toggle("open");

    if (arrow) {
        arrow.style.transform = list.classList.contains("open")
            ? "rotate(90deg)"
            : "rotate(0deg)";
    }
}
