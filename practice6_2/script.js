var Red = {
    price: 0,
    count: 0,
    summa: 0
}
var Green = {
    price: 0,
    count: 0,
    summa: 0
}
var Honey = {
    price: 0,
    count: 0,
    summa: 0
}
function f(id) {



    var d = document.getElementById(id);
    var ol = document.getElementById('spis');
    var li = document.getElementById("li_" + id);

    if (li != null) {
        switch (id) {
            case 'red':
                Red.count = parseInt(li.innerHTML.split(' ')[1]) + 1;
                break;
            case 'green':
                Green.count = parseInt(li.innerHTML.split(' ')[1]) + 1;
                break;
            case 'honey':
                Honey.count = parseInt(li.innerHTML.split(' ')[1]) + 1;
                break;
        }
    } else {
        switch (id) {
            case 'red':
                newLi = document.createElement('li');
                newLi.innerHTML = 'Red: 1';
                newLi.id = 'li_red';
                ol.appendChild(newLi);
                Red.count = 1;
                break;
            case 'green':
                newLi = document.createElement('li');
                newLi.innerHTML = 'Green: 1';
                newLi.id = 'li_green';
                ol.appendChild(newLi);
                Green.count = 1;
                break;
            case 'honey':
                newLi = document.createElement('li');
                newLi.innerHTML = 'Honey: 1';
                newLi.id = 'li_honey';
                ol.appendChild(newLi);
                Honey.count = 1;
                break;
        }
    }



    switch (id) {
        case 'red':
            Red.price = d.getElementsByTagName('p')[0].innerHTML;
            Red.summa = Red.count * Red.price;
            break;
        case 'green':
            Green.price = d.getElementsByTagName('p')[0].innerHTML;
            Green.summa = Green.count * Green.price;
            break;
        case 'honey':
            Honey.price = d.getElementsByTagName('p')[0].innerHTML;
            Honey.summa = Honey.count * Honey.price;
            break;
    }

    if (li != null) {
        switch (id) {
            case 'red':
                li.innerHTML = "Red: " + Red.count + " шт. по цене " + Red.price + " на сумму " + Red.summa;
                break;
            case 'green':
                li.innerHTML = "Green: " + Green.count + " шт. по цене " + Green.price + " на сумму " + Green.summa;
                break;
            case 'honey':
                li.innerHTML = "Honey: " + Honey.count + " шт. по цене " + Honey.price + " на сумму " + Honey.summa;
                break;
        }
    } else {
        switch (id) {
            case 'red':
                newLi.innerHTML = "Red: " + Red.count + " шт. по цене " + Red.price + " на сумму " + Red.summa;
                break;
            case 'green':
                newLi.innerHTML = "Green: " + Green.count + " шт. по цене " + Green.price + " на сумму " + Green.summa;
                break;
            case 'honey':
                newLi.innerHTML = "Honey: " + Honey.count + " шт. по цене " + Honey.price + " на сумму " + Honey.summa;
                break;
        }

    }

    var ii = document.getElementById('itog');
    if (ii != null) {
        ii.parentNode.removeChild(ii);
    }


    var itog = document.createElement('li');
    itog.id = 'itog';

    ol.appendChild(itog);
    var ss = Red.summa + Green.summa + Honey.summa;
    itog.innerHTML = "Всего:" + ss;


}