/**
 * ===================================================================
 * FIRST-YEAR STUDENT PORTFOLIO - MAIN JAVASCRIPT
 * 
 * Clean, well-structured, beginner-friendly Vanilla JavaScript.
 * Features:
 * 1. Dark / Light Theme Toggle (with localStorage persistence)
 * 2. Mobile Navigation Toggle (Hamburger menu)
 * 3. Interactive Code Snippet Tabs (C & Python) & Terminal Simulation
 * 4. Scroll Reveal Animations (IntersectionObserver)
 * 5. Active Section Indicator on Scroll
 * 6. Contact Form Validation & Friendly Alert
 * 7. Back-to-Top Button
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------
     1. DARK / LIGHT THEME TOGGLE
     -------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const rootElement = document.documentElement;

  // Check saved user preference from localStorage or fallback to system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    rootElement.setAttribute('data-theme', savedTheme);
  } else if (!prefersDark) {
    rootElement.setAttribute('data-theme', 'light');
  }

  // Toggle theme on button click
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = rootElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      rootElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  /* --------------------------------------------------
     2. MOBILE NAVIGATION MENU (HAMBURGER)
     -------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when a navigation link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --------------------------------------------------
     3. INTERACTIVE HERO TERMINAL (C & PYTHON TABS)
     -------------------------------------------------- */
  const tabC = document.getElementById('tab-c');
  const tabPy = document.getElementById('tab-py');
  const codeC = document.getElementById('code-c');
  const codePy = document.getElementById('code-py');
  const runCodeBtn = document.getElementById('run-code-btn');
  const consoleOutput = document.getElementById('console-output');
  const terminalStatus = document.getElementById('terminal-status');

  let activeLanguage = 'c';

  // Switch to C tab
  if (tabC && tabPy && codeC && codePy) {
    tabC.addEventListener('click', () => {
      tabC.classList.add('active');
      tabPy.classList.remove('active');
      codeC.classList.add('active');
      codePy.classList.remove('active');
      activeLanguage = 'c';
      resetConsole();
    });

    // Switch to Python tab
    tabPy.addEventListener('click', () => {
      tabPy.classList.add('active');
      tabC.classList.remove('active');
      codePy.classList.add('active');
      codeC.classList.remove('active');
      activeLanguage = 'python';
      resetConsole();
    });
  }

  function resetConsole() {
    if (consoleOutput) {
      consoleOutput.innerHTML = `<span class="console-line text-muted">&gt; Click "Simulate Output" to run ${activeLanguage === 'c' ? 'main.c' : 'journey.py'}...</span>`;
    }
    if (terminalStatus) {
      terminalStatus.textContent = 'Ready';
      terminalStatus.style.color = '#94a3b8';
    }
  }

  // Simulate code output execution
  if (runCodeBtn && consoleOutput && terminalStatus) {
    runCodeBtn.addEventListener('click', () => {
      terminalStatus.textContent = 'Compiling & Running...';
      terminalStatus.style.color = '#38bdf8';
      consoleOutput.innerHTML = `<span class="console-line text-muted">&gt; Executing program...</span>`;

      // Simulate execution time (400ms)
      setTimeout(() => {
        if (activeLanguage === 'c') {
          consoleOutput.innerHTML = `
            <div class="console-line">&gt; Hello, World! 👋</div>
            <div class="console-line">&gt; Currently exploring C &amp; Python.</div>
            <div class="console-line">&gt; Every expert was once a beginner.</div>
            <div class="console-line text-muted" style="margin-top: 4px; font-size: 0.75rem;">[Process returned 0 (0x0) - Execution time: 0.042 s]</div>
          `;
        } else {
          consoleOutput.innerHTML = `
            <div class="console-line">&gt; Exploring fundamentals of C...</div>
            <div class="console-line">&gt; Exploring fundamentals of Python...</div>
            <div class="console-line text-muted" style="margin-top: 4px; font-size: 0.75rem;">[Program finished successfully - Ready to keep learning]</div>
          `;
        }
        terminalStatus.textContent = 'Execution Finished';
        terminalStatus.style.color = '#34d399';
      }, 400);
    });
  }

  /* --------------------------------------------------
     4. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     -------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-fade');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Once revealed, no need to watch it again
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  /* --------------------------------------------------
     5. ACTIVE NAVBAR LINK HIGHLIGHTING
     -------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (matchingLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink(); // Initial call

  /* --------------------------------------------------
     6. CONTACT FORM VALIDATION & FEEDBACK
     -------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const formAlert = document.getElementById('form-alert');

  // Simple email format regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.classList.add('is-invalid');
        isValid = false;
      } else {
        nameInput.classList.remove('is-invalid');
      }

      // Validate Email
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('is-invalid');
        isValid = false;
      } else {
        emailInput.classList.remove('is-invalid');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.classList.add('is-invalid');
        isValid = false;
      } else {
        messageInput.classList.remove('is-invalid');
      }

      // If valid, display friendly confirmation
      if (isValid) {
        if (formAlert) {
          formAlert.style.display = 'flex';
          formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Reset the form fields
        contactForm.reset();

        // Optional: Hide alert after 8 seconds
        setTimeout(() => {
          if (formAlert) {
            formAlert.style.display = 'none';
          }
        }, 8000);
      }
    });

    // Remove invalid style as user types
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          if (input.value.trim()) {
            input.classList.remove('is-invalid');
          }
        });
      }
    });
  }

  /* --------------------------------------------------
     7. BACK-TO-TOP BUTTON
     -------------------------------------------------- */
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
