const slides = document.querySelectorAll(".preview-slider__slide");

function onSlideClick(slideIndex) {
  return function (event) {
    const iframe = event.currentTarget.querySelector("iframe");
    const mainIframe = document.querySelector(".preview-slider__slide iframe");
    const mainHref = mainIframe.src;
    mainIframe.src = iframe.src;
    iframe.src = mainHref;

    document.querySelectorAll(".radio-button").forEach((radioButton, index) => {
      radioButton.checked = index === slideIndex - 1 ? "checked" : "";
    });
  };
}

slides.forEach((slide, index) =>
  slide.addEventListener("click", onSlideClick(index))
);
