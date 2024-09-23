import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { UseAppStore } from '@/store';
import React from 'react';
import { HOST, LOGOUT_ROUTE } from '@/utils/constants';
import { getColor } from '@/lib/utils';
import { FiEdit2 } from 'react-icons/fi';
import {Tooltip,TooltipContent,TooltipProvider,TooltipTrigger,} from "@/components/ui/tooltip";
import {  useNavigate } from 'react-router-dom';
import  {IoLogOut} from "react-icons/io5"
import { apiCLient } from '@/lib/api-client';
  

const ProfileInfo = () => {
    
    const {userInfo,setUserInfo} = UseAppStore();
    const navigate =  useNavigate();

    const logOut = async ()=>{
      
  try {
    
    const response =  await apiCLient.post(LOGOUT_ROUTE,{},{withCredentials:true});
    
    if(response.status == 201 ){
        
        navigate("/auth");
        setUserInfo(null);
    }
    
  } catch (error) {
    console.log(error);
  }

//   bg-[#212b33]
    }
    return (
        <div className='absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-black'>
            <div className='flex gap-3 items-center justify-center text-white'>
                <div className='w-12 h-12 relative'>

                    <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                        {userInfo.image ? (<AvatarImage
                            src={`${HOST}/${userInfo.image}`}
                            alt="profile"
                            className="object-cover w-full h-full bg-black" />) :
                            (
                                <div className={`uppercase h-12 w-12  text-lg border-[1px]  flex items-center justify-center rounded-full  ${getColor(userInfo.color)}`}>
                                    {userInfo.firstName
                                        ? userInfo.firstName.split("").shift()
                                        : userInfo.email.split("").shift()}
                                </div>

                            )}
                    </Avatar>
                </div>
                <div> 
                {userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}`: " "}
                
            
           
                </div>
            </div>
            <div className='flex gap-5'>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <FiEdit2 className=" text-xl text-purple-500 font-medium"
                            onClick={()=>navigate('/profile')}/>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Edit Profile</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>


              {/* log out  */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <IoLogOut className=" text-xl text-purple-500 font-medium"
                            onClick={logOut}/>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>LOG OUT</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>


            </div>
        </div>
    )
}

export default ProfileInfo;
