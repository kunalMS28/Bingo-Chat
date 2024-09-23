
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import {renameSync, unlinkSync} from "fs";


const maxAge = 3 * 24 * 60 * 60 * 1000; // for 3 days


const createToken = (email, userId) => {
   return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge });
};  //token should be valid for 3 days



export const signup = async (request, response) => {
   try {
      const { email, password } = request.body;
      if (!email || !password) {
         return response.status(400).send("email and password is required ..."); // res 400 for client's  error
      }

      const user = await User.create({ email, password });
      response.cookie("jwt", createToken(email, user.id), {
         maxAge,
         secure: true,
         sameSite: "None",
      });
      return response.status(201).json(    // 201  for succesfull responses
         {
            user: {
               id: user.id,
               email: user.email,
               // firstname: user.firstName,
               // lastname: user.lastName,
               // image: user.image,
               profileSetUp: user.profileSetUp,
            },
         });


   } catch (error) {
      console.log(error);
      return response.status(500).send("Internal Server Error,, server me error");  //res  for SERVER ERROR
   }
};



export const login = async (request, response, next) => {
   try {
      const { email, password } = request.body;
      if (!email || !password) {
         return response.status(400).send(" User's email and password is required ..."); // res 400 for client's  error
      }

      const user = await User.findOne({ email });
      if (!user) {
         return response.status(404).send("user with given email  not found")
      }
      const auth = await compare(password, user.password);
      if (!auth) {
         return response.status(400).send("incorrect password");
      }

      response.cookie("jwt", createToken(email, user.id), {
         maxAge,
         secure: true,
         sameSite: "None",
      });
      return response.status(201).json(    // 201  for succesfull responses
         {
            user: {
               id: user.id,
               email: user.email,
               firstname: user.firstName,
               lastname: user.lastName,
               image: user.image,
               profileSetUp: user.profileSetUp,
            },
         });


   } catch (error) {
      console.log(error);
      return response.status(500).send("Internal Server Error, server me error");  //res  for SERVER ERROR
   }

};

export const getUserInfo = async (request, response) => {
   try {
      const userdata = await User.findById(request.userId);
      if (!userdata) { return response.status(404).send("user with given email  not found"); }

      return response.status(201).json(    // 201  for succesfull responses
         {

            id: userdata.id,
            email: userdata.email,
            firstname: userdata.firstName,
            lastname: userdata.lastName,
            image: userdata.image,
            profileSetUp: userdata.profileSetUp,

         });



   } catch (error) {
      console.log(error);
      return response.status(500).send("Internal Server Error,, server me error");  //res  for SERVER ERROR
   }

};





export const updateProfile = async (request, response) => {

   try {

      const { userId } = request;
      const { firstName, lastName, color } = request.body;
     
      if (!firstName || !lastName) { return response.status(404).send("firstName , lastName  and Color required "); }

      const userdata = await User.findByIdAndUpdate(
         userId,
         {
            firstName,
            lastName,
            color,
            profileSetUp: true,
         },
         { new: true, runValidators: true });

        if (response.status(201)) {
            return response.status(201).json(    // 201  for succesfull responses
            {

               id: userdata.id,
               email: userdata.email,
               firstname: userdata.firstName,
               lastname: userdata.lastName,
               image: userdata.image,
               color: userdata.color,
               profileSetUp: userdata.profileSetUp

            });

      }


   } catch (error) {
      console.log(error);
      return response.status(500).send("Internal Server Error, server me error");  //res  for SERVER ERROR
   }

};



export const addProfileImage = async (request, response) => {
   
   try {

     if(!request.file){
      response.status(400).send("file is required");
     }
     const date= Date.now();
     let fileName ="upload/profiles/"+date+request.file.originalname;
     renameSync(request.file.path,fileName);

     const updatedUser =await User.findByIdAndUpdate(request.userId,{image:fileName},{new:true,runValidators:true})

        if (response.status(201)) {
            return response.status(201).json(    // 201  for succesfull responses
            {
               image: updatedUser.image,
            });

      }


   } catch (error) {
      console.log(error);
      return response.status(500).send("Internal Server Error, server me error");  //res  for SERVER ERROR
   }

};



export const removeProfileImage = async (request, response) => {
  
   try {
const {userId}= request;
const user = await User.findById(userId);

if(!user){
   return response.status(404).send("user not found");

}

if(user.image){
   unlinkSync(user.image);
}

user.image =null;
await user.save();

       return response.status(201).send("profile image removed");

   } catch (error) {
      console.log(error);
      return response.status(500).send("Internal Server Error, server me error");  //res  for SERVER ERROR
   }

};


export const logOut = async (request, response) => {
  
   try {
     
      response.cookie("jwt","",{maxAge:1,secure:true, sameSite:"None"});

      return response.status(201).send("Log Out succesfull");
   } catch (error) {
      console.log(error);
      return response.status(500).send("Internal Server Error");  //res  for SERVER ERROR
   }

};


