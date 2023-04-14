const express=require('express')
const userRoute=express.Router()
const database=require('../database')

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
        const insertQuery=`INSERT INTO users VALUES(NULL,"${newUser.firstname}","${newUser.lastname}","${newUser.username}","${newUser.password}",NULL)`
        database.cmsDB.query(insertQuery,(err,response)=>{
            if(err){
                res.send({
                    isSuccessful:false,
                    msg:'error in connecting to database'
                })
            }else{
                res.send({
                    isSuccessful:true,
                    msg:'You registered successfully!'
                })
            }
        })

    }else{
        res.send({
            isSuccessful:false,
            msg:'Please providing data like this: <br />1- firstname, lastname and username at least 2 characters.<br />2- password at least 5 characters.'
        })
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
userRoute.delete('/:id',(req,res)=>{
    const userId=Number(req.params.id)
    if(userId){
        const deleteQuery=`DELETE FROM users WHERE id=${userId}`
        database.cmsDB.query(deleteQuery,(error,response)=>{
            if(error){
                res.status(500).send('error in connecting to database')
            }else if(response.affectedRows>0){
                res.status(200).send('user deleted')
            }else{
                res.status(501).send('user not found!')
            }
        })

    }else{
        res.status(500).send('missing required id')

    }

})
userRoute.put('/:id',(req,res)=>{
    const userId=Number(req.params.id)
    if(userId){
        const newUserData=createUser(req.body.firstname,req.body.lastname,req.body.username,req.body.password)
        if(newUserData){
            const updateQuery=`UPDATE users SET firstname="${newUserData.firstname}",lastname="${newUserData.lastname}",username="${newUserData.username}",password=${newUserData.password} WHERE id=${userId}`
            database.cmsDB.query(updateQuery,(error,response)=>{
                if(error){
                    res.status(500).send('error in connecting to database')
                }else if(response.affectedRows>0){
                    res.status(200).send('user updated')
                }else{
                    res.status(501).send('user not found!')
                }
            })

        }else{
            res.status(200).send('user updated')
        }

    }else{
        res.status(500).send('missing required id')
    }


})
userRoute.post('/login',(req,res)=>{
    const body=req.body
    if(body.username.length>2 && body.password.length>5){
        const getUserQuery=`SELECT * FROM users WHERE username="${body.username}" AND password="${body.password}"`
        database.cmsDB.query(getUserQuery,(error,response)=>{
            if(error){
                res.send({
                    isSuccessful:false,
                    msg:'error in connecting to database!'
                })
            }else if(response.length>0){
                res.send({
                    isSuccessful:true,
                    userInfo:response[0]
                })
            }else{
                res.send({
                    isSuccessful:false,
                    msg:'User not found!'
                })
            }
        })
    }else{
        res.send({
            isSuccessful:false,
            msg:'Please providing data like this: <br />1- username at least 2 characters.<br />2- password at least 5 characters.'
        })
    }



})


module.exports=userRoute
