const products = [
    { id: 1, title: 'Notebook', price: 2000, img: 'img/1.jpg' },
    { id: 2, title: 'Mouse', price: 20, img: 'img/2.png' },
    { id: 3, title: 'Keyboard', price: 200, img: 'img/1.jpg' },
    { id: 4, title: 'Gamepad', price: 50, img: 'img/2.png' },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (obj) => {
    return `<div class="product-item">
    <img class="item-pic" src="${obj.img}" alt="photo">
                <h3>${obj.title}</h3>
                <p>${obj.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item)).join('');
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList;
};


renderPage(products);