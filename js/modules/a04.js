CURSO.contenido.a04 = {
  html: `
<p>Las contraseñas de bases de datos, las claves de API y los certificados que usa una aplicación se llaman <strong>secretos</strong>. Son de los activos más buscados por un atacante, y los fallos al manejarlos están detrás de muchísimas filtraciones reales. Este módulo trata de cómo guardarlos, entregarlos, rotarlos y detectarlos si se escapan.</p>

<h2>1. ¿Qué es un secreto?</h2>
<table>
  <thead><tr><th>Tipo</th><th>Ejemplos</th></tr></thead>
  <tbody>
    <tr><td>Credenciales</td><td>Contraseña de la base de datos, usuario de servicio.</td></tr>
    <tr><td>Claves de API y tokens</td><td>Clave de un proveedor de correo, token de acceso personal.</td></tr>
    <tr><td>Claves criptográficas</td><td>Clave privada, clave de firma de JWT, clave de cifrado.</td></tr>
    <tr><td>Certificados privados</td><td>Archivo <code>.key</code> o <code>.p12</code> de un servicio.</td></tr>
    <tr><td>Cadenas de conexión</td><td>URL de base de datos con usuario y contraseña incluidos.</td></tr>
  </tbody>
</table>
<div class="analogia">
  <strong>Analogía: las llaves de un edificio</strong>
  Una llave maestra no se cuelga en el pasillo ni se copia para todo el mundo. Se guarda en una caja con registro de quién la toma y se cambia la cerradura si se pierde. Los secretos de una aplicación necesitan el mismo cuidado.
</div>

<h2>2. Cómo se filtran los secretos</h2>
<ul>
  <li><strong>Escritos dentro del código</strong> (hardcoded) y subidos al repositorio.</li>
  <li><strong>Archivos de configuración</strong> como <code>application.yml</code> o <code>.env</code> con valores reales que terminan en Git.</li>
  <li><strong>Historial de Git:</strong> aunque borres el secreto después, sigue en commits anteriores.</li>
  <li><strong>Imágenes de contenedor</strong> que llevan el secreto dentro de sus capas.</li>
  <li><strong>Registros (logs)</strong> y mensajes de error que imprimen el secreto.</li>
  <li><strong>Chats, tickets y capturas de pantalla</strong> donde alguien pegó una clave.</li>
  <li><strong>Pipelines de CI/CD</strong> que muestran variables en su salida.</li>
  <li><strong>Endpoints de diagnóstico</strong> expuestos, como un Actuator abierto que muestra variables de entorno.</li>
</ul>
<div class="aviso">
  <strong>Subir un secreto a un repositorio público es una emergencia inmediata</strong>
  Existen programas automáticos que rastrean repositorios públicos buscando claves, y pueden encontrarlas en muy poco tiempo. Debes asumir que cualquier secreto que haya llegado a un repositorio público ya está comprometido, aunque lo borres enseguida.
</div>

<h2>3. Jerarquía de soluciones: de mejor a peor</h2>
<table>
  <thead><tr><th>Nivel</th><th>Enfoque</th><th>Comentario</th></tr></thead>
  <tbody>
    <tr><td>1</td><td><strong>No tener secretos duraderos</strong>: identidades administradas, credenciales temporales, federación OIDC.</td><td>Lo ideal. Si no hay clave que robar, no hay clave que filtrar.</td></tr>
    <tr><td>2</td><td><strong>Gestor de secretos</strong> (Vault, Azure Key Vault, AWS Secrets Manager, Google Secret Manager).</td><td>Almacén cifrado con control de acceso, auditoría y rotación.</td></tr>
    <tr><td>3</td><td><strong>Secretos inyectados en tiempo de ejecución</strong> (variables de entorno o archivos montados) desde la plataforma.</td><td>Aceptable, con cuidados.</td></tr>
    <tr><td>4</td><td>Archivos de configuración fuera del repositorio.</td><td>Frágil: depende de que nadie lo suba por error.</td></tr>
    <tr><td>5</td><td><strong>Secretos escritos en el código o en el repositorio</strong>.</td><td>Nunca.</td></tr>
  </tbody>
</table>

<h3>Nivel 1 en detalle: identidades administradas</h3>
<p>En plataformas en la nube, una aplicación puede tener una <strong>identidad administrada</strong>: la plataforma le entrega credenciales temporales automáticamente. La aplicación llega a la base de datos o al gestor de secretos sin ninguna contraseña guardada.</p>
<div class="analogia">
  <strong>Analogía: el gafete que se renueva solo</strong>
  En lugar de darle a cada empleado una llave de por vida, el edificio le asigna un gafete que caduca cada día y se renueva solo mientras siga contratado. Si lo pierde, deja de servir pronto.
</div>

<h2>4. Variables de entorno</h2>
<p>Es la forma más sencilla de sacar un secreto del código: la aplicación lo lee del entorno donde corre.</p>
<pre><code>spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/pedidos
    username: \${DB_USER}
    password: \${DB_PASSWORD}</code></pre>
<p>El archivo ya no contiene el secreto, solo el nombre de la variable.</p>

<h3>Probarlo en Windows (PowerShell)</h3>
<pre><code>$env:DB_USER = "usuario-de-practica"
$env:DB_PASSWORD = "valor-de-practica"
./mvnw spring-boot:run</code></pre>
<p>Esas variables existen solo mientras dure esa ventana de PowerShell. Usa siempre valores de práctica, nunca contraseñas reales.</p>

<h3>Límites de las variables de entorno</h3>
<ul>
  <li>Pueden verse con comandos como <code>docker inspect</code> o desde el panel de la plataforma.</li>
  <li>Las heredan los procesos hijo.</li>
  <li>Un endpoint de Actuator mal protegido puede mostrarlas.</li>
  <li>Aparecen en volcados de memoria o en informes de fallos.</li>
  <li>No tienen rotación, auditoría ni control de quién las lee.</li>
</ul>
<p>Por eso sirven para empezar, pero para sistemas serios se prefiere un gestor de secretos.</p>

<h3>Archivos .env y .gitignore</h3>
<p>Es común guardar variables locales en un archivo <code>.env</code>. Nunca debe subirse a Git.</p>
<pre><code># .gitignore
.env
application-local.yml
*.p12
*.key</code></pre>
<p>Y en su lugar se sube un archivo de ejemplo <strong>sin valores reales</strong>:</p>
<pre><code># .env.example  (este sí se sube)
DB_USER=
DB_PASSWORD=
API_KEY_PROVEEDOR=</code></pre>
<div class="nota">
  <strong>.gitignore no protege lo que ya se subió</strong>
  Solo evita que se agreguen archivos nuevos. Si un archivo ya estaba en Git antes de añadirlo al <code>.gitignore</code>, sigue en el historial.
</div>

<h2>5. Gestores de secretos</h2>
<p>Un <strong>gestor de secretos</strong> es un servicio especializado en guardar secretos cifrados y entregarlos solo a quien tiene permiso.</p>
<table>
  <thead><tr><th>Ventaja</th><th>Qué significa</th></tr></thead>
  <tbody>
    <tr><td>Control de acceso</td><td>Políticas que dicen quién lee qué secreto.</td></tr>
    <tr><td>Auditoría</td><td>Queda registro de quién consultó cada secreto y cuándo.</td></tr>
    <tr><td>Cifrado</td><td>Los secretos se guardan cifrados.</td></tr>
    <tr><td>Rotación</td><td>Se pueden cambiar sin tocar el código.</td></tr>
    <tr><td>Versionado</td><td>Se conservan versiones por si hay que volver atrás.</td></tr>
    <tr><td>Un solo lugar</td><td>Se acaban los secretos dispersos en muchos archivos.</td></tr>
  </tbody>
</table>
<div class="analogia">
  <strong>Analogía: la bóveda del banco</strong>
  En lugar de guardar el dinero en cada sucursal en un cajón, se concentra en una bóveda con registro de entradas, guardias y llaves distintas por persona.
</div>

<h3>HashiCorp Vault</h3>
<p>Es un gestor de secretos que puedes instalar tú mismo. Además de guardar secretos estáticos, puede generar <strong>secretos dinámicos</strong>: por ejemplo, crea un usuario de base de datos temporal para una aplicación, con caducidad, y lo borra después. Si se filtra, deja de servir en poco tiempo.</p>
<p>Conceptos básicos:</p>
<ul>
  <li><strong>Motor de secretos (KV):</strong> almacén de pares clave-valor.</li>
  <li><strong>Políticas:</strong> reglas que dicen qué rutas puede leer cada identidad.</li>
  <li><strong>Métodos de autenticación:</strong> cómo se identifica una aplicación (token, Kubernetes, AppRole, nube...).</li>
  <li><strong>Leases:</strong> los secretos dinámicos tienen un plazo y se renuevan o revocan.</li>
  <li><strong>Registro de auditoría:</strong> de cada acceso.</li>
</ul>

<h3>Integración con Spring Boot (Spring Cloud Vault)</h3>
<p>Con la dependencia <code>spring-cloud-starter-vault-config</code> (y el BOM de Spring Cloud), Spring puede cargar los secretos de Vault como propiedades normales:</p>
<pre><code>spring:
  application:
    name: mi-app
  config:
    import: vault://
  cloud:
    vault:
      uri: http://127.0.0.1:8200      # en producción: HTTPS
      authentication: TOKEN
      token: \${VAULT_TOKEN}
      kv:
        enabled: true</code></pre>
<ul>
  <li><code>spring.config.import: vault://</code> es la forma actual (Config Data API) de activar la importación.</li>
  <li>Sin más configuración, Spring monta el almacén KV en <code>secret/&lt;nombre-de-la-aplicación&gt;</code>. Cada perfil activo agrega la ruta <code>secret/&lt;aplicación&gt;/&lt;perfil&gt;</code>.</li>
  <li>El token tampoco debe escribirse en el archivo: viene de una variable de entorno. En producción se prefieren métodos de autenticación propios de la plataforma, en lugar de un token fijo.</li>
  <li>Puedes usar <code>optional:vault://</code> para que la aplicación arranque aunque Vault no esté disponible (por ejemplo en desarrollo).</li>
</ul>
<p>Después, los valores se usan como cualquier propiedad:</p>
<pre><code>@Value("\${clave-bd}")
private String claveBd;</code></pre>

<h3>Azure Key Vault</h3>
<p>Es el gestor de secretos de Microsoft Azure. Guarda secretos, claves y certificados, con permisos controlados por Azure RBAC y la posibilidad de que la aplicación se autentique con una <strong>identidad administrada</strong>, sin ninguna contraseña.</p>
<p>Con la dependencia <code>spring-cloud-azure-starter-keyvault-secrets</code>:</p>
<pre><code>spring:
  cloud:
    azure:
      keyvault:
        secret:
          property-sources:
            - name: mi-vault
              endpoint: \${KEYVAULT_ENDPOINT}</code></pre>
<p>Cosas que conviene saber (según la documentación oficial de Microsoft):</p>
<ul>
  <li>Los nombres de secreto en Key Vault solo admiten letras, números y guiones (<code>0-9a-zA-Z-</code>). Un punto no está permitido. Para la propiedad <code>spring.datasource.password</code> se guarda un secreto llamado <code>spring-datasource-password</code> y Spring lo resuelve.</li>
  <li>Por defecto los secretos se refrescan cada 30 minutos (<code>refresh-interval</code>), lo que facilita la rotación.</li>
  <li>Si existe una variable de entorno con el mismo nombre, la variable tiene prioridad sobre Key Vault.</li>
  <li>La identidad de la aplicación necesita permiso de lectura sobre los secretos. Un error 403 al arrancar suele indicar que falta ese permiso.</li>
  <li>Puedes limitar qué secretos se cargan con <code>secret-keys</code>, en lugar de traer todos.</li>
</ul>
<div class="nota">
  <strong>Comprueba la versión</strong>
  Los nombres de propiedades y dependencias de Spring Cloud Vault y Spring Cloud Azure cambian entre versiones. Compáralos con la documentación de la versión que uses.
</div>

<h3>¿Cuál elegir?</h3>
<table>
  <thead><tr><th>Situación</th><th>Opción razonable</th></tr></thead>
  <tbody>
    <tr><td>Todo corre en Azure</td><td>Azure Key Vault con identidad administrada.</td></tr>
    <tr><td>Todo corre en AWS o Google Cloud</td><td>El gestor de secretos de ese proveedor.</td></tr>
    <tr><td>Varias nubes o servidores propios</td><td>HashiCorp Vault u otra solución independiente.</td></tr>
    <tr><td>Proyecto pequeño o de práctica</td><td>Variables de entorno bien manejadas, y migrar cuando crezca.</td></tr>
  </tbody>
</table>
<p>La mejor herramienta es la que tu equipo pueda operar bien. Un gestor mal configurado no ayuda.</p>

<h2>6. Rotación de secretos</h2>
<p><strong>Rotar</strong> es cambiar un secreto por uno nuevo y retirar el anterior. Hay que hacerlo:</p>
<ul>
  <li>De forma periódica, para limitar cuánto sirve un secreto robado sin que lo sepamos.</li>
  <li>Cuando alguien que lo conocía deja el equipo.</li>
  <li>Siempre que haya sospecha de filtración.</li>
</ul>

<h3>Rotar sin interrumpir el servicio</h3>
<ol>
  <li>Crear el secreto nuevo y que ambos, el viejo y el nuevo, funcionen un tiempo.</li>
  <li>Actualizar las aplicaciones para que usen el nuevo.</li>
  <li>Comprobar que nadie usa ya el viejo (revisar los registros de acceso).</li>
  <li>Revocar el viejo.</li>
</ol>
<div class="analogia">
  <strong>Analogía: cambiar la cerradura de un local abierto</strong>
  No cierras el negocio ni cambias la cerradura de golpe. Primero instalas una cerradura nueva que acepte las dos llaves, repartes las nuevas, y cuando todos las tienen anulas la llave vieja.
</div>
<div class="nota">
  <strong>Diseña para que rotar sea fácil</strong>
  Si cambiar un secreto exige reconstruir y desplegar la aplicación, nadie lo hará. Si la aplicación lo lee desde el gestor, rotar se vuelve una operación rutinaria.
</div>

<h2>7. Secretos en contenedores</h2>
<pre><code># MAL: el secreto queda en las capas de la imagen
ENV DB_PASSWORD=valor-secreto
COPY .env /app/.env</code></pre>
<ul>
  <li>Cualquiera con acceso a la imagen puede leer su historial (por ejemplo con <code>docker history</code>) y los archivos de cada capa.</li>
  <li>Los secretos se inyectan <strong>en tiempo de ejecución</strong> (variables, archivos montados, el sistema de secretos de la plataforma), no al construir la imagen.</li>
  <li>Si necesitas un secreto durante la construcción (por ejemplo, para descargar una dependencia privada), usa las funciones de secretos de compilación de Docker (BuildKit), que no quedan en la imagen final.</li>
  <li>Añade un archivo <code>.dockerignore</code> con <code>.env</code> y las claves, para que no se copien por accidente.</li>
</ul>

<h2>8. Secretos en CI/CD</h2>
<p>Los pipelines son un objetivo atractivo porque tocan muchos secretos.</p>
<ul>
  <li>Guárdalos en el almacén de secretos de la plataforma (por ejemplo, <em>Secrets</em> de GitHub Actions), no en el repositorio.</li>
  <li>Nunca los imprimas en la salida del pipeline. Aunque algunas plataformas los enmascaran, no es infalible: transformarlos (por ejemplo, en Base64) puede evitar el enmascarado.</li>
  <li>Da a cada pipeline solo los secretos que necesita y con permisos mínimos.</li>
  <li>Prefiere credenciales temporales y la federación OIDC con tu proveedor de nube, en vez de claves de larga duración guardadas en el pipeline.</li>
  <li>Los flujos que ejecutan código de colaboradores externos (por ejemplo, de forks) no deben tener acceso a secretos.</li>
  <li>Protege quién puede modificar el pipeline: quien lo edite puede usar sus secretos.</li>
</ul>

<h2>9. Detectar secretos filtrados</h2>
<p>Aunque tengas buenas prácticas, algún día alguien cometerá un error. Por eso se instalan detectores automáticos.</p>

<h3>Capas de detección</h3>
<table>
  <thead><tr><th>Momento</th><th>Herramienta</th><th>Qué hace</th></tr></thead>
  <tbody>
    <tr><td>Antes de hacer commit</td><td>Hook de pre-commit con gitleaks</td><td>Bloquea el commit si detecta un secreto.</td></tr>
    <tr><td>Al subir al repositorio</td><td>Push protection de GitHub</td><td>Rechaza el envío si contiene un secreto de un tipo conocido.</td></tr>
    <tr><td>En el repositorio</td><td>Secret scanning de GitHub</td><td>Revisa el repositorio y su historial y genera alertas.</td></tr>
    <tr><td>En el pipeline</td><td>gitleaks u otros en CI</td><td>Falla la construcción si aparece un secreto.</td></tr>
  </tbody>
</table>
<p>En GitHub, la protección contra secretos en repositorios públicos viene activada por defecto. En repositorios privados depende del plan. Revisa en la configuración de tu repositorio (<strong>Settings</strong>, <strong>Advanced Security</strong> o <strong>Code security</strong>) qué tienes disponible.</p>
<div class="aviso">
  <strong>Los detectores tienen límites</strong>
  Encuentran formatos conocidos y valores con aspecto de clave. Pueden pasar por alto secretos con formatos inusuales y generar falsos positivos. Son una red de seguridad, no un sustituto de buenas prácticas.
</div>

<h3>gitleaks</h3>
<p><strong>gitleaks</strong> es una herramienta gratuita de código abierto que busca secretos en el historial de Git y en carpetas. Sus comandos vigentes son <code>gitleaks git</code> (analiza un repositorio y su historial) y <code>gitleaks dir</code> (analiza archivos de una carpeta). El comando antiguo <code>detect</code> está en desuso desde la versión 8.19.</p>

<h3>Hook de pre-commit</h3>
<p>Con el marco <em>pre-commit</em>, se agrega un archivo <code>.pre-commit-config.yaml</code>:</p>
<pre><code>repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: vX.Y.Z      # reemplaza por la versión vigente de gitleaks
    hooks:
      - id: gitleaks</code></pre>

<h2>10. Práctica: detectar un secreto en un repositorio de prueba</h2>
<div class="aviso legal">
  <strong>Todo esto es en una carpeta de práctica en tu equipo</strong>
  No subas esta carpeta a ningún repositorio remoto, y no uses secretos reales.
</div>

<h3>Paso 1. Descargar gitleaks</h3>
<ol>
  <li>Entra a la página oficial: <strong>github.com/gitleaks/gitleaks</strong>.</li>
  <li>Abre la sección <strong>Releases</strong> y descarga el archivo comprimido para Windows de 64 bits (el nombre incluye <code>windows_x64</code>).</li>
  <li>Descomprímelo en una carpeta, por ejemplo <code>C:\\Herramientas\\gitleaks</code>.</li>
  <li>Abre PowerShell dentro de esa carpeta y comprueba que funciona con <code>.\\gitleaks.exe version</code>.</li>
</ol>
<div class="nota">
  <strong>Si Windows muestra "Windows protegió su PC"</strong>
  Verifica que descargaste el archivo desde la página oficial de Releases. Las instrucciones oficiales de instalación pueden incluir otras opciones (Homebrew, Docker, Go); consulta el README si prefieres otra.
</div>

<h3>Paso 2. Crear un repositorio de práctica</h3>
<pre><code>mkdir C:\\Practicas\\prueba-secretos
cd C:\\Practicas\\prueba-secretos
git init</code></pre>

<h3>Paso 3. Crear un archivo con un secreto falso</h3>
<p>Crea un archivo llamado <code>config.properties</code> con una línea de este estilo, <strong>inventando tú mismo</strong> los caracteres:</p>
<pre><code>github.token=ghp_ seguido de 36 letras y números inventados</code></pre>
<p>Escribe la línea completa sin espacios, con el prefijo <code>ghp_</code> y 36 caracteres al azar. Es un secreto falso: no existe en ningún sistema. (No lo escribimos completo en este curso para no activar los detectores de los repositorios donde se publique.)</p>

<h3>Paso 4. Escanear</h3>
<p>Desde la carpeta de práctica, ejecuta (ajusta la ruta donde guardaste gitleaks):</p>
<pre><code>C:\\Herramientas\\gitleaks\\gitleaks.exe dir . -v</code></pre>
<p>Si el formato de tu secreto falso coincide con una regla, gitleaks mostrará un hallazgo con el archivo, la línea y el tipo de regla. Si no encuentra nada, también es una lección: los detectores dependen de patrones. Prueba con otro formato.</p>

<h3>Paso 5. Probar el historial</h3>
<pre><code>git add config.properties
git commit -m "agrego configuracion"
del config.properties
git add -A
git commit -m "quito el secreto"
C:\\Herramientas\\gitleaks\\gitleaks.exe git . -v</code></pre>
<p>El archivo ya no está, pero gitleaks lo sigue encontrando en el commit anterior. Eso demuestra por qué <strong>borrar un secreto del código no lo elimina del historial</strong>.</p>
<p>Si Git te pide configurar tu nombre y correo para hacer commits, hazlo con <code>git config</code> en este repositorio de práctica.</p>

<h3>Paso 6. Limpieza</h3>
<p>Al terminar, borra la carpeta <code>C:\\Practicas\\prueba-secretos</code>.</p>

<h2>11. Qué hacer si se filtró un secreto</h2>
<p>El orden importa. Lo primero NO es limpiar el repositorio.</p>
<ol>
  <li><strong>Revocar o rotar el secreto de inmediato.</strong> Es lo único que lo vuelve inútil. Asume que ya fue copiado.</li>
  <li><strong>Revisar el uso:</strong> consulta los registros del servicio para ver si alguien lo usó (accesos desde lugares raros, recursos creados, datos descargados).</li>
  <li><strong>Evaluar el daño</strong> y contener: bloquear accesos, revisar permisos, cambiar otros secretos relacionados.</li>
  <li><strong>Notificar</strong> a quien corresponda según tu proceso de incidentes (y, si hay datos personales, a las instancias que marque la ley aplicable).</li>
  <li><strong>Limpiar el historial</strong> con herramientas como <code>git filter-repo</code> o BFG Repo-Cleaner, y avisar al equipo para que vuelva a clonar. Esto reduce la exposición futura, pero no reemplaza la rotación.</li>
  <li><strong>Aprender:</strong> ¿cómo llegó ahí? ¿qué control habría evitado el error? Añade ese control.</li>
</ol>
<div class="aviso">
  <strong>El error más común</strong>
  Borrar el commit o el archivo y dar el tema por cerrado sin rotar el secreto. Si estuvo expuesto, se considera comprometido.
</div>

<h2>12. Buenas prácticas en el código</h2>
<ul>
  <li>No registres secretos en logs ni en mensajes de error.</li>
  <li>No devuelvas secretos en respuestas de la API.</li>
  <li>En Java, ten cuidado con <code>toString()</code> de objetos de configuración que incluyan contraseñas.</li>
  <li>Mantén los secretos en memoria el menor tiempo posible.</li>
  <li>Usa un secreto distinto por entorno (desarrollo, pruebas, producción) y por servicio.</li>
  <li>Los secretos de desarrollo nunca deben dar acceso a producción.</li>
  <li>Da a cada secreto solo los permisos necesarios (mínimo privilegio).</li>
</ul>

<h2>13. Lista de verificación</h2>
<table>
  <thead><tr><th>Pregunta</th><th>¿Cumple?</th></tr></thead>
  <tbody>
    <tr><td>¿Hay algún secreto escrito en el código o en archivos del repositorio?</td><td></td></tr>
    <tr><td>¿Existe un .gitignore con .env, claves y archivos locales?</td><td></td></tr>
    <tr><td>¿Los secretos se entregan en ejecución desde un gestor o desde la plataforma?</td><td></td></tr>
    <tr><td>¿Cada servicio y cada entorno tiene secretos distintos?</td><td></td></tr>
    <tr><td>¿Sabes rotar cada secreto sin interrumpir el servicio?</td><td></td></tr>
    <tr><td>¿Hay detección de secretos antes del commit y en el pipeline?</td><td></td></tr>
    <tr><td>¿Hay un procedimiento claro si un secreto se filtra?</td><td></td></tr>
    <tr><td>¿Los logs y las imágenes están libres de secretos?</td><td></td></tr>
  </tbody>
</table>

<h2>14. Ejercicios</h2>
<ol>
  <li>Revisa un proyecto tuyo: busca contraseñas o claves escritas en archivos de configuración o en el código, y haz una lista.</li>
  <li>Reescribe un <code>application.yml</code> para que la contraseña de la base de datos venga de una variable de entorno.</li>
  <li>Escribe los pasos que seguirías si descubres hoy que una clave de API estuvo 3 días en un repositorio público.</li>
  <li>Explica con tus palabras por qué una identidad administrada es mejor que guardar una clave en un gestor de secretos.</li>
  <li>Haz la práctica de gitleaks y anota qué detectó y qué no.</li>
</ol>
`,
  quiz: [
    {
      p: "¿Cuál es la mejor estrategia con los secretos, si es posible?",
      o: ["Escribirlos en el código", "No tener secretos duraderos, usando identidades administradas o credenciales temporales", "Compartirlos por chat", "Guardarlos en un archivo txt en el escritorio"],
      c: 1,
      e: "Si no hay clave que robar, no hay clave que filtrar."
    },
    {
      p: "Subiste una contraseña a un repositorio público y la borraste en el siguiente commit. ¿Qué haces?",
      o: ["Nada, ya está borrada", "Revocar o rotar el secreto de inmediato, porque sigue en el historial y puede haber sido copiado", "Cambiar el nombre del archivo", "Esperar a ver si alguien la usa"],
      c: 1,
      e: "Un secreto expuesto se considera comprometido."
    },
    {
      p: "¿Qué ventaja tiene usar variables de entorno frente a escribir el secreto en application.yml?",
      o: ["El archivo ya no contiene el secreto, solo el nombre de la variable", "Los hace imposibles de leer", "No se pueden filtrar nunca", "Reemplazan al cifrado"],
      c: 0,
      e: "Aun así tienen límites: pueden verse con docker inspect o en Actuator si no se protege."
    },
    {
      p: "¿Protege el archivo .gitignore un secreto que ya estaba en Git?",
      o: ["Sí, lo borra del historial", "No, solo evita que se agreguen archivos nuevos; el historial conserva lo anterior", "Solo en repositorios privados", "Solo en Windows"],
      c: 1,
      e: "Hay que rotar el secreto y, si hace falta, limpiar el historial."
    },
    {
      p: "En Azure Key Vault, ¿cómo se guarda el secreto para la propiedad spring.datasource.password?",
      o: ["Con el nombre spring.datasource.password", "Con el nombre spring-datasource-password, porque los nombres solo admiten letras, números y guiones", "Con cualquier símbolo", "No se puede guardar"],
      c: 1,
      e: "Spring resuelve la propiedad a partir de ese nombre."
    },
    {
      p: "¿Qué hace spring.config.import: vault:// en Spring Cloud Vault?",
      o: ["Activa la importación de secretos de Vault como propiedades de Spring", "Borra Vault", "Cifra el disco", "Crea usuarios"],
      c: 0,
      e: "Es la forma actual, basada en la Config Data API."
    },
    {
      p: "¿Qué es un secreto dinámico en Vault?",
      o: ["Uno que se genera bajo demanda, con caducidad, y se revoca después", "Una contraseña muy larga", "Un archivo comprimido", "Un secreto sin dueño"],
      c: 0,
      e: "Si se filtra, deja de servir en poco tiempo."
    },
    {
      p: "¿Cuál es la forma correcta de rotar un secreto sin interrumpir el servicio?",
      o: ["Cambiarlo de golpe y reiniciar todo", "Que funcionen el viejo y el nuevo un tiempo, migrar las aplicaciones y revocar el viejo al final", "No rotarlo nunca", "Cambiarlo solo en la base de datos"],
      c: 1,
      e: "Es como cambiar la cerradura sin cerrar el negocio."
    },
    {
      p: "¿Por qué no se debe poner un secreto con ENV en un Dockerfile?",
      o: ["Porque queda en las capas de la imagen y se puede leer", "Porque Docker no lo permite", "Porque se borra solo", "Porque ralentiza el equipo"],
      c: 0,
      e: "Los secretos se inyectan en tiempo de ejecución, no al construir la imagen."
    },
    {
      p: "¿Cuál es lo primero que debes hacer al descubrir un secreto filtrado?",
      o: ["Limpiar el historial de Git", "Revocar o rotar el secreto", "Borrar el repositorio", "Avisar solo en redes sociales"],
      c: 1,
      e: "Es lo único que lo vuelve inútil. La limpieza del historial viene después."
    },
    {
      p: "¿Qué comando actual de gitleaks analiza el historial de un repositorio?",
      o: ["gitleaks git", "gitleaks borrar", "gitleaks cifrar", "gitleaks mail"],
      c: 0,
      e: "El comando detect está en desuso desde la versión 8.19; los vigentes son git y dir."
    }
  ]
};
