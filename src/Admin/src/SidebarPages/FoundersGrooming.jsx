
import React from "react";
import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Box,
    Typography,
} from "@mui/material";
import { useEffect } from "react";
import { loaderContext } from "../ContextApi/context";
import { getData, putData, postData } from "../Services/api";
import ToggleButton from "../Components/Modals/ToggleButton";
import UpdateFounderModal from "../Components/Modals/UpdateFounderModal";
import CreateFounderModal from "../Components/Modals/CreateFounderModal";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Tooltip } from "@mui/material";

const FoundersGrooming = () => {
    const [founders, setFounders] = React.useState([]);
    const [testFounders , setTestFounders] = React.useState([]);
    const { loader, setLoader } = React.useContext(loaderContext);
    const [updateModalOpen, setUpdateModalOpen] = React.useState(false);
    const [createModalOpen, setCreateModalOpen] = React.useState(false);
    const [founderName, setFounderName] = React.useState("");
    const [designation, setDesignation] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [imageRef, setImageRef] = React.useState("");
    const [isDeactivated, setIsDeactivated] = React.useState(false);
    const userID = React.useRef(null);

    useEffect(() => {
        setLoader(true);
        getData('founder-groomings')
            .then((response) => {
                console.log(response.data);
                setFounders(response.data);
                setLoader(false);
            })
            .catch((error) => {
                console.log(error);
                setLoader(false);
            });

    }, [setLoader]);

    useEffect(()=>{
        !updateModalOpen ? 
        setFounderName(" ") ||
        setDesignation(" ") ||
        setCompany(" ") ||
        setPrice(" ") ||
        setImageRef(" ") 
        : null
    } , [updateModalOpen])

    const handleOpen = (id) => {
        userID.current = id
        getData(`founder-groomings/${id}`)
            .then((response) => {
                const founderData = response.data;
                console.log("Founderdata" , founderData);
                setTestFounders(founderData);
                setFounderName(founderData?.founderInfo?.name);
                setDesignation(founderData?.founderInfo?.designation);
                setCompany(founderData?.founderInfo?.companyName);
                setPrice(founderData?.price);
                setImageRef(founderData?.founderInfo?.imageRef);
                setIsDeactivated(founderData?.isDeactivated);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setUpdateModalOpen(true);
            });
    }

    const openModal = () => {
        setCreateModalOpen(true)
    }
    const closeModal = () => {
        setCreateModalOpen(false)
    }

    const handleClose = () => {
        setUpdateModalOpen(false);
    }
    const body = {
        founderInfo: {
            name: founderName,
            companyName: company,
            designation: designation,
            imageRef: imageRef,
        },
        price: price,
        isDeactivated: isDeactivated,
    }
    const Update = () => {
        putData(`founder-groomings/${userID.current}`, body)
            .then((response) => {
                console.log(response.data);

                getData('founder-groomings')
                    .then((response) => {
                        console.log(response.data);
                        setFounders(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                handleClose();
                setFounderName("");
                setDesignation("");
                setCompany("");
                setPrice("");
                setImageRef("");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const CreateFounder = () => {
        postData('founder-groomings', body)
            .then((response) => {
                console.log(response.data);
                getData('founder-groomings')
                    .then((response) => {
                        console.log(response.data);
                        setFounders(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                closeModal();
                setFounderName("");
                setDesignation("");
                setCompany("");
                setPrice("");
                setImageRef("");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // const deleteFounder = (id) => {
    //     userID.current = id
    //     deleteData(`founder-groomings/${id}`)
    //         .then((response) => {
    //             console.log(response.data);
    //             getData('founder-groomings')
    //                 .then((response) => {
    //                     console.log(response.data);
    //                     setFounders(response.data);
    //                 })
    //                 .catch((error) => {
    //                     console.log(error);
    //                 });
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

    const toggleIsDeactivated = (id) => {
        const updatedFounders = founders.map((founder) => {
            if (founder.id === id) {
                const updatedFounder = { ...founder, isDeactivated: !founder.isDeactivated };
                putData(`founder-groomings/${id}`, { isDeactivated: updatedFounder.isDeactivated })
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                return updatedFounder;
            }
            return founder;
        });
        setFounders(updatedFounders);
    };

    return (
        <>
            <Box>
                <Typography variant="h5" color="#009cff" sx={{ fontWeight: 600, mb: 2 }}>
                    Founders
                </Typography>
                <hr />

                <div style={{ height: "100vh", overflowY: "auto" , paddingTop:'20px'}}>
                    <Grid container gap={2} >
                        {founders.map((e) => (
                            <Grid item xs={12} lg={5.5} key={e?.id}>
                                <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <CardActionArea sx={{ display: "flex", justifyContent: "left" }} className="card">
                                        <img
                                            src={e?.founderInfo?.imageRef}
                                            alt="founder's-image founder's-image founder's-image founder's-image"
                                            style={{ height: 150, width: 150, margin: 15, borderRadius: "50%" }}
                                        />
                                        <CardContent>
                                        <div className="toggle">
                                                <ToggleButton
                                                    toggleIsDeactivated={() => toggleIsDeactivated(e?.id)}
                                                    isDeactivated={e?.isDeactivated}
                                                />
                                            </div>
                                            <div className="flex-row">
                                                <Typography
                                                    variant="h6"
                                                    component="div"
                                                    sx={{ fontWeight: 600 }}
                                                >
                                                    {e?.founderInfo?.name}
                                                </Typography>
                                            </div>
                                            <Typography
                                                variant="body1"
                                                color="primary"
                                                sx={{ fontWeight: 600 }}
                                            >
                                                {e?.founderInfo?.designation} At {e?.founderInfo?.companyName}
                                            </Typography>

                                            <Typography
                                                variant="h6"
                                                color="initial"
                                                sx={{ fontWeight: 600 }}
                                            >
                                                ₹{e?.price}
                                            </Typography>

                                            <Button variant="contained" onClick={() => handleOpen(e?.id)}>
                                                Update Info
                                            </Button>

                                            {/* <Button variant="contained"
                                    className="deleteFounder"
                                    onClick={() => deleteFounder(e?.id)}
                                    sx={{ m: 1 }}>
                                    Delete
                                </Button> */}
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <UpdateFounderModal
                    open={updateModalOpen}
                    handleClose={handleClose}
                    update={Update}
                    founderName={founderName}
                    setFounderName={setFounderName}
                    designation={designation}
                    setDesignation={setDesignation}
                    company={company}
                    setCompany={setCompany}
                    price={price}
                    setPrice={setPrice}
                    imageRef={imageRef}
                    setImageRef={setImageRef}

                />
                <CreateFounderModal
                    open={createModalOpen}
                    handleClose={closeModal}
                    create={CreateFounder}
                    founderName={founderName}
                    setFounderName={setFounderName}
                    designation={designation}
                    setDesignation={setDesignation}
                    company={company}
                    setCompany={setCompany}
                    price={price}
                    setPrice={setPrice}
                    imageRef={imageRef}
                    setImageRef={setImageRef}
                />

                <Fab color="primary"
                    id="addFounder"
                    sx={{
                        position: "fixed",
                        top:'5rem',
                        right: "3rem",
                        zIndex: 1000,
                    }}
                    onClick={openModal}
                >
                    <Tooltip title="Add New Founder" placement="top">
                        <AddIcon></AddIcon>
                    </Tooltip>
                </Fab>
            </Box >
        </>
    );
};

export default FoundersGrooming;