const mysql=require('mysql')
const cmsDB=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'cms'
})

const init = () => {
    cmsDB.connect((err)=>{
        if(err){
            console.log('error in connecting to database!')
        }else{
            console.log('database connected!')
        }
    })
}


module.exports={
    init,cmsDB
}
