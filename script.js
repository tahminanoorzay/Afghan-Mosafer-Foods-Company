window.addEventListener("DOMContentLoaded", () => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };
  navbarShrink();
  document.addEventListener("scroll", navbarShrink);

  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map((responsiveNavItem) => {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });

  // -----------
  const imageUrls = [];
  for (let i = 1; i <= 40; i++) {
    imageUrls.push(`assets/img/Image-Gallery/${i}.jpg`);
  }

  const slidesContainer = document.getElementById("slides");
  const dotsContainer = document.getElementById("dots");

  imageUrls.forEach((url, index) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `<img src="${url}" alt="Slide ${index + 1}">`;
    slidesContainer.appendChild(slide);

    const dot = document.createElement("span");
    dot.className = "dot" + (index === 0 ? " active" : "");
    dot.setAttribute("onclick", `goToSlide(${index})`);
    dotsContainer.appendChild(dot);
  });

  let currentIndex = 0;
  const dots = document.querySelectorAll(".dot");
  const totalSlides = dots.length;

  function updateSlide() {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  window.moveSlide = function (n) {
    currentIndex = (currentIndex + n + totalSlides) % totalSlides;
    updateSlide();
  };

  window.goToSlide = function (n) {
    currentIndex = n;
    updateSlide();
  };

  // شروع با اولین اسلاید
  updateSlide();
});
