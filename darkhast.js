document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("continueBtn");
  if (!btn) return;

  btn.addEventListener("click", function () {

    // ===== گرفتن اطلاعات فرم =====
    const fullname   = document.getElementById("fullname")?.value.trim();
    const mobile     = document.getElementById("mobile")?.value.trim();
    const nationalId = document.getElementById("nationalId")?.value.trim();
    const country    = document.getElementById("country")?.value;
    const province   = document.getElementById("province")?.value;
    const city       = document.getElementById("city")?.value.trim();
    const address    = document.getElementById("address")?.value.trim();
    const text= document.getElementById("text")?.value.trim();

    // ===== شرط‌ها =====
    if (!fullname) return alert("نام و نام خانوادگی را وارد کنید");
    if (!/^09\d{9}$/.test(mobile)) return alert("شماره موبایل معتبر نیست");
    if (!/^\d{10}$/.test(nationalId)) return alert("کد ملی معتبر نیست");
    if (!country) return alert("کشور را انتخاب کنید");
    if (!province) return alert("استان را انتخاب کنید");
    if (!city) return alert("نام شهر را وارد کنید");
    if (!address) return alert("آدرس و پلاک را وارد کنید");
    if (!text) return alert("توضیحات محصول خود را اضافه کنید")
     window.location.href = "support2.html";
  });
});
