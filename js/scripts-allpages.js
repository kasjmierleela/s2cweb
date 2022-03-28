document.addEventListener("DOMContentLoaded", readyAllPages);


function readyAllPages() {


  // handle nav scroll react
  gsap.registerPlugin(ScrollTrigger);

  const showAnim = gsap.from('.nav', {
    yPercent: -100,
    paused: true,
    duration: 0.2
  }).progress(1);

  ScrollTrigger.create({
    start: "top top+=100",
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

}
