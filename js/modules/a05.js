CURSO.contenido.a05 = {
  html: `
<p>Revisar la seguridad a mano, una vez al final del proyecto, ya no funciona: se despliega varias veces por semana y el código usa cientos de librerías de terceros. <strong>DevSecOps</strong> integra la seguridad en el flujo normal de desarrollo, con revisiones automáticas en cada cambio.</p>

<h2>1. ¿Qué es DevSecOps?</h2>
<p>Viene de unir tres palabras: <strong>Dev</strong> (desarrollo), <strong>Sec</strong> (seguridad) y <strong>Ops</strong> (operaciones). La idea es que la seguridad sea responsabilidad de todo el equipo y que se compruebe de forma continua.</p>
<div class="analogia">
  <strong>Analogía: la línea de producción</strong>
  En una fábrica de autos no se inspecciona solo el coche terminado. Hay controles en cada estación: se revisa la pieza, la soldadura, los frenos. Si algo falla, se detecta pronto y es barato corregirlo. DevSecOps pone esas estaciones de control en el camino del código hasta producción.
</div>
<table>
  <thead><tr><th>Sin DevSecOps</th><th>Con DevSecOps</th></tr></thead>
  <tbody>
    <tr><td>Revisión de seguridad al final, antes de salir.</td><td>Revisiones automáticas en cada cambio.</td></tr>
    <tr><td>El equipo de seguridad es un "freno".</td><td>La seguridad es parte del trabajo del equipo.</td></tr>
    <tr><td>Los hallazgos llegan semanas después.</td><td>El desarrollador recibe el aviso en minutos.</td></tr>
    <tr><td>Corregir cuesta mucho.</td><td>Corregir cuesta poco, porque el código está fresco.</td></tr>
  </tbody>
</table>

<h2>2. El pipeline de CI/CD y sus controles</h2>
<p>Un <strong>pipeline</strong> es la cadena automática que toma el código, lo compila, lo prueba y lo despliega. Aquí se colocan los controles.</p>
<table>
  <thead><tr><th>Etapa</th><th>Control de seguridad</th></tr></thead>
  <tbody>
    <tr><td>Antes del commit</td><td>Detección de secretos (pre-commit), revisión del IDE.</td></tr>
    <tr><td>Commit y pull request</td><td>Revisión de código por otra persona, SAST, detección de secretos.</td></tr>
    <tr><td>Compilación</td><td>Análisis de dependencias (SCA), generación del SBOM.</td></tr>
    <tr><td>Pruebas</td><td>Pruebas unitarias de seguridad, pruebas de autorización.</td></tr>
    <tr><td>Empaquetado</td><td>Escaneo de imágenes de contenedor, firma de artefactos.</td></tr>
    <tr><td>Despliegue</td><td>Escaneo de infraestructura como código, configuración endurecida, DAST en un entorno de pruebas.</td></tr>
    <tr><td>Operación</td><td>Monitoreo, alertas, nuevos escaneos periódicos.</td></tr>
  </tbody>
</table>

<h2>3. Tipos de análisis automáticos</h2>
<table>
  <thead><tr><th>Siglas</th><th>Nombre</th><th>Qué analiza</th><th>Qué encuentra</th></tr></thead>
  <tbody>
    <tr><td>SAST</td><td>Análisis estático</td><td>Tu código fuente, sin ejecutarlo.</td><td>Concatenación en consultas SQL, claves en el código, uso inseguro de funciones.</td></tr>
    <tr><td>SCA</td><td>Análisis de composición</td><td>Las librerías de terceros que usas.</td><td>Dependencias con vulnerabilidades conocidas (CVE) y licencias problemáticas.</td></tr>
    <tr><td>DAST</td><td>Análisis dinámico</td><td>La aplicación en ejecución, desde fuera.</td><td>Cabeceras faltantes, XSS reflejado, configuraciones inseguras.</td></tr>
    <tr><td>IAST</td><td>Análisis interactivo</td><td>La aplicación en ejecución, con un agente por dentro.</td><td>Combina ventajas de SAST y DAST.</td></tr>
    <tr><td>Secret scanning</td><td>Detección de secretos</td><td>Código e historial.</td><td>Claves, tokens y contraseñas.</td></tr>
    <tr><td>IaC scanning</td><td>Análisis de infraestructura como código</td><td>Plantillas de Terraform, Kubernetes, Docker.</td><td>Puertos abiertos, almacenamiento público, permisos excesivos.</td></tr>
    <tr><td>Container scanning</td><td>Análisis de contenedores</td><td>Imágenes de contenedor.</td><td>Paquetes del sistema vulnerables, usuario root.</td></tr>
  </tbody>
</table>
<div class="analogia">
  <strong>Analogía: revisar un edificio</strong>
  SAST es revisar los planos (código). SCA es revisar los materiales comprados a proveedores (librerías). DAST es probar el edificio terminado intentando abrir puertas y ventanas desde la calle (aplicación en ejecución).
</div>
<div class="nota">
  <strong>Ninguno basta solo</strong>
  Cada tipo ve cosas distintas. SAST no ve problemas de configuración en ejecución; DAST no sabe qué línea de código causó el fallo. Se combinan.
</div>

<h2>4. SAST con SonarQube</h2>
<p><strong>SonarQube</strong> analiza el código y señala errores, vulnerabilidades y problemas de mantenimiento. Existen varias opciones de la misma familia:</p>
<table>
  <thead><tr><th>Producto</th><th>Qué es</th></tr></thead>
  <tbody>
    <tr><td>SonarQube Community Build</td><td>Versión gratuita que instalas tú.</td></tr>
    <tr><td>SonarQube Server</td><td>Ediciones comerciales con más funciones.</td></tr>
    <tr><td>SonarQube Cloud</td><td>Servicio alojado por SonarSource.</td></tr>
  </tbody>
</table>
<p>Las funciones disponibles en cada edición cambian, así que consulta la página oficial antes de decidir.</p>

<h3>Conceptos clave</h3>
<ul>
  <li><strong>Bugs:</strong> errores que probablemente fallarán.</li>
  <li><strong>Vulnerabilidades:</strong> fallos que un atacante podría explotar.</li>
  <li><strong>Security hotspots:</strong> código sensible que una persona debe revisar y decidir si es seguro.</li>
  <li><strong>Code smells:</strong> código difícil de mantener.</li>
  <li><strong>Quality gate:</strong> conjunto de condiciones que el código debe cumplir (por ejemplo, ninguna vulnerabilidad nueva). Si no se cumple, el cambio no pasa.</li>
  <li><strong>Código nuevo:</strong> el enfoque recomendado es exigir calidad sobre el código que escribes ahora, sin bloquearte por la deuda antigua.</li>
</ul>

<h3>Ejecutar un análisis con Maven</h3>
<p>Con un servidor de SonarQube disponible y un token de análisis, desde la carpeta del proyecto:</p>
<pre><code>mvn verify org.sonarsource.scanner.maven:sonar-maven-plugin:sonar "-Dsonar.token=$env:SONAR_TOKEN" "-Dsonar.host.url=http://localhost:9000"</code></pre>
<ul>
  <li>El token viene de una variable de entorno: nunca lo escribas en el <code>pom.xml</code> ni en el comando que se guarda en el historial.</li>
  <li>Las comillas son necesarias en PowerShell para que los parámetros <code>-D</code> se pasen bien.</li>
  <li>Requisitos como la versión de Java del servidor y del escáner cambian entre versiones. Consulta la documentación de tu versión.</li>
</ul>

<h3>Cómo trabajar con los resultados</h3>
<ol>
  <li>Empieza por las vulnerabilidades y los hotspots, no por los code smells.</li>
  <li>Entiende el hallazgo: lee la explicación y el ejemplo de la regla.</li>
  <li>Corrige la causa. Si es un falso positivo, márcalo con una justificación.</li>
  <li>No silencies alertas en masa para que "pase el gate". Eso destruye el valor de la herramienta.</li>
</ol>

<h2>5. SCA: controlar tus dependencias</h2>
<p>Una aplicación Java típica usa decenas de librerías directas, y estas arrastran cientos más (dependencias <strong>transitivas</strong>). Una vulnerabilidad en cualquiera de ellas es una vulnerabilidad tuya. Es la categoría <strong>A03 del OWASP Top 10:2025</strong> (cadena de suministro de software).</p>
<div class="analogia">
  <strong>Analogía: los ingredientes del restaurante</strong>
  Aunque tu cocina sea impecable, si un proveedor te entrega un ingrediente en mal estado, el platillo enferma al cliente. Hay que saber qué ingredientes usas y vigilar los avisos de retiro.
</div>

<h3>Ver tus dependencias</h3>
<pre><code>mvn dependency:tree</code></pre>
<p>Muestra todas las librerías, directas e indirectas. Observa cuántas hay y de dónde viene cada una.</p>

<h3>Dependabot (GitHub)</h3>
<p>Dependabot es la herramienta de GitHub para mantener las dependencias al día. Tiene tres funciones distintas:</p>
<table>
  <thead><tr><th>Función</th><th>Qué hace</th></tr></thead>
  <tbody>
    <tr><td>Dependabot alerts</td><td>Te avisa cuando una dependencia tiene una vulnerabilidad conocida.</td></tr>
    <tr><td>Dependabot security updates</td><td>Crea automáticamente una solicitud de cambio (pull request) con la versión corregida.</td></tr>
    <tr><td>Dependabot version updates</td><td>Crea solicitudes periódicas para actualizar versiones, aunque no haya vulnerabilidad.</td></tr>
  </tbody>
</table>
<p>Para las actualizaciones de versiones se crea el archivo <code>.github/dependabot.yml</code>:</p>
<pre><code>version: 2
updates:
  - package-ecosystem: "maven"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"

  - package-ecosystem: "docker"
    directory: "/"
    schedule:
      interval: "weekly"</code></pre>
<ul>
  <li><code>maven</code> vigila el <code>pom.xml</code>; <code>github-actions</code> vigila las acciones de tus flujos; <code>docker</code> vigila la imagen base del Dockerfile.</li>
  <li><code>open-pull-requests-limit</code> evita que se abran demasiadas solicitudes a la vez.</li>
</ul>
<div class="aviso">
  <strong>Una actualización automática no es una actualización segura</strong>
  Dependabot propone el cambio, pero tu pipeline debe ejecutar las pruebas y una persona debe revisar antes de aceptarlo. Fusionar a ciegas puede romper la aplicación, o incluso introducir una dependencia comprometida.
</div>

<h3>Snyk</h3>
<p><strong>Snyk</strong> es una plataforma comercial con plan gratuito. Cubre varias áreas: <em>Snyk Open Source</em> (SCA), <em>Snyk Code</em> (SAST), <em>Snyk Container</em> y <em>Snyk IaC</em>. Se usa por línea de comandos, integrada con el repositorio o en el pipeline.</p>
<pre><code>snyk auth          # vincula la herramienta con tu cuenta
snyk test          # busca vulnerabilidades en las dependencias del proyecto
snyk code test     # análisis estático de tu código
snyk monitor       # guarda una instantánea para vigilar nuevas vulnerabilidades</code></pre>
<ul>
  <li>El plan gratuito tiene un límite mensual de pruebas por producto. Las cantidades cambian, así que consúltalas en <strong>snyk.io/plans</strong>.</li>
  <li>Snyk es un servicio de terceros: parte de la información de tu proyecto se envía a sus servidores. Antes de usarlo con código de una organización, confirma que tus políticas lo permiten.</li>
</ul>

<h3>OWASP Dependency-Check</h3>
<p>Es una herramienta gratuita de código abierto que compara tus dependencias con la base de datos de vulnerabilidades (NVD). Se puede ejecutar como complemento de Maven. Conviene configurar una clave de API para la base de datos NVD, porque sin ella las actualizaciones pueden ser muy lentas. Revisa la documentación del proyecto para los detalles vigentes.</p>

<h3>Comparación</h3>
<table>
  <thead><tr><th>Herramienta</th><th>Costo</th><th>Qué aporta</th><th>A tener en cuenta</th></tr></thead>
  <tbody>
    <tr><td>Dependabot</td><td>Incluida en GitHub</td><td>Alertas y actualizaciones automáticas.</td><td>Depende de GitHub.</td></tr>
    <tr><td>Snyk</td><td>Plan gratuito con límites y planes de pago</td><td>SCA, SAST, contenedores e IaC en una sola plataforma.</td><td>Servicio externo; límites de uso.</td></tr>
    <tr><td>OWASP Dependency-Check</td><td>Gratuita</td><td>SCA sin depender de un servicio comercial.</td><td>Más configuración manual; puede dar falsos positivos.</td></tr>
    <tr><td>SonarQube</td><td>Community Build gratuita; ediciones de pago</td><td>SAST y calidad de código.</td><td>Requiere mantener un servidor (salvo en versión alojada).</td></tr>
  </tbody>
</table>
<p>No se trata de elegir la más famosa, sino de cubrir las áreas importantes con herramientas que tu equipo realmente use.</p>

<h3>Cómo priorizar las vulnerabilidades de dependencias</h3>
<p>Un escáner puede devolver cientos de hallazgos. Para decidir por dónde empezar:</p>
<ol>
  <li><strong>¿Se está explotando ya?</strong> El catálogo KEV (Known Exploited Vulnerabilities) de la agencia estadounidense CISA lista fallos explotados activamente.</li>
  <li><strong>¿Qué tan probable es que se explote?</strong> El puntaje EPSS estima esa probabilidad.</li>
  <li><strong>¿Qué tan grave es?</strong> El puntaje CVSS.</li>
  <li><strong>¿Está expuesto?</strong> ¿El código vulnerable realmente se ejecuta en tu aplicación y es accesible desde internet?</li>
  <li><strong>¿Qué datos protege ese sistema?</strong></li>
  <li><strong>¿Existe una versión corregida?</strong></li>
</ol>

<h2>6. Contenedores e infraestructura como código</h2>
<ul>
  <li>Herramientas como <strong>Trivy</strong> (código abierto) escanean imágenes, archivos del sistema y plantillas de infraestructura en busca de vulnerabilidades y malas configuraciones.</li>
  <li>Para imágenes: usa bases pequeñas, actualízalas con frecuencia y ejecuta como usuario sin privilegios (como viste en el módulo de microservicios).</li>
  <li>Para plantillas de Terraform o Kubernetes: busca puertos abiertos al mundo, almacenamiento público, permisos de administrador por defecto.</li>
</ul>

<h2>7. DAST en el pipeline</h2>
<p><strong>OWASP ZAP</strong> es una herramienta gratuita que prueba una aplicación en ejecución desde fuera. Se puede automatizar con un escaneo básico "pasivo" en cada despliegue en un entorno de pruebas. Lo verás con calma en el módulo de pruebas de seguridad.</p>
<div class="aviso legal">
  <strong>Solo contra entornos que tú controles</strong>
  Los escaneos dinámicos envían tráfico de ataque. Hazlos únicamente sobre entornos de prueba propios y autorizados, nunca sobre producción de terceros.
</div>

<h2>8. Seguridad de la cadena de suministro</h2>
<h3>SBOM: la lista de ingredientes del software</h3>
<p>Un <strong>SBOM</strong> (Software Bill of Materials) es un inventario de todos los componentes que forman tu aplicación y sus versiones. Si mañana se descubre un fallo grave en una librería, el SBOM te dice enseguida qué aplicaciones lo usan.</p>
<div class="analogia">
  <strong>Analogía: la etiqueta de ingredientes</strong>
  Un alimento envasado lista todos sus ingredientes. Si un ingrediente es retirado del mercado, sabes qué productos afecta.
</div>
<p>Los formatos habituales son <strong>CycloneDX</strong> y <strong>SPDX</strong>. En Maven se puede generar con un complemento, por ejemplo:</p>
<pre><code>mvn org.cyclonedx:cyclonedx-maven-plugin:makeAggregateBom</code></pre>

<h3>Ataques a la cadena de suministro</h3>
<table>
  <thead><tr><th>Ataque</th><th>Cómo funciona</th><th>Defensa</th></tr></thead>
  <tbody>
    <tr><td>Typosquatting</td><td>Paquete malicioso con nombre casi igual al legítimo.</td><td>Revisar con cuidado el nombre y el origen antes de agregar una dependencia.</td></tr>
    <tr><td>Confusión de dependencias</td><td>Un paquete público con el nombre de uno interno se descarga en su lugar.</td><td>Repositorios internos configurados con prioridad y nombres propios.</td></tr>
    <tr><td>Paquete legítimo comprometido</td><td>Un atacante toma el control del mantenedor y publica una versión maliciosa.</td><td>Fijar versiones, revisar cambios en actualizaciones, usar SCA y un SBOM.</td></tr>
    <tr><td>Pipeline comprometido</td><td>Alguien modifica el pipeline o una acción de terceros.</td><td>Permisos mínimos, revisión de cambios al pipeline, fijar acciones por hash.</td></tr>
  </tbody>
</table>
<p>Buenas prácticas:</p>
<ul>
  <li>Usa solo repositorios de dependencias confiables.</li>
  <li>Antes de añadir una librería: ¿está mantenida? ¿tiene muchos usuarios? ¿realmente la necesitas?</li>
  <li>Fija las versiones; no uses rangos abiertos como "la más reciente".</li>
  <li>Elimina dependencias que ya no uses.</li>
  <li>Considera firmar los artefactos que produces para que otros puedan verificar su origen.</li>
</ul>

<h2>9. Un pipeline de ejemplo en GitHub Actions</h2>
<p>Este flujo compila un proyecto Maven, ejecuta pruebas y análisis de código con CodeQL (la herramienta SAST de GitHub). Es una base para adaptar.</p>
<pre><code>name: ci-seguro

on:
  pull_request:
  push:
    branches: [ main ]

permissions:
  contents: read            # permisos mínimos por defecto

jobs:
  construir:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      security-events: write  # necesario para subir resultados de CodeQL
    steps:
      - uses: actions/checkout@vX          # reemplaza por la versión vigente
      - uses: actions/setup-java@vX
        with:
          distribution: temurin
          java-version: 21
          cache: maven

      - uses: github/codeql-action/init@vX
        with:
          languages: java-kotlin
          build-mode: autobuild

      - name: Compilar y probar
        run: mvn --batch-mode verify

      - uses: github/codeql-action/analyze@vX</code></pre>
<ul>
  <li><code>permissions</code> limita lo que el flujo puede hacer. Por defecto conviene dejarlo en lectura.</li>
  <li>Reemplaza <code>@vX</code> por la versión vigente de cada acción. Para mayor seguridad se recomienda <strong>fijar cada acción por su hash de commit</strong> en lugar de una etiqueta, y dejar que Dependabot proponga las actualizaciones.</li>
  <li>Las opciones de CodeQL (lenguajes, modo de compilación) pueden cambiar. Consulta la documentación vigente de GitHub.</li>
  <li>Si usas secretos, se acceden con la sintaxis de GitHub Actions (por ejemplo, <code>secrets.SONAR_TOKEN</code>), nunca escritos en el archivo.</li>
</ul>
<div class="nota">
  <strong>Cuidado con los flujos que ejecutan código de terceros</strong>
  Los cambios que llegan de forks externos no deben tener acceso a tus secretos ni permisos de escritura. Revisa la configuración de tu repositorio sobre flujos de colaboradores externos.
</div>

<h2>10. Políticas: qué hacer con los hallazgos</h2>
<p>Tener herramientas no sirve si nadie actúa sobre sus resultados. Define reglas claras:</p>
<table>
  <thead><tr><th>Regla</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td>Bloquear el pipeline</td><td>Cuando aparece un secreto, una vulnerabilidad crítica nueva o un gate fallido.</td></tr>
    <tr><td>Avisar sin bloquear</td><td>Para hallazgos de gravedad baja o media: se registran y se planifican.</td></tr>
    <tr><td>Plazos de corrección</td><td>Por ejemplo: críticas en días, altas en semanas, medias en meses. Ajusta los plazos a tu organización.</td></tr>
    <tr><td>Excepciones</td><td>Se documentan con motivo, responsable y fecha de caducidad.</td></tr>
    <tr><td>Responsable</td><td>Cada hallazgo tiene un dueño.</td></tr>
  </tbody>
</table>
<div class="aviso">
  <strong>Fatiga de alertas</strong>
  Si el equipo recibe cientos de avisos sin contexto, deja de leerlos. Empieza con pocas reglas bien ajustadas, que bloqueen lo realmente grave, y sube el nivel de exigencia poco a poco.
</div>

<h3>Métricas útiles</h3>
<ul>
  <li>Tiempo promedio para corregir vulnerabilidades (según gravedad).</li>
  <li>Cantidad de vulnerabilidades abiertas y su antigüedad.</li>
  <li>Porcentaje de repositorios con análisis activados.</li>
  <li>Cantidad de secretos detectados antes de llegar al repositorio.</li>
</ul>

<h2>11. Errores comunes</h2>
<ul>
  <li>Activar herramientas y no mirar nunca los resultados.</li>
  <li>Silenciar alertas para que el pipeline pase.</li>
  <li>Poner todos los controles de golpe y bloquear al equipo.</li>
  <li>Guardar los tokens de las herramientas (SONAR_TOKEN, SNYK_TOKEN) mal protegidos.</li>
  <li>Dar al pipeline permisos de administrador.</li>
  <li>Creer que una herramienta automática reemplaza la revisión humana y el modelado de amenazas.</li>
</ul>

<h2>12. Práctica</h2>
<h3>Práctica 1: mira tus dependencias</h3>
<ol>
  <li>Abre un proyecto Maven tuyo o de práctica.</li>
  <li>Ejecuta <code>mvn dependency:tree</code> y cuenta cuántas librerías directas y cuántas en total tienes.</li>
  <li>Elige tres y averigua: ¿para qué sirven? ¿sigue siendo necesaria?</li>
</ol>

<h3>Práctica 2: Dependabot en un repositorio propio</h3>
<ol>
  <li>En un repositorio propio de práctica en GitHub, crea la carpeta <code>.github</code> y dentro el archivo <code>dependabot.yml</code> con el contenido de la sección 5.</li>
  <li>Súbelo al repositorio.</li>
  <li>En GitHub, entra a la pestaña <strong>Insights</strong> y revisa la sección <strong>Dependency graph</strong>, donde aparece el estado de Dependabot.</li>
  <li>En <strong>Settings</strong>, <strong>Advanced Security</strong> (o <strong>Code security</strong>), revisa qué funciones de Dependabot tienes activadas.</li>
  <li>Espera a que Dependabot abra su primera solicitud de cambio, léela y decide si la aceptas.</li>
</ol>
<p>Los nombres de menús de GitHub cambian con el tiempo. Si no los encuentras, consulta la documentación oficial.</p>

<h2>13. Ejercicios</h2>
<ol>
  <li>Explica con tus palabras la diferencia entre SAST, SCA y DAST, y da un ejemplo de hallazgo de cada uno.</li>
  <li>Dibuja un pipeline de siete etapas y escribe un control de seguridad para cada una.</li>
  <li>Una herramienta SCA reporta 120 vulnerabilidades en tu proyecto. Escribe cómo decidirías por dónde empezar.</li>
  <li>Escribe una política sencilla de tu equipo: qué bloquea el pipeline, qué solo avisa y en cuánto tiempo se corrige.</li>
  <li>Explica por qué se recomienda fijar las acciones de GitHub por hash de commit.</li>
</ol>
`,
  quiz: [
    {
      p: "¿Qué busca DevSecOps?",
      o: ["Que la seguridad se revise solo al final del proyecto", "Integrar la seguridad en el flujo de desarrollo con controles automáticos y continuos", "Eliminar al equipo de seguridad", "Evitar el uso de pipelines"],
      c: 1,
      e: "Es como poner controles de calidad en cada estación de la línea de producción."
    },
    {
      p: "¿Qué analiza el SAST?",
      o: ["El código fuente sin ejecutarlo", "La aplicación en ejecución desde fuera", "Solo las contraseñas del equipo", "Los cables de red"],
      c: 0,
      e: "Por eso se compara con revisar los planos."
    },
    {
      p: "¿Qué analiza el SCA?",
      o: ["Las librerías de terceros que usa tu proyecto", "El color de la interfaz", "Los correos del equipo", "La velocidad de la red"],
      c: 0,
      e: "Detecta dependencias con vulnerabilidades conocidas."
    },
    {
      p: "¿Qué es una dependencia transitiva?",
      o: ["Una librería que tu proyecto usa de forma indirecta, porque otra librería la necesita", "Una librería que solo se usa un día", "Una librería gratuita", "Una librería propia"],
      c: 0,
      e: "Una vulnerabilidad en una dependencia transitiva también es tuya."
    },
    {
      p: "En Dependabot, ¿qué hacen las 'security updates'?",
      o: ["Crean automáticamente una solicitud de cambio con la versión corregida de una dependencia vulnerable", "Borran el repositorio", "Cifran el código", "Cambian contraseñas"],
      c: 0,
      e: "Las 'version updates' son distintas: actualizan versiones aunque no haya vulnerabilidad."
    },
    {
      p: "Dependabot abre una solicitud para actualizar una librería. ¿Qué conviene hacer?",
      o: ["Fusionarla sin revisar", "Dejar que el pipeline ejecute las pruebas y que una persona la revise antes de aceptarla", "Cerrarla siempre", "Ignorarla"],
      c: 1,
      e: "Una actualización automática no es necesariamente segura."
    },
    {
      p: "¿Qué debes considerar al usar Snyk con código de una organización?",
      o: ["Que es un servicio de terceros y parte de la información se envía a sus servidores", "Nada, es siempre local", "Que es obligatorio", "Que no funciona con Java"],
      c: 0,
      e: "Confirma que tus políticas lo permiten."
    },
    {
      p: "¿Para qué sirve un quality gate en SonarQube?",
      o: ["Define condiciones que el código debe cumplir para poder avanzar", "Cifra los datos", "Borra los bugs automáticamente", "Instala Java"],
      c: 0,
      e: "Por ejemplo, ninguna vulnerabilidad nueva."
    },
    {
      p: "¿Por qué el token de SonarQube debe pasarse con una variable de entorno?",
      o: ["Para no escribirlo en el pom.xml ni dejarlo en el historial de comandos", "Porque es más rápido", "Porque Maven lo exige", "No importa cómo se pase"],
      c: 0,
      e: "Es un secreto como cualquier otro."
    },
    {
      p: "¿Qué es un SBOM?",
      o: ["Un inventario de todos los componentes de una aplicación y sus versiones", "Un tipo de virus", "Una contraseña maestra", "Un firewall"],
      c: 0,
      e: "Es la etiqueta de ingredientes del software."
    },
    {
      p: "¿Qué es el typosquatting en la cadena de suministro?",
      o: ["Un paquete malicioso con un nombre casi igual al de uno legítimo", "Un error al escribir código", "Una forma de cifrar", "Un tipo de prueba"],
      c: 0,
      e: "Por eso hay que revisar con cuidado el nombre antes de añadir una dependencia."
    },
    {
      p: "¿Qué ayuda a priorizar vulnerabilidades además del CVSS?",
      o: ["Saber si se explota activamente (KEV), la probabilidad (EPSS) y si el código vulnerable está realmente expuesto", "El color del informe", "La hora del escaneo", "El nombre de la herramienta"],
      c: 0,
      e: "No todas las vulnerabilidades 'críticas' son igual de urgentes para ti."
    }
  ]
};
