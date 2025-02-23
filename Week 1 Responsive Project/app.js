window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offset = 70;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});

async function fetchCharacters() {
  try {
    const response = await fetch("http://localhost:3000/characters");
    const characters = await response.json();

    const container = document.querySelector("#characters .card-container");

    const cardsHTML = characters.map(character => `
      <div class="card-item">
        <img src="${character.image}" alt="${character.name}" />
        <h3>${character.name}</h3>
        <p>${character.role}</p>
      </div>
    `).join("");

    container.innerHTML = cardsHTML;

  } catch (error) {
    console.error("Veri çekme hatası (Karakterler):", error);
  }
}

async function fetchEpisodes() {
  try {
    const response = await fetch("http://localhost:3000/episodes");
    const episodes = await response.json();

    const container = document.querySelector("#episodes .card-container");

    const cardsHTML = episodes.map(episode => `
      <div class="card-item">
        <img src="${episode.image}" alt="${episode.title}" />
        <h3>${episode.title}</h3>
        <p>${episode.description}</p>
      </div>
    `).join("");

    container.innerHTML = cardsHTML;

  } catch (error) {
    console.error("Veri çekme hatası (Bölümler):", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchCharacters();
  fetchEpisodes();
});