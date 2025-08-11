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

  const imageUrls = [];
  for (let i = 1; i <= 28; i++) {
    imageUrls.push(`assets/img/Image-Gallery/${i}.jpg`);
  }

  const slidesContainer = document.getElementById("slides");
  const dotsContainer = document.getElementById("dots");

  let currentIndex = 0;
  let totalSlides = 0;

  imageUrls.forEach((url, index) => {
    const img = new Image();
    img.src = url;
    img.onload = function () {
      const slide = document.createElement("div");
      slide.className =
        "slide " + (img.width > img.height ? "landscape" : "portrait");
      slide.innerHTML = `<img src="${url}" alt="Slide ${index + 1}">`;
      slidesContainer.appendChild(slide);

      const dot = document.createElement("span");
      dot.className = "dot" + (totalSlides === 0 ? " active" : "");
      dot.setAttribute("onclick", `goToSlide(${totalSlides})`);
      dotsContainer.appendChild(dot);

      totalSlides++;
    };
  });

  function updateSlide() {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    document.querySelectorAll(".dot").forEach((dot, i) => {
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
});
