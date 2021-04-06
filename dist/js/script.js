(function () {
	'use strict';

	function closest(element, selector) {
		if(element.closest){
			return element.closest(selector);
		}else{
			function closest(parentElement, selector) {
				if(!parentElement) {
					return null
				}
				if(parentElement.matches(selector)){
					return parentElement;
				}
				if(!parentElement.parentElement){
					return null;
				}

				return closest(element.parentElement, selector);
			}

			return closest(element.parentElement, selector);
		}
	}

	function VSwiper(prefix) {
		let defaultParams = {
			containerModifierClass: prefix + 'swiper-container-',
			slideClass: prefix + 'swiper-slide',
			slideActiveClass: prefix + 'swiper-slide-active',
			slideDuplicateActiveClass: prefix + 'swiper-slide-duplicate-active',
			slideVisibleClass: prefix + 'swiper-slide-visible',
			slideDuplicateClass: prefix + 'swiper-slide-duplicate',
			slideNextClass: prefix + 'swiper-slide-next',
			slideDuplicateNextClass: prefix + 'swiper-slide-duplicate-next',
			slidePrevClass: prefix + 'swiper-slide-prev',
			slideDuplicatePrevClass: prefix + 'swiper-slide-duplicate-prev',
			slideBlankClass: prefix + 'swiper-slide-invisible-blank',
			wrapperClass: prefix + 'swiper-wrapper',
			navigation: {
				disabledClass: prefix + 'swiper-button-disabled',
				hiddenClass: prefix + 'swiper-button-hidden',
				lockClass: prefix + 'swiper-button-lock'
			},
			pagination: {
				bulletClass: prefix + 'swiper-pagination-bullet',
				bulletActiveClass: prefix + 'swiper-pagination-bullet-active',
				modifierClass: prefix + 'swiper-pagination-',
				currentClass: prefix + 'swiper-pagination-current',
				totalClass: prefix + 'swiper-pagination-total',
				hiddenClass: prefix + 'swiper-pagination-hidden',
				progressbarFillClass: prefix + 'swiper-pagination-progressbar-fill',
				clickableClass: prefix + 'swiper-pagination-clickable',
				lockClass: prefix + 'swiper-pagination-lock',
				progressbarOppositeClass: prefix + 'swiper-pagination-progressbar-opposite',
			},
			scrollbar: {
				lockClass: prefix + 'swiper-scrollbar-lock',
				dragClass: prefix + 'swiper-scrollbar-drag',
			}
		};

		this.init = function (el, slierParams) {
			if (!slierParams) slierParams = {};

			let defaultParamsKeys = Object.keys(defaultParams);

			for(let i = 0; i < defaultParamsKeys.length; i++){
				let index = defaultParamsKeys[i],
					param = defaultParams[index];

				if(!slierParams[index]){
					slierParams[index] = param;
				}else if(param instanceof Object){
					let paramKeys = Object.keys(param);

					for(let i2 = 0; i2 < paramKeys.length; i2++){
						let index2 = paramKeys[i2],
							param2 = param[index2];

						if(!slierParams[index][index2]){
							slierParams[index][index2] = param2;
						}
					}
				}
			}

			return new Swiper(el, slierParams);
		};
	}

	function VacancyBtn() {
		let goToVacancies = function () {
			document.querySelector('#tmpl-hh__vacancies-block').scrollIntoView({
				behavior: "smooth"
			});
		};
		let listenClick = function () {
			let vacanciesBtns = document.getElementsByClassName('tmpl-hh__vacancy-btn');

			for (let i = 0; i < vacanciesBtns.length; i++) {
				vacanciesBtns[i].addEventListener('click', function (event) {
					event.preventDefault();
					goToVacancies();
				});
			}
		};

		this.init = function () {
			listenClick();
		};
	}

	/*
	--------------------------------------------
	--------------------------------------------
			  	SLIDER MASTER
	--------------------------------------------
	--------------------------------------------
	*/
	function SliderMaster(vSwiper, prefix) {
		let getTemplate = function (className, pagination) {
			let slider = document.createElement('div');
				slider.classList.add(className);
				slider.classList.add(prefix + 'default-slider');

			let container = document.createElement('div');
				container.classList.add(prefix + 'swiper-container');
				container.classList.add(className + '__container');
				container.classList.add(prefix + 'default-slider__container');

			let wrapper = document.createElement('div');
				wrapper.classList.add(prefix + 'swiper-wrapper');

			container.appendChild(wrapper);
			slider.appendChild(container);

			if (pagination) {
				let paginationBlock = document.createElement('div');
					paginationBlock.classList.add(prefix + 'swiper-pagination');
					paginationBlock.classList.add(className + "__pagination");

				slider.appendChild(paginationBlock);
			}

			return slider;
		};

		this.init = function (sliderClass, itemsBlockSelector, itemsSelector, options, autoplay, preventClicks) {
			let slider = getTemplate(sliderClass, true);

			let items = document.querySelectorAll(itemsSelector);

			for (let i = 0; i < items.length; i++) {
				let slide = document.createElement('div');
					slide.classList.add(prefix + 'swiper-slide');
					slide.appendChild(items[i]);
					slider.querySelector('.' + prefix + 'swiper-wrapper').appendChild(slide);
			}

			if (!options) {
				options = {
					loop: true,
					slidesPerView: 1,
					autoplay: !!autoplay,
					preventClicks: !!preventClicks,
					autoHeight: true,
					spaceBetween: 25,
					pagination: {
						el: '.' + sliderClass + '__pagination',
						clickable: true,
						type: 'bullets',
					},
				};
			}

			document.querySelector(itemsBlockSelector).innerHTML = slider.outerHTML;

			return vSwiper.init('.' + sliderClass + '__container', options);
		};
	}

	/*
		--------------------------------------------
		--------------------------------------------
						GALLERY SLIDER
		--------------------------------------------
		--------------------------------------------
	 */
	function GallerySlider(swiper, closest) {
		let sliders = [],
			classes = {
				slider: 'tmpl-hh__gallery-slider',
				sliderFocus: 'tmpl-hh__gallery-slider--focus',
				slide: 'tmpl-hh__gallery-slider-slide',
				slideActive: 'tmpl-hh__gallery-slider-slide--active',
				slideFocus: 'tmpl-hh__gallery-slider-slide--focus',
				swiperSlideActive: 'tmpl-hh__swiper-slide-active',
			};

		function focusSlider(slider){
			blurSlider();
			slider.el.classList.add(classes.sliderFocus);
		}
		function blurSlider(){
			for (let i = 0; i < sliders.length; i++){
				sliders[i].el.classList.remove(classes.sliderFocus);
			}
		}
		function checkSlideTarget(target){
			return [
				target.classList.contains(classes.slide),
				closest(target, '.' + classes.slide)
			]
		}
		function activate(slide){
			slide.classList.add(classes.slideActive);
			slide.classList.add(classes.slideFocus);
		}
		function deactivate(slide){
			slide.classList.remove(classes.slideActive);
			setTimeout(function () {
				slide.classList.remove(classes.slideFocus);
			}, 400);
		}
		function deactivateAll(){
			let slides = document.getElementsByClassName(classes.slideActive);
			for (let i = 0; i < slides.length; i++){
				deactivate(slides[i]);
			}
		}
		function listenSlideClick() {
			for(let i = 0; i < sliders.length; i++){
				sliders[i].wrapperEl.addEventListener('click', function (event) {
					if(window.innerWidth <= 1019){
						return false;
					}

					let target = event.target;
					if(!target){
						return false;
					}

					let check  = checkSlideTarget(target),
						slide;
					if(check[0] || check[1]){
						if(check[0]){
							slide = target;
						}else{
							slide = check[1];
						}

						if(!slide.classList.contains(classes.slideActive)){
							deactivateAll();
							if(slide.classList.contains(classes.swiperSlideActive)){
								focusSlider(sliders[i]);
								activate(slide);
							}
						}
					}
				});
			}
		}

		this.onOutClick = function(target) {
			let check  = checkSlideTarget(target);
			if(!check[0] && !check[0]){
				deactivateAll();
			}

			setTimeout(function () {
				blurSlider(closest(target, "." + classes.slider));
			}, 400);
		};

		this.init = function () {
			let slidersItems = document.getElementsByClassName(classes.slider);

			for(let i = 0; i < slidersItems.length; i++){
				sliders.push(
					swiper.init(slidersItems[i], {
						loop: true,
						slidesPerView: 3,
						centeredSlides: true,
						spaceBetween: 20,
						pagination: {
							el: slidersItems[i].getAttribute('data-pagination'),
							clickable: true,
							type: 'bullets'
						},
						navigation: {
							prevEl: slidersItems[i].getAttribute('data-arrow-prev'),
							nextEl: slidersItems[i].getAttribute('data-arrow-next')
						},
						on: {
							slideChange: function () {
								deactivateAll();
							}
						},
						breakpoints: {
							529: {
								slidesPerView: 2,
								spaceBetween: 10,
								autoplay: true
							}
						}
					})
				);
			}

			listenSlideClick();
		};
	}

	function initCompanySlider() {
		swiper.init(".tmpl-hh__company-slider", {
			loop: true,
			slidesPerView: 1,
			spaceBetween: 20,
			effect: "fade",
			navigation: {
				prevEl: '.tmpl-hh__company-nav-prev',
				nextEl: '.tmpl-hh__company-nav-next'
			},
			pagination: {
				el: '.tmpl-hh__company-slider-pagination',
				clickable: true,
				type: 'bullets'
			},
			breakpoints: {
				529: {
					autoHeight: true
				}
			}
		});
	}
	function initIconCardsSlider() {
		sliderMaster.init("tmpl-hh__icon-cards-slider", ".tmpl-hh__s-offer .tmpl-hh__icon-cards", ".tmpl-hh__s-offer .tmpl-hh__icon-card", {
			slidesPerView: 2,
			loop: true,
			autoHeight: true,
			spaceBetween: 10,
			pagination: {
				el: '.tmpl-hh__icon-cards-slider-pagination',
				clickable: true,
				type: 'bullets'
			},
			breakpoints: {
				529: {
					slidesPerView: 1,
					spaceBetween: 20,
					pagination: {
						el: '.tmpl-hh__icon-cards-slider__pagination',
						clickable: true,
						type: 'bullets'
					}
				}
			}
		});
	}

	/*
		--------------------------------------------
		--------------------------------------------
							COMMON
		--------------------------------------------
		--------------------------------------------
	 */
	let swiper = new VSwiper("tmpl-hh__"),
		vacancyBtn = new VacancyBtn(),
		gallerySlider = new GallerySlider(swiper, closest),
		sliderMaster = new SliderMaster(swiper, "tmpl-hh__");

	vacancyBtn.init();
	// initCorporateSlider();
	initCompanySlider();
	gallerySlider.init();

	if(window.innerWidth <= 699){
		initIconCardsSlider();
	}

	document.addEventListener('mousedown', function (event) {
		if(!event.target){
			return false;
		}
		gallerySlider.onOutClick(event.target);
	});

}());
