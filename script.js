console.log("Hi World!");

async function getName() {
  debugger;
  console.log ("aaaaaaaaa");
  const data= {name: "Pita"}; 
  const datastring= name URLSearchParams(data);
  const response= await fetch(" https://api.generize.io"); 
  const result= await response.json();
}
   getName();


console.log("Hi World!");

async function getName(customName) {
  debugger;
  console.log ("aaaaaaaaa");
  const data= {name: "customName"}; 
  const datastring= name URLSearchParams(data);
  const response= await fetch(" https://api.generize.io"+ "?"+ "datastring"); 
  const result= await response.json()
  debugger;
}
getName("Pita");




console.log("Hi World!");
getName("Peter"); 

async function getName(customName) {
  debugger;
  console.log ("aaaaaaaaa");
  const data= {name: "customName"}; 
  const dataString= name URLSearchParams(data);
  const response= await fetch(" https://api.generize.io" + "?"+ "datastring"); 
  const result= await response.json();
  debugger;
  document.querySelector("output");
}

