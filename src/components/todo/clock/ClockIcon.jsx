import { useState, useEffect } from "react";
import "./clockicon.css";
import {changetimeformate} from "../../GetCurrentTime";

const ClockIcon = ({ time }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [hr, min, ampm] = changetimeformate(time);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      closeModal();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="clock-icon" onClick={handleToggleModal}>
      🕒
      </div>

      {isModalOpen && (
        <div className="custom-modal">
          <h2 className="clocktext">Complete the task before: </h2>
          <p className="clocktime">{hr}:{min} {ampm}</p>
          <button className="clockbutton" onClick={handleToggleModal}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ClockIcon;
