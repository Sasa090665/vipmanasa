// تهيئة Supabase
const { createClient } = supabase;
const supabaseClient = createClient(
  "https://jdtsssxnbnygodvakeem.supabase.co",
  "sb_publishable_Aio2byia1JGLAPGqSlqmYg_NaZI40I1"
);

// 1. حدث إرسال نموذج التسجيل الرئيسي
document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  let valid = true;

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const nationalId = document.getElementById("nationalId").value.trim();
  const studentPhone = document.getElementById("studentPhone").value.trim();
  const parentPhone = document.getElementById("parentPhone").value.trim();
  const governorate = document.getElementById("governorate").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // عناصر الأخطاء
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const nationalIdError = document.getElementById("nationalIdError");
  const studentPhoneError = document.getElementById("studentPhoneError");
  const parentPhoneError = document.getElementById("parentPhoneError");
  const governorateError = document.getElementById("governorateError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  // إعادة تعيين الأخطاء
  [nameError, emailError, nationalIdError, studentPhoneError, parentPhoneError, governorateError, passwordError, confirmPasswordError].forEach(err => {
    if (err) {
      err.style.display = "none";
      err.textContent = "";
    }
  });

  // ✅ التحقق من صحة المدخلات
  if (fullname.split(/\s+/).length < 3) {
    nameError.textContent = "الاسم لازم يكون ٣ كلمات على الأقل";
    nameError.style.display = "block";
    valid = false;
  }

  if (!/^\d{14}$/.test(nationalId)) {
    nationalIdError.textContent = "الرقم القومي لازم يكون 14 رقم بالظبط";
    nationalIdError.style.display = "block";
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

    // إرسال رمز OTP لإيميل الطالب
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

    // إخفاء زر التسجيل وإظهار واجهة إدخال كود الـ OTP
    submitBtn.style.display = "none";
    document.getElementById("otpSection").style.display = "block";

    // حفظ بيانات الطالب مؤقتاً لحين تأكيد الكود
    localStorage.setItem("tempStudentData", JSON.stringify({
      student_name: fullname,
      email: email,
      national_id: nationalId,
      phone: studentPhone,
      parent_phone: parentPhone,
      governorate: governorate,
      password: password
    }));

    alert("📩 تم إرسال كود التحقق إلى بريدك الإلكتروني، يرجى مراجعته لإتمام التسجيل.");
  }
});

// 2. حدث الضغط على زر تأكيد كود OTP
document.getElementById("verifyBtn").addEventListener("click", async function () {
  const otpCode = document.getElementById("otpCode").value.trim();
  const otpError = document.getElementById("otpError");
  const verifyBtn = document.getElementById("verifyBtn");
  const emailForVerify = document.getElementById("email").value.trim();

  otpError.style.display = "none";
  otpError.textContent = "";

  // ✅ تم التعديل هنا ليطلب 8 أرقام
  if (otpCode.length !== 8 || isNaN(otpCode)) {
    otpError.textContent = "يرجى كتابة كود تحقق مكون من 8 أرقام";
    otpError.style.display = "block";
    return;
  }

  verifyBtn.disabled = true;
  verifyBtn.textContent = "جاري التحقق...";

  // التحقق من صحة الكود عبر Supabase Auth باستخدام الإيميل
  const { data, error } = await supabaseClient.auth.verifyOtp({
    email: emailForVerify,
    token: otpCode,
    type: 'signup'
  });

  if (error) {
    otpError.textContent = "كود التحقق غير صحيح أو انتهت صلاحيته";
    otpError.style.display = "block";
    verifyBtn.disabled = false;
    verifyBtn.textContent = "تأكيد الكود وإتمام التسجيل";
  } else {
    // تم التأكيد بنجاح -> حفظ البيانات الكاملة في جدول student
    const studentData = JSON.parse(localStorage.getItem("tempStudentData"));

    const { error: dbError } = await supabaseClient.from("student").insert([studentData]);

    if (dbError) {
      if (dbError.message.includes("unique_email")) {
        alert("❌ البريد الإلكتروني مسجل بالفعل.");
      } else if (dbError.message.includes("unique_national")) {
        alert("❌ الرقم القومي مسجل بالفعل.");
      } else if (dbError.message.includes("unique_phone")) {
        alert("❌ رقم الطالب مسجل بالفعل.");
      } else {
        alert("❌ حصل خطأ أثناء حفظ البيانات: " + dbError.message);
      }
      verifyBtn.disabled = false;
      verifyBtn.textContent = "تأكيد الكود وإتمام التسجيل";
    } else {
      localStorage.removeItem("tempStudentData");
      alert("✅ تم تأكيد الحساب وإنشاؤه بنجاح!");
      // توجيه المستخدم لصفحة تسجيل الدخول
      window.location.href = "login.html"; 
    }
  }
});