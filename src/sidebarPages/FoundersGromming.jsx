import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getData, postData } from "../servises/apicofig";
import { ideaContext, userContext } from "../contextApi/context";
import axios from "axios";
import Step7 from "../Components/BusinessGrooming/Step7";
const FoundersGromming = () => {
  const [selectDate, setSelectDate] = useState(new Date());
  const [founders, setFounders] = useState([]);
  const { loader, setLoader } = useContext(ideaContext);
  const { user, setUser } = useContext(userContext);
  useEffect(() => {
    setLoader(true);
    // getData("founder-groomings")
    //   .then((response) => {
    //     console.log(response.data);
    //     setFounders(response.data);
    //     setLoader(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoader(false);
    //   });
    axios.get(`${import.meta.env.VITE_REACT_BASE_URL}/founder-groomings`).then((response) => {
      console.log(response.data);
      setFounders(response.data);
      setLoader(false);
  })
  .catch((error) => {
      console.log(error);
      setLoader(false);
  });
  }, []);

  const changeSelectData = (e) => {
    console.log(e);
    setSelectDate(e);
  };

  const bookFounder = (founder) => {
    // Calendly.initBadgeWidget({ url: 'https://calendly.com/adityakitukale4599/founder-catch-up', text: 'Schedule time with me', color: '#0069ff', textColor: '#ffffff'})
    Calendly.initPopupWidget({url: `https://calendly.com/adityakitukale4599/founder-catch-up-with-${founder.founderInfo?.name.split(' ').join('-').toLowerCase()}`})
    // const body = {
    //   founderId: founder.id,
    //   dateOfBooking: selectDate,
    //   isBookingCancelled: false,
    //   isBookingRescheduled: false,
    //   userId: user.id,
    // };
    // setLoader(true);
    // postData("founder-bookings", body)
    //   .then((response) => {
    //     console.log(response.data);
    //     setLoader(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoader(false);
    //   });
  };

  return (
    <>   
      <Typography variant="h5" color="#009cff" sx={{ fontWeight: 600, mb: 2 }}>
        Book your mentor for Founder
      </Typography>
      <hr />
      <Grid container sx={{ mt: 2, gap: 1 }}>
        <Grid item xs={12} md={4} sx={{display:'flex', alignItems:'center', flexDirection:'column' }}>
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontWeight: 600, mb: 1, }}
          >
            Calendar Booking
          </Typography>
          <Calendar
            minDate={new Date()}
            onChange={changeSelectData}
            value={selectDate}
            style={{ maxWidth: "100%" }}
          />
          {/* <iframe
            title="Calendly Scheduling"
            width="100%"
            height="800px"
            src={"https://api.calendly.com/scheduled_events/upcoming"}
            frameBorder="0"
          ></iframe> */}
        </Grid>
        <Grid item xs={12} md={7.9}>
          <Typography variant="h6" color="initial" sx={{ fontWeight: 600 }}>
            List of founder
          </Typography>
          {founders.map((e) => (
            <Card sx={{ my: 1 }} key={e.id}>
              {/* {console.log(e)} */}
              <CardActionArea sx={{ display: "flex", justifyContent: "left" }}>
                <img
                  src={e?.founderInfo?.imageRef}
                  alt="img"
                  style={{ height: 150, width:150, margin: 15, borderRadius: "50%" }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 600 }}
                  >
                    {e?.founderInfo?.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  >
                    {e?.founderInfo?.designation}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="initial"
                    sx={{ fontWeight: 600 }}
                  >
                    ₹{e?.price}
                  </Typography>
                  <Button variant="contained" onClick={() => bookFounder(e)}>
                    Book Now
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      </Grid>
    </>
    // <Step7/>
  );
};

export default FoundersGromming;

