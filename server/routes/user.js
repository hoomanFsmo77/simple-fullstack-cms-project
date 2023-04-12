const express=require('express')
const userRoute=express.Router()
const database=require('../database')
const {response} = require("express");

const createUser = (firstname,lastname,username,password) => {
    if(password?.length>5 && username?.length>2 && lastname?.length>2 && firstname?.length>2){
        return {
            firstname,lastname,username,password
        }
    }else{
        return false
    }
}


userRoute.post('/register',(req,res)=>{
    const newUser=createUser(req.body.firstname,req.body.lastname,req.body.username,req.body.password)
    if(newUser){
        const insertQuery=`INSERT INTO users VALUES(NULL,"${newUser.firstname}","${newUser.lastname}","${newUser.username}",${newUser.password},NULL)`
        database.cmsDB.query(insertQuery,(err,response)=>{
            if(err){
                res.status(501).send('error in connecting to database')
            }else{
                res.status(201).send('user added!')
            }
        })

    }else{
        res.status(500).send('missing required body parameter: firstname | lastname | username | password')
    }
})

userRoute.get('/:id',(req,res)=>{
    const userId=Number(req.params.id)
    if(userId){
        const selectQuery=`SELECT * FROM users WHERE id=${userId}`
        database.cmsDB.query(selectQuery,(error,response)=>{
            if(error){
                res.status(500).send('error in connecting to database')
            }else if(response.length>0){
                res.status(200).send(response)
            }else{
                res.status(500).send('there is no user by this id')
            }
        })

    }else{
        res.status(500).send('missing required id')
    }



})




module.exports=userRoute
