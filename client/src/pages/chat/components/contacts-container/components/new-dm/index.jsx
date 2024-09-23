import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { FaPlusCircle } from 'react-icons/fa'
import { useState } from 'react';
import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger
}
    from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import Lottie from "react-lottie";
import { apiCLient } from '@/lib/api-client';
import { HOST, SEARCH_CONTACTS_ROUTE } from '@/utils/constants';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { UseAppStore } from '@/store';
import { animationDefaultOptions } from "@/lib/utils";
import { getColor } from '@/lib/utils';





const NewDm = () => {

    const { setSelectedChatType, setSelectedChatData } = UseAppStore();
    const [OpenNewContactModel, setOpenNewContactModel] = useState(false);
    const [SearchedContact, setSearchedContact] = useState([])

    const searchContacts = async (searchTerm) => {
        try {


            if (searchTerm.length > 0) {
                
                const response = await apiCLient.post(SEARCH_CONTACTS_ROUTE,
                    { searchTerm },
                    { withCredentials: true })
                
                
                if (response.status == 200 && response.data.contacts) {
                    setSearchedContact(response.data.contacts)
                }
                
                
            }
            else {
                setSearchedContact([]);
            }



        } catch (error) {
            console.log(error);
        }
    }


    const selectNewContact = async (contact) => {
        setOpenNewContactModel(false);
        setSelectedChatType('contact');
        setSelectedChatData(contact);
        setSearchedContact([]);
    }




    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlusCircle
                            className='text-neutral-400 font-light text-opacity-90 text-start
                            hover:text-neutral-100 cursor-pointer transition-all duration-300'
                            onClick={() => { setOpenNewContactModel(true) }} />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p> Select New Contact</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>



            <Dialog open={OpenNewContactModel} onOpenChange={setOpenNewContactModel}>

                <DialogContent className=" bg-[#181920] border-none mb-2 p-3 w-[400px] h-[400px]  flex flex-col text-white">
                    <DialogHeader >
                        <DialogTitle>Please select a Contact</DialogTitle>
                        <DialogDescription>.</DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input type="text"
                            placeholder="search Contacts "
                            className=" w-full rounded-lg bg-[#2c2e3b] border-none text-white"
                            onChange={(e) => { searchContacts(e.target.value) }} />
                    </div>
                      {
                         SearchedContact.length >0 && 
                         <ScrollArea className="h-[350px] w-[350px] mx-auto rounded-md border p-4  text-white">
                         <div className='flex flex-col gap-5'>
                             {
                                 SearchedContact.map((contact) => (
                                     
 
                                     <div
                                         key={contact._id}
                                         className='flex gap-3 items-center cursor-pointer  text-white'
                                         onClick={() => selectNewContact(contact)}   >
 
                                         <div className='w-12 h-12 relative'>
 
                                             <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                                                 {contact.image ? (<AvatarImage
                                                     src={`${HOST}/${contact.image}`}
                                                     alt="profile"
                                                     className="object-cover w-full h-full bg-black" />) :
                                                     (
                                                         <div className={`uppercase h-12 w-12  text-lg border-[1px]  flex items-center justify-center rounded-full  ${getColor(contact.color)}`}>
                                                             {contact.firstName
                                                                 ? contact.firstName.split("").shift()
                                                                 : contact.email.split("").shift()}
                                                         </div>
 
                                                     )}
                                             </Avatar>
                                         </div>
                                         <div className='flex flex-col'>
                                             <span>
                                                 {contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}` : contact.email}
                                             </span>
                                             <span className='text-xs'>{contact.email}</span>
                                         </div>
 
                                     </div>
                                 )
                                     
                                 )
 
                             }
                         </div>
                     </ScrollArea >
                      }
                   

                    {
                        SearchedContact.length <= 0 &&
                        <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center mt-4 duration-100 transition-all">

                            <Lottie  // for animation
                                isClickToPauseDisabled={true}
                                height={100}
                                width={100}
                                options={animationDefaultOptions} />

                            <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-4 lg:text-2xl text-xl transition-all duration-300 text-center">
                                <h3 className="poppins-medium">
                                    Hi<span className="text-green-500"> ! </span>
                                    search new
                                    <span className="text-green-500 font-bold"> Contact </span>.

                                </h3>
                            </div>
                        </div>


                    }

                </DialogContent>
            </Dialog>

        </>
    )
}

export default NewDm
