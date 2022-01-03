class Slider {
  settings = {
    slidesContainerClass: ".slides",
    slideClass: ".slide",
    sliderRandeClass: ".slider__scroll-range",
    sliderRangeAmountClass: ".slider__amount",
    sliderRangeActiveIndexClass: ".slider__passed-count",
    sliderActionClass: ".slider__action",
  };

  activeSlide = 1;
  scrolledItems = 1;
  displayedItems = 0;
  slideGap = 0;

  events = {
    onSlideChange: () => {},
  };

  constructor(sliderContainer, options = {}) {
    this.sliderContainer = sliderContainer;

    if (this.sliderContainer) {
      this.slidesContainer = this.sliderContainer.querySelector(
        this.settings.slidesContainerClass
      );

      this.slides = this.sliderContainer.querySelectorAll(
        this.settings.slideClass
      );

      if (options.onSlideClickHandle) {
        this.slides.forEach((slide, index) => {
          slide.addEventListener("click", (event) => {
            this.activeSlide = index + 1;
            this.onSlide();
          });
        });
      }

      this.actions = this.sliderContainer.querySelector(
        this.settings.sliderActionClass
      );

      this.init();
      this.onSlide();
    }
  }

  init() {
    this.initActions();
    this.initVariables();
    this.initSliderRange();
  }

  initActions() {
    this.actions = this.sliderContainer.querySelectorAll(
      this.settings.sliderActionClass
    );

    if (this.actions) {
      this.actions.forEach((action) =>
        action.addEventListener("click", this.onActionClick.bind(this))
      );
    }
  }

  initVariables() {
    if (this.sliderContainer.dataset.slideGap) {
      this.slideGap = Number(this.sliderContainer.dataset.slideGap);
    }

    if (this.sliderContainer.dataset.initSlide) {
      this.activeSlide = Number(this.sliderContainer.dataset.initSlide);
    }

    if (this.sliderContainer.dataset.displayedItems) {
      this.displayedItems = Number(this.sliderContainer.dataset.displayedItems);
    }

    if (this.sliderContainer.dataset.scrolledItems) {
      this.scrolledItems = Number(this.sliderContainer.dataset.scrolledItems);
    }

    if (this.slides.length > 0) {
      this.slideWidth = this.slides[0].offsetWidth + this.slideGap;
    }
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

      this.sliderRange.addEventListener("input", this.rangeChange.bind(this));
    }

    this.updateRangeInfo(
      this.sliderRangeAmount,
      this.slides.length / this.scrolledItems
    );
    this.updateRangeInfo(this.sliderRangeActiveIndex, this.activeSlide);
  }

  updateRangeInfo(rangeItem, value) {
    if (rangeItem) {
      rangeItem.innerHTML = value < 10 ? `0${value}` : value;
    }
  }

  rangeChange(event) {
    const { value } = event.currentTarget;

    this.activeSlide = Number(value);

    this.onSlide();
  }

  onSlide() {
    this.sliderRange.value = this.activeSlide;

    if (this.activeSlide > this.displayedItems) {
      const slideValue =
        -(this.activeSlide - 1 - this.displayedItems) *
        this.slideWidth *
        this.scrolledItems;
      this.slidesContainer.style.transform = `translateX(${slideValue}px)`;
    }

    this.updateRangeInfo(this.sliderRangeActiveIndex, this.activeSlide);

    this.slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    const activeSlide = this.slides[this.activeSlide - 1];

    activeSlide.classList.add("active");

    this.events.onSlideChange(activeSlide);
  }

  onActionClick(event) {
    const { value } = event.currentTarget;
    this.activeSlide = this.activeSlide + Number(value);
    if (this.activeSlide > this.slides.length / this.scrolledItems) {
      this.activeSlide = 1;
    } else if (this.activeSlide < 1) {
      this.activeSlide = this.slides.length / this.scrolledItems;
    }
    this.onSlide();
  }

  on(event, callback) {
    if (this.events[event]) {
      this.events[event] = callback;
    }
  }

  setSlide(slideIndex) {
    this.activeSlide = slideIndex + 1;

    this.onSlide();
  }
}
