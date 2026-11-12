CURSO.contenido.i05 = {
  html: `
<p>En el nivel básico viste la idea del cifrado. Ahora verás cómo se usa bien: qué algoritmos elegir, cómo guardar contraseñas, qué son los certificados y cómo se manejan las claves. Esta categoría aparece en el OWASP Top 10 como <strong>fallos criptográficos</strong> (A04).</p>

<div class="aviso">
  <strong>Regla de oro de la criptografía</strong>
  No inventes tu propio algoritmo ni lo implementes desde cero. Usa bibliotecas estándar y probadas, y concéntrate en usarlas correctamente. Casi todos los fallos reales vienen de usar mal una buena herramienta, no de que el algoritmo esté roto.
</div>

<h2>1. Qué algoritmo usar para cada cosa</h2>
<table>
  <thead><tr><th>Necesidad</th><th>Usa</th><th>Evita</th></tr></thead>
  <tbody>
    <tr><td>Cifrar datos (una clave)</td><td>AES-256 en modo GCM (o ChaCha20-Poly1305)</td><td>DES, 3DES, RC4, AES en modo ECB</td></tr>
    <tr><td>Intercambio de claves y firmas</td><td>RSA con 2048 bits o más, o curvas elípticas (ECDSA, Ed25519)</td><td>RSA de 1024 bits o menos</td></tr>
    <tr><td>Integridad de archivos</td><td>SHA-256 o SHA-512</td><td>MD5, SHA-1</td></tr>
    <tr><td>Guardar contraseñas</td><td>Argon2, bcrypt, scrypt o PBKDF2</td><td>Hash simple (MD5, SHA-256 sin más) y texto claro</td></tr>
    <tr><td>Números aleatorios para seguridad</td><td>SecureRandom (Java)</td><td>Random, Math.random()</td></tr>
  </tbody>
</table>
<div class="nota">
  <strong>Las recomendaciones cambian</strong>
  Los algoritmos considerados seguros evolucionan con el tiempo. Consulta guías vigentes como las de NIST y las hojas de referencia de OWASP antes de decidir en un proyecto real.
</div>

<h2>2. Cifrado simétrico bien hecho: AES-GCM</h2>
<p>El modo <strong>GCM</strong> no solo cifra, también detecta si alguien modificó los datos (cifrado autenticado). Necesita un valor único por cada mensaje llamado <strong>IV</strong> o <em>nonce</em>.</p>
<div class="aviso">
  <strong>Nunca repitas el IV con la misma clave</strong>
  Con GCM, reutilizar el IV rompe la seguridad. Genera uno nuevo aleatorio para cada cifrado y guárdalo junto al texto cifrado (no es secreto).
</div>
<pre><code>import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;

public class EjemploAes {
    public static void main(String[] args) throws Exception {
        // 1. Generar una clave AES de 256 bits
        KeyGenerator kg = KeyGenerator.getInstance("AES");
        kg.init(256);
        SecretKey clave = kg.generateKey();

        // 2. Generar un IV aleatorio distinto para cada mensaje
        byte[] iv = new byte[12];
        new SecureRandom().nextBytes(iv);

        // 3. Cifrar
        Cipher cifrador = Cipher.getInstance("AES/GCM/NoPadding");
        cifrador.init(Cipher.ENCRYPT_MODE, clave, new GCMParameterSpec(128, iv));
        byte[] cifrado = cifrador.doFinal("dato secreto".getBytes(StandardCharsets.UTF_8));

        // 4. Descifrar (lanza excepción si alguien alteró los datos)
        Cipher descifrador = Cipher.getInstance("AES/GCM/NoPadding");
        descifrador.init(Cipher.DECRYPT_MODE, clave, new GCMParameterSpec(128, iv));
        byte[] claro = descifrador.doFinal(cifrado);
        System.out.println(new String(claro, StandardCharsets.UTF_8));
    }
}</code></pre>
<p>En este ejemplo la clave solo existe en memoria. En un sistema real la clave se guarda y se gestiona aparte (más adelante en este módulo).</p>

<h2>3. Guardar contraseñas correctamente</h2>
<p>Una contraseña nunca se cifra para luego descifrarla: se guarda su <strong>hash</strong> con un algoritmo diseñado para ser lento y con un valor aleatorio llamado <strong>sal</strong>.</p>

<h3>¿Por qué un hash simple no basta?</h3>
<ul>
  <li>Los hashes como SHA-256 son rapidísimos, y un atacante puede probar miles de millones de combinaciones por segundo.</li>
  <li>Sin sal, dos personas con la misma contraseña tienen el mismo hash, y existen tablas gigantes con hashes precalculados de contraseñas comunes.</li>
</ul>
<div class="analogia">
  <strong>Analogía: la sal en la sopa</strong>
  La <strong>sal</strong> es un valor aleatorio distinto para cada usuario que se mezcla con la contraseña antes de calcular el hash. Dos personas con la misma contraseña terminan con resultados distintos, y las tablas precalculadas dejan de servir.
</div>
<div class="analogia">
  <strong>Analogía: la cerradura lenta</strong>
  Los algoritmos como bcrypt y Argon2 son deliberadamente lentos (una fracción de segundo). Para un usuario real es imperceptible; para un atacante que debe probar millones de combinaciones, es una pesadilla.
</div>

<h3>Con Spring Security</h3>
<pre><code>import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

PasswordEncoder encoder = new BCryptPasswordEncoder();

// Al registrar al usuario: se guarda el hash (incluye la sal)
String hash = encoder.encode("miContraseña");

// Al iniciar sesión: se compara
boolean correcta = encoder.matches("miContraseña", hash);</code></pre>
<p>El resultado de <code>encode</code> es distinto cada vez, aunque la contraseña sea la misma, porque la sal es aleatoria. Por eso se compara con <code>matches</code> y nunca con <code>equals</code>.</p>
<div class="nota">
  <strong>En un proyecto nuevo</strong>
  Spring Security permite también usar Argon2 y trae un <code>DelegatingPasswordEncoder</code> que facilita migrar de un algoritmo a otro con el tiempo.
</div>

<h2>4. Hash para integridad</h2>
<pre><code>import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
import java.util.HexFormat;

MessageDigest md = MessageDigest.getInstance("SHA-256");
byte[] huella = md.digest("contenido".getBytes(StandardCharsets.UTF_8));
System.out.println(HexFormat.of().formatHex(huella));</code></pre>
<p>Si cambia una sola letra del contenido, la huella cambia por completo. Sirve para comprobar que un archivo descargado coincide con el publicado por el fabricante.</p>

<h3>HMAC: hash con clave</h3>
<p>Un <strong>HMAC</strong> combina el hash con una clave secreta. Sirve para comprobar que un mensaje es íntegro <em>y</em> que lo generó alguien que conoce la clave. Se usa, por ejemplo, para firmar tokens.</p>

<h2>5. Firmas digitales</h2>
<p>Con el cifrado asimétrico se puede <strong>firmar</strong>: la clave privada produce la firma y la clave pública la verifica.</p>
<div class="analogia">
  <strong>Analogía: el sello de lacre</strong>
  Solo el dueño del anillo puede estampar el sello (clave privada). Cualquiera que conozca el diseño puede comprobar que es auténtico (clave pública). Y si alguien abre y cambia la carta, el sello se rompe.
</div>
<p>Las firmas dan <strong>autenticidad</strong>, <strong>integridad</strong> y <strong>no repudio</strong>. Se usan en actualizaciones de software, documentos y certificados.</p>

<h2>6. Certificados y autoridades certificadoras</h2>
<p>Un <strong>certificado digital</strong> une una clave pública con una identidad (por ejemplo, un dominio). Lo firma una <strong>autoridad certificadora (CA)</strong> en la que tu navegador ya confía.</p>
<div class="analogia">
  <strong>Analogía: el pasaporte</strong>
  Un pasaporte lo emite un gobierno que otros países reconocen. Nadie confía en un pasaporte hecho en casa, pero sí en uno emitido por una autoridad confiable.
</div>
<h3>Qué hace el navegador al abrir un sitio HTTPS</h3>
<ol>
  <li>El servidor envía su certificado.</li>
  <li>El navegador comprueba que lo firmó una CA de confianza, que no ha caducado, que no está revocado y que el nombre coincide con el dominio.</li>
  <li>Se acuerda una clave de sesión para cifrar el resto de la comunicación.</li>
</ol>
<div class="aviso">
  <strong>No ignores las advertencias de certificado</strong>
  Cuando el navegador muestra "tu conexión no es privada", algo falla: certificado caducado, nombre distinto, o alguien intercepta. En desarrollo es común usar certificados autofirmados, pero nunca debe aceptarse esa advertencia en un sitio real.
</div>
<div class="aviso">
  <strong>Error grave en código</strong>
  Desactivar la verificación de certificados "para que funcione" en un cliente HTTP anula toda la protección de TLS. Es un fallo frecuente y peligroso.
</div>

<h2>7. Números aleatorios</h2>
<p>La seguridad depende de que ciertos valores no se puedan predecir: tokens, claves, IV, códigos de recuperación.</p>
<pre><code>// INSEGURO: predecible
Random r = new Random();
long token = r.nextLong();

// SEGURO: criptográficamente fuerte
SecureRandom sr = new SecureRandom();
byte[] token = new byte[32];
sr.nextBytes(token);</code></pre>

<h2>8. Gestión de claves</h2>
<p>La criptografía es tan fuerte como la protección de sus claves. Una clave mal guardada anula el mejor algoritmo.</p>
<table>
  <thead><tr><th>Etapa</th><th>Buena práctica</th></tr></thead>
  <tbody>
    <tr><td>Generación</td><td>Con generadores seguros; nunca con contraseñas simples ni valores fijos.</td></tr>
    <tr><td>Almacenamiento</td><td>Fuera del código y de los repositorios; en un gestor de secretos o módulo de seguridad (HSM).</td></tr>
    <tr><td>Uso</td><td>Una clave para un propósito. No reutilizar la misma para cifrar y firmar.</td></tr>
    <tr><td>Rotación</td><td>Cambiarlas periódicamente y cuando haya sospecha de exposición.</td></tr>
    <tr><td>Respaldo</td><td>Copia protegida y probada. Perder la clave es perder los datos.</td></tr>
    <tr><td>Destrucción</td><td>Eliminar de forma segura las claves que ya no se usan.</td></tr>
  </tbody>
</table>
<div class="aviso">
  <strong>Error muy común</strong>
  <pre><code>private static final String CLAVE = "MiClaveSecreta123";   // dentro del código</code></pre>
  Cualquiera con acceso al código (o al repositorio) obtiene la clave. En el nivel avanzado verás cómo gestionar secretos correctamente.
</div>

<h2>9. Datos en reposo y en tránsito: resumen</h2>
<table>
  <thead><tr><th>Situación</th><th>Qué usar</th></tr></thead>
  <tbody>
    <tr><td>Datos que viajan por la red</td><td>TLS 1.2 o 1.3 siempre.</td></tr>
    <tr><td>Datos en base de datos</td><td>Cifrado de disco o de columnas para los más sensibles.</td></tr>
    <tr><td>Contraseñas</td><td>Hash lento con sal (bcrypt, Argon2).</td></tr>
    <tr><td>Datos de tarjetas, salud, documentos de identidad</td><td>Cifrado con claves bien gestionadas, o mejor, no guardarlos.</td></tr>
  </tbody>
</table>

<h2>10. Ejercicios</h2>
<ol>
  <li>Indica qué algoritmo usarías para: (a) guardar la contraseña de un usuario; (b) cifrar un archivo; (c) comprobar que una descarga no fue alterada.</li>
  <li>Explica por qué dos usuarios con la misma contraseña deben tener hashes distintos.</li>
  <li>Calcula el SHA-256 de un archivo pequeño en PowerShell con <code>Get-FileHash archivo.txt -Algorithm SHA256</code> y compáralo después de cambiar una letra.</li>
  <li>Revisa un proyecto tuyo en busca de claves o contraseñas escritas dentro del código.</li>
</ol>
`,
  quiz: [
    {
      p: "¿Qué regla básica se debe seguir con los algoritmos de cifrado?",
      o: ["Inventar uno propio para que sea secreto", "Usar bibliotecas y algoritmos estándar y probados", "Usar el cifrado César", "No cifrar nada"],
      c: 1,
      e: "Los algoritmos propios casi siempre tienen fallos."
    },
    {
      p: "¿Qué ventaja tiene AES en modo GCM?",
      o: ["Cifra y además detecta si los datos fueron alterados", "Es más lento", "No necesita clave", "Es lo mismo que MD5"],
      c: 0,
      e: "Es cifrado autenticado."
    },
    {
      p: "¿Qué ocurre si reutilizas el IV con la misma clave en AES-GCM?",
      o: ["Nada", "Se rompe la seguridad", "Se cifra más rápido", "Se genera una nueva clave"],
      c: 1,
      e: "El IV debe ser único para cada mensaje."
    },
    {
      p: "¿Cómo se deben guardar las contraseñas de los usuarios?",
      o: ["En texto claro", "Cifradas para poder descifrarlas", "Con un hash lento y una sal, como bcrypt o Argon2", "Con MD5"],
      c: 2,
      e: "El hash lento con sal dificulta que se descubran por fuerza bruta."
    },
    {
      p: "¿Para qué sirve la sal en el hash de una contraseña?",
      o: ["Para que dos contraseñas iguales produzcan hashes distintos", "Para hacerla más corta", "Para cifrarla", "Para enviarla por correo"],
      c: 0,
      e: "Evita las tablas precalculadas y los hashes repetidos."
    },
    {
      p: "En Spring Security, ¿cómo se comprueba una contraseña con BCrypt?",
      o: ["Con equals", "Con encoder.matches(contraseña, hash)", "Descifrando el hash", "Con ==="],
      c: 1,
      e: "El hash cambia cada vez por la sal, por eso se usa matches."
    },
    {
      p: "¿Qué clase de Java se debe usar para generar tokens impredecibles?",
      o: ["Random", "Math.random()", "SecureRandom", "Date"],
      c: 2,
      e: "SecureRandom es criptográficamente fuerte."
    },
    {
      p: "¿Qué hace una firma digital?",
      o: ["Da autenticidad, integridad y no repudio", "Comprime archivos", "Cambia la contraseña", "Acelera la red"],
      c: 0,
      e: "Se firma con la clave privada y se verifica con la pública."
    },
    {
      p: "¿Qué es un grave error al programar un cliente HTTPS?",
      o: ["Usar TLS 1.3", "Desactivar la verificación de certificados para que funcione", "Actualizar la librería", "Usar HTTPS"],
      c: 1,
      e: "Anula la protección contra el hombre en el medio."
    },
    {
      p: "¿Dónde NO deben guardarse las claves de cifrado?",
      o: ["En un gestor de secretos", "Escritas dentro del código fuente o del repositorio", "En un módulo de seguridad (HSM)", "En un almacén protegido con permisos limitados"],
      c: 1,
      e: "Cualquiera con acceso al código las obtendría."
    }
  ]
};
