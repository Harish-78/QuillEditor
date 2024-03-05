// import React, { useEffect, useMemo, useRef, useState } from "react";
// import ReactQuill, { Quill } from "react-quill-with-table";
// import QuillBetterTable from "quill-better-table";
// import katex from "katex";
// import "./packages/mention/mention";
// import { MentionBlot } from "./packages/mention/mention";
// import ImageResize from "quill-image-resize-module-react";
// // import data from "@emoji-mart/data";
// // import Picker from "@emoji-mart/react";
// import { Button, InputNumber, Popover, Spin } from "antd";
// import { Chip, IconButton, Tooltip } from "@mui/material";
// import NoteAddIcon from "@mui/icons-material/NoteAdd";
// import QuillImageDropAndPaste from "quill-image-drop-and-paste";
// import debounce from "lodash/debounce";
// import "katex/dist/katex.min.css";
// import "quill-better-table/dist/quill-better-table.css";
// import "react-quill-with-table/dist/quill.snow.css";
// import "./packages/mention/mention.css";
// import "./Editor.css";

// Quill.register("modules/better-table", QuillBetterTable);
// Quill.register("modules/imageResize", ImageResize);
// Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);

// window.katex = katex;

// const hashValues = [
//   {
//     id: 3,
//     value: "Fredrik Sundqvist 2",
//     img: "https://picsum.photos/200/300/?blur",
//   },
//   {
//     id: 4,
//     value: "Patrik Sjölin 2",
//     img: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
//   },
// ];

// const picturesEnum = Object.freeze({
//   FOLDER:
//     "https://aroopa.blob.core.windows.net/documents/1703824534-folder_image.png",
//   DOCUMENT:
//     "https://aroopa.blob.core.windows.net/documents/1703822972-document_image.png",
//   EVERYONE: "https://aroopa.blob.core.windows.net/documents/vectors/people.png",
//   ARCHIEVE:
//     "https://aroopa.blob.core.windows.net/documents/1703824886-archive_icon.png",
//   UNARCHIEVE:
//     "https://aroopa.blob.core.windows.net/documents/1703824832-unarchive_icon.png",
//   ADD_EMOJI:
//     "https://aroopa.blob.core.windows.net/documents/1703836528-add_emoji.png",
//   VISA: "https://aroopa.blob.core.windows.net/documents/1708338229-visa.png",
//   MASTERCARD:
//     "https://aroopa.blob.core.windows.net/documents/1708339142-mastercard.png",
//   AMERICANEXPRSS:
//     "https://aroopa.blob.core.windows.net/documents/1708527812-AmericanExpress.png",
//   DISCOVER:
//     "https://aroopa.blob.core.windows.net/documents/1708611774-Discover.png",
//   DINNERCLUB:
//     "https://aroopa.blob.core.windows.net/documents/1708611896-DinnerClub.png",
//   MAESTRO:
//     "https://aroopa.blob.core.windows.net/documents/1708611980-Maestro.png",
//   WORDPAY:
//     "https://aroopa.blob.core.windows.net/documents/1708612117-wordPay.png",
//   CIRRUS: "https://aroopa.blob.core.windows.net/documents/1708612254-4.png",
//   VISAELECTRON:
//     "https://aroopa.blob.core.windows.net/documents/1708612321-7.png",
// });

// const capitalizeFirstLetter = (string) => {
//   return string?.charAt(0)?.toUpperCase() + string?.slice(1);
// };

// // var cursorPosition = 0;
// let cancelTokenSource = null;
// const everyOneIcon = picturesEnum.EVERYONE;
// const everyOneData = {
//   _id: "everyone",
//   email: "Everyone",
//   firstName: "Everyone",
//   lastName: "",
//   picture: everyOneIcon,
//   fullName: "Everyone",
// };

// // const add_emoji_image = picturesEnum.ADD_EMOJI;

// const Editor = ({
//   onChange,
//   value,
//   placeholder,
//   entity_type,
//   entity_id,
//   everyOne,
//   disabled = false,
//   isExternal = true,
//   mentionList = [],
// }) => {
//   const [spinning, setSpinning] = useState(false);
//   const mentionArray = [...mentionList];
//   mentionArray.push(everyOneData);
//   const modules = useMemo(() => {
//     return {
//       table: false,
//       "better-table": {
//         operationMenu: {
//           items: {
//             unmergeCells: {
//               text: "Another unmerge cells name",
//             },
//           },
//           color: {
//             colors: ["#fff", "red", "rgb(0, 0, 0)"], // colors in operationMenu
//             text: "Background Colors", // subtitle
//           },
//         },
//       },
//       keyboard: {
//         bindings: QuillBetterTable.keyboardBindings,
//       },
//       imageResize: {
//         parchment: Quill.import("parchment"),
//         modules: ["Resize", "DisplaySize"],
//       },

//       toolbar: {
//         container: "#toolbar",
//         handlers: {
//           image: (params) => {
//             setSpinning(true);
//             const input = document.createElement("input");
//             input.setAttribute("type", "file");
//             input.setAttribute("accept", "image/*");
//             input.click();
//             input.onchange = async function () {
//               const file = input.files[0];
//               // const base64 = await ImageCompress({ base64String: file });
//               const range = reactQuillRef.current
//                 .getEditor()
//                 .getSelection(true);
//               reactQuillRef.current.getEditor().setSelection(range.index + 1);
//               const data = {};
//               const currentUnixTimestamp = Math.floor(Date.now() / 1000);
//               data.blobNames = [`${currentUnixTimestamp}-${file.name}`];
//               data.containerName = "documents";
//               // try {
//               //   const presignedUrl = await PresignedUrl({
//               //     name: data.blobNames,
//               //     // file: base64,
//               //     type: file.type,
//               //     filePath: data.containerName,
//               //   });
//               //   if (presignedUrl) {
//               //     reactQuillRef.current
//               //       .getEditor()
//               //       .insertEmbed(range.index, "image", presignedUrl);
//               //     setSpinning(false);
//               //   }
//               // } catch (err) {
//               //   setSpinning(false);
//               //   console.error(err);
//               // }
//             }.bind(this); // react thing
//           },
//         },
//       },
//       imageDropAndPaste: {
//         handler: async (base64, type, imgData) => {
//           setSpinning(true);
//           const formData = new FormData();
//           formData.append("signImg", base64);
//           // const compressedImage = await ImageCompress(formData);
//           const data = {};
//           const currentUnixTimestamp = Math.floor(Date.now() / 1000);
//           data.blobNames = [`${currentUnixTimestamp}-${imgData?.name}`];
//           data.containerName = "documents";
//           const range = reactQuillRef.current.getEditor().getSelection(true);
//           reactQuillRef.current.getEditor().setSelection(range.index + 1);
//           // try {
//           //   const presignedUrl = await PresignedUrl({
//           //     name: data.blobNames,
//           //     file: base64,
//           //     type: type,
//           //     filePath: data.containerName,
//           //   });
//           //   const quill = reactQuillRef?.current.getEditor();
//           //   const editorContent = quill.getContents();
//           //   const paragraphIndex = editorContent.ops.findIndex(
//           //     (op) =>
//           //       op.insert &&
//           //       op.insert.image &&
//           //       op.insert.image.startsWith("data:image")
//           //   );
//           //   if (paragraphIndex !== -1) {
//           //     // Get the existing image element
//           //     const existingImage =
//           //       editorContent.ops[paragraphIndex].insert.image;
//           //     // Replace the existing image with a new one (replace 'newImageUrl' with your new image URL)
//           //     editorContent.ops[paragraphIndex].insert.image = presignedUrl;
//           //   }
//           //   // Set the updated content back to the editor
//           //   quill.setContents(editorContent);
//           //   setSpinning(false);
//           // } catch (error) {
//           //   setSpinning(false);
//           //   console.error(error);
//           // }
//         },
//       },
//       mention: {
//         allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
//         mentionDenotationChars: ["@", "#"],
//         source: async (searchTerm, renderList, mentionChar) => {
//           let values;
//           if (mentionChar === "@") {
//             await debouncedGetUsers(searchTerm, renderList);
//           } else {
//             values = hashValues;
//           }
//         },
//         dataAttributes: [
//           "id",
//           "value",
//           "denotationChar",
//           "link",
//           "target",
//           "disabled",
//           "color",
//         ],
//         blotName: "styled-mention",
//         renderItem: function (item, searchTerm) {
//           const capitalizeName = (value) => {
//             return (
//               value?.charAt(0)?.toUpperCase() + value?.slice(1)?.toLowerCase()
//             );
//           };

//           if (!item.value) return;
//           let atr = JSON.parse(item.value);
//           const element = document.createElement("span");
//           element.style.display = "flex";
//           element.style.alignItems = "center";
//           element.style.gap = "5px";
//           const text = document.createElement("span");
//           if (atr.picture) {
//             const image = document.createElement("img");
//             image.setAttribute("src", atr.picture);
//             image.style.height = "30px";
//             image.style.width = "30px";
//             image.style.borderRadius = "50%";
//             element.appendChild(image);
//           } else if (atr.firstName || atr.lastName) {
//             const div = document.createElement("div");
//             div.classList.add("mention-avatar-div");
//             const names =
//               (atr.firstName ? atr.firstName?.charAt(0)?.toUpperCase() : "") +
//               (atr.lastName ? atr.lastName?.charAt(0)?.toUpperCase() : "");
//             div.textContent = names;

//             element.appendChild(div);
//           } else if (atr?.email) {
//             const div = document.createElement("div");
//             div.classList.add("mention-avatar-div");
//             const names = atr?.email
//               .split("@")[0]
//               .split(".")
//               .map((part) => part?.charAt(0)?.toUpperCase())
//               .join("");
//             div.textContent = names;

//             element.appendChild(div);
//           }
//           if (atr?.fullName) {
//             const nameArr = atr?.fullName.split(" ");
//             const userName = nameArr
//               .map((val) => capitalizeName(val))
//               .join(" ");
//             text.innerText = userName;
//           } else if (atr?.email) {
//             text.innerText = atr?.email;
//           }
//           element.appendChild(text);
//           return element;
//         },
//       },
//     };
//   }, []);

//   class StyledMentionBlot extends MentionBlot {
//     static render(data) {
//       if (!data) return;
//       data = JSON.parse(data?.value);
//       const { _id, email } = data;
//       if (!email) {
//         data = mentionArray.find((x) => _id.toString() === x?._id?.toString());
//       }
//       if (!value?.mentions?.includes(data?._id)) {
//         const updatedData = [...value?.mentions];
//         updatedData.push(data?._id);
//         onChange((prevState) => ({
//           ...prevState,
//           mentions: updatedData,
//         }));
//       }
//       const element = document.createElement("span");

//       if (data?.picture) {
//         const elementTwo = document.createElement("img");
//         elementTwo.setAttribute("src", data?.picture);

//         elementTwo.style.height = "19px";
//         elementTwo.style.width = "19px";
//         elementTwo.style.borderRadius = "50%";
//         elementTwo.style.marginRight = "5px";
//         elementTwo.style.marginTop = "5px";
//         elementTwo.style.marginBottom = "-3px";
//         elementTwo.style.marginLeft = "2px";

//         element.appendChild(elementTwo);
//       } else if (data?.firstName || data?.lastName) {
//         const elementThree = document.createElement("span");
//         elementThree.classList.add("mention-avatar");
//         const names =
//           (data?.firstName ? data.firstName?.charAt(0)?.toUpperCase() : "") +
//           (data?.lastName ? data.lastName?.charAt(0)?.toUpperCase() : "");
//         elementThree.textContent = names;
//         element.appendChild(elementThree);
//       } else {
//         const elementThree = document.createElement("span");
//         elementThree.classList.add("mention-avatar");
//         const names = data?.email
//           .split("@")?.[0]
//           .split(".")
//           .map((part) => part?.charAt(0)?.toUpperCase())
//           .join("");
//         elementThree.textContent = names;
//         element.appendChild(elementThree);
//       }

//       const elementOne = document.createElement("span");
//       if (data?.firstName) {
//         const firstName =
//           data?.firstName?.charAt(0)?.toUpperCase() +
//           data?.firstName?.slice(1)?.toLowerCase();
//         elementOne.innerText = firstName;
//       } else {
//         elementOne.innerText = capitalizeFirstLetter(
//           data?.email.split("@")[0].split(".")?.[0]
//         );
//       }

//       element.appendChild(elementOne);
//       return element;
//     }
//   }
//   StyledMentionBlot.blotName = "styled-mention";

//   Quill.register(StyledMentionBlot);
//   const reactQuillRef = useRef(null);
//   const quillEditor = React.useRef(
//     <ReactQuill
//       ref={reactQuillRef}
//       theme="snow"
//       modules={modules}
//       placeholder={placeholder}
//       value={value?.content}
//       onChange={(e) => {
//         onChange((prevState) => ({
//           ...prevState,
//           content: e,
//         }));
//       }}
//       readOnly={disabled}
//     />
//   );
//   useEffect(() => {
//     if (reactQuillRef?.current) {
//       const editor = reactQuillRef.current.getEditor();
//       const toolbar = editor.getModule("toolbar");
//       toolbar.addHandler("table", () => {
//         insertTable();
//       });
//     }
//   }, [reactQuillRef?.current]);
//   useEffect(() => {
//     if (value?.content === "" && reactQuillRef?.current) {
//       reactQuillRef.current.getEditor().setContents("");
//     }
//   }, [value?.content]);

//   const insertTable = () => {};

//   const debouncedGetUsers = debounce(async (searchTerm, renderList) => {
//     // try {
//     //   if (cancelTokenSource) {
//     //     cancelTokenSource.cancel("Operation canceled by the user.");
//     //   }
//     //   cancelTokenSource = axios.CancelToken.source();
//     // if (searchTerm && searchTerm !== "" && searchTerm?.length >= 3) {
//     //   const response = await axiosInstance.get(
//     //     `${apiUrl}/api/users/all_user/?userName=${searchTerm}&entity_type=${entity_type}&entity_id=${entity_id}&external=${isExternal}`,
//     //     {
//     //       cancelToken: cancelTokenSource.token,
//     //     }
//     //   );
//     //       let values = stringifyValues(response?.data?.data);
//     //       if (values) {
//     //         if (everyOne) {
//     //           values.push(...stringifyValues([everyOneData]));
//     //         }
//     //         renderList(values, searchTerm);
//     //       } else {
//     //         if (everyOne) {
//     //           renderList(stringifyValues([everyOneData]));
//     //         }
//     //       }
//     //     }
//     //   } catch (error) {
//     //     if (!axios.isCancel(error)) {
//     //       console.error("Error fetching data:", error);
//     //     }
//     //   }
//   }, 500);

//   const stringifyValues = (data) => {
//     let res = [];
//     for (let i = 0; i < data?.length; i++) {
//       let temp = data?.[i];
//       data[i] = JSON.stringify(temp);
//       res.push({ id: i + 1, value: data?.[i] });
//     }
//     return res;
//   };
//   const getBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       let reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         resolve(reader.result);
//       };
//       reader.onerror = (error) => reject(null);
//     });
//   };

//   const handleFileInputChange = (e) => {
//     const { files } = e.target;
//     const fileLength = files.length;
//     for (let i = 0; i < fileLength; i++) {
//       let { file } = document;
//       file = files[i];
//       getBase64(file).then(async (result) => {
//         // file["base64"] = await PresignedUrl({
//         //   name: [file?.name],
//         //   file: result,
//         //   type: file?.type,
//         // });
//         let document = {
//           document_name: file?.name,
//           document_url: file?.base64,
//           type: file?.type,
//         };
//         onChange((prevState) => {
//           const updatedData = [
//             ...(prevState?.documents?.createdDocument || []),
//             document,
//           ];
//           return {
//             ...prevState,
//             documents: {
//               ...(prevState.documents || {}),
//               createdDocument: updatedData,
//             },
//           };
//         });
//       });
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const droppedFile = e.dataTransfer.files[0];
//     // if (!droppedFile?.type?.includes("image")) {
//     //   getBase64(droppedFile).then(async (result) => {
//     //     droppedFile["base64"] = await PresignedUrl({
//     //       name: [droppedFile?.name],
//     //       file: result,
//     //       type: droppedFile?.type,
//     //     });
//     //     let document = {
//     //       document_name: droppedFile?.name,
//     //       document_url: droppedFile?.base64,
//     //       type: droppedFile?.type,
//     //     };
//     //     onChange((prevState) => {
//     //       const updatedData = [
//     //         ...(prevState?.documents?.createdDocument || []),
//     //         document,
//     //       ];
//     //       return {
//     //         ...prevState,
//     //         documents: {
//     //           ...(prevState.documents || {}),
//     //           createdDocument: updatedData,
//     //         },
//     //       };
//     //     });
//     //   });
//     // }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };
//   const fileRemove = (index) => {
//     const oldarray = [...(value?.documents?.createdDocument || [])];
//     oldarray.splice(Number(index), 1);
//     onChange((prevState) => ({
//       ...prevState,
//       documents: {
//         ...prevState?.documents,
//         createdDocument: oldarray,
//       },
//     }));
//   };

//   return (
//     <div id="quill-text-editor" onDrop={handleDrop} onDragOver={handleDragOver}>
//       <CustomToolbar
//         editorRef={reactQuillRef}
//         handleFileInputChange={handleFileInputChange}
//       />
//       {/* <ReactQuill
//         ref={reactQuillRef}
//         theme="snow"
//         modules={modules}
//         preserveWhitespace={true}
//         placeholder={placeholder}
//         value={value?.content}
//         onChange={(e) => {
//           onChange((prevState) => ({
//             ...prevState,
//             content: e,
//           }));
//         }}
//       /> */}
//       {quillEditor.current}

//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: "24px",
//           marginTop:
//             value?.documents?.documents?.length ||
//             value?.documents?.createdDocument?.length
//               ? "20px"
//               : "0px",
//         }}
//       >
//         {value && value?.documents && value?.documents?.documents?.length
//           ? value?.documents?.documents
//               .filter(
//                 (x) => !value?.documents?.deletedDocument?.includes(x?._id)
//               )
//               .map((x, index) => {
//                 return (
//                   <Chip
//                     label={x?.document_name}
//                     variant="outlined"
//                     onDelete={() => {
//                       onChange((prevState) => {
//                         const arr1 = [
//                           ...(prevState?.documents?.deletedDocument || []),
//                           x?._id,
//                         ];
//                         return {
//                           ...prevState,
//                           documents: {
//                             ...(prevState?.documents || {}),
//                             deletedDocument: arr1,
//                           },
//                         };
//                       });
//                     }}
//                   />
//                 );
//               })
//           : ""}
//         {value?.documents?.createdDocument?.length
//           ? value?.documents?.createdDocument.map((x, index) => {
//               return (
//                 <Chip
//                   label={x?.document_name}
//                   variant="outlined"
//                   onDelete={() => fileRemove(index)}
//                 />
//               );
//             })
//           : ""}
//       </div>
//       <Spin spinning={spinning} fullscreen />
//     </div>
//   );
// };
// export default Editor;

// const CustomToolbar = ({ editorRef, handleFileInputChange }) => {
//   const fileInput = useRef({});
//   const [tableSize, setTableSize] = useState({ row: 3, column: 3 });
//   const UpFile = () => {
//     fileInput.current.click();
//   };
//   return (
//     <div id="toolbar">
//       <span className="ql-formats">
//         <select className="ql-font" defaultValue="arial">
//           <option value="arial">Arial</option>
//           <option value="comic-sans">Comic Sans</option>
//           <option value="courier-new">Courier New</option>
//           <option value="georgia">Georgia</option>
//           <option value="helvetica">Helvetica</option>
//           <option value="lucida">Lucida</option>
//         </select>
//         <select className="ql-size" defaultValue="medium">
//           <option value="extra-small">Size 1</option>
//           <option value="small">Size 2</option>
//           <option value="medium">Size 3</option>
//           <option value="large">Size 4</option>
//         </select>
//         <select className="ql-header" defaultValue="3">
//           <option value="1">Heading</option>
//           <option value="2">Subheading</option>
//           <option value="3">Normal</option>
//         </select>
//       </span>
//       <span className="ql-formats">
//         <Tooltip title="Bold">
//           <button className="ql-bold" />
//         </Tooltip>
//         <Tooltip title="Italic">
//           <button className="ql-italic" />
//         </Tooltip>
//         <Tooltip title="Underline">
//           <button className="ql-underline" />
//         </Tooltip>
//         <Tooltip title="Strike">
//           <button className="ql-strike" />
//         </Tooltip>
//       </span>
//       <span className="ql-formats">
//         <Tooltip title="Ordered List">
//           <button className="ql-list" value="ordered" />
//         </Tooltip>
//         <Tooltip title="Bullet List">
//           <button className="ql-list" value="bullet" />
//         </Tooltip>
//         <Tooltip title="Left Align">
//           <button className="ql-indent" value="-1" />
//         </Tooltip>
//         <Tooltip title="Right Align">
//           <button className="ql-indent" value="+1" />
//         </Tooltip>
//       </span>
//       <span className="ql-formats">
//         <Tooltip title="Super Script">
//           <button className="ql-script" value="super" />
//         </Tooltip>
//         <Tooltip title="Sub Script">
//           <button className="ql-script" value="sub" />
//         </Tooltip>
//         <Tooltip title="Blockquote">
//           <button className="ql-blockquote" />
//         </Tooltip>
//         <Tooltip title="Direction">
//           <button className="ql-direction" />
//         </Tooltip>
//       </span>
//       <span className="ql-formats">
//         <Tooltip title="Align">
//           <select className="ql-align" />
//         </Tooltip>
//         <Tooltip title="Color">
//           <select className="ql-color" />
//         </Tooltip>
//         <Tooltip title="Background">
//           <select className="ql-background" />
//         </Tooltip>
//       </span>
//       <span className="ql-formats">
//         <Tooltip title="Link">
//           <button className="ql-link" />
//         </Tooltip>
//         <Tooltip title="Image">
//           <button className="ql-image" />
//         </Tooltip>
//         <Tooltip title="Video">
//           <button className="ql-video" />
//         </Tooltip>
//         <Popover
//           content={
//             <div>
//               <form>
//                 <table>
//                   <tbody>
//                     <tr>
//                       <td>
//                         <label>Row</label>
//                       </td>
//                       <td>
//                         <InputNumber
//                           name="row"
//                           size="small"
//                           min={1}
//                           max={100000}
//                           defaultValue={3}
//                           onChange={(e) =>
//                             setTableSize({
//                               ...tableSize,
//                               row: e,
//                             })
//                           }
//                         />
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <label>Column</label>
//                       </td>
//                       <td>
//                         <InputNumber
//                           name="column"
//                           size="small"
//                           min={1}
//                           max={100000}
//                           defaultValue={3}
//                           onChange={(e) =>
//                             setTableSize({
//                               ...tableSize,
//                               column: e,
//                             })
//                           }
//                         />
//                       </td>
//                     </tr>
//                     <tr>
//                       <td colSpan={"2"} style={{ textAlign: "center" }}>
//                         <Button
//                           onClick={() => {
//                             const editor = editorRef.current.getEditor();
//                             const tableModule =
//                               editor.getModule("better-table");
//                             tableModule?.insertTable(
//                               tableSize?.row,
//                               tableSize?.column
//                             );
//                           }}
//                         >
//                           Ok
//                         </Button>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </form>
//             </div>
//           }
//           trigger="click"
//           placement="bottom"
//         >
//           <Tooltip title="Table">
//             <button className="ql-table" />
//           </Tooltip>
//         </Popover>
//         <input
//           type="file"
//           multiple
//           onChange={handleFileInputChange}
//           ref={fileInput}
//           className="hidden"
//         />
//         <IconButton onClick={UpFile}>
//           <Tooltip title="Upload File">
//             <NoteAddIcon />
//           </Tooltip>
//         </IconButton>
//       </span>
//       <span className="ql-formats">
//         <Tooltip title="Formula">
//           <button className="ql-formula" />
//         </Tooltip>
//         <Tooltip title="Code">
//           <button className="ql-code-block" />
//         </Tooltip>
//         <Tooltip title="Un-Format">
//           <button className="ql-clean" />
//         </Tooltip>
//       </span>

//       {/* <span className="ql-formats">
//         <Popover
//           content={
//             <div>
//               <Picker
//                 data={data}
//                 onEmojiSelect={(e) => {
//                   if (editorRef?.current) {
//                     const quill = editorRef?.current.getEditor();
//                     console.log({ cursorPosition });
//                     quill.insertText(cursorPosition, e?.native);
//                     quill.setSelection(cursorPosition + 1);
//                   }
//                 }}
//                 emojiSize={20}
//                 emojiButtonSize={28}
//                 maxFrequentRows={1}
//               />
//             </div>
//           }
//           title="Emoji"
//           trigger="click"
//           placement="bottom"
//         >
//           <button>
//             <img
//               src={add_emoji_image}
//               alt="Add Emoji"
//               className="w-[20px] m-0"
//               width="20px"
//               height="20px"
//               style={{ margin: "0px" }}
//             />
//           </button>
//         </Popover>
//       </span> */}
//     </div>
//   );
// };
