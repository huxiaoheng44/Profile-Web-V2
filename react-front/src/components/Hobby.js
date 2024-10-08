import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

const Hobby = () => {
  const sceneRef = useRef(null);

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
    const world = engine.world;

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
      250, // Initial x coordinate, place at the bottom left corner
      window.innerHeight - 150, // Initial y coordinate, place at the bottom left corner
      tableVertices,
      {
        isStatic: true,
        render: {
          sprite: {
            texture: `${process.env.PUBLIC_URL}/resources/hobby/table.png`,
            xScale: 0.25, // Scale down by half
            yScale: 0.25, // Scale down by half
          },
          fillStyle: "grey", // Set fill color for visualization, can be set to transparent eventually
          strokeStyle: "red", // Set border color
          lineWidth: 2, // Set border width
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

    const racket = Bodies.fromVertices(
      400, // x coordinate
      window.innerHeight - 300, // y coordinate
      racketVertices,
      {
        isStatic: false, // set to false to allow the racket to move
        frictionAir: 0,
        mass: 0,
        inertia: Infinity,
        render: {
          sprite: {
            texture: `${process.env.PUBLIC_URL}/resources/hobby/racket.png`,
            xScale: 0.4, // Scale down the image
            yScale: 0.4, // Scale down the image
          },
          fillStyle: "grey", // Set fill color for visualization
          strokeStyle: "blue", // Set border color
          lineWidth: 2, // Set border width
        },
      },
      true
    );

    // Create left and right walls (high walls)
    const leftWall = Bodies.rectangle(
      -10, // x coordinate near the left edge
      window.innerHeight / 2, // y coordinate at the center vertically
      20, // Width of the wall
      window.innerHeight, // Height of the wall
      {
        isStatic: true,
        render: {
          fillStyle: "black",
        },
      }
    );

    const rightWall = Bodies.rectangle(
      window.innerWidth + 10, // x coordinate near the right edge
      window.innerHeight / 2, // y coordinate at the center vertically
      10, // Width of the wall
      window.innerHeight, // Height of the wall
      {
        isStatic: true,
        render: {
          fillStyle: "black",
        },
      }
    );

    const staticRectangle = Bodies.rectangle(
      window.innerWidth - 100, // x position (slightly from right)
      200, // y position
      20, // width
      100, // height (long vertical rectangle)
      {
        isStatic: true,
        render: {
          fillStyle: "blue",
        },
      }
    );

    const rightFloor = Bodies.rectangle(
      window.innerWidth - 300, // x position (center)
      window.innerHeight - 10, // y position (slightly below the screen)
      window.innerWidth / 2, // width (full width)
      20, // height (thin horizontal rectangle)
      {
        isStatic: true,
        render: {
          fillStyle: "red",
        },
      }
    );

    // Create a static ball to the left of the static rectangle
    const hoverBall = Bodies.circle(
      window.innerWidth - 150, // x position (slightly left from the rectangle)
      150, // y position (same height as the static rectangle)
      20, // radius
      {
        isStatic: false, // Initially static
        render: {
          sprite: {
            texture: `${process.env.PUBLIC_URL}/resources/hobby/basketball.png`,
            xScale: 0.4, // Scale down the image
            yScale: 0.4, // Scale down the image
          },
          fillStyle: "red",
        },
        friction: 0.01, // Set friction to a small value
        frictionAir: 0.01, // Set air friction to prevent excessive speed
        restitution: 0.8, // Ensure some elasticity to prevent NaN in collisions
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

    Events.on(engine, "afterUpdate", function () {
      if (
        mouse.position.x > hoverBall.position.x - 20 &&
        mouse.position.x < hoverBall.position.x + 20 &&
        mouse.position.y > hoverBall.position.y - 20 &&
        mouse.position.y < hoverBall.position.y + 20
      ) {
        console.log("Hover detected! Changing ball to dynamic...");
        // Change the ball to dynamic when the mouse hovers over it
        Matter.Body.setStatic(hoverBall, false);
        hoverBall.restitution = 0.8; // Add some elasticity to the ball
        hoverBall.gravityScale = 1; // Enable gravity

        // Debugging output to see the state of the ball
        console.log("Ball position after dynamic: ", hoverBall.position);
      }

      // Output ball position each frame to ensure it's within view
      if (!isNaN(hoverBall.position.x) && !isNaN(hoverBall.position.y)) {
        console.log("Ball position: ", hoverBall.position);
      } else {
        console.error("Ball position is NaN! Resetting ball.");
        // Reset ball to initial position if NaN is detected
        Matter.Body.setPosition(hoverBall, {
          x: window.innerWidth - 150,
          y: 150,
        });
        Matter.Body.setStatic(hoverBall, true); // Reset ball to static
      }
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

    // Create a ball that falls from a certain height on the left and set its elasticity
    const ball = Bodies.circle(100, 100, 10, {
      restitution: 0.9, // Set elasticity
      render: {
        fillStyle: "white",
      },
    });

    // Add the ball, walls, table, racket, and other elements to the world
    Composite.add(world, [
      table,
      net,
      racket,
      ball,
      leftWall,
      rightWall,
      mouseConstraint,
      staticRectangle,
      hoverBall,
      mouseConstraint,
      rightFloor,
    ]);

    Events.on(engine, "afterUpdate", function () {
      if (ball.position.y > window.innerHeight + 100) {
        // If the ball goes below the screen, reset its position
        Matter.Body.setPosition(ball, { x: 100, y: 100 });
      }

      // if the racket goes out of the screen, reset its position
      if (racket.position.y > window.innerHeight + 100) {
        Matter.Body.setPosition(racket, {
          x: 400,
          y: window.innerHeight - 300,
        });
      }
    });

    // Run the engine and renderer
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Cleanup when the component unmounts
    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return <div ref={sceneRef} className="text-white h-screen"></div>;
};

export default Hobby;
