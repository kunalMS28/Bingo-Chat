import React, { useEffect } from "react";
import ProfileInfo from "./components/profile-info";
import NewDm from "./components/new-dm";
import { GET_DM_CONTACT_ROUTES } from "@/utils/constants";
import { apiCLient } from "@/lib/api-client";
import { UseAppStore } from "@/store";
import ContactList from "@/components/ui/contact-list";
// import kiwi from"../../assets/kiwi.png"
import victory from"../../../../assets/bing-1.svg"

const ContactsContainer = () => {
  const{setDirectMessagesContacts,directMessagesContacts}=UseAppStore();

  useEffect(() => {

    const getContactsWithMessages = async () => {
      const response = await apiCLient.get(GET_DM_CONTACT_ROUTES, {
        withCredentials: true,
      });
      if (response.data.contacts) {
        setDirectMessagesContacts(response.data.contacts);
        // console.log(response.data.contacts);
      }
    };

    getContactsWithMessages();

  }, []);  //setDirectMessagesContacts

  
  // bg-[#1b1c24]
  return (
    <div className="relative md:w-[35vw] 1g:w-[30vw] xl:w-[20vw]  border-r-2 border-black  bg-black w-full">
     <div className="pt-3 flex flex-row gap-3 pl-7">
      
      <img src={victory} alt="logo" width="50" height="50"/>
      <div className="text-3xl font-extrabold ">B<span className="text-purple-500">i</span>ngo</div>
      
      
     </div>
     <div className=" mt-5">
      <div className="flex items-center justify-between pr-10">
        <Title text ="direct message"/>
        <NewDm/>
      </div>

      <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessagesContacts} />
       </div>   
     

     </div>

     <div className="ny-5">
      <div className="flex items-center justify-between pr-10">
        <Title text ="channels"/>
      </div>
     </div>
  <ProfileInfo/>
    </div>
  )
}

export default ContactsContainer;


//logo image
const Logo = () => {
  return (
    <div className="flex p-5  justify-start items-center gap-2">
      <svg
        id="logo-38"
        width="78"
        height="32"
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <path
          d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
          className="ccustom"
          fill="#8338ec"
        ></path>{" "}
        <path
          d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
          className="ccompli1"
          fill="#975aed"
        ></path>{" "}
        <path
          d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
          className="ccompli2"
          fill="#a16ee8"
        ></path>{" "}
      </svg>
      <span className="text-3xl font-semibold ">KiWi</span>
    </div>
  );
};



const Title=({text})=>{
 return(
  <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm "> {text}</h6>
 )
}


