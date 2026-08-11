// ===========================================================
// Zexify Tech — shared site script
// Handles: mobile nav toggle, scroll-reveal animation
// ===========================================================

document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
    });
    // close menu when a link is tapped
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
      });
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Inquiry form -> compose an email with the details (no backend on a static site)
  var form = document.getElementById('inquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('f-name').value.trim();
      var contact = document.getElementById('f-email').value.trim();
      var service = document.getElementById('f-service').value;
      var msg = document.getElementById('f-msg').value.trim();

      var subject = 'New Inquiry from ' + (name || 'Website Visitor') + ' — ' + service;
      var body =
        'Name: ' + name + '\n' +
        'Email/Phone: ' + contact + '\n' +
        'Service Needed: ' + service + '\n\n' +
        'Project Overview:\n' + (msg || '—');

      var mailto = 'mailto:zexifytech@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      window.location.href = mailto;
    });
  }

});

// Welcome Popup logic
document.addEventListener('DOMContentLoaded', function () {
  const popup = document.getElementById('welcome-popup');
  const closeBtn = document.getElementById('popup-close');

  if (popup) {
    // Thoda delay ke saath popup dikhayenge
    setTimeout(() => {
      popup.classList.add('show');
    }, 800);

    closeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      popup.classList.remove('show');
    });

    // Overlay ke bahar click karne pe bhi close ho jaye
    popup.addEventListener('click', function (e) {
      if (e.target === popup) {
        popup.classList.remove('show');
      }
    });
  }
});
