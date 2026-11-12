CURSO.contenido.a02 = {
  html: `
<p>Las aplicaciones modernas hablan entre sí mediante <strong>APIs</strong>: el celular con el servidor, un microservicio con otro, tu sistema con un proveedor. Una API expone datos y acciones directamente, por eso un fallo suele ser grave. En este módulo verás cómo asegurarlas y cómo funcionan JWT y OAuth 2.0.</p>

<div class="nota">
  <strong>Qué se considera vigente hoy</strong>
  <ul>
    <li>Para APIs, la referencia es el <strong>OWASP API Security Top 10, edición 2023</strong>, que es la que publica OWASP en su sitio. Revisa si salió una edición más reciente.</li>
    <li><strong>OAuth 2.1</strong> todavía es un borrador del IETF (no un RFC publicado). Lo vigente como guía de seguridad es el <strong>RFC 9700</strong> (Best Current Practice for OAuth 2.0 Security, enero de 2025), y OAuth 2.1 recoge esas mismas prácticas.</li>
    <li>Para JWT, la guía de buenas prácticas es el <strong>RFC 8725</strong>.</li>
  </ul>
</div>

<h2>1. ¿Qué es una API REST?</h2>
<p>Una API REST permite pedir y modificar recursos usando peticiones HTTP, normalmente con datos en formato JSON.</p>
<table>
  <thead><tr><th>Método</th><th>Para qué</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td>GET</td><td>Leer</td><td><code>GET /pedidos/10</code></td></tr>
    <tr><td>POST</td><td>Crear</td><td><code>POST /pedidos</code></td></tr>
    <tr><td>PUT / PATCH</td><td>Modificar</td><td><code>PUT /pedidos/10</code></td></tr>
    <tr><td>DELETE</td><td>Borrar</td><td><code>DELETE /pedidos/10</code></td></tr>
  </tbody>
</table>
<div class="analogia">
  <strong>Analogía: la ventanilla del restaurante</strong>
  La API es la ventanilla de pedidos. Cualquiera puede acercarse. Por eso cada petición debe indicar quién es el cliente y comprobarse si tiene derecho a lo que pide, sin importar que "la pantalla bonita" no muestre el botón.
</div>

<h2>2. OWASP API Security Top 10 (2023)</h2>
<table>
  <thead><tr><th>#</th><th>Riesgo</th><th>En pocas palabras</th></tr></thead>
  <tbody>
    <tr><td>API1</td><td>Broken Object Level Authorization (BOLA)</td><td>Acceder a objetos de otros cambiando un identificador.</td></tr>
    <tr><td>API2</td><td>Broken Authentication</td><td>Autenticación mal implementada: tokens débiles, sin límites de intentos.</td></tr>
    <tr><td>API3</td><td>Broken Object Property Level Authorization</td><td>Ver o modificar campos que no deberías (mezcla exposición excesiva y asignación masiva).</td></tr>
    <tr><td>API4</td><td>Unrestricted Resource Consumption</td><td>Sin límites de uso: saturación y costos elevados.</td></tr>
    <tr><td>API5</td><td>Broken Function Level Authorization</td><td>Usuarios normales que llegan a funciones de administrador.</td></tr>
    <tr><td>API6</td><td>Unrestricted Access to Sensitive Business Flows</td><td>Automatizar flujos de negocio, como comprar entradas o crear cuentas en masa.</td></tr>
    <tr><td>API7</td><td>Server Side Request Forgery (SSRF)</td><td>Hacer que el servidor consulte direcciones que el atacante elige.</td></tr>
    <tr><td>API8</td><td>Security Misconfiguration</td><td>Configuraciones inseguras, CORS abierto, errores detallados.</td></tr>
    <tr><td>API9</td><td>Improper Inventory Management</td><td>Versiones viejas o endpoints de prueba olvidados y expuestos.</td></tr>
    <tr><td>API10</td><td>Unsafe Consumption of APIs</td><td>Confiar de más en datos que llegan de APIs de terceros.</td></tr>
  </tbody>
</table>
<p>Observa que los primeros cinco son fallos de <strong>autenticación y autorización</strong>. Es lo más importante en una API.</p>

<h3>BOLA: el fallo número uno</h3>
<pre><code>// INSEGURO: confía en el id que manda el cliente
@GetMapping("/pedidos/{id}")
public Pedido obtener(@PathVariable Long id) {
    return servicio.buscar(id);
}

// SEGURO: comprueba que el pedido pertenece a quien lo pide
@GetMapping("/pedidos/{id}")
public PedidoDto obtener(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
    Pedido p = servicio.buscar(id);
    if (!p.getPropietario().equals(jwt.getSubject())) {
        throw new AccessDeniedException("No autorizado");
    }
    return PedidoDto.de(p);
}</code></pre>
<div class="nota">
  <strong>Identificadores difíciles de adivinar ayudan, pero no reemplazan el control</strong>
  Usar UUID en lugar de números consecutivos dificulta adivinar ids, pero la comprobación de permisos sigue siendo obligatoria.
</div>

<h2>3. Buenas prácticas generales para APIs</h2>
<table>
  <thead><tr><th>Área</th><th>Práctica</th></tr></thead>
  <tbody>
    <tr><td>Transporte</td><td>Solo HTTPS, con TLS moderno. Cabecera HSTS.</td></tr>
    <tr><td>Autenticación</td><td>Tokens estándar (OAuth 2.0 / OpenID Connect), no inventar esquemas propios.</td></tr>
    <tr><td>Autorización</td><td>Comprobar en el servidor, por objeto y por función, en cada petición.</td></tr>
    <tr><td>Entradas</td><td>Validar tipo, longitud, formato y rangos. Rechazar campos no esperados.</td></tr>
    <tr><td>Salidas</td><td>Devolver DTO con solo los campos necesarios.</td></tr>
    <tr><td>Límites</td><td>Limitar peticiones por cliente, tamaño de cuerpo y de página en listados.</td></tr>
    <tr><td>Errores</td><td>Mensajes genéricos al cliente, detalle solo en logs.</td></tr>
    <tr><td>Secretos</td><td>Nunca en la URL (queda en logs e historiales); usar cabeceras.</td></tr>
    <tr><td>Inventario</td><td>Documentar todas las versiones y endpoints, y retirar los obsoletos.</td></tr>
    <tr><td>Registro</td><td>Registrar accesos denegados y patrones anómalos.</td></tr>
  </tbody>
</table>

<h3>Códigos de estado que importan</h3>
<table>
  <thead><tr><th>Código</th><th>Significado</th><th>Cuándo</th></tr></thead>
  <tbody>
    <tr><td>401</td><td>No autenticado</td><td>Falta el token o es inválido.</td></tr>
    <tr><td>403</td><td>Prohibido</td><td>Estás autenticado pero no tienes permiso.</td></tr>
    <tr><td>404</td><td>No encontrado</td><td>El recurso no existe (a veces se usa también para no revelar que existe).</td></tr>
    <tr><td>429</td><td>Demasiadas peticiones</td><td>Se superó el límite de uso.</td></tr>
  </tbody>
</table>

<h3>CORS</h3>
<p>Los navegadores bloquean por defecto que una página de un sitio llame a la API de otro. <strong>CORS</strong> es el mecanismo para permitir orígenes concretos.</p>
<pre><code>@Bean
CorsConfigurationSource cors() {
    CorsConfiguration c = new CorsConfiguration();
    c.setAllowedOrigins(List.of("https://app.ejemplo.com"));   // no usar "*" con credenciales
    c.setAllowedMethods(List.of("GET", "POST"));
    c.setAllowedHeaders(List.of("Authorization", "Content-Type"));
    UrlBasedCorsConfigurationSource s = new UrlBasedCorsConfigurationSource();
    s.registerCorsConfiguration("/**", c);
    return s;
}</code></pre>
<div class="aviso">
  <strong>CORS no es un control de acceso</strong>
  Solo protege a los navegadores. Alguien con un script o con Postman ignora CORS por completo.
</div>

<h2>4. OAuth 2.0 explicado sin tecnicismos</h2>
<p><strong>OAuth 2.0</strong> es un estándar para que una aplicación acceda a recursos de una persona <strong>sin conocer su contraseña</strong>.</p>
<div class="analogia">
  <strong>Analogía: la llave del valet parking</strong>
  Al dejar tu coche, no entregas la llave maestra. El valet recibe una llave limitada: arranca el coche, pero no abre la cajuela ni el guantera, y deja de servir cuando termina el turno. OAuth entrega a las aplicaciones algo parecido: un permiso limitado y temporal.
</div>

<h3>Los cuatro roles</h3>
<table>
  <thead><tr><th>Rol</th><th>Quién es</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td>Dueño del recurso</td><td>La persona usuaria.</td><td>Tú.</td></tr>
    <tr><td>Cliente</td><td>La aplicación que pide acceso.</td><td>Una app que quiere leer tu calendario.</td></tr>
    <tr><td>Servidor de autorización</td><td>Quien autentica y emite tokens.</td><td>El proveedor de identidad (Keycloak, Entra ID, Auth0...).</td></tr>
    <tr><td>Servidor de recursos</td><td>La API que protege los datos.</td><td>La API del calendario.</td></tr>
  </tbody>
</table>

<h3>Conceptos clave</h3>
<ul>
  <li><strong>Token de acceso:</strong> el permiso que se presenta a la API. Dura poco.</li>
  <li><strong>Token de refresco:</strong> permite obtener nuevos tokens de acceso sin volver a iniciar sesión. Es muy sensible.</li>
  <li><strong>Scope (alcance):</strong> lo que el token permite, por ejemplo <code>pedidos.leer</code>. Aplica el mínimo privilegio.</li>
  <li><strong>URI de redirección:</strong> a dónde regresa el usuario después de autorizar.</li>
</ul>

<h3>Flujo recomendado: código de autorización con PKCE</h3>
<ol>
  <li>La aplicación crea un secreto temporal (<em>code verifier</em>) y calcula su huella (<em>code challenge</em>).</li>
  <li>Redirige al usuario al servidor de autorización, enviando el <em>challenge</em>.</li>
  <li>El usuario inicia sesión (con MFA) y aprueba los permisos.</li>
  <li>El servidor devuelve un <strong>código</strong> de un solo uso a la aplicación.</li>
  <li>La aplicación cambia el código por tokens, enviando el <em>verifier</em> original.</li>
  <li>El servidor comprueba que coincide con el <em>challenge</em> y entrega los tokens.</li>
  <li>La aplicación llama a la API presentando el token de acceso.</li>
</ol>
<div class="analogia">
  <strong>Analogía: el comprobante de equipaje</strong>
  Dejas la maleta y te dan un talón. Aunque alguien te robe el talón al salir, no puede reclamar la maleta si no es quien la dejó. PKCE ata el código a la aplicación que lo pidió, así que un código interceptado ya no sirve.
</div>

<h3>Qué usar y qué evitar</h3>
<table>
  <thead><tr><th>Flujo</th><th>Estado</th><th>Uso</th></tr></thead>
  <tbody>
    <tr><td>Authorization Code + PKCE</td><td>Recomendado</td><td>Aplicaciones web, móviles y de escritorio con usuario.</td></tr>
    <tr><td>Client Credentials</td><td>Recomendado</td><td>Comunicación entre servicios, sin usuario.</td></tr>
    <tr><td>Implicit</td><td>No usar</td><td>Expone el token en la URL. Eliminado en OAuth 2.1.</td></tr>
    <tr><td>Password (ROPC)</td><td>No usar</td><td>La app recibe la contraseña del usuario. No funciona con MFA. Eliminado en OAuth 2.1.</td></tr>
  </tbody>
</table>

<h3>Buenas prácticas de OAuth (RFC 9700)</h3>
<ul>
  <li>Usar PKCE en todos los clientes que usan código de autorización.</li>
  <li>Validar la URI de redirección con <strong>coincidencia exacta</strong>, sin comodines.</li>
  <li>Usar el parámetro <code>state</code> para evitar CSRF en el flujo.</li>
  <li>Tokens de acceso de corta duración.</li>
  <li>Rotar los tokens de refresco o atarlos al cliente.</li>
  <li>Pedir solo los scopes necesarios.</li>
  <li>Nunca enviar tokens en la URL.</li>
</ul>

<h2>5. OpenID Connect (OIDC): autenticación sobre OAuth</h2>
<p>OAuth 2.0 resuelve la <em>autorización</em> (permiso para acceder a algo), pero no dice quién es el usuario. <strong>OpenID Connect</strong> agrega esa capa de identidad.</p>
<table>
  <thead><tr><th>Token</th><th>Para quién</th><th>Qué dice</th></tr></thead>
  <tbody>
    <tr><td>ID token</td><td>La aplicación cliente</td><td>Quién inició sesión y cuándo.</td></tr>
    <tr><td>Access token</td><td>La API</td><td>Qué puede hacer quien lo presenta.</td></tr>
  </tbody>
</table>
<div class="aviso">
  <strong>Error común</strong>
  No uses el ID token para llamar a una API, ni el access token para saber quién es el usuario. Cada uno tiene su función.
</div>

<h2>6. JWT (JSON Web Token)</h2>
<p>Un <strong>JWT</strong> es un formato compacto para transportar información, con tres partes separadas por puntos: <code>cabecera.contenido.firma</code>.</p>
<div class="analogia">
  <strong>Analogía: el pasaporte</strong>
  Trae tus datos a la vista (nombre, país, vigencia) y un sello que los autentica. Cualquiera puede leerlo, pero nadie puede alterarlo sin que se note el sello.
</div>
<table>
  <thead><tr><th>Parte</th><th>Qué contiene</th></tr></thead>
  <tbody>
    <tr><td>Cabecera (header)</td><td>El algoritmo de firma y la clave usada.</td></tr>
    <tr><td>Contenido (payload)</td><td>Los datos, llamados <em>claims</em>.</td></tr>
    <tr><td>Firma</td><td>Garantiza que cabecera y contenido no fueron modificados.</td></tr>
  </tbody>
</table>

<h3>Claims habituales</h3>
<table>
  <thead><tr><th>Claim</th><th>Significado</th></tr></thead>
  <tbody>
    <tr><td><code>iss</code></td><td>Emisor del token.</td></tr>
    <tr><td><code>sub</code></td><td>Sujeto: identificador de la persona.</td></tr>
    <tr><td><code>aud</code></td><td>Audiencia: para qué API es el token.</td></tr>
    <tr><td><code>exp</code></td><td>Fecha de caducidad.</td></tr>
    <tr><td><code>iat</code></td><td>Fecha de emisión.</td></tr>
    <tr><td><code>scope</code></td><td>Permisos concedidos.</td></tr>
  </tbody>
</table>

<div class="aviso">
  <strong>Un JWT firmado NO está cifrado</strong>
  La firma impide que lo modifiquen, pero cualquiera puede leer el contenido (solo está codificado en Base64). Nunca pongas contraseñas, datos de tarjeta ni información sensible dentro de un JWT.
</div>

<h3>Errores clásicos con JWT</h3>
<table>
  <thead><tr><th>Error</th><th>Riesgo</th><th>Defensa</th></tr></thead>
  <tbody>
    <tr><td>Aceptar el algoritmo <code>none</code></td><td>Un token sin firma sería válido.</td><td>Permitir solo los algoritmos esperados (lista blanca).</td></tr>
    <tr><td>Confundir algoritmos (HS256 con clave pública)</td><td>El atacante firma con la clave pública como si fuera un secreto.</td><td>Fijar en el servidor el algoritmo y el tipo de clave.</td></tr>
    <tr><td>No validar <code>exp</code></td><td>Tokens eternos.</td><td>Rechazar tokens vencidos.</td></tr>
    <tr><td>No validar <code>iss</code> y <code>aud</code></td><td>Aceptar tokens emitidos por otro o para otra API.</td><td>Validar emisor y audiencia.</td></tr>
    <tr><td>Clave de firma débil o fija en el código</td><td>Se pueden falsificar tokens.</td><td>Claves largas y aleatorias en un gestor de secretos, o firmas asimétricas.</td></tr>
    <tr><td>Datos sensibles en el contenido</td><td>Cualquiera los lee.</td><td>Incluir solo lo necesario.</td></tr>
    <tr><td>Tokens de larga duración</td><td>Un token robado sirve por mucho tiempo.</td><td>Vida corta (minutos) más refresco controlado.</td></tr>
  </tbody>
</table>

<h3>El problema de la revocación</h3>
<p>Un JWT es "sin estado": la API lo valida sin consultar a nadie. La desventaja es que, una vez emitido, <strong>no se puede cancelar fácilmente antes de que venza</strong>. Por eso se usan tokens de vida corta, rotación de refresco y, si hace falta, una lista de tokens revocados o tokens opacos que se consultan al servidor de autorización.</p>

<h3>¿Dónde guardar el token en una aplicación web?</h3>
<table>
  <thead><tr><th>Lugar</th><th>Ventaja</th><th>Riesgo</th></tr></thead>
  <tbody>
    <tr><td>localStorage / sessionStorage</td><td>Simple.</td><td>Un XSS puede leerlo y robarlo.</td></tr>
    <tr><td>Memoria de la aplicación</td><td>No persiste ni queda legible desde otras pestañas.</td><td>Se pierde al recargar.</td></tr>
    <tr><td>Cookie HttpOnly, Secure, SameSite</td><td>El JavaScript no la lee.</td><td>Requiere proteger contra CSRF.</td></tr>
  </tbody>
</table>
<p>No hay opción perfecta; cada una tiene compromisos. Muchas arquitecturas recomiendan que un servidor intermedio guarde los tokens y entregue al navegador solo una cookie de sesión HttpOnly.</p>

<h2>7. Práctica: leer un JWT en tu propio equipo</h2>
<div class="aviso legal">
  <strong>No pegues tokens reales en sitios web</strong>
  Un token real es como una llave. Decodificarlo en una página de internet lo comparte con un tercero. Usa tu propio equipo, como en este ejercicio.
</div>
<p>Este es un token <strong>de ejemplo</strong>, inventado y con firma falsa:</p>
<pre><code>eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImNsYXZlLTIwMjYtMDEifQ.eyJpc3MiOiJodHRwczovL2F1dGguZWplbXBsby5jb20iLCJzdWIiOiJ1c3VhcmlvLTEyMyIsImF1ZCI6ImFwaS1wZWRpZG9zIiwic2NvcGUiOiJwZWRpZG9zLmxlZXIiLCJpYXQiOjE4OTM0NTI0MDAsImV4cCI6MTg5MzQ1NjAwMH0.ZmlybWEtZGUtZWplbXBsby1uby12YWxpZGE</code></pre>
<p>Abre PowerShell y pega este script, que decodifica la parte central (el contenido):</p>
<pre><code>$token = "PEGA_AQUI_EL_TOKEN_DE_EJEMPLO"
$payload = $token.Split('.')[1].Replace('-','+').Replace('_','/')
switch ($payload.Length % 4) { 2 { $payload += '==' } 3 { $payload += '=' } }
[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($payload))</code></pre>
<p>Verás algo como:</p>
<pre><code>{"iss":"https://auth.ejemplo.com","sub":"usuario-123","aud":"api-pedidos","scope":"pedidos.leer","iat":1893452400,"exp":1893456000}</code></pre>
<p>Cambia el índice <code>[1]</code> por <code>[0]</code> para ver la cabecera. Comprueba que pudiste leer todo sin ninguna clave: por eso no se guardan secretos dentro de un JWT.</p>
<ul>
  <li>¿Quién emitió el token? ¿Para qué API es? ¿Qué permisos tiene?</li>
  <li>El campo <code>exp</code> es la fecha de caducidad en formato de segundos Unix (1893456000 equivale al 1 de enero de 2030). ¿Cuánto duraba el token entre <code>iat</code> y <code>exp</code>?</li>
</ul>

<h2>8. Proteger una API con Spring Security (Spring Boot)</h2>
<p>Con Spring Boot, una API puede actuar como <strong>servidor de recursos</strong>: recibe el token, valida la firma y el contenido, y aplica permisos.</p>

<h3>Dependencia</h3>
<pre><code>&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-oauth2-resource-server&lt;/artifactId&gt;
&lt;/dependency&gt;</code></pre>

<h3>Configuración (application.yml)</h3>
<pre><code>spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: https://auth.ejemplo.com</code></pre>
<p>Spring descarga las claves públicas del emisor y valida la firma, la caducidad y el emisor.</p>

<h3>Reglas de acceso</h3>
<pre><code>@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SeguridadConfig {

    @Bean
    SecurityFilterChain filtro(HttpSecurity http) throws Exception {
        http
            .sessionManagement(s -&gt; s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .csrf(csrf -&gt; csrf.disable())   // API sin sesión ni cookies: el token va en la cabecera
            .authorizeHttpRequests(a -&gt; a
                .requestMatchers("/publico/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .oauth2ResourceServer(o -&gt; o.jwt(Customizer.withDefaults()));
        return http.build();
    }
}</code></pre>
<ul>
  <li><code>STATELESS</code>: no se guarda sesión en el servidor.</li>
  <li>Se desactiva CSRF porque la autenticación va en la cabecera <code>Authorization</code> y no en cookies. Si tu API usara cookies de sesión, <strong>no</strong> deberías hacerlo.</li>
  <li><code>anyRequest().authenticated()</code>: todo lo que no esté listado exige token. Es el principio de denegar por defecto.</li>
</ul>

<h3>Permisos por método con scopes</h3>
<p>Spring convierte cada scope del token en una autoridad con el prefijo <code>SCOPE_</code>.</p>
<pre><code>@PreAuthorize("hasAuthority('SCOPE_pedidos.leer')")
@GetMapping("/pedidos")
public List&lt;PedidoDto&gt; listar() { ... }

@PreAuthorize("hasAuthority('SCOPE_pedidos.escribir')")
@PostMapping("/pedidos")
public PedidoDto crear(@Valid @RequestBody PedidoRequest req) { ... }</code></pre>

<h3>Validar también la audiencia</h3>
<p>Por defecto Spring valida firma, caducidad y emisor, pero <strong>no</strong> comprueba que el token fuera emitido para tu API. Se agrega un validador:</p>
<pre><code>@Bean
JwtDecoder jwtDecoder() {
    String issuer = "https://auth.ejemplo.com";
    NimbusJwtDecoder decoder = (NimbusJwtDecoder) JwtDecoders.fromIssuerLocation(issuer);

    OAuth2TokenValidator&lt;Jwt&gt; emisor = JwtValidators.createDefaultWithIssuer(issuer);
    OAuth2TokenValidator&lt;Jwt&gt; audiencia = new JwtClaimValidator&lt;List&lt;String&gt;&gt;(
        JwtClaimNames.AUD, aud -&gt; aud != null &amp;&amp; aud.contains("api-pedidos"));

    decoder.setJwtValidator(new DelegatingOAuth2TokenValidator&lt;&gt;(emisor, audiencia));
    return decoder;
}</code></pre>
<div class="nota">
  <strong>Revisa la documentación de tu versión</strong>
  Los nombres de clases y configuraciones de Spring Security cambian entre versiones. Estos ejemplos siguen el estilo de Spring Security 6 con Spring Boot 3. Compáralos con la documentación oficial de la versión que uses.
</div>

<h2>9. Pruebas rápidas de una API protegida</h2>
<p>Con una API tuya en ejecución local puedes comprobar el comportamiento con <code>curl</code> o con Postman:</p>
<table>
  <thead><tr><th>Prueba</th><th>Resultado esperado</th></tr></thead>
  <tbody>
    <tr><td>Petición sin token</td><td>401</td></tr>
    <tr><td>Token con firma alterada</td><td>401</td></tr>
    <tr><td>Token vencido</td><td>401</td></tr>
    <tr><td>Token de otro emisor o de otra audiencia</td><td>401</td></tr>
    <tr><td>Token válido pero sin el scope necesario</td><td>403</td></tr>
    <tr><td>Usuario A pide el pedido del usuario B</td><td>403 o 404</td></tr>
    <tr><td>Cuerpo con campos extra, como un rol</td><td>Ignorados o rechazados</td></tr>
    <tr><td>Cientos de peticiones seguidas</td><td>429</td></tr>
  </tbody>
</table>
<div class="aviso legal">
  <strong>Solo contra APIs que tú controles</strong>
  Estas pruebas se hacen en tu entorno local o de pruebas, con permiso. Nunca contra APIs de terceros.
</div>

<h2>10. Ejercicios</h2>
<ol>
  <li>Explica con tus palabras la diferencia entre autenticación y autorización en una API, y da un ejemplo de cada una.</li>
  <li>Decodifica el token de ejemplo y responde: ¿qué scope tiene y por cuánto tiempo era válido?</li>
  <li>Elige tres riesgos del OWASP API Security Top 10 y escribe una defensa para cada uno.</li>
  <li>Explica por qué el flujo Implicit ya no se recomienda.</li>
  <li>Revisa una API tuya o de práctica con la tabla de la sección 9 y anota qué pruebas pasa y cuáles no.</li>
</ol>
`,
  quiz: [
    {
      p: "¿Cuál es el riesgo número uno del OWASP API Security Top 10 (edición 2023)?",
      o: ["Broken Object Level Authorization (BOLA)", "SQL Injection", "Phishing", "Ransomware"],
      c: 0,
      e: "Es acceder a objetos de otros usuarios cambiando un identificador."
    },
    {
      p: "En una API, ¿qué indica el código 403?",
      o: ["Falta el token", "El usuario está autenticado pero no tiene permiso", "El servidor está caído", "La petición fue exitosa"],
      c: 1,
      e: "401 es falta de autenticación; 403 es falta de autorización."
    },
    {
      p: "¿Qué estado tiene OAuth 2.1 a día de hoy?",
      o: ["Es un RFC publicado", "Es un borrador del IETF; la guía vigente es el RFC 9700", "Fue eliminado", "Solo existe en Java"],
      c: 1,
      e: "Aún es un Internet-Draft, y sus prácticas coinciden con el RFC 9700."
    },
    {
      p: "¿Cuál es el flujo recomendado para una aplicación con usuario?",
      o: ["Implicit", "Password (ROPC)", "Authorization Code con PKCE", "Ninguno"],
      c: 2,
      e: "PKCE ata el código a la aplicación que lo pidió."
    },
    {
      p: "¿Qué flujo se usa para comunicación entre servicios sin un usuario?",
      o: ["Client Credentials", "Implicit", "Password", "Ninguno"],
      c: 0,
      e: "El servicio se autentica con sus propias credenciales."
    },
    {
      p: "¿Por qué se desaconseja el flujo Password (ROPC)?",
      o: ["Porque la aplicación recibe la contraseña del usuario y no funciona con MFA", "Porque es muy lento", "Porque es nuevo", "Porque usa colores"],
      c: 0,
      e: "Rompe el objetivo de OAuth: no compartir la contraseña."
    },
    {
      p: "¿Qué aporta OpenID Connect sobre OAuth 2.0?",
      o: ["La capa de identidad: saber quién inició sesión", "Más velocidad", "Cifrado del disco", "Un firewall"],
      c: 0,
      e: "OAuth resuelve autorización; OIDC agrega autenticación."
    },
    {
      p: "Un JWT firmado, ¿está cifrado?",
      o: ["Sí, nadie puede leerlo", "No, cualquiera puede leer su contenido; la firma solo impide modificarlo", "Solo si lleva el claim exp", "Sí, siempre con AES"],
      c: 1,
      e: "Nunca guardes secretos dentro de un JWT."
    },
    {
      p: "¿Qué claims conviene validar siempre además de la firma?",
      o: ["exp, iss y aud", "El color del usuario", "El tamaño del token", "Ninguno"],
      c: 0,
      e: "Caducidad, emisor y audiencia."
    },
    {
      p: "¿Por qué se recomienda que los tokens de acceso sean de vida corta?",
      o: ["Porque un JWT no se puede revocar fácilmente y un token robado dura menos", "Porque ocupan menos espacio", "Porque así lo exige Windows", "Porque se leen más rápido"],
      c: 0,
      e: "Limita el daño si el token se filtra."
    },
    {
      p: "En Spring Security, ¿cómo se llama la autoridad creada a partir del scope pedidos.leer?",
      o: ["SCOPE_pedidos.leer", "ROLE_pedidos.leer", "pedidos", "ADMIN"],
      c: 0,
      e: "Spring agrega el prefijo SCOPE_ a cada scope del token."
    },
    {
      p: "¿Protege CORS a una API frente a un script o a Postman?",
      o: ["Sí, completamente", "No, CORS solo restringe a los navegadores", "Solo en HTTPS", "Solo si es Java"],
      c: 1,
      e: "No reemplaza la autenticación ni la autorización."
    }
  ]
};
