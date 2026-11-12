CURSO.contenido.i07 = {
  html: `
<p>Si algo sale mal, los registros (logs) son la única forma de saber qué pasó, quién lo hizo y cuándo. Sin ellos, un ataque puede durar meses sin que nadie lo note. Por eso los <strong>fallos de registro y alertas</strong> están en el OWASP Top 10 (A09).</p>

<h2>1. ¿Qué es un log?</h2>
<p>Un <strong>log</strong> es un registro cronológico de eventos que ocurren en un sistema o aplicación.</p>
<div class="analogia">
  <strong>Analogía: la bitácora de un barco y las cámaras de una tienda</strong>
  Cuando ocurre un incidente, la bitácora y las cámaras permiten reconstruir los hechos. Sin ellas, solo quedan suposiciones.
</div>
<p>Los logs sirven para:</p>
<ul>
  <li><strong>Detectar</strong> ataques y comportamientos raros.</li>
  <li><strong>Investigar</strong> qué ocurrió después de un incidente.</li>
  <li><strong>Auditar</strong> quién hizo qué.</li>
  <li><strong>Diagnosticar</strong> errores técnicos.</li>
  <li><strong>Cumplir</strong> requisitos de normas y leyes.</li>
</ul>

<h2>2. Qué registrar</h2>
<p>Un buen evento responde a cinco preguntas:</p>
<table>
  <thead><tr><th>Pregunta</th><th>Dato</th></tr></thead>
  <tbody>
    <tr><td>¿Cuándo?</td><td>Fecha y hora con zona horaria.</td></tr>
    <tr><td>¿Quién?</td><td>Usuario o identificador de cuenta.</td></tr>
    <tr><td>¿Qué?</td><td>La acción realizada.</td></tr>
    <tr><td>¿Dónde?</td><td>Sistema, módulo y dirección IP de origen.</td></tr>
    <tr><td>¿Resultado?</td><td>Éxito o fallo.</td></tr>
  </tbody>
</table>

<h3>Eventos de seguridad que conviene registrar</h3>
<ul>
  <li>Inicios de sesión exitosos y fallidos.</li>
  <li>Cierres de sesión y bloqueos de cuenta.</li>
  <li>Cambios de contraseña y de permisos.</li>
  <li>Acceso denegado a recursos.</li>
  <li>Acciones de administradores.</li>
  <li>Acceso y modificación de datos sensibles.</li>
  <li>Errores de validación repetidos (posibles intentos de ataque).</li>
  <li>Cambios de configuración.</li>
</ul>

<h2>3. Qué NO registrar</h2>
<div class="aviso">
  <strong>Los logs no son un lugar seguro para secretos</strong>
  Mucha gente los puede leer, se copian a otros sistemas y duran meses. Un log con contraseñas es una filtración esperando a ocurrir.
</div>
<table>
  <thead><tr><th>No guardar en logs</th><th>Qué hacer en su lugar</th></tr></thead>
  <tbody>
    <tr><td>Contraseñas</td><td>Nunca registrarlas, ni siquiera las erróneas.</td></tr>
    <tr><td>Tokens de sesión, claves de API, secretos</td><td>Registrar solo un identificador parcial o un hash.</td></tr>
    <tr><td>Números completos de tarjeta</td><td>Enmascarar: **** **** **** 1234.</td></tr>
    <tr><td>Datos personales o sensibles</td><td>Minimizar o anonimizar.</td></tr>
    <tr><td>Cuerpos completos de peticiones</td><td>Registrar solo lo necesario.</td></tr>
  </tbody>
</table>

<h3>Ejemplo en Java con SLF4J</h3>
<pre><code>import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

private static final Logger log = LoggerFactory.getLogger(AuthService.class);

// MAL: registra la contraseña
log.info("Intento de login usuario=" + usuario + " clave=" + clave);

// BIEN: parámetros, sin datos secretos
log.warn("Login fallido usuario={} ip={}", usuario, ip);
log.info("Login correcto usuario={} ip={}", usuario, ip);</code></pre>
<p>Usar <code>{}</code> como marcador es más eficiente y más limpio que concatenar texto.</p>

<h2>4. Inyección en logs (log injection)</h2>
<p>Si registras texto del usuario tal cual, un atacante puede incluir saltos de línea para <strong>falsificar entradas</strong>.</p>
<div class="ejemplo">
  <strong>Ejemplo</strong>
  Si el usuario escribe como nombre <code>ana</code> seguido de un salto de línea y un texto falso como "Login correcto usuario=admin", el archivo mostrará dos líneas y la segunda parecerá real.
</div>
<p><strong>Defensa:</strong> eliminar o codificar saltos de línea en datos externos antes de registrarlos, y usar formatos estructurados como JSON, donde cada valor queda entre comillas.</p>

<h2>5. Niveles de registro</h2>
<table>
  <thead><tr><th>Nivel</th><th>Uso</th></tr></thead>
  <tbody>
    <tr><td>ERROR</td><td>Algo falló y requiere atención.</td></tr>
    <tr><td>WARN</td><td>Situación anormal que no es un fallo, como un login fallido.</td></tr>
    <tr><td>INFO</td><td>Eventos normales relevantes.</td></tr>
    <tr><td>DEBUG</td><td>Detalle para desarrollo. Evítalo en producción con datos sensibles.</td></tr>
  </tbody>
</table>

<h2>6. Proteger los propios logs</h2>
<ul>
  <li><strong>Integridad:</strong> que nadie pueda alterarlos ni borrarlos. Un atacante intentará borrar sus huellas.</li>
  <li><strong>Acceso limitado:</strong> solo personal autorizado los lee.</li>
  <li><strong>Copia centralizada:</strong> enviarlos a otro sistema, para que sobrevivan si el servidor original se compromete.</li>
  <li><strong>Retención:</strong> guardarlos el tiempo que exijan las necesidades y las normas, y luego eliminarlos.</li>
  <li><strong>Hora sincronizada:</strong> todos los sistemas con la misma fuente de hora (NTP). Si los relojes difieren, no se puede reconstruir la historia.</li>
</ul>

<h2>7. Monitoreo y alertas</h2>
<p>Registrar no basta: alguien o algo debe <strong>mirar</strong>. Un SIEM (gestión de eventos e información de seguridad) reúne logs de muchos sistemas, los correlaciona y genera alertas.</p>
<div class="analogia">
  <strong>Analogía: la sala de monitoreo</strong>
  Tener cien cámaras sin nadie mirando no sirve. La sala de monitoreo centraliza las imágenes y suena una alarma cuando algo raro ocurre.
</div>

<h3>Ejemplos de alertas útiles</h3>
<ul>
  <li>Muchos inicios de sesión fallidos de una misma cuenta o IP en poco tiempo.</li>
  <li>Inicio de sesión exitoso justo después de muchos fallos.</li>
  <li>Acceso desde un país o dispositivo inusual.</li>
  <li>Cuenta de administrador creada o modificada.</li>
  <li>Un usuario que descarga una cantidad de datos fuera de lo normal.</li>
  <li>Registros de seguridad borrados o desactivados.</li>
</ul>
<div class="nota">
  <strong>Cuidado con el exceso de alertas</strong>
  Si todo genera alerta, el equipo deja de hacer caso (fatiga de alertas). Es mejor pocas alertas bien ajustadas y accionables.
</div>

<h2>8. Práctica: el Visor de eventos de Windows</h2>
<p>Windows registra eventos de seguridad. Puedes ver los de tu propio equipo:</p>
<ol>
  <li>Presiona la tecla Windows y escribe <strong>Visor de eventos</strong>.</li>
  <li>En el panel izquierdo abre <strong>Registros de Windows</strong> y luego <strong>Seguridad</strong>.</li>
  <li>Observa las entradas. En la parte inferior verás el detalle de cada una.</li>
  <li>Usa <strong>Filtrar registro actual</strong> a la derecha y escribe un ID de evento.</li>
</ol>
<table>
  <thead><tr><th>ID de evento</th><th>Significa</th></tr></thead>
  <tbody>
    <tr><td>4624</td><td>Inicio de sesión correcto.</td></tr>
    <tr><td>4625</td><td>Inicio de sesión fallido.</td></tr>
    <tr><td>4634</td><td>Cierre de sesión.</td></tr>
    <tr><td>4720</td><td>Se creó una cuenta de usuario.</td></tr>
  </tbody>
</table>
<div class="nota">
  <strong>Si no ves eventos de seguridad</strong>
  Dependiendo de la edición de Windows y de su configuración, la auditoría puede estar limitada o no tener ciertos eventos. Para el curso basta con que explores cómo se ven.
</div>

<h2>9. Ejercicio de análisis de un log</h2>
<p>Lee este registro inventado de una aplicación web:</p>
<pre><code>2026-03-10 09:14:02 WARN  login fallido usuario=carlos ip=203.0.113.50
2026-03-10 09:14:04 WARN  login fallido usuario=carlos ip=203.0.113.50
2026-03-10 09:14:05 WARN  login fallido usuario=carlos ip=203.0.113.50
2026-03-10 09:14:07 WARN  login fallido usuario=carlos ip=203.0.113.50
2026-03-10 09:14:08 WARN  login fallido usuario=carlos ip=203.0.113.50
2026-03-10 09:14:10 INFO  login correcto usuario=carlos ip=203.0.113.50
2026-03-10 09:14:41 INFO  cambio de correo usuario=carlos nuevo=zeta@ejemplo.net
2026-03-10 09:15:03 INFO  descarga masiva usuario=carlos registros=9800</code></pre>
<p>Responde:</p>
<ol>
  <li>¿Qué patrón sospechoso ves en las primeras cinco líneas?</li>
  <li>¿Qué indica el login correcto justo después?</li>
  <li>¿Por qué el cambio de correo y la descarga masiva son señales graves?</li>
  <li>¿Qué alerta habría detectado esto a tiempo?</li>
  <li>¿Qué harías primero como respuesta?</li>
</ol>
<div class="ejemplo">
  <strong>Respuesta guía</strong>
  Se ve un posible ataque de fuerza bruta (cinco fallos seguidos desde una misma IP) que terminó acertando. Después, el atacante cambió el correo para quedarse con la cuenta y descargó datos. Una alerta por varios fallos seguidos, o por login correcto tras fallos, lo habría detectado. La respuesta inicial es contener: bloquear la sesión y la IP, restablecer la cuenta, y revisar qué datos se descargaron.
</div>

<h2>10. Ejercicios</h2>
<ol>
  <li>Escribe cinco eventos de seguridad que registrarías en una tienda en línea.</li>
  <li>Corrige esta línea de código: <code>log.info("Token del usuario: " + token);</code></li>
  <li>Explica por qué es importante sincronizar la hora entre sistemas.</li>
  <li>Abre el Visor de eventos de tu equipo y localiza un inicio de sesión (4624).</li>
</ol>
`,
  quiz: [
    {
      p: "¿Para qué sirven principalmente los logs de seguridad?",
      o: ["Para decorar", "Para detectar, investigar y auditar lo que ocurre", "Para acelerar el sistema", "Para cifrar archivos"],
      c: 1,
      e: "Sin registros, no se puede reconstruir un incidente."
    },
    {
      p: "¿Cuál de estos datos NUNCA debe guardarse en un log?",
      o: ["La hora del evento", "Contraseñas", "El nombre de la acción", "El resultado del evento"],
      c: 1,
      e: "Los logs los leen muchas personas y se copian a otros sistemas."
    },
    {
      p: "¿Qué cinco preguntas responde un buen evento de log?",
      o: ["Cuándo, quién, qué, dónde y resultado", "Cuánto cuesta, quién paga y cuándo", "Color, tamaño, peso, marca y modelo", "Ninguna"],
      c: 0,
      e: "Con esos datos se puede reconstruir lo ocurrido."
    },
    {
      p: "¿Qué es la inyección en logs?",
      o: ["Falsificar entradas del log mediante saltos de línea en datos externos", "Borrar el disco", "Cifrar el log", "Instalar un antivirus"],
      c: 0,
      e: "Se previene limpiando los datos o usando formatos estructurados."
    },
    {
      p: "¿Por qué conviene enviar los logs a un sistema centralizado?",
      o: ["Para que sobrevivan si el servidor original se compromete", "Para gastar más espacio", "Para que nadie los revise", "Porque Windows lo exige"],
      c: 0,
      e: "Los atacantes intentan borrar sus huellas."
    },
    {
      p: "¿Por qué es importante que todos los sistemas tengan la hora sincronizada?",
      o: ["Para reconstruir correctamente el orden de los eventos", "Para ahorrar energía", "Para mejorar la imagen", "No es importante"],
      c: 0,
      e: "Relojes distintos hacen imposible correlacionar eventos."
    },
    {
      p: "¿Qué alerta es muy útil para detectar fuerza bruta?",
      o: ["Un cambio de color en la pantalla", "Muchos intentos de login fallidos seguidos y luego uno correcto", "Un archivo creado a las 3 pm", "Un correo recibido"],
      c: 1,
      e: "Ese patrón indica que alguien pudo adivinar la contraseña."
    },
    {
      p: "¿Qué es la fatiga de alertas?",
      o: ["Cuando hay tantas alertas que el equipo deja de hacerles caso", "Cuando las alertas se cansan", "Cuando se apaga el servidor", "Un tipo de virus"],
      c: 0,
      e: "Es mejor tener pocas alertas bien ajustadas."
    },
    {
      p: "En el Visor de eventos de Windows, ¿qué indica el ID 4625?",
      o: ["Inicio de sesión correcto", "Inicio de sesión fallido", "Cierre de sesión", "Creación de cuenta"],
      c: 1,
      e: "El 4624 es correcto y el 4625 es fallido."
    },
    {
      p: "En Java con SLF4J, ¿cuál es la forma correcta de registrar un login fallido?",
      o: ["log.warn(\"Login fallido usuario=\" + usuario + \" clave=\" + clave)", "log.warn(\"Login fallido usuario={} ip={}\", usuario, ip)", "System.out.println(clave)", "No registrar nada"],
      c: 1,
      e: "Se usan parámetros y se evita guardar la contraseña."
    }
  ]
};
