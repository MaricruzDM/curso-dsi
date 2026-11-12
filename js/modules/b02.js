CURSO.contenido.b02 = {
  html: `
<p>Para entender cómo se ataca y cómo se protege algo, hay que saber cómo funciona. No necesitas ser experto en redes: este módulo explica solo lo mínimo, con analogías.</p>

<h2>1. ¿Qué es una red?</h2>
<p>Una <strong>red</strong> es un conjunto de dispositivos conectados para intercambiar información: celulares, laptops, impresoras, servidores. <strong>Internet</strong> es la red de redes: millones de redes conectadas entre sí.</p>
<div class="analogia">
  <strong>Analogía: el sistema de carreteras</strong>
  Cada ciudad tiene sus calles (una red local). Las carreteras que unen ciudades forman la gran red que llamamos internet. Los datos viajan como autos por esas rutas.
</div>

<h2>2. Cliente y servidor</h2>
<ul>
  <li><strong>Cliente:</strong> quien pide algo. Tu navegador o tu aplicación del banco.</li>
  <li><strong>Servidor:</strong> quien responde. Una computadora que guarda páginas, datos o servicios.</li>
</ul>
<div class="analogia">
  <strong>Analogía: el restaurante</strong>
  Tú eres el cliente y haces un pedido. La cocina es el servidor: recibe el pedido, lo prepara y entrega una respuesta. Entre ustedes está el mesero, que son las reglas de comunicación.
</div>

<h2>3. Dirección IP</h2>
<p>Cada dispositivo conectado a una red tiene una <strong>dirección IP</strong>, que sirve para saber a dónde enviar la información.</p>
<div class="analogia">
  <strong>Analogía: la dirección postal</strong>
  Para recibir una carta necesitas una dirección. La IP es la dirección de tu dispositivo en la red.
</div>
<table>
  <thead><tr><th>Tipo</th><th>Qué es</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td>IP privada</td><td>Se usa dentro de tu casa u oficina. Nadie de afuera llega directo a ella.</td><td><code>192.168.1.15</code></td></tr>
    <tr><td>IP pública</td><td>La que ve internet cuando te conectas. La asigna tu proveedor.</td><td>Varía según tu proveedor.</td></tr>
  </tbody>
</table>
<p>El <strong>router</strong> es el aparato que conecta tu red privada con internet. Reparte direcciones privadas a tus dispositivos y usa una sola pública para salir al exterior.</p>

<h2>4. DNS: la agenda de internet</h2>
<p>A las personas nos resulta fácil recordar nombres como <code>ejemplo.com</code>, pero las computadoras usan números. El <strong>DNS</strong> traduce los nombres en direcciones IP.</p>
<div class="analogia">
  <strong>Analogía: la agenda de contactos</strong>
  Tú buscas "Mamá" en tu celular y él sabe qué número marcar. El DNS hace lo mismo con los sitios web.
</div>
<div class="aviso">
  <strong>Por qué importa en seguridad</strong>
  Si alguien engaña al DNS o te hace entrar a un nombre parecido (<code>banc0.com</code> en lugar de <code>banco.com</code>), llegas a un sitio falso sin darte cuenta.
</div>

<h2>5. Partes de una dirección web (URL)</h2>
<pre><code>https://www.ejemplo.com:443/cuenta/saldo?id=10</code></pre>
<table>
  <thead><tr><th>Parte</th><th>Significado</th></tr></thead>
  <tbody>
    <tr><td><code>https</code></td><td>El protocolo: las reglas de comunicación.</td></tr>
    <tr><td><code>www.ejemplo.com</code></td><td>El dominio: el nombre del servidor.</td></tr>
    <tr><td><code>:443</code></td><td>El puerto (normalmente no se escribe).</td></tr>
    <tr><td><code>/cuenta/saldo</code></td><td>La ruta: qué página o recurso se pide.</td></tr>
    <tr><td><code>?id=10</code></td><td>Parámetros: datos extra que se envían.</td></tr>
  </tbody>
</table>
<div class="nota">
  <strong>El dominio real está antes de la primera barra</strong>
  En <code>https://banco.com.sitio-falso.net/login</code>, el dominio real es <code>sitio-falso.net</code>, no <code>banco.com</code>. Lee la dirección de derecha a izquierda hasta el primer punto antes de la barra.
</div>

<h2>6. Puertos</h2>
<p>Un servidor puede ofrecer varios servicios a la vez. Cada servicio escucha en un <strong>puerto</strong>, que es un número.</p>
<div class="analogia">
  <strong>Analogía: el edificio de departamentos</strong>
  La IP es la dirección del edificio y el puerto es el número de departamento. Para entregar un paquete necesitas las dos cosas.
</div>
<table>
  <thead><tr><th>Puerto</th><th>Servicio</th></tr></thead>
  <tbody>
    <tr><td>80</td><td>HTTP (web sin protección)</td></tr>
    <tr><td>443</td><td>HTTPS (web protegida)</td></tr>
    <tr><td>22</td><td>SSH (administración remota segura)</td></tr>
    <tr><td>25 / 587</td><td>Envío de correo</td></tr>
    <tr><td>53</td><td>DNS</td></tr>
  </tbody>
</table>
<p>Cada puerto abierto es una puerta más que podría atacarse. Por eso solo se abren los necesarios.</p>

<h2>7. HTTP y HTTPS</h2>
<p><strong>HTTP</strong> es el protocolo con el que se piden y entregan páginas web. <strong>HTTPS</strong> es lo mismo, pero con la comunicación <strong>cifrada</strong>.</p>
<div class="analogia">
  <strong>Analogía: postal frente a sobre sellado</strong>
  Una postal (HTTP) la puede leer cualquiera que la tenga en las manos durante el trayecto. Un sobre sellado (HTTPS) solo lo abre el destinatario.
</div>
<div class="aviso">
  <strong>El candado no significa que el sitio sea de confianza</strong>
  El candado indica que la conexión va cifrada, no que el sitio sea honesto. Un sitio falso también puede tener candado. Revisa siempre el dominio.
</div>

<h2>8. Qué pasa cuando abres una página</h2>
<ol>
  <li>Escribes el nombre del sitio en el navegador.</li>
  <li>El DNS traduce el nombre a una IP.</li>
  <li>Tu navegador se conecta al servidor por el puerto 443.</li>
  <li>Se establece una conexión cifrada (HTTPS).</li>
  <li>El navegador pide la página y el servidor responde.</li>
  <li>Tu navegador muestra la página.</li>
</ol>

<h2>9. Cookies</h2>
<p>Una <strong>cookie</strong> es un pequeño dato que el sitio guarda en tu navegador para recordar algo, por ejemplo que ya iniciaste sesión.</p>
<div class="analogia">
  <strong>Analogía: la pulsera del parque</strong>
  Al entrar a un parque te dan una pulsera. Si te la ven puesta, no te piden boleto de nuevo. Pero si alguien roba tu pulsera, puede entrar como si fuera tú. Eso mismo pasa si te roban la cookie de sesión.
</div>

<h2>10. Wi-Fi</h2>
<p>El Wi-Fi es una forma de conectarse a la red sin cables. Si la red no está protegida, quien esté cerca podría escuchar el tráfico. Veremos cómo cuidarlo en el Módulo 5.</p>

<h2>11. Ejercicios</h2>
<ol>
  <li>En tu navegador, haz clic en el candado de la barra de direcciones de cualquier sitio y observa qué información muestra.</li>
  <li>En el siguiente enlace, ¿cuál es el dominio real? <code>https://www.tubanco.com.verificar-cuenta.net/entrar</code></li>
  <li>Piensa en tu casa: ¿qué aparatos usan tu router? ¿Sabes cuántos son?</li>
</ol>
`,
  quiz: [
    {
      p: "¿Qué es un servidor?",
      o: ["Quien pide información", "Una computadora que responde con páginas, datos o servicios", "Un tipo de virus", "Un cable de red"],
      c: 1,
      e: "El servidor es la cocina que responde al pedido del cliente."
    },
    {
      p: "¿Para qué sirve una dirección IP?",
      o: ["Para identificar un dispositivo en la red y saber a dónde enviar información", "Para cifrar archivos", "Para ver videos", "Para guardar contraseñas"],
      c: 0,
      e: "Es la dirección postal del dispositivo."
    },
    {
      p: "¿Qué hace el DNS?",
      o: ["Traduce nombres de sitios en direcciones IP", "Protege contra virus", "Da más velocidad al Wi-Fi", "Guarda las cookies"],
      c: 0,
      e: "Es la agenda de contactos de internet."
    },
    {
      p: "En https://banco.com.sitio-falso.net/login, ¿cuál es el dominio real?",
      o: ["banco.com", "sitio-falso.net", "login", "https"],
      c: 1,
      e: "El dominio real es lo que queda antes de la primera barra, leyendo desde el final."
    },
    {
      p: "¿Qué diferencia hay entre HTTP y HTTPS?",
      o: ["HTTPS cifra la comunicación", "HTTP es más seguro", "No hay diferencia", "HTTPS solo funciona en celulares"],
      c: 0,
      e: "Es la diferencia entre una postal y un sobre sellado."
    },
    {
      p: "Un sitio muestra el candado en la barra. ¿Qué significa?",
      o: ["Que el sitio es 100% confiable", "Que la conexión va cifrada, pero hay que revisar igual el dominio", "Que no tiene virus", "Que pertenece a un banco"],
      c: 1,
      e: "Los sitios falsos también pueden usar HTTPS."
    },
    {
      p: "En la analogía del edificio, ¿qué representa el puerto?",
      o: ["La dirección del edificio", "El número de departamento", "El portero", "La llave"],
      c: 1,
      e: "La IP es el edificio y el puerto es el departamento."
    },
    {
      p: "¿Qué puerto usa normalmente HTTPS?",
      o: ["21", "80", "443", "25"],
      c: 2,
      e: "El 443 es el puerto estándar de HTTPS."
    },
    {
      p: "Si alguien roba tu cookie de sesión, ¿qué podría hacer?",
      o: ["Nada", "Entrar a tu cuenta sin conocer tu contraseña", "Apagar tu router", "Borrar tu navegador"],
      c: 1,
      e: "La cookie funciona como la pulsera: quien la tiene, entra."
    }
  ]
};
