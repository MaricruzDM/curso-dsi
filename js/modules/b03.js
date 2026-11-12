CURSO.contenido.b03 = {
  html: `
<p>Conocer las amenazas más comunes te ayuda a reconocerlas a tiempo. Muchas veces no hace falta ser un experto: basta con saber qué buscar.</p>

<h2>1. ¿Quién ataca y por qué?</h2>
<table>
  <thead><tr><th>Quién</th><th>Qué busca</th></tr></thead>
  <tbody>
    <tr><td>Delincuentes comunes</td><td>Dinero: robar cuentas, pedir rescates, vender datos.</td></tr>
    <tr><td>Grupos organizados</td><td>Ataques masivos o dirigidos a empresas.</td></tr>
    <tr><td>Activistas</td><td>Hacer pública una causa o dañar la imagen de alguien.</td></tr>
    <tr><td>Personas internas</td><td>Venganza, dinero, o simples errores sin mala intención.</td></tr>
    <tr><td>Curiosos o aficionados</td><td>Probar, presumir o experimentar.</td></tr>
  </tbody>
</table>
<div class="nota">
  <strong>La mayoría ataca por dinero y por oportunidad</strong>
  No eligen "a quién" sino "a quién sea más fácil". Por eso los hábitos básicos protegen tanto.
</div>

<h2>2. Malware</h2>
<p><strong>Malware</strong> es software creado para causar daño. Hay varios tipos:</p>
<table>
  <thead><tr><th>Tipo</th><th>Qué hace</th><th>Analogía</th></tr></thead>
  <tbody>
    <tr><td>Virus</td><td>Se pega a un archivo y se propaga cuando lo abres.</td><td>Un resfriado que se contagia al tocar algo.</td></tr>
    <tr><td>Gusano</td><td>Se copia solo por la red, sin que nadie lo abra.</td><td>Una plaga que se esparce sola.</td></tr>
    <tr><td>Troyano</td><td>Parece un programa útil pero esconde algo dañino.</td><td>El caballo de Troya: regalo con sorpresa.</td></tr>
    <tr><td>Spyware</td><td>Espía lo que haces y lo envía a otra persona.</td><td>Un micrófono escondido.</td></tr>
    <tr><td>Ransomware</td><td>Cifra tus archivos y pide dinero para devolverlos.</td><td>Un secuestro de tus documentos.</td></tr>
    <tr><td>Keylogger</td><td>Registra lo que escribes, incluidas contraseñas.</td><td>Alguien mirando tu teclado.</td></tr>
    <tr><td>Adware</td><td>Muestra anuncios molestos y a veces redirige.</td><td>Un vendedor insistente.</td></tr>
  </tbody>
</table>

<h3>¿Cómo llega el malware?</h3>
<ul>
  <li>Archivos adjuntos en correos.</li>
  <li>Descargas de programas piratas o de sitios no oficiales.</li>
  <li>Enlaces falsos.</li>
  <li>Memorias USB desconocidas.</li>
  <li>Programas sin actualizar que tienen fallos.</li>
</ul>

<h2>3. Ingeniería social</h2>
<p>Es el arte de <strong>engañar a las personas</strong> para que entreguen información o hagan algo que no deberían. No ataca la computadora, ataca al humano.</p>
<div class="analogia">
  <strong>Analogía: el falso técnico</strong>
  Alguien llega a tu casa con uniforme y dice que viene a revisar el gas. No forzó ninguna puerta: tú se la abriste. La ingeniería social funciona igual.
</div>
<p>Los atacantes usan estas emociones:</p>
<ul>
  <li><strong>Urgencia:</strong> "Tu cuenta se cerrará en una hora".</li>
  <li><strong>Miedo:</strong> "Detectamos actividad sospechosa".</li>
  <li><strong>Autoridad:</strong> "Soy del banco" o "Soy tu jefe".</li>
  <li><strong>Curiosidad o codicia:</strong> "Ganaste un premio".</li>
  <li><strong>Ayuda:</strong> "Necesito que me hagas un favor rápido".</li>
</ul>

<h2>4. Phishing</h2>
<p>Es un engaño por correo electrónico que imita a una empresa real para que entregues datos o hagas clic en un enlace.</p>
<table>
  <thead><tr><th>Variante</th><th>Cómo llega</th></tr></thead>
  <tbody>
    <tr><td>Phishing</td><td>Correo masivo que imita a un banco o servicio.</td></tr>
    <tr><td>Spear phishing</td><td>Correo dirigido a una persona concreta, con datos personales.</td></tr>
    <tr><td>Smishing</td><td>Mensaje de texto (SMS) o de mensajería.</td></tr>
    <tr><td>Vishing</td><td>Llamada telefónica.</td></tr>
    <tr><td>Quishing</td><td>Código QR falso.</td></tr>
  </tbody>
</table>

<h3>Cómo detectar un mensaje sospechoso</h3>
<ol>
  <li><strong>Remitente:</strong> ¿la dirección coincide realmente con la empresa? Observa letras cambiadas.</li>
  <li><strong>Urgencia o amenaza:</strong> piden actuar ya o algo malo pasará.</li>
  <li><strong>Enlaces:</strong> pasa el cursor sin hacer clic y mira a dónde lleva.</li>
  <li><strong>Pedidos de datos:</strong> una empresa seria no pide contraseñas por correo.</li>
  <li><strong>Errores de redacción</strong> o saludos genéricos como "Estimado cliente".</li>
  <li><strong>Adjuntos inesperados</strong>, sobre todo comprimidos o con macros.</li>
</ol>
<div class="ejemplo">
  <strong>Ejemplo de mensaje sospechoso</strong>
  <pre><code>De: soporte@banc0-seguro.com
Asunto: URGENTE: Su cuenta será bloqueada

Estimado cliente, detectamos acceso no autorizado.
Verifique sus datos en las próximas 2 horas aquí:
http://banco-verificacion.net/entrar</code></pre>
  Señales: dominio con un cero en lugar de "o", urgencia, saludo genérico, enlace a otro dominio y uso de HTTP.
</div>
<div class="nota">
  <strong>Qué hacer</strong>
  No hagas clic ni respondas. Entra a la página oficial escribiendo tú la dirección, o llama al número que aparece en tu tarjeta.
</div>

<h2>5. Ataques a contraseñas</h2>
<table>
  <thead><tr><th>Ataque</th><th>Cómo funciona</th></tr></thead>
  <tbody>
    <tr><td>Fuerza bruta</td><td>Probar combinaciones hasta acertar.</td></tr>
    <tr><td>Diccionario</td><td>Probar palabras y contraseñas comunes.</td></tr>
    <tr><td>Credential stuffing</td><td>Usar usuarios y contraseñas filtrados de un sitio para entrar a otros.</td></tr>
    <tr><td>Shoulder surfing</td><td>Mirar por encima del hombro mientras escribes.</td></tr>
  </tbody>
</table>
<div class="analogia">
  <strong>Analogía: el llavero con la misma llave</strong>
  Si una sola llave abre tu casa, tu coche y tu oficina, perderla es un desastre. Usar la misma contraseña en varios sitios es igual.
</div>

<h2>6. Ataques que afectan la disponibilidad</h2>
<p>Un ataque de <strong>denegación de servicio (DoS)</strong> satura un sistema para que no pueda atender a usuarios reales. Si se hace desde muchos dispositivos a la vez, se llama <strong>DDoS</strong>.</p>
<div class="analogia">
  <strong>Analogía: la tienda llena de curiosos</strong>
  Mil personas entran a una tienda pequeña sin comprar nada. Los clientes verdaderos no pueden pasar.
</div>

<h2>7. Hombre en el medio (Man in the Middle)</h2>
<p>Alguien se coloca en medio de la comunicación entre dos partes para escuchar o modificar lo que se dice.</p>
<div class="analogia">
  <strong>Analogía: el cartero tramposo</strong>
  El cartero abre tus cartas, las lee, a veces las cambia y las vuelve a cerrar. Ni tú ni el destinatario lo notan. HTTPS y las VPN ayudan a evitarlo.
</div>
<div class="aviso">
  <strong>Ojo con las redes Wi-Fi públicas</strong>
  Un atacante puede crear una red falsa con el mismo nombre que la de la cafetería. Evita hacer operaciones sensibles en redes abiertas.
</div>

<h2>8. Amenazas internas</h2>
<p>No todo viene de fuera. Un empleado descontento, o uno descuidado que comparte un archivo por error, también es una amenaza.</p>

<h2>9. Vulnerabilidades sin corregir y "día cero"</h2>
<p>Los programas tienen fallos. Cuando los fabricantes los descubren, publican actualizaciones. Los atacantes aprovechan a quienes no actualizan. Un <strong>día cero</strong> es un fallo que se explota antes de que exista la corrección.</p>

<h2>10. Etapas típicas de un ataque (visión simple)</h2>
<ol>
  <li><strong>Reconocimiento:</strong> investigan a la víctima.</li>
  <li><strong>Acceso inicial:</strong> consiguen entrar (phishing, contraseña filtrada, fallo sin parchar).</li>
  <li><strong>Movimiento:</strong> exploran y ganan más permisos.</li>
  <li><strong>Objetivo:</strong> roban datos, cifran archivos o dañan sistemas.</li>
  <li><strong>Huida:</strong> borran huellas.</li>
</ol>
<p>Cada etapa es una oportunidad para detectarlos y detenerlos.</p>

<h2>11. Ejercicios</h2>
<ol>
  <li>Revisa tu bandeja de correo no deseado y busca señales de phishing de las que viste en este módulo.</li>
  <li>Clasifica cada caso: (a) un archivo cifrado con petición de rescate; (b) una llamada que dice ser del banco; (c) una página que se cae por millones de visitas falsas.</li>
  <li>Escribe una regla personal: "Antes de hacer clic en un enlace de un mensaje, yo...".</li>
</ol>
`,
  quiz: [
    {
      p: "¿Qué tipo de malware cifra tus archivos y pide dinero para devolverlos?",
      o: ["Adware", "Ransomware", "Keylogger", "Gusano"],
      c: 1,
      e: "El ransomware secuestra los archivos."
    },
    {
      p: "¿Qué es la ingeniería social?",
      o: ["Un tipo de virus", "Engañar a las personas para que entreguen información o hagan algo indebido", "Una herramienta de redes", "Un tipo de contraseña"],
      c: 1,
      e: "El ataque va dirigido al humano, no a la máquina."
    },
    {
      p: "¿Cuál es una señal típica de un correo de phishing?",
      o: ["Remitente con el dominio exacto de la empresa y sin presión", "Urgencia, amenaza y enlace a otro dominio", "Un saludo con tu nombre completo y sin enlaces", "Ninguna de las anteriores"],
      c: 1,
      e: "Presionar para actuar rápido es muy común."
    },
    {
      p: "Recibes un SMS con un enlace falso del banco. ¿Cómo se llama esa variante?",
      o: ["Vishing", "Smishing", "Quishing", "Spear phishing"],
      c: 1,
      e: "Smishing es phishing por mensaje de texto."
    },
    {
      p: "¿Qué es el credential stuffing?",
      o: ["Probar usuarios y contraseñas filtrados de un sitio en otros sitios", "Cifrar contraseñas", "Instalar un antivirus", "Crear contraseñas largas"],
      c: 0,
      e: "Por eso no se debe repetir contraseñas."
    },
    {
      p: "¿Qué busca un ataque DDoS?",
      o: ["Robar contraseñas", "Dejar un servicio sin disponibilidad saturándolo", "Instalar spyware", "Cambiar datos de un documento"],
      c: 1,
      e: "Afecta la disponibilidad."
    },
    {
      p: "Un programa que parece útil pero esconde código dañino es un:",
      o: ["Gusano", "Troyano", "Cookie", "Router"],
      c: 1,
      e: "Es el caballo de Troya."
    },
    {
      p: "Recibes un correo urgente del banco con un enlace. ¿Qué haces?",
      o: ["Hago clic para evitar el bloqueo", "No hago clic y entro a la web oficial escribiendo la dirección yo mismo", "Reenvío el correo a todos", "Respondo con mis datos"],
      c: 1,
      e: "Nunca uses el enlace del mensaje sospechoso."
    },
    {
      p: "¿Qué es un ataque de día cero?",
      o: ["Un ataque que dura cero segundos", "Explotar un fallo antes de que exista la corrección", "Un ataque a cuentas nuevas", "Un virus que se borra solo"],
      c: 1,
      e: "El fabricante todavía no ha tenido tiempo de corregirlo."
    }
  ]
};
