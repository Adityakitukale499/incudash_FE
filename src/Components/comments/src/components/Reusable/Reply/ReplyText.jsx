import { Typography } from "@mui/material";
import Tag from "./Tag";

const ReplyText = ({ repText, replyingTo }) => {
  return (
    <Typography
      component="div"
      sx={{ color: "neutral.grayishBlue", p: "15px 0", fontSize:16 }}
    >
      <Tag onTar={replyingTo} />
      {" "+repText}
    </Typography>
  );
};

export default ReplyText;
