import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/useContext";
import "../App.css";

export const FeedBack = () => {
  const { feedback, toggleFeed } = useContext(UserContext);

  useEffect(() => {
    if (feedback.state) {
      setTimeout(() => {
        const state = false;
        const type = "";
        const msg = "";
        const newState = { ...feedback, state, type, msg };
        console.log(newState);
        toggleFeed(newState);
      }, 3000);
    }
  }, [feedback.state]); // eslint-disable-line react-hooks/exhaustive-deps

  let renderFeed;
  switch (feedback.type) {
    case "success":
      renderFeed = (
        <div className="alert alert-success" role="alert">
          {feedback.msg}
        </div>
      );
      break;
    case "danger":
      renderFeed = (
        <div className="alert alert-danger" role="alert">
          {feedback.msg}
        </div>
      );
      break;
    case "warning":
      renderFeed = (
        <div className="alert alert-warning" role="alert">
          {feedback.msg}
        </div>
      );
      break;
    default:
      renderFeed = "";
      break;
  }

  return <div className="col-12 posi">{feedback.state ? renderFeed : ""}</div>;
};
