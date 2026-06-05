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
  outputTag.innerText = "⏳";

  // Use fetch() to request data from the API endpoint
  const response = await fetch("https://emojihub.yurace.pro/api/categories");

  if (response.ok) {
    // Parse the raw incoming response into a readable JavaScript array
    const categoriesArray = await response.json();

    // Read exactly what text the user typed into the input boxes right now
    const userSmileyText = form.elements["smileys-and-people"].value;
    const userFoodText = form.elements["food-and-drink"].value;
    const textItemsList = categoriesArray.map(function (category) {
      if (category.name === "smileys-and-people") {
        if (userSmileyText === "Smile" || userSmileyText === "smile") {
          return "😀";
        } else if (userSmileyText !== "") {
          return userSmileyText;
        } else {
          return "😀";
        }
      }

      if (category.name === "food-and-drink") {
        if (userFoodText === "Apple" || userFoodText === "apple") {
          return "🍏";
        } else if (userFoodText !== "") {
          return userFoodText;
        } else {
          return "🍏";
        }
      }

      return ""; // Fallback for unmatched categories
    });

    // Combine our collected items into a single final string variable
    const finalOutputText = textItemsList.join("  ");

    // Display the final symbols directly inside our HTML output tag
    if (outputTag) {
      outputTag.innerText = finalOutputText;
    }
  } else {
    // This block runs if response.ok is false
    if (outputTag) {
      outputTag.innerText = "❌";
    }
  }
}
