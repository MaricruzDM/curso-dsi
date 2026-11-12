CURSO.contenido.i03 = {
  html: `
<p>El <strong>OWASP Top 10</strong> es una lista de los diez riesgos más críticos en aplicaciones web, elaborada por la comunidad OWASP (Open Worldwide Application Security Project) a partir de datos reales. Es el punto de partida más usado en el mundo para hablar de seguridad web.</p>

<div class="nota">
  <strong>Edición vigente: OWASP Top 10:2025</strong>
  La lista se actualiza cada pocos años. La edición 2025 reemplaza a la de 2021. Consulta siempre la versión actual en <strong>owasp.org/Top10</strong>, porque el orden y los nombres cambian entre ediciones.
</div>

<div class="analogia">
  <strong>Analogía: la lista de riesgos de una casa</strong>
  Los bomberos publican las causas más comunes de incendio en el hogar: cocina descuidada, cables dañados, estufas sin vigilar. No cubren todos los posibles accidentes, pero si atiendes esos diez, evitas la mayoría de los problemas.
</div>

<h2>1. La lista 2025 de un vistazo</h2>
<table>
  <thead><tr><th>#</th><th>Categoría</th><th>En pocas palabras</th></tr></thead>
  <tbody>
    <tr><td>A01</td><td>Broken Access Control (Control de acceso roto)</td><td>Usuarios que pueden hacer lo que no deberían.</td></tr>
    <tr><td>A02</td><td>Security Misconfiguration (Mala configuración de seguridad)</td><td>Valores por defecto, servicios abiertos, mensajes de error de más.</td></tr>
    <tr><td>A03</td><td>Software Supply Chain Failures (Fallos en la cadena de suministro de software)</td><td>Componentes, librerías y herramientas de terceros comprometidos o desactualizados.</td></tr>
    <tr><td>A04</td><td>Cryptographic Failures (Fallos criptográficos)</td><td>Datos sensibles sin cifrar o con cifrado débil.</td></tr>
    <tr><td>A05</td><td>Injection (Inyección)</td><td>Datos del usuario que se interpretan como comandos.</td></tr>
    <tr><td>A06</td><td>Insecure Design (Diseño inseguro)</td><td>Fallos de diseño, no de programación.</td></tr>
    <tr><td>A07</td><td>Authentication Failures (Fallos de autenticación)</td><td>Contraseñas débiles, sesiones mal gestionadas.</td></tr>
    <tr><td>A08</td><td>Software or Data Integrity Failures (Fallos de integridad)</td><td>Código o datos que se aceptan sin verificar su origen.</td></tr>
    <tr><td>A09</td><td>Security Logging and Alerting Failures (Fallos de registro y alertas)</td><td>No se registra ni se avisa de lo que ocurre.</td></tr>
    <tr><td>A10</td><td>Mishandling of Exceptional Conditions (Mal manejo de condiciones excepcionales)</td><td>Errores y situaciones inesperadas mal controladas.</td></tr>
  </tbody>
</table>
<div class="nota">
  <strong>Qué cambió frente a 2021</strong>
  Aparecen dos categorías nuevas (cadena de suministro y manejo de condiciones excepcionales), el SSRF se integra dentro del control de acceso roto, y la mala configuración sube al segundo lugar. Si ves materiales con la lista de 2021, siguen siendo útiles para aprender, pero ya no son la vigente.
</div>

<h2>2. Cada categoría en detalle</h2>

<h3>A01. Control de acceso roto</h3>
<p>Fallos en comprobar quién puede hacer qué. Es la categoría más frecuente.</p>
<ul>
  <li><strong>Ejemplo:</strong> cambiar <code>/cuenta/1001</code> por <code>/cuenta/1002</code> y ver datos ajenos.</li>
  <li><strong>Defensa:</strong> comprobar permisos en el servidor en cada petición; denegar por defecto; no confiar en el cliente.</li>
</ul>
<div class="analogia"><strong>Analogía</strong> Un hotel que da la llave maestra a cualquiera que la pida.</div>

<h3>A02. Mala configuración de seguridad</h3>
<ul>
  <li><strong>Ejemplo:</strong> dejar la contraseña por defecto de un panel de administración, mostrar el detalle técnico de errores o dejar un almacenamiento en la nube público.</li>
  <li><strong>Defensa:</strong> configuraciones endurecidas y repetibles, quitar lo que no se usa, revisar periódicamente.</li>
</ul>
<div class="analogia"><strong>Analogía</strong> Comprar una puerta blindada y dejarla abierta de par en par.</div>

<h3>A03. Fallos en la cadena de suministro de software</h3>
<p>Tu aplicación usa librerías, herramientas y servicios de terceros. Si alguno está comprometido o desactualizado, tu aplicación también lo está.</p>
<ul>
  <li><strong>Ejemplo:</strong> una dependencia con una vulnerabilidad conocida que nunca se actualizó, o un paquete malicioso con un nombre parecido al real.</li>
  <li><strong>Defensa:</strong> inventario de dependencias, análisis automático, actualizaciones frecuentes, fuentes confiables.</li>
</ul>
<div class="analogia"><strong>Analogía</strong> Un restaurante excelente que compra ingredientes en mal estado a un proveedor.</div>

<h3>A04. Fallos criptográficos</h3>
<ul>
  <li><strong>Ejemplo:</strong> guardar contraseñas en texto claro o con MD5, enviar datos sin HTTPS, usar claves fijas dentro del código.</li>
  <li><strong>Defensa:</strong> cifrar datos sensibles en tránsito y en reposo con algoritmos modernos, y gestionar bien las claves.</li>
</ul>

<h3>A05. Inyección</h3>
<p>El programa mezcla datos del usuario con instrucciones y la base de datos o el sistema los ejecuta como comandos. Incluye SQL, comandos del sistema y XSS.</p>
<ul>
  <li><strong>Defensa:</strong> consultas parametrizadas, validar entradas, codificar salidas.</li>
</ul>
<div class="analogia"><strong>Analogía</strong> Dictar una orden al mesero y que el cliente agregue "y dale las llaves de la caja".</div>

<h3>A06. Diseño inseguro</h3>
<p>El problema no es un error de código, sino que el diseño no contempló la seguridad.</p>
<ul>
  <li><strong>Ejemplo:</strong> un proceso de recuperación de contraseña con preguntas fáciles de adivinar, o una tienda que no limita la cantidad de intentos de compra.</li>
  <li><strong>Defensa:</strong> modelado de amenazas desde el diseño, patrones seguros, límites de uso.</li>
</ul>
<div class="analogia"><strong>Analogía</strong> Construir un edificio sin salidas de emergencia: por perfecta que sea la obra, el plano ya era peligroso.</div>

<h3>A07. Fallos de autenticación</h3>
<ul>
  <li><strong>Ejemplo:</strong> permitir contraseñas como <code>123456</code>, no limitar intentos, no invalidar la sesión al cerrar sesión.</li>
  <li><strong>Defensa:</strong> MFA, política de contraseñas sensata, límite de intentos, sesiones con caducidad.</li>
</ul>

<h3>A08. Fallos de integridad de software o datos</h3>
<ul>
  <li><strong>Ejemplo:</strong> instalar actualizaciones sin comprobar su firma, o aceptar objetos serializados que llegan de usuarios sin verificación.</li>
  <li><strong>Defensa:</strong> firmas digitales, verificación de origen, canales de actualización confiables.</li>
</ul>

<h3>A09. Fallos de registro y alertas</h3>
<ul>
  <li><strong>Ejemplo:</strong> un ataque dura meses porque nadie registraba los intentos fallidos ni recibía avisos.</li>
  <li><strong>Defensa:</strong> registrar eventos de seguridad, centralizar, y alertar sobre lo anormal. Lo verás en el Módulo 7.</li>
</ul>

<h3>A10. Mal manejo de condiciones excepcionales</h3>
<p>Qué hace el sistema cuando algo sale mal o llega un dato inesperado.</p>
<ul>
  <li><strong>Ejemplo:</strong> un error que revela contraseñas o rutas internas; un sistema que, ante un fallo, "abre" el acceso en vez de cerrarlo; excepciones sin controlar que dejan transacciones a medias.</li>
  <li><strong>Defensa:</strong> manejar los errores de forma explícita, fallar de forma segura (cerrado), mensajes genéricos al usuario y detalle solo en los logs.</li>
</ul>
<div class="analogia"><strong>Analogía</strong> En una falla eléctrica, las puertas de un banco deben quedarse cerradas, y las de emergencia de un cine deben abrirse. Decidir cómo falla cada sistema es parte del diseño.</div>

<h3>Ejemplo en Java: fallar de forma segura</h3>
<pre><code>// INCORRECTO: ante un error, se permite el acceso
boolean acceso;
try {
    acceso = servicioPermisos.puedeEntrar(usuario);
} catch (Exception e) {
    acceso = true;   // peligroso
}

// CORRECTO: ante un error, se deniega y se registra
boolean acceso;
try {
    acceso = servicioPermisos.puedeEntrar(usuario);
} catch (Exception e) {
    log.error("Error al comprobar permisos", e);
    acceso = false;
}</code></pre>

<h2>3. Cómo usar el Top 10</h2>
<ul>
  <li><strong>Para aprender:</strong> es un mapa de los problemas más comunes.</li>
  <li><strong>Para revisar:</strong> sirve como lista de comprobación en revisiones de código y pruebas.</li>
  <li><strong>Para priorizar:</strong> ayuda a decidir por dónde empezar.</li>
</ul>
<div class="aviso">
  <strong>No es una lista completa</strong>
  El Top 10 es un documento de concienciación. Existen otros recursos más detallados, como el ASVS (estándar de verificación de seguridad de aplicaciones) y las guías de pruebas de OWASP.
</div>

<h2>4. Un laboratorio seguro para practicar</h2>
<p>Para ver estos fallos en acción sin tocar sistemas reales, OWASP ofrece <strong>Juice Shop</strong>, una tienda web hecha a propósito con fallos. Se ejecuta en tu propia computadora. Las instrucciones oficiales están en su página, y las de instalación las veremos paso a paso en el módulo siguiente.</p>
<div class="aviso legal">
  <strong>Recuerda</strong>
  Practica únicamente en laboratorios que tú ejecutes en tu equipo. Nunca en sitios reales.
</div>

<h2>5. Ejercicios</h2>
<ol>
  <li>Para cada situación, di a qué categoría pertenece: (a) una librería sin actualizar con un fallo conocido; (b) un panel con usuario y contraseña de fábrica; (c) ver la factura de otro cliente cambiando un número en la dirección.</li>
  <li>Elige una aplicación que uses y piensa qué categorías serían más peligrosas allí.</li>
  <li>Entra a owasp.org/Top10 y lee la descripción de una categoría que te llame la atención.</li>
</ol>
`,
  quiz: [
    {
      p: "¿Qué es el OWASP Top 10?",
      o: ["Una lista de los diez riesgos más críticos de seguridad en aplicaciones web", "Un antivirus", "Un lenguaje de programación", "Un tipo de firewall"],
      c: 0,
      e: "Es un documento de concienciación elaborado por la comunidad OWASP."
    },
    {
      p: "¿Qué categoría ocupa el primer lugar en la edición 2025?",
      o: ["Inyección", "Control de acceso roto", "Fallos criptográficos", "Diseño inseguro"],
      c: 1,
      e: "El control de acceso roto es A01."
    },
    {
      p: "Usar una librería con una vulnerabilidad conocida que no se actualiza corresponde a:",
      o: ["Fallos en la cadena de suministro de software", "Inyección", "Phishing", "Fallos de registro"],
      c: 0,
      e: "Las dependencias de terceros son parte de tu cadena de suministro."
    },
    {
      p: "Dejar la contraseña por defecto en un panel de administración es:",
      o: ["Mala configuración de seguridad", "Inyección SQL", "Un ataque DDoS", "Cifrado fuerte"],
      c: 0,
      e: "Es una configuración insegura que se puede evitar."
    },
    {
      p: "¿Qué distingue al 'diseño inseguro' de otros fallos?",
      o: ["Que el problema está en el plano, no solo en el código", "Que solo afecta a las bases de datos", "Que no tiene solución", "Que solo ocurre en celulares"],
      c: 0,
      e: "Un plano sin salidas de emergencia no se arregla con mejor obra."
    },
    {
      p: "Ante un error al comprobar permisos, ¿qué debe hacer un sistema seguro?",
      o: ["Permitir el acceso", "Denegar el acceso y registrar el error", "Reiniciar la computadora", "Mostrar el error completo al usuario"],
      c: 1,
      e: "Fallar de forma segura significa fallar 'cerrado'."
    },
    {
      p: "¿Qué categoría trata de que no se registran ni se alertan los eventos de seguridad?",
      o: ["A09. Fallos de registro y alertas", "A05. Inyección", "A04. Fallos criptográficos", "A01. Control de acceso roto"],
      c: 0,
      e: "Sin registros, los ataques pasan desapercibidos durante meses."
    },
    {
      p: "¿Por qué hay que consultar siempre la edición vigente del Top 10?",
      o: ["Porque la lista se actualiza y cambian el orden y los nombres", "Porque nunca cambia", "Porque es obligatorio pagarla", "Porque solo hay una edición"],
      c: 0,
      e: "Se actualiza cada pocos años; la vigente es la de 2025."
    },
    {
      p: "¿Dónde conviene practicar estos fallos?",
      o: ["En sitios reales de tiendas", "En un laboratorio propio, como OWASP Juice Shop, en tu equipo", "En el sitio web de tu banco", "En cualquier sitio sin permiso"],
      c: 1,
      e: "Es legal, seguro y está hecho para aprender."
    }
  ]
};
