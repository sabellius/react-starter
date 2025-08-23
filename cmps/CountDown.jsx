const { useState, useEffect } = React;

const CountDown = ({ startFrom, onDone, toTime = null }) => {
  const [count, setCount] = useState(
    toTime ? (toTime - Date.now()) / 1000 : startFrom
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(currentCount => {
        if (currentCount <= 0) {
          clearInterval(interval);
          onDone();
          return 0;
        }
        return currentCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="outer-container">
      <div className="inner-container">
        <div className={`count ${count <= 6 ? 'color-red' : ''}`}>{count}</div>
      </div>
    </div>
  );
};

export default CountDown;
