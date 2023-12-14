import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import StartupSupportModal from "../Components/StartupSupportModal";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";

const StartupSupport = () => {
  const arr = [1, 1, 1, 1, 1];
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState([
    {
      heading: "what is incudash",
      content:
        "masterclasses, and 24/7 support to get your startup growing. From board deck templates to quick tips on customer acquisition, this content is made just for you. Plus, you’ll have access to world-class support from HubSpot experts and a startup-friendly onboarding experience. - PROFESSIONAL SOFTWARE, STARTUP PRICING | Access to HubSpot Growth Platform, a full suite of software for marketing, sales, and customer service, with a completely free CRM at its core at a startup-friendly price, to help you grow and scale better. The software grows as you do, so you have access to in-person product training, too. All of this is up to 90% off. [Learn more about the software [here](https://hubs.ly/H0gBN380).] - INTEGRATED PLATFORM FOR STARTUPS",
    },
    {
      heading: "Who is eligible?",
      content:
        "Any startup that is a current participant or alumni of NSRCEL and meets certain funding criteria is eligible for this exclusive program!  See below for more detaileIf you are...A startup with under $2 million in funding You are eligible for up to 90% off HubSpot software in your first year, 50% off in your second, and 25% off ongoing. - A startup who has raised over $2 million in named funding up to and including Series A | You are eligible for up to 50% off in your first year, and 25% off ongoing.        HubSpot for Startups pricing is applicable to net-new Professional or Enterprise level products. Starter level products are excluded, unless bundled with qualifying Professional or Enterprise purchases or upgrades. Customers may not apply the startup program pricing to existing subscriptions of any level.",
    },
    {
      heading: "Getting Access",
      content: "Raise a request on https://bit.ly/GetAccesstoNSRCELStartupKit",
    },
  ]);
  const [heading, setHeading] = useState("Incudash");
  const openModal = (head, mgs) => {
    setHeading(head);
    setMessage(mgs);
    setOpen(true);
  };

  return (
    <>
      <StartupSupportModal
        open={open}
        setOpen={setOpen}
        heading={heading}
        messages={message}
      />
      <Typography variant="h5" color="#009cff" sx={{ fontWeight: 600, mb: 2 }}>
        StartUp Support
      </Typography>
      <hr />
      {/* <Grid container gap={5} my={3} sx={{ display: "flex" }}>
        {arr.map((e, i) => (
          <Grid item key={i + "card"} lg={2.1} md={3} xs={5}>
            <Card
              key={i + "card"}
              sx={{
                border: 1,
                boxShadow: " 1px 1px 20px #888888",
                borderColor: "#888888",
              }}
              onClick={() => openModal(heading, message)}
            >
              <CardActionArea sx={{ textAlign: "start" }}>
                <CardContent sx={{display:'flex', justifyContent:'center'}}>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqsGmeujPuFNcJ3D7Ms_xMDkyfyU2or8tSiBDQTFB1&s"
                    alt="incuDashImg"
                    height={50}
                  />
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    height: 35,
                    borderTop: "1px solid #888888",
                    gap:1, overflow:'scroll'
                  }}
                >
                 <StickyNote2Icon/> incudash 
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid> */}
      {/* <object type="text/html" data="https://nsrcel.notion.site/nsrcel/047dc60c1d5f435a99012f60693e3e96?v=218cd35d120a4edbb1c24e834beff3a1" width="500px" height="350px"></object>

      <iframe src="https://nsrcel.notion.site/nsrcel/047dc60c1d5f435a99012f60693e3e96?v=218cd35d120a4edbb1c24e834beff3a1" frameborder="0"></iframe> */}
      <Button variant="contained" sx={{ width: 130, mt:2 }}>
        <a
          href="https://nsrcel.notion.site/047dc60c1d5f435a99012f60693e3e96?v=218cd35d120a4edbb1c24e834beff3a1"
          target="_blanck"
          style={{ textDecoration: "none", color: "#fff" }}
        >
          {" "}
          Startup Kit
        </a>
      </Button>
    </>
  );
};

export default StartupSupport;
