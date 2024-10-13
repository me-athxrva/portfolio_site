var cursor = document.querySelector('.cursor');
var a = document.querySelectorAll('a');
var img = document.querySelector('.cursor img');

function set_cursor_atr(name,src){
    for(let i = 0;  i<name.length; i++){
        name[i].setAttribute("onmouseenter",src);
        name[i].setAttribute("onmouseleave","remove_img()");
    }
}

set_cursor_atr(a,"set_img('static/assets/icon.gif')")

window.addEventListener("mousemove", function(e){

    const posX = e.clientX;
    const posY = e.clientY;
    cursor.animate({
        left: `${posX}px`,
        top: `${posY}px`},
        {duration: 1000, fill: "forwards"});
});

function set_img(source){
    img.src = source;
    setTimeout(() => {
        img.animate({
            opacity: 1},
            {duration: 300, fill: "forwards"});
    }, 100);
    cursor.animate({
        height: '50px',
        width: '50px'},
        {duration: 200, fill: "forwards"});
};

function remove_img(){
    console.log("event recorded");
    img.src = "";
    setTimeout(() => {
        img.animate({
            opacity: 0},
            {duration: 300, fill: "forwards"});
    }, 100);
    cursor.animate({
        height: '20px',
        width: '20px'},
        {duration: 200, fill: "forwards"});
};