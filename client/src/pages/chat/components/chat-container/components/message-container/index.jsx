import { apiCLient } from "@/lib/api-client";
import { UseAppStore } from "@/store";
import { GET_ALL_MESSAGES_ROUTES, HOST } from "@/utils/constants";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { IoMdArrowRoundDown } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { MdFolderZip } from "react-icons/md";


const MessageContainer = () => {
  const { selectedChatType, selectedChatData, userInfo, selectedChatMessages, setSelectedChatMessages,setIsDownloading,setDownloadProgress } = UseAppStore();
  const scrollRef = useRef(null);

  const [showImage, setShowImage] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  //to check image
  const checkIfImage = (filePath) => {
    const imageRegex =
      /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
  };

  // download
  const downloadFile = async (url) => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    const response = await apiCLient.get(`${HOST}/${url}`, {responseType: "blob", onDownloadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentCompleted = Math.round((loaded * 100) / total);
      setDownloadProgress(percentCompleted);
    }});
    
    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", url.split("/").pop()); // Optional: Specify a file name for the download
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob); // Clean up the URL object
    setIsDownloading(false);
    setDownloadProgress(0);
   
  };


  useEffect(() => {

    if (selectedChatData._id) {

      const getMessages = async () => {
        
        const response = await apiCLient.post(
          GET_ALL_MESSAGES_ROUTES,
          {
            id: selectedChatData._id,
          },
          { withCredentials: true }
        );
        

        if (response.data.messages) {
         
          setSelectedChatMessages(response.data.messages);
        }
      };
      

      if (selectedChatType === "contact") getMessages();
    }


  }, [selectedChatType, selectedChatData, setSelectedChatMessages])


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  // REnder mesaage
  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={index} className="">
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderPersonalMessages(message)}
          {/* {selectedChatType === "channel" && renderChannelMessages(message)} */}
        </div>
      );
    });
  };

  //  render personal messages 
  const renderPersonalMessages = (message) => {
    return (
      <div
        className={`${message.sender === selectedChatData._id ? "text-right" : "text-left" //error
          }`}
      >
        {message.messageType == "text" && (
          // bg-emerald-600
          <div
            className={`${message.sender === selectedChatData._id
                ?"bg-teal-700 text-white border-0 rounded-br-2xl rounded-tl-2xl " 
                : "bg-slate-300 text-green-900/90 border-[#ffffff]/20 rounded-bl-3xl rounded-tr-3xl" 
              } border inline-block p-2  my-1 max-w-[50%] break-words  `}
          >
            {message.sender === selectedChatData._id ? <p className=" text-sm text-green-500/55"> You  </p>:<p className="text-sm text-white/20">  {selectedChatData.firstName} </p>
                }
               <p className="font-bold text-lg"> {message.content}</p>
           
          </div>
        )
        } 
        {message.messageType == "file" && (
          <div
            className={`${
              message.sender === selectedChatData._id
                ?"  bg-teal-700 text-white border-0 rounded-br-2xl " 
                : "  bg-slate-300 text-green-900/90 border-[#ffffff]/20"
            } border inline-block p-4 rounded my-1 lg:max-w-[50%] break-words`}
          >
            {checkIfImage(message.fileUrl) ? (
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowImage(true);
                  setImageURL(message.fileUrl);
                }}
              >
                <img
                  src={`${HOST}/${message.fileUrl}`}
                  alt=""
                  height={300}
                  width={300}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-5">
                <span className="text-white/80 text-3xl bg-black/20 rounded-full p-3">
                  <MdFolderZip />
                </span>
                <span>{message.fileUrl.split("/").pop()}</span>
                <span
                  className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
                  onClick={() => downloadFile(message.fileUrl)}
                >
                  <IoMdArrowRoundDown />
                </span>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-gray-600">
          {moment(message.timestamp).format("LT")}
        </div>

      </div>
    )
  }


  return (
    <div className="flex-1 overflow-y-auto  scrollbar-hidden p-4 px-8 ml-0 md:w-[65vw] lg:w-[70vw] xl:w-[79vw] w-full bg-sky-100 rounded-md">
      {/* bg-[#030f11] */}
      {renderMessages()}
      <div ref={scrollRef}>

      {showImage && (
        <div className="fixed z-[1000] top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center backdrop-blur-lg flex-col">
          <div>
            <img
              src={`${HOST}/${imageURL}`}
              className="h-[80vh] w-full bg-cover"
              alt=""
            />
          </div>
          <div className="flex gap-5 fixed top-0 mt-5">
            <button
              className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
              onClick={() => downloadFile(imageURL)}
            >
              <IoMdArrowRoundDown />
            </button>
            <button
              className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
              onClick={() => {
                setShowImage(false);
                setImageURL(null);
              }}
            >
              <IoCloseSharp />
            </button>
          </div>
        </div>
      )}

      </div>
    </div>
  )
}

export default MessageContainer;
