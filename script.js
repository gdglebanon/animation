const COLORS = {
    BLUE: "#4285F4",
    RED: "#EA4335",
    YELLOW: "#FBBC05",
    GREEN: "#34A853"
};

const eventsData = [
    {
        title: "GDG @ Women In Tech Roadshow",
        date: "February 22, 2025",
        photos: 2,
        images: [
            "Women intechRoadshow.jpg",
            "IMG_7301-EDIT.jpg"
        ],
        notes: [
            { text: "Laura ✨", color: COLORS.RED, rotate: -3 },
            { text: "Diverse", color: COLORS.BLUE, rotate: 4 },
            { text: "100+", color: COLORS.YELLOW, rotate: -2 }
        ],
        description: "Strong collaboration with Laura brought diverse audiences outside the usual developer circle. A successful reach to new communities!"
    },
    {
        title: "Build with AI 2025",
        date: "April 12, 2025",
        photos: 4,
        images: [
            "BuildwithAI.jpg",
            "PHOTO-2025-04-12-17-01-31.jpg",
            "PHOTO-2025-04-12-17-16-21 2.jpg",
            "PHOTO-2025-04-12-17-20-42 2.jpg",
            "PHOTO-2025-04-12-19-56-22.jpg",
            "PHOTO-2025-04-12-19-56-24.jpg"
        ],
        notes: [
            { text: "500 Devs", color: COLORS.BLUE, rotate: -5 },
            { text: "Agentic AI", color: COLORS.GREEN, rotate: 2 },
            { text: "Fully Booked", color: COLORS.RED, rotate: 5 },
            { text: "Waitlist!", color: COLORS.YELLOW, rotate: 3 }
        ],
        description: "High demand conference with excellent feedback on Agentic AI workshops. Venue was fully booked with 500 attendees - capacity couldn't meet the demand!"
    },
    {
        title: "Cybersecurity Day 2025",
        date: "June 15, 2025",
        photos: 2,
        images: [
            "Cybersec.jpeg",
            "Cybersecc.jpeg"
        ],
        notes: [
            { text: "Security", color: COLORS.RED, rotate: -4 },
            { text: "Experts", color: COLORS.BLUE, rotate: 3 },
            { text: "New Crowd", color: COLORS.GREEN, rotate: -2 }
        ],
        description: "Collaboration with security experts provided deep technical value, attracting a new segment of professionals to the community."
    },
    {
        title: "Google I/O Extended Beirut 2025",
        date: "September 6, 2025",
        photos: 3,
        images: [
            "Google IO Extended Beirut 2025.jpg",
            "IMG-20250906-WA0103.jpg",
            "Google IO Extended Beirut 20252.jpg"
        ],
        notes: [
            { text: "Hybrid", color: COLORS.YELLOW, rotate: 2 },
            { text: "42 Collab", color: COLORS.BLUE, rotate: -3 },
            { text: "100 Devs", color: COLORS.GREEN, rotate: 4 },
            { text: "Big Event", color: COLORS.RED, rotate: -1 }
        ],
        description: "Big hybrid event with collaboration from 42. Successfully brought together 100 participants both in-person and online."
    },
    {
        title: "DevFest Beirut 2025",
        date: "October 25, 2025",
        photos: 0,
        images: [],
        notes: [
            { text: "1,100+", color: COLORS.RED, rotate: 3 },
            { text: "40 Speakers", color: COLORS.BLUE, rotate: -3 },
            { text: "Biggest!", color: COLORS.YELLOW, rotate: 2 },
            { text: "Energy", color: COLORS.GREEN, rotate: -4 }
        ],
        description: "The biggest event of the year! Over 1,100 attendees, 40+ speakers, and incredible community energy. The highlight of our 2025 calendar."
    },
    {
        title: "Build with AI - MENA Series",
        date: "December 15, 2025",
        photos: 0,
        images: [],
        notes: [
            { text: "ZAKA", color: COLORS.GREEN, rotate: -2 },
            { text: "Regional", color: COLORS.BLUE, rotate: 3 },
            { text: "MENA", color: COLORS.YELLOW, rotate: -3 }
        ],
        description: "Great regional visibility through ZAKA collaboration. Connected local developers with the broader MENA network despite end-of-year timing challenges."
    },
    {
        title: "DevFest North Lebanon",
        date: "December 20, 2025",
        photos: 0,
        images: [],
        notes: [
            { text: "1,000!", color: COLORS.RED, rotate: 4 },
            { text: "North LB", color: COLORS.BLUE, rotate: -2 },
            { text: "External", color: COLORS.GREEN, rotate: 3 },
            { text: "Expansion", color: COLORS.YELLOW, rotate: -4 }
        ],
        description: "Expanding beyond Beirut! External event bringing DevFest to North Lebanon with approximately 1,000 attendees. A milestone for regional growth."
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

    // --- Generate Polaroids: 1 Big + Small ones ---
    const actualImages = event.images ? event.images.filter(img => img) : [];

    actualImages.forEach((imageUrl, i) => {
        const polaroid = document.createElement('div');
        const isBig = (i === 0); // First image is big

        polaroid.className = isBig ? 'polaroid polaroid-big' : 'polaroid polaroid-small';

        if (isBig) {
            // Big image: positioned left side
            polaroid.style.left = '0%';
            polaroid.style.top = '5%';
            polaroid.style.transform = `rotate(${Math.random() * 6 - 3}deg)`;
            polaroid.style.zIndex = 10;
        } else {
            // Small images: scattered on right side
            const smallIndex = i - 1;
            const randX = 55 + (smallIndex % 2) * 20 + Math.random() * 10;
            const randY = 5 + Math.floor(smallIndex / 2) * 35 + Math.random() * 10;
            const randRot = Math.random() * 20 - 10;

            polaroid.style.left = `${randX}%`;
            polaroid.style.top = `${randY}%`;
            polaroid.style.transform = `rotate(${randRot}deg)`;
            polaroid.style.zIndex = i + 1;
        }

        polaroid.innerHTML = `
            <div class="polaroid-content">
                <div class="polaroid-img" style="background-image: url('${imageUrl}'); background-size: cover; background-position: center;"></div>
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
                    <a href="#" class="social-link" aria-label="LinkedIn">
                        <svg viewBox="0 0 60 60" width="60" height="60">
                            <path d="M5 8 Q3 5 8 3 L50 5 Q55 3 55 8 L58 50 Q60 55 52 57 L8 55 Q3 58 5 52 Z"
                                  fill="none" stroke="#0077b5" stroke-width="2.5" stroke-linecap="round"/>
                            <text x="30" y="40" font-family="Arial, sans-serif" font-size="28" font-weight="bold"
                                  fill="#0077b5" text-anchor="middle">in</text>
                        </svg>
                    </a>

                    <!-- Instagram - Scribble Style -->
                    <a href="#" class="social-link" aria-label="Instagram">
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
                    <a href="#" class="social-link" aria-label="Facebook">
                        <svg viewBox="0 0 60 60" width="60" height="60">
                            <path d="M8 10 Q6 6 10 6 L50 8 Q56 7 54 12 L56 48 Q58 54 52 54 L10 56 Q4 56 6 50 L4 12 Q3 8 8 10 Z"
                                  fill="none" stroke="#1877F2" stroke-width="2.5" stroke-linecap="round"/>
                            <text x="30" y="42" font-family="Arial, sans-serif" font-size="32" font-weight="bold"
                                  fill="#1877F2" text-anchor="middle">f</text>
                        </svg>
                    </a>

                    <!-- YouTube - Scribble Style -->
                    <a href="#" class="social-link" aria-label="YouTube">
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
            </div>
        </div>
    </div>
`;
contentWrapper.appendChild(backCover);

// 4. Animation Logic
const DURATION = 45000; // Slower animation: ~5 seconds per page * 9 pages (front + 7 events + back) = 45s
const INITIAL_DELAY = 2000; // 2 second delay before cover starts flipping
let startTime = null;
const cards = document.querySelectorAll('.event-card');

cards.forEach((card, i) => {
    card.style.top = '50px';
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
    const currentPos = progress * totalEvents;

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
    }
    // Animation completes naturally - back cover is now visible
}

requestAnimationFrame(animate);
