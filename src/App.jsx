import { useState, useEffect, Fragment } from "react";
import "./App.css";

function App() {
  const [currentYear, setCurrentYear] = useState(2023);
  const [isWeekend, setIsWeekend] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const currentDay = currentDate.getDay();
      const currentHour = currentDate.getHours();
      const currentYear = currentDate.getFullYear();

      setCurrentYear(currentYear);

      if (currentDay === 5 && currentHour >= 16) {
        setIsWeekend(true);
      } else setIsWeekend(false);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying]);

  return (
    <Fragment>
      <div className="container">
        <h1>Er det helg?</h1>
        {isWeekend ? <p className="yes">Ja!</p> : <p className="no">Nei</p>}
        {isWeekend ? (
          <p className="ad">Og du kan starte helgen med å se Ramona's Tea Party sin nye musikkvideo!</p>
        ) : (
          <p className="ad">Men da kan du se Ramona's Tea Party sin nye musikkvideo mens du venter!</p>
        )}
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/UeGjhDvrAKk"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <footer className="footer">
        <p>&copy; {currentYear} Chris November. All rights reserved.</p>
      </footer>
    </Fragment>
  );
}

export default App;
