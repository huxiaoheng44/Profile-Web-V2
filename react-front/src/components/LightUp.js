import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const LightUp = () => {
  const sceneRef = useRef(null);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Constraint = Matter.Constraint,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Events = Matter.Events;

    const engine = Engine.create();
    const world = engine.world;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "transparent",
      },
    });

    const leftBulb = Bodies.rectangle(window.innerWidth/4, -30, 50, 100, { 
      angle: Math.PI, // rotate the bulb
      render: {
        sprite: {
          texture: `${process.env.PUBLIC_URL}/resources/images/bulb.png`,
          xScale: 0.2,
          yScale: 0.2,
        },
      },
    });

    const rightSwitch = Bodies.trapezoid(
      window.innerWidth - 100,
      280,
      30,
      20,
      0.5,
      {
        render: {
          fillStyle: "white",
        },
      }
    );

    const leftWall = Bodies.rectangle(
      0,
      window.innerHeight / 2,
      40,
      window.innerHeight,
      {
        isStatic: true,
        render: {
          fillStyle: "transparent",
        },
      }
    );

    const rightWall = Bodies.rectangle(
      window.innerWidth,
      window.innerHeight / 2,
      40,
      window.innerHeight,
      {
        isStatic: true,
        render: {
          fillStyle: "transparent",
        },
      }
    );

    const bottomWall = Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight - 70,
      window.innerWidth,
      40,
      {
        isStatic: true,
        render: {
          fillStyle: "transparent",
        },
      }
    );

    // line connecting the bulb
    const leftLine = Constraint.create({
      pointA: { x: window.innerWidth/5, y: 0 }, 
      bodyB: leftBulb,
      pointB: { x: 0, y: -35 }, 
      stiffness: 1,
      render: {
        strokeStyle: "grey",
        lineWidth: 2,
      },
    });

    // line connecting the switch
    const rightLine = Constraint.create({
      pointA: { x:  window.innerWidth - 150, y: 0 },
      bodyB: rightSwitch,
      pointB: { x: 0, y: -12 },
      stiffness: 1,
      render: {
        strokeStyle: "grey",
        lineWidth: 2,
      },
    });

    // add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    // prevent the canvas from moving when scrolling
    let scrollTimeout;
    function handleScroll() {
      render.canvas.style.pointerEvents = "none";
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        render.canvas.style.pointerEvents = "auto";
      }, 200);
    }

    render.canvas.addEventListener("wheel", handleScroll);

    Composite.add(world, [
      leftBulb,
      rightSwitch,
      leftWall,
      rightWall,
      bottomWall,
      leftLine,
      rightLine,
      mouseConstraint,
    ]);

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    let bulbsDropped = false;
    Events.on(engine, "beforeUpdate", () => {
      const currentLength = Matter.Vector.magnitude({
        x: rightLine.bodyB.position.x - rightLine.pointA.x,
        y: rightLine.bodyB.position.y - rightLine.pointA.y,
      });

      if (!bulbsDropped && currentLength > 300) {
        bulbsDropped = true;
        dropBulbs();
        setTimeout(() => setShowHint(false), 2000); // Hide the hint after bulbs drop

        // add light effect style
        setTimeout(() => {
          const lighted = document.querySelectorAll(".lighted");
          lighted.forEach((element) => {
            element.style.boxShadow =
              "-8px 8px 8px 0px #374151, 8px -8px 8px 0px black";
          });

          const lightedTags = document.querySelectorAll(".lighted-tag");
          lightedTags.forEach((element) => {
            element.style.boxShadow =
              "-2px 2px 2px 0px #374151, 2px -2px 2px 0px black";
          });

          const lightedTitles = document.querySelectorAll(".lighted-title");
          lightedTitles.forEach((element) => {
            element.style.boxShadow =
              "-4px 4px 4px 0px #374151, 4px -4px 4px 0px black";
          });

          const bg = document.querySelector(".lighted-bg");
          const bg2 = document.querySelector(".lighted-bg2");

          // make sure the background animation is in sync with the light effect
          bg.style.background = "radial-gradient(ellipse 150vw 90vh at 10% 90%, #374151 0%, black 100%)";
          bg2.style.background = "radial-gradient(ellipse 150vw 90vh at 10% -10%, #374151 0%, black 100%)";

          const cover = document.querySelector(".lighted-cover");
          cover.style.opacity = "0";
        }, 2000);

        setTimeout(() => {
          const cover = document.querySelector(".lighted-cover");
          cover.style.display = "none";
        }, 3000);
      }
    });

    const bulbVertices = [
      // upper octagon
      { x: 0, y: -30 }, // scaled down by 0.5
      { x: 20, y: -20 }, 
      { x: 30, y: 0 }, 
      { x: 20, y: 20 }, 
      { x: 0, y: 30 }, 
      { x: -20, y: 20 }, 
      { x: -30, y: 0 }, 
      { x: -20, y: -20 }, 

      // lower rectangle
      { x: -10, y: 30 }, 
      { x: -10, y: 50 }, 
      { x: 10, y: 50 }, 
      { x: 10, y: 30 }, 
    ];

    // drop bulbs from the top
    const dropBulbs = () => {
      const totalBulbs = 10; // number of bulbs to drop

      for (let i = 0; i < totalBulbs; i++) {
        const delay = Math.random() * 2000;

        setTimeout(() => {
          const bulb = Bodies.fromVertices(
            (Math.random() * window.innerWidth) / 3,
            -100,
            bulbVertices,
            {
              render: {
                sprite: {
                  texture: `${process.env.PUBLIC_URL}/resources/images/bulb-2.png`,
                  xScale: 0.2,
                  yScale: 0.2,
                },
              },
            }
          );

          Matter.Body.setAngle(bulb, Math.PI * Math.random(2));
          Composite.add(world, bulb);
        }, delay);
      }
    };

    // Add hover event to rightSwitch
    const rightSwitchElement = document.querySelector(".right-switch");
    if (rightSwitchElement) {
      rightSwitchElement.addEventListener("mouseover", () => {
        const hintElement = document.querySelector(".drag-me-hint");
        if (hintElement) {
          hintElement.style.animationPlayState = "paused";
        }
      });
      rightSwitchElement.addEventListener("mouseout", () => {
        const hintElement = document.querySelector(".drag-me-hint");
        if (hintElement) {
          hintElement.style.animationPlayState = "running";
        }
      });
    }

    // Cleanup on component unmount
    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Composite.clear(engine.world, false); 
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
   };
  }, []);

  return (
    <div ref={sceneRef} className="w-full h-full">
      {showHint && (
        <div className="drag-me-hint text-3xl font-sans">
          Drag me
        </div>
      )}
    </div>
  );
};

export default LightUp;
