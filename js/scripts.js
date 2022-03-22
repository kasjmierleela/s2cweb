document.addEventListener("DOMContentLoaded", ready);


function ready() {


  //homepage scripts /////////////////////////////////////////////////////////////////////
  if (window.location.pathname == '/index.html'){

    //handle muhammad story cards
    const storyToggle = document.querySelector(".story-toggle-area");
    const storyToggleBall = document.querySelector(".story-toggle-ball");
    const storyCard = document.querySelector(".story-grid-item__card2");

    storyToggle.addEventListener("click", function() {
      if (window.getComputedStyle(storyToggleBall).left == "0px") {
        gsap.to(storyToggleBall, {
          left: "50%",
          duration: 0.5
        });
        gsap.to(storyCard, {
          left: "0%",
          duration: 0.5
        });
      } else {
        gsap.to(storyToggleBall, {
          left: "0%",
          duration: 0.5
        });
        gsap.to(storyCard, {
          left: "-100%",
          duration: 0.5
        });
      }
    });


    // handle city accordions
    const accHeads = document.querySelectorAll(".cities-acc__head");
    const accBodys = document.querySelectorAll(".cities-acc__body");
    const toggleLotties = document.querySelectorAll(".cities-acc__toggle-lottie");
    const accLotties = [];

    for (let i = 0; i < toggleLotties.length; i++) {
      accLotties[i] = lottie.loadAnimation({
        container: toggleLotties[i],
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'assets/lotties/accordion.json'
      });

      accHeads[i].addEventListener("click", function() {
        if (window.getComputedStyle(accBodys[i]).height == "0px") {
          gsap.to(accBodys[i], {
            height: "auto",
            duration: 0.5
          });
          accLotties[i].playSegments([0, 15], true);
        } else {
          gsap.to(accBodys[i], {
            height: "0",
            duration: 0.5
          });
          accLotties[i].playSegments([15, 0], true);
        }
      })
    }


    //handle partner collaborator accordions
    const partnersAccHeads = document.querySelectorAll(".partners-acc__head");
    const partnersAccBodys = document.querySelectorAll(".partners-acc__body");
    const partnersToggleLotties = document.querySelectorAll(".partners-acc__toggle-lottie");
    const partnersAccLotties = [];

    for (let i = 0; i < partnersToggleLotties.length; i++) {
      partnersAccLotties[i] = lottie.loadAnimation({
        container: partnersToggleLotties[i],
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'assets/lotties/accordion.json'
      });

      partnersAccHeads[i].addEventListener("click", function() {
        if (window.getComputedStyle(partnersAccBodys[i]).height == "0px") {
          gsap.to(partnersAccBodys[i], {
            height: "auto",
            duration: 0.5
          });
          partnersAccLotties[i].playSegments([0, 15], true);
        } else {
          gsap.to(partnersAccBodys[i], {
            height: "0",
            duration: 0.5
          });
          partnersAccLotties[i].playSegments([15, 0], true);
        }
      })
    }

  }


  //about page scripts /////////////////////////////////////////////////////////////////////
  if (window.location.pathname == '/about.html'){

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



  }



}
