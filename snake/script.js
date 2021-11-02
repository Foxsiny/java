// Глобальные переменные:                            
var FIELD_SIZE_X = 20;//строки
var FIELD_SIZE_Y = 20;//столбц
var SNAKE_SPEED = 100; // Интервал между перемещениями змейки
var snake = []; // Сама змейка
var direction = 'y+'; // Направление движения змейки
var gameIsRunning = false; // Запущена ли игра
var snake_timer; // Таймер змейки
var food_timer; // Таймер для еды
var problem_timer; //Таймер для бомбочки
var score = 0; // Результат



function init() {
    prepareGameField(); // Генерация поля

    var wrap = document.getElementsByClassName('wrap')[0];
    // Подгоняем размер контейнера под игровое поле

    wrap.style.width = '400px';
    // События кнопок Старт и Новая игра
    document.getElementById('snake-start').addEventListener('click', startGame);
    document.getElementById('snake-renew').addEventListener('click', refreshGame);

    // Отслеживание клавиш клавиатуры
    addEventListener('keydown', changeDirection);
}


/**
 * Функция генерации игрового поля
 */
function prepareGameField() {
    // Создаём таблицу
    var game_table = document.createElement('table');
    game_table.setAttribute('class', 'game-table');

    // Генерация ячеек игровой таблицы
    for (var i = 0; i < FIELD_SIZE_X; i++) {
        // Создание строки
        var row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;

        for (var j = 0; j < FIELD_SIZE_Y; j++) {
            // Создание ячейки
            var cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;

            row.appendChild(cell); // Добавление ячейки
        }
        game_table.appendChild(row); // Добавление строки
    }

    document.getElementById('snake-field').appendChild(game_table); // Добавление таблицы
}


/**
 * Старт игры
 */
function startGame() {
    if (!gameIsRunning) {
        gameIsRunning = true;
        respawn();
        snake_timer = setInterval(move, SNAKE_SPEED);
        setTimeout(createFood, 5000);
        setTimeout(createProblem, 5000);
    }
}



/**
 * Функция расположения змейки на игровом поле
 */
function respawn() {
    // Змейка - массив td
    // Стартовая длина змейки = 2

    // Respawn змейки из центра
    var start_coord_x = Math.floor(FIELD_SIZE_X / 2);
    var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);

    // Хвост змейки
    //var snake_tail = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
    //snake_tail.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit');
    // Голова змейки
    var snake_head = document.getElementsByClassName('cell-' + (start_coord_y - 1) + '-' + start_coord_x)[0];
    snake_head.setAttribute('class', snake_head.getAttribute('class') + ' snake-unit');

    var snake_tail = document.getElementsByClassName('cell-' + (start_coord_y - 1) + '-' + start_coord_x)[0];
    snake_tail.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit');

    snake.push(snake_tail);
    snake.push(snake_head);

}



/**
 * Движение змейки
 */
function move() {
    //console.log('move',direction);
    // Сборка классов
    var snake_head_classes = snake[snake.length - 1].getAttribute('class').split(' ');

    // Сдвиг головы
    var new_unit;
    var snake_coords = snake_head_classes[1].split('-');//преобразовали строку в массив
    var coord_y = parseInt(snake_coords[1]);
    var coord_x = parseInt(snake_coords[2]);

    // Определяем новую точку
    if (direction == 'x-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0];
    }
    else if (direction == 'x+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0];
    }
    else if (direction == 'y+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + '-' + (coord_x))[0];
    }
    else if (direction == 'y-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + '-' + (coord_x))[0];
    }

    // Проверки
    // 1) new_unit не часть змейки
    // 2) Змейка не ушла за границу поля
    //console.log(new_unit);
    //Если новая ячейка не является частью змейки(функция isSnakeUnit на вход принимае наш нашу ячейку в которую мы хотим переместить голову змейки)
    // и если змейка ушла за границы экрана

    if (!isSnakeUnit(new_unit) && pathClear(new_unit)) {//new_unit !== undefined) {//два варианта выхода из игры
        // Добавление новой части змейки
        new_unit.setAttribute('class', new_unit.getAttribute('class') + ' snake-unit');//если все хорошо, то добавляем ячейке новы класс snake-unit
        //new_unit.classList.add('snake-unit');// другая возможность добавления класса
        snake.push(new_unit);//добавляем ячейку в массив(голова змейки будет последним элементом массива)

        // Проверяем, надо ли убрать хвост(без этой части хвост остается на месте, а змейк увеличивается от головы)
        //Производим удаление последней ячейки
        if (!haveFood(new_unit)) {//если новая ячейка не является кормом для змейки, то нужно последнюю ячейку удалять
            // Находим хвост
            let removed = snake.splice(0, 1)[0];//убираем из массива snake хвост, это первый элемент массива и обращаемся к элементу массива removed
            let classes = removed.getAttribute('class').split(' ');//чтобы убрать классы ипреобразовать в массив, будет 3 класса два стандартных и 1 то что это змейка

            // удаляем хвост
            removed.setAttribute('class', classes[0] + ' ' + classes[1]);//берем полученную ячейку removed и удаляем класс змейка
            //removed.classList.remove("snake-unit");//строку var removed = snake.splice(0, 1)[0]; не удалять
            //new_unit.classList.remove("snake-unit");// и удалить все строки в условии if
        }
    }
    else {
        finishTheGame();

    }
}

/**
 * Проверка на змейку
 * @param unit
 * @returns {boolean}
 */
function isSnakeUnit(unit) {
    var check = false;

    if (snake.includes(unit) && path) {
        check = true;
    }
    return check;
}

/**
 * проверка на еду
 * @param unit
 * @returns {boolean}
 */
function haveFood(unit) {
    let scorePoint = document.querySelector('.score-point');
    let check = false;//считаем, что это не еда для змейки

    let unit_classes = unit.getAttribute('class').split(' ');//получаем все классы и преобразуем в массив

    // Если еда
    if (unit_classes.includes('food-unit')) {
        check = true;
        createFood();
        score++;
        points.innerHTML = score;
    }
    return check;
}

/**
 * Функция проверки, не врезались ли мы в преграду
 * @param unit
 */
function pathClear(unit) {
    var check = false;

    var unit_classes = unit.getAttribute('class').split(' ');
    if (!unit_classes.includes('problem-unit')) {
        check = true;
    }
    return check;
}



/**
 * Создание еды
 */
function createFood() {
    var foodCreated = false;

    while (!foodCreated) { //пока еду не создали
        // рандом
        var food_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);

        var food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];
        var food_cell_classes = food_cell.getAttribute('class').split(' ');

        // проверка на змейку
        if (!food_cell_classes.includes('snake-unit')) {// если в этой случайной ячейке нет класса snake-unit, значит наша рандомная ячейка не попала в змейку
            var classes = '';//то нам подходит эта ячейка
            for (var i = 0; i < food_cell_classes.length; i++) {
                classes += food_cell_classes[i] + ' ';
            }

            food_cell.setAttribute('class', classes + 'food-unit');
            //food_cell.classList.add('food-unit');//этой строкой можно заменить все фигурных скобках if
            foodCreated = true;
        }
    }
}



/**
 * Создание бомбочек
 */

function createProblem() {
    var problemCreated = false;//считаем, что корм не созда и пока он не создан

    while (!problemCreated) { //пока еду не создали// пытаемся его создать
        // рандом
        var problem_x = Math.floor(Math.random() * FIELD_SIZE_X);//получаем две рандомные координаты
        var problem_y = Math.floor(Math.random() * FIELD_SIZE_Y);

        var problem_cell = document.getElementsByClassName('cell-' + problem_y + '-' + problem_x)[0];//по ним находим ячейку у этой ячейки берем все классы
        var problem_cell_classes = problem_cell.getAttribute('class').split(' ');//и преабразуим все классы в массив нашей случайной ячейки

        // проверка на змейку
        if (!problem_cell_classes.includes('snake-unit') && !problem_cell_classes.includes('food-unit')) {// если в этой случайной ячейке нет класса snake-unit, значит наша рандомная ячейка не попала в змейку
            //var classes = '';//то нам подходит эта ячейка
            //for (var i = 0; i < food_cell_classes.length; i++) {
            // classes += problem_cell_classes[i] + ' ';
            //}

            //problem_cell.setAttribute('class', classes + 'problem-unit');
            //food_cell.classList.add('food-unit');//этой строкой можно заменить все фигурных скобках if
            problem_cell.classList.add('problem-unit');
            problemCreated = true;
        }
    }
}




/**
 * Изменение направления движения змейки
 * @param e - событие
 */
function changeDirection(e) {
    console.log(e);
    switch (e.keyCode) {
        case 37: // Клавиша влево
            if (direction != 'x+') {
                direction = 'x-'
            }
            break;
        case 38: // Клавиша вверх
            if (direction != 'y-') {
                direction = 'y+'
            }
            break;
        case 39: // Клавиша вправо
            if (direction != 'x-') {
                direction = 'x+'
            }
            break;
        case 40: // Клавиша вниз
            if (direction != 'y+') {
                direction = 'y-'
            }
            break;
    }
}


/**
 * Функция завершения игры
 */
function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    alert('Вы проиграли! Ваш результат: ' + score.toString());
}

/**
 * Новая игра
 */
function refreshGame() {
    location.reload();
}

// Инициализация
window.onload = init;
