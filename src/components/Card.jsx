import React from "react";
import cardPic from "../images/Scan3003.jpg";

function Card({ ticket }) {
  return (
    <div className="card">
      <div className="cardTop">
        <p className="cardTopText">{ticket.id}</p>
        <img src={cardPic} alt="Card Profile" className="cardPicture" />
      </div>
      <div className="cardMiddle">
        <p className="cardTitle">{ticket.title}</p>
      </div>
      <div className="cardBottom">
        <span className="material-icons">error</span>
        <div className="cardTag">
          <div className="statusCircle"></div>
          <p className="tag">{ticket.tag}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
