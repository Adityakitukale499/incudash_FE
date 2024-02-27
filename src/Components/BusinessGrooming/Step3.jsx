import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Box, Chip, Typography } from "@mui/material";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import Roadmap from "../Roadmap";
import { DatePicker } from "@mui/x-date-pickers";
import Add from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import dayjs from "dayjs";
import AddInRoadmap from "../AddInRoadmap";
import { Grid } from "@mui/joy";
import { ideaContext, userContext } from "../../contextApi/context";
import NavigateBtn from "../NavigateBtn";
import { putData } from "../../servises/apicofig";
import Conformation from "../Confirmation";
import CommentsModal from "../CommentsModal";

const Step3 = () => {
  const {
    idea,
    setIdea,
    loader,
    setLoader,
    successMgs,
    faildMgs,
    stepNum,
    setstepNum,
  } = useContext(ideaContext);
  const { user, setUser } = useContext(userContext);
  // const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [editEntry, setEditEntry] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const deleteConform = useRef(false);
  const [deleteConformModal, setdeleteConformModal] = useState(false);
  const [sortData, setSortData] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("");
  const [showChip, setShowChip] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsModal, setCommentsModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    userName: "aditya kitukale",
    userId: "123456789",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id && user?.username) {
      setCurrentUser({
        userName: user?.username,
        userId: user?.id,
      });
    }
  }, [user]);

  useEffect(() => {
    if (idea?.productRoadmap?.comments) {
      setComments(idea?.productRoadmap?.comments);
    }
  }, [idea]);
  useEffect(() => {
    if (step) {
      const temp = [...sortData, step].sort(
        (a, b) => new Date(a?.timestampFrom) - new Date(b?.timestampFrom)
      );
      console.log(temp);
      setSortData(temp);
      setUpdate(true);
    }
  }, [step]);

  useEffect(() => {
    try {
      if (idea) {
        setSortData([...idea?.productRoadmap?.roadMapCollection]);
        setFromDate(idea?.productRoadmap?.roadMapCollection[0]?.timestampFrom);
        setToDate(
          idea?.productRoadmap?.roadMapCollection[
            idea?.productRoadmap?.roadMapCollection?.length - 1
          ]?.timestampTo
        );
      }
    } catch (error) {
      console.log(idea, "in catch block", typeof idea);
    }
  }, [idea]);

  const saveStep3 = () => {
    if (!user) return;
    const temp = [...sortData].sort(
      (a, b) => new Date(a?.timestampFrom) - new Date(b?.timestampFrom)
    );

    const body = {
      productRoadmap: {
        roadMapCollection: [...temp],
        comments: idea?.productRoadmap?.comments,
      },
      stepNum: stepNum == 2 ? 3 : idea?.stepNum,
    };
    setLoader(true);
    putData(`ideas/updateByUserId/${user?.id}`, body)
      .then((data) => {
        // console.log("step3putrequest", data.data);
        setIdea(data?.data);
        setLoader(false);
        successMgs();
        if (stepNum == 2) setstepNum(3);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
        faildMgs();
      });
    setUpdate(false);
    console.log("stepsaveandnext");
  };

  const saveAndNext = () => {
    if (update) saveStep3();

    navigate("/dashboard/step4");
  };

  function ApplyFilter() {
    // console.log(data , fromDate, toDate);
    let filterData = sortData.filter(
      (e) =>
        new Date(fromDate) <= new Date(e?.timestampFrom) &&
        new Date(toDate) >= new Date(e?.timestampFrom)
    );
    console.log("data", filterData);
    setSortData(filterData);
    setShowChip(true);
  }

  function handleEditEntry({
    roadmapTitle,
    description,
    timestampFrom,
    timestampTo,
  }) {
    const arr = sortData;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === editEntry.id) {
        arr[i] = {
          ...arr[i],
          roadmapTitle,
          description,
          timestampFrom,
          timestampTo,
        };
        break;
      }
    }
    setUpdate(true);
    // setData(arr);
    setSortData(arr);
    setIsEdit(false);
  }

  function handledeleteRoadmapstep(id) {
    deleteConform.current = id;
    setdeleteConformModal(true);
  }
  function deleteStep() {
    console.log("deletstep");
    const arr = sortData.filter((e, i) => e?.id !== deleteConform.current);
    setUpdate(true);
    // setData(arr);
    setSortData(arr);
  }

  function resetDate() {
    setShowChip(false);
    setFromDate(sortData[0]?.timestampFrom);
    setToDate(sortData[sortData.length - 1]?.timestampFrom);
  }
  const handleComments = (updatedComments) => {
    // console.log(updatedComments);
    const body = {
      productRoadmap: {
        roadMapCollection: idea?.productRoadmap?.roadMapCollection,
        comments: updatedComments,
      },
    };
    if (!idea?.userId) return;

    setLoader(true);
    putData(`ideas/updateByUserId/${idea?.userId}`, body)
      .then((data) => {
        console.log(data);
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };
  return (
    <Box sx={{ p: 0, mr: 0, mb: 10 }}>
      {/* {console.log(deleteConformModal, deleteStep)} */}
      <Conformation
        open={deleteConformModal}
        setOpen={setdeleteConformModal}
        setConform={deleteStep}
        massage={"Do you want to deletee this step?"}
      />
      <Typography variant="body1" color="initial" sx={{ fontWeight: 600 }}>
        Step 3 -
        <span style={{ color: "#009aca" }}> Build Your Roadmap with us</span>
      </Typography>
      <span style={{ fontWeight: 600 }}>Filter : </span>
      <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Box>
            <span> From </span>
            <DatePicker
              sx={{
                "& .MuiInputBase-input": {
                  height: "0px",
                },
                bgcolor: "#fff",
                borderRadius: 1,
              }}
              value={dayjs(fromDate)}
              format="DD-MM-YYYY"
              onChange={(e) => setFromDate(e.$d)}
            />
          </Box>
          <Box sx={{ mt: 1 }}>
            <span> To </span>
            <DatePicker
              sx={{
                "& .MuiInputBase-input": {
                  height: "0px",
                },
                bgcolor: "#fff",
                borderRadius: 1,
                ml: 2.5,
              }}
              value={dayjs(toDate)}
              format="DD-MM-YYYY"
              onChange={(e) => setToDate(e.$d)}
            />
          </Box>
        </Box>
        <Box sx={{ mt: 5 }}>
          <Button
            size="sm"
            sx={{ height: 0, mx: 1 }}
            startDecorator={<DoneAllIcon />}
            onClick={() => ApplyFilter()}
          >
            Apply
          </Button>
          <Button
            color="neutral"
            size="sm"
            sx={{ height: 0, mx: 1 }}
            startDecorator={<RefreshIcon />}
            onClick={() => resetDate()}
          >
            Reset
          </Button>
        </Box>
        <Button
          color="success"
          size="sm"
          sx={{ height: 0, mt: 5 }}
          startDecorator={<Add />}
          onClick={() => setOpen(true)}
        >
          Add
        </Button>
        <AddInRoadmap
          open={open}
          setOpen={setOpen}
          setStep={setStep}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          handleEditEntry={handleEditEntry}
          editEntry={editEntry}
        />
      </Grid>
      {/* <Box sx={{mt:2,mx:6}}> */}

      {showChip && (
        <Chip
          label={`Filter apply for ${dayjs(fromDate)?.format(
            "DD/MM/YYYY"
          )} to ${dayjs(toDate)?.format("DD/MM/YYYY")}`}
          sx={{ mt: 2 }}
        />
      )}
      {/* </Box> */}
      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: 2,
          m: "auto",
          width: "100%",
          mt: 5,
          p: 4,
          height: 430,
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <Roadmap
          sortData={sortData}
          setOpen={setOpen}
          setIsEdit={setIsEdit}
          setEditEntry={setEditEntry}
          handledeleteRoadmapstep={handledeleteRoadmapstep}
        />
        <Box sx={{ mr: -4.5, mb: -5 }}>
          <NavigateBtn
            disable={!update}
            saveFun={saveStep3}
            saveAndNextFun={saveAndNext}
          />
        </Box>
      </Box>
      <CommentsModal
        open={commentsModal}
        setOpen={setCommentsModal}
        comments={comments}
        currentUser={currentUser}
        setComments={handleComments}
      />

      <img
        onClick={() => setCommentsModal(true)}
        src="/commentButton.png"
        alt="image"
        style={{ width: "170px", position: "fixed", bottom: 70, right: 70 }}
      />
    </Box>
  );
};

export default Step3;
