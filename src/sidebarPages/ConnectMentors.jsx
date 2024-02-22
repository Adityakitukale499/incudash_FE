import {
  Avatar,
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
const ConnectMentors = () => {
  const [selectDate, setSelectDate] = useState(new Date());
  const [founders, setFounders] = useState([]);
  const { loader, setLoader } = useContext(ideaContext);
  const { user, setUser } = useContext(userContext);
  useEffect(() => {
    setLoader(true);
    getData("mentor-groomings")
      .then((response) => {
        console.log(response.data);
        setFounders(response.data);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
    // axios
    //   .get(`${import.meta.env.VITE_REACT_BASE_URL}/mentor-groomings`)
    //   .then((response) => {
    //     console.log(response.data);
    //     setFounders(response.data);
    //     setLoader(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoader(false);
    //   });
  }, []);

  const changeSelectData = (e) => {
    console.log(e);
    setSelectDate(e);
  };

  const bookFounder = (founder) => {
    // Calendly.initBadgeWidget({ url: 'https://calendly.com/adityakitukale4599/founder-catch-up', text: 'Schedule time with me', color: '#0069ff', textColor: '#ffffff'})
    // Calendly.initPopupWidget({
    //   url: `https://calendly.com/adityakitukale4599/founder-catch-up-with-${founder.founderInfo?.name
    //     .split(" ")
    //     .join("-")
    //     .toLowerCase()}`,
    // });
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
        <Grid item xs={12} md={4} sx={{display:'flex',alignItems:'center', flexDirection:'column'}}>
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontWeight: 600, mb: 1 }}
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
               <Avatar src={e?.mentorInfo?.imageRef}
                  sx={{
                    height: 150,
                    width: 150,
                    m:'15px'
                  }}/>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 600 }}
                  >
                    {e?.mentorInfo?.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  >
                    {e?.mentorInfo?.designation}
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

export default ConnectMentors;

// {
//   "_id": "6543a5976521a004208a66ae",
//   "published_at": "2023-11-02T13:35:27.932Z",
//   "founderGrooming": {
//       "_id": "6543a5976521a004208a66af",
//       "maxBookingInADay": "5",
//       "price": "2500",
//       "isDisabled": false,
//       "isDeactivated": false,
//       "founderInfo": {
//           "_id": "6543a5976521a004208a66b0",
//           "name": "Priyanka Madnani",
//           "designation": "Founder & CEO at Easy to Pitch",
//           "companyName": "Incudash",
//           "imageRef": "https://incudash.com/uploads/1665561009_053b82bf62634f7d8266.jpg",
//           "__v": 0,
//           "id": "6543a5976521a004208a66b0"
//       },
//       "__v": 1,
//       "id": "6543a5976521a004208a66af"
//   },
//   "createdAt": "2023-11-02T13:35:19.628Z",
//   "updatedAt": "2023-11-02T13:35:28.251Z",
//   "__v": 1,
//   "id": "6543a5976521a004208a66ae"
// }
