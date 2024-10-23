import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

const Hobby = ({
  setAddBasketBallToWorld,
  setActivateRacket,
  setActivatePingPang,
}) => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const worldRef = useRef(null);
  const basketBallRef = useRef(null); // Reference for the basketBall
  const racketRef = useRef(null); // Reference for the racket
  const pingPangRef = useRef(null); // Reference for the pingPang

  useEffect(() => {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Events = Matter.Events;

    // Create engine and world
    const engine = Engine.create();
    engineRef.current = engine; // Save engine reference
    const world = engine.world;
    worldRef.current = world; // Save world reference

    // Create renderer
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

    const tableVertices = [
      { x: 0, y: 300 },
      { x: 600, y: 300 },
      { x: 600, y: 150 },
      { x: 305, y: 150 },
      { x: 295, y: 150 },
      { x: 0, y: 150 },
    ];

    const net = Bodies.rectangle(
      170 + 300 * 0.25,
      window.innerHeight - 150 - 75,
      10,
      50,
      {
        isStatic: true,
        render: {
          fillStyle: "#d9d9d9",
        },
      }
    );

    const table = Bodies.fromVertices(
      250,
      window.innerHeight - 150,
      tableVertices,
      {
        isStatic: true,
        render: {
          sprite: {
            texture: `${process.env.PUBLIC_URL}/resources/hobby/table.png`,
            xScale: 0.25,
            yScale: 0.25,
          },
          fillStyle: "grey",
          strokeStyle: "red",
          lineWidth: 2,
        },
      },
      true
    );

    const racketVertices = [
      { x: 0, y: 70 },
      { x: 100, y: 10 },
      { x: 110, y: -10 },
      { x: 60, y: -10 },
      { x: 60, y: 60 },
    ];

    // Initialize racket as static
    const racket = Bodies.fromVertices(
      window.innerWidth / 2,
      window.innerHeight - 300,
      racketVertices,
      {
        isStatic: false, // Initially static
        frictionAir: 0,
        mass: 0,
        inertia: Infinity,
        render: {
          sprite: {
            texture: `${process.env.PUBLIC_URL}/resources/hobby/racket.png`,
            xScale: 0.4,
            yScale: 0.4,
          },
          fillStyle: "grey",
          strokeStyle: "blue",
          lineWidth: 2,
        },
      },
      true
    );
    racketRef.current = racket; // Save reference

    const leftWall = Bodies.rectangle(
      -10,
      window.innerHeight / 2,
      20,
      window.innerHeight,
      {
        isStatic: true,
        render: {
          fillStyle: "black",
        },
      }
    );

    const rightWall = Bodies.rectangle(
      window.innerWidth + 10,
      window.innerHeight / 2,
      10,
      window.innerHeight,
      {
        isStatic: true,
        render: {
          fillStyle: "black",
        },
      }
    );

    const hoop = Bodies.rectangle(window.innerWidth - 50, 200, 90, 250, {
      isStatic: true,
      render: {
        sprite: {
          texture: `${process.env.PUBLIC_URL}/resources/hobby/hoop.png`,
          xScale: 0.3,
          yScale: 0.3,
          xOffset: 0.3,
        },
        fillStyle: "blue",
      },
    });

    const hoop_2 = Bodies.rectangle(window.innerWidth - 230, 280, 20, 100, {
      isStatic: true,
      render: {
        fillStyle: "rgba(0, 0, 255, 0)", // Transparent
      },
    });

    const rightFloor = Bodies.rectangle(
      window.innerWidth - 200,
      window.innerHeight / 2 + 150,
      window.innerWidth / 2,
      20,
      {
        isStatic: true,
        render: {
          fillStyle: "rgba(0, 0, 255, 0)", // transparent
        },
      }
    );

    // Create mouse control
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

    let scrollTimeout;
    function handleScroll() {
      render.canvas.style.pointerEvents = "none";
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        render.canvas.style.pointerEvents = "auto";
      }, 200);
    }

    render.canvas.addEventListener("wheel", handleScroll);

    // Initialize pingPang as static
    const pingPang = Bodies.circle(window.innerWidth / 2, 100, 10, {
      isStatic: false, // Initially static
      restitution: 0.9,
      render: {
        fillStyle: "white",
      },
    });
    pingPangRef.current = pingPang; // Save reference

    const basketBall = Matter.Bodies.circle(window.innerWidth / 2, 150, 30, {
      isStatic: false, // Initially dynamic
      restitution: 0.8, // Elasticity
      render: {
        sprite: {
          texture: `${process.env.PUBLIC_URL}/resources/hobby/basketball.png`,
          xScale: 0.4,
          yScale: 0.4,
        },
        fillStyle: "red",
      },
    });
    basketBallRef.current = basketBall;

    // Add initial elements to the world
    Composite.add(world, [
      table,
      net,
      racket,
      pingPang,
      leftWall,
      rightWall,
      mouseConstraint,
      hoop,
      rightFloor,
      hoop_2,
      basketBall,
    ]);

    Events.on(engine, "afterUpdate", function () {
      // Check if basketBall exists and is out of bounds
      if (
        basketBallRef.current &&
        basketBallRef.current.position.y > window.innerHeight + 100
      ) {
        // Reset basketBall position and set to static
        Matter.Body.setPosition(basketBallRef.current, {
          x: window.innerWidth - 500,
          y: 150,
        });
        Matter.Body.setStatic(basketBallRef.current, true); // Make basketBall static
      }

      // Check if pingPang exists and is out of bounds
      if (
        pingPangRef.current &&
        (pingPangRef.current.position.y > window.innerHeight + 100 ||
          pingPangRef.current.position.x > window.innerWidth / 2 + 100)
      ) {
        // Reset pingPang position
        Matter.Body.setPosition(pingPangRef.current, { x: 70, y: 310 });
        Matter.Body.setStatic(pingPangRef.current, true); // Make pingPang static
      }

      // Check if racket exists and is out of bounds
      if (
        racketRef.current &&
        racketRef.current.position.y > window.innerHeight + 100
      ) {
        // Reset racket position
        Matter.Body.setPosition(racketRef.current, {
          x: 400,
          y: 300,
        });
        Matter.Body.setStatic(racketRef.current, true); // Make racket static
      }
    });

    // Run the engine and renderer
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Expose the addBasketBall function to the parent component
    setAddBasketBallToWorld(() => {
      return () => {
        // If the basketBall exists, reset its position
        if (basketBallRef.current) {
          // Matter.Body.setPosition(basketBallRef.current, {
          //   x: window.innerWidth - 250,
          //   y: 150,
          // });
          Matter.Body.setStatic(basketBallRef.current, false); // Make basketBall dynamic again
        }
      };
    });

    // Expose the activateRacket function to the parent component
    setActivateRacket(() => {
      return () => {
        if (racketRef.current) {
          Matter.Body.setStatic(racketRef.current, false); // Activate racket
        }
      };
    });

    // Expose the activatePingPang function to the parent component
    setActivatePingPang(() => {
      return () => {
        if (pingPangRef.current) {
          Matter.Body.setStatic(pingPangRef.current, false); // Activate pingPang
        }
      };
    });

    // Cleanup when the component unmounts
    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [setAddBasketBallToWorld, setActivateRacket, setActivatePingPang]);

  return <div ref={sceneRef} className="text-white h-screen"></div>;
};

export default Hobby;
