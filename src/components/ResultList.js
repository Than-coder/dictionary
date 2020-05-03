import React from "react";

function ResultList({ result }) {
  return (
    <div>
      <ul className="collection">
        {result.map(r => (
          <li key={r.english} className="collection-item">
            <span className="title teal-text">Eng</span>
            <p>{r.english}</p>
            <span className="title teal-text">MY</span>
            <p>{r.myanmar}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultList;
