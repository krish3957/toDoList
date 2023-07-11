# TodoList App

This is a simple TodoList app built using Node.js, MongoDB, and EJS. It allows you to create, view, update, and delete tasks in a web interface.

## Prerequisites

Before running the app, make sure you have the following installed on your machine:

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- MongoDB: [https://www.mongodb.com/](https://www.mongodb.com/)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/krish3957/toDoList.git
   ```

## Navigate to the project directory:

```bash
cd todolist-app
```

## Install the dependencies:

```bash
npm install
```

Start MongoDB service on your machine. You can refer to the MongoDB documentation for instructions specific to your operating system.

Rename the `.env.example` file to `.env ` and provide your MongoDB connection string:

```bash
MONGODB_URI=mongodb://localhost:27017/todolist
```
## Start the application

```bash
npm start
```

## Acknowledgements
- Node.js
- Express.js
- MongoDB
- EJS
