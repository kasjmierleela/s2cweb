document.addEventListener("DOMContentLoaded", ready);


function ready() {

  //about page scripts /////////////////////////////////////////////////////////////////////
  // if (window.location.pathname == '/about.html'){

    // handle about page accordion
    const aboutAccToggle = document.querySelector(".about-acc__toggle-area");
    const aboutAccToggleBall = document.querySelector(".about-acc__toggle-ball");
    const aboutAccBody = document.querySelector(".about-acc__body");
    const aboutAccInfo = document.querySelector(".about-acc__toggle-info");

    aboutAccToggle.addEventListener("click", function() {
      console.log(window.getComputedStyle(aboutAccBody).height);

      if (window.getComputedStyle(aboutAccBody).height == "0px") {
        gsap.to(aboutAccToggleBall, {
          left: "50%",
          duration: 0.5
        });
        gsap.to(aboutAccInfo, {
          opacity: 0,
          duration: 0.5
        });
        gsap.to(aboutAccBody, {
          height: "auto",
          duration: 1
        });
      } else {
        gsap.to(aboutAccToggleBall, {
          left: "0%",
          duration: 0.5
        });
        gsap.to(aboutAccInfo, {
          opacity: 0.5,
          duration: 0.5
        });
        gsap.to(aboutAccBody, {
          height: "0px",
          duration: 1
        });
      }
    });


    //handle principles accordions
    const principlesAccHeads = document.querySelectorAll(".principles-acc__head");
    const principlesAccBodys = document.querySelectorAll(".principles-acc__body");
    const principlesToggleLotties = document.querySelectorAll(".principles-acc__toggle-lottie");
    const principlesAccLotties = [];

    for (let i = 0; i < principlesToggleLotties.length; i++) {
      principlesAccLotties[i] = lottie.loadAnimation({
        container: principlesToggleLotties[i],
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'assets/lotties/accordion.json'
      });

      principlesAccHeads[i].addEventListener("click", function() {
        if (window.getComputedStyle(principlesAccBodys[i]).height == "0px") {
          gsap.to(principlesAccBodys[i], {
            height: "auto",
            duration: 0.5
          });
          principlesAccLotties[i].playSegments([0, 15], true);
        } else {
          gsap.to(principlesAccBodys[i], {
            height: "0",
            duration: 0.5
          });
          principlesAccLotties[i].playSegments([15, 0], true);
        }
      })
    }



  // }



}
