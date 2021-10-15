var even, ok;
var answers = [];
do {
    ok = false;
    even = +prompt(works.a00 + works.a1 + works.a2 + '-1 - Выход из игры');
    if (even == -1) {
        break;
    } else {
        ok = isAnswer(works.a0, even);
        answers.push([works.a0, even]);
    }
} while (!ok);

switch (even) {
    case 1:
        do {
            ok = false;
            even = +prompt(works.b00 + works.b1 + works.b2 + '-1 - Выход из игры');
            if (even == -1) {
                break;
            } else {
                ok = isAnswer(works.b0, even);
                answers.push([works.b0, even]);
            }
        } while (!ok);

        switch (even) {
            case 1:
            case 2:
                do {
                    ok = false;
                    even = +prompt(works.d00 + works.d1 + works.d2 + '-1 - Выход из игры');
                    if (even == -1) {
                        break;
                    } else {
                        ok = isAnswer(works.d0, even);
                        answers.push([works.d0, even]);
                    }
                } while (!ok);
                break;
            case 1:
                break;
            default:
                alert('Ошибка');
        }
        break;
    case 2:
        do {
            ok = false;
            even = +prompt(works.c00 + works.c1 + works.c2 + '-1 - Выход из игры');
            if (even == -1) {
                break;
            } else {
                ok = isAnswer(works.c0, even);
                answers.push([works.c0, even]);
            }
        } while (!ok);
        switch (even) {
            case 1:
            case 2:
                do {//Выводим первый вопрос
                    ok = false;
                    even = +prompt(works.d00 + works.d1 + works.d2 + '-1 - Выход из игры');
                    if (even == -1) {
                        break;
                    } else {
                        ok = isAnswer(works.b0, even);
                        answers.push([works.b0, even]);
                    }
                } while (!ok);
                break;
            case 1:
                break;
            default:
                alert('Ошибка');
        }
        break;
    case 1:
        break;
    default:
        alert('Ошибка');
}
alert('Спасибо за игру');
console.log(answers);
var step = +prompt('Введите номер хода');
console.log(step);
var stepsHistory = "В ходе № " + step + " " + "Ваш выбор " + answers[step - 1][1];
alert(stepsHistory);



function isAnswer(q, even) {
    if (isNaN(even) || !isFinite(even)) {
        alert('Вы ввели недопустимый символ');
        return false;
    }
    else if (even < 1 || even > q) {
        alert('Ваше число выходит из допустимого диапазона');
        return false;
    }
    return true;
}
