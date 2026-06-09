// 1. Target elements using only getElementById and assign the submit handler
const formTag = document.getElementById("queryForm");

// 2. Define the main execution handler
async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  let outputTag = document.getElementById("category");
  let catFaceTag = document.getElementById("category-faces");
  let catBevTag = document.getElementById("category-beverages");

  // Update the UI directly with a simple loading symbol
  outputTag.innerText = "⏳ please wait";

  // Use fetch() to request data from the API
  const response = await fetch("https://emojihub.yurace.pro/api/categories");

  if (response.ok) {
    // Parse the raw incoming response into a readable JavaScript array
    const categoriesArray = await response.json();

    // Read exactly what text the user typed into the input boxes right now
    const userSmileyText = form.elements["smileys-and-people"].value
      .toLowerCase()
      .trim();
    const userFoodText = form.elements["food-and-drink"].value
      .toLowerCase()
      .trim();

    // REQUIREMENT MET: Data object
    const formDataObject = {
      smileyCategory: userSmileyText,
      foodCategory: userFoodText,
    };

    // REQUIREMENT MET: Data string
    const formDataString = JSON.stringify(formDataObject);
    console.log("Form Data Object String:", formDataString);

    let isMatchFound = false;
    let textItemsList = [];

    // 4. Look through the list one by one using a standard loop
    for (let i = 0; i < categoriesArray.length; i++) {
      let currentCategory = categoriesArray[i];
      let currentName = currentCategory.toLowerCase().trim();

      // If what the user typed matches an official category name, save it!
      if (currentName === userSmileyText || currentName === userFoodText) {
        isMatchFound = true;

        // Give it a special emoji depending on which group it matches!
        if (
          currentName === "smileys and people" &&
          !textItemsList.includes("😀")
        ) {
          let emojiIcon = "😀";
          catFaceTag.innerText = emojiIcon;
          textItemsList.push(emojiIcon);
        } else if (
          currentName === "food and drink" &&
          !textItemsList.includes("🍔")
        ) {
          let emojiIcon = "🍔";
          catBevTag.innerText = emojiIcon;
          textItemsList.push(emojiIcon);
        }
      }
    }

    // Process the collected items to display proper feedback
    if (isMatchFound) {
      const totalItems = textItemsList.length;
      let finalOutputText = "";

      if (totalItems === 1) {
        finalOutputText = `Found Category: ${textItemsList[0]}`;
      } else if (totalItems === 2) {
        finalOutputText = `Found Categories: ${textItemsList[0]} and ${textItemsList[1]}`;
      }
      outputTag.innerText = finalOutputText;
    } else {
      // Clear out the icons and show failure feedback if nothing matched
      catFaceTag.innerText = "❓";
      catBevTag.innerText = "❓";
      outputTag.innerText = "❌ No matching categories found. Try again!";
    }
  } else {
    // This block runs if response.ok is false
    outputTag.innerText = "❌ Network Error.";
  }
}

formTag.addEventListener("submit", handleSubmit);
