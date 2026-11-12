CURSO.contenido.i06 = {
  html: `
<p>Es imposible eliminar todos los riesgos, y tampoco tendría sentido: protegerlo todo al máximo costaría más que lo que se protege. La gestión de riesgos ayuda a decidir <strong>qué proteger primero y cuánto invertir</strong>.</p>

<h2>1. ¿Qué es un riesgo?</h2>
<p>Un <strong>riesgo</strong> es la posibilidad de que una amenaza aproveche una vulnerabilidad y cause un daño a un activo.</p>
<div class="nota">
  <strong>Fórmula simple</strong>
  Riesgo = Probabilidad × Impacto
</div>
<div class="analogia">
  <strong>Analogía: el pronóstico del clima</strong>
  Una lluvia ligera con 90% de probabilidad molesta poco. Un huracán con 5% de probabilidad merece prepararse porque su impacto es enorme. Hay que mirar ambas cosas.
</div>

<h2>2. Cómo se evalúa un riesgo</h2>
<h3>Matriz de riesgos</h3>
<p>Se califican la probabilidad y el impacto, por ejemplo del 1 al 3 (bajo, medio, alto), y se multiplican.</p>
<table>
  <thead><tr><th>Probabilidad \\ Impacto</th><th>Bajo (1)</th><th>Medio (2)</th><th>Alto (3)</th></tr></thead>
  <tbody>
    <tr><td>Alta (3)</td><td>3 Medio</td><td>6 Alto</td><td>9 Crítico</td></tr>
    <tr><td>Media (2)</td><td>2 Bajo</td><td>4 Medio</td><td>6 Alto</td></tr>
    <tr><td>Baja (1)</td><td>1 Bajo</td><td>2 Bajo</td><td>3 Medio</td></tr>
  </tbody>
</table>

<div class="ejemplo">
  <strong>Ejemplo: registro de riesgos</strong>
  <table>
    <thead><tr><th>Riesgo</th><th>Prob.</th><th>Impacto</th><th>Nivel</th><th>Tratamiento</th></tr></thead>
    <tbody>
      <tr><td>Robo de cuenta de administrador por contraseña débil</td><td>3</td><td>3</td><td>9</td><td>Mitigar: MFA y contraseñas fuertes</td></tr>
      <tr><td>Pérdida de datos por falla de disco</td><td>2</td><td>3</td><td>6</td><td>Mitigar: copias de seguridad</td></tr>
      <tr><td>Daño al servidor por incendio</td><td>1</td><td>3</td><td>3</td><td>Transferir: seguro y copia externa</td></tr>
      <tr><td>Página de promoción desfigurada</td><td>2</td><td>1</td><td>2</td><td>Aceptar y monitorear</td></tr>
    </tbody>
  </table>
</div>

<h2>3. Cómo se trata un riesgo</h2>
<table>
  <thead><tr><th>Opción</th><th>Qué significa</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td>Mitigar</td><td>Reducirlo con controles.</td><td>Activar MFA.</td></tr>
    <tr><td>Evitar</td><td>Eliminar la actividad que lo causa.</td><td>Dejar de guardar datos de tarjeta.</td></tr>
    <tr><td>Transferir</td><td>Pasar parte del riesgo a un tercero.</td><td>Un seguro o un proveedor especializado.</td></tr>
    <tr><td>Aceptar</td><td>Decidir conscientemente convivir con él.</td><td>Riesgo bajo cuyo control cuesta más que el daño.</td></tr>
  </tbody>
</table>
<div class="aviso">
  <strong>Aceptar no es ignorar</strong>
  Aceptar un riesgo es una decisión documentada y revisada por quien tiene autoridad para hacerlo. Ignorarlo por no haberlo visto es otra cosa.
</div>

<h2>4. Vulnerabilidades: identificarlas y nombrarlas</h2>
<p>Para hablar de fallos de forma común existen estándares públicos:</p>
<table>
  <thead><tr><th>Sigla</th><th>Qué es</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td>CVE</td><td>Identificador único de una vulnerabilidad pública.</td><td>CVE-AAAA-NNNN (año y número)</td></tr>
    <tr><td>CWE</td><td>Catálogo de tipos de debilidades de software.</td><td>CWE-89: inyección SQL</td></tr>
    <tr><td>CVSS</td><td>Puntaje de gravedad de 0 a 10.</td><td>9.8: crítica</td></tr>
  </tbody>
</table>
<h3>Escala CVSS</h3>
<table>
  <thead><tr><th>Puntaje</th><th>Gravedad</th></tr></thead>
  <tbody>
    <tr><td>0.0</td><td>Ninguna</td></tr>
    <tr><td>0.1 a 3.9</td><td>Baja</td></tr>
    <tr><td>4.0 a 6.9</td><td>Media</td></tr>
    <tr><td>7.0 a 8.9</td><td>Alta</td></tr>
    <tr><td>9.0 a 10.0</td><td>Crítica</td></tr>
  </tbody>
</table>
<div class="aviso">
  <strong>CVSS no es riesgo</strong>
  El puntaje mide la gravedad técnica del fallo en general, no cuánto riesgo supone para <em>tu</em> organización. Un fallo crítico en un sistema aislado y sin datos puede importar menos que uno medio en tu sistema expuesto a internet con datos de clientes.
</div>

<h2>5. Ciclo de gestión de vulnerabilidades</h2>
<ol>
  <li><strong>Descubrir:</strong> saber qué activos tienes y escanearlos.</li>
  <li><strong>Priorizar:</strong> decidir cuáles se atienden primero.</li>
  <li><strong>Corregir (remediar):</strong> actualizar, configurar o cambiar el diseño.</li>
  <li><strong>Verificar:</strong> comprobar que el fallo realmente desapareció.</li>
  <li><strong>Repetir:</strong> es un proceso continuo.</li>
</ol>
<div class="analogia">
  <strong>Analogía: el mantenimiento de un coche</strong>
  Revisas el vehículo con regularidad, arreglas primero lo que afecta frenos y dirección, y confirmas que la reparación quedó bien. No esperas a que falle en carretera.
</div>

<h3>Qué considerar al priorizar</h3>
<ul>
  <li>La gravedad (CVSS).</li>
  <li>Si el fallo se está explotando activamente en el mundo.</li>
  <li>Si el activo está expuesto a internet.</li>
  <li>El valor de los datos que protege el sistema.</li>
  <li>Si existe ya una corrección disponible.</li>
</ul>

<h2>6. Escaneo de vulnerabilidades y pruebas de penetración</h2>
<table>
  <thead><tr><th></th><th>Escaneo de vulnerabilidades</th><th>Prueba de penetración (pentest)</th></tr></thead>
  <tbody>
    <tr><td>Cómo es</td><td>Automático, amplio y frecuente.</td><td>Manual, profundo y puntual.</td></tr>
    <tr><td>Qué hace</td><td>Busca fallos conocidos.</td><td>Intenta explotar fallos como lo haría un atacante.</td></tr>
    <tr><td>Resultado</td><td>Lista de hallazgos.</td><td>Informe con cadenas de ataque demostradas.</td></tr>
    <tr><td>Analogía</td><td>Revisión médica de rutina.</td><td>Estudio especializado de un caso.</td></tr>
  </tbody>
</table>
<div class="aviso legal">
  <strong>Siempre con autorización</strong>
  Un escaneo o pentest solo se hace con permiso por escrito que indique qué sistemas, qué fechas y qué técnicas están permitidas. Escanear sin permiso puede ser un delito y puede dañar servicios.
</div>

<h2>7. Hardening: endurecer sistemas</h2>
<p><strong>Hardening</strong> es reducir la superficie de ataque: dejar el sistema con solo lo necesario y bien configurado.</p>
<div class="analogia">
  <strong>Analogía: tapiar ventanas innecesarias</strong>
  Una casa con muchas ventanas y puertas tiene más puntos por donde entrar. Quitas las que no usas y refuerzas las que quedan.
</div>
<table>
  <thead><tr><th>Área</th><th>Prácticas</th></tr></thead>
  <tbody>
    <tr><td>Sistema operativo</td><td>Actualizar, quitar programas y servicios que no se usan, cerrar puertos innecesarios.</td></tr>
    <tr><td>Cuentas</td><td>Cambiar contraseñas por defecto, mínimo privilegio, deshabilitar cuentas sin uso.</td></tr>
    <tr><td>Red</td><td>Firewall con denegar por defecto, segmentación.</td></tr>
    <tr><td>Aplicaciones</td><td>Cabeceras de seguridad, ocultar versiones, desactivar modos de depuración.</td></tr>
    <tr><td>Bases de datos</td><td>No exponerlas a internet, usuarios con permisos limitados, cifrado.</td></tr>
    <tr><td>Respaldo y registros</td><td>Copias probadas y registros activados.</td></tr>
  </tbody>
</table>
<p>Existen guías de referencia, como los benchmarks del CIS (Center for Internet Security), que listan configuraciones recomendadas por sistema.</p>

<h2>8. Marcos de referencia</h2>
<p>Las organizaciones suelen apoyarse en marcos reconocidos para estructurar la gestión de riesgos y seguridad:</p>
<ul>
  <li><strong>ISO/IEC 27001:</strong> estándar para un sistema de gestión de seguridad de la información.</li>
  <li><strong>NIST Cybersecurity Framework:</strong> organiza la seguridad en funciones como identificar, proteger, detectar, responder y recuperar.</li>
  <li><strong>CIS Controls:</strong> lista priorizada de controles prácticos.</li>
  <li><strong>PCI DSS:</strong> requisitos para quien maneja datos de tarjetas.</li>
</ul>
<p>Qué normas te aplican depende de tu país, sector y tipo de datos. Consulta con el área legal o de cumplimiento de tu organización.</p>

<h2>9. Ejercicios</h2>
<ol>
  <li>Elige un sistema que conozcas (una tienda, una app escolar) y escribe cuatro riesgos. Califica su probabilidad e impacto y calcula el nivel.</li>
  <li>Para cada riesgo escribe si lo mitigarías, evitarías, transferirías o aceptarías, y por qué.</li>
  <li>Explica por qué un puntaje CVSS de 9.8 no siempre es la prioridad número uno.</li>
  <li>Haz una lista de 5 medidas de hardening para tu propia laptop.</li>
</ol>
`,
  quiz: [
    {
      p: "¿Cómo se calcula de forma simple el riesgo?",
      o: ["Probabilidad × Impacto", "Costo + Tiempo", "Amenazas − Controles", "Activos ÷ Usuarios"],
      c: 0,
      e: "Hay que mirar qué tan probable es y qué tan grave sería."
    },
    {
      p: "Decides dejar de guardar datos de tarjetas para eliminar el riesgo de filtrarlos. ¿Qué opción de tratamiento es?",
      o: ["Aceptar", "Evitar", "Transferir", "Ignorar"],
      c: 1,
      e: "Se elimina la actividad que genera el riesgo."
    },
    {
      p: "Contratas un seguro contra ciberincidentes. ¿Qué opción de tratamiento es?",
      o: ["Mitigar", "Evitar", "Transferir", "Aceptar"],
      c: 2,
      e: "Se traslada parte del impacto económico a un tercero."
    },
    {
      p: "¿Qué es un CVE?",
      o: ["Un identificador único de una vulnerabilidad pública", "Un antivirus", "Un tipo de firewall", "Una contraseña"],
      c: 0,
      e: "Permite que todos hablen del mismo fallo."
    },
    {
      p: "Un fallo tiene un puntaje CVSS de 9.5. ¿Cómo se clasifica?",
      o: ["Baja", "Media", "Alta", "Crítica"],
      c: 3,
      e: "De 9.0 a 10.0 es crítica."
    },
    {
      p: "¿Por qué CVSS no equivale al riesgo de tu organización?",
      o: ["Porque mide la gravedad técnica general, no tu exposición ni el valor de tus datos", "Porque siempre está mal", "Porque solo existe para Windows", "Porque no se puede consultar"],
      c: 0,
      e: "Hay que considerar el contexto de tu sistema."
    },
    {
      p: "¿Cuál es el orden correcto del ciclo de gestión de vulnerabilidades?",
      o: ["Descubrir, priorizar, corregir, verificar", "Corregir, descubrir, verificar, priorizar", "Verificar, descubrir, corregir", "Priorizar, verificar, descubrir"],
      c: 0,
      e: "Y luego se repite de forma continua."
    },
    {
      p: "¿Qué diferencia a una prueba de penetración de un escaneo de vulnerabilidades?",
      o: ["El pentest es manual y busca explotar fallos; el escaneo es automático y amplio", "No hay diferencia", "El escaneo siempre es ilegal", "El pentest no necesita permiso"],
      c: 0,
      e: "Ambos requieren autorización escrita."
    },
    {
      p: "¿Qué busca el hardening?",
      o: ["Reducir la superficie de ataque dejando solo lo necesario y bien configurado", "Aumentar la velocidad", "Instalar más programas", "Eliminar las contraseñas"],
      c: 0,
      e: "Es como tapiar las ventanas que no se usan."
    },
    {
      p: "¿Qué significa aceptar un riesgo correctamente?",
      o: ["Ignorarlo", "Decidirlo de forma consciente, documentada y por quien tiene autoridad", "Esperar a que no pase", "Culpar a otro"],
      c: 1,
      e: "Es una decisión informada, no un descuido."
    }
  ]
};
