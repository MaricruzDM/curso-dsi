CURSO.contenido.b01 = {
  html: `
<p>Antes de hablar de ataques o herramientas necesitamos un vocabulario común. En este módulo aprenderás las palabras clave y las ideas sobre las que se apoya todo lo demás.</p>

<h2>1. Dato e información</h2>
<ul>
  <li><strong>Dato:</strong> un valor suelto, sin contexto. Por ejemplo: <code>4512</code>.</li>
  <li><strong>Información:</strong> un dato con significado. Por ejemplo: "El saldo de la cuenta de Ana es 4512 pesos".</li>
</ul>
<p>Lo que protegemos es la información, porque es lo que tiene valor para una persona o una organización.</p>

<h2>2. Activo</h2>
<p>Un <strong>activo</strong> es cualquier cosa que tiene valor y que debemos proteger.</p>
<table>
  <thead><tr><th>Tipo de activo</th><th>Ejemplos</th></tr></thead>
  <tbody>
    <tr><td>Información</td><td>Contraseñas, fotos, contratos, datos de clientes.</td></tr>
    <tr><td>Equipos</td><td>Laptop, celular, servidores, router.</td></tr>
    <tr><td>Software</td><td>Aplicaciones, sistemas operativos, bases de datos.</td></tr>
    <tr><td>Personas</td><td>Quien conoce procesos y tiene accesos.</td></tr>
    <tr><td>Reputación</td><td>La confianza de clientes o de la gente.</td></tr>
  </tbody>
</table>

<h2>3. La tríada CIA: confidencialidad, integridad y disponibilidad</h2>
<p>Estos tres objetivos son la base de la seguridad de la información. Se les llama <strong>tríada CIA</strong> por sus siglas en inglés (<em>Confidentiality, Integrity, Availability</em>).</p>

<h3>Confidencialidad</h3>
<p>Solo las personas autorizadas pueden ver la información.</p>
<div class="analogia">
  <strong>Analogía: el sobre cerrado</strong>
  Una carta en un sobre cerrado solo la lee quien la abre. Si alguien más la lee, se rompió la confidencialidad.
</div>
<div class="ejemplo">
  <strong>Se pierde cuando</strong> alguien ve tus mensajes privados, o se filtra una base de datos de clientes.
</div>

<h3>Integridad</h3>
<p>La información es correcta y no fue modificada sin permiso.</p>
<div class="analogia">
  <strong>Analogía: el cheque</strong>
  Si alguien cambia la cantidad de un cheque después de que lo firmaste, el documento ya no es íntegro, aunque nadie lo haya robado.
</div>
<div class="ejemplo">
  <strong>Se pierde cuando</strong> alguien altera una calificación, cambia el monto de una transferencia o modifica un archivo sin dejar rastro.
</div>

<h3>Disponibilidad</h3>
<p>La información y los sistemas están listos cuando se necesitan.</p>
<div class="analogia">
  <strong>Analogía: el cajero automático</strong>
  Un cajero que funciona perfecto pero está apagado cuando necesitas dinero no te sirve. La información existe, pero no está disponible.
</div>
<div class="ejemplo">
  <strong>Se pierde cuando</strong> se cae un servidor, un ataque satura una página, o un virus cifra tus archivos y no puedes abrirlos.
</div>

<table>
  <thead><tr><th>Pregunta</th><th>Principio</th></tr></thead>
  <tbody>
    <tr><td>¿Quién puede verlo?</td><td>Confidencialidad</td></tr>
    <tr><td>¿Es correcto y sin alteraciones?</td><td>Integridad</td></tr>
    <tr><td>¿Puedo usarlo cuando lo necesito?</td><td>Disponibilidad</td></tr>
  </tbody>
</table>
<div class="nota">
  <strong>A veces chocan</strong>
  Más seguridad en confidencialidad puede reducir la disponibilidad. Por ejemplo, pedir muchos pasos para entrar a un sistema protege más, pero lo hace más lento. La seguridad es buscar un equilibrio.
</div>

<h2>4. Otros dos principios importantes</h2>
<ul>
  <li><strong>Autenticidad:</strong> comprobar que alguien o algo es quien dice ser. Ejemplo: iniciar sesión con tu usuario y contraseña.</li>
  <li><strong>No repudio:</strong> que una persona no pueda negar que realizó una acción. Ejemplo: una firma electrónica en un contrato.</li>
</ul>

<h2>5. Amenaza, vulnerabilidad, riesgo y control</h2>
<p>Estas cuatro palabras se confunden mucho. Aquí van con una analogía común.</p>
<div class="analogia">
  <strong>Analogía: la casa en época de lluvias</strong>
  <ul>
    <li><strong>Amenaza:</strong> la tormenta. Algo que puede causar daño.</li>
    <li><strong>Vulnerabilidad:</strong> el techo con una gotera. Un punto débil.</li>
    <li><strong>Riesgo:</strong> la posibilidad de que la tormenta entre por la gotera y dañe tus cosas. Se piensa en probabilidad e impacto.</li>
    <li><strong>Control:</strong> reparar el techo o poner una lona. Lo que reduce el riesgo.</li>
  </ul>
</div>
<table>
  <thead><tr><th>Término</th><th>Significado</th><th>Ejemplo digital</th></tr></thead>
  <tbody>
    <tr><td>Amenaza</td><td>Algo o alguien que puede causar daño.</td><td>Un delincuente que envía correos falsos.</td></tr>
    <tr><td>Vulnerabilidad</td><td>Debilidad que se puede aprovechar.</td><td>Un sistema sin actualizar.</td></tr>
    <tr><td>Riesgo</td><td>Probabilidad de daño y su impacto.</td><td>Que roben una cuenta por usar una contraseña débil.</td></tr>
    <tr><td>Control</td><td>Medida para reducir el riesgo.</td><td>Activar la verificación en dos pasos.</td></tr>
    <tr><td>Incidente</td><td>Evento real que afecta la seguridad.</td><td>Se descubre que alguien entró a una cuenta.</td></tr>
  </tbody>
</table>
<div class="nota">
  <strong>Idea clave</strong>
  Sin vulnerabilidad, una amenaza no puede hacer daño. Sin amenaza, una vulnerabilidad no se aprovecha. El riesgo aparece cuando se juntan las dos.
</div>

<h2>6. Tipos de controles</h2>
<h3>Según lo que hacen</h3>
<table>
  <thead><tr><th>Tipo</th><th>Objetivo</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td>Preventivo</td><td>Evitar que algo pase.</td><td>Candado en la puerta, contraseñas fuertes.</td></tr>
    <tr><td>Detectivo</td><td>Descubrir que algo está pasando.</td><td>Alarma, cámaras, registros de actividad.</td></tr>
    <tr><td>Correctivo</td><td>Reparar o recuperar después.</td><td>Restaurar una copia de seguridad.</td></tr>
  </tbody>
</table>
<h3>Según su naturaleza</h3>
<table>
  <thead><tr><th>Tipo</th><th>Qué es</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td>Técnico</td><td>Basado en tecnología.</td><td>Firewall, cifrado, antivirus.</td></tr>
    <tr><td>Administrativo</td><td>Reglas y procesos.</td><td>Políticas, capacitación, procedimientos.</td></tr>
    <tr><td>Físico</td><td>Protección del entorno.</td><td>Puertas con llave, cámaras, guardias.</td></tr>
  </tbody>
</table>

<h2>7. Defensa en profundidad</h2>
<p>Es la idea de poner <strong>varias capas</strong> de protección, de modo que si una falla, otra sigue protegiendo.</p>
<div class="analogia">
  <strong>Analogía: el castillo</strong>
  Un castillo tiene foso, muralla, puerta con guardias y una torre interior. Si el atacante cruza el foso, todavía tiene que pasar la muralla. En un sistema, las capas pueden ser: contraseña, verificación en dos pasos, cifrado, permisos limitados y copias de seguridad.
</div>

<h2>8. Las personas también cuentan</h2>
<p>La mayoría de los incidentes empiezan por un error humano: un clic en un enlace falso, una contraseña repetida o un archivo mal compartido. Por eso la seguridad se compone de tres pilares:</p>
<ul>
  <li><strong>Personas:</strong> conocimiento y hábitos.</li>
  <li><strong>Procesos:</strong> reglas claras y repetibles.</li>
  <li><strong>Tecnología:</strong> herramientas que ayudan.</li>
</ul>

<div class="ejemplo">
  <strong>Ejemplo completo: tu correo electrónico</strong>
  <ul>
    <li><strong>Activo:</strong> tu cuenta de correo, que guarda mensajes y permite recuperar otras cuentas.</li>
    <li><strong>Amenaza:</strong> un delincuente que intenta adivinar contraseñas.</li>
    <li><strong>Vulnerabilidad:</strong> usar la misma contraseña en varios sitios.</li>
    <li><strong>Riesgo:</strong> que un sitio sea filtrado y alguien entre a tu correo con esa contraseña.</li>
    <li><strong>Control:</strong> una contraseña única y verificación en dos pasos.</li>
    <li><strong>CIA afectada:</strong> confidencialidad, si leen tus mensajes; integridad, si envían correos en tu nombre; disponibilidad, si te dejan fuera de tu cuenta.</li>
  </ul>
</div>

<h2>9. Ejercicios</h2>
<ol>
  <li>Elige tu celular. Escribe tres activos que guarda, una amenaza, una vulnerabilidad y un control.</li>
  <li>Para cada caso, indica qué principio de la tríada CIA se afecta: (a) alguien lee tu chat; (b) alguien cambia el monto de un pago; (c) la página de tu banco no abre.</li>
  <li>Clasifica como preventivo, detectivo o correctivo: una cámara, un candado, una copia de seguridad.</li>
</ol>
`,
  quiz: [
    {
      p: "¿Qué significan las siglas CIA en seguridad de la información?",
      o: ["Confidencialidad, Integridad y Disponibilidad", "Control, Identidad y Acceso", "Cifrado, Internet y Antivirus", "Clave, Inicio y Autenticación"],
      c: 0,
      e: "Es la tríada base: Confidentiality, Integrity, Availability."
    },
    {
      p: "Alguien lee los mensajes privados de otra persona. ¿Qué principio se afecta?",
      o: ["Disponibilidad", "Confidencialidad", "Integridad", "No repudio"],
      c: 1,
      e: "La información fue vista por quien no estaba autorizado."
    },
    {
      p: "Alguien modifica el monto de una transferencia. ¿Qué principio se afecta?",
      o: ["Integridad", "Disponibilidad", "Confidencialidad", "Autenticidad"],
      c: 0,
      e: "La información fue alterada sin autorización."
    },
    {
      p: "La página de un banco no abre porque está saturada. ¿Qué principio se afecta?",
      o: ["Confidencialidad", "Integridad", "Disponibilidad", "Ninguno"],
      c: 2,
      e: "La información existe, pero no se puede usar cuando se necesita."
    },
    {
      p: "En la analogía de la casa, ¿qué representa la gotera en el techo?",
      o: ["La amenaza", "La vulnerabilidad", "El control", "El incidente"],
      c: 1,
      e: "La gotera es el punto débil que se puede aprovechar."
    },
    {
      p: "¿Qué es un control de seguridad?",
      o: ["Una medida que reduce el riesgo", "Un tipo de ataque", "Una contraseña olvidada", "Un virus"],
      c: 0,
      e: "Por ejemplo, la verificación en dos pasos."
    },
    {
      p: "Una copia de seguridad que se usa para restaurar archivos después de un daño es un control:",
      o: ["Preventivo", "Detectivo", "Correctivo", "Ninguno"],
      c: 2,
      e: "Ayuda a recuperarse después de que el daño ocurrió."
    },
    {
      p: "¿Qué busca la defensa en profundidad?",
      o: ["Usar una sola protección muy fuerte", "Poner varias capas para que, si una falla, otra siga protegiendo", "Eliminar a los usuarios", "Apagar los sistemas"],
      c: 1,
      e: "Es la idea del castillo con foso, muralla y torre."
    },
    {
      p: "Una persona no puede negar que firmó un documento electrónico. ¿Qué principio se cumple?",
      o: ["No repudio", "Disponibilidad", "Amenaza", "Respaldo"],
      c: 0,
      e: "El no repudio evita que alguien niegue una acción realizada."
    }
  ]
};
