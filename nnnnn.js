 // بعد 2 ثانیه شروع محو شدن
  setTimeout(() => {
    const welcome = document.getElementById('welcome');
    welcome.style.opacity = 0;
  }, 2000);

  // بعد 4 ثانیه ریدایرکت به سایت اصلی
  setTimeout(() => {
    window.location.href = "home.html"; // مسیر سایت اصلی
  }, 4000);