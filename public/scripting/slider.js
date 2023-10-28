let currentSlider = 1;
showSlider(currentSlider)

function nextSlider(n) {
    showSlider(currentSlider += n);
} 

function currentSlide(n) {
    showSlider(currentSlider = n);
  }

function showSlider(n) {
    let i;
    var slides = document.getElementsByClassName("splash-slider-item");
    let dots = document.getElementsByClassName("slider-dot");
    currentSlider = n;

    if (n > slides.length) {currentSlider = 1}
    if (n < 1) {currentSlider = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[currentSlider-1].style.display = "block";
    dots[currentSlider-1].className += " active";
}