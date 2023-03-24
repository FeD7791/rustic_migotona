# Rustic Migotona

Migotona Ryujin is an e-commerce made with
-Node, Express (for the server side)
-EJS (For the views templates)
-PURE (For some CSS Styles)
-sequelize (to interact with SQL database using Node)

## Objectives

**Display Products by categories:**

A typical product added to the database should have this keys:

{
"nombre": "Berserk",
"descripcion": "La historia del espadachin negro",
"precio": 5000,
"imagen": "./imagenes/image_not_found.png",
"categoria": "manga"
}

You can upload products using POSTMAN or INSOMNIA making a post request to:
http://localhost:3000/products/create

_About imagen_
This section contains just a url path to a folder where images are stored
