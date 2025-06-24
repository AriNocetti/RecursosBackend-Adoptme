import { usersService } from "../services/index.js"

const getAllUsers = async(req,res)=>{
    const users = await usersService.getAll();
    res.send({status:"success",payload:users})
}

const getUser = async(req,res)=> {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error",error:"User not found"})
    res.send({status:"success",payload:user})
}

const updateUser =async(req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error", error:"User not found"})
    const result = await usersService.update(userId,updateBody);
    res.send({status:"success",message:"User updated"})
}

const deleteUser = async(req,res) =>{
    const userId = req.params.uid;
    const result = await usersService.getUserById(userId);
    res.send({status:"success",message:"User deleted"})
}

const uploadDocuments = async(req, res) => {
    try {
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if(!user) return res.status(404).send({status:"error", error:"User not found"});
        
        // Si no hay archivos, retornar error
        if(!req.files || req.files.length === 0) {
            return res.status(400).send({status:"error", error:"No files were uploaded"});
        }

        // Crear array de documentos para agregar al usuario
        const documents = req.files.map(file => {
            return {
                name: file.originalname,
                reference: `/documents/${file.filename}`
            }
        });

        // Actualizar documentos del usuario
        await usersService.update(userId, { 
            $push: { documents: { $each: documents } }
        });

        res.send({status:"success", message:"Documents uploaded successfully"});
    } catch (error) {
        console.error('Error al subir documentos:', error);
        res.status(500).send({status:"error", error:"Internal server error"});
    }
}

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    uploadDocuments
}