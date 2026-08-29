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
      address: "📍 زهراء اكتوبر - حي الفيروز - رويال مول - الدور 3",
      footerText: "© 2026 جميع الحقوق محفوظة لـ سنتر VIP Royal التعليمي",
      searchPlaceholder: "ابحث عن مدرس...",
      noResults: "لا يوجد نتائج"
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
      address: "📍 Zahraa October - Al Fayrouz - Royal Mall - Floor 3",
      footerText: "© 2026 All Rights Reserved - VIP Royal Center",
      searchPlaceholder: "Search for a teacher...",
      noResults: "No results found"
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
      if (document.getElementById('address')) document.getElementById('address').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${t.address}`;
      if (document.getElementById('footerText')) document.getElementById('footerText').textContent = t.footerText;
      
      // تغيير بليس هولدر البحث
      const searchInput = document.getElementById('searchInput');
      if (searchInput) searchInput.placeholder = t.searchPlaceholder;

      const navProfile = document.getElementById('navProfile');
      if (navProfile) {
        navProfile.textContent = t.navProfile;
      }

      langBtn.textContent = lang === 'ar' ? "EN" : "AR";
      currentLang = lang;
      document.body.setAttribute("dir", lang === 'ar' ? "rtl" : "ltr");
    });
  }

  // === ✅ التحقق من تسجيل الدخول وفحص الـ localStorage ===
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true" || localStorage.getItem("student") !== null;

  if (isLoggedIn) {
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
      authButtons.style.display = 'none';
    }

    const navLinks = document.getElementById('navLinks');
    if (navLinks && !document.getElementById('navProfile')) {
      const profileLink = document.createElement('a');
      profileLink.href = "user.html";
      profileLink.id = "navProfile";
      profileLink.textContent = currentLang === 'ar' ? translations.ar.navProfile : translations.en.navProfile; 
      
      navLinks.appendChild(profileLink);
    }
  }

  // === 🔍 ميزة البحث عن المدرسين ===
  const teachersList = [
    { name: "محمد عبد الله (القائد)", url: "kad.html" },
    { name: "سليمان العمري (السلطان)", url: "soliman.html" },
    { name: "محمد مجدي", url: "magdy.html" },
    { name: "محمد الكوري (الفيلسوف)", url: "elkory.html" },
    { name: "إسلام سعيد", url: "islam.html" },
    { name: "محمد منصور", url: "mansour.html" },
    { name: "البنا", url: "elbana.html" },
    { name: "اسلام الجنايني", url: "genena.html" },
    { name: "أستاذ سعيد", url: "said.html" },
    { name: "أستاذ سراج", url: "sarg.html" },
    { name: "أستاذ شعبان", url: "sha3ban.html" },
    { name: "طارق الزيدي", url: "tarek.html" },
    { name: "أستاذ الشهاوي", url: "shahawy.html" }
  ];

  const searchToggleBtn = document.getElementById('searchToggleBtn');
  const searchDropdown = document.getElementById('searchDropdown');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  if(searchToggleBtn && searchDropdown && searchInput) {
    // فتح وإغلاق مربع البحث
    searchToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      searchDropdown.classList.toggle('active');
      if(searchDropdown.classList.contains('active')) {
        searchInput.focus();
      }
    });

    // إغلاق المربع عند الضغط خارجه
    document.addEventListener('click', (e) => {
      if(!e.target.closest('.search-container')) {
        searchDropdown.classList.remove('active');
      }
    });

    // منطق البحث عند الكتابة
    searchInput.addEventListener('input', () => {
      const val = searchInput.value.trim().toLowerCase();
      searchResults.innerHTML = '';
      
      if (val === '') return;

      const filtered = teachersList.filter(t => t.name.toLowerCase().includes(val));
      
      if(filtered.length === 0) {
        const noResultMsg = currentLang === 'ar' ? translations.ar.noResults : translations.en.noResults;
        searchResults.innerHTML = `<li class="no-result">${noResultMsg}</li>`;
        return;
      }

      filtered.forEach(t => {
        const li = document.createElement('li');
        li.textContent = t.name;
        li.addEventListener('click', () => {
          if (!isLoggedIn) {
             showAuthModal();
             searchDropdown.classList.remove('active');
             searchInput.value = ''; // تفريغ الحقل
          } else {
             window.location.href = t.url;
          }
        });
        searchResults.appendChild(li);
      });
    });
  }

  // إظهار أيقونة واتساب عند الوصول لآخر الصفحة
  const whatsappIcon = document.querySelector('.whatsapp-icon');
  if (whatsappIcon) {
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 150) {
        whatsappIcon.classList.add('show');
      } else {
        whatsappIcon.classList.remove('show');
      }
    });
  }

  // القائمة المنسدلة للشبابيك الصغيرة (الموبايل)
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
          navLinksElement.classList.remove('hide');
        }, 400);
      } else {
        navLinksElement.classList.add('show');
        if (menuIconInner) {
          menuIconInner.classList.remove('fa-bars');
          menuIconInner.classList.add('fa-times');
        }
      }
    });
  }

  // التوجيه لصفحات التسجيل
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = "login.html";
    });
  }

  const signupBtn = document.getElementById('signupBtn');
  if (signupBtn) {
    signupBtn.addEventListener('click', () => {
      window.location.href = "signup.html";
    });
  }

  // === 🖼️ السلايدر التفاعلي (معدل مع دعم الـ RTL) ===
  const slides = document.querySelector('.slides');
  const slideItems = document.querySelectorAll('.slide');
  
  if (slides && slideItems.length > 0) {
    const slideCount = slideItems.length;
    let index = 0;

    function showSlide(i) {
      index = (i + slideCount) % slideCount;
      const direction = document.body.getAttribute('dir') === 'ltr' ? '-' : '';
      slides.style.transform = `translateX(${direction}${index * 100}%)`;
    }

    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (prevBtn) prevBtn.addEventListener('click', () => showSlide(index - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showSlide(index + 1));

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

  // === 🔒 دالة منع الدخول وإظهار الرسالة (الـ Modal) ===
  function showAuthModal() {
    if (document.getElementById('authModal')) return;

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

    const closeBtn = modalOverlay.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => modalOverlay.remove());
    
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.remove();
    });
  }

  // منع فتح صفحات المدرسين من السلايدر لغير المسجلين
  const teacherLinks = document.querySelectorAll('.slide a');
  teacherLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (!isLoggedIn) {
        e.preventDefault();
        showAuthModal();
      }
    });
  });

});