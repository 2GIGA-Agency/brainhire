/* ═══════════════════════════════════════════
   BRaiN HR — Shared Scripts (scripts.js)
   Menu, FAQ, reveal animations, Lucide init
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {

  // ─── BODY CLASS for reveal animations ───
  document.body.classList.add('js-loaded');

  // ─── HEADER MENU — hover-based ───
  var items = document.querySelectorAll('.mnav-item.has-mega, .mnav-item.has-drop');

  items.forEach(function(item) {
    var timer;

    item.addEventListener('mouseenter', function() {
      clearTimeout(timer);
      items.forEach(function(other) {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.add('open');
    });

    item.addEventListener('mouseleave', function() {
      timer = setTimeout(function() {
        item.classList.remove('open');
        item.querySelectorAll('.has-sub').forEach(function(s){ s.classList.remove('sub-open'); });
      }, 120);
    });

    var panel = item.querySelector('.mega-panel, .drop-panel');
    if (panel) {
      panel.addEventListener('mouseenter', function() { clearTimeout(timer); });
      panel.addEventListener('mouseleave', function() {
        timer = setTimeout(function() {
          item.classList.remove('open');
          item.querySelectorAll('.has-sub').forEach(function(s){ s.classList.remove('sub-open'); });
        }, 120);
      });
    }
  });

  // Sub-menu hover
  document.querySelectorAll('.has-sub').forEach(function(sub) {
    sub.addEventListener('mouseenter', function() {
      document.querySelectorAll('.has-sub').forEach(function(s){ s.classList.remove('sub-open'); });
      sub.classList.add('sub-open');
    });
  });

  // Escape to close
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      document.querySelectorAll('.mnav-item').forEach(function(el){ el.classList.remove('open'); });
      document.querySelectorAll('.has-sub').forEach(function(el){ el.classList.remove('sub-open'); });
    }
  });

  // ─── FAQ ACCORDION ───
  window.toggleFaq = function(btn) {
    var item = btn.closest('.faq-item');
    var isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(function(el) { el.classList.remove('open'); });
    if (!isOpen) item.classList.add('open');
  };

  // ─── REVEAL ON SCROLL (Intersection Observer) ───
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function(el) { observer.observe(el); });
  } else {
    // Fallback: show everything
    revealEls.forEach(function(el) { el.classList.add('visible'); });
  }

  // ─── LUCIDE ICONS (if loaded) ───
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

});

// ─── FLOAT VIDEO WIDGET ───
(function() {
  var vid = document.getElementById('floatVideo');
  var wrap = document.getElementById('floatVideoWrap');
  function tryPlay() {
    if (!vid) return;
    var p = vid.play();
    if (p !== undefined) {
      p.then(function() { wrap.classList.add('playing'); }).catch(function() {});
    }
  }
  if (vid) {
    vid.addEventListener('canplay', tryPlay, { once: true });
    vid.load();
  }
})();

function openFloatFullscreen() {
  var modal = document.getElementById('floatModal');
  var mv = document.getElementById('floatModalVideo');
  if (modal && mv) { modal.classList.add('open'); document.body.style.overflow = 'hidden'; mv.load(); }
}
function closeFloatModal() {
  var modal = document.getElementById('floatModal');
  var mv = document.getElementById('floatModalVideo');
  if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
  if (mv) { mv.pause(); mv.currentTime = 0; }
}
function closeFloatWidget() {
  var el = document.getElementById('floatWidget');
  if (el) el.style.display = 'none';
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeFloatModal();
});

// Legacy compat
function toggleMega() {}
function showSub(id) {
  document.querySelectorAll('.has-sub').forEach(function(e){ e.classList.remove('sub-open'); });
  var el = document.getElementById(id);
  if (el) el.classList.add('sub-open');
}
function hideSubs() {
  document.querySelectorAll('.has-sub').forEach(function(e){ e.classList.remove('sub-open'); });
}
