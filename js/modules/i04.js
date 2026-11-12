CURSO.contenido.i04 = {
  html: `
<p>Estos tres ataques están entre los más conocidos del mundo web. Los dos primeros pertenecen a la familia de la <strong>inyección</strong> (A05 del OWASP Top 10:2025) y el tercero aprovecha la confianza del navegador. Veremos cómo funcionan y, sobre todo, cómo evitarlos en Java.</p>

<div class="aviso legal">
  <strong>Solo con fines defensivos</strong>
  Las pruebas de este módulo se hacen en tu propio equipo, con tu propio código o con el laboratorio de práctica. Probar estas técnicas en sitios que no son tuyos es ilegal aunque no causes daño.
</div>

<h2>1. Inyección SQL</h2>
<p>Una base de datos entiende el lenguaje <strong>SQL</strong>. Si la aplicación construye una consulta pegando texto que escribió el usuario, ese texto puede <strong>convertirse en parte de la instrucción</strong>.</p>
<div class="analogia">
  <strong>Analogía: el formulario con espacio libre</strong>
  Un formulario dice "Nombre: ____". Si alguien escribe "Ana, y además entrega las llaves de la caja", y el empleado lo lee como una orden en vez de como un nombre, hay un problema. El fallo está en que el sistema no distingue entre datos y órdenes.
</div>

<h3>Código vulnerable</h3>
<pre><code>public Usuario buscar(Connection con, String nombre) throws SQLException {
    String sql = "SELECT * FROM usuarios WHERE nombre = '" + nombre + "'";
    Statement st = con.createStatement();
    ResultSet rs = st.executeQuery(sql);
    ...
}</code></pre>
<p>Si el usuario escribe <code>Ana</code>, la consulta es:</p>
<pre><code>SELECT * FROM usuarios WHERE nombre = 'Ana'</code></pre>
<p>Pero si escribe <code>' OR '1'='1</code>, la consulta cambia por completo:</p>
<pre><code>SELECT * FROM usuarios WHERE nombre = '' OR '1'='1'</code></pre>
<p>La condición <code>'1'='1'</code> siempre es verdadera, y la consulta devuelve <strong>todos</strong> los usuarios. Con variaciones, un atacante podría saltarse un inicio de sesión, leer tablas ajenas o borrar datos.</p>

<h3>Cómo se corrige: consultas parametrizadas</h3>
<pre><code>public Usuario buscar(Connection con, String nombre) throws SQLException {
    String sql = "SELECT * FROM usuarios WHERE nombre = ?";
    try (PreparedStatement ps = con.prepareStatement(sql)) {
        ps.setString(1, nombre);
        try (ResultSet rs = ps.executeQuery()) {
            ...
        }
    }
}</code></pre>
<p>Con <code>PreparedStatement</code>, el texto del usuario viaja separado de la instrucción y se trata siempre como un <strong>dato</strong>, nunca como parte de la orden. Aunque escriban <code>' OR '1'='1</code>, la base de datos busca un usuario cuyo nombre sea literalmente ese texto.</p>

<h3>Con Spring Data JPA</h3>
<pre><code>// SEGURO: método derivado
Optional&lt;Usuario&gt; findByNombre(String nombre);

// SEGURO: parámetro nombrado
@Query("SELECT u FROM Usuario u WHERE u.nombre = :nombre")
Optional&lt;Usuario&gt; buscarPorNombre(@Param("nombre") String nombre);

// INSEGURO: concatenar texto en la consulta
@Query("SELECT u FROM Usuario u WHERE u.nombre = '" + ... + "'")  // no se debe hacer</code></pre>
<div class="aviso">
  <strong>Los ORM no te protegen si concatenas</strong>
  Hibernate, JPA y similares son seguros cuando usas parámetros. Si construyes consultas pegando cadenas, vuelves a tener el mismo problema.
</div>

<h3>Defensas en capas</h3>
<ol>
  <li><strong>Consultas parametrizadas</strong> (la defensa principal).</li>
  <li><strong>Validar la entrada:</strong> si esperas un número, rechaza todo lo que no lo sea.</li>
  <li><strong>Mínimo privilegio</strong> para el usuario de la base de datos de la aplicación.</li>
  <li><strong>No mostrar errores SQL</strong> al usuario.</li>
  <li><strong>Revisar el código</strong> y usar análisis estático para detectar concatenaciones.</li>
</ol>

<h2>2. XSS (Cross-Site Scripting)</h2>
<p>Ocurre cuando una página muestra texto que escribió alguien sin protegerlo, y el navegador lo ejecuta como código (<strong>JavaScript</strong>). El código se ejecuta en el navegador de otra persona, con los permisos de ese sitio.</p>
<div class="analogia">
  <strong>Analogía: el tablón de anuncios</strong>
  En un tablón donde cualquiera pega notas, alguien pega una "nota" que, al leerla, te hace entregar tu cartera. El tablón no revisó el contenido antes de mostrarlo a todos.
</div>

<h3>Ejemplo de error</h3>
<p>Una página de comentarios que muestra lo que la gente escribe:</p>
<pre><code>&lt;p&gt;Comentario: [lo que escribió el usuario]&lt;/p&gt;</code></pre>
<p>Si alguien escribe un fragmento con una etiqueta de script, y la página lo inserta tal cual, el navegador de quien lea el comentario lo ejecutará. Con eso, un atacante podría robar la sesión, modificar la página o redirigir a un sitio falso.</p>

<h3>Tipos</h3>
<table>
  <thead><tr><th>Tipo</th><th>Cómo ocurre</th></tr></thead>
  <tbody>
    <tr><td>Reflejado</td><td>El texto viaja en la dirección o formulario y la página lo "refleja". Se envía un enlace trampa a la víctima.</td></tr>
    <tr><td>Almacenado</td><td>El texto se guarda en la base de datos (un comentario) y se muestra a todos. Es el más peligroso.</td></tr>
    <tr><td>Basado en DOM</td><td>El propio JavaScript de la página inserta datos sin protección.</td></tr>
  </tbody>
</table>

<h3>Cómo se evita</h3>
<ol>
  <li><strong>Codificar la salida</strong> según dónde se inserte (HTML, atributo, JavaScript, URL). Convierte caracteres como <code>&lt;</code> en <code>&amp;lt;</code> para que se muestren como texto y no se ejecuten.</li>
  <li><strong>Usar plantillas que codifican por defecto.</strong> En Thymeleaf, <code>th:text</code> codifica y <code>th:utext</code> no.</li>
  <li><strong>Política de seguridad de contenido (CSP):</strong> una cabecera que indica qué scripts puede cargar la página.</li>
  <li><strong>Cookies HttpOnly:</strong> el JavaScript de la página no puede leer la cookie de sesión.</li>
  <li><strong>Validar la entrada</strong> como defensa adicional, no como única.</li>
</ol>
<pre><code>&lt;!-- SEGURO: Thymeleaf codifica el contenido --&gt;
&lt;p th:text="\${comentario}"&gt;&lt;/p&gt;

&lt;!-- PELIGROSO: inserta el contenido sin codificar --&gt;
&lt;p th:utext="\${comentario}"&gt;&lt;/p&gt;</code></pre>
<div class="nota">
  <strong>Regla práctica</strong>
  Valida lo que entra, pero <strong>codifica siempre lo que sale</strong>. La codificación de salida es la defensa principal contra XSS.
</div>

<h2>3. CSRF (Cross-Site Request Forgery)</h2>
<p>Engaña al navegador de una persona que ya inició sesión para que <strong>envíe una petición</strong> a un sitio donde está autenticada, sin que ella lo sepa.</p>
<div class="analogia">
  <strong>Analogía: la firma que se aprovecha</strong>
  Imagina un banco que acepta cualquier orden que traiga tu sello oficial. Si alguien te hace estampar el sello en un papel que parece inocente, pero que en realidad ordena una transferencia, el banco la ejecutará porque el sello es real. Tu navegador manda "el sello" (la cookie de sesión) automáticamente con cada petición a ese sitio.
</div>

<h3>Cómo ocurre</h3>
<ol>
  <li>Inicias sesión en tu banco, y el navegador guarda la cookie.</li>
  <li>Sin cerrar sesión, abres otra página maliciosa.</li>
  <li>Esa página hace que tu navegador envíe una petición al banco (por ejemplo, una transferencia).</li>
  <li>El navegador adjunta tu cookie y el banco cree que fuiste tú.</li>
</ol>

<h3>Cómo se evita</h3>
<ol>
  <li><strong>Token anti-CSRF:</strong> un valor secreto e impredecible que el servidor incluye en cada formulario y comprueba al recibirlo. La página del atacante no puede conocerlo.</li>
  <li><strong>Cookies SameSite:</strong> indican al navegador que no envíe la cookie en peticiones que vienen de otros sitios.</li>
  <li><strong>Pedir confirmación</strong> o reautenticación en acciones críticas.</li>
  <li><strong>No usar GET</strong> para acciones que modifican datos.</li>
</ol>
<div class="nota">
  <strong>Spring Security</strong>
  Trae protección CSRF activada por defecto para aplicaciones con formularios y sesiones. Un error frecuente es desactivarla para que "deje de dar problemas". Hazlo solo si entiendes por qué (por ejemplo, en APIs sin estado que no usan cookies de sesión) y no por comodidad.
</div>
<pre><code>// Desactivar CSRF sin motivo es un error común
http.csrf(csrf -> csrf.disable());   // revisa por qué lo haces</code></pre>

<h2>4. Comparación rápida</h2>
<table>
  <thead><tr><th>Ataque</th><th>Qué aprovecha</th><th>Defensa principal</th></tr></thead>
  <tbody>
    <tr><td>Inyección SQL</td><td>Que la base de datos interprete datos como instrucciones.</td><td>Consultas parametrizadas.</td></tr>
    <tr><td>XSS</td><td>Que el navegador ejecute texto como código.</td><td>Codificar la salida.</td></tr>
    <tr><td>CSRF</td><td>Que el navegador envíe la cookie automáticamente.</td><td>Token anti-CSRF y SameSite.</td></tr>
  </tbody>
</table>

<h2>5. Laboratorio: instalar OWASP Juice Shop en Windows</h2>
<p>Juice Shop es una tienda en línea con fallos puestos a propósito para que practiques. Se ejecuta en tu equipo y no sale a internet si sigues estos pasos.</p>
<div class="aviso legal">
  <strong>Nunca expongas Juice Shop a internet</strong>
  Tiene fallos intencionales. Ejecútalo solo en tu equipo, accesible desde <code>localhost</code>.
</div>

<h3>Paso 1. Instalar Docker Desktop</h3>
<div class="analogia">
  <strong>Analogía: el contenedor de carga</strong>
  Un contenedor de barco lleva todo lo que necesita su carga, sin importar en qué puerto o barco viaje. Docker hace lo mismo con los programas: los empaqueta con todo lo necesario para que funcionen igual en cualquier computadora, sin instalar nada más en tu sistema. Docker Desktop es el programa que ejecuta esos contenedores en Windows.
</div>

<h4>1.1 Revisar los requisitos de tu equipo</h4>
<p>Según la documentación oficial de Docker, necesitas:</p>
<ul>
  <li><strong>Windows 10 de 64 bits</strong> versión 22H2 (compilación 19045) o superior, o <strong>Windows 11</strong> de 64 bits versión 23H2 (compilación 22631) o superior.</li>
  <li><strong>8 GB de memoria RAM</strong> como mínimo.</li>
  <li>Un procesador de 64 bits con <strong>virtualización activada</strong> en la BIOS/UEFI.</li>
  <li>El componente <strong>WSL 2</strong> (Subsistema de Windows para Linux), que Docker Desktop usa por dentro.</li>
</ul>
<p>Cómo comprobarlos:</p>
<ol>
  <li><strong>Versión de Windows:</strong> presiona <code>Windows + R</code>, escribe <code>winver</code> y presiona Enter. Verás la versión y la compilación.</li>
  <li><strong>Memoria RAM y tipo de sistema:</strong> presiona <code>Windows + I</code>, entra a <strong>Sistema</strong> y luego a <strong>Acerca de</strong>. Revisa "RAM instalada" y "Tipo de sistema".</li>
  <li><strong>Virtualización:</strong> presiona <code>Ctrl + Shift + Esc</code> para abrir el Administrador de tareas, entra a la pestaña <strong>Rendimiento</strong>, elige <strong>CPU</strong> y busca el texto <strong>Virtualización</strong>. Debe decir <strong>Habilitado</strong>.</li>
</ol>
<div class="nota">
  <strong>Si la virtualización dice Deshabilitado</strong>
  Hay que activarla en la BIOS/UEFI del equipo. El proceso depende de la marca y el modelo, así que consulta el manual del fabricante. En un equipo de trabajo, pide apoyo a tu área de TI y no cambies la BIOS por tu cuenta.
</div>
<div class="nota">
  <strong>Ediciones de Windows</strong>
  La página oficial menciona las ediciones Pro, Enterprise y Education. Para lo que necesitamos (contenedores de Linux), Docker indica que las ediciones Home y Education también pueden ejecutarlos. Si tienes Windows Home y algo no funciona, consulta la sección de requisitos en docs.docker.com.
</div>

<h4>1.2 Revisar la licencia</h4>
<p>Docker Desktop es gratuito para uso personal, educativo y para pequeñas empresas. Según su página oficial, el uso comercial en empresas grandes (más de 250 empleados o más de 10 millones de dólares de ingresos anuales) requiere una suscripción de pago. Si es tu equipo de trabajo, confirma con tu área de TI antes de instalarlo.</p>

<h4>1.3 Descargar el instalador</h4>
<ol>
  <li>Abre tu navegador y entra a <strong>docs.docker.com/desktop/setup/install/windows-install</strong>. Es la página oficial.</li>
  <li>Elige <strong>Docker Desktop for Windows - x86_64</strong>. La versión Arm es solo para equipos con procesador Arm, que se reconocen porque en "Tipo de sistema" dice "procesador basado en ARM".</li>
  <li>Espera a que termine la descarga. El archivo se llama <code>Docker Desktop Installer.exe</code> y se guarda en <strong>Descargas</strong>.</li>
</ol>
<div class="aviso">
  <strong>Descarga solo desde la página oficial de Docker</strong>
  Es la misma regla de seguridad del Módulo 2 del nivel básico: no uses sitios de terceros.
</div>

<h4>1.4 Instalar</h4>
<ol>
  <li>Haz doble clic en <code>Docker Desktop Installer.exe</code>.</li>
  <li>Si Windows pregunta si permites cambios en el equipo, elige <strong>Sí</strong>.</li>
  <li>En la pantalla de configuración deja marcada la opción de usar <strong>WSL 2</strong> en lugar de Hyper-V (es la recomendada y viene seleccionada).</li>
  <li>Presiona <strong>OK</strong> y espera a que termine la instalación. Puede tardar varios minutos.</li>
  <li>Presiona <strong>Close</strong> o <strong>Cerrar</strong>. Si el instalador te pide cerrar sesión o reiniciar, hazlo.</li>
</ol>
<p>El instalador por usuario, que es el recomendado, no necesita permisos de administrador para instalarse ni para actualizarse.</p>

<h4>1.5 Primer inicio</h4>
<ol>
  <li>Abre <strong>Docker Desktop</strong> desde el menú Inicio.</li>
  <li>Acepta el acuerdo de servicio cuando aparezca.</li>
  <li>Si te pide iniciar sesión o crear una cuenta, comprueba si hay una opción para omitirlo. Para este laboratorio no es necesaria una cuenta.</li>
  <li>Espera a que el programa termine de iniciar el motor. Cuando esté listo, en la ventana verás que está en ejecución (running).</li>
</ol>

<h4>1.6 Comprobar que funciona</h4>
<p>Abre PowerShell y ejecuta:</p>
<pre><code>docker --version
docker run hello-world</code></pre>
<p>El primer comando muestra la versión instalada. El segundo descarga una imagen de prueba muy pequeña y la ejecuta. Si todo está bien, verás un mensaje que empieza con <code>Hello from Docker!</code>. Si lo ves, Docker está listo.</p>

<h4>1.7 Problemas comunes</h4>
<table>
  <thead><tr><th>Problema</th><th>Qué hacer</th></tr></thead>
  <tbody>
    <tr><td>Docker dice que WSL 2 no está instalado o está desactualizado.</td><td>En PowerShell ejecuta <code>wsl --update</code> y luego <code>wsl --status</code>. Docker pide WSL 2.1.5 o superior. Reinicia Docker Desktop.</td></tr>
    <tr><td>Docker dice que la virtualización no está habilitada.</td><td>Actívala en la BIOS/UEFI (ver 1.1) o pide apoyo a TI.</td></tr>
    <tr><td>Docker se queda en "Starting" mucho tiempo.</td><td>Cierra Docker Desktop, reinicia el equipo y ábrelo de nuevo. Cierra otros programas pesados para liberar memoria.</td></tr>
    <tr><td>PowerShell dice que <code>docker</code> no se reconoce.</td><td>Cierra y vuelve a abrir PowerShell. Si sigue igual, reinicia sesión de Windows o el equipo.</td></tr>
    <tr><td>El instalador falla o el antivirus lo bloquea.</td><td>Confirma que lo descargaste del sitio oficial y pide apoyo a TI si es un equipo administrado.</td></tr>
    <tr><td>El equipo se pone muy lento.</td><td>Docker usa memoria. Cuando termines de practicar, cierra Docker Desktop desde el icono de la bandeja del sistema.</td></tr>
  </tbody>
</table>
<div class="nota">
  <strong>La guía oficial siempre es la referencia</strong>
  Los requisitos y los nombres de los menús pueden cambiar entre versiones. Si algo no coincide, revisa docs.docker.com, que se mantiene actualizada.
</div>

<h3>Paso 2. Descargar y ejecutar Juice Shop</h3>
<p>Abre PowerShell y ejecuta:</p>
<pre><code>docker pull bkimminich/juice-shop
docker run -d -p 127.0.0.1:3000:3000 --name juiceshop bkimminich/juice-shop</code></pre>
<ul>
  <li><code>-p 127.0.0.1:3000:3000</code> hace que solo tu equipo pueda entrar.</li>
  <li><code>--name juiceshop</code> le pone un nombre fácil de recordar.</li>
</ul>

<h3>Paso 3. Abrir la tienda</h3>
<p>En tu navegador entra a <code>http://localhost:3000</code>. Verás la tienda de jugos.</p>

<h3>Paso 4. Detener y volver a iniciar</h3>
<pre><code>docker stop juiceshop
docker start juiceshop</code></pre>
<p>Para borrarlo por completo: <code>docker rm -f juiceshop</code>.</p>

<div class="nota">
  <strong>Consulta la guía oficial</strong>
  Si algún paso no coincide, revisa la guía oficial en <strong>pwning.owasp-juice.shop</strong>, que se mantiene al día.
</div>

<h3>Primeras actividades sugeridas</h3>
<ol>
  <li>Explora la tienda como cualquier usuario. Registra una cuenta con datos inventados.</li>
  <li>Busca el tablero de puntuación (<em>Score Board</em>) en la ayuda de la guía y observa los retos organizados por categoría de OWASP.</li>
  <li>Intenta un reto de XSS reflejado sencillo y observa cómo el sitio muestra tu texto.</li>
  <li>Cuando termines, detén el contenedor.</li>
</ol>

<h2>6. Ejercicios</h2>
<ol>
  <li>Reescribe esta consulta de forma segura: <code>"DELETE FROM pedidos WHERE id = " + id</code>.</li>
  <li>Explica en qué se diferencian <code>th:text</code> y <code>th:utext</code>.</li>
  <li>Describe con tus palabras por qué un token anti-CSRF detiene el ataque.</li>
  <li>Instala el laboratorio y confirma que solo se abre desde <code>localhost</code>.</li>
</ol>
`,
  quiz: [
    {
      p: "¿Cuál es la defensa principal contra la inyección SQL?",
      o: ["Consultas parametrizadas (PreparedStatement)", "Usar contraseñas largas", "Ocultar la base de datos", "Instalar un antivirus"],
      c: 0,
      e: "Separan los datos de las instrucciones."
    },
    {
      p: "¿Qué hace la entrada ' OR '1'='1 en una consulta vulnerable?",
      o: ["Hace que la condición sea siempre verdadera y devuelve todos los registros", "Cifra los datos", "No hace nada", "Apaga la base de datos"],
      c: 0,
      e: "Cambia la lógica de la consulta."
    },
    {
      p: "Usas JPA pero construyes la consulta concatenando texto del usuario. ¿Es seguro?",
      o: ["Sí, JPA siempre protege", "No, concatenar vuelve a abrir el riesgo de inyección", "Solo si usas minúsculas", "Solo en Windows"],
      c: 1,
      e: "Las herramientas protegen cuando usas parámetros."
    },
    {
      p: "¿Qué es el XSS?",
      o: ["Que el navegador ejecute como código un texto no protegido", "Un tipo de virus de Windows", "Una forma de cifrar datos", "Un protocolo de red"],
      c: 0,
      e: "El código se ejecuta en el navegador de otra persona."
    },
    {
      p: "¿Cuál es la defensa principal contra XSS?",
      o: ["Codificar la salida", "Desactivar el navegador", "Quitar las contraseñas", "Usar HTTP"],
      c: 0,
      e: "Valida lo que entra, pero codifica siempre lo que sale."
    },
    {
      p: "En Thymeleaf, ¿qué atributo inserta contenido sin codificarlo y es peligroso?",
      o: ["th:text", "th:utext", "th:id", "th:href"],
      c: 1,
      e: "th:text codifica; th:utext no."
    },
    {
      p: "¿Qué hace una cookie con la marca HttpOnly?",
      o: ["Impide que el JavaScript de la página la lea", "La borra al cerrar", "Hace la web más rápida", "La cifra en el disco"],
      c: 0,
      e: "Dificulta robar la sesión mediante XSS."
    },
    {
      p: "¿En qué consiste un ataque CSRF?",
      o: ["Hacer que el navegador de alguien con sesión iniciada envíe una petición sin que lo sepa", "Adivinar contraseñas", "Saturar un servidor", "Robar un disco duro"],
      c: 0,
      e: "Se aprovecha de que el navegador manda la cookie automáticamente."
    },
    {
      p: "¿Qué defensa detiene el CSRF?",
      o: ["Un token anti-CSRF que el atacante no puede conocer", "Cambiar el color de la página", "Cerrar los puertos", "Un antivirus"],
      c: 0,
      e: "Spring Security lo activa por defecto en apps con formularios."
    },
    {
      p: "¿Cómo debe ejecutarse un laboratorio como Juice Shop?",
      o: ["Expuesto a internet para que otros lo prueben", "Solo accesible desde localhost en tu equipo", "En el servidor de producción", "En la red de tu empresa sin avisar"],
      c: 1,
      e: "Tiene fallos intencionales y nunca debe exponerse."
    }
  ]
};
