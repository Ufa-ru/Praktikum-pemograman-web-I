document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-button");
  const filterButtons = document.querySelectorAll(".filter .btn");
  const galleryItems = document.querySelectorAll(".gallery-item");
  function changeActiveNavLink() {
    let scrollPos = window.scrollY + 80;

    if (window.scrollY === 0) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#home") {
          link.classList.add("active");
        }
      });
      return;
    }

    let foundActiveSection = false;

    sections.forEach((section) => {
      const id = section.getAttribute("id");
      if (!id) return;

      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
        foundActiveSection = true;
      }
    });

    const isAtBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
    if (!foundActiveSection && isAtBottom) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });
      const contactLink = Array.from(navLinks).find(
        (link) => link.getAttribute("href") === "#contact"
      );
      if (contactLink) {
        contactLink.classList.add("active");
      }
    }
  };

  window.addEventListener("scroll", changeActiveNavLink);
  changeActiveNavLink();

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  const allButton = document.querySelector(".filter .btn[data-filter='all']");
  if (allButton) {
    allButton.classList.add("active");
  }
});
