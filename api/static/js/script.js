var loader = document.getElementById("preloader");
var html = document.getElementsByTagName("html")[0];
var nav_li = document.getElementsByClassName("nav_li")[0];
let body = document.getElementsByTagName("body")[0];

function preloader_func() {
  setTimeout(()=>{
    loader.style.animationName = "preloader";
    loader.style.animationDelay = "4.5s";
    loader.style.animationDuration = "1.2s";
    loader.style.animationTimingFunction ="ease-in-out";
    setTimeout(()=>{
      loader.style.display = "none";
      html.style.cursor = "default";
      html.style.overflow = 'visible';
      // add aos here
      setatr();
    }, 5700)    
  },3000)
}

function setatr(){
  let script = document.createElement("script");
  script.innerHTML = "AOS.init();";
  body.appendChild(script)

}

if (loader==null) { 
  html.style.overflow = "visible";
  setatr();
} else {
  html.style.cursor = "none";
  html.style.overflow = 'hidden';
  preloader_func();
}
