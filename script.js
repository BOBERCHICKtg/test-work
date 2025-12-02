const cards = [
  {
    type: "Marketing",
    title: "The Ultimate Google Ads Training Course",
    sell: "100$",
    name: "Jerome Bell",
    img: "img/image.jpg",
  },
  {
    type: "Management",
    title: "Prduct Management Fundamentals",
    sell: "$480",
    name: "Marvin McKinney",
    img: "img/image (1).jpg",
  },
  {
    type: "HR & Recruting",
    title: "HR  Management and Analytics",
    sell: "$200",
    name: "Leslie Alexander Li",
    img: "img/image (2).jpg",
  },
  {
    type: "Marketing",
    title: "Brand Management & PR Communications",
    sell: "$530",
    name: "Kristin Watson",
    img: "img/image (3).jpg",
  },
  {
    type: "Design",
    title: "Graphic Design Basic",
    sell: "$500",
    name: "Guy Hawkins",
    img: "img/image (4).jpg",
  },
  {
    type: "Management",
    title: "Business Development Management",
    sell: "$400",
    name: "Dianne Russell",
    img: "img/image (5).jpg",
  },
  {
    type: "Development",
    title: "Highload Software Architecture",
    sell: "$600",
    name: "Brooklyn Simmons",
    img: "img/image (6).jpg",
  },
  {
    type: "HR & Recruting",
    title: "Human Resources – Selection and Recruitment",
    sell: "$150",
    name: "Brooklyn Simmons",
    img: "img/image (7).jpg",
  },
  {
    type: "Design",
    title: "User Experience. Human-centered Design",
    sell: "$240",
    name: "Cody Fisher",
    img: "img/image (8).jpg",
  },
];

let currentFilter = "all";
let currentSearch = "";
let debounceTimer;

const countCardsByType = (cardsArray = cards) => {
  const counts = {
    all: cardsArray.length,
    Marketing: 0,
    Management: 0,
    "HR & Recruting": 0,
    Design: 0,
    Development: 0,
  };

  cardsArray.forEach((card) => {
    if (counts[card.type] !== undefined) {
      counts[card.type]++;
    }
  });

  return counts;
};

const searchCards = (searchTerm, filteredCards = cards) => {
  if (!searchTerm.trim()) {
    return filteredCards;
  }

  const term = searchTerm.toLowerCase().trim();
  return filteredCards.filter(
    (card) =>
      card.title.toLowerCase().includes(term) ||
      card.name.toLowerCase().includes(term) ||
      card.type.toLowerCase().includes(term) ||
      card.sell.toLowerCase().includes(term)
  );
};

const filterByType = (type, cardsArray = cards) => {
  if (type === "all") {
    return cardsArray;
  }
  return cardsArray.filter((card) => card.type === type);
};

const applyFilters = () => {
  let result = cards;

  result = filterByType(currentFilter, result);
  result = searchCards(currentSearch, result);

  return result;
};

const renderCard = (cardsToRender) => {
  const cardContainer = document.getElementById("card");

  if (cardsToRender.length === 0) {
    cardContainer.innerHTML = `
            <div class="no-results">
                <h3>No courses found</h3>
                <p>Try a different filter or search term</p>
            </div>
        `;
    return;
  }

  cardContainer.innerHTML = cardsToRender
    .map((card, index) => {
      const animationDelay = `animation-delay: ${index * 0.1}s`;

      return `
            <div class="card-box" style="${animationDelay}">
                <img src="${card.img}" alt="${card.title}" />
                <div class='card-box--box'>
                    <p class="card-box--type" data-type="${card.type}">${card.type}</p>
                    <p class="card-box--title">${card.title}</p>
                    <p class="card-box--name">
                        <b class="card-box--sell">${card.sell}</b> | by ${card.name}
                    </p>
                </div>
            </div>
        `;
    })
    .join("");

  updateFilterCounts(cardsToRender);
};

const updateFilterCounts = (filteredCards = applyFilters()) => {
  const counts = countCardsByType(filteredCards);

  const allCountElement = document.querySelector(
    ".filter-wrapper:first-child .filter-count"
  );
  if (allCountElement) allCountElement.textContent = counts.all;

  Object.keys(counts).forEach((type) => {
    if (type !== "all") {
      const countElement = document.querySelector(
        `.filter-count[data-filter="${type}"]`
      );
      if (countElement) countElement.textContent = counts[type];
    }
  });

  updateActiveButton();
};

const updateActiveButton = () => {
  document.querySelectorAll(".nav-box--button").forEach((button) => {
    if (button.dataset.filter === currentFilter) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
};

const debounceSearch = (callback, delay = 300) => {
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

const handleSearch = (searchTerm) => {
  currentSearch = searchTerm;
  const filteredCards = applyFilters();
  renderCard(filteredCards);
};

const handleFilterClick = (filterType) => {
  currentFilter = filterType;
  const filteredCards = applyFilters();
  renderCard(filteredCards);
};

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".nav-search");

  renderCard(applyFilters());

  document.querySelectorAll(".nav-box--button").forEach((button) => {
    button.addEventListener("click", () => {
      handleFilterClick(button.dataset.filter);
    });
  });

  const debouncedSearch = debounceSearch(handleSearch);

  searchInput.addEventListener("input", (e) => {
    debouncedSearch(e.target.value);
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSearch(e.target.value);
    }
  });

  searchInput.addEventListener("search", () => {
    if (searchInput.value === "") {
      handleSearch("");
    }
  });

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "/") {
      e.preventDefault();
      searchInput.focus();
    }
  });
});

const addNoResultsStyles = () => {
  if (!document.querySelector("#search-styles")) {
    const style = document.createElement("style");
    style.id = "search-styles";
    style.textContent = `
            .no-results {
                grid-column: 1 / -1;
                text-align: center;
                padding: 60px 20px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                margin: 20px auto;
                max-width: 600px;
                animation: fadeIn 0.5s ease;
            }
            
            .no-results h3 {
                font-size: 24px;
                color: #495057;
                margin-bottom: 12px;
                font-family: Lato;
                font-weight: 700;
            }
            
            .no-results p {
                font-size: 16px;
                color: #6c757d;
                font-family: Lato;
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .highlight {
                background-color: #FFF3CD;
                padding: 0 2px;
                border-radius: 2px;
                color: #856404;
            }
            
            .nav-search:not(:placeholder-shown) {
                border-color: var(--primary, rgba(255, 63, 58, 1));
                background-color: rgba(255, 63, 58, 0.05);
            }
            
            .card-box {
                animation: cardFadeIn 0.5s ease forwards;
                opacity: 0;
            }
            
            @keyframes cardFadeIn {
                to {
                    opacity: 1;
                }
            }
        `;
    document.head.appendChild(style);
  }
};

document.addEventListener("DOMContentLoaded", addNoResultsStyles);
