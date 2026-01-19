import pool from "../config/database.js";

/**
 * Obtener el número total de accidentes
 */
export const getNumeroAccidentes = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT COUNT(*) as total_accidentes FROM accidentes",
    );

    res.json({
      success: true,
      data: {
        total_accidentes: rows[0].total_accidentes,
      },
    });
  } catch (error) {
    console.error("Error al obtener número de accidentes:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener número de accidentes",
      error: error.message,
    });
  }
};

/**
 * Obtener el número total de infracciones
 */
export const getNumeroInfracciones = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT COUNT(*) as total_infracciones FROM infracciones",
    );

    res.json({
      success: true,
      data: {
        total_infracciones: rows[0].total_infracciones,
      },
    });
  } catch (error) {
    console.error("Error al obtener número de infracciones:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener número de infracciones",
      error: error.message,
    });
  }
};

/**
 * Obtener las horas donde surgen más accidentes
 */
export const getHorasConMasAccidentes = async (req, res) => {
  try {
    const query = `
      SELECT 
        HOUR(fecha_hora) as hora,
        COUNT(*) as cantidad_accidentes
      FROM accidentes
      GROUP BY HOUR(fecha_hora)
      ORDER BY cantidad_accidentes DESC, hora ASC
    `;

    const [rows] = await pool.query(query);

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Error al obtener horas con más accidentes:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener horas con más accidentes",
      error: error.message,
    });
  }
};

/**
 * Obtener municipios con más frecuencia de accidentes
 */
export const getMunicipiosConMasAccidentes = async (req, res) => {
  try {
    const query = `
      SELECT 
        m.id_municipio,
        m.nombre,
        COUNT(a.id_accidente) as cantidad_accidentes
      FROM municipios m
      LEFT JOIN accidentes a ON m.id_municipio = a.id_municipio
      GROUP BY m.id_municipio, m.nombre
      HAVING cantidad_accidentes > 0
      ORDER BY cantidad_accidentes DESC, m.nombre ASC
    `;

    const [rows] = await pool.query(query);

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Error al obtener municipios con más accidentes:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener municipios con más accidentes",
      error: error.message,
    });
  }
};

/**
 * Obtener personas con mayor índice de accidentes
 */
export const getPersonasConMayorIndiceAccidentes = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const query = `
      SELECT 
        p.id_persona,
        p.nombre,
        p.curp,
        p.telefono,
        p.email,
        COUNT(ap.id_accidente) as total_accidentes,
        SUM(CASE WHEN ap.responsable = 1 THEN 1 ELSE 0 END) as accidentes_responsable,
        SUM(CASE WHEN ap.lesiones = 'Graves' OR ap.lesiones = 'Fallecido' THEN 1 ELSE 0 END) as accidentes_graves
      FROM personas p
      INNER JOIN accidente_persona ap ON p.id_persona = ap.id_persona
      GROUP BY p.id_persona, p.nombre, p.curp, p.telefono, p.email
      HAVING total_accidentes > 0
      ORDER BY total_accidentes DESC, accidentes_responsable DESC
      LIMIT ?
    `;

    const [rows] = await pool.query(query, [limit]);

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(
      "Error al obtener personas con mayor índice de accidentes:",
      error,
    );
    res.status(500).json({
      success: false,
      message: "Error al obtener personas con mayor índice de accidentes",
      error: error.message,
    });
  }
};

/**
 * Obtener personas con menor índice de accidentes
 * (Personas con pólizas pero sin o con pocos accidentes)
 */
export const getPersonasConMenorIndiceAccidentes = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const query = `
      SELECT 
        p.id_persona,
        p.nombre,
        p.curp,
        p.telefono,
        p.email,
        COUNT(DISTINCT pol.id_poliza) as total_polizas,
        COALESCE(COUNT(DISTINCT ap.id_accidente), 0) as total_accidentes
      FROM personas p
      INNER JOIN polizas pol ON p.id_persona = pol.id_persona
      LEFT JOIN accidente_persona ap ON p.id_persona = ap.id_persona
      GROUP BY p.id_persona, p.nombre, p.curp, p.telefono, p.email
      HAVING total_polizas > 0
      ORDER BY total_accidentes ASC, total_polizas DESC
      LIMIT ?
    `;

    const [rows] = await pool.query(query, [limit]);

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(
      "Error al obtener personas con menor índice de accidentes:",
      error,
    );
    res.status(500).json({
      success: false,
      message: "Error al obtener personas con menor índice de accidentes",
      error: error.message,
    });
  }
};

/**
 * Obtener resumen general de estadísticas
 */
export const getResumenGeneral = async (req, res) => {
  try {
    const queries = {
      total_accidentes: "SELECT COUNT(*) as valor FROM accidentes",
      total_infracciones: "SELECT COUNT(*) as valor FROM infracciones",
      total_personas: "SELECT COUNT(*) as valor FROM personas",
      total_vehiculos: "SELECT COUNT(*) as valor FROM vehiculos",
      total_polizas: "SELECT COUNT(*) as valor FROM polizas",
      polizas_activas:
        'SELECT COUNT(*) as valor FROM polizas WHERE estatus = "Activa"',
      accidentes_graves:
        'SELECT COUNT(DISTINCT id_accidente) as valor FROM accidente_persona WHERE lesiones IN ("Graves", "Fallecido")',
    };

    const results = {};

    for (const [key, query] of Object.entries(queries)) {
      const [rows] = await pool.query(query);
      results[key] = rows[0].valor;
    }

    res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("Error al obtener resumen general:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener resumen general",
      error: error.message,
    });
  }
};
