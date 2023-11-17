import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

function CatCard({ card }) {
  return (
    <Link to={card.url}>
      
      <div className="catCard" >
        <img src={card.img} alt="" />
        <span className="title">{card.title}</span>
        <span className="desc">{card.desc}</span>
      </div>
    </Link>
  );
}
export default CatCard;
