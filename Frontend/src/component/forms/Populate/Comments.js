import React, { useRef, useState, useCallback, useEffect } from "react";

import { Box, Stack } from "@mui/system";
import Button from "@mui/material/Button";
import Quill from "quill";
import BasicModal from "../../../utils/BasicModal";
import { Checkbox, Typography } from "@mui/material";
import * as Yup from "yup";
import { useFormik, Formik, Form, Field, FieldArray } from "formik";

var toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const statusInfo = ["accept", "sort", "reject", "rework", "mrb"];
const affectedInfo = [
  "safety",
  "strength",
  "system performance",
  "maintainability",
  "interchangeability",
  "reliability",
  "specification",
];

const Comments = ({ editor, open, setOpen, width, dept, data }) => {
  //   const [editorData, setEditorData] = React.useState(DEFAULT_INITIAL_DATA);
  //   const [ed, setEd] = useState();
  const [quill, setQuill] = useState("");

  //   useEffect(() => {
  //     console.log(quill);
  //     if (quill === null || quill === undefined) return;
  //     const holder = (delta, oldDelta, source) => {
  //       if (source !== "user") {
  //         return;
  //       }
  //     };

  //     quill.on("text-change", holder);
  //   }, [quill]);

  //   useEffect(() => {
  //     if (quill === null || quill === undefined || quill === "") return;
  //     const handler = () =>
  //       localStorage.setItem("comments", JSON.stringify(quill.getContents()));
  //     setInterval(handler, 10000);

  //     return () => {
  //       clearInterval(handler);
  //     };
  //   }, [quill]);

  //   console.log(localStorage.getItem("comments"), "maduvha ");

  useEffect(() => {
    if (quill === null || quill === undefined || quill === "") return;

    if (localStorage.getItem("comments")) {
      quill.setContents(localStorage.getItem("comments"));
    }
  }, [quill]);

  const EdITOR_HOLDER_ID = editor;

  const editorWrapper = useCallback(
    (wrapper) => {
      if (wrapper === null) return;
      wrapper.innerHTML = "";
      const editor = document.createElement("div");
      editor.classList.add("cdx-block");
      editor.setAttribute("id", EdITOR_HOLDER_ID);
      wrapper.append(editor);
      const editorQ = new Quill(editor, {
        modules: {
          toolbar: toolbarOptions,
        },
        theme: "snow",
      });
      setQuill(editorQ);
    },

    [EdITOR_HOLDER_ID]
  );

  return (
    <BasicModal open={open} setOpen={setOpen} width={width}>
      <Box
        ref={editorWrapper}
        sx={{
          backgroundColor: "#ffffff",
          border: "1px solid #cccccc",
          width: "100%",
        }}
      ></Box>
      {dept === "Product Development" && (
        <Stack mt={2} direction="row" justifyContent="space-between">
          <Stack>
            {affectedInfo.slice(0, 4).map((info) => (
              <Box
                key={info}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  p: 0,
                }}
              >
                <Typography
                  component="p"
                  variant="body2"
                  sx={{ fontSize: "10px", minWidth: "200px" }}
                >
                  {info.toUpperCase()}
                </Typography>
                <Checkbox name={info.toLowerCase()} size="small" />
              </Box>
            ))}
          </Stack>
          <Stack>
            {affectedInfo.slice(4, 7).map((info) => (
              <Box
                key={info}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  p: 0,
                }}
              >
                <Typography
                  component="p"
                  variant="body2"
                  sx={{ fontSize: "10px", minWidth: "200px" }}
                >
                  {info.toUpperCase()}
                </Typography>
                <Checkbox name={info.toLowerCase()} size="small" />
              </Box>
            ))}
          </Stack>
        </Stack>
      )}
      <Stack mt={2} direction="row">
        {statusInfo.map((info) => (
          <Box
            key={info}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <Typography component="p" variant="body2" sx={{ fontSize: "10px" }}>
              {info.toUpperCase()}
            </Typography>
            <Checkbox name={info.toLowerCase()} size="small" />
          </Box>
        ))}
      </Stack>
      <Button></Button>
    </BasicModal>
  );
};

export default Comments;
