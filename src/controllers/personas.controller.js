import pool from "../config/database.js";

/**
 * Obtener todas las personas
 */
export const getAllPersonas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM personas ORDER BY nombre");

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Error al obtener personas:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener personas",
      error: error.message,
    });
  }
};

/**
 * Obtener una persona por ID
 */
export const getPersonaById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM personas WHERE id_persona = ?",
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Persona no encontrada",
      });
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error("Error al obtener persona:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener persona",
      error: error.message,
    });
  }
};

/**
 * Crear una nueva persona
 */
export const createPersona = async (req, res) => {
  try {
    const { nombre, curp, telefono, email, fecha_nacimiento } = req.body;

    const [result] = await pool.query(
      "INSERT INTO personas (nombre, curp, telefono, email, fecha_nacimiento) VALUES (?, ?, ?, ?, ?)",
      [nombre, curp, telefono, email, fecha_nacimiento],
    );

    res.status(201).json({
      success: true,
      message: "Persona creada exitosamente",
      data: {
        id_persona: result.insertId,
        nombre,
        curp,
        telefono,
        email,
        fecha_nacimiento,
      },
    });
  } catch (error) {
    console.error("Error al crear persona:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear persona",
      error: error.message,
    });
  }
};

/**
 * Actualizar una persona
 */
export const updatePersona = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, curp, telefono, email, fecha_nacimiento } = req.body;

    const [result] = await pool.query(
      "UPDATE personas SET nombre = ?, curp = ?, telefono = ?, email = ?, fecha_nacimiento = ? WHERE id_persona = ?",
      [nombre, curp, telefono, email, fecha_nacimiento, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Persona no encontrada",
      });
    }

    res.json({
      success: true,
      message: "Persona actualizada exitosamente",
      data: {
        id_persona: id,
        nombre,
        curp,
        telefono,
        email,
        fecha_nacimiento,
      },
    });
  } catch (error) {
    console.error("Error al actualizar persona:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar persona",
      error: error.message,
    });
  }
};

/**
 * Eliminar una persona
 */
export const deletePersona = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM personas WHERE id_persona = ?",
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Persona no encontrada",
      });
    }

    res.json({
      success: true,
      message: "Persona eliminada exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar persona:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar persona",
      error: error.message,
    });
  }
};

/**
 * Obtener historial completo de una persona (pólizas, accidentes, infracciones)
 */
export const getHistorialPersona = async (req, res) => {
  try {
    const { id } = req.params;

    // Obtener datos de la persona
    const [persona] = await pool.query(
      "SELECT * FROM personas WHERE id_persona = ?",
      [id],
    );

    if (persona.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Persona no encontrada",
      });
    }

    // Obtener pólizas
    const [polizas] = await pool.query(
      `SELECT p.*, v.marca, v.modelo, v.anio, v.placas 
       FROM polizas p
       INNER JOIN vehiculos v ON p.id_vehiculo = v.id_vehiculo
       WHERE p.id_persona = ?
       ORDER BY p.fecha_inicio DESC`,
      [id],
    );

    // Obtener accidentes
    const [accidentes] = await pool.query(
      `SELECT a.*, ap.rol, ap.responsable, ap.lesiones, m.nombre as municipio
       FROM accidentes a
       INNER JOIN accidente_persona ap ON a.id_accidente = ap.id_accidente
       INNER JOIN municipios m ON a.id_municipio = m.id_municipio
       WHERE ap.id_persona = ?
       ORDER BY a.fecha_hora DESC`,
      [id],
    );

    // Obtener infracciones
    const [infracciones] = await pool.query(
      `SELECT i.*, m.nombre as municipio
       FROM infracciones i
       INNER JOIN municipios m ON i.id_municipio = m.id_municipio
       WHERE i.id_persona = ?
       ORDER BY i.fecha_hora DESC`,
      [id],
    );

    res.json({
      success: true,
      data: {
        persona: persona[0],
        polizas,
        accidentes,
        infracciones,
      },
    });
  } catch (error) {
    console.error("Error al obtener historial de persona:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener historial de persona",
      error: error.message,
    });
  }
};

/**
 * Consulta 2:
 * Nombre de la persona
 * Cantidad de la poliza
 * Fecha de compra de la poliza
 * Atributos del vehiculo
 */
export const getConsulta2Persona = async (req, res) => {
  try {
    const { id } = req.params;

    // (Opcional) verificar que exista la persona
    const [persona] = await pool.query(
      "SELECT id_persona FROM personas WHERE id_persona = ?",
      [id]
    );

    if (persona.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Persona no encontrada",
      });
    }

    const [rows] = await pool.query(
      `SELECT
         pe.nombre AS nombre_persona,
         po.cantidad_poliza,
         po.fecha_compra,
         v.vin,
         v.placas,
         v.marca,
         v.modelo,
         v.anio,
         v.color,
         v.tipo,
         v.uso,
         v.cilindros,
         v.num_puertas
       FROM polizas po
       INNER JOIN personas pe ON pe.id_persona = po.id_persona
       INNER JOIN vehiculos v ON v.id_vehiculo = po.id_vehiculo
       WHERE po.id_persona = ?
       ORDER BY po.fecha_compra DESC`,
      [id]
    );

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Error en consulta 2:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener la consulta 2",
      error: error.message,
    });
  }
};
