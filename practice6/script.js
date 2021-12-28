function f(id) {
    var s = document.getElementById(id);
    var p = s.src.replace('small', 'big');
    console.log(p);


    var b = document.getElementById("big");
    b.src = p;

}

function ImageError() {
    alert('нет большой картинки');
}