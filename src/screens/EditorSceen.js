import React from "react";
import ReactDOM from "react-dom";
import ReactQuill, { Quill } from "react-quill";

import "react-quill/dist/quill.snow.css"; // ES6
import mention from "quill-mention";

const quillTable = require("quill-table");

Quill.register(quillTable.TableCell);
Quill.register(quillTable.TableRow);
Quill.register(quillTable.Table);
Quill.register(quillTable.Contain);
Quill.register("modules/table", quillTable.TableModule);
const maxRows = 20;
const maxCols = 5;
const tableOptions = [];
for (let r = 1; r <= maxRows; r++) {
  for (let c = 1; c <= maxCols; c++) {
    tableOptions.push("newtable_" + r + "_" + c);
  }
}

const atValues = [
  { id: 1, value: "Arjun Kumar" },
  { id: 2, value: "Divya Menon" },
  { id: 3, value: "Ganesh Patel" },
  { id: 4, value: "Harini Rao" },
  { id: 5, value: "Ishaan Nair" },
  { id: 6, value: "Janani Iyer" },
  { id: 7, value: "Karthik Reddy" },
  { id: 8, value: "Lakshmi Krishnan" },
  { id: 9, value: "Madhavan Pillai" },
  { id: 10, value: "Neha Gupta" },
  { id: 11, value: "Prasad Raju" },
  { id: 12, value: "Rajesh Iyengar" },
  { id: 13, value: "Shreya Raman" },
  { id: 14, value: "Tejas Shankar" },
  { id: 15, value: "Varun Desai" },
];

const hashValues = [
  { id: 3, value: "Fredrik Sundqvist 2" },
  { id: 4, value: "Patrik Sjölin 2" },
];
const handleChange = (value, delta) => {
  console.log(value, delta);
};
function MyQuillEditor() {
  ReactQuill.Quill.register("modules/mention", mention);
  return (
    <div className="App">
      <ReactQuill
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            // [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike", "color", "background"],
            [{ align: [] }],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["blockquote"],
            ["link", "image", "video"],
            ["clean"],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["formula"],
            [
              { table: tableOptions },
              { table: "append-row" },
              { table: "append-col" },
            ],
            ["undo", "redo"],],
          table: true,
          mention: {
            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
            mentionDenotationChars: ["@", "#"],
            source: function (searchTerm, renderList, mentionChar) {
              let values;

              if (mentionChar === "@") {
                values = atValues;
              } else {
                values = hashValues;
              }

              if (searchTerm.length === 0) {
                renderList(values, searchTerm);
              } else {
                const matches = [];
                for (let i = 0; i < values.length; i++)
                  if (
                    ~values[i].value
                      .toLowerCase()
                      .indexOf(searchTerm.toLowerCase())
                  )
                    matches.push(values[i]);
                renderList(matches, searchTerm);
              }
            },
          },
        }}
      />
    </div>
  );
}

export default MyQuillEditor;
