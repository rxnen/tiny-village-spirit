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