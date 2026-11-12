CURSO.contenido.a01 = {
  html: `
<p>Hasta ahora viste fallos y defensas sueltas. Este módulo cambia la mirada: en lugar de corregir problemas al final, se trata de <strong>construir seguridad desde el inicio</strong>. Es la base del nivel avanzado.</p>

<h2>1. El problema de dejar la seguridad para el final</h2>
<div class="analogia">
  <strong>Analogía: construir una casa</strong>
  Es barato poner una salida de emergencia en el plano. Es carísimo abrir un muro cuando la casa ya está habitada. En software pasa igual: un fallo de diseño descubierto en producción cuesta mucho más que uno detectado en el papel.
</div>
<p>A mover las actividades de seguridad hacia las primeras etapas se le llama <strong>"shift left"</strong> (correr a la izquierda en la línea de tiempo del proyecto).</p>

<h2>2. Ciclo de vida de desarrollo seguro (Secure SDLC)</h2>
<p>Un <strong>SDLC</strong> es el ciclo de vida del software: pedir, diseñar, programar, probar, desplegar y mantener. El <strong>SDLC seguro</strong> agrega actividades de seguridad en cada etapa.</p>
<table>
  <thead><tr><th>Etapa</th><th>Actividad de seguridad</th></tr></thead>
  <tbody>
    <tr><td>Requisitos</td><td>Definir requisitos de seguridad y privacidad, y casos de abuso.</td></tr>
    <tr><td>Diseño</td><td>Modelado de amenazas, principios de diseño seguro, revisión de arquitectura.</td></tr>
    <tr><td>Implementación</td><td>Estándares de código seguro, revisión de código, análisis estático (SAST), control de dependencias.</td></tr>
    <tr><td>Pruebas</td><td>Pruebas de seguridad, análisis dinámico (DAST), pruebas de abuso.</td></tr>
    <tr><td>Despliegue</td><td>Configuración endurecida, gestión de secretos, revisión de la infraestructura.</td></tr>
    <tr><td>Operación y mantenimiento</td><td>Monitoreo, gestión de vulnerabilidades, respuesta a incidentes, parches.</td></tr>
  </tbody>
</table>
<div class="nota">
  <strong>Marcos de referencia</strong>
  Hay guías que ayudan a organizar este trabajo: <strong>OWASP SAMM</strong> (modelo de madurez), <strong>NIST SSDF</strong> (marco de desarrollo seguro) y <strong>OWASP ASVS</strong> (estándar con requisitos verificables para aplicaciones, en tres niveles de rigor). Consulta siempre la versión vigente de cada uno.
</div>

<h2>3. Requisitos de seguridad y casos de abuso</h2>
<p>Un requisito normal dice lo que el sistema debe hacer. Un <strong>requisito de seguridad</strong> dice lo que debe resistir. Un <strong>caso de abuso</strong> describe cómo alguien con malas intenciones usaría mal una función.</p>
<table>
  <thead><tr><th>Función</th><th>Caso de uso normal</th><th>Caso de abuso</th></tr></thead>
  <tbody>
    <tr><td>Recuperar contraseña</td><td>El usuario pide un enlace por correo.</td><td>Alguien pide enlaces para miles de cuentas, o adivina el enlace.</td></tr>
    <tr><td>Aplicar cupón</td><td>Un cliente usa un descuento.</td><td>Un script prueba miles de códigos o reutiliza un cupón único.</td></tr>
    <tr><td>Ver pedido</td><td>El cliente consulta su pedido.</td><td>Cambia el número para ver pedidos de otros.</td></tr>
  </tbody>
</table>
<div class="ejemplo">
  <strong>Ejemplos de requisitos de seguridad</strong>
  <ul>
    <li>"El sistema bloqueará temporalmente la cuenta tras 5 intentos de login fallidos."</li>
    <li>"Los datos de tarjeta nunca se almacenarán en la base de datos."</li>
    <li>"Toda petición a la API verificará la autorización en el servidor."</li>
    <li>"Las contraseñas se almacenarán con un hash lento y sal."</li>
  </ul>
</div>
<p>Un buen requisito es <strong>concreto y verificable</strong>. "El sistema debe ser seguro" no sirve; "El sistema exigirá MFA a los administradores" sí.</p>

<h2>4. Principios de diseño seguro</h2>
<p>Son reglas generales, mucho más estables que cualquier herramienta. Varias ya las conoces con otros nombres.</p>
<table>
  <thead><tr><th>Principio</th><th>Idea</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td>Mínimo privilegio</td><td>Solo los permisos necesarios.</td><td>El usuario de la base de datos de la app no puede borrar tablas.</td></tr>
    <tr><td>Defensa en profundidad</td><td>Varias capas independientes.</td><td>Validación + consultas parametrizadas + permisos limitados.</td></tr>
    <tr><td>Seguro por defecto</td><td>La configuración inicial ya es la segura.</td><td>Los usuarios nuevos nacen sin permisos de administrador.</td></tr>
    <tr><td>Fallar de forma segura</td><td>Ante un error, se deniega.</td><td>Si el servicio de permisos falla, no se da acceso.</td></tr>
    <tr><td>Mediación completa</td><td>Cada acceso se comprueba, siempre.</td><td>Revisar permisos en cada petición, no solo al iniciar sesión.</td></tr>
    <tr><td>Separación de funciones</td><td>Nadie hace todo solo.</td><td>Quien crea un pago no lo aprueba.</td></tr>
    <tr><td>Simplicidad</td><td>Lo simple se asegura mejor que lo complejo.</td><td>Menos funciones y menos código reducen la superficie de ataque.</td></tr>
    <tr><td>No confiar en entradas externas</td><td>Todo dato externo es sospechoso hasta validarlo.</td><td>Datos de formularios, cabeceras, archivos y otros servicios.</td></tr>
    <tr><td>Diseño abierto</td><td>La seguridad no depende de ocultar cómo funciona.</td><td>El cifrado es seguro aunque el algoritmo sea público.</td></tr>
    <tr><td>Facilidad de uso</td><td>Si es incómodo, la gente lo evitará.</td><td>MFA con aplicación en lugar de procesos engorrosos.</td></tr>
  </tbody>
</table>
<div class="aviso">
  <strong>Seguridad por oscuridad no es seguridad</strong>
  Esconder una dirección o no documentar una puerta trasera no protege. Cuando se descubre, nada la sostiene.
</div>

<h2>5. Modelado de amenazas</h2>
<p>Es un ejercicio estructurado para <strong>pensar como un atacante antes de programar</strong>, y decidir qué defensas hacen falta.</p>
<div class="analogia">
  <strong>Analogía: revisar el plano de un banco</strong>
  Antes de construir, un equipo mira el plano y pregunta: ¿por dónde podría entrar alguien? ¿qué pasa si se corta la luz? ¿quién tiene llave de la bóveda? Eso es modelar amenazas.
</div>

<h3>Las cuatro preguntas</h3>
<ol>
  <li><strong>¿En qué estamos trabajando?</strong> Se dibuja el sistema.</li>
  <li><strong>¿Qué puede salir mal?</strong> Se identifican las amenazas.</li>
  <li><strong>¿Qué vamos a hacer al respecto?</strong> Se definen las defensas.</li>
  <li><strong>¿Lo hicimos bien?</strong> Se revisa y se valida.</li>
</ol>

<h3>Paso 1. Dibujar el sistema: diagrama de flujo de datos (DFD)</h3>
<table>
  <thead><tr><th>Elemento</th><th>Qué representa</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td>Entidad externa</td><td>Persona o sistema fuera de tu control.</td><td>Cliente, pasarela de pago.</td></tr>
    <tr><td>Proceso</td><td>Código que transforma datos.</td><td>API de pedidos.</td></tr>
    <tr><td>Almacén de datos</td><td>Donde se guardan datos.</td><td>Base de datos.</td></tr>
    <tr><td>Flujo de datos</td><td>Datos que viajan entre elementos.</td><td>Petición HTTPS.</td></tr>
    <tr><td>Frontera de confianza</td><td>Línea donde cambia el nivel de confianza.</td><td>Entre internet y tu servidor.</td></tr>
  </tbody>
</table>
<div class="nota">
  <strong>Las fronteras de confianza son lo más importante</strong>
  Los problemas de seguridad se concentran donde los datos cruzan de una zona poco confiable a otra más confiable. Marca esas líneas con cuidado.
</div>

<div class="ejemplo">
  <strong>Ejemplo: tienda en línea</strong>
  <pre><code>[Cliente] --HTTPS--&gt; (API de pedidos) ---&gt; [(Base de datos)]
                          |
                          +--HTTPS--&gt; [Pasarela de pago]

   ======= frontera de confianza 1: internet | servidor =======
   ======= frontera de confianza 2: servidor | base de datos ===
   ======= frontera de confianza 3: servidor | tercero (pagos) =</code></pre>
</div>

<h3>Paso 2. Encontrar amenazas con STRIDE</h3>
<p><strong>STRIDE</strong> es una lista de seis tipos de amenaza. Cada letra corresponde a una propiedad de seguridad que se viola.</p>
<table>
  <thead><tr><th>Letra</th><th>Amenaza</th><th>Propiedad violada</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td>S</td><td>Spoofing (suplantación)</td><td>Autenticidad</td><td>Alguien se hace pasar por otro usuario.</td></tr>
    <tr><td>T</td><td>Tampering (manipulación)</td><td>Integridad</td><td>Se cambia el precio en una petición.</td></tr>
    <tr><td>R</td><td>Repudiation (repudio)</td><td>No repudio</td><td>Un usuario niega haber hecho un pedido y no hay registro.</td></tr>
    <tr><td>I</td><td>Information disclosure (revelación)</td><td>Confidencialidad</td><td>Un error muestra datos internos.</td></tr>
    <tr><td>D</td><td>Denial of service (denegación)</td><td>Disponibilidad</td><td>Se satura la API con peticiones.</td></tr>
    <tr><td>E</td><td>Elevation of privilege (elevación)</td><td>Autorización</td><td>Un cliente consigue acciones de administrador.</td></tr>
  </tbody>
</table>
<p>Se recorre cada elemento y cada flujo del diagrama y se pregunta: ¿le puede pasar una S, una T, una R...?</p>

<h3>Paso 3. Decidir qué hacer</h3>
<div class="ejemplo">
  <strong>Análisis del flujo "Cliente - API de pedidos"</strong>
  <table>
    <thead><tr><th>Amenaza</th><th>Tipo</th><th>Defensa</th></tr></thead>
    <tbody>
      <tr><td>Alguien usa una sesión robada</td><td>S</td><td>Cookies HttpOnly y Secure, sesiones con caducidad, MFA.</td></tr>
      <tr><td>El cliente modifica el precio al enviar el pedido</td><td>T</td><td>El servidor calcula el precio; nunca confía en el enviado.</td></tr>
      <tr><td>Un cliente niega una compra</td><td>R</td><td>Registro de auditoría con usuario, hora y acción.</td></tr>
      <tr><td>La API devuelve un error con detalles internos</td><td>I</td><td>Mensajes genéricos al usuario; detalle solo en logs.</td></tr>
      <tr><td>Miles de peticiones por segundo</td><td>D</td><td>Límite de peticiones (rate limiting) y WAF.</td></tr>
      <tr><td>Un cliente cambia su rol enviando un campo extra</td><td>E</td><td>DTO con solo los campos permitidos; permisos en el servidor.</td></tr>
    </tbody>
  </table>
</div>
<p>Cada amenaza puede tratarse como viste en el módulo de riesgos: mitigar, evitar, transferir o aceptar.</p>

<h3>Paso 4. Validar</h3>
<ul>
  <li>¿Cada amenaza identificada tiene una defensa o una decisión documentada?</li>
  <li>¿Esas defensas se implementaron y se probaron?</li>
  <li>¿El modelo se actualiza cuando el diseño cambia?</li>
</ul>
<div class="nota">
  <strong>Cuándo hacerlo</strong>
  Al diseñar una función nueva, al cambiar la arquitectura, o al integrar un servicio externo. No necesita ser perfecto ni largo: un modelo sencillo hecho a tiempo vale más que uno completo que nadie hizo.
</div>

<h3>Herramientas gratuitas</h3>
<ul>
  <li><strong>diagrams.net</strong> para dibujar el diagrama.</li>
  <li><strong>OWASP Threat Dragon</strong> (código abierto) y <strong>Microsoft Threat Modeling Tool</strong> para estructurar el análisis.</li>
  <li>Una hoja de cálculo simple también funciona.</li>
</ul>

<h2>6. Ejemplo de diseño inseguro en Java: asignación masiva</h2>
<p>Un fallo que nace en el diseño: recibir directamente la entidad completa desde la petición.</p>
<pre><code>// INSEGURO: el cliente puede enviar también "rol":"ADMIN"
@PostMapping("/usuarios")
public Usuario crear(@RequestBody Usuario usuario) {
    return repositorio.save(usuario);
}</code></pre>
<p>Si la clase <code>Usuario</code> tiene un campo <code>rol</code>, el atacante lo incluye en el JSON y se convierte en administrador. Esto es una amenaza E (elevación de privilegios) y se llama <strong>asignación masiva</strong> (<em>mass assignment</em>).</p>
<p><strong>Solución:</strong> recibir un objeto de transferencia (DTO) con solo los campos permitidos y asignar el resto en el servidor.</p>
<pre><code>public record RegistroRequest(String nombre, String correo, String clave) {}

@PostMapping("/usuarios")
public UsuarioRespuesta crear(@Valid @RequestBody RegistroRequest req) {
    Usuario u = new Usuario();
    u.setNombre(req.nombre());
    u.setCorreo(req.correo());
    u.setClaveHash(encoder.encode(req.clave()));
    u.setRol(Rol.CLIENTE);          // el rol lo decide el servidor
    repositorio.save(u);
    return new UsuarioRespuesta(u.getId(), u.getNombre());
}</code></pre>
<div class="nota">
  <strong>Lo mismo aplica a la respuesta</strong>
  Devuelve un DTO sin el hash de la contraseña ni campos internos. No devuelvas entidades completas de la base de datos.
</div>

<h2>7. Validación de entradas con Bean Validation</h2>
<p>Con la dependencia <code>spring-boot-starter-validation</code> puedes declarar reglas en el DTO y Spring las aplica con <code>@Valid</code>.</p>
<pre><code>import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegistroRequest(
    @NotBlank @Size(max = 80) String nombre,
    @NotBlank @Email @Size(max = 120) String correo,
    @NotBlank @Size(min = 12, max = 128) String clave
) {}</code></pre>
<ul>
  <li><strong>Lista blanca:</strong> define lo permitido en vez de intentar listar lo prohibido.</li>
  <li><strong>Límites de tamaño:</strong> evitan abusos y desbordes.</li>
  <li><strong>Validar en el servidor</strong> siempre, aunque el formulario ya valide.</li>
  <li>La validación reduce riesgos, pero <strong>no reemplaza</strong> las consultas parametrizadas ni la codificación de salida.</li>
</ul>

<h2>8. Lista rápida de código seguro</h2>
<table>
  <thead><tr><th>Área</th><th>Pregunta de revisión</th></tr></thead>
  <tbody>
    <tr><td>Entradas</td><td>¿Se validan tipo, longitud y formato?</td></tr>
    <tr><td>Acceso</td><td>¿Se verifica la autorización en el servidor en cada petición?</td></tr>
    <tr><td>Base de datos</td><td>¿Todas las consultas están parametrizadas?</td></tr>
    <tr><td>Salida</td><td>¿Se codifica según el contexto?</td></tr>
    <tr><td>Errores</td><td>¿Fallan de forma segura y sin revelar detalles?</td></tr>
    <tr><td>Secretos</td><td>¿Hay claves o contraseñas dentro del código?</td></tr>
    <tr><td>Logs</td><td>¿Se registran eventos de seguridad sin datos sensibles?</td></tr>
    <tr><td>Dependencias</td><td>¿Están actualizadas y sin vulnerabilidades conocidas?</td></tr>
  </tbody>
</table>

<h2>9. Práctica: modela un inicio de sesión</h2>
<p>No necesitas instalar nada. Abre <strong>app.diagrams.net</strong> o usa papel.</p>
<ol>
  <li>Dibuja: un <strong>Usuario</strong> (entidad externa), un <strong>Servicio de login</strong> (proceso) y una <strong>Base de usuarios</strong> (almacén).</li>
  <li>Dibuja los flujos: el usuario envía usuario y contraseña; el servicio consulta la base; el servicio devuelve un resultado.</li>
  <li>Marca las fronteras de confianza.</li>
  <li>Recorre cada flujo con las seis letras de STRIDE y anota al menos una amenaza por letra.</li>
  <li>Escribe una defensa para cada amenaza.</li>
</ol>
<div class="ejemplo">
  <strong>Ideas para comprobar tu trabajo</strong>
  S: suplantación con contraseña robada (MFA, límite de intentos). T: modificar la petición (HTTPS, validación). R: negar un acceso (registro de auditoría). I: mensajes que revelan si un usuario existe (mensaje genérico). D: miles de intentos (límite de peticiones). E: manipular un campo de rol (el rol se asigna en el servidor).
</div>

<h2>10. Ejercicios</h2>
<ol>
  <li>Escribe tres requisitos de seguridad verificables para una app de citas médicas.</li>
  <li>Escribe un caso de abuso para una función de "invitar amigos con cupón".</li>
  <li>Explica en tus palabras qué es una frontera de confianza y da un ejemplo.</li>
  <li>Identifica el fallo en este código y corrígelo con un DTO: <code>@PutMapping("/perfil") public Usuario actualizar(@RequestBody Usuario u)</code>.</li>
</ol>
`,
  quiz: [
    {
      p: "¿Qué significa 'shift left' en seguridad de software?",
      o: ["Mover las actividades de seguridad hacia las etapas tempranas del proyecto", "Mover los servidores a otra ciudad", "Programar con la mano izquierda", "Apagar los controles al final"],
      c: 0,
      e: "Corregir un fallo de diseño temprano cuesta mucho menos que hacerlo en producción."
    },
    {
      p: "¿Qué es un caso de abuso?",
      o: ["Una descripción de cómo alguien con malas intenciones usaría mal una función", "Un error de ortografía", "Un tipo de prueba de rendimiento", "Un manual de usuario"],
      c: 0,
      e: "Ayuda a anticipar cómo se puede atacar una función antes de construirla."
    },
    {
      p: "¿Cuál es un buen requisito de seguridad?",
      o: ["El sistema debe ser seguro", "El sistema bloqueará la cuenta temporalmente tras 5 intentos fallidos de login", "El sistema será muy bueno", "El sistema no tendrá problemas"],
      c: 1,
      e: "Un buen requisito es concreto y verificable."
    },
    {
      p: "El principio 'seguro por defecto' significa que:",
      o: ["La configuración inicial ya es la segura", "Todo se bloquea para siempre", "Se necesitan más contraseñas", "No hay que probar nada"],
      c: 0,
      e: "Por ejemplo, los usuarios nuevos nacen sin permisos de administrador."
    },
    {
      p: "¿Por qué la 'seguridad por oscuridad' no es una defensa confiable?",
      o: ["Porque depende de que nadie descubra el secreto del diseño", "Porque siempre es muy cara", "Porque solo funciona en Windows", "Porque está prohibida"],
      c: 0,
      e: "Cuando se descubre, ya no queda ninguna protección."
    },
    {
      p: "¿Cuáles son las cuatro preguntas básicas del modelado de amenazas?",
      o: ["En qué trabajamos, qué puede salir mal, qué haremos, lo hicimos bien", "Quién, cuándo, dónde, cuánto", "Instalar, probar, borrar, repetir", "Nombre, edad, correo, teléfono"],
      c: 0,
      e: "Es un proceso sencillo que se puede repetir cuando el diseño cambia."
    },
    {
      p: "En un diagrama de flujo de datos, ¿qué es una frontera de confianza?",
      o: ["La línea donde los datos pasan de una zona a otra con distinto nivel de confianza", "El borde de la pantalla", "Un tipo de cable", "Un usuario"],
      c: 0,
      e: "Ahí se concentran muchos problemas de seguridad."
    },
    {
      p: "En STRIDE, ¿qué letra representa la elevación de privilegios?",
      o: ["S", "T", "E", "D"],
      c: 2,
      e: "E es Elevation of privilege."
    },
    {
      p: "Un cliente envía el campo \"rol\":\"ADMIN\" en el JSON y se vuelve administrador. ¿Cómo se llama el fallo?",
      o: ["Asignación masiva (mass assignment)", "Denegación de servicio", "Phishing", "Cifrado débil"],
      c: 0,
      e: "Se evita usando DTO con solo los campos permitidos."
    },
    {
      p: "¿La validación de entradas reemplaza a las consultas parametrizadas?",
      o: ["Sí, con validar es suficiente", "No, son defensas complementarias", "Solo en Java", "Solo en bases de datos pequeñas"],
      c: 1,
      e: "La defensa en profundidad usa varias capas independientes."
    }
  ]
};
