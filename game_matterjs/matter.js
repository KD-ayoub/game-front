const matterContainer = document.querySelector("#matter-container");
//console.log(matterContainer.clientWidth);
//console.log(matterContainer.clientHeight);
const THICCNESS = 2000;

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();
let world = engine.world;
world.gravity.y = 0.5;

// create a renderer
const renderWidth = matterContainer.clientWidth - (matterContainer.clientWidth / 3);
const renderHeight = document.body.clientHeight - (document.body.clientHeight / 4);
let render = Render.create({
    element: matterContainer,
    engine: engine,
    options: {
        width: renderWidth,
        height: renderHeight,
        background: "#E95A3A",
        wireframes: false,
        showAngleIndicator: true
    }
});

//palette
let upPalette = Bodies.rectangle(
    110,
    15,
    200,
    20,
    {
        isStatic: true,
        render: {
            fillStyle: '#ffffff'
        }
    });

let downPalette = Bodies.rectangle(
    renderWidth - 110,
    renderHeight - 15,
    200,
    20,
    {
        isStatic: true,
        render: {
            fillStyle: '#ffffff'
        }
    });
Composite.add(engine.world, [upPalette, downPalette]);

//ball
let ball = Bodies.circle(matterContainer.clientWidth / 2, 
    matterContainer.clientHeight / 2,
    20, {
    friction: 0.3,
    frictionAir: 0.00001,
    //restitution: 0.8,
    restitution: 1,
    render: {
        fillStyle: '#ffffff'
    }
});
Composite.add(engine.world, ball);

//mouse
let mouse = Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false,
        }
    }
});
Composite.add(engine.world, mouseConstraint);

//Walls
let ground = Bodies.rectangle(renderWidth / 2,
    renderHeight + (THICCNESS / 2),
    renderWidth, THICCNESS,
    {
        isStatic: true,
        render: {
            fillStyle: '#ffffff'
        }
    });

let ceiling = Bodies.rectangle(renderWidth / 2,
    (THICCNESS / 2) - THICCNESS,
    renderWidth, THICCNESS,
    {
        isStatic: true,
        render: {
            fillStyle: '#ffffff'
        }
    });

let left = Bodies.rectangle(
    (THICCNESS / 2) - THICCNESS,
    renderHeight / 2,
    THICCNESS,
    renderHeight,
    {
        isStatic: true,
        render: {
            fillStyle: '#ffffff'
        }
    }
);

let right = Bodies.rectangle(
    renderWidth + THICCNESS / 2,
    renderHeight / 2,
    THICCNESS,
    renderHeight,
    {
        isStatic: true,
        render: {
            fillStyle: '#ffffff'
        }
    }
);

Composite.add(engine.world, [left, right, ceiling, ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

//maybe two keydown and keyup
function roundToDecimal(number, decimalPlaces) {
    var factor = Math.pow(10, decimalPlaces);
    return Math.round(number * factor) / factor;
}

document.addEventListener("keydown", (event) => {
    //here make a listeners and trigger them
    const downX = downPalette.position.x;
    const upX = upPalette.position.x;
    switch (event.code) {
        //ceilling palette
        case 'KeyA':
            if (upX !== 110)
                Body.translate(upPalette, {x: -10, y: 0});
            break ;
        case 'KeyD':
            if (upX <= (renderWidth - 110))
                Body.translate(upPalette, {x: 10, y: 0});
            break ;
        //ground palette
        case 'ArrowRight':
            if (downX !== (renderWidth - 110))
                Body.translate(downPalette, {x: 10, y: 0});
            break ;
        case 'ArrowLeft':
            if (downX >= 110)
                Body.translate(downPalette, {x: -10, y: 0});
            break ;
    }
})

//shiit
//function handleResize(container) {
//    render.canvas.width = matterContainer.clientWidth;
//    render.canvas.height = matterContainer.clientHeight;
//
//    Matter.Body.setPosition(
//        ground,
//        Matter.Vector.create(
//            matterContainer.clientWidth / 2,
//            matterContainer.clientHeight + THICCNESS / 2,
//            27184
//        )
//    );
//
//    Matter.Body.setPosition(
//        right,
//        Matter.Vector.create(
//            matterContainer.clientHeight + THICCNESS / 2,
//            matterContainer.clientWidth / 2,
//            //27184
//        )
//    );
//}
//
//window.addEventListener("resize", () => handleResize(matterContainer));
