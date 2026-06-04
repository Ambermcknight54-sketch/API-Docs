1. HANDLES FORM SUBMISSION
// =========================================================================
const apiForm = document.getElementById("apiForm");

if (apiForm) {
  apiForm.addEventListener("submit", function (event) {
    // Stop the browser from refreshing the page automatically
    event.preventDefault(); 
    
    // Call our main function to deal with the API
    getEmojiCategory();
  });
}

// =========================================================================
// 2. ASYNC AND AWAIT / FETCH
// =========================================================================
async function getEmojiCategory() {
  const outputTag = document.getElementById("category");

  // Update the UI with a simple loading symbol
  if (outputTag) {
    outputTag.innerText = "⏳";
  }

  // Use fetch() to request data from the API endpoint
  const response = await fetch("https://emojihub.yurace.pro/api/categories");
  
  // If...else check for error handling (Alternative to try/catch)
  if (response.ok) {
    
    // =====================================================================
    // 3. PARSE
    // =====================================================================
    // Parse the raw incoming response into a readable JavaScript array
    const categoriesArray = await response.json();
    
    // Create an empty array to collect our final output emojis
    let textItemsList = [];

    // =====================================================================
    // 4. DATA OBJECT & FORM ELEMENTS VALUE CHECK
    // =====================================================================
    // Read exactly what text the user typed into the input boxes right now
    let userSmileyText = apiForm.elements["smileys-and-people"].value;
    let userFoodText = apiForm.elements["food-and-drink"].value;

    for (let category of categoriesArray) {
      
      // Match the exact attribute strings from your index.html
      if (category.name === "smileys-and-people") {
        
        // Convert the typed word into an emoji using a simple if check
        if (userSmileyText === "Smile" || userSmileyText === "smile") {
          textItemsList[textItemsList.length] = "😀";
        } else if (userSmileyText !== "") {
          // If they typed something else, display their raw text
          textItemsList[textItemsList.length] = userSmileyText;
        } else {
          // Default emoji if the box was left completely empty
          textItemsList[textItemsList.length] = "😀";
        }

      } else if (category.name === "food-and-drink") {
        
        // Convert the typed word into an emoji using a simple if check
        if (userFoodText === "Apple" || userFoodText === "apple") {
          textItemsList[textItemsList.length] = "🍏";
        } else if (userFoodText !== "") {
          // If they typed something else, display their raw text
          textItemsList[textItemsList.length] = userFoodText;
        } else {
          // Default emoji if the box was left completely empty
          textItemsList[textItemsList.length] = "🍏";
        }
      }
    }

    // =====================================================================
    // 5. SAVE THE RECEIVED DATA INTO VARIABLES & DISPLAY
    // =====================================================================
    // Combine our collected items into a single final string variable
    let finalOutputText = textItemsList.join("  ");

    // Display the final symbols directly inside our HTML output tag
    if (outputTag) {
      outputTag.innerText = finalOutputText;
    }

  } else {
    // This block runs if response.ok is false (Alternative to catch)
    if (outputTag) {
      outputTag.innerText = "❌";
    }
  }
}
    // =====================================================================
    // 5. SAVE THE RECEIVED DATA INTO VARIABLES & DISPLAY
    // =====================================================================
    // Combine the collected text words into a final data string variable
    let finalOutputText = textItemsList.join(" and ");

    // Display that text string variable directly inside our HTML output tag
    if (outputTag) {
      outputTag.innerText = finalOutputText;
    }

  } else {
    // This block runs if response.ok is false (Alternative to catch)
    if (outputTag) {
      outputTag.innerText = "Error: Could not grab categories.";
    }
  }
}