document.addEventListener("DOMContentLoaded", ready);


function ready() {


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



  //handle approach section interaction
  const approachLottie = document.querySelector(".approach-lottie");

  const approachLottiePlayer = lottie.loadAnimation({
    container: approachLottie,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'assets/lotties/approach.json'
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




  //handle spotlight slider
  const wrapper = document.querySelector(".spotlight-slider");
  const colors = ["#f38630", "#6fb936", "#ccc", "#6fb936"];
  const boxes = gsap.utils.toArray(".spotlight-slide");

  const loop = horizontalLoop(boxes, {
    paused: true,
    draggable: true
  });

  boxes.forEach((box, i) => box.addEventListener("click", () => loop.toIndex(i, {
    duration: 0.8,
    ease: "power1.inOut"
  })));

  // document.querySelector(".toggle").addEventListener("click", () => wrapper.classList.toggle("show-overflow"));
  // document.querySelector(".next").addEventListener("click", () => loop.next({
  //   duration: 0.4,
  //   ease: "power1.inOut"
  // }));
  // document.querySelector(".prev").addEventListener("click", () => loop.previous({
  //   duration: 0.4,
  //   ease: "power1.inOut"
  // }));




  /*
  This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

  Features:
   - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
   - When each item animates to the left or right enough, it will loop back to the other side
   - Optionally pass in a config object with values like draggable: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, and paddingRight.
   - The returned timeline will have the following methods added to it:
     - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
     - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
     - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
     - current() - returns the current index (if an animation is in-progress, it reflects the final index)
     - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
   */
  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: {
          ease: "none"
        },
        onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      xPercents = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? v => v : gsap.utils.snap(config.snap ||
        1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
      populateWidths = () => items.forEach((el, i) => {
        widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
        xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / widths[i] * 100 + gsap.getProperty(el, "xPercent"));
      }),
      getTotalWidth = () => items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0),
      totalWidth, curX, distanceToStart, distanceToLoop, item, i;
    populateWidths();
    gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
      xPercent: i => xPercents[i]
    });
    gsap.set(items, {
      x: 0
    });
    totalWidth = getTotalWidth();
    for (i = 0; i < length; i++) {
      item = items[i];
      curX = xPercents[i] / 100 * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
      tl.to(item, {
          xPercent: snap((curX - distanceToLoop) / widths[i] * 100),
          duration: distanceToLoop / pixelsPerSecond
        }, 0)
        .fromTo(item, {
          xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)
        }, {
          xPercent: xPercents[i],
          duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false
        }, distanceToLoop / pixelsPerSecond)
        .add("label" + i, distanceToStart / pixelsPerSecond);
      times[i] = distanceToStart / pixelsPerSecond;
    }

    function toIndex(index, vars) {
      vars = vars || {};
      (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
        vars.modifiers = {
          time: gsap.utils.wrap(0, tl.duration())
        };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    }
    tl.next = vars => toIndex(curIndex + 1, vars);
    tl.previous = vars => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.updateIndex = () => curIndex = Math.round(tl.progress() * items.length);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    if (config.draggable && typeof(Draggable) === "function") {
      let proxy = document.createElement("div"),
        wrap = gsap.utils.wrap(0, 1),
        ratio, startProgress, draggable, dragSnap, roundFactor,
        align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
        syncIndex = () => tl.updateIndex();
      typeof(InertiaPlugin) === "undefined" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club");
      draggable = Draggable.create(proxy, {
        trigger: items[0].parentNode,
        type: "x",
        onPress() {
          startProgress = tl.progress();
          tl.progress(0);
          populateWidths();
          totalWidth = getTotalWidth();
          ratio = 1 / totalWidth;
          dragSnap = totalWidth / items.length;
          roundFactor = Math.pow(10, ((dragSnap + "").split(".")[1] || "").length);
          tl.progress(startProgress);
        },
        onDrag: align,
        onThrowUpdate: align,
        inertia: true,
        snap: value => {
          let n = Math.round(parseFloat(value) / dragSnap) * dragSnap * roundFactor;
          return (n - n % 1) / roundFactor;
        },
        onRelease: syncIndex,
        onThrowComplete: () => gsap.set(proxy, {
          x: 0
        }) && syncIndex()
      })[0];

      tl.draggable = draggable;
    }

    return tl;
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


  //handle partner collaborator popups
  const partnerClickables = document.querySelectorAll(".partners-grid__item-clickable");
  const partnerOverlays = document.querySelectorAll(".partner-grid-item__overlay-parent");
  const partnerOverlayCloseIcons = document.querySelectorAll(".partners-grid-item__overlay-icon-wrapper");
  const body = document.querySelector("body");
  console.log(body);

  for(let i=0; i<partnerClickables.length; i++){

    partnerClickables[i].addEventListener("click", function(){
      if(window.getComputedStyle(partnerOverlays[i]).display == "none"){
        showPartnerOverlay(i);
      } else {
        hidePartnerOverlay(i);
      }
    })

    partnerOverlayCloseIcons[i].addEventListener("click", function(){
      hidePartnerOverlay(i);
    })

  }

  function showPartnerOverlay(index){
    partnerOverlays[index].style.display = "flex";
    gsap.to(partnerOverlays[index], {
      opacity: 1,
      duration: 0.5
    });
    body.style.overflow = "hidden";
  }

  function hidePartnerOverlay(index){
    gsap.to(partnerOverlays[index], {
      opacity: 0,
      duration: 0.5
    });
    setTimeout(function(){
      partnerOverlays[index].style.display = "none";
      body.style.overflow = "auto";
    }, 500);
  }


}