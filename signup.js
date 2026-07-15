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

  // ✅ تحقق من البيانات الأساسية
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

  // تهيئة Supabase
  const { createClient } = supabase;
  const supabaseClient = createClient(
    "https://jdtsssxnbnygodvakeem.supabase.co",
    "sb_publishable_Aio2byia1JGLAPGqSlqmYg_NaZI40I1"
  );

  if (valid) {
    const { error } = await supabaseClient.from("student").insert([
      {
        student_name: fullname,
        email,
        national_id: nationalId,
        phone: studentPhone,
        parent_phone: parentPhone,
        governorate,
        password
      }
    ]);

    if (error) {
      // ✅ التعامل مع أخطاء UNIQUE
      if (error.message.includes("unique_email")) {
        emailError.textContent = "البريد الإلكتروني متسجل قبل كده";
        emailError.style.display = "block";
      } else if (error.message.includes("unique_national")) {
        nationalIdError.textContent = "الرقم القومي متسجل قبل كده";
        nationalIdError.style.display = "block";
      } else if (error.message.includes("unique_phone")) {
        studentPhoneError.textContent = "رقم الطالب متسجل قبل كده";
        studentPhoneError.style.display = "block";
      } else if (error.message.includes("unique_parent")) {
        parentPhoneError.textContent = "رقم ولي الأمر متسجل قبل كده";
        parentPhoneError.style.display = "block";
      } else {
        alert("❌ حصل خطأ أثناء التسجيل: " + error.message);
      }
    } else {
      alert("✅ تم التسجيل بنجاح");
      window.location.href = "login.html";
    }
  }
});