//Single selection
//multiple selection

import { useState } from "react";
import data from "./data";
// import "./styles.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enabledMultiSelection, setEnabledMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    // console.log(getCurrentId);
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let cpyMultiple = [...multiple];
    const findIndexCurrentId = cpyMultiple.indexOf(getCurrentId);

    if (findIndexCurrentId === -1) cpyMultiple.push(getCurrentId);
    else cpyMultiple.splice(findIndexCurrentId, 1);

    setMultiple(cpyMultiple);
    console.log(cpyMultiple);
  }

  // console.log(selected);

  return (
    <div className="wrapper flex h-screen w-screen justify-center items-center flex-col gap-5">
      <button
        className="px-3 py-5 bg-[#614101] hover:bg-[#4e3400] text-white font-bold text-[20px] cursor-pointer outline-none border-none"
        onClick={() => setEnabledMultiSelection(!enabledMultiSelection)}
      >
        Enable Multi Selection
      </button>
      <div className="accordian w-[500px]">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div
              className="item bg-[#614101] mb-[10px] px-[10px] py-[20px]"
              key={dataItem.id}
            >
              <div
                onClick={() =>
                  enabledMultiSelection
                    ? handleMultiSelection(dataItem.id)
                    : handleSingleSelection(dataItem.id)
                }
                className="title text-white flex justify-center items-center cursor-pointer"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {enabledMultiSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="content text-white h-auto">
                      {dataItem.answer}
                    </div>
                  )
                : selected === dataItem.id && (
                    <div className="content text-white h-auto">
                      {dataItem.answer}
                    </div>
                  )}
            </div>
          ))
        ) : (
          <div>No Data Found</div>
        )}
      </div>
    </div>
  );
}
