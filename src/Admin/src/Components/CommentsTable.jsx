import { AccordionDetails, Box, Chip, ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const CommentsTable = ({comments}) => {
    const commentsTable = ["Comment", "Created By", "Created At"];
  return (
    <>
    <Typography sx={{ textAlign: "center", mt: 3, mb: 2 }}>
              Comments
            </Typography>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650, marginTop: "1rem" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    {commentsTable.map((item) => (
                      <TableCell align="center" key={`commentHead${item}`}>
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {comments?.map((item, index) => (
                    <TableRow
                      key={`commentrow${index}`}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">{item?.commentText}</TableCell>

                      <TableCell align="center">{item?.createdBy}</TableCell>

                      <TableCell align="center">
                        {item?.createAt
                          ? new Date(item?.createAt).toLocaleDateString('en-GB')
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {comments?.length === 0 && <Box textAlign={'center'} p={3} width={'100%'}>Comments not found...</Box>}
    </>
  )
}

export default CommentsTable