import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrer par type
  const typeFilteredEvents = !type
    ? data?.events || []
    : data?.events?.filter(event => event.type === type) || [];

  // Paginer les résultats filtrés
  const paginatedEvents = typeFilteredEvents.filter((event, index) => (currentPage - 1) * PER_PAGE <= index &&
    PER_PAGE * currentPage > index);

  // Calculer le nombre de pages sur les événements filtrés par type
  const pageNumber = Math.ceil(typeFilteredEvents.length / PER_PAGE);

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  const typeList = new Set(data?.events?.map((event) => event.type));

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => {
              if (value) {
                changeType(value);
              } else {
                changeType(null);
              }
            }}
          />
          <div id="events" className="ListContainer">
            {paginatedEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          {pageNumber > 1 && (
            <div className="Pagination">
              {[...Array(pageNumber)].map((_, n) => (
                <a
                  // eslint-disable-next-line react/no-array-index-key
                  key={n}
                  href="#events"
                  onClick={() => setCurrentPage(n + 1)}
                  className={currentPage === n + 1 ? "active" : ""}
                >
                  {n + 1}
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EventList;