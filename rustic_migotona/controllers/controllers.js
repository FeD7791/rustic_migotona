const {read_products,read_one_product,add_user,user_filter} = require('../services/crud');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const{sequelize} = require('sequelize');
const usuarios = require('../models').usuarios
const productos = require('../models').productos
const fs = require('fs')


////////////////////////////////////////////////////PRODUCTOS
//Obtenemos todos los productos
const getall = (req,res)=>{
    return productos.findAll()
    .then(productos => res.status(200).send(productos))
    .catch(error => res.status(404).send(error))

}
//Obtenemos un solo producto
const getone = (req,res)=>{
    const{id}=req.params;
    
    return productos.findOne({where:{id:id}})
    .then(products => res.status(200).send(products))
    .catch(error => res.status(404).send(error))
    
}
//Crear producto
const create_product = (req,res)=>{
    const {nombre,descripcion,precio} = req.body
    console.log({nombre,descripcion,precio})
    return productos.create({nombre:nombre,descripcion:descripcion,precio:precio})
    .then(products => res.status(201).send(products))
    .catch(error => res.status(500).send(error))
}
//Borrar un producto
const delete_product = async(req,res)=>{
    const {id} = req.params
    const product = await productos.findOne({where:{id:id}})
    if (!product){
        return res.status(404).json({ error: 'no se encuentra'})
    }else{
        return productos.destroy({
            where: { id: id}
        })
        .then(productos => res.status(201).send('Deleted'))
        .catch(error => res.status(500).send(error))
    } 
    
    
    
}
//////////////////////////////////////////////USUARIOS
//Creamos un nuevo usuario en la base de datos
const create_user = (req,res)=>{
    const {nombre,apellido,correo,fecha_de_nacimiento,contrasenia} = req.body
    //Encriptado de clave///////////////////////////////////////////////////
    const clave_hash = bcrypt.hashSync(contrasenia,8)
    
    ////////////////////////////////////////////////////////////////////////
    
    
    //Creacion exitosa
    return usuarios.create({nombre,apellido,correo,fecha_de_nacimiento,contrasenia:clave_hash})
    
}

//Creacion cookies usuario
const user_session_validator = async(req,res)=>{
    const datos = req.body;
    const email = datos.email;
    const clave = datos.pwd

    //const [boleano,key] = user_filter(email);
    const user = await usuarios.findOne({where:{correo:email}})
    

    if(!user){
        return res.status(404).json({ error: 'no se encuentra'})
    }else{
        const key = user_filter(email)
        res.cookie('email_user',email,{
        maxage: 15*60*1000
        })
        res.cookie('clave',key,{
        maxage: 15*60*1000
        })
        //res.status(200).json({msg:'Usuario logueado'})
        res.render('../views/desktop_principal.ejs')
    }


}

const middleware_cookie = (req,res)=>{
    const datos = req.body;
    const email = datos.email;
    const clave = datos.pwd
    res.cookie('email_user',email,{
        maxage: 15*60*1000
    })
}
//Borrar un usuario
const deleteOne =  (req, res) => {
    const { id } = req.params
    const usuario = usuarios.findOne(
        {   where: { id: id} })
        
    if (!usuario) return res.status(404).json({ error: 'no se encuentra'})
    
    return usuarios.destroy({
        where: { id: id}
    })
    .then(usuarios => res.status(201).send(usuario))
    .catch(error => res.status(500).send(error))
}





module.exports = {getall,getone,create_user,user_session_validator,middleware_cookie,deleteOne,create_product,delete_product}