const API = "https://www.thecocktaildb.com/api/json/v1/1/";
const GET_ALL_COCKTAILS = API + `filter.php?c=Cocktail`;
const GET_BY_NAME = API + `search.php?s=`;
const GET_BY_FILTER = API + `filter.php?a=`;
const GET_DETAIL = API + `lookup.php?i=`;
const GET_INGREDIENT = API + `search.php?i=`;
const GET_RANDOM = API + `random.php`;

const form = document.querySelector("form");
const input = document.querySelector("#inp");
const filter = document.querySelector("#filter");
const output = document.querySelector("#output");
const popup = document.querySelector("#popup");
const random = document.querySelector("#random");

const getAllCocktails = async () => {
  const req = await fetch(GET_ALL_COCKTAILS);
  const res = await req.json();
  renderCocktails(res.drinks);
};

const getByName = async () => {
  const req = await fetch(GET_BY_NAME + input.value);
  const res = await req.json();
  // console.log(res);

  renderCocktails(res.drinks);
};

const getByFilter = async () => {
  const req = await fetch(GET_BY_FILTER + filter.value);
  const res = await req.json();
  // console.log(res.drinks);
  renderCocktails(res.drinks);

  // renderCocktails(res.drinks);
};

const getDetail = async (id) => {
  const req = await fetch(GET_DETAIL + id);
  const res = await req.json();
  renderDetail(res.drinks[0]);
};

const getIngredient = async (name) => {
  const req = await fetch(GET_INGREDIENT + name);
  const res = await req.json();
  console.log(res.ingredients[0]);
  renderIngridient(res.ingredients[0]);
};

const getRandom = async () => {
  const req = await fetch(GET_RANDOM);
  const res = await req.json();
  renderCocktails(res.drinks);
};

filter.addEventListener("change", (e) => {
  if (e.target.value == "All") {
    getAllCocktails();
  } else {
    getByFilter();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim().length) {
    getByName();
  }
});

const renderCocktails = (data) => {
  output.innerHTML = ``;
  data.forEach((el) => {
    // console.log(el);
    const card = document.createElement("div");
    card.classList.add("card");
    const img = document.createElement("img");
    const name = document.createElement("h2");
    name.title = el.strDrink;
    const btnMore = document.createElement("button");
    img.src = el.strDrinkThumb;

    name.textContent = el.strDrink;
    btnMore.textContent = "More details ...";

    btnMore.addEventListener("click", () => {
      getDetail(el.idDrink);
    });

    card.append(img, name, btnMore);
    output.append(card);
  });
};

const renderDetail = (cocktail) => {
  output.innerHTML = ``;
  console.log(cocktail);
  const card = document.createElement("div");
  card.classList.add("cardD");
  const img = document.createElement("img");
  const name = document.createElement("h1");
  const ul = document.createElement("ul");

  name.textContent = cocktail.strDrink;
  img.src = cocktail.strDrinkThumb;

  for (let key in cocktail) {
    // console.log(cocktail[key]);
    if (key.includes("strIngredient") && cocktail[key] !== null) {
      const li = document.createElement("li");
      li.textContent = cocktail[key];
      li.style.cursor = "pointer";

      li.addEventListener("click", () => {
        getIngredient(cocktail[key]);
      });
      ul.append(li);
    }
  }

  card.append(img, name, ul);
  output.append(card);
};

const renderIngridient = (ingredient) => {
  popup.style.display = "flex";
  popup.innerHTML = `
  <h2>${ingredient.strIngredient}</h2>
  <p>${ingredient.strDescription}</p>
  `;
};

popup.addEventListener("click", () => {
  popup.style.display = "none";
});

random.addEventListener("click", () => {
  getRandom();
});

output.onload = getAllCocktails();
