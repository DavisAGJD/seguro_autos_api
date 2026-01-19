import pool from "../config/database.js";

/**
 * Obtener todas las pólizas
 */
export const getAllPolizas = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.*,
        per.nombre as nombre_persona,
        per.curp,
        v.marca,
        v.modelo,
        v.anio,
        v.placas,
        v.vin
      FROM polizas p
      INNER JOIN personas per ON p.id_persona = per.id_persona
      INNER JOIN vehiculos v ON p.id_vehiculo = v.id_vehiculo
      ORDER BY p.fecha_inicio DESC
    `;

    const [rows] = await pool.query(query);

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Error al obtener pólizas:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener pólizas",
      error: error.message,
    });
  }
};

/**
 * Obtener una póliza por ID
 */
export const getPolizaById = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT 
        p.*,
        per.nombre as nombre_persona,
        per.curp,
        per.email,
        per.telefono,
        v.marca,
        v.modelo,
        v.anio,
        v.placas,
        v.vin,
        v.color,
        v.tipo
      FROM polizas p
      INNER JOIN personas per ON p.id_persona = per.id_persona
      INNER JOIN vehiculos v ON p.id_vehiculo = v.id_vehiculo
      WHERE p.id_poliza = ?
    `;

    const [rows] = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Póliza no encontrada",
      });
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error("Error al obtener póliza:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener póliza",
      error: error.message,
    });
  }
};

/**
 * Crear una nueva póliza
 */
export const createPoliza = async (req, res) => {
  try {
    const {
      numero_poliza,
      id_persona,
      id_vehiculo,
      cantidad_poliza,
      fecha_compra,
      fecha_inicio,
      fecha_fin,
      estatus = "Activa",
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO polizas 
       (numero_poliza, id_persona, id_vehiculo, cantidad_poliza, fecha_compra, fecha_inicio, fecha_fin, estatus) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        numero_poliza,
        id_persona,
        id_vehiculo,
        cantidad_poliza,
        fecha_compra,
        fecha_inicio,
        fecha_fin,
        estatus,
      ],
    );

    res.status(201).json({
      success: true,
      message: "Póliza creada exitosamente",
      data: {
        id_poliza: result.insertId,
        numero_poliza,
        id_persona,
        id_vehiculo,
        cantidad_poliza,
        fecha_compra,
        fecha_inicio,
        fecha_fin,
        estatus,
      },
    });
  } catch (error) {
    console.error("Error al crear póliza:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear póliza",
      error: error.message,
    });
  }
};

/**
 * Actualizar una póliza
 */
export const updatePoliza = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      numero_poliza,
      id_persona,
      id_vehiculo,
      cantidad_poliza,
      fecha_compra,
      fecha_inicio,
      fecha_fin,
      estatus,
    } = req.body;

    const [result] = await pool.query(
      `UPDATE polizas 
       SET numero_poliza = ?, id_persona = ?, id_vehiculo = ?, cantidad_poliza = ?, 
           fecha_compra = ?, fecha_inicio = ?, fecha_fin = ?, estatus = ?
       WHERE id_poliza = ?`,
      [
        numero_poliza,
        id_persona,
        id_vehiculo,
        cantidad_poliza,
        fecha_compra,
        fecha_inicio,
        fecha_fin,
        estatus,
        id,
      ],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Póliza no encontrada",
      });
    }

    res.json({
      success: true,
      message: "Póliza actualizada exitosamente",
    });
  } catch (error) {
    console.error("Error al actualizar póliza:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar póliza",
      error: error.message,
    });
  }
};

/**
 * Eliminar una póliza
 */
export const deletePoliza = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM polizas WHERE id_poliza = ?",
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Póliza no encontrada",
      });
    }

    res.json({
      success: true,
      message: "Póliza eliminada exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar póliza:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar póliza",
      error: error.message,
    });
  }
};

/**
 * Obtener pólizas activas
 */
export const getPolizasActivas = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.*,
        per.nombre as nombre_persona,
        v.marca,
        v.modelo,
        v.placas
      FROM polizas p
      INNER JOIN personas per ON p.id_persona = per.id_persona
      INNER JOIN vehiculos v ON p.id_vehiculo = v.id_vehiculo
      WHERE p.estatus = 'Activa' AND p.fecha_fin >= CURDATE()
      ORDER BY p.fecha_inicio DESC
    `;

    const [rows] = await pool.query(query);

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Error al obtener pólizas activas:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener pólizas activas",
      error: error.message,
    });
  }
};
