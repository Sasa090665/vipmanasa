document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  // تحويل البريد الإلكتروني لحروف صغيرة وتنظيفه من المسافات الزائدة
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

  // التحقق من صحة صيغة الإيميل
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.textContent = "البريد الإلكتروني غير صالح";
    emailError.style.display = "block";
    valid = false;
  }

  // التحقق من كتابة كلمة المرور
  if (password.length === 0) {
    passwordError.textContent = "من فضلك ادخل كلمة المرور";
    passwordError.style.display = "block";
    valid = false;
  }

  if (!valid) return;

  // تهيئة Supabase Client
  const { createClient } = supabase;
  const supabaseClient = createClient(
    "https://jdtsssxnbnygodvakeem.supabase.co",
    "sb_publishable_Aio2byia1JGLAPGqSlqmYg_NaZI40I1"
  );

  try {
    // 1. استخدام ilike لمنع حساسية الحروف الكبيرة/الصغيرة
    // 2. استخدام maybeSingle لتجنب الأخطاء القاتلة عند عدم وجود بيانات
    const { data, error } = await supabaseClient
      .from("student")
      .select("*")
      .ilike("email", email)
      .maybeSingle();

    // التعامل مع أخطاء الاتصال أو صلاحيات RLS
    if (error) {
      console.error("تفاصيل الخطأ من Supabase:", error.message);
      emailError.textContent = "حدث خطأ في الاتصال بالسيرفر، يرجى المحاولة لاحقاً";
      emailError.style.display = "block";
      return;
    }

    // لو البريد الإلكتروني مش موجود فعلياً
    if (!data) {
      emailError.textContent = "البريد الإلكتروني غير مسجل";
      emailError.style.display = "block";
      return;
    }

    // مطابقة كلمة المرور
    if (data.password !== password) {
      passwordError.textContent = "كلمة المرور غير صحيحة";
      passwordError.style.display = "block";
      return;
    }

    // تسجيل الدخول بنجاح -> حفظ البيانات في الـ Session
    sessionStorage.setItem("student", JSON.stringify({
      id: data.id,
      name: data.student_name,
      email: data.email,
      governorate: data.governorate
    }));

    // التوجيه لصفحة لوحة التحكم
    window.location.href = "index.html";

  } catch (err) {
    console.error("خطأ غير متوقع:", err);
    emailError.textContent = "حدث خطأ غير متوقع، يرجى المحاولة لاحقاً";
    emailError.style.display = "block";
  }
});