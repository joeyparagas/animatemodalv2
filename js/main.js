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
    // containerImage[i].style.height = '255px';
  }

  // Click to Open Modal
  $('.img-items').on('click', '.img-item .img-trigger', function () {
    let gridImg = $(this).parent('.img-item').find('img'),
      gridImgSrc = gridImg.attr('src'),
      gridTitle = $(this).parent('.img-item').find('h2').text(),
      gridTxt = $(this).parent('.img-item').find('p').text(),
      windowW = $(window).width(),
      modalImgW = 0;

    // Find Modal Image width using Bootstrap measurements
    if (windowW >= 1200) {
      modalImgW = 380;
    } else if (windowW >= 992) {
      modalImgW = 320;
    } else if (windowW >= 768) {
      modalImgW = 380;
    } else if (windowW >= 576) {
      modalImgW = 380;
    } else {
      modalImgW = 380;
    }



    // Insert Modal Img and Data
    updateModal(gridImgSrc, gridTitle, gridTxt);
    let modalHW = updateModal(gridImgSrc, gridTitle, gridTxt);
    // Open Modal
    animateModal(gridImg, modalImgW, modalHW[1], 'open');

  })

  // Click Close (X) button or on modal-bg class 
  $('body').on('click', function (event) {
    console.log(event.target);
    if ($(event.target).is('.close-btn') || $(event.target).is('.modal-bg') || $(event.target).is('.modal-main')) {
      closeAnimate()
    }
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
  function animateModal(img, modalImgW, modalW, animationType) {
    let imgItem = img.parents('.img-item'),
      imgDiv = img.parent(),
      topImg = imgDiv.offset().top - $(window).scrollTop(),
      leftImg = imgDiv.offset().left,
      widthImg = imgDiv.width(),
      heightImg = imgDiv.height(),
      winWidth = $(window).width(),
      winHeight = $(window).height(),
      modalImgLeft = (winWidth - modalImgW) / 2,
      modalImgH = modalImgW * heightImg / widthImg,
      modalTop = (winHeight - modalImgH) / 2;

    console.log(topImg);
    console.log(leftImg);
    // console.log('\nmodal img H: ', modalImgH);
    // console.log('modal top ', modalTop);

    if (animationType == 'open') {
      openAnimate(imgItem);
    } else {
      closeAnimate()
    }
  }

  // Updates modal with img source, h2 title and summary text
  function updateModal(imgSrc, modalTitle, modalTxt) {
    $('.modal-img .container-img').css("background-image", "url(../" + imgSrc + ")");
    $('.modal-info h2').text(modalTitle);
    $('.modal-info p').text(modalTxt);
    let modalHeight = $('.modal-main').height(),
      modalWidth = $('.modal-main').width(),
      modalSize = [modalHeight, modalWidth];
    return modalSize
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

  function openAnimate(parentDiv) {
    parentDiv.addClass('empty-box');
    $('.modal-main').addClass('is-visible')
    $('.modal-bg').addClass('is-visible')
    console.log('open');
  }

  function closeAnimate(parentDiv) {
    $('.empty-box').removeClass('empty-box');
    $('.modal-main').removeClass('is-visible')
    $('.modal-bg').removeClass('is-visible')
  }



}); // End jQuery