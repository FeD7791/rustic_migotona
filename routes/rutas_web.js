const express = require("express");
const router_web = express.Router();
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { sequelize, Error, where } = require("sequelize");
const usuarios = require("../models").usuarios;
const products = require("../models").productos;

//Sync usuarios database
router_web.use(async (req, res, next) => {
  await usuarios.sync();
  next();
});

router_web.use(
  session({ secret: "1798p3i23k1a", resave: true, saveUninitialized: true })
);

const {
  create_user,
  user_session_validator,
  deleteOne,
  findAll,
  find_user_by_email,
} = require("../controllers/controllers");

//Express session

router_web.use(cookieParser());
router_web.use((req, res, next) => {
  if (req.session.nombre) {
    res.locals.nombre = req.session.nombre;
  } else {
    res.locals.nombre = "Anonimo";
  }
  if (req.session.productos) {
    res.locals.productos = req.session.productos;
  }

  next();
});

// ESCRITORIO;
router_web.get("/", async (req, res, next) => {
  try {
    const prod = await products.findAll();
    const productos = JSON.parse(JSON.stringify(prod, null, 2));
    res.render("desktop_principal.ejs", { productos });
  } catch (error) {
    console.error(error);
    next(new Error("There is a problem with /route"));
  }
});

//Productos_escritorio

//TCG
router_web.get("/tcg", async (req, res, next) => {
  try {
    const prod = await products.findAll({ where: { categoria: "tcg" } });
    console.log(prod);
    const productos = JSON.parse(JSON.stringify(prod, null, 2));
    res.render("desktop_principal.ejs", { productos });
  } catch (error) {
    console.error(error);
    next(new Error("There is a problem with /route"));
  }
});

//TABLETOP
router_web.get("/tabletop", async (req, res, next) => {
  try {
    const prod = await products.findAll({ where: { categoria: "boardgame" } });
    console.log(prod);
    const productos = JSON.parse(JSON.stringify(prod, null, 2));
    res.render("desktop_principal.ejs", { productos });
  } catch (error) {
    console.error(error);
    next(new Error("There is a problem with /route"));
  }
});

//BOOKS
router_web.get("/books", async (req, res, next) => {
  try {
    const prod = await products.findAll({
      where: { categoria: "terrorbooks" },
    });
    console.log(prod);
    const productos = JSON.parse(JSON.stringify(prod, null, 2));
    res.render("desktop_principal.ejs", { productos });
  } catch (error) {
    console.error(error);
    next(new Error("There is a problem with /route"));
  }
});

//MANGA
router_web.get("/manga", async (req, res, next) => {
  try {
    const prod = await products.findAll({ where: { categoria: "manga" } });
    console.log(prod);
    const productos = JSON.parse(JSON.stringify(prod, null, 2));
    res.render("desktop_principal.ejs", { productos });
  } catch (error) {
    console.error(error);
    next(new Error("There is a problem with /route"));
  }
});

//INICIAR SESION
router_web.get("/iniciar_sesion", (req, res) => {
  if (req.session.nombre) {
    const mensaje = `Bienvenid@ ${req.session.nombre}`;
    res.render("user_login.ejs", { mensaje });
  } else {
    res.render("iniciar_sesion.ejs");
  }
});

//CREAR CUENTA
router_web.get("/crear_cuenta", (req, res) => {
  let validaciones = [];
  res.render("crear_cuenta.ejs", { validaciones });
});
//Validar formulario de creacion de cuenta
router_web.post(
  "/register",
  [
    check(
      "name",
      "Debe introducir un nombre de usuario con minimo de 2 letras"
    ).isLength({ min: 2 }),
    check("lastname", "Apellido debe contener 2 letras").isLength({ min: 2 }),
    check("email", "Correo debe ser valido").isEmail(),
    check("bdate", "fecha de nacimiento debe ser valida").isDate(),
    check("key", "La clave debe tener almenos 5 caracteres").isLength({
      min: 5,
    }),
    check("key", "La clave debe tener digitos alfanumericos").isAlphanumeric(),
  ],
  (req, res, next) => {
    const error = validationResult(req);
    const validaciones = error.array(); //arreglo con errores

    if (!error.isEmpty()) {
      //return res.status(400).json({errors: error.array()});
      res.render("../views/crear_cuenta.ejs", {
        validaciones: validaciones,
      });
    } else {
      next();
    }
  },
  find_user_by_email,
  create_user
);

//Buscar email Usuario
router_web.post("/login", user_session_validator);
//buscar todos
router_web.get("/all_users", findAll);

//Borrar cuenta
router_web.delete("/usuarios/:id", deleteOne);

router_web.use((req, res, next) => {
  if (req.session.nombre) {
    next();
  } else {
    let mensaje = "Debe iniciar Sesion Primero";
    res.render("user_login.ejs", { mensaje });
  }
});

//Cerrar Sesion
router_web.get("/logout", (req, res, next) => {
  try {
    req.session.destroy();
    res.locals.nombre = "Anonimo";
    let mensaje = "Cesion cerrada de forma exitosa";
    res.render("user_login.ejs", { mensaje });
  } catch (err) {
    next(err);
  }
});

//DETAIL PRODUCT
router_web.get("/detail_product", (req, res, next) => {
  const producto = req.query;

  res.render("producto.ejs", { producto });
});

//CART
router_web.get("/cart", (req, res) => {
  res.render("cart.ejs");
});

//Error stack
router_web.use((err, req, res, next) => {
  console.error(err);
  res.send(`<h1>Error 500 : Internal Server Error</h1>`);
});

module.exports = router_web;
