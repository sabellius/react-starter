const { useState, useEffect } = React;
import { utilService } from '../services/util.service.js';

const SeasonClock = () => {
  const [isDark, setIsDark] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`season-container flex flex-column justify-center align-center ${
        isDark ? 'dark' : ''
      }`}
      onClick={() => setIsDark(isDark => !isDark)}>
      <h1>
        {utilService.getMonthName(time)} ({utilService.getCurrentSeason(time)})
      </h1>
      <img
        src={`assets/img/${utilService
          .getCurrentSeason(time)
          .toLowerCase()}.png`}
        alt=""
      />
      <div>{time.toLocaleTimeString()}</div>
      <p>{utilService.getDayName(new Date())}</p>
    </div>
  );
};

export default SeasonClock;
