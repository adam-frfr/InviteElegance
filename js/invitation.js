/**
 * InviteElegance - Published Live Wedding Invitation Website Renderer
 */

window.Invitation = {
  formatDate(value) {
    if (!value) return '';
    const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (isoMatch) {
      const d = new Date(Number(isoMatch[1]), Number(isoMatch[2]) - 1, Number(isoMatch[3]));
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
    return value;
  },

  renderLivePage() {
    const dataStr = localStorage.getItem('publishedWebsite');
    const container = document.getElementById('invitationViewContainer');
    if (!container) return;

    let pubData = null;
    if (dataStr) {
      pubData = JSON.parse(dataStr);
    } else {
      // Default fallback demo data
      pubData = {
        subdomain: 'ananya-kabir.inviteelegance.in',
        draft: {
          brideName: 'Ananya',
          groomName: 'Kabir',
          tagline: 'TOGETHER WITH THEIR FAMILIES',
          weddingDate: 'December 14, 2026',
          weddingTime: '05:00 PM',
          venueName: 'The City Palace',
          venueCity: 'Udaipur, Rajasthan',
          story: 'We met in college six years ago and bonded over shared laughter, coffee, and a love for travel. Now we invite you to celebrate our union in the city of lakes!',
          colorTheme: 'bg-crimson',
          events: [
            { name: 'Mehendi & Sangeet', date: 'Dec 13, 2026', time: '04:00 PM', venue: 'Palace Gardens', dressCode: 'Traditional Colorful' },
            { name: 'Wedding Ceremony', date: 'Dec 14, 2026', time: '05:00 PM', venue: 'Grand Courtyard', dressCode: 'Royal Ethnic' },
            { name: 'Reception', date: 'Dec 15, 2026', time: '07:30 PM', venue: 'Lakeside Pavilion', dressCode: 'Formal Black Tie' }
          ]
        }
      };
    }

    const d = pubData.draft;

    container.innerHTML = `
      <div class="invitation-page">
        <!-- Invitation Top Bar -->
        <div style="background: rgba(27,21,18,0.92); color: #fff; padding: 0.75rem 2rem; display: flex; align-items: center; justify-content: space-between; position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;">
          <div style="font-size: 0.85rem; display: flex; align-items: center; gap: 0.5rem;">
            <span style="color: var(--accent-gold);">Live link:</span> ${pubData.subdomain}
          </div>
          <div style="display: flex; gap: 0.75rem;">
            <button class="btn btn-gold btn-sm" onclick="appRouter.navigate('dashboard');">
              Couple Dashboard
            </button>
            <button class="btn btn-secondary btn-sm" onclick="appRouter.navigate('landing');">
              Back to InviteElegance
            </button>
          </div>
        </div>

        <!-- Invitation Hero Header -->
        <div class="inv-hero" style="margin-top: 50px;">
          <div style="font-size: 0.95rem; letter-spacing: 0.03em; margin-bottom: 1rem; color: var(--accent-gold-light); font-style: italic;">
            ${d.tagline}
          </div>
          <h1 class="inv-names">${d.brideName} & ${d.groomName}</h1>
          <p class="inv-tagline">Are getting married on ${this.formatDate(d.weddingDate)}</p>
          <div style="background: rgba(255,255,255,0.16); backdrop-filter: blur(8px); padding: 0.75rem 1.75rem; border-radius: var(--radius-pill); font-size: 1rem; margin-bottom: 2.5rem;">
            ${d.venueName}, ${d.venueCity}
          </div>

          <!-- Countdown -->
          <div style="display: flex; gap: 1.25rem;">
            <div style="background: rgba(0,0,0,0.35); backdrop-filter: blur(6px); padding: 1rem 1.5rem; border-radius: 12px; min-width: 76px;">
              <div style="font-size: 1.8rem; font-weight: 600; color: var(--accent-gold-light);">103</div>
              <div style="font-size: 0.72rem; opacity: 0.75;">days</div>
            </div>
            <div style="background: rgba(0,0,0,0.35); backdrop-filter: blur(6px); padding: 1rem 1.5rem; border-radius: 12px; min-width: 76px;">
              <div style="font-size: 1.8rem; font-weight: 600; color: var(--accent-gold-light);">14</div>
              <div style="font-size: 0.72rem; opacity: 0.75;">hours</div>
            </div>
            <div style="background: rgba(0,0,0,0.35); backdrop-filter: blur(6px); padding: 1rem 1.5rem; border-radius: 12px; min-width: 76px;">
              <div style="font-size: 1.8rem; font-weight: 600; color: var(--accent-gold-light);">42</div>
              <div style="font-size: 0.72rem; opacity: 0.75;">mins</div>
            </div>
          </div>
        </div>

        <!-- Our Story -->
        <section style="padding: 5rem 0; text-align: center; background: var(--bg-primary);">
          <div class="container" style="max-width: 700px;">
            <h2 style="font-family: var(--font-serif); font-size: 2.4rem; margin-bottom: 1.25rem; color: var(--text-main);">Our Story</h2>
            <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.8;">
              "${d.story}"
            </p>
          </div>
        </section>

        <!-- Events Schedule -->
        <section style="padding: 5rem 0; background: var(--bg-alt);">
          <div class="container">
            <h2 style="font-family: var(--font-serif); font-size: 2.4rem; text-align: center; margin-bottom: 2.5rem;">Wedding Events Schedule</h2>
            <div class="inv-events-grid">
              ${(d.events || []).map(evt => `
                <div class="inv-event-card">
                  <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--accent-gold-dark);">${evt.name}</h3>
                  <div style="font-size: 0.95rem; font-weight: 600; margin-bottom: 0.25rem;">${evt.date} • ${evt.time}</div>
                  <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.75rem;">${evt.venue}</div>
                  <div style="font-size: 0.8125rem; background: #fff; padding: 0.3rem 0.8rem; border-radius: var(--radius-pill); display: inline-block; border: 1px solid var(--border-light);">
                    Dress code: ${evt.dressCode}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- RSVP Form Section -->
        <section style="padding: 5rem 0; background: var(--bg-primary); text-align: center;">
          <div class="container" style="max-width: 600px;">
            <h2 style="font-family: var(--font-serif); font-size: 2.4rem; margin-bottom: 0.5rem;">RSVP For Our Wedding</h2>
            <p style="color: var(--text-muted); margin-bottom: 2rem;">Please let us know if you will be joining our special day.</p>

            <form id="liveGuestRsvpForm" onsubmit="event.preventDefault(); Invitation.submitGuestRsvp();" style="background: #fff; padding: 2.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border-light); box-shadow: var(--shadow-md); text-align: left;">
              <div class="form-group" style="margin-bottom: 1.25rem;">
                <label>Your Full Name</label>
                <input type="text" id="guestNameInp" class="form-input" required placeholder="e.g. Vikram Malhotra">
              </div>

              <div class="form-group" style="margin-bottom: 1.25rem;">
                <label>Will You Attend?</label>
                <select id="guestStatusInp" class="form-select" required>
                  <option value="Accepted">Joyfully Accept</option>
                  <option value="Declined">Regretfully Decline</option>
                </select>
              </div>

              <div class="form-group" style="margin-bottom: 1.25rem;">
                <label>Number of Guests Attending</label>
                <input type="number" id="guestCountInp" class="form-input" min="1" max="10" value="1">
              </div>

              <div class="form-group" style="margin-bottom: 1.5rem;">
                <label>Personal Note / Warm Wishes</label>
                <textarea id="guestNoteInp" class="form-textarea" rows="3" placeholder="Congratulations to the lovely couple!"></textarea>
              </div>

              <button type="submit" class="btn btn-gold btn-lg" style="width: 100%;">
                Submit RSVP Response
              </button>
            </form>
          </div>
        </section>

        <footer style="background: var(--bg-dark); color: #fff; padding: 2.5rem; text-align: center; font-size: 0.875rem;">
          Made with love using InviteElegance • © 2026 All Rights Reserved
        </footer>
      </div>
    `;
  },

  submitGuestRsvp() {
    const name = document.getElementById('guestNameInp').value.trim();
    const status = document.getElementById('guestStatusInp').value;
    const guests = parseInt(document.getElementById('guestCountInp').value || '1', 10);
    const note = document.getElementById('guestNoteInp').value.trim();

    if (!name) return;

    const dataStr = localStorage.getItem('publishedWebsite');
    let pubData = dataStr ? JSON.parse(dataStr) : { rsvps: [] };
    if (!pubData.rsvps) pubData.rsvps = [];

    pubData.rsvps.push({ name, status, guests, note });
    localStorage.setItem('publishedWebsite', JSON.stringify(pubData));

    showToast("Thank you — your RSVP has been submitted");
    document.getElementById('liveGuestRsvpForm').reset();

    if (window.Dashboard) {
      window.Dashboard.renderDashboard();
    }
  }
};
