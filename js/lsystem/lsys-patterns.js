{
    "length" = 120,
    "angle" = 30,
    "axiom" = "X",
    "iterations" = 7,
    "rule1" = "F=FF",
    "rule2" = "X=F[+X]FF[-X][-F]+FX",
    "rule3" = ""
}

let simpleTree2 = {
    length = 120,
    angle = 30,
    axiom = "X",
    iterations = 7,
    rule1 = "F=FF",
    rule2 = "X=F[+X]FF[-X][-F]+FX",
    rule3 = ""
}

let simpleTree3 = {
    length = 210,
    angle = 30,
    axiom = "X",
    iterations = 7,
    rule1 = "F=FF",
    rule2 = "X=F-[[X]+X]+F[+FX]-X",
    rule3 = ""
}

let dragon = {
    length = 5,
    angle = 90,
    axiom = "FX",
    iterations = 12,
    rule1 = "X=X+YF",
    rule2 = "Y=FX-Y",
    rule3 = ""
}