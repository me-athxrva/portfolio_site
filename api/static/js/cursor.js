var cursor = document.querySelector('.cursor');

window.addEventListener("mousemove", function(e){

    const posX = e.clientX;
    const posY = e.clientY;
    console.log(posX,posY);
    cursor.animate({
        left: `${posX}px`,
        top: `${posY}px`},
        {duration: 500, fill: "forwards"});
});