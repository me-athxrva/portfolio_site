var cursor = document.querySelector('.cursor');
var nav_a = document.querySelectorAll('.nav_li a');
var socials_a = document.querySelectorAll('.socials a');
var a = document.querySelectorAll('a');
var footer = document.querySelectorAll('footer');
var img = document.querySelector('.cursor img');
var clickme = document.querySelector('.cursor p');

function set_cursor_atr(name,src,on_leave){
    // let src_2 = String.toString(src);
    for(let i=0;  i<name.length; i++){
        name[i].setAttribute("onmouseenter",src);
        name[i].setAttribute("onmouseleave",on_leave);
    }
}

set_cursor_atr(a,"set_img('','contract')","remove_img('black')");
set_cursor_atr(nav_a,"set_img('','contract')","remove_img('black')");
set_cursor_atr(footer, "set_img('','color_change')","rev_color('black')");
set_cursor_atr(socials_a, "set_img('','contract')","remove_img('white')");


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
        setTimeout(() => {
            clickme.animate({
                opacity: 1,
                color: 'white'},
                {duration: 100, fill: "forwards"})
        }, 200);
    }, 100);
    if (type=='contract') {
        cursor.animate({
            height: '0px',
            width: '0px'},
            {duration: 200, fill: "forwards"});
    } else if (type=='color_change') {
        cursor.animate({
            backgroundColor: 'white'},
            {duration: 200, fill: "forwards"});
    };
};

function rev_color(clr){
    cursor.animate({
        backgroundColor: clr},
        {duration: 200, fill: "forwards", delay: 100});
}

function remove_img(clr){
    console.log("event recorded");
    img.src = "";
    setTimeout(() => {
        img.animate({
            opacity: 0},
            {duration: 300, fill: "forwards"});
    }, 100);
    if (clr=='white') {
        cursor.animate({
            backgroundColor: "white",
            height: '20px',
            width: '20px'},
            {duration: 200, fill: "forwards", delay: 100});
    } else if(clr=='black'){
        cursor.animate({
            backgroundColor: "black",
            height: '20px',
            width: '20px'},
            {duration: 200, fill: "forwards", delay: 100});
    }
    clickme.animate({
        opacity: 0,
        color: 'red'},
        {duration: 200, fill: "forwards"});
};