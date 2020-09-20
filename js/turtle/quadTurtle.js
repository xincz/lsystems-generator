let quadTurtle = function (p) {
    let len;
    var counter = 0;
    var colorCount = 0;
    let quadButton = p.select("#quad");

    p.setup = function () {
        p.sketch();
        setInterval(p.move, 28);
        quadButton.mousePressed(p.resetSketch);
    }

    p.sketch = function () {
        p.createCanvas(500, 500);
        p.background(28);
        len = 5;
        p.translate(p.width / 2, p.height / 2);
    }

    p.resetSketch = function () {
        p.clear();
        p.sketch();
        counter = 0;
        colorCount = 0;
        stop().setInterval(p.move, 28);
    }

    p.move = function () {
        if (counter == 1) {
            len += 2;
            counter = 0;
        };
        p.colorChange();
        p.line(0, 0, 0, -len);
        p.translate(0, -len);
        p.rotate(p.radians(91));
        counter++;
    }

    p.colorChange = function () {
        if (colorCount % 4 == 0) {
            p.stroke(221, 55, 144);
        } else if (colorCount % 4 == 1) {
            p.stroke(144, 221, 199);
        } else if (colorCount % 4 == 2) {
            p.stroke(221, 99, 199);
        } else if (colorCount % 4 == 3) {
            p.stroke(55, 144, 199);
        }
        colorCount++;
    }
}
new p5(quadTurtle, 'quad-turtle');