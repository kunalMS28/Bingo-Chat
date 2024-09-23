import { UseAppStore } from '@/store'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { colors, getColor } from '@/lib/utils';
import { FaTrash, FaPlus } from "react-icons/fa";
import { Input } from '@/components/ui/input'; 
import { Button } from '@/components/ui/button';
import { ADD_PROFILE_IMAGE_ROUTE, REMOVE_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_ROUTE } from '@/utils/constants';

import { apiCLient } from '@/lib/api-client';
import { toast } from 'sonner';
import { HOST } from '@/utils/constants';


const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = UseAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const fileInputRef = useRef(null);


  useEffect(()=>{
    if(userInfo.profileSetUp){
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.Color);
    }

    if(userInfo.image){
      setImage(`${HOST}/${userInfo.image}`);
    }
  },[userInfo]);

  


  const validateProfile=()=>{
    if(!firstName){
      toast.error("first name is required.");
      return false;
    }
    if(!lastName){
      toast.error("Last name is required.");
      return false;
    }
    return true;
  }

  const saveChanges = async ()=>{ 
    if (validateProfile()){
      try{
        

          const response = await apiCLient.post(UPDATE_PROFILE_ROUTE,
            {firstName,lastName,color:selectedColor},
            {withCredentials:true} );

          

          if(response.status === 201 && response.data ){
            
            setUserInfo({...response.data});
            toast.success(" profile updated successfully. ");
            
            navigate("/chat");
            

          }

         
          
      }
      catch(error){
        console.log(error);
      }
    }
  };

 
  // bg-[#1b1c24]

  const handleNavigate =()=>{
    if(userInfo.profileSetUp){navigate("/chat");}
    else{ toast.error("please set up ur profile");}
  }

  const handleFileInputClick =()=>{
    fileInputRef.current.click();
  };

  const handleImageChange =async (event)=>{
    const file= event.target.files[0];
    
    if(file){
      const formData = new FormData();
      formData.append("profile-image",file);
      const response = await apiCLient.post(ADD_PROFILE_IMAGE_ROUTE,formData,{withCredentials:true});
      if(response.status ===200 && response.data.image){
        setUserInfo({...userInfo, image: response.data.image});
        toast.success("image updated succesfully.");
      }
     
    }
  };

  const handleDeleteImage =async ()=>{
    try {
      
      const response = await apiCLient.delete(REMOVE_PROFILE_IMAGE_ROUTE,{withCredentials:true});
      
      if(response.status === 201 && !response.data.image){
         
        setUserInfo({...userInfo, image: null});
        toast.success("image REMOVED succesfully.");
        setImage(null);
      }
      
    } catch (error) {
     console.log(error);
      
    }
  };

  return (
      // bg-[#232330]
    <div className=" h-[100vh] bg-stone-800 flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div onClick={handleNavigate}>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
           >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (<AvatarImage 
              src={image}
              alt="profile"
              className="object-cover w-full h-full bg-black" />) :
                (
                  <div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px]  flex items-center justify-center rounded-full  ${getColor(selectedColor)}`}>
                    {firstName
                      ? firstName.split("").shift()
                      : userInfo.email.split("").shift()}
                  </div>

                )}
            </Avatar>
            {
              hovered && (
                <div className='absolute inset-0 flex items-center justify-center bg-black/60 rounded-full cursor-pointer ' onClick={image ? handleDeleteImage : handleFileInputClick}>
                  {
                    image ? <FaTrash className='text-white text-3xl cursor-pointer' /> : <FaPlus className='text-white text-3xl cursor-pointer' />
                  }
                </div>
              )
            }
            <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleImageChange} 
            name='profile-image'
            accept='.jpg , .png , .svg , .jpeg , .webp'/>
          </div>

          <div className='flex min-w-32 md:min-w-64 flex-col  gap-5 text text-white items-center justify-center'>

           

             <div className='w-full'>
            <Input type="email"
             placeholder="Email" disabled 
             value={userInfo.email} 
             className="rounded-lg p-6 bg-[#2c2e3b] border-none"/>
            </div>
          
          
            <div className='w-full'>

            <Input type="text"
             placeholder="First Name" 
             onChange={(e)=>{setFirstName(e.target.value)}}
             value={firstName} 
             className="rounded-lg p-6 bg-[#2c2e3b] border-none"/>

            </div>
          
          
            <div className='w-full'>

            <Input type="text"
             placeholder="Last name"
             onChange={(e)=>{setLastName(e.target.value)}} 
             value={lastName} 
             className="rounded-lg p-6 bg-[#2c2e3b] border-none"/>
             
            </div>
           
             <div className=' w-full flex gap-5 '>
                {
                  colors.map((color,index)=>(
                    <div className={`${color} bg-${color} w-8 h-8 rounded-xl cursor-pointer transition-all duration-300    ${selectedColor == index ? "outline outline-white outline-3":""}`}
                    key={index}
                    onClick={()=>{setSelectedColor(index)}}>

                    </div>
                  ))
                }

            </div>

          </div>
        </div>
        <div className='w-full'>
          <Button className={`w-full h-14 transtion-all bg-${getColor(selectedColor)} hover:bg-slate-100 font-bold border-white border-2`} onClick={saveChanges} >Save Changes</Button>
          {/* onClick={saveChanges} */}
        </div>
      </div>
    </div >
  )
}

export default Profile;
