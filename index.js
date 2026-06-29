document.addEventListener("DOMContentLoaded", () => {
  console.log("JS شغال ✅");

  // كائن الترجمة
  const translations = {
    ar: {
      title: "سنتر VIP Royal التعليمي",
      subtitle: "مستقبلك يبدأ من هنا",
      loginBtn: '<i class="fas fa-sign-in-alt"></i> تسجيل دخول',
      signupBtn: '<i class="fas fa-user-plus"></i> إنشاء حساب',
      navAbout: "من نحن",
      navCourses: "الكورسات",
      navContact: "تواصل معنا",
      aboutTitle: "من نحن",
      aboutText: "سنتر VIP Royal يقدم أفضل الكورسات التعليمية في مختلف المجالات مع نخبة من المدرسين.",
      coursesTitle: "الكورسات المتاحة",
      contactTitle: "تواصل معنا",
      address: "📍 الجيزة، مصر",
      footerText: "© 2026 سنتر VIP Royal التعليمي"
    },
    en: {
      title: "VIP Royal Educational Center",
      subtitle: "Your future starts here",
      loginBtn: '<i class="fas fa-sign-in-alt"></i> Login',
      signupBtn: '<i class="fas fa-user-plus"></i> Sign Up',
      navAbout: "About Us",
      navCourses: "Courses",
      navContact: "Contact",
      aboutTitle: "About Us",
      aboutText: "VIP Royal offers the best courses in various fields with top teachers.",
      coursesTitle: "Available Courses",
      contactTitle: "Contact Us",
      address: "📍 Giza, Egypt",
      footerText: "© 2026 VIP Royal Educational Center"
    }
  };

  // زرار تغيير اللغة
  const langBtn = document.getElementById('langBtn');
  let currentLang = 'ar';

  langBtn.addEventListener('click', () => {
    const lang = currentLang === 'ar' ? 'en' : 'ar';
    const t = translations[lang];

    // تحديث النصوص
    document.getElementById('title').textContent = t.title;
    document.getElementById('subtitle').textContent = t.subtitle;
    document.getElementById('loginBtn').innerHTML = t.loginBtn;
    document.getElementById('signupBtn').innerHTML = t.signupBtn;
    document.getElementById('navAbout').textContent = t.navAbout;
    document.getElementById('navCourses').textContent = t.navCourses;
    document.getElementById('navContact').textContent = t.navContact;
    document.getElementById('aboutTitle').textContent = t.aboutTitle;
    document.getElementById('aboutText').textContent = t.aboutText;
    document.getElementById('coursesTitle').textContent = t.coursesTitle;
    document.getElementById('contactTitle').textContent = t.contactTitle;
    document.getElementById('address').textContent = t.address;
    document.getElementById('footerText').textContent = t.footerText;

    // تحديث زر اللغة والاتجاه
    langBtn.textContent = lang === 'ar' ? "EN" : "AR";
    currentLang = lang;
    document.body.setAttribute("dir", lang === 'ar' ? "rtl" : "ltr");
  });

  // إظهار أيقونة واتساب عند الوصول لآخر الصفحة
  const whatsappIcon = document.querySelector('.whatsapp-icon');
  window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
      whatsappIcon.classList.add('show');
    } else {
      whatsappIcon.classList.remove('show');
    }
  });

  // القائمة المنسدلة (٣ شرط)
  const menuIcon = document.getElementById('menuIcon');
  const navLinks = document.getElementById('navLinks');
  const menuIconInner = menuIcon.querySelector('i');

  menuIcon.addEventListener('click', () => {
    if(navLinks.classList.contains('show')){
      navLinks.classList.remove('show');
      navLinks.classList.add('hide');
      menuIconInner.classList.remove('fa-times');
      menuIconInner.classList.add('fa-bars');
      setTimeout(() => {
        navLinks.style.display = "none";
        navLinks.classList.remove('hide');
      }, 500);
    } else {
      navLinks.style.display = "flex";
      navLinks.classList.add('show');
      menuIconInner.classList.remove('fa-bars');
      menuIconInner.classList.add('fa-times');
    }
  });

  // زرار تسجيل الدخول ينقل لصفحة login.html
  const loginBtn = document.getElementById('loginBtn');
  loginBtn.addEventListener('click', () => {
    window.location.href = "login.html";
  });

  // زرار إنشاء حساب ينقل لصفحة signup.html
  const signupBtn = document.getElementById('signupBtn');
  signupBtn.addEventListener('click', () => {
    window.location.href = "signup.html";
  });

  // السلايدر
  const slides = document.querySelector('.slides');
  const slideCount = document.querySelectorAll('.slide').length;
  let index = 0;

  function showSlide(i){
    index = (i + slideCount) % slideCount;
    slides.style.transform = `translateX(-${index * 100}%)`;
  }

  document.querySelector('.prev').addEventListener('click', ()=> showSlide(index-1));
  document.querySelector('.next').addEventListener('click', ()=> showSlide(index+1));

  // تشغيل تلقائي للسلايدر
  setInterval(()=> showSlide(index+1), 4000);

  // ✅ التحقق من الفورم (Validation) مع رسائل تحذير
  const signupForm = document.querySelector('#signupForm');
  if(signupForm){
    signupForm.addEventListener('submit', (e) => {
      const name = signupForm.querySelector('#name').value.trim();
      const email = signupForm.querySelector('#email').value.trim();
      const password = signupForm.querySelector('#password').value.trim();

      let errors = [];

      if(name.length < 3){
        errors.push("⚠️ الاسم لازم يكون 3 حروف على الأقل");
      }
      if(!email.includes("@")){
        errors.push("⚠️ البريد الإلكتروني غير صالح");
      }
      if(password.length < 6){
        errors.push("⚠️ كلمة المرور لازم تكون 6 أحرف على الأقل");
      }

      if(errors.length > 0){
        e.preventDefault();
        alert(errors.join("\n"));
      }
    });
  }
});