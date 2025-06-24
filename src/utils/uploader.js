import __dirname from "./index.js";
import multer from 'multer';

// Función para crear storage configurado según tipo de archivo
const createStorage = (folder) => {
    return multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, `${__dirname}/../public/${folder}`)
        },
        filename: function(req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    });
};

// Storage por defecto para imágenes de mascotas
const petStorage = createStorage('img/pets');

// Storage para documentos
const documentsStorage = createStorage('documents');

// Uploader por defecto (para compatibilidad con código existente)
const uploader = multer({ storage: petStorage });

// Uploader específico para documentos
uploader.documents = multer({ storage: documentsStorage });

// Función auxiliar para elegir el storage según el tipo
uploader.custom = (fileType) => {
    switch(fileType) {
        case 'documents':
            return multer({ storage: documentsStorage });
        case 'pets':
        default:
            return multer({ storage: petStorage });
    }
};

export default uploader;