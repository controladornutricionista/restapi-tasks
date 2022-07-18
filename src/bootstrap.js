const Role = require("./api/v1/database/Roles");
const Usuario = require("./api/v1/database/Usuarios");

const defaultRoles = [
  {
    nombre: "Administrador",
    descripcion: "Rol administrador del sistema",
    color: "#ffbd45",
    permisos: [
      {
        nombre: "Inicio",
        descripcion: "Inicio del aplicativo",
        rutaPermiso: "InicioPage",
      },
      {
        nombre: "Login",
        descripcion: "Login del aplicativo",
        rutaPermiso: "LoginPage",
      },
      {
        nombre: "ListaEmpleados",
        descripcion: "Empleados del aplicativo",
        rutaPermiso: "EmpleadosPage",
      },
    ],
  },
  {
    nombre: "Empleado",
    descripcion: "Empleado del sistema",
    color: "#6089cd",
    permisos: [
      {
        nombre: "Inicio",
        descripcion: "Inicio del aplicativo",
        rutaPermiso: "InicioPage",
      },
      {
        nombre: "Login",
        descripcion: "Login del aplicativo",
        rutaPermiso: "LoginPage",
      },
    ],
  },
  {
    nombre: "Cliente",
    descripcion: "Cliente del sistema",
    color: "#975fcd",
    permisos: [
      {
        nombre: "Inicio",
        descripcion: "Inicio del aplicativo",
        rutaPermiso: "InicioPage",
      },
      {
        nombre: "Login",
        descripcion: "Login del aplicativo",
        rutaPermiso: "LoginPage",
      },
      {
        nombre: "Registrar",
        descripcion: "Registrar cliente del aplicativo",
        rutaPermiso: "RegistrarPage",
      },
    ],
  },
];

const getDefaultUser = (rolId) => {
  return {
    usuario: "admin@express.com",
    contrasena: "123456",
    rol: rolId,
    activo: true,
  };
};

exports.bootstrap = async () => {
  const mapRoles = new Map();
  for (const role of defaultRoles) {
    const existe = await Role.findOne({ nombre: role.nombre }).exec();
    if (!existe) {
      const newRole = new Role(role);
      console.log("role created", newRole);
      const roleSaved = await newRole.save();
      if (!roleSaved) {
        console.log(`Error guardando el rol ${role.nombre}!`);
      } else {
        mapRoles.set(role.nombre, roleSaved._id);
      }
    } else {
      const roleUpdated = await Role.findOneAndUpdate(
        { nombre: role.nombre },
        {
          $set: {
            descripcion: role.descripcion,
            permisos: role.permisos,
          },
        },
        { new: true }
      ).exec();
      mapRoles.set(role.nombre, roleUpdated._id);
    }
    console.log("hola");
  }

  const user = getDefaultUser(mapRoles.get("Administrador"));
  const adminUser = await Usuario.findOne({ usuario: user.usuario }).exec();

  if (!adminUser) {
    const newAdmin = new Usuario(user);
    const userSaved = await newAdmin.save();
    if (!userSaved) {
      console.log("El usuario por defecto no se pudo crear");
      return;
    }
    console.log(`El usuario ${user.usuario} ha sido creado!`);
  } else {
    console.log(`El usuario ${user.usuario} ya había sido creado!`);
  }
};
