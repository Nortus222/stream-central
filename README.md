# stream-central
Project for SAAS class

### To execute the server db and then the node server with the following commands:

#### 1. Create the db file directory
-- windows
```
md db
```


-- mac OS

```
mkdir db
```


#### 2. Starts the DB server on port 3000
-- windows
```
start.Sample.cmd
```


-- mac OS

```
bash start.Sample.bash
```

#### 3. Populate the DB server with sample data
#### i)
-- windows
```
startdbClient.Sample.cmd 
```

-- mac OS

```
bash startdbClient.Sample.bash
```

#### ii)
```
>load ('createDB/createSample.js');
>load ('createDB/createAdminUser.js');
>exit
```

#### 4. Install npm packages
```
npm install
```

#### 5. Compile Node/Express Server.  You may need to go to all subdirectories and compile the ts files.
```
tsc AppServer.ts
```

#### 6. Execute Node/Express server on port 8080
```
node AppServer.js
```
