import React from "react";
import { useLocation } from "react-router-dom";

export const UserDetails = () => {
  const location = useLocation();
  const { id, pseudo, bio, avatar } = location.state?.author;
  console.log(id, pseudo, bio, avatar);
  const updateValue = () => {};
  return (
    <div className="d-flex justify-content-center">
      <div className=" mb-3">
        <label htmlFor="pseudo" className="form-label">
          Pseudo
        </label>
        <h1>{pseudo}</h1>
      </div>
      <div className="author">
        <div className="author-det">
          <label htmlFor="pseudo" className="form-label">
            Avatar
          </label>
          <img id="thumbList" src={avatar} alt="" />
        </div>
      </div>

      <div className=" mb-3">
        <label htmlFor="bio" className="form-label">
          Bio
        </label>
        {bio !== "" && (
          <textarea value={bio} onChange={(e) => updateValue(e)}>
            {bio}
          </textarea>
        )}
      </div>
    </div>
  );
};
