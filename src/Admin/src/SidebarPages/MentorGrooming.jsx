import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { getData, postData, putData } from "../Services/api";
import ToggleButton from "../Components/Modals/ToggleButton";
import UpdateMentorModal from "../Components/Modals/UpdateMentorModal";
import CreateMentorModal from "../Components/Modals/CreateMentorModal";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Tooltip } from "@mui/material";
// import { loaderContext } from "../ContextApi/context";

const MentorGrooming = () => {
  const [mentors, setMentors] = useState([]);
  const [testMentors, setTestMentors] = useState([]);
  // const { loader, setLoader } = useContext(loaderContext);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [mentorName, setMentorName] = useState("");
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState("");
  const [imageRef, setImageRef] = useState("");
  const [isDeactivated, setIsDeactivated] = useState(false);
  const userID = React.useRef(null);

  useEffect(() => {
    // setLoader(true);
    getData("mentor-groomings")
      .then((response) => {
        console.log(response.data);
        setMentors(response.data);
        // setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        // setLoader(false);
      });
  }, []);

  useEffect(() => {
    !updateModalOpen
      ? setMentorName(" ") ||
        setDesignation(" ") ||
        setCompany(" ") ||
        setPrice(" ") ||
        setImageRef(" ")
      : null;
  }, [updateModalOpen]);

  const handleOpen = (id) => {
    userID.current = id;
    getData(`mentor-groomings/${id}`)
      .then((response) => {
        const mentorData = response.data;
        console.log("mentordata", mentorData);
        setTestMentors(mentorData);
        setMentorName(mentorData?.mentorInfo?.name);
        setDesignation(mentorData?.mentorInfo?.designation);
        setCompany(mentorData?.mentorInfo?.companyName);
        setPrice(mentorData?.price);
        setImageRef(mentorData?.mentorInfo?.imageRef);
        setIsDeactivated(mentorData?.isDeactivated);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setUpdateModalOpen(true);
      });
  };

  const openModal = () => {
    setCreateModalOpen(true);
  };

  const handleClose = () => {
    setUpdateModalOpen(false);
  };

  const closeModal = () => {
    setCreateModalOpen(false);
  };

  const body = {
    mentorInfo: {
      name: mentorName,
      companyName: company,
      designation: designation,
      imageRef: imageRef,
    },
    price: price,
  };

  const UpdateMentorInfo = () => {
    putData(`mentor-groomings/${userID.current}`, body)
      .then((response) => {
        console.log(response.data);

        getData("mentor-groomings")
          .then((response) => {
            console.log(response.data);
            setMentors(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        handleClose();
        setMentorName("");
        setDesignation("");
        setCompany("");
        setPrice("");
        setImageRef("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CreateMentor = () => {
    postData("mentor-groomings", body)
      .then((response) => {
        console.log(response.data);
        getData("mentor-groomings")
          .then((response) => {
            console.log(response.data);
            setMentors(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        closeModal();
        setMentorName("");
        setDesignation("");
        setCompany("");
        setPrice("");
        setImageRef("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleIsDeactivated = (id) => {
    const updatedMentors = mentors.map((mentor) => {
      if (mentor.id === id) {
        const updatedMentor = {
          ...mentor,
          isDeactivated: !mentor.isDeactivated,
        };
        putData(`mentor-groomings/${id}`, {
          isDeactivated: updatedMentor.isDeactivated,
        })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        return updatedMentor;
      }
      return mentor;
    });
    setMentors(updatedMentors);
  };

  return (
    <>
      <Box>
        <Typography
          variant="h5"
          color="#009cff"
          sx={{ fontWeight: 600, mb: 2 }}
        >
          Mentors
        </Typography>
        <hr />

        <div style={{ height: "100vh", overflowY: "auto", paddingTop: "20px" }}>
          <Grid container gap={2}>
            {mentors.map((e) => (
              <Grid item xs={12} lg={5.5} key={e?.id}>
                <Card sx={{ display: "flex", justifyContent: "space-between" }}>
                  <CardActionArea
                    sx={{ display: "flex", justifyContent: "left" }}
                  >
                    <img
                      src={e?.mentorInfo?.imageRef}
                      alt="mentor's-image mentor's-image mentor's-image mentor's-image"
                      style={{
                        height: 150,
                        width: 150,
                        margin: 15,
                        borderRadius: "50%",
                      }}
                    />
                    <CardContent>
                      <div className="toggle">
                        <ToggleButton
                          toggleIsDeactivated={() => toggleIsDeactivated(e?.id)}
                          isDeactivated={e?.isDeactivated}
                        />
                      </div>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: 600 }}
                      >
                        {e?.mentorInfo?.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="primary"
                        sx={{ fontWeight: 600 }}
                      >
                        {e?.mentorInfo?.designation} At{" "}
                        {e?.mentorInfo?.companyName}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="initial"
                        sx={{ fontWeight: 600 }}
                      >
                        ₹{e?.price}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => handleOpen(e?.id)}
                      >
                        Update Info
                      </Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>

        <UpdateMentorModal
          open={updateModalOpen}
          handleClose={handleClose}
          update={UpdateMentorInfo}
          founderName={mentorName}
          setFounderName={setMentorName}
          designation={designation}
          setDesignation={setDesignation}
          company={company}
          setCompany={setCompany}
          price={price}
          setPrice={setPrice}
          imageRef={imageRef}
          setImageRef={setImageRef}
        />
        <CreateMentorModal
          open={createModalOpen}
          handleClose={closeModal}
          create={CreateMentor}
          founderName={mentorName}
          setFounderName={setMentorName}
          designation={designation}
          setDesignation={setDesignation}
          company={company}
          setCompany={setCompany}
          price={price}
          setPrice={setPrice}
          imageRef={imageRef}
          setImageRef={setImageRef}
        />

        {/* <Button
                    id="addFounder"
                    variant="contained"
                    sx={{
                        position: "fixed",
                        bottom: "60px",
                        right: "100px",
                        zIndex: 1000,
                    }}
                    onClick={openModal}
                >
                    Add New Mentor
                </Button> */}
        <Fab
          color="primary"
          id="addFounder"
          sx={{
            position: "fixed",
            top: "5rem",
            right: "3rem",
            zIndex: 1000,
          }}
          onClick={openModal}
        >
          <Tooltip title="Add New Mentor" placement="top">
            <AddIcon></AddIcon>
          </Tooltip>
        </Fab>
      </Box>
    </>
  );
};

export default MentorGrooming;
