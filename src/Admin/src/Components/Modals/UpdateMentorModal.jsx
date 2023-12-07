
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
// import ToggleButton from './ToggleButton';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 550,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function UpdateMentorModal
    ({ open, handleClose, update, founderName, setFounderName, designation, setDesignation, company, setCompany, price, setPrice, imageRef, setImageRef }) {

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2" color="primary">
                            Update Mentor Info
                        </Typography>
                        <Box id="transition-modal-description" sx={{ m: 4 }}>
                            <Typography sx={{ mb: -2, fontSize: 12, fontWeight: 'bold' }}>Mentor's Name</Typography>
                            <TextField
                                id="standard-outlined"
                                name="textfield"
                                placeholder="Enter"
                                value={founderName}
                                onChange={(e) => setFounderName(e.target.value)}
                                sx={{ m: 2 }}
                                size="small"
                            />
                            <Typography sx={{ mb: -2, fontSize: 12, fontWeight: 'bold' }}>Designation</Typography>
                            <TextField
                                id="standard-basic"
                                name="textfield"
                                size="small"
                                placeholder="Enter"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                sx={{ m: 2 }}
                            />
                            <Typography sx={{ mb: -2, fontSize: 12, fontWeight: 'bold' }}>Company</Typography>
                            <TextField
                                id="standard-basic"
                                name="textfield"
                                size="small"
                                placeholder="Enter"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                sx={{ m: 2 }}
                            />
                            <Typography sx={{ mb: -2, fontSize: 12, fontWeight: 'bold' }}>Price</Typography>
                            <TextField
                                id="standard-basic"
                                name="textfield"
                                size="small"
                                placeholder="Enter"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                sx={{ m: 2 }}
                            />
                            <Typography sx={{ mb: -2, fontSize: 12, fontWeight: 'bold' }}>Image Ref Url</Typography>
                            <TextField
                                id="standard-basic"
                                name="textfield"
                                size="small"
                                value={imageRef}
                                placeholder="Enter"
                                onChange={(e) => setImageRef(e.target.value)}
                                sx={{ m: 2 }}
                            />

                            <div className="update-btn">
                                <Button variant="contained" sx={{ m: 2 }} onClick={update}>
                                    Update
                                </Button>
                            </div>
                            <div className="close">
                                <Button onClick={handleClose}>
                                    Close
                                </Button>
                            </div>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
