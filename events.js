// ============================================
// EVENTS PAGE JAVASCRIPT
// ============================================

// ⚠️ CONFIG
const PAYSTACK_PUBLIC_KEY = 'pk_live_1aa7fea1fb94c722e7ab6b6f656455da169c78fa';
const STRIPE_PAYMENT_LINK = '#';           // fill when ready
const PAYPAL_ME_LINK = '#';                // fill when ready
const VERCEL_API_URL = 'https://lenskingsproductionsstore.vercel.app';

const EVENT_PRICE_KES = 500;
const EVENT_NAME = 'Online Music Bootcamp - 2nd Sept 2027';
const EVENT_DATE = '2nd September 2027';
const EVENT_TIME = '10:00 AM - 2:00 PM (EAT)';

// ============================================
// CANVAS ROUNDED RECT HELPER
// ============================================
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.beginPath();
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
        this.closePath();
        return this;
    };
}

// ============================================
// TOGGLE SLIDING FORM
// ============================================
function toggleForm(formId) {
    const targetForm = document.getElementById(formId);
    const allForms = document.querySelectorAll('.slide-form');
    const allButtons = document.querySelectorAll('.pay-method-btn');

    allForms.forEach(form => {
        if (form.id !== formId) form.classList.remove('open');
    });

    allButtons.forEach(btn => {
        if (!btn.nextElementSibling || btn.nextElementSibling.id !== formId) {
            btn.classList.remove('active');
        }
    });

    targetForm.classList.toggle('open');
    const button = targetForm.previousElementSibling;
    button.classList.toggle('active');
}

// ============================================
// OPEN / CLOSE MODAL
// ============================================
function openTicketPopup() {
    const modal = document.getElementById('ticketModal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeTicketPopup() {
    const modal = document.getElementById('ticketModal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.querySelectorAll('.slide-form').forEach(f => f.classList.remove('open'));
        document.querySelectorAll('.pay-method-btn').forEach(b => b.classList.remove('active'));
    }
}

window.addEventListener('click', function (event) {
    const modal = document.getElementById('ticketModal');
    if (event.target === modal) closeTicketPopup();
});

// ============================================
// VALIDATE + COLLECT FORM DATA
// ============================================
function getFormData(prefix) {
    const name = document.getElementById(prefix + 'Name').value.trim();
    const email = document.getElementById(prefix + 'Email').value.trim();
    const phone = document.getElementById(prefix + 'Phone').value.trim();

    if (!name) { alert('Please enter your full name.'); return null; }
    if (!email || !email.includes('@')) { alert('Please enter a valid email address.'); return null; }
    if (!phone || phone.length < 9) { alert('Please enter a valid phone number.'); return null; }

    let cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) {
        cleanPhone = '254' + cleanPhone.substring(1);
    } else if (!cleanPhone.startsWith('254') && cleanPhone.length === 9) {
        cleanPhone = '254' + cleanPhone;
    }

    return { name, email, phone: cleanPhone };
}

// ============================================
// ADMIT NUMBER FROM REFERENCE
// ============================================
// Uses the last 4 digits of the timestamp in the reference.
// Example: BOOTCAMP_1728000000001 → ADMIT 0001
function getAdmitNumber(reference) {
    const digits = (reference || '').replace(/\D/g, '');
    const last4 = digits.slice(-4) || '0001';
    return last4.padStart(4, '0');
}

// ============================================
// TICKET GENERATOR — Poster-inspired design
// ============================================
function generateTicketImage(customer, reference) {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');

    const GOLD = '#FFD700';
    const BLACK = '#0A0A0A';
    const WHITE = '#FFFFFF';

    // ---------- BACKGROUND ----------
    ctx.fillStyle = BLACK;
    ctx.fillRect(0, 0, 900, 500);

    // Gold double border
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 3;
    ctx.strokeRect(15, 15, 870, 470);

    ctx.strokeStyle = 'rgba(255, 215, 0, 0.35)';
    ctx.lineWidth = 1;
    ctx.strokeRect(22, 22, 856, 456);

    // ---------- LOGO BLOCK ----------
    ctx.fillStyle = GOLD;
    ctx.fillRect(45, 45, 60, 60);

    ctx.fillStyle = BLACK;
    ctx.font = 'bold 44px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('P', 75, 78);

    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = GOLD;
    ctx.font = 'bold 20px Arial, sans-serif';
    ctx.fillText('LENSKINGS PRODUCTIONS', 120, 68);

    ctx.fillStyle = '#CCCCCC';
    ctx.font = '12px Arial, sans-serif';
    ctx.fillText('Capturing Life, Creating Art', 120, 88);

    // ---------- TITLE ----------
    ctx.fillStyle = GOLD;
    ctx.font = 'bold 62px Arial, sans-serif';
    ctx.fillText('ONLINE MUSIC', 45, 180);

    ctx.fillStyle = WHITE;
    ctx.font = 'bold 62px Arial, sans-serif';
    ctx.fillText('BOOTCAMP', 45, 245);

    // Date badge
    ctx.fillStyle = GOLD;
    ctx.fillRect(45, 270, 250, 42);

    ctx.fillStyle = BLACK;
    ctx.font = 'bold 22px Arial, sans-serif';
    ctx.fillText('02 SEP 2027', 65, 300);

    // ============================================
    // ATTENDEE BOX (right side)
    // ============================================
    ctx.fillStyle = 'rgba(255, 215, 0, 0.08)';
    ctx.fillRect(490, 120, 370, 320);

    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 2;
    ctx.strokeRect(490, 120, 370, 320);

    ctx.fillStyle = GOLD;
    ctx.font = 'bold 15px Arial, sans-serif';
    ctx.fillText('ATTENDEE TICKET', 510, 148);

    // Divider
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(510, 158);
    ctx.lineTo(840, 158);
    ctx.stroke();

    // Admit number from reference
    const admitNumber = getAdmitNumber(reference);

    // Fields
    const fields = [
        { label: 'NAME', value: customer.name },
        { label: 'EMAIL', value: customer.email },
        { label: 'TICKET ID', value: reference, value2: 'ADMIT ' + admitNumber },
        { label: 'TIME', value: EVENT_TIME },
        { label: 'VENUE', value: 'Online via Zoom' }
    ];

    let y = 185;
    fields.forEach(field => {
        ctx.fillStyle = GOLD;
        ctx.font = 'bold 11px Arial, sans-serif';
        ctx.fillText(field.label, 510, y);

        ctx.fillStyle = WHITE;
        ctx.font = '14px Arial, sans-serif';

        if (field.value2) {
            // Two-column row: ticket ID on left, ADMIT # on right
            let val = String(field.value || '');
            if (val.length > 18) val = val.substring(0, 16) + '...';
            ctx.fillText(val, 510, y + 16);

            ctx.fillStyle = GOLD;
            ctx.font = 'bold 14px Arial, sans-serif';
            ctx.fillText(field.value2, 730, y + 16);
        } else {
            let val = String(field.value || '');
            if (val.length > 34) val = val.substring(0, 32) + '...';
            ctx.fillText(val, 510, y + 16);
        }

        y += 42;
    });

    // ============================================
    // BOTTOM: Price + Admit One pill
    // ============================================
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
    ctx.beginPath();
    ctx.moveTo(45, 390);
    ctx.lineTo(845, 390);
    ctx.stroke();

    ctx.fillStyle = GOLD;
    ctx.font = 'bold 36px Arial, sans-serif';
    ctx.fillText('KES ' + EVENT_PRICE_KES, 45, 440);

    ctx.fillStyle = '#CCCCCC';
    ctx.font = '13px Arial, sans-serif';
    ctx.fillText('per attendee', 45, 458);

    // Gold "ADMIT" pill
    ctx.fillStyle = GOLD;
    ctx.beginPath();
    ctx.roundRect(670, 405, 175, 48, 24);
    ctx.fill();

    ctx.fillStyle = BLACK;
    ctx.font = 'bold 20px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ADMIT ' + admitNumber, 757, 436);

    // ============================================
    // FOOTER STRIP
    // ============================================
    ctx.fillStyle = 'rgba(255, 215, 0, 0.18)';
    ctx.fillRect(15, 460, 870, 25);

    ctx.fillStyle = GOLD;
    ctx.font = '11px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
        'lenskingsproductions.store   |   +254 704 742 748   |   +255 761 927 157',
        450,
        477
    );

    return canvas.toDataURL('image/png');
}

// ============================================
// SEND TICKET EMAIL VIA VERCEL FUNCTION
// ============================================
async function sendTicketEmail(customer, reference) {
    const ticketImage = generateTicketImage(customer, reference);
    const admitNumber = getAdmitNumber(reference);

    try {
        const response = await fetch(`${VERCEL_API_URL}/api/send-ticket`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: customer.name,
                email: customer.email,
                reference: reference,
                admitNumber: admitNumber,
                ticketImage: ticketImage,
                eventName: EVENT_NAME,
                eventDate: EVENT_DATE,
                eventTime: EVENT_TIME
            })
        });

        const data = await response.json();
        return data.success === true;
    } catch (error) {
        console.error('Email send error:', error);
        return false;
    }
}

// ============================================
// SUCCESS HANDLER
// ============================================
async function handleSuccess(customer, reference, method) {
    const emailSent = await sendTicketEmail(customer, reference);
    const admitNumber = getAdmitNumber(reference);

    if (emailSent) {
        alert(
            `✅ Payment Successful!\n\n` +
            `Ticket ADMIT #${admitNumber} has been sent to ${customer.email}.\n\n` +
            `Thank you, ${customer.name}!`
        );
    } else {
        alert(
            `✅ Payment Successful!\n\n` +
            `We could not send your ticket automatically.\n` +
            `Please send reference ${reference} to WhatsApp +254 704 742 748.`
        );
    }

    const message = encodeURIComponent(
        `Hello! I have successfully paid KES ${EVENT_PRICE_KES} for the Online Music Bootcamp.\n\n` +
        `ADMIT #${admitNumber}\n` +
        `Name: ${customer.name}\n` +
        `Email: ${customer.email}\n` +
        `Phone: ${customer.phone}\n` +
        `Method: ${method}\n` +
        `Reference: ${reference}\n\n` +
        `Please confirm my ticket. Thank you!`
    );
    window.open(`https://wa.me/254704742748?text=${message}`, '_blank');
    closeTicketPopup();
}

// ============================================
// 1. PAY WITH M-PESA (Paystack)
// ============================================
function payWithMpesa() {
    const customer = getFormData('mpesa');
    if (!customer) return;

    const ref = 'BOOTCAMP_' + Date.now();
    const payBtn = document.querySelector('.mpesa-pay');
    payBtn.disabled = true;
    payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: customer.email,
        amount: EVENT_PRICE_KES * 100,
        currency: 'KES',
        ref: ref,
        label: EVENT_NAME,
        metadata: {
            custom_fields: [
                { display_name: 'Customer Name', variable_name: 'customer_name', value: customer.name },
                { display_name: 'Customer Phone', variable_name: 'customer_phone', value: customer.phone },
                { display_name: 'Event', variable_name: 'event_name', value: EVENT_NAME }
            ]
        },
        callback: function (response) {
            payBtn.disabled = false;
            payBtn.innerHTML = '<i class="fas fa-lock"></i> Pay KES ' + EVENT_PRICE_KES + ' with M-Pesa';
            handleSuccess(customer, response.reference, 'M-Pesa (Paystack)');
        },
        onClose: function () {
            payBtn.disabled = false;
            payBtn.innerHTML = '<i class="fas fa-lock"></i> Pay KES ' + EVENT_PRICE_KES + ' with M-Pesa';
            alert('Payment was not completed. You can try again or use Manual M-Pesa.');
        }
    });

    handler.openIframe();
}

// ============================================
// 2. PAY WITH CARD (Stripe Payment Link)
// ============================================
function payWithStripe() {
    const customer = getFormData('stripe');
    if (!customer) return;

    if (!STRIPE_PAYMENT_LINK || STRIPE_PAYMENT_LINK === '#') {
        alert('Card payments are not set up yet. Please use M-Pesa or WhatsApp.');
        return;
    }

    const stripeUrl = `${STRIPE_PAYMENT_LINK}?prefilled_email=${encodeURIComponent(customer.email)}`;
    window.open(stripeUrl, '_blank');

    setTimeout(async () => {
        if (confirm('After completing your Stripe payment, click OK to confirm and receive your ticket.')) {
            const ref = 'STRIPE_' + Date.now();
            await handleSuccess(customer, ref, 'Card (Stripe)');
        }
    }, 2000);
}

// ============================================
// 3. PAY WITH PAYPAL
// ============================================
function payWithPaypal() {
    const customer = getFormData('paypal');
    if (!customer) return;

    if (!PAYPAL_ME_LINK || PAYPAL_ME_LINK === '#') {
        alert('PayPal is not set up yet. Please use M-Pesa or WhatsApp.');
        return;
    }

    window.open(PAYPAL_ME_LINK, '_blank');

    setTimeout(async () => {
        if (confirm('After completing your PayPal payment, click OK to confirm and receive your ticket.')) {
            const ref = 'PAYPAL_' + Date.now();
            await handleSuccess(customer, ref, 'PayPal');
        }
    }, 2000);
}

// ============================================
// 4. MANUAL M-PESA (WhatsApp Fallback)
// ============================================
function manualMpesaPayment() {
    const customer = getFormData('manual');
    if (!customer) return;

    const message = encodeURIComponent(
        `Hello! I would like to pay KES ${EVENT_PRICE_KES} for the Online Music Bootcamp ticket via M-Pesa Paybill.\n\n` +
        `Please send me the Paybill and Account number so I can complete my payment.\n\n` +
        `Name: ${customer.name}\n` +
        `Email: ${customer.email}\n` +
        `Phone: ${customer.phone}\n\n` +
        `Thank you!`
    );
    window.open(`https://wa.me/254704742748?text=${message}`, '_blank');
    closeTicketPopup();
}

// ============================================
// MOBILE MENU
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        });
    }
});