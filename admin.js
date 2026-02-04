document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("continueBtn");
  if (!btn) return;

  btn.addEventListener("click", function () {

 const name  = document.getElementById("name")?.value.trim();
 const password    = document.getElementById("password")?.value.trim();
 if (!name) return alert("نام نامتبعر");
 if (!/^\d{4}$/.test(password)) return alert("پسورد نا متعبر");
   window.location.href = "khandan.html";
 });
});