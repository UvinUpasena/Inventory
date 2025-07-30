import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//import { Link } from "react-router-dom";
//import { VITE_BACKEND_URL } from "../App";
//import Product from "../components/Product";


const CreatePage = () => {
    
    const [name,setName] = useState("") ;
    const [quantity,setquantity] = useState("") ;
    const [price,setprice] = useState("") ;
    const [image,setimage] = useState("") ;
    const [isloading,setIsloading] = useState(false); //to disable the submit button after clicking it
    const navigate = useNavigate(); 

    const saveProdut = async(e) =>{
      e.preventDefault(); // prevent refreshing the page
      
      if (name == "" || quantity == "" || price == "" || image == "" ){
            alert("Please fill out all fields completely");
            return;
      }
      try{
          setIsloading(true);
          const response = await axios.post(`http://localhost:3000/api/products`,{name:name,quantity:quantity,price:price,image:image}) //because of axios we have use asycs
          toast.success(`Save ${response.data.name} sucessfully`);
          
          setIsloading(false);  
          navigate("/");


        }catch(error){
         console.log(error);
         setIsloading(false);
      }
    }
    
    return (
      <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
         <h2 className="font-semibold text-2xl mb-4 block text-center">
        
        </h2>
        <form onSubmit={saveProdut}>
          <div className="space-y-2">

             <div>   
                  <label>Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Name" />
             </div>

             <div>
                  <label>Quantity</label>
                  <input type="number" value={quantity} onChange={(e) => setquantity(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Quantity" />
             </div>

             <div>
                  <label>Price</label>
                  <input type="text" value={price} onChange={(e) => setprice(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Price" />
             </div> 

             <div>
                  <label>Image URL</label>
                  <input type="text"  value={image} onChange={(e) => setimage(e.target.value)}  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Image URL" />
             </div>

             <div>
                {!isloading && (<button className="ck w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Save</button>
                 )} 
             </div>

          </div>  
        </form>
      </div>

    )
  }
  
  export default CreatePage;


//before adding values we have to declare states for each box
//we have to put onchage otherwise we cannot type anything
//when somebody is typing on keyboard we detect even {e}
//except of alert we are using toastify
//remove console.log(error); and put toast.