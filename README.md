# Bingo Chat

 Developed a real-time chat application using Socket.io, enabling seamless user interaction and 
messaging capabilities. 
• Created a scalable architecture with MongoDB for efficient data storage, complemented by a secure 
Node.js and Express backend for communication and authentication. 
• Designed an intuitive, responsive UI with React, enhancing the overall user experience while gaining 
full-stack development expertise. 




## Working Demo Video (Link):
https://www.linkedin.com/posts/kunal-sonawane-72a013256_mern-socketio-webdevelopment-activity-7243552601147858945-PMD8?utm_source=share&utm_medium=member_android



## Technologies Used

- **Frontend:** React.js, HTML, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (or other DB solutions if applicable)
- **Real-time Communication:** Socket.io
- **Authentication:** JWT (JSON Web Tokens)

## Installation

To run Bingo Chat locally, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- npm  (for package management)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/kunalMS28/Bingo-Chat.git
   cd Bingo-Chat
   ```

2. Install dependencies:

   ```bash
   1) open terminal
   2) cd server
     npm install


   3)open new terminal
   4) cd client
     npm install
   
   
   
   ```

3. Set up the environment variables (refer to `.env.example`):

  et up the environment variables by creating a .env file at the root of your project and add the following content:

bash
in server .env file
copy code:

PORT=3000
JWT_KEY="(*^*(&(*)^(&*^*&^@()&@!LNASLBKJASBN!123123123@#@@#)))"
ORIGIN="http://localhost:5173"
DATABASE_URL="mongodb://localhost:27017/k-chat-app"

in client .env file
copy code:

VITE_SERVER_URL ="http://localhost:3000"

4. Start the application:

   ```bash
in terminal 1( server) '-- npm run dev
in terminal 2( client) '-- npm run dev
   ```

5. The application should now be running at `http://localhost:3000` (or the port specified in `.env`).

## Usage

Once the app is running, you can:

1. Sign in or create a new account.
2. Join search for names  or create a new Chat.
start chatting

## Acknowledgments

- [Socket.io](https://socket.io/) for real-time communication.
- [React](https://reactjs.org/) for the frontend framework.
- [Node.js](https://nodejs.org/en/) for the backend runtime environment.
