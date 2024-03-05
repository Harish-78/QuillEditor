// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Editor from "./screens/EditorSceen";

// const App = () => {
//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Editor />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;

import React, { useRef, useState } from "react";
import Editor from "./screens/EditorSceen";
import Quill from "quill";
// import "./App.css";

const Delta = Quill.import("delta");

const App = () => {
  // const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  // const [readOnly, setReadOnly] = useState(false);
  console.log(lastChange);
  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  return (
    <div>
      <Editor
        ref={quillRef}
        // readOnly={readOnly}
        // defaultValue={new Delta()
        //   .insert("Hello")
        //   .insert("\n", { header: 1 })
        //   .insert("Some ")
        //   .insert("initial", { bold: true })
        //   .insert(" ")
        //   .insert("content", { underline: true })
        //   .insert("\n")}
        // onSelectionChange={setRange}
        onTextChange={setLastChange}
        
      />
      {/* <div class="controls">
        <label>
          Read Only:{" "}
          <input
            type="checkbox"
            value={readOnly}
            onChange={(e) => setReadOnly(e.target.checked)}
          />
        </label>
        <button
          className="controls-right"
          type="button"
          onClick={() => {
            alert(quillRef.current?.getLength());
          }}
        >
          Get Content Length
        </button>
      </div>
      <div className="state">
        <div className="state-title">Current Range:</div>
        {range ? JSON.stringify(range) : "Empty"}
      </div>
      <div className="state">
        <div className="state-title">Last Change:</div>
        {lastChange ? JSON.stringify(lastChange.ops) : "Empty"}
      </div> */}
    </div>
  );
};

export default App;
