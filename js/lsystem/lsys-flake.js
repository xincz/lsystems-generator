let lsys1 = function (p) {
    var angle;
    var len = 120;
    var axiom = "F++F++F";
    var sentence = axiom;
    var genCount = 0;

    let genBtn = p.select("#gen-btn1");
    let clrBtn = p.select("#clr-btn1");

    var rules = [];
    rules[0] = {
        prev: "F",
        post: "F-F++F-F"
    }

    p.setup = function () {
        var canvas = p.createCanvas(500, 500);
        p.background('#282828');
        angle = p.radians(60);
        p.sketch();
        genBtn.mousePressed(p.nextGen);
        clrBtn.mousePressed(p.reset);
    }

    p.reset = function () {
        len = 120;
        sentence = axiom;
        genCount = 0;
        p.sketch();
    }

    p.nextGen = function () {
        genCount++;
        if (genCount > 3) {
            len /= 3;
        } else {
            len *= .5;

        }
        var nextSentence = "";
        for (var i = 0; i < sentence.length; i++) {
            var curr = sentence.charAt(i);
            var found = false;
            for (var j = 0; j < rules.length; j++) {
                if (curr == rules[j].prev) {
                    nextSentence += rules[j].post;
                    found = true;
                    break;
                }
            }
            if (!found) {
                nextSentence += curr;
            }
        }
        sentence = nextSentence;
        p.sketch();
    }

    p.sketch = function () {
        p.background(51);
        p.resetMatrix();
        p.translate(125, 50);
        p.stroke(255);
        p.rotate(p.radians(120));
        for (var i = 0; i < sentence.length; i++) {
            var current = sentence.charAt(i);
            if (current == "F") {
                p.line(0, 0, 0, -len);
                p.translate(0, -len);
            } else if (current == "+") {
                p.rotate(angle);
            } else if (current == "-") {
                p.rotate(-angle);
            } else if (current == "[") {
                p.push();
            } else if (current == "]") {
                p.pop();
            }
        }
    }
}

new p5(lsys1, 'lsys1');