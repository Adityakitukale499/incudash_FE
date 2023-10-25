import React from 'react'
import { Box } from "@mui/material";
import Button from "@mui/joy/Button";
import { useNavigate } from 'react-router-dom';

const NavigateBtn = ({disable, saveFun, saveAndNextFun}) => {
  const navigate = useNavigate();

  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      m: 5,
      ml: 0,
    }}
  >
    <Button
      color="neutral"
      sx={{ mr: 2 }}
      onClick={() => navigate("/dashboard")}
    >
      Go To Dashboard
    </Button>
    <Box>
    <Button variant="solid" disabled={disable} onClick={saveFun} sx={{ mr: 2 }} >Save</Button>
    <Button variant="solid" onClick={saveAndNextFun} >{disable ? null:'Save & '}Next</Button>
    </Box>
  </Box>
  )
}

export default NavigateBtn