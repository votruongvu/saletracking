1. Install Nodejs and NPM 
2. Run terminal and cd to project root folder
3. Execute install.sh to install the required nodejs modules and packages
4. Run MySQl instance and adjust the credential information of DB in config/config.json. 
Execute 2 SQL scripts which has name demo.sql and demotest.sql in root folder to create 2 database demo and demotest and sample data
5. Execute run.sh to start the server. Server will start with port 3000.   
6. using POSTMAN (chrome extentions) or alternative tools to simulate the request GET, POST, PUT, DELETE to test APIs
        "http://localhost:3000/api/v1/item" (GET)
        "http://localhost:3000/api/v1/item/:id" (GET)
        "http://localhost:3000/api/v1/item/" (POST) with attached json item string in request body
        "http://localhost:3000/api/v1/item/:id" (PUT) with attached json item string in request body
        "http://localhost:3000/api/v1/item/:id" (DELETE)
        
        JSON object sample to edit and add
         {            
            "productName": "Television",
            "quantity": 2,
            "unitPrice": 3000,
            "amount": 6000,
            "description": "TV for dinning room and bed room"
         }
7. Execute test.sh to run the black box unit test specs for Item APIs   
8. Execute check.sh to check the coding standard.

Note: You can use .bat instead of .sh file if using windows OS.  
