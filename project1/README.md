# Project 1

First project for the Software Frameworks course at UFC. A simple application using different frameworks for showing and manipulating data of Brazilian states.

## Setting up

Pre-requisites:
  * NPM
  * NodeJS
  * MongoDB

1. Clone the repository
   * SSH
    
       ```bash
       git clone git@github.com:erickkelvin/frameworks-course.git
       ```
   * HTTPS
    
       ```bash
       git clone https://github.com/erickkelvin/frameworks-course.git
       ```

2. Install dependencies
 
    ```bash
    cd project1
    npm install
    ```

3. Set up MongoDB
 
    ```bash
    mkdir data
    mongod --dbpath data
    ```
    
## Running

1. Start application
 
   ```bash
    npm start
   ```
   
2. Open http://localhost:3000
