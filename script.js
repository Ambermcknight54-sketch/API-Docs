console.log("Hi World!");
getName("Kim");

async function getName(customName) {
  try {
    const data = { name: customName };
    const dataString = new URLSearchParams(data).toString();
    const response = await fetch("https://api.generize.io?" + dataString);
    const result = await response.json();

    const percent = result.probability * 100;
    const gender = result.gender;

    const outputTag = document.querySelector("output");
    if (outputTag) {
      outputTag.innerText = customName + " is " + percent + "% " + gender + ".";
    } else {
      console.error("Could not find an <output> element on the page.");
    }
  } catch (error) {
    console.error("Something went wrong with the fetch request:", error);
  }
}
