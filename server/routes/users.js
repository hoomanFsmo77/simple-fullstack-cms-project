const express=require('express')
const usersRoute=express.Router()
const database=require('../database')


usersRoute.get('/',(req,res)=>{
    const selectAllQuery=`SELECT * FROM users`
    database.cmsDB.query(selectAllQuery,(err,response)=>{
        if(err){
            res.status(501).send('error in connecting to database')
        }else{
            res.status(200).send(response)
        }
    })

})





module.exports=usersRoute