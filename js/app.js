(function () {
  "use strict";

  var CLAVE = "curso-seguridad-v1";
  var LETRAS = ["A", "B", "C", "D", "E"];
  var $contenido = document.getElementById("contenido");
  var $lista = document.getElementById("lista-menu");
  var $btnMenu = document.getElementById("btn-menu");
  var $velo = document.getElementById("velo");

  /* ---------- Progreso guardado en el navegador ---------- */
  function leer() {
    try {
      var p = JSON.parse(localStorage.getItem(CLAVE));
      if (p && p.modulos && p.examenes) return p;
    } catch (e) { /* sin datos */ }
    return { modulos: {}, examenes: {} };
  }
  function guardar(p) {
    try { localStorage.setItem(CLAVE, JSON.stringify(p)); } catch (e) { /* modo privado */ }
  }
  var progreso = leer();

  function aprobado(id) { return progreso.modulos[id] >= CURSO.aprobado; }
  function completados() { return CURSO.lista.filter(function (m) { return aprobado(m.id); }).length; }
  function modulosDe(niveles) {
    return CURSO.lista.filter(function (m) { return niveles.indexOf(m.nivel) !== -1; });
  }
  function examenPorId(id) {
    return CURSO.examenes.find(function (x) { return x.id === id; });
  }
  function examenDisponible(ex) { return modulosDe(ex.niveles).every(function (m) { return aprobado(m.id); }); }
  function moduloListo(id) { return !!CURSO.contenido[id]; }
  function buscarModulo(id) { return CURSO.lista.find(function (m) { return m.id === id; }); }

  /* ---------- Menú ---------- */
  function agregarItem(ruta, titulo, estado, actual, clase) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = "#/" + ruta;
    var t = document.createElement("span");
    t.textContent = titulo;
    var e = document.createElement("span");
    e.className = "estado";
    e.textContent = estado;
    a.appendChild(t); a.appendChild(e);
    var clases = [];
    if (clase) clases.push(clase);
    if (estado === "Pronto" || estado === "Bloqueado") clases.push("bloqueado");
    a.className = clases.join(" ");
    if (ruta === actual) a.setAttribute("aria-current", "page");
    li.appendChild(a);
    $lista.appendChild(li);
  }
  function agregarGrupo(texto) {
    var li = document.createElement("li");
    li.className = "grupo";
    li.textContent = texto;
    $lista.appendChild(li);
  }

  function estadoExamen(ex) {
    if (progreso.examenes[ex.id] >= CURSO.aprobado) return "Listo";
    return examenDisponible(ex) ? "" : "Bloqueado";
  }

  function construirMenu(actual) {
    $lista.innerHTML = "";
    agregarItem("inicio", "Inicio", "", actual);
    CURSO.niveles.forEach(function (n) {
      agregarGrupo(n.titulo);
      modulosDe([n.id]).forEach(function (m) {
        var estado = aprobado(m.id) ? "Listo" : (moduloListo(m.id) ? "" : "Pronto");
        agregarItem(m.id, m.titulo, estado, actual);
      });
      var ex = examenPorId("examen-" + n.id);
      if (ex) agregarItem(ex.id, ex.titulo, estadoExamen(ex), actual, "examen-link");
    });
    agregarGrupo("Cierre del curso");
    var fin = examenPorId("examen-final");
    if (fin) agregarItem(fin.id, fin.titulo, estadoExamen(fin), actual, "examen-link");

    var total = CURSO.lista.length;
    var hechos = completados();
    document.getElementById("barra-progreso").style.width = Math.round(hechos / total * 100) + "%";
    document.getElementById("progreso-texto").textContent = hechos + " de " + total + " módulos";
  }

  function abrirMenu(abrir) {
    document.body.classList.toggle("menu-abierto", abrir);
    $btnMenu.setAttribute("aria-expanded", String(abrir));
    $velo.hidden = !abrir || window.innerWidth >= 960;
  }
  $btnMenu.addEventListener("click", function () {
    abrirMenu(!document.body.classList.contains("menu-abierto"));
  });
  $velo.addEventListener("click", function () { abrirMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") abrirMenu(false); });

  /* ---------- Tema claro / oscuro ---------- */
  function aplicarTema(t) {
    document.documentElement.setAttribute("data-tema", t);
    try { localStorage.setItem(CLAVE + "-tema", t); } catch (e) {}
  }
  var temaGuardado = null;
  try { temaGuardado = localStorage.getItem(CLAVE + "-tema"); } catch (e) {}
  aplicarTema(temaGuardado || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "oscuro" : "claro"));
  document.getElementById("btn-tema").addEventListener("click", function () {
    aplicarTema(document.documentElement.getAttribute("data-tema") === "oscuro" ? "claro" : "oscuro");
  });

  /* ---------- Cuestionarios ---------- */
  function mezclar(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  // Mezcla el orden de las opciones manteniendo la respuesta correcta
  function mezclarPreguntas(qs) {
    return qs.map(function (q) {
      var orden = mezclar(q.o.map(function (_, i) { return i; }));
      return { p: q.p, e: q.e, o: orden.map(function (i) { return q.o[i]; }), c: orden.indexOf(q.c) };
    });
  }

  // preguntas: [{p, o:[...], c:indiceCorrecto, e:"explicación"}]
  function crearQuiz(preguntas, idBase, alTerminar) {
    var cont = document.createElement("section");
    cont.className = "quiz";
    var form = document.createElement("form");
    form.noValidate = true;

    preguntas.forEach(function (q, i) {
      var fs = document.createElement("fieldset");
      fs.className = "pregunta";
      var lg = document.createElement("legend");
      lg.textContent = (i + 1) + ". " + q.p;
      fs.appendChild(lg);
      q.o.forEach(function (texto, k) {
        var lb = document.createElement("label");
        lb.className = "opcion";
        var inp = document.createElement("input");
        inp.type = "radio";
        inp.name = idBase + "-" + i;
        inp.value = String(k);
        var sp = document.createElement("span");
        sp.textContent = LETRAS[k] + ") " + texto;
        lb.appendChild(inp); lb.appendChild(sp);
        fs.appendChild(lb);
      });
      var retro = document.createElement("div");
      retro.className = "retro";
      retro.setAttribute("aria-live", "polite");
      fs.appendChild(retro);
      form.appendChild(fs);
    });

    var acciones = document.createElement("div");
    acciones.className = "acciones";
    var enviar = document.createElement("button");
    enviar.type = "submit"; enviar.className = "btn"; enviar.textContent = "Revisar respuestas";
    var reiniciar = document.createElement("button");
    reiniciar.type = "button"; reiniciar.className = "btn sec"; reiniciar.textContent = "Intentar de nuevo";
    reiniciar.hidden = true;
    acciones.appendChild(enviar); acciones.appendChild(reiniciar);
    form.appendChild(acciones);

    var res = document.createElement("div");
    res.setAttribute("aria-live", "polite");
    form.appendChild(res);
    cont.appendChild(form);

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var fieldsets = form.querySelectorAll(".pregunta");
      var sinResponder = 0, buenas = 0;
      preguntas.forEach(function (q, i) {
        if (!form.querySelector("input[name='" + idBase + "-" + i + "']:checked")) sinResponder++;
      });
      if (sinResponder > 0) {
        res.innerHTML = "";
        var aviso = document.createElement("div");
        aviso.className = "resultado mal";
        aviso.textContent = "Te faltan " + sinResponder + " pregunta(s) por responder.";
        res.appendChild(aviso);
        return;
      }
      preguntas.forEach(function (q, i) {
        var fs = fieldsets[i];
        var sel = form.querySelector("input[name='" + idBase + "-" + i + "']:checked");
        var elegida = parseInt(sel.value, 10);
        var opciones = fs.querySelectorAll(".opcion");
        opciones.forEach(function (o) { o.classList.remove("correcta", "incorrecta"); });
        opciones[q.c].classList.add("correcta");
        var retro = fs.querySelector(".retro");
        if (elegida === q.c) {
          buenas++;
          retro.textContent = "Correcto. " + (q.e || "");
        } else {
          opciones[elegida].classList.add("incorrecta");
          retro.textContent = "Respuesta correcta: " + LETRAS[q.c] + ". " + (q.e || "");
        }
        fs.querySelectorAll("input").forEach(function (x) { x.disabled = true; });
      });
      var pct = Math.round(buenas / preguntas.length * 100);
      var ok = pct >= CURSO.aprobado;
      res.innerHTML = "";
      var r = document.createElement("div");
      r.className = "resultado " + (ok ? "ok" : "mal");
      r.textContent = "Resultado: " + buenas + " de " + preguntas.length + " (" + pct + "%). " +
        (ok ? "Aprobado." : "Necesitas " + CURSO.aprobado + "% para aprobar. Repasa y vuelve a intentar.");
      res.appendChild(r);
      enviar.disabled = true;
      reiniciar.hidden = false;
      alTerminar(pct);
    });

    reiniciar.addEventListener("click", function () { alTerminar(null, true); });
    return cont;
  }

  /* ---------- Vistas ---------- */
  function limpiar() { $contenido.innerHTML = ""; }

  function enlace(href, texto, secundario) {
    var a = document.createElement("a");
    a.className = "btn" + (secundario ? " sec" : "");
    a.href = href;
    a.textContent = texto;
    return a;
  }

  function vistaInicio() {
    limpiar();
    var h = document.createElement("div");
    h.innerHTML =
      "<h1>" + CURSO.titulo + "</h1>" +
      "<p>Un curso para entender cómo proteger la información, las aplicaciones y los sistemas. " +
      "Empieza desde cero, sin conocimientos previos, y avanza por tres niveles: básico, intermedio y avanzado.</p>" +
      "<div class='nota'><strong>Cómo avanzar</strong>Abre el menú, elige un módulo y sigue el orden. " +
      "Cada módulo termina con un cuestionario. Necesitas " + CURSO.aprobado + "% para marcarlo como terminado. " +
      "Al terminar un nivel se desbloquea su examen. Tu avance se guarda en este navegador.</div>" +
      "<div class='aviso legal'><strong>Uso responsable</strong>Todo lo que se explica aquí es para proteger y para aprender en entornos propios o autorizados. " +
      "Nunca pruebes técnicas en sistemas ajenos sin permiso por escrito.</div>";
    var acc = document.createElement("div");
    acc.className = "acciones";
    acc.appendChild(enlace("#/b00", "Comenzar el curso"));
    h.appendChild(acc);
    $contenido.appendChild(h);
  }

  // Siguiente destino después de un módulo
  function navegacion(id) {
    var idx = CURSO.lista.findIndex(function (m) { return m.id === id; });
    var actual = CURSO.lista[idx];
    var acc = document.createElement("div");
    acc.className = "acciones";
    if (idx > 0) acc.appendChild(enlace("#/" + CURSO.lista[idx - 1].id, "Anterior", true));
    var sig = CURSO.lista[idx + 1];
    if (sig && sig.nivel === actual.nivel) {
      acc.appendChild(enlace("#/" + sig.id, "Siguiente módulo"));
    } else {
      acc.appendChild(enlace("#/examen-" + actual.nivel, "Ir al examen del nivel"));
    }
    return acc;
  }

  function vistaModulo(id) {
    limpiar();
    var meta = buscarModulo(id);
    var mod = CURSO.contenido[id];
    if (!mod) {
      $contenido.innerHTML = "<h1>" + meta.titulo + "</h1><div class='aviso'><strong>Próximamente</strong>Este módulo todavía se está preparando.</div>";
      $contenido.appendChild(navegacion(id));
      return;
    }
    var art = document.createElement("article");
    art.innerHTML = "<h1>" + meta.titulo + "</h1>" + mod.html;
    $contenido.appendChild(art);

    var titulo = document.createElement("h2");
    titulo.textContent = "Cuestionario del módulo";
    $contenido.appendChild(titulo);
    if (progreso.modulos[id] != null) {
      var pn = document.createElement("p");
      pn.textContent = "Tu mejor resultado: " + progreso.modulos[id] + "%.";
      $contenido.appendChild(pn);
    }
    var holder = document.createElement("div");
    $contenido.appendChild(holder);

    function montar() {
      holder.innerHTML = "";
      holder.appendChild(crearQuiz(mezclarPreguntas(mod.quiz), id, function (pct, reintento) {
        if (reintento) { montar(); return; }
        if (pct > (progreso.modulos[id] || 0)) progreso.modulos[id] = pct;
        guardar(progreso);
        construirMenu(id);
      }));
    }
    montar();
    $contenido.appendChild(navegacion(id));
  }

  function vistaExamen(id) {
    limpiar();
    var ex = examenPorId(id);
    var h1 = document.createElement("h1");
    h1.textContent = ex.titulo;
    $contenido.appendChild(h1);

    if (!examenDisponible(ex)) {
      var faltan = modulosDe(ex.niveles).filter(function (m) { return !aprobado(m.id); }).length;
      var av = document.createElement("div");
      av.className = "aviso";
      av.innerHTML = "<strong>Todavía no disponible</strong>Aprueba los cuestionarios de todos los módulos correspondientes para desbloquearlo. Te faltan " + faltan + ".";
      $contenido.appendChild(av);
      return;
    }
    var pool = [];
    modulosDe(ex.niveles).forEach(function (m) {
      var mod = CURSO.contenido[m.id];
      if (mod) pool = pool.concat(mod.examen && mod.examen.length ? mod.examen : mod.quiz);
    });
    var cantidad = ex.niveles.length > 1 ? 30 : 20;
    var intro = document.createElement("p");
    intro.textContent = "Hasta " + cantidad + " preguntas al azar de los módulos del examen. Necesitas " +
      CURSO.aprobado + "% para aprobar. Puedes repetirlo las veces que quieras.";
    $contenido.appendChild(intro);
    if (progreso.examenes[id] != null) {
      var pn = document.createElement("p");
      pn.textContent = "Tu mejor resultado: " + progreso.examenes[id] + "%.";
      $contenido.appendChild(pn);
    }
    var holder = document.createElement("div");
    $contenido.appendChild(holder);
    function montar() {
      holder.innerHTML = "";
      var elegidas = mezclarPreguntas(mezclar(pool).slice(0, cantidad));
      holder.appendChild(crearQuiz(elegidas, id, function (pct, reintento) {
        if (reintento) { montar(); window.scrollTo(0, 0); return; }
        if (pct > (progreso.examenes[id] || 0)) progreso.examenes[id] = pct;
        guardar(progreso);
        construirMenu(id);
      }));
    }
    montar();

    // Enlace al siguiente nivel
    var orden = CURSO.niveles.map(function (n) { return "examen-" + n.id; });
    var pos = orden.indexOf(id);
    var acc = document.createElement("div");
    acc.className = "acciones";
    if (pos !== -1 && pos < orden.length - 1) {
      var proximo = CURSO.lista.find(function (m) { return m.nivel === CURSO.niveles[pos + 1].id; });
      acc.appendChild(enlace("#/" + proximo.id, "Continuar con el " + CURSO.niveles[pos + 1].titulo));
    } else if (pos === orden.length - 1) {
      acc.appendChild(enlace("#/examen-final", "Ir a la evaluación final"));
    }
    $contenido.appendChild(acc);
  }

  /* ---------- Rutas ---------- */
  function ruta() {
    var r = (location.hash.replace(/^#\/?/, "") || "inicio");
    var esModulo = !!buscarModulo(r);
    var esExamen = !!examenPorId(r);
    if (r !== "inicio" && !esModulo && !esExamen) r = "inicio";

    var titulo = "";
    if (r === "inicio") vistaInicio();
    else if (esExamen) { vistaExamen(r); titulo = examenPorId(r).titulo; }
    else { vistaModulo(r); titulo = buscarModulo(r).titulo; }

    construirMenu(r);
    document.title = (titulo ? titulo + " | " : "") + "Seguridad de la Información";
    window.scrollTo(0, 0);
    if (window.innerWidth < 960) abrirMenu(false);
    $contenido.focus({ preventScroll: true });
  }
  window.addEventListener("hashchange", ruta);

  abrirMenu(window.innerWidth >= 960);
  ruta();
})();
