-- ===============================================
-- Datos de prueba para Base de Datos de Seguro de Autos
-- ===============================================

-- Limpiar datos existentes (opcional)
-- SET FOREIGN_KEY_CHECKS = 0;
-- TRUNCATE TABLE accidente_persona;
-- TRUNCATE TABLE infracciones;
-- TRUNCATE TABLE accidentes;
-- TRUNCATE TABLE polizas;
-- TRUNCATE TABLE vehiculos;
-- TRUNCATE TABLE personas;
-- TRUNCATE TABLE municipios;
-- SET FOREIGN_KEY_CHECKS = 1;

-- =========================
-- Municipios
-- =========================
INSERT INTO municipios (nombre) VALUES
('Kanasín'),
('Mérida'),
('Progreso'),
('Umán'),
('Tizimín'),
('Valladolid'),
('Ticul'),
('Motul');

-- =========================
-- Personas
-- =========================
INSERT INTO personas (nombre, curp, telefono, email, fecha_nacimiento) VALUES
('Juan Carlos Pérez García', 'PEGJ850315HDFRRN09', '9991234567', 'juan.perez@example.com', '1985-03-15'),
('María Elena López Méndez', 'LOMM900520MDFPRL02', '9997654321', 'maria.lopez@example.com', '1990-05-20'),
('Carlos Alberto Martínez Rodríguez', 'MARC880710HDFRRL05', '9993456789', 'carlos.martinez@example.com', '1988-07-10'),
('Ana Patricia Hernández Soto', 'HESA920315MDFRTN08', '9998765432', 'ana.hernandez@example.com', '1992-03-15'),
('Roberto Carlos Díaz Fernández', 'DIFR870825HDFRRT04', '9992345678', 'roberto.diaz@example.com', '1987-08-25'),
('Laura Isabel González Castro', 'GOCL950410MDFRSR07', '9996543210', 'laura.gonzalez@example.com', '1995-04-10'),
('Pedro Luis Ramírez Torres', 'RATP830920HDFMRD01', '9994567890', 'pedro.ramirez@example.com', '1983-09-20'),
('Sandra Gabriela Torres Valdez', 'TOVS910615MDFRRL03', '9995678901', 'sandra.torres@example.com', '1991-06-15'),
('Miguel Ángel Sánchez Gómez', 'SAGM860130HDFRGL06', '9997890123', 'miguel.sanchez@example.com', '1986-01-30'),
('Patricia Alejandra Cruz Morales', 'CUMP940805MDFRRT09', '9998901234', 'patricia.cruz@example.com', '1994-08-05'),
('Fernando José Morales Ríos', 'MORF891215HDFRRR02', '9991112233', 'fernando.morales@example.com', '1989-12-15'),
('Diana Carolina Vázquez Silva', 'VASD930422MDFRZN04', '9992223344', 'diana.vazquez@example.com', '1993-04-22'),
('Alejandro Ruiz Jiménez', 'RUJA870918HDFRZL08', '9993334455', 'alejandro.ruiz@example.com', '1987-09-18'),
('Gabriela Méndez Rojas', 'MERG920528MDFRJB01', '9994445566', 'gabriela.mendez@example.com', '1992-05-28'),
('Ricardo Flores Gutiérrez', 'FOGR881203HDFLTC05', '9995556677', 'ricardo.flores@example.com', '1988-12-03');

-- =========================
-- Vehículos
-- =========================
INSERT INTO vehiculos (vin, placas, marca, modelo, anio, color, tipo, uso, cilindros, num_puertas) VALUES
('1HGBH41JXMN109186', 'YUC-123-A', 'Honda', 'Civic', 2020, 'Blanco', 'Sedan', 'Particular', 4, 4),
('2HGFC2F59KH123456', 'YUC-456-B', 'Toyota', 'Corolla', 2019, 'Gris', 'Sedan', 'Particular', 4, 4),
('3FADP4EJ8FM123789', 'YUC-789-C', 'Nissan', 'Sentra', 2021, 'Negro', 'Sedan', 'Plataforma', 4, 4),
('4T1BF1FK5CU123456', 'YUC-234-D', 'Mazda', 'CX-5', 2022, 'Rojo', 'SUV', 'Particular', 4, 5),
('5YJSA1E14HF123789', 'YUC-567-E', 'Chevrolet', 'Aveo', 2018, 'Azul', 'Sedan', 'Particular', 4, 4),
('6HGCG1659WA654321', 'YUC-890-F', 'Ford', 'Ecosport', 2020, 'Blanco', 'SUV', 'Particular', 4, 5),
('7JTNKARJE9GJ987654', 'YUC-345-G', 'Volkswagen', 'Jetta', 2021, 'Plata', 'Sedan', 'Particular', 4, 4),
('8WDCGG8GB5AG456789', 'YUC-678-H', 'Kia', 'Rio', 2019, 'Verde', 'Sedan', 'Plataforma', 4, 4),
('9SALWR2TF9EA321654', 'YUC-901-I', 'Hyundai', 'Accent', 2020, 'Gris', 'Sedan', 'Particular', 4, 4),
('1G1ZT53826F159753', 'YUC-012-J', 'Toyota', 'RAV4', 2022, 'Negro', 'SUV', 'Particular', 4, 5),
('2C3CDXBG2EH753951', 'YUC-135-K', 'Honda', 'CR-V', 2021, 'Blanco', 'SUV', 'Particular', 4, 5),
('3FA6P0HD9FR852963', 'YUC-246-L', 'Mazda', '3', 2020, 'Rojo', 'Sedan', 'Particular', 4, 4),
('4T1BK36B48U357159', 'YUC-357-M', 'Nissan', 'Versa', 2019, 'Azul', 'Sedan', 'Plataforma', 4, 4),
('5FRYD3H25GB654789', 'YUC-468-N', 'Chevrolet', 'Spark', 2018, 'Amarillo', 'Sedan', 'Particular', 3, 4),
('6GKEK13788J951357', 'YUC-579-O', 'Ford', 'Fiesta', 2019, 'Plata', 'Sedan', 'Particular', 4, 4);

-- =========================
-- Pólizas
-- =========================
INSERT INTO polizas (numero_poliza, id_persona, id_vehiculo, cantidad_poliza, fecha_compra, fecha_inicio, fecha_fin, estatus) VALUES
('POL-2024-001', 1, 1, 12000.00, '2024-01-10', '2024-02-01', '2025-02-01', 'Activa'),
('POL-2024-002', 2, 2, 11500.00, '2024-01-15', '2024-02-01', '2025-02-01', 'Activa'),
('POL-2024-003', 3, 3, 15000.00, '2024-01-20', '2024-02-01', '2025-02-01', 'Activa'),
('POL-2024-004', 4, 4, 18000.00, '2024-01-25', '2024-02-01', '2025-02-01', 'Activa'),
('POL-2024-005', 5, 5, 10000.00, '2024-02-01', '2024-02-15', '2025-02-15', 'Activa'),
('POL-2024-006', 6, 6, 16000.00, '2024-02-05', '2024-03-01', '2025-03-01', 'Activa'),
('POL-2024-007', 7, 7, 13500.00, '2024-02-10', '2024-03-01', '2025-03-01', 'Activa'),
('POL-2024-008', 8, 8, 14000.00, '2024-02-15', '2024-03-01', '2025-03-01', 'Activa'),
('POL-2024-009', 9, 9, 11000.00, '2024-02-20', '2024-03-15', '2025-03-15', 'Activa'),
('POL-2024-010', 10, 10, 19000.00, '2024-02-25', '2024-03-15', '2025-03-15', 'Activa'),
('POL-2023-001', 11, 11, 17000.00, '2023-01-10', '2023-02-01', '2024-02-01', 'Vencida'),
('POL-2023-002', 12, 12, 12500.00, '2023-01-15', '2023-02-01', '2024-02-01', 'Vencida'),
('POL-2024-011', 13, 13, 13000.00, '2024-03-01', '2024-03-15', '2025-03-15', 'Activa'),
('POL-2024-012', 14, 14, 9500.00, '2024-03-05', '2024-04-01', '2025-04-01', 'Activa'),
('POL-2024-013', 15, 15, 10500.00, '2024-03-10', '2024-04-01', '2025-04-01', 'Activa');

-- =========================
-- Accidentes
-- =========================
INSERT INTO accidentes (fecha_hora, id_municipio, direccion, tipo_accidente, severidad, descripcion) VALUES
('2024-01-15 18:30:00', 1, 'Calle 20 x 15, Kanasín', 'Choque', 'Moderado', 'Choque entre dos vehículos en crucero'),
('2024-01-20 07:15:00', 2, 'Av. Itzáes x Calle 59, Mérida', 'Choque', 'Leve', 'Alcance en semáforo'),
('2024-02-05 19:45:00', 1, 'Carretera Mérida-Kanasín km 5', 'Volcadura', 'Grave', 'Vehículo volcado en curva'),
('2024-02-10 08:00:00', 3, 'Malecón de Progreso', 'Choque', 'Leve', 'Choque menor en estacionamiento'),
('2024-02-15 12:30:00', 2, 'Prolongación Montejo, Mérida', 'Choque múltiple', 'Moderado', 'Choque de tres vehículos'),
('2024-02-20 18:20:00', 1, 'Centro de Kanasín', 'Atropello', 'Grave', 'Peatón atropellado'),
('2024-03-01 07:30:00', 4, 'Entrada a Umán', 'Choque', 'Leve', 'Rayón entre dos autos'),
('2024-03-05 19:00:00', 2, 'Calle 60 x 41, Centro Mérida', 'Choque', 'Moderado', 'Impacto lateral'),
('2024-03-10 06:45:00', 5, 'Carretera Tizimín-Valladolid', 'Salida de carretera', 'Grave', 'Vehículo fuera del camino'),
('2024-03-15 18:15:00', 1, 'Kanasín, Av. Principal', 'Choque', 'Moderado', 'Choque en intersección'),
('2024-03-20 20:00:00', 2, 'Periférico de Mérida', 'Choque', 'Leve', 'Alcance en tráfico pesado'),
('2024-03-25 07:00:00', 1, 'Salida Kanasín-Acanceh', 'Volcadura', 'Fatal', 'Vehículo volcado con fatalidad'),
('2024-04-01 18:45:00', 6, 'Centro Valladolid', 'Choque', 'Leve', 'Choque menor'),
('2024-04-05 08:30:00', 7, 'Ticul centro', 'Choque', 'Moderado', 'Choque en cruce'),
('2024-04-10 19:30:00', 2, 'Gran Plaza Mérida', 'Choque', 'Leve', 'Accidente en estacionamiento');

-- =========================
-- Relación Accidente-Persona
-- =========================
INSERT INTO accidente_persona (id_accidente, id_persona, rol, responsable, lesiones) VALUES
-- Accidente 1
(1, 1, 'Conductor', 1, 'Leves'),
(1, 2, 'Conductor', 0, 'Leves'),
-- Accidente 2
(2, 3, 'Conductor', 1, 'Ninguna'),
(2, 4, 'Conductor', 0, 'Ninguna'),
-- Accidente 3
(3, 5, 'Conductor', 1, 'Graves'),
-- Accidente 4
(4, 6, 'Conductor', 1, 'Ninguna'),
(4, 7, 'Conductor', 0, 'Ninguna'),
-- Accidente 5
(5, 3, 'Conductor', 1, 'Leves'),
(5, 8, 'Conductor', 0, 'Leves'),
(5, 9, 'Conductor', 0, 'Leves'),
-- Accidente 6
(6, 10, 'Conductor', 1, 'Ninguna'),
(6, 11, 'Afectado', 0, 'Graves'),
-- Accidente 7
(7, 12, 'Conductor', 1, 'Ninguna'),
(7, 13, 'Conductor', 0, 'Ninguna'),
-- Accidente 8
(8, 3, 'Conductor', 1, 'Leves'),
(8, 14, 'Conductor', 0, 'Leves'),
-- Accidente 9
(9, 15, 'Conductor', 1, 'Graves'),
-- Accidente 10
(10, 1, 'Conductor', 0, 'Leves'),
(10, 5, 'Conductor', 1, 'Leves'),
-- Accidente 11
(11, 2, 'Conductor', 0, 'Ninguna'),
(11, 6, 'Conductor', 1, 'Ninguna'),
-- Accidente 12
(12, 5, 'Conductor', 1, 'Fallecido'),
-- Accidente 13
(13, 7, 'Conductor', 1, 'Ninguna'),
(13, 8, 'Conductor', 0, 'Ninguna'),
-- Accidente 14
(14, 9, 'Conductor', 1, 'Leves'),
(14, 10, 'Conductor', 0, 'Leves'),
-- Accidente 15
(15, 11, 'Conductor', 1, 'Ninguna'),
(15, 12, 'Conductor', 0, 'Ninguna');

-- =========================
-- Infracciones
-- =========================
INSERT INTO infracciones (id_persona, fecha_hora, id_municipio, tipo_infraccion, monto, puntos, descripcion) VALUES
-- Persona 3 (Carlos) - Alta frecuencia
(3, '2024-01-10 14:30:00', 2, 'Exceso de velocidad', 1500.00, 2, 'Excedió límite en 20 km/h'),
(3, '2024-02-15 16:45:00', 1, 'No respetar semáforo', 2000.00, 3, 'Pasó semáforo en rojo'),
(3, '2024-03-20 18:00:00', 2, 'Estacionamiento prohibido', 500.00, 1, 'Estacionado en zona prohibida'),
(3, '2024-04-05 12:00:00', 2, 'Conducir sin licencia', 3000.00, 5, 'Licencia vencida'),

-- Persona 5 (Roberto) - Alta frecuencia
(5, '2024-01-15 20:00:00', 1, 'Conducir en estado de ebriedad', 5000.00, 10, 'Alcoholímetro positivo'),
(5, '2024-02-20 22:30:00', 2, 'Exceso de velocidad', 2000.00, 3, 'Excedió límite en 40 km/h'),
(5, '2024-03-25 19:00:00', 1, 'No respetar señalamiento', 1000.00, 2, 'No respetó alto'),

-- Otras personas
(1, '2024-02-01 10:00:00', 2, 'Exceso de velocidad', 1000.00, 1, 'Excedió límite en 10 km/h'),
(2, '2024-02-10 15:30:00', 1, 'Estacionamiento prohibido', 500.00, 1, 'Estacionado en rampa'),
(4, '2024-02-15 09:00:00', 2, 'No usar cinturón', 800.00, 2, 'Conducía sin cinturón'),
(6, '2024-03-01 11:30:00', 3, 'Celular al conducir', 1200.00, 2, 'Uso de celular sin manos libres'),
(7, '2024-03-05 17:00:00', 4, 'Exceso de velocidad', 1500.00, 2, 'Excedió límite en 25 km/h'),
(8, '2024-03-10 13:45:00', 2, 'Estacionamiento prohibido', 500.00, 1, 'Doble fila'),
(9, '2024-03-15 16:00:00', 5, 'No respetar señalamiento', 1000.00, 2, 'No cedió el paso'),
(10, '2024-03-20 12:30:00', 2, 'Exceso de velocidad', 1000.00, 1, 'Excedió límite en 15 km/h'),
(11, '2024-03-25 14:00:00', 6, 'Estacionamiento prohibido', 500.00, 1, 'En zona de discapacitados'),
(12, '2024-04-01 10:30:00', 7, 'No usar cinturón', 800.00, 2, 'Pasajero sin cinturón'),
(13, '2024-04-05 15:00:00', 2, 'Celular al conducir', 1200.00, 2, 'Texteando mientras conducía'),
(14, '2024-04-10 11:00:00', 8, 'Exceso de velocidad', 1500.00, 2, 'Excedió límite en 30 km/h'),
(15, '2024-04-15 16:30:00', 2, 'No respetar semáforo', 2000.00, 3, 'Pasó en amarillo cambiando a rojo');

-- Mensaje de confirmación
SELECT '✅ Datos de prueba insertados exitosamente' as Mensaje;

-- Verificación rápida
SELECT 
  (SELECT COUNT(*) FROM municipios) as Total_Municipios,
  (SELECT COUNT(*) FROM personas) as Total_Personas,
  (SELECT COUNT(*) FROM vehiculos) as Total_Vehiculos,
  (SELECT COUNT(*) FROM polizas) as Total_Polizas,
  (SELECT COUNT(*) FROM accidentes) as Total_Accidentes,
  (SELECT COUNT(*) FROM infracciones) as Total_Infracciones;
