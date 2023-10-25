import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, CardActions } from '@mui/material';
import { MdDoubleArrow } from "react-icons/md";


export function BasicCard() {
  return (
    <Card sx={{ Width: 260, borderColor:'#fe6508' }}>
      <CardActionArea sx={{textAlign:'start'}}>
        <img src="https://img.icons8.com/?size=200&id=48177&format=png" alt="img" style={{height:60, margin:5 }}/>
        <CardContent>
          <Typography variant="" component="div">
            Start'Up Stage
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.hdkjfghdfjjfjnjfdnv
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{backgroundColor:'#fe6508', color:'#fff', display:'flex', justifyContent:'center', height:30}}>
        Reviwe
      </CardActions>
    </Card>
  );
}

export function VideoCard() {
  return (
    <Card sx={{ Width: 260, borderColor:'#fe6508'}}>
      <CardActionArea sx={{textAlign:'start'}}>
      <iframe width="100%"  src="https://www.youtube.com/embed/xLheuIDOWEw?si=ZyCySf9sbAe6jf5N" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </Typography>
          {/* <Typography variant="subtitle1" color="primary">
           Watch Now <MdDoubleArrow size={20}/>
          </Typography> */}
        </CardContent>
      </CardActionArea>
      {/* <CardActions sx={{backgroundColor:'#fe6508', color:'#fff', display:'flex', justifyContent:'center', height:30}}>
        Reviwe
      </CardActions> */}
    </Card>
  );
}

export function TestimonalCard() {
  return (
    <Card sx={{ Width: 260, borderColor:'#fe6508', border:"1px solid lightBlue"}}>
      <CardActionArea sx={{textAlign:'start'}}>
      
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing. Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, quibusdam laudantium. Mollitia dicta quasi soluta, voluptatem et iusto quae suscipit. Repellat aliquid dicta ea cupiditate rerum at corporis laborum consequatur.
          </Typography>
          <Box sx={{display:'flex', mt:5}}><img src="https://d5nunyagcicgy.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg" alt="Priynka mandani" style={{height:60, marginRight:10}}/>
          <Typography variant="subtitle1" color="primary">
           Priyanka Mndhani
           <div style={{color:'#000', fontSize:12, marginTop:-10}}>Founder & CEO - The founder</div>
          </Typography>
          
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}