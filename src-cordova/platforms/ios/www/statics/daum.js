window.daum = window.daum || {},
function() {
  function t(t) {
    var a = {};
    return t.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(t, e, r) {
      a[e] = r
    }),
    a
  }
  function a(t) {
    t && document.write('<script charset="UTF-8" src="' + t + '"></script>')
  }
  function e() {
    if (d.length) {
      var t = r(R[d.shift()], e);
      t.start()
    } else
      n()
  }
  function r(t, a) {
    var e = document.createElement("script");
    return e.charset = "utf-8",
    e.onload = a,
    e.onreadystatechange = function() {
      /loaded|complete/.test(this.readyState) && a()
    }
    ,
    {
      start: function() {
        e.src = t || "",
        document.getElementsByTagName("head")[0].appendChild(e),
        e = null
      }
    }
  }
  function n() {
    for (; S[0]; )
      S.shift()();
    c.readyState = 2
  }
  var c = daum.maps = daum.maps || {};
  if (void 0 === c.readyState)
    c.onloadcallbacks = [],
    c.readyState = 0;
  else if (2 === c.readyState)
    return;
  c.VERSION = {
    ROADMAP: "1804vdy",
    ROADMAP_SUFFIX: "",
    HYBRID: "1804vdy",
    SR: "2.00",
    ROADVIEW: "5.00",
    ROADVIEW_FLASH: "171207",
    BICYCLE: "5.00",
    USE_DISTRICT: "1804vdy",
    SKYVIEW_VERSION: "160114",
    SKYVIEW_HD_VERSION: "160107"
  },
  c.RESOURCE_PATH = {
    ROADVIEW_AJAX: "//s1.daumcdn.net/svc/attach/U03/cssjs/mapapi/ajax/170322/1490160180663/roadview.js"
  };
  for (var s, o = "https:" == location.protocol ? "https:" : "http:", E = "", i = document.getElementsByTagName("script"), I = i.length; s = i[--I]; )
    if (/\/(beta-)?dapi\.kakao\.com\/v2\/maps\/sdk\.js\b/.test(s.src)) {
      E = s.src;
      break
    }
  i = null;
  var S = c.onloadcallbacks
    , d = ["v3"]
    , _ = ""
    , R = {
    v3: o + "//s1.daumcdn.net/svc/attach/U03/cssjs/mapapi/4.0.5/1511766411374/kakao.js",
    services: o + "//s1.daumcdn.net/svc/attach/U03/cssjs/mapapi/libs/1.0.1/1515130215283/services.js",
    drawing: o + "//s1.daumcdn.net/svc/attach/U03/cssjs/mapapi/libs/1.2.4/1508998369646/drawing.js",
    clusterer: o + "//s1.daumcdn.net/svc/attach/U03/cssjs/mapapi/libs/1.0.6/1460434272434/clusterer.js"
  }
    , l = t(E);
  _ = l.appkey,
  _ && (c.apikey = _),
  c.version = "4.0.5";
  var u = l.libraries;
  if (u && (d = d.concat(u.split(","))),
  "false" !== l.autoload) {
    for (var I = 0, A = d.length; I < A; I++)
      a(R[d[I]]);
    c.readyState = 2
  }
  c.load = function(t) {
    switch (S.push(t),
    c.readyState) {
    case 0:
      c.readyState = 1,
      e();
      break;
    case 2:
      n()
    }
  }
}();
