CURSO.contenido.a07 = {
  html: `
<p>En el nivel básico viste qué hacer como usuario cuando algo sale mal. Aquí lo verás desde el lado de un equipo técnico: cómo se organiza una respuesta, cómo se analiza un incidente, qué evidencia conservar y cómo se aprende de él. Es el cierre natural de todo lo que ya estudiaste.</p>

<div class="aviso legal">
  <strong>Alcance de este módulo</strong>
  Aquí aprendes a responder a incidentes en sistemas que administras o para los que tienes autorización. La investigación forense profesional y los aspectos legales dependen de cada país y organización; consulta con tu área legal y con especialistas antes de actuar en un caso real.
</div>

<h2>1. Marco de referencia actual</h2>
<p>La guía más citada es la <strong>NIST SP 800-61</strong>. Su revisión 3, publicada el 3 de abril de 2025, reemplaza a la revisión 2 (2012). Cambió de enfoque: ya no es un manual de pasos técnicos, sino un perfil que integra la respuesta a incidentes dentro de la gestión de riesgos de ciberseguridad, alineado con el <strong>Cybersecurity Framework (CSF) 2.0</strong>.</p>
<table>
  <thead><tr><th>Función del CSF 2.0</th><th>Qué aporta a la respuesta a incidentes</th></tr></thead>
  <tbody>
    <tr><td>Govern (Gobernar)</td><td>Políticas, roles, responsabilidades y apoyo de la dirección.</td></tr>
    <tr><td>Identify (Identificar)</td><td>Conocer activos, riesgos y mejoras pendientes.</td></tr>
    <tr><td>Protect (Proteger)</td><td>Reducir la probabilidad y el impacto de los incidentes.</td></tr>
    <tr><td>Detect (Detectar)</td><td>Descubrir y analizar eventos anómalos.</td></tr>
    <tr><td>Respond (Responder)</td><td>Gestionar, analizar, contener, comunicar.</td></tr>
    <tr><td>Recover (Recuperar)</td><td>Restablecer operaciones y comunicar durante la recuperación.</td></tr>
  </tbody>
</table>
<div class="nota">
  <strong>Las fases clásicas siguen siendo útiles para aprender</strong>
  Muchos equipos siguen usando el ciclo de la revisión anterior (preparación; detección y análisis; contención, erradicación y recuperación; actividad posterior) o el modelo de seis pasos PICERL (preparación, identificación, contención, erradicación, recuperación, lecciones aprendidas). Este módulo sigue ese orden por claridad, y conecta con las funciones del CSF 2.0. Consulta la publicación original en <strong>csrc.nist.gov</strong> para el detalle.
</div>
<div class="analogia">
  <strong>Analogía: el cuerpo de bomberos</strong>
  Un cuerpo de bomberos no improvisa. Tiene personal entrenado, protocolos, equipo listo, un número de emergencia, reglas de coordinación y revisa cada incendio para mejorar. La respuesta a incidentes es la versión digital de eso.
</div>

<h2>2. Roles del equipo de respuesta</h2>
<table>
  <thead><tr><th>Rol</th><th>Responsabilidad</th></tr></thead>
  <tbody>
    <tr><td>Líder del incidente</td><td>Coordina, prioriza y decide. Es el único que da órdenes durante la crisis.</td></tr>
    <tr><td>Analistas técnicos</td><td>Investigan, contienen y erradican.</td></tr>
    <tr><td>Operaciones / TI</td><td>Ejecutan cambios en sistemas, restauran servicios.</td></tr>
    <tr><td>Desarrollo</td><td>Conocen el código y pueden corregir la causa.</td></tr>
    <tr><td>Comunicación</td><td>Gestiona mensajes internos y externos.</td></tr>
    <tr><td>Legal y cumplimiento</td><td>Evalúan obligaciones de notificación y protegen evidencia.</td></tr>
    <tr><td>Dueños del negocio</td><td>Valoran el impacto y autorizan decisiones que afectan la operación.</td></tr>
    <tr><td>Persona que documenta</td><td>Lleva el registro cronológico de todo.</td></tr>
  </tbody>
</table>
<p>En un equipo pequeño una persona puede cubrir varios roles, pero conviene que <strong>una sola persona lidere</strong> y que otra <strong>documente</strong>.</p>

<h2>3. Preparación</h2>
<p>Lo que haces antes del incidente decide qué tan bien saldrá.</p>
<ul>
  <li><strong>Plan de respuesta aprobado</strong> y conocido por el equipo.</li>
  <li><strong>Lista de contactos</strong> actualizada y accesible incluso si los sistemas están caídos (impresa o en un lugar independiente).</li>
  <li><strong>Inventario de activos</strong>: qué sistemas hay, qué datos tienen y quién es responsable.</li>
  <li><strong>Registros activados</strong> y centralizados (módulo de logs).</li>
  <li><strong>Copias de seguridad</strong> probadas y aisladas.</li>
  <li><strong>Canal de comunicación alterno</strong>: si el correo o el chat corporativo están comprometidos, ¿cómo se hablan?</li>
  <li><strong>Cuentas de emergencia</strong> ("break-glass") con acceso controlado y vigilado.</li>
  <li><strong>Playbooks</strong> para los incidentes más probables.</li>
  <li><strong>Ejercicios de simulación</strong> periódicos.</li>
  <li><strong>Relaciones previas</strong> con proveedores, autoridades y, si aplica, especialistas externos.</li>
</ul>

<h2>4. Detección y triaje</h2>
<h3>De dónde vienen los avisos</h3>
<ul>
  <li>Alertas del SIEM, antivirus o EDR.</li>
  <li>Personas que notan algo raro (usuarios, soporte).</li>
  <li>Avisos de proveedores o de terceros.</li>
  <li>Hallazgos de pruebas de seguridad.</li>
  <li>Inteligencia de amenazas sobre fallos o campañas nuevas.</li>
</ul>

<h3>Triaje: ¿es realmente un incidente?</h3>
<p>No todo evento es un incidente. Un <strong>evento</strong> es algo observable; un <strong>incidente</strong> es un evento que afecta (o puede afectar) la seguridad. El triaje responde rápido:</p>
<ol>
  <li>¿Es real o falso positivo?</li>
  <li>¿Qué sistemas, cuentas o datos están involucrados?</li>
  <li>¿Sigue ocurriendo?</li>
  <li>¿Qué gravedad tiene?</li>
</ol>

<h3>Clasificar la gravedad</h3>
<table>
  <thead><tr><th>Nivel</th><th>Criterio (ejemplo)</th><th>Respuesta (ejemplo)</th></tr></thead>
  <tbody>
    <tr><td>Crítico</td><td>Datos sensibles expuestos, sistema esencial caído, compromiso extendido.</td><td>Respuesta inmediata, equipo completo, dirección informada.</td></tr>
    <tr><td>Alto</td><td>Compromiso confirmado de un sistema importante o cuenta privilegiada.</td><td>Respuesta en horas, líder asignado.</td></tr>
    <tr><td>Medio</td><td>Incidente contenido o limitado, sin datos sensibles.</td><td>Respuesta el mismo día laboral.</td></tr>
    <tr><td>Bajo</td><td>Intento fallido o evento sin impacto.</td><td>Se registra y se revisa.</td></tr>
  </tbody>
</table>
<p>Los niveles y tiempos son un ejemplo: cada organización define los suyos.</p>
<div class="nota">
  <strong>Ante la duda, escala</strong>
  Es preferible tratar un evento como más grave y bajarlo después, que subestimarlo.
</div>

<h3>Declarar el incidente y abrir el registro</h3>
<p>Al confirmarlo, se crea un registro (ticket) con: identificador, hora de detección, quién lo reportó, descripción inicial, gravedad, líder asignado. Desde ese momento <strong>todo se anota con su hora</strong>.</p>

<h2>5. Análisis</h2>
<h3>Preguntas que guían la investigación</h3>
<ol>
  <li>¿Qué pasó exactamente y cuándo empezó?</li>
  <li>¿Cómo entró el atacante (vector inicial)?</li>
  <li>¿Qué sistemas, cuentas y datos tocó?</li>
  <li>¿Sigue dentro? ¿Dejó puertas traseras?</li>
  <li>¿Qué buscaba?</li>
  <li>¿Qué datos pudo ver, copiar o modificar?</li>
</ol>

<h3>Línea de tiempo</h3>
<p>Es la herramienta central: una lista ordenada de eventos con hora, fuente y significado. Siempre anota la <strong>zona horaria</strong>; lo más cómodo es unificar todo en UTC.</p>
<div class="ejemplo">
  <strong>Ejemplo de línea de tiempo</strong>
  <table>
    <thead><tr><th>Hora (UTC)</th><th>Fuente</th><th>Evento</th></tr></thead>
    <tbody>
      <tr><td>14:02</td><td>Log de la aplicación</td><td>12 intentos de login fallidos para la cuenta "mlopez" desde una misma IP.</td></tr>
      <tr><td>14:03</td><td>Log de la aplicación</td><td>Login correcto de "mlopez" desde esa IP.</td></tr>
      <tr><td>14:05</td><td>Log de la aplicación</td><td>Cambio del correo de recuperación de la cuenta.</td></tr>
      <tr><td>14:09</td><td>Log del servidor</td><td>Exportación de 9 800 registros de clientes.</td></tr>
      <tr><td>14:40</td><td>Alerta SIEM</td><td>Descarga inusual. Se abre el incidente.</td></tr>
    </tbody>
  </table>
</div>

<h3>Indicadores de compromiso (IoC)</h3>
<p>Son rastros que sirven para buscar más casos: direcciones IP, dominios, hashes de archivos maliciosos, nombres de cuentas, cadenas en logs. Se anotan y se buscan en el resto de los sistemas para ver si hay más víctimas.</p>

<h3>MITRE ATT&amp;CK: un vocabulario común</h3>
<p><strong>MITRE ATT&amp;CK</strong> es una base de conocimiento pública que describe cómo actúan los atacantes, organizada en <em>tácticas</em> (el objetivo de cada etapa) y <em>técnicas</em> (cómo lo logran). Sirve para describir un incidente con términos que todos entienden y para comprobar qué detecciones tienes.</p>
<table>
  <thead><tr><th>Táctica (ejemplos)</th><th>Qué busca el atacante</th></tr></thead>
  <tbody>
    <tr><td>Initial Access (acceso inicial)</td><td>Entrar por primera vez.</td></tr>
    <tr><td>Execution (ejecución)</td><td>Ejecutar su código.</td></tr>
    <tr><td>Persistence (persistencia)</td><td>Mantener acceso aunque se reinicie el equipo.</td></tr>
    <tr><td>Privilege Escalation (escalada de privilegios)</td><td>Obtener más permisos.</td></tr>
    <tr><td>Credential Access (acceso a credenciales)</td><td>Robar contraseñas y tokens.</td></tr>
    <tr><td>Lateral Movement (movimiento lateral)</td><td>Saltar a otros sistemas.</td></tr>
    <tr><td>Exfiltration (exfiltración)</td><td>Sacar datos de la organización.</td></tr>
    <tr><td>Impact (impacto)</td><td>Cifrar, borrar o interrumpir.</td></tr>
  </tbody>
</table>
<p>Consulta la lista completa y vigente en <strong>attack.mitre.org</strong>.</p>

<h3>Eventos de Windows útiles en una investigación</h3>
<table>
  <thead><tr><th>ID</th><th>Registro</th><th>Significa</th></tr></thead>
  <tbody>
    <tr><td>4624</td><td>Seguridad</td><td>Inicio de sesión correcto.</td></tr>
    <tr><td>4625</td><td>Seguridad</td><td>Inicio de sesión fallido.</td></tr>
    <tr><td>4672</td><td>Seguridad</td><td>Se asignaron privilegios especiales a un inicio de sesión.</td></tr>
    <tr><td>4688</td><td>Seguridad</td><td>Se creó un proceso (requiere tener activada esa auditoría).</td></tr>
    <tr><td>4720</td><td>Seguridad</td><td>Se creó una cuenta de usuario.</td></tr>
    <tr><td>4732</td><td>Seguridad</td><td>Se agregó un miembro a un grupo local con seguridad.</td></tr>
    <tr><td>1102</td><td>Seguridad</td><td>Se borró el registro de auditoría. Es una señal grave.</td></tr>
    <tr><td>7045</td><td>Sistema</td><td>Se instaló un servicio nuevo.</td></tr>
  </tbody>
</table>
<p>Que alguien borre los registros es una pista clásica de que alguien intenta ocultar sus huellas.</p>

<h2>6. Contención</h2>
<p>El objetivo es <strong>frenar el daño</strong> sin destruir la evidencia ni empeorar la situación.</p>
<table>
  <thead><tr><th>Tipo</th><th>Acciones de ejemplo</th></tr></thead>
  <tbody>
    <tr><td>Corto plazo (inmediata)</td><td>Aislar el equipo de la red, deshabilitar la cuenta, bloquear la IP, revocar sesiones y tokens.</td></tr>
    <tr><td>Largo plazo (estable)</td><td>Segmentar, aplicar reglas temporales en el firewall o WAF, rotar credenciales, parchear provisionalmente.</td></tr>
  </tbody>
</table>

<h3>Acciones según el escenario</h3>
<table>
  <thead><tr><th>Escenario</th><th>Contención típica</th></tr></thead>
  <tbody>
    <tr><td>Cuenta de usuario comprometida</td><td>Restablecer contraseña, cerrar todas las sesiones, revocar tokens, revisar reglas de reenvío y dispositivos registrados, exigir MFA.</td></tr>
    <tr><td>Equipo con malware</td><td>Aislarlo de la red (sin apagarlo si se necesita evidencia en memoria), desactivar sus cuentas.</td></tr>
    <tr><td>Ransomware</td><td>Desconectar los equipos afectados y los recursos compartidos, proteger las copias de seguridad, bloquear cuentas implicadas.</td></tr>
    <tr><td>Secreto filtrado en un repositorio</td><td>Revocar o rotar el secreto de inmediato (módulo de secretos).</td></tr>
    <tr><td>Vulnerabilidad explotada en una aplicación</td><td>Regla en WAF o gateway, desactivar la función afectada, desplegar la corrección.</td></tr>
  </tbody>
</table>

<div class="aviso">
  <strong>¿Apagar el equipo?</strong>
  Apagar borra la memoria RAM, que puede contener rastros valiosos (procesos, conexiones, claves). Por eso muchas veces se aísla el equipo de la red pero se deja encendido hasta que un analista decida. La excepción es cuando el daño avanza más rápido que cualquier otra consideración, por ejemplo un cifrado masivo en curso. Esa decisión la toma el líder del incidente.
</div>
<div class="nota">
  <strong>Cuidado con avisar al atacante</strong>
  Si el atacante sigue activo, ciertas acciones (como cambiar una contraseña antes de entender su alcance) pueden alertarlo y hacer que cambie de táctica. Los casos graves requieren coordinar la contención para actuar a la vez sobre todos los accesos.
</div>

<h2>7. Evidencia y cadena de custodia</h2>
<p>La evidencia permite entender qué ocurrió, y puede ser necesaria para trámites legales o seguros.</p>

<h3>Orden de volatilidad</h3>
<p>Se recoge primero lo que antes se pierde (principio descrito en el RFC 3227):</p>
<ol>
  <li>Registros del procesador y caché.</li>
  <li>Memoria RAM.</li>
  <li>Estado de red y procesos en ejecución.</li>
  <li>Contenido del disco.</li>
  <li>Registros en sistemas remotos.</li>
  <li>Copias de seguridad y medios archivados.</li>
</ol>

<h3>Buenas prácticas</h3>
<ul>
  <li><strong>No analices el original:</strong> trabaja sobre copias y conserva los originales intactos.</li>
  <li><strong>Calcula un hash</strong> de cada evidencia al recogerla y vuelve a comprobarlo después. Si coincide, no se alteró.</li>
  <li><strong>Documenta la cadena de custodia:</strong> quién la recogió, cuándo, cómo, dónde se guardó y quién la ha manejado.</li>
  <li><strong>Anota la hora</strong> con zona horaria y verifica que el reloj del equipo era correcto.</li>
  <li><strong>Almacena en un lugar seguro</strong> con acceso restringido.</li>
  <li><strong>Pide asesoría especializada</strong> si hay posibilidad de procesos legales.</li>
</ul>
<pre><code>Get-FileHash .\\evidencia.zip -Algorithm SHA256</code></pre>
<p>Ese comando de PowerShell calcula la huella SHA-256 de un archivo. Guarda el resultado junto al registro de la evidencia.</p>

<h2>8. Erradicación y recuperación</h2>
<h3>Erradicación: quitar la causa</h3>
<ul>
  <li>Eliminar el malware, las cuentas y los accesos creados por el atacante.</li>
  <li>Buscar y quitar mecanismos de persistencia.</li>
  <li>Corregir la vulnerabilidad que permitió la entrada.</li>
  <li>Rotar todas las credenciales que pudieron verse expuestas.</li>
  <li>En compromisos serios, es más seguro <strong>reconstruir el sistema desde una imagen limpia</strong> que intentar "limpiarlo", porque es difícil asegurar que no quede nada.</li>
</ul>

<h3>Recuperación: volver a la normalidad con seguridad</h3>
<ol>
  <li>Restaurar desde copias de seguridad <strong>anteriores al compromiso</strong> y verificadas como limpias.</li>
  <li>Volver los servicios por etapas, empezando por los más importantes.</li>
  <li>Reforzar la vigilancia durante un periodo: nuevas alertas, revisión de accesos.</li>
  <li>Comprobar que todo funciona y que la causa quedó cerrada.</li>
  <li>Comunicar a los usuarios cuando el servicio esté restablecido.</li>
</ol>
<div class="aviso">
  <strong>Restaurar una copia infectada reinicia el incidente</strong>
  Si la copia ya contiene al atacante o a su malware, restaurarla lo trae de vuelta. Por eso se verifica la fecha y el contenido.
</div>

<h2>9. Comunicación</h2>
<table>
  <thead><tr><th>Público</th><th>Qué necesita</th></tr></thead>
  <tbody>
    <tr><td>Equipo de respuesta</td><td>Actualizaciones frecuentes en un canal seguro, con una sola fuente de verdad.</td></tr>
    <tr><td>Dirección</td><td>Resúmenes breves con impacto, estado y decisiones por tomar.</td></tr>
    <tr><td>Personas afectadas</td><td>Qué pasó, qué datos, qué hacer para protegerse, a quién contactar.</td></tr>
    <tr><td>Autoridades y reguladores</td><td>Notificaciones en los plazos legales.</td></tr>
    <tr><td>Medios y público</td><td>Mensajes aprobados, con una sola persona portavoz.</td></tr>
  </tbody>
</table>
<ul>
  <li>Comunica <strong>hechos confirmados</strong>, no suposiciones.</li>
  <li>Fija un <strong>ritmo de actualizaciones</strong> (por ejemplo, cada hora) aunque sea para decir "sin novedades".</li>
  <li>Evita culpar o especular en mensajes públicos.</li>
  <li>Todo mensaje externo pasa por la revisión de legal y comunicación.</li>
</ul>
<div class="nota">
  <strong>Plazos de notificación</strong>
  Muchas leyes de protección de datos obligan a notificar las violaciones en plazos cortos. Por ejemplo, el RGPD de la Unión Europea exige avisar a la autoridad, cuando aplica, como máximo 72 horas después de tener conocimiento de la violación de datos personales. Otras leyes y contratos tienen sus propios plazos. Por eso el área legal debe participar desde las primeras horas.
</div>

<h2>10. Actividad posterior: lecciones aprendidas</h2>
<p>Pocos días después del cierre (idealmente una o dos semanas) se hace una revisión posterior al incidente. La clave es que sea <strong>sin culpas</strong>: se busca entender el sistema, no castigar personas.</p>
<h3>Preguntas de la revisión</h3>
<ul>
  <li>¿Qué pasó, con una línea de tiempo precisa?</li>
  <li>¿Qué hicimos bien?</li>
  <li>¿Qué tardamos en detectar o en decidir, y por qué?</li>
  <li>¿Qué falló en la prevención?</li>
  <li>¿Nos faltaron herramientas, permisos, información o contactos?</li>
  <li>¿Qué cambiamos para que no se repita?</li>
</ul>
<p>El resultado son <strong>acciones concretas</strong>, cada una con responsable y fecha, y actualización de playbooks, reglas de detección y capacitaciones.</p>

<h3>Métricas</h3>
<table>
  <thead><tr><th>Métrica</th><th>Mide</th></tr></thead>
  <tbody>
    <tr><td>Tiempo medio de detección (MTTD)</td><td>Cuánto pasa desde que ocurre hasta que se detecta.</td></tr>
    <tr><td>Tiempo medio de respuesta o contención</td><td>Cuánto se tarda en frenar el daño.</td></tr>
    <tr><td>Tiempo medio de recuperación</td><td>Cuánto se tarda en volver a la normalidad.</td></tr>
    <tr><td>Incidentes por categoría</td><td>Qué tipos se repiten.</td></tr>
    <tr><td>Acciones cerradas a tiempo</td><td>Si realmente se mejora después.</td></tr>
  </tbody>
</table>

<h2>11. Playbooks</h2>
<p>Un <strong>playbook</strong> es una guía paso a paso para un tipo de incidente concreto. Reduce la improvisación cuando hay estrés.</p>
<h3>Estructura</h3>
<ul>
  <li>Nombre y cuándo se usa.</li>
  <li>Responsables.</li>
  <li>Cómo confirmarlo.</li>
  <li>Pasos de contención, erradicación y recuperación.</li>
  <li>Qué evidencia recoger.</li>
  <li>A quién avisar y cuándo.</li>
  <li>Criterios para cerrar.</li>
</ul>

<div class="ejemplo">
  <strong>Ejemplo de playbook: secreto filtrado en un repositorio</strong>
  <ol>
    <li><strong>Confirmar:</strong> ¿qué secreto es? ¿de qué sistema? ¿cuánto tiempo estuvo expuesto? ¿el repositorio es público?</li>
    <li><strong>Contener (primeros minutos):</strong> revocar o rotar el secreto. No esperar a limpiar el historial.</li>
    <li><strong>Analizar:</strong> revisar los registros del servicio protegido por ese secreto desde el momento de la exposición, en busca de accesos no esperados.</li>
    <li><strong>Evaluar el daño:</strong> ¿se accedió a datos? ¿se crearon recursos? ¿hay obligación de notificar?</li>
    <li><strong>Erradicar:</strong> limpiar el historial del repositorio, avisar al equipo para volver a clonar, revisar bots o integraciones que usaban el secreto.</li>
    <li><strong>Recuperar:</strong> desplegar con el nuevo secreto, comprobar el funcionamiento.</li>
    <li><strong>Prevenir:</strong> activar detección de secretos antes del commit y en el pipeline.</li>
    <li><strong>Cerrar:</strong> revisión de lecciones aprendidas.</li>
  </ol>
</div>

<div class="ejemplo">
  <strong>Ejemplo de playbook: vulnerabilidad crítica en una dependencia</strong>
  <ol>
    <li><strong>Identificar:</strong> usar el SBOM o la herramienta SCA para saber qué aplicaciones usan la librería afectada.</li>
    <li><strong>Evaluar exposición:</strong> ¿la función vulnerable es alcanzable? ¿el sistema está expuesto a internet?</li>
    <li><strong>Mitigar de forma temporal:</strong> regla en el WAF, desactivar la función, aislar.</li>
    <li><strong>Corregir:</strong> actualizar a la versión corregida, probar y desplegar.</li>
    <li><strong>Buscar señales de explotación previa</strong> en los logs.</li>
    <li><strong>Verificar</strong> con un nuevo escaneo.</li>
    <li><strong>Documentar y aprender.</strong></li>
  </ol>
</div>

<h2>12. Preparar tus aplicaciones Java para responder bien</h2>
<p>Un desarrollador facilita mucho la respuesta si deja listas estas capacidades:</p>
<table>
  <thead><tr><th>Capacidad</th><th>Por qué ayuda</th></tr></thead>
  <tbody>
    <tr><td>Registros de eventos de seguridad estructurados</td><td>Permiten reconstruir quién hizo qué.</td></tr>
    <tr><td>Identificador de correlación en cada petición</td><td>Se sigue una petición a través de varios servicios.</td></tr>
    <tr><td>Poder revocar sesiones y tokens</td><td>Se echa a un atacante sin reiniciar todo.</td></tr>
    <tr><td>Rotar secretos y claves sin redesplegar</td><td>Contención rápida (módulo de secretos).</td></tr>
    <tr><td>Rotación de claves de firma de JWT con identificador de clave (kid)</td><td>Se invalidan tokens firmados con una clave comprometida.</td></tr>
    <tr><td>Interruptores para desactivar funciones (feature flags)</td><td>Se apaga una función vulnerable sin parar el sistema.</td></tr>
    <tr><td>Reglas de límite de uso ajustables en el gateway</td><td>Se frena un abuso mientras se corrige.</td></tr>
    <tr><td>Auditoría de acciones administrativas</td><td>Se detecta el abuso de cuentas privilegiadas.</td></tr>
  </tbody>
</table>
<p>Un ejemplo de registro de seguridad con campos claros:</p>
<pre><code>log.warn("evento=ACCESO_DENEGADO usuario={} recurso={} ip={} correlacion={}",
         usuario, recurso, ip, correlacionId);

log.info("evento=EXPORTACION_DATOS usuario={} registros={} correlacion={}",
         usuario, cantidad, correlacionId);</code></pre>
<p>Recuerda no incluir contraseñas, tokens ni datos personales innecesarios.</p>

<h2>13. Práctica en Windows: revisar eventos de seguridad de tu equipo</h2>
<div class="aviso legal">
  <strong>Solo en tu propio equipo</strong>
  Estas consultas son de lectura sobre tu propia computadora.
</div>
<ol>
  <li>Abre PowerShell <strong>como administrador</strong>: busca PowerShell en el menú Inicio, clic derecho y <strong>Ejecutar como administrador</strong>. (Leer el registro de seguridad requiere esos permisos.)</li>
  <li>Genera un evento de prueba: bloquea tu sesión (<code>Windows + L</code>) y escribe una contraseña incorrecta una vez. Vuelve a entrar con la correcta.</li>
  <li>Consulta los inicios de sesión fallidos recientes:</li>
</ol>
<pre><code>Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625} -MaxEvents 5 | Format-List TimeCreated, Message</code></pre>
<ol start="4">
  <li>Consulta los inicios de sesión correctos:</li>
</ol>
<pre><code>Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4624} -MaxEvents 5 | Select-Object TimeCreated</code></pre>
<ol start="5">
  <li>Revisa si alguna vez se borró el registro de auditoría (debería no haber resultados en un equipo normal):</li>
</ol>
<pre><code>Get-WinEvent -FilterHashtable @{LogName='Security'; Id=1102} -MaxEvents 5</code></pre>
<ol start="6">
  <li>Anota en una línea de tiempo tu propio evento: hora, evento y significado.</li>
</ol>
<div class="nota">
  <strong>Si no aparecen resultados</strong>
  Puede que la auditoría de ese evento esté desactivada en tu equipo, o que el comando indique que no se encontraron eventos. Eso también enseña algo: sin auditoría activada, no hay evidencia. Los comandos y la disponibilidad de eventos dependen de la versión y configuración de Windows.
</div>

<h2>14. Ejercicio de mesa (tabletop)</h2>
<p>Un ejercicio de mesa es una simulación hablada: el equipo se reúne, alguien lee un escenario por partes y todos discuten qué harían, sin tocar ningún sistema. Es la forma más barata de encontrar huecos en el plan.</p>

<h3>Escenario: la clave de pagos en un repositorio público</h3>
<table>
  <thead><tr><th>Momento</th><th>Novedad que lee el moderador</th></tr></thead>
  <tbody>
    <tr><td>Viernes 17:40</td><td>Un desarrollador avisa que, revisando un repositorio público de la empresa, vio que hace tres horas se subió un archivo de configuración con la clave de API del proveedor de pagos.</td></tr>
    <tr><td>18:05</td><td>El proveedor de pagos envía una alerta automática: se detectaron consultas desde una dirección IP desconocida con esa clave.</td></tr>
    <tr><td>18:30</td><td>Soporte reporta que un cliente dice haber recibido cobros que no hizo.</td></tr>
    <tr><td>Sábado 09:00</td><td>Un periodista pregunta en redes sociales si hubo una filtración.</td></tr>
  </tbody>
</table>
<p>Preguntas para discutir en cada momento:</p>
<ul>
  <li>¿Quién lidera? ¿A quién se avisa y cómo, un viernes por la tarde?</li>
  <li>¿Cuál es la primera acción técnica?</li>
  <li>¿Qué evidencia hay que conservar antes de cambiar cosas?</li>
  <li>¿Qué gravedad le damos y por qué?</li>
  <li>¿Hay datos personales o financieros involucrados? ¿Quién evalúa la obligación de notificar?</li>
  <li>¿Qué diremos al cliente? ¿Y al periodista? ¿Quién habla?</li>
  <li>¿Qué falló para que la clave llegara al repositorio?</li>
</ul>
<div class="ejemplo">
  <strong>Puntos que debería tocar una buena discusión</strong>
  Revocar la clave de inmediato y generar una nueva; revisar los registros del proveedor para ver qué se hizo con la clave expuesta; contactar al proveedor; evaluar el impacto en clientes; involucrar a legal por posibles obligaciones de notificación; preparar un mensaje breve y verificado para clientes y para prensa con un solo portavoz; limpiar el historial del repositorio sin retrasar la rotación; revisar por qué no se detectó el secreto antes (detección en pre-commit y pipeline); y cerrar con una revisión sin culpas.
</div>

<h2>15. Errores comunes</h2>
<ul>
  <li>No tener un plan hasta que ocurre el incidente.</li>
  <li>Que todos opinen y nadie decida (falta de líder).</li>
  <li>Apagar o reinstalar de inmediato y perder la evidencia.</li>
  <li>Cerrar el incidente sin entender cómo entró el atacante.</li>
  <li>Restaurar desde una copia que ya estaba comprometida.</li>
  <li>Comunicar suposiciones como si fueran hechos.</li>
  <li>Buscar culpables en lugar de causas.</li>
  <li>No practicar nunca.</li>
</ul>

<h2>16. Ejercicios</h2>
<ol>
  <li>Escribe un playbook breve (8 pasos) para el caso de una cuenta de usuario comprometida en tu aplicación.</li>
  <li>Dibuja una línea de tiempo con cinco eventos para un incidente de ransomware imaginario y señala en qué momento tendrías que haber detectado el problema.</li>
  <li>Explica por qué, en algunos casos, no se apaga un equipo comprometido y se aísla de la red.</li>
  <li>Define tres niveles de gravedad para tu organización o proyecto, con ejemplos y tiempos de respuesta.</li>
  <li>Organiza un ejercicio de mesa de 30 minutos con compañeros usando el escenario de la sección 14 y anota tres mejoras que descubran.</li>
  <li>Haz la práctica de Windows y escribe qué eventos te gustaría tener activados para investigar un incidente.</li>
</ol>
`,
  quiz: [
    {
      p: "¿Qué cambió con la revisión 3 de NIST SP 800-61, publicada en 2025?",
      o: ["Integra la respuesta a incidentes en la gestión de riesgos y se alinea con el CSF 2.0", "Se eliminó la respuesta a incidentes", "Ahora solo habla de antivirus", "Solo aplica a empresas pequeñas"],
      c: 0,
      e: "Reemplaza a la revisión 2 y ya no es un manual de pasos técnicos."
    },
    {
      p: "¿Qué diferencia hay entre un evento y un incidente?",
      o: ["Un evento es algo observable; un incidente es un evento que afecta o puede afectar la seguridad", "Son lo mismo", "Un incidente es siempre un virus", "Un evento solo ocurre en servidores"],
      c: 0,
      e: "El triaje decide si un evento se convierte en incidente."
    },
    {
      p: "Durante una crisis, ¿por qué debe haber un único líder del incidente?",
      o: ["Para evitar que todos opinen y nadie decida", "Porque es más barato", "Porque lo exige Windows", "Para que otros no trabajen"],
      c: 0,
      e: "Coordina, prioriza y decide."
    },
    {
      p: "¿Qué debe incluir toda línea de tiempo de un incidente?",
      o: ["Hora con zona horaria, fuente y evento", "Solo nombres de personas", "Solo colores", "Nada de horas"],
      c: 0,
      e: "Se recomienda unificar todo en UTC."
    },
    {
      p: "Encuentras en un equipo el evento 1102 (registro de auditoría borrado). ¿Qué sugiere?",
      o: ["Que alguien pudo intentar ocultar sus huellas", "Que todo está normal", "Que el equipo se actualizó", "Que hay un error de impresión"],
      c: 0,
      e: "Es una señal grave en una investigación."
    },
    {
      p: "¿Por qué muchas veces se aísla de la red un equipo comprometido sin apagarlo?",
      o: ["Porque apagar borra la memoria RAM, que puede tener rastros valiosos", "Porque los equipos no se pueden apagar", "Para ahorrar electricidad", "Porque lo prohíbe la ley"],
      c: 0,
      e: "La decisión la toma el líder; hay excepciones si el daño avanza muy rápido."
    },
    {
      p: "¿Qué es la cadena de custodia?",
      o: ["El registro de quién recogió, guardó y manejó la evidencia, y cuándo", "Una cadena de tiendas", "Un tipo de cifrado", "Un tipo de copia de seguridad"],
      c: 0,
      e: "Permite demostrar que la evidencia no fue alterada."
    },
    {
      p: "¿Para qué se calcula un hash de la evidencia?",
      o: ["Para poder comprobar después que no se alteró", "Para comprimirla", "Para cifrarla", "Para borrarla"],
      c: 0,
      e: "Si el hash coincide, la evidencia es la misma."
    },
    {
      p: "Tras un incidente grave, ¿qué es más seguro que intentar 'limpiar' un sistema?",
      o: ["Reconstruirlo desde una imagen limpia", "Cambiarle el nombre", "Dejarlo como está", "Apagar el antivirus"],
      c: 0,
      e: "Es difícil asegurar que no quede nada del atacante."
    },
    {
      p: "¿Qué riesgo tiene restaurar una copia de seguridad sin verificarla?",
      o: ["Que la copia ya contenga al atacante y se reinicie el incidente", "Que sea demasiado pequeña", "Que se borre la red", "Ninguno"],
      c: 0,
      e: "Hay que verificar que la copia sea anterior al compromiso y esté limpia."
    },
    {
      p: "En comunicación de incidentes, ¿qué principio es correcto?",
      o: ["Comunicar hechos confirmados, con un portavoz único y revisión legal", "Especular para tranquilizar", "Que cada persona hable con los medios", "No comunicar nunca"],
      c: 0,
      e: "Las suposiciones comunicadas como hechos dañan la confianza."
    },
    {
      p: "¿Cuál es el espíritu correcto de una revisión de lecciones aprendidas?",
      o: ["Sin culpas, buscando mejorar el sistema con acciones, responsables y fechas", "Encontrar a quién castigar", "Olvidar el incidente rápido", "Cambiar de proveedor siempre"],
      c: 0,
      e: "Si se castiga, la gente oculta errores y no se aprende."
    }
  ]
};
