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
	}
}

export default GallerySlider;