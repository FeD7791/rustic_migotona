# Rustic Migotona

Migotona Ryujin is an e-commerce made with
-Node, Express (for the server side)
-EJS (For the views templates)
-PURE (For some CSS Styles)
-sequelize (to interact with SQL database using Node)

## Objectives

### 1 Display Products by categories:

A typical product added to the database should have this keys:

{<br />
"nombre": "Berserk", <br />
"descripcion": "La historia del espadachin negro",<br />
"precio": 5000,<br />
"imagen": "./imagenes/image_not_found.png",<br />
"categoria": "manga"<br />
}<br />

You can upload products using POSTMAN or INSOMNIA making a post request to:
http://localhost:3000/products/create

At first all products will be displayed, but can be filtered using the **categorias** menu

---

#### _About imagen_

This section contains just a url path to a folder where images are stored

### 2 Make a user session login system

In order to see details of a product a user must first log in.

Default user is _Anonimo_

At the login page user will be requested to give an **email** and a **password**

The server first will check if that user exists based on the email
Then the server will check if the password is correct

For wrong answers the server will render a page addresing the issue.

For a succesfull login a page notifiying this will be rendered , and also the name of the user will be displayed in the header of the page.

A user session will be created using **express-session**

The user can logout from the _cerrar session_ link this will destroy the session

### 3 Make a Create Accoun system

A user must first be logged in in order to se the details of a product.
If it doesn't have an account yet it has to create it.

Here is an example of the information that has to be provided by filling **form**
A check of the user input is done in the server side using **express-validator**

{<br />
"name": "Jorge",<br />
"lastname": "Rawa",<br />
"email": "jorawa@hotmail.com",<br />
"bdate": "2022-11-15",<br />
"key": "keyf3"<br />
}<br />
In order to ensure users account security , the key (password) will be hased before user is saved into the database. To hash the key **bcrypt** middleware is used.

Once the account is created a user session will be established using **express-session**. Then the user will be able to see the products and add them to the cart.

### 4 Create a persisting cart for the user

Items selected by the user will persist on page reload and time using **Local Storage**

The user can vary the amoun of a particular item and the total price of the cart will be updated
