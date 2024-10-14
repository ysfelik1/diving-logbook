import express from 'express';

const app = express();

// Your middleware, routes, etc.
app.use((req,res,next)=>{
   res.status(200).json({
      message:'It is working!'
   })
})
export default app;
