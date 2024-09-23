
import { useSocket } from "@/context/socketContext";
import { apiCLient } from "@/lib/api-client";
import { UseAppStore } from "@/store";
import { UPLOAD_FILE_ROUTE } from "@/utils/constants";
import EmojiPicker from "emoji-picker-react";
import { useState, useRef, useEffect  } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import axios from "axios";








const MessageBar = () => {
  //hooks
  const [message,setMessage] = useState('');
  const emojiRef = useRef();
  const fileInputRef = useRef();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const {selectedChatType,selectedChatData,userInfo,setIsUploading,setFileUploadProgress} = UseAppStore();
  const socket = useSocket();


  useEffect (() => {
    function handleClickOutside (event) {
    if (emojiRef.current && !emojiRef.current.contains (event.target)) { setEmojiPickerOpen (false);
    }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
    };
    document.removeEventListener("mousedown", handleClickOutside);
    }, [emojiRef]);

// functions 
  const handleSendMessage = async () => {
   

    if(selectedChatType ==="contact" ){
      socket.emit("sendMessage",{
        sender:userInfo.id, 
        content:message,
        recipient:selectedChatData._id,
        messageType:"text",
        fileUrl:undefined,

       }) 
       
    }
   

   };
  const handleAddEmoji =  (emoji) => {
    setMessage((msg)=>msg +emoji.emoji );
   };

  // function for  to send file
   const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAttachmentChange = async (event) => {
    try {
      const file = event.target.files[0];
     

      if (file) {
      
        const formData = new FormData();
        formData.append("file", file);
        setIsUploading(true)

      

        
        const response = await apiCLient.post(UPLOAD_FILE_ROUTE, formData, {
          withCredentials: true,
          onUploadProgress: (data) => {
            setFileUploadProgress(Math.round((100 * data.loaded) / data.total));
          },
        });

         
           
        if (response.status === 200 && response.data) {
          setIsUploading(false);
          if (selectedChatType === "contact") {
            socket.emit("sendMessage", {
              sender: userInfo.id,
              content: undefined,
              recipient: selectedChatData._id,
              messageType: "file",
              fileUrl: response.data.filePath,
            });
          } 
        }
      }
    } catch (error) {
      setIsUploading(false)
     console.log({ error });
    }
  };




  return (
    // bg-[#1c1d25]
    <div className="h-[8vh] bottom-0   flex justify-center bg-transparent  items-center px-4 mb-6 gap-6 "> 
      <div className="flex-1 flex bg-[#2a2b33] rounded-3xl items-center gap-5  pr-5 mt-3">
        <input type="text"
          className="flex-1 h-12 p-5 bg-tansparent rounded-md focus:border-none focus:outline-none text-black" placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)} 
          />

        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={handleAttachmentClick}>
          <GrAttachment className="text-2xl" />
        </button>
        <input
          type="file"
          className="hidden" // the file input element are hidden
          ref={fileInputRef}
          onChange={handleAttachmentChange} // Handle file selection
          
        />

        <div className="relative">
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          onClick={()=>setEmojiPickerOpen(true)}>
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-6 right-0" ref={emojiRef}>
            <EmojiPicker 
            theme="dark"
            open={emojiPickerOpen}
            onEmojiClick={ handleAddEmoji}
            autoFocusSearch={false}/>
          </div>
        </div>

      </div>
      {/* bg-[#8417ff] bg-[#741bda] */}
      <button className="bg-[#8417ff] h-12 rounded-full flex items-center justify-center p-5 hover:bg-[#741bda]
      focus:bg-[#741bda]   focus:outline-none focus:text-white duration-300 transition-all mt-4 "
        onClick={handleSendMessage}>
        <IoSend className="text-lg " />
      </button>
    </div>
  )
}

export default MessageBar;
