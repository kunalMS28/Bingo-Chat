import React, { useState } from 'react';
import victory from"../../assets/victory.svg"
import login2 from"../../assets/login2.png"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constants';
import { apiCLient } from '@/lib/api-client';
import { useNavigate } from 'react-router-dom';
import { UseAppStore } from '@/store';




const Auth = () => {
const navigate = useNavigate();
const {userInfo,setUserInfo}= UseAppStore();
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[confirmPassword,setConfirmPassword]=useState("");

  const validateSignup =()=>{
    if(email.length == 0){
      toast.error("Email is required");
      return false;
      }
    if(!password.length){
      toast.error("Password  is required");
      return false;
      }
    
    if(confirmPassword !== password){
      toast.error("Confirmation password did not match");
      return false;
      }
    return true;
  }

 
  const validateLogin =()=>{
    if(!email.length ){
      toast.error("Email is required");
      return false;
      }
    if(!password.length){
      toast.error("Password  is required");
      return false;
      }
    
    
    return true;
  }

  const handleLogin = async()=>{
    if(validateLogin()){ 
      
      const response = await apiCLient.post(LOGIN_ROUTE,{email,password},{withCredentials:true});
      
      if(response.data.user.id){
        setUserInfo(response.data.user);
        if(response.data.user.profileSetup)  navigate("/chat");
        else navigate("/profile");
      }
      
    }

  };

  const handleSignUp = async()=>{
    if(validateSignup()){
      
      const response = await apiCLient.post(SIGNUP_ROUTE,{email,password},{withCredentials:true});
      if(response.status == 201){ //sucessfull
        setUserInfo(response.data.user);
        navigate("/profile");
      }
     
    }
   
};


  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
      
      <div className=' box-content h-[80vh]  bg-white border-2 border-violet-300 text-opacity-90 shadow-2xl rounded-3xl w-[95vw] md:w-[90vw] lg:[70vw] xl:w-[60vw] grid xl:grid-cols-2 '>
        
        <div className='flex flex-col gap-10 items-center justify-center px-4 '>
         
          <div className='flex flex-col items-center justify-center '>
            <div className='flex items-center justify-center'>
              <h1 className='text-5xl font-bold md:text-6xl'>Welcome</h1>
              <img src={victory} alt='victory image' className='h-[100px]'/>
            </div>
            <p>Fill the details below to get started with our chat app</p>

          </div>
          {/* tabs  */}
          <div className='flex items-center justify-center w-full'>
              <Tabs className="w-3/4" >
                <TabsList className="bg-transparent rounded-none w-full" >
                <TabsTrigger 
                className=" w-full data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none  data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:border-purple-500 p-3 transition-all duration-300" 
                value="login" >Login</TabsTrigger>
                <TabsTrigger 
                className=" w-full data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none  data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:border-purple-500 p-3 transition-all duration-300" 
                value="signup">Signup</TabsTrigger>
                </TabsList>



                   { /* LOGIN PAGE  */ }
                < TabsContent className="flex flex-col gap-4 mt-3" value="login">
                <Input 
                placeholder="Email"
                 type="email" 
                 className="rounded-lg p-6 border-2 " 
                 value={email} 
                 onChange={(e)=>setEmail(e.target.value)}/>

                <Input 
                placeholder="Password"
                 type="password" 
                 className="rounded-lg p-6 border-2 " 
                 value={password} 
                 onChange={(e)=>setPassword(e.target.value)}/>

                  <Button className="rounded-lg p-6 bg-purple-500 hover:bg-purple-800 "  onClick={handleLogin} >LOG IN</Button>

                
                </TabsContent>
                
                   {/* SIGNUP PAGE  */}
                < TabsContent className="flex flex-col gap-3 mt-3" value="signup">
                
                <Input 
                placeholder="Email"
                 type="email" 
                 className="rounded-lg p-6 border-2 " 
                 value={email} 
                 onChange={(e)=>setEmail(e.target.value)}/>

                <Input 
                placeholder="Password"
                 type="password" 
                 className="rounded-lg p-6 border-2 " 
                 value={password} 
                 onChange={(e)=>setPassword(e.target.value)}/>

                <Input 
                placeholder="Confirm your Password"
                 type="password" 
                 className="rounded-lg p-6 border-2 " 
                 value={confirmPassword} 
                 onChange={(e)=>setConfirmPassword(e.target.value)}/> 
                 <Button className="rounded-lg p-6 bg-purple-500 hover:bg-purple-800 "  onClick={handleSignUp} >SIGN UP</Button>
                </TabsContent>

                                                                        
                
              </Tabs>
          </div>

        </div>

        {/* RIGHT SIDE IMAGE  */}
        <div className='hidden xl:flex justify-center items-center'>
          <img src={login2} alt="image"  className='h-[500px]'/>
        </div>
      </div>
    </div>
  )
}

export default Auth
