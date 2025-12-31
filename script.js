const COLORS = {
    BLUE: "#4285F4",
    RED: "#EA4335",
    YELLOW: "#FBBC05",
    GREEN: "#34A853"
};

const FALLBACK_IMAGES = [
    "BuildwithAI.jpg",
    "BuildwithAI3.jpg",
    "BuildwithAI4.jpg",
    "Google IO Extended Beirut 2025-pt1.jpg",
    "Google IO Extended Beirut 20252.jpg",
    "gOOGLEio2.jpg",
    "WTRS1.jpg",
    "WTRS2.jpg",
    "WTRS3.jpg",
    "Cyber1.jpg",
    "Cyberr2.jpg",
    "Cybersecc.jpeg",
    "zakaAI1.jpeg",
    "zaka1.jpg",
    "zaka.jpg",
    "devfestbei2.jpeg",
    "devfestbei3.jpeg",
    "Devfest2.jpeg",
    "north.JPG",
    "north1.jpeg",
    "north3.jpeg"
];

let fallbackIndex = 0;
const polaroidLayoutCache = new Map();

function ensureImageSet(images = []) {
    const sanitized = images.filter(Boolean);
    while (sanitized.length < 3) {
        sanitized.push(FALLBACK_IMAGES[fallbackIndex % FALLBACK_IMAGES.length]);
        fallbackIndex += 1;
    }
    return sanitized.slice(0, 3);
}

function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function getPolaroidLayout(cardIndex, count) {
    if (polaroidLayoutCache.has(cardIndex)) {
        return polaroidLayoutCache.get(cardIndex);
    }

    const template = [
        {
            className: 'polaroid polaroid-big',
            baseLeft: 5,
            baseTop: 8,
            jitterX: 3,
            jitterY: 3,
            rotateRange: 4
        },
        {
            className: 'polaroid polaroid-small',
            baseLeft: 64,
            baseTop: 12,
            jitterX: 4,
            jitterY: 5,
            rotateRange: 6
        },
        {
            className: 'polaroid polaroid-small',
            baseLeft: 58,
            baseTop: 58,
            jitterX: 5,
            jitterY: 5,
            rotateRange: 6
        }
    ];

    const layout = Array.from({ length: count }, (_, i) => {
        const slot = template[i] || template[template.length - 1];
        const left = slot.baseLeft + randomBetween(-slot.jitterX, slot.jitterX);
        const top = slot.baseTop + randomBetween(-slot.jitterY, slot.jitterY);
        const rotate = randomBetween(-slot.rotateRange, slot.rotateRange);

        return {
            className: slot.className,
            left: `${left}%`,
            top: `${top}%`,
            rotate
        };
    });

    polaroidLayoutCache.set(cardIndex, layout);
    return layout;
}

const eventsData = [
    {
        title: "GDG @ Women In Tech Roadshow",
        date: "February 22, 2025",
        images: [
            "WTRS1.jpg",
            "WTRS2.jpg",
            "WTRS3.jpg"
        ],
        notes: [
            { text: "Women Techmakers", color: COLORS.RED, rotate: -3 },
            { text: "Diversity", color: COLORS.BLUE, rotate: 4 },
            { text: "New Voices", color: COLORS.YELLOW, rotate: -2 }
        ],
        description: "We collaborated at the Women in Tech Roadshow conference, which brought diverse audiences outside the usual developer circle."
    },
    {
        title: "Build with AI 2025",
        date: "April 12, 2025",
        images: [
            "BuildwithAI.jpg",
            "BuildwithAI3.jpg",
            "BuildwithAI4.jpg"
        ],
        notes: [
            { text: "Full House", color: COLORS.BLUE, rotate: -5 },
            { text: "Agentic AI", color: COLORS.GREEN, rotate: 2 },
            { text: "High Demand", color: COLORS.RED, rotate: 5 },
            { text: "500+ Attendees", color: COLORS.YELLOW, rotate: -2 }
        ],
        description: "High demand conference with parallel technical tracks. The venue was fully booked with 500 attendees. Capacity couldn't meet the demand!"
    },
    {
        title: "Cybersecurity Day 2025",
        date: "June 15, 2025",
        images: [
            "Cyber1.jpg",
            "Cyberr2.jpg",
            "Cybersecc.jpeg"
        ],
        notes: [
            { text: "CTF Winners", color: COLORS.RED, rotate: -4 },
            { text: "Cyber Defense", color: COLORS.BLUE, rotate: 3 },
            { text: "Semicolon", color: COLORS.GREEN, rotate: -2 }
        ],
        description: "We joined Semicolon Security in advocating for cyber security and celebrating the CTF winners. The applications are currently open for the next CTF round."
    },
    {
        title: "Google I/O Extended Beirut 2025",
        date: "September 6, 2025",
        images: [
            "Google IO Extended Beirut 2025-pt1.jpg",
            "Google IO Extended Beirut 20252.jpg",
            "gOOGLEio2.jpg"
        ],
        notes: [
            { text: "I/O Updates", color: COLORS.YELLOW, rotate: 2 },
            { text: "42 Beirut", color: COLORS.BLUE, rotate: -3 },
            { text: "Hybrid Event", color: COLORS.GREEN, rotate: 4 },
            { text: "100+ Attendees", color: COLORS.RED, rotate: 5 }
        ],
        description: "Hybrid event with collaboration from 42 Beirut. Successfully brought together 100 participants both in person and online for the updates from Google I/O."
    },
    {
        title: "DevFest Beirut 2025",
        date: "October 25, 2025",
        images: [
            "devfestbei2.jpeg",
            "devfestbei3.jpeg",
            "Devfest2.jpeg"
        ],
        notes: [
            { text: "1,000+ Attendees", color: COLORS.RED, rotate: 3 },
            { text: "40+ Speakers", color: COLORS.BLUE, rotate: -3 },
            { text: "Epic Energy", color: COLORS.YELLOW, rotate: 2 },
            { text: "Biggest!", color: COLORS.GREEN, rotate: 4 }
        ],
        description: "The biggest event of the year! Over 1,000 attendees. 40+ speakers, and incredible community energy. The highlight of our 2025 calendar. Connecting the Lebanese community with international speakers , sponsors and partners."
    },
    {
        title: "Build with AI - MENA Series",
        date: "December 15, 2025",
        images: [
            "zakaAI1.jpeg",
            "zaka1.jpg",
            "zaka.jpg"
        ],
        notes: [
            { text: "Generative AI", color: COLORS.GREEN, rotate: -2 },
            { text: "Google x ZAKA", color: COLORS.BLUE, rotate: 3 },
            { text: "Hands-on", color: COLORS.YELLOW, rotate: -3 }
        ],
        description: "Empowering the MENA Developer Network: Driving impactful collaboration through a strategic partnership between Google for Developers MENA and ZAKA. Together, we are building the future of Generative AI with hands-on mastery of Google AI and Vertex AI."
    },
    {
        title: "DevFest North Lebanon",
        date: "December 20, 2025",
        images: [
            "north.JPG",
            "north1.jpeg",
            "north3.jpeg"
        ],
        notes: [
            { text: "North Lebanon", color: COLORS.RED, rotate: 4 },
            { text: "Expansion", color: COLORS.BLUE, rotate: -2 },
            { text: "Regional Growth", color: COLORS.GREEN, rotate: 3 }
        ],
        description: "Expanding beyond Beirut! DevFest to North Lebanon with approximately 1,000 attendees. A milestone for regional growth."
    }
];

const container = document.getElementById('scroll-container');
const progressEl = document.getElementById('progress');

// 1. Create Content Wrapper (Book)
const contentWrapper = document.createElement('div');
contentWrapper.className = 'scroll-content book';
container.appendChild(contentWrapper);

// 1.5 Add Paper Plane
const plane = document.createElement('div');
plane.className = 'paper-plane';
plane.innerHTML = `<img src="plane.svg" alt="Plane">`;
container.appendChild(plane);

// 2. Create Book Cover (First Page)
const bookCover = document.createElement('div');
bookCover.className = 'event-card book-cover';
bookCover.style.zIndex = eventsData.length + 1;
bookCover.innerHTML = `
    <div class="card-shadow"></div>
    <div class="card-content book-cover-content">
        <div class="cover-design">
            <img src="logo.svg" alt="GDG Logo" class="cover-logo">
            <h1 class="cover-title">A Year in Review</h1>
            <div class="cover-year">2025</div>
            <p class="cover-subtitle">GDG Coast Lebanon</p>
            <div class="google-colors-bar">
                <span style="background: #4285F4"></span>
                <span style="background: #EA4335"></span>
                <span style="background: #FBBC05"></span>
                <span style="background: #34A853"></span>
            </div>
        </div>
    </div>
`;
contentWrapper.appendChild(bookCover);

// 3. Generate Event Cards (Book Pages)
// Store random flight paths
const flightPaths = [];

eventsData.forEach((event, index) => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.style.zIndex = eventsData.length - index;

    // Assign Random Flight Trajectory
    // When this card is "done", it flies away.
    // Random direction: Left, Right, Up-Left, Up-Right.
    // Mostly "away" from the user or "past" the user.

    const dirX = (Math.random() - 0.5) * 500; // -250 to 250 horizontal fly
    const dirY = (Math.random() - 1) * 500 - 200; // Mostly UP (-700 to -200)
    const rotX = (Math.random() - 0.5) * 180;
    const rotY = (Math.random() - 0.5) * 180;
    const rotZ = (Math.random() - 0.5) * 90;

    flightPaths.push({
        x: dirX,
        y: dirY,
        rX: rotX,
        rY: rotY,
        rZ: rotZ
    });

    // ... (Content generation same as before)
    const shadow = document.createElement('div');
    shadow.className = 'card-shadow';
    card.appendChild(shadow);

    // Add progress bar to page
    const pageProgress = document.createElement('div');
    pageProgress.className = 'page-progress';
    pageProgress.innerHTML = `
        <div class="page-progress-bar">
            <div class="page-progress-fill" style="width: ${((index + 1) / eventsData.length) * 100}%"></div>
        </div>
    `;
    card.appendChild(pageProgress);

    const content = document.createElement('div');
    content.className = 'card-content';

    // Header Section
    const textSection = document.createElement('div');
    textSection.className = 'text-section';
    textSection.innerHTML = `
        <h2>${event.title}</h2>
        <span class="event-date">${event.date}</span>
        <div class="sticky-notes-container"></div>
        <div class="event-description">${event.description}</div>
    `;

    // Custom Tape-Like Sticky Notes
    const noteContainer = textSection.querySelector('.sticky-notes-container');

    // Default Notes if none provided
    const defaultNotes = [
        { text: "Great Event!", color: COLORS.BLUE, rotate: -2 },
        { text: "Memories", color: COLORS.RED, rotate: 1 },
        { text: "2025", color: COLORS.YELLOW, rotate: -1 }
    ];

    // Use custom notes from event data or defaults
    const notesToRender = event.notes || defaultNotes;

    notesToRender.forEach((noteData, nIndex) => {
        const note = document.createElement('div');
        note.classList.add('sticky-note');
        // Allow simple string color or full object style
        note.style.backgroundColor = noteData.color || COLORS.YELLOW;
        note.style.color = noteData.textColor || (noteData.color === COLORS.YELLOW ? '#333' : 'white');
        note.innerText = noteData.text || "";

        // Random positioning/Rotation if not specified
        const rot = noteData.rotate !== undefined ? noteData.rotate : (Math.random() * 6) - 3;
        note.style.transform = `rotate(${rot}deg)`;

        // No manual left/top positioning needed! Flexbox handles it.

        noteContainer.appendChild(note);
    });

    content.appendChild(textSection);

    // Visual Section
    const visualSection = document.createElement('div');
    visualSection.className = 'event-grid';

    // --- Generate Polaroids: 1 Big + 2 Small ---
    const imagesForCard = ensureImageSet(event.images);
    const layout = getPolaroidLayout(index, imagesForCard.length);

    imagesForCard.forEach((imageUrl, i) => {
        const polaroid = document.createElement('div');
        const placement = layout[i] || layout[layout.length - 1];

        polaroid.className = placement.className;
        polaroid.style.left = placement.left;
        polaroid.style.top = placement.top;
        polaroid.style.zIndex = placement.className.includes('big') ? 10 : 5 + i;
        polaroid.style.transform = `rotate(${placement.rotate}deg)`;

        // Lazy load: store URL in data-src, load when card becomes active
        polaroid.innerHTML = `
            <div class="polaroid-content">
                <div class="polaroid-img" data-src="${imageUrl}" style="background-size: cover; background-position: center;"></div>
            </div>
        `;

        visualSection.appendChild(polaroid);
    });

    content.appendChild(visualSection);
    card.appendChild(content);
    contentWrapper.appendChild(card);
});

// 3.5. Create Back Cover (Last Page)
const backCover = document.createElement('div');
backCover.className = 'event-card book-cover back-cover';
backCover.style.zIndex = 0; // Lowest z-index, appears at the end
backCover.innerHTML = `
    <div class="card-shadow"></div>
    <div class="card-content book-cover-content">
        <div class="cover-design back-design">
            <h2 class="back-title">Stay tuned for <span style="color: #4285F4">2026!</span></h2>
            <p class="back-subtitle">Join us on social media</p>

            <div class="social-container">
                <div class="social-links">
                    <!-- LinkedIn - Scribble Style -->
                    <a href="https://www.linkedin.com/company/gdg-coast-lebanon" target="_blank" class="social-link" aria-label="LinkedIn">
                        <svg viewBox="0 0 60 60" width="60" height="60">
                            <path d="M5 8 Q3 5 8 3 L50 5 Q55 3 55 8 L58 50 Q60 55 52 57 L8 55 Q3 58 5 52 Z"
                                  fill="none" stroke="#0077b5" stroke-width="2.5" stroke-linecap="round"/>
                            <text x="30" y="40" font-family="Arial, sans-serif" font-size="28" font-weight="bold"
                                  fill="#0077b5" text-anchor="middle">in</text>
                        </svg>
                    </a>

                    <!-- Instagram - Scribble Style -->
                    <a href="https://www.instagram.com/gdgcoastlebanon" target="_blank" class="social-link" aria-label="Instagram">
                        <svg viewBox="0 0 60 60" width="60" height="60">
                            <defs>
                                <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" style="stop-color:#FFD521"/>
                                    <stop offset="50%" style="stop-color:#F7552B"/>
                                    <stop offset="100%" style="stop-color:#C13584"/>
                                </linearGradient>
                            </defs>
                            <path d="M8 6 Q4 4 6 10 L5 48 Q3 54 10 54 L52 56 Q58 57 56 50 L58 10 Q59 4 52 6 Z"
                                  fill="none" stroke="url(#igGrad)" stroke-width="2.5" stroke-linecap="round"/>
                            <circle cx="30" cy="30" r="10" fill="none" stroke="url(#igGrad)" stroke-width="2.5"/>
                            <circle cx="46" cy="14" r="2.5" fill="url(#igGrad)"/>
                        </svg>
                    </a>

                    <!-- Facebook - Scribble Style -->
                    <a href="https://www.facebook.com/gdglebanon/" target="_blank" class="social-link" aria-label="Facebook">
                        <svg viewBox="0 0 60 60" width="60" height="60">
                            <path d="M8 10 Q6 6 10 6 L50 8 Q56 7 54 12 L56 48 Q58 54 52 54 L10 56 Q4 56 6 50 L4 12 Q3 8 8 10 Z"
                                  fill="none" stroke="#1877F2" stroke-width="2.5" stroke-linecap="round"/>
                            <text x="30" y="42" font-family="Arial, sans-serif" font-size="32" font-weight="bold"
                                  fill="#1877F2" text-anchor="middle">f</text>
                        </svg>
                    </a>

                    <!-- YouTube - Scribble Style -->
                    <a href="https://www.youtube.com/@gdgcoastlebanon513" target="_blank" class="social-link" aria-label="YouTube">
                        <svg viewBox="0 0 60 60" width="60" height="60">
                            <path d="M10 18 Q8 16 12 16 L48 15 Q54 14 54 20 L55 40 Q56 46 50 46 L12 47 Q6 48 6 42 L5 20 Q4 16 10 18 Z"
                                  fill="none" stroke="#FF0000" stroke-width="2.5" stroke-linecap="round"/>
                            <path d="M25 22 L40 30 L25 38 Z" fill="#FF0000"/>
                        </svg>
                    </a>
                </div>

                <div class="handles-row">
                    <span>@gdgcoastlebanon</span>
                    <span>@devfestlebanon</span>
                </div>

                <!-- Community Button -->
                <a href="https://gdg.community.dev/gdg-coast-lebanon/" target="_blank" class="community-sticker">
                   <div class="sticker-content">
                        <span>Join our</span>
                        <strong>Community</strong>
                   </div>
                </a>

                <!-- Revisit Button (Inside Book) -->
                <button id="revisit-btn" class="revisit-btn" onclick="location.reload()">
                    <svg class="replay-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
                    </svg>
                    Revisit 2025
                </button>
            </div>
        </div>
    </div>
`;
contentWrapper.appendChild(backCover);


// 3.6 Replay logic is now inside the back cover button


// 4. Animation Logic
const DURATION = 45000; // Slower animation: ~5 seconds per page * 9 pages (front + 7 events + back) = 45s
const INITIAL_DELAY = 2000; // 2 second delay before cover starts flipping
let startTime = null;
const cards = document.querySelectorAll('.event-card');

// Lazy loading helper
function loadCardImages(card) {
    if (card.dataset.imagesLoaded) return;
    const images = card.querySelectorAll('.polaroid-img[data-src]');
    images.forEach(img => {
        const src = img.dataset.src;
        if (src) {
            img.style.backgroundImage = `url('${src}')`;
            delete img.dataset.src;
        }
    });
    card.dataset.imagesLoaded = 'true';
}

// Preload first 2 cards immediately
cards.forEach((card, i) => {
    card.style.top = '50px';
    if (i < 2) loadCardImages(card);
});

function animate(timestamp) {
    if (!startTime) startTime = timestamp;

    // Apply initial delay before animation starts
    const adjustedElapsed = Math.max(0, timestamp - startTime - INITIAL_DELAY);
    const progress = Math.min(adjustedElapsed / DURATION, 1);

    // Progress bar uses adjusted progress
    progressEl.style.width = `${progress * 100}%`;

    // Move Plane along a path - Full Screen Navigation
    const t = progress * Math.PI * 2; // Full loop
    const w = window.innerWidth - 100;
    const h = window.innerHeight - 100;

    // Figure-8 ish
    const planeX = (w / 2) + (w / 2) * Math.sin(t * 1.5);
    const planeY = (h / 2) + (h / 2) * Math.cos(t * 2);

    const dt = 0.01;
    const nextX = (w / 2) + (w / 2) * Math.sin((t + dt) * 1.5);
    const nextY = (h / 2) + (h / 2) * Math.cos((t + dt) * 2);

    const dx = nextX - planeX;
    const dy = nextY - planeY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 45;

    plane.style.transform = `translate(${planeX}px, ${planeY}px) rotate(${angle}deg)`;

    // Card Physics
    const totalEvents = cards.length;
    // Stop BEFORE the last card (back cover) so it doesn't flip away.
    // cards.length - 1 means we go from 0 to 8 (if 9 cards).
    // The last card (index 8) will be the "current" at the very end.
    const currentPos = progress * (totalEvents - 1);

    cards.forEach((card, i) => {
        const floorCurrent = Math.floor(currentPos);
        const isPast = i < floorCurrent;
        const isCurrent = i === floorCurrent;
        const isNext = i === floorCurrent + 1;
        const fraction = currentPos - floorCurrent; // 0 to 1

        // Sticker/Photo Visibility Logic
        let shouldBeActive = false;
        if (isPast || isCurrent) {
            shouldBeActive = true;
        } else if (isNext && fraction > 0.45) {
            shouldBeActive = true;
        }

        // Lazy load images for current and next cards
        if (isCurrent || isNext) {
            loadCardImages(card);
            // Also preload the one after next
            if (cards[i + 2]) loadCardImages(cards[i + 2]);
        }

        if (shouldBeActive) {
            if (!card.classList.contains('active')) card.classList.add('active');
        } else {
            card.classList.remove('active');
        }

        let transformStr = '';
        let opacity = 1;
        let zIndex = eventsData.length - i;

        if (isPast) {
            // Already Flipped (Left Stack)
            zIndex = i;
            transformStr = `perspective(1500px) rotateY(-180deg)`;
            card.classList.remove('flipping');

        } else if (isCurrent) {
            // Currently Flipping (Active / Turning)
            const rotY = -180 * fraction;
            const liftZ = Math.sin(fraction * Math.PI) * 80;
            const curveY = Math.sin(fraction * Math.PI) * -30;

            transformStr = `perspective(1500px) rotateY(${rotY}deg) translateZ(${liftZ}px) translateY(${curveY}px)`;
            zIndex = 100;

            if (!card.classList.contains('flipping')) card.classList.add('flipping');

            const shadow = card.querySelector('.card-shadow');
            if (shadow) shadow.style.opacity = Math.sin(fraction * Math.PI) * 0.4;

        } else {
            // Waiting Queue (Right Stack)
            const depth = i - currentPos;
            const waitingScale = Math.max(1 - depth * 0.08, 0.7);
            const waitingZ = -depth * 40;
            const waitingY = depth * 3;

            transformStr = `perspective(1500px) translate3d(0, ${waitingY}px, ${waitingZ}px) scale(${waitingScale})`;
            card.classList.remove('flipping');
        }

        card.style.transform = transformStr;
        card.style.zIndex = zIndex;
        card.style.opacity = opacity;
    });

    if (progress < 1) {
        requestAnimationFrame(animate);
    } else {
        // Animation Complete
        // Show Revisit Button after 2 seconds
        if (!document.getElementById('revisit-btn').classList.contains('visible')) {
            setTimeout(() => {
                const btn = document.getElementById('revisit-btn');
                if (btn) btn.classList.add('visible');
            }, 2000);
        }
    }
}

requestAnimationFrame(animate);
