

const accHead = document.querySelector(".cities-acc__head");
const accBody = document.querySelector(".cities-acc__body");
const toggleV = document.querySelector(".cities-acc__toggle-v");

accHead.addEventListener("click", function(){
  if (window.getComputedStyle(accBody).maxHeight == "0px") {
    accBody.style.maxHeight = "2000px"; //arbitrary big enough height
    toggleV.classList.add("cities-acc__toggle-v-closed");
  } else {
    accBody.style.maxHeight = "0px";
    toggleV.classList.remove("cities-acc__toggle-v-closed");
  }
})
