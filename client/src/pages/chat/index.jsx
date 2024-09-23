import { UseAppStore } from '@/store'
import React, { useEffect } from 'react'
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import ChatContainer from './components/chat-container';
import ContactsContainer from './components/contacts-container';
import EmptyChatContainer from './components/empty-chat-container';


const Chat = () => {
  
  const {userInfo,
    selectedChatType ,
    isUploading,
    fileUploadProgress,
    isDownloading,
    downloadProgress,} = UseAppStore();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!userInfo.profileSetUp){
      toast("set  up the profile to continue");
      navigate("/profile");
    }
  },[userInfo,navigate]);
  return (
    <div className=' flex h-[100vh] overflow-hidden text-white '>
       {isUploading && (
        <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5">
          <h5 className="text-5xl animate-pulse">Uploading File</h5>
          {fileUploadProgress}%
        </div>
      )}
      {isDownloading && (
        <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5">
          <h5 className="text-5xl animate-pulse">Downloading File</h5>
          {downloadProgress}%
        </div>
      )}
      <ContactsContainer/>
         {
          selectedChatType === undefined ? <EmptyChatContainer/>:<ChatContainer/> 
         }
      {/* <EmptyChatContainer/> */}
      {/* <ChatContainer/> */}
      
       
    </div>
  )
}

export default Chat
