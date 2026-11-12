CURSO.contenido.a08 = {
  html: `
<p>Llegaste al proyecto final. Aquí juntas todo lo que aprendiste en un trabajo completo: evaluar la seguridad de una aplicación, identificar riesgos y proponer un plan de mitigación basado en buenas prácticas. Este módulo es distinto a los anteriores: no hay teoría nueva, sino una guía de trabajo, plantillas y una rúbrica para evaluar tu resultado.</p>

<h2>1. Objetivo del proyecto</h2>
<p>Realizar una <strong>evaluación de seguridad</strong> de una aplicación, documentarla con evidencia y presentar un <strong>plan de mitigación</strong> priorizado que un equipo real pudiera ejecutar.</p>
<div class="analogia">
  <strong>Analogía: la inspección de un edificio</strong>
  Un inspector recorre el edificio con un plano y una lista, prueba puertas, salidas de emergencia e instalaciones, registra lo que encuentra y entrega un informe con lo urgente y lo que puede esperar. Tu proyecto es esa inspección, aplicada a una aplicación.
</div>

<div class="aviso legal">
  <strong>Regla obligatoria: solo sistemas autorizados</strong>
  Evalúa únicamente aplicaciones propias, laboratorios diseñados para practicar (como OWASP Juice Shop en tu equipo) o sistemas para los que tengas autorización escrita. Nunca uses este proyecto como excusa para probar sistemas de terceros. Incluye esta autorización en tu informe.
</div>

<h2>2. Elige el objetivo de tu evaluación</h2>
<table>
  <thead><tr><th>Opción</th><th>Descripción</th><th>Recomendada para</th></tr></thead>
  <tbody>
    <tr><td>A. Laboratorio OWASP Juice Shop</td><td>Tienda con fallos intencionales que ejecutas en tu equipo (módulos intermedio 4 y avanzado 6).</td><td>Quien no tiene una aplicación propia. Es la opción más segura y con más hallazgos.</td></tr>
    <tr><td>B. Una aplicación Spring Boot propia</td><td>Un proyecto tuyo o de práctica con API REST y autenticación.</td><td>Perfiles de desarrollo y QA que quieran mejorar un proyecto real.</td></tr>
    <tr><td>C. Un sistema de tu organización</td><td>Solo con autorización escrita de quien lo administra, y preferentemente en un entorno de pruebas.</td><td>Quien ya trabaja en un equipo y tiene el permiso formal.</td></tr>
  </tbody>
</table>
<div class="nota">
  <strong>Si dudas, elige la opción A</strong>
  Con Juice Shop puedes practicar todo el proceso sin riesgo para nadie, y el resultado se puede comparar con los retos documentados del propio laboratorio.
</div>

<h2>3. Entregables</h2>
<table>
  <thead><tr><th>#</th><th>Entregable</th><th>Qué debe contener</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>Alcance y autorización</td><td>Qué se evalúa, qué no, cómo, cuándo y con qué permiso.</td></tr>
    <tr><td>2</td><td>Descripción y diagrama del sistema</td><td>Componentes, datos y fronteras de confianza.</td></tr>
    <tr><td>3</td><td>Modelo de amenazas</td><td>Amenazas identificadas con STRIDE y su defensa.</td></tr>
    <tr><td>4</td><td>Registro de pruebas</td><td>Qué probaste, cómo y qué resultado obtuviste (incluye lo que salió bien).</td></tr>
    <tr><td>5</td><td>Hallazgos</td><td>Cada hallazgo con evidencia, gravedad e impacto.</td></tr>
    <tr><td>6</td><td>Análisis de riesgos</td><td>Matriz de probabilidad e impacto con prioridades.</td></tr>
    <tr><td>7</td><td>Plan de mitigación</td><td>Acciones priorizadas con responsable, esfuerzo y forma de verificar.</td></tr>
    <tr><td>8</td><td>Informe ejecutivo</td><td>Resumen de una página para personas no técnicas.</td></tr>
    <tr><td>9</td><td>Presentación</td><td>Exposición breve (10 a 15 minutos) de los resultados.</td></tr>
  </tbody>
</table>

<h2>4. Plan de trabajo sugerido</h2>
<table>
  <thead><tr><th>Sesión</th><th>Actividades</th><th>Resultado</th></tr></thead>
  <tbody>
    <tr><td>1. Preparar</td><td>Elegir objetivo, definir alcance y autorización, levantar el laboratorio, dibujar el sistema.</td><td>Entregables 1 y 2.</td></tr>
    <tr><td>2. Modelar</td><td>Aplicar STRIDE a los flujos, identificar los riesgos principales y decidir qué probar.</td><td>Entregable 3 y plan de pruebas.</td></tr>
    <tr><td>3. Probar</td><td>Pruebas manuales, ZAP, revisión de configuración, dependencias, secretos y cabeceras.</td><td>Entregable 4 con evidencia.</td></tr>
    <tr><td>4. Analizar</td><td>Redactar hallazgos, calificar riesgos y diseñar el plan de mitigación.</td><td>Entregables 5, 6 y 7.</td></tr>
    <tr><td>5. Comunicar</td><td>Informe ejecutivo, presentación y reflexión.</td><td>Entregables 8 y 9.</td></tr>
  </tbody>
</table>
<p>Cada sesión puede llevar entre dos y cuatro horas. Ajusta los tiempos a tu ritmo.</p>

<h2>5. Guía paso a paso</h2>

<h3>Paso 1. Alcance y autorización</h3>
<p>Plantilla:</p>
<pre><code>PROYECTO: Evaluación de seguridad de [nombre del sistema]
AUTOR: [tu nombre]            FECHA: [fecha]

1. Objetivo
   [Qué quieres lograr con esta evaluación]

2. Sistema evaluado
   Nombre, versión, dirección (por ejemplo http://localhost:3000)
   Entorno: laboratorio / pruebas / otro

3. Dentro del alcance
   [Direcciones, módulos y funciones que se pueden probar]

4. Fuera del alcance
   [Todo lo que NO se tocará]

5. Técnicas permitidas
   [Pruebas manuales, escaneo pasivo, escaneo activo en laboratorio...]

6. Autorización
   Quien autoriza: [propietario del sistema o "yo mismo, es mi laboratorio"]
   Fecha de autorización: [fecha]

7. Datos
   Solo datos ficticios. No se accedió a datos reales de terceros.</code></pre>

<h3>Paso 2. Describir el sistema y dibujar el diagrama</h3>
<ul>
  <li>Lista los componentes: navegador, API, base de datos, servicios externos.</li>
  <li>Indica qué datos maneja cada uno y su clasificación (público, interno, confidencial...).</li>
  <li>Dibuja el diagrama de flujo de datos en diagrams.net y marca las <strong>fronteras de confianza</strong>.</li>
  <li>Lista los roles de usuario y qué puede hacer cada uno.</li>
</ul>

<h3>Paso 3. Modelo de amenazas con STRIDE</h3>
<pre><code>| Flujo o elemento | S | T | R | I | D | E | Amenaza principal | Defensa existente | Defensa propuesta |
|------------------|---|---|---|---|---|---|-------------------|-------------------|-------------------|
| Cliente - API    |   |   |   |   |   |   |                   |                   |                   |
| API - Base datos |   |   |   |   |   |   |                   |                   |                   |</code></pre>
<p>Marca con una X las letras que aplican y describe la amenaza más relevante de cada fila. Después, elige las <strong>cinco amenazas</strong> más importantes para probarlas.</p>

<h3>Paso 4. Plan y registro de pruebas</h3>
<p>Usa como guía lo que aprendiste: la tabla de pruebas manuales y la matriz de autorización del módulo de pruebas, las categorías del OWASP Top 10:2025 y las del OWASP API Security Top 10 (edición 2023).</p>
<table>
  <thead><tr><th>Área</th><th>Qué comprobar</th></tr></thead>
  <tbody>
    <tr><td>Autenticación</td><td>Política de contraseñas, límite de intentos, MFA, recuperación de cuenta, manejo de sesiones y tokens.</td></tr>
    <tr><td>Autorización</td><td>Acceso sin autenticar, acceso con rol insuficiente, acceso a datos de otros usuarios (IDOR/BOLA), campos que no deben modificarse.</td></tr>
    <tr><td>Entradas y salidas</td><td>Validación, errores ante entradas inesperadas, inyección, XSS, codificación de salida.</td></tr>
    <tr><td>Configuración</td><td>Cabeceras de seguridad, cookies, mensajes de error, endpoints de diagnóstico, CORS.</td></tr>
    <tr><td>Datos y criptografía</td><td>HTTPS, almacenamiento de contraseñas, datos sensibles en respuestas o logs.</td></tr>
    <tr><td>Dependencias</td><td>Librerías con vulnerabilidades conocidas, SBOM.</td></tr>
    <tr><td>Secretos</td><td>Claves o contraseñas en código, configuración o historial.</td></tr>
    <tr><td>Registro y detección</td><td>¿Se registran los intentos fallidos y los accesos denegados? ¿Habría alerta?</td></tr>
    <tr><td>Disponibilidad</td><td>Límites de uso, manejo de errores, tamaños máximos.</td></tr>
    <tr><td>Lógica de negocio</td><td>Casos de abuso: cupones, carritos, flujos de varios pasos.</td></tr>
  </tbody>
</table>
<p>Registra cada prueba:</p>
<pre><code>ID: P-07
Área: Autorización
Prueba: Con la cuenta del usuario A, solicitar el pedido de B cambiando el identificador.
Resultado esperado: 403 o 404.
Resultado obtenido: 200 con los datos del usuario B.
Evidencia: captura-07.png
Conclusión: Falla. Genera el hallazgo H-03.</code></pre>
<div class="nota">
  <strong>Registra también lo que funcionó bien</strong>
  Una evaluación honesta incluye los controles que sí resistieron. Eso le da confianza al equipo y muestra que probaste de verdad.
</div>

<h3>Paso 5. Redactar los hallazgos</h3>
<pre><code>ID: H-03
Título: Un usuario puede ver los pedidos de otros usuarios (BOLA)
Gravedad: Alta
Categoría: OWASP API1:2023 - Broken Object Level Authorization
Descripción: La API devuelve cualquier pedido a un usuario autenticado,
sin comprobar que le pertenece.
Pasos para reproducir:
  1. Iniciar sesión como usuario A.
  2. Consultar GET /pedidos/101 (propio): 200.
  3. Cambiar el identificador a 102 (pedido de B): 200 con datos de B.
Evidencia: captura-07.png, peticion-07.txt
Impacto: Acceso a datos personales de otros clientes.
Recomendación: Comprobar en el servidor que el pedido pertenece al
usuario autenticado; devolver 403 o 404 si no.
Referencias: CWE-639, OWASP API1:2023</code></pre>
<ul>
  <li>Un hallazgo = un problema. No mezcles varios en uno.</li>
  <li>Verifica cada uno manualmente. No incluyas falsos positivos de herramientas.</li>
  <li>La evidencia no debe contener datos reales ni secretos.</li>
  <li>Describe el problema, no a las personas que lo causaron.</li>
</ul>

<h3>Paso 6. Análisis de riesgos</h3>
<p>Califica cada hallazgo con probabilidad e impacto (1 a 3) y calcula el nivel multiplicándolos, como en el módulo de riesgos.</p>
<pre><code>| ID   | Hallazgo                          | Prob. | Impacto | Nivel | Prioridad |
|------|-----------------------------------|-------|---------|-------|-----------|
| H-03 | BOLA en pedidos                   | 3     | 3       | 9     | Crítica   |
| H-05 | Actuator expuesto                 | 2     | 3       | 6     | Alta      |
| H-08 | Cabecera CSP ausente              | 2     | 2       | 4     | Media     |
| H-11 | Versión del servidor visible      | 2     | 1       | 2     | Baja      |</code></pre>
<p>Justifica la calificación de los más graves: ¿quién podría explotarlo?, ¿qué tan fácil es?, ¿qué datos expone?, ¿está accesible desde internet?</p>

<h3>Paso 7. Plan de mitigación</h3>
<p>Ordena las acciones por prioridad y esfuerzo. Las que reducen mucho riesgo con poco esfuerzo van primero.</p>
<pre><code>| # | Acción                                      | Hallazgos | Responsable | Esfuerzo | Plazo   | Cómo verificar                         |
|---|---------------------------------------------|-----------|-------------|----------|---------|----------------------------------------|
| 1 | Verificar propiedad del pedido en servidor  | H-03      | Desarrollo  | Bajo     | 1 semana| Prueba automática de autorización      |
| 2 | Restringir Actuator a health e info         | H-05      | Desarrollo  | Bajo     | 1 semana| Revisar la configuración y probar      |
| 3 | Añadir CSP y revisar cabeceras              | H-08      | Desarrollo  | Medio    | 1 mes   | Escaneo con ZAP baseline               |
| 4 | Ocultar versión del servidor                | H-11      | Operaciones | Bajo     | 1 mes   | Revisar cabeceras de respuesta         |</code></pre>
<p>Para cada acción define también cómo evitar que el problema regrese: pruebas automáticas, reglas en el pipeline, capacitación, revisión de código.</p>
<div class="nota">
  <strong>Propón también mejoras de proceso, no solo parches</strong>
  Por ejemplo: activar SAST y SCA en el pipeline, incluir pruebas de autorización en CI, detección de secretos antes del commit, un playbook para este tipo de incidente. Eso ataca la causa, no solo el síntoma.
</div>

<h3>Paso 8. Informe ejecutivo (una página)</h3>
<p>Está dirigido a quien decide, no a quien programa. Evita tecnicismos.</p>
<pre><code>INFORME EJECUTIVO

1. Qué se evaluó y cuándo
2. Resultado general: [nivel de riesgo global y una frase que lo resuma]
3. Los tres hallazgos más importantes
   - Qué ocurre, en palabras sencillas
   - Qué podría pasar si no se corrige
4. Qué recomendamos hacer primero
5. Qué necesitamos para hacerlo (tiempo, personas, decisiones)
6. Aspectos que funcionan bien</code></pre>

<h3>Paso 9. Presentación (10 a 15 minutos)</h3>
<ol>
  <li>Objetivo y alcance (1 minuto).</li>
  <li>El sistema y su diagrama (2 minutos).</li>
  <li>Cómo evaluaste (2 minutos).</li>
  <li>Los hallazgos principales con una demostración o evidencia (4 minutos).</li>
  <li>Riesgos y plan de mitigación (3 minutos).</li>
  <li>Aprendizajes y siguientes pasos (1 minuto).</li>
</ol>
<p>Mensaje clave: qué hay que hacer primero y por qué.</p>

<h2>6. Mini ejemplo de referencia</h2>
<div class="ejemplo">
  <strong>Caso: "TiendaDemo", un laboratorio local</strong>
  <ul>
    <li><strong>Alcance:</strong> aplicación en <code>http://localhost:3000</code>, solo en mi equipo, datos ficticios.</li>
    <li><strong>Diagrama:</strong> navegador, API, base de datos. Frontera: internet / servidor / base de datos.</li>
    <li><strong>Amenazas principales:</strong> E (acceder a funciones de administrador), I (ver pedidos ajenos), T (modificar precios al comprar), S (suplantar a otro usuario), D (saturar el inicio de sesión).</li>
    <li><strong>Pruebas:</strong> 18 pruebas manuales, un escaneo pasivo y uno activo con ZAP, revisión de cabeceras y cookies, revisión de dependencias.</li>
    <li><strong>Hallazgos:</strong> 7 (1 crítico, 2 altos, 3 medios, 1 bajo).</li>
    <li><strong>Plan:</strong> 6 acciones; las dos primeras corrigen los hallazgos críticos y altos en menos de una semana de trabajo.</li>
    <li><strong>Resultado:</strong> riesgo global alto antes de las correcciones; medio-bajo esperado después.</li>
  </ul>
</div>

<h2>7. Rúbrica de evaluación (100 puntos)</h2>
<table>
  <thead><tr><th>Criterio</th><th>Puntos</th><th>Excelente</th><th>Suficiente</th><th>Insuficiente</th></tr></thead>
  <tbody>
    <tr><td>Alcance y ética</td><td>10</td><td>Alcance claro, autorización documentada, datos ficticios.</td><td>Alcance definido, pero con huecos.</td><td>Sin alcance o sin autorización.</td></tr>
    <tr><td>Modelo de amenazas</td><td>15</td><td>Diagrama con fronteras, STRIDE completo y priorizado.</td><td>Diagrama y amenazas, pero sin priorizar.</td><td>Sin diagrama o amenazas genéricas.</td></tr>
    <tr><td>Pruebas y evidencia</td><td>20</td><td>Pruebas amplias, registradas, reproducibles y con evidencia.</td><td>Pruebas razonables con evidencia parcial.</td><td>Pocas pruebas o sin evidencia.</td></tr>
    <tr><td>Calidad de los hallazgos</td><td>15</td><td>Claros, verificados, con pasos, impacto y referencias.</td><td>Correctos, pero con detalles faltantes.</td><td>Vagos, sin pasos o con falsos positivos.</td></tr>
    <tr><td>Análisis de riesgos</td><td>10</td><td>Calificación justificada y prioridades coherentes.</td><td>Calificación sin justificar bien.</td><td>Sin análisis o incoherente.</td></tr>
    <tr><td>Plan de mitigación</td><td>15</td><td>Acciones concretas, priorizadas, con responsable, esfuerzo y verificación; incluye mejoras de proceso.</td><td>Acciones correctas, pero poco concretas.</td><td>Recomendaciones genéricas.</td></tr>
    <tr><td>Comunicación (informe y presentación)</td><td>10</td><td>Claro para público técnico y no técnico.</td><td>Claro para público técnico.</td><td>Confuso o desorganizado.</td></tr>
    <tr><td>Reflexión y aprendizaje</td><td>5</td><td>Identifica límites de su evaluación y qué mejoraría.</td><td>Reflexión breve.</td><td>Sin reflexión.</td></tr>
  </tbody>
</table>
<p>Referencia de interpretación: de 90 a 100, excelente; de 70 a 89, aprobado con solidez; de 60 a 69, suficiente con mejoras necesarias; menos de 60, requiere rehacer.</p>
<div class="nota">
  <strong>Sugerencia de ponderación si usas el curso en una formación</strong>
  Un esquema posible es: exámenes y cuestionarios 30%, prácticas y laboratorios 40% y proyecto final 30%. Ajústalo a las necesidades de tu grupo u organización.
</div>

<h2>8. Lista de verificación antes de entregar</h2>
<table>
  <thead><tr><th>Pregunta</th><th>¿Cumple?</th></tr></thead>
  <tbody>
    <tr><td>¿Hay autorización y alcance escritos?</td><td></td></tr>
    <tr><td>¿Todas las pruebas fueron en sistemas autorizados y con datos ficticios?</td><td></td></tr>
    <tr><td>¿El diagrama muestra las fronteras de confianza?</td><td></td></tr>
    <tr><td>¿Cada hallazgo tiene pasos para reproducir y evidencia?</td><td></td></tr>
    <tr><td>¿Verificaste los hallazgos manualmente (sin falsos positivos)?</td><td></td></tr>
    <tr><td>¿La evidencia no contiene secretos ni datos reales?</td><td></td></tr>
    <tr><td>¿Los riesgos están calificados y justificados?</td><td></td></tr>
    <tr><td>¿El plan de mitigación tiene responsable, esfuerzo, plazo y forma de verificar?</td><td></td></tr>
    <tr><td>¿Incluiste mejoras de proceso además de correcciones?</td><td></td></tr>
    <tr><td>¿El informe ejecutivo cabe en una página y se entiende sin saber de seguridad?</td><td></td></tr>
    <tr><td>¿Mencionaste lo que funciona bien y las limitaciones de tu evaluación?</td><td></td></tr>
  </tbody>
</table>

<h2>9. Errores frecuentes en este proyecto</h2>
<ul>
  <li>Entregar el informe de una herramienta como si fuera la evaluación.</li>
  <li>Hallazgos sin pasos para reproducirlos.</li>
  <li>Marcar todo como "crítico" sin justificar.</li>
  <li>Plan de mitigación con frases como "mejorar la seguridad".</li>
  <li>Probar fuera del alcance definido.</li>
  <li>Incluir en la evidencia datos reales, contraseñas o tokens.</li>
  <li>No decir qué se dejó sin probar.</li>
</ul>

<h2>10. Después del curso: cómo seguir</h2>
<ul>
  <li><strong>Practica en laboratorios legales:</strong> OWASP Juice Shop, WebGoat y otros entornos pensados para aprender.</li>
  <li><strong>Lee las fuentes originales:</strong> OWASP Top 10, OWASP API Security Top 10, ASVS, WSTG y las hojas de referencia (cheat sheets) de OWASP.</li>
  <li><strong>Mantente al día:</strong> las listas y las herramientas cambian. Revisa la edición vigente de cada documento antes de usarlo.</li>
  <li><strong>Aplica lo aprendido en tu trabajo:</strong> añade pruebas de autorización, detección de secretos y análisis de dependencias a tus proyectos.</li>
  <li><strong>Participa en la comunidad:</strong> capítulos locales de OWASP, grupos de estudio, competencias de práctica legales.</li>
  <li><strong>Considera una certificación</strong> si te ayuda en tu carrera. Existen opciones de distintos niveles y enfoques; elige según tu perfil y objetivos.</li>
  <li><strong>Enseña lo que sabes:</strong> explicar un tema a otra persona es la mejor forma de dominarlo.</li>
</ul>

<h2>11. Autoevaluación del proceso</h2>
<p>El cuestionario de abajo verifica que comprendes el proceso del proyecto. La evaluación real de tu proyecto la hace la rúbrica de la sección 7. Después, desbloquearás el examen del nivel y la evaluación final del curso cuando hayas aprobado todos los módulos.</p>
`,
  quiz: [
    {
      p: "Antes de empezar la evaluación de seguridad de un sistema, ¿qué debe quedar claro y documentado?",
      o: ["El alcance y la autorización", "El color del informe", "El nombre del navegador", "El número de páginas"],
      c: 0,
      e: "Sin alcance y permiso, la evaluación puede ser ilegal y descontrolada."
    },
    {
      p: "¿Cuál es la opción más segura para quien no tiene una aplicación propia?",
      o: ["Probar el sitio de un banco", "Usar un laboratorio como OWASP Juice Shop en su equipo", "Probar el sitio de un amigo sin avisar", "Escanear internet"],
      c: 1,
      e: "Es un entorno diseñado para practicar sin riesgo para nadie."
    },
    {
      p: "¿Para qué sirve marcar las fronteras de confianza en el diagrama?",
      o: ["Para identificar dónde cambian los niveles de confianza y se concentran los riesgos", "Para decorar", "Para ahorrar tinta", "Para ocultar datos"],
      c: 0,
      e: "Ahí es donde conviene concentrar controles y pruebas."
    },
    {
      p: "¿Qué debe tener todo hallazgo bien redactado?",
      o: ["Pasos para reproducir, evidencia, impacto y recomendación", "Solo un título llamativo", "Solo una captura sin explicación", "Una lista de culpables"],
      c: 0,
      e: "Permite que el equipo entienda, reproduzca y corrija."
    },
    {
      p: "Una herramienta automática reporta un problema. ¿Qué debes hacer antes de incluirlo como hallazgo?",
      o: ["Verificarlo manualmente para descartar falsos positivos", "Copiarlo sin revisar", "Borrarlo", "Subirle la gravedad"],
      c: 0,
      e: "Un hallazgo no verificado resta credibilidad a todo el informe."
    },
    {
      p: "¿Cómo se prioriza el plan de mitigación?",
      o: ["Por riesgo y esfuerzo: primero lo que reduce mucho riesgo con poco esfuerzo", "Alfabéticamente", "Por el color de la alerta", "Al azar"],
      c: 0,
      e: "Se busca el mayor beneficio rápido sin descuidar lo grave."
    },
    {
      p: "¿Qué acción es mejor para el plan de mitigación?",
      o: ["Mejorar la seguridad", "Verificar en el servidor la propiedad del pedido, con una prueba automática de autorización como verificación", "Tener más cuidado", "Cambiar de aplicación"],
      c: 1,
      e: "Una acción concreta tiene responsable, plazo y forma de verificar."
    },
    {
      p: "¿A quién va dirigido el informe ejecutivo?",
      o: ["A quien decide, sin necesidad de conocimientos técnicos", "Solo al equipo de desarrollo", "A los atacantes", "A nadie"],
      c: 0,
      e: "Debe explicar el riesgo y lo que se necesita, en palabras sencillas."
    },
    {
      p: "¿Qué datos deben usarse durante las pruebas y en la evidencia?",
      o: ["Datos ficticios, sin secretos ni información real de terceros", "Los datos reales de clientes", "Contraseñas reales", "Cualquier dato disponible"],
      c: 0,
      e: "La evidencia puede acabar en un informe que otras personas leen."
    },
    {
      p: "Además de corregir fallos, ¿qué conviene proponer en el plan?",
      o: ["Mejoras de proceso, como pruebas de autorización en CI y detección de secretos en el pipeline", "Nada más", "Cambiar de lenguaje de programación", "Eliminar las pruebas"],
      c: 0,
      e: "Se ataca la causa, no solo el síntoma."
    }
  ]
};
