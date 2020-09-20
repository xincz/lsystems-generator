let triTurtle = function (p) {
    let len;
    var counter = 0;
    var colorCount = 0;
    let triButton = p.select("#tri");

    p.setup = function () {
        p.sketch();
        setInterval(p.move, 28);
        triButton.mousePressed(p.resetSketch);
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
            len += 3;
            counter = 0;
        };
        p.colorChange();
        p.line(0, 0, 0, -len);
        p.translate(0, -len);
        p.rotate(p.radians(121.3));
        counter++;
    }

    p.colorChange = function () {
        if (colorCount % 3 == 0) {
            p.stroke(221, 55, 144);
        } else if (colorCount % 3 == 1) {
            p.stroke(144, 221, 55);
        } else if (colorCount % 3 == 2) {
            p.stroke(55, 144, 221);
        }
        colorCount++;
    }
};
new p5(triTurtle, 'tri-turtle');