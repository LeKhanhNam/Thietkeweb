AOS.init({
  duration: 1000,
  once: true,
});

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery .item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    filterButtons.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");

    galleryItems.forEach((item) => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.style.display = "block";
        AOS.init();
      } else {
        item.style.display = "none";
      }
    });
  });
});