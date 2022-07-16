const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      bajaj: "/api/bajaj",
      aseguradoras: "/api/aseguradoras",
      buscar: "/api/buscar",
      categorias: "/api/categorias",
      departamentos: "/api/departamentos",
      fca: "/api/fca",
      ford: "/api/ford",
      foton: "/api/foton",
      peugeot: "/api/peugeot",
      productos: "/api/productos",
      reportes: "/api/reportes",
      tickets: "/api/tickets",
      uploads: "/api/uploads",
      usados: "/api/usados",
      usuarios: "/api/usuarios",
    };

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  /* async conectarDB() {
    await getSQLConection();
  } */

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static("public"));

    //File Upload
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.bajaj, require("../routes/bajaj"));
    this.app.use(this.paths.aseguradoras, require("../routes/aseguradoras"));
    this.app.use(this.paths.buscar, require("../routes/buscar"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
    this.app.use(this.paths.departamentos, require("../routes/departamentos"));
    this.app.use(this.paths.fca, require("../routes/fca"));
    this.app.use(this.paths.ford, require("../routes/ford"));
    this.app.use(this.paths.foton, require("../routes/foton"));
    this.app.use(this.paths.peugeot, require("../routes/peugeot"));
    this.app.use(this.paths.productos, require("../routes/productos"));
    this.app.use(this.paths.reportes, require("../routes/reportes"));
    this.app.use(this.paths.tickets, require("../routes/tickets"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
    this.app.use(this.paths.usados, require("../routes/usados"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
