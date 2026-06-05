// 1. Target elements using only getElementById and assign the submit handler
const formTag = document.getElementById("queryForm");
formTag.onsubmit = handleSubmit;

const cap1 = document.getElementById("cap1");
const cap2 = document.getElementById("cap2");
const cap3 = document.getElementById("cap3");

// 2. Define the main execution handler
async function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const outputTag = document.getElementById("category");

  // Update the UI directly with a simple loading symbol
  outputTag.innerText = "⏳";

  // Use fetch() to request data from the API endpoint
  const response = await fetch("https://emojihub.yurace.pro/api/categories");

  if (response.ok) {
    // Parse the raw incoming response into a readable JavaScript array
    const categoriesArray = await response.json();

    // Read exactly what text the user typed into the input boxes right now
    const userSmileyText = form.elements["smileys-and-people"].value;
    const userFoodText = form.elements["food-and-drink"].value;

    // Create a constant array to collect our final output items
    const textItemsList = [];

    // Loop through the categories instead of mapping them
    for (const category of categoriesArray) {
      if (category.name === "smileys-and-people") {
        if (userSmileyText === "Smile" || userSmileyText === "smile") {
          textItemsList.push("😀");
        } else if (userSmileyText !== "") {
          textItemsList.push(userSmileyText);
        } else {
          textItemsList.push("😀");
        }
      }

      if (category.name === "food-and-drink") {
        if (userFoodText === "Apple" || userFoodText === "apple") {
          textItemsList.push("🍏");
        } else if (userFoodText !== "") {
          textItemsList.push(userFoodText);
        } else {
          textItemsList.push("🍏");
        }
      }
    }

    const totalItems = textItemsList.length;
    let finalOutputText = "";

    if (totalItems === 1) {
      // If there's only one item, just use it directly
      finalOutputText = textItemsList[0];
    } else if (totalItems === 2) {
      // If there are exactly two items, combine them manually with "and"
      finalOutputText = textItemsList[0] + " and " + textItemsList[1];
    } else if (totalItems > 2) {
      // For three or more items, separate them with commas and add the final "and"
      finalOutputText =
        textItemsList[0] +
        ", " +
        textItemsList[1] +
        ", and " +
        textItemsList[2];
    }

    // Display that text string variable directly inside our HTML output tag
    outputTag.innerText = finalOutputText;
  } else {
    // This block runs if response.ok is false
    outputTag.innerText = "❌";
  }
}
