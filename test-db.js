import pool from "./src/config/database.js";

console.log("🧪 Iniciando pruebas de conexión...\n");

async function testDatabase() {
  try {
    // Probar conexión
    console.log("1️⃣ Probando conexión a MySQL...");
    const connection = await pool.getConnection();
    console.log("   ✅ Conexión exitosa\n");

    // Probar consulta simple
    console.log("2️⃣ Probando consulta simple...");
    const [result] = await connection.query("SELECT DATABASE() as db");
    console.log(`   ✅ Base de datos: ${result[0].db}\n`);

    // Verificar tablas
    console.log("3️⃣ Verificando tablas...");
    const [tables] = await connection.query("SHOW TABLES");
    console.log(`   ✅ Tablas encontradas: ${tables.length}`);
    tables.forEach((table) => {
      const tableName = Object.values(table)[0];
      console.log(`      - ${tableName}`);
    });
    console.log("");

    // Contar registros
    console.log("4️⃣ Contando registros...");
    const [counts] = await connection.query(`
      SELECT 
        (SELECT COUNT(*) FROM municipios) as municipios,
        (SELECT COUNT(*) FROM personas) as personas,
        (SELECT COUNT(*) FROM vehiculos) as vehiculos,
        (SELECT COUNT(*) FROM polizas) as polizas,
        (SELECT COUNT(*) FROM accidentes) as accidentes,
        (SELECT COUNT(*) FROM infracciones) as infracciones
    `);

    console.log("   📊 Registros por tabla:");
    console.log(`      - Municipios: ${counts[0].municipios}`);
    console.log(`      - Personas: ${counts[0].personas}`);
    console.log(`      - Vehículos: ${counts[0].vehiculos}`);
    console.log(`      - Pólizas: ${counts[0].polizas}`);
    console.log(`      - Accidentes: ${counts[0].accidentes}`);
    console.log(`      - Infracciones: ${counts[0].infracciones}`);
    console.log("");

    // Liberar conexión
    connection.release();

    console.log("✅ Todas las pruebas pasaron exitosamente!\n");
    console.log("🚀 Tu base de datos está lista para usar con la API.\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error en las pruebas:", error.message);
    console.error("\n💡 Sugerencias:");
    console.error("   1. Verifica que MySQL está corriendo");
    console.error("   2. Revisa las credenciales en el archivo .env");
    console.error(
      "   3. Asegúrate de haber creado la base de datos y las tablas",
    );
    console.error(
      "   4. Ejecuta el script data_prueba.sql para insertar datos\n",
    );
    process.exit(1);
  }
}

testDatabase();
