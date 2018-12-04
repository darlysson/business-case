(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

(function ($) {

  var transitionBox = document.getElementById('transition-box'),
      sections = document.getElementById('ux-sections'),
      header = document.getElementById('ux-header'),
      selectedBoxCoords = void 0,
      scrollOffset = void 0,
      firstLoad = true,
      hashHistory = '';

  $(document).ready(function () {

    checkHash();

    $(window).on('popstate', checkHash);

    $('.ux-box-menu-item').on('mousedown', function (e) {
      e.preventDefault();
    });

    $('.ux-box-menu-item').on('click', function (e) {
      e.preventDefault();
      var id = $(this).attr('href');
      openSection(id.replace('#', ''));
      window.history.pushState('', document.title, id);
    });
    $('.ux-close-btn').on('mousedown touchstart', function (e) {
      e.preventDefault();
      var id = $(this).attr('href');
      closeSection();
      window.history.pushState('', document.title, id);
    });
    $('.ux-next-btn').on('mousedown touchstart', function (e) {
      e.preventDefault();
      var id = $(this).attr('href');
      nextSection();
      window.history.pushState('', document.title, id);
    });

    initNextBtnScrollMagic();
  });

  function initNextBtnScrollMagic() {
    var magicController = new ScrollMagic.Controller(),
        $nextBtns = $('.ux-next-btn');
    $nextBtns.each(function (i) {
      new ScrollMagic.Scene({
        triggerElement: $nextBtns[i],
        triggerHook: 'onEnter'
      }).setClassToggle($nextBtns[i], 'section-end').addTo(magicController);
    });
  }

  function checkHash() {
    if (window.location.hash.length === 0) {
      if ($('.selected').length > 0) {
        hashHistory = '';
        closeSection();
      }
    } else {
      var hashId = window.location.hash.replace('#', '');
      if (hashId === '') {
        if ($('.selected').length > 0) {
          closeSection();
        }
      } else if (hashId !== hashHistory) {
        if ($('.selected').length < 1) {
          openSection(hashId);
        } else {
          gotoSection(hashId);
        }
      }
      hashHistory = hashId;
    }
  }

  function openSection(sectionId) {
    var $currentSection = $('#ux-sections').find('[data-section=' + sectionId + ']'),
        menuId = $currentSection.find('.ux-close-btn').attr('data-menu-id'),
        menuTarget = document.getElementById(menuId);
    $currentSection.addClass('selected');
    $('#transition-box').addClass('animate');
    setBoxCoordsAndScrollOffset(menuTarget);
    expandContent();
  }

  function closeSection() {
    window.scrollTo(0, 0);
    var menuId = $('.selected').find('.ux-close-btn').attr('data-menu-id');
    var menuTarget = document.getElementById(menuId);
    setBoxCoordsAndScrollOffset(menuTarget);
    contractContent();
  }

  function nextSection() {
    var nextSibling = $('.selected').next(),
        sectionId = nextSibling.attr('data-section');
    gotoSection(sectionId);
  }

  function gotoSection(sectionId) {
    $('.selected').removeClass('selected');
    var $newSection = $('#ux-sections').find('[data-section=' + sectionId + ']');
    $($newSection).addClass('selected');
    var tl3 = new TimelineMax();
    tl3.fromTo($newSection, 1, { alpha: 0 }, { alpha: 1 });
    window.scrollTo(0, 0);
    onContentReady();
  }

  function getNavOffset() {
    var mainnavshrunkclass = document.getElementsByClassName('ibm-sitenav-menu-sticky');
    // return (mainnavshrunkclass.length > 0) ? 51 : 102;
    return 51;
  }

  function expandContent() {
    var tl1 = new TimelineMax({ onComplete: onContentReady });
    tl1.set(transitionBox, { alpha: 0, y: selectedBoxCoords.top + scrollOffset, x: selectedBoxCoords.left, width: selectedBoxCoords.width, height: selectedBoxCoords.height }).to(transitionBox, .25, { alpha: 1 }).to(transitionBox, .3, { x: 0, width: '100%', ease: Circ.easeOut }).to(transitionBox, .35, { y: 0, height: '100%', ease: Circ.easeInOut }).call(onExpandComplete).addLabel('fade-content').to(header, .5, { alpha: 1 }, 'fade-content').to(sections, .5, { alpha: 1 }, 'fade-content');
  }

  function onContentReady() {
    //
  }

  function contractContent() {
    var tl2 = new TimelineMax({ onComplete: onContractComplete });
    tl2.to(header, .5, { alpha: 0 }, 0).to(sections, .5, { alpha: 0 }, 0).call(onContentFade).to(transitionBox, .15, { y: selectedBoxCoords.top + scrollOffset, height: selectedBoxCoords.height }).to(transitionBox, .15, { x: selectedBoxCoords.left, width: selectedBoxCoords.width }).to(transitionBox, .15, { alpha: 0 });
  }

  function setBoxCoordsAndScrollOffset(target) {
    selectedBoxCoords = target.getBoundingClientRect();
    scrollOffset = $(window).scrollTop() - getNavOffset();
  }

  function onContentFade() {
    $('#ux-leadspace').removeClass('hidden');
    $('.selected').removeClass('selected');
    $('#ux-overlay').removeClass('display');
    $('#ux-container').removeClass('hidden');
    $('#transition-box').addClass('animate');
  }

  function onExpandComplete() {
    window.scrollTo(0, 0);
    $('#ux-leadspace').addClass('hidden');
    $('#ux-overlay').addClass('display');
    $('#ux-container').addClass('hidden');
    $('#transition-box').removeClass('animate');
  }
  function onContractComplete() {
    $('#transition-box').removeClass('animate');
  }
})(jQuery);

},{}]},{},[1])

//# sourceMappingURL=bundle.js.map
