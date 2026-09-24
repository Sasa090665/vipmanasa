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
      navTodo: "منظم المذاكرة",
      navContact: "تواصل معنا",
      navTravel: "الرحلات و الترفيه",
      navProfile: "بيانات المستخدم",
      aboutTitle: "من نحن",
      aboutText: "سنتر VIP Royal يقدم أفضل الكورسات التعليمية في مختلف المجالات مع نخبة من المدرسين.",
      coursesTitle: "الكورسات المتاحة",
      address: "زهراء اكتوبر - حي الفيروز - رويال مول - الدور 3",
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
      navTodo: "Study Planner",
      navContact: "Contact",
      navTravel: "Trips & Entertainment",
      navProfile: "User Profile",
      aboutTitle: "About Us",
      aboutText: "VIP Royal offers the best educational courses in various fields with top teachers.",
      coursesTitle: "Available Courses",
      address: "Zahraa October - Al Fayrouz - Royal Mall - Floor 3",
      footerText: "© 2026 All Rights Reserved - VIP Royal Center",
      searchPlaceholder: "Search for a teacher...",
      noResults: "No results found"
    }
  };

  // === 🌐 زر تغيير اللغة ===
  const langBtn = document.getElementById('langBtn');
  let currentLang = 'ar';

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'ar' ? 'en' : 'ar';
      const t = translations[currentLang];

      document.documentElement.setAttribute("dir", currentLang === 'ar' ? "rtl" : "ltr");
      document.documentElement.setAttribute("lang", currentLang);

      if (document.getElementById('title')) document.getElementById('title').textContent = t.title;
      if (document.getElementById('subtitle')) document.getElementById('subtitle').textContent = t.subtitle;
      
      const loginBtnEl = document.getElementById('loginBtn');
      if (loginBtnEl) loginBtnEl.innerHTML = t.loginBtn;
      
      const signupBtnEl = document.getElementById('signupBtn');
      if (signupBtnEl) signupBtnEl.innerHTML = t.signupBtn;

      if (document.getElementById('navAbout')) document.getElementById('navAbout').textContent = t.navAbout;
      if (document.getElementById('navCourses')) document.getElementById('navCourses').textContent = t.navCourses;
      if (document.getElementById('navTodo')) document.getElementById('navTodo').innerHTML = `<i class="fas fa-tasks"></i> ${t.navTodo}`;
      if (document.getElementById('navContact')) document.getElementById('navContact').textContent = t.navContact;
      if (document.getElementById('navTravel')) document.getElementById('navTravel').textContent = t.navTravel;
      if (document.getElementById('aboutTitle')) document.getElementById('aboutTitle').textContent = t.aboutTitle;
      if (document.getElementById('aboutText')) document.getElementById('aboutText').textContent = t.aboutText;
      if (document.getElementById('coursesTitle')) document.getElementById('coursesTitle').textContent = t.coursesTitle;
      if (document.getElementById('address')) document.getElementById('address').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${t.address}`;
      if (document.getElementById('footerText')) document.getElementById('footerText').textContent = t.footerText;
      
      const searchInput = document.getElementById('searchInput');
      if (searchInput) searchInput.placeholder = t.searchPlaceholder;

      const navProfile = document.getElementById('navProfile');
      if (navProfile) navProfile.textContent = t.navProfile;

      langBtn.textContent = currentLang === 'ar' ? "EN" : "AR";
      
      showSlide(index);
    });
  }

  // === 🔑 التحقق من حالة تسجيل الدخول ===
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true" || localStorage.getItem("student") !== null;

  if (isLoggedIn) {
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) authButtons.style.display = 'none';

    const navLinks = document.getElementById('navLinks');
    if (navLinks && !document.getElementById('navProfile')) {
      const profileLink = document.createElement('a');
      profileLink.href = "user.html";
      profileLink.id = "navProfile";
      profileLink.textContent = currentLang === 'ar' ? translations.ar.navProfile : translations.en.navProfile; 
      navLinks.appendChild(profileLink);
    }
  }

  // === 🔍 قائمة المدرسين والبحث ===
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

  if (searchToggleBtn && searchDropdown && searchInput) {
    searchToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      searchDropdown.classList.toggle('active');
      if (searchDropdown.classList.contains('active')) {
        searchInput.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        searchDropdown.classList.remove('active');
      }
    });

    searchInput.addEventListener('input', () => {
      const val = searchInput.value.trim().toLowerCase();
      searchResults.innerHTML = '';
      
      if (val === '') return;

      const filtered = teachersList.filter(t => t.name.toLowerCase().includes(val));
      
      if (filtered.length === 0) {
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
             searchInput.value = '';
          } else {
             window.location.href = t.url;
          }
        });
        searchResults.appendChild(li);
      });
    });
  }

  // === 💬 ظهور زر الواتساب عند السكرول ===
  const whatsappIcon = document.querySelector('.whatsapp-icon');
  if (whatsappIcon) {
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
        whatsappIcon.classList.add('show');
      } else {
        whatsappIcon.classList.remove('show');
      }
    });
  }

  // === 📱 قائمة الموبايل ===
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
        setTimeout(() => navLinksElement.classList.remove('hide'), 400);
      } else {
        navLinksElement.classList.add('show');
        if (menuIconInner) {
          menuIconInner.classList.remove('fa-bars');
          menuIconInner.classList.add('fa-times');
        }
      }
    });
  }

  // === 🚀 أزرار التسجيل ===
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) loginBtn.addEventListener('click', () => window.location.href = "login.html");

  const signupBtn = document.getElementById('signupBtn');
  if (signupBtn) signupBtn.addEventListener('click', () => window.location.href = "signup.html");

  // === 🖼️ سلايدر المدرسين ===
  const slides = document.querySelector('.slides');
  const slideItems = document.querySelectorAll('.slide');
  let index = 0;
  
  function showSlide(i) {
    if (!slides || slideItems.length === 0) return;
    const slideCount = slideItems.length;
    index = (i + slideCount) % slideCount;
    const isLtr = document.documentElement.getAttribute('dir') === 'ltr';
    const direction = isLtr ? '-' : '';
    slides.style.transform = `translateX(${direction}${index * 100}%)`;
  }

  if (slides && slideItems.length > 0) {
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (prevBtn) prevBtn.addEventListener('click', () => showSlide(index - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showSlide(index + 1));

    setInterval(() => showSlide(index + 1), 4000);
  }

  // === 🔒 نافذة تنبيه تسجيل الدخول (Auth Modal) ===
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
        <p>يرجى تسجيل الدخول أو إنشاء حساب جديد للوصول لصفحة المدرس أو منظم المذاكرة.</p>
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

    const closeModal = () => modalOverlay.remove();

    const closeBtn = modalOverlay.querySelector('.close-modal');
    closeBtn.addEventListener('click', closeModal);
    
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    });
  }

  // حماية روابط المدرسين
  const teacherLinks = document.querySelectorAll('.slide a');
  teacherLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (!isLoggedIn) {
        e.preventDefault();
        showAuthModal();
      }
    });
  });

  // === 📝 نظام منظم المذاكرة للطلاب (To-Do List) ===
  const todoModal = document.getElementById('todoModal');
  const todoFloatBtn = document.getElementById('todoFloatBtn');
  const navTodo = document.getElementById('navTodo');
  const closeTodoModal = document.getElementById('closeTodoModal');
  const todoInput = document.getElementById('todoInput');
  const addTodoBtn = document.getElementById('addTodoBtn');
  const todoList = document.getElementById('todoList');
  const todoProgressText = document.getElementById('todoProgressText');
  const todoProgressBarFill = document.getElementById('todoProgressBarFill');

  let tasks = JSON.parse(localStorage.getItem('vip_royal_tasks')) || [];

  // فتح النافذة بشرط تسجيل الدخول
  const openTodoModal = (e) => {
    if (e) e.preventDefault();

    // التحقق من حالة تسجيل الدخول أولاً
    if (!isLoggedIn) {
      showAuthModal();
      return;
    }

    if (todoModal) todoModal.classList.add('active');
  };

  const closeTodoModalFn = () => {
    if (todoModal) todoModal.classList.remove('active');
  };

  if (todoFloatBtn) todoFloatBtn.addEventListener('click', openTodoModal);
  if (navTodo) navTodo.addEventListener('click', openTodoModal);
  if (closeTodoModal) closeTodoModal.addEventListener('click', closeTodoModalFn);

  if (todoModal) {
    todoModal.addEventListener('click', (e) => {
      if (e.target === todoModal) closeTodoModalFn();
    });
  }

  // حفظ وحساب المهام
  function saveAndRenderTasks() {
    localStorage.setItem('vip_royal_tasks', JSON.stringify(tasks));
    renderTasks();
  }

  function renderTasks() {
    if (!todoList) return;
    todoList.innerHTML = '';

    if (tasks.length === 0) {
      todoList.innerHTML = `<li class="empty-todo">لا توجد مهام مذاكرة حالياً. ابدأ بإضافة دروسك!</li>`;
    } else {
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
          <div class="todo-item-left" onclick="toggleTask(${index})">
            <i class="${task.completed ? 'fas fa-check-circle' : 'far fa-circle'}"></i>
            <span>${escapeHTML(task.text)}</span>
          </div>
          <button class="delete-task-btn" onclick="deleteTask(${index})" aria-label="حذف">
            <i class="fas fa-trash-alt"></i>
          </button>
        `;
        todoList.appendChild(li);
      });
    }

    // تحديث نسبة الإنجاز
    const completedCount = tasks.filter(t => t.completed).length;
    const totalCount = tasks.length;
    const percent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

    if (todoProgressText) {
      todoProgressText.textContent = `تم إنجاز ${completedCount} من ${totalCount} مهام (${percent}%)`;
    }
    if (todoProgressBarFill) {
      todoProgressBarFill.style.width = `${percent}%`;
    }
  }

  // إضافة مهمة جديدة
  function addNewTask() {
    const text = todoInput.value.trim();
    if (text === '') return;

    tasks.push({ text: text, completed: false });
    todoInput.value = '';
    saveAndRenderTasks();
  }

  if (addTodoBtn) addTodoBtn.addEventListener('click', addNewTask);
  if (todoInput) {
    todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addNewTask();
    });
  }

  // تغيير حالة المهمة (مكتملة / غير مكتملة)
  window.toggleTask = function(index) {
    tasks[index].completed = !tasks[index].completed;
    saveAndRenderTasks();
  };

  // حذف مهمة
  window.deleteTask = function(index) {
    tasks.splice(index, 1);
    saveAndRenderTasks();
  };

  // حماية من ثغرات XSS
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // تشغيل عند تحميل الصفحة
  renderTasks();

});