const gallery = document.getElementById("product-gallery");

const platformFilter = document.getElementById("platform-filter");
const priceFilter = document.getElementById("price-filter");
const priceValue = document.getElementById("price-value");
const sellerFilter = document.getElementById("seller-filter");
const searchInput = document.getElementById("search-input");

function renderGames(gamesArray, gallery) {
  gallery.innerHTML = "";
  games.sort((a, b) => b.stars - a.stars);

  gamesArray.forEach((game) => {
    const card = document.createElement("article");
    card.classList.add("product-card");

    const priceText = game.isFree ? "Free" : `${game.price} €`;

    card.innerHTML = `
      <img src="${game.image}" alt="${game.name}">
      <div class="stars-bar">
        <div class="stars-fill" style="width: ${(game.stars / 5) * 100}%"></div>
      </div>
      <h3>${game.name}</h3>
      <p class="price">${priceText}</p>
      <p class="seller">${game.seller}</p>
      `;

    gallery.appendChild(card);
  });
}

renderGames(games, gallery);

function applyFilters() {
  const search = searchInput.value.toLowerCase();
  const maxPrice = parseFloat(priceFilter.value);
  const selectedPlatform = platformFilter.value.toLowerCase();
  const selectedSeller = sellerFilter.value.toLowerCase();

  const filteredGames = games.filter((game) => {
    const name = game.name.toLowerCase();
    const seller = game.seller.toLowerCase();
    const platform = game.platform.toLowerCase();
    const price = game.price;

    const matchesSearch =
      name.includes(search) ||
      seller.includes(search) ||
      platform.includes(search) ||
      price.toString().includes(search);

    const matchesPrice = price <= maxPrice;

    const matchesPlatform =
      selectedPlatform === "all" || platform.includes(selectedPlatform);

    const matchesSeller = selectedSeller === "all" || seller === selectedSeller;

    return matchesSearch && matchesPrice && matchesPlatform && matchesSeller;
  });

  renderGames(filteredGames, gallery);
}

searchInput.addEventListener("input", applyFilters);
platformFilter.addEventListener("change", applyFilters);
sellerFilter.addEventListener("change", applyFilters);
priceFilter.addEventListener("input", () => {
  priceValue.textContent = priceFilter.value + "€";
  applyFilters();
});
