CURSO.contenido.i01 = {
  html: `
<p>Ya sabes cómo funciona una red a nivel básico. Ahora verás cómo se protege: qué protocolos usar, cómo filtra el tráfico un firewall, para qué sirve una VPN y por qué se divide una red en zonas.</p>

<h2>1. Protocolos seguros frente a inseguros</h2>
<p>Muchos protocolos antiguos enviaban todo en texto claro, incluidas las contraseñas. Hoy existen versiones cifradas que debes preferir.</p>
<table>
  <thead><tr><th>Para qué</th><th>Inseguro</th><th>Seguro</th></tr></thead>
  <tbody>
    <tr><td>Navegación web</td><td>HTTP (puerto 80)</td><td>HTTPS (puerto 443)</td></tr>
    <tr><td>Administración remota</td><td>Telnet (23)</td><td>SSH (22)</td></tr>
    <tr><td>Transferencia de archivos</td><td>FTP (21)</td><td>SFTP o FTPS</td></tr>
    <tr><td>Correo</td><td>SMTP, POP3, IMAP sin cifrado</td><td>Los mismos con TLS</td></tr>
    <tr><td>Resolución de nombres</td><td>DNS tradicional</td><td>DNS sobre HTTPS o TLS (DoH, DoT)</td></tr>
  </tbody>
</table>

<h3>TLS: lo que hay debajo de HTTPS</h3>
<p><strong>TLS</strong> es el protocolo que cifra la conexión. Hace tres cosas:</p>
<ol>
  <li><strong>Cifra</strong> lo que viaja, para que nadie lo lea.</li>
  <li><strong>Autentica</strong> al servidor con un certificado, para saber que hablas con el sitio verdadero.</li>
  <li><strong>Protege la integridad</strong>, para detectar si alguien modificó los datos.</li>
</ol>
<div class="nota">
  <strong>SSL ya no se usa</strong>
  Aunque mucha gente dice "certificado SSL", los protocolos SSL y las versiones antiguas de TLS están obsoletos. Hoy se usan TLS 1.2 y TLS 1.3.
</div>

<h2>2. Firewall</h2>
<p>Un <strong>firewall</strong> decide qué tráfico de red puede pasar y cuál se bloquea, según reglas.</p>
<div class="analogia">
  <strong>Analogía: el guardia de la entrada</strong>
  El guardia tiene una lista: quién puede entrar, a qué piso y a qué hora. Quien no cumple, se queda afuera. El firewall revisa de dónde viene el tráfico, a dónde va y por qué puerto.
</div>

<h3>Cómo se escribe una regla</h3>
<table>
  <thead><tr><th>Origen</th><th>Destino</th><th>Puerto</th><th>Acción</th></tr></thead>
  <tbody>
    <tr><td>Cualquiera</td><td>Servidor web</td><td>443</td><td>Permitir</td></tr>
    <tr><td>Red de administración</td><td>Servidor web</td><td>22</td><td>Permitir</td></tr>
    <tr><td>Cualquiera</td><td>Cualquiera</td><td>Cualquiera</td><td>Denegar</td></tr>
  </tbody>
</table>
<p>Las reglas se leen de arriba hacia abajo y la última suele ser <strong>denegar todo lo demás</strong>. Esta idea se llama <strong>lista blanca</strong> o "denegar por defecto": solo pasa lo explícitamente permitido.</p>

<h3>Tipos principales</h3>
<ul>
  <li><strong>De red:</strong> filtra por direcciones IP y puertos.</li>
  <li><strong>De estado (stateful):</strong> recuerda las conexiones abiertas y solo deja pasar respuestas a lo que tú pediste.</li>
  <li><strong>De aplicación web (WAF):</strong> entiende el tráfico web y bloquea ataques como inyecciones.</li>
  <li><strong>Personal (en tu equipo):</strong> como el Firewall de Windows.</li>
</ul>
<div class="aviso">
  <strong>Un firewall no hace magia</strong>
  No detiene a quien ya está dentro, ni a un usuario que descarga un archivo malicioso, ni errores de programación. Es una capa más, no la solución completa.
</div>

<h2>3. VPN</h2>
<p>Una <strong>VPN</strong> (red privada virtual) crea un "túnel" cifrado entre tu dispositivo y otra red.</p>
<div class="analogia">
  <strong>Analogía: el pasadizo privado</strong>
  En lugar de caminar por la calle pública donde te ven, vas por un túnel cerrado hasta la oficina. Quien está afuera no ve qué llevas ni a dónde vas, aunque sabe que usas el túnel.
</div>
<table>
  <thead><tr><th>Uso</th><th>Para qué</th></tr></thead>
  <tbody>
    <tr><td>Acceso remoto a una empresa</td><td>Entrar de forma segura a recursos internos desde casa.</td></tr>
    <tr><td>Proteger tráfico en Wi-Fi público</td><td>Evita que otros en esa red lo espíen.</td></tr>
    <tr><td>Conectar sucursales</td><td>Unir oficinas como si estuvieran en la misma red.</td></tr>
  </tbody>
</table>
<div class="aviso">
  <strong>Las VPN comerciales no te vuelven invisible</strong>
  Solo trasladan la confianza: ahora tu proveedor de VPN puede ver tu tráfico. Elige uno de reputación comprobada. Y la VPN no protege si ya entregaste tu contraseña a un sitio falso.
</div>

<h2>4. Segmentación de redes</h2>
<p>Consiste en dividir una red grande en <strong>zonas</strong> más pequeñas, con reglas entre ellas.</p>
<div class="analogia">
  <strong>Analogía: los compartimentos de un barco</strong>
  Un barco tiene compartimentos estancos. Si uno se inunda, los demás siguen a salvo. En una red segmentada, si un equipo se infecta, el daño se limita a su zona.
</div>
<table>
  <thead><tr><th>Zona</th><th>Qué contiene</th></tr></thead>
  <tbody>
    <tr><td>Usuarios</td><td>Laptops y equipos del personal.</td></tr>
    <tr><td>Servidores</td><td>Aplicaciones y bases de datos internas.</td></tr>
    <tr><td>DMZ</td><td>Servidores visibles desde internet, como el sitio web. Está aislada del resto.</td></tr>
    <tr><td>Invitados</td><td>Visitas y dispositivos no confiables.</td></tr>
    <tr><td>Administración</td><td>Acceso restringido para gestionar equipos.</td></tr>
  </tbody>
</table>
<p>La segmentación se implementa con <strong>VLAN</strong>, subredes y reglas de firewall entre zonas.</p>
<div class="nota">
  <strong>Movimiento lateral</strong>
  Cuando un atacante entra a un equipo, intenta saltar a otros. La segmentación hace ese salto mucho más difícil.
</div>

<h2>5. Detección de intrusos: IDS e IPS</h2>
<table>
  <thead><tr><th>Sistema</th><th>Qué hace</th><th>Analogía</th></tr></thead>
  <tbody>
    <tr><td>IDS (detección)</td><td>Observa el tráfico y <strong>avisa</strong> si ve algo sospechoso.</td><td>La alarma que suena.</td></tr>
    <tr><td>IPS (prevención)</td><td>Además de avisar, <strong>bloquea</strong> el tráfico sospechoso.</td><td>La alarma que además cierra la puerta.</td></tr>
  </tbody>
</table>
<p>Funcionan con <strong>firmas</strong> (patrones de ataques conocidos) o con <strong>anomalías</strong> (comportamientos que se salen de lo normal). Las firmas no detectan ataques nuevos y las anomalías pueden generar falsas alarmas.</p>

<h2>6. Confianza cero (Zero Trust)</h2>
<p>El modelo antiguo era "castillo y foso": lo de adentro es confiable y lo de afuera no. Hoy se asume que un atacante puede estar ya dentro. Zero Trust se resume en <strong>"nunca confíes, siempre verifica"</strong>: cada acceso se autentica y se autoriza, esté donde esté el usuario.</p>

<h2>7. Práctica: mirar tu propia red desde Windows</h2>
<div class="aviso legal">
  <strong>Solo en tu propio equipo</strong>
  Los comandos siguientes son de consulta y los ejecutas en tu computadora. No escanees redes ni equipos que no sean tuyos.
</div>
<p>Abre <strong>PowerShell</strong> (tecla Windows, escribe PowerShell, Enter) y prueba:</p>
<pre><code>ipconfig</code></pre>
<p>Muestra tu dirección IP, la puerta de enlace (el router) y los DNS que usas.</p>
<pre><code>ping 8.8.8.8</code></pre>
<p>Comprueba si tienes conexión a internet. Si responde, la red funciona.</p>
<pre><code>nslookup ejemplo.com</code></pre>
<p>Pide al DNS la IP de un nombre. Así ves cómo funciona la traducción.</p>
<pre><code>netstat -ano</code></pre>
<p>Lista las conexiones y puertos abiertos de tu equipo. Fíjate en las filas con estado <code>LISTENING</code>: son puertos esperando conexiones. La última columna es el número de proceso (PID).</p>

<h3>Revisar tu firewall de Windows</h3>
<ol>
  <li>Abre <strong>Seguridad de Windows</strong>.</li>
  <li>Entra a <strong>Firewall y protección de red</strong>.</li>
  <li>Comprueba que esté activado para las redes de dominio, privada y pública.</li>
</ol>

<h2>8. Ejercicios</h2>
<ol>
  <li>Diseña una red pequeña para una oficina con servidor web público, servidores internos, laptops y red de invitados. Dibuja las zonas y escribe tres reglas de firewall.</li>
  <li>Explica con tus palabras la diferencia entre IDS e IPS.</li>
  <li>Ejecuta <code>ipconfig</code> y <code>netstat -ano</code> en tu equipo y anota tres cosas que descubras.</li>
</ol>
`,
  quiz: [
    {
      p: "¿Qué protocolo seguro reemplaza a Telnet para administración remota?",
      o: ["FTP", "SSH", "HTTP", "SMTP"],
      c: 1,
      e: "SSH cifra la sesión de administración remota."
    },
    {
      p: "¿Qué tres cosas hace TLS?",
      o: ["Cifra, autentica al servidor y protege la integridad", "Solo comprime", "Solo hace más rápida la web", "Bloquea anuncios"],
      c: 0,
      e: "Estas tres protecciones son las que hacen seguro a HTTPS."
    },
    {
      p: "¿Qué significa 'denegar por defecto' en un firewall?",
      o: ["Permitir todo y bloquear algunos casos", "Bloquear todo lo que no esté explícitamente permitido", "Apagar el firewall", "Borrar los registros"],
      c: 1,
      e: "Es el enfoque de lista blanca: solo pasa lo autorizado."
    },
    {
      p: "¿Qué tipo de firewall entiende el tráfico web y bloquea ataques como inyecciones?",
      o: ["WAF", "VLAN", "VPN", "DNS"],
      c: 0,
      e: "El WAF (Web Application Firewall) protege aplicaciones web."
    },
    {
      p: "¿Para qué sirve una VPN?",
      o: ["Para crear un túnel cifrado entre tu dispositivo y otra red", "Para hacer más rápidos los videojuegos", "Para eliminar virus", "Para cambiar tu contraseña"],
      c: 0,
      e: "Protege el tráfico en el trayecto, pero no evita el phishing."
    },
    {
      p: "¿Cuál es el beneficio principal de segmentar una red?",
      o: ["Que se vea más ordenada", "Limitar el daño si un equipo se compromete", "Gastar más cables", "Que no haya contraseñas"],
      c: 1,
      e: "Es como los compartimentos estancos de un barco."
    },
    {
      p: "¿Qué es una DMZ?",
      o: ["Una zona aislada para servidores visibles desde internet", "Un tipo de virus", "Un cable especial", "Una contraseña"],
      c: 0,
      e: "Evita que un servidor expuesto dé acceso directo a la red interna."
    },
    {
      p: "¿Qué diferencia hay entre un IDS y un IPS?",
      o: ["El IDS avisa; el IPS además bloquea", "No hay diferencia", "El IPS solo funciona en celulares", "El IDS cifra datos"],
      c: 0,
      e: "Detección frente a prevención."
    },
    {
      p: "¿Qué comando de Windows muestra tu IP, puerta de enlace y DNS?",
      o: ["ipconfig", "format", "shutdown", "copy"],
      c: 0,
      e: "Es un comando de consulta que no cambia nada."
    }
  ]
};
