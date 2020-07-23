const paralax = {
  img: document.querySelector('.paralax'),
  container: document.body,
  init: () => {
    if (paralax.img) {
      // Mouse
      const mouse = {
        xx: 0,
        yy: 0,
        x: 0,
        y: 0,
        updatePosition: function (event) {
          const e = event || window.event;
          this.x = e.clientX - this.xx;
          this.y = (e.clientY - this.yy) * -1;
        },
        setOrigin: function (e) {
          this.xx = e.offsetLeft + Math.floor(e.offsetWidth / 2);
          this.yy = e.offsetTop + Math.floor(e.offsetHeight / 2);
        },
        show: function () {
          return `(${this.x}, ${this.y})`;
        },
      };

      // Track the mouse position relative to the center of the paralax.container.
      mouse.setOrigin(paralax.container);

      //-----------------------------------------

      //-----------------------------------------
      const updateTransformStyle = function (x, y) {
        const style = `rotateX(${x}deg) rotateY(${y}deg)`;
        paralax.img.style.transform = style;
        paralax.img.style.webkitTransform = style;
        paralax.img.style.mozTransform = style;
        paralax.img.style.msTransform = style;
        paralax.img.style.oTransform = style;
      };

      const update = function (event) {
        mouse.updatePosition(event);
        updateTransformStyle(
          (mouse.y / paralax.img.offsetHeight).toFixed(2),
          (mouse.x / paralax.img.offsetWidth).toFixed(2),
        );
      };

      const onMouseEnterHandler = function (event) {
        update(event);
      };

      const onMouseLeaveHandler = function () {
        paralax.img.style = '';
      };

      const onMouseMoveHandler = function (event) {
        update(event);
      };

      //-----------------------------------------

      paralax.container.onmouseenter = onMouseEnterHandler;
      paralax.container.onmouseleave = onMouseLeaveHandler;
      paralax.container.onmousemove = onMouseMoveHandler;
    }
  },
};

export default paralax;
