import React, { useState, useEffect } from 'react';
import FlyingTodo from './FlyingTodo';

interface FlyingTodosContainerProps {
  formRef: React.RefObject<HTMLDivElement>;
}
const FlyingTodosContainer: React.FC<FlyingTodosContainerProps> = ({ formRef }) => {
  const headerHeight = 130;
  const todosCount = 150;
  const buffer = 50; // Rozšířená hranice o 50px
  const [safeAreas, setSafeAreas] = useState<{ top: number, bottom: number, left: number, right: number }[]>([]);

  useEffect(() => {
    function updateSafeAreas() {
      if (formRef.current) {
        const formBounds = formRef.current.getBoundingClientRect();
        const areas = [
          { top: headerHeight, bottom: formBounds.top - buffer, left: 0, right: window.innerWidth }, // Nad formulářem
          { top: formBounds.bottom + buffer, bottom: window.innerHeight, left: 0, right: window.innerWidth }, // Pod formulářem
          { top: headerHeight, bottom: window.innerHeight, left: 0, right: formBounds.left - buffer }, // Vlevo od formuláře
          { top: headerHeight, bottom: window.innerHeight, left: formBounds.right + buffer, right: window.innerWidth } // Vpravo od formuláře
        ].filter(area => area.bottom > area.top && area.right > area.left); // Filtrujeme pouze platné oblasti
        setSafeAreas(areas);
      }
    }

    updateSafeAreas();
    window.addEventListener('resize', updateSafeAreas);
    return () => window.removeEventListener('resize', updateSafeAreas);
  }, [formRef]);

  const getRandomPosition = (area: { top: number, bottom: number, left: number, right: number }) => {
    const heightRange = area.bottom - area.top;
    const widthRange = area.right - area.left;
    const newTop = Math.random() * heightRange + area.top;
    const newLeft = Math.random() * widthRange + area.left;
    return { newTop, newLeft };
  };

  return (
    <>
      {safeAreas.length > 0 && Array.from({ length: todosCount }).map((_, index) => {
        const area = safeAreas[Math.floor(Math.random() * safeAreas.length)]; // Náhodně vybereme bezpečnou oblast
        const { newTop, newLeft } = getRandomPosition(area);
        return (
          <FlyingTodo
            key={index}
            initialTop={newTop}
            initialLeft={newLeft}
            headerHeight={headerHeight}
            formRef={formRef}
          />
        );
      })}
    </>
  );
};

export default FlyingTodosContainer;
