/* Estructura del curso. El contenido de cada módulo vive en js/modules/<id>.js
   y se registra con: CURSO.contenido.<id> = { html, quiz } */
window.CURSO = {
  titulo: "Seguridad de la Información desde Cero",
  aprobado: 70, // porcentaje mínimo para aprobar un cuestionario o examen
  niveles: [
    { id: "basico", titulo: "Nivel Básico" },
    { id: "intermedio", titulo: "Nivel Intermedio" },
    { id: "avanzado", titulo: "Nivel Avanzado" }
  ],
  lista: [
    { id: "b00", nivel: "basico", titulo: "Básico 0: Bienvenida y reglas de ética" },
    { id: "b01", nivel: "basico", titulo: "Básico 1: ¿Qué es la seguridad de la información?" },
    { id: "b02", nivel: "basico", titulo: "Básico 2: Cómo funciona internet (lo mínimo)" },
    { id: "b03", nivel: "basico", titulo: "Básico 3: Amenazas y ataques comunes" },
    { id: "b04", nivel: "basico", titulo: "Básico 4: Contraseñas y autenticación" },
    { id: "b05", nivel: "basico", titulo: "Básico 5: Protege tu equipo y tus hábitos" },
    { id: "b06", nivel: "basico", titulo: "Básico 6: Datos, privacidad y cifrado básico" },
    { id: "b07", nivel: "basico", titulo: "Básico 7: Qué hacer ante un incidente" },

    { id: "i01", nivel: "intermedio", titulo: "Intermedio 1: Redes seguras" },
    { id: "i02", nivel: "intermedio", titulo: "Intermedio 2: Identidad y control de acceso" },
    { id: "i03", nivel: "intermedio", titulo: "Intermedio 3: Seguridad web y OWASP Top 10" },
    { id: "i04", nivel: "intermedio", titulo: "Intermedio 4: Inyección SQL, XSS y CSRF" },
    { id: "i05", nivel: "intermedio", titulo: "Intermedio 5: Criptografía aplicada y claves" },
    { id: "i06", nivel: "intermedio", titulo: "Intermedio 6: Riesgos y vulnerabilidades" },
    { id: "i07", nivel: "intermedio", titulo: "Intermedio 7: Logs y monitoreo" },

    { id: "a01", nivel: "avanzado", titulo: "Avanzado 1: Desarrollo seguro y modelado de amenazas" },
    { id: "a02", nivel: "avanzado", titulo: "Avanzado 2: APIs REST, JWT y OAuth 2.0" },
    { id: "a03", nivel: "avanzado", titulo: "Avanzado 3: Spring Security y microservicios" },
    { id: "a04", nivel: "avanzado", titulo: "Avanzado 4: Gestión de secretos" },
    { id: "a05", nivel: "avanzado", titulo: "Avanzado 5: DevSecOps y análisis de código" },
    { id: "a06", nivel: "avanzado", titulo: "Avanzado 6: Pruebas de seguridad" },
    { id: "a07", nivel: "avanzado", titulo: "Avanzado 7: Respuesta a incidentes" },
    { id: "a08", nivel: "avanzado", titulo: "Avanzado 8: Proyecto final" }
  ],
  // Exámenes: se desbloquean al aprobar todos los módulos de los niveles indicados
  examenes: [
    { id: "examen-basico", titulo: "Examen del nivel Básico", niveles: ["basico"] },
    { id: "examen-intermedio", titulo: "Examen del nivel Intermedio", niveles: ["intermedio"] },
    { id: "examen-avanzado", titulo: "Examen del nivel Avanzado", niveles: ["avanzado"] },
    { id: "examen-final", titulo: "Evaluación final del curso", niveles: ["basico", "intermedio", "avanzado"] }
  ],
  contenido: {}
};
