const BREED_LINK = "https://dog.ceo/api/breeds/list/all";
const RANDOM_URL = "https://dog.ceo/api/breeds/image/random/9";

async function fetchUrl(
  url = "https://dog.ceo/api/breeds/image/random/9",
  action = "render"
) {
  let ret = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.status);
      if (data.status === "success") {
        switch (action) {
          case "breadList":
            getBreedList(data.message);
            break;
          default:
            renderDogPhotos(data.message);
            break;
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * get a random list of dogs and populate list in html
 */
function renderDogPhotos(dogPhotos) {
  let index = 0;
  Array.from(document.querySelectorAll("img")).forEach((el) => {
    el.hidden = false;
    el.src = dogPhotos[index++];
    el.addEventListener("click", () => {
      document.getElementById("choosen").src = el.src;
    });
  });
}

/**
 * Fetch list of all breed to populate html list
 */
async function getBreedList(listOfBreeds) {
  let breedList = document.getElementById("breed-list");

  for (const [key, value] of Object.entries(listOfBreeds)) {
    if (key) {
      let option = document.createElement("option");
      option.value = key;
      option.textContent = key;
      breedList.appendChild(option);
    }
  }
}

function getByBreedName() {
  // get breed value

  let breedName = document.getElementById("breed");
  console.log(data);
  //  renderDogPhotos(data.message);
}

document
  .querySelector("#random")
  .addEventListener("click", () => fetchUrl(RANDOM_URL, "render"));

let breed = document.getElementById("searchByBreed");

breed.addEventListener("click", () => {
  let breedName = document.getElementById("breed");
  fetchUrl(`https://dog.ceo/api/breed/${breedName.value}/images`, "render");
});

/**
 * Load only once at start
 */
fetchUrl(BREED_LINK, "breadList");
fetchUrl(RANDOM_URL, "render");
