document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavigation();
  initScrollAnimations();
  initScrollToTop();
  initContactForm();
});

function initLoader() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loadingScreen = document.getElementById('loading-screen');
      loadingScreen.classList.add('hidden');
    }, 800);
  });
}

function initNavigation() {
  const header = document.getElementById('header');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('href').startsWith('#')) {
        e.preventDefault();

        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const headerHeight = header.offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');

          if (navMenu.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
          }
        }
      }
    });
  });

  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + header.offsetHeight + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

function initScrollToTop() {
  const scrollToTopBtn = document.getElementById('scrollToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// function initContactForm() {
//   const form = document.getElementById('contactForm');
//   const formSuccess = document.getElementById('formSuccess');

//   form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       const formData = new FormData(form);
//       const data = Object.fromEntries(formData);

//       console.log('Form submitted:', data);

//       form.style.display = 'none';
//       formSuccess.style.display = 'block';

//       setTimeout(() => {
//         form.reset();
//         form.style.display = 'flex';
//         formSuccess.style.display = 'none';
//         clearErrors();
//       }, 5000);
//     }
//   });

function initContactForm() {
  const form = document.querySelector('.contact-form');

  if (!form) return; // 🔥 Prevent error if form doesn't exist

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("Form submitted");
  });
}

  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });

    input.addEventListener('input', () => {
      if (input.parentElement.classList.contains('error')) {
        validateField(input);
      }
    });
  });


function validateForm() {
  const name = document.getElementById('name');
  const phone = document.getElementById('phone');
  const email = document.getElementById('email');
  const requirement = document.getElementById('requirement');
  const message = document.getElementById('message');

  let isValid = true;

  if (!validateField(name)) isValid = false;
  if (!validateField(phone)) isValid = false;
  if (!validateField(email)) isValid = false;
  if (!validateField(requirement)) isValid = false;
  if (!validateField(message)) isValid = false;

  return isValid;
}

function validateField(field) {
  const formGroup = field.parentElement;
  const errorMessage = formGroup.querySelector('.error-message');

  formGroup.classList.remove('error');

  if (!field.value.trim()) {
    showError(formGroup, errorMessage, 'This field is required');
    return false;
  }

  if (field.type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      showError(formGroup, errorMessage, 'Please enter a valid email address');
      return false;
    }
  }

  if (field.type === 'tel') {
    const phoneRegex = /^[0-9]{10}$/;
    const cleanPhone = field.value.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      showError(formGroup, errorMessage, 'Please enter a valid phone number');
      return false;
    }
  }

  return true;
}

function showError(formGroup, errorMessage, message) {
  formGroup.classList.add('error');
  errorMessage.textContent = message;
}

function clearErrors() {
  const formGroups = document.querySelectorAll('.form-group');
  formGroups.forEach(group => {
    group.classList.remove('error');
  });
}
