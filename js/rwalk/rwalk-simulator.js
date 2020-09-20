let direction = [0, 0];
let accumulate = [0, 0];
let dist = 0;
let flag = false;

function directionUpdate(newDirection) {
    direction = [newDirection.x, newDirection.y];
    accumulate = [accumulate[0] + newDirection.x, accumulate[1] + newDirection.y];
    dist = Math.sqrt(accumulate[0]*accumulate[0] + accumulate[1]*accumulate[1]);
    flag = true;
}

let rwalk = (p) => {
    let len = 10;
    let pos = p.createVector(0, 0);
    let arrowSize = 1;
    let v1;

    p.setup = () => {
        p.createCanvas(900, 600);
        p.stroke(255);
        p.background(28);
        p.translate(p.width / 2, p.height / 2);
        p.frameRate(28);
    }

    p.sketch = () => {
        v1 = p5.Vector.random2D();
        direction = v1;
        p.translate(p.width / 2, p.height / 2);
        p.walk(pos, v1.mult(len), 'hsb(200, 100, 190)');
        pos.add(v1);
        directionUpdate(v1);
    }

    p.walk = (base, vec, myColor) => {
        p.push();
        p.stroke(myColor);
        p.strokeWeight(1);
        p.fill(myColor);
        p.translate(base.x, base.y);
        p.line(0, 0, vec.x, vec.y);
        p.rotate(vec.heading());
        p.translate(vec.mag() - arrowSize, 0);
        p.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        p.pop();
    }

    p.draw = () => {
        p.sketch();
    }
}

new p5(rwalk, 'rwalk-sim');

let rwalkFreq = (p) => {
    p.setup = () => {
        p.createCanvas(260, 550);
        p.stroke(255);
        p.background(28);
        p.translate(p.width / 2, p.height / 2);
    }

    while (flag) {
        p.sketch();
        flag = false;
    }

    p.sketch = () => {
        p.fill(200, 10, 230, 0.40);
        p.ellipse(0, 0, 70, 52);
    }
}

new p5(rwalkFreq, 'rwalk-freq');


function getData() {
    return Math.random();
}

// Display position data generated through time
var chart = document.getElementById("rw-distChart");
Plotly.plot(chart, [{
    y: [dist],
    type: "line",
    // layout: go.Layout(
    //     paper_bgcolor='rgba(0,0,0,0)',
    //     plot_bgcolor='rgba(0,0,0,0)'
    // )
}]);

var count = 0;

setInterval(() => {
    Plotly.extendTraces(chart, {y: [[dist]]}, [0]);
    count++;
    if (count>100) {
        Plotly.relayout(chart, {
            xaxis: {
                range: [count-100, count]
            }
        });
    }
}, 100);

var layout = {
    showlegend: false,

};