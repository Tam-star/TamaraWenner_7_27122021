# Getting Started with GROUPOMANIA PROJECT

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to install the project

### Create the database

For this project to work, you need to have MySQL.

You also need to create a database called : **groupomania**.

You don't need to create the tables, only the database. 

If you want to use another SQL Database, it is possible and explained [after the installation chapter](#other-types-of-databases).

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

````sh
PORT=your port 			
HOST=yourhostname 		
DB_USER=yourusername
DB_PASSWORD=yourpassword
````

<em>For example</em> :

````sh
PORT=3000	
HOST=localhost	
DB_USER=toto
DB_PASSWORD=toto1234
````


Launch the server : 

````sh
npm start
````

###  Installing and launching the frontend part

Go into the frontend folder :

````sh
cd frontend
````

Install the necessary packages :

````sh
npm install
````

Launch : 

````sh
npm start
````

After a few seconds, your browser should open a page arriving to the welcome page of GROUPOMANIA.

## Other Types of Databases

### SQL Types

The project was built with Sequelize, so it's pretty easy if your using another SQL type,
 your just need to change the dialect in db.js which is in the config folder inside the backend folder.

````sh
const sequelize = new Sequelize('groupomania', `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
    host: `${process.env.HOST}`,
    dialect: 'mysql',
    logging: false
})

````

For more information, you can check the [Sequelize documentation](https://sequelize.org/v5/manual/dialects.html)


### What if I want to use NoSQL ? 

Then, I'm very sorry to inform you that is not going to work with this project.




