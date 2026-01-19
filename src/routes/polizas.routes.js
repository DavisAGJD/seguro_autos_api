import { Router } from "express";
import {
  getAllPolizas,
  getPolizaById,
  createPoliza,
  updatePoliza,
  deletePoliza,
  getPolizasActivas,
} from "../controllers/polizas.controller.js";

const router = Router();

/**
 * @route   GET /api/polizas
 * @desc    Obtener todas las pólizas
 * @access  Public
 */
router.get("/", getAllPolizas);

/**
 * @route   GET /api/polizas/activas
 * @desc    Obtener pólizas activas
 * @access  Public
 */
router.get("/activas", getPolizasActivas);

/**
 * @route   GET /api/polizas/:id
 * @desc    Obtener una póliza por ID
 * @access  Public
 */
router.get("/:id", getPolizaById);

/**
 * @route   POST /api/polizas
 * @desc    Crear nueva póliza
 * @access  Public
 */
router.post("/", createPoliza);

/**
 * @route   PUT /api/polizas/:id
 * @desc    Actualizar póliza
 * @access  Public
 */
router.put("/:id", updatePoliza);

/**
 * @route   DELETE /api/polizas/:id
 * @desc    Eliminar póliza
 * @access  Public
 */
router.delete("/:id", deletePoliza);

export default router;
