window.addEventListener("DOMContentLoaded", readyAllPages);


function readyAllPages() {


  // handle nav scroll react
  gsap.registerPlugin(ScrollTrigger);

  const showAnim = gsap.from('.nav', {
    yPercent: -100,
    paused: true,
    duration: 0.2
  }).progress(1);

  ScrollTrigger.create({
    start: "top top+=70",
    end: 99999,
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse()
    }
  });



  // handle footer gib reveal
  const footerGIB = document.querySelector(".footer-gib");
  const footerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".footer",
      pin: false,
      start: "top bottom",
      end: "bottom bottom",
      scrub: true
    }
  });

  footerTimeline.to(footerGIB, {
    right: "0.01%",
    duration: 0.5
  });



  //handle buttons
  const pageButtons = document.querySelectorAll(".button");
  const pageButtonOverlays = document.querySelectorAll(".button-overlay");

  for(let i=0; i<pageButtons.length; i++){
    pageButtons[i].addEventListener("mouseenter", function(){
      gsap.to(pageButtonOverlays[i], {
        left: "0%",
        duration: 0.3
      });
    })
    pageButtons[i].addEventListener("mouseleave", function(){
      gsap.to(pageButtonOverlays[i], {
        left: "-100%",
        duration: 0.3
      });
    })
  }

}
