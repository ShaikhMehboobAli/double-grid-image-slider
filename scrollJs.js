console.clear();

/**
 * Only call a function after all selected images have loaded.  Images parameter can be anything
 * acceptable by jQuery().
 */
function imagesLoaded(images, fn) {
  var $imgs = $(images),
    i = 0,
    exec = () => {
      ++i >= $imgs.length && fn();
    };

  typeof fn == "function" &&
    $imgs.each(function (index, el) {
      if (this.complete) {
        exec();
      } else {
        this.addEventListener("load", exec);
        this.addEventListener("error", exec);
      }
    });
}

// Scrollbar
$(function () {
  let opts = {
    className: "os-custom",
    callbacks: {
      onInitialized: initDrag,
    },
  };

  $(".gallery-carousel").each(function (index, el) {
    var $this = $(this);
    imagesLoaded($this.find("img"), () => {
      $this.data("os", OverlayScrollbars(el, opts));
    });
  });
});

initDrag = function () {
  let $this = $(".gallery-carousel"),
    el = $this[0],
    isDown = false,
    mult = 3, // speed
    startX,
    scrollLeft;

  $this
    .on("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = $this.data("os").scroll().position.x;
    })
    .on("mouseleave mouseup", (e) => {
      isDown = false;
    })
    .on("mousemove", (e) => {
      if (isDown) {
        e.preventDefault();

        let x = e.pageX - el.offsetLeft,
          walk = (x - startX) * -mult;

        $this.data("os").scroll({ x: scrollLeft + walk + "px" }, 0);
      }
    });
};

// ----------------------------------

/**
 * apply this logic loop to implement the image dynamically
 */

let x = 0;
let img = [1, 2, 3, 4, 5, 6, 7, 8];
for (let a = x; a < img.length; a++) {
  console.log(img[a], img[a + 1], 2);
  a = a + 1;
}
