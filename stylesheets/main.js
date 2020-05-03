let root = document.documentElement;

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


function openBurger() {
  const burger = document.querySelector("#nav-icon1");
  const logo = document.querySelector("#main-logo");
  const nav = document.querySelector("#navbar");
  burger.classList.toggle('open');
  logo.classList.toggle('hidden');
  nav.classList.toggle('reverse');
}

function removeHash() {
  history.pushState("", document.title, window.location.pathname + window.location.search);
  console.log(history);
  console.log(document.title);
  console.log(window.location.pathname);
  console.log(window.location.search);
}