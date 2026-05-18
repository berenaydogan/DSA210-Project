const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const imageDialog = document.querySelector(".image-dialog");
const dialogImage = imageDialog?.querySelector("img");
const dialogCaption = imageDialog?.querySelector("p");
const dialogClose = imageDialog?.querySelector(".dialog-close");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if ("IntersectionObserver" in window && sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${visible.target.id}`;
        link.classList.toggle("active", isActive);
      });
    },
    {
      rootMargin: "-25% 0px -55% 0px",
      threshold: [0.1, 0.3, 0.6],
    },
  );

  sections.forEach((section) => observer.observe(section));
}

document.querySelectorAll(".figure-card img").forEach((image) => {
  image.addEventListener("click", () => {
    if (!imageDialog || !dialogImage || !dialogCaption || typeof imageDialog.showModal !== "function") {
      return;
    }

    const figure = image.closest("figure");
    dialogImage.src = image.currentSrc || image.src;
    dialogImage.alt = image.alt;
    dialogCaption.textContent = figure?.querySelector("figcaption")?.textContent || "";
    imageDialog.showModal();
  });
});

dialogClose?.addEventListener("click", () => {
  imageDialog?.close();
});

imageDialog?.addEventListener("click", (event) => {
  if (event.target === imageDialog) {
    imageDialog.close();
  }
});
