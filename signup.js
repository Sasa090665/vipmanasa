// signup.js
document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  let valid = true;

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const nationalId = document.getElementById("nationalId").value.trim();
  const studentPhone = document.getElementById("studentPhone").value.trim();
  const parentPhone = document.getElementById("parentPhone").value.trim();
  const password = document.getElementById("password").value;

  // عناصر الأخطاء
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const nationalIdError = document.getElementById("nationalIdError");
  const studentPhoneError = document.getElementById("studentPhoneError");
  const parentPhoneError = document.getElementById("parentPhoneError");
  const passwordError = document.getElementById("passwordError");

  // إعادة تعيين الأخطاء
  [nameError, emailError, nationalIdError, studentPhoneError, parentPhoneError, passwordError].forEach(err => {
    if (err) {
      err.style.display = "none";
      err.textContent = "";
    }
  });

  // ✅ التحقق من الاسم (٣ كلمات على الأقل)
  const nameParts = fullname.split(/\s+/);
  if (nameParts.length < 3) {
    nameError.textContent = "الاسم يجب أن يتكون من ٣ كلمات على الأقل";
    nameError.style.display = "block";
    valid = false;
  }

  // تحقق من كلمة المرور
  if (password.length < 6) {
    passwordError.textContent = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    passwordError.style.display = "block";
    valid = false;
  }

  // تهيئة Supabase
  const { createClient } = supabase;
  const supabaseClient = createClient(
    "https://jdtsssxnbnygodvakeem.supabase.co",
    "sb_publishable_Aio2byia1JGLAPGqSlqmYg_NaZI40I1"
  );

  // تحقق من البريد الإلكتروني
  const { data: emailData } = await supabaseClient
    .from("student")
    .select("id")
    .eq("email", email)
    .limit(1);

  if (emailData && emailData.length > 0) {
    emailError.textContent = "هذا البريد الإلكتروني مستخدم بالفعل";
    emailError.style.display = "block";
    valid = false;
  }

  // تحقق من الرقم القومي
  const { data: nationalData } = await supabaseClient
    .from("student")
    .select("id")
    .eq("national_id", nationalId)
    .limit(1);

  if (nationalData && nationalData.length > 0) {
    nationalIdError.textContent = "هذا الرقم القومي مستخدم بالفعل";
    nationalIdError.style.display = "block";
    valid = false;
  }

  // تحقق من رقم الطالب
  const { data: studentPhoneData } = await supabaseClient
    .from("student")
    .select("id")
    .eq("student_phone", studentPhone)
    .limit(1);

  if (studentPhoneData && studentPhoneData.length > 0) {
    studentPhoneError.textContent = "رقم الطالب مستخدم بالفعل";
    studentPhoneError.style.display = "block";
    valid = false;
  }

  // تحقق من رقم ولي الأمر
  const { data: parentPhoneData } = await supabaseClient
    .from("student")
    .select("id")
    .eq("parent_phone", parentPhone)
    .limit(1);

  if (parentPhoneData && parentPhoneData.length > 0) {
    parentPhoneError.textContent = "رقم ولي الأمر مستخدم بالفعل";
    parentPhoneError.style.display = "block";
    valid = false;
  }

  // لو كل حاجة صح
  if (valid) {
    const { error } = await supabaseClient.from("student").insert([
      {
        fullname,
        email,
        national_id: nationalId,
        student_phone: studentPhone,
        parent_phone: parentPhone,
        password
      }
    ]);

    if (error) {
      alert("❌ حصل خطأ أثناء التسجيل");
    } else {
      alert("✅ تم التسجيل بنجاح");
      window.location.href = "login.html";
    }
  }
});