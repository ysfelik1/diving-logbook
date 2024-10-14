import express from 'express';
const router = express.Router()

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'GET /dives'
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
        message:'POST dive'
    })
})

router.patch('/:id',(req,res,next)=>{
    res.status(200).json({
        message:'Update dive'
    })
})

router.delete('/:id',(req,res,next)=>{
    res.status(200).json({
        message:'Delete dive'
    })
})


export default router;