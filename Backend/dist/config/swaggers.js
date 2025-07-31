"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerBuild = SwaggerBuild;
const swagger_1 = require("@nestjs/swagger");
function SwaggerBuild(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Akeray Property Management System Backend')
        .setDescription('The Akeray Property Management System APIs')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/docs', app, document);
}
//# sourceMappingURL=swaggers.js.map