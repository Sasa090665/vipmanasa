document.addEventListener("DOMContentLoaded", () => {
  console.log("JS شغال ✅");

  const translations = {
    ar: {
      title: "سنتر VIP Royal التعليمي",
      subtitle: "مستقبلك يبدأ من هنا",
      loginBtn: '<i class="fas fa-sign-in-alt"></i> تسجيل دخول',
      signupBtn: '<i class="fas fa-user-plus"></i> إنشاء حساب',
      navAbout: "من نحن",
      navCourses: "الكورسات",
      navContact: "تواصل معنا",
      navProfile: "بيانات المستخدم",
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
      navProfile: "User Profile",
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

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const lang = currentLang === 'ar' ? 'en' : 'ar';
      const t = translations[lang];

      // تحديث النصوص الأساسية
      if (document.getElementById('title')) document.getElementById('title').textContent = t.title;
      if (document.getElementById('subtitle')) document.getElementById('subtitle').textContent = t.subtitle;
      
      // التحقق من وجود الأزرار قبل ترجمتها
      const loginBtnEl = document.getElementById('loginBtn');
      if (loginBtnEl) loginBtnEl.innerHTML = t.loginBtn;
      
      const signupBtnEl = document.getElementById('signupBtn');
      if (signupBtnEl) signupBtnEl.innerHTML = t.signupBtn;

      if (document.getElementById('navAbout')) document.getElementById('navAbout').textContent = t.navAbout;
      if (document.getElementById('navCourses')) document.getElementById('navCourses').textContent = t.navCourses;
      if (document.getElementById('navContact')) document.getElementById('navContact').textContent = t.navContact;
      if (document.getElementById('aboutTitle')) document.getElementById('aboutTitle').textContent = t.aboutTitle;
      if (document.getElementById('aboutText')) document.getElementById('aboutText').textContent = t.aboutText;
      if (document.getElementById('coursesTitle')) document.getElementById('coursesTitle').textContent = t.coursesTitle;
      if (document.getElementById('contactTitle')) document.getElementById('contactTitle').textContent = t.contactTitle;
      if (document.getElementById('address')) document.getElementById('address').textContent = t.address;
      if (document.getElementById('footerText')) document.getElementById('footerText').textContent = t.footerText;

      // ترجمة زرار بيانات المستخدم لو موجود
      const navProfile = document.getElementById('navProfile');
      if (navProfile) {
        navProfile.textContent = t.navProfile;
      }

      // تحديث زر اللغة والاتجاه
      langBtn.textContent = lang === 'ar' ? "EN" : "AR";
      currentLang = lang;
      document.body.setAttribute("dir", lang === 'ar' ? "rtl" : "ltr");
    });
  }

  // === ✅ جزء التحقق من تسجيل الدخول وفحص الـ localStorage ===
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true" || localStorage.getItem("student") !== null;

  if (isLoggedIn) {
    // 1: إخفاء أزرار تسجيل الدخول وإنشاء الحساب
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
      authButtons.style.display = 'none';
    }

    // 2: إضافة زرار "بيانات المستخدم" في الناف بار
    const navLinks = document.getElementById('navLinks');
    if (navLinks && !document.getElementById('navProfile')) {
      const profileLink = document.createElement('a');
      profileLink.href = "user.html";
      profileLink.id = "navProfile";
      profileLink.textContent = currentLang === 'ar' ? translations.ar.navProfile : translations.en.navProfile; 
      
      navLinks.appendChild(profileLink);
    }
  }

  // إظهار أيقونة واتساب عند الوصول لآخر الصفحة
  const whatsappIcon = document.querySelector('.whatsapp-icon');
  if (whatsappIcon) {
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        whatsappIcon.classList.add('show');
      } else {
        whatsappIcon.classList.remove('show');
      }
    });
  }

  // القائمة المنسدلة (٣ شرط)
  const menuIcon = document.getElementById('menuIcon');
  const navLinksElement = document.getElementById('navLinks');
  
  if (menuIcon && navLinksElement) {
    const menuIconInner = menuIcon.querySelector('i');
    menuIcon.addEventListener('click', () => {
      if (navLinksElement.classList.contains('show')) {
        navLinksElement.classList.remove('show');
        navLinksElement.classList.add('hide');
        if (menuIconInner) {
          menuIconInner.classList.remove('fa-times');
          menuIconInner.classList.add('fa-bars');
        }
        setTimeout(() => {
          navLinksElement.style.display = "none";
          navLinksElement.classList.remove('hide');
        }, 500);
      } else {
        navLinksElement.style.display = "flex";
        navLinksElement.classList.add('show');
        if (menuIconInner) {
          menuIconInner.classList.remove('fa-bars');
          menuIconInner.classList.add('fa-times');
        }
      }
    });
  }

  // زرار تسجيل الدخول ينقل لصفحة login.html
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = "login.html";
    });
  }

  // زرار إنشاء حساب ينقل لصفحة signup.html
  const signupBtn = document.getElementById('signupBtn');
  if (signupBtn) {
    signupBtn.addEventListener('click', () => {
      window.location.href = "signup.html";
    });
  }

  // السلايدر
  const slides = document.querySelector('.slides');
  const slideItems = document.querySelectorAll('.slide');
  
  if (slides && slideItems.length > 0) {
    const slideCount = slideItems.length;
    let index = 0;

    function showSlide(i) {
      index = (i + slideCount) % slideCount;
      slides.style.transform = `translateX(-${index * 100}%)`;
    }

    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (prevBtn) prevBtn.addEventListener('click', () => showSlide(index - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showSlide(index + 1));

    // تشغيل تلقائي للسلايدر
    setInterval(() => showSlide(index + 1), 4000);
  }

  // التحقق من الفورم (Validation)
  const signupForm = document.querySelector('#signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      const name = signupForm.querySelector('#name').value.trim();
      const email = signupForm.querySelector('#email').value.trim();
      const password = signupForm.querySelector('#password').value.trim();

      let errors = [];

      if (name.length < 3) {
        errors.push("⚠️ الاسم لازم يكون 3 حروف على الأقل");
      }
      if (!email.includes("@")) {
        errors.push("⚠️ البريد الإلكتروني غير صالح");
      }
      if (password.length < 6) {
        errors.push("⚠️ كلمة المرور لازم تكون 6 أحرف على الأقل");
      }

      if (errors.length > 0) {
        e.preventDefault();
        alert(errors.join("\n"));
      }
    });
  }

  // === 🔒 منع فتح صفحات المدرسين لغير المسجلين ===
  const teacherLinks = document.querySelectorAll('.slide a');

  function showAuthModal() {
    if (document.getElementById('authModal')) return; // منع تكرار النافذة

    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'authModal';
    modalOverlay.className = 'custom-modal-overlay';
    modalOverlay.innerHTML = `
      <div class="custom-modal-content">
        <span class="close-modal">&times;</span>
        <i class="fas fa-user-lock modal-icon"></i>
        <h3>شكلك مش عامل حساب</h3>
        <p>يرجى تسجيل الدخول أو إنشاء حساب جديد للوصول لصفحة المدرس.</p>
        <div class="modal-buttons">
          <button class="modal-login-btn" onclick="window.location.href='login.html'">
            <i class="fas fa-sign-in-alt"></i> تسجيل دخول
          </button>
          <button class="modal-signup-btn" onclick="window.location.href='signup.html'">
            <i class="fas fa-user-plus"></i> إنشاء حساب
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modalOverlay);

    // إغلاق النافذة عند الضغط على زر الإغلاق أو خلفية النافذة
    const closeBtn = modalOverlay.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => modalOverlay.remove());
    
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.remove();
    });
  }

  // فحص الضغط على أي صورة/رابط مدرس
  teacherLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (!isLoggedIn) {
        e.preventDefault(); // منع الانتقال لصفحة المدرس
        showAuthModal();   // إظهار الرسالة بالأزرار
      }
    });
  });

});