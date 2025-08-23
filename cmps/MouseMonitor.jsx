const { useState, useEffect } = React;

const MouseMonitor = () => {
  const [isOn, setIsOn] = useState(true);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function updatePos({ clientX: x, clientY: y }) {
    setPos({ x, y });
  }

  useEffect(() => {
    document.addEventListener('mousemove', updatePos);
    return () => document.removeEventListener('mousemove', updatePos);
  }, [isOn]);
  return (
    <div className="monitor">
      <p>Mouse Position</p>
      {isOn && (
        <p>
          X: {pos.x} Y: {pos.y}
        </p>
      )}
      <button type="button" onClick={() => setIsOn(isOn => !isOn)}>
        {isOn ? 'Pause' : 'Resume'}
      </button>
    </div>
  );
};

export default MouseMonitor;
