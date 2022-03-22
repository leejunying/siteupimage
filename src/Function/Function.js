import listmenu from "../Menu/Menu-"


export const FindimagebyName=(name,array)=>{


return  array.filter((data)=>{



    return data.includes(name)==true


})



}


export const Getnameimg=(link)=>{


    let menu =listmenu.filter((value)=>{if(link.includes(value.link)==true)return value})[0].link

 

     let start =link.indexOf(menu)+menu.length+1
 

    link=link.slice(start,link.length)

     let end =link.indexOf('.')

    link=link.slice(0,end)
 
    return {

        name:link,
        link:menu

    }
}

export const FindnewimgbyNumber=(number, array)=>{


    array.reverse()

 return   array.filter((data,indx)=>{

        return indx<number
    })


}

 