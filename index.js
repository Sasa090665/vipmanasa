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
      footerText: "© 2026 سنتر VIP Royal التعليمي",
      course1: "عربي",
      course1Text: "قواعد اللغة والتعبير.",
      course2: "إنجليزي",
      course2Text: "مستويات مختلفة تناسب الجميع.",
      course3: "علوم",
      course3Text: "تجارب عملية وفهم عميق.",
      course4: "تاريخ",
      course4Text: "دراسة الأحداث التاريخية.",
      course5: "جغرافيا",
      course5Text: "دراسة الأرض والخرائط.",
      course6: "فلسفة",
      course6Text: "التفكير النقدي والمنطقي.",
      course7: "رياضة",
      course7Text: "أنشطة بدنية وصحية.",
      course8: "علوم متكاملة",
      course8Text: "دمج العلوم المختلفة.",
      course9: "فيزياء",
      course9Text: "قوانين الطبيعة والطاقة.",
      course10: "برمجة",
      course10Text: "تعلم أساسيات البرمجة."
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
      footerText: "© 2026 VIP Royal Educational Center",
      course1: "Arabic",
      course1Text: "Grammar and expression.",
      course2: "English",
      course2Text: "Different levels for everyone.",
      course3: "Science",
      course3Text: "Experiments and deep understanding.",
      course4: "History",
      course4Text: "Study of historical events.",
      course5: "Geography",
      course5Text: "Study of earth and maps.",
      course6: "Philosophy",
      course6Text: "Critical and logical thinking.",
      course7: "Sports",
      course7Text: "Physical and healthy activities.",
      course8: "Integrated Sciences",
      course8Text: "Combining different sciences.",
      course9: "Physics",
      course9Text: "Laws of nature and energy.",
      course10: "Programming",
      course10Text: "Learn programming basics."
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

    // تحديث الكورسات
    for(let i=1; i<=10; i++){
      document.getElementById(`course${i}`).textContent = t[`course${i}`];
      document.getElementById(`course${i}Text`).textContent = t[`course${i}Text`];
    }

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

  // القائمة المنسدلة (٣ شرط) مع Slide Down/Up + تغيير الأيقونة
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
});