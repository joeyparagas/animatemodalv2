jQuery(document).ready(function ($) {

  // Size images to fit window
  imageSize();

  // Listen for window resize, then resize images
  window.addEventListener('resize', imageSize);

  // Resize images to fit the window
  function imageSize() {
    $('.container-img').find('img').each(function () {
      let frameW = $('.container-img').width(),
        frameH = $('.container-img').height(),
        imgW = $(this).width(),
        imgH = $(this).height();

      // Checks to see if img height is shorter than frame height
      if (frameH > imgH) {
        $(this).addClass('h100')
      }

      // Checks to see if img width is thinner than frame width
      if (frameW > imgW) {
        $(this).removeClass('h100')
      }
    })
  }

});
