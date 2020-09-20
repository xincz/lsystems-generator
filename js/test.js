window.addEventListener('load', function () {
    var body = this.document.querySelector('body');

    document.addEventListener('click', function (e) {
        console.log(e.clientX + ' ' + e.clientY);
    })
})