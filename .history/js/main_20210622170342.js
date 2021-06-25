window.addEventListener('DOMContentLoaded', (e) => {
    'use strict';

    // setTimeout(() => {
    //     document.querySelector('.loader').classList.add('hideLoader');
    // }, 3000);

    // setTimeout(() => {
    //     document.querySelector('.loader').remove();
    // }, 4000);
    const tabParent = document.querySelector('.tabheader__items');
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabContents = document.querySelectorAll('.tabcontent');

    function hideTabs() {
        tabContents.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');

        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTab(i = 0) {

        tabContents[i].classList.add('show', 'fade');
        tabContents[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabs();
    showTab();

    tabParent.addEventListener('click', (event) => {
        let target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, index) => {
                if (target == item) {
                    hideTabs();
                    showTab(index);
                }
            });

        }
    });


    //timer

    const deadline = '2021-06-20';

    function getEndTime(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date());
        let days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / (1000)) % 60);

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timerParent = document.querySelector(selector);
        let tDays = timerParent.querySelector('span#days'),
            tHours = timerParent.querySelector('#hours'),
            tMinutes = timerParent.querySelector('#minutes'),
            tSeconds = timerParent.querySelector('#seconds'),
            timerId = setInterval(updateClock, 1000);
        updateClock();


        function updateClock() {
            const data = getEndTime(endTime);

            tDays.textContent = getZero(data.days);
            tHours.textContent = getZero(data.hours);
            tMinutes.textContent = getZero(data.minutes);
            tSeconds.textContent = getZero(data.seconds);

            if (data.total <= 0) {
                clearInterval(timerId);
                tDays.textContent = 0;
                tHours.textContent = 0;
                tMinutes.textContent = 0;
                tSeconds.textContent = 0;

            }
        }

    }

    setClock('.timer', deadline);

    // Modal-----------------------------------------------

    const modal = document.querySelector('.modal');
    const modalBtns = document.querySelectorAll('[data-modal]');
    const modalClose = document.querySelector('[data-close]');


    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }


    modalBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });


    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }


    modal.addEventListener('click', (e) => {
        const target = e.target;
        if (target === modal || target == modalClose) {
            closeModal();
        }
    });

    document.addEventListener('keyup', (e) => {
        if (modal.classList.contains('show') && e.code === 'Escape') {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 4000);

    function showModalByScroll() {
        if ((document.documentElement.clientHeight + window.pageYOffset) >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // dynamic menu------------------------------------

    class MenuCard {
        constructor(item, parendSelector) {
            this.src = item.src;
            this.alt = item.alt;
            this.title = item.title;
            this.desc = item.desc;
            this.price = +item.price;
            this.changeToGRN();
            this.parent = document.querySelector(parendSelector);
        }
        changeToGRN() {
            this.price *= 27;
        }
        render() {
            let card = document.createElement('div');
            card.classList.add('menu__item');
            card.innerHTML = `
            <img src="${this.src}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
            <div class="menu__item-descr">${this.desc}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            `;

            this.parent.append(card);

        }
    }
    const menuItemsArr = [{
            src: 'img/tabs/vegy.jpg',
            alt: 'vegy',
            title: 'Фитнес',
            desc: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            price: 229 / 27,

        },
        {
            src: 'img/tabs/elite.jpg',
            alt: 'elite',
            title: 'Премиум',
            desc: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            price: 550 / 27,

        },
        {
            src: 'img/tabs/post.jpg',
            alt: 'post',
            title: 'Постное',
            desc: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            price: 430 / 27,

        },


    ];
    document.querySelector('.menu__field .container').innerHTML = '';
    menuItemsArr.forEach(item => new MenuCard(item, '.menu__field .container').render());

    // Forms

    const forms = document.querySelectorAll('form');
    forms.forEach(form => console.dir(form));




});