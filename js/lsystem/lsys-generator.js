let lsysGen = function (p) {
    var angle;
    var len = 120;
    var axiom = "X";
    var sentence = axiom;
    var autoLength = true;
    var iterations;
    var lsysObj;
    var lsysExNum;

    let lanBtn = p.select("#launch");
    let rstBtn = p.select("#reset");
    let posBtns = p.selectAll(".pos-btn");
    let lsysExs = p.selectAll(".lsys-ex");
    let lsysBox = p.select("#lsys-gen");
    let autoLengthToggler = p.select("#auto-length");

    let posSelected = "bottom-center";
    let posMouse = [0, 0];

    var rules = [];
    for (let i=0; i<5; i++) {
        rules[i] = {
            prev: "",
            post: ""
        };
    }

    p.setup = function () {
        p.createCanvas(600, 600);
        p.background(60);
        p.sketch();
        lanBtn.mousePressed(p.getValue);
        rstBtn.mousePressed(p.reset);
        for (let i = 0; i < posBtns.length; i++) {
            posBtns[i].mousePressed(function () {
                posSelected = posBtns[i].elt.id;
                console.log(posSelected);
            });
        }
        for (let j = 0; j < lsysExs.length; j++) {
            lsysExs[j].mousePressed(function () {
                lsysExNum = j;
                lsysObj = p.loadJSON("js/lsystem/pattern-data.json", p.updateLsys);
            });
        }
        lsysBox.mousePressed(function () {
            posSelected = "";
            posMouse = [p.mouseX, p.mouseY];
            console.log(p.mouseX, p.mouseY);
            p.getValue();
        });
        autoLengthToggler.mousePressed(function () {
            autoLength = !autoLength;
        });
    }

    p.keyPressed = function () {
        if (p.keyCode == p.ENTER) {
            p.getValue();
        }
    }

    p.updateLsys = function () {
        let lsysData = lsysObj.patterns[lsysExNum];
        p.select("#length").elt.value = len = lsysData.length;
        p.select("#angle").elt.value = angle = lsysData.angle;
        p.select("#axiom").elt.value = axiom = lsysData.axiom;
        p.select("#iterations").elt.value = iterations = lsysData.iterations;
        p.select("#rule1").elt.value = lsysData.rule1;
        p.select("#rule2").elt.value = lsysData.rule2;
        p.select("#rule3").elt.value = lsysData.rule3;
        p.select("#rule4").elt.value = lsysData.rule4;
        p.select("#rule5").elt.value = lsysData.rule5;
        [rules[0].prev, rules[0].post] = p.split(lsysData.rule1, "=");
        [rules[1].prev, rules[1].post] = p.split(lsysData.rule2, "=");
        [rules[2].prev, rules[2].post] = p.split(lsysData.rule3, "=");
        [rules[3].prev, rules[3].post] = p.split(lsysData.rule4, "=");
        [rules[4].prev, rules[4].post] = p.split(lsysData.rule5, "=");
        posSelected = lsysData.posSelected;
        console.log(posSelected);
        posMouse = lsysData.posMouse;
        if (autoLength != lsysData.auto) {
            p.select("#auto-length").toggleClass("auto-length-select");
            autoLength = lsysData.auto;
        }

        p.getValue();
    }

    p.setPosition = function () {
        if (posSelected == "top-left") {
            p.translate(0, 0);
        } else if (posSelected == "top-center") {
            p.translate(p.width / 2, 0);
        } else if (posSelected == "top-right") {
            p.translate(p.width, 0);
        } else if (posSelected == "center-left") {
            p.translate(0, p.height / 2);
        } else if (posSelected == "center-center") {
            p.translate(p.width / 2, p.height / 2);
        } else if (posSelected == "center-right") {
            p.translate(p.width, p.height / 2);
        } else if (posSelected == "bottom-left") {
            p.translate(0, p.height);
        } else if (posSelected == "bottom-center") {
            p.translate(p.width / 2, p.height);
        } else if (posSelected == "bottom-right") {
            p.translate(p.width, p.height);
        } else {
            p.translate(posMouse[0], posMouse[1]);
        }
    }

    p.getValue = function () {
        p.reset();
        len = p.select("#length").value();
        angle = p.radians(p.select("#angle").value());
        axiom = p.select("#axiom").value();
        iterations = p.select("#iterations").value();

        [rules[0].prev, rules[0].post] = p.split(p.select("#rule1").value(), "=");
        [rules[1].prev, rules[1].post] = p.split(p.select("#rule2").value(), "=");
        [rules[2].prev, rules[2].post] = p.split(p.select("#rule3").value(), "=");
        [rules[3].prev, rules[3].post] = p.split(p.select("#rule4").value(), "=");
        [rules[4].prev, rules[4].post] = p.split(p.select("#rule5").value(), "=");

        for (let i = 0; i < iterations; i++) {
            p.nextGen();
        }
    }

    p.reset = function () {
        len = 0;
        sentence = axiom;
        genCount = 0;
        p.sketch();
    }

    p.nextGen = function () {
        if (autoLength) {
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
        p.resetMatrix();
        p.background(51);
        p.setPosition();
        p.stroke(255);
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

new p5(lsysGen, 'lsys-gen');

$(function () {
    $("#auto-length").click(function () {
        $("#auto-length").toggleClass("auto-length-select");
    });

    $("#launch"),click(() => {
        $("#launch").css({
            'background-color': '#fff',
        });
        $(this).stop().animate({
            'background-color': '#6A5ACD'
        }, 100);
    });
})