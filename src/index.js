//  db always try catch and async await
import dotenv from "dotenv"

// import express from "express"
import connextDb from "./db/index.js";
// const app=express()
dotenv.config({
    path:'./env'
})
// async function connextDb(){
// try{
//    await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//    app.on("error",(error)=>{
//     console.log("express is not able to talk to db",error)
//     throw error
//    })
//    app.listen(provess.env.PORT,()=>{
//     console.log("App is listening mere bhai")
//    })

// }
// catch(error){
// throw err
// }
// }

// connextDb();

// ;(async()={})()


connextDb()