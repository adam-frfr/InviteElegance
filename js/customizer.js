/**
 * InviteElegance - Template Customization Studio Engine
 */

window.Customizer = {
  // Current active draft state
  draft: {
    templateId: 'crimson-royale',
    templateName: 'Crimson Royale',
    tier: 'Signature',
    price: 499,
    brideName: 'Ananya',
    groomName: 'Kabir',
    tagline: 'Together with their families',
    weddingDate: '2026-12-14',
    weddingTime: '05:00 PM',
    venueName: 'The City Palace',
    venueCity: 'Udaipur, Rajasthan',
    mapLink: 'https://maps.google.com',
    story: 'We met in college six years ago and bonded over shared laughter, coffee, and a love for travel. Now we invite you to celebrate our union!',
    colorTheme: 'bg-crimson',
    fontPair: 'playfair',
    showCountdown: true,
    showRsvp: true,
    showGallery: true,
    events: [
      { name: 'Mehendi & Sangeet', date: 'Dec 13, 2026', time: '04:00 PM', venue: 'Palace Gardens', dressCode: 'Traditional Colorful' },
      { name: 'Wedding Ceremony', date: 'Dec 14, 2026', time: '05:00 PM', venue: 'Grand Courtyard', dressCode: 'Royal Ethnic' },
      { name: 'Reception', date: 'Dec 15, 2026', time: '07:30 PM', venue: 'Lakeside Pavilion', dressCode: 'Formal Black Tie / Tux' }
    ],
    photos: [
      'assets/hero_preview.jpg',
      'assets/crimson_royale.jpg'
    ]
  },

  init() {
    this.bindEvents();
    this.renderCustomizerForm();
    this.updatePreview();
  },

  loadTemplate(templateObj) {
    if (templateObj) {
      this.draft.templateId = templateObj.id;
      this.draft.templateName = templateObj.name;
      this.draft.tier = templateObj.tier;
      this.draft.price = templateObj.price;
      this.draft.colorTheme = templateObj.bgClass || 'bg-crimson';
    }
    this.renderCustomizerForm();
    this.updatePreview();
  },

  bindEvents() {
    // Tab Switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.customizer-tab-panel').forEach(p => p.classList.remove('active'));
        
        e.currentTarget.classList.add('active');
        const tabId = e.currentTarget.dataset.tab;
        const panel = document.getElementById(`panel-${tabId}`);
        if (panel) panel.classList.add('active');
      });
    });

    // Device View Switcher
    document.querySelectorAll('.device-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        const mode = e.currentTarget.dataset.device;
        const frameWrapper = document.getElementById('studioPreviewFrame');
        if (frameWrapper) {
          frameWrapper.className = `preview-frame-wrapper mode-${mode}`;
        }
      });
    });
  },

  renderCustomizerForm() {
    const brideInp = document.getElementById('custBride');
    const groomInp = document.getElementById('custGroom');
    const dateInp = document.getElementById('custDate');
    const timeInp = document.getElementById('custTime');
    const venueInp = document.getElementById('custVenue');
    const cityInp = document.getElementById('custCity');
    const storyInp = document.getElementById('custStory');
    const titleEl = document.getElementById('customizerTitle');

    if (brideInp) brideInp.value = this.draft.brideName;
    if (groomInp) groomInp.value = this.draft.groomName;
    if (dateInp) dateInp.value = this.draft.weddingDate;
    if (timeInp) timeInp.value = this.draft.weddingTime;
    if (venueInp) venueInp.value = this.draft.venueName;
    if (cityInp) cityInp.value = this.draft.venueCity;
    if (storyInp) storyInp.value = this.draft.story;
    if (titleEl) titleEl.textContent = `Customizing: ${this.draft.templateName} (₹${this.draft.price})`;

    this.bindInputs();
  },

  bindInputs() {
    const inputs = ['custBride', 'custGroom', 'custDate', 'custTime', 'custVenue', 'custCity', 'custStory'];
    inputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.oninput = () => {
          this.draft.brideName = document.getElementById('custBride').value || 'Ananya';
          this.draft.groomName = document.getElementById('custGroom').value || 'Kabir';
          this.draft.weddingDate = document.getElementById('custDate').value || '2026-12-14';
          this.draft.weddingTime = document.getElementById('custTime').value || '05:00 PM';
          this.draft.venueName = document.getElementById('custVenue').value || 'The City Palace';
          this.draft.venueCity = document.getElementById('custCity').value || 'Udaipur';
          this.draft.story = document.getElementById('custStory').value || '';
          this.updatePreview();
        };
      }
    });
  },

  setTheme(colorClass) {
    this.draft.colorTheme = colorClass;
    this.updatePreview();
  },

  updatePreview() {
    const container = document.getElementById('studioLiveRender');
    if (!container) return;

    const bName = this.draft.brideName;
    const gName = this.draft.groomName;
    const dStr = window.Invitation ? window.Invitation.formatDate(this.draft.weddingDate) : this.draft.weddingDate;
    const vStr = `${this.draft.venueName}, ${this.draft.venueCity}`;

    container.innerHTML = `
      <div class="card-graphic-bg ${this.draft.colorTheme}" style="height: 100%; padding: 2rem; overflow-y: auto;">
        <div style="font-family: var(--font-serif); font-size: 0.85rem; letter-spacing: 0.03em; margin-bottom: 1rem; opacity: 0.85; font-style: italic;">
          ${this.draft.tagline}
        </div>

        <div style="width: 54px; height: 54px; border-radius: 50%; border: 1px solid currentColor; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; font-family: var(--font-serif); font-size: 1.1rem;">
          ${bName.charAt(0)}&${gName.charAt(0)}
        </div>

        <h1 style="font-family: var(--font-serif); font-size: 2.2rem; line-height: 1.2; margin-bottom: 0.75rem;">
          ${bName} & ${gName}
        </h1>

        <div style="font-size: 0.9rem; letter-spacing: 0.05em; margin-bottom: 1.5rem; opacity: 0.95;">
          ${dStr} • ${this.draft.weddingTime}
        </div>

        <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(6px); padding: 0.6rem 1.2rem; border-radius: var(--radius-pill); font-size: 0.8125rem; display: inline-block; margin-bottom: 2rem;">
          ${vStr}
        </div>

        <!-- Simulated Countdown -->
        <div style="display: flex; justify-content: center; gap: 0.75rem; margin-bottom: 2rem;">
          <div style="background: rgba(0,0,0,0.22); padding: 0.5rem 0.8rem; border-radius: 8px; min-width: 55px; text-align: center;">
            <div style="font-size: 1.2rem; font-weight: 600;">103</div>
            <div style="font-size: 0.62rem; opacity: 0.75;">days</div>
          </div>
          <div style="background: rgba(0,0,0,0.22); padding: 0.5rem 0.8rem; border-radius: 8px; min-width: 55px; text-align: center;">
            <div style="font-size: 1.2rem; font-weight: 600;">14</div>
            <div style="font-size: 0.62rem; opacity: 0.75;">hours</div>
          </div>
          <div style="background: rgba(0,0,0,0.22); padding: 0.5rem 0.8rem; border-radius: 8px; min-width: 55px; text-align: center;">
            <div style="font-size: 1.2rem; font-weight: 600;">42</div>
            <div style="font-size: 0.62rem; opacity: 0.75;">mins</div>
          </div>
        </div>

        <!-- Events List -->
        <div style="text-align: left; background: rgba(0,0,0,0.15); padding: 1.25rem; border-radius: 12px; margin-bottom: 2rem;">
          <div style="font-weight: 600; font-size: 0.85rem; margin-bottom: 0.75rem;">Wedding schedule</div>
          ${this.draft.events.map(e => `
            <div style="margin-bottom: 0.6rem; font-size: 0.8125rem;">
              <strong style="color: #fff;">${e.name}</strong><br>
              <span>${e.date} at ${e.time} (${e.venue})</span>
            </div>
          `).join('')}
        </div>

        <button class="btn btn-gold btn-sm" onclick="showToast('Live preview updated')">
          RSVP for wedding
        </button>
      </div>
    `;
  },

  proceedToCheckout() {
    window.Checkout.open(this.draft);
  }
};
