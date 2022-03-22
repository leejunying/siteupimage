 import React, { useState } from 'react';
import './App.css';
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 import Main from './Components/Main/Main';
  import listmenu from './Menu/Menu-';
  import { useEffect } from 'react';
   import { host } from './API/API';
import axios from 'axios';

import Post from './Components/Post/Post';
import Footer from './Components/Footer/Footer';
export  const Globalimage=React.createContext({})


const App=() =>{

 const  [data,setData]=useState([])


 //Load data from server

  useEffect(()=>{

    axios.get(host.load).then((res)=>{

        console.log(res)
      setData(res.data)
    })



  },[])


 


  


  // event

 




  return (

    <Globalimage.Provider value={{

     data,setData


    }}>
       <Router>

 
      <Routes>     
       {/* 

      <Route path="/mauxinh" element={<Post></Post>} ></Route>
      
      <Route path="/maubikini" element={<Post></Post>}></Route>

      <Route path="/mauhuongngoai"element={<Post></Post>} ></Route>

      <Route path="/maucatinh"element={<Post></Post>}></Route> */}

      <Route path="/" element={<Main></Main>}>  </Route>

        {

        listmenu.map((listitem,indx)=>{



          return (

            <Route key={indx} path={listitem['link']} element={<Main></Main>}></Route>


          )
        })

      }

       {

        listmenu.map((listitem,indx)=>{



          return (

            <Route key={indx} path={`${listitem['link']}/:name`} element={<Post></Post>}></Route>
 
 
          )
        })

      }


     </Routes>
          </Router>
         
         </Globalimage.Provider>
  );
}

export default App;
