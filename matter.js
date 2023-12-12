const matterContainer = document.querySelector("#matter-container");
const THICCNESS = 60;

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    //element: document.body,
    element: matterContainer,
    engine: engine,
    options: {
        width: matterContainer.clientWidth,
        height: document.body.clientHeight,
        background: "transparent",
        //wireframes: true,
        wireframes: false,
        showAngleIndicator: true
    }
});

//mouse
let mouse = Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            //visible: true,
            visible: false,
        }
    }
});

Composite.add(engine.world, mouseConstraint);

// create two boxes and a ground
//var boxA = Bodies.rectangle(400, 200, 80, 80);
//var boxA = Bodies.rectangle(100, 100, 160, 160, {isStatic: true});
//var circle = Bodies.circle(440, 30, 50);
//console.log(matterContainer.clientWidth);
//console.log(matterContainer.clientHeight);
let circle = Bodies.circle(matterContainer.clientWidth / 2, 
    matterContainer.clientHeight / 2,
    30, {
    friction: 0.3,
    frictionAir: 0.00001,
    restitution: 0.8,
});
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(matterContainer.clientWidth / 2,
    matterContainer.clientHeight + THICCNESS / 2,
    matterContainer.clientWidth, THICCNESS, { isStatic: true });

var sky = Bodies.rectangle(matterContainer.clientWidth / 2,
    (THICCNESS / 2) - THICCNESS,
    matterContainer.clientWidth, THICCNESS, { isStatic: true });


//wall
let left = Bodies.rectangle(
    (THICCNESS / 2) - THICCNESS,
    matterContainer.clientHeight / 2,
    THICCNESS,
    matterContainer.clientHeight,
    { isStatic: true }
);

let right = Bodies.rectangle(
    matterContainer.clientWidth + THICCNESS / 2,
    matterContainer.clientHeight / 2,
    THICCNESS,
    matterContainer.clientHeight * 5,
    { isStatic: true }
);

for (let i = 0; i < 100; i++) {
    //let obj = Bodies.circle(i, 10, 30, {
    //    friction: 0.3,
    //    frictionAir: 0.00001,
    //    restitution: 0.8,
    //});
    let circle = Bodies.circle(matterContainer.clientWidth / 2, 
        matterContainer.clientHeight / 2,
        30, {
        friction: 0.3,
        frictionAir: 0.00001,
        restitution: 0.8,
    });
    Composite.add(engine.world, circle);
}


// add all of the bodies to the world
//Composite.add(engine.world, [boxA, boxB, ground]);
Composite.add(engine.world, [circle, boxB, left, right, sky, ground]);
//Composite.add(engine.world, mouseConstraint);

// run the renderer
Render.run(render);
//Engine.update(engine, 1.99);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

function handleResize(container) {
    render.canvas.width = matterContainer.clientWidth;
    render.canvas.height = matterContainer.clientHeight;

    Matter.Body.setPosition(
        ground,
        Matter.Vector.create(
            matterContainer.clientWidth / 2,
            matterContainer.clientHeight + THICCNESS / 2,
            27184
        )
    );

    Matter.Body.setPosition(
        right,
        Matter.Vector.create(
            matterContainer.clientHeight + THICCNESS / 2,
            matterContainer.clientWidth / 2,
            //27184
        )
    );
}

window.addEventListener("resize", () => handleResize(matterContainer));
