const COLORS = {
    BLUE: "#4285F4",
    RED: "#EA4335",
    YELLOW: "#FBBC05",
    GREEN: "#34A853"
};

const eventsData = [
    {
        title: "Google I/O Extended",
        date: "May 15, 2025",
        photos: 3,
        images: [
            "logo.svg",
            "logo.svg",
            "logo.svg"
        ],
        notes: [
            { text: "100+ Devs", color: COLORS.BLUE, rotate: -5 },
            { text: "Live Demo", color: COLORS.RED, rotate: 5 },
            { text: "", color: COLORS.YELLOW, rotate: 2 } // Empty note
        ],
        description: "Join us for an immersive recap of the biggest Google announcements. Deep dive into the latest in AI, Mobile, and Cloud technologies."
    },
    {
        title: "Cloud Summit 2025",
        date: "June 02, 2025",
        photos: 4,
        images: [
            // "path/to/cloud1.jpg",
            // "path/to/cloud2.jpg"
        ],
        notes: [
            { text: "100+ Devs", color: COLORS.BLUE, rotate: -5 },
            { text: "Live Demo", color: COLORS.RED, rotate: 5 },
            { text: "", color: COLORS.GREEN, rotate: 2 } // Empty green note
        ],
        description: "Explore the power of Google Cloud. Hands-on labs, expert sessions, and networking with cloud architects."
    },
    {
        title: "Women Techmakers",
        date: "June 20, 2025",
        photos: 3,
        images: [],
        notes: [
            { text: "Inspiring!", color: COLORS.RED, rotate: -3 },
            { text: "Power", color: COLORS.BLUE, rotate: 4 },
            { text: "Community", color: COLORS.YELLOW, rotate: -2 }
        ],
        description: "Celebrating diversity in tech. Inspiring talks, leadership workshops, and community building for everyone."
    },
    {
        title: "Android Workshop",
        date: "July 10, 2025",
        photos: 4,
        images: [],
        notes: [
            { text: "Kotlin <3", color: COLORS.GREEN, rotate: 2 },
            { text: "Jetpack", color: COLORS.BLUE, rotate: -4 },
            { text: "Mobile", color: COLORS.RED, rotate: 3 },
            { text: "Compose", color: COLORS.YELLOW, rotate: 1 }
        ],
        description: "Master Modern Android Development. From Jetpack Compose to Kotlin Coroutines, level up your mobile skills."
    },
    {
        title: "AI/ML Bootcamp",
        date: "August 05, 2025",
        photos: 3,
        images: [],
        notes: [
            { text: "TensorFlow", color: COLORS.YELLOW, rotate: -3 },
            { text: "Keras", color: COLORS.RED, rotate: 3 },
            { text: "Model It", color: COLORS.BLUE, rotate: -1 }
        ],
        description: "A comprehensive bootcamp covering TensorFlow, Keras, and generative AI models. Build your own models from scratch."
    },
    {
        title: "Web Technologies Day",
        date: "September 12, 2025",
        photos: 4,
        images: [],
        notes: [
            { text: "PWA", color: COLORS.BLUE, rotate: 2 },
            { text: "Chrome", color: COLORS.GREEN, rotate: -2 },
            { text: "Speed", color: COLORS.RED, rotate: 4 },
            { text: "WebAssembly", color: COLORS.YELLOW, rotate: -5 }
        ],
        description: "The future of the web is here. Learn about PWA, WebAssembly, and the latest Chrome APIs."
    },
    {
        title: "DevFest 2025 Launch",
        date: "October 01, 2025",
        photos: 3,
        images: [],
        notes: [
            { text: "Kickoff", color: COLORS.RED, rotate: -4 },
            { text: "Swag!", color: COLORS.BLUE, rotate: 3 },
            { text: "Big Plans", color: COLORS.GREEN, rotate: -2 }
        ],
        description: "Kicking off our flagship event season. Meet the team, grab swag, and prepare for the biggest developer festival."
    },
    {
        title: "Hackathon: Build for Good",
        date: "October 25, 2025",
        photos: 4,
        images: [],
        notes: [
            { text: "48 Hours", color: COLORS.YELLOW, rotate: 3 },
            { text: "Coding", color: COLORS.RED, rotate: -3 },
            { text: "Impact", color: COLORS.BLUE, rotate: 2 },
            { text: "Pizza!", color: COLORS.GREEN, rotate: 5 }
        ],
        description: "48 hours of coding to solve real-world problems. Great prizes, food, and mentorship included."
    },
    {
        title: "Career Fair & Networking",
        date: "November 15, 2025",
        photos: 3,
        images: [],
        notes: [
            { text: "Hired!", color: COLORS.GREEN, rotate: -2 },
            { text: "Review", color: COLORS.YELLOW, rotate: 4 },
            { text: "Jobs", color: COLORS.BLUE, rotate: -3 }
        ],
        description: "Connect with top tech companies in Lebanon. Portfolio reviews, mock interviews, and job opportunities."
    },
    {
        title: "End of Year Celebration",
        date: "December 20, 2025",
        photos: 4,
        images: [],
        notes: [
            { text: "Trivia", color: COLORS.RED, rotate: 3 },
            { text: "Awards", color: COLORS.BLUE, rotate: -3 },
            { text: "2026", color: COLORS.YELLOW, rotate: 2 },
            { text: "Fun", color: COLORS.GREEN, rotate: -4 }
        ],
        description: "Wrap up an amazing year with the community. Awards, trivia night, and looking forward to 2026."
    },
];

const container = document.getElementById('scroll-container');
const progressEl = document.getElementById('progress');

// 1. Create Content Wrapper
const contentWrapper = document.createElement('div');
contentWrapper.className = 'scroll-content';
container.appendChild(contentWrapper);

// 1.5 Add Paper Plane
const plane = document.createElement('div');
plane.className = 'paper-plane';
plane.innerHTML = `<img src="plane.svg" alt="Plane">`;
// Or inline SVG if file not loaded, but I wrote the file. 
// Just in case, let's inline for robustness if local file fetch has issues in some contexts? 
// No, file is fine.
container.appendChild(plane);

// 2. Generate Event Cards (Scrapbook Pages)
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

    // --- Generate Scatter Polaroids ---
    const photosCount = event.photos; // Use event.photos for the number of polaroids

    for (let i = 0; i < photosCount; i++) {
        const polaroid = document.createElement('div');
        polaroid.className = 'polaroid';
        polaroid.style.zIndex = i + 1;

        // Responsive Scatter: Use Percentages!
        // Spread across 0% to 60% of width
        // i=0 -> 0-10%, i=3 -> 50-60%
        const maxLeft = 60;
        const step = maxLeft / Math.max(photosCount - 1, 1);

        const randX = (Math.random() * 10) + (i * step);
        const randY = Math.random() * 20 + (i % 2) * 10;
        const randRot = Math.random() * 30 - 15;

        polaroid.style.left = `${randX}%`;
        polaroid.style.top = `${randY}%`;
        polaroid.style.transform = `rotate(${randRot}deg)`;
        polaroid.style.zIndex = i + 1;




        // LOGIC: Use Custom Image if provided, otherwise Random Fallback
        let imageUrl;
        if (event.images && event.images[i]) {
            imageUrl = event.images[i];
        } else {
            // Random Fallback
            const randomSig = Math.floor(Math.random() * 1000);
            imageUrl = `https://picsum.photos/seed/${randomSig}/200/200`;
        }

        polaroid.innerHTML = `
            <div class="polaroid-content">
                <div class="polaroid-img" style="background-image: url('${imageUrl}'); background-size: cover; background-position: center;"></div>
                <div class="polaroid-caption">Memory #${i + 1}</div>
            </div>
        `;

        visualSection.appendChild(polaroid);
    }

    content.appendChild(visualSection);
    card.appendChild(content);
    contentWrapper.appendChild(card);
});

// 3. Animation Logic
// 3. Animation Logic
const DURATION = 25000; // 2.5 seconds per book * 10 books = 25s
let startTime = null;
const cards = document.querySelectorAll('.event-card');

cards.forEach((card, i) => {
    card.style.top = '250px';
});

function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / DURATION, 1);

    progressEl.style.width = `${progress * 100}%`;

    // Move Plane along a path - Full Screen Navigation
    // We want it to visit different corners or loop broadly.
    // A Lissajous curve or large Sine wave works well.
    // x = A * sin(at + delta), y = B * sin(bt)

    // Scale time for the path
    const t = progress * Math.PI * 2; // Full loop

    // Wide horizontal sweep (0 to innerWidth)
    // Vertical sweep (0 to innerHeight)
    // We offset by 50px to keep it inside roughly
    const w = window.innerWidth - 100;
    const h = window.innerHeight - 100;

    // Figure-8 ish
    const planeX = (w / 2) + (w / 2) * Math.sin(t * 1.5);
    const planeY = (h / 2) + (h / 2) * Math.cos(t * 2);

    // Calculate angle for rotation (tangent)
    // dx/dt = ...
    // dy/dt = ...
    // Approximate angle by looking slightly ahead? Or derivative.
    const dt = 0.01;
    const nextX = (w / 2) + (w / 2) * Math.sin((t + dt) * 1.5);
    const nextY = (h / 2) + (h / 2) * Math.cos((t + dt) * 2);

    const dx = nextX - planeX;
    const dy = nextY - planeY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 45; // +45 because icon points top-right or similar? 
    // My SVG points Top-Right (45deg). 0deg rotation means pointing Top-Right.
    // atan2(dy, dx) gives angle from East (0deg).
    // If dy is positive (down), dx positive (right), angle is positive.
    // Standard rotation: 0 is Right. 90 is Down.
    // If the SVG arrow points "Up-Right" (towards 2 o'clock), that's -45deg relative to Up, or 45deg relative to Right?
    // Let's assume standard rotation adjustment. +45 usually aligns a 45-degree arrow to 0.

    plane.style.transform = `translate(${planeX}px, ${planeY}px) rotate(${angle}deg)`;

    // Card Physics
    const totalEvents = cards.length;
    const currentPos = progress * totalEvents;

    cards.forEach((card, i) => {
        // const path = flightPaths[i]; // Unused for book flip

        const floorCurrent = Math.floor(currentPos);
        const isPast = i < floorCurrent;
        const isCurrent = i === floorCurrent;
        const isNext = i === floorCurrent + 1;
        const fraction = currentPos - floorCurrent; // 0 to 1

        // Sticker/Photo Visibility Logic
        // 1. Past cards (left stack) -> Active (Keep photos visible)
        // 2. Current card (flipping) -> Active
        // 3. Next card -> Active IF current flip > 35% (Visible Reveal)
        let shouldBeActive = false;
        if (isPast || isCurrent) {
            shouldBeActive = true;
        } else if (isNext && fraction > 0.45) {
            // Trigger mid-flip so the user SEES the slap happen
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
            transformStr = `perspective(1200px) rotateY(-150deg)`;

        } else if (isCurrent) {
            // Currently Flipping (Active / Turning)
            const rotY = -150 * fraction;
            transformStr = `perspective(1200px) rotateY(${rotY}deg) translateZ(${fraction * 50}px)`; // Add lift while turning
            zIndex = 100;

            const shadow = card.querySelector('.card-shadow');
            if (shadow) shadow.style.opacity = Math.sin(fraction * Math.PI) * 0.3;

        } else {
            // Waiting Queue (Right Stack)
            const depth = i - currentPos;

            // "Pop" Effect
            const waitingScale = Math.max(1 - depth * 0.1, 0.6);
            const waitingZ = -depth * 60;
            const waitingY = depth * 5;

            transformStr = `perspective(1200px) translate3d(0, ${waitingY}px, ${waitingZ}px) scale(${waitingScale})`;
        }

        card.style.transform = transformStr;
        card.style.zIndex = zIndex;
        card.style.opacity = opacity;
    });

    if (progress < 1) {
        requestAnimationFrame(animate);
    } else {
        // Animation Complete
        setTimeout(() => {
            const closing = document.getElementById('closing-section');
            if (closing) closing.classList.add('visible');
        }, 1);  // Appearance delay reduced for snappier feel
    }
}

requestAnimationFrame(animate);
