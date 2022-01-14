# Getting Started with GROUPOMANIA PROJECT

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to install the project

### Create the database

For this project to work, you need to have MySQL.

You also need to create a database called : groupomania.

You don't need to create the tables, only the database. 

### Clone the project

Open a terminal where you want to clone the project and write this line : 

````sh
git clone https://github.com/Tam-star/TamaraWenner_7_27122021.git
````

###  Installing and launching the backend part

Go into the backend folder : 

````sh
cd backend
````

Install the necessary packages :

````sh
npm install
````

Go in the config folder and create a '.env' file with your variables to access your database

````
PORT=your port (for example : 3000)
HOST=yourhostname (often it would be : localhost)
DB_USER=yourusername
DB_PASSWORD=yourpassword
````

Launch : 

````sh
npm start
````

###  Installing and launching the frontend part

Go into the frontend folder :

````sh
cd frontend/my-app
````

Install the necessary packages :

````sh
npm install
````

Launch : 

````sh
npm start
````





