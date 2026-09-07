/**
 * InviteElegance - Application Router & Main Controller
 */

window.appRouter = {
  currentView: 'landing',

  init() {
    this.bindNavigation();
    this.handleInitialRoute();
  },

  navigate(viewName) {
    this.currentView = viewName;
    document.querySelectorAll('.app-view').forEach(el => el.classList.remove('active-view'));

    const targetEl = document.getElementById(`${viewName}View`);
    if (targetEl) {
      targetEl.classList.add('active-view');
      window.scrollTo(0, 0);
    }

    if (viewName === 'dashboard' && window.Dashboard) {
      window.Dashboard.init();
    } else if (viewName === 'invitation' && window.Invitation) {
      window.Invitation.renderLivePage();
    }
  },

  bindNavigation() {
    window.addEventListener('hashchange', () => this.handleInitialRoute());
  },

  handleInitialRoute() {
    const hash = window.location.hash.replace('#', '');
    if (['landing', 'customizer', 'dashboard', 'invitation'].includes(hash)) {
      this.navigate(hash);
    } else {
      this.navigate('landing');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.appRouter.init();
  initLandingPageFeatures();
});

function initLandingPageFeatures() {
  initMobileMenu();
  initTemplatesShowcase();
  initStep2Demo();
  initFAQAccordion();
  initSmoothScroll();
}

function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileOverlay');

  if (toggle && drawer && overlay) {
    const toggleFn = () => {
      drawer.classList.toggle('open');
      overlay.classList.toggle('open');
    };
    toggle.onclick = toggleFn;
    overlay.onclick = toggleFn;
  }
}

const ALL_TEMPLATES = [
  { id: 'crimson-royale', name: 'Crimson Royale', tier: 'Signature', price: 499, tag: 'Royal & Classic', bgClass: 'bg-crimson', image: 'assets/crimson_royale.jpg' },
  { id: 'whispering-leaves', name: 'Whispering Leaves', tier: 'Signature', price: 499, tag: 'Botanical Elegance', bgClass: 'bg-botanical', image: null },
  { id: 'emerald-royale', name: 'Emerald Royale', tier: 'Signature', price: 499, tag: 'Royal Emerald & Gold', bgClass: 'bg-emerald', image: null },
  { id: 'midnight-luxe', name: 'Midnight Luxe', tier: 'Signature', price: 499, tag: 'Deep Midnight Glamour', bgClass: 'bg-midnight', image: null },
  { id: 'azure-dreams', name: 'Azure Dreams', tier: 'Signature', price: 499, tag: 'Oceanic Serenade', bgClass: 'bg-azure', image: null },
  { id: 'emerald-qasr', name: 'Emerald Qasr', tier: 'Signature', price: 499, tag: 'Mughal Heritage', bgClass: 'bg-emerald', image: null },
  { id: 'zaytoon', name: 'Zaytoon', tier: 'Signature', price: 499, tag: 'Olive Minimalist', bgClass: 'bg-botanical', image: null },
  { id: 'noor-e-nikah', name: 'Noor-e-Nikah', tier: 'Signature', price: 499, tag: 'Celestial Pure White', bgClass: 'bg-gold', image: null },
  { id: 'reshm-e-noor', name: 'Reshm-e-Noor', tier: 'Signature', price: 499, tag: 'Silk & Gold Sparkle', bgClass: 'bg-crimson', image: null },
  { id: 'golden-noir', name: 'Golden Noir', tier: 'Signature', price: 499, tag: 'Luxury Black & Gold', bgClass: 'bg-gold', image: null },

  { id: 'grand-celebration', name: 'Grand Celebration', tier: 'Grand', price: 799, tag: 'Grand Indian Wedding', bgClass: 'bg-gold', image: null },
  { id: 'royal-blush', name: 'Royal Blush', tier: 'Grand', price: 799, tag: 'Pastel Rose & Gold', bgClass: 'bg-blush', image: null },
  { id: 'anand-karaj', name: 'Anand Karaj', tier: 'Grand', price: 799, tag: 'Traditional Floral', bgClass: 'bg-crimson', image: null },
  { id: 'scarlet-stamp', name: 'Scarlet Stamp', tier: 'Grand', price: 799, tag: 'Vintage Wax Seal', bgClass: 'bg-crimson', image: null },
  { id: 'gilded-veil', name: 'Gilded Veil', tier: 'Grand', price: 799, tag: 'Shimmering Gold Lace', bgClass: 'bg-gold', image: null },
  { id: 'azure-royale', name: 'Azure Royale', tier: 'Grand', price: 799, tag: 'Royal Blue Velvet', bgClass: 'bg-azure', image: null },

  { id: 'royal-lotus', name: 'Royal Lotus', tier: 'Tier 3', price: 999, tag: 'Heritage Lotus Motif', bgClass: 'bg-blush', image: null },
  { id: 'south-mandapam', name: 'South Mandapam', tier: 'Tier 3', price: 999, tag: 'Traditional South Mandapam', bgClass: 'bg-south', image: null }
];

function initTemplatesShowcase() {
  const container = document.getElementById('templatesGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!container) return;

  const render = (filter = 'all') => {
    container.innerHTML = '';
    const filtered = ALL_TEMPLATES.filter(t => {
      if (filter === 'all') return true;
      if (filter === '499') return t.price === 499;
      if (filter === '799') return t.price === 799;
      if (filter === '999') return t.price === 999;
      return true;
    });

    filtered.forEach(tmpl => {
      const card = document.createElement('div');
      card.className = 'template-card';

      const visual = tmpl.image 
        ? `<img src="${tmpl.image}" alt="${tmpl.name}">`
        : `<div class="card-graphic-bg ${tmpl.bgClass}">
            <div>${tmpl.name}</div>
            <div>${tmpl.tag}</div>
           </div>`;

      card.innerHTML = `
        <div class="template-thumb">
          ${visual}
          <div class="template-price-tag">₹${tmpl.price}</div>
          <div class="template-preview-overlay">
            <button class="btn btn-gold btn-sm" onclick="startCustomizing('${tmpl.id}')">
              Customize Design
            </button>
            <button class="btn btn-secondary btn-sm" onclick="openModalPreview('${tmpl.id}')">
              Quick Preview
            </button>
          </div>
        </div>
        <div class="template-body">
          <div>
            <div class="template-tier">${tmpl.tier} Collection</div>
            <h3 class="template-title">${tmpl.name}</h3>
          </div>
          <div class="template-actions">
            <button class="btn btn-gold btn-sm" style="width: 100%;" onclick="startCustomizing('${tmpl.id}')">
              Customize & Order (₹${tmpl.price})
            </button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  };

  filterBtns.forEach(b => {
    b.onclick = (e) => {
      filterBtns.forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      render(e.target.dataset.filter);
    };
  });

  render('all');
}

function startCustomizing(tmplId) {
  const tmplObj = ALL_TEMPLATES.find(t => t.id === tmplId) || ALL_TEMPLATES[0];
  window.Customizer.loadTemplate(tmplObj);
  appRouter.navigate('customizer');
}

function openModalPreview(tmplId) {
  const tmplObj = ALL_TEMPLATES.find(t => t.id === tmplId) || ALL_TEMPLATES[0];
  const modal = document.getElementById('previewModal');
  const body = document.getElementById('modalPreviewBody');
  const title = document.getElementById('modalTemplateTitle');

  if (title) title.textContent = `${tmplObj.name} (${tmplObj.tier} Collection - ₹${tmplObj.price})`;
  if (body) {
    body.innerHTML = `
      <div style="text-align: center; background: var(--bg-alt); padding: 2rem; border-radius: 12px; margin-bottom: 1.5rem;">
        <h2 style="font-family: var(--font-serif); font-size: 2.5rem; margin-bottom: 0.5rem;">Ananya & Kabir</h2>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">DECEMBER 14, 2026 • UDAIPUR PALACE</p>
        <button class="btn btn-gold btn-lg" onclick="closeModalPreview(); startCustomizing('${tmplObj.id}');">
          Customize & Purchase This Template (₹${tmplObj.price})
        </button>
      </div>
    `;
  }
  if (modal) modal.classList.add('active');
}

function closeModalPreview() {
  const modal = document.getElementById('previewModal');
  if (modal) modal.classList.remove('active');
}

function initStep2Demo() {
  const bInp = document.getElementById('editorBride');
  const gInp = document.getElementById('editorGroom');
  const pName = document.getElementById('phoneCoupleNames');
  const pMono = document.getElementById('phoneMonogram');

  if (bInp && gInp && pName) {
    const update = () => {
      const b = bInp.value || 'Ananya';
      const g = gInp.value || 'Kabir';
      pName.textContent = `${b} & ${g}`;
      if (pMono) pMono.textContent = `${b.charAt(0)}&${g.charAt(0)}`;
    };
    bInp.oninput = update;
    gInp.oninput = update;
  }
}

function initFAQAccordion() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').onclick = () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    };
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.onclick = function(e) {
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#') && targetId.length > 1) {
        const el = document.querySelector(targetId);
        if (el) {
          e.preventDefault();
          const headerHeight = 80;
          const pos = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({ top: pos, behavior: 'smooth' });
        }
      }
    };
  });
}

function showToast(msg) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
