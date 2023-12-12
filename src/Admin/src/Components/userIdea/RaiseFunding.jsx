import { AccordionDetails, Box, Button, Chip, ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import QuillEditor from "../QuillEditor";
import { useContext, useEffect, useState } from "react";
import { putData } from "../../Services/api";
import { ideaContext } from "../../../../contextApi/context";

const RaiseFunding = ({ idea }) => {
  //   const raiseFundingTable = [
  //     "Funding Formatted Text",
  //     "Created By",
  //     "Created At",
  //     "Last Updated By",
  //   ];
  const [massage, setMassage] = useState("");

  const { loader, setLoader } = useContext(ideaContext);
  useEffect(() => {
    if (idea?.raiseFunding?.fundingFormattedText) {
      setMassage(idea?.raiseFunding?.fundingFormattedText);
    }
  }, [idea]);
  const updateMassage = () => {
    const body = {
      raiseFunding: {
        fundingFormattedText: massage,
        updated_at: new Date(),
      },
    };
    setLoader(true);
    putData(`ideas/updateByUserId/${idea?.userId}`, body)
      .then((data) => {
        console.log(data.data);
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
    console.log(idea);
  };
  return (
    <Box p={5}>
      <Typography sx={{ textAlign: "center", mb: 2 }}>
        Funding Formatted Text
      </Typography>

      <QuillEditor code={massage} setCode={setMassage} />
      <Box display={"flex"} justifyContent={"end"} mt={10}>
        <Button variant="contained" onClick={updateMassage}>
          add message
        </Button>
      </Box>
    </Box>
  );
};

export default RaiseFunding;
