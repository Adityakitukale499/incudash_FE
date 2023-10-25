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
import Conformation from "../Conformation";
import useDrivePicker from "react-google-drive-picker";

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
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [deletefileModal, setdeletefileModal] = useState(false);
  const fileId = useRef();
  const [openPicker, authResponse] = useDrivePicker();
  useEffect(() => {
    if (idea) {
      setFiles([...idea.financialValuation.documentCollection]);
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

  function handledeleteFile(id) {
    fileId.current = id;
    setdeletefileModal(true);
  }
  function deleteFile() {
    const filterFiles = files.filter((e, i) => e.id != fileId.current);
    const body = {
      financialValuation: {
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
    const uploadFile = (data) => {
      const body = {
        financialValuation: {
          documentCollection: [
            ...idea.financialValuation.documentCollection,
            {
              documentId: data.docs[0].name,
              url: data.docs[0].downloadUrl,
              created_at: new Date().toString(),
            },
          ],
          comments: [
            ...idea.financialValuation.comments,

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
    };
    handleOpenPicker(uploadFile, openPicker, authResponse);
  };

  const saveStep = () => {
    const body = {
      stepNum: stepNum == 3 ? 4 : idea.stepNum,
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
    if (stepNum == 3) setstepNum(4);
    navigate("/dashboard/step5");
  };

  return (
    <Box sx={{ p: 0, mr: 0 }}>
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
            onClick={() => handleUploadFile()}
          >
            Upload file
            {/* <input type="file" hidden onChange={handleFiles} /> */}
          </Button>
        </Box>
        <Typography variant="body1" color="initial" sx={{ fontWeight: 600 }}>
          {" "}
          Uploded Files{" "}
        </Typography>
        {files.length == 0 && (
          <p
            style={{ fontSize: 13, display: "flex", justifyContent: "center" }}
          >
            Data Not Found ...
          </p>
        )}
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
    </Box>
  );
};

export default Step4;
