import React, { useContext } from "react";

 import { Grid } from "@mui/material";
 
 import "./Upload.css"
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import listmenu from "../../Menu/Menu-";
import axios from "axios";
import {host} from "../../API/API"
import { Globalimage } from "../../App";

const Upload=(props)=>{


const context=useContext(Globalimage)
 

 
//state
 
const [selectmenu,setSelectmenu] =useState(listmenu[0].link)

const [image,setImage]=useState()

const [imagename,setImagename]=useState("")

const [notice,setNotice]=useState("")
 

 

//event

const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setImagename(e.target.files[0].name)
    
    }
  };

    const handleChange = (e) => {

    setSelectmenu(e.target.value)
  };



const uploadImg=()=>{

 

    
 

  let name = selectmenu+'-'+imagename
  

  console.log(name)
 
  let cleartime=604800
 
    let body = new FormData()
    body.set('key', '2faacfff6afcd1a45672e6423d875b2e')
    body.append('image', image)
    body.append('name',name)
    body.append('expiration',`${cleartime}`)


    return axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',  
      data: body
    }).then((result)=>{
      

      if(result.data.status==200)
      { setImage(undefined)
        setImagename('')
        setNotice('Upload successfully')



         
        //save to server file system
        axios.post(host.upload,{ image: result.data.data.display_url})

        props.Updatedata(result.data.data.display_url)
        
        context['setData']([...context['data'],result.data.data.display_url])
 
 
       }
      else{

        setNotice('Upload failed may be Image higher 32mb')
      }

    })



   
}

   
    setTimeout(()=>{
      setNotice("")
    },2000)
    
//render

return (

    <Grid className="Upload-cp ">

     
        <Grid style={{marginTop:"2%"}} className="file-upload-warp flex jus-center">
            
        <div style={{
             display: 'flex',
             margin: 'auto',
             width: 400,
             flexWrap: 'wrap', }}>
      <div style={{ width: '100%', float: 'left' }}>
        <h3>Choose and upload new image?</h3> <br />
   
      <input 
        onChange={(e)=>imageChange(e)}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        id="contained-button-file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Choose image
        </Button>
      </label>
         </div>

        {

            image!=undefined?        <img style={{width:"400px",height:"auto",marginTop:"10px"}}
              src={URL.createObjectURL(image)}
               alt="Thumb"
            /> :null
        

        }


      <Grid  container   style={{width:"",height:"200px",flexDirection:"column"}} className="flex  jus-center  ">
        
        
      <Grid  item>
 
        <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Album</FormLabel>
      <RadioGroup 
         onChange={handleChange}
         aria-labelledby="demo-radio-buttons-group-label"
         defaultValue={listmenu[0].link}
        name="radio-buttons-group"
      > 

        {

          listmenu.map((list,indx)=>{

            return (


               <FormControlLabel key={indx} style={{fontSize:"14px"}} value={list.link} control={<Radio />} label={list.name} />
            )

          })

        }

       
         
      </RadioGroup>
    </FormControl>
        
        
        </Grid> 


      <Grid item className="flex sp-between" >    
       <button 
       
        onClick={()=>uploadImg()}
       style={{cursor:"pointer",marginTop:"20px",fontSize:"16px",padding:"10px",background:"#6ad16a",color:"#272c28",outlineStyle:"none",border:"none"}} className="btnAdd">ADD Image</button>
       
           <button onClick={()=>props.handleUpload()} style={{cursor:"pointer",marginTop:"20px",fontSize:"16px",padding:"10px",background:"gray",color:"white",outlineStyle:"none",border:"none"}} className="btnAdd">  BACK TO HOME</button>
       
       
       </Grid>
           

         </Grid>

     
             
                <p style={{fontSize:"22px",color:"green"}}>{notice}</p>
    </div>
       

      
            </Grid> 
        

      
    </Grid>



)



}


export default Upload