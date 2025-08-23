const { useState, useEffect } = React;

const CountDown = ({ startFrom, onDone }) => {
  const [count, setCount] = useState(startFrom);

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
  }, [startFrom]);

  return (
    <div className="outer-container">
      <div className="inner-container">
        <div className="count">{count}</div>
      </div>
    </div>
  );
};

export default CountDown;
