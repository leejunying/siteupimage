import React from "react";
import { Grid } from "@mui/material";
import Header from "../Header/Header";
import "./Post.css"
import { useContext } from "react";
import { Globalimage } from "../../App";
import {useLocation, useParams} from "react-router-dom"
import { FindimagebyName, FindnewimgbyNumber, Getnameimg } from "../../Function/Function";
import useMediaQuery from '@mui/material/useMediaQuery';
import Footer from "../Footer/Footer";
 const Post=()=>{

const context=useContext(Globalimage)
 
const params=useParams()
const url=useLocation()
 

const data=context['data'].filter((value)=>{ return value.includes(params.name)==true})[0]


let a=url.pathname.indexOf(params.name)

let menu=url.pathname.slice(0,a-1)
 let list = FindnewimgbyNumber(6,FindimagebyName(menu,context['data'])).filter((value)=>{return value.includes(params.name)==false})
list = list.sort(() => Math.random() - 0.5)
 
const onclciktoPost=(obj)=>{

 window.location.assign(`${obj['link']}/${obj['name']}`)

}
//render 

   const matches = useMediaQuery('(max-width:768px)');

return (



<Grid container  style={{width:"100%"}} className="flex   jus-center  Post">

    <Header></Header>
    <Grid item style={{width:"60%",display:"flex",flexDirection:"column"}} className="Post-conten "  >

        <Grid item style={{width:"100%",marginBottom:"10px"}}  >
     Name: <h5>{params.name}</h5></Grid>

                <Grid item  style={{height:"500px"}} > <img style={{maxWidth:"100%",height:"100%",objectFit:"cover"}} src={data}></img></Grid>


    


        

    </Grid>
    
    <Grid container  spacing={2} style={{width:"60%",marginTop:"10px"}} className="Suggest-image  ">
  
         
         
           {

       list.map((item,indx)=>{return (



        <Grid item  style={{cursor:"pointer"}} onClick={()=>{onclciktoPost(Getnameimg(item))}}   xs={matches==true?6:4} key={indx}> 
        

            <img style={{width:"100%",height:"300px",objectFit:"cover"}} src={item}></img>
        
            <h5>{Getnameimg(item).name}</h5>
        
         </Grid>

       )})

     }

         
      
   



    </Grid>


     <Grid container  style={{width:"60%",marginTop:"10px"}}  className="fb " >


 

     <div style={matches==true? {marginBottom:"100px"} : {marginBottom:"100px"}} className="fb-page" 
data-href="https://www.facebook.com/facebook"
data-width={matches==true?"200":"500"}  
data-hide-cover="false"
data-show-facepile="false"></div>

  <Footer></Footer>
     </Grid>






</Grid>


)

}


export default Post