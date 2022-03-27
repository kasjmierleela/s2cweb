document.addEventListener("DOMContentLoaded", ready);


function ready() {


  // handle nav scroll react
  gsap.registerPlugin(ScrollTrigger);

  const showAnim = gsap.from('.nav', {
    yPercent: -100,
    paused: true,
    duration: 0.2
  }).progress(1);

  ScrollTrigger.create({
    start: "top top",
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
      start: "top bottom-=200",
      end: "bottom bottom",
      scrub: true
    }
  });

  footerTimeline.to(footerGIB, {
    right: "0%"
  });
}
