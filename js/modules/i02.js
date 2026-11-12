CURSO.contenido.i02 = {
  html: `
<p>Una gran parte de los incidentes ocurre porque alguien pudo hacer algo que no debía. El control de acceso define <strong>quién</strong> puede hacer <strong>qué</strong>. Es también la categoría número uno del OWASP Top 10.</p>

<h2>1. Identificación, autenticación, autorización y auditoría</h2>
<table>
  <thead><tr><th>Concepto</th><th>Pregunta que responde</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td>Identificación</td><td>¿Quién dices ser?</td><td>Escribes tu usuario.</td></tr>
    <tr><td>Autenticación</td><td>¿Puedes demostrarlo?</td><td>Tu contraseña y un código MFA.</td></tr>
    <tr><td>Autorización</td><td>¿Qué puedes hacer?</td><td>Puedes leer reportes, pero no borrarlos.</td></tr>
    <tr><td>Auditoría (accounting)</td><td>¿Qué hiciste?</td><td>Se registra que borraste un archivo a las 10:32.</td></tr>
  </tbody>
</table>
<div class="analogia">
  <strong>Analogía: entrar a un edificio de oficinas</strong>
  Dices tu nombre en la recepción (identificación), muestras tu credencial (autenticación), el guardia te da acceso solo al piso 4 (autorización) y queda registrada tu visita (auditoría).
</div>
<div class="aviso">
  <strong>Autenticación y autorización no son lo mismo</strong>
  Que una persona haya iniciado sesión (autenticación) no significa que pueda ver todo (autorización). Confundirlas causa fallos graves.
</div>

<h2>2. Principio de mínimo privilegio</h2>
<p>Cada persona, programa o cuenta debe tener <strong>solo los permisos necesarios</strong> para hacer su trabajo, y solo durante el tiempo necesario.</p>
<div class="analogia">
  <strong>Analogía: las llaves del hotel</strong>
  Al huésped le dan la llave de su habitación, no la llave maestra. A la persona de limpieza, las llaves de los pisos donde trabaja, pero no del cuarto de caja fuerte.
</div>
<ul>
  <li>Una cuenta de lectura de reportes no debería poder modificarlos.</li>
  <li>La aplicación web debería conectarse a la base de datos con un usuario que solo pueda hacer lo que necesita, no con un administrador.</li>
  <li>Las personas usan una cuenta normal para el día a día y una de administrador solo cuando hace falta.</li>
</ul>
<div class="nota">
  <strong>En Windows</strong>
  Usa una cuenta de usuario estándar para trabajar diario. Cuando una instalación pida permisos de administrador, el sistema mostrará un aviso (UAC). Léelo y no aceptes si no sabes por qué lo pide.
</div>

<h2>3. Modelos de control de acceso</h2>
<table>
  <thead><tr><th>Modelo</th><th>Cómo funciona</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td>DAC (discrecional)</td><td>El dueño del recurso decide quién entra.</td><td>Compartir una carpeta con un compañero.</td></tr>
    <tr><td>MAC (obligatorio)</td><td>Lo decide una política central, por niveles.</td><td>Sistemas militares y de alto aislamiento.</td></tr>
    <tr><td>RBAC (por roles)</td><td>Los permisos se asignan a roles y las personas reciben roles.</td><td>Rol "cajero", "supervisor", "administrador".</td></tr>
    <tr><td>ABAC (por atributos)</td><td>Se decide según atributos: rol, hora, ubicación, tipo de dato.</td><td>Un médico solo ve pacientes de su área, en horario laboral.</td></tr>
  </tbody>
</table>

<h3>RBAC en un ejemplo</h3>
<table>
  <thead><tr><th>Permiso</th><th>Cliente</th><th>Soporte</th><th>Administrador</th></tr></thead>
  <tbody>
    <tr><td>Ver sus propios pedidos</td><td>Sí</td><td>Sí</td><td>Sí</td></tr>
    <tr><td>Ver pedidos de otros</td><td>No</td><td>Sí</td><td>Sí</td></tr>
    <tr><td>Reembolsar</td><td>No</td><td>No</td><td>Sí</td></tr>
    <tr><td>Crear usuarios</td><td>No</td><td>No</td><td>Sí</td></tr>
  </tbody>
</table>
<p>Es más fácil de mantener: si alguien cambia de puesto, solo se cambia su rol.</p>

<h2>4. Separación de funciones</h2>
<p>Una tarea crítica no debe depender de una sola persona. Quien crea un pago no debería ser quien lo aprueba.</p>
<div class="analogia">
  <strong>Analogía: la caja con dos llaves</strong>
  Algunas cajas fuertes necesitan dos llaves de dos personas distintas. Así, nadie puede abrirla solo.
</div>

<h2>5. Ciclo de vida de las cuentas</h2>
<ol>
  <li><strong>Alta:</strong> se crea la cuenta con los permisos mínimos para el puesto.</li>
  <li><strong>Cambio:</strong> si la persona cambia de área, se ajustan permisos y se retiran los anteriores.</li>
  <li><strong>Revisión periódica:</strong> se confirma que los permisos siguen siendo necesarios.</li>
  <li><strong>Baja:</strong> al terminar la relación, se deshabilita la cuenta de inmediato.</li>
</ol>
<div class="aviso">
  <strong>El problema de la acumulación de permisos</strong>
  Con los años, alguien que ha pasado por cinco áreas acumula los permisos de todas. Sin revisiones, tendrá más acceso del que debería.
</div>

<h2>6. Inicio de sesión único (SSO)</h2>
<p>El <strong>SSO</strong> permite entrar una sola vez y usar varias aplicaciones sin escribir la contraseña en cada una.</p>
<div class="analogia">
  <strong>Analogía: la pulsera del parque</strong>
  Pagas una vez y la pulsera te abre todas las atracciones. Con SSO ocurre igual, pero hay que proteger muy bien esa pulsera (con MFA).
</div>
<p>Un proveedor central de identidad autentica a la persona y las aplicaciones confían en él. Se usan estándares como <strong>SAML</strong> y <strong>OpenID Connect</strong>, que veremos en el nivel avanzado.</p>

<h2>7. Cuentas privilegiadas</h2>
<p>Las cuentas de administrador valen oro para un atacante. Requieren cuidados extra:</p>
<ul>
  <li>Siempre con MFA.</li>
  <li>Separadas de la cuenta de uso diario.</li>
  <li>Con acceso temporal y registrado, cuando sea posible.</li>
  <li>Sin compartir una misma cuenta entre varias personas.</li>
  <li>Con revisión frecuente de su actividad.</li>
</ul>

<h2>8. Errores comunes de control de acceso en aplicaciones</h2>
<p>Estos fallos aparecen todo el tiempo y los verás más a fondo en los módulos siguientes:</p>
<table>
  <thead><tr><th>Error</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td>Solo se oculta el botón</td><td>El botón "borrar" no se muestra, pero la dirección sigue funcionando si la escribes.</td></tr>
    <tr><td>IDOR (referencia directa a objetos)</td><td>Cambias <code>/pedido/101</code> por <code>/pedido/102</code> y ves el pedido de otra persona.</td></tr>
    <tr><td>Escalada de privilegios</td><td>Un usuario normal consigue acciones de administrador modificando un dato.</td></tr>
    <tr><td>Validar solo en el navegador</td><td>El servidor confía en lo que manda el cliente.</td></tr>
  </tbody>
</table>
<div class="nota">
  <strong>Regla de oro</strong>
  Toda comprobación de permisos debe hacerse en el <strong>servidor</strong>, en cada petición. Lo que ocurre en el navegador lo puede manipular el usuario.
</div>

<h3>Ejemplo en Java: comprobar que el pedido es del usuario</h3>
<pre><code>// INCORRECTO: cualquiera con el id puede ver el pedido
public Pedido obtener(Long id) {
    return repositorio.findById(id).orElseThrow();
}

// CORRECTO: se comprueba que pertenece al usuario autenticado
public Pedido obtener(Long id, String usuarioActual) {
    Pedido p = repositorio.findById(id).orElseThrow();
    if (!p.getPropietario().equals(usuarioActual)) {
        throw new AccessDeniedException("No autorizado");
    }
    return p;
}</code></pre>

<h2>9. Ejercicios</h2>
<ol>
  <li>Define tres roles para una biblioteca (lector, bibliotecario, administrador) y haz una tabla de permisos.</li>
  <li>Explica con un ejemplo por qué ocultar un botón no es un control de acceso.</li>
  <li>Revisa qué cuentas de usuario existen en tu laptop con Windows y si usas una cuenta de administrador para todo.</li>
</ol>
`,
  quiz: [
    {
      p: "¿Cuál es la diferencia entre autenticación y autorización?",
      o: ["Son lo mismo", "Autenticación comprueba quién eres; autorización define qué puedes hacer", "Autorización comprueba la contraseña", "Autenticación es un tipo de cifrado"],
      c: 1,
      e: "Haber iniciado sesión no significa tener permiso para todo."
    },
    {
      p: "¿Qué dice el principio de mínimo privilegio?",
      o: ["Dar a todos permisos de administrador", "Dar solo los permisos necesarios y por el tiempo necesario", "No dar permisos a nadie", "Usar una cuenta para todo"],
      c: 1,
      e: "Reduce el daño si una cuenta se compromete."
    },
    {
      p: "En RBAC, ¿a quién se le asignan los permisos?",
      o: ["A cada persona por separado", "A roles, y las personas reciben roles", "Solo al administrador", "A las contraseñas"],
      c: 1,
      e: "Facilita mantener y revisar permisos."
    },
    {
      p: "¿Qué es la separación de funciones?",
      o: ["Dividir el trabajo para ir más rápido", "Que una tarea crítica no dependa de una sola persona", "Separar los archivos por tamaño", "Usar dos monitores"],
      c: 1,
      e: "Quien crea un pago no debería ser quien lo aprueba."
    },
    {
      p: "Una persona cambia de área pero conserva todos sus permisos anteriores. ¿Qué problema es?",
      o: ["Acumulación de permisos", "Cifrado débil", "Phishing", "Denegación de servicio"],
      c: 0,
      e: "Se debe ajustar y revisar periódicamente."
    },
    {
      p: "¿Qué permite el SSO?",
      o: ["Entrar una vez y usar varias aplicaciones sin repetir el inicio de sesión", "Evitar tener contraseñas", "Eliminar el firewall", "Cifrar el disco"],
      c: 0,
      e: "Es cómodo, pero obliga a proteger muy bien la cuenta central con MFA."
    },
    {
      p: "En una aplicación, cambias /pedido/101 por /pedido/102 y ves el pedido de otra persona. ¿Qué fallo es?",
      o: ["IDOR (referencia directa a objetos)", "DDoS", "Ransomware", "Phishing"],
      c: 0,
      e: "Falta comprobar que el pedido pertenece al usuario."
    },
    {
      p: "¿Dónde deben hacerse las comprobaciones de permisos?",
      o: ["Solo en el navegador", "En el servidor, en cada petición", "Solo al iniciar sesión", "En el antivirus"],
      c: 1,
      e: "Lo que ocurre en el navegador puede ser manipulado."
    },
    {
      p: "¿Qué práctica es adecuada para una cuenta de administrador?",
      o: ["Compartirla entre varias personas", "Usarla con MFA y solo cuando hace falta", "Usarla para navegar por internet", "No revisar nunca su actividad"],
      c: 1,
      e: "Las cuentas privilegiadas necesitan protección extra."
    }
  ]
};
