import { Router } from "express";
import {
  getAllPersonas,
  getPersonaById,
  createPersona,
  updatePersona,
  deletePersona,
  getHistorialPersona,
} from "../controllers/personas.controller.js";

const router = Router();

/**
 * @route   GET /api/personas
 * @desc    Obtener todas las personas
 * @access  Public
 */
router.get("/", getAllPersonas);

/**
 * @route   GET /api/personas/:id
 * @desc    Obtener una persona por ID
 * @access  Public
 */
router.get("/:id", getPersonaById);

/**
 * @route   GET /api/personas/:id/historial
 * @desc    Obtener historial completo de una persona
 * @access  Public
 */
router.get("/:id/historial", getHistorialPersona);

/**
 * @route   POST /api/personas
 * @desc    Crear nueva persona
 * @access  Public
 */
router.post("/", createPersona);

/**
 * @route   PUT /api/personas/:id
 * @desc    Actualizar persona
 * @access  Public
 */
router.put("/:id", updatePersona);

/**
 * @route   DELETE /api/personas/:id
 * @desc    Eliminar persona
 * @access  Public
 */
router.delete("/:id", deletePersona);

export default router;
