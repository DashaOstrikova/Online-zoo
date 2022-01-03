const mapSliderContainer = document.querySelector(".slider");
let mapSlider = null;

function onSlideChange() {
  console.log("change");
}

if (mapSliderContainer) {
  mapSlider = new Slider(mapSliderContainer, { onSlideClickHandle: true });
}

mapSlider.on("onSlideChange", (slide) => {
  document.querySelectorAll(".map-legend__item").forEach((item) => {
    item.classList.remove("active");
  });

  const itemName = slide.dataset.itemName;

  const activeItem = document.querySelector(
    `.map-legend__item[data-item-name=${itemName}]`
  );

  const link = document.querySelector(".map-watch-online");

  if (activeItem) {
    activeItem.classList.add("active");
    link.href = activeItem.dataset.href;
    link.classList.remove("pointer-events-none");
  } else {
    link.classList.add("pointer-events-none");
  }
});

function onMapItemClick(event) {
  const itemName = event.currentTarget.dataset.itemName;
  const slides = document.querySelectorAll(`.slide`);
  let slideIndex = -1;
  slides.forEach((slide, index) => {
    if (slide.dataset.itemName === itemName) {
      slideIndex = index;
    }
  });

  if (slideIndex >= 0) mapSlider.setSlide(slideIndex);
}

document.querySelectorAll(".map-legend__item").forEach((item) => {
  item.addEventListener("click", onMapItemClick);
});
