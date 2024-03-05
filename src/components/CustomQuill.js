import React from "react";
import { render } from "react-dom";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

const CustomHeart = () => <span>♥</span>;
function insertHeart() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "♥");
  this.quill.setSelection(cursorPosition + 1);
}

function insertCustomTags(args) {
  console.log("insertCustomTags", args);
  const value = args;
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, value);
  this.quill.setSelection(cursorPosition + value.length);
}

function myDropdown(args) {
  console.log("myDropdown", args);
  const value = args.value;
  debugger;
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, value);
  this.quill.setSelection(cursorPosition + value.length);
}
/*
 * Custom toolbar component including the custom heart button and dropdowns
 */
const CustomToolbar = () => {
  return (
    <div id="toolbar">
      <select className="ql-font">
        <option value="arial" selected>
          Arial
        </option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
      </select>
      <select className="ql-size">
        <option value="extra-small">Size 1</option>
        <option value="small">Size 2</option>
        <option value="medium" selected>
          Size 3
        </option>
        <option value="large">Size 4</option>
      </select>
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
      <button className="ql-clean" />
      <button className="ql-insertHeart">
        <CustomHeart />
      </button>
      <select className="ql-insertCustomTags">
        <option value="1">One</option>
        <option value="2">Two</option>
      </select>
      <select className="ql-insertCustomTags" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Merceds</option>
        <option value="audi">Audi</option>
      </select>
    </div>
  );
};

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
];
Quill.register(Font, true);

/*
 * Editor component with custom toolbar and content containers
 */
class Editor extends React.Component {
  state = { editorHtml: "" };

  handleChange = (html) => {
    console.log(html);
    this.setState({ editorHtml: html });
  };

  static modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        insertHeart: insertHeart,
        insertCustomTags: insertCustomTags,
        myDropdown: myDropdown,
      },
    },
  };

  render() {
    return (
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill
          value={this.state.editorHtml}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={Editor.modules}
          formats={Editor.formats}
        />
      </div>
    );
  }
}

const Customquill = () => (
  <div>
    <Editor placeholder={"Write something or insert a heart ♥"} />
  </div>
);
export default Customquill;
