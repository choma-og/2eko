import Swiper, { Navigation, Pagination, EffectFade } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import '@/styles/style.scss';
import axios from 'axios';
import Inputmask from "inputmask"; /* DELETE ? */
import gsap from 'gsap';
import IMask from 'imask';
import { data } from 'browserslist';

window.addEventListener('unload', () => {
  document.documentElement.scrollTop = 0;
});

// ===== BURGER =====
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');

let overlay = document.createElement('div');
overlay.className = 'overlay';
if(iconMenu) {
	iconMenu.addEventListener("click", e => {
		e.preventDefault();
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');

    document.body.appendChild(overlay);
    overlay.classList.toggle('_active')
	})
}
overlay.addEventListener('click', function () {
  document.body.classList.toggle('_lock');
  iconMenu.classList.toggle('_active');
  menuBody.classList.toggle('_active');
  overlay.classList.toggle('_active')
});

const navLink = document.querySelectorAll('.menu__link')

const linkAction = () =>{
  document.body.classList.remove('_lock');
  iconMenu.classList.remove('_active');
  menuBody.classList.remove('_active');
  overlay.classList.remove('_active')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


// ===== HERO SWIPER =====
var swiperHero = new Swiper(".hero__swiper", {
  effect: "fade",
  modules: [Navigation, Pagination, EffectFade],
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
      },
    });
// ===== RESIZABLE SLDIER ===== 
window.addEventListener('DOMContentLoaded', () => {

  const resizableSwiper = (breakpoint, swiperClass, swiperSettings, callback) => {
    let swiper;

    breakpoint = window.matchMedia(breakpoint);

    const enableSwiper = function(className, settings) {
      swiper = new Swiper(className, settings);

      if (callback) {
        callback(swiper);
      }
    }

    const checker = function() {
      if (breakpoint.matches) {
        return enableSwiper(swiperClass, swiperSettings);
      } else {
        if (swiper !== undefined) swiper.destroy(true, true);
        return;
      }
    };

    breakpoint.addEventListener('change', checker);
    checker();
  }

  const someFunc = (instance) => {
    if (instance) {
      instance.on('slideChange', function (e) {
        console.log('*** mySwiper.activeIndex', instance.activeIndex);
      });
    }
  };

  resizableSwiper(
    '(max-width: 1440px)',
    '.advantages__list',
    {
      grabCursor: true,
      slidesPerView: 1,
      slidesPerView: 'auto',
      spaceBetween: 20,
      centerSlides:true,
      breakpoints: {
        670: {
          slidesPerView: 1,
          centerSlides:true,
        },
        840: {
          slidesPerView: 2,
        },
        1281: {
          slidesPerView: 3,
        },
      },
    }
  );
});
// ===== SERVICES ACCORDION TABS =====
const accordionItems = document.querySelectorAll('.services__item');
const servicesImages = document.querySelectorAll('.services__image');

let openIndex = null;

accordionItems.forEach((item, index) => {
    const accordionHeader = item.querySelector('.services__heading');

    accordionHeader.addEventListener('click', () => {
        // Убираем открытый класс и стили у всех элементов
        accordionItems.forEach((item, i) => {
            const accordionContent = item.querySelector('.services__content');
            accordionContent.removeAttribute('style');
            item.classList.remove('acrd-open');
            servicesImages[i].style.display = 'none';
        });

        // Открываем текущий элемент
        toggleItem(item, index, true);
        openIndex = index;
    });
});

// Инициализация: раскрываем первый элемент
if (accordionItems.length > 0) {
    const firstItem = accordionItems[0];
    const firstItemContent = firstItem.querySelector('.services__content');

    // Добавляем класс acrd-open и высоту
    firstItem.classList.add('acrd-open');
    firstItemContent.style.height = firstItemContent.scrollHeight + 30 + 'px';
    servicesImages[0].style.display = 'block';

    // Устанавливаем openIndex на первый элемент
    openIndex = 0;
}

const toggleItem = (item, index, isOpen) => {
    const accordionContent = item.querySelector('.services__content');

    if (!isOpen) {
        accordionContent.removeAttribute('style');
        item.classList.remove('acrd-open');
        servicesImages[index].style.display = 'none';
    } else {
        // Показываем соответствующую картинку
        servicesImages[index].style.display = 'block';

        // Разворачиваем контент
        accordionContent.style.height = accordionContent.scrollHeight + 'px';
        item.classList.add('acrd-open');
    }
};

// ===== REVIEWS SWIPER =====
var swiperReviews = new Swiper(".reviews__swiper", {
    slidesPerView: "auto",
    grabCursor: true,

    modules: [Navigation, Pagination],
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      670: {
        slidesPerView: 2,

      },
      768: {
        slidesPerView: 2,

      },
      1280: {
        slidesPerView: 3,

      },
    },
});

// ===== QUESTIONS ACCORDION=====
document.addEventListener('DOMContentLoaded', function () {
  let items = document.querySelectorAll('.questions__item');

  items.forEach(function (item, index) {
    let heading = item.querySelector('.questions__heading');
    let content = item.querySelector('.questions__content');

    heading.addEventListener('click', function () {
      if (!item.classList.contains('acrd-open')) {
        closeAllItems();
        openItem(item);
      } else {
        closeItem(item);
      }
    });

    if (index === 0) {
      openItem(item);
    }
  });

  function closeAllItems() {
    items.forEach(function (otherItem) {
      let otherContent = otherItem.querySelector('.questions__content');
      if (otherItem.classList.contains('acrd-open')) {
        otherContent.style.height = '0';
        otherItem.classList.remove('acrd-open');
      }
    });
  }

  function closeItem(item) {
    let content = item.querySelector('.questions__content');
    content.style.height = '0';
    item.classList.remove('acrd-open');
  }

  function openItem(item) {
    let content = item.querySelector('.questions__content');
    content.style.height = content.scrollHeight + 'px';
    item.classList.add('acrd-open');
  }
});
/*=============== INPUT MASK ===============*/
// Найти все элементы с атрибутом data-mask="phone"
let phones = document.querySelectorAll('[data-mask="phone"]');

// Применить маску к каждому найденному элементу
phones.forEach(function(element) {
  new IMask(element, {
    mask: '+{7}(000)000-00-00'
  });
});

// ===== VALIDATE AND AXIOS=====
function validatePhone(phone)  {
  const cleanedPhone = phone.replace(/\D/g, "");

  if(cleanedPhone.length === 11) {
    return true; 
  } else {
    return false;
  }
}
function validateText(text)  {
  const trimmedText = text.trim();

    if (trimmedText.length >= 2) {
    return true;
  } else {
    return false;
  }
}

const validate = (input) => {
  const dataType = input.getAttribute("data-type");
  let res = true;
  switch(dataType) {
      case "phone": 
      res = validatePhone(input.value)
      break;
      case "text": 
      res = validateText(input.value)
      break;
  }
  console.log(input, res, dataType)
  return res;
}


let forms = document.querySelectorAll('.js-form');

forms.forEach((form) => {
  let formButton = form.querySelector(".js-form-submit");
	if(formButton) {
		formButton.addEventListener("click", (e) => {
		e.preventDefault();
		formButton.disabled = true;
		const inputs = form.querySelectorAll("input");
		const method = form.method;
		const action = form.action;
		let isValidated = true;
		let formData = [];

		inputs.forEach(input => {
      formData.push({
        name: input.name,
        value: input.value,
        isValidate: validate(input),
      })  
  })

	formData.forEach(item => {
    const input = form.querySelector(`[name="${item.name}"]`);
    const wrapper = input.parentNode;
    const errorBlock = wrapper.querySelector('.js-error');

    if(!item.isValidate) {
        isValidated = false;
        errorBlock.classList.add("_active");
        input.style.color = '#EF4500';
    } else {
        errorBlock.classList.remove("_active");
        input.style.color = '#192D18';
    }
  })

	if(!isValidated) {
    formButton.disabled = false;
    return false;
  }
  
	axios({
		method,
		url: action,
		data: formData,
}).then((response) => {
		console.log("success");
		formButton.disabled = true;
    sucesOpen();
    orderBody.classList.remove('_active');
    orderContent.classList.remove('_active');

}).catch((error) => {
		console.error(error)
		formButton.disabled = false;
    sucesOpen();
    orderBody.classList.remove('_active');
    orderContent.classList.remove('_active');
	});
})
	}
})

/*=============== SUCES ===============*/
const sucesBody = document.querySelector('.suces__body');
const sucesContent = document.querySelector('.suces__content');
const sucesClose = document.querySelector('.suces__close');
function sucesOpen() {
  sucesBody.classList.add('_active');
  sucesContent.classList.add('_active');
  document.body.classList.add('_lock');
}

if(sucesClose) {
  sucesClose.addEventListener("click" , (e) => {
    sucesBody.classList.remove("_active");
    sucesContent.classList.remove('_active');
    document.body.classList.remove('_lock');
    orderBody.classList.remove('_active');
    orderContent.classList.remove('_active');
    equipmentBody.classList.remove('_active');
    equipmentContent.classList.remove('_active');
  })
}

/*=========================== ORDER-SERVICES MODAL ===========================*/
const orderBody = document.querySelector('.order__body');
const orderContent = document.querySelector('.order__content');
const orderClose = document.querySelector('.order__close');
const openServiceOrder = document.querySelectorAll('.js-services');

  openServiceOrder.forEach(button => {
    button.addEventListener('click', function () {
      orderBody.classList.add('_active');
      orderContent.classList.add('_active');
      document.body.classList.add('_lock');
    });
  });
  orderClose.addEventListener('click', (e) => {
    orderBody.classList.remove('_active');
    orderContent.classList.remove('_active');
    document.body.classList.remove('_lock');
  });

/*=========================== ORDER-EQUIPMENT MODAL ===========================*/
const equipmentBody = document.querySelector('.equipmnet__body');
const equipmentContent = document.querySelector('.equipmnet__content');
const equipmentClose = document.querySelector('.equipmnet__close');
const openEquipmentOrder = document.querySelectorAll('.js-equipmnets');

  openEquipmentOrder.forEach(button => {
    button.addEventListener('click', function () {
      equipmentBody.classList.add('_active');
      equipmentContent.classList.add('_active');
      document.body.classList.add('_lock');
    });
  });
  equipmentClose.addEventListener('click', (e) => {
    equipmentBody.classList.remove('_active');
    equipmentContent.classList.remove('_active');
    document.body.classList.remove('_lock');
  });


/*============================= GSAP ================================*/

// GSAP ADVANTAGES





// PRELOADER



const preloader = document.querySelector('.preloader');
const logoPreloader = document.querySelectorAll('.preloader-logo path');
const content = document.querySelector('.main');
const body = document.body;
const sloganContainer = document.querySelector('.preloader-slogan');
const slogans = document.querySelectorAll('.preloader-slogan svg');
const heroBoxBtn = document.querySelector('.hero__box .btn');
const title = document.querySelector('.swiper-hero__title');
body.style.overflow = 'hidden';

const logoAnimation = gsap.timeline({
  defaults: { ease: 'power2.inOut' },
  onComplete: () => {
    // Показываем контейнер с лозунгами
    gsap.to(sloganContainer, { duration: 0.5, opacity: 1 });

    // Запускаем анимацию появления лозунгов
    const sloganAnimation = gsap.timeline({
      onComplete: () => {
        // Скрываем прелоадер после завершения анимации лозунгов
        gsap.to(preloader, { duration: 0.5, y: '-100%',  });
        // Отображение контента после завершения анимации
        gsap.to(content, { duration: 0.5, opacity: 1, });
        body.style.overflow = 'visible';
      },
    });

    slogans.forEach((slogan, index) => {
      sloganAnimation.to(slogan, {  opacity: 1, y: '0',  });
    });
  },
});

// Анимация логотипа
logoAnimation.to(logoPreloader, { duration: 1.2, strokeDashoffset: 0, opacity: 1 });

    const advantagesItemPhoto = document.getElementById('advantages__item-photo');

    advantagesItemPhoto.addEventListener('mouseenter', () => {
      gsap.to(advantagesItemPhoto.querySelector('.gsap-photo'), { translateY: 0, duration: 1, ease: 'power4.out' });
    });

    advantagesItemPhoto.addEventListener('mouseleave', () => {
      gsap.to(advantagesItemPhoto.querySelector('.gsap-photo'), { translateY: 80, duration: 1, ease: 'power4.out' });
    });

    const itemBg = document.getElementById('advantages__item-bg');
    const itemBgImg = document.querySelector('.advantages-bg');

    // Задать начальные стили
    gsap.set(itemBgImg, { transformOrigin: 'center center', scale: 1 });

    // Создать анимацию с GSAP
    const animation = gsap.timeline({ paused: true })
      .to(itemBgImg, { scale: 1.2, duration: 1, ease: 'power4.out' });

    // Наведение мыши
    itemBg.addEventListener('mouseenter', () => {
      animation.play();
    });

    // Уход мыши
    itemBg.addEventListener('mouseleave', () => {
      animation.reverse();
    });