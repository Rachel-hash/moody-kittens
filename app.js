/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
var kittens = [];
getStarted();
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function doesKittenExist(name) {
  loadKittens()
  for (let i = 0; i < kittens.length; i++) {
    var name1 = kittens[i].name;
    if (name === name1) {
      return true
    };

  }
  return false
};
function addKitten(event) {
  var tempKitten = {
    name: "",
    mood: "content",
    affection: 3,
    id: generateId()
  };
  tempKitten.name = document.getElementById('kittenName').value;
  var check = doesKittenExist(tempKitten.name);
  if (check === true) {
    alert("Cat exists");
    return
  }

  kittens.push(tempKitten);
  saveKittens();
  console.log(kittens);

  // step 1. create a kitten object 
  // step 2. add to the kittens array
  // step 3. call save kittens function
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  localStorage.setItem("kittens", JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  var tempKittens = JSON.parse(localStorage.getItem("kittens"));
  if (!tempKittens) {
    return;
  }
  else {
    kittens = tempKittens
  };
}

/**
 * Draw all of the kittens to the kittens element
 */
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function drawKittens() {
  var kittensContainer = document.getElementById("kittens");
  if (!!kittensContainer) {
    removeAllChildNodes(kittensContainer);
  }

  // step 1: define kitten template
  // step 2: get kittens array
  // step 3: draw the kittens to the page
  loadKittens();
  if (!kittens) {
    return false
  };
  var i;
  for (i = 0; i < kittens.length; i++) {

    var cat = kittens[i]
    setKittenMood(kittens[i]);
    var name = kittens[i].name;
    var mood = kittens[i].mood;
    var affection = kittens[i].affection;
    var id = kittens[i].id;
    let template =
      `<div class="kitten-card">
  <div class="kittens-container kitten `+ mood + `">
    <img src="https://robohash.org/`+ name + `?set=set4"></div>
    <ul style="list-style-type:none;">
      <li>name : `+ name + `</li>
      <li>mood : `+ mood + `</li>
      <li>affection : `+ affection + `</li>
      <li>
        <button class="button" onClick="pet('`+ id + `')"> pet </button>
        <button class="button" onClick="catnip('`+ id + `')"> catnip </button>
      </li>
    </ul>
    </div>`;
    document.getElementById("kittens").innerHTML += template;
  }

}
function clearKittens() {
  localStorage.clear();
  kittens = [];
  drawKittens();
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  loadKittens();
  var selectKitten = findKittenById(id);
  var randomNumber = getRandomInt();
  if (randomNumber > .7) {
    selectKitten.affection++;
  }
  else {
    selectKitten.affection--;
  }
  saveKittens();
  drawKittens();
}

function getRandomInt() {
  return Math.random();
}


/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  loadKittens();
  var selectKitten = findKittenById(id);
  selectKitten.mood = "tolerant";
  selectKitten.affection = 5;
  saveKittens();
  drawKittens();
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  if (kitten.affection > 6) {
    kitten.mood = "happy";
  }
  if (kitten.affection <= 5) {
    kitten.mood = "tolerant";
  }
  if (kitten.affection <= 3) {
    kitten.mood = "angry";
  }
  if (kitten.affection <= 0) {
    kitten.mood = "gone";
  }
}

function getStarted() {
  loadKittens();
  if (!kittens || kittens.length === 0) {
    return;
  }
  var welcome = document.getElementById("welcome");
  if (!!welcome) {
    welcome.remove();
  }
  drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
