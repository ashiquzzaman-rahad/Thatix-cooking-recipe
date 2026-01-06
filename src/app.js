function loadRecipes() {
  const recipesUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
  const recipesContainer = document.getElementById("recipe-container");

  const loaderElement = `<div class="loader m-auto"></div>`;
  recipesContainer.innerHTML = loaderElement;

  fetch(recipesUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data == null) {
        recipesContainer.innerHTML = "No Data Found!";
      } else {
        recipesContainer.innerHTML = "";

        const meals = data["meals"];
        meals.forEach((meal) => {
          let ins = meal["strInstructions"];
          let img = meal["strMealThumb"];
          let name = meal["strMeal"];
          let id = meal["idMeal"];

          let recipeCard = `<div id="${id}" class="w-62 shadow-2xl/30 rounded-md my-5 mx-5">
          <div>
            <img
              class="w-full h-35 object-cover rounded-t-md"
              src="${img}"
              alt="${name}"
            />
          </div>
          <h3 class="font-semibold mx-5 my-3 ">${name}</h3>
          <p class="mx-5 my-3 text-[0.7rem]">
            ${ins.slice(0, 100)}
          </p>
          <div class="flex flex-row-reverse mx-5 my-3">
            <div
              class="p-2 my-2 w-30 text-center text-[0.7rem] text-white rounded-md bg-orange-400 cursor-pointer hover:bg-orange-500 select-none" onclick="viewDetails(${id})"
            >
              View Details
            </div>
          </div>
        </div>`;

          recipesContainer.innerHTML += recipeCard;
        });
      }
    });
}

loadRecipes();

function viewDetails(id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data != null) {
        const meal = data["meals"][0];
        // console.log(meal);

        let ins = meal["strInstructions"];
        let img = meal["strMealThumb"];
        let name = meal["strMeal"];

        const recipeDetails = `<!-- Recipe details section start -->
    <section id="recipe-details" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div id="recipe-details" class="w-70 md:w-[70vw] shadow-2xl/30 p-3 rounded-md bg-white">
      <div>
        <img src="${img}" 
        class="w-full h-20 md:h-50 object-cover rounded-t-md"
        alt="recipe">
      </div>
      <h2 class="text-xl font-bold my-3">${name}</h2>
      <p class="text-[0.7rem] md:text-[0.8rem] h-50 overflow-y-scroll">
        ${ins}
      </p>
      <div class="flex flex-row-reverse ">
        <p class="p-2 w-30 text-center text-[0.7rem] text-white rounded-md bg-orange-400 cursor-pointer my-3 hover:bg-orange-500 select-none" onclick="closeDetails()">
          Close
        </p>
      </div>
      </div>
    </section>
    <!-- Recipe details section end -->`;

        const body = document.querySelector("body");
        body.innerHTML += recipeDetails;
      }
    });
}

//   const recipeDetails = `<!-- Recipe details section start -->
//     <section id="recipe-details" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       <div id="recipe-details" class="w-70 md:w-[70vw] shadow-2xl/30 p-3 rounded-md bg-white">
//       <div>
//         <img src="../images/card.jpg"
//         class="w-full h-20 md:h-50 object-cover rounded-t-md"
//         alt="recipe">
//       </div>
//       <h2 class="text-xl font-bold my-3">Migas</h2>
//       <p class="text-[0.7rem] md:text-[0.8rem] h-50 overflow-y-scroll">
//         For the caramel place 100 grams of sugar in a frying pan without any fat and melt on medium heat. Try not to stir with a spoon, but swirl the pan itself. Let melt until you have an amber color and sugar is fully melted. Fill the bottom of four flan containers with it. Caramel will harden immediately, so you need to be fast. My containers yield about 120 milliliters each.\r\n\r\n2\r\nPreheat oven to 150 degrees Celsius and look for a casserole or container all your four flan containers fit into.\r\n\r\n3\r\nHeat milk with 45 grams of sugar and the cut and scraped out vanilla pod. The milk does not need to boil, just needs to be heated. Take out vanilla pod after a few minutes. Meanwhile stir the egg yolks and eggs gently, try not to incorporate any air in it. Them pour milk-mix into egg-mix and again only stir very gently. Pour into prepared flan containers and place these into your casserole or container. Boil water and pour the water into the large casserole. Be sure not to touch the flan mixture. Place on middle rack in the oven and let bake for about 35-40 minutes. An inserted toothpick should come out clean.\r\n\r\n4\r\nLet cool inside the container for an hour before transferring to the fridge. Chill overnight. The next day gently release the rim and then turn upside down on a plate. Serve with some dulce de leche on the side.
//       </p>
//       <div class="flex flex-row-reverse ">
//         <p class="p-2 w-30 text-center text-[0.7rem] text-white rounded-md bg-orange-400 cursor-pointer my-3 hover:bg-orange-500" onclick="closeDetails()">
//           Close
//         </p>
//       </div>
//       </div>
//     </section>
//     <!-- Recipe details section end -->`;

//   const body = document.querySelector("body");
//   body.innerHTML += recipeDetails;
// }

function closeDetails() {
  const recipeDetails = document.getElementById("recipe-details");
  recipeDetails.remove();
}

function searchFood() {
  const recipesContainer = document.getElementById("recipe-container");
  const loaderElement = `<div class="loader m-auto"></div>`;
  recipesContainer.innerHTML = loaderElement;

  const input = document.querySelector("#foodSearch");
  const foodName = input.value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;

  if (foodName == null) {
    loadRecipes();
    return;
  } else {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals == null) {
          recipesContainer.innerHTML = "No Data Found!";
        } else {
          recipesContainer.innerHTML = "";

          const meals = data["meals"];
          meals.forEach((meal) => {
            let ins = meal["strInstructions"];
            let img = meal["strMealThumb"];
            let name = meal["strMeal"];
            let id = meal["idMeal"];

            let recipeCard = `<div id="${id}" class="w-62 shadow-2xl/30 rounded-md my-5 mx-5">
          <div>
            <img
              class="w-full h-35 object-cover rounded-t-md"
              src="${img}"
              alt="${name}"
            />
          </div>
          <h3 class="font-semibold mx-5 my-3">${name}</h3>
          <p class="mx-5 my-3 text-[0.7rem]">
            ${ins.slice(0, 100)}
          </p>
          <div class="flex flex-row-reverse mx-5 my-3">
            <div
              class="p-2 my-2 w-30 text-center text-[0.7rem] text-white rounded-md bg-orange-400 cursor-pointer hover:bg-orange-500 select-none" onclick="viewDetails(${id})"
            >
              View Details
            </div>
          </div>
        </div>`;

            recipesContainer.innerHTML += recipeCard;
          });
        }
      });
  }
}
