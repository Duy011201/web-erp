import $ from "jquery";

// lazy loading background images
$(document).ready(function () {
  $(".bg-lazy").each(function () {
    let $element = $(this);
    let bgSrc = $element.data("bg-src");
    if (bgSrc) {
      let img = new Image();
      img.src = bgSrc;
      $(img).on("load", function () {
        $element.css("background-image", "url('" + bgSrc + "')");
      });
    }
  });
});
