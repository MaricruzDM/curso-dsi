CURSO.contenido.b00 = {
  html: `
<p>Bienvenido. Este curso no necesita que sepas de seguridad ni de programación avanzada. Empezaremos con las ideas más simples y subiremos poco a poco.</p>

<h2>Qué vas a aprender</h2>
<p>La <strong>seguridad de la información</strong> es el conjunto de prácticas para proteger los datos y los sistemas que los usan. Al final del curso sabrás cómo piensa un atacante, cómo se defiende una organización y cómo se escribe software más seguro.</p>
<div class="analogia">
  <strong>Analogía: cuidar una casa</strong>
  Una casa segura no depende de una sola cerradura. Tiene puertas con llave, ventanas cerradas, vecinos atentos, una alarma y un plan por si algo sale mal. En seguridad de la información pasa igual: se combinan varias capas de protección.
</div>

<h2>Cómo está organizado el curso</h2>
<table>
  <thead><tr><th>Nivel</th><th>Para quién</th><th>Qué verás</th></tr></thead>
  <tbody>
    <tr><td>Básico</td><td>Personas sin conocimientos previos.</td><td>Conceptos, amenazas comunes, contraseñas, hábitos seguros, privacidad e incidentes.</td></tr>
    <tr><td>Intermedio</td><td>Quien ya domina lo básico.</td><td>Redes, control de acceso, OWASP Top 10, inyecciones, criptografía, riesgos y logs.</td></tr>
    <tr><td>Avanzado</td><td>Personal técnico y desarrolladores.</td><td>Desarrollo seguro, APIs, JWT, OAuth 2.0, Spring Security, secretos, DevSecOps y pruebas.</td></tr>
  </tbody>
</table>
<ul>
  <li>Cada módulo explica un tema con analogías y ejemplos.</li>
  <li>Cada módulo termina con un cuestionario de opción múltiple. Necesitas 70% para aprobar.</li>
  <li>Al terminar un nivel se desbloquea su examen.</li>
  <li>Al final hay una evaluación que reúne los tres niveles.</li>
</ul>

<div class="aviso legal">
  <strong>Regla de ética: léela con calma</strong>
  Aprender cómo funcionan los ataques sirve para defender mejor. Pero usar esas técnicas contra sistemas, redes o cuentas que no son tuyos, <strong>sin permiso por escrito</strong>, puede ser un delito. Las leyes cambian según el país, así que infórmate sobre las de tu región.
</div>

<h2>Reglas para practicar</h2>
<ol>
  <li>Practica solo en equipos y cuentas propias, o en laboratorios creados para aprender.</li>
  <li>Si encuentras un fallo en un sistema de otra persona, repórtalo y no lo explotes.</li>
  <li>No compartas datos reales de otras personas en tus pruebas. Usa datos inventados.</li>
  <li>No guardes contraseñas reales dentro de documentos de práctica.</li>
  <li>Si dudas si algo está permitido, asume que no lo está y pregunta.</li>
</ol>

<div class="analogia">
  <strong>Analogía: el cerrajero</strong>
  Un cerrajero sabe abrir cerraduras, igual que un ladrón. La diferencia es el permiso: el cerrajero trabaja a petición del dueño. En seguridad se llama <em>hacking ético</em> cuando existe autorización y <em>delito</em> cuando no.
</div>

<h2>Cómo estudiar mejor</h2>
<ol>
  <li><strong>Avanza en orden.</strong> Cada módulo se apoya en el anterior.</li>
  <li><strong>Relaciona con tu vida.</strong> Piensa qué cuentas, correos y aparatos usas.</li>
  <li><strong>Repite lo que no quedó claro.</strong> Releer no es perder tiempo.</li>
  <li><strong>Equivocarse en el cuestionario es normal.</strong> La explicación de cada respuesta es parte del aprendizaje.</li>
  <li><strong>Aplica un hábito nuevo por módulo.</strong> La seguridad se aprende haciéndola.</li>
</ol>

<h2>Qué necesitas</h2>
<p>Para el nivel básico solo necesitas un navegador. Puedes estudiar en tablet, celular o laptop. En los niveles intermedio y avanzado habrá prácticas en una laptop, y te indicaremos paso a paso qué instalar.</p>
<div class="nota">
  <strong>Tu avance se guarda en el navegador</strong>
  Si cambias de dispositivo, el progreso no se comparte, pero puedes repetir los cuestionarios sin problema.
</div>

<div class="ejemplo">
  <strong>Ejercicio para pensar (sin computadora)</strong>
  Haz una lista de las cinco cosas digitales que más te dolería perder: fotos, correo, banco, trabajo, redes sociales. Para cada una escribe: ¿cómo la protejo hoy? Al terminar el curso volverás a esta lista.
</div>
`,
  quiz: [
    {
      p: "¿Qué es la seguridad de la información?",
      o: ["Instalar un antivirus y nada más", "El conjunto de prácticas para proteger los datos y los sistemas que los usan", "Un tipo de lenguaje de programación", "Solo la seguridad de las redes"],
      c: 1,
      e: "Abarca personas, procesos y tecnología, no solo una herramienta."
    },
    {
      p: "En la analogía de la casa, ¿qué idea principal se quiere transmitir?",
      o: ["Una sola cerradura basta", "Se necesitan varias capas de protección", "Los vecinos no importan", "La alarma reemplaza todo lo demás"],
      c: 1,
      e: "La seguridad se construye con varias capas que se complementan."
    },
    {
      p: "¿Qué diferencia al hacking ético de un delito?",
      o: ["El lenguaje que se usa", "El permiso previo y por escrito del dueño del sistema", "La hora del día", "El tamaño de la empresa"],
      c: 1,
      e: "Las mismas técnicas pueden ser legales o ilegales según exista autorización."
    },
    {
      p: "Encuentras un fallo de seguridad en el sitio web de otra persona. ¿Qué haces?",
      o: ["Lo explotas para comprobar que es real", "Lo reportas sin explotarlo", "Lo publicas en redes", "Lo vendes"],
      c: 1,
      e: "Lo correcto es reportarlo de forma responsable."
    },
    {
      p: "¿Dónde conviene practicar técnicas de seguridad?",
      o: ["En el sitio de tu banco", "En equipos y laboratorios propios o autorizados", "En la red de una cafetería", "En cualquier página que encuentres"],
      c: 1,
      e: "Un laboratorio propio es seguro y legal."
    },
    {
      p: "¿Qué porcentaje necesitas para aprobar un cuestionario?",
      o: ["50%", "60%", "70%", "100%"],
      c: 2,
      e: "Con 70% o más el módulo se marca como terminado."
    },
    {
      p: "¿Qué datos conviene usar en tus pruebas de práctica?",
      o: ["Datos reales de otras personas", "Datos inventados", "Contraseñas reales de tu trabajo", "Cualquier dato que encuentres en internet"],
      c: 1,
      e: "Los datos inventados no ponen en riesgo a nadie."
    },
    {
      p: "¿Qué sucede cuando terminas todos los módulos de un nivel?",
      o: ["Se borra tu progreso", "Se desbloquea el examen de ese nivel", "Se cierra el curso", "Nada"],
      c: 1,
      e: "Cada nivel tiene su propio examen."
    }
  ]
};
