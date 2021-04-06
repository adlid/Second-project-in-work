import closest from "./assets/Closest";
import VSwiper from "./assets/VSwiper";
import VacancyBtn from "./assets/VacancyBtn";
import SliderMaster from "./modules/SliderMaster";
import GallerySlider from './custom_modules/GallerySlider';
/*
	--------------------------------------------
	--------------------------------------------
					SLIDERS
	--------------------------------------------
	--------------------------------------------
 */
function initCorporateSlider() {
	swiper.init(".tmpl-hh__corporate-slider", {
		loop: true,
		slidesPerView: 3,
		spaceBetween: 20,
		centeredSlides: true,
		navigation: {
			prevEl: '.tmpl-hh__corporate-nav-prev',
			nextEl: '.tmpl-hh__corporate-nav-next'
		},
		pagination: {
			el: '.tmpl-hh__corporate-slider-pagination',
			clickable: true,
			type: 'bullets'
		},
		breakpoints: {
			699: {
				slidesPerView: 2,
				spaceBetween: 10,
				pagination: {
					el: '.tmpl-hh__corporate-slider-pagination',
					clickable: true,
					type: 'bullets'
				}
			}
		}
	});
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