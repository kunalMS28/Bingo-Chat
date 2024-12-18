# Bingo Chat

Bingo Chat is an interactive web application that combines the fun of Bingo with a live chat feature. Players can participate in real-time Bingo games while engaging in conversations, making it an entertaining way to play and socialize simultaneously. 

## Features

- **Live Bingo Game:** Players can play Bingo in real-time with automatic number generation and caller voice.
- **Chat Feature:** A live chat window allows players to interact with each other during the game.
- **Multiplayer Mode:** Join rooms with your friends or random players for a multiplayer experience.
- **Customizable Bingo Cards:** Users can choose from a variety of Bingo card designs and themes.
- **Responsive UI:** Fully responsive design to ensure the game is playable on both desktop and mobile devices.
- **User Authentication:** Players can sign in, create accounts, and track their game history.

## Demo

[Link to the demo (if applicable)]  

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
- npm or yarn (for package management)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/kunalMS28/Bingo-Chat.git
   cd Bingo-Chat
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the environment variables (refer to `.env.example`):

   ```bash
   cp .env.example .env
   ```

4. Start the application:

   ```bash
   npm start
   # or
   yarn start
   ```

5. The application should now be running at `http://localhost:3000` (or the port specified in `.env`).

## Usage

Once the app is running, you can:

1. Sign in or create a new account.
2. Join an existing room or create a new Bingo game.
3. Participate in the game while chatting with other players.

## Contributing

We welcome contributions to Bingo Chat! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to your fork (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Socket.io](https://socket.io/) for real-time communication.
- [React](https://reactjs.org/) for the frontend framework.
- [Node.js](https://nodejs.org/en/) for the backend runtime environment.