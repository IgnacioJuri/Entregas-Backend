export const productValidator = (req, res, next) =>{
    if(
        req.body.title === undefined || typeof req.body.title !== 'string' || 
        req.body.description === undefined || typeof req.body.description !== 'string' ||
        req.body.code === undefined || typeof req.body.code !== 'number' ||
        req.body.price === undefined || typeof req.body.price !== 'number' ||
        req.body.stock === undefined || typeof req.body.stock !== 'number' 
    ) res.status(404).json({ msg: 'Invalid body' });
    else next();
};