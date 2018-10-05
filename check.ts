interface Square {
    _kind: "square";
    size: number;
}

interface Rectangle {
    _kind: "rectangle";
    width: number;
    height: number;
}

interface Circle {
    _kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape): number {
    switch (s._kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}

let obj: Shape = {
    "_kind": "square",
    "size": 1
}

console.log(area(obj));
