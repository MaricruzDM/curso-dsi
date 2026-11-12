CURSO.contenido.b04 = {
  html: `
<p>Las contraseñas siguen siendo la puerta principal de casi todas tus cuentas. En este módulo aprenderás a crearlas bien, a guardarlas sin sufrir y a reforzarlas con una segunda capa de protección.</p>

<h2>1. Autenticación: demostrar quién eres</h2>
<p>La <strong>autenticación</strong> es el proceso de comprobar que alguien es quien dice ser. Hay tres tipos de "factores":</p>
<table>
  <thead><tr><th>Factor</th><th>Es...</th><th>Ejemplos</th></tr></thead>
  <tbody>
    <tr><td>Algo que sabes</td><td>Un secreto en tu cabeza.</td><td>Contraseña, PIN.</td></tr>
    <tr><td>Algo que tienes</td><td>Un objeto que posees.</td><td>Celular, llave física, tarjeta.</td></tr>
    <tr><td>Algo que eres</td><td>Una característica tuya.</td><td>Huella, rostro.</td></tr>
  </tbody>
</table>
<div class="analogia">
  <strong>Analogía: la caja fuerte del banco</strong>
  Para abrir una caja de seguridad necesitas tu llave (algo que tienes) y que el empleado verifique tu identificación (algo que eres). Con dos pruebas distintas es mucho más difícil que alguien se haga pasar por ti.
</div>

<h2>2. Qué hace débil a una contraseña</h2>
<ul>
  <li>Es corta.</li>
  <li>Usa datos personales: nombre, fecha de nacimiento, mascota.</li>
  <li>Es común: <code>123456</code>, <code>password</code>, <code>qwerty</code>.</li>
  <li>Se repite en varios sitios.</li>
  <li>Cambia solo un número al final: <code>Casa2024</code>, <code>Casa2025</code>.</li>
</ul>

<h2>3. Qué hace fuerte a una contraseña</h2>
<p>La <strong>longitud</strong> importa más que la complejidad. Una frase larga es más difícil de adivinar que una palabra corta con símbolos raros.</p>
<table>
  <thead><tr><th>Contraseña</th><th>Valoración</th></tr></thead>
  <tbody>
    <tr><td><code>P@ssw0rd!</code></td><td>Débil: es corta y está en todas las listas.</td></tr>
    <tr><td><code>cafe-luna-bicicleta-nube</code></td><td>Fuerte: larga, fácil de recordar para ti.</td></tr>
  </tbody>
</table>
<div class="nota">
  <strong>Frase de contraseña</strong>
  Une 4 o más palabras al azar que no tengan relación entre sí. Es larga, fácil de recordar y difícil de adivinar. Evita citas famosas o frases de canciones.
</div>
<p>Las recomendaciones actuales de organismos como NIST también sugieren:</p>
<ul>
  <li>Dar prioridad a la longitud.</li>
  <li>No obligar a cambiarlas cada cierto tiempo sin motivo. Se cambian cuando hay sospecha de filtración.</li>
  <li>Compararlas contra listas de contraseñas ya filtradas.</li>
</ul>

<h2>4. Una contraseña distinta para cada sitio</h2>
<p>Cuando un sitio sufre una filtración, los atacantes prueban esa misma combinación en otros sitios. Si la repites, una filtración puede abrir toda tu vida digital.</p>
<div class="analogia">
  <strong>Analogía: una llave por puerta</strong>
  Usas llaves distintas para tu casa, tu coche y tu oficina. Si pierdes una, no pierdes todo.
</div>

<h2>5. Gestores de contraseñas</h2>
<p>Recordar decenas de contraseñas largas y distintas es imposible. Un <strong>gestor de contraseñas</strong> las guarda cifradas y solo necesitas recordar una contraseña maestra.</p>
<div class="analogia">
  <strong>Analogía: la caja fuerte personal</strong>
  Guardas todas tus llaves en una caja fuerte con una combinación que solo tú sabes. Memorizas una sola combinación y tienes acceso a todas las llaves.
</div>
<ul>
  <li>Genera contraseñas aleatorias y largas por ti.</li>
  <li>Las rellena automáticamente, y si el sitio es falso no las rellena (una ventaja contra phishing).</li>
  <li>Hay opciones gratuitas y de pago, integradas en navegadores o como aplicaciones aparte.</li>
  <li>Elige uno de una empresa reconocida y con buena reputación.</li>
  <li>La contraseña maestra debe ser una frase larga y única que no uses en ningún otro lado.</li>
</ul>
<div class="aviso">
  <strong>No guardes contraseñas en...</strong>
  Notas del celular sin protección, hojas pegadas en el monitor o archivos como <code>claves.txt</code>.
</div>

<h2>6. Verificación en dos pasos (MFA)</h2>
<p>La <strong>autenticación multifactor (MFA)</strong> pide dos o más factores distintos. Aunque alguien robe tu contraseña, todavía necesita el segundo factor.</p>
<table>
  <thead><tr><th>Método</th><th>Seguridad</th><th>Comentario</th></tr></thead>
  <tbody>
    <tr><td>Código por SMS</td><td>Básica</td><td>Mejor que nada, pero se puede interceptar o clonar el chip del celular.</td></tr>
    <tr><td>App de autenticación</td><td>Buena</td><td>Genera códigos que cambian cada pocos segundos.</td></tr>
    <tr><td>Notificación para aprobar</td><td>Buena</td><td>Cuidado con aceptar solicitudes que tú no hiciste.</td></tr>
    <tr><td>Llave física de seguridad</td><td>Muy alta</td><td>Resiste el phishing. Ideal para cuentas importantes.</td></tr>
    <tr><td>Passkeys</td><td>Muy alta</td><td>Reemplazan la contraseña con una llave guardada en tu dispositivo.</td></tr>
  </tbody>
</table>
<div class="aviso">
  <strong>Fatiga de MFA</strong>
  Algunos atacantes lanzan muchas solicitudes de aprobación seguidas, esperando que te canses y toques "Aceptar". Si te llega una solicitud que no pediste, recházala y cambia tu contraseña.
</div>

<h2>7. Cómo guardan las contraseñas los sitios (idea simple)</h2>
<p>Un sitio bien hecho <strong>no guarda tu contraseña</strong>. Guarda su <strong>hash</strong>: el resultado de pasarla por una función matemática de un solo sentido.</p>
<div class="analogia">
  <strong>Analogía: la licuadora</strong>
  Si pones una fruta en la licuadora, obtienes jugo. Con el jugo no puedes volver a armar la fruta. Pero si le das la misma fruta, siempre sale el mismo jugo. Así el sitio compara el "jugo" de lo que escribes con el "jugo" que tiene guardado.
</div>
<table>
  <thead><tr><th>Entrada</th><th>Hash (idea)</th></tr></thead>
  <tbody>
    <tr><td><code>hola</code></td><td><code>9d4e1e23...</code></td></tr>
    <tr><td><code>Hola</code></td><td><code>2f7a3b99...</code> (completamente distinto)</td></tr>
  </tbody>
</table>
<p>Si el sitio se filtra, los atacantes obtienen hashes, no contraseñas. Pero con contraseñas débiles pueden adivinar la entrada probando millones de palabras. Por eso las contraseñas largas importan.</p>

<h2>8. Recuperación de cuentas</h2>
<ul>
  <li>Configura un correo o teléfono de recuperación que sea tuyo y esté protegido con MFA.</li>
  <li>Guarda los <strong>códigos de respaldo</strong> en un lugar seguro, fuera del celular.</li>
  <li>No respondas "preguntas de seguridad" con respuestas reales (nombre de tu mascota). Usa respuestas inventadas guardadas en tu gestor.</li>
</ul>

<h2>9. Qué hacer si una contraseña se filtra</h2>
<ol>
  <li>Cambia esa contraseña inmediatamente.</li>
  <li>Si la usabas en otros sitios, cámbiala también ahí.</li>
  <li>Activa MFA.</li>
  <li>Revisa si hay actividad sospechosa.</li>
</ol>

<h2>10. Cuentas que debes proteger primero</h2>
<ol>
  <li>Tu correo principal (con él se recuperan las demás).</li>
  <li>Tu banco y servicios financieros.</li>
  <li>Tu gestor de contraseñas.</li>
  <li>Tu cuenta del celular (Apple o Google).</li>
  <li>Tus redes sociales.</li>
</ol>

<h2>11. Ejercicios</h2>
<ol>
  <li>Crea una frase de contraseña de cuatro palabras al azar (no la uses en ningún lado, solo practica).</li>
  <li>Revisa en tu correo y en tu banco si tienes activada la verificación en dos pasos. Si no, actívala.</li>
  <li>Lista tus 5 cuentas más importantes y anota cuáles repiten contraseña.</li>
</ol>
`,
  quiz: [
    {
      p: "¿Cuál es un ejemplo de 'algo que tienes' como factor de autenticación?",
      o: ["Una contraseña", "Tu celular o una llave física", "Tu huella", "Tu nombre"],
      c: 1,
      e: "Algo que tienes es un objeto que posees."
    },
    {
      p: "¿Qué importa más en una contraseña, según las recomendaciones actuales?",
      o: ["La longitud", "Que tenga muchos símbolos raros aunque sea corta", "Que sea una palabra del diccionario", "Que tenga tu fecha de nacimiento"],
      c: 0,
      e: "Una frase larga resiste mejor que una palabra corta con símbolos."
    },
    {
      p: "¿Por qué es mala idea repetir la misma contraseña en varios sitios?",
      o: ["Porque se gasta más memoria", "Porque si se filtra en un sitio, abre todos los demás", "Porque Windows lo prohíbe", "Porque no funciona en el celular"],
      c: 1,
      e: "Esa es la base del credential stuffing."
    },
    {
      p: "¿Para qué sirve un gestor de contraseñas?",
      o: ["Para guardar contraseñas únicas y largas cifradas, recordando solo la maestra", "Para publicar contraseñas", "Para acelerar el internet", "Para borrar virus"],
      c: 0,
      e: "Es una caja fuerte personal para tus llaves."
    },
    {
      p: "¿Cuál de estos métodos de MFA resiste mejor el phishing?",
      o: ["Código por SMS", "Llave física de seguridad", "Pregunta de seguridad", "Correo de confirmación"],
      c: 1,
      e: "Las llaves físicas y las passkeys están diseñadas para resistirlo."
    },
    {
      p: "Te llegan notificaciones para aprobar un inicio de sesión que tú no hiciste. ¿Qué haces?",
      o: ["Acepto para que dejen de llegar", "Rechazo y cambio mi contraseña", "Las ignoro siempre", "Apago el celular"],
      c: 1,
      e: "Puede ser un intento de fatiga de MFA."
    },
    {
      p: "Un sitio bien diseñado guarda de tu contraseña:",
      o: ["El texto original", "Su hash", "Una foto", "Nada ni compara"],
      c: 1,
      e: "El hash es de un solo sentido, como el jugo de la licuadora."
    },
    {
      p: "¿Cuál de estas es una buena contraseña?",
      o: ["123456", "NombreMascota2025", "cafe-luna-bicicleta-nube", "Contraseña1!"],
      c: 2,
      e: "Es larga, aleatoria y fácil de recordar para ti."
    },
    {
      p: "¿Qué cuenta conviene proteger primero porque sirve para recuperar las demás?",
      o: ["Un juego", "El correo electrónico principal", "Una tienda en línea", "Un foro"],
      c: 1,
      e: "Con el correo se restablecen contraseñas de casi todo."
    }
  ]
};
