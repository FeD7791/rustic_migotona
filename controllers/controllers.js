const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { sequelize, Error } = require("sequelize");
const usuarios = require("../models").usuarios;
const productos = require("../models").productos;
const session = require("express-session");

////////////////////////////////////////////////////PRODUCTOS
//Obtenemos todos los productos
const getall = (req, res) => {
  return productos
    .findAll()
    .then((productos) => res.status(200).send(productos))
    .catch((error) => res.status(404).send(error));
};
//Obtenemos un solo producto
const getone = (req, res) => {
  const { id } = req.params;

  return productos
    .findOne({ where: { id: id } })
    .then((products) => res.status(200).send(products))
    .catch((error) => res.status(404).send(error));
};
//Crear producto
const create_product = (req, res) => {
  console.log(req.body);
  const { nombre, descripcion, precio, categoria, imagen } = req.body;

  return productos
    .create({
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      categoria: categoria,
      imagen: imagen,
    })
    .then((productos) => res.status(201).send("producto creado"))
    .catch((error) => res.status(500).send(error));
};
//Borrar un producto
const delete_product = async (req, res) => {
  const { id } = req.params;
  const product = await productos.findOne({ where: { id: id } });
  if (!product) {
    return res.status(404).json({ error: "no se encuentra" });
  } else {
    return productos
      .destroy({
        where: { id: id },
      })
      .then((productos) => res.status(201).send("Deleted"))
      .catch((error) => res.status(500).send(error));
  }
};
//////////////////////////////////////////////USUARIOS
//Verificar si el usuario existe
const find_user_by_email = async (req, res, next) => {
  const email = req.body.email;
  const user = await usuarios.findOne({ where: { email: email } });
  if (user != null) {
    const mensaje = `El usuario de email: ${req.body.email} ya se encuentra registrado `;
    res.render("user_login.ejs", { mensaje });
  } else {
    next();
  }
};
//Creamos un nuevo usuario en la base de datos
const create_user = (req, res) => {
  const { name, lastname, email, bdate, key } = req.body;
  //Encriptado de clave///////////////////////////////////////////////////
  const clave_hash = bcrypt.hashSync(key, 8);

  ////////////////////////////////////////////////////////////////////////
  ///////////////Sessions////////////////////////////////////////////////
  req.session.nombre = name;
  req.session.productos = [];
  /////////////////////////////////////////////////////////////////////////

  usuarios
    .create({
      name: name,
      lastname: lastname,
      email: email,
      bdate: bdate,
      key: clave_hash,
    })
    .then(
      res.render("user_login.ejs", { mensaje: "Usuario Creado Exitosamente!" })
    );
};

//Creacion cookies usuario
const user_session_validator = async (req, res) => {
  const datos = req.body;
  const email = datos.email;
  const clave = datos.key;

  const user = await usuarios.findOne({ where: { email: email } }); //For use with database

  if (user == null) {
    let mensaje = `No existe usuario registrado con email: ${email}`;
    res.render("user_login.ejs", { mensaje });
  } else if (!bcrypt.compareSync(clave, user.toJSON().key)) {
    let mensaje = "clave incorrecta";
    res.render("user_login.ejs", { mensaje });
  } else {
    //Create Session
    req.session.nombre = user.toJSON().name;
    res.locals.nombre = req.session.nombre;

    let mensaje = "Autenticacion Exitosa";
    res.render("user_login.ejs", { mensaje });
  }
};

//findall
const findAll = (req, res) => {
  return usuarios
    .findAll()
    .then((usuarios) => res.status(200).send(usuarios))
    .catch((error) => res.status(404).send(error));
};

//Borrar un usuario
const deleteOne = (req, res) => {
  const { id } = req.params;
  const usuario = usuarios.findOne({ where: { id: id } });

  if (!usuario) return res.status(404).json({ error: "no se encuentra" });

  return usuarios
    .destroy({
      where: { id: id },
    })
    .then((usuarios) => res.status(201).send(usuario))
    .catch((error) => res.status(500).send(error));
};

module.exports = {
  getall,
  getone,
  create_user,
  user_session_validator,
  deleteOne,
  create_product,
  delete_product,
  findAll,
  find_user_by_email,
};
