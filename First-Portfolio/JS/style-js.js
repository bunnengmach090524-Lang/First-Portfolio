// 1. Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 2. Element Visibility Animation (Intersection Observer)
// This makes elements fade in as the user scrolls them into view.
const sections = document.querySelectorAll('.body-container, .skills-section');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing the element once it's visible
            observer.unobserve(entry.target); 
        }
    });
}, {
    // options for the observer
    threshold: 0.1 // Trigger when 10% of the element is visible
});

sections.forEach(section => {
    observer.observe(section);
});

// 3. Simple Button Interaction (Feedback)
const downloadButton = document.getElementById('download-btn');

downloadButton.addEventListener('click', () => {
    // You can add tracking or a temporary visual feedback here
    console.log('CV Download initiated!');
    
    // Optional: Change button text briefly
    downloadButton.textContent = 'Downloading...';
    setTimeout(() => {
        downloadButton.textContent = 'Download CV';
    }, 1500);
});

// //  responsive menu toggle for mobile view
// const navToggle = document.getElementById('nav-toggle');
// const mainNav = document.getElementById('main-nav');

// navToggle.addEventListener('click', () => {
//     // This toggles the 'open' class on the <nav> element
//     mainNav.classList.toggle('open');
// });

// // Optional: Close menu when a link is clicked
// document.querySelectorAll('#main-nav a').forEach(link => {
//     link.addEventListener('click', () => {
//         if (mainNav.classList.contains('open')) {
//             mainNav.classList.remove('open');
//         }
//     });
// });


document.addEventListener('DOMContentLoaded', function() {
    // Get references to the elements
    const nav = document.getElementById('main-nav');
    const hamburgerBtn = document.getElementById('nav-toggle');
    const xmarkBtn = document.getElementById('nav-toggle-close'); // Using 'nav-toggle-close' as ID

    /**
     * Toggles the navigation menu's 'open' class and swaps the button visibility.
     */
    function toggleMenu() {
        // Toggle the 'open' class on the <nav> element
        nav.classList.toggle('open');
        
        // Check if the menu is now open
        const isOpen = nav.classList.contains('open');

        // Toggle the visibility of the buttons
        if (isOpen) {
            hamburgerBtn.style.display = 'none'; // Hide hamburger
            xmarkBtn.style.display = 'block';    // Show xmark
        } else {
            hamburgerBtn.style.display = 'block'; // Show hamburger
            xmarkBtn.style.display = 'none';      // Hide xmark
        }

        // Update aria-expanded attribute for accessibility (optional but recommended)
        hamburgerBtn.setAttribute('aria-expanded', isOpen);
    }

    // Attach the same click event handler to both buttons
    hamburgerBtn.addEventListener('click', toggleMenu);
    xmarkBtn.addEventListener('click', toggleMenu);
    
    // OPTIONAL: Close the menu when a link inside the nav is clicked
    const navLinks = nav.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Only close if the menu is open (on mobile)
            if (nav.classList.contains('open')) {
                toggleMenu(); 
            }
        });
    });
});

// message box view more about me 
// Get elements
const modal = document.getElementById('welcome-modal');
const closeBtn = document.getElementById('close-modal');

// Close modal when button is clicked
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  
  // Optional: prevent the scrollbar from being hidden if you disabled it
  document.body.style.overflow = 'auto';
});

// Optional: Disable scrolling while modal is open
document.body.style.overflow = 'hidden';

//  my education & skills
const skillData = {
    frontend: {
        title: "Front-End",
        skills: [
            { name: "HTML5", level: "95%" },
            { name: "CSS3", level: "93%" },
            { name: "JQuery", level: "85%" },
            { name: "Tailwind CSS", level: "92%" },
            { name: "JavaScript", level: "90%" },
            { name: "React.js", level: "85%" },
            { name: "VueJs", level: "88%"}
        ]
    },
    backend: {
        title: "Back-End",
        skills: [
            { name: "Java", level: "85%" },
            { name: "C#", level: "80%" },
            { name: "Node.js", level: "75%" }
        ]
    },
    tools: {
        title: "Tools",
        skills: [
            { name: "Git/GitHub", level: "90%" },
            { name: "VS Code", level: "95%" },
            { name: "Figma", level: "80%" }
        ]
    },
    softskills: {
        title: "Soft Skills",
        skills: [
            { name: "Communication", level: "95%" },
            { name: "Teamwork", level: "90%" },
            { name: "Problem Solving", level: "85%" }
        ]
    }
};

function showSkill(category) {
    // 1. Update Active Tab UI
    document.querySelectorAll('.tab-item').forEach(tab => tab.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // 2. Update Title and Content
    const data = skillData[category];
    document.getElementById('skill-title').innerText = data.title;
    
    const list = document.getElementById('skill-list');
    list.innerHTML = data.skills.map(s => `
        <div class="skill-row">
            <div class="skill-info">
                <span>${s.name}</span>
                <span>${s.level}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${s.level}"></div>
            </div>
        </div>
    `).join('');
}

// Initialize with Frontend on load
window.onload = () => showSkill('frontend');

// scroll on screen

window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const bodyContainers = document.querySelectorAll('.body-container');        
    bodyContainers.forEach(container => {
        const containerTop = container.offsetTop;   
        if (scrollPosition >= containerTop - window.innerHeight / 1.2) {
            container.classList.add('visible');
        }   
    });
});