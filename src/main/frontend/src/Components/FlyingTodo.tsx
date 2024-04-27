import React, { useState, useEffect, useRef } from 'react';

interface FlyingTodoProps {
  initialTop: number;
  initialLeft: number;
  headerHeight: number;
  formRef: React.RefObject<HTMLDivElement>;
}
const FlyingTodo: React.FC<FlyingTodoProps> = ({ initialTop, initialLeft, headerHeight, formRef }) => {
  const [position, setPosition] = useState({ top: initialTop, left: initialLeft });
  const [velocity, setVelocity] = useState({
    x: (Math.random() > 0.5 ? 1 : -1) * (1 + Math.random()), 
    y: (Math.random() > 0.5 ? 1 : -1) * (1 + Math.random())
  });

  const todoWidth = 50; // Předpokládá se, že šířka ToDo je 50px
  const todoHeight = 20; // Předpokládá se, že výška ToDo je 20px
  const [color] = useState(`hsl(${Math.random() * 360}, 100%, 50%)`);

  useEffect(() => {
    const move = () => {
      setPosition(prevPosition => {
        let newTop = prevPosition.top + velocity.y;
        let newLeft = prevPosition.left + velocity.x;

        const formBounds = formRef.current?.getBoundingClientRect();
        if (formBounds) {
          if (newTop <= headerHeight || newTop + todoHeight >= window.innerHeight || 
              (newTop + todoHeight >= formBounds.top && newTop <= formBounds.bottom &&
               newLeft + todoWidth >= formBounds.left && newLeft <= formBounds.right)) {
            velocity.y = -velocity.y;
          }
          if (newLeft <= 0 || newLeft + todoWidth >= window.innerWidth || 
              (newLeft + todoWidth >= formBounds.left && newLeft <= formBounds.right &&
               newTop + todoHeight >= formBounds.top && newTop <= formBounds.bottom)) {
            velocity.x = -velocity.x;
          }
        }

        return { top: newTop, left: newLeft };
      });
    };

    const intervalId = setInterval(move, 30);
    return () => clearInterval(intervalId);
  }, [velocity, headerHeight, formRef]);

  return (
    <div style={{
      position: 'absolute',
      top: `${position.top}px`,
      left: `${position.left}px`,
      fontWeight: 'bold',
      color: color,
    }}>
      ToDo
    </div>
  );
};

export default FlyingTodo;
