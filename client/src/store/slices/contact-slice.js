


export const createChatSlice = (set, get) => ({
    selectedChatType: undefined,
    selectedChatData: undefined,
    selectedChatMessages: [],
    directMessagesContacts:[],
    isUploading: false,
    fileUploadProgress: 0,
    isDownloading: false,
    downloadProgress: 0,

    setIsUploading: (isUploading) => set({ isUploading }),
    setFileUploadProgress: (fileUploadProgress) => set({ fileUploadProgress }),
    setIsDownloading: (isDownloading) => set({ isDownloading }),
    setDownloadProgress: (downloadProgress) => set({ downloadProgress }),
    setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
    setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
    setChannels: (channels) => set({ channels }),
    setSelectedChatMessages: (selectedChatMessages) =>
        set({ selectedChatMessages }),
    setDirectMessagesContacts:(directMessagesContacts)=>set({directMessagesContacts}),
    closeChat: () =>
        set({
            selectedChatData: undefined, 
            selectedChatType: undefined, selectedChatMessages: [],
        }),

    addMessage: (message) => {
        const selectedChatMessages = get().selectedChatMessages;
        const selectedChatType = get().selectedChatType;


        set({
            selectedChatMessages: [
                ...selectedChatMessages,

                {
                    ...message, 
                    recipient:
                        selectedChatType == "channel"
                            ? message.recipient
                            : message.recipient._id,
                    sender:
                        selectedChatType == "channel"
                            ? message.recipient
                            : message.recipient._id,
                },
            ],



        });
    }
});
