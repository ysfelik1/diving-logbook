import express from 'express';
const router = express.Router()

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'GET /users'
    })
})

router.get('/:id',(req,res,next)=>{
    const id=req.params.id;
    if(id){
        res.status(200).json({
            message:'Parameter is '+id
        })
    }
})

router.post('/',(req,res,next)=>{
    res.status(201).json({
        message:'POST user'
    })
})

router.patch('/:id',(req,res,next)=>{
    res.status(200).json({
        message:'Update user'
    })
})

router.delete('/:id',(req,res,next)=>{
    res.status(200).json({
        message:'Delete user'
    })
})


export default router;