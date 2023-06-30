import { useState, useEffect, Fragment } from "react";
import "./App.css";

function App() {
  const [currentYear, setCurrentYear] = useState(2023);
  const [isWeekend, setIsWeekend] = useState(false);
  const [countdown, setCountdown] = useState("0d 0t 0m");
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const currentDay = currentDate.getDay();
      const currentHour = currentDate.getHours();
      const currentYear = currentDate.getFullYear();
      const currentMinute = currentDate.getMinutes();
      const currentSecond = currentDate.getSeconds();
      const targetDay = 5;
      const targetHour = 15;

      let daysRemaining = targetDay - currentDay;
      let hoursRemaining = targetHour - currentHour;
      let minutesRemaining = 59 - currentMinute;
      let secondsRemaining = 59 - currentSecond;

      if (daysRemaining < 0) {
        daysRemaining += 7;
      }
      if (hoursRemaining < 0) {
        hoursRemaining += 24;
        daysRemaining -= 1;
      }
      if (minutesRemaining < 0) {
        minutesRemaining += 60;
        hoursRemaining -= 1;
      }
      if (secondsRemaining < 0) {
        secondsRemaining += 60;
        minutesRemaining -= 1;
      }

      const countdownText = `${daysRemaining}d ${hoursRemaining}t ${minutesRemaining}m ${secondsRemaining}s`;
      setCountdown(countdownText);
      setTimeRemaining({
        days: daysRemaining,
        hours: hoursRemaining,
        minutes: minutesRemaining,
        seconds: secondsRemaining,
      });

      setCurrentYear(currentYear);

      if (
        (currentDay === 5 && currentHour >= 16) || // Friday after 4 PM
        currentDay === 6 || // Saturday
        (currentDay === 0 && currentHour < 23) || // Sunday before 11:59 PM
        (currentDay === 0 && currentHour === 23 && currentMinute <= 59)
      ) {
        setIsWeekend(true);
      } else setIsWeekend(false);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Fragment>
      <div className="container">
        <h1 className="title">Er det helg?</h1>
        {isWeekend ? <p className="yes">Ja!</p> : <p className="no">Nei</p>}
        {!isWeekend && (
          <div className="countdown">
            <p className="countdown-text">Det er helg om:</p>
            <div className="countdown-time">
              <div className="countdown-row">
                <p className="countdown-value">{timeRemaining.days}</p>
                <p className="countdown-label">dager</p>
              </div>
              <div className="countdown-row">
                <p className="countdown-value">{timeRemaining.hours}</p>
                <p className="countdown-label">timer</p>
              </div>
              <div className="countdown-row">
                <p className="countdown-value">{timeRemaining.minutes}</p>
                <p className="countdown-label">minutter</p>
              </div>
              <div className="countdown-row countdown-seconds">
                <p className="countdown-value">{timeRemaining.seconds}</p>
                <p className="countdown-label">sekunder</p>
              </div>
            </div>
          </div>
        )}
        {isWeekend ? (
          <p className="ad">Og du kan starte helgen med å se Ramona's Tea Party sin nye musikkvideo!</p>
        ) : (
          <p className="ad">I mellomtiden kan du se Ramona's Tea Party sin nye musikkvideo mens du venter!</p>
        )}
        <div className="video-container">
          <iframe
            width="448"
            height="252"
            src="https://www.youtube.com/embed/UeGjhDvrAKk"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; {currentYear} Chris November. All rights reserved.</p>
      </footer>
    </Fragment>
  );
}

export default App;
