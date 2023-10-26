import React, { useContext, useEffect, useRef, useState } from "react";
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
import { ideaContext } from "../../contextApi/context";
import NavigateBtn from "../NavigateBtn";
import { putData } from "../../servises/apicofig";
import Conformation from "../Confirmation";

const Step3 = () => {
  const { idea, setIdea, loader, setLoader, successMgs, faildMgs, stepNum, setstepNum } = useContext(ideaContext);
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [editEntry, setEditEntry] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const deleteConform = useRef(false);
  const [deleteConformModal, setdeleteConformModal] = useState(false);
  const [sortData, setSortData] = useState(data);
  const [fromDate, setFromDate] = useState(data[0]?.timestampFrom);
  const [toDate, setToDate] = useState(data[data.length - 1]?.timestampTo);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("");
  const [showChip, setShowChip] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (step) {
      setSortData([...data, step]);
      // data.sort((a, b) => a.timestampFrom - b.timestampFrom);
      setData([...data, step]);
      setUpdate(true);
    }
  }, [step]);

  useEffect(() => {
    setSortData(data);
  }, [data]);

  useEffect(() => {
    // console.log("step3", idea);
    if (idea) {
      setData([...idea?.productRoadmap.roadMapCollection]);
      setSortData([...idea?.productRoadmap.roadMapCollection]);
      setFromDate(idea?.productRoadmap.roadMapCollection[0].timestampFrom)
      setToDate(idea?.productRoadmap.roadMapCollection[idea?.productRoadmap.roadMapCollection.length-1].timestampTo)
    }
  }, [idea]);

  const saveStep3 = () => {
    const body = {
      productRoadmap: {
        roadMapCollection: [...sortData],
        comments: [
          ...idea.productRoadmap.comments,
          // {
          //   created_at: "aeiyg6dj",
          //   commentText: "rt6jkmtufysvethdtujfuyjnrdnf",
          //   createdBy: "test",
          // },
        ],
      },
      stepNum: stepNum == 2 ? 3 : idea.stepNum,
    };
    setLoader(true)
    putData("652f8bff127bd15a1883f5fd", body).then((data) => {
      // console.log("step3putrequest", data.data);
      setIdea(data.data);
      setLoader(false)
      successMgs();
      if(stepNum == 2) setstepNum(3)
    }).catch(e =>{
      console.log(e);
      setLoader(false)
      faildMgs()
    })
    setUpdate(false);
  };

  const saveAndNext = () => {
    if (update) saveStep3();

    navigate("/dashboard/step4");
  };

  function ApplyFilter() {
    console.log(data);
    let filterData = data.filter((e) => new Date(fromDate) <= new Date(e.timestampFrom) && new Date(toDate) >= new Date(e.timestampFrom));
    console.log('data',filterData);
    setSortData(filterData);
    setShowChip(true);
  }

  function handleEditEntry({
    roadmapTitle,
    description,
    timestampFrom,
    timestampTo,
  }) {
    const arr = data;
    for (let i = 0; i < data.length; i++) {
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
    setData(arr);
    setSortData(arr);
    setIsEdit(false);
  }

  function handledeleteRoadmapstep(id) {
    setdeleteConformModal(true)
    deleteConform.current = id;
  }
  function deleteStep(){
    const arr = data.filter((e, i) => e.id !== deleteConform.current);
    setUpdate(true);
    setData(arr);
    setSortData(arr);
  }
  
  function resetDate() {
    setShowChip(false);
    setFromDate(data[0].date);
    setToDate(data[data.length - 1].date);
  }
  
  return (
    <Box sx={{ p: 0, mr: 0 }}>
      <Conformation open={deleteConformModal} setOpen={setdeleteConformModal} setConform={deleteStep} massage={'Do you want to deletee this step?'}/>
      <Typography variant="body1" color="initial"  sx={{fontWeight:600}}>
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
          label={`Filter apply for ${dayjs(fromDate).format(
            "DD/MM/YYYY"
          )} to ${dayjs(toDate).format("DD/MM/YYYY")}`}
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
    </Box>
  );
};

export default Step3;
