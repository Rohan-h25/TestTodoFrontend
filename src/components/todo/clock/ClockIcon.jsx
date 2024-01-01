import React from "react";
import Modal from 'react-modal';
import {convertUnixTimestamp} from "../../GetDateAndTime";

const ClockIcon = ({time}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [dateTimeComponents, setDateTimeComponents] = React.useState([]);

  const handleIconClick = () => {
    const components = convertUnixTimestamp(time);
    setDateTimeComponents(components);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={handleIconClick}>
        🕒
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Date and Time Modal"
      >
        <h2>Complete the task before: </h2>
        <p>
          {/* {`Day: ${dateTimeComponents[2]}, Month: ${dateTimeComponents[1]}, Year: ${dateTimeComponents[0]}`} */}
          {`${dateTimeComponents[2]}-${dateTimeComponents[1]}-${dateTimeComponents[0]}`}
        </p>
        <p>
          {/* {`Hours: ${dateTimeComponents[3]}, Minutes: ${dateTimeComponents[4]}`} */}
          {`${dateTimeComponents[3]}-${dateTimeComponents[4]}`}
        </p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </>
  );
};

export default ClockIcon;
