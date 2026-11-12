CURSO.contenido.a06 = {
  html: `
<p>Las herramientas automáticas del módulo anterior encuentran muchos fallos, pero no todos. Las <strong>pruebas de seguridad</strong> son el complemento: comprobar con intención que el sistema resiste cuando alguien intenta usarlo mal. Este módulo es especialmente útil para perfiles de QA y de desarrollo.</p>

<h2>1. Prueba funcional y prueba de seguridad</h2>
<div class="analogia">
  <strong>Analogía: probar una puerta</strong>
  La prueba funcional comprueba que la puerta <em>se abre con la llave correcta</em>. La prueba de seguridad comprueba que <em>no se abre sin llave, ni con una horquilla, ni empujando fuerte, ni entrando por la ventana de al lado</em>.
</div>
<table>
  <thead><tr><th></th><th>Prueba funcional</th><th>Prueba de seguridad</th></tr></thead>
  <tbody>
    <tr><td>Pregunta</td><td>¿Hace lo que debe?</td><td>¿Evita hacer lo que no debe?</td></tr>
    <tr><td>Datos de entrada</td><td>Válidos y esperados.</td><td>Inesperados, extremos y maliciosos.</td></tr>
    <tr><td>Actor</td><td>Un usuario normal.</td><td>Un usuario que intenta abusar.</td></tr>
    <tr><td>Ejemplo</td><td>Un cliente ve su pedido.</td><td>Un cliente intenta ver el pedido de otro.</td></tr>
  </tbody>
</table>

<h2>2. Antes de probar: autorización y alcance</h2>
<div class="aviso legal">
  <strong>Probar un sistema sin permiso puede ser un delito</strong>
  Aunque tu intención sea buena. Las pruebas de seguridad requieren autorización clara, por escrito, de quien es dueño del sistema.
</div>
<p>Una autorización seria define:</p>
<table>
  <thead><tr><th>Elemento</th><th>Qué debe aclarar</th></tr></thead>
  <tbody>
    <tr><td>Alcance (scope)</td><td>Qué sistemas, direcciones y entornos se pueden probar y cuáles no.</td></tr>
    <tr><td>Técnicas permitidas</td><td>Qué tipos de prueba se aceptan. Por ejemplo, si se permiten pruebas de saturación.</td></tr>
    <tr><td>Fechas y horarios</td><td>Cuándo se puede probar.</td></tr>
    <tr><td>Contactos</td><td>A quién avisar si algo se rompe o se encuentra algo grave.</td></tr>
    <tr><td>Datos</td><td>Qué datos se pueden tocar y cómo se tratarán los hallazgos.</td></tr>
    <tr><td>Entorno</td><td>Preferentemente uno de pruebas, con datos ficticios, no producción.</td></tr>
  </tbody>
</table>
<div class="nota">
  <strong>Regla práctica</strong>
  Si no estás seguro de que algo está dentro del alcance, no lo pruebes y pregunta primero.
</div>

<h2>3. Guías de referencia</h2>
<ul>
  <li><strong>OWASP Web Security Testing Guide (WSTG):</strong> guía detallada de qué probar en aplicaciones web y cómo.</li>
  <li><strong>OWASP ASVS:</strong> lista de requisitos de seguridad verificables, útil como lista de comprobación.</li>
  <li><strong>OWASP API Security Top 10:</strong> riesgos específicos de APIs (módulo de APIs).</li>
  <li><strong>OWASP Top 10:2025:</strong> los riesgos más comunes.</li>
</ul>
<p>No hace falta inventar los casos de prueba desde cero: estas guías los organizan por tema.</p>

<h2>4. Proceso de una prueba de seguridad</h2>
<ol>
  <li><strong>Entender el sistema:</strong> qué hace, qué datos maneja, quién lo usa.</li>
  <li><strong>Mapear la superficie de ataque:</strong> páginas, endpoints, formularios, parámetros, roles, archivos que se suben.</li>
  <li><strong>Pensar como atacante:</strong> usa el modelado de amenazas para escoger qué probar (STRIDE).</li>
  <li><strong>Probar:</strong> primero lo automático, después lo manual en los puntos de más riesgo.</li>
  <li><strong>Verificar los hallazgos:</strong> descartar falsos positivos.</li>
  <li><strong>Reportar</strong> con claridad.</li>
  <li><strong>Volver a probar</strong> después de la corrección.</li>
</ol>

<h2>5. Herramientas habituales</h2>
<table>
  <thead><tr><th>Herramienta</th><th>Para qué</th></tr></thead>
  <tbody>
    <tr><td>Herramientas de desarrollo del navegador (F12)</td><td>Ver peticiones, cookies, cabeceras y almacenamiento local.</td></tr>
    <tr><td>OWASP ZAP</td><td>Proxy de interceptación y escáner gratuito de código abierto.</td></tr>
    <tr><td>Burp Suite (edición Community)</td><td>Proxy de interceptación muy usado.</td></tr>
    <tr><td>Postman o curl</td><td>Enviar peticiones a mano a una API, con distintos tokens y datos.</td></tr>
    <tr><td>Nmap</td><td>Descubrir puertos y servicios abiertos de equipos que tengas autorización para analizar.</td></tr>
    <tr><td>JUnit con Spring Security Test</td><td>Pruebas automáticas de autenticación y autorización dentro del código.</td></tr>
  </tbody>
</table>
<div class="analogia">
  <strong>Analogía: el proxy como intérprete en una conversación</strong>
  Un proxy de interceptación se pone entre tu navegador y el sitio. Ve todo lo que se dicen, y puede detener un mensaje, cambiarlo y enviarlo modificado, para comprobar cómo reacciona el sistema.
</div>

<h2>6. Pruebas manuales que cualquiera puede empezar a hacer</h2>
<p>Con el navegador y las herramientas de desarrollo (tecla F12) ya puedes revisar mucho. Hazlo solo en sistemas propios, de práctica o autorizados.</p>
<table>
  <thead><tr><th>Prueba</th><th>Resultado esperado</th><th>Si falla, ¿qué sugiere?</th></tr></thead>
  <tbody>
    <tr><td>Acceder a una página protegida sin iniciar sesión (escribiendo la dirección).</td><td>Redirige al login o devuelve 401.</td><td>Falta autenticación.</td></tr>
    <tr><td>Con un usuario normal, escribir la dirección de una página de administrador.</td><td>Acceso denegado (403).</td><td>Control de acceso roto.</td></tr>
    <tr><td>Cambiar el número del pedido en la dirección por el de otra persona.</td><td>403 o 404.</td><td>IDOR / BOLA.</td></tr>
    <tr><td>Cerrar sesión y usar el botón "Atrás" o reutilizar una petición.</td><td>La sesión ya no sirve.</td><td>Sesión no invalidada.</td></tr>
    <tr><td>Escribir una comilla simple (') en un campo de búsqueda.</td><td>Se maneja sin error y sin detalles internos.</td><td>Posible inyección o mal manejo de errores.</td></tr>
    <tr><td>Escribir texto muy largo o caracteres especiales en un campo.</td><td>Se rechaza o se limita de forma controlada.</td><td>Falta validación de longitud.</td></tr>
    <tr><td>Enviar un formulario con campos adicionales (por ejemplo, "rol").</td><td>Los campos extra se ignoran o se rechazan.</td><td>Asignación masiva.</td></tr>
    <tr><td>Revisar las cookies de sesión en F12, pestaña Aplicación o Almacenamiento.</td><td>Marcadas como HttpOnly, Secure y SameSite.</td><td>Cookies poco protegidas.</td></tr>
    <tr><td>Provocar un error (dirección que no existe, dato mal formado).</td><td>Mensaje genérico, sin rastros de código ni rutas.</td><td>Revelación de información.</td></tr>
    <tr><td>Repetir muchas veces un inicio de sesión fallido.</td><td>Se limita o bloquea temporalmente.</td><td>Sin protección contra fuerza bruta.</td></tr>
    <tr><td>Revisar el código fuente y las peticiones en busca de claves o datos sensibles.</td><td>No hay secretos visibles.</td><td>Secretos expuestos en el cliente.</td></tr>
  </tbody>
</table>
<div class="nota">
  <strong>Para QA</strong>
  Estas pruebas encajan con tu trabajo habitual: son casos de prueba negativos. Puedes agregarlos a tu plan de pruebas y al de regresión.
</div>

<h2>7. Cabeceras de seguridad HTTP</h2>
<p>Son instrucciones que el servidor envía al navegador para que se proteja mejor.</p>
<table>
  <thead><tr><th>Cabecera</th><th>Para qué sirve</th></tr></thead>
  <tbody>
    <tr><td><code>Strict-Transport-Security</code> (HSTS)</td><td>Obliga al navegador a usar siempre HTTPS con ese sitio.</td></tr>
    <tr><td><code>Content-Security-Policy</code> (CSP)</td><td>Define qué orígenes pueden cargar scripts, imágenes y otros recursos. Reduce el impacto de XSS.</td></tr>
    <tr><td><code>X-Content-Type-Options: nosniff</code></td><td>Evita que el navegador "adivine" el tipo de un archivo.</td></tr>
    <tr><td><code>X-Frame-Options</code> o <code>frame-ancestors</code> (en CSP)</td><td>Impide que otro sitio muestre tu página dentro de un marco (clickjacking).</td></tr>
    <tr><td><code>Referrer-Policy</code></td><td>Controla cuánta información de origen se envía al navegar a otro sitio.</td></tr>
    <tr><td><code>Permissions-Policy</code></td><td>Limita funciones del navegador como cámara o ubicación.</td></tr>
  </tbody>
</table>

<h3>Revisar las cabeceras de un sitio de pruebas</h3>
<p>En PowerShell, <code>curl</code> es un alias de otro comando. Usa <code>curl.exe</code> para invocar el programa real:</p>
<pre><code>curl.exe -I http://localhost:3000</code></pre>
<p>La opción <code>-I</code> muestra solo las cabeceras de la respuesta. Compáralas con la tabla. Spring Security agrega varias de estas cabeceras por defecto; la CSP y HSTS normalmente se configuran a propósito.</p>
<p>Un resumen de cómo revisar las cookies: en F12, pestaña <strong>Application</strong> (Chrome o Edge) o <strong>Storage</strong> (Firefox), apartado <strong>Cookies</strong>. Observa las columnas <em>HttpOnly</em>, <em>Secure</em> y <em>SameSite</em>.</p>

<h2>8. OWASP ZAP</h2>
<p><strong>ZAP</strong> (Zed Attack Proxy) es una herramienta gratuita de código abierto. Funciona como proxy entre tu navegador y la aplicación y puede analizarla de forma pasiva (solo observando) o activa (enviando pruebas de ataque).</p>

<h3>Conceptos clave</h3>
<table>
  <thead><tr><th>Concepto</th><th>Significado</th></tr></thead>
  <tbody>
    <tr><td>Proxy</td><td>ZAP ve y puede modificar el tráfico entre el navegador y el sitio.</td></tr>
    <tr><td>Spider</td><td>Recorre la aplicación siguiendo enlaces para descubrir páginas.</td></tr>
    <tr><td>Escaneo pasivo</td><td>Analiza el tráfico que ya pasa, sin enviar nada nuevo. Es seguro.</td></tr>
    <tr><td>Escaneo activo</td><td>Envía peticiones de prueba de ataque. Puede modificar datos y saturar un servicio.</td></tr>
    <tr><td>Contexto</td><td>Define qué parte del sitio está dentro del alcance de la prueba.</td></tr>
    <tr><td>Alertas</td><td>Los hallazgos, con nivel de riesgo (alto, medio, bajo, informativo) y confianza.</td></tr>
  </tbody>
</table>
<div class="aviso">
  <strong>El escaneo activo es agresivo</strong>
  Puede crear usuarios, enviar formularios, llenar bases de datos y tumbar servicios frágiles. Úsalo solo en un entorno de pruebas propio o autorizado, nunca en producción.
</div>

<h3>Instalar ZAP en Windows</h3>
<ol>
  <li>Entra a <strong>zaproxy.org/download</strong>, que es la página oficial.</li>
  <li>Descarga <strong>Windows (64) Installer</strong>. Pesa unos 244 MB.</li>
  <li>La página oficial avisa que el navegador o Windows pueden marcar el archivo como peligroso porque los instaladores de ZAP no están firmados. Si lo descargaste de esa página oficial, puedes elegir conservar el archivo y ejecutarlo de todas formas.</li>
  <li>Comprueba que tienes <strong>Java 17 o superior</strong>: la versión de Windows lo necesita. Si seguiste el Módulo 2 del primer curso, tu JDK debería servir. Verifícalo con <code>java -version</code> en PowerShell.</li>
  <li>Ejecuta el instalador y acepta las opciones recomendadas.</li>
  <li>Abre ZAP desde el menú Inicio.</li>
  <li>La primera vez te preguntará si quieres guardar la sesión. Para practicar, puedes elegir no guardarla.</li>
  <li>Si te sugiere actualizar complementos, acéptalo. Es normal.</li>
</ol>
<div class="nota">
  <strong>La versión puede ser más nueva</strong>
  Al escribir este módulo, la versión vigente era la 2.17.0. Los menús y pantallas pueden cambiar un poco en versiones posteriores.
</div>

<h3>Laboratorio: probar Juice Shop con ZAP</h3>
<div class="aviso legal">
  <strong>Solo contra tu propio Juice Shop</strong>
  Usa el laboratorio que instalaste en el nivel intermedio, accesible solo desde tu equipo en <code>http://localhost:3000</code>. No lo uses contra sitios de otras personas.
</div>
<ol>
  <li><strong>Arranca Juice Shop.</strong> Si lo creaste con el nombre <code>juiceshop</code>, en PowerShell ejecuta <code>docker start juiceshop</code> y abre <code>http://localhost:3000</code> para comprobar que funciona.</li>
  <li><strong>Abre ZAP</strong> y, en la barra superior, elige el modo <strong>Protected</strong> (protegido). Este modo evita que ZAP ataque direcciones fuera del alcance definido.</li>
  <li>En la pestaña <strong>Quick Start</strong>, elige <strong>Manual Explore</strong>. Escribe <code>http://localhost:3000</code> y presiona el botón para lanzar el navegador desde ZAP.</li>
  <li><strong>Navega por la tienda</strong> como usuario normal: busca productos, crea una cuenta con datos inventados, inicia sesión, agrega productos al carrito. Mientras tanto, ZAP registra el tráfico y analiza de forma pasiva.</li>
  <li>En el panel de sitios, haz clic derecho sobre <code>http://localhost:3000</code> y elige <strong>Include in Context</strong> (incluir en el contexto) para definirlo como alcance.</li>
  <li>Revisa la pestaña <strong>Alerts</strong> (alertas). Verás los hallazgos pasivos: cabeceras faltantes, cookies sin marcas, comentarios con información, etc.</li>
  <li>Cuando quieras probar más a fondo, haz clic derecho sobre el sitio y busca <strong>Attack</strong>, luego <strong>Active Scan</strong>. Es el escaneo activo, que puede tardar varios minutos.</li>
  <li>Al terminar, revisa las alertas por nivel de riesgo. Para cada una, lee la descripción, la solución sugerida y las referencias.</li>
  <li>Genera un informe desde el menú <strong>Report</strong> (reporte) y revisa el resultado.</li>
  <li>Detén Juice Shop con <code>docker stop juiceshop</code> y cierra ZAP al terminar.</li>
</ol>
<div class="nota">
  <strong>Los nombres de botones pueden variar</strong>
  Si algún menú no coincide con tu versión, consulta la ayuda integrada o la documentación oficial en zaproxy.org.
</div>

<h3>Cómo leer las alertas</h3>
<ul>
  <li><strong>Riesgo:</strong> qué tan grave sería si es real.</li>
  <li><strong>Confianza:</strong> qué tan seguro está ZAP de que es real. Una alerta de confianza baja suele requerir verificación manual.</li>
  <li><strong>Falsos positivos:</strong> hallazgos que no son reales. Se marcan como tales para que no se repitan.</li>
  <li><strong>No te quedes con la herramienta:</strong> los hallazgos importantes se confirman manualmente, para saber si realmente se pueden explotar y qué impacto tienen.</li>
</ul>

<h2>9. ZAP en el pipeline: el escaneo base (baseline)</h2>
<p>ZAP ofrece una imagen de Docker con scripts listos. El <strong>baseline scan</strong> recorre el sitio un tiempo corto (por defecto un minuto), espera a que termine el análisis pasivo y reporta. Según la documentación oficial, <strong>no realiza ataques activos</strong> y está pensado para ejecutarse en CI/CD.</p>

<h3>Práctica con Docker y Juice Shop</h3>
<p>Para que ZAP, dentro de un contenedor, pueda ver a Juice Shop, ambos se ponen en una red de Docker propia:</p>
<pre><code>docker network create lab-seguridad

docker run -d --rm --name juice-lab --network lab-seguridad bkimminich/juice-shop

docker run --rm --network lab-seguridad -v "$(pwd):/zap/wrk/:rw" -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t http://juice-lab:3000 -r informe.html</code></pre>
<ul>
  <li>La primera línea crea una red aislada.</li>
  <li>La segunda arranca Juice Shop dentro de esa red, sin publicar puertos hacia fuera.</li>
  <li>La tercera ejecuta ZAP en la misma red, apuntando a <code>http://juice-lab:3000</code>, y guarda el informe en tu carpeta actual (<code>informe.html</code>).</li>
  <li>La imagen de ZAP es grande; la primera descarga puede tardar.</li>
</ul>
<p>Al terminar, limpia:</p>
<pre><code>docker stop juice-lab
docker network rm lab-seguridad</code></pre>
<p>Abre <code>informe.html</code> en el navegador para ver los resultados.</p>

<h3>Opciones útiles del script</h3>
<table>
  <thead><tr><th>Opción</th><th>Para qué</th></tr></thead>
  <tbody>
    <tr><td><code>-t</code></td><td>Dirección del objetivo.</td></tr>
    <tr><td><code>-r informe.html</code></td><td>Guardar un informe en HTML.</td></tr>
    <tr><td><code>-g archivo.conf</code></td><td>Generar un archivo de configuración con todas las reglas.</td></tr>
    <tr><td><code>-c archivo.conf</code></td><td>Usar la configuración para que cada regla sea FAIL (falla), WARN (avisa) o IGNORE (ignora).</td></tr>
    <tr><td><code>-I</code></td><td>No devolver error cuando solo haya advertencias.</td></tr>
    <tr><td><code>-m minutos</code></td><td>Cuánto tiempo recorrer el sitio.</td></tr>
  </tbody>
</table>
<p>Con un archivo de configuración puedes decidir qué hallazgos bloquean el pipeline (FAIL) y cuáles solo avisan, aplicando la política que definiste en el módulo anterior.</p>
<div class="aviso legal">
  <strong>Que sea pasivo no lo vuelve libre de permisos</strong>
  Aunque la documentación indique que este escaneo se puede usar incluso contra producción, necesitas autorización del dueño del sistema para escanearlo.
</div>

<h2>10. Probar APIs</h2>
<p>Las APIs no tienen pantallas, así que la prueba se centra en las peticiones.</p>
<ul>
  <li>Si la API tiene una descripción <strong>OpenAPI</strong> (Swagger), ZAP puede importarla y generar las peticiones, y ofrece un script de escaneo de APIs en su imagen de Docker.</li>
  <li><strong>Postman</strong> sirve para crear colecciones con distintos usuarios y tokens y repetirlas.</li>
</ul>

<h3>Matriz de autorización</h3>
<p>Una de las pruebas más valiosas: crear una tabla de <strong>roles contra operaciones</strong> y probar cada celda, no solo las permitidas, sino sobre todo las que deben denegarse.</p>
<table>
  <thead><tr><th>Petición</th><th>Sin token</th><th>Cliente A</th><th>Cliente B (dato de A)</th><th>Soporte</th><th>Admin</th></tr></thead>
  <tbody>
    <tr><td>GET /pedidos/{id de A}</td><td>401</td><td>200</td><td>403 o 404</td><td>200</td><td>200</td></tr>
    <tr><td>POST /pedidos</td><td>401</td><td>201</td><td>201</td><td>403</td><td>201</td></tr>
    <tr><td>DELETE /pedidos/{id}</td><td>401</td><td>403</td><td>403</td><td>403</td><td>204</td></tr>
    <tr><td>GET /admin/usuarios</td><td>401</td><td>403</td><td>403</td><td>403</td><td>200</td></tr>
  </tbody>
</table>
<p>Los valores son un ejemplo. Los reales dependen de las reglas de tu sistema.</p>

<h2>11. Pruebas de seguridad automatizadas en Java</h2>
<p>Muchas de estas comprobaciones pueden formar parte de las pruebas automáticas del proyecto. Así, si alguien rompe un control de acceso sin querer, la construcción falla.</p>
<p>Con la dependencia <code>spring-security-test</code>, un ejemplo con <code>MockMvc</code>:</p>
<pre><code>import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PedidoController.class)
@Import(SeguridadConfig.class)
class PedidoSeguridadTest {

    @Autowired
    MockMvc mvc;

    @MockBean
    JwtDecoder jwtDecoder;   // evita que la prueba intente contactar al emisor real

    @Test
    void sinToken_devuelve401() throws Exception {
        mvc.perform(get("/pedidos/10"))
           .andExpect(status().isUnauthorized());
    }

    @Test
    void tokenSinScopeNecesario_devuelve403() throws Exception {
        mvc.perform(get("/pedidos")
                .with(jwt().authorities(new SimpleGrantedAuthority("SCOPE_otro"))))
           .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = "USER")
    void usuarioNormal_noEntraAAdmin() throws Exception {
        mvc.perform(get("/admin/usuarios"))
           .andExpect(status().isForbidden());
    }
}</code></pre>
<div class="nota">
  <strong>Ajusta a tu proyecto</strong>
  Los nombres de clases, anotaciones y configuración de pruebas de Spring cambian entre versiones. Compáralos con la documentación de Spring Security Test de tu versión.
</div>
<p>Pruebas de este tipo conviene tener, como mínimo, para: acceso sin autenticar, acceso con permisos insuficientes, acceso a datos de otro usuario y campos que no deben poder modificarse.</p>

<h2>12. Pruebas de lógica de negocio y de abuso</h2>
<p>Las herramientas automáticas casi nunca encuentran fallos de lógica. Hay que pensarlos como casos de abuso:</p>
<table>
  <thead><tr><th>Escenario</th><th>Pregunta a probar</th></tr></thead>
  <tbody>
    <tr><td>Cupón de un solo uso</td><td>¿Se puede usar dos veces enviando dos peticiones a la vez?</td></tr>
    <tr><td>Carrito de compras</td><td>¿Se aceptan cantidades negativas o precios enviados por el cliente?</td></tr>
    <tr><td>Transferencias</td><td>¿Se puede transferir más del saldo si dos peticiones llegan casi simultáneas?</td></tr>
    <tr><td>Flujos de varios pasos</td><td>¿Se puede saltar un paso (por ejemplo, ir directo a "confirmar" sin pagar)?</td></tr>
    <tr><td>Recuperación de contraseña</td><td>¿El enlace caduca? ¿Se puede reutilizar? ¿Revela si un correo existe?</td></tr>
    <tr><td>Registro masivo</td><td>¿Se puede crear miles de cuentas automáticamente?</td></tr>
  </tbody>
</table>

<h2>13. Reportar un hallazgo</h2>
<p>Un buen reporte permite que el equipo entienda, reproduzca y corrija sin discusión. Estructura recomendada:</p>
<table>
  <thead><tr><th>Sección</th><th>Contenido</th></tr></thead>
  <tbody>
    <tr><td>Título</td><td>Corto y concreto.</td></tr>
    <tr><td>Gravedad</td><td>Crítica, alta, media o baja, con la razón (riesgo o CVSS).</td></tr>
    <tr><td>Descripción</td><td>Qué ocurre y dónde.</td></tr>
    <tr><td>Pasos para reproducir</td><td>Numerados, con los datos usados.</td></tr>
    <tr><td>Evidencia</td><td>Capturas, peticiones y respuestas (sin datos reales).</td></tr>
    <tr><td>Impacto</td><td>Qué podría lograr un atacante.</td></tr>
    <tr><td>Recomendación</td><td>Cómo corregirlo.</td></tr>
    <tr><td>Referencias</td><td>CWE, categoría del OWASP Top 10.</td></tr>
  </tbody>
</table>
<div class="ejemplo">
  <strong>Ejemplo de reporte (entorno de pruebas)</strong>
  <ul>
    <li><strong>Título:</strong> Cualquier cliente puede ver pedidos de otros usuarios (BOLA).</li>
    <li><strong>Gravedad:</strong> Alta. Expone datos personales de todos los clientes.</li>
    <li><strong>Pasos:</strong> 1) Iniciar sesión como cliente A. 2) Consultar GET /pedidos/101, propio. 3) Cambiar el número a 102 (pedido del cliente B). 4) La API responde 200 con los datos del cliente B.</li>
    <li><strong>Impacto:</strong> Acceso no autorizado a datos de otros clientes.</li>
    <li><strong>Recomendación:</strong> Comprobar en el servidor que el pedido pertenece al usuario autenticado; devolver 403 o 404 en caso contrario.</li>
    <li><strong>Referencia:</strong> OWASP API1:2023, Broken Object Level Authorization.</li>
  </ul>
</div>
<p>Escribe el reporte sin culpar a personas. El objetivo es mejorar el sistema.</p>

<h2>14. Divulgación responsable</h2>
<p>Si encuentras un fallo en un sistema que no es tuyo y que no estabas autorizado a probar, lo correcto es:</p>
<ol>
  <li>No seguir explotándolo ni acceder a datos de otras personas.</li>
  <li>Reportarlo de forma privada al responsable (muchos sitios publican un archivo <code>security.txt</code> en <code>/.well-known/security.txt</code> con el contacto) o a través de su programa de recompensas, si lo tienen.</li>
  <li>Dar tiempo razonable para corregirlo antes de hablar públicamente.</li>
</ol>
<p>Si tu organización publica servicios, considera crear su propio <code>security.txt</code> y una política para recibir reportes.</p>

<h2>15. Errores comunes</h2>
<ul>
  <li>Ejecutar un escaneo activo contra producción o contra sistemas de terceros.</li>
  <li>Creer que un informe limpio de la herramienta significa que no hay fallos.</li>
  <li>Entregar el informe de la herramienta sin verificar ni priorizar.</li>
  <li>Probar solo con datos "felices" y nunca con abuso.</li>
  <li>Probar una vez y no repetir tras cambios importantes.</li>
  <li>Reportar sin pasos de reproducción.</li>
</ul>

<h2>16. Ejercicios</h2>
<ol>
  <li>Escribe cinco casos de prueba negativos de seguridad para el inicio de sesión de una aplicación.</li>
  <li>Haz el laboratorio de ZAP contra tu propio Juice Shop y elige una alerta de riesgo medio o alto: léela, explica qué significa y cómo la corregirías.</li>
  <li>Revisa con <code>curl.exe -I</code> las cabeceras de un sitio de pruebas propio y anota cuáles de la tabla faltan.</li>
  <li>Crea una matriz de autorización para tres roles y cuatro operaciones de un sistema que conozcas.</li>
  <li>Redacta el reporte de un hallazgo (real del laboratorio o inventado) siguiendo la estructura de la sección 13.</li>
  <li>Escribe, en pseudocódigo o en Java, dos pruebas automáticas de seguridad para una API tuya.</li>
</ol>
`,
  quiz: [
    {
      p: "¿Cuál es la diferencia principal entre una prueba funcional y una de seguridad?",
      o: ["La funcional comprueba que hace lo que debe; la de seguridad que evita hacer lo que no debe", "No hay diferencia", "La de seguridad solo usa datos válidos", "La funcional siempre es automática"],
      c: 0,
      e: "Es como probar que la puerta abre con llave y que no abre sin ella."
    },
    {
      p: "Antes de realizar una prueba de seguridad en un sistema, ¿qué es indispensable?",
      o: ["Tener autorización clara por escrito y un alcance definido", "Conocer a alguien del equipo", "Que el sistema esté en producción", "Usar la mayor cantidad de herramientas posible"],
      c: 0,
      e: "Probar sin permiso puede ser un delito aunque tu intención sea buena."
    },
    {
      p: "¿Qué guía de OWASP organiza qué probar y cómo en aplicaciones web?",
      o: ["Web Security Testing Guide (WSTG)", "El manual de Windows", "Las normas de tránsito", "El código penal"],
      c: 0,
      e: "Ayuda a no inventar los casos de prueba desde cero."
    },
    {
      p: "Con un usuario normal, escribes la dirección de una página de administrador y se muestra. ¿Qué indica?",
      o: ["Control de acceso roto", "Que todo está bien", "Que el navegador es lento", "Que el usuario es administrador"],
      c: 0,
      e: "Debería devolver 403."
    },
    {
      p: "En PowerShell, ¿por qué se usa curl.exe y no curl?",
      o: ["Porque curl es un alias de otro comando de PowerShell", "Porque curl no existe", "Porque curl.exe es más rápido", "Por costumbre"],
      c: 0,
      e: "curl.exe invoca el programa real."
    },
    {
      p: "¿Para qué sirve la cabecera Strict-Transport-Security (HSTS)?",
      o: ["Para obligar al navegador a usar siempre HTTPS con ese sitio", "Para cifrar el disco", "Para bloquear anuncios", "Para ocultar el servidor"],
      c: 0,
      e: "Evita que el navegador use HTTP por error o por ataque."
    },
    {
      p: "¿Qué hace un proxy de interceptación como ZAP?",
      o: ["Se coloca entre el navegador y el sitio para ver y poder modificar el tráfico", "Acelera la conexión a internet", "Reemplaza al servidor", "Cifra los correos"],
      c: 0,
      e: "Permite comprobar cómo reacciona el sistema a mensajes modificados."
    },
    {
      p: "¿Qué diferencia hay entre el escaneo pasivo y el activo de ZAP?",
      o: ["El pasivo solo observa el tráfico; el activo envía pruebas de ataque y puede modificar datos o saturar el servicio", "Son iguales", "El pasivo es más peligroso", "El activo solo funciona sin internet"],
      c: 0,
      e: "El escaneo activo solo debe usarse en entornos de prueba autorizados."
    },
    {
      p: "¿Qué requisito de Java tiene ZAP para Windows?",
      o: ["Java 17 o superior", "Ninguno", "Java 5", "Solo funciona con Python"],
      c: 0,
      e: "Según la página oficial de descarga."
    },
    {
      p: "¿Qué hace el baseline scan de ZAP?",
      o: ["Recorre el sitio un tiempo corto y analiza de forma pasiva, sin ataques activos", "Borra la base de datos", "Instala parches", "Reinicia el servidor"],
      c: 0,
      e: "Está pensado para ejecutarse en pipelines."
    },
    {
      p: "En una matriz de autorización, ¿qué celdas son las más importantes de probar?",
      o: ["Las que deben denegar el acceso", "Solo las que lo permiten", "Ninguna", "Solo las del administrador"],
      c: 0,
      e: "Los fallos aparecen cuando se permite algo que debía denegarse."
    },
    {
      p: "Un cupón de un solo uso se puede aplicar dos veces enviando dos peticiones casi simultáneas. ¿Qué tipo de problema es?",
      o: ["Un fallo de lógica de negocio (condición de carrera)", "Un error de ortografía", "Un problema de color", "Un virus"],
      c: 0,
      e: "Las herramientas automáticas casi nunca lo encuentran; hay que probarlo a propósito."
    },
    {
      p: "Encuentras un fallo en un sitio que no es tuyo. ¿Qué es lo correcto?",
      o: ["Reportarlo de forma privada al responsable sin seguir explotándolo", "Publicarlo de inmediato en redes", "Usarlo para ver más datos", "Venderlo"],
      c: 0,
      e: "Es la divulgación responsable."
    }
  ]
};
