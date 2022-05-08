import { getResource } from "../services/services";

function cards() {
    const menuField = document.querySelector('.menu__field');

    class Card {
        constructor(img, imgAlt, title, text, price, parentSelector, ...classes) {
            this.img = img;
            this.imgAlt = imgAlt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.transfer = 27;
            this.classes = classes;
            this.changeToUAH();
            this.parent = document.querySelector(parentSelector);
        }
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        createCard() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
        
                    <img src="${this.img}" alt="${this.imgAlt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.text}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>

            `;
            this.parent.append(element);
        }
    }


    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new Card(img, altimg, title, descr, price, '.menu .container').createCard();
            });
    });

    // axios.get('http://localhost:3000/menu')
    // .then(data => {
    //             data.data.forEach(({img, altimg, title, descr, price}) => {
    //                 new Card(img, altimg, title, descr, price, '.menu .container').createCard();
    //             });
    //     });
}

export default cards;