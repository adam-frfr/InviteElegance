/**
 * InviteElegance - Couple Admin Dashboard Controller
 */

window.Dashboard = {
  init() {
    this.renderDashboard();
  },

  renderDashboard() {
    const dataStr = localStorage.getItem('publishedWebsite');
    if (!dataStr) {
      this.renderEmptyState();
      return;
    }

    const pub = JSON.parse(dataStr);
    const draft = pub.draft || {};
    const rsvps = pub.rsvps || [];

    const totalRsvp = rsvps.length;
    const acceptedCount = rsvps.filter(r => r.status === 'Accepted').length;
    const declinedCount = rsvps.filter(r => r.status === 'Declined').length;
    const totalGuestsAttending = rsvps.reduce((acc, r) => acc + (r.status === 'Accepted' ? (r.guests || 1) : 0), 0);

    // Update Stat Numbers
    document.getElementById('dashTotalRsvps').textContent = totalRsvp;
    document.getElementById('dashAttendingCount').textContent = totalGuestsAttending;
    document.getElementById('dashDeclinedCount').textContent = declinedCount;
    document.getElementById('dashSubdomain').textContent = pub.subdomain;

    // Render Guest Table
    const tableBody = document.getElementById('dashGuestTableBody');
    if (tableBody) {
      tableBody.innerHTML = rsvps.map(r => `
        <tr>
          <td><strong>${r.name}</strong></td>
          <td>
            <span class="${r.status === 'Accepted' ? 'badge-attending' : 'badge-declined'}">
              ${r.status}
            </span>
          </td>
          <td>${r.guests || 0}</td>
          <td>${r.note || '-'}</td>
        </tr>
      `).join('');
    }

    // Render QR Code Box
    this.renderQrCode(pub.subdomain);
  },

  renderEmptyState() {
    const mainEl = document.getElementById('dashboardMainContent');
    if (mainEl) {
      mainEl.innerHTML = `
        <div style="text-align: center; padding: 4rem 2rem; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px solid var(--border-light);">
          <div style="width: 52px; height: 52px; border-radius: 50%; background: var(--accent-gold-bg); color: var(--accent-gold-dark); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto;">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </div>
          <h3 style="font-family: var(--font-serif); font-size: 1.7rem; margin-bottom: 0.5rem;">No active wedding site yet</h3>
          <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 2rem;">Customize a template and complete checkout to unlock your live couple dashboard.</p>
          <a href="#templates" onclick="appRouter.navigate('landing');" class="btn btn-primary btn-lg">Browse templates</a>
        </div>
      `;
    }
  },

  exportCsv() {
    const dataStr = localStorage.getItem('publishedWebsite');
    if (!dataStr) return;

    const pub = JSON.parse(dataStr);
    const rsvps = pub.rsvps || [];

    let csvContent = "data:text/csv;charset=utf-8,Guest Name,Status,Number of Guests,Note\n";
    rsvps.forEach(r => {
      csvContent += `"${r.name}","${r.status}",${r.guests || 0},"${r.note || ''}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `RSVP_Export_${pub.subdomain.replace(/[^a-z0-9]/gi, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("CSV exported");
  },

  renderQrCode(subdomain) {
    const container = document.getElementById('dashQrContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="background: #fff; padding: 1rem; border-radius: 12px; border: 1px solid var(--border-light); display: inline-block; margin-bottom: 1rem;">
        <svg width="150" height="150" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="white"/>
          <path d="M10 10H40V40H10V10ZM20 20V30H30V20H20Z" fill="#1b1512"/>
          <path d="M60 10H90V40H60V10ZM70 20V30H80V20H70Z" fill="#1b1512"/>
          <path d="M10 60H40V90H10V60ZM20 70V80H30V70H20Z" fill="#1b1512"/>
          <rect x="50" y="50" width="10" height="10" fill="#a9793a"/>
          <rect x="70" y="50" width="20" height="10" fill="#1b1512"/>
          <rect x="50" y="70" width="20" height="20" fill="#1b1512"/>
          <rect x="80" y="80" width="10" height="10" fill="#a9793a"/>
        </svg>
      </div>
      <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 1rem;">Scan to open ${subdomain}</p>
      <button class="btn btn-secondary btn-sm" onclick="showToast('QR code saved')">
        Download printable QR
      </button>
    `;
  },

  copyShareLink() {
    const dataStr = localStorage.getItem('publishedWebsite');
    if (!dataStr) return;
    const pub = JSON.parse(dataStr);
    navigator.clipboard.writeText(`https://${pub.subdomain}`);
    showToast("Link copied to clipboard");
  }
};
