//замыкание - это функция, в которой мы возвращаем в качестве значения другую функцию и при этом сохраняется промежуточный результат-->

function calc(a) {
    return function (b) {
        console.log(a + b);
    }
}

var addNumberOne = calc(1);
addNumberOne(10);
addNumberOne(20);
addNumberOne(30);

var addNumberOne = calc(10);
addNumberOne(10);
addNumberOne(20);
addNumberOne(30);