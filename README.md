
# Individul project

This is a prototype of a barter web app that allows users to add items and trade with other users.

In order to set up this web app you will require node js and npm to be installed.
You can go to : [https://nodejs.org/] to set up node js. You will aslo need a mongoDb set up. You can set one up locally by following [https://www.mongodb.com/docs/manual/installation/#std-label-tutorial-installation] or you can have one deployed online free with mongoDb atlas by going to [https://www.mongodb.com/] and following [https://www.mongodb.com/docs/atlas/] to set up the database online. After setting up mongoDb, create a database called barterApp.

In the root directory of the project on a terminal run the line `npm install`. This should install all the modules required to run the back end. A file called node_module containing the libaries should be created after running this command.

On a seperate terminal window, from the root directory go in the frontend folder. To do this run the command `cd frontend`. On this terminal run the line `npm install`. This should install all the modules required to run the front end. A file called node_module containing the libaries should be created after running this command within the fron end folder.

## Setting up the .env file
Within the root folder, create a file and name it `.env`. Within this file you add the line `PORT=` to what ever port number you wish to deploy the backend server on. On the line after, add `MONGO_URI=` to your mongodb connection string that connects to the barterApp database. On the line after, add `SECRETKEY=` to whatever key you wish to have, this is a string and can be any value, it best practice to generate you own secret key.

Your `.env` should look something like:
```
PORT=5000
MONGO_URI=mongodb+SRV://User1:P@ssword@cluster0-pl-0-lb.oq123.mongodb-dev.net/barterApp
SECRETKEY=e0c844614550fea6b74649647056d0df6695a9f0c3a680a333d2971bed19715c9d69e59a6df5208b4734ccb4abbf11de7b92e94be0c797f69c68367c8dd8c526
```
In `frontend/src/api/congig.js`, change the value of `URL` to the url that your back end will be deployed on, if running locally just change the port number to the one you are using. If you will not be running your front end locally, go to `frontend/vite.config.js` and change the value of `allowedHosts` to be an array containing the url your frontend will be deployed on, then go to `backend/server.js` and on line 31, change the value of `origin` to your front end url.

## Running locally
On the terminal at the root directory run the command `npm run dev`, this will start running the server. If sucessfull, the terminal will print that your server is running at the port you choose and that has made a connection to the mongodb. On a seperate terminal window on the frontend directory, run `npm run dev`, the terminal the url to the front end will be given. Go to `backend/server.js` and on line 31 and make sure the value of `origin` is equal to the url to the frontend, if not change and save, the server will rerun with the new changes. Both front end and back end should be running fine. To close the server, on each of the terminal press ctrl+c or you can just terminate the terminal.