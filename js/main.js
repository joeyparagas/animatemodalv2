jQuery(document).ready(function ($) {
  //modalWidth = 950,     //modal width, change later for dynamic width
  let modalImgW = 380;          //modal img width, also change later

  // Load img into divs in grid
  // Using vanilla JS - THIS WORKS!!!
  let containerImage = document.querySelectorAll('.container-img');
  for (let i = 0; i < containerImage.length; i++) {
    let url = containerImage[i].childNodes[1].getAttribute('src');
    containerImage[i].style.backgroundImage = 'url(' + url + ')';
    containerImage[i].style.backgroundSize = 'cover';
    containerImage[i].style.backgroundPosition = 'center';
    containerImage[i].style.backgroundSize = 'cover';
  }

  // Click to Open Modal
  $('.img-items').on('click', '.img-item .img-trigger', function () {
    let gridImg = $(this).parent('.img-item').find('img'),
      gridImgSrc = gridImg.attr('src'),
      gridTitle = $(this).parent('.img-item').find('h2').text(),
      gridTxt = $(this).parent('.img-item').find('p').text(),
      windowW = $(window).width();
    // modalImgW = 0;

    // Find Modal Image width using Bootstrap measurements
    // if (windowW >= 1200) {
    //   modalImgW = 380;
    // } else if (windowW >= 992) {
    //   modalImgW = 320;
    // } else if (windowW >= 768) {
    //   modalImgW = 380;
    // } else if (windowW >= 576) {
    //   modalImgW = 380;
    // } else {
    //   modalImgW = 380;
    // }

    // Insert Modal Img and Data
    updateModal(gridImgSrc, gridTitle, gridTxt);
    // updateModal returns array [modalHeight, modalWidth, modalTop, modalLeft, modalImgW]
    let modalStats = updateModal(gridImgSrc, gridTitle, gridTxt);

    // Open Modal
    animateModal(gridImg, gridImgSrc, modalStats, 'open');
  })

  // Click on background to close modal
  $('body').on('click', function (event) {
    if ($(event.target).is('.modal-bg') || $(event.target).is('.modal-main') || $(event.target).is('.modal-main .row')) {
      closeAnimate()
    }
  });
  // Click Close (X) button to close modal
  $('.close-btn').on('click', function () {
    closeAnimate()
  });

  // Click on navigation arrow in Modal
  $('.modal-main').on('click', '.modal-nav a', function () {
    nextSlide($(this));
  });

  //check if user has pressed 'Esc'
  $(document).keyup(function (event) {
    if (event.which == '27') {
      closeAnimate()
      // closeQuickView(sliderFinalWidth, maxQuickWidth);
    }
  });

  // Measurements to grab to animate modal
  function animateModal(img, imgSrc, modalStats, animationType) {
    // Image Measurements
    let imgItem = img.parents('.img-item'),
      // imgSrc = imgItem.children('.container-img').children('img').attr('src'),
      imgDiv = img.parent(),
      topImg = imgDiv.offset().top,
      leftImg = imgDiv.offset().left,
      widthImg = imgDiv.width(),
      heightImg = imgDiv.height(),
      // Window Measurements
      winWidth = $(window).width(),
      winHeight = $(window).height();

    // create new div for animation
    $('main').append('<div class="img-animate"></div>');
    $('.img-animate').css({
      "top": topImg + 'px',
      "left": leftImg + 'px',
      "width": widthImg + 'px',
      "height": heightImg + 'px',
      "backgroundImage": "url(./" + imgSrc + ")",
      "backgroundSize": 'cover',
      "backgroundPosition": 'center',
      "backgroundSize": 'cover'
    })

    if (animationType == 'open') {
      openAnimate(imgItem, modalStats);
    } else {
      closeAnimate()
    }
  }

  // Updates modal with img source, h2 title and summary text
  function updateModal(imgSrc, modalTitle, modalTxt) {
    $('.modal-img .container-img').css("background-image", "url(./" + imgSrc + ")");
    $('.modal-info h2').text(modalTitle);
    $('.modal-info p').text(modalTxt);
    let modalHeight = $('.modal-main').height(),
      modalWidth = $('.modal-img').width() + $('.modal-info').width(),
      modalTop = $('.modal-main').offset().top,
      modalLeft = $('.modal-img').offset().left,
      modalImgW = $('.modal-img .container-img').width(),
      modalStats = [modalHeight, modalWidth, modalTop, modalLeft, modalImgW];
    return modalStats
  }

  // Updates modal when clicked next/prev in modal
  function updateModalEmptyBox(currentImgItem) {
    // grab new content from selected img grid
    let newImgSrc = currentImgItem.children('.container-img').children('img').attr('src'),
      newTitle = currentImgItem.children('.img-title').text(),
      newSummary = currentImgItem.children('.img-summary').text();

    // Update the modal with new content
    updateModal(newImgSrc, newTitle, newSummary);
  }

  function nextSlide(navi) {
    let imgItems = navi.parents('.modal-bg').siblings('main').find('.img-items'),
      emptyBox = navi.parents('.modal-bg').siblings('main').find('.empty-box').removeClass('empty-box');

    // Check which button is pressed in navigation
    if (navi.hasClass('modal-next')) {
      // Check to see if it's not last in list
      if (!emptyBox.is(':last-child')) {
        emptyBox.next().addClass('empty-box');
        let currentEmptyBox = emptyBox.next();
        updateModalEmptyBox(currentEmptyBox);
      } else {
        // runs when on last image in grid and goes to first image
        imgItems.children('div').eq(0).addClass('empty-box');
        let currentEmptyBox = imgItems.children('div').eq(0);
        updateModalEmptyBox(currentEmptyBox);
      }
    } else {
      //Check to see if it's first on list 
      if (!emptyBox.is(':first-child')) {
        emptyBox.prev().addClass('empty-box')
        let currentEmptyBox = emptyBox.prev();
        updateModalEmptyBox(currentEmptyBox);
      } else {
        imgItems.children('div').last().addClass('empty-box');
        let currentEmptyBox = imgItems.children('div').last();
        updateModalEmptyBox(currentEmptyBox);
      }
    }

  }

  function openAnimate(imgItem, modalStats) {
    // modalStats [modalHeight, modalWidth, modalTop, modalLeft, modalImgW]
    let modalH = modalStats[0],
      modalW = modalStats[1],
      modalTop = modalStats[2],
      modalLeft = modalStats[3],
      modalImgW = modalStats[4],
      modalTxtW = $('.modal-info').width() + 30,  // for padding
      imgCenter = ($(window).width() - modalImgW) / 2;

    // Create Div to animate
    $('main').append('<div class="txt-animate is-visible"></div>');
    $('.txt-animate').css({
      "top": modalTop + 'px',
      "left": (modalLeft + modalImgW) + 'px',
      "height": modalH + 'px',
      "backgroundColor": '#ffffff'
    })

    // Add shadow box over grid img
    imgItem.addClass('empty-box');

    // Show overlay img and animate bounce in
    $('.img-animate').addClass('is-visible')
      .velocity({
        top: modalTop,
        left: imgCenter,
        width: modalImgW,
        height: modalH
      }, 1000, [400, 20], function () {

        // Animate text bg
        $('.txt-animate').velocity({ width: modalTxtW }, 300, 'ease')

        // Animate img move left
        $('.img-animate')
          .velocity({
            left: modalLeft
          }, 300, 'ease', function () {
            $('.img-animate').removeClass('is-visible');
            $('.txt-animate').removeClass('is-visible');
            $('.modal-main').addClass('is-visible');
            // animate text
          });
      })

    // Temporarily disabled to intentionally hide modal
    // $('.modal-main').addClass('is-visible')
    // $('.modal-bg').addClass('is-visible')
    // $('.img-animate').css({
    //   "backgroundImage": "url(./" + imgSrc + ")",
    //   "backgroundSize": 'cover',
    //   "backgroundPosition": 'center',
    //   "backgroundSize": 'cover'
    // })
  }

  function closeAnimate(parentDiv) {
    $('.img-animate').remove();
    $('.txt-animate').remove();
    $('.empty-box').removeClass('empty-box');
    $('.modal-main').removeClass('is-visible')
    $('.modal-bg').removeClass('is-visible')
  }

}); // End jQuery