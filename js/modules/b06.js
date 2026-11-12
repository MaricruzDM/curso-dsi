CURSO.contenido.b06 = {
  html: `
<p>Los datos son el tesoro de casi todos los ataques. En este módulo aprenderás qué datos requieren más cuidado, cómo se clasifican y cómo el cifrado los protege, explicado sin matemáticas.</p>

<h2>1. Datos personales</h2>
<p>Un <strong>dato personal</strong> es cualquier información que identifica o puede identificar a una persona.</p>
<table>
  <thead><tr><th>Categoría</th><th>Ejemplos</th></tr></thead>
  <tbody>
    <tr><td>Identificación</td><td>Nombre, dirección, teléfono, correo, número de documento.</td></tr>
    <tr><td>Financieros</td><td>Número de tarjeta, cuenta bancaria, ingresos.</td></tr>
    <tr><td>Digitales</td><td>Dirección IP, cookies, historial de navegación, ubicación.</td></tr>
    <tr><td>Laborales y académicos</td><td>Puesto, salario, calificaciones.</td></tr>
  </tbody>
</table>

<h3>Datos sensibles</h3>
<p>Son datos cuyo mal uso puede causar discriminación o daños graves. Requieren más protección.</p>
<ul>
  <li>Salud e historial médico.</li>
  <li>Origen étnico o racial.</li>
  <li>Creencias religiosas o políticas.</li>
  <li>Orientación sexual.</li>
  <li>Datos biométricos (huella, rostro).</li>
</ul>

<h2>2. ¿Por qué se protegen los datos personales?</h2>
<ul>
  <li>Evitan robo de identidad y fraudes.</li>
  <li>Protegen la privacidad y la dignidad de las personas.</li>
  <li>Las organizaciones que los manejan tienen obligaciones legales y pueden recibir multas si los filtran.</li>
</ul>
<div class="nota">
  <strong>Privacidad y seguridad no son lo mismo</strong>
  La <strong>seguridad</strong> protege los datos de accesos no autorizados. La <strong>privacidad</strong> decide quién puede usarlos y para qué. Puedes tener seguridad sin privacidad: una empresa puede guardar tus datos muy seguros y aun así venderlos sin tu permiso.
</div>

<h2>3. Clasificación de la información</h2>
<p>No toda la información merece el mismo nivel de protección. Clasificarla ayuda a decidir qué controles aplicar.</p>
<table>
  <thead><tr><th>Nivel</th><th>Descripción</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td>Público</td><td>Puede compartirse con cualquiera.</td><td>Folletos, anuncios, página web.</td></tr>
    <tr><td>Interno</td><td>Solo para el personal de la organización.</td><td>Directorio interno, comunicados.</td></tr>
    <tr><td>Confidencial</td><td>Su filtración causaría daño.</td><td>Contratos, datos de clientes.</td></tr>
    <tr><td>Restringido</td><td>Acceso muy limitado, daño grave si se filtra.</td><td>Contraseñas de sistemas, datos de salud, claves.</td></tr>
  </tbody>
</table>
<p>Los nombres de los niveles varían entre organizaciones, pero la idea es la misma.</p>
<div class="analogia">
  <strong>Analogía: los cuartos de la casa</strong>
  La sala está abierta a las visitas (público), la cocina es para la familia (interno), el cajón de documentos está bajo llave (confidencial) y la caja fuerte con joyas y escrituras guarda lo más valioso (restringido).
</div>

<h2>4. Principios al manejar datos</h2>
<ol>
  <li><strong>Minimización:</strong> pide y guarda solo los datos que realmente necesitas.</li>
  <li><strong>Finalidad:</strong> úsalos solo para lo que dijiste que ibas a usarlos.</li>
  <li><strong>Mínimo tiempo:</strong> bórralos cuando ya no hagan falta.</li>
  <li><strong>Acceso limitado:</strong> solo quien lo necesite para trabajar.</li>
  <li><strong>Transparencia:</strong> informa a las personas cómo usarás sus datos.</li>
</ol>
<p>Muchas leyes de protección de datos personales (por ejemplo, el RGPD en la Unión Europea o las leyes nacionales de cada país) se basan en estas ideas, e incluyen derechos como acceder, corregir y eliminar tus datos. Revisa la que aplica en tu país.</p>
<div class="aviso">
  <strong>Este curso no es asesoría legal</strong>
  Las leyes cambian y dependen de cada país y sector. Para decisiones legales consulta a un especialista.
</div>

<h2>5. Cifrado: la idea básica</h2>
<p>El <strong>cifrado</strong> transforma información legible en un código ilegible. Solo quien tiene la <strong>clave</strong> puede volver a leerla.</p>
<div class="analogia">
  <strong>Analogía: la caja con candado</strong>
  Metes un mensaje en una caja y la cierras con candado. Aunque alguien robe la caja, no puede leer el mensaje sin la llave.
</div>
<table>
  <thead><tr><th>Término</th><th>Significado</th></tr></thead>
  <tbody>
    <tr><td>Texto claro</td><td>La información original, legible.</td></tr>
    <tr><td>Texto cifrado</td><td>El resultado ilegible después de cifrar.</td></tr>
    <tr><td>Clave</td><td>El secreto que permite cifrar y descifrar.</td></tr>
    <tr><td>Algoritmo</td><td>El método matemático que se usa.</td></tr>
  </tbody>
</table>

<div class="ejemplo">
  <strong>Ejemplo clásico: el cifrado César (solo para entender la idea)</strong>
  Se desplaza cada letra tres posiciones en el abecedario. HOLA se convierte en KROD. La "clave" es el número 3. Este método es muy fácil de romper y hoy no se usa para proteger nada real, pero muestra el concepto de algoritmo y clave.
</div>
<div class="aviso">
  <strong>Regla de oro</strong>
  Nunca inventes tu propio algoritmo de cifrado. Usa siempre estándares probados y revisados por la comunidad.
</div>

<h2>6. Dos tipos de cifrado</h2>
<h3>Cifrado simétrico: una sola clave</h3>
<p>La misma clave cifra y descifra.</p>
<div class="analogia">
  <strong>Analogía: la llave de casa</strong>
  La misma llave cierra y abre la puerta. Es rápido, pero hay que entregar la llave a quien deba abrir, y ese envío es el punto delicado.
</div>

<h3>Cifrado asimétrico: dos claves</h3>
<p>Hay una pareja de claves: una <strong>pública</strong> y una <strong>privada</strong>. Lo que cifras con una solo se abre con la otra.</p>
<div class="analogia">
  <strong>Analogía: el buzón</strong>
  Cualquiera puede meter una carta por la ranura del buzón (clave pública), pero solo el dueño tiene la llave para abrirlo y leerlas (clave privada).
</div>
<table>
  <thead><tr><th>Tipo</th><th>Claves</th><th>Velocidad</th><th>Uso típico</th></tr></thead>
  <tbody>
    <tr><td>Simétrico</td><td>Una compartida</td><td>Muy rápido</td><td>Cifrar archivos y grandes cantidades de datos.</td></tr>
    <tr><td>Asimétrico</td><td>Pública y privada</td><td>Más lento</td><td>Intercambiar claves, firmas digitales, certificados.</td></tr>
  </tbody>
</table>
<p>HTTPS usa ambos: el asimétrico para ponerse de acuerdo en una clave, y el simétrico para cifrar el resto de la conversación.</p>

<h2>7. Hash e integridad</h2>
<p>Un <strong>hash</strong> es una "huella digital" de un dato: un valor de longitud fija que cambia por completo si cambias una sola letra. No se puede revertir.</p>
<ul>
  <li>Sirve para comprobar que un archivo no fue alterado.</li>
  <li>Sirve para guardar contraseñas sin guardarlas en claro.</li>
</ul>
<div class="nota">
  <strong>Cifrar y hashear no es lo mismo</strong>
  Lo cifrado se puede volver a leer con la clave. Un hash no se puede revertir.
</div>

<h2>8. Datos en reposo, en tránsito y en uso</h2>
<table>
  <thead><tr><th>Estado</th><th>Dónde está</th><th>Cómo se protege</th></tr></thead>
  <tbody>
    <tr><td>En reposo</td><td>Guardado en un disco, base de datos o nube.</td><td>Cifrado de disco o de archivos.</td></tr>
    <tr><td>En tránsito</td><td>Viajando por la red.</td><td>HTTPS, VPN.</td></tr>
    <tr><td>En uso</td><td>En la memoria mientras un programa lo procesa.</td><td>Control de acceso y buen diseño del programa.</td></tr>
  </tbody>
</table>

<h2>9. Cifrar un archivo en tu propia computadora</h2>
<p>Existen herramientas de uso común para proteger un archivo con contraseña, como los archivos comprimidos con cifrado (formato 7z con AES-256) o las opciones de protección de documentos de las suites de oficina. Para proteger todo el equipo, usa el cifrado de disco que viste en el módulo anterior.</p>
<div class="aviso">
  <strong>Si pierdes la clave, pierdes los datos</strong>
  El cifrado bien hecho no tiene puerta trasera. Guarda tu contraseña o clave de recuperación en un lugar seguro.
</div>

<h2>10. Ejercicios</h2>
<ol>
  <li>Haz una lista de 5 datos tuyos y clasifícalos como públicos, internos, confidenciales o restringidos.</li>
  <li>Descifra el mensaje con el cifrado César de clave 3: <code>FXUVR</code>. (Pista: mueve cada letra tres posiciones hacia atrás.)</li>
  <li>Piensa en una aplicación que usas: ¿qué datos tuyos guarda? ¿Realmente los necesita todos?</li>
</ol>
`,
  quiz: [
    {
      p: "¿Cuál de estos es un dato sensible?",
      o: ["El nombre de una ciudad", "El historial médico", "El color favorito de un producto", "El nombre de una calle pública"],
      c: 1,
      e: "Los datos de salud requieren protección reforzada."
    },
    {
      p: "¿Cuál es la diferencia entre seguridad y privacidad?",
      o: ["Ninguna", "La seguridad protege de accesos no autorizados; la privacidad decide quién usa los datos y para qué", "La privacidad es solo técnica", "La seguridad solo es legal"],
      c: 1,
      e: "Una empresa puede proteger bien los datos y aun así usarlos sin permiso."
    },
    {
      p: "¿Qué significa el principio de minimización de datos?",
      o: ["Guardar todo por si acaso", "Pedir y guardar solo los datos estrictamente necesarios", "Comprimir los datos", "Hacer copias de todo"],
      c: 1,
      e: "Menos datos guardados significa menos datos que pueden filtrarse."
    },
    {
      p: "En una clasificación de información, ¿dónde estaría la lista de contraseñas de los sistemas?",
      o: ["Público", "Interno", "Restringido", "No se clasifica"],
      c: 2,
      e: "Una filtración causaría un daño grave."
    },
    {
      p: "¿Qué necesita una persona para leer un mensaje cifrado?",
      o: ["Solo el texto cifrado", "La clave adecuada", "Un antivirus", "Internet"],
      c: 1,
      e: "Sin clave, el texto cifrado es ilegible."
    },
    {
      p: "En el cifrado asimétrico, ¿cuántas claves hay?",
      o: ["Una sola", "Dos: pública y privada", "Tres", "Ninguna"],
      c: 1,
      e: "Es como un buzón con ranura pública y llave privada."
    },
    {
      p: "¿Para qué sirve un hash?",
      o: ["Para cifrar y luego descifrar", "Para obtener una huella de un dato y comprobar que no fue alterado", "Para acelerar un archivo", "Para borrar datos"],
      c: 1,
      e: "No se puede revertir, a diferencia del cifrado."
    },
    {
      p: "¿Qué protege a los datos mientras viajan por la red?",
      o: ["Cifrado de disco", "HTTPS o una VPN", "Un fondo de pantalla", "Una impresora"],
      c: 1,
      e: "Eso protege los datos en tránsito."
    },
    {
      p: "¿Qué debes hacer si quieres un algoritmo de cifrado para un sistema real?",
      o: ["Inventar uno propio", "Usar estándares probados y revisados", "Usar el cifrado César", "No cifrar"],
      c: 1,
      e: "Los algoritmos propios casi siempre tienen fallos."
    }
  ]
};
