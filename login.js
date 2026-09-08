// تهيئة Supabase Client
const { createClient } = supabase;
const supabaseClient = createClient(
  "https://jdtsssxnbnygodvakeem.supabase.co",
  "sb_publishable_Aio2byia1JGLAPGqSlqmYg_NaZI40I1"
);

// =======================================================
// الجزء الأول: كود تسجيل الدخول الأساسي
// =======================================================
document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  // إعادة تعيين رسائل الأخطاء
  [emailError, passwordError].forEach(err => {
    if (err) {
      err.style.display = "none";
      err.textContent = "";
    }
  });

  let valid = true;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.textContent = "البريد الإلكتروني غير صالح";
    emailError.style.display = "block";
    valid = false;
  }

  if (password.length === 0) {
    passwordError.textContent = "من فضلك ادخل كلمة المرور";
    passwordError.style.display = "block";
    valid = false;
  }

  if (!valid) return;

  try {
    const { data, error } = await supabaseClient
      .from("student")
      .select("*")
      .ilike("email", email)
      .maybeSingle();

    if (error) {
      console.error("تفاصيل الخطأ من Supabase:", error.message);
      emailError.textContent = "حدث خطأ في الاتصال بالسيرفر، يرجى المحاولة لاحقاً";
      emailError.style.display = "block";
      return;
    }

    if (!data) {
      emailError.textContent = "البريد الإلكتروني غير مسجل";
      emailError.style.display = "block";
      return;
    }

    if (data.password !== password) {
      passwordError.textContent = "كلمة المرور غير صحيحة";
      passwordError.style.display = "block";
      return;
    }

    // التخزين في localStorage وإضافة مفتاح isLoggedIn
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("student", JSON.stringify({
      id: data.id,
      name: data.student_name,
      email: data.email,
      governorate: data.governorate
    }));

    window.location.href = "index.html";

  } catch (err) {
    console.error("خطأ غير متوقع:", err);
    emailError.textContent = "حدث خطأ غير متوقع، يرجى المحاولة لاحقاً";
    emailError.style.display = "block";
  }
});

// =======================================================
// الجزء الثاني: كود "نسيت كلمة المرور" (مربوط بـ EmailJS)
// =======================================================
document.getElementById("forgotPasswordBtn").addEventListener("click", async function (e) {
  e.preventDefault();

  const emailInput = document.getElementById("email").value.trim().toLowerCase();
  const emailError = document.getElementById("emailError");

  emailError.style.display = "none";
  emailError.textContent = "";

  if (!emailInput) {
    emailError.textContent = "يرجى كتابة بريدك الإلكتروني في الحقل المخصص أولاً لإرسال رمز التحقق.";
    emailError.style.display = "block";
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
    emailError.textContent = "البريد الإلكتروني غير صالح";
    emailError.style.display = "block";
    return;
  }

  const originalText = this.innerHTML;
  this.innerHTML = "جاري إرسال الرمز...";
  this.style.pointerEvents = "none";

  try {
    const { data, error } = await supabaseClient
      .from("student")
      .select("*")
      .ilike("email", emailInput)
      .maybeSingle();

    if (!data) {
      emailError.textContent = "هذا البريد الإلكتروني غير مسجل لدينا!";
      emailError.style.display = "block";
      this.innerHTML = originalText;
      this.style.pointerEvents = "auto";
      return;
    }

    // توليد كود تحقق عشوائي
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    localStorage.setItem("resetEmail", emailInput);
    localStorage.setItem("verificationCode", verificationCode);

    // -------------------------------------------------------------
    // تهيئة وإرسال الإيميل باستخدام مفاتيح حسابك
    // -------------------------------------------------------------
    emailjs.init("Q6q84bPuT9CBlSktf"); // الـ Public Key بتاعك

    await emailjs.send("service_a1w3p6d", "template_as5xlyi", {
      to_email: emailInput,
      message: verificationCode,
    });

    alert("تم إرسال رمز التحقق إلى بريدك الإلكتروني بنجاح! يرجى مراجعة صندوق الوارد.");
    window.location.href = "reset-password.html";

  } catch (err) {
    console.error("خطأ أثناء إرسال الإيميل:", err);
    emailError.textContent = "فشل إرسال رمز التحقق، يرجى التأكد من البريد الإلكتروني أو المحاولة لاحقاً.";
    emailError.style.display = "block";
  } finally {
    this.innerHTML = originalText;
    this.style.pointerEvents = "auto";
  }
});