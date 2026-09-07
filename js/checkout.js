/**
 * InviteElegance - Subdomain Checker & Payment Gateway Simulator
 */

window.Checkout = {
  currentOrder: null,
  appliedCoupon: null,

  open(draftData) {
    this.currentOrder = {
      templateId: draftData.templateId,
      templateName: draftData.templateName,
      tier: draftData.tier,
      basePrice: draftData.price,
      subdomain: `${draftData.brideName.toLowerCase()}-${draftData.groomName.toLowerCase()}`,
      draft: draftData
    };
    this.appliedCoupon = null;

    const modal = document.getElementById('checkoutModal');
    if (modal) {
      modal.classList.add('active');
      this.renderCheckout();
    }
  },

  close() {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.remove('active');
  },

  renderCheckout() {
    const order = this.currentOrder;
    if (!order) return;

    const subInput = document.getElementById('subdomainInput');
    if (subInput) {
      subInput.value = order.subdomain;
      this.checkSubdomain(order.subdomain);
      subInput.oninput = (e) => {
        const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
        e.target.value = val;
        order.subdomain = val;
        this.checkSubdomain(val);
      };
    }

    this.recalculateTotals();
  },

  checkSubdomain(name) {
    const statusEl = document.getElementById('subdomainStatus');
    if (!statusEl) return;

    if (!name || name.length < 3) {
      statusEl.className = 'subdomain-status taken';
      statusEl.textContent = 'Subdomain must be at least 3 characters.';
      return;
    }

    statusEl.className = 'subdomain-status available';
    statusEl.textContent = `${name}.inviteelegance.in is available`;
  },

  applyCoupon() {
    const inp = document.getElementById('couponInput');
    const msgEl = document.getElementById('couponMsg');
    if (!inp) return;

    const code = inp.value.trim().toUpperCase();
    if (code === 'ELEGANCE10') {
      this.appliedCoupon = { code: 'ELEGANCE10', discountPercent: 10 };
      if (msgEl) {
        msgEl.style.color = '#3f7d5c';
        msgEl.textContent = 'Coupon ELEGANCE10 applied — 10% off.';
      }
    } else if (code === 'WEDDING50') {
      this.appliedCoupon = { code: 'WEDDING50', discountFlat: 50 };
      if (msgEl) {
        msgEl.style.color = '#3f7d5c';
        msgEl.textContent = 'Coupon WEDDING50 applied — ₹50 off.';
      }
    } else {
      if (msgEl) {
        msgEl.style.color = 'var(--accent-maroon)';
        msgEl.textContent = 'Invalid coupon code. Try ELEGANCE10 or WEDDING50.';
      }
    }
    this.recalculateTotals();
  },

  recalculateTotals() {
    const order = this.currentOrder;
    if (!order) return;

    let base = order.basePrice;
    let discount = 0;

    if (this.appliedCoupon) {
      if (this.appliedCoupon.discountPercent) {
        discount = Math.round((base * this.appliedCoupon.discountPercent) / 100);
      } else if (this.appliedCoupon.discountFlat) {
        discount = this.appliedCoupon.discountFlat;
      }
    }

    const subtotal = Math.max(0, base - discount);
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;

    document.getElementById('summaryItemName').textContent = `${order.templateName} (${order.tier})`;
    document.getElementById('summaryBasePrice').textContent = `₹${base}`;
    document.getElementById('summaryDiscount').textContent = `-₹${discount}`;
    document.getElementById('summaryGst').textContent = `+₹${gst} (18% GST)`;
    document.getElementById('summaryTotal').textContent = `₹${total}`;

    order.finalPrice = total;
  },

  processPayment(method) {
    const statusBox = document.getElementById('paymentProcessingBox');
    const payForm = document.getElementById('paymentFormBox');

    if (payForm) payForm.style.display = 'none';
    if (statusBox) {
      statusBox.style.display = 'block';
      statusBox.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem;">
          <div class="badge-pulse" style="width: 40px; height: 40px; margin: 0 auto 1.5rem auto;"></div>
          <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 0.5rem;">Processing your payment via ${method}</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Connecting to the bank gateway and setting up your subdomain website…</p>
        </div>
      `;
    }

    setTimeout(() => {
      this.completeOrder();
    }, 2500);
  },

  completeOrder() {
    const order = this.currentOrder;
    const publishedWebsite = {
      id: 'inv-' + Date.now(),
      subdomain: order.subdomain + '.inviteelegance.in',
      templateName: order.templateName,
      tier: order.tier,
      paidAmount: order.finalPrice,
      createdDate: new Date().toLocaleDateString(),
      draft: order.draft,
      rsvps: [
        { name: 'Rohan Sharma', status: 'Accepted', guests: 2, note: 'Can wait to celebrate!' },
        { name: 'Priya Mehta', status: 'Accepted', guests: 1, note: 'Super excited!' },
        { name: 'Aman Verma', status: 'Declined', guests: 0, note: 'Out of country, sending love.' }
      ]
    };

    localStorage.setItem('publishedWebsite', JSON.stringify(publishedWebsite));

    const statusBox = document.getElementById('paymentProcessingBox');
    if (statusBox) {
      statusBox.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem;">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--accent-gold-bg); color: var(--accent-gold-dark); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto;">
            <svg width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
          </div>
          <h2 style="font-family: var(--font-serif); font-size: 2rem; color: var(--text-main); margin-bottom: 0.5rem;">Payment successful</h2>
          <p style="color: var(--text-muted); font-size: 1.05rem; margin-bottom: 1.5rem;">
            Your wedding website is live at <strong style="color: var(--text-main);">${publishedWebsite.subdomain}</strong>
          </p>
          <div style="display: flex; gap: 1rem; justify-content: center;">
            <button class="btn btn-gold btn-lg" onclick="Checkout.close(); appRouter.navigate('dashboard');">
              Go to Couple Dashboard
            </button>
            <button class="btn btn-secondary btn-lg" onclick="Checkout.close(); window.Invitation.renderLivePage(); appRouter.navigate('invitation');">
              View Published Site
            </button>
          </div>
        </div>
      `;
    }
  }
};
