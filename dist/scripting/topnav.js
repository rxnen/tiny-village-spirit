function responsiveNav() {
    var topnav = document.getElementById("topnav");
    var topNavItems = document.getElementsByClassName("topnav-item");
    if (topnav.classList.contains("responsive")) {
        topnav.classList.add("topnav");
        topnav.classList.remove("responsive");
        document.body.style.overflow = "visible";
        document.body.style.height = "auto";
        for (let i = 0; i < topNavItems.length; i++) {
            topNavItems[i].style.display = "none";
        }
    } else {
        topnav.className += " responsive";
        window.scrollTo({ top: 0, behavior: 'smooth' });

        document.body.style.overflow = "hidden";
        document.body.style.height = "100%";
        topnav.classList.remove("topnav");
        for (let i = 0; i < topNavItems.length; i++) {
            topNavItems[i].style.display = "block";
        }
        }
  }

let navbar = document.getElementById("topnav");

  // Select the main content container (e.g., `<main>`, or whatever element wraps your main content)
const mainContent = document.querySelector("main"); // Adjust if necessary

// Set initial padding based on navbar height
const setMainContentPadding = () => {
    const navbarHeight = navbar.offsetHeight;
    mainContent.style.paddingTop = `${navbarHeight}px`;
    console.log(navbarHeight);
};

// Run the function once on page load
setMainContentPadding();

// Adjust padding if the window resizes (in case of responsive changes)
window.addEventListener("resize", setMainContentPadding);

// Rest of the scroll behavior code remains the same
let lastScrollTop = 0;
const scrollThreshold = 20;

window.addEventListener("scroll", function() {
    const navbarHeight = navbar.offsetHeight;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop + scrollThreshold) {
        navbar.style.top = `-${navbarHeight}px`;
    } else if (scrollTop < lastScrollTop) {
        navbar.style.top = "0";
    }

    lastScrollTop = scrollTop;
});


window.addEventListener('resize', function(event) {
    if (this.window.innerWidth > 995) {
        var topnav = document.getElementById("topnav");
        var topNavItems = document.getElementsByClassName("topnav-item");
        topnav.classList.add("topnav");
        topnav.classList.remove("responsive");
        for (let i = 0; i < topNavItems.length; i++) {
            topNavItems[i].style.display = "block";
        }
    } else {
        var topnav = document.getElementById("topnav");
        var topNavItems = document.getElementsByClassName("topnav-item");
        for (let i = 0; i < topNavItems.length; i++) {
            topNavItems[i].style.display = "none";
        }
    }
}, true);

// Existing responsiveNav function remains at the top

// Add dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.topnav-item');
        const content = dropdown.querySelector('.dropdown-content');
        
        // Handle clicks on dropdown triggers
        trigger.addEventListener('click', (e) => {
            // Only handle dropdown on mobile
            if (window.innerWidth <= 995) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close all other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                        otherDropdown.querySelector('.dropdown-content').classList.remove('show');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
                content.classList.toggle('show');
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                dropdown.querySelector('.dropdown-content').classList.remove('show');
            });
        }
    });
    
    // Handle resize events
    window.addEventListener('resize', () => {
        if (window.innerWidth > 995) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                dropdown.querySelector('.dropdown-content').classList.remove('show');
            });
        }
    });
});

// Rest of your existing JavaScript remains the same