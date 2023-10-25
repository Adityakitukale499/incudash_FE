import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
      width: "30%",
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectIndustry({ industry, setIndustry }) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  React.useEffect(()=>{
    if(industry){
      setPersonName(typeof industry === "string" ? industry.split(",") : industry)
    }
  },[industry])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    // console.log(value);
    setPersonName(typeof value === "string" ? value.split(",") : value);
    value.length > 0 ? setIndustry(value) : setIndustry('');
  };

  return (
    <div>
      <FormControl sx={{ width: "94%", mt: 2 }}>
        <InputLabel sx={{ mt: -1 }} id="demo-multiple-name-label">
          Name
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          style={{ height: 40 }}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
