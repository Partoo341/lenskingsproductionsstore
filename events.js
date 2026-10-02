// ============================================
// EVENTS PAGE JAVASCRIPT
// ============================================

// ⚠️ REPLACE THESE WITH YOUR ACTUAL KEYS
const PAYSTACK_PUBLIC_KEY = 'pk_live_1aa7fea1fb94c722e7ab6b6f656455da169c78fa';
const STRIPE_PAYMENT_LINK = '#';
const PAYPAL_ME_LINK = '#';
const VERCEL_API_URL = 'https://your-vercel-project.vercel.app';

const EVENT_PRICE_KES = 1;
const EVENT_NAME = 'Online Music Bootcamp - 2nd Sept 2027';
const EVENT_DATE = '2nd September 2027';
const EVENT_TIME = '10:00 AM - 2:00 PM (EAT)';

// ============================================
// CANVAS ROUNDED RECT HELPER (must be defined before use)
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

    if (!name) {
        alert('Please enter your full name.');
        return null;
    }
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return null;
    }
    if (!phone || phone.length < 9) {
        alert('Please enter a valid phone number.');
        return null;
    }

    let cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) {
        cleanPhone = '254' + cleanPhone.substring(1);
    } else if (!cleanPhone.startsWith('254') && cleanPhone.length === 9) {
        cleanPhone = '254' + cleanPhone;
    }

    return { name, email, phone: cleanPhone };
}

// ============================================
// TICKET GENERATOR (Canvas-based PNG)
// ============================================
function generateTicketImage(customer, reference) {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    // Outer gradient background
    const gradient = ctx.createLinearGradient(0, 0, 800, 400);
    gradient.addColorStop(0, '#FFD700');
    gradient.addColorStop(1, '#E63946');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 400);

    // White ticket area
    ctx.fillStyle = '#FFFFFF';
    ctx.roundRect(40, 40, 720, 320, 20);
    ctx.fill();

    // Header bar
    ctx.fillStyle = '#E63946';
    ctx.roundRect(40, 40, 720, 70, 20);
    ctx.fill();

    // Small yellow strip under header to flatten the rounded bottom
    ctx.fillStyle = '#E63946';
    ctx.fillRect(40, 90, 720, 20);

    // Header text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 26px Poppins, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ONLINE MUSIC BOOTCAMP', 400, 82);

    // Perforation line
    ctx.beginPath();
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = '#CCCCCC';
    ctx.lineWidth = 1;
    ctx.moveTo(60, 130);
    ctx.lineTo(740, 130);
    ctx.stroke();
    ctx.setLineDash([]);

    // Labels + values
    ctx.textAlign = 'left';
    ctx.font = 'bold 15px Poppins, Arial, sans-serif';
    ctx.fillStyle = '#333333';
    ctx.fillText('Attendee:', 80, 170);
    ctx.fillText('Date:', 80, 205);
    ctx.fillText('Time:', 80, 240);
    ctx.fillText('Ticket ID:', 80, 275);
    ctx.fillText('Price:', 80, 310);

    ctx.font = '15px Poppins, Arial, sans-serif';
    ctx.fillStyle = '#555555';
    ctx.fillText(customer.name, 220, 170);
    ctx.fillText(EVENT_DATE, 220, 205);
    ctx.fillText(EVENT_TIME, 220, 240);
    ctx.fillText(reference, 220, 275);
    ctx.fillText('KES ' + EVENT_PRICE_KES, 220, 310);

    // Footer
    ctx.fillStyle = '#999999';
    ctx.font = '11px Poppins, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Lenskings Productions Store  |  lenskingsproductions.store  |  +254 704 742 748', 400, 345);

    return canvas.toDataURL('image/png');
}

// ============================================
// SEND TICKET EMAIL VIA VERCEL FUNCTION
// ============================================
async function sendTicketEmail(customer, reference) {
    const ticketImage = generateTicketImage(customer, reference);

    try {
        const response = await fetch(`${VERCEL_API_URL}/api/send-ticket`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: customer.name,
                email: customer.email,
                reference: reference,
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
// SUCCESS HANDLER (shared across payment methods)
// ============================================
async function handleSuccess(customer, reference, method) {
    // Generate + send the ticket email
    const emailSent = await sendTicketEmail(customer, reference);

    if (emailSent) {
        alert(
            `✅ Payment Successful!\n\n` +
            `A confirmation email with your ticket has been sent to ${customer.email}.\n\n` +
            `Thank you, ${customer.name}!`
        );
    } else {
        alert(
            `✅ Payment Successful!\n\n` +
            `We could not send your ticket automatically.\n` +
            `Please send your reference to WhatsApp +254 704 742 748 to receive your ticket.`
        );
    }

    // Also send WhatsApp confirmation to you
    const message = encodeURIComponent(
        `Hello! I have successfully paid KES ${EVENT_PRICE_KES} for the Online Music Bootcamp.\n\n` +
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
            payBtn.innerHTML = '<i class="fas fa-lock"></i> Pay KES 500 with M-Pesa';
            handleSuccess(customer, response.reference, 'M-Pesa (Paystack)');
        },
        onClose: function () {
            payBtn.disabled = false;
            payBtn.innerHTML = '<i class="fas fa-lock"></i> Pay KES 500 with M-Pesa';
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