import React, { useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Textarea from "@mui/joy/Textarea";
import { Box } from "@mui/joy";

export default function AddInRoadmap({
  open,
  setOpen,
  setStep,
  isEdit,
  setIsEdit,
  handleEditEntry,
  editEntry,
}) {
  // console.log(isEdit, editEntry?.roadmapTitle);
  const [roadmapTitle, setroadmapTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timestampFrom, setTimestamFrom] = useState(new Date());
  const [timestampTo, setTimestampTo] = useState(new Date());
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isEdit && editEntry) {
      setroadmapTitle(editEntry?.roadmapTitle);
      setDescription(editEntry?.description);
      setTimestamFrom(editEntry?.timestampFrom);
      setTimestampTo(editEntry?.timestamTo);
    }
  }, [editEntry]);

  useEffect(() => {
    if (dayjs(timestampTo).diff(timestampFrom, "day") < 0) setError(true);
    else setError(false);
  }, [timestampFrom, timestampTo]);

  function addDetails() {
    // console.log(roadmapTitle);
    if (isEdit) {
      handleEditEntry({
        roadmapTitle,
        description,
        timestampFrom,
        timestampTo,
      });
      setOpen(false);
      setroadmapTitle("");
      setDescription("");
      // console.log("if");
    } else if (roadmapTitle && description) {
      setStep({
        roadmapTitle,
        description,
        timestampFrom,
        timestampTo,
      });
      setOpen(false);
      setroadmapTitle("");
      setDescription("");
    } else {
      if (!roadmapTitle && !description) alert("please fill both field");
      else if (!roadmapTitle && description)
        alert("please fill roadmapTitle field");
      else alert("please fill Description field");
      setStep("");
    }
  }

  return (
    <>
      <Modal
        aria-labelledby="modal-roadmapTitle"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => {
          setIsEdit(false);
          setOpen(false);
        }}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 600,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-roadmapTitle"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Add your Milestone
            {error && (
              <p style={{ fontSize: 12, color: "red" }}>To date cannot be before from date</p>
            )}
          </Typography>
          <Box id="modal-desc">
            <TextField
              required
              label="RoadmapTitle"
              variant="standard"
              sx={{ width: "100%", my: 1 }}
              onChange={(e) => setroadmapTitle(e.target.value)}
              value={roadmapTitle}
            />
            <br />
            <label htmlFor="">Description *</label>
            {/* <br /> */}
            <Textarea
              sx={{
                p: 1,
              }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
            >
              <DatePicker
                sx={{
                  "& .MuiInputBase-input": {
                    height: "5px",
                  },
                  borderRadius: 1,
                  width: 400,
                  my: 1,
                }}
                value={dayjs(timestampFrom)}
                format="DD-MM-YYYY"
                onChange={(e) => setTimestamFrom(e.$d)}
              />
              <DatePicker
                sx={{
                  "& .MuiInputBase-input": {
                    height: "5px",
                  },
                  borderRadius: 1,
                  width: 400,
                  my: 1,
                }}
                value={dayjs(timestampTo)}
                format="DD-MM-YYYY"
                onChange={(e) => setTimestampTo(e.$d)}
              />
            </Box>
            <Box>
              {dayjs(timestampTo).diff(timestampFrom, "day") > -1 ? (
                <Typography sx={{fontSize:12}}>
                  Duration: {dayjs(timestampTo).diff(timestampFrom, "day")} Days
                </Typography>
              ) : null}
            </Box>
            <br />
            <Button
              disabled={error}
              variant="contained"
              sx={{ width: "100%", my: 1 }}
              onClick={() => addDetails()}
            >
              {isEdit ? "Confirm" : "Add"}
            </Button>
          </Box>
        </Sheet>
      </Modal>
    </>
  );
}
