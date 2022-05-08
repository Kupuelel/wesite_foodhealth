function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const sliderItem = document.querySelector(container);

    const slideImg = document.querySelectorAll(slide);
    const slideWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);

    const width = window.getComputedStyle(slideWrapper).width;

    const current = document.querySelector(currentCounter);
    const totalSlides = document.querySelector(totalCounter);

    const prevSlideArrow = document.querySelector(prevArrow);
    const nextSlideArrow = document.querySelector(nextArrow);

    let indexMain = 1;
    let offset = 0;

    function firstZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    
    current.textContent = firstZero(indexMain);
    slideWrapper.style.overflow = 'hidden';
    
    slidesField.style.width = 100 * slideImg.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    sliderItem.style.position = 'relative';






    slideImg.forEach(slide => {
        slide.style.width = width;
    });
    ////////////////////////////////////// slide dots
    const dots = [];

    const dotActive = () => {
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[indexMain - 1].style.opacity = 1;
    };
    const numbersFromString = string => +string.replace(/\D/g, '');

    const pointsWrapper = document.createElement('ol');
    pointsWrapper.classList.add('carousel-indicators');

    pointsWrapper.style.cssText = `
        position: absolute;
        bottom: 15px;
        right: 50%;
        transform: translateX(50%);
        display: flex;
        height: 10px;
    `;
    sliderItem.append(pointsWrapper);

    
    for (let i = 0 ; i < slideImg.length; i++) {
        const pointItem = document.createElement('li');
        pointItem.setAttribute('data-slide-to', i + 1);
        pointItem.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
            list-style: none;
        `;
        if (i == 0) {
            pointItem.style.opacity = '1';
        }
         pointsWrapper.append(pointItem);
         dots.push(pointItem);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', e => {
            const slideTo = e.target.getAttribute('data-slide-to');

            indexMain = slideTo;
            offset = numbersFromString(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            dotActive();
            current.textContent = firstZero(indexMain);
        });
    });
    ////////////////////
    

    nextSlideArrow.addEventListener('click', () => {
        
        
        if (offset == numbersFromString(width) * (slideImg.length - 1)) {
            offset = 0;
        } else {
            offset += numbersFromString(width);
        }

        if (indexMain == slideImg.length) {
            indexMain = 1;
        } else {
            indexMain++;
        }
        current.textContent = firstZero(indexMain);
        slidesField.style.transform = `translateX(-${offset}px)`;
        dotActive();
    });

    prevSlideArrow.addEventListener('click', () => {
        


        if (offset == 0) {
            offset += numbersFromString(width) * (slideImg.length - 1);
        } else {
            offset -= numbersFromString(width);
        }
        
        if (indexMain == 1) {
            indexMain = slideImg.length;
        } else {
            indexMain--;
        }
        current.textContent = firstZero(indexMain);
        slidesField.style.transform = `translateX(-${offset}px)`;
        dotActive();
    });

    

    
       
    


    //////////////////////////////////// my version of slider

    // const arrowIndex = (i = 1) => {
    //     const index = i;
    //     current.textContent = `${getZero(index)}`;

    //     const totalSlidesIndex = slideImg.length;
    //     totalSlides.textContent = `${getZero(totalSlidesIndex)}`;
    // };
    // arrowIndex();

    // const slideShow = (i = 1) => {
    //     slideImg.forEach(item => {
    //         item.classList.add('hide');
    //         item.classList.remove('show');
    //     });
    //     slideImg[i - 1].classList.add('show');
    // };
    // slideShow();

    // prevSlideArrow.addEventListener('click', () => {
    //     indexMain--;
    //     if (indexMain < 1) {
    //         indexMain = slideImg.length;
    //    }
    //     arrowIndex(indexMain);
    //     slideShow(indexMain);
    // });
    // nextSlideArrow.addEventListener('click', () => {
    //     indexMain++;
    //     if (indexMain > slideImg.length) {
    //         indexMain = 1;
    //    }
    //     arrowIndex(indexMain);
    //     slideShow(indexMain);
        
    // });

    ////////////////////////////////////////////////////////
}

export default slider;