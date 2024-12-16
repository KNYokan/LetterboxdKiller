const API_KEY = "dc66224e";
const searchInput = document.getElementById("research-bar");
const searchButton = document.getElementById("searchButton"); // Assurez-vous que ce bouton existe dans le HTML
const movieGallery = document.querySelector(".movie-gallery");
const movieDetails = document.getElementById("movieDetails");

async function searchMovies(query) {
  const cachedMovies = localStorage.getItem(`search-${query}`);
  if (cachedMovies) {
    console.log("Résultats récupérés depuis LocalStorage");
    displayMovies(JSON.parse(cachedMovies));
    return;
  }

  try {
    console.log("Recherche dans l'API...");
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
    );
    const data = await response.json();

    if (data.Response === "True") {
      let currentStorage = JSON.parse(localStorage.getItem("films")) || [];

      let newFilms = JSON.stringify(data.Search);

      currentStorage.push(newFilms);

      localStorage.setItem("films", JSON.stringify(currentStorage));

      displayMovies(data.Search);
    } else {
      movieGallery.innerHTML = `<p>Aucun film trouvé pour "${query}".</p>`;
    }
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
    movieGallery.innerHTML = `<p>Erreur lors de la recherche.</p>`;
  }
}

window.addEventListener("DOMContentLoaded", function () {
  const defaultQuery = "Spider-Man";
  const cachedMovies = localStorage.getItem(`search-${defaultQuery}`);

  if (cachedMovies) {
    console.log("Affichage des films par défaut depuis LocalStorage...");
    displayMovies(JSON.parse(cachedMovies));
  } else {
    console.log("Chargement des films par défaut depuis l'API...");
    searchMovies(defaultQuery);
  }
});

function displayMovies(movies) {
  movieGallery.innerHTML = "";

  movies.forEach((movie) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-item");

    const poster =
      movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/150x220?text=Pas+d'image";

    movieItem.innerHTML = `
      <a href="film.html?filmId=${movie.imdbID}">
        <img src="${poster}" alt="${movie.Title}">
        <p>${movie.Title}</p>
      </a>
    `;

    movieGallery.appendChild(movieItem);
  });
}

async function getMovieDetails(movieId) {
  const cachedDetails = localStorage.getItem(`movie-${movieId}`);
  if (cachedDetails) {
    console.log("Détails récupérés depuis LocalStorage");
    renderMovieDetails(JSON.parse(cachedDetails));
    return;
  }

  try {
    console.log("Recherche des détails dans l'API...");
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`
    );
    const data = await response.json();

    if (data.Response === "True") {
      localStorage.setItem(`movie-${movieId}`, JSON.stringify(data));
      renderMovieDetails(data);
    } else {
      movieDetails.innerHTML = `<p>Impossible de charger les détails du film.</p>`;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des détails :", error);
    movieDetails.innerHTML = `<p>Erreur lors de la récupération des détails.</p>`;
  }
}

function renderMovieDetails(data) {
  movieDetails.innerHTML = `
    <h2>${data.Title} (${data.Year})</h2>
    <img src="${data.Poster}" alt="${data.Title}">
    <p><b>Genre:</b> ${data.Genre}</p>
    <p><b>Acteurs:</b> ${data.Actors}</p>
    <p><b>Synopsis:</b> ${data.Plot}</p>
    <p><b>Note:</b> ${data.imdbRating}/10</p>
    <div class="stars">
      <span data-rating="1">★</span>
      <span data-rating="2">★</span>
      <span data-rating="3">★</span>
      <span data-rating="4">★</span>
      <span data-rating="5">★</span>
    </div>
  `;

  setupStarRating();
}

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    searchMovies(query);
    movieDetails.innerHTML = "";
  }
});

/* Connexion check */
document.addEventListener("DOMContentLoaded", () => {
  const profilePicture = document.querySelector(".profil-picture img"); // Corrigé le sélecteur

  const userProfileImage = "https://example.com/path/to/user-profile.jpg";

  profilePicture.src = userProfileImage || "images/default-profile.png"; // Assurez-vous que l'image existe
});

document.addEventListener("DOMContentLoaded", function () {
  function isUserLoggedIn() {
    return localStorage.getItem("userLoggedIn") === "true";
  }

  const profileLink = document.getElementById("profile-link"); // Assurez-vous que cet ID existe

  profileLink.addEventListener("click", function (event) {
    if (isUserLoggedIn()) {
      window.location.href = "login.html";
    } else {
      window.location.href = "user.html";
    }
  });
});

/* RECHERCHE */
function displayMovies(movies) {
  const movieGallery = document.querySelector(".movie-gallery");
  movieGallery.innerHTML = "";

  movies.forEach((movie) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-item");

    const poster =
      movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/150x220?text=Pas+d'image";
    movieItem.innerHTML = `
      <a href="film.html?filmId=${movie.imdbID}">
        <img src="${poster}" alt="${movie.Title}">
        <p>${movie.Title}</p>
      </a>
    `;
    movieGallery.appendChild(movieItem);
  });
}
