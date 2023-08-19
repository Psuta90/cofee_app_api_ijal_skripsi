import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

const cors : CorsOptions = {
    origin: "*",
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: ['*'],
}

export { cors };