const { useState, useEffect, useRef } = React;

const CountDown = ({ startFrom, onDone, toTime = null }) => {
  const [count, setCount] = useState(
    toTime ? Math.ceil((toTime - Date.now()) / 1000) : startFrom
  );
  const counterRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(currentCount => {
        if (currentCount <= 0) {
          clearInterval(interval);
          onDone(counterRef);
          audioRef.current.play();
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
        <div
          ref={counterRef}
          className={`count ${count <= 6 ? 'color-red' : ''}`}>
          {count}
        </div>
        <audio ref={audioRef} src="assets/audio/ship-horn.mp3"></audio>
      </div>
    </div>
  );
};

export default CountDown;
