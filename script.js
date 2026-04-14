// Add this at the very top of script.js
// Detect if running locally or on server
const isLocal = window.location.protocol === 'file:' || 
                window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1';

// Function to get correct image path
function getImagePath(filename) {
    if (isLocal) {
        return `images/${filename}`;  // Local: relative path
    } else {
        return `images/${filename}`; // Vercel: absolute path
    }
}

// Product data with EXACT filenames
const pianoData = [
    // PSR Series
    {
        id: 1,
        name: "Yamaha PSR-S920",
        category: "PSR SERIES",
        description: "Professional arranger workstation with advanced features for church worship. High-quality sounds and styles perfect for contemporary praise.",
        features: ["61 Keys", "Touch Response", "Built-in Speakers", "Color LCD"],
        image: getImagePath("PSR-S920.jpg"),
        orderText: "Yamaha PSR-S920"
    },
    {
        id: 2,
        name: "Yamaha PSR-S720",
        category: "PSR SERIES",
        description: "Powerful arranger with professional sounds and intuitive controls. Ideal for church musicians seeking versatility.",
        features: ["61 Keys", "Touch Response", "Style Recommender", "Audio Recording"],
        image: getImagePath("PSR-S720.jpg"),
        orderText: "Yamaha PSR-S720"
    },
    {
        id: 3,
        name: "Yamaha PSR-S900",
        category: "PSR SERIES",
        description: "High-end arranger with superior sound quality and extensive style library. Perfect for main worship services.",
        features: ["61 Keys", "Aftertouch", "Vocal Harmonizer", "Color Display"],
        image: getImagePath("PSR-S900.jpg"),
        orderText: "Yamaha PSR-S900"
    },
    {
        id: 4,
        name: "Yamaha PSR-S700",
        category: "PSR SERIES",
        description: "Versatile arranger workstation with professional features for church worship teams and solo performers.",
        features: ["61 Keys", "Flash Memory", "USB Audio Recorder", "640+ Voices"],
        image: getImagePath("PSR-S700.jpg"),
        orderText: "Yamaha PSR-S700"
    },
    {
        id: 5,
        name: "Yamaha PSR-E473",
        category: "PSR SERIES",
        description: "Feature-packed portable keyboard with professional sounds and powerful speakers. Great for church youth groups.",
        features: ["61 Keys", "820+ Voices", "290 Styles", "Quick Sampling"],
        image: getImagePath("PSR-E473.jpg"),
        orderText: "Yamaha PSR-E473"
    },
    {
        id: 6,
        name: "Yamaha PSR-E453",
        category: "PSR SERIES",
        description: "Portable keyboard with professional features, ideal for church beginners and intermediate players.",
        features: ["61 Keys", "758+ Voices", "220 Styles", "DSP Effects"],
        image: getImagePath("PSR-E453.jpg"),
        orderText: "Yamaha PSR-E453"
    },
    {
        id: 7,
        name: "Yamaha PSR-E463",
        category: "PSR SERIES",
        description: "Advanced portable keyboard with live control features and professional sounds for worship.",
        features: ["61 Keys", "820+ Voices", "Live Control Knobs", "Quick Sampling"],
        image: getImagePath("PSR-E463.jpg"),
        orderText: "Yamaha PSR-E463"
    },
    {
        id: 8,
        name: "Yamaha PSR-E373",
        category: "PSR SERIES",
        description: "Entry-level keyboard with high-quality sounds, perfect for church music beginners and Sunday school.",
        features: ["61 Keys", "622+ Voices", "205 Styles", "Smart Chord"],
        image: getImagePath("PSR-E373.jpg"),
        orderText: "Yamaha PSR-E373"
    },
    
    // Yamaha Electric Organs
    {
        id: 9,
        name: "Yamaha FS20",
        category: "YAMAHA ELECTRIC ORGANS",
        description: "Classic electric organ with rich, warm tones suitable for traditional church hymns and worship.",
        features: ["49 Keys", "Built-in Speakers", "Vibrato Effect", "Classic Design"],
        image: getImagePath("FS20.jpg"),
        orderText: "Yamaha FS20 Electric Organ"
    },
    {
        id: 10,
        name: "Yamaha FS30",
        category: "YAMAHA ELECTRIC ORGANS",
        description: "Enhanced electric organ with expanded features and superior sound quality for church services.",
        features: ["49 Keys", "Multiple Voices", "Reverb Effect", "Sustain Pedal"],
        image: getImagePath("FS30.jpg"),
        orderText: "Yamaha FS30 Electric Organ"
    },
    {
        id: 11,
        name: "Yamaha FS50",
        category: "YAMAHA ELECTRIC ORGANS",
        description: "Premium electric organ with advanced features and authentic organ sounds for traditional worship.",
        features: ["61 Keys", "Dual Manual", "Built-in Rhythms", "Pedal Board"],
        image: getImagePath("FS50.jpg"),
        orderText: "Yamaha FS50 Electric Organ"
    },
    {
        id: 12,
        name: "Yamaha FS70",
        category: "YAMAHA ELECTRIC ORGANS",
        description: "Professional electric organ with comprehensive features for serious church organists.",
        features: ["61 Keys", "Dual Manual", "Full Pedal Board", "Multiple Presets"],
        image: getImagePath("FS70.jpg"),
        orderText: "Yamaha FS70 Electric Organ"
    },
    {
        id: 13,
        name: "Yamaha FX10",
        category: "YAMAHA ELECTRIC ORGANS",
        description: "Versatile electric organ with modern features while maintaining classic organ sounds for church use.",
        features: ["49 Keys", "Rhythm Section", "Digital Effects", "Lightweight Design"],
        image: getImagePath("FX10.jpg"),
        orderText: "Yamaha FX10 Electric Organ"
    },
    {
        id: 14,
        name: "Yamaha FX20",
        category: "YAMAHA ELECTRIC ORGANS",
        description: "Advanced electric organ with expanded capabilities and superior sound engine for worship.",
        features: ["61 Keys", "Advanced Rhythms", "Registration Memory", "MIDI Compatible"],
        image: getImagePath("FX20.jpg"),
        orderText: "Yamaha FX20 Electric Organ"
    },
    {
        id: 15,
        name: "TECHNICS Organ",
        category: "YAMAHA ELECTRIC ORGANS",
        description: "High-quality Technics organ with exceptional sound and features, perfect for church sanctuaries.",
        features: ["61 Keys", "Dual Manual", "Full Pedalboard", "Built-in Speakers"],
        image: getImagePath("TECHNICS.jpg"),
        orderText: "TECHNICS Organ"
    },
    {
        id: 16,
        name: "Yamaha EL90",
        category: "YAMAHA ELECTRIC ORGANS",
        description: "Professional Electone organ with comprehensive features for serious church musicians.",
        features: ["61 Keys", "Dual Manual", "Expression Pedal", "Advanced Voices"],
        image: getImagePath("EL90.jpg"),
        orderText: "Yamaha EL90 Electone Organ"
    },
    {
        id: 17,
        name: "Yamaha EL900",
        category: "YAMAHA ELECTRIC ORGANS",
        description: "Flagship Electone organ with unparalleled sound quality and features for the ultimate church music experience.",
        features: ["61 Keys", "Dual Manual", "Full Pedalboard", "VA Technology"],
        image: getImagePath("EL900.jpg"),
        orderText: "Yamaha EL900 Electone Organ"
    },
    {
        id: 18,
        name: "Technics U60",
        category: "YAMAHA ELECTRIC ORGANS",
        description: "Classic Technics organ with rich, authentic sounds perfect for traditional church worship.",
        features: ["61 Keys", "Built-in Speakers", "Multiple Voices", "Classic Design"],
        image: getImagePath("TECHNICSU60.jpg"),
        orderText: "Technics U60 Organ"
    },
    {
        id: 19,
        name: "Yamaha AR100",
        category: "YAMAHA ELECTRIC ORGANS",
        description: "Advanced Yamaha Electone organ with professional features for serious church musicians.",
        features: ["61 Keys", "Dual Manual", "Advanced Voices", "Built-in Rhythms"],
        image: getImagePath("AR100.jpg"),
        orderText: "Yamaha AR100 Electone Organ"
    }
];

// The rest of your code remains exactly the same...

// Load products when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadPianos(pianoData);
    setupMobileMenu();
    setupSortButtons();
    
    // Add a small delay to ensure DOM is ready
    setTimeout(checkImages, 2000);
});

// Function to check which images are loading
function checkImages() {
    console.log("Checking images...");
    const images = document.querySelectorAll('.piano-image img');
    images.forEach((img, index) => {
        console.log(`Image ${index}: ${img.src}`);
    });
}

// Function to load pianos with optional filtered data
function loadPianos(productsToShow = pianoData) {
    const pianoGrid = document.getElementById('pianoGrid');
    pianoGrid.innerHTML = ''; // Clear existing products
    
    productsToShow.forEach(piano => {
        const pianoCard = createPianoCard(piano);
        pianoGrid.appendChild(pianoCard);
    });
}

// Updated createPianoCard function with enhanced features and better image error handling
function createPianoCard(piano) {
    const card = document.createElement('div');
    card.className = 'piano-card';
    
    // Add category badge
    const categoryClass = piano.category === 'PSR SERIES' ? 'category-psr' : 'category-organ';
    
    // Create features HTML
    const featuresHTML = piano.features.map(feature => 
        `<span class="feature-tag">${feature}</span>`
    ).join('');
    
    // Create a unique ID for the image to help with debugging
    const imgId = `img-${piano.id}`;
    
    card.innerHTML = `
        <div class="piano-image">
            <img id="${imgId}" src="${piano.image}" alt="${piano.name}" 
                 onload="console.log('Loaded: ${piano.image}')"
                 onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(piano.name)}'; console.log('Failed to load: ${piano.image}')">
        </div>
        <div class="piano-info">
            <span class="category-badge ${categoryClass}">${piano.category}</span>
            <h3>${piano.name}</h3>
            <p class="piano-description">${piano.description}</p>
            <div class="piano-features">
                ${featuresHTML}
            </div>
            <div class="price-inquiry">
                <p><i class="fas fa-info-circle"></i> Contact us for current price and orders</p>
            </div>
            <button class="btn-price" onclick="priceViaWhatsApp('${piano.orderText}')">
                <i class="fas fa-tag"></i> Price
            </button>
        </div>
    `;
    
    return card;
}

// Price inquiry WhatsApp function
function priceViaWhatsApp(productName) {
    const phoneNumber = "254704742748";
    const message = encodeURIComponent(`What's the price for "${productName}"? We would like to purchase.`);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
}

// Setup sort buttons
function setupSortButtons() {
    // Create sort controls container
    const pianoSection = document.querySelector('.pianos .container');
    const sectionHeader = document.querySelector('.section-header');
    const pianoGrid = document.getElementById('pianoGrid');
    
    // Create sort controls if they don't exist
    if (!document.getElementById('sortControls')) {
        const sortControls = document.createElement('div');
        sortControls.id = 'sortControls';
        sortControls.className = 'sort-controls';
        sortControls.innerHTML = `
            <div class="sort-buttons">
                <button class="sort-btn active" data-sort="all">All Products</button>
                <button class="sort-btn" data-sort="psr">PSR Series</button>
                <button class="sort-btn" data-sort="organs">Yamaha Electric Organs</button>
            </div>
        `;
        
        // Insert after section header
        pianoSection.insertBefore(sortControls, pianoGrid);
        
        // Add event listeners
        document.querySelectorAll('.sort-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const sortValue = this.getAttribute('data-sort');
                filterProducts(sortValue);
            });
        });
    }
}

// Filter products by category
function filterProducts(category) {
    let filteredProducts = [];
    
    if (category === 'all') {
        filteredProducts = pianoData;
    } else if (category === 'psr') {
        filteredProducts = pianoData.filter(piano => piano.category === 'PSR SERIES');
    } else if (category === 'organs') {
        filteredProducts = pianoData.filter(piano => piano.category === 'YAMAHA ELECTRIC ORGANS');
    }
    
    loadPianos(filteredProducts);
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active nav link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
