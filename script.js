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
      return `
            <div class="card-box" style="animation-delay: ${index * 0.1}s">
                <img src="${card.img}" alt="${card.title}" />
                <div class='card-box--box'>
                    <p class="card-box--type" data-type="${card.type}">${
        card.type
      }</p>
                    <p class="card-box--title">${card.title}</p>
                    <p class="card-box--name">
                        <b class="card-box--sell">${card.sell}</b> | by ${
        card.name
      }
                    </p>
                </div>
            </div>
        `;
    })
    .join("");
};

const applyFilters = () => {
  let result = [...cards];

  if (currentFilter !== "all") {
    result = result.filter((card) => card.type === currentFilter);
  }

  if (currentSearch.trim()) {
    const term = currentSearch.toLowerCase().trim();
    result = result.filter(
      (card) =>
        card.title.toLowerCase().includes(term) ||
        card.name.toLowerCase().includes(term) ||
        card.type.toLowerCase().includes(term)
    );
  }

  renderCard(result);
};

document.addEventListener("DOMContentLoaded", () => {
  applyFilters();

  document.querySelectorAll(".nav-box--button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".nav-box--button").forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      currentFilter = button.dataset.filter;

      applyFilters();
    });
  });

  const searchInput = document.querySelector(".nav-search");
  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    applyFilters();
  });

  const addClearButton = () => {
    const clearButton = document.createElement("button");
    clearButton.className = "nav-box--button";
    clearButton.textContent = "Clear Filters";
    clearButton.addEventListener("click", () => {
      currentFilter = "all";
      currentSearch = "";

      document.querySelectorAll(".nav-box--button").forEach((btn) => {
        btn.classList.remove("active");
      });
      document.querySelector('[data-filter="all"]').classList.add("active");
      searchInput.value = "";
      applyFilters();
    });

    document.querySelector(".nav-box").appendChild(clearButton);
  };
});
