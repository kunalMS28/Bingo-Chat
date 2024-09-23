import Message from "../models/MessagesModel.js";



import { mkdir, rename } from 'fs/promises'; // Use promises for async functions
import { join } from 'path';


export const getMessages = async (req, res, next) => {
    try {
        
      const user1 = req.userId;
      const user2 = req.body.id;
      
      if (!user1 || !user2) {
        return res.status(400).send("Both user IDs are required.");
      }
      
      const messages = await Message.find({
        $or: [
          { sender: user1, recipient: user2 },
          { sender: user2, recipient: user1 },
        ],
      }).sort({ timestamp: 1 });
      
      return res.status(200).json({ messages });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
  };







export const uploadFile = async (request, response, next) => {
   

    
    try {
        
       

        if (request.file) {
            
            const date = Date.now();
            const fileDir = `upload/files/${date}`;
            const fileName = join(fileDir, request.file.originalname); // Use join to create the path

            // Create directory if it doesn't exist
            await mkdir(fileDir, { recursive: true });

            // Rename the file
            await rename(request.file.path, fileName);
            

            return response.status(200).json({ filePath: fileName });
        } else {
            console.error("No file found in request.");
            return response.status(400).send("File is required.");
        }
    } catch (err) {
        console.error("Error occurred during file upload:", err);
        return response.status(500).send("Internal Server Error");
    }
};
