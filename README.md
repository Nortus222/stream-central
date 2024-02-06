# stream-central
Project for SAAS class

To execute the server db and then the node server with the following commands:

//create the db file directory
0. md db

//Starts the DB server on port 3000
1. start.Sample.cmd -- windows
   start.Sample.bash -- mac OS

//populate the DB server with sample data
2. startdbClient.Sample.cmd -- windows
   startdbClient.Sample.bash -- mac OS
>load ('createDB/createSample.js');
>load ('createDB/createAdminUser.js');
>exit

//install npm packages
3. npm install

//Compile Node/Express Server.  You may need to go to all subdirectories and compile the ts files.
4. tsc AppServer.ts

//Execute Node/Express server on port 8080
5. node AppServer.js 
