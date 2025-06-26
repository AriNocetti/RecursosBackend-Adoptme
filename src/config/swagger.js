import swaggerJsDoc from "swagger-jsdoc";

// Configuración para documentación manual con YAML
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Adoptme",
            version: "1.0.0",
            description: "API-REST Adoptme",
        },
        servers: [
            {
                url: "http://localhost:8080",
                description: "Desarrollo",
            },
            {
                url: "http://localhost:8080",
                description: "Producción",
            },
        ],
    },
    apis: ["./src/docs/**/*.yaml", "./src/controllers/**/*.js","./src/docs/sessions.yml" ], // Configuración para modo mixto (YAML y JSDoc)
    
    // Configuración alternativa para JSDoc en línea
    // apis: ['./src/**/*.js'], // o apis: ['./src/*.js'],  apis: ['./src/routes/**/*.js']
};

// Implementamos swagger con los archivos YAML
export const swaggerDocs = swaggerJsDoc(swaggerOptions);