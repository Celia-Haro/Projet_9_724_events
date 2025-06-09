import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateAsc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? 1 : -1
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex < byDateAsc.length - 1 ? prevIndex + 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <div className="SlideCardList">
      {byDateAsc?.map((event, idx) => (
        <div
          key={event.id || idx}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
            }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateAsc?.map((evt, idex) => (
            <input
              key={`bullet-${evt.id || idex}`}
              type="radio"
              name="radio-button"
              checked={index === idex}
              onChange={() => setIndex(idex)}
              onClick={() => setIndex(idex)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
