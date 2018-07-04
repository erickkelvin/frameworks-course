# Project 2

Second project for the Software Frameworks course at UFC: a CRUD framework for products. Developed by Erick Santos, Luiza Bomfim and Zedequias Santos.

## Setting up

Pre-requisites:
  * NPM
  * NodeJS
  * MongoDB

1. Clone the repository or download (and extract) ZIP file

2. Install dependencies (basically MongoDB dependencies)
 
    ```bash
    cd project2
    npm install
    ```

3. Create MongoDB directory
 
    ```bash
    mkdir data
    mkdir log
    ```
    
4. Use the `config.json` file to configure the app.

    
## Running

1. Start application in a separate terminal window or tab
 
   ```bash
    npm start
   ```
   
2. Open http://localhost:3000

## Stopping and re-running

1. If you need to kill/restart MongoDB server after killing the NodeJS server, run:
 
   ```bash
    npm stop
   ```

