CURSO.contenido.a03 = {
  html: `
<p>En el módulo anterior aseguraste una API. En una arquitectura de <strong>microservicios</strong> hay decenas de APIs que se llaman entre sí, y cada una es una puerta. Este módulo trata de cómo mantener la seguridad cuando el sistema se divide en muchas piezas, con ejemplos en Spring Boot.</p>

<h2>1. Qué cambia con los microservicios</h2>
<div class="analogia">
  <strong>Analogía: de una casa a un barrio</strong>
  Una aplicación monolítica es una casa con una puerta principal. Con microservicios es un barrio: muchas casas, cada una con su puerta, y mucha gente yendo de una a otra. Ya no basta con cuidar la entrada del barrio; cada casa necesita su propia cerradura.
</div>
<table>
  <thead><tr><th>Aspecto</th><th>Monolito</th><th>Microservicios</th></tr></thead>
  <tbody>
    <tr><td>Puntos de entrada</td><td>Pocos</td><td>Muchos</td></tr>
    <tr><td>Comunicación interna</td><td>Llamadas dentro del mismo programa</td><td>Llamadas por red entre servicios</td></tr>
    <tr><td>Quién se autentica</td><td>Solo personas</td><td>Personas y servicios</td></tr>
    <tr><td>Configuración y secretos</td><td>En un lugar</td><td>Repartidos en muchos servicios</td></tr>
    <tr><td>Registros</td><td>Un archivo</td><td>Dispersos en muchos servicios</td></tr>
    <tr><td>Daño si algo se compromete</td><td>Todo</td><td>Puede limitarse a un servicio, si se diseñó así</td></tr>
  </tbody>
</table>

<h3>Tráfico norte-sur y este-oeste</h3>
<ul>
  <li><strong>Norte-sur:</strong> entre el exterior (clientes) y tu sistema.</li>
  <li><strong>Este-oeste:</strong> entre tus propios servicios.</li>
</ul>
<p>El error clásico es proteger solo el norte-sur y confiar ciegamente en el este-oeste porque "es red interna". Si un atacante entra a un servicio, esa confianza le abre todos los demás.</p>

<h2>2. Principios para una arquitectura segura</h2>
<ol>
  <li><strong>Confianza cero:</strong> estar dentro de la red no basta; cada llamada se autentica y autoriza.</li>
  <li><strong>Un servicio, un propósito, un permiso mínimo:</strong> cada servicio solo accede a lo que necesita.</li>
  <li><strong>Defensa en profundidad:</strong> el gateway protege, pero cada servicio también valida.</li>
  <li><strong>Segmentación:</strong> los servicios internos no son accesibles desde internet.</li>
  <li><strong>Identidad propia para cada servicio</strong>, no un usuario compartido.</li>
  <li><strong>Todo se registra</strong> con un identificador que permita seguir una petición de punta a punta.</li>
</ol>

<h2>3. El API Gateway</h2>
<p>El <strong>API Gateway</strong> es el único punto de entrada desde el exterior. Los servicios internos quedan detrás.</p>
<div class="analogia">
  <strong>Analogía: la recepción del edificio</strong>
  Todas las visitas pasan por recepción: se identifican, se verifica su cita y se les indica el piso. Nadie sube directo a las oficinas.
</div>
<pre><code>Internet --&gt; [ API Gateway ] --&gt; [ Pedidos ] --&gt; [ Inventario ]
                               --&gt; [ Pagos   ]
(zona pública)   (borde)         (red interna, sin acceso desde internet)</code></pre>
<p>Qué suele hacer el gateway:</p>
<ul>
  <li>Terminar TLS y exigir HTTPS.</li>
  <li>Validar tokens de forma básica y limitar el uso (rate limiting).</li>
  <li>Aplicar filtros comunes: cabeceras de seguridad, límite de tamaño, CORS.</li>
  <li>Enrutar a cada servicio.</li>
</ul>
<div class="aviso">
  <strong>El gateway no reemplaza la seguridad de cada servicio</strong>
  Si un servicio interno confía en que "el gateway ya revisó", cualquier atacante que llegue a la red interna (por otro servicio comprometido, por una mala regla de firewall o por un error de configuración) puede llamarlo sin pasar por ningún control.
</div>

<h3>Ejemplo con Spring Cloud Gateway</h3>
<pre><code>spring:
  cloud:
    gateway:
      routes:
        - id: pedidos
          uri: http://pedidos:8080
          predicates:
            - Path=/api/pedidos/**
          filters:
            - RemoveRequestHeader=X-Usuario-Id
            - TokenRelay=</code></pre>
<ul>
  <li><code>RemoveRequestHeader</code> elimina cabeceras de identidad que el cliente pudiera haber enviado para hacerse pasar por otro usuario.</li>
  <li><code>TokenRelay</code> reenvía el token del usuario al servicio interno (requiere el cliente OAuth2 de Spring).</li>
</ul>

<h2>4. Cómo se identifican los servicios entre sí</h2>
<p>Cuando el servicio de Pedidos llama al de Inventario, este debe saber <strong>quién llama</strong> y <strong>en nombre de quién</strong>. Hay tres patrones.</p>
<table>
  <thead><tr><th>Patrón</th><th>Cómo funciona</th><th>Cuándo usarlo</th></tr></thead>
  <tbody>
    <tr><td>Identidad del servicio (Client Credentials)</td><td>El servicio se autentica con sus propias credenciales y obtiene un token propio.</td><td>Tareas del sistema sin usuario, como procesos programados.</td></tr>
    <tr><td>Propagar el token del usuario (token relay)</td><td>El servicio reenvía el token con que lo llamaron.</td><td>Cuando la acción es en nombre del usuario y el destino acepta ese token.</td></tr>
    <tr><td>Intercambio de token (Token Exchange, RFC 8693)</td><td>El servicio cambia el token del usuario por otro con audiencia y permisos adecuados al destino.</td><td>Cadenas de servicios que necesitan restringir el alcance en cada salto.</td></tr>
  </tbody>
</table>
<div class="nota">
  <strong>Por qué importa la audiencia</strong>
  Si Pedidos reenvía el mismo token a todos los servicios, un token robado en uno sirve en todos. Un token con <code>aud</code> específico solo sirve para el servicio a quien va dirigido.
</div>

<h3>Problema del "diputado confuso"</h3>
<p>Ocurre cuando un servicio con muchos permisos es engañado para actuar en favor de alguien que no debería poder hacerlo.</p>
<div class="analogia">
  <strong>Analogía: el cartero con llave maestra</strong>
  Un cartero tiene la llave de todo el edificio. Si alguien lo convence de entregar un paquete en un piso restringido, el cartero abre la puerta aunque esa persona no tenga permiso. La solución es que cada acción compruebe también los derechos de quien la originó.
</div>

<h3>Cliente con credenciales de servicio en Spring</h3>
<pre><code>spring:
  security:
    oauth2:
      client:
        registration:
          pedidos-a-inventario:
            provider: auth
            client-id: servicio-pedidos
            client-secret: \${PEDIDOS_CLIENT_SECRET}
            authorization-grant-type: client_credentials
            scope: inventario.leer
        provider:
          auth:
            issuer-uri: https://auth.ejemplo.com</code></pre>
<ul>
  <li>El secreto viene de una <strong>variable de entorno o gestor de secretos</strong>, nunca escrito en el archivo (lo verás en el módulo siguiente).</li>
  <li>El scope pide solo lo que necesita este servicio: <code>inventario.leer</code>, no más.</li>
</ul>
<pre><code>@Bean
WebClient webClient(OAuth2AuthorizedClientManager manager) {
    ServletOAuth2AuthorizedClientExchangeFilterFunction oauth =
        new ServletOAuth2AuthorizedClientExchangeFilterFunction(manager);
    oauth.setDefaultClientRegistrationId("pedidos-a-inventario");
    return WebClient.builder().apply(oauth.oauth2Configuration()).build();
}</code></pre>
<p>Este cliente añade automáticamente el token del servicio a cada llamada a Inventario.</p>
<div class="nota">
  <strong>Verifica con tu versión</strong>
  Las clases y la configuración de cliente OAuth2 han cambiado entre versiones de Spring Security y Spring Boot. Compara estos ejemplos con la documentación de la versión que uses.
</div>

<h2>5. Cifrado y autenticación mutua entre servicios: mTLS</h2>
<p>En TLS normal, solo el servidor demuestra quién es. En <strong>mTLS</strong> (TLS mutuo) <strong>ambos lados presentan certificado</strong>.</p>
<div class="analogia">
  <strong>Analogía: la reunión con credenciales de ambos lados</strong>
  En una oficina de alta seguridad, tanto el visitante muestra su credencial al guardia como el guardia muestra la suya al visitante. Los dos saben con quién hablan antes de intercambiar una palabra.
</div>
<ul>
  <li>Cada servicio tiene un certificado propio emitido por una CA interna.</li>
  <li>Un servicio rechaza conexiones de quien no presente un certificado válido.</li>
  <li>El tráfico entre ellos va cifrado.</li>
</ul>

<h3>Configuración en Spring Boot (idea general)</h3>
<pre><code>server:
  ssl:
    bundle: servicio
    client-auth: need          # exige certificado de cliente

spring:
  ssl:
    bundle:
      pem:
        servicio:
          keystore:
            certificate: file:/etc/certs/servicio.crt
            private-key: file:/etc/certs/servicio.key
          truststore:
            certificate: file:/etc/certs/ca.crt</code></pre>

<h3>Service mesh</h3>
<p>Gestionar certificados en cada servicio es laborioso. Un <strong>service mesh</strong> (por ejemplo Istio o Linkerd) pone un "proxy" junto a cada servicio que se encarga de mTLS, rotación de certificados y reglas de qué servicio puede hablar con cuál, sin cambiar el código.</p>
<table>
  <thead><tr><th>Enfoque</th><th>Ventaja</th><th>Costo</th></tr></thead>
  <tbody>
    <tr><td>mTLS configurado en cada servicio</td><td>Control directo, sin infraestructura extra.</td><td>Mucho trabajo de certificados.</td></tr>
    <tr><td>Service mesh</td><td>mTLS y políticas automáticas.</td><td>Complejidad operativa nueva.</td></tr>
  </tbody>
</table>
<div class="nota">
  <strong>mTLS y tokens se complementan</strong>
  mTLS identifica al <em>servicio</em> que llama. El token identifica al <em>usuario</em> y sus permisos. Usar los dos es lo más sólido.
</div>

<h2>6. Autorización en cada servicio</h2>
<p>Cada microservicio debe comprobar los permisos por su cuenta, aunque el gateway ya lo haya hecho.</p>
<pre><code>@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SeguridadServicioConfig {

    @Bean
    SecurityFilterChain filtro(HttpSecurity http) throws Exception {
        http
            .sessionManagement(s -&gt; s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .csrf(csrf -&gt; csrf.disable())
            .authorizeHttpRequests(a -&gt; a
                .requestMatchers("/actuator/health/**").permitAll()
                .anyRequest().authenticated())
            .oauth2ResourceServer(o -&gt; o.jwt(Customizer.withDefaults()));
        return http.build();
    }
}</code></pre>
<pre><code>@PreAuthorize("hasAuthority('SCOPE_inventario.leer')")
@GetMapping("/inventario/{sku}")
public StockDto consultar(@PathVariable String sku) { ... }</code></pre>

<h3>Cuidado con las cabeceras de identidad</h3>
<div class="aviso">
  <strong>Error muy común</strong>
  Algunos sistemas hacen que el gateway valide el token y luego envíe a los servicios una cabecera tipo <code>X-Usuario-Id: 123</code>, y los servicios confían en ella sin más. Si alguien llega a un servicio sin pasar por el gateway, escribe la cabecera que quiera y se hace pasar por cualquier usuario. Es mejor que cada servicio valide el token firmado, y que el gateway elimine esas cabeceras en las peticiones externas.
</div>

<h2>7. Exposición accidental de endpoints</h2>
<p>Los microservicios traen utilidades de administración que, si quedan expuestas, son una mina de oro.</p>
<table>
  <thead><tr><th>Elemento</th><th>Riesgo</th><th>Qué hacer</th></tr></thead>
  <tbody>
    <tr><td>Spring Boot Actuator</td><td>Revela configuración, variables, métricas y a veces permite acciones.</td><td>Exponer solo lo necesario y protegerlo.</td></tr>
    <tr><td>Consola H2 u otras consolas de base de datos</td><td>Acceso directo a los datos.</td><td>Desactivar fuera de desarrollo.</td></tr>
    <tr><td>Swagger / OpenAPI en producción</td><td>Documenta todos los endpoints para un atacante.</td><td>Restringir o desactivar en producción.</td></tr>
    <tr><td>Endpoints de depuración y perfiles de desarrollo</td><td>Comportamientos inseguros activos.</td><td>Perfiles separados y revisados.</td></tr>
  </tbody>
</table>

<h3>Actuator con cuidado</h3>
<pre><code>management:
  endpoints:
    web:
      exposure:
        include: health,info      # nada más
  endpoint:
    health:
      show-details: never</code></pre>
<p>Si necesitas exponer más endpoints, protégelos con una cadena de seguridad aparte:</p>
<pre><code>@Bean
@Order(1)
SecurityFilterChain actuator(HttpSecurity http) throws Exception {
    http.securityMatcher(EndpointRequest.toAnyEndpoint())
        .authorizeHttpRequests(a -&gt; a
            .requestMatchers(EndpointRequest.to("health")).permitAll()
            .anyRequest().hasAuthority("SCOPE_operaciones"))
        .oauth2ResourceServer(o -&gt; o.jwt(Customizer.withDefaults()));
    return http.build();
}</code></pre>
<p>Y mejor aún: que el puerto de gestión solo sea accesible desde la red interna de operaciones (con <code>management.server.port</code> separado y reglas de firewall).</p>

<h2>8. Disponibilidad: que un fallo no se propague</h2>
<p>Si un servicio se vuelve lento, los que lo llaman se quedan esperando, se saturan y la caída se propaga en cadena. También sirve como vector de ataque.</p>
<table>
  <thead><tr><th>Medida</th><th>Para qué</th></tr></thead>
  <tbody>
    <tr><td>Tiempos límite (timeouts)</td><td>No esperar para siempre.</td></tr>
    <tr><td>Cortacircuitos (circuit breaker)</td><td>Dejar de llamar a un servicio caído y fallar rápido.</td></tr>
    <tr><td>Límite de peticiones</td><td>Evitar que un cliente o servicio acapare recursos.</td></tr>
    <tr><td>Mamparos (bulkhead)</td><td>Aislar recursos para que un servicio lento no agote todos.</td></tr>
    <tr><td>Reintentos limitados</td><td>Evitar tormentas de reintentos que empeoran la caída.</td></tr>
  </tbody>
</table>
<p>En Java se suele usar <strong>Resilience4j</strong> para esto, con anotaciones como <code>@CircuitBreaker</code> y <code>@RateLimiter</code>.</p>
<div class="analogia">
  <strong>Analogía: los fusibles de la casa</strong>
  Cuando hay un cortocircuito, el fusible salta y protege el resto de la instalación. El cortacircuitos de software hace lo mismo.
</div>

<h2>9. Confiar en datos de otros servicios</h2>
<p>Tus propios servicios también pueden equivocarse o estar comprometidos. Por eso lo que recibes de otro servicio (API10 del Top 10 de APIs) se valida como cualquier entrada externa: tipos, tamaños, rangos, y nunca se concatena en consultas ni se ejecuta.</p>

<h2>10. Registro y trazabilidad entre servicios</h2>
<ul>
  <li>Genera un <strong>identificador de correlación</strong> en el gateway y propágalo en cada llamada, para seguir una petición a través de todos los servicios.</li>
  <li>Registra en cada servicio el usuario (o identificador de servicio) y la acción.</li>
  <li>Centraliza los logs en un único lugar y protégelos.</li>
  <li>No registres tokens ni secretos.</li>
</ul>
<pre><code>log.info("Reserva de stock sku={} cantidad={} correlacion={} usuario={}",
         sku, cantidad, correlacionId, usuario);</code></pre>

<h2>11. Contenedores y despliegue</h2>
<p>Los microservicios casi siempre se despliegan en contenedores. Prácticas básicas:</p>
<ul>
  <li><strong>No ejecutar como administrador (root)</strong> dentro del contenedor.</li>
  <li>Usar imágenes base pequeñas y actualizadas.</li>
  <li>No incluir secretos dentro de la imagen.</li>
  <li>Escanear las imágenes en busca de vulnerabilidades (lo verás en DevSecOps).</li>
  <li>Aplicar mínimo privilegio a lo que el contenedor puede hacer.</li>
</ul>
<pre><code>FROM eclipse-temurin:21-jre
RUN useradd -r -u 1001 appuser
USER appuser
COPY app.jar /app/app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]</code></pre>
<p>Si usas Kubernetes, añade <strong>políticas de red</strong> para que solo los servicios que deben hablar entre sí puedan hacerlo, y limita los permisos de cada servicio.</p>

<h2>12. Modelado de amenazas de un sistema de microservicios</h2>
<p>Aplica lo que viste en el primer módulo de este nivel. Para el sistema de ejemplo (Cliente, Gateway, Pedidos, Inventario, Pagos, Base de datos):</p>
<table>
  <thead><tr><th>Amenaza</th><th>STRIDE</th><th>Defensa</th></tr></thead>
  <tbody>
    <tr><td>Un atacante llama a Inventario directo, sin pasar por el gateway</td><td>S / E</td><td>Inventario valida el token y acepta solo llamadas de la red permitida y con mTLS.</td></tr>
    <tr><td>Cabecera X-Usuario-Id falsificada</td><td>S</td><td>El gateway elimina cabeceras de identidad; los servicios validan el JWT.</td></tr>
    <tr><td>Token robado de un servicio sirve en todos</td><td>E</td><td>Tokens con audiencia específica o intercambio de token.</td></tr>
    <tr><td>Actuator expuesto muestra variables de entorno</td><td>I</td><td>Exponer solo health e info y proteger el resto.</td></tr>
    <tr><td>Servicio de Pagos lento tumba a Pedidos</td><td>D</td><td>Timeouts, cortacircuitos y mamparos.</td></tr>
    <tr><td>Nadie sabe quién cambió una orden</td><td>R</td><td>Registro de auditoría con correlación y usuario.</td></tr>
    <tr><td>Un servicio comprometido lee la base de datos de otro</td><td>I / T</td><td>Cada servicio con su propia base y credenciales de mínimo privilegio.</td></tr>
  </tbody>
</table>

<h2>13. Lista de verificación</h2>
<table>
  <thead><tr><th>Pregunta</th><th>¿Cumple?</th></tr></thead>
  <tbody>
    <tr><td>¿Los servicios internos son inaccesibles desde internet?</td><td></td></tr>
    <tr><td>¿Cada servicio valida el token por su cuenta?</td><td></td></tr>
    <tr><td>¿Los tokens tienen audiencia y scopes mínimos?</td><td></td></tr>
    <tr><td>¿Hay mTLS o una red con políticas de acceso entre servicios?</td><td></td></tr>
    <tr><td>¿Cada servicio tiene su propia base de datos y credenciales?</td><td></td></tr>
    <tr><td>¿Actuator, Swagger y consolas están restringidos?</td><td></td></tr>
    <tr><td>¿Hay timeouts, cortacircuitos y límites de uso?</td><td></td></tr>
    <tr><td>¿Hay correlación de logs y auditoría?</td><td></td></tr>
    <tr><td>¿Los contenedores no corren como root y no llevan secretos?</td><td></td></tr>
  </tbody>
</table>

<h2>14. Ejercicios</h2>
<ol>
  <li>Dibuja en diagrams.net una arquitectura con gateway, tres servicios y una base de datos por servicio. Marca las fronteras de confianza.</li>
  <li>Explica con tus palabras por qué no basta con que el gateway valide el token.</li>
  <li>Escribe qué ocurriría si un atacante llama directamente a un servicio interno que confía en la cabecera <code>X-Usuario-Id</code>. ¿Cómo lo corregirías?</li>
  <li>Revisa un proyecto Spring Boot tuyo o de práctica: ¿qué endpoints de Actuator expone? ¿Hay Swagger activo en producción?</li>
  <li>Prueba, en tu entorno local, llamar a un servicio sin token, con un token de otra audiencia y con un token sin el scope necesario. Anota el código de respuesta en cada caso.</li>
</ol>
`,
  quiz: [
    {
      p: "En una arquitectura de microservicios, ¿qué error es el más típico respecto al tráfico interno?",
      o: ["Cifrar todo el tráfico", "Confiar ciegamente en el tráfico este-oeste por ser 'red interna'", "Usar tokens", "Registrar eventos"],
      c: 1,
      e: "Si un atacante entra a un servicio, esa confianza le abre los demás."
    },
    {
      p: "¿Para qué sirve el API Gateway?",
      o: ["Es el punto de entrada único desde el exterior y aplica controles comunes", "Reemplaza a las bases de datos", "Es un antivirus", "Cifra los discos"],
      c: 0,
      e: "Es como la recepción del edificio."
    },
    {
      p: "El gateway ya validó el token. ¿Debe el servicio interno volver a validarlo?",
      o: ["No, sería redundante", "Sí, para tener defensa en profundidad", "Solo los lunes", "Solo si hay errores"],
      c: 1,
      e: "Si alguien llega al servicio sin pasar por el gateway, no habría ningún control."
    },
    {
      p: "¿Qué riesgo tiene que los servicios confíen en una cabecera X-Usuario-Id?",
      o: ["Ninguno", "Quien llegue sin pasar por el gateway puede escribirla y hacerse pasar por cualquier usuario", "Que sea muy larga", "Que no se pueda registrar"],
      c: 1,
      e: "Es mejor validar el JWT firmado en cada servicio."
    },
    {
      p: "¿Qué ventaja tiene un token con audiencia (aud) específica?",
      o: ["Solo sirve para el servicio al que va dirigido, limitando el daño si se roba", "Es más corto", "Se puede usar en cualquier parte", "No caduca"],
      c: 0,
      e: "Un token robado en un servicio no sirve para los demás."
    },
    {
      p: "¿Qué hace mTLS?",
      o: ["Ambos lados presentan certificado y se autentican mutuamente", "Solo cifra los discos", "Elimina las contraseñas", "Reemplaza al firewall"],
      c: 0,
      e: "Permite que cada servicio sepa quién le llama."
    },
    {
      p: "¿Qué aporta un service mesh?",
      o: ["Gestiona mTLS y políticas entre servicios sin cambiar el código", "Hace más bonita la interfaz", "Sustituye a la base de datos", "Elimina la necesidad de logs"],
      c: 0,
      e: "A cambio añade complejidad operativa."
    },
    {
      p: "¿Qué endpoints de Actuator conviene exponer por defecto hacia el exterior?",
      o: ["Todos", "Solo health e info, y proteger el resto", "Ninguno ni siquiera health jamás", "Solo los de variables de entorno"],
      c: 1,
      e: "Otros endpoints pueden revelar configuración sensible."
    },
    {
      p: "¿Para qué sirve un cortacircuitos (circuit breaker)?",
      o: ["Para dejar de llamar a un servicio caído y fallar rápido, evitando caídas en cadena", "Para cifrar", "Para crear usuarios", "Para guardar contraseñas"],
      c: 0,
      e: "Es como el fusible de una instalación eléctrica."
    },
    {
      p: "¿Qué práctica es adecuada al crear la imagen de un contenedor?",
      o: ["Ejecutar la aplicación como root", "Incluir las contraseñas en la imagen", "Ejecutar con un usuario sin privilegios y sin secretos en la imagen", "No actualizar nunca la imagen base"],
      c: 2,
      e: "Aplica el mínimo privilegio también a los contenedores."
    }
  ]
};
