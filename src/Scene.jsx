import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

const Scene = () => {
  // const [scene, setScene] = useState();
  const sceneRef = useRef(null);

  useEffect(() => {
    let Engine = Matter.Engine;
    let Render = Matter.Render;
    let World = Matter.World;
    let Bodies = Matter.Bodies;
    let Mouse = Matter.Mouse;
    let MouseConstraint = Matter.MouseConstraint;

    let engine = Engine.create({});

    let render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 600,
        height: 600,
        wireframes: false
      }
    });

    let ballA = Bodies.circle(210, 100, 30, { restitution: 0.5 });
    let ballB = Bodies.circle(110, 50, 30, { restitution: 0.5 });
    World.add(engine.world, [
      // walls
      Bodies.rectangle(200, 0, 600, 50, { isStatic: true }),
      Bodies.rectangle(200, 600, 600, 50, { isStatic: true }),
      Bodies.rectangle(260, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);

    World.add(engine.world, [ballA, ballB]);

        // add mouse control
        let mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: {
              visible: false
            }
          }
        });
  
      World.add(engine.world, mouseConstraint);
  
      Matter.Events.on(mouseConstraint, "mousedown", function(event) {
        World.add(engine.world, Bodies.circle(150, 50, 30, { restitution: 0.7 }));
      });
  
      Engine.run(engine);
  
      Render.run(render);
  
      Matter.Events.on(engine, 'collisionStart', function(event) {
        let a = event
        // let b = event.pairs[1] ? event.pairs[1] : null
      
        // check bodies, do whatever...
        console.log('a', a)
      });

  }, [])

  return <div ref={sceneRef} />;

}

export default Scene;
