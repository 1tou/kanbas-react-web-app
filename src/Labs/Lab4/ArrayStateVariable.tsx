import React, { useState } from "react";
export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };
  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <button onClick={addElement} className="btn btn-success mb-2">Add Element</button>
      <ul className="list-group">
        {array.map((item, index) => (
          <li key={index} className="list-group-item">
            <span className="col-sm-2 fs-4 me-5">
                {item}
            </span>
            <button onClick={() => deleteElement(index)}
                    id="wd-delete-element-click" className="btn btn-danger col-sm-2">
              Delete</button>
          </li>
        ))}
      </ul>
      <hr/>
    </div>
  );
}
