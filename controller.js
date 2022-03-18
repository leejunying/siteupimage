 
  
var fs = require("fs");
const path = require("path");

 
const getImages = async () => {
  try {
    const data = await fs.promises.readFile("./storage.json", "utf8");

    console.log(JSON.parse(data));

    return JSON.parse(data)
  } catch (err) {
    console.log("Load dữ liệu thất bại ");
    throw err;
  }
};
 

const addImage = async (data) => {
  try {
    const oldlist = await fs.promises.readFile("./storage.json", "utf8");

 

    let newlist = JSON.parse(oldlist);
 

    newlist = [...newlist, data];

    await fs.promises.writeFile(
      "./storage.json",
      JSON.stringify(newlist),
   
    );

    console.log('Image upload successfully')

  } catch (err) {
    console.log("thêm mới thất bại");
    throw err;
  }
};

 

 
// const deleteImage = async (key) => {
//   try {
//     let found = await foundindx(key);

//     if(found!=[])
//     {
//     const oldlist = await fs.promises.readFile("./student.json", "utf8");

//     let newlist = JSON.parse(oldlist);
    
//     newlist=newlist.filter(data=>found.indexOf(JSON.parse(data).id)==-1)
//     await fs.promises.writeFile(
//         "./student.json",
//         JSON.stringify(newlist),
    
//       );

//     console.log("Xóa thành công")
//     console.log(newlist)
//   }
//   else
//   {

//     console.log("Không có ai để xóa")
//   }
  
  
  
//   } catch (err) {
//     console.log("Lỗi rồi xóa không được");
//     throw err;
//   }
// };

module.exports={


    getImages,
    addImage, 



}