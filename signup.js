// signup.js
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault(); // منع الإرسال الافتراضي

  let isValid = true;

  // عناصر الإدخال
  const fullname = document.getElementById("fullname");
  const email = document.getElementById("email");
  const nationalId = document.getElementById("nationalId");
  const studentPhone = document.getElementById("studentPhone");
  const parentPhone = document.getElementById("parentPhone");
  const province = document.getElementById("province");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  // عناصر الأخطاء
  const errors = {
    nameError: document.getElementById("nameError"),
    emailError: document.getElementById("emailError"),
    idError: document.getElementById("idError"),
    studentPhoneError: document.getElementById("studentPhoneError"),
    parentPhoneError: document.getElementById("parentPhoneError"),
    provinceError: document.getElementById("provinceError"),
    passwordError: document.getElementById("passwordError"),
    confirmPasswordError: document.getElementById("confirmPasswordError"),
  };

  // إعادة تعيين الأخطاء
  Object.values(errors).forEach(err => {
    err.style.display = "none";
    err.textContent = "";
  });

  // ✅ التحقق من الاسم (٣ كلمات على الأقل)
  const nameParts = fullname.value.trim().split(/\s+/);
  if (nameParts.length < 3) {
    errors.nameError.textContent = "الاسم يجب أن يتكون من ٣ كلمات على الأقل";
    errors.nameError.style.display = "block";
    isValid = false;
  }

  // التحقق من البريد الإلكتروني
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    errors.emailError.textContent = "أدخل بريد إلكتروني صالح";
    errors.emailError.style.display = "block";
    isValid = false;
  }

  // التحقق من الرقم القومي (14 رقم)
  if (!/^\d{14}$/.test(nationalId.value.trim())) {
    errors.idError.textContent = "الرقم القومي يجب أن يكون 14 رقمًا";
    errors.idError.style.display = "block";
    isValid = false;
  }

  // التحقق من رقم هاتف الطالب
  if (!/^01[0-9]{9}$/.test(studentPhone.value.trim())) {
    errors.studentPhoneError.textContent = "أدخل رقم هاتف مصري صحيح (11 رقم)";
    errors.studentPhoneError.style.display = "block";
    isValid = false;
  }

  // التحقق من رقم هاتف ولي الأمر
  if (!/^01[0-9]{9}$/.test(parentPhone.value.trim())) {
    errors.parentPhoneError.textContent = "أدخل رقم هاتف مصري صحيح (11 رقم)";
    errors.parentPhoneError.style.display = "block";
    isValid = false;
  }

  // ✅ التحقق من عدم تكرار رقم الهاتف
  if (studentPhone.value.trim() === parentPhone.value.trim()) {
    errors.parentPhoneError.textContent = "لا يمكن استخدام نفس الرقم في خانة الطالب وولي الأمر";
    errors.parentPhoneError.style.display = "block";
    isValid = false;
  }

  // التحقق من المحافظة
  if (!province.value) {
    errors.provinceError.textContent = "اختر المحافظة";
    errors.provinceError.style.display = "block";
    isValid = false;
  }

  // التحقق من كلمة المرور
  if (password.value.length < 6) {
    errors.passwordError.textContent = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    errors.passwordError.style.display = "block";
    isValid = false;
  }

  // التحقق من تطابق كلمة المرور
  if (password.value !== confirmPassword.value) {
    errors.confirmPasswordError.textContent = "كلمة المرور غير متطابقة";
    errors.confirmPasswordError.style.display = "block";
    isValid = false;
  }

  // إذا كل شيء صحيح
  if (isValid) {
    alert("تم التسجيل بنجاح ✅");
    // هنا ممكن تضيف كود إرسال البيانات للسيرفر
  }
});