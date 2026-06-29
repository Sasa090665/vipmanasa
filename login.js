document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let valid = true;

  // البريد الإلكتروني
  const email = document.getElementById("loginEmail").value.trim();
  if (!email.includes("@") || !email.includes(".")) {
    document.getElementById("loginEmailError").textContent = "البريد الإلكتروني غير صالح";
    document.getElementById("loginEmailError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("loginEmailError").style.display = "none";
  }

  // كلمة المرور
  const password = document.getElementById("loginPassword").value;
  if (password.length < 6) {
    document.getElementById("loginPasswordError").textContent = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    document.getElementById("loginPasswordError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("loginPasswordError").style.display = "none";
  }

  // لو كل حاجة صح
  if (valid) {
    alert("✅ تم تسجيل الدخول بنجاح");
    // هنا ممكن تضيف توجيه لصفحة أخرى بعد تسجيل الدخول
    // window.location.href = "dashboard.html";
  }
});