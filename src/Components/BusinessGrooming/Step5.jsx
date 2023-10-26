import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { ideaContext } from "../../contextApi/context";
import { handleOpenPicker, putData } from "../../servises/apicofig";
import { useNavigate } from "react-router-dom";
import Conformation from "../Confirmation";
import useDrivePicker from "react-google-drive-picker";

const Step5 = () => {
  const { idea, setIdea, loader, setLoader, successMgs, faildMgs, stepNum, setstepNum } =
    useContext(ideaContext);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [deletfileModal, setDeletfileModal] = useState(false);
  const fileId = useRef();
  const [openPicker, authResponse] = useDrivePicker();
  useEffect(() => {
    if (idea) {
      setFiles([...idea.pitchDeckValidation.documentCollection]);
    }
  }, [idea]);

  function handleDownloadFile(url, filename) {
    const atag = document.createElement("a");
    atag.href = url;
    atag.setAttribute("download", filename);
    // atag.setAttribute("target", '_blank');
    document.body.appendChild(atag);
    atag.click();
    atag.remove();
  }

  function handleDeletFile(id) {
    fileId.current = id;
    setDeletfileModal(true);
  }
  function deleteFile() {
    const filterFiles = files.filter((e, i) => e.id != fileId.current);
    const body = {
      pitchDeckValidation: {
        documentCollection: [...filterFiles],
      },
    };
    setLoader(true);
    putData("652f8bff127bd15a1883f5fd", body).then((data) => {
      console.log("step4putreqest", data.data);
      setLoader(false);
      setIdea(data.data);
    });
    setFiles(filterFiles);
  }

  const handleUploadFile = () => {
    const uploadFile=(data)=>{
      const body = {
        pitchDeckValidation: {
          documentCollection: [
            ...idea.pitchDeckValidation.documentCollection,
            {
              documentId: data.docs[0].name,
              url: data.docs[0].downloadUrl,
              created_at: new Date().toString(),
            },
          ],
          comments: [
            ...idea.pitchDeckValidation.comments,

            // {
            //   created_at: "*&^%$#",
            //   commentText: "trdhgeqatyhr5r6rtdgerdtg",
            //   createdBy: "erhrth",
            // },
          ],
        },
      };
      setLoader(true);
      putData("652f8bff127bd15a1883f5fd", body)
        .then((d) => {
          // console.log("step4putreqest", data.data);
          setIdea(d.data);
          setLoader(false);
          successMgs();
        })
        .catch((e) => {
          console.log(e);
          faildMgs();
          setLoader(false);
        });

    }
    handleOpenPicker(uploadFile,openPicker, authResponse)
  };

  const saveStep = () => {
    const body = {
      stepNum: stepNum == 4 ? 5 : idea.stepNum,
    };
    setLoader(true);
    putData("652f8bff127bd15a1883f5fd", body)
      .then((d) => {
        // console.log("step4putreqest", data.data);
        setIdea(d.data);
        setLoader(false);
        successMgs();
      })
      .catch((e) => {
        console.log(e);
        faildMgs();
        setLoader(false);
      });
    if (stepNum == 4) setstepNum(5);
    navigate("/dashboard/step6");
  };

  return (
    <Box sx={{ p: 0, mr: 0 }}>
      <Conformation
        open={deletfileModal}
        setOpen={setDeletfileModal}
        setConform={deleteFile}
        massage={"Do you want to delete this file?"}
      />
      <Typography variant="body1" color="initial"  sx={{fontWeight:550}}>
        Step 5 -<span style={{ color: "#009aca" }}> Review Pitch Deck</span>
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
          <Typography variant="h6" color="initial"  sx={{fontWeight:550}}>
            Get Your Pitch Deck reviewed by us
          </Typography>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={() => handleUploadFile()}
          >
            Upload file
            {/* <input type="file" hidden onChange={handleFiles} /> */}
          </Button>
        </Box>
        <Typography variant="body1" color="initial" sx={{fontWeight:550}}>
          {" "}
          Uploded Files{" "}
        </Typography>
          {files.length == 0 && <p style={{fontSize:13, display:'flex' , justifyContent:'center'}}>Data Not Found...</p>}
        {files.map((e, i) => (
          <Box
            key={i}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              {i + 1}) <PictureAsPdfIcon sx={{ color: "red", fontSize: 12 }} />
              <span> {e.documentId} </span>
            </Box>
            <Box>
              <IconButton
                aria-label="download"
                onClick={() => handleDownloadFile(e.url, e.documentId)}
                sx={{mt:0.5}}
              >
                <DownloadIcon sx={{ height: 20 }} />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => handleDeletFile(e.id)}
              >
                <DeleteIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Box>
        ))}
        <Box sx={{ display: "flex", justifyContent: "end", pt: 2 }}>
          <Button
            variant="contained"
            onClick={() =>
            saveStep()}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Step5;

