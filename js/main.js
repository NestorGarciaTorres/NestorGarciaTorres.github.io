/**
* Template Name: Arsha - v4.7.1
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.regreso-inicio')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('activo')
      } else {
        backtotop.classList.remove('activo')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.icono-menu-resp', function(e) {
    select('#navbar').classList.toggle('menu-resp')//
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })


  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('menu-resp')) {
        navbar.classList.remove('menu-resp')
        let navbarToggle = select('.icono-menu-resp')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
   let preloader = select('#preloader');
   let loader = select('#loader');
    if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
      loader.remove()
    });
  }

  /**
   * Initiate  glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });


  /// PROBAR EL SEGUNDO MENU PARA EL FILTRO DEL MENU/////
  window.addEventListener('load', () => {
    let containerGaleria= select('.container-galeria');
    if (containerGaleria) {
      let portfolioIsotope = new Isotope(containerGaleria, {
        itemSelector: '.item-galeria'
      });

      let portfolioFilters = select('#filtros-galeria a', true);

      on('click', '#filtros-galeria a', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filtro-activo');
        });
        this.classList.add('filtro-activo');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });
  ////////

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  // Brands animation 
  var logotimeline = new TimelineMax({repeat:-1});
    logotimeline.staggerTo(".logo-grid .column", 2, {onComplete:tweenComplete, onCompleteParams:["{self}"]}, 0.1);
    function tweenComplete(tween) {
      var column = tween.target;
      var activeItem = $(column).find('.active');
      
      var nextActiveItem = activeItem.next();
      if (typeof nextActiveItem.html() === 'undefined'){
        nextActiveItem = $(column).find('.grid-logo:first');
      }

      activeItem.removeClass('active'); 
      nextActiveItem.addClass('active');
    }

  // Only numbers at contact section//
    jQuery("#phone").on('input', function (evt) {
      jQuery(this).val(jQuery(this).val().replace(/[^0-9]/g, ''));
    });

  // Desktop services//
    var serviceBx = document.querySelectorAll('.service-title-bx');
    var contentBx = document.querySelectorAll('.content-bx');

    for(var i=0; i<serviceBx.length; i++){
      serviceBx[i].addEventListener('mouseover',function(){
        for(var i=0;i<contentBx.length;i++){
          contentBx[i].className = 'content-bx';
        }
        document.getElementById(this.dataset.id).className = 'contentBx service-active';

        for(var i=0;i<contentBx.length;i++){
          serviceBx[i].className = 'service-title-bx';
        }
        this.className = 'service-title-bx title-active';
      })
    }
  //
})()
