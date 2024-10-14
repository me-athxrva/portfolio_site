var cursor = document.querySelector('.cursor');
var nav_a = document.querySelectorAll('.nav_li a');
var a = document.querySelectorAll('a');
var img = document.querySelector('.cursor img');
var clickme = document.querySelector('.cursor p');

function set_cursor_atr(name,src){
    // let src_2 = String.toString(src);
    for(let i=0;  i<name.length; i++){
        name[i].setAttribute("onmouseenter",src);
        name[i].setAttribute("onmouseleave","remove_img()");
    }
}

set_cursor_atr(a,"set_img('','expand')");
set_cursor_atr(nav_a,"set_img('','contract')");


window.addEventListener("mousemove", function(e){

    const posX = e.clientX;
    const posY = e.clientY;
    cursor.animate({
        left: `${posX}px`,
        top: `${posY}px`},
        {duration: 1000, fill: "forwards"});
});

function set_img(source,type){
    img.src = source;
    setTimeout(() => {
        img.animate({
            opacity: 1},
            {duration: 300, fill: "forwards"});
        cursor.animate({
            backgroundColor: 'white'},
            {duration: 300, fill: "forwards"});
        clickme.animate({
            opacity: 1,
            color: 'black'},
        {duration: 300, fill: "forwards", delay: 200})
    }, 100);
    if (type=='expand') {
        cursor.animate({
            height: '60px',
            width: '60px'},
            {duration: 200, fill: "forwards"});
    } else if (type='contract') {
        cursor.animate({
            height: '0px',
            width: '0px'},
            {duration: 200, fill: "forwards"});
    }
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
        backgroundColor: "red",
        height: '20px',
        width: '20px'},
        {duration: 200, fill: "forwards", delay: 100});
    clickme.animate({
        opacity: 0,
        color: 'red'},
        {duration: 200, fill: "forwards"});
};