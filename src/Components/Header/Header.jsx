import React, { useEffect } from "react";
import {

 Route ,Link
} from "react-router-dom";

import Grid from '@mui/material/Grid';
import "./Style.css"
import listmenu from "../../Menu/Menu-";
import { useState,useRef } from "react";
 
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
 
  const  Header =()=>{

  //property

  const hide={ visibility:"hidden"}



    //state
  const [isClickmenu,setIsclickmenu]=useState(0)
  const [selected,setSelect]=useState(20)
  const [scrollTop, setScrollTop] = useState(0);
  
 


  //event

  const HandleClick=(indx)=>{

    setSelect(indx)
    

  }
 
  
  


  useEffect(() => {
    const onScroll = e => {
      setScrollTop(e.target.documentElement.scrollTop);
     };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

 
  const matches = useMediaQuery('(max-width:768px)');

   
return (


    <Grid   className={scrollTop>200?"Fixed-header flex jus-center al-center":"Header flex jus-center al-center "} > 


      



      <Grid onClick={()=>{setIsclickmenu(1)}} className="Appbar flex jus-center al-center">
           

           <MenuIcon  style={{fontSize:"32px",cursor:"pointer",outlineStyle:"none"}}></MenuIcon>
                     <Link  to="/"><img  onClick={()=>HandleClick(20)} style={{maxHeight:"100px"}}  src="https://fixapp.xyz/wp-content/uploads/2021/11/logo.jpg"></img></Link>

          
         </Grid>

  
       <Grid container spacing={3} className="Menu">

        <Grid  item className="Menu-item">
          
          
          <Link to="/"><img  onClick={()=>HandleClick(20)} style={{maxHeight:"100px"}}  src="https://fixapp.xyz/wp-content/uploads/2021/11/logo.jpg"></img></Link>
          
           </Grid>
      {



        isClickmenu==0? null :      <Grid container className="Moblie-menu">
          
   
            <ul style={{listStyle:"none"}}>


              <Link onClick={()=>setIsclickmenu(0)} to="/">

                <li style={{fontSize:"22px",padding:"10px"}}>

                  HOME

                </li>

                </Link>

              {

                listmenu.map((list,indx)=>{


                  return ( <Link to={list.link} onClick={()=>setIsclickmenu(0)}>


                    <li style={{fontSize:"22px",padding:"10px"}}>


                     {list.name}

                    </li>



                  </Link>)

                })
              }



            </ul>
          
          
          
           </Grid>

      }




 
      

      {listmenu.map((data,indx)=>{


        return (


          <Grid key={indx} item className="Menu-item"> 
          

            <Link  to={data.link} onClick={()=>HandleClick(indx)} className={indx==selected?"active":"unactive"}>{data.name}</Link>
          
           </Grid>


        )


      })}

      </Grid>
      
    </Grid>
);

    
 

}




 

export default Header
