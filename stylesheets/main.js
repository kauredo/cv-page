
function changeColor(color) {
  let root = document.documentElement;
  let main = document.querySelector("#main-color");
  let bg = document.querySelector("#background-color");;
  
  switch (color) {
    case 'main' :
      root.style.setProperty('--main-color', main.value);
      break;
    case 'bg' :
      root.style.setProperty('--background-color', bg.value);
      break;
    default:
      break;
  }
}