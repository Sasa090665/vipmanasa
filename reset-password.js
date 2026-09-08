// تهيئة Supabase Client 
const { createClient } = supabase;
const supabaseClient = createClient(
  "https://jdtsssxnbnygodvakeem.supabase.co",
  "sb_publishable_Aio2byia1JGLAPGqSlqmYg_NaZI40I1"
);

// ----------------------------------------------------
// فحص شروط كلمة المرور أثناء الكتابة (Real-time)
// ----------------------------------------------------
const passwordInput = document.getElementById("newPassword");
const reqLength = document.getElementById("reqLength");
const reqUppercase = document.getElementById("reqUppercase");
const reqNumber = document.getElementById("reqNumber");
const reqSpecial = document.getElementById("reqSpecial");

passwordInput.addEventListener("input", function () {
  const val = passwordInput.value;

  const isLengthValid = val.length >= 8;
  const isUpperValid = /[A-Z]/.test(val);
  const isNumberValid = /[0-9]/.test(val);
  const isSpecialValid = /[!@#$%^&*(),.?":{}|<>]/.test(val);

  updateReq(reqLength, isLengthValid);
  updateReq(reqUppercase, isUpperValid);
  updateReq(reqNumber, isNumberValid);
  updateReq(reqSpecial, isSpecialValid);
});

function updateReq(element, isValid) {
  const icon = element.querySelector("i");
  if (isValid) {
    element.classList.add("valid");
    icon.className = "fas fa-check-circle";
  } else {
    element.classList.remove("valid");
    icon.className = "fas fa-times-circle";
  }
}
// ----------------------------------------------------

document.getElementById("resetForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const codeInput = document.getElementById("verificationCode").value.trim();
  const newPassword = passwordInput.value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  const codeError = document.getElementById("codeError");
  const passwordError = document.getElementById("passwordError");

  // إعادة تعيين رسائل الأخطاء
  codeError.style.display = "none";
  passwordError.style.display = "none";
  codeError.textContent = "";
  passwordError.textContent = "";

  // استرجاع الكود والإيميل
  const savedCode = localStorage.getItem("verificationCode");
  const savedEmail = localStorage.getItem("resetEmail");

  if (!savedEmail || !savedCode) {
    codeError.textContent = "انتهت الجلسة، يرجى طلب رمز جديد من صفحة تسجيل الدخول.";
    codeError.style.display = "block";
    return;
  }

  // 1. التحقق من تطابق الرمز
  if (codeInput !== savedCode) {
    codeError.textContent = "رمز التحقق غير صحيح!";
    codeError.style.display = "block";
    return;
  }

  // 2. فحص قوة كلمة المرور الجديدة قبل القبول
  const isPasswordStrong = 
    newPassword.length >= 8 &&
    /[A-Z]/.test(newPassword) &&
    /[0-9]/.test(newPassword) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

  if (!isPasswordStrong) {
    passwordError.textContent = "يرجى استيفاء جميع شروط كلمة المرور الموضحة أعلاه.";
    passwordError.style.display = "block";
    return;
  }

  // 3. التحقق من تطابق كلمتي المرور
  if (newPassword !== confirmPassword) {
    passwordError.textContent = "كلمتا المرور غير متطابقتين!";
    passwordError.style.display = "block";
    return;
  }

  const submitBtn = document.querySelector("#resetForm button");
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = "جاري التحديث...";
  submitBtn.style.pointerEvents = "none";

  try {
    // 4. تحديث كلمة المرور في قاعدة البيانات
    const { error } = await supabaseClient
      .from("student")
      .update({ password: newPassword })
      .eq("email", savedEmail);

    if (error) {
      console.error("تفاصيل الخطأ:", error.message);
      passwordError.textContent = "حدث خطأ أثناء تحديث كلمة المرور، يرجى المحاولة لاحقاً.";
      passwordError.style.display = "block";
      
      submitBtn.innerHTML = originalText;
      submitBtn.style.pointerEvents = "auto";
      return;
    }

    // 5. مسح البيانات المؤقتة
    localStorage.removeItem("verificationCode");
    localStorage.removeItem("resetEmail");

    alert("تم تغيير كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول.");
    window.location.href = "login.html";

  } catch (err) {
    console.error("خطأ غير متوقع:", err);
    passwordError.textContent = "حدث خطأ غير متوقع، يرجى التحقق من اتصالك بالإنترنت.";
    passwordError.style.display = "block";
    
    submitBtn.innerHTML = originalText;
    submitBtn.style.pointerEvents = "auto";
  }
});