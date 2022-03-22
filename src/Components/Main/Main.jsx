import React, { useEffect } from "react";

import Grid from '@mui/material/Grid';

import Header from "../Header/Header";

import listmenu from "../../Menu/Menu-";
import "./Style.css"
import { useState } from "react";
import Upload from "../Upload/Upload";
import { FindimagebyName ,FindnewimgbyNumber,Getnameimg} from "../../Function/Function";
import axios from "axios";
import { host } from "../../API/API";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';

import Footer from "../Footer/Footer";

 
  
const Main=()=>{
   const matches = useMediaQuery('(max-width:768px)');


//state 

const [isupload,SetIsupload]=useState(0)
const [selectmenu,setSelectmenu]=useState({
   name:"main",
  link:"/"
 

})

 const  [data,setData]=useState([])

 
 //Load data from server

  useEffect(()=>{

    axios.get(host.load).then((res)=>{

       setData(res.data)
    })



  },[])



//Get Location

let url =useLocation()

 useEffect(()=>{

  

  if(url.pathname!='/')
  { 
      console.log(url)
     let choose= listmenu.filter((data)=>{



    return  data.link==url.pathname

  })

    setSelectmenu(choose[0])
  }
  else 
  {

    setSelectmenu({
      name:'main',
      link:'/'


    })
  }


   
 },[url])

  
 
 


//event

const Updatedata=(newdata)=>{

    setData([...data,newdata])


} 

const onclciktoPost=(obj)=>{

 window.location.assign(`${obj['link']}/${obj['name']}`)

}

//render 

return (

<Grid>
    <Grid  className="Main "> 

     {
         
        isupload==1?  <Upload  data={data} Updatedata={Updatedata}   handleUpload={()=>SetIsupload(0)}  ></Upload> :null

     }

     <Header></Header>
      <Grid container className="flex jus-center upload-box">


 

    
   





        <Grid container  className="upload-btn-wrapper flex jus-center">
  <button onClick={()=>SetIsupload(1)} className="btn">Upload image</button>
 </Grid>

 
    
    </Grid> 



     {


      selectmenu.link=='/'?  
     <Grid  container  className="Content flex  ">

  



    {

        
        listmenu.map((list,indx)=>{


            return (


                <Grid key={indx} container  style={{width:"70%",margin:"0% 15% 5% 15%"}}  className='Section-menu'  > 
                 
                 <Grid style={{margin:"20px"}} item className="title" >{list.name} </Grid>

                  <Grid container  spacing={0.5}  className="new-arrival"> 
                  
 
                    {

                      data.length>0?  FindnewimgbyNumber(8,FindimagebyName(list.link,data)).map((image,indx)=>{

                        return  <Grid item  onClick={()=>onclciktoPost(Getnameimg(image))} key={indx} xs={matches==true?6:3}  style={{maxHeight:"500px",marginBottom:"10px"}} className="content-img" >  
                                
                                
                                
                                      <img style={{height:"90%",cursor:'pointer'}} src={image}>


                                      </img>
                                <h5   style={{margin:'0 20px'}}>  {Getnameimg(image).name}</h5>

                               
                          
                            
                             </Grid>

                     }) 
                     
                     
                     
                     
                     :null


                    }

      
                  
                  
                  </Grid>  
                
                 </Grid>



            )


        })


      }


     </Grid> : 


      <Grid style={{marginTop:"5%"}} container className="Album " > 
       
      <Grid  style={{width:'80%',margin:"0 10%"}} spacing={2} container className="Album-content">

      <Grid container > <h3>{selectmenu.name}</h3> </Grid>
                    {

                      

                        data.filter((value)=>{ if(value.includes(selectmenu.link)==true)return value}).reverse().map((item,indx)=>{

                                  return   <Grid item  onClick={()=>onclciktoPost(Getnameimg(item))} key={indx} xs={3}  style={{maxHeight:"500px",marginBottom:"10px"}} className="album-img" >  

                                 <img style={{height:"90%",cursor:'pointer'}} src={item}></img>
                                <h5   style={{margin:'0 20px'}}> {Getnameimg(item).name} </h5>

                                
                            
                            
                             </Grid>
                  



                        })


                

                     }
      </Grid>

        
                  
 
                     
                     
                     
              


                
      
                  
             



      
      
      
      
      
      
      
      
      
      
      </Grid>
  
     }



 
     </Grid>
 

 

 </Grid>

)



}

export default Main