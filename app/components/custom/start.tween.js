(function () {

    if (TWEEN) animate();

    function animate (time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);

    }

}());