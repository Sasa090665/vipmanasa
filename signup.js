// تهيئة Supabase
const { createClient } = supabase;
const supabaseClient = createClient(
  "https://jdtsssxnbnygodvakeem.supabase.co",
  "sb_publishable_Aio2byia1JGLAPGqSlqmYg_NaZI40I1"
);

let countdownInterval;

function startCountdown() {
  let timeLeft = 60;
  const countdownEl = document.getElementById("countdown");
  const timerText = document.getElementById("timerText");
  const resendBtn = document.getElementById("resendBtn");

  resendBtn.style.display = "none";
  timerText.style.display = "block";
  countdownEl.textContent = timeLeft;

  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      timerText.style.display = "none";
      resendBtn.style.display = "inline-block";
    }
  }, 1000);
}

document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  let valid = true;

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const studentPhone = document.getElementById("studentPhone").value.trim();
  const parentPhone = document.getElementById("parentPhone").value.trim();
  const governorate = document.getElementById("governorate").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const studentPhoneError = document.getElementById("studentPhoneError");
  const parentPhoneError = document.getElementById("parentPhoneError");
  const governorateError = document.getElementById("governorateError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  [nameError, emailError, studentPhoneError, parentPhoneError, governorateError, passwordError, confirmPasswordError].forEach(err => {
    if (err) {
      err.style.display = "none";
      err.textContent = "";
    }
  });

  if (fullname.split(/\s+/).filter(Boolean).length < 3) {
    nameError.textContent = "الاسم لازم يكون ٣ كلمات على الأقل";
    nameError.style.display = "block";
    valid = false;
  }

  if (!/^(010|011|012|015)[0-9]{8}$/.test(studentPhone)) {
    studentPhoneError.textContent = "رقم الطالب لازم يبدأ بـ 010 أو 011 أو 012 أو 015 ويكون 11 رقم";
    studentPhoneError.style.display = "block";
    valid = false;
  }

  if (!/^(010|011|012|015)[0-9]{8}$/.test(parentPhone)) {
    parentPhoneError.textContent = "رقم ولي الأمر لازم يبدأ بـ 010 أو 011 أو 012 أو 015 ويكون 11 رقم";
    parentPhoneError.style.display = "block";
    valid = false;
  } else if (studentPhone === parentPhone) {
    parentPhoneError.textContent = "رقم ولي الأمر لازم يكون مختلف عن رقم الطالب";
    parentPhoneError.style.display = "block";
    valid = false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.textContent = "البريد الإلكتروني غير صالح";
    emailError.style.display = "block";
    valid = false;
  }

  if (password.length < 6) {
    passwordError.textContent = "كلمة المرور لازم تكون 6 أحرف على الأقل";
    passwordError.style.display = "block";
    valid = false;
  }

  if (password !== confirmPassword) {
    confirmPasswordError.textContent = "كلمة المرور غير متطابقة";
    confirmPasswordError.style.display = "block";
    valid = false;
  }

  if (!governorate) {
    governorateError.textContent = "لازم تختار المحافظة";
    governorateError.style.display = "block";
    valid = false;
  }

  if (valid) {
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;
    submitBtn.textContent = "جاري إرسال الكود...";

    const { data, error } = await supabaseClient.auth.signUp({
      email: email, 
      password: password
    });

    if (error) {
      alert("❌ حدث خطأ أثناء إرسال كود التحقق: " + error.message);
      submitBtn.disabled = false;
      submitBtn.textContent = "تسجيل";
      return;
    }

    submitBtn.style.display = "none";
    document.getElementById("otpSection").style.display = "block";

    // هنا التعديل: تم إضافة الباسورد للبيانات اللي هتتحفظ
    localStorage.setItem("tempStudentData", JSON.stringify({
      student_name: fullname,
      email: email,
      phone: studentPhone,
      parent_phone: parentPhone,
      governorate: governorate,
      password: password // <--- الباسورد هينبعت لجدول student
    }));

    alert("📩 تم إرسال كود التحقق إلى بريدك الإلكتروني، يرجى مراجعته لإتمام التسجيل.");
    
    startCountdown();
  }
});

document.getElementById("resendBtn").addEventListener("click", async function () {
  const resendBtn = document.getElementById("resendBtn");
  const rawData = localStorage.getItem("tempStudentData");

  if (!rawData) {
    alert("❌ انتهت الجلسة، يرجى إعادة ملء النموذج.");
    location.reload();
    return;
  }

  const studentData = JSON.parse(rawData);

  resendBtn.disabled = true;
  resendBtn.textContent = "جاري إرسال كود جديد...";

  const { error } = await supabaseClient.auth.resend({
    type: 'signup',
    email: studentData.email
  });

  if (error) {
    alert("❌ فشل إعادة إرسال الكود: " + error.message);
    resendBtn.disabled = false;
    resendBtn.textContent = "إعادة إرسال الكود";
  } else {
    alert("📩 تم إرسال كود جديد إلى بريدك الإلكتروني بنجاح.");
    resendBtn.disabled = false;
    resendBtn.textContent = "إعادة إرسال الكود";
    startCountdown();
  }
});

document.getElementById("verifyBtn").addEventListener("click", async function () {
  const otpCode = document.getElementById("otpCode").value.trim();
  const otpError = document.getElementById("otpError");
  const verifyBtn = document.getElementById("verifyBtn");

  const rawData = localStorage.getItem("tempStudentData");
  if (!rawData) {
    alert("❌ انتهت الجلسة، يرجى إعادة ملء نموذج التسجيل.");
    location.reload();
    return;
  }

  const studentData = JSON.parse(rawData);

  otpError.style.display = "none";
  otpError.textContent = "";

  if (!/^\d{8}$/.test(otpCode)) {
    otpError.textContent = "يرجى كتابة كود تحقق مكون من 8 أرقام";
    otpError.style.display = "block";
    return;
  }

  verifyBtn.disabled = true;
  verifyBtn.textContent = "جاري التحقق...";

  const { data, error } = await supabaseClient.auth.verifyOtp({
    email: studentData.email,
    token: otpCode,
    type: 'email'
  });

  if (error) {
    otpError.textContent = "كود التحقق غير صحيح أو انتهت صلاحيته";
    otpError.style.display = "block";
    verifyBtn.disabled = false;
    verifyBtn.textContent = "تأكيد الكود وإتمام التسجيل";
  } else {
    if (data?.user?.id) {
      studentData.user_id = data.user.id;
    }

    const { error: dbError } = await supabaseClient.from("student").insert([studentData]);

    if (dbError) {
      if (dbError.message.includes("unique_email")) {
        alert("❌ البريد الإلكتروني مسجل بالفعل.");
      } else if (dbError.message.includes("unique_phone")) {
        alert("❌ رقم الطالب مسجل بالفعل.");
      } else {
        alert("❌ حصل خطأ أثناء حفظ البيانات: " + dbError.message);
      }
      verifyBtn.disabled = false;
      verifyBtn.textContent = "تأكيد الكود وإتمام التسجيل";
    } else {
      clearInterval(countdownInterval);
      localStorage.removeItem("tempStudentData");
      alert("✅ تم تأكيد الحساب وإنشاؤه بنجاح!");
      window.location.href = "login.html"; 
    }
  }
});