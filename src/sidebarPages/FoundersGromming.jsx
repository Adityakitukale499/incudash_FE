import { Button, Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const FoundersGromming = () => {
  const [selectDate, setSelectDate] = useState(new Date());
  return (
    <>
    <Typography variant="h5" color="#009cff" sx={{fontWeight:600}}>Book your mentor for Founder</Typography>
    <hr/>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} md={4} sx={{}}>
    <Typography variant="body1" color="initial" sx={{fontWeight:600, mb:1}}>Calendar Booking</Typography>
          <Calendar
            minDate={new Date()}
            onChange={(e) => setSelectDate(e)}
            value={selectDate}
            style={{maxWidth:'100%'}}
          />
        </Grid>
        <Grid item xs={12} md={8}>
    <Typography variant="h6" color="initial" sx={{fontWeight:600}}>List of founder</Typography>
        <Card sx={{my:1}}>
            <CardActionArea sx={{ display: "flex", justifyContent: "left" }}>
              <img
                src="https://incudash.com/uploads/1665561009_053b82bf62634f7d8266.jpg"
                alt="img"
                style={{ height: 150, margin: 15, borderRadius:'50%' }}
              />
              <CardContent>
              <Typography variant="h6" component="div"  sx={{fontWeight:600}}>
                Priyanka Madnani
                </Typography>
                <Typography variant="body1" color="primary" sx={{fontWeight:600}}>
                Founder & CEO at Easy to Pitch
                </Typography>
                <Typography variant="h6" color="initial" sx={{fontWeight:600}}>
                ₹2500
                </Typography>
                <Button variant="contained">Book Now</Button>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card >
            <CardActionArea sx={{ display: "flex", justifyContent: "left" }}>
              <img
                src="https://incudash.com/uploads/1665563671_208843c8403a91324842.jpg"
                alt="img"
                style={{  height: 150, margin: 15, borderRadius:'50%' }}
              />
              <CardContent sx={{display:'flex', flexDirection:"column", justifyContent:"start",alignContent:'start'}}>
                <Typography variant="h6" component="div"  sx={{fontWeight:600}}>
                Rishabh Taneja
                </Typography>
                <Typography variant="body1" color="primary" sx={{fontWeight:600}}>
                CEO at IncuDash
                </Typography>
                <Typography variant="h6" color="initial" sx={{fontWeight:600}}>
                ₹2500
                </Typography>
                <Button variant="contained">Book Now</Button>
              </CardContent>
            </CardActionArea>
          </Card>

        </Grid>
      </Grid>
    </>
  );
};

export default FoundersGromming;
