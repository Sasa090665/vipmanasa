document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let valid = true;

  // الاسم الكامل: لازم 3 كلمات على الأقل
  const fullname = document.getElementById("fullname").value.trim();
  const nameRegex = /^([\u0621-\u064Aa-zA-Z]+(\s+[\u0621-\u064Aa-zA-Z]+){2,})$/;
  if (!nameRegex.test(fullname)) {
    document.getElementById("nameError").textContent = "الاسم يجب أن يكون 3 كلمات على الأقل (اسم + اسم الأب + اللقب)";
    document.getElementById("nameError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("nameError").style.display = "none";
  }

  // البريد الإلكتروني
  const email = document.getElementById("email").value.trim();
  if (!email.includes("@") || !email.includes(".")) {
    document.getElementById("emailError").textContent = "البريد الإلكتروني غير صالح";
    document.getElementById("emailError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("emailError").style.display = "none";
  }

  // الرقم القومي
  const nationalId = document.getElementById("nationalId").value.trim();
  if (nationalId.length !== 16 || isNaN(nationalId)) {
    document.getElementById("idError").textContent = "الرقم القومي يجب أن يكون 16 رقم صحيح";
    document.getElementById("idError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("idError").style.display = "none";
  }

  // رقم هاتف الطالب
  const studentPhone = document.getElementById("studentPhone").value.trim();
  if (studentPhone.length !== 11 || isNaN(studentPhone)) {
    document.getElementById("studentPhoneError").textContent = "يجب رقم الهاتف أن يكون 11 رقم";
    document.getElementById("studentPhoneError").style.display = "block";
    valid = false;
  } else if (!/^(010|011|012|015)/.test(studentPhone)) {
    document.getElementById("studentPhoneError").textContent = "الرقم غير صحيح";
    document.getElementById("studentPhoneError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("studentPhoneError").style.display = "none";
  }

  // رقم هاتف ولي الأمر
  const parentPhone = document.getElementById("parentPhone").value.trim();
  if (parentPhone.length !== 11 || isNaN(parentPhone)) {
    document.getElementById("parentPhoneError").textContent = "يجب رقم الهاتف أن يكون 11 رقم";
    document.getElementById("parentPhoneError").style.display = "block";
    valid = false;
  } else if (!/^(010|011|012|015)/.test(parentPhone)) {
    document.getElementById("parentPhoneError").textContent = "الرقم غير صحيح";
    document.getElementById("parentPhoneError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("parentPhoneError").style.display = "none";
  }

  // المحافظة
  const province = document.getElementById("province").value;
  if (!province) {
    document.getElementById("provinceError").textContent = "يجب اختيار المحافظة";
    document.getElementById("provinceError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("provinceError").style.display = "none";
  }

  // كلمة المرور
  const password = document.getElementById("password").value;
  if (password.length < 6) {
    document.getElementById("passwordError").textContent = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    document.getElementById("passwordError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("passwordError").style.display = "none";
  }

  // تأكيد كلمة المرور
  const confirmPassword = document.getElementById("confirmPassword").value;
  if (confirmPassword !== password) {
    document.getElementById("confirmPasswordError").textContent = "كلمة المرور غير متطابقة";
    document.getElementById("confirmPasswordError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("confirmPasswordError").style.display = "none";
  }

  // لو كل حاجة صح
  if (valid) {
    alert("✅ تم التسجيل بنجاح");
  }
});