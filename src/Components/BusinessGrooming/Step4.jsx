import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { ideaContext, userContext } from "../../contextApi/context";
import { handleOpenPicker, postData, putData } from "../../servises/apicofig";
import { useNavigate } from "react-router-dom";
import Conformation from "../Confirmation";
import useDrivePicker from "react-google-drive-picker";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import App from "../comments/src/App";
import CommentsModal from "../CommentsModal";
import axios from "axios";

const Step4 = () => {
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
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [deletefileModal, setdeletefileModal] = useState(false);
  const fileId = useRef();
  const [openPicker, authResponse] = useDrivePicker();
  const [comments, setComments] = useState([]);
  const [commentsModal, setCommentsModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    userName: "Aditya kitukale",
    userId: "123456789",
  });
  useEffect(() => {
    if (idea?.financialValuation?.documentCollection) {
      // console.log(idea);
      setFiles([...idea?.financialValuation?.documentCollection]);
      setComments(idea?.financialValuation?.comments);
    }
  }, [idea]);

  useEffect(() => {
    if (user?.id && user?.username) {
      setCurrentUser({
        userName: user?.username,
        userId: user?.id,
      });
    }
  }, [user]);

  async function handleDownloadFile(filename, type) {
    // console.log(filename, type);
    const body = {
      fileName: filename,
    };
    let url;

    // setLoader(true);
    // postData("generate-urls/generate-download-url", body)
    //   .then((res) => {
    //     setLoader(false);
    //     const atag = document.createElement("a");
    //     atag.href = res.data.url;
    //     document?.body?.appendChild(atag);
    //     atag.setAttribute("download", filename);
    //     atag.setAttribute("target", "_blank");
    //     atag?.click();
    //     atag?.remove();
    //   })
    //   .catch((e) => {
    //     setLoader(false);
    //     console.log(e);
    //   });

    await axios
      .post(
        "https://api.incudash.com/generate-urls/generate-download-url",
        body
      )
      .then((res) => (url = res.data.url))
      .catch((e) => console.log(e));
    console.log(url);

    const atag = document.createElement("a");
    atag.href = url;
    document?.body?.appendChild(atag);
    atag.setAttribute("download", filename);
    atag.setAttribute("target", "_blank");
    atag?.click();
    atag?.remove();
  }

  function handledeleteFile(id) {
    fileId.current = id;
    setdeletefileModal(true);
  }
  function deleteFile() {
    const filterFiles = files.filter((e, i) => e?.id != fileId?.current);
    const body = {
      financialValuation: {
        documentCollection: filterFiles,
        comments: idea?.financialValuation?.comments,
      },
    };
    setLoader(true);
    putData(`ideas/updateByUserId/${user?.id}`, body).then((data) => {
      console.log("step4putreqest", data?.data);
      setLoader(false);
      setIdea(data?.data);
    });
    setFiles(filterFiles);
  }

  const handleUploadFile = async(event) => {
    // console.log(event.target.files[0]);
    let { name, type } = event.target.files[0];
    const file = event.target.files[0];
    // console.log(name, type);
    const Body = {
      name: `incudash-folder/${name}`,
      type,
    };
    await axios
      .post("http://localhost:1337/generate-urls/generate-upload-url", Body)
      .then(async(res) => {
        // console.log(res.data.url);
        // console.log(file.type);
        await axios
          .put(res?.data?.url, {file}, {
            headers: {
              "Content-Type": file.type,
            },
          })
          .then((response) => console.log(response))
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));

      const body = {
        financialValuation: {
          documentCollection: [
            ...idea?.financialValuation ?.documentCollection,
            {
              documentId: `incudash-folder/${name}`,
              fileName: `incudash-folder/${name}`,
              type,
            },
          ],
          comments: idea?.financialValuation?.comments,
        },
      };
      setLoader(true);
      putData(`ideas/updateByUserId/${user.id}`, body)
        .then((res) => {
          setIdea(res.data);
          setLoader(false);
          successMgs();
        })
        .catch((e) => {
          console.log(e);
          faildMgs();
          setLoader(false);
        });
  };

  const saveStep = () => {
    const body = {
      stepNum: stepNum == 3 ? 4 : idea?.stepNum,
    };
    setLoader(true);
    putData(`ideas/updateByUserId/${user?.id}`, body)
      .then((d) => {
        // console.log("step4putreqest", data.data);
        setIdea(d?.data);
        setLoader(false);
        successMgs();
      })
      .catch((e) => {
        console.log(e);
        faildMgs();
        setLoader(false);
      });
    if (stepNum == 3) setstepNum(4);
    navigate("/dashboard/step5");
  };

  const handleComments = (updatedComments) => {
    // console.log(updatedComments);
    if (!idea?.userId) return;
    const body = {
      financialValuation: {
        financialValuation: idea?.financialValuation?.roadMapCollection,
        comments: updatedComments,
      },
    };

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
      <Conformation
        open={deletefileModal}
        setOpen={setdeletefileModal}
        setConform={deleteFile}
        massage={"Do you want to delete this file?"}
      />
      <Typography variant="body1" color="initial" sx={{ fontWeight: 550 }}>
        Step 4 -<span style={{ color: "#009aca" }}> Financial Valuation</span>
      </Typography>

      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: 2,
          m: "auto",
          mt: 5,
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" color="initial" sx={{ fontWeight: 550 }}>
            Get your financial sheet reviewed by us
          </Typography>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            // onClick={() => handleUploadFile()}
          >
            Upload file
            <input type="file" hidden onChange={(e) => handleUploadFile(e)} />
          </Button>
        </Box>
        <Typography variant="body1" color="initial" sx={{ fontWeight: 600 }}>
          {" "}
          Uploded Files{" "}
        </Typography>
        {files?.length == 0 && (
          <p
            style={{ fontSize: 13, display: "flex", justifyContent: "center" }}
          >
            Data Not Found ...
          </p>
        )}
        {files?.map((e, i) => (
          <Box
            key={i}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              {i + 1}) <PictureAsPdfIcon sx={{ color: "red", fontSize: 12 }} />
              <span> {e?.fileName} </span>
            </Box>
            <Box>
              <IconButton
                aria-label="download"
                onClick={() => handleDownloadFile(e?.fileName, e?.type)}
                sx={{ mt: 0.5 }}
              >
                <DownloadIcon sx={{ height: 20 }} />
              </IconButton>
              <IconButton
                aria-label="deletee"
                onClick={() => handledeleteFile(e.id)}
              >
                <DeleteIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Box>
        ))}
        <Box sx={{ display: "flex", justifyContent: "end", pt: 2 }}>
          <Button variant="contained" onClick={() => saveStep()}>
            Next
          </Button>
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

export default Step4;
