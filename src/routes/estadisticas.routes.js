import { Router } from "express";
import {
  getNumeroAccidentes,
  getNumeroInfracciones,
  getHorasConMasAccidentes,
  getMunicipiosConMasAccidentes,
  getPersonasConMayorIndiceAccidentes,
  getPersonasConMenorIndiceAccidentes,
  getResumenGeneral,
} from "../controllers/estadisticas.controller.js";

const router = Router();

/**
 * @route   GET /api/estadisticas/resumen
 * @desc    Obtener resumen general de todas las estadísticas
 * @access  Public
 */
router.get("/resumen", getResumenGeneral);

/**
 * @route   GET /api/estadisticas/accidentes/total
 * @desc    Obtener número total de accidentes
 * @access  Public
 */
router.get("/accidentes/total", getNumeroAccidentes);

/**
 * @route   GET /api/estadisticas/infracciones/total
 * @desc    Obtener número total de infracciones
 * @access  Public
 */
router.get("/infracciones/total", getNumeroInfracciones);

/**
 * @route   GET /api/estadisticas/accidentes/horas
 * @desc    Obtener horas donde ocurren más accidentes
 * @access  Public
 */
router.get("/accidentes/horas", getHorasConMasAccidentes);

/**
 * @route   GET /api/estadisticas/accidentes/municipios
 * @desc    Obtener municipios con más accidentes
 * @access  Public
 */
router.get("/accidentes/municipios", getMunicipiosConMasAccidentes);

/**
 * @route   GET /api/estadisticas/personas/mayor-indice
 * @desc    Obtener personas con mayor índice de accidentes
 * @query   limit - Número de resultados (default: 10)
 * @access  Public
 */
router.get("/personas/mayor-indice", getPersonasConMayorIndiceAccidentes);

/**
 * @route   GET /api/estadisticas/personas/menor-indice
 * @desc    Obtener personas con menor índice de accidentes
 * @query   limit - Número de resultados (default: 10)
 * @access  Public
 */
router.get("/personas/menor-indice", getPersonasConMenorIndiceAccidentes);

export default router;
