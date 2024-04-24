import React, { useState, useEffect } from 'react';

const headerHeight = 130; 

const FlyingTodo = () => {
  const [position, setPosition] = useState({
    top: headerHeight + 10,  
    left: 50  
  });
  const [velocity, setVelocity] = useState({
    x: (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 2), 
    y: (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 2)  
  });

  useEffect(() => {
    const move = () => {
      setPosition(prevPosition => {
        let newTop = prevPosition.top + velocity.y;
        let newLeft = prevPosition.left + velocity.x;

        // Kontrola kolize s okraji obrazovky a hlavičkou
        let newVelocity = { ...velocity };
        if (newTop <= headerHeight || newTop >= window.innerHeight - 20) {
          newTop = prevPosition.top; // Zůstává na původní pozici při kolizi
          newVelocity.y = -velocity.y; // Invertujeme Y směr
        }
        if (newLeft <= 0 || newLeft >= window.innerWidth - 20) {
          newLeft = prevPosition.left; // Zůstává na původní pozici při kolizi
          newVelocity.x = -velocity.x; // Invertujeme X směr
        }
        setVelocity(newVelocity); // Aktualizace rychlosti pro další pohyb

        return { top: newTop, left: newLeft };
      });
    };

    const intervalId = setInterval(move, 20); // Zrychlujeme interval pro hladší pohyb

    return () => clearInterval(intervalId);
  }, [velocity]); // Závislost na velocity zajistí reakci na jeho změny

  return (
    <div style={{
      position: 'absolute',
      top: `${position.top}px`,
      left: `${position.left}px`,
      fontWeight: 'bold',
      color: 'blue',
    }}>
      ToDo
    </div>
  );
};

export default FlyingTodo;
