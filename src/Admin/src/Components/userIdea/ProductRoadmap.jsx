import { useState, useEffect, useContext } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  ListItem,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { loaderContext } from "../../ContextApi/context";
import { getData, putData } from "../../Services/api";
import dayjs from "dayjs";
import App from "../comments/src/App";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ProductRoadmap = ({ idea, currentUser }) => {
  const roadmapTable = ["Title", "Description", "Start Time", "End Time"];

  const { loader, setLoader } = useContext(loaderContext);
  const [comments, setComments] = useState([]);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (idea?.productRoadmap?.comments) {
    //   console.log(idea?.productRoadmap?.comments);
      setComments(idea?.productRoadmap?.comments);
    }
  }, [idea]);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleComments = (updatedComments) => {
    // console.log(updatedComments);
    const body = {
      productRoadmap: {
        roadMapCollection: idea?.productRoadmap?.roadMapCollection,
        comments: updatedComments,
      },
    };
    if(!idea?.userId) return;

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
    <Box p={5}>
      <Typography sx={{ textAlign: "center", mt: 3, mb: 2 }}>
        Roadmap
      </Typography>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, marginTop: "1rem" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {roadmapTable.map((item) => (
                <TableCell key={`roadmapheadaa${item}`} align="center">
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {idea?.productRoadmap?.roadMapCollection.map((item, index) => (
              <TableRow
                key={`Roadmaprow${index}`}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="center">{item.roadmapTitle}</TableCell>

                <TableCell align="center">
                  {item.description.slice(0, 50)}{" "}
                  {item.description.length > 50 && (
                    <span
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => handleDescription(item.description)}
                    >
                      {" "}
                      view more
                    </span>
                  )}
                </TableCell>

                <TableCell align="center">
                  {item.timestampFrom
                    ? dayjs(item.timestampTo).format("DD/MM/YYYY")
                    : "-"}
                </TableCell>

                <TableCell align="center">
                  {item.timestampTo
                    ? dayjs(item.timestampTo).format("DD/MM/YYYY")
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Accordion
      
      expandIcon={<ExpandMoreIcon />}
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        sx={{ p: 0.5, borderRadius: 1, mt: 2 }}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
            Comments
          </Typography>
        </AccordionSummary>

        <App
          comments={comments}
          currentUser={currentUser}
          setComments={handleComments}
        />
      </Accordion>
    </Box>
  );
};

export default ProductRoadmap;
