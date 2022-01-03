const sliders = [];
document
  .querySelectorAll(".slider")
  .forEach((slider) => sliders.push(new Slider(slider)));

class MainSlider {
  settings = {
    slidesClass: ".main-slider__slide-list",
    slideClass: ".main-slider__slide",
    sliderRandeClass: ".slider__scroll-range",
    sliderRangeAmountClass: ".slider__amount",
    sliderRangeActiveIndexClass: ".slider__passed-count",
    sliderActionClass: ".slider__action",
  };

  activeSlide = 1;
  scrolledItems = 1;
  slideGap = 0;

  constructor(sliderContainer) {
    this.sliderContainer = sliderContainer;

    this.slidesContainer = this.sliderContainer.querySelector(
      this.settings.slidesClass
    );

    this.slides = this.slidesContainer.querySelectorAll(
      this.settings.slideClass
    );

    this.slides.forEach((slide, index) =>
      slide.addEventListener("click", this.onSlideClick(index).bind(this))
    );

    this.initVariables();
    this.initSliderRange();

    this.slidesContainer.style.transform = `translateX(-${
      this.slideWidth + 30
    }px)`;
  }

  initSliderRange() {
    this.sliderRange = this.sliderContainer.querySelector(
      this.settings.sliderRandeClass
    );

    this.sliderRangeAmount = this.sliderContainer.querySelector(
      this.settings.sliderRangeAmountClass
    );

    this.sliderRangeActiveIndex = this.sliderContainer.querySelector(
      this.settings.sliderRangeActiveIndexClass
    );

    if (this.sliderRange) {
      this.sliderRange.max = this.slides.length / this.scrolledItems;
      this.sliderRange.value = this.activeSlide;

      this.sliderRange.addEventListener("input", this.onRangeChange.bind(this));
    }

    this.updateRangeInfo(
      this.sliderRangeAmount,
      this.slides.length / this.scrolledItems
    );
    this.updateRangeInfo(this.sliderRangeActiveIndex, this.activeSlide);
  }

  initVariables() {
    if (this.sliderContainer.dataset.slideGap) {
      this.slideGap = Number(this.sliderContainer.dataset.slideGap);
    }

    if (this.sliderContainer.dataset.initSlide) {
      this.activeSlide = Number(this.sliderContainer.dataset.initSlide);
    }

    if (this.sliderContainer.dataset.scrolledItems) {
      this.scrolledItems = Number(this.sliderContainer.dataset.scrolledItems);
    }

    if (this.slides.length > 0) {
      this.slideWidth = this.slides[0].offsetWidth + this.slideGap;
      // this.slidesContainer.style.width = 10000 + "px";
    }
  }

  onRangeChange(event) {
    const { value } = event.currentTarget;

    this.activeSlide = Number(value);

    this.updateRangeInfo(this.sliderRangeActiveIndex, this.activeSlide);

    this.updateActiveSlide(this.slides[this.activeSlide - 1]);

    this.slidesContainer.style.transform = `translateX(-${
      (this.slideWidth + 30) * (this.activeSlide - 1)
    }px)`;

    this.onSlide();
  }

  onSlide() {
    this.slidesContainer.style.transform = `translateX(-${
      (this.slideWidth + 30) * (this.activeSlide - 1)
    }px)`;

    this.slides.forEach((slide, index) => {
      if (this.activeSlide - 1 > index + 1) {
        slide.classList.add("hide");
      } else {
        slide.classList.remove("hide");
      }
    });
  }

  onSlideClick(index) {
    return function (event) {
      this.updateActiveSlide(event.currentTarget);
      this.activeSlide = index + 1;
      this.sliderRange.value = this.activeSlide;
      this.updateRangeInfo(this.sliderRangeActiveIndex, this.activeSlide);

      this.onSlide();
    };
  }

  updateRangeInfo(rangeItem, value) {
    if (rangeItem) {
      rangeItem.innerHTML = value < 10 ? `0${value}` : value;
    }
  }

  updateActiveSlide(activeSlide) {
    this.slides.forEach((slide) => slide.classList.remove("active"));
    if (activeSlide) {
      activeSlide.classList.add("active");
    }
  }
}

const mainSliderElement = document.querySelector(".main-slider");
if (mainSliderElement) {
  const mainSlider = new MainSlider(mainSliderElement);
}
