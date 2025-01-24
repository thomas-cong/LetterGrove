function dd(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const i in r)
        if (i !== "default" && !(i in e)) {
          const o = Object.getOwnPropertyDescriptor(r, i);
          o && Object.defineProperty(e, i, o.get ? o : { enumerable: !0, get: () => r[i] });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const l of o.addedNodes) l.tagName === "LINK" && l.rel === "modulepreload" && r(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = n(i);
    fetch(i.href, o);
  }
})();
function fd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ad = { exports: {} },
  _o = {},
  hd = { exports: {} },
  K = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Bi = Symbol.for("react.element"),
  Qh = Symbol.for("react.portal"),
  Rh = Symbol.for("react.fragment"),
  Ih = Symbol.for("react.strict_mode"),
  Dh = Symbol.for("react.profiler"),
  xh = Symbol.for("react.provider"),
  Lh = Symbol.for("react.context"),
  Nh = Symbol.for("react.forward_ref"),
  Uh = Symbol.for("react.suspense"),
  Ph = Symbol.for("react.memo"),
  Th = Symbol.for("react.lazy"),
  Qu = Symbol.iterator;
function Mh(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Qu && e[Qu]) || e["@@iterator"]), typeof e == "function" ? e : null);
}
var gd = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  pd = Object.assign,
  md = {};
function wr(e, t, n) {
  (this.props = e), (this.context = t), (this.refs = md), (this.updater = n || gd);
}
wr.prototype.isReactComponent = {};
wr.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
wr.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function vd() {}
vd.prototype = wr.prototype;
function aa(e, t, n) {
  (this.props = e), (this.context = t), (this.refs = md), (this.updater = n || gd);
}
var ua = (aa.prototype = new vd());
ua.constructor = aa;
pd(ua, wr.prototype);
ua.isPureReactComponent = !0;
var Ru = Array.isArray,
  yd = Object.prototype.hasOwnProperty,
  ca = { current: null },
  Cd = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ed(e, t, n) {
  var r,
    i = {},
    o = null,
    l = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (l = t.ref), t.key !== void 0 && (o = "" + t.key), t))
      yd.call(t, r) && !Cd.hasOwnProperty(r) && (i[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) i.children = n;
  else if (1 < s) {
    for (var a = Array(s), u = 0; u < s; u++) a[u] = arguments[u + 2];
    i.children = a;
  }
  if (e && e.defaultProps) for (r in ((s = e.defaultProps), s)) i[r] === void 0 && (i[r] = s[r]);
  return { $$typeof: Bi, type: e, key: o, ref: l, props: i, _owner: ca.current };
}
function Oh(e, t) {
  return { $$typeof: Bi, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function da(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Bi;
}
function Fh(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var Iu = /\/+/g;
function Sl(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Fh("" + e.key) : t.toString(36);
}
function ro(e, t, n, r, i) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var l = !1;
  if (e === null) l = !0;
  else
    switch (o) {
      case "string":
      case "number":
        l = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case Bi:
          case Qh:
            l = !0;
        }
    }
  if (l)
    return (
      (l = e),
      (i = i(l)),
      (e = r === "" ? "." + Sl(l, 0) : r),
      Ru(i)
        ? ((n = ""),
          e != null && (n = e.replace(Iu, "$&/") + "/"),
          ro(i, t, n, "", function (u) {
            return u;
          }))
        : i != null &&
          (da(i) &&
            (i = Oh(
              i,
              n +
                (!i.key || (l && l.key === i.key) ? "" : ("" + i.key).replace(Iu, "$&/") + "/") +
                e
            )),
          t.push(i)),
      1
    );
  if (((l = 0), (r = r === "" ? "." : r + ":"), Ru(e)))
    for (var s = 0; s < e.length; s++) {
      o = e[s];
      var a = r + Sl(o, s);
      l += ro(o, t, n, a, i);
    }
  else if (((a = Mh(e)), typeof a == "function"))
    for (e = a.call(e), s = 0; !(o = e.next()).done; )
      (o = o.value), (a = r + Sl(o, s++)), (l += ro(o, t, n, a, i));
  else if (o === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return l;
}
function Mi(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    ro(e, r, "", "", function (o) {
      return t.call(n, o, i++);
    }),
    r
  );
}
function jh(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) && ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) && ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Ve = { current: null },
  io = { transition: null },
  zh = { ReactCurrentDispatcher: Ve, ReactCurrentBatchConfig: io, ReactCurrentOwner: ca };
function wd() {
  throw Error("act(...) is not supported in production builds of React.");
}
K.Children = {
  map: Mi,
  forEach: function (e, t, n) {
    Mi(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Mi(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Mi(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!da(e))
      throw Error("React.Children.only expected to receive a single React element child.");
    return e;
  },
};
K.Component = wr;
K.Fragment = Rh;
K.Profiler = Dh;
K.PureComponent = aa;
K.StrictMode = Ih;
K.Suspense = Uh;
K.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = zh;
K.act = wd;
K.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " + e + "."
    );
  var r = pd({}, e.props),
    i = e.key,
    o = e.ref,
    l = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (l = ca.current)),
      t.key !== void 0 && (i = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var s = e.type.defaultProps;
    for (a in t)
      yd.call(t, a) &&
        !Cd.hasOwnProperty(a) &&
        (r[a] = t[a] === void 0 && s !== void 0 ? s[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    s = Array(a);
    for (var u = 0; u < a; u++) s[u] = arguments[u + 2];
    r.children = s;
  }
  return { $$typeof: Bi, type: e.type, key: i, ref: o, props: r, _owner: l };
};
K.createContext = function (e) {
  return (
    (e = {
      $$typeof: Lh,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: xh, _context: e }),
    (e.Consumer = e)
  );
};
K.createElement = Ed;
K.createFactory = function (e) {
  var t = Ed.bind(null, e);
  return (t.type = e), t;
};
K.createRef = function () {
  return { current: null };
};
K.forwardRef = function (e) {
  return { $$typeof: Nh, render: e };
};
K.isValidElement = da;
K.lazy = function (e) {
  return { $$typeof: Th, _payload: { _status: -1, _result: e }, _init: jh };
};
K.memo = function (e, t) {
  return { $$typeof: Ph, type: e, compare: t === void 0 ? null : t };
};
K.startTransition = function (e) {
  var t = io.transition;
  io.transition = {};
  try {
    e();
  } finally {
    io.transition = t;
  }
};
K.unstable_act = wd;
K.useCallback = function (e, t) {
  return Ve.current.useCallback(e, t);
};
K.useContext = function (e) {
  return Ve.current.useContext(e);
};
K.useDebugValue = function () {};
K.useDeferredValue = function (e) {
  return Ve.current.useDeferredValue(e);
};
K.useEffect = function (e, t) {
  return Ve.current.useEffect(e, t);
};
K.useId = function () {
  return Ve.current.useId();
};
K.useImperativeHandle = function (e, t, n) {
  return Ve.current.useImperativeHandle(e, t, n);
};
K.useInsertionEffect = function (e, t) {
  return Ve.current.useInsertionEffect(e, t);
};
K.useLayoutEffect = function (e, t) {
  return Ve.current.useLayoutEffect(e, t);
};
K.useMemo = function (e, t) {
  return Ve.current.useMemo(e, t);
};
K.useReducer = function (e, t, n) {
  return Ve.current.useReducer(e, t, n);
};
K.useRef = function (e) {
  return Ve.current.useRef(e);
};
K.useState = function (e) {
  return Ve.current.useState(e);
};
K.useSyncExternalStore = function (e, t, n) {
  return Ve.current.useSyncExternalStore(e, t, n);
};
K.useTransition = function () {
  return Ve.current.useTransition();
};
K.version = "18.3.1";
hd.exports = K;
var E = hd.exports;
const Pn = fd(E),
  Hh = dd({ __proto__: null, default: Pn }, [E]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var bh = E,
  Yh = Symbol.for("react.element"),
  Vh = Symbol.for("react.fragment"),
  Gh = Object.prototype.hasOwnProperty,
  Kh = bh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Wh = { key: !0, ref: !0, __self: !0, __source: !0 };
function Bd(e, t, n) {
  var r,
    i = {},
    o = null,
    l = null;
  n !== void 0 && (o = "" + n),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (l = t.ref);
  for (r in t) Gh.call(t, r) && !Wh.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps) for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
  return { $$typeof: Yh, type: e, key: o, ref: l, props: i, _owner: Kh.current };
}
_o.Fragment = Vh;
_o.jsx = Bd;
_o.jsxs = Bd;
Ad.exports = _o;
var v = Ad.exports,
  is = {},
  Sd = { exports: {} },
  it = {},
  kd = { exports: {} },
  Qd = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(N, b) {
    var Y = N.length;
    N.push(b);
    e: for (; 0 < Y; ) {
      var $ = (Y - 1) >>> 1,
        se = N[$];
      if (0 < i(se, b)) (N[$] = b), (N[Y] = se), (Y = $);
      else break e;
    }
  }
  function n(N) {
    return N.length === 0 ? null : N[0];
  }
  function r(N) {
    if (N.length === 0) return null;
    var b = N[0],
      Y = N.pop();
    if (Y !== b) {
      N[0] = Y;
      e: for (var $ = 0, se = N.length, Bt = se >>> 1; $ < Bt; ) {
        var xe = 2 * ($ + 1) - 1,
          At = N[xe],
          ze = xe + 1,
          Lt = N[ze];
        if (0 > i(At, Y))
          ze < se && 0 > i(Lt, At)
            ? ((N[$] = Lt), (N[ze] = Y), ($ = ze))
            : ((N[$] = At), (N[xe] = Y), ($ = xe));
        else if (ze < se && 0 > i(Lt, Y)) (N[$] = Lt), (N[ze] = Y), ($ = ze);
        else break e;
      }
    }
    return b;
  }
  function i(N, b) {
    var Y = N.sortIndex - b.sortIndex;
    return Y !== 0 ? Y : N.id - b.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var l = Date,
      s = l.now();
    e.unstable_now = function () {
      return l.now() - s;
    };
  }
  var a = [],
    u = [],
    d = 1,
    f = null,
    A = 3,
    y = !1,
    S = !1,
    B = !1,
    D = typeof setTimeout == "function" ? setTimeout : null,
    g = typeof clearTimeout == "function" ? clearTimeout : null,
    c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(N) {
    for (var b = n(u); b !== null; ) {
      if (b.callback === null) r(u);
      else if (b.startTime <= N) r(u), (b.sortIndex = b.expirationTime), t(a, b);
      else break;
      b = n(u);
    }
  }
  function k(N) {
    if (((B = !1), p(N), !S))
      if (n(a) !== null) (S = !0), Ke(Q);
      else {
        var b = n(u);
        b !== null && Ae(k, b.startTime - N);
      }
  }
  function Q(N, b) {
    (S = !1), B && ((B = !1), g(I), (I = -1)), (y = !0);
    var Y = A;
    try {
      for (p(b), f = n(a); f !== null && (!(f.expirationTime > b) || (N && !_())); ) {
        var $ = f.callback;
        if (typeof $ == "function") {
          (f.callback = null), (A = f.priorityLevel);
          var se = $(f.expirationTime <= b);
          (b = e.unstable_now()),
            typeof se == "function" ? (f.callback = se) : f === n(a) && r(a),
            p(b);
        } else r(a);
        f = n(a);
      }
      if (f !== null) var Bt = !0;
      else {
        var xe = n(u);
        xe !== null && Ae(k, xe.startTime - b), (Bt = !1);
      }
      return Bt;
    } finally {
      (f = null), (A = Y), (y = !1);
    }
  }
  var m = !1,
    L = null,
    I = -1,
    j = 5,
    P = -1;
  function _() {
    return !(e.unstable_now() - P < j);
  }
  function ie() {
    if (L !== null) {
      var N = e.unstable_now();
      P = N;
      var b = !0;
      try {
        b = L(!0, N);
      } finally {
        b ? ce() : ((m = !1), (L = null));
      }
    } else m = !1;
  }
  var ce;
  if (typeof c == "function")
    ce = function () {
      c(ie);
    };
  else if (typeof MessageChannel < "u") {
    var te = new MessageChannel(),
      Te = te.port2;
    (te.port1.onmessage = ie),
      (ce = function () {
        Te.postMessage(null);
      });
  } else
    ce = function () {
      D(ie, 0);
    };
  function Ke(N) {
    (L = N), m || ((m = !0), ce());
  }
  function Ae(N, b) {
    I = D(function () {
      N(e.unstable_now());
    }, b);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (N) {
      N.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      S || y || ((S = !0), Ke(Q));
    }),
    (e.unstable_forceFrameRate = function (N) {
      0 > N || 125 < N
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (j = 0 < N ? Math.floor(1e3 / N) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return A;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (N) {
      switch (A) {
        case 1:
        case 2:
        case 3:
          var b = 3;
          break;
        default:
          b = A;
      }
      var Y = A;
      A = b;
      try {
        return N();
      } finally {
        A = Y;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (N, b) {
      switch (N) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          N = 3;
      }
      var Y = A;
      A = N;
      try {
        return b();
      } finally {
        A = Y;
      }
    }),
    (e.unstable_scheduleCallback = function (N, b, Y) {
      var $ = e.unstable_now();
      switch (
        (typeof Y == "object" && Y !== null
          ? ((Y = Y.delay), (Y = typeof Y == "number" && 0 < Y ? $ + Y : $))
          : (Y = $),
        N)
      ) {
        case 1:
          var se = -1;
          break;
        case 2:
          se = 250;
          break;
        case 5:
          se = 1073741823;
          break;
        case 4:
          se = 1e4;
          break;
        default:
          se = 5e3;
      }
      return (
        (se = Y + se),
        (N = {
          id: d++,
          callback: b,
          priorityLevel: N,
          startTime: Y,
          expirationTime: se,
          sortIndex: -1,
        }),
        Y > $
          ? ((N.sortIndex = Y),
            t(u, N),
            n(a) === null && N === n(u) && (B ? (g(I), (I = -1)) : (B = !0), Ae(k, Y - $)))
          : ((N.sortIndex = se), t(a, N), S || y || ((S = !0), Ke(Q))),
        N
      );
    }),
    (e.unstable_shouldYield = _),
    (e.unstable_wrapCallback = function (N) {
      var b = A;
      return function () {
        var Y = A;
        A = b;
        try {
          return N.apply(this, arguments);
        } finally {
          A = Y;
        }
      };
    });
})(Qd);
kd.exports = Qd;
var Jh = kd.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Xh = E,
  rt = Jh;
function x(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Rd = new Set(),
  ii = {};
function zn(e, t) {
  hr(e, t), hr(e + "Capture", t);
}
function hr(e, t) {
  for (ii[e] = t, e = 0; e < t.length; e++) Rd.add(t[e]);
}
var zt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  os = Object.prototype.hasOwnProperty,
  qh =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Du = {},
  xu = {};
function _h(e) {
  return os.call(xu, e) ? !0 : os.call(Du, e) ? !1 : qh.test(e) ? (xu[e] = !0) : ((Du[e] = !0), !1);
}
function Zh(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function $h(e, t, n, r) {
  if (t === null || typeof t > "u" || Zh(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function Ge(e, t, n, r, i, o, l) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = l);
}
var Pe = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    Pe[e] = new Ge(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  Pe[t] = new Ge(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  Pe[e] = new Ge(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (e) {
  Pe[e] = new Ge(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    Pe[e] = new Ge(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  Pe[e] = new Ge(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  Pe[e] = new Ge(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  Pe[e] = new Ge(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  Pe[e] = new Ge(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var fa = /[\-:]([a-z])/g;
function Aa(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(fa, Aa);
    Pe[t] = new Ge(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(fa, Aa);
    Pe[t] = new Ge(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(fa, Aa);
  Pe[t] = new Ge(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  Pe[e] = new Ge(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Pe.xlinkHref = new Ge("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function (e) {
  Pe[e] = new Ge(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ha(e, t, n, r) {
  var i = Pe.hasOwnProperty(t) ? Pe[t] : null;
  (i !== null
    ? i.type !== 0
    : r || !(2 < t.length) || (t[0] !== "o" && t[0] !== "O") || (t[1] !== "n" && t[1] !== "N")) &&
    ($h(t, n, i, r) && (n = null),
    r || i === null
      ? _h(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : i.mustUseProperty
      ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
      : ((t = i.attributeName),
        (r = i.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((i = i.type),
            (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Vt = Xh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Oi = Symbol.for("react.element"),
  Xn = Symbol.for("react.portal"),
  qn = Symbol.for("react.fragment"),
  ga = Symbol.for("react.strict_mode"),
  ls = Symbol.for("react.profiler"),
  Id = Symbol.for("react.provider"),
  Dd = Symbol.for("react.context"),
  pa = Symbol.for("react.forward_ref"),
  ss = Symbol.for("react.suspense"),
  as = Symbol.for("react.suspense_list"),
  ma = Symbol.for("react.memo"),
  qt = Symbol.for("react.lazy"),
  xd = Symbol.for("react.offscreen"),
  Lu = Symbol.iterator;
function xr(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Lu && e[Lu]) || e["@@iterator"]), typeof e == "function" ? e : null);
}
var pe = Object.assign,
  kl;
function br(e) {
  if (kl === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      kl = (t && t[1]) || "";
    }
  return (
    `
` +
    kl +
    e
  );
}
var Ql = !1;
function Rl(e, t) {
  if (!e || Ql) return "";
  Ql = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var i = u.stack.split(`
`),
          o = r.stack.split(`
`),
          l = i.length - 1,
          s = o.length - 1;
        1 <= l && 0 <= s && i[l] !== o[s];

      )
        s--;
      for (; 1 <= l && 0 <= s; l--, s--)
        if (i[l] !== o[s]) {
          if (l !== 1 || s !== 1)
            do
              if ((l--, s--, 0 > s || i[l] !== o[s])) {
                var a =
                  `
` + i[l].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    a.includes("<anonymous>") &&
                    (a = a.replace("<anonymous>", e.displayName)),
                  a
                );
              }
            while (1 <= l && 0 <= s);
          break;
        }
    }
  } finally {
    (Ql = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? br(e) : "";
}
function eg(e) {
  switch (e.tag) {
    case 5:
      return br(e.type);
    case 16:
      return br("Lazy");
    case 13:
      return br("Suspense");
    case 19:
      return br("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Rl(e.type, !1)), e;
    case 11:
      return (e = Rl(e.type.render, !1)), e;
    case 1:
      return (e = Rl(e.type, !0)), e;
    default:
      return "";
  }
}
function us(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case qn:
      return "Fragment";
    case Xn:
      return "Portal";
    case ls:
      return "Profiler";
    case ga:
      return "StrictMode";
    case ss:
      return "Suspense";
    case as:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Dd:
        return (e.displayName || "Context") + ".Consumer";
      case Id:
        return (e._context.displayName || "Context") + ".Provider";
      case pa:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case ma:
        return (t = e.displayName || null), t !== null ? t : us(e.type) || "Memo";
      case qt:
        (t = e._payload), (e = e._init);
        try {
          return us(e(t));
        } catch {}
    }
  return null;
}
function tg(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return us(t);
    case 8:
      return t === ga ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function hn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Ld(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function ng(e) {
  var t = Ld(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var i = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (l) {
          (r = "" + l), o.call(this, l);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (l) {
          r = "" + l;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function Fi(e) {
  e._valueTracker || (e._valueTracker = ng(e));
}
function Nd(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Ld(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function wo(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")) return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function cs(e, t) {
  var n = t.checked;
  return pe({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Nu(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = hn(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null,
    });
}
function Ud(e, t) {
  (t = t.checked), t != null && ha(e, "checked", t, !1);
}
function ds(e, t) {
  Ud(e, t);
  var n = hn(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? fs(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && fs(e, t.type, hn(t.defaultValue)),
    t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Uu(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!((r !== "submit" && r !== "reset") || (t.value !== void 0 && t.value !== null))) return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function fs(e, t, n) {
  (t !== "number" || wo(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Yr = Array.isArray;
function sr(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      (i = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + hn(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        (e[i].selected = !0), r && (e[i].defaultSelected = !0);
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function As(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(x(91));
  return pe({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Pu(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(x(92));
      if (Yr(n)) {
        if (1 < n.length) throw Error(x(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: hn(n) };
}
function Pd(e, t) {
  var n = hn(t.value),
    r = hn(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function Tu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Td(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function hs(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Td(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var ji,
  Md = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (
        ji = ji || document.createElement("div"),
          ji.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = ji.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function oi(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Xr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  rg = ["Webkit", "ms", "Moz", "O"];
Object.keys(Xr).forEach(function (e) {
  rg.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Xr[t] = Xr[e]);
  });
});
function Od(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Xr.hasOwnProperty(e) && Xr[e])
    ? ("" + t).trim()
    : t + "px";
}
function Fd(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        i = Od(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i);
    }
}
var ig = pe(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function gs(e, t) {
  if (t) {
    if (ig[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(x(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(x(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML))
        throw Error(x(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(x(62));
  }
}
function ps(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var ms = null;
function va(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var vs = null,
  ar = null,
  ur = null;
function Mu(e) {
  if ((e = Qi(e))) {
    if (typeof vs != "function") throw Error(x(280));
    var t = e.stateNode;
    t && ((t = nl(t)), vs(e.stateNode, e.type, t));
  }
}
function jd(e) {
  ar ? (ur ? ur.push(e) : (ur = [e])) : (ar = e);
}
function zd() {
  if (ar) {
    var e = ar,
      t = ur;
    if (((ur = ar = null), Mu(e), t)) for (e = 0; e < t.length; e++) Mu(t[e]);
  }
}
function Hd(e, t) {
  return e(t);
}
function bd() {}
var Il = !1;
function Yd(e, t, n) {
  if (Il) return e(t, n);
  Il = !0;
  try {
    return Hd(e, t, n);
  } finally {
    (Il = !1), (ar !== null || ur !== null) && (bd(), zd());
  }
}
function li(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = nl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(e === "button" || e === "input" || e === "select" || e === "textarea"))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(x(231, t, typeof n));
  return n;
}
var ys = !1;
if (zt)
  try {
    var Lr = {};
    Object.defineProperty(Lr, "passive", {
      get: function () {
        ys = !0;
      },
    }),
      window.addEventListener("test", Lr, Lr),
      window.removeEventListener("test", Lr, Lr);
  } catch {
    ys = !1;
  }
function og(e, t, n, r, i, o, l, s, a) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (d) {
    this.onError(d);
  }
}
var qr = !1,
  Bo = null,
  So = !1,
  Cs = null,
  lg = {
    onError: function (e) {
      (qr = !0), (Bo = e);
    },
  };
function sg(e, t, n, r, i, o, l, s, a) {
  (qr = !1), (Bo = null), og.apply(lg, arguments);
}
function ag(e, t, n, r, i, o, l, s, a) {
  if ((sg.apply(this, arguments), qr)) {
    if (qr) {
      var u = Bo;
      (qr = !1), (Bo = null);
    } else throw Error(x(198));
    So || ((So = !0), (Cs = u));
  }
}
function Hn(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Vd(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
      return t.dehydrated;
  }
  return null;
}
function Ou(e) {
  if (Hn(e) !== e) throw Error(x(188));
}
function ug(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Hn(e)), t === null)) throw Error(x(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var i = n.return;
    if (i === null) break;
    var o = i.alternate;
    if (o === null) {
      if (((r = i.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === o.child) {
      for (o = i.child; o; ) {
        if (o === n) return Ou(i), e;
        if (o === r) return Ou(i), t;
        o = o.sibling;
      }
      throw Error(x(188));
    }
    if (n.return !== r.return) (n = i), (r = o);
    else {
      for (var l = !1, s = i.child; s; ) {
        if (s === n) {
          (l = !0), (n = i), (r = o);
          break;
        }
        if (s === r) {
          (l = !0), (r = i), (n = o);
          break;
        }
        s = s.sibling;
      }
      if (!l) {
        for (s = o.child; s; ) {
          if (s === n) {
            (l = !0), (n = o), (r = i);
            break;
          }
          if (s === r) {
            (l = !0), (r = o), (n = i);
            break;
          }
          s = s.sibling;
        }
        if (!l) throw Error(x(189));
      }
    }
    if (n.alternate !== r) throw Error(x(190));
  }
  if (n.tag !== 3) throw Error(x(188));
  return n.stateNode.current === n ? e : t;
}
function Gd(e) {
  return (e = ug(e)), e !== null ? Kd(e) : null;
}
function Kd(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Kd(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Wd = rt.unstable_scheduleCallback,
  Fu = rt.unstable_cancelCallback,
  cg = rt.unstable_shouldYield,
  dg = rt.unstable_requestPaint,
  Ee = rt.unstable_now,
  fg = rt.unstable_getCurrentPriorityLevel,
  ya = rt.unstable_ImmediatePriority,
  Jd = rt.unstable_UserBlockingPriority,
  ko = rt.unstable_NormalPriority,
  Ag = rt.unstable_LowPriority,
  Xd = rt.unstable_IdlePriority,
  Zo = null,
  It = null;
function hg(e) {
  if (It && typeof It.onCommitFiberRoot == "function")
    try {
      It.onCommitFiberRoot(Zo, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Ct = Math.clz32 ? Math.clz32 : mg,
  gg = Math.log,
  pg = Math.LN2;
function mg(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((gg(e) / pg) | 0)) | 0;
}
var zi = 64,
  Hi = 4194304;
function Vr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Qo(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    o = e.pingedLanes,
    l = n & 268435455;
  if (l !== 0) {
    var s = l & ~i;
    s !== 0 ? (r = Vr(s)) : ((o &= l), o !== 0 && (r = Vr(o)));
  } else (l = n & ~i), l !== 0 ? (r = Vr(l)) : o !== 0 && (r = Vr(o));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (o = t & -t), i >= o || (i === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - Ct(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
  return r;
}
function vg(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function yg(e, t) {
  for (
    var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, o = e.pendingLanes;
    0 < o;

  ) {
    var l = 31 - Ct(o),
      s = 1 << l,
      a = i[l];
    a === -1 ? (!(s & n) || s & r) && (i[l] = vg(s, t)) : a <= t && (e.expiredLanes |= s),
      (o &= ~s);
  }
}
function Es(e) {
  return (e = e.pendingLanes & -1073741825), e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function qd() {
  var e = zi;
  return (zi <<= 1), !(zi & 4194240) && (zi = 64), e;
}
function Dl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Si(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Ct(t)),
    (e[t] = n);
}
function Cg(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - Ct(n),
      o = 1 << i;
    (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~o);
  }
}
function Ca(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Ct(n),
      i = 1 << r;
    (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
  }
}
var ne = 0;
function _d(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var Zd,
  Ea,
  $d,
  ef,
  tf,
  ws = !1,
  bi = [],
  rn = null,
  on = null,
  ln = null,
  si = new Map(),
  ai = new Map(),
  Zt = [],
  Eg =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function ju(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      rn = null;
      break;
    case "dragenter":
    case "dragleave":
      on = null;
      break;
    case "mouseover":
    case "mouseout":
      ln = null;
      break;
    case "pointerover":
    case "pointerout":
      si.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      ai.delete(t.pointerId);
  }
}
function Nr(e, t, n, r, i, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [i],
      }),
      t !== null && ((t = Qi(t)), t !== null && Ea(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function wg(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return (rn = Nr(rn, e, t, n, r, i)), !0;
    case "dragenter":
      return (on = Nr(on, e, t, n, r, i)), !0;
    case "mouseover":
      return (ln = Nr(ln, e, t, n, r, i)), !0;
    case "pointerover":
      var o = i.pointerId;
      return si.set(o, Nr(si.get(o) || null, e, t, n, r, i)), !0;
    case "gotpointercapture":
      return (o = i.pointerId), ai.set(o, Nr(ai.get(o) || null, e, t, n, r, i)), !0;
  }
  return !1;
}
function nf(e) {
  var t = Rn(e.target);
  if (t !== null) {
    var n = Hn(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Vd(n)), t !== null)) {
          (e.blockedOn = t),
            tf(e.priority, function () {
              $d(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function oo(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Bs(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (ms = r), n.target.dispatchEvent(r), (ms = null);
    } else return (t = Qi(n)), t !== null && Ea(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function zu(e, t, n) {
  oo(e) && n.delete(t);
}
function Bg() {
  (ws = !1),
    rn !== null && oo(rn) && (rn = null),
    on !== null && oo(on) && (on = null),
    ln !== null && oo(ln) && (ln = null),
    si.forEach(zu),
    ai.forEach(zu);
}
function Ur(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    ws || ((ws = !0), rt.unstable_scheduleCallback(rt.unstable_NormalPriority, Bg)));
}
function ui(e) {
  function t(i) {
    return Ur(i, e);
  }
  if (0 < bi.length) {
    Ur(bi[0], e);
    for (var n = 1; n < bi.length; n++) {
      var r = bi[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    rn !== null && Ur(rn, e),
      on !== null && Ur(on, e),
      ln !== null && Ur(ln, e),
      si.forEach(t),
      ai.forEach(t),
      n = 0;
    n < Zt.length;
    n++
  )
    (r = Zt[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Zt.length && ((n = Zt[0]), n.blockedOn === null); )
    nf(n), n.blockedOn === null && Zt.shift();
}
var cr = Vt.ReactCurrentBatchConfig,
  Ro = !0;
function Sg(e, t, n, r) {
  var i = ne,
    o = cr.transition;
  cr.transition = null;
  try {
    (ne = 1), wa(e, t, n, r);
  } finally {
    (ne = i), (cr.transition = o);
  }
}
function kg(e, t, n, r) {
  var i = ne,
    o = cr.transition;
  cr.transition = null;
  try {
    (ne = 4), wa(e, t, n, r);
  } finally {
    (ne = i), (cr.transition = o);
  }
}
function wa(e, t, n, r) {
  if (Ro) {
    var i = Bs(e, t, n, r);
    if (i === null) jl(e, t, r, Io, n), ju(e, r);
    else if (wg(i, e, t, n, r)) r.stopPropagation();
    else if ((ju(e, r), t & 4 && -1 < Eg.indexOf(e))) {
      for (; i !== null; ) {
        var o = Qi(i);
        if ((o !== null && Zd(o), (o = Bs(e, t, n, r)), o === null && jl(e, t, r, Io, n), o === i))
          break;
        i = o;
      }
      i !== null && r.stopPropagation();
    } else jl(e, t, r, null, n);
  }
}
var Io = null;
function Bs(e, t, n, r) {
  if (((Io = null), (e = va(r)), (e = Rn(e)), e !== null))
    if (((t = Hn(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Vd(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Io = e), null;
}
function rf(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (fg()) {
        case ya:
          return 1;
        case Jd:
          return 4;
        case ko:
        case Ag:
          return 16;
        case Xd:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var en = null,
  Ba = null,
  lo = null;
function of() {
  if (lo) return lo;
  var e,
    t = Ba,
    n = t.length,
    r,
    i = "value" in en ? en.value : en.textContent,
    o = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var l = n - e;
  for (r = 1; r <= l && t[n - r] === i[o - r]; r++);
  return (lo = i.slice(e, 1 < r ? 1 - r : void 0));
}
function so(e) {
  var t = e.keyCode;
  return (
    "charCode" in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Yi() {
  return !0;
}
function Hu() {
  return !1;
}
function ot(e) {
  function t(n, r, i, o, l) {
    (this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = l),
      (this.currentTarget = null);
    for (var s in e) e.hasOwnProperty(s) && ((n = e[s]), (this[s] = n ? n(o) : o[s]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? Yi
        : Hu),
      (this.isPropagationStopped = Hu),
      this
    );
  }
  return (
    pe(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Yi));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Yi));
      },
      persist: function () {},
      isPersistent: Yi,
    }),
    t
  );
}
var Br = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Sa = ot(Br),
  ki = pe({}, Br, { view: 0, detail: 0 }),
  Qg = ot(ki),
  xl,
  Ll,
  Pr,
  $o = pe({}, ki, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: ka,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== Pr &&
            (Pr && e.type === "mousemove"
              ? ((xl = e.screenX - Pr.screenX), (Ll = e.screenY - Pr.screenY))
              : (Ll = xl = 0),
            (Pr = e)),
          xl);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Ll;
    },
  }),
  bu = ot($o),
  Rg = pe({}, $o, { dataTransfer: 0 }),
  Ig = ot(Rg),
  Dg = pe({}, ki, { relatedTarget: 0 }),
  Nl = ot(Dg),
  xg = pe({}, Br, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Lg = ot(xg),
  Ng = pe({}, Br, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Ug = ot(Ng),
  Pg = pe({}, Br, { data: 0 }),
  Yu = ot(Pg),
  Tg = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Mg = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Og = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Fg(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Og[e]) ? !!t[e] : !1;
}
function ka() {
  return Fg;
}
var jg = pe({}, ki, {
    key: function (e) {
      if (e.key) {
        var t = Tg[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = so(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? Mg[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ka,
    charCode: function (e) {
      return e.type === "keypress" ? so(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? so(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  zg = ot(jg),
  Hg = pe({}, $o, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Vu = ot(Hg),
  bg = pe({}, ki, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ka,
  }),
  Yg = ot(bg),
  Vg = pe({}, Br, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Gg = ot(Vg),
  Kg = pe({}, $o, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Wg = ot(Kg),
  Jg = [9, 13, 27, 32],
  Qa = zt && "CompositionEvent" in window,
  _r = null;
zt && "documentMode" in document && (_r = document.documentMode);
var Xg = zt && "TextEvent" in window && !_r,
  lf = zt && (!Qa || (_r && 8 < _r && 11 >= _r)),
  Gu = String.fromCharCode(32),
  Ku = !1;
function sf(e, t) {
  switch (e) {
    case "keyup":
      return Jg.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function af(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var _n = !1;
function qg(e, t) {
  switch (e) {
    case "compositionend":
      return af(t);
    case "keypress":
      return t.which !== 32 ? null : ((Ku = !0), Gu);
    case "textInput":
      return (e = t.data), e === Gu && Ku ? null : e;
    default:
      return null;
  }
}
function _g(e, t) {
  if (_n)
    return e === "compositionend" || (!Qa && sf(e, t))
      ? ((e = of()), (lo = Ba = en = null), (_n = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return lf && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Zg = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Wu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Zg[e.type] : t === "textarea";
}
function uf(e, t, n, r) {
  jd(r),
    (t = Do(t, "onChange")),
    0 < t.length &&
      ((n = new Sa("onChange", "change", null, n, r)), e.push({ event: n, listeners: t }));
}
var Zr = null,
  ci = null;
function $g(e) {
  Cf(e, 0);
}
function el(e) {
  var t = er(e);
  if (Nd(t)) return e;
}
function ep(e, t) {
  if (e === "change") return t;
}
var cf = !1;
if (zt) {
  var Ul;
  if (zt) {
    var Pl = "oninput" in document;
    if (!Pl) {
      var Ju = document.createElement("div");
      Ju.setAttribute("oninput", "return;"), (Pl = typeof Ju.oninput == "function");
    }
    Ul = Pl;
  } else Ul = !1;
  cf = Ul && (!document.documentMode || 9 < document.documentMode);
}
function Xu() {
  Zr && (Zr.detachEvent("onpropertychange", df), (ci = Zr = null));
}
function df(e) {
  if (e.propertyName === "value" && el(ci)) {
    var t = [];
    uf(t, ci, e, va(e)), Yd($g, t);
  }
}
function tp(e, t, n) {
  e === "focusin"
    ? (Xu(), (Zr = t), (ci = n), Zr.attachEvent("onpropertychange", df))
    : e === "focusout" && Xu();
}
function np(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return el(ci);
}
function rp(e, t) {
  if (e === "click") return el(t);
}
function ip(e, t) {
  if (e === "input" || e === "change") return el(t);
}
function op(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var wt = typeof Object.is == "function" ? Object.is : op;
function di(e, t) {
  if (wt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!os.call(t, i) || !wt(e[i], t[i])) return !1;
  }
  return !0;
}
function qu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function _u(e, t) {
  var n = qu(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t)) return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = qu(n);
  }
}
function ff(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? ff(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function Af() {
  for (var e = window, t = wo(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = wo(e.document);
  }
  return t;
}
function Ra(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function lp(e) {
  var t = Af(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && ff(n.ownerDocument.documentElement, n)) {
    if (r !== null && Ra(n)) {
      if (((t = r.start), (e = r.end), e === void 0 && (e = t), "selectionStart" in n))
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window), e.getSelection)
      ) {
        e = e.getSelection();
        var i = n.textContent.length,
          o = Math.min(r.start, i);
        (r = r.end === void 0 ? o : Math.min(r.end, i)),
          !e.extend && o > r && ((i = r), (r = o), (o = i)),
          (i = _u(n, o));
        var l = _u(n, r);
        i &&
          l &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== l.node ||
            e.focusOffset !== l.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(l.node, l.offset))
            : (t.setEnd(l.node, l.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]), (e.element.scrollLeft = e.left), (e.element.scrollTop = e.top);
  }
}
var sp = zt && "documentMode" in document && 11 >= document.documentMode,
  Zn = null,
  Ss = null,
  $r = null,
  ks = !1;
function Zu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  ks ||
    Zn == null ||
    Zn !== wo(r) ||
    ((r = Zn),
    "selectionStart" in r && Ra(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    ($r && di($r, r)) ||
      (($r = r),
      (r = Do(Ss, "onSelect")),
      0 < r.length &&
        ((t = new Sa("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = Zn))));
}
function Vi(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var $n = {
    animationend: Vi("Animation", "AnimationEnd"),
    animationiteration: Vi("Animation", "AnimationIteration"),
    animationstart: Vi("Animation", "AnimationStart"),
    transitionend: Vi("Transition", "TransitionEnd"),
  },
  Tl = {},
  hf = {};
zt &&
  ((hf = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete $n.animationend.animation,
    delete $n.animationiteration.animation,
    delete $n.animationstart.animation),
  "TransitionEvent" in window || delete $n.transitionend.transition);
function tl(e) {
  if (Tl[e]) return Tl[e];
  if (!$n[e]) return e;
  var t = $n[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in hf) return (Tl[e] = t[n]);
  return e;
}
var gf = tl("animationend"),
  pf = tl("animationiteration"),
  mf = tl("animationstart"),
  vf = tl("transitionend"),
  yf = new Map(),
  $u =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function pn(e, t) {
  yf.set(e, t), zn(t, [e]);
}
for (var Ml = 0; Ml < $u.length; Ml++) {
  var Ol = $u[Ml],
    ap = Ol.toLowerCase(),
    up = Ol[0].toUpperCase() + Ol.slice(1);
  pn(ap, "on" + up);
}
pn(gf, "onAnimationEnd");
pn(pf, "onAnimationIteration");
pn(mf, "onAnimationStart");
pn("dblclick", "onDoubleClick");
pn("focusin", "onFocus");
pn("focusout", "onBlur");
pn(vf, "onTransitionEnd");
hr("onMouseEnter", ["mouseout", "mouseover"]);
hr("onMouseLeave", ["mouseout", "mouseover"]);
hr("onPointerEnter", ["pointerout", "pointerover"]);
hr("onPointerLeave", ["pointerout", "pointerover"]);
zn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
zn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")
);
zn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
zn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
zn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
zn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Gr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  cp = new Set("cancel close invalid load scroll toggle".split(" ").concat(Gr));
function ec(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), ag(r, t, void 0, e), (e.currentTarget = null);
}
function Cf(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var l = r.length - 1; 0 <= l; l--) {
          var s = r[l],
            a = s.instance,
            u = s.currentTarget;
          if (((s = s.listener), a !== o && i.isPropagationStopped())) break e;
          ec(i, s, u), (o = a);
        }
      else
        for (l = 0; l < r.length; l++) {
          if (
            ((s = r[l]),
            (a = s.instance),
            (u = s.currentTarget),
            (s = s.listener),
            a !== o && i.isPropagationStopped())
          )
            break e;
          ec(i, s, u), (o = a);
        }
    }
  }
  if (So) throw ((e = Cs), (So = !1), (Cs = null), e);
}
function ae(e, t) {
  var n = t[xs];
  n === void 0 && (n = t[xs] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Ef(t, e, 2, !1), n.add(r));
}
function Fl(e, t, n) {
  var r = 0;
  t && (r |= 4), Ef(n, e, r, t);
}
var Gi = "_reactListening" + Math.random().toString(36).slice(2);
function fi(e) {
  if (!e[Gi]) {
    (e[Gi] = !0),
      Rd.forEach(function (n) {
        n !== "selectionchange" && (cp.has(n) || Fl(n, !1, e), Fl(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Gi] || ((t[Gi] = !0), Fl("selectionchange", !1, t));
  }
}
function Ef(e, t, n, r) {
  switch (rf(t)) {
    case 1:
      var i = Sg;
      break;
    case 4:
      i = kg;
      break;
    default:
      i = wa;
  }
  (n = i.bind(null, t, n, e)),
    (i = void 0),
    !ys || (t !== "touchstart" && t !== "touchmove" && t !== "wheel") || (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : i !== void 0
      ? e.addEventListener(t, n, { passive: i })
      : e.addEventListener(t, n, !1);
}
function jl(e, t, n, r, i) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var l = r.tag;
      if (l === 3 || l === 4) {
        var s = r.stateNode.containerInfo;
        if (s === i || (s.nodeType === 8 && s.parentNode === i)) break;
        if (l === 4)
          for (l = r.return; l !== null; ) {
            var a = l.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = l.stateNode.containerInfo), a === i || (a.nodeType === 8 && a.parentNode === i))
            )
              return;
            l = l.return;
          }
        for (; s !== null; ) {
          if (((l = Rn(s)), l === null)) return;
          if (((a = l.tag), a === 5 || a === 6)) {
            r = o = l;
            continue e;
          }
          s = s.parentNode;
        }
      }
      r = r.return;
    }
  Yd(function () {
    var u = o,
      d = va(n),
      f = [];
    e: {
      var A = yf.get(e);
      if (A !== void 0) {
        var y = Sa,
          S = e;
        switch (e) {
          case "keypress":
            if (so(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = zg;
            break;
          case "focusin":
            (S = "focus"), (y = Nl);
            break;
          case "focusout":
            (S = "blur"), (y = Nl);
            break;
          case "beforeblur":
          case "afterblur":
            y = Nl;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            y = bu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = Ig;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = Yg;
            break;
          case gf:
          case pf:
          case mf:
            y = Lg;
            break;
          case vf:
            y = Gg;
            break;
          case "scroll":
            y = Qg;
            break;
          case "wheel":
            y = Wg;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = Ug;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = Vu;
        }
        var B = (t & 4) !== 0,
          D = !B && e === "scroll",
          g = B ? (A !== null ? A + "Capture" : null) : A;
        B = [];
        for (var c = u, p; c !== null; ) {
          p = c;
          var k = p.stateNode;
          if (
            (p.tag === 5 &&
              k !== null &&
              ((p = k), g !== null && ((k = li(c, g)), k != null && B.push(Ai(c, k, p)))),
            D)
          )
            break;
          c = c.return;
        }
        0 < B.length && ((A = new y(A, S, null, n, d)), f.push({ event: A, listeners: B }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((A = e === "mouseover" || e === "pointerover"),
          (y = e === "mouseout" || e === "pointerout"),
          A && n !== ms && (S = n.relatedTarget || n.fromElement) && (Rn(S) || S[Ht]))
        )
          break e;
        if (
          (y || A) &&
          ((A =
            d.window === d ? d : (A = d.ownerDocument) ? A.defaultView || A.parentWindow : window),
          y
            ? ((S = n.relatedTarget || n.toElement),
              (y = u),
              (S = S ? Rn(S) : null),
              S !== null && ((D = Hn(S)), S !== D || (S.tag !== 5 && S.tag !== 6)) && (S = null))
            : ((y = null), (S = u)),
          y !== S)
        ) {
          if (
            ((B = bu),
            (k = "onMouseLeave"),
            (g = "onMouseEnter"),
            (c = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((B = Vu), (k = "onPointerLeave"), (g = "onPointerEnter"), (c = "pointer")),
            (D = y == null ? A : er(y)),
            (p = S == null ? A : er(S)),
            (A = new B(k, c + "leave", y, n, d)),
            (A.target = D),
            (A.relatedTarget = p),
            (k = null),
            Rn(d) === u &&
              ((B = new B(g, c + "enter", S, n, d)),
              (B.target = p),
              (B.relatedTarget = D),
              (k = B)),
            (D = k),
            y && S)
          )
            t: {
              for (B = y, g = S, c = 0, p = B; p; p = Kn(p)) c++;
              for (p = 0, k = g; k; k = Kn(k)) p++;
              for (; 0 < c - p; ) (B = Kn(B)), c--;
              for (; 0 < p - c; ) (g = Kn(g)), p--;
              for (; c--; ) {
                if (B === g || (g !== null && B === g.alternate)) break t;
                (B = Kn(B)), (g = Kn(g));
              }
              B = null;
            }
          else B = null;
          y !== null && tc(f, A, y, B, !1), S !== null && D !== null && tc(f, D, S, B, !0);
        }
      }
      e: {
        if (
          ((A = u ? er(u) : window),
          (y = A.nodeName && A.nodeName.toLowerCase()),
          y === "select" || (y === "input" && A.type === "file"))
        )
          var Q = ep;
        else if (Wu(A))
          if (cf) Q = ip;
          else {
            Q = np;
            var m = tp;
          }
        else
          (y = A.nodeName) &&
            y.toLowerCase() === "input" &&
            (A.type === "checkbox" || A.type === "radio") &&
            (Q = rp);
        if (Q && (Q = Q(e, u))) {
          uf(f, Q, n, d);
          break e;
        }
        m && m(e, A, u),
          e === "focusout" &&
            (m = A._wrapperState) &&
            m.controlled &&
            A.type === "number" &&
            fs(A, "number", A.value);
      }
      switch (((m = u ? er(u) : window), e)) {
        case "focusin":
          (Wu(m) || m.contentEditable === "true") && ((Zn = m), (Ss = u), ($r = null));
          break;
        case "focusout":
          $r = Ss = Zn = null;
          break;
        case "mousedown":
          ks = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (ks = !1), Zu(f, n, d);
          break;
        case "selectionchange":
          if (sp) break;
        case "keydown":
        case "keyup":
          Zu(f, n, d);
      }
      var L;
      if (Qa)
        e: {
          switch (e) {
            case "compositionstart":
              var I = "onCompositionStart";
              break e;
            case "compositionend":
              I = "onCompositionEnd";
              break e;
            case "compositionupdate":
              I = "onCompositionUpdate";
              break e;
          }
          I = void 0;
        }
      else
        _n
          ? sf(e, n) && (I = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (I = "onCompositionStart");
      I &&
        (lf &&
          n.locale !== "ko" &&
          (_n || I !== "onCompositionStart"
            ? I === "onCompositionEnd" && _n && (L = of())
            : ((en = d), (Ba = "value" in en ? en.value : en.textContent), (_n = !0))),
        (m = Do(u, I)),
        0 < m.length &&
          ((I = new Yu(I, e, null, n, d)),
          f.push({ event: I, listeners: m }),
          L ? (I.data = L) : ((L = af(n)), L !== null && (I.data = L)))),
        (L = Xg ? qg(e, n) : _g(e, n)) &&
          ((u = Do(u, "onBeforeInput")),
          0 < u.length &&
            ((d = new Yu("onBeforeInput", "beforeinput", null, n, d)),
            f.push({ event: d, listeners: u }),
            (d.data = L)));
    }
    Cf(f, t);
  });
}
function Ai(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Do(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e,
      o = i.stateNode;
    i.tag === 5 &&
      o !== null &&
      ((i = o),
      (o = li(e, n)),
      o != null && r.unshift(Ai(e, o, i)),
      (o = li(e, t)),
      o != null && r.push(Ai(e, o, i))),
      (e = e.return);
  }
  return r;
}
function Kn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function tc(e, t, n, r, i) {
  for (var o = t._reactName, l = []; n !== null && n !== r; ) {
    var s = n,
      a = s.alternate,
      u = s.stateNode;
    if (a !== null && a === r) break;
    s.tag === 5 &&
      u !== null &&
      ((s = u),
      i
        ? ((a = li(n, o)), a != null && l.unshift(Ai(n, a, s)))
        : i || ((a = li(n, o)), a != null && l.push(Ai(n, a, s)))),
      (n = n.return);
  }
  l.length !== 0 && e.push({ event: t, listeners: l });
}
var dp = /\r\n?/g,
  fp = /\u0000|\uFFFD/g;
function nc(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      dp,
      `
`
    )
    .replace(fp, "");
}
function Ki(e, t, n) {
  if (((t = nc(t)), nc(e) !== t && n)) throw Error(x(425));
}
function xo() {}
var Qs = null,
  Rs = null;
function Is(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Ds = typeof setTimeout == "function" ? setTimeout : void 0,
  Ap = typeof clearTimeout == "function" ? clearTimeout : void 0,
  rc = typeof Promise == "function" ? Promise : void 0,
  hp =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof rc < "u"
      ? function (e) {
          return rc.resolve(null).then(e).catch(gp);
        }
      : Ds;
function gp(e) {
  setTimeout(function () {
    throw e;
  });
}
function zl(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(i), ui(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = i;
  } while (n);
  ui(t);
}
function sn(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function ic(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Sr = Math.random().toString(36).slice(2),
  Rt = "__reactFiber$" + Sr,
  hi = "__reactProps$" + Sr,
  Ht = "__reactContainer$" + Sr,
  xs = "__reactEvents$" + Sr,
  pp = "__reactListeners$" + Sr,
  mp = "__reactHandles$" + Sr;
function Rn(e) {
  var t = e[Rt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[Ht] || n[Rt])) {
      if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
        for (e = ic(e); e !== null; ) {
          if ((n = e[Rt])) return n;
          e = ic(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function Qi(e) {
  return (
    (e = e[Rt] || e[Ht]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function er(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(x(33));
}
function nl(e) {
  return e[hi] || null;
}
var Ls = [],
  tr = -1;
function mn(e) {
  return { current: e };
}
function ue(e) {
  0 > tr || ((e.current = Ls[tr]), (Ls[tr] = null), tr--);
}
function le(e, t) {
  tr++, (Ls[tr] = e.current), (e.current = t);
}
var gn = {},
  je = mn(gn),
  qe = mn(!1),
  Tn = gn;
function gr(e, t) {
  var n = e.type.contextTypes;
  if (!n) return gn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    o;
  for (o in n) i[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function _e(e) {
  return (e = e.childContextTypes), e != null;
}
function Lo() {
  ue(qe), ue(je);
}
function oc(e, t, n) {
  if (je.current !== gn) throw Error(x(168));
  le(je, t), le(qe, n);
}
function wf(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function")) return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(x(108, tg(e) || "Unknown", i));
  return pe({}, n, r);
}
function No(e) {
  return (
    (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || gn),
    (Tn = je.current),
    le(je, e),
    le(qe, qe.current),
    !0
  );
}
function lc(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(x(169));
  n
    ? ((e = wf(e, t, Tn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      ue(qe),
      ue(je),
      le(je, e))
    : ue(qe),
    le(qe, n);
}
var Tt = null,
  rl = !1,
  Hl = !1;
function Bf(e) {
  Tt === null ? (Tt = [e]) : Tt.push(e);
}
function vp(e) {
  (rl = !0), Bf(e);
}
function vn() {
  if (!Hl && Tt !== null) {
    Hl = !0;
    var e = 0,
      t = ne;
    try {
      var n = Tt;
      for (ne = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Tt = null), (rl = !1);
    } catch (i) {
      throw (Tt !== null && (Tt = Tt.slice(e + 1)), Wd(ya, vn), i);
    } finally {
      (ne = t), (Hl = !1);
    }
  }
  return null;
}
var nr = [],
  rr = 0,
  Uo = null,
  Po = 0,
  lt = [],
  st = 0,
  Mn = null,
  Mt = 1,
  Ot = "";
function Bn(e, t) {
  (nr[rr++] = Po), (nr[rr++] = Uo), (Uo = e), (Po = t);
}
function Sf(e, t, n) {
  (lt[st++] = Mt), (lt[st++] = Ot), (lt[st++] = Mn), (Mn = e);
  var r = Mt;
  e = Ot;
  var i = 32 - Ct(r) - 1;
  (r &= ~(1 << i)), (n += 1);
  var o = 32 - Ct(t) + i;
  if (30 < o) {
    var l = i - (i % 5);
    (o = (r & ((1 << l) - 1)).toString(32)),
      (r >>= l),
      (i -= l),
      (Mt = (1 << (32 - Ct(t) + i)) | (n << i) | r),
      (Ot = o + e);
  } else (Mt = (1 << o) | (n << i) | r), (Ot = e);
}
function Ia(e) {
  e.return !== null && (Bn(e, 1), Sf(e, 1, 0));
}
function Da(e) {
  for (; e === Uo; ) (Uo = nr[--rr]), (nr[rr] = null), (Po = nr[--rr]), (nr[rr] = null);
  for (; e === Mn; )
    (Mn = lt[--st]),
      (lt[st] = null),
      (Ot = lt[--st]),
      (lt[st] = null),
      (Mt = lt[--st]),
      (lt[st] = null);
}
var nt = null,
  tt = null,
  fe = !1,
  yt = null;
function kf(e, t) {
  var n = ut(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function sc(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t),
        t !== null ? ((e.stateNode = t), (nt = e), (tt = sn(t.firstChild)), !0) : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (nt = e), (tt = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Mn !== null ? { id: Mt, overflow: Ot } : null),
            (e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }),
            (n = ut(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (nt = e),
            (tt = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Ns(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Us(e) {
  if (fe) {
    var t = tt;
    if (t) {
      var n = t;
      if (!sc(e, t)) {
        if (Ns(e)) throw Error(x(418));
        t = sn(n.nextSibling);
        var r = nt;
        t && sc(e, t) ? kf(r, n) : ((e.flags = (e.flags & -4097) | 2), (fe = !1), (nt = e));
      }
    } else {
      if (Ns(e)) throw Error(x(418));
      (e.flags = (e.flags & -4097) | 2), (fe = !1), (nt = e);
    }
  }
}
function ac(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  nt = e;
}
function Wi(e) {
  if (e !== nt) return !1;
  if (!fe) return ac(e), (fe = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type), (t = t !== "head" && t !== "body" && !Is(e.type, e.memoizedProps))),
    t && (t = tt))
  ) {
    if (Ns(e)) throw (Qf(), Error(x(418)));
    for (; t; ) kf(e, t), (t = sn(t.nextSibling));
  }
  if ((ac(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(x(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              tt = sn(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      tt = null;
    }
  } else tt = nt ? sn(e.stateNode.nextSibling) : null;
  return !0;
}
function Qf() {
  for (var e = tt; e; ) e = sn(e.nextSibling);
}
function pr() {
  (tt = nt = null), (fe = !1);
}
function xa(e) {
  yt === null ? (yt = [e]) : yt.push(e);
}
var yp = Vt.ReactCurrentBatchConfig;
function Tr(e, t, n) {
  if (((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(x(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(x(147, e));
      var i = r,
        o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o
        ? t.ref
        : ((t = function (l) {
            var s = i.refs;
            l === null ? delete s[o] : (s[o] = l);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(x(284));
    if (!n._owner) throw Error(x(290, e));
  }
  return e;
}
function Ji(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      x(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)
    ))
  );
}
function uc(e) {
  var t = e._init;
  return t(e._payload);
}
function Rf(e) {
  function t(g, c) {
    if (e) {
      var p = g.deletions;
      p === null ? ((g.deletions = [c]), (g.flags |= 16)) : p.push(c);
    }
  }
  function n(g, c) {
    if (!e) return null;
    for (; c !== null; ) t(g, c), (c = c.sibling);
    return null;
  }
  function r(g, c) {
    for (g = new Map(); c !== null; )
      c.key !== null ? g.set(c.key, c) : g.set(c.index, c), (c = c.sibling);
    return g;
  }
  function i(g, c) {
    return (g = dn(g, c)), (g.index = 0), (g.sibling = null), g;
  }
  function o(g, c, p) {
    return (
      (g.index = p),
      e
        ? ((p = g.alternate),
          p !== null ? ((p = p.index), p < c ? ((g.flags |= 2), c) : p) : ((g.flags |= 2), c))
        : ((g.flags |= 1048576), c)
    );
  }
  function l(g) {
    return e && g.alternate === null && (g.flags |= 2), g;
  }
  function s(g, c, p, k) {
    return c === null || c.tag !== 6
      ? ((c = Jl(p, g.mode, k)), (c.return = g), c)
      : ((c = i(c, p)), (c.return = g), c);
  }
  function a(g, c, p, k) {
    var Q = p.type;
    return Q === qn
      ? d(g, c, p.props.children, k, p.key)
      : c !== null &&
        (c.elementType === Q ||
          (typeof Q == "object" && Q !== null && Q.$$typeof === qt && uc(Q) === c.type))
      ? ((k = i(c, p.props)), (k.ref = Tr(g, c, p)), (k.return = g), k)
      : ((k = go(p.type, p.key, p.props, null, g.mode, k)),
        (k.ref = Tr(g, c, p)),
        (k.return = g),
        k);
  }
  function u(g, c, p, k) {
    return c === null ||
      c.tag !== 4 ||
      c.stateNode.containerInfo !== p.containerInfo ||
      c.stateNode.implementation !== p.implementation
      ? ((c = Xl(p, g.mode, k)), (c.return = g), c)
      : ((c = i(c, p.children || [])), (c.return = g), c);
  }
  function d(g, c, p, k, Q) {
    return c === null || c.tag !== 7
      ? ((c = Un(p, g.mode, k, Q)), (c.return = g), c)
      : ((c = i(c, p)), (c.return = g), c);
  }
  function f(g, c, p) {
    if ((typeof c == "string" && c !== "") || typeof c == "number")
      return (c = Jl("" + c, g.mode, p)), (c.return = g), c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case Oi:
          return (
            (p = go(c.type, c.key, c.props, null, g.mode, p)),
            (p.ref = Tr(g, null, c)),
            (p.return = g),
            p
          );
        case Xn:
          return (c = Xl(c, g.mode, p)), (c.return = g), c;
        case qt:
          var k = c._init;
          return f(g, k(c._payload), p);
      }
      if (Yr(c) || xr(c)) return (c = Un(c, g.mode, p, null)), (c.return = g), c;
      Ji(g, c);
    }
    return null;
  }
  function A(g, c, p, k) {
    var Q = c !== null ? c.key : null;
    if ((typeof p == "string" && p !== "") || typeof p == "number")
      return Q !== null ? null : s(g, c, "" + p, k);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case Oi:
          return p.key === Q ? a(g, c, p, k) : null;
        case Xn:
          return p.key === Q ? u(g, c, p, k) : null;
        case qt:
          return (Q = p._init), A(g, c, Q(p._payload), k);
      }
      if (Yr(p) || xr(p)) return Q !== null ? null : d(g, c, p, k, null);
      Ji(g, p);
    }
    return null;
  }
  function y(g, c, p, k, Q) {
    if ((typeof k == "string" && k !== "") || typeof k == "number")
      return (g = g.get(p) || null), s(c, g, "" + k, Q);
    if (typeof k == "object" && k !== null) {
      switch (k.$$typeof) {
        case Oi:
          return (g = g.get(k.key === null ? p : k.key) || null), a(c, g, k, Q);
        case Xn:
          return (g = g.get(k.key === null ? p : k.key) || null), u(c, g, k, Q);
        case qt:
          var m = k._init;
          return y(g, c, p, m(k._payload), Q);
      }
      if (Yr(k) || xr(k)) return (g = g.get(p) || null), d(c, g, k, Q, null);
      Ji(c, k);
    }
    return null;
  }
  function S(g, c, p, k) {
    for (var Q = null, m = null, L = c, I = (c = 0), j = null; L !== null && I < p.length; I++) {
      L.index > I ? ((j = L), (L = null)) : (j = L.sibling);
      var P = A(g, L, p[I], k);
      if (P === null) {
        L === null && (L = j);
        break;
      }
      e && L && P.alternate === null && t(g, L),
        (c = o(P, c, I)),
        m === null ? (Q = P) : (m.sibling = P),
        (m = P),
        (L = j);
    }
    if (I === p.length) return n(g, L), fe && Bn(g, I), Q;
    if (L === null) {
      for (; I < p.length; I++)
        (L = f(g, p[I], k)),
          L !== null && ((c = o(L, c, I)), m === null ? (Q = L) : (m.sibling = L), (m = L));
      return fe && Bn(g, I), Q;
    }
    for (L = r(g, L); I < p.length; I++)
      (j = y(L, g, I, p[I], k)),
        j !== null &&
          (e && j.alternate !== null && L.delete(j.key === null ? I : j.key),
          (c = o(j, c, I)),
          m === null ? (Q = j) : (m.sibling = j),
          (m = j));
    return (
      e &&
        L.forEach(function (_) {
          return t(g, _);
        }),
      fe && Bn(g, I),
      Q
    );
  }
  function B(g, c, p, k) {
    var Q = xr(p);
    if (typeof Q != "function") throw Error(x(150));
    if (((p = Q.call(p)), p == null)) throw Error(x(151));
    for (
      var m = (Q = null), L = c, I = (c = 0), j = null, P = p.next();
      L !== null && !P.done;
      I++, P = p.next()
    ) {
      L.index > I ? ((j = L), (L = null)) : (j = L.sibling);
      var _ = A(g, L, P.value, k);
      if (_ === null) {
        L === null && (L = j);
        break;
      }
      e && L && _.alternate === null && t(g, L),
        (c = o(_, c, I)),
        m === null ? (Q = _) : (m.sibling = _),
        (m = _),
        (L = j);
    }
    if (P.done) return n(g, L), fe && Bn(g, I), Q;
    if (L === null) {
      for (; !P.done; I++, P = p.next())
        (P = f(g, P.value, k)),
          P !== null && ((c = o(P, c, I)), m === null ? (Q = P) : (m.sibling = P), (m = P));
      return fe && Bn(g, I), Q;
    }
    for (L = r(g, L); !P.done; I++, P = p.next())
      (P = y(L, g, I, P.value, k)),
        P !== null &&
          (e && P.alternate !== null && L.delete(P.key === null ? I : P.key),
          (c = o(P, c, I)),
          m === null ? (Q = P) : (m.sibling = P),
          (m = P));
    return (
      e &&
        L.forEach(function (ie) {
          return t(g, ie);
        }),
      fe && Bn(g, I),
      Q
    );
  }
  function D(g, c, p, k) {
    if (
      (typeof p == "object" &&
        p !== null &&
        p.type === qn &&
        p.key === null &&
        (p = p.props.children),
      typeof p == "object" && p !== null)
    ) {
      switch (p.$$typeof) {
        case Oi:
          e: {
            for (var Q = p.key, m = c; m !== null; ) {
              if (m.key === Q) {
                if (((Q = p.type), Q === qn)) {
                  if (m.tag === 7) {
                    n(g, m.sibling), (c = i(m, p.props.children)), (c.return = g), (g = c);
                    break e;
                  }
                } else if (
                  m.elementType === Q ||
                  (typeof Q == "object" && Q !== null && Q.$$typeof === qt && uc(Q) === m.type)
                ) {
                  n(g, m.sibling),
                    (c = i(m, p.props)),
                    (c.ref = Tr(g, m, p)),
                    (c.return = g),
                    (g = c);
                  break e;
                }
                n(g, m);
                break;
              } else t(g, m);
              m = m.sibling;
            }
            p.type === qn
              ? ((c = Un(p.props.children, g.mode, k, p.key)), (c.return = g), (g = c))
              : ((k = go(p.type, p.key, p.props, null, g.mode, k)),
                (k.ref = Tr(g, c, p)),
                (k.return = g),
                (g = k));
          }
          return l(g);
        case Xn:
          e: {
            for (m = p.key; c !== null; ) {
              if (c.key === m)
                if (
                  c.tag === 4 &&
                  c.stateNode.containerInfo === p.containerInfo &&
                  c.stateNode.implementation === p.implementation
                ) {
                  n(g, c.sibling), (c = i(c, p.children || [])), (c.return = g), (g = c);
                  break e;
                } else {
                  n(g, c);
                  break;
                }
              else t(g, c);
              c = c.sibling;
            }
            (c = Xl(p, g.mode, k)), (c.return = g), (g = c);
          }
          return l(g);
        case qt:
          return (m = p._init), D(g, c, m(p._payload), k);
      }
      if (Yr(p)) return S(g, c, p, k);
      if (xr(p)) return B(g, c, p, k);
      Ji(g, p);
    }
    return (typeof p == "string" && p !== "") || typeof p == "number"
      ? ((p = "" + p),
        c !== null && c.tag === 6
          ? (n(g, c.sibling), (c = i(c, p)), (c.return = g), (g = c))
          : (n(g, c), (c = Jl(p, g.mode, k)), (c.return = g), (g = c)),
        l(g))
      : n(g, c);
  }
  return D;
}
var mr = Rf(!0),
  If = Rf(!1),
  To = mn(null),
  Mo = null,
  ir = null,
  La = null;
function Na() {
  La = ir = Mo = null;
}
function Ua(e) {
  var t = To.current;
  ue(To), (e._currentValue = t);
}
function Ps(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function dr(e, t) {
  (Mo = e),
    (La = ir = null),
    (e = e.dependencies),
    e !== null && e.firstContext !== null && (e.lanes & t && (Xe = !0), (e.firstContext = null));
}
function dt(e) {
  var t = e._currentValue;
  if (La !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), ir === null)) {
      if (Mo === null) throw Error(x(308));
      (ir = e), (Mo.dependencies = { lanes: 0, firstContext: e });
    } else ir = ir.next = e;
  return t;
}
var In = null;
function Pa(e) {
  In === null ? (In = [e]) : In.push(e);
}
function Df(e, t, n, r) {
  var i = t.interleaved;
  return (
    i === null ? ((n.next = n), Pa(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    bt(e, r)
  );
}
function bt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var _t = !1;
function Ta(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function xf(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Ft(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function an(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), q & 2)) {
    var i = r.pending;
    return i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)), (r.pending = t), bt(e, n);
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), Pa(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    bt(e, n)
  );
}
function ao(e, t, n) {
  if (((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Ca(e, n);
  }
}
function cc(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var i = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var l = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        o === null ? (i = o = l) : (o = o.next = l), (n = n.next);
      } while (n !== null);
      o === null ? (i = o = t) : (o = o.next = t);
    } else i = o = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function Oo(e, t, n, r) {
  var i = e.updateQueue;
  _t = !1;
  var o = i.firstBaseUpdate,
    l = i.lastBaseUpdate,
    s = i.shared.pending;
  if (s !== null) {
    i.shared.pending = null;
    var a = s,
      u = a.next;
    (a.next = null), l === null ? (o = u) : (l.next = u), (l = a);
    var d = e.alternate;
    d !== null &&
      ((d = d.updateQueue),
      (s = d.lastBaseUpdate),
      s !== l && (s === null ? (d.firstBaseUpdate = u) : (s.next = u), (d.lastBaseUpdate = a)));
  }
  if (o !== null) {
    var f = i.baseState;
    (l = 0), (d = u = a = null), (s = o);
    do {
      var A = s.lane,
        y = s.eventTime;
      if ((r & A) === A) {
        d !== null &&
          (d = d.next =
            {
              eventTime: y,
              lane: 0,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            });
        e: {
          var S = e,
            B = s;
          switch (((A = t), (y = n), B.tag)) {
            case 1:
              if (((S = B.payload), typeof S == "function")) {
                f = S.call(y, f, A);
                break e;
              }
              f = S;
              break e;
            case 3:
              S.flags = (S.flags & -65537) | 128;
            case 0:
              if (((S = B.payload), (A = typeof S == "function" ? S.call(y, f, A) : S), A == null))
                break e;
              f = pe({}, f, A);
              break e;
            case 2:
              _t = !0;
          }
        }
        s.callback !== null &&
          s.lane !== 0 &&
          ((e.flags |= 64), (A = i.effects), A === null ? (i.effects = [s]) : A.push(s));
      } else
        (y = {
          eventTime: y,
          lane: A,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null,
        }),
          d === null ? ((u = d = y), (a = f)) : (d = d.next = y),
          (l |= A);
      if (((s = s.next), s === null)) {
        if (((s = i.shared.pending), s === null)) break;
        (A = s), (s = A.next), (A.next = null), (i.lastBaseUpdate = A), (i.shared.pending = null);
      }
    } while (1);
    if (
      (d === null && (a = f),
      (i.baseState = a),
      (i.firstBaseUpdate = u),
      (i.lastBaseUpdate = d),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do (l |= i.lane), (i = i.next);
      while (i !== t);
    } else o === null && (i.shared.lanes = 0);
    (Fn |= l), (e.lanes = l), (e.memoizedState = f);
  }
}
function dc(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != "function")) throw Error(x(191, i));
        i.call(r);
      }
    }
}
var Ri = {},
  Dt = mn(Ri),
  gi = mn(Ri),
  pi = mn(Ri);
function Dn(e) {
  if (e === Ri) throw Error(x(174));
  return e;
}
function Ma(e, t) {
  switch ((le(pi, t), le(gi, e), le(Dt, Ri), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : hs(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = hs(t, e));
  }
  ue(Dt), le(Dt, t);
}
function vr() {
  ue(Dt), ue(gi), ue(pi);
}
function Lf(e) {
  Dn(pi.current);
  var t = Dn(Dt.current),
    n = hs(t, e.type);
  t !== n && (le(gi, e), le(Dt, n));
}
function Oa(e) {
  gi.current === e && (ue(Dt), ue(gi));
}
var he = mn(0);
function Fo(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!"))
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var bl = [];
function Fa() {
  for (var e = 0; e < bl.length; e++) bl[e]._workInProgressVersionPrimary = null;
  bl.length = 0;
}
var uo = Vt.ReactCurrentDispatcher,
  Yl = Vt.ReactCurrentBatchConfig,
  On = 0,
  ge = null,
  Qe = null,
  Ie = null,
  jo = !1,
  ei = !1,
  mi = 0,
  Cp = 0;
function Me() {
  throw Error(x(321));
}
function ja(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!wt(e[n], t[n])) return !1;
  return !0;
}
function za(e, t, n, r, i, o) {
  if (
    ((On = o),
    (ge = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (uo.current = e === null || e.memoizedState === null ? Sp : kp),
    (e = n(r, i)),
    ei)
  ) {
    o = 0;
    do {
      if (((ei = !1), (mi = 0), 25 <= o)) throw Error(x(301));
      (o += 1), (Ie = Qe = null), (t.updateQueue = null), (uo.current = Qp), (e = n(r, i));
    } while (ei);
  }
  if (
    ((uo.current = zo),
    (t = Qe !== null && Qe.next !== null),
    (On = 0),
    (Ie = Qe = ge = null),
    (jo = !1),
    t)
  )
    throw Error(x(300));
  return e;
}
function Ha() {
  var e = mi !== 0;
  return (mi = 0), e;
}
function Qt() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return Ie === null ? (ge.memoizedState = Ie = e) : (Ie = Ie.next = e), Ie;
}
function ft() {
  if (Qe === null) {
    var e = ge.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Qe.next;
  var t = Ie === null ? ge.memoizedState : Ie.next;
  if (t !== null) (Ie = t), (Qe = e);
  else {
    if (e === null) throw Error(x(310));
    (Qe = e),
      (e = {
        memoizedState: Qe.memoizedState,
        baseState: Qe.baseState,
        baseQueue: Qe.baseQueue,
        queue: Qe.queue,
        next: null,
      }),
      Ie === null ? (ge.memoizedState = Ie = e) : (Ie = Ie.next = e);
  }
  return Ie;
}
function vi(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Vl(e) {
  var t = ft(),
    n = t.queue;
  if (n === null) throw Error(x(311));
  n.lastRenderedReducer = e;
  var r = Qe,
    i = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (i !== null) {
      var l = i.next;
      (i.next = o.next), (o.next = l);
    }
    (r.baseQueue = i = o), (n.pending = null);
  }
  if (i !== null) {
    (o = i.next), (r = r.baseState);
    var s = (l = null),
      a = null,
      u = o;
    do {
      var d = u.lane;
      if ((On & d) === d)
        a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action));
      else {
        var f = {
          lane: d,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        a === null ? ((s = a = f), (l = r)) : (a = a.next = f), (ge.lanes |= d), (Fn |= d);
      }
      u = u.next;
    } while (u !== null && u !== o);
    a === null ? (l = r) : (a.next = s),
      wt(r, t.memoizedState) || (Xe = !0),
      (t.memoizedState = r),
      (t.baseState = l),
      (t.baseQueue = a),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do (o = i.lane), (ge.lanes |= o), (Fn |= o), (i = i.next);
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Gl(e) {
  var t = ft(),
    n = t.queue;
  if (n === null) throw Error(x(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    o = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var l = (i = i.next);
    do (o = e(o, l.action)), (l = l.next);
    while (l !== i);
    wt(o, t.memoizedState) || (Xe = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o);
  }
  return [o, r];
}
function Nf() {}
function Uf(e, t) {
  var n = ge,
    r = ft(),
    i = t(),
    o = !wt(r.memoizedState, i);
  if (
    (o && ((r.memoizedState = i), (Xe = !0)),
    (r = r.queue),
    ba(Mf.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (Ie !== null && Ie.memoizedState.tag & 1))
  ) {
    if (((n.flags |= 2048), yi(9, Tf.bind(null, n, r, i, t), void 0, null), De === null))
      throw Error(x(349));
    On & 30 || Pf(n, t, i);
  }
  return i;
}
function Pf(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = ge.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }), (ge.updateQueue = t), (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function Tf(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), Of(t) && Ff(e);
}
function Mf(e, t, n) {
  return n(function () {
    Of(t) && Ff(e);
  });
}
function Of(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !wt(e, n);
  } catch {
    return !0;
  }
}
function Ff(e) {
  var t = bt(e, 1);
  t !== null && Et(t, e, 1, -1);
}
function fc(e) {
  var t = Qt();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: vi,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Bp.bind(null, ge, e)),
    [t.memoizedState, e]
  );
}
function yi(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = ge.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (ge.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function jf() {
  return ft().memoizedState;
}
function co(e, t, n, r) {
  var i = Qt();
  (ge.flags |= e), (i.memoizedState = yi(1 | t, n, void 0, r === void 0 ? null : r));
}
function il(e, t, n, r) {
  var i = ft();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (Qe !== null) {
    var l = Qe.memoizedState;
    if (((o = l.destroy), r !== null && ja(r, l.deps))) {
      i.memoizedState = yi(t, n, o, r);
      return;
    }
  }
  (ge.flags |= e), (i.memoizedState = yi(1 | t, n, o, r));
}
function Ac(e, t) {
  return co(8390656, 8, e, t);
}
function ba(e, t) {
  return il(2048, 8, e, t);
}
function zf(e, t) {
  return il(4, 2, e, t);
}
function Hf(e, t) {
  return il(4, 4, e, t);
}
function bf(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Yf(e, t, n) {
  return (n = n != null ? n.concat([e]) : null), il(4, 4, bf.bind(null, t, e), n);
}
function Ya() {}
function Vf(e, t) {
  var n = ft();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && ja(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
}
function Gf(e, t) {
  var n = ft();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && ja(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Kf(e, t, n) {
  return On & 21
    ? (wt(n, t) || ((n = qd()), (ge.lanes |= n), (Fn |= n), (e.baseState = !0)), t)
    : (e.baseState && ((e.baseState = !1), (Xe = !0)), (e.memoizedState = n));
}
function Ep(e, t) {
  var n = ne;
  (ne = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Yl.transition;
  Yl.transition = {};
  try {
    e(!1), t();
  } finally {
    (ne = n), (Yl.transition = r);
  }
}
function Wf() {
  return ft().memoizedState;
}
function wp(e, t, n) {
  var r = cn(e);
  if (((n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }), Jf(e)))
    Xf(t, n);
  else if (((n = Df(e, t, n, r)), n !== null)) {
    var i = Ye();
    Et(n, e, r, i), qf(n, t, r);
  }
}
function Bp(e, t, n) {
  var r = cn(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Jf(e)) Xf(t, i);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && ((o = t.lastRenderedReducer), o !== null))
      try {
        var l = t.lastRenderedState,
          s = o(l, n);
        if (((i.hasEagerState = !0), (i.eagerState = s), wt(s, l))) {
          var a = t.interleaved;
          a === null ? ((i.next = i), Pa(t)) : ((i.next = a.next), (a.next = i)),
            (t.interleaved = i);
          return;
        }
      } catch {
      } finally {
      }
    (n = Df(e, t, i, r)), n !== null && ((i = Ye()), Et(n, e, r, i), qf(n, t, r));
  }
}
function Jf(e) {
  var t = e.alternate;
  return e === ge || (t !== null && t === ge);
}
function Xf(e, t) {
  ei = jo = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t);
}
function qf(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Ca(e, n);
  }
}
var zo = {
    readContext: dt,
    useCallback: Me,
    useContext: Me,
    useEffect: Me,
    useImperativeHandle: Me,
    useInsertionEffect: Me,
    useLayoutEffect: Me,
    useMemo: Me,
    useReducer: Me,
    useRef: Me,
    useState: Me,
    useDebugValue: Me,
    useDeferredValue: Me,
    useTransition: Me,
    useMutableSource: Me,
    useSyncExternalStore: Me,
    useId: Me,
    unstable_isNewReconciler: !1,
  },
  Sp = {
    readContext: dt,
    useCallback: function (e, t) {
      return (Qt().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: dt,
    useEffect: Ac,
    useImperativeHandle: function (e, t, n) {
      return (n = n != null ? n.concat([e]) : null), co(4194308, 4, bf.bind(null, t, e), n);
    },
    useLayoutEffect: function (e, t) {
      return co(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return co(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Qt();
      return (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e;
    },
    useReducer: function (e, t, n) {
      var r = Qt();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = wp.bind(null, ge, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Qt();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: fc,
    useDebugValue: Ya,
    useDeferredValue: function (e) {
      return (Qt().memoizedState = e);
    },
    useTransition: function () {
      var e = fc(!1),
        t = e[0];
      return (e = Ep.bind(null, e[1])), (Qt().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = ge,
        i = Qt();
      if (fe) {
        if (n === void 0) throw Error(x(407));
        n = n();
      } else {
        if (((n = t()), De === null)) throw Error(x(349));
        On & 30 || Pf(r, t, n);
      }
      i.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (i.queue = o),
        Ac(Mf.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        yi(9, Tf.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Qt(),
        t = De.identifierPrefix;
      if (fe) {
        var n = Ot,
          r = Mt;
        (n = (r & ~(1 << (32 - Ct(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = mi++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = Cp++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  kp = {
    readContext: dt,
    useCallback: Vf,
    useContext: dt,
    useEffect: ba,
    useImperativeHandle: Yf,
    useInsertionEffect: zf,
    useLayoutEffect: Hf,
    useMemo: Gf,
    useReducer: Vl,
    useRef: jf,
    useState: function () {
      return Vl(vi);
    },
    useDebugValue: Ya,
    useDeferredValue: function (e) {
      var t = ft();
      return Kf(t, Qe.memoizedState, e);
    },
    useTransition: function () {
      var e = Vl(vi)[0],
        t = ft().memoizedState;
      return [e, t];
    },
    useMutableSource: Nf,
    useSyncExternalStore: Uf,
    useId: Wf,
    unstable_isNewReconciler: !1,
  },
  Qp = {
    readContext: dt,
    useCallback: Vf,
    useContext: dt,
    useEffect: ba,
    useImperativeHandle: Yf,
    useInsertionEffect: zf,
    useLayoutEffect: Hf,
    useMemo: Gf,
    useReducer: Gl,
    useRef: jf,
    useState: function () {
      return Gl(vi);
    },
    useDebugValue: Ya,
    useDeferredValue: function (e) {
      var t = ft();
      return Qe === null ? (t.memoizedState = e) : Kf(t, Qe.memoizedState, e);
    },
    useTransition: function () {
      var e = Gl(vi)[0],
        t = ft().memoizedState;
      return [e, t];
    },
    useMutableSource: Nf,
    useSyncExternalStore: Uf,
    useId: Wf,
    unstable_isNewReconciler: !1,
  };
function gt(e, t) {
  if (e && e.defaultProps) {
    (t = pe({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Ts(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : pe({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var ol = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Hn(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ye(),
      i = cn(e),
      o = Ft(r, i);
    (o.payload = t),
      n != null && (o.callback = n),
      (t = an(e, o, i)),
      t !== null && (Et(t, e, i, r), ao(t, e, i));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ye(),
      i = cn(e),
      o = Ft(r, i);
    (o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = an(e, o, i)),
      t !== null && (Et(t, e, i, r), ao(t, e, i));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Ye(),
      r = cn(e),
      i = Ft(n, r);
    (i.tag = 2),
      t != null && (i.callback = t),
      (t = an(e, i, r)),
      t !== null && (Et(t, e, r, n), ao(t, e, r));
  },
};
function hc(e, t, n, r, i, o, l) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, l)
      : t.prototype && t.prototype.isPureReactComponent
      ? !di(n, r) || !di(i, o)
      : !0
  );
}
function _f(e, t, n) {
  var r = !1,
    i = gn,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = dt(o))
      : ((i = _e(t) ? Tn : je.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? gr(e, i) : gn)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = ol),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function gc(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && ol.enqueueReplaceState(t, t.state, null);
}
function Ms(e, t, n, r) {
  var i = e.stateNode;
  (i.props = n), (i.state = e.memoizedState), (i.refs = {}), Ta(e);
  var o = t.contextType;
  typeof o == "object" && o !== null
    ? (i.context = dt(o))
    : ((o = _e(t) ? Tn : je.current), (i.context = gr(e, o))),
    (i.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (Ts(e, t, o, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((t = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(),
      t !== i.state && ol.enqueueReplaceState(i, i.state, null),
      Oo(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function yr(e, t) {
  try {
    var n = "",
      r = t;
    do (n += eg(r)), (r = r.return);
    while (r);
    var i = n;
  } catch (o) {
    i =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function Kl(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Os(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Rp = typeof WeakMap == "function" ? WeakMap : Map;
function Zf(e, t, n) {
  (n = Ft(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      bo || ((bo = !0), (Ws = r)), Os(e, t);
    }),
    n
  );
}
function $f(e, t, n) {
  (n = Ft(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    (n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        Os(e, t);
      });
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        Os(e, t), typeof r != "function" && (un === null ? (un = new Set([this])) : un.add(this));
        var l = t.stack;
        this.componentDidCatch(t.value, { componentStack: l !== null ? l : "" });
      }),
    n
  );
}
function pc(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Rp();
    var i = new Set();
    r.set(t, i);
  } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
  i.has(n) || (i.add(n), (e = Hp.bind(null, e, t, n)), t.then(e, e));
}
function mc(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) && ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function vc(e, t, n, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null ? (n.tag = 17) : ((t = Ft(-1, 1)), (t.tag = 2), an(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Ip = Vt.ReactCurrentOwner,
  Xe = !1;
function be(e, t, n, r) {
  t.child = e === null ? If(t, null, n, r) : mr(t, e.child, n, r);
}
function yc(e, t, n, r, i) {
  n = n.render;
  var o = t.ref;
  return (
    dr(t, i),
    (r = za(e, t, n, r, o, i)),
    (n = Ha()),
    e !== null && !Xe
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~i), Yt(e, t, i))
      : (fe && n && Ia(t), (t.flags |= 1), be(e, t, r, i), t.child)
  );
}
function Cc(e, t, n, r, i) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" &&
      !_a(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), eA(e, t, o, r, i))
      : ((e = go(n.type, null, r, t, t.mode, i)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  if (((o = e.child), !(e.lanes & i))) {
    var l = o.memoizedProps;
    if (((n = n.compare), (n = n !== null ? n : di), n(l, r) && e.ref === t.ref))
      return Yt(e, t, i);
  }
  return (t.flags |= 1), (e = dn(o, r)), (e.ref = t.ref), (e.return = t), (t.child = e);
}
function eA(e, t, n, r, i) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (di(o, r) && e.ref === t.ref)
      if (((Xe = !1), (t.pendingProps = r = o), (e.lanes & i) !== 0)) e.flags & 131072 && (Xe = !0);
      else return (t.lanes = e.lanes), Yt(e, t, i);
  }
  return Fs(e, t, n, r, i);
}
function tA(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        le(lr, $e),
        ($e |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }),
          (t.updateQueue = null),
          le(lr, $e),
          ($e |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        le(lr, $e),
        ($e |= r);
    }
  else
    o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n), le(lr, $e), ($e |= r);
  return be(e, t, i, n), t.child;
}
function nA(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Fs(e, t, n, r, i) {
  var o = _e(n) ? Tn : je.current;
  return (
    (o = gr(t, o)),
    dr(t, i),
    (n = za(e, t, n, r, o, i)),
    (r = Ha()),
    e !== null && !Xe
      ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~i), Yt(e, t, i))
      : (fe && r && Ia(t), (t.flags |= 1), be(e, t, n, i), t.child)
  );
}
function Ec(e, t, n, r, i) {
  if (_e(n)) {
    var o = !0;
    No(t);
  } else o = !1;
  if ((dr(t, i), t.stateNode === null)) fo(e, t), _f(t, n, r), Ms(t, n, r, i), (r = !0);
  else if (e === null) {
    var l = t.stateNode,
      s = t.memoizedProps;
    l.props = s;
    var a = l.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = dt(u))
      : ((u = _e(n) ? Tn : je.current), (u = gr(t, u)));
    var d = n.getDerivedStateFromProps,
      f = typeof d == "function" || typeof l.getSnapshotBeforeUpdate == "function";
    f ||
      (typeof l.UNSAFE_componentWillReceiveProps != "function" &&
        typeof l.componentWillReceiveProps != "function") ||
      ((s !== r || a !== u) && gc(t, l, r, u)),
      (_t = !1);
    var A = t.memoizedState;
    (l.state = A),
      Oo(t, r, l, i),
      (a = t.memoizedState),
      s !== r || A !== a || qe.current || _t
        ? (typeof d == "function" && (Ts(t, n, d, r), (a = t.memoizedState)),
          (s = _t || hc(t, n, s, r, A, a, u))
            ? (f ||
                (typeof l.UNSAFE_componentWillMount != "function" &&
                  typeof l.componentWillMount != "function") ||
                (typeof l.componentWillMount == "function" && l.componentWillMount(),
                typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount()),
              typeof l.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof l.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (l.props = r),
          (l.state = a),
          (l.context = u),
          (r = s))
        : (typeof l.componentDidMount == "function" && (t.flags |= 4194308), (r = !1));
  } else {
    (l = t.stateNode),
      xf(e, t),
      (s = t.memoizedProps),
      (u = t.type === t.elementType ? s : gt(t.type, s)),
      (l.props = u),
      (f = t.pendingProps),
      (A = l.context),
      (a = n.contextType),
      typeof a == "object" && a !== null
        ? (a = dt(a))
        : ((a = _e(n) ? Tn : je.current), (a = gr(t, a)));
    var y = n.getDerivedStateFromProps;
    (d = typeof y == "function" || typeof l.getSnapshotBeforeUpdate == "function") ||
      (typeof l.UNSAFE_componentWillReceiveProps != "function" &&
        typeof l.componentWillReceiveProps != "function") ||
      ((s !== f || A !== a) && gc(t, l, r, a)),
      (_t = !1),
      (A = t.memoizedState),
      (l.state = A),
      Oo(t, r, l, i);
    var S = t.memoizedState;
    s !== f || A !== S || qe.current || _t
      ? (typeof y == "function" && (Ts(t, n, y, r), (S = t.memoizedState)),
        (u = _t || hc(t, n, u, r, A, S, a) || !1)
          ? (d ||
              (typeof l.UNSAFE_componentWillUpdate != "function" &&
                typeof l.componentWillUpdate != "function") ||
              (typeof l.componentWillUpdate == "function" && l.componentWillUpdate(r, S, a),
              typeof l.UNSAFE_componentWillUpdate == "function" &&
                l.UNSAFE_componentWillUpdate(r, S, a)),
            typeof l.componentDidUpdate == "function" && (t.flags |= 4),
            typeof l.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof l.componentDidUpdate != "function" ||
              (s === e.memoizedProps && A === e.memoizedState) ||
              (t.flags |= 4),
            typeof l.getSnapshotBeforeUpdate != "function" ||
              (s === e.memoizedProps && A === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = S)),
        (l.props = r),
        (l.state = S),
        (l.context = a),
        (r = u))
      : (typeof l.componentDidUpdate != "function" ||
          (s === e.memoizedProps && A === e.memoizedState) ||
          (t.flags |= 4),
        typeof l.getSnapshotBeforeUpdate != "function" ||
          (s === e.memoizedProps && A === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return js(e, t, n, r, o, i);
}
function js(e, t, n, r, i, o) {
  nA(e, t);
  var l = (t.flags & 128) !== 0;
  if (!r && !l) return i && lc(t, n, !1), Yt(e, t, o);
  (r = t.stateNode), (Ip.current = t);
  var s = l && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && l
      ? ((t.child = mr(t, e.child, null, o)), (t.child = mr(t, null, s, o)))
      : be(e, t, s, o),
    (t.memoizedState = r.state),
    i && lc(t, n, !0),
    t.child
  );
}
function rA(e) {
  var t = e.stateNode;
  t.pendingContext
    ? oc(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && oc(e, t.context, !1),
    Ma(e, t.containerInfo);
}
function wc(e, t, n, r, i) {
  return pr(), xa(i), (t.flags |= 256), be(e, t, n, r), t.child;
}
var zs = { dehydrated: null, treeContext: null, retryLane: 0 };
function Hs(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function iA(e, t, n) {
  var r = t.pendingProps,
    i = he.current,
    o = !1,
    l = (t.flags & 128) !== 0,
    s;
  if (
    ((s = l) || (s = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    s ? ((o = !0), (t.flags &= -129)) : (e === null || e.memoizedState !== null) && (i |= 1),
    le(he, i & 1),
    e === null)
  )
    return (
      Us(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1 ? (e.data === "$!" ? (t.lanes = 8) : (t.lanes = 1073741824)) : (t.lanes = 1),
          null)
        : ((l = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (l = { mode: "hidden", children: l }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = l))
                : (o = al(l, r, 0, null)),
              (e = Un(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = Hs(n)),
              (t.memoizedState = zs),
              e)
            : Va(t, l))
    );
  if (((i = e.memoizedState), i !== null && ((s = i.dehydrated), s !== null)))
    return Dp(e, t, l, r, s, i, n);
  if (o) {
    (o = r.fallback), (l = t.mode), (i = e.child), (s = i.sibling);
    var a = { mode: "hidden", children: r.children };
    return (
      !(l & 1) && t.child !== i
        ? ((r = t.child), (r.childLanes = 0), (r.pendingProps = a), (t.deletions = null))
        : ((r = dn(i, a)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      s !== null ? (o = dn(s, o)) : ((o = Un(o, l, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (l = e.child.memoizedState),
      (l =
        l === null
          ? Hs(n)
          : { baseLanes: l.baseLanes | n, cachePool: null, transitions: l.transitions }),
      (o.memoizedState = l),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = zs),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = dn(o, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions), n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Va(e, t) {
  return (t = al({ mode: "visible", children: t }, e.mode, 0, null)), (t.return = e), (e.child = t);
}
function Xi(e, t, n, r) {
  return (
    r !== null && xa(r),
    mr(t, e.child, null, n),
    (e = Va(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Dp(e, t, n, r, i, o, l) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Kl(Error(x(422)))), Xi(e, t, l, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((o = r.fallback),
        (i = t.mode),
        (r = al({ mode: "visible", children: r.children }, i, 0, null)),
        (o = Un(o, i, l, null)),
        (o.flags |= 2),
        (r.return = t),
        (o.return = t),
        (r.sibling = o),
        (t.child = r),
        t.mode & 1 && mr(t, e.child, null, l),
        (t.child.memoizedState = Hs(l)),
        (t.memoizedState = zs),
        o);
  if (!(t.mode & 1)) return Xi(e, t, l, null);
  if (i.data === "$!") {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var s = r.dgst;
    return (r = s), (o = Error(x(419))), (r = Kl(o, r, void 0)), Xi(e, t, l, r);
  }
  if (((s = (l & e.childLanes) !== 0), Xe || s)) {
    if (((r = De), r !== null)) {
      switch (l & -l) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      (i = i & (r.suspendedLanes | l) ? 0 : i),
        i !== 0 && i !== o.retryLane && ((o.retryLane = i), bt(e, i), Et(r, e, i, -1));
    }
    return qa(), (r = Kl(Error(x(421)))), Xi(e, t, l, r);
  }
  return i.data === "$?"
    ? ((t.flags |= 128), (t.child = e.child), (t = bp.bind(null, e)), (i._reactRetry = t), null)
    : ((e = o.treeContext),
      (tt = sn(i.nextSibling)),
      (nt = t),
      (fe = !0),
      (yt = null),
      e !== null &&
        ((lt[st++] = Mt),
        (lt[st++] = Ot),
        (lt[st++] = Mn),
        (Mt = e.id),
        (Ot = e.overflow),
        (Mn = t)),
      (t = Va(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Bc(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Ps(e.return, t, n);
}
function Wl(e, t, n, r, i) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = i));
}
function oA(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    o = r.tail;
  if ((be(e, t, r.children, n), (r = he.current), r & 2)) (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Bc(e, n, t);
        else if (e.tag === 19) Bc(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((le(he, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          (e = n.alternate), e !== null && Fo(e) === null && (i = n), (n = n.sibling);
        (n = i),
          n === null ? ((i = t.child), (t.child = null)) : ((i = n.sibling), (n.sibling = null)),
          Wl(t, !1, i, n, o);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && Fo(e) === null)) {
            t.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = n), (n = i), (i = e);
        }
        Wl(t, !0, n, null, o);
        break;
      case "together":
        Wl(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function fo(e, t) {
  !(t.mode & 1) && e !== null && ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Yt(e, t, n) {
  if ((e !== null && (t.dependencies = e.dependencies), (Fn |= t.lanes), !(n & t.childLanes)))
    return null;
  if (e !== null && t.child !== e.child) throw Error(x(153));
  if (t.child !== null) {
    for (e = t.child, n = dn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
      (e = e.sibling), (n = n.sibling = dn(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function xp(e, t, n) {
  switch (t.tag) {
    case 3:
      rA(t), pr();
      break;
    case 5:
      Lf(t);
      break;
    case 1:
      _e(t.type) && No(t);
      break;
    case 4:
      Ma(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      le(To, r._currentValue), (r._currentValue = i);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (le(he, he.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? iA(e, t, n)
          : (le(he, he.current & 1), (e = Yt(e, t, n)), e !== null ? e.sibling : null);
      le(he, he.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return oA(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null && ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        le(he, he.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), tA(e, t, n);
  }
  return Yt(e, t, n);
}
var lA, bs, sA, aA;
lA = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
bs = function () {};
sA = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    (e = t.stateNode), Dn(Dt.current);
    var o = null;
    switch (n) {
      case "input":
        (i = cs(e, i)), (r = cs(e, r)), (o = []);
        break;
      case "select":
        (i = pe({}, i, { value: void 0 })), (r = pe({}, r, { value: void 0 })), (o = []);
        break;
      case "textarea":
        (i = As(e, i)), (r = As(e, r)), (o = []);
        break;
      default:
        typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = xo);
    }
    gs(n, r);
    var l;
    n = null;
    for (u in i)
      if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
        if (u === "style") {
          var s = i[u];
          for (l in s) s.hasOwnProperty(l) && (n || (n = {}), (n[l] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (ii.hasOwnProperty(u) ? o || (o = []) : (o = o || []).push(u, null));
    for (u in r) {
      var a = r[u];
      if (
        ((s = i != null ? i[u] : void 0),
        r.hasOwnProperty(u) && a !== s && (a != null || s != null))
      )
        if (u === "style")
          if (s) {
            for (l in s)
              !s.hasOwnProperty(l) || (a && a.hasOwnProperty(l)) || (n || (n = {}), (n[l] = ""));
            for (l in a) a.hasOwnProperty(l) && s[l] !== a[l] && (n || (n = {}), (n[l] = a[l]));
          } else n || (o || (o = []), o.push(u, n)), (n = a);
        else
          u === "dangerouslySetInnerHTML"
            ? ((a = a ? a.__html : void 0),
              (s = s ? s.__html : void 0),
              a != null && s !== a && (o = o || []).push(u, a))
            : u === "children"
            ? (typeof a != "string" && typeof a != "number") || (o = o || []).push(u, "" + a)
            : u !== "suppressContentEditableWarning" &&
              u !== "suppressHydrationWarning" &&
              (ii.hasOwnProperty(u)
                ? (a != null && u === "onScroll" && ae("scroll", e), o || s === a || (o = []))
                : (o = o || []).push(u, a));
    }
    n && (o = o || []).push("style", n);
    var u = o;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
aA = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Mr(e, t) {
  if (!fe)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; ) t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; ) n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function Oe(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling);
  else
    for (i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Lp(e, t, n) {
  var r = t.pendingProps;
  switch ((Da(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Oe(t), null;
    case 1:
      return _e(t.type) && Lo(), Oe(t), null;
    case 3:
      return (
        (r = t.stateNode),
        vr(),
        ue(qe),
        ue(je),
        Fa(),
        r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Wi(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), yt !== null && (qs(yt), (yt = null)))),
        bs(e, t),
        Oe(t),
        null
      );
    case 5:
      Oa(t);
      var i = Dn(pi.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        sA(e, t, n, r, i), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(x(166));
          return Oe(t), null;
        }
        if (((e = Dn(Dt.current)), Wi(t))) {
          (r = t.stateNode), (n = t.type);
          var o = t.memoizedProps;
          switch (((r[Rt] = t), (r[hi] = o), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              ae("cancel", r), ae("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              ae("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < Gr.length; i++) ae(Gr[i], r);
              break;
            case "source":
              ae("error", r);
              break;
            case "img":
            case "image":
            case "link":
              ae("error", r), ae("load", r);
              break;
            case "details":
              ae("toggle", r);
              break;
            case "input":
              Nu(r, o), ae("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!o.multiple }), ae("invalid", r);
              break;
            case "textarea":
              Pu(r, o), ae("invalid", r);
          }
          gs(n, o), (i = null);
          for (var l in o)
            if (o.hasOwnProperty(l)) {
              var s = o[l];
              l === "children"
                ? typeof s == "string"
                  ? r.textContent !== s &&
                    (o.suppressHydrationWarning !== !0 && Ki(r.textContent, s, e),
                    (i = ["children", s]))
                  : typeof s == "number" &&
                    r.textContent !== "" + s &&
                    (o.suppressHydrationWarning !== !0 && Ki(r.textContent, s, e),
                    (i = ["children", "" + s]))
                : ii.hasOwnProperty(l) && s != null && l === "onScroll" && ae("scroll", r);
            }
          switch (n) {
            case "input":
              Fi(r), Uu(r, o, !0);
              break;
            case "textarea":
              Fi(r), Tu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = xo);
          }
          (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (l = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Td(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = l.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = l.createElement(n, { is: r.is }))
                : ((e = l.createElement(n)),
                  n === "select" &&
                    ((l = e), r.multiple ? (l.multiple = !0) : r.size && (l.size = r.size)))
              : (e = l.createElementNS(e, n)),
            (e[Rt] = t),
            (e[hi] = r),
            lA(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((l = ps(n, r)), n)) {
              case "dialog":
                ae("cancel", e), ae("close", e), (i = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                ae("load", e), (i = r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < Gr.length; i++) ae(Gr[i], e);
                i = r;
                break;
              case "source":
                ae("error", e), (i = r);
                break;
              case "img":
              case "image":
              case "link":
                ae("error", e), ae("load", e), (i = r);
                break;
              case "details":
                ae("toggle", e), (i = r);
                break;
              case "input":
                Nu(e, r), (i = cs(e, r)), ae("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = pe({}, r, { value: void 0 })),
                  ae("invalid", e);
                break;
              case "textarea":
                Pu(e, r), (i = As(e, r)), ae("invalid", e);
                break;
              default:
                i = r;
            }
            gs(n, i), (s = i);
            for (o in s)
              if (s.hasOwnProperty(o)) {
                var a = s[o];
                o === "style"
                  ? Fd(e, a)
                  : o === "dangerouslySetInnerHTML"
                  ? ((a = a ? a.__html : void 0), a != null && Md(e, a))
                  : o === "children"
                  ? typeof a == "string"
                    ? (n !== "textarea" || a !== "") && oi(e, a)
                    : typeof a == "number" && oi(e, "" + a)
                  : o !== "suppressContentEditableWarning" &&
                    o !== "suppressHydrationWarning" &&
                    o !== "autoFocus" &&
                    (ii.hasOwnProperty(o)
                      ? a != null && o === "onScroll" && ae("scroll", e)
                      : a != null && ha(e, o, a, l));
              }
            switch (n) {
              case "input":
                Fi(e), Uu(e, r, !1);
                break;
              case "textarea":
                Fi(e), Tu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + hn(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? sr(e, !!r.multiple, o, !1)
                    : r.defaultValue != null && sr(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = xo);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return Oe(t), null;
    case 6:
      if (e && t.stateNode != null) aA(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(x(166));
        if (((n = Dn(pi.current)), Dn(Dt.current), Wi(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Rt] = t),
            (o = r.nodeValue !== n) && ((e = nt), e !== null))
          )
            switch (e.tag) {
              case 3:
                Ki(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Ki(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Rt] = t),
            (t.stateNode = r);
      }
      return Oe(t), null;
    case 13:
      if (
        (ue(he),
        (r = t.memoizedState),
        e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (fe && tt !== null && t.mode & 1 && !(t.flags & 128))
          Qf(), pr(), (t.flags |= 98560), (o = !1);
        else if (((o = Wi(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(x(318));
            if (((o = t.memoizedState), (o = o !== null ? o.dehydrated : null), !o))
              throw Error(x(317));
            o[Rt] = t;
          } else pr(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          Oe(t), (o = !1);
        } else yt !== null && (qs(yt), (yt = null)), (o = !0);
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 && (e === null || he.current & 1 ? Re === 0 && (Re = 3) : qa())),
          t.updateQueue !== null && (t.flags |= 4),
          Oe(t),
          null);
    case 4:
      return vr(), bs(e, t), e === null && fi(t.stateNode.containerInfo), Oe(t), null;
    case 10:
      return Ua(t.type._context), Oe(t), null;
    case 17:
      return _e(t.type) && Lo(), Oe(t), null;
    case 19:
      if ((ue(he), (o = t.memoizedState), o === null)) return Oe(t), null;
      if (((r = (t.flags & 128) !== 0), (l = o.rendering), l === null))
        if (r) Mr(o, !1);
        else {
          if (Re !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((l = Fo(e)), l !== null)) {
                for (
                  t.flags |= 128,
                    Mr(o, !1),
                    r = l.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (l = o.alternate),
                    l === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = l.childLanes),
                        (o.lanes = l.lanes),
                        (o.child = l.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = l.memoizedProps),
                        (o.memoizedState = l.memoizedState),
                        (o.updateQueue = l.updateQueue),
                        (o.type = l.type),
                        (e = l.dependencies),
                        (o.dependencies =
                          e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
                    (n = n.sibling);
                return le(he, (he.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null &&
            Ee() > Cr &&
            ((t.flags |= 128), (r = !0), Mr(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Fo(l)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Mr(o, !0),
              o.tail === null && o.tailMode === "hidden" && !l.alternate && !fe)
            )
              return Oe(t), null;
          } else
            2 * Ee() - o.renderingStartTime > Cr &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Mr(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((l.sibling = t.child), (t.child = l))
          : ((n = o.last), n !== null ? (n.sibling = l) : (t.child = l), (o.last = l));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = Ee()),
          (t.sibling = null),
          (n = he.current),
          le(he, r ? (n & 1) | 2 : n & 1),
          t)
        : (Oe(t), null);
    case 22:
    case 23:
      return (
        Xa(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? $e & 1073741824 && (Oe(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : Oe(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(x(156, t.tag));
}
function Np(e, t) {
  switch ((Da(t), t.tag)) {
    case 1:
      return (
        _e(t.type) && Lo(), (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        vr(),
        ue(qe),
        ue(je),
        Fa(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Oa(t), null;
    case 13:
      if ((ue(he), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(x(340));
        pr();
      }
      return (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null;
    case 19:
      return ue(he), null;
    case 4:
      return vr(), null;
    case 10:
      return Ua(t.type._context), null;
    case 22:
    case 23:
      return Xa(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var qi = !1,
  Fe = !1,
  Up = typeof WeakSet == "function" ? WeakSet : Set,
  U = null;
function or(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        ye(e, t, r);
      }
    else n.current = null;
}
function Ys(e, t, n) {
  try {
    n();
  } catch (r) {
    ye(e, t, r);
  }
}
var Sc = !1;
function Pp(e, t) {
  if (((Qs = Ro), (e = Af()), Ra(e))) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var l = 0,
            s = -1,
            a = -1,
            u = 0,
            d = 0,
            f = e,
            A = null;
          t: for (;;) {
            for (
              var y;
              f !== n || (i !== 0 && f.nodeType !== 3) || (s = l + i),
                f !== o || (r !== 0 && f.nodeType !== 3) || (a = l + r),
                f.nodeType === 3 && (l += f.nodeValue.length),
                (y = f.firstChild) !== null;

            )
              (A = f), (f = y);
            for (;;) {
              if (f === e) break t;
              if (
                (A === n && ++u === i && (s = l),
                A === o && ++d === r && (a = l),
                (y = f.nextSibling) !== null)
              )
                break;
              (f = A), (A = f.parentNode);
            }
            f = y;
          }
          n = s === -1 || a === -1 ? null : { start: s, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Rs = { focusedElem: e, selectionRange: n }, Ro = !1, U = t; U !== null; )
    if (((t = U), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (U = e);
    else
      for (; U !== null; ) {
        t = U;
        try {
          var S = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (S !== null) {
                  var B = S.memoizedProps,
                    D = S.memoizedState,
                    g = t.stateNode,
                    c = g.getSnapshotBeforeUpdate(t.elementType === t.type ? B : gt(t.type, B), D);
                  g.__reactInternalSnapshotBeforeUpdate = c;
                }
                break;
              case 3:
                var p = t.stateNode.containerInfo;
                p.nodeType === 1
                  ? (p.textContent = "")
                  : p.nodeType === 9 && p.documentElement && p.removeChild(p.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(x(163));
            }
        } catch (k) {
          ye(t, t.return, k);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (U = e);
          break;
        }
        U = t.return;
      }
  return (S = Sc), (Sc = !1), S;
}
function ti(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var o = i.destroy;
        (i.destroy = void 0), o !== void 0 && Ys(t, n, o);
      }
      i = i.next;
    } while (i !== r);
  }
}
function ll(e, t) {
  if (((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Vs(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function uA(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), uA(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null && (delete t[Rt], delete t[hi], delete t[xs], delete t[pp], delete t[mp])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function cA(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function kc(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || cA(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Gs(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = xo));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Gs(e, t, n), e = e.sibling; e !== null; ) Gs(e, t, n), (e = e.sibling);
}
function Ks(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Ks(e, t, n), e = e.sibling; e !== null; ) Ks(e, t, n), (e = e.sibling);
}
var Ne = null,
  pt = !1;
function Jt(e, t, n) {
  for (n = n.child; n !== null; ) dA(e, t, n), (n = n.sibling);
}
function dA(e, t, n) {
  if (It && typeof It.onCommitFiberUnmount == "function")
    try {
      It.onCommitFiberUnmount(Zo, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Fe || or(n, t);
    case 6:
      var r = Ne,
        i = pt;
      (Ne = null),
        Jt(e, t, n),
        (Ne = r),
        (pt = i),
        Ne !== null &&
          (pt
            ? ((e = Ne),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : Ne.removeChild(n.stateNode));
      break;
    case 18:
      Ne !== null &&
        (pt
          ? ((e = Ne),
            (n = n.stateNode),
            e.nodeType === 8 ? zl(e.parentNode, n) : e.nodeType === 1 && zl(e, n),
            ui(e))
          : zl(Ne, n.stateNode));
      break;
    case 4:
      (r = Ne),
        (i = pt),
        (Ne = n.stateNode.containerInfo),
        (pt = !0),
        Jt(e, t, n),
        (Ne = r),
        (pt = i);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Fe && ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))) {
        i = r = r.next;
        do {
          var o = i,
            l = o.destroy;
          (o = o.tag), l !== void 0 && (o & 2 || o & 4) && Ys(n, t, l), (i = i.next);
        } while (i !== r);
      }
      Jt(e, t, n);
      break;
    case 1:
      if (!Fe && (or(n, t), (r = n.stateNode), typeof r.componentWillUnmount == "function"))
        try {
          (r.props = n.memoizedProps), (r.state = n.memoizedState), r.componentWillUnmount();
        } catch (s) {
          ye(n, t, s);
        }
      Jt(e, t, n);
      break;
    case 21:
      Jt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((Fe = (r = Fe) || n.memoizedState !== null), Jt(e, t, n), (Fe = r))
        : Jt(e, t, n);
      break;
    default:
      Jt(e, t, n);
  }
}
function Qc(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Up()),
      t.forEach(function (r) {
        var i = Yp.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
  }
}
function ht(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var o = e,
          l = t,
          s = l;
        e: for (; s !== null; ) {
          switch (s.tag) {
            case 5:
              (Ne = s.stateNode), (pt = !1);
              break e;
            case 3:
              (Ne = s.stateNode.containerInfo), (pt = !0);
              break e;
            case 4:
              (Ne = s.stateNode.containerInfo), (pt = !0);
              break e;
          }
          s = s.return;
        }
        if (Ne === null) throw Error(x(160));
        dA(o, l, i), (Ne = null), (pt = !1);
        var a = i.alternate;
        a !== null && (a.return = null), (i.return = null);
      } catch (u) {
        ye(i, t, u);
      }
    }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) fA(t, e), (t = t.sibling);
}
function fA(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((ht(t, e), kt(e), r & 4)) {
        try {
          ti(3, e, e.return), ll(3, e);
        } catch (B) {
          ye(e, e.return, B);
        }
        try {
          ti(5, e, e.return);
        } catch (B) {
          ye(e, e.return, B);
        }
      }
      break;
    case 1:
      ht(t, e), kt(e), r & 512 && n !== null && or(n, n.return);
      break;
    case 5:
      if ((ht(t, e), kt(e), r & 512 && n !== null && or(n, n.return), e.flags & 32)) {
        var i = e.stateNode;
        try {
          oi(i, "");
        } catch (B) {
          ye(e, e.return, B);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var o = e.memoizedProps,
          l = n !== null ? n.memoizedProps : o,
          s = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            s === "input" && o.type === "radio" && o.name != null && Ud(i, o), ps(s, l);
            var u = ps(s, o);
            for (l = 0; l < a.length; l += 2) {
              var d = a[l],
                f = a[l + 1];
              d === "style"
                ? Fd(i, f)
                : d === "dangerouslySetInnerHTML"
                ? Md(i, f)
                : d === "children"
                ? oi(i, f)
                : ha(i, d, f, u);
            }
            switch (s) {
              case "input":
                ds(i, o);
                break;
              case "textarea":
                Pd(i, o);
                break;
              case "select":
                var A = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var y = o.value;
                y != null
                  ? sr(i, !!o.multiple, y, !1)
                  : A !== !!o.multiple &&
                    (o.defaultValue != null
                      ? sr(i, !!o.multiple, o.defaultValue, !0)
                      : sr(i, !!o.multiple, o.multiple ? [] : "", !1));
            }
            i[hi] = o;
          } catch (B) {
            ye(e, e.return, B);
          }
      }
      break;
    case 6:
      if ((ht(t, e), kt(e), r & 4)) {
        if (e.stateNode === null) throw Error(x(162));
        (i = e.stateNode), (o = e.memoizedProps);
        try {
          i.nodeValue = o;
        } catch (B) {
          ye(e, e.return, B);
        }
      }
      break;
    case 3:
      if ((ht(t, e), kt(e), r & 4 && n !== null && n.memoizedState.isDehydrated))
        try {
          ui(t.containerInfo);
        } catch (B) {
          ye(e, e.return, B);
        }
      break;
    case 4:
      ht(t, e), kt(e);
      break;
    case 13:
      ht(t, e),
        kt(e),
        (i = e.child),
        i.flags & 8192 &&
          ((o = i.memoizedState !== null),
          (i.stateNode.isHidden = o),
          !o || (i.alternate !== null && i.alternate.memoizedState !== null) || (Wa = Ee())),
        r & 4 && Qc(e);
      break;
    case 22:
      if (
        ((d = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((Fe = (u = Fe) || d), ht(t, e), (Fe = u)) : ht(t, e),
        kt(e),
        r & 8192)
      ) {
        if (((u = e.memoizedState !== null), (e.stateNode.isHidden = u) && !d && e.mode & 1))
          for (U = e, d = e.child; d !== null; ) {
            for (f = U = d; U !== null; ) {
              switch (((A = U), (y = A.child), A.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ti(4, A, A.return);
                  break;
                case 1:
                  or(A, A.return);
                  var S = A.stateNode;
                  if (typeof S.componentWillUnmount == "function") {
                    (r = A), (n = A.return);
                    try {
                      (t = r),
                        (S.props = t.memoizedProps),
                        (S.state = t.memoizedState),
                        S.componentWillUnmount();
                    } catch (B) {
                      ye(r, n, B);
                    }
                  }
                  break;
                case 5:
                  or(A, A.return);
                  break;
                case 22:
                  if (A.memoizedState !== null) {
                    Ic(f);
                    continue;
                  }
              }
              y !== null ? ((y.return = A), (U = y)) : Ic(f);
            }
            d = d.sibling;
          }
        e: for (d = null, f = e; ; ) {
          if (f.tag === 5) {
            if (d === null) {
              d = f;
              try {
                (i = f.stateNode),
                  u
                    ? ((o = i.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((s = f.stateNode),
                      (a = f.memoizedProps.style),
                      (l = a != null && a.hasOwnProperty("display") ? a.display : null),
                      (s.style.display = Od("display", l)));
              } catch (B) {
                ye(e, e.return, B);
              }
            }
          } else if (f.tag === 6) {
            if (d === null)
              try {
                f.stateNode.nodeValue = u ? "" : f.memoizedProps;
              } catch (B) {
                ye(e, e.return, B);
              }
          } else if (
            ((f.tag !== 22 && f.tag !== 23) || f.memoizedState === null || f === e) &&
            f.child !== null
          ) {
            (f.child.return = f), (f = f.child);
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            d === f && (d = null), (f = f.return);
          }
          d === f && (d = null), (f.sibling.return = f.return), (f = f.sibling);
        }
      }
      break;
    case 19:
      ht(t, e), kt(e), r & 4 && Qc(e);
      break;
    case 21:
      break;
    default:
      ht(t, e), kt(e);
  }
}
function kt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (cA(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(x(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (oi(i, ""), (r.flags &= -33));
          var o = kc(e);
          Ks(e, o, i);
          break;
        case 3:
        case 4:
          var l = r.stateNode.containerInfo,
            s = kc(e);
          Gs(e, s, l);
          break;
        default:
          throw Error(x(161));
      }
    } catch (a) {
      ye(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Tp(e, t, n) {
  (U = e), AA(e);
}
function AA(e, t, n) {
  for (var r = (e.mode & 1) !== 0; U !== null; ) {
    var i = U,
      o = i.child;
    if (i.tag === 22 && r) {
      var l = i.memoizedState !== null || qi;
      if (!l) {
        var s = i.alternate,
          a = (s !== null && s.memoizedState !== null) || Fe;
        s = qi;
        var u = Fe;
        if (((qi = l), (Fe = a) && !u))
          for (U = i; U !== null; )
            (l = U),
              (a = l.child),
              l.tag === 22 && l.memoizedState !== null
                ? Dc(i)
                : a !== null
                ? ((a.return = l), (U = a))
                : Dc(i);
        for (; o !== null; ) (U = o), AA(o), (o = o.sibling);
        (U = i), (qi = s), (Fe = u);
      }
      Rc(e);
    } else i.subtreeFlags & 8772 && o !== null ? ((o.return = i), (U = o)) : Rc(e);
  }
}
function Rc(e) {
  for (; U !== null; ) {
    var t = U;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Fe || ll(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Fe)
                if (n === null) r.componentDidMount();
                else {
                  var i = t.elementType === t.type ? n.memoizedProps : gt(t.type, n.memoizedProps);
                  r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                }
              var o = t.updateQueue;
              o !== null && dc(t, o, r);
              break;
            case 3:
              var l = t.updateQueue;
              if (l !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                dc(t, l, n);
              }
              break;
            case 5:
              var s = t.stateNode;
              if (n === null && t.flags & 4) {
                n = s;
                var a = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var d = u.memoizedState;
                  if (d !== null) {
                    var f = d.dehydrated;
                    f !== null && ui(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(x(163));
          }
        Fe || (t.flags & 512 && Vs(t));
      } catch (A) {
        ye(t, t.return, A);
      }
    }
    if (t === e) {
      U = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (U = n);
      break;
    }
    U = t.return;
  }
}
function Ic(e) {
  for (; U !== null; ) {
    var t = U;
    if (t === e) {
      U = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (U = n);
      break;
    }
    U = t.return;
  }
}
function Dc(e) {
  for (; U !== null; ) {
    var t = U;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            ll(4, t);
          } catch (a) {
            ye(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              ye(t, i, a);
            }
          }
          var o = t.return;
          try {
            Vs(t);
          } catch (a) {
            ye(t, o, a);
          }
          break;
        case 5:
          var l = t.return;
          try {
            Vs(t);
          } catch (a) {
            ye(t, l, a);
          }
      }
    } catch (a) {
      ye(t, t.return, a);
    }
    if (t === e) {
      U = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      (s.return = t.return), (U = s);
      break;
    }
    U = t.return;
  }
}
var Mp = Math.ceil,
  Ho = Vt.ReactCurrentDispatcher,
  Ga = Vt.ReactCurrentOwner,
  ct = Vt.ReactCurrentBatchConfig,
  q = 0,
  De = null,
  Se = null,
  Ue = 0,
  $e = 0,
  lr = mn(0),
  Re = 0,
  Ci = null,
  Fn = 0,
  sl = 0,
  Ka = 0,
  ni = null,
  Je = null,
  Wa = 0,
  Cr = 1 / 0,
  Pt = null,
  bo = !1,
  Ws = null,
  un = null,
  _i = !1,
  tn = null,
  Yo = 0,
  ri = 0,
  Js = null,
  Ao = -1,
  ho = 0;
function Ye() {
  return q & 6 ? Ee() : Ao !== -1 ? Ao : (Ao = Ee());
}
function cn(e) {
  return e.mode & 1
    ? q & 2 && Ue !== 0
      ? Ue & -Ue
      : yp.transition !== null
      ? (ho === 0 && (ho = qd()), ho)
      : ((e = ne), e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : rf(e.type))), e)
    : 1;
}
function Et(e, t, n, r) {
  if (50 < ri) throw ((ri = 0), (Js = null), Error(x(185)));
  Si(e, n, r),
    (!(q & 2) || e !== De) &&
      (e === De && (!(q & 2) && (sl |= n), Re === 4 && $t(e, Ue)),
      Ze(e, r),
      n === 1 && q === 0 && !(t.mode & 1) && ((Cr = Ee() + 500), rl && vn()));
}
function Ze(e, t) {
  var n = e.callbackNode;
  yg(e, t);
  var r = Qo(e, e === De ? Ue : 0);
  if (r === 0) n !== null && Fu(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Fu(n), t === 1))
      e.tag === 0 ? vp(xc.bind(null, e)) : Bf(xc.bind(null, e)),
        hp(function () {
          !(q & 6) && vn();
        }),
        (n = null);
    else {
      switch (_d(r)) {
        case 1:
          n = ya;
          break;
        case 4:
          n = Jd;
          break;
        case 16:
          n = ko;
          break;
        case 536870912:
          n = Xd;
          break;
        default:
          n = ko;
      }
      n = EA(n, hA.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function hA(e, t) {
  if (((Ao = -1), (ho = 0), q & 6)) throw Error(x(327));
  var n = e.callbackNode;
  if (fr() && e.callbackNode !== n) return null;
  var r = Qo(e, e === De ? Ue : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Vo(e, r);
  else {
    t = r;
    var i = q;
    q |= 2;
    var o = pA();
    (De !== e || Ue !== t) && ((Pt = null), (Cr = Ee() + 500), Nn(e, t));
    do
      try {
        jp();
        break;
      } catch (s) {
        gA(e, s);
      }
    while (1);
    Na(), (Ho.current = o), (q = i), Se !== null ? (t = 0) : ((De = null), (Ue = 0), (t = Re));
  }
  if (t !== 0) {
    if ((t === 2 && ((i = Es(e)), i !== 0 && ((r = i), (t = Xs(e, i)))), t === 1))
      throw ((n = Ci), Nn(e, 0), $t(e, r), Ze(e, Ee()), n);
    if (t === 6) $t(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !Op(i) &&
          ((t = Vo(e, r)), t === 2 && ((o = Es(e)), o !== 0 && ((r = o), (t = Xs(e, o)))), t === 1))
      )
        throw ((n = Ci), Nn(e, 0), $t(e, r), Ze(e, Ee()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(x(345));
        case 2:
          Sn(e, Je, Pt);
          break;
        case 3:
          if (($t(e, r), (r & 130023424) === r && ((t = Wa + 500 - Ee()), 10 < t))) {
            if (Qo(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              Ye(), (e.pingedLanes |= e.suspendedLanes & i);
              break;
            }
            e.timeoutHandle = Ds(Sn.bind(null, e, Je, Pt), t);
            break;
          }
          Sn(e, Je, Pt);
          break;
        case 4:
          if (($t(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var l = 31 - Ct(r);
            (o = 1 << l), (l = t[l]), l > i && (i = l), (r &= ~o);
          }
          if (
            ((r = i),
            (r = Ee() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * Mp(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Ds(Sn.bind(null, e, Je, Pt), r);
            break;
          }
          Sn(e, Je, Pt);
          break;
        case 5:
          Sn(e, Je, Pt);
          break;
        default:
          throw Error(x(329));
      }
    }
  }
  return Ze(e, Ee()), e.callbackNode === n ? hA.bind(null, e) : null;
}
function Xs(e, t) {
  var n = ni;
  return (
    e.current.memoizedState.isDehydrated && (Nn(e, t).flags |= 256),
    (e = Vo(e, t)),
    e !== 2 && ((t = Je), (Je = n), t !== null && qs(t)),
    e
  );
}
function qs(e) {
  Je === null ? (Je = e) : Je.push.apply(Je, e);
}
function Op(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            o = i.getSnapshot;
          i = i.value;
          try {
            if (!wt(o(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null)) (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function $t(e, t) {
  for (
    t &= ~Ka, t &= ~sl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Ct(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function xc(e) {
  if (q & 6) throw Error(x(327));
  fr();
  var t = Qo(e, 0);
  if (!(t & 1)) return Ze(e, Ee()), null;
  var n = Vo(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Es(e);
    r !== 0 && ((t = r), (n = Xs(e, r)));
  }
  if (n === 1) throw ((n = Ci), Nn(e, 0), $t(e, t), Ze(e, Ee()), n);
  if (n === 6) throw Error(x(345));
  return (
    (e.finishedWork = e.current.alternate), (e.finishedLanes = t), Sn(e, Je, Pt), Ze(e, Ee()), null
  );
}
function Ja(e, t) {
  var n = q;
  q |= 1;
  try {
    return e(t);
  } finally {
    (q = n), q === 0 && ((Cr = Ee() + 500), rl && vn());
  }
}
function jn(e) {
  tn !== null && tn.tag === 0 && !(q & 6) && fr();
  var t = q;
  q |= 1;
  var n = ct.transition,
    r = ne;
  try {
    if (((ct.transition = null), (ne = 1), e)) return e();
  } finally {
    (ne = r), (ct.transition = n), (q = t), !(q & 6) && vn();
  }
}
function Xa() {
  ($e = lr.current), ue(lr);
}
function Nn(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), Ap(n)), Se !== null))
    for (n = Se.return; n !== null; ) {
      var r = n;
      switch ((Da(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Lo();
          break;
        case 3:
          vr(), ue(qe), ue(je), Fa();
          break;
        case 5:
          Oa(r);
          break;
        case 4:
          vr();
          break;
        case 13:
          ue(he);
          break;
        case 19:
          ue(he);
          break;
        case 10:
          Ua(r.type._context);
          break;
        case 22:
        case 23:
          Xa();
      }
      n = n.return;
    }
  if (
    ((De = e),
    (Se = e = dn(e.current, null)),
    (Ue = $e = t),
    (Re = 0),
    (Ci = null),
    (Ka = sl = Fn = 0),
    (Je = ni = null),
    In !== null)
  ) {
    for (t = 0; t < In.length; t++)
      if (((n = In[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          o = n.pending;
        if (o !== null) {
          var l = o.next;
          (o.next = i), (r.next = l);
        }
        n.pending = r;
      }
    In = null;
  }
  return e;
}
function gA(e, t) {
  do {
    var n = Se;
    try {
      if ((Na(), (uo.current = zo), jo)) {
        for (var r = ge.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), (r = r.next);
        }
        jo = !1;
      }
      if (
        ((On = 0),
        (Ie = Qe = ge = null),
        (ei = !1),
        (mi = 0),
        (Ga.current = null),
        n === null || n.return === null)
      ) {
        (Re = 1), (Ci = t), (Se = null);
        break;
      }
      e: {
        var o = e,
          l = n.return,
          s = n,
          a = t;
        if (
          ((t = Ue),
          (s.flags |= 32768),
          a !== null && typeof a == "object" && typeof a.then == "function")
        ) {
          var u = a,
            d = s,
            f = d.tag;
          if (!(d.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var A = d.alternate;
            A
              ? ((d.updateQueue = A.updateQueue),
                (d.memoizedState = A.memoizedState),
                (d.lanes = A.lanes))
              : ((d.updateQueue = null), (d.memoizedState = null));
          }
          var y = mc(l);
          if (y !== null) {
            (y.flags &= -257), vc(y, l, s, o, t), y.mode & 1 && pc(o, u, t), (t = y), (a = u);
            var S = t.updateQueue;
            if (S === null) {
              var B = new Set();
              B.add(a), (t.updateQueue = B);
            } else S.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              pc(o, u, t), qa();
              break e;
            }
            a = Error(x(426));
          }
        } else if (fe && s.mode & 1) {
          var D = mc(l);
          if (D !== null) {
            !(D.flags & 65536) && (D.flags |= 256), vc(D, l, s, o, t), xa(yr(a, s));
            break e;
          }
        }
        (o = a = yr(a, s)), Re !== 4 && (Re = 2), ni === null ? (ni = [o]) : ni.push(o), (o = l);
        do {
          switch (o.tag) {
            case 3:
              (o.flags |= 65536), (t &= -t), (o.lanes |= t);
              var g = Zf(o, a, t);
              cc(o, g);
              break e;
            case 1:
              s = a;
              var c = o.type,
                p = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof c.getDerivedStateFromError == "function" ||
                  (p !== null &&
                    typeof p.componentDidCatch == "function" &&
                    (un === null || !un.has(p))))
              ) {
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var k = $f(o, s, t);
                cc(o, k);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      vA(n);
    } catch (Q) {
      (t = Q), Se === n && n !== null && (Se = n = n.return);
      continue;
    }
    break;
  } while (1);
}
function pA() {
  var e = Ho.current;
  return (Ho.current = zo), e === null ? zo : e;
}
function qa() {
  (Re === 0 || Re === 3 || Re === 2) && (Re = 4),
    De === null || (!(Fn & 268435455) && !(sl & 268435455)) || $t(De, Ue);
}
function Vo(e, t) {
  var n = q;
  q |= 2;
  var r = pA();
  (De !== e || Ue !== t) && ((Pt = null), Nn(e, t));
  do
    try {
      Fp();
      break;
    } catch (i) {
      gA(e, i);
    }
  while (1);
  if ((Na(), (q = n), (Ho.current = r), Se !== null)) throw Error(x(261));
  return (De = null), (Ue = 0), Re;
}
function Fp() {
  for (; Se !== null; ) mA(Se);
}
function jp() {
  for (; Se !== null && !cg(); ) mA(Se);
}
function mA(e) {
  var t = CA(e.alternate, e, $e);
  (e.memoizedProps = e.pendingProps), t === null ? vA(e) : (Se = t), (Ga.current = null);
}
function vA(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Np(n, t)), n !== null)) {
        (n.flags &= 32767), (Se = n);
        return;
      }
      if (e !== null) (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (Re = 6), (Se = null);
        return;
      }
    } else if (((n = Lp(n, t, $e)), n !== null)) {
      Se = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      Se = t;
      return;
    }
    Se = t = e;
  } while (t !== null);
  Re === 0 && (Re = 5);
}
function Sn(e, t, n) {
  var r = ne,
    i = ct.transition;
  try {
    (ct.transition = null), (ne = 1), zp(e, t, n, r);
  } finally {
    (ct.transition = i), (ne = r);
  }
  return null;
}
function zp(e, t, n, r) {
  do fr();
  while (tn !== null);
  if (q & 6) throw Error(x(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(x(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var o = n.lanes | n.childLanes;
  if (
    (Cg(e, o),
    e === De && ((Se = De = null), (Ue = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      _i ||
      ((_i = !0),
      EA(ko, function () {
        return fr(), null;
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    (o = ct.transition), (ct.transition = null);
    var l = ne;
    ne = 1;
    var s = q;
    (q |= 4),
      (Ga.current = null),
      Pp(e, n),
      fA(n, e),
      lp(Rs),
      (Ro = !!Qs),
      (Rs = Qs = null),
      (e.current = n),
      Tp(n),
      dg(),
      (q = s),
      (ne = l),
      (ct.transition = o);
  } else e.current = n;
  if (
    (_i && ((_i = !1), (tn = e), (Yo = i)),
    (o = e.pendingLanes),
    o === 0 && (un = null),
    hg(n.stateNode),
    Ze(e, Ee()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest });
  if (bo) throw ((bo = !1), (e = Ws), (Ws = null), e);
  return (
    Yo & 1 && e.tag !== 0 && fr(),
    (o = e.pendingLanes),
    o & 1 ? (e === Js ? ri++ : ((ri = 0), (Js = e))) : (ri = 0),
    vn(),
    null
  );
}
function fr() {
  if (tn !== null) {
    var e = _d(Yo),
      t = ct.transition,
      n = ne;
    try {
      if (((ct.transition = null), (ne = 16 > e ? 16 : e), tn === null)) var r = !1;
      else {
        if (((e = tn), (tn = null), (Yo = 0), q & 6)) throw Error(x(331));
        var i = q;
        for (q |= 4, U = e.current; U !== null; ) {
          var o = U,
            l = o.child;
          if (U.flags & 16) {
            var s = o.deletions;
            if (s !== null) {
              for (var a = 0; a < s.length; a++) {
                var u = s[a];
                for (U = u; U !== null; ) {
                  var d = U;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ti(8, d, o);
                  }
                  var f = d.child;
                  if (f !== null) (f.return = d), (U = f);
                  else
                    for (; U !== null; ) {
                      d = U;
                      var A = d.sibling,
                        y = d.return;
                      if ((uA(d), d === u)) {
                        U = null;
                        break;
                      }
                      if (A !== null) {
                        (A.return = y), (U = A);
                        break;
                      }
                      U = y;
                    }
                }
              }
              var S = o.alternate;
              if (S !== null) {
                var B = S.child;
                if (B !== null) {
                  S.child = null;
                  do {
                    var D = B.sibling;
                    (B.sibling = null), (B = D);
                  } while (B !== null);
                }
              }
              U = o;
            }
          }
          if (o.subtreeFlags & 2064 && l !== null) (l.return = o), (U = l);
          else
            e: for (; U !== null; ) {
              if (((o = U), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    ti(9, o, o.return);
                }
              var g = o.sibling;
              if (g !== null) {
                (g.return = o.return), (U = g);
                break e;
              }
              U = o.return;
            }
        }
        var c = e.current;
        for (U = c; U !== null; ) {
          l = U;
          var p = l.child;
          if (l.subtreeFlags & 2064 && p !== null) (p.return = l), (U = p);
          else
            e: for (l = c; U !== null; ) {
              if (((s = U), s.flags & 2048))
                try {
                  switch (s.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ll(9, s);
                  }
                } catch (Q) {
                  ye(s, s.return, Q);
                }
              if (s === l) {
                U = null;
                break e;
              }
              var k = s.sibling;
              if (k !== null) {
                (k.return = s.return), (U = k);
                break e;
              }
              U = s.return;
            }
        }
        if (((q = i), vn(), It && typeof It.onPostCommitFiberRoot == "function"))
          try {
            It.onPostCommitFiberRoot(Zo, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (ne = n), (ct.transition = t);
    }
  }
  return !1;
}
function Lc(e, t, n) {
  (t = yr(n, t)),
    (t = Zf(e, t, 1)),
    (e = an(e, t, 1)),
    (t = Ye()),
    e !== null && (Si(e, 1, t), Ze(e, t));
}
function ye(e, t, n) {
  if (e.tag === 3) Lc(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Lc(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" && (un === null || !un.has(r)))
        ) {
          (e = yr(n, e)),
            (e = $f(t, e, 1)),
            (t = an(t, e, 1)),
            (e = Ye()),
            t !== null && (Si(t, 1, e), Ze(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function Hp(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = Ye()),
    (e.pingedLanes |= e.suspendedLanes & n),
    De === e &&
      (Ue & n) === n &&
      (Re === 4 || (Re === 3 && (Ue & 130023424) === Ue && 500 > Ee() - Wa) ? Nn(e, 0) : (Ka |= n)),
    Ze(e, t);
}
function yA(e, t) {
  t === 0 && (e.mode & 1 ? ((t = Hi), (Hi <<= 1), !(Hi & 130023424) && (Hi = 4194304)) : (t = 1));
  var n = Ye();
  (e = bt(e, t)), e !== null && (Si(e, t, n), Ze(e, n));
}
function bp(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), yA(e, n);
}
function Yp(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(x(314));
  }
  r !== null && r.delete(t), yA(e, n);
}
var CA;
CA = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || qe.current) Xe = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (Xe = !1), xp(e, t, n);
      Xe = !!(e.flags & 131072);
    }
  else (Xe = !1), fe && t.flags & 1048576 && Sf(t, Po, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      fo(e, t), (e = t.pendingProps);
      var i = gr(t, je.current);
      dr(t, n), (i = za(null, t, r, e, i, n));
      var o = Ha();
      return (
        (t.flags |= 1),
        typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            _e(r) ? ((o = !0), No(t)) : (o = !1),
            (t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null),
            Ta(t),
            (i.updater = ol),
            (t.stateNode = i),
            (i._reactInternals = t),
            Ms(t, r, e, n),
            (t = js(null, t, r, !0, o, n)))
          : ((t.tag = 0), fe && o && Ia(t), be(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (fo(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = Gp(r)),
          (e = gt(r, e)),
          i)
        ) {
          case 0:
            t = Fs(null, t, r, e, n);
            break e;
          case 1:
            t = Ec(null, t, r, e, n);
            break e;
          case 11:
            t = yc(null, t, r, e, n);
            break e;
          case 14:
            t = Cc(null, t, r, gt(r.type, e), n);
            break e;
        }
        throw Error(x(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : gt(r, i)),
        Fs(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : gt(r, i)),
        Ec(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((rA(t), e === null)) throw Error(x(387));
        (r = t.pendingProps), (o = t.memoizedState), (i = o.element), xf(e, t), Oo(t, r, null, n);
        var l = t.memoizedState;
        if (((r = l.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: l.cache,
              pendingSuspenseBoundaries: l.pendingSuspenseBoundaries,
              transitions: l.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            (i = yr(Error(x(423)), t)), (t = wc(e, t, r, n, i));
            break e;
          } else if (r !== i) {
            (i = yr(Error(x(424)), t)), (t = wc(e, t, r, n, i));
            break e;
          } else
            for (
              tt = sn(t.stateNode.containerInfo.firstChild),
                nt = t,
                fe = !0,
                yt = null,
                n = If(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((pr(), r === i)) {
            t = Yt(e, t, n);
            break e;
          }
          be(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Lf(t),
        e === null && Us(t),
        (r = t.type),
        (i = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (l = i.children),
        Is(r, i) ? (l = null) : o !== null && Is(r, o) && (t.flags |= 32),
        nA(e, t),
        be(e, t, l, n),
        t.child
      );
    case 6:
      return e === null && Us(t), null;
    case 13:
      return iA(e, t, n);
    case 4:
      return (
        Ma(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = mr(t, null, r, n)) : be(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : gt(r, i)),
        yc(e, t, r, i, n)
      );
    case 7:
      return be(e, t, t.pendingProps, n), t.child;
    case 8:
      return be(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return be(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (o = t.memoizedProps),
          (l = i.value),
          le(To, r._currentValue),
          (r._currentValue = l),
          o !== null)
        )
          if (wt(o.value, l)) {
            if (o.children === i.children && !qe.current) {
              t = Yt(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var s = o.dependencies;
              if (s !== null) {
                l = o.child;
                for (var a = s.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (o.tag === 1) {
                      (a = Ft(-1, n & -n)), (a.tag = 2);
                      var u = o.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var d = u.pending;
                        d === null ? (a.next = a) : ((a.next = d.next), (d.next = a)),
                          (u.pending = a);
                      }
                    }
                    (o.lanes |= n),
                      (a = o.alternate),
                      a !== null && (a.lanes |= n),
                      Ps(o.return, n, t),
                      (s.lanes |= n);
                    break;
                  }
                  a = a.next;
                }
              } else if (o.tag === 10) l = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((l = o.return), l === null)) throw Error(x(341));
                (l.lanes |= n),
                  (s = l.alternate),
                  s !== null && (s.lanes |= n),
                  Ps(l, n, t),
                  (l = o.sibling);
              } else l = o.child;
              if (l !== null) l.return = o;
              else
                for (l = o; l !== null; ) {
                  if (l === t) {
                    l = null;
                    break;
                  }
                  if (((o = l.sibling), o !== null)) {
                    (o.return = l.return), (l = o);
                    break;
                  }
                  l = l.return;
                }
              o = l;
            }
        be(e, t, i.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        dr(t, n),
        (i = dt(i)),
        (r = r(i)),
        (t.flags |= 1),
        be(e, t, r, n),
        t.child
      );
    case 14:
      return (r = t.type), (i = gt(r, t.pendingProps)), (i = gt(r.type, i)), Cc(e, t, r, i, n);
    case 15:
      return eA(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : gt(r, i)),
        fo(e, t),
        (t.tag = 1),
        _e(r) ? ((e = !0), No(t)) : (e = !1),
        dr(t, n),
        _f(t, r, i),
        Ms(t, r, i, n),
        js(null, t, r, !0, e, n)
      );
    case 19:
      return oA(e, t, n);
    case 22:
      return tA(e, t, n);
  }
  throw Error(x(156, t.tag));
};
function EA(e, t) {
  return Wd(e, t);
}
function Vp(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function ut(e, t, n, r) {
  return new Vp(e, t, n, r);
}
function _a(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function Gp(e) {
  if (typeof e == "function") return _a(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === pa)) return 11;
    if (e === ma) return 14;
  }
  return 2;
}
function dn(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = ut(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function go(e, t, n, r, i, o) {
  var l = 2;
  if (((r = e), typeof e == "function")) _a(e) && (l = 1);
  else if (typeof e == "string") l = 5;
  else
    e: switch (e) {
      case qn:
        return Un(n.children, i, o, t);
      case ga:
        (l = 8), (i |= 8);
        break;
      case ls:
        return (e = ut(12, n, t, i | 2)), (e.elementType = ls), (e.lanes = o), e;
      case ss:
        return (e = ut(13, n, t, i)), (e.elementType = ss), (e.lanes = o), e;
      case as:
        return (e = ut(19, n, t, i)), (e.elementType = as), (e.lanes = o), e;
      case xd:
        return al(n, i, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Id:
              l = 10;
              break e;
            case Dd:
              l = 9;
              break e;
            case pa:
              l = 11;
              break e;
            case ma:
              l = 14;
              break e;
            case qt:
              (l = 16), (r = null);
              break e;
          }
        throw Error(x(130, e == null ? e : typeof e, ""));
    }
  return (t = ut(l, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = o), t;
}
function Un(e, t, n, r) {
  return (e = ut(7, e, r, t)), (e.lanes = n), e;
}
function al(e, t, n, r) {
  return (
    (e = ut(22, e, r, t)), (e.elementType = xd), (e.lanes = n), (e.stateNode = { isHidden: !1 }), e
  );
}
function Jl(e, t, n) {
  return (e = ut(6, e, null, t)), (e.lanes = n), e;
}
function Xl(e, t, n) {
  return (
    (t = ut(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Kp(e, t, n, r, i) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Dl(0)),
    (this.expirationTimes = Dl(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Dl(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null);
}
function Za(e, t, n, r, i, o, l, s, a) {
  return (
    (e = new Kp(e, t, n, s, a)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = ut(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Ta(o),
    e
  );
}
function Wp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Xn,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function wA(e) {
  if (!e) return gn;
  e = e._reactInternals;
  e: {
    if (Hn(e) !== e || e.tag !== 1) throw Error(x(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (_e(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(x(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (_e(n)) return wf(e, n, t);
  }
  return t;
}
function BA(e, t, n, r, i, o, l, s, a) {
  return (
    (e = Za(n, r, !0, e, i, o, l, s, a)),
    (e.context = wA(null)),
    (n = e.current),
    (r = Ye()),
    (i = cn(n)),
    (o = Ft(r, i)),
    (o.callback = t ?? null),
    an(n, o, i),
    (e.current.lanes = i),
    Si(e, i, r),
    Ze(e, r),
    e
  );
}
function ul(e, t, n, r) {
  var i = t.current,
    o = Ye(),
    l = cn(i);
  return (
    (n = wA(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Ft(o, l)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = an(i, t, l)),
    e !== null && (Et(e, i, l, o), ao(e, i, l)),
    l
  );
}
function Go(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Nc(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function $a(e, t) {
  Nc(e, t), (e = e.alternate) && Nc(e, t);
}
function Jp() {
  return null;
}
var SA =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function eu(e) {
  this._internalRoot = e;
}
cl.prototype.render = eu.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(x(409));
  ul(e, t, null, null);
};
cl.prototype.unmount = eu.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    jn(function () {
      ul(null, e, null, null);
    }),
      (t[Ht] = null);
  }
};
function cl(e) {
  this._internalRoot = e;
}
cl.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = ef();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Zt.length && t !== 0 && t < Zt[n].priority; n++);
    Zt.splice(n, 0, e), n === 0 && nf(e);
  }
};
function tu(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function dl(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Uc() {}
function Xp(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var u = Go(l);
        o.call(u);
      };
    }
    var l = BA(t, r, e, 0, null, !1, !1, "", Uc);
    return (
      (e._reactRootContainer = l),
      (e[Ht] = l.current),
      fi(e.nodeType === 8 ? e.parentNode : e),
      jn(),
      l
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof r == "function") {
    var s = r;
    r = function () {
      var u = Go(a);
      s.call(u);
    };
  }
  var a = Za(e, 0, !1, null, null, !1, !1, "", Uc);
  return (
    (e._reactRootContainer = a),
    (e[Ht] = a.current),
    fi(e.nodeType === 8 ? e.parentNode : e),
    jn(function () {
      ul(t, a, n, r);
    }),
    a
  );
}
function fl(e, t, n, r, i) {
  var o = n._reactRootContainer;
  if (o) {
    var l = o;
    if (typeof i == "function") {
      var s = i;
      i = function () {
        var a = Go(l);
        s.call(a);
      };
    }
    ul(t, l, e, i);
  } else l = Xp(n, t, e, i, r);
  return Go(l);
}
Zd = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Vr(t.pendingLanes);
        n !== 0 && (Ca(t, n | 1), Ze(t, Ee()), !(q & 6) && ((Cr = Ee() + 500), vn()));
      }
      break;
    case 13:
      jn(function () {
        var r = bt(e, 1);
        if (r !== null) {
          var i = Ye();
          Et(r, e, 1, i);
        }
      }),
        $a(e, 1);
  }
};
Ea = function (e) {
  if (e.tag === 13) {
    var t = bt(e, 134217728);
    if (t !== null) {
      var n = Ye();
      Et(t, e, 134217728, n);
    }
    $a(e, 134217728);
  }
};
$d = function (e) {
  if (e.tag === 13) {
    var t = cn(e),
      n = bt(e, t);
    if (n !== null) {
      var r = Ye();
      Et(n, e, t, r);
    }
    $a(e, t);
  }
};
ef = function () {
  return ne;
};
tf = function (e, t) {
  var n = ne;
  try {
    return (ne = e), t();
  } finally {
    ne = n;
  }
};
vs = function (e, t, n) {
  switch (t) {
    case "input":
      if ((ds(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = nl(r);
            if (!i) throw Error(x(90));
            Nd(r), ds(r, i);
          }
        }
      }
      break;
    case "textarea":
      Pd(e, n);
      break;
    case "select":
      (t = n.value), t != null && sr(e, !!n.multiple, t, !1);
  }
};
Hd = Ja;
bd = jn;
var qp = { usingClientEntryPoint: !1, Events: [Qi, er, nl, jd, zd, Ja] },
  Or = {
    findFiberByHostInstance: Rn,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  _p = {
    bundleType: Or.bundleType,
    version: Or.version,
    rendererPackageName: Or.rendererPackageName,
    rendererConfig: Or.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Vt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = Gd(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: Or.findFiberByHostInstance || Jp,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Zi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Zi.isDisabled && Zi.supportsFiber)
    try {
      (Zo = Zi.inject(_p)), (It = Zi);
    } catch {}
}
it.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = qp;
it.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!tu(t)) throw Error(x(200));
  return Wp(e, t, null, n);
};
it.createRoot = function (e, t) {
  if (!tu(e)) throw Error(x(299));
  var n = !1,
    r = "",
    i = SA;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = Za(e, 1, !1, null, null, n, !1, r, i)),
    (e[Ht] = t.current),
    fi(e.nodeType === 8 ? e.parentNode : e),
    new eu(t)
  );
};
it.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(x(188))
      : ((e = Object.keys(e).join(",")), Error(x(268, e)));
  return (e = Gd(t)), (e = e === null ? null : e.stateNode), e;
};
it.flushSync = function (e) {
  return jn(e);
};
it.hydrate = function (e, t, n) {
  if (!dl(t)) throw Error(x(200));
  return fl(null, e, t, !0, n);
};
it.hydrateRoot = function (e, t, n) {
  if (!tu(e)) throw Error(x(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    o = "",
    l = SA;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (l = n.onRecoverableError)),
    (t = BA(t, null, e, 1, n ?? null, i, !1, o, l)),
    (e[Ht] = t.current),
    fi(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i);
  return new cl(t);
};
it.render = function (e, t, n) {
  if (!dl(t)) throw Error(x(200));
  return fl(null, e, t, !1, n);
};
it.unmountComponentAtNode = function (e) {
  if (!dl(e)) throw Error(x(40));
  return e._reactRootContainer
    ? (jn(function () {
        fl(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[Ht] = null);
        });
      }),
      !0)
    : !1;
};
it.unstable_batchedUpdates = Ja;
it.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!dl(n)) throw Error(x(200));
  if (e == null || e._reactInternals === void 0) throw Error(x(38));
  return fl(e, t, n, !1, r);
};
it.version = "18.3.1-next-f1338f8080-20240426";
function kA() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(kA);
    } catch (e) {
      console.error(e);
    }
}
kA(), (Sd.exports = it);
var nu = Sd.exports;
const Zp = fd(nu),
  $p = dd({ __proto__: null, default: Zp }, [nu]);
var Pc = nu;
(is.createRoot = Pc.createRoot), (is.hydrateRoot = Pc.hydrateRoot);
/**
 * @remix-run/router v1.21.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function de() {
  return (
    (de = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    de.apply(this, arguments)
  );
}
var Ce;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(Ce || (Ce = {}));
const Tc = "popstate";
function em(e) {
  e === void 0 && (e = {});
  function t(r, i) {
    let { pathname: o, search: l, hash: s } = r.location;
    return Ei(
      "",
      { pathname: o, search: l, hash: s },
      (i.state && i.state.usr) || null,
      (i.state && i.state.key) || "default"
    );
  }
  function n(r, i) {
    return typeof i == "string" ? i : Ii(i);
  }
  return nm(t, n, null, e);
}
function G(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Er(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function tm() {
  return Math.random().toString(36).substr(2, 8);
}
function Mc(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function Ei(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    de(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? Gt(t) : t,
      { state: n, key: (t && t.key) || r || tm() }
    )
  );
}
function Ii(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function Gt(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))), e && (t.pathname = e);
  }
  return t;
}
function nm(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: i = document.defaultView, v5Compat: o = !1 } = r,
    l = i.history,
    s = Ce.Pop,
    a = null,
    u = d();
  u == null && ((u = 0), l.replaceState(de({}, l.state, { idx: u }), ""));
  function d() {
    return (l.state || { idx: null }).idx;
  }
  function f() {
    s = Ce.Pop;
    let D = d(),
      g = D == null ? null : D - u;
    (u = D), a && a({ action: s, location: B.location, delta: g });
  }
  function A(D, g) {
    s = Ce.Push;
    let c = Ei(B.location, D, g);
    n && n(c, D), (u = d() + 1);
    let p = Mc(c, u),
      k = B.createHref(c);
    try {
      l.pushState(p, "", k);
    } catch (Q) {
      if (Q instanceof DOMException && Q.name === "DataCloneError") throw Q;
      i.location.assign(k);
    }
    o && a && a({ action: s, location: B.location, delta: 1 });
  }
  function y(D, g) {
    s = Ce.Replace;
    let c = Ei(B.location, D, g);
    n && n(c, D), (u = d());
    let p = Mc(c, u),
      k = B.createHref(c);
    l.replaceState(p, "", k), o && a && a({ action: s, location: B.location, delta: 0 });
  }
  function S(D) {
    let g = i.location.origin !== "null" ? i.location.origin : i.location.href,
      c = typeof D == "string" ? D : Ii(D);
    return (
      (c = c.replace(/ $/, "%20")),
      G(g, "No window.location.(origin|href) available to create URL for href: " + c),
      new URL(c, g)
    );
  }
  let B = {
    get action() {
      return s;
    },
    get location() {
      return e(i, l);
    },
    listen(D) {
      if (a) throw new Error("A history only accepts one active listener");
      return (
        i.addEventListener(Tc, f),
        (a = D),
        () => {
          i.removeEventListener(Tc, f), (a = null);
        }
      );
    },
    createHref(D) {
      return t(i, D);
    },
    createURL: S,
    encodeLocation(D) {
      let g = S(D);
      return { pathname: g.pathname, search: g.search, hash: g.hash };
    },
    push: A,
    replace: y,
    go(D) {
      return l.go(D);
    },
  };
  return B;
}
var re;
(function (e) {
  (e.data = "data"), (e.deferred = "deferred"), (e.redirect = "redirect"), (e.error = "error");
})(re || (re = {}));
const rm = new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
function im(e) {
  return e.index === !0;
}
function Ko(e, t, n, r) {
  return (
    n === void 0 && (n = []),
    r === void 0 && (r = {}),
    e.map((i, o) => {
      let l = [...n, String(o)],
        s = typeof i.id == "string" ? i.id : l.join("-");
      if (
        (G(i.index !== !0 || !i.children, "Cannot specify children on an index route"),
        G(
          !r[s],
          'Found a route id collision on id "' +
            s +
            `".  Route id's must be globally unique within Data Router usages`
        ),
        im(i))
      ) {
        let a = de({}, i, t(i), { id: s });
        return (r[s] = a), a;
      } else {
        let a = de({}, i, t(i), { id: s, children: void 0 });
        return (r[s] = a), i.children && (a.children = Ko(i.children, t, l, r)), a;
      }
    })
  );
}
function kn(e, t, n) {
  return n === void 0 && (n = "/"), po(e, t, n, !1);
}
function po(e, t, n, r) {
  let i = typeof t == "string" ? Gt(t) : t,
    o = Di(i.pathname || "/", n);
  if (o == null) return null;
  let l = QA(e);
  lm(l);
  let s = null;
  for (let a = 0; s == null && a < l.length; ++a) {
    let u = mm(o);
    s = gm(l[a], u, r);
  }
  return s;
}
function om(e, t) {
  let { route: n, pathname: r, params: i } = e;
  return { id: n.id, pathname: r, params: i, data: t[n.id], handle: n.handle };
}
function QA(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let i = (o, l, s) => {
    let a = {
      relativePath: s === void 0 ? o.path || "" : s,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: l,
      route: o,
    };
    a.relativePath.startsWith("/") &&
      (G(
        a.relativePath.startsWith(r),
        'Absolute route path "' +
          a.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes."
      ),
      (a.relativePath = a.relativePath.slice(r.length)));
    let u = fn([r, a.relativePath]),
      d = n.concat(a);
    o.children &&
      o.children.length > 0 &&
      (G(
        o.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + u + '".')
      ),
      QA(o.children, t, d, u)),
      !(o.path == null && !o.index) && t.push({ path: u, score: Am(u, o.index), routesMeta: d });
  };
  return (
    e.forEach((o, l) => {
      var s;
      if (o.path === "" || !((s = o.path) != null && s.includes("?"))) i(o, l);
      else for (let a of RA(o.path)) i(o, l, a);
    }),
    t
  );
}
function RA(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    i = n.endsWith("?"),
    o = n.replace(/\?$/, "");
  if (r.length === 0) return i ? [o, ""] : [o];
  let l = RA(r.join("/")),
    s = [];
  return (
    s.push(...l.map((a) => (a === "" ? o : [o, a].join("/")))),
    i && s.push(...l),
    s.map((a) => (e.startsWith("/") && a === "" ? "/" : a))
  );
}
function lm(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : hm(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
const sm = /^:[\w-]+$/,
  am = 3,
  um = 2,
  cm = 1,
  dm = 10,
  fm = -2,
  Oc = (e) => e === "*";
function Am(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(Oc) && (r += fm),
    t && (r += um),
    n.filter((i) => !Oc(i)).reduce((i, o) => i + (sm.test(o) ? am : o === "" ? cm : dm), r)
  );
}
function hm(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, i) => r === t[i])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function gm(e, t, n) {
  n === void 0 && (n = !1);
  let { routesMeta: r } = e,
    i = {},
    o = "/",
    l = [];
  for (let s = 0; s < r.length; ++s) {
    let a = r[s],
      u = s === r.length - 1,
      d = o === "/" ? t : t.slice(o.length) || "/",
      f = Fc({ path: a.relativePath, caseSensitive: a.caseSensitive, end: u }, d),
      A = a.route;
    if (
      (!f &&
        u &&
        n &&
        !r[r.length - 1].route.index &&
        (f = Fc({ path: a.relativePath, caseSensitive: a.caseSensitive, end: !1 }, d)),
      !f)
    )
      return null;
    Object.assign(i, f.params),
      l.push({
        params: i,
        pathname: fn([o, f.pathname]),
        pathnameBase: Cm(fn([o, f.pathnameBase])),
        route: A,
      }),
      f.pathnameBase !== "/" && (o = fn([o, f.pathnameBase]));
  }
  return l;
}
function Fc(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = pm(e.path, e.caseSensitive, e.end),
    i = t.match(n);
  if (!i) return null;
  let o = i[0],
    l = o.replace(/(.)\/+$/, "$1"),
    s = i.slice(1);
  return {
    params: r.reduce((u, d, f) => {
      let { paramName: A, isOptional: y } = d;
      if (A === "*") {
        let B = s[f] || "";
        l = o.slice(0, o.length - B.length).replace(/(.)\/+$/, "$1");
      }
      const S = s[f];
      return y && !S ? (u[A] = void 0) : (u[A] = (S || "").replace(/%2F/g, "/")), u;
    }, {}),
    pathname: o,
    pathnameBase: l,
    pattern: e,
  };
}
function pm(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    Er(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".')
    );
  let r = [],
    i =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (l, s, a) => (
            r.push({ paramName: s, isOptional: a != null }), a ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }), (i += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
      ? (i += "\\/*$")
      : e !== "" && e !== "/" && (i += "(?:(?=\\/|$))"),
    [new RegExp(i, t ? void 0 : "i"), r]
  );
}
function mm(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      Er(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ").")
      ),
      e
    );
  }
}
function Di(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function vm(e, t) {
  t === void 0 && (t = "/");
  let { pathname: n, search: r = "", hash: i = "" } = typeof e == "string" ? Gt(e) : e;
  return { pathname: n ? (n.startsWith("/") ? n : ym(n, t)) : t, search: Em(r), hash: wm(i) };
}
function ym(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((i) => {
      i === ".." ? n.length > 1 && n.pop() : i !== "." && n.push(i);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function ql(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." + t + "` field [" + JSON.stringify(r) + "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function IA(e) {
  return e.filter((t, n) => n === 0 || (t.route.path && t.route.path.length > 0));
}
function DA(e, t) {
  let n = IA(e);
  return t
    ? n.map((r, i) => (i === n.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase);
}
function xA(e, t, n, r) {
  r === void 0 && (r = !1);
  let i;
  typeof e == "string"
    ? (i = Gt(e))
    : ((i = de({}, e)),
      G(!i.pathname || !i.pathname.includes("?"), ql("?", "pathname", "search", i)),
      G(!i.pathname || !i.pathname.includes("#"), ql("#", "pathname", "hash", i)),
      G(!i.search || !i.search.includes("#"), ql("#", "search", "hash", i)));
  let o = e === "" || i.pathname === "",
    l = o ? "/" : i.pathname,
    s;
  if (l == null) s = n;
  else {
    let f = t.length - 1;
    if (!r && l.startsWith("..")) {
      let A = l.split("/");
      for (; A[0] === ".."; ) A.shift(), (f -= 1);
      i.pathname = A.join("/");
    }
    s = f >= 0 ? t[f] : "/";
  }
  let a = vm(i, s),
    u = l && l !== "/" && l.endsWith("/"),
    d = (o || l === ".") && n.endsWith("/");
  return !a.pathname.endsWith("/") && (u || d) && (a.pathname += "/"), a;
}
const fn = (e) => e.join("/").replace(/\/\/+/g, "/"),
  Cm = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Em = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  wm = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
class Wo {
  constructor(t, n, r, i) {
    i === void 0 && (i = !1),
      (this.status = t),
      (this.statusText = n || ""),
      (this.internal = i),
      r instanceof Error ? ((this.data = r.toString()), (this.error = r)) : (this.data = r);
  }
}
function Al(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const LA = ["post", "put", "patch", "delete"],
  Bm = new Set(LA),
  Sm = ["get", ...LA],
  km = new Set(Sm),
  Qm = new Set([301, 302, 303, 307, 308]),
  Rm = new Set([307, 308]),
  _l = {
    state: "idle",
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  Im = {
    state: "idle",
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  Fr = { state: "unblocked", proceed: void 0, reset: void 0, location: void 0 },
  ru = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Dm = (e) => ({ hasErrorBoundary: !!e.hasErrorBoundary }),
  NA = "remix-router-transitions";
function xm(e) {
  const t = e.window ? e.window : typeof window < "u" ? window : void 0,
    n = typeof t < "u" && typeof t.document < "u" && typeof t.document.createElement < "u",
    r = !n;
  G(e.routes.length > 0, "You must provide a non-empty routes array to createRouter");
  let i;
  if (e.mapRouteProperties) i = e.mapRouteProperties;
  else if (e.detectErrorBoundary) {
    let h = e.detectErrorBoundary;
    i = (C) => ({ hasErrorBoundary: h(C) });
  } else i = Dm;
  let o = {},
    l = Ko(e.routes, i, void 0, o),
    s,
    a = e.basename || "/",
    u = e.dataStrategy || Pm,
    d = e.patchRoutesOnNavigation,
    f = de(
      {
        v7_fetcherPersist: !1,
        v7_normalizeFormMethod: !1,
        v7_partialHydration: !1,
        v7_prependBasename: !1,
        v7_relativeSplatPath: !1,
        v7_skipActionErrorRevalidation: !1,
      },
      e.future
    ),
    A = null,
    y = new Set(),
    S = null,
    B = null,
    D = null,
    g = e.hydrationData != null,
    c = kn(l, e.history.location, a),
    p = null;
  if (c == null && !d) {
    let h = We(404, { pathname: e.history.location.pathname }),
      { matches: C, route: w } = Xc(l);
    (c = C), (p = { [w.id]: h });
  }
  c && !e.hydrationData && Ni(c, l, e.history.location.pathname).active && (c = null);
  let k;
  if (c)
    if (c.some((h) => h.route.lazy)) k = !1;
    else if (!c.some((h) => h.route.loader)) k = !0;
    else if (f.v7_partialHydration) {
      let h = e.hydrationData ? e.hydrationData.loaderData : null,
        C = e.hydrationData ? e.hydrationData.errors : null;
      if (C) {
        let w = c.findIndex((R) => C[R.route.id] !== void 0);
        k = c.slice(0, w + 1).every((R) => !Zs(R.route, h, C));
      } else k = c.every((w) => !Zs(w.route, h, C));
    } else k = e.hydrationData != null;
  else if (((k = !1), (c = []), f.v7_partialHydration)) {
    let h = Ni(null, l, e.history.location.pathname);
    h.active && h.matches && (c = h.matches);
  }
  let Q,
    m = {
      historyAction: e.history.action,
      location: e.history.location,
      matches: c,
      initialized: k,
      navigation: _l,
      restoreScrollPosition: e.hydrationData != null ? !1 : null,
      preventScrollReset: !1,
      revalidation: "idle",
      loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
      actionData: (e.hydrationData && e.hydrationData.actionData) || null,
      errors: (e.hydrationData && e.hydrationData.errors) || p,
      fetchers: new Map(),
      blockers: new Map(),
    },
    L = Ce.Pop,
    I = !1,
    j,
    P = !1,
    _ = new Map(),
    ie = null,
    ce = !1,
    te = !1,
    Te = [],
    Ke = new Set(),
    Ae = new Map(),
    N = 0,
    b = -1,
    Y = new Map(),
    $ = new Set(),
    se = new Map(),
    Bt = new Map(),
    xe = new Set(),
    At = new Map(),
    ze = new Map(),
    Lt;
  function uh() {
    if (
      ((A = e.history.listen((h) => {
        let { action: C, location: w, delta: R } = h;
        if (Lt) {
          Lt(), (Lt = void 0);
          return;
        }
        Er(
          ze.size === 0 || R != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let T = wu({ currentLocation: m.location, nextLocation: w, historyAction: C });
        if (T && R != null) {
          let z = new Promise((V) => {
            Lt = V;
          });
          e.history.go(R * -1),
            Li(T, {
              state: "blocked",
              location: w,
              proceed() {
                Li(T, { state: "proceeding", proceed: void 0, reset: void 0, location: w }),
                  z.then(() => e.history.go(R));
              },
              reset() {
                let V = new Map(m.blockers);
                V.set(T, Fr), He({ blockers: V });
              },
            });
          return;
        }
        return Cn(C, w);
      })),
      n)
    ) {
      Jm(t, _);
      let h = () => Xm(t, _);
      t.addEventListener("pagehide", h), (ie = () => t.removeEventListener("pagehide", h));
    }
    return m.initialized || Cn(Ce.Pop, m.location, { initialHydration: !0 }), Q;
  }
  function ch() {
    A && A(),
      ie && ie(),
      y.clear(),
      j && j.abort(),
      m.fetchers.forEach((h, C) => xi(C)),
      m.blockers.forEach((h, C) => Eu(C));
  }
  function dh(h) {
    return y.add(h), () => y.delete(h);
  }
  function He(h, C) {
    C === void 0 && (C = {}), (m = de({}, m, h));
    let w = [],
      R = [];
    f.v7_fetcherPersist &&
      m.fetchers.forEach((T, z) => {
        T.state === "idle" && (xe.has(z) ? R.push(z) : w.push(z));
      }),
      [...y].forEach((T) =>
        T(m, {
          deletedFetchers: R,
          viewTransitionOpts: C.viewTransitionOpts,
          flushSync: C.flushSync === !0,
        })
      ),
      f.v7_fetcherPersist && (w.forEach((T) => m.fetchers.delete(T)), R.forEach((T) => xi(T)));
  }
  function bn(h, C, w) {
    var R, T;
    let { flushSync: z } = w === void 0 ? {} : w,
      V =
        m.actionData != null &&
        m.navigation.formMethod != null &&
        mt(m.navigation.formMethod) &&
        m.navigation.state === "loading" &&
        ((R = h.state) == null ? void 0 : R._isRedirect) !== !0,
      O;
    C.actionData
      ? Object.keys(C.actionData).length > 0
        ? (O = C.actionData)
        : (O = null)
      : V
      ? (O = m.actionData)
      : (O = null);
    let F = C.loaderData ? Wc(m.loaderData, C.loaderData, C.matches || [], C.errors) : m.loaderData,
      M = m.blockers;
    M.size > 0 && ((M = new Map(M)), M.forEach((X, Le) => M.set(Le, Fr)));
    let H =
      I === !0 ||
      (m.navigation.formMethod != null &&
        mt(m.navigation.formMethod) &&
        ((T = h.state) == null ? void 0 : T._isRedirect) !== !0);
    s && ((l = s), (s = void 0)),
      ce ||
        L === Ce.Pop ||
        (L === Ce.Push
          ? e.history.push(h, h.state)
          : L === Ce.Replace && e.history.replace(h, h.state));
    let W;
    if (L === Ce.Pop) {
      let X = _.get(m.location.pathname);
      X && X.has(h.pathname)
        ? (W = { currentLocation: m.location, nextLocation: h })
        : _.has(h.pathname) && (W = { currentLocation: h, nextLocation: m.location });
    } else if (P) {
      let X = _.get(m.location.pathname);
      X ? X.add(h.pathname) : ((X = new Set([h.pathname])), _.set(m.location.pathname, X)),
        (W = { currentLocation: m.location, nextLocation: h });
    }
    He(
      de({}, C, {
        actionData: O,
        loaderData: F,
        historyAction: L,
        location: h,
        initialized: !0,
        navigation: _l,
        revalidation: "idle",
        restoreScrollPosition: Su(h, C.matches || m.matches),
        preventScrollReset: H,
        blockers: M,
      }),
      { viewTransitionOpts: W, flushSync: z === !0 }
    ),
      (L = Ce.Pop),
      (I = !1),
      (P = !1),
      (ce = !1),
      (te = !1),
      (Te = []);
  }
  async function hu(h, C) {
    if (typeof h == "number") {
      e.history.go(h);
      return;
    }
    let w = _s(
        m.location,
        m.matches,
        a,
        f.v7_prependBasename,
        h,
        f.v7_relativeSplatPath,
        C == null ? void 0 : C.fromRouteId,
        C == null ? void 0 : C.relative
      ),
      { path: R, submission: T, error: z } = jc(f.v7_normalizeFormMethod, !1, w, C),
      V = m.location,
      O = Ei(m.location, R, C && C.state);
    O = de({}, O, e.history.encodeLocation(O));
    let F = C && C.replace != null ? C.replace : void 0,
      M = Ce.Push;
    F === !0
      ? (M = Ce.Replace)
      : F === !1 ||
        (T != null &&
          mt(T.formMethod) &&
          T.formAction === m.location.pathname + m.location.search &&
          (M = Ce.Replace));
    let H = C && "preventScrollReset" in C ? C.preventScrollReset === !0 : void 0,
      W = (C && C.flushSync) === !0,
      X = wu({ currentLocation: V, nextLocation: O, historyAction: M });
    if (X) {
      Li(X, {
        state: "blocked",
        location: O,
        proceed() {
          Li(X, { state: "proceeding", proceed: void 0, reset: void 0, location: O }), hu(h, C);
        },
        reset() {
          let Le = new Map(m.blockers);
          Le.set(X, Fr), He({ blockers: Le });
        },
      });
      return;
    }
    return await Cn(M, O, {
      submission: T,
      pendingError: z,
      preventScrollReset: H,
      replace: C && C.replace,
      enableViewTransition: C && C.viewTransition,
      flushSync: W,
    });
  }
  function fh() {
    if ((Cl(), He({ revalidation: "loading" }), m.navigation.state !== "submitting")) {
      if (m.navigation.state === "idle") {
        Cn(m.historyAction, m.location, { startUninterruptedRevalidation: !0 });
        return;
      }
      Cn(L || m.historyAction, m.navigation.location, {
        overrideNavigation: m.navigation,
        enableViewTransition: P === !0,
      });
    }
  }
  async function Cn(h, C, w) {
    j && j.abort(),
      (j = null),
      (L = h),
      (ce = (w && w.startUninterruptedRevalidation) === !0),
      wh(m.location, m.matches),
      (I = (w && w.preventScrollReset) === !0),
      (P = (w && w.enableViewTransition) === !0);
    let R = s || l,
      T = w && w.overrideNavigation,
      z = kn(R, C, a),
      V = (w && w.flushSync) === !0,
      O = Ni(z, R, C.pathname);
    if ((O.active && O.matches && (z = O.matches), !z)) {
      let { error: oe, notFoundMatches: ee, route: me } = El(C.pathname);
      bn(C, { matches: ee, loaderData: {}, errors: { [me.id]: oe } }, { flushSync: V });
      return;
    }
    if (
      m.initialized &&
      !te &&
      zm(m.location, C) &&
      !(w && w.submission && mt(w.submission.formMethod))
    ) {
      bn(C, { matches: z }, { flushSync: V });
      return;
    }
    j = new AbortController();
    let F = Wn(e.history, C, j.signal, w && w.submission),
      M;
    if (w && w.pendingError) M = [Qn(z).route.id, { type: re.error, error: w.pendingError }];
    else if (w && w.submission && mt(w.submission.formMethod)) {
      let oe = await Ah(F, C, w.submission, z, O.active, { replace: w.replace, flushSync: V });
      if (oe.shortCircuited) return;
      if (oe.pendingActionResult) {
        let [ee, me] = oe.pendingActionResult;
        if (et(me) && Al(me.error) && me.error.status === 404) {
          (j = null), bn(C, { matches: oe.matches, loaderData: {}, errors: { [ee]: me.error } });
          return;
        }
      }
      (z = oe.matches || z),
        (M = oe.pendingActionResult),
        (T = Zl(C, w.submission)),
        (V = !1),
        (O.active = !1),
        (F = Wn(e.history, F.url, F.signal));
    }
    let {
      shortCircuited: H,
      matches: W,
      loaderData: X,
      errors: Le,
    } = await hh(
      F,
      C,
      z,
      O.active,
      T,
      w && w.submission,
      w && w.fetcherSubmission,
      w && w.replace,
      w && w.initialHydration === !0,
      V,
      M
    );
    H || ((j = null), bn(C, de({ matches: W || z }, Jc(M), { loaderData: X, errors: Le })));
  }
  async function Ah(h, C, w, R, T, z) {
    z === void 0 && (z = {}), Cl();
    let V = Km(C, w);
    if ((He({ navigation: V }, { flushSync: z.flushSync === !0 }), T)) {
      let M = await Ui(R, C.pathname, h.signal);
      if (M.type === "aborted") return { shortCircuited: !0 };
      if (M.type === "error") {
        let H = Qn(M.partialMatches).route.id;
        return {
          matches: M.partialMatches,
          pendingActionResult: [H, { type: re.error, error: M.error }],
        };
      } else if (M.matches) R = M.matches;
      else {
        let { notFoundMatches: H, error: W, route: X } = El(C.pathname);
        return { matches: H, pendingActionResult: [X.id, { type: re.error, error: W }] };
      }
    }
    let O,
      F = Kr(R, C);
    if (!F.route.action && !F.route.lazy)
      O = {
        type: re.error,
        error: We(405, { method: h.method, pathname: C.pathname, routeId: F.route.id }),
      };
    else if (((O = (await Qr("action", m, h, [F], R, null))[F.route.id]), h.signal.aborted))
      return { shortCircuited: !0 };
    if (xn(O)) {
      let M;
      return (
        z && z.replace != null
          ? (M = z.replace)
          : (M =
              Vc(O.response.headers.get("Location"), new URL(h.url), a) ===
              m.location.pathname + m.location.search),
        await En(h, O, !0, { submission: w, replace: M }),
        { shortCircuited: !0 }
      );
    }
    if (nn(O)) throw We(400, { type: "defer-action" });
    if (et(O)) {
      let M = Qn(R, F.route.id);
      return (
        (z && z.replace) !== !0 && (L = Ce.Push),
        { matches: R, pendingActionResult: [M.route.id, O] }
      );
    }
    return { matches: R, pendingActionResult: [F.route.id, O] };
  }
  async function hh(h, C, w, R, T, z, V, O, F, M, H) {
    let W = T || Zl(C, z),
      X = z || V || _c(W),
      Le = !ce && (!f.v7_partialHydration || !F);
    if (R) {
      if (Le) {
        let ve = gu(H);
        He(de({ navigation: W }, ve !== void 0 ? { actionData: ve } : {}), { flushSync: M });
      }
      let Z = await Ui(w, C.pathname, h.signal);
      if (Z.type === "aborted") return { shortCircuited: !0 };
      if (Z.type === "error") {
        let ve = Qn(Z.partialMatches).route.id;
        return { matches: Z.partialMatches, loaderData: {}, errors: { [ve]: Z.error } };
      } else if (Z.matches) w = Z.matches;
      else {
        let { error: ve, notFoundMatches: Vn, route: Dr } = El(C.pathname);
        return { matches: Vn, loaderData: {}, errors: { [Dr.id]: ve } };
      }
    }
    let oe = s || l,
      [ee, me] = Hc(
        e.history,
        m,
        w,
        X,
        C,
        f.v7_partialHydration && F === !0,
        f.v7_skipActionErrorRevalidation,
        te,
        Te,
        Ke,
        xe,
        se,
        $,
        oe,
        a,
        H
      );
    if (
      (wl(
        (Z) =>
          !(w && w.some((ve) => ve.route.id === Z)) || (ee && ee.some((ve) => ve.route.id === Z))
      ),
      (b = ++N),
      ee.length === 0 && me.length === 0)
    ) {
      let Z = yu();
      return (
        bn(
          C,
          de(
            { matches: w, loaderData: {}, errors: H && et(H[1]) ? { [H[0]]: H[1].error } : null },
            Jc(H),
            Z ? { fetchers: new Map(m.fetchers) } : {}
          ),
          { flushSync: M }
        ),
        { shortCircuited: !0 }
      );
    }
    if (Le) {
      let Z = {};
      if (!R) {
        Z.navigation = W;
        let ve = gu(H);
        ve !== void 0 && (Z.actionData = ve);
      }
      me.length > 0 && (Z.fetchers = gh(me)), He(Z, { flushSync: M });
    }
    me.forEach((Z) => {
      Wt(Z.key), Z.controller && Ae.set(Z.key, Z.controller);
    });
    let Yn = () => me.forEach((Z) => Wt(Z.key));
    j && j.signal.addEventListener("abort", Yn);
    let { loaderResults: Rr, fetcherResults: Ut } = await pu(m, w, ee, me, h);
    if (h.signal.aborted) return { shortCircuited: !0 };
    j && j.signal.removeEventListener("abort", Yn), me.forEach((Z) => Ae.delete(Z.key));
    let St = $i(Rr);
    if (St) return await En(h, St.result, !0, { replace: O }), { shortCircuited: !0 };
    if (((St = $i(Ut)), St))
      return $.add(St.key), await En(h, St.result, !0, { replace: O }), { shortCircuited: !0 };
    let { loaderData: Bl, errors: Ir } = Kc(m, w, Rr, H, me, Ut, At);
    At.forEach((Z, ve) => {
      Z.subscribe((Vn) => {
        (Vn || Z.done) && At.delete(ve);
      });
    }),
      f.v7_partialHydration && F && m.errors && (Ir = de({}, m.errors, Ir));
    let wn = yu(),
      Pi = Cu(b),
      Ti = wn || Pi || me.length > 0;
    return de(
      { matches: w, loaderData: Bl, errors: Ir },
      Ti ? { fetchers: new Map(m.fetchers) } : {}
    );
  }
  function gu(h) {
    if (h && !et(h[1])) return { [h[0]]: h[1].data };
    if (m.actionData) return Object.keys(m.actionData).length === 0 ? null : m.actionData;
  }
  function gh(h) {
    return (
      h.forEach((C) => {
        let w = m.fetchers.get(C.key),
          R = jr(void 0, w ? w.data : void 0);
        m.fetchers.set(C.key, R);
      }),
      new Map(m.fetchers)
    );
  }
  function ph(h, C, w, R) {
    if (r)
      throw new Error(
        "router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback."
      );
    Wt(h);
    let T = (R && R.flushSync) === !0,
      z = s || l,
      V = _s(
        m.location,
        m.matches,
        a,
        f.v7_prependBasename,
        w,
        f.v7_relativeSplatPath,
        C,
        R == null ? void 0 : R.relative
      ),
      O = kn(z, V, a),
      F = Ni(O, z, V);
    if ((F.active && F.matches && (O = F.matches), !O)) {
      Nt(h, C, We(404, { pathname: V }), { flushSync: T });
      return;
    }
    let { path: M, submission: H, error: W } = jc(f.v7_normalizeFormMethod, !0, V, R);
    if (W) {
      Nt(h, C, W, { flushSync: T });
      return;
    }
    let X = Kr(O, M),
      Le = (R && R.preventScrollReset) === !0;
    if (H && mt(H.formMethod)) {
      mh(h, C, M, X, O, F.active, T, Le, H);
      return;
    }
    se.set(h, { routeId: C, path: M }), vh(h, C, M, X, O, F.active, T, Le, H);
  }
  async function mh(h, C, w, R, T, z, V, O, F) {
    Cl(), se.delete(h);
    function M(we) {
      if (!we.route.action && !we.route.lazy) {
        let Gn = We(405, { method: F.formMethod, pathname: w, routeId: C });
        return Nt(h, C, Gn, { flushSync: V }), !0;
      }
      return !1;
    }
    if (!z && M(R)) return;
    let H = m.fetchers.get(h);
    Kt(h, Wm(F, H), { flushSync: V });
    let W = new AbortController(),
      X = Wn(e.history, w, W.signal, F);
    if (z) {
      let we = await Ui(T, w, X.signal);
      if (we.type === "aborted") return;
      if (we.type === "error") {
        Nt(h, C, we.error, { flushSync: V });
        return;
      } else if (we.matches) {
        if (((T = we.matches), (R = Kr(T, w)), M(R))) return;
      } else {
        Nt(h, C, We(404, { pathname: w }), { flushSync: V });
        return;
      }
    }
    Ae.set(h, W);
    let Le = N,
      ee = (await Qr("action", m, X, [R], T, h))[R.route.id];
    if (X.signal.aborted) {
      Ae.get(h) === W && Ae.delete(h);
      return;
    }
    if (f.v7_fetcherPersist && xe.has(h)) {
      if (xn(ee) || et(ee)) {
        Kt(h, Xt(void 0));
        return;
      }
    } else {
      if (xn(ee))
        if ((Ae.delete(h), b > Le)) {
          Kt(h, Xt(void 0));
          return;
        } else
          return (
            $.add(h), Kt(h, jr(F)), En(X, ee, !1, { fetcherSubmission: F, preventScrollReset: O })
          );
      if (et(ee)) {
        Nt(h, C, ee.error);
        return;
      }
    }
    if (nn(ee)) throw We(400, { type: "defer-action" });
    let me = m.navigation.location || m.location,
      Yn = Wn(e.history, me, W.signal),
      Rr = s || l,
      Ut = m.navigation.state !== "idle" ? kn(Rr, m.navigation.location, a) : m.matches;
    G(Ut, "Didn't find any matches after fetcher action");
    let St = ++N;
    Y.set(h, St);
    let Bl = jr(F, ee.data);
    m.fetchers.set(h, Bl);
    let [Ir, wn] = Hc(
      e.history,
      m,
      Ut,
      F,
      me,
      !1,
      f.v7_skipActionErrorRevalidation,
      te,
      Te,
      Ke,
      xe,
      se,
      $,
      Rr,
      a,
      [R.route.id, ee]
    );
    wn
      .filter((we) => we.key !== h)
      .forEach((we) => {
        let Gn = we.key,
          ku = m.fetchers.get(Gn),
          kh = jr(void 0, ku ? ku.data : void 0);
        m.fetchers.set(Gn, kh), Wt(Gn), we.controller && Ae.set(Gn, we.controller);
      }),
      He({ fetchers: new Map(m.fetchers) });
    let Pi = () => wn.forEach((we) => Wt(we.key));
    W.signal.addEventListener("abort", Pi);
    let { loaderResults: Ti, fetcherResults: Z } = await pu(m, Ut, Ir, wn, Yn);
    if (W.signal.aborted) return;
    W.signal.removeEventListener("abort", Pi),
      Y.delete(h),
      Ae.delete(h),
      wn.forEach((we) => Ae.delete(we.key));
    let ve = $i(Ti);
    if (ve) return En(Yn, ve.result, !1, { preventScrollReset: O });
    if (((ve = $i(Z)), ve)) return $.add(ve.key), En(Yn, ve.result, !1, { preventScrollReset: O });
    let { loaderData: Vn, errors: Dr } = Kc(m, Ut, Ti, void 0, wn, Z, At);
    if (m.fetchers.has(h)) {
      let we = Xt(ee.data);
      m.fetchers.set(h, we);
    }
    Cu(St),
      m.navigation.state === "loading" && St > b
        ? (G(L, "Expected pending action"),
          j && j.abort(),
          bn(m.navigation.location, {
            matches: Ut,
            loaderData: Vn,
            errors: Dr,
            fetchers: new Map(m.fetchers),
          }))
        : (He({
            errors: Dr,
            loaderData: Wc(m.loaderData, Vn, Ut, Dr),
            fetchers: new Map(m.fetchers),
          }),
          (te = !1));
  }
  async function vh(h, C, w, R, T, z, V, O, F) {
    let M = m.fetchers.get(h);
    Kt(h, jr(F, M ? M.data : void 0), { flushSync: V });
    let H = new AbortController(),
      W = Wn(e.history, w, H.signal);
    if (z) {
      let ee = await Ui(T, w, W.signal);
      if (ee.type === "aborted") return;
      if (ee.type === "error") {
        Nt(h, C, ee.error, { flushSync: V });
        return;
      } else if (ee.matches) (T = ee.matches), (R = Kr(T, w));
      else {
        Nt(h, C, We(404, { pathname: w }), { flushSync: V });
        return;
      }
    }
    Ae.set(h, H);
    let X = N,
      oe = (await Qr("loader", m, W, [R], T, h))[R.route.id];
    if (
      (nn(oe) && (oe = (await iu(oe, W.signal, !0)) || oe),
      Ae.get(h) === H && Ae.delete(h),
      !W.signal.aborted)
    ) {
      if (xe.has(h)) {
        Kt(h, Xt(void 0));
        return;
      }
      if (xn(oe))
        if (b > X) {
          Kt(h, Xt(void 0));
          return;
        } else {
          $.add(h), await En(W, oe, !1, { preventScrollReset: O });
          return;
        }
      if (et(oe)) {
        Nt(h, C, oe.error);
        return;
      }
      G(!nn(oe), "Unhandled fetcher deferred data"), Kt(h, Xt(oe.data));
    }
  }
  async function En(h, C, w, R) {
    let {
      submission: T,
      fetcherSubmission: z,
      preventScrollReset: V,
      replace: O,
    } = R === void 0 ? {} : R;
    C.response.headers.has("X-Remix-Revalidate") && (te = !0);
    let F = C.response.headers.get("Location");
    G(F, "Expected a Location header on the redirect Response"), (F = Vc(F, new URL(h.url), a));
    let M = Ei(m.location, F, { _isRedirect: !0 });
    if (n) {
      let ee = !1;
      if (C.response.headers.has("X-Remix-Reload-Document")) ee = !0;
      else if (ru.test(F)) {
        const me = e.history.createURL(F);
        ee = me.origin !== t.location.origin || Di(me.pathname, a) == null;
      }
      if (ee) {
        O ? t.location.replace(F) : t.location.assign(F);
        return;
      }
    }
    j = null;
    let H = O === !0 || C.response.headers.has("X-Remix-Replace") ? Ce.Replace : Ce.Push,
      { formMethod: W, formAction: X, formEncType: Le } = m.navigation;
    !T && !z && W && X && Le && (T = _c(m.navigation));
    let oe = T || z;
    if (Rm.has(C.response.status) && oe && mt(oe.formMethod))
      await Cn(H, M, {
        submission: de({}, oe, { formAction: F }),
        preventScrollReset: V || I,
        enableViewTransition: w ? P : void 0,
      });
    else {
      let ee = Zl(M, T);
      await Cn(H, M, {
        overrideNavigation: ee,
        fetcherSubmission: z,
        preventScrollReset: V || I,
        enableViewTransition: w ? P : void 0,
      });
    }
  }
  async function Qr(h, C, w, R, T, z) {
    let V,
      O = {};
    try {
      V = await Tm(u, h, C, w, R, T, z, o, i);
    } catch (F) {
      return (
        R.forEach((M) => {
          O[M.route.id] = { type: re.error, error: F };
        }),
        O
      );
    }
    for (let [F, M] of Object.entries(V))
      if (Hm(M)) {
        let H = M.result;
        O[F] = { type: re.redirect, response: Fm(H, w, F, T, a, f.v7_relativeSplatPath) };
      } else O[F] = await Om(M);
    return O;
  }
  async function pu(h, C, w, R, T) {
    let z = h.matches,
      V = Qr("loader", h, T, w, C, null),
      O = Promise.all(
        R.map(async (H) => {
          if (H.matches && H.match && H.controller) {
            let X = (
              await Qr(
                "loader",
                h,
                Wn(e.history, H.path, H.controller.signal),
                [H.match],
                H.matches,
                H.key
              )
            )[H.match.route.id];
            return { [H.key]: X };
          } else
            return Promise.resolve({
              [H.key]: { type: re.error, error: We(404, { pathname: H.path }) },
            });
        })
      ),
      F = await V,
      M = (await O).reduce((H, W) => Object.assign(H, W), {});
    return (
      await Promise.all([Vm(C, F, T.signal, z, h.loaderData), Gm(C, M, R)]),
      { loaderResults: F, fetcherResults: M }
    );
  }
  function Cl() {
    (te = !0),
      Te.push(...wl()),
      se.forEach((h, C) => {
        Ae.has(C) && Ke.add(C), Wt(C);
      });
  }
  function Kt(h, C, w) {
    w === void 0 && (w = {}),
      m.fetchers.set(h, C),
      He({ fetchers: new Map(m.fetchers) }, { flushSync: (w && w.flushSync) === !0 });
  }
  function Nt(h, C, w, R) {
    R === void 0 && (R = {});
    let T = Qn(m.matches, C);
    xi(h),
      He(
        { errors: { [T.route.id]: w }, fetchers: new Map(m.fetchers) },
        { flushSync: (R && R.flushSync) === !0 }
      );
  }
  function mu(h) {
    return (
      f.v7_fetcherPersist && (Bt.set(h, (Bt.get(h) || 0) + 1), xe.has(h) && xe.delete(h)),
      m.fetchers.get(h) || Im
    );
  }
  function xi(h) {
    let C = m.fetchers.get(h);
    Ae.has(h) && !(C && C.state === "loading" && Y.has(h)) && Wt(h),
      se.delete(h),
      Y.delete(h),
      $.delete(h),
      xe.delete(h),
      Ke.delete(h),
      m.fetchers.delete(h);
  }
  function yh(h) {
    if (f.v7_fetcherPersist) {
      let C = (Bt.get(h) || 0) - 1;
      C <= 0 ? (Bt.delete(h), xe.add(h)) : Bt.set(h, C);
    } else xi(h);
    He({ fetchers: new Map(m.fetchers) });
  }
  function Wt(h) {
    let C = Ae.get(h);
    C && (C.abort(), Ae.delete(h));
  }
  function vu(h) {
    for (let C of h) {
      let w = mu(C),
        R = Xt(w.data);
      m.fetchers.set(C, R);
    }
  }
  function yu() {
    let h = [],
      C = !1;
    for (let w of $) {
      let R = m.fetchers.get(w);
      G(R, "Expected fetcher: " + w), R.state === "loading" && ($.delete(w), h.push(w), (C = !0));
    }
    return vu(h), C;
  }
  function Cu(h) {
    let C = [];
    for (let [w, R] of Y)
      if (R < h) {
        let T = m.fetchers.get(w);
        G(T, "Expected fetcher: " + w), T.state === "loading" && (Wt(w), Y.delete(w), C.push(w));
      }
    return vu(C), C.length > 0;
  }
  function Ch(h, C) {
    let w = m.blockers.get(h) || Fr;
    return ze.get(h) !== C && ze.set(h, C), w;
  }
  function Eu(h) {
    m.blockers.delete(h), ze.delete(h);
  }
  function Li(h, C) {
    let w = m.blockers.get(h) || Fr;
    G(
      (w.state === "unblocked" && C.state === "blocked") ||
        (w.state === "blocked" && C.state === "blocked") ||
        (w.state === "blocked" && C.state === "proceeding") ||
        (w.state === "blocked" && C.state === "unblocked") ||
        (w.state === "proceeding" && C.state === "unblocked"),
      "Invalid blocker state transition: " + w.state + " -> " + C.state
    );
    let R = new Map(m.blockers);
    R.set(h, C), He({ blockers: R });
  }
  function wu(h) {
    let { currentLocation: C, nextLocation: w, historyAction: R } = h;
    if (ze.size === 0) return;
    ze.size > 1 && Er(!1, "A router only supports one blocker at a time");
    let T = Array.from(ze.entries()),
      [z, V] = T[T.length - 1],
      O = m.blockers.get(z);
    if (
      !(O && O.state === "proceeding") &&
      V({ currentLocation: C, nextLocation: w, historyAction: R })
    )
      return z;
  }
  function El(h) {
    let C = We(404, { pathname: h }),
      w = s || l,
      { matches: R, route: T } = Xc(w);
    return wl(), { notFoundMatches: R, route: T, error: C };
  }
  function wl(h) {
    let C = [];
    return (
      At.forEach((w, R) => {
        (!h || h(R)) && (w.cancel(), C.push(R), At.delete(R));
      }),
      C
    );
  }
  function Eh(h, C, w) {
    if (((S = h), (D = C), (B = w || null), !g && m.navigation === _l)) {
      g = !0;
      let R = Su(m.location, m.matches);
      R != null && He({ restoreScrollPosition: R });
    }
    return () => {
      (S = null), (D = null), (B = null);
    };
  }
  function Bu(h, C) {
    return (
      (B &&
        B(
          h,
          C.map((R) => om(R, m.loaderData))
        )) ||
      h.key
    );
  }
  function wh(h, C) {
    if (S && D) {
      let w = Bu(h, C);
      S[w] = D();
    }
  }
  function Su(h, C) {
    if (S) {
      let w = Bu(h, C),
        R = S[w];
      if (typeof R == "number") return R;
    }
    return null;
  }
  function Ni(h, C, w) {
    if (d)
      if (h) {
        if (Object.keys(h[0].params).length > 0) return { active: !0, matches: po(C, w, a, !0) };
      } else return { active: !0, matches: po(C, w, a, !0) || [] };
    return { active: !1, matches: null };
  }
  async function Ui(h, C, w) {
    if (!d) return { type: "success", matches: h };
    let R = h;
    for (;;) {
      let T = s == null,
        z = s || l,
        V = o;
      try {
        await d({
          path: C,
          matches: R,
          patch: (M, H) => {
            w.aborted || Yc(M, H, z, V, i);
          },
        });
      } catch (M) {
        return { type: "error", error: M, partialMatches: R };
      } finally {
        T && !w.aborted && (l = [...l]);
      }
      if (w.aborted) return { type: "aborted" };
      let O = kn(z, C, a);
      if (O) return { type: "success", matches: O };
      let F = po(z, C, a, !0);
      if (!F || (R.length === F.length && R.every((M, H) => M.route.id === F[H].route.id)))
        return { type: "success", matches: null };
      R = F;
    }
  }
  function Bh(h) {
    (o = {}), (s = Ko(h, i, void 0, o));
  }
  function Sh(h, C) {
    let w = s == null;
    Yc(h, C, s || l, o, i), w && ((l = [...l]), He({}));
  }
  return (
    (Q = {
      get basename() {
        return a;
      },
      get future() {
        return f;
      },
      get state() {
        return m;
      },
      get routes() {
        return l;
      },
      get window() {
        return t;
      },
      initialize: uh,
      subscribe: dh,
      enableScrollRestoration: Eh,
      navigate: hu,
      fetch: ph,
      revalidate: fh,
      createHref: (h) => e.history.createHref(h),
      encodeLocation: (h) => e.history.encodeLocation(h),
      getFetcher: mu,
      deleteFetcher: yh,
      dispose: ch,
      getBlocker: Ch,
      deleteBlocker: Eu,
      patchRoutes: Sh,
      _internalFetchControllers: Ae,
      _internalActiveDeferreds: At,
      _internalSetRoutes: Bh,
    }),
    Q
  );
}
function Lm(e) {
  return (
    e != null && (("formData" in e && e.formData != null) || ("body" in e && e.body !== void 0))
  );
}
function _s(e, t, n, r, i, o, l, s) {
  let a, u;
  if (l) {
    a = [];
    for (let f of t)
      if ((a.push(f), f.route.id === l)) {
        u = f;
        break;
      }
  } else (a = t), (u = t[t.length - 1]);
  let d = xA(i || ".", DA(a, o), Di(e.pathname, n) || e.pathname, s === "path");
  if (
    (i == null && ((d.search = e.search), (d.hash = e.hash)),
    (i == null || i === "" || i === ".") && u)
  ) {
    let f = ou(d.search);
    if (u.route.index && !f) d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index";
    else if (!u.route.index && f) {
      let A = new URLSearchParams(d.search),
        y = A.getAll("index");
      A.delete("index"), y.filter((B) => B).forEach((B) => A.append("index", B));
      let S = A.toString();
      d.search = S ? "?" + S : "";
    }
  }
  return r && n !== "/" && (d.pathname = d.pathname === "/" ? n : fn([n, d.pathname])), Ii(d);
}
function jc(e, t, n, r) {
  if (!r || !Lm(r)) return { path: n };
  if (r.formMethod && !Ym(r.formMethod))
    return { path: n, error: We(405, { method: r.formMethod }) };
  let i = () => ({ path: n, error: We(400, { type: "invalid-body" }) }),
    o = r.formMethod || "get",
    l = e ? o.toUpperCase() : o.toLowerCase(),
    s = TA(n);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!mt(l)) return i();
      let A =
        typeof r.body == "string"
          ? r.body
          : r.body instanceof FormData || r.body instanceof URLSearchParams
          ? Array.from(r.body.entries()).reduce((y, S) => {
              let [B, D] = S;
              return (
                "" +
                y +
                B +
                "=" +
                D +
                `
`
              );
            }, "")
          : String(r.body);
      return {
        path: n,
        submission: {
          formMethod: l,
          formAction: s,
          formEncType: r.formEncType,
          formData: void 0,
          json: void 0,
          text: A,
        },
      };
    } else if (r.formEncType === "application/json") {
      if (!mt(l)) return i();
      try {
        let A = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: n,
          submission: {
            formMethod: l,
            formAction: s,
            formEncType: r.formEncType,
            formData: void 0,
            json: A,
            text: void 0,
          },
        };
      } catch {
        return i();
      }
    }
  }
  G(typeof FormData == "function", "FormData is not available in this environment");
  let a, u;
  if (r.formData) (a = $s(r.formData)), (u = r.formData);
  else if (r.body instanceof FormData) (a = $s(r.body)), (u = r.body);
  else if (r.body instanceof URLSearchParams) (a = r.body), (u = Gc(a));
  else if (r.body == null) (a = new URLSearchParams()), (u = new FormData());
  else
    try {
      (a = new URLSearchParams(r.body)), (u = Gc(a));
    } catch {
      return i();
    }
  let d = {
    formMethod: l,
    formAction: s,
    formEncType: (r && r.formEncType) || "application/x-www-form-urlencoded",
    formData: u,
    json: void 0,
    text: void 0,
  };
  if (mt(d.formMethod)) return { path: n, submission: d };
  let f = Gt(n);
  return (
    t && f.search && ou(f.search) && a.append("index", ""),
    (f.search = "?" + a),
    { path: Ii(f), submission: d }
  );
}
function zc(e, t, n) {
  n === void 0 && (n = !1);
  let r = e.findIndex((i) => i.route.id === t);
  return r >= 0 ? e.slice(0, n ? r + 1 : r) : e;
}
function Hc(e, t, n, r, i, o, l, s, a, u, d, f, A, y, S, B) {
  let D = B ? (et(B[1]) ? B[1].error : B[1].data) : void 0,
    g = e.createURL(t.location),
    c = e.createURL(i),
    p = n;
  o && t.errors ? (p = zc(n, Object.keys(t.errors)[0], !0)) : B && et(B[1]) && (p = zc(n, B[0]));
  let k = B ? B[1].statusCode : void 0,
    Q = l && k && k >= 400,
    m = p.filter((I, j) => {
      let { route: P } = I;
      if (P.lazy) return !0;
      if (P.loader == null) return !1;
      if (o) return Zs(P, t.loaderData, t.errors);
      if (Nm(t.loaderData, t.matches[j], I) || a.some((ce) => ce === I.route.id)) return !0;
      let _ = t.matches[j],
        ie = I;
      return bc(
        I,
        de({ currentUrl: g, currentParams: _.params, nextUrl: c, nextParams: ie.params }, r, {
          actionResult: D,
          actionStatus: k,
          defaultShouldRevalidate: Q
            ? !1
            : s ||
              g.pathname + g.search === c.pathname + c.search ||
              g.search !== c.search ||
              UA(_, ie),
        })
      );
    }),
    L = [];
  return (
    f.forEach((I, j) => {
      if (o || !n.some((te) => te.route.id === I.routeId) || d.has(j)) return;
      let P = kn(y, I.path, S);
      if (!P) {
        L.push({
          key: j,
          routeId: I.routeId,
          path: I.path,
          matches: null,
          match: null,
          controller: null,
        });
        return;
      }
      let _ = t.fetchers.get(j),
        ie = Kr(P, I.path),
        ce = !1;
      A.has(j)
        ? (ce = !1)
        : u.has(j)
        ? (u.delete(j), (ce = !0))
        : _ && _.state !== "idle" && _.data === void 0
        ? (ce = s)
        : (ce = bc(
            ie,
            de(
              {
                currentUrl: g,
                currentParams: t.matches[t.matches.length - 1].params,
                nextUrl: c,
                nextParams: n[n.length - 1].params,
              },
              r,
              { actionResult: D, actionStatus: k, defaultShouldRevalidate: Q ? !1 : s }
            )
          )),
        ce &&
          L.push({
            key: j,
            routeId: I.routeId,
            path: I.path,
            matches: P,
            match: ie,
            controller: new AbortController(),
          });
    }),
    [m, L]
  );
}
function Zs(e, t, n) {
  if (e.lazy) return !0;
  if (!e.loader) return !1;
  let r = t != null && t[e.id] !== void 0,
    i = n != null && n[e.id] !== void 0;
  return !r && i ? !1 : typeof e.loader == "function" && e.loader.hydrate === !0 ? !0 : !r && !i;
}
function Nm(e, t, n) {
  let r = !t || n.route.id !== t.route.id,
    i = e[n.route.id] === void 0;
  return r || i;
}
function UA(e, t) {
  let n = e.route.path;
  return (
    e.pathname !== t.pathname || (n != null && n.endsWith("*") && e.params["*"] !== t.params["*"])
  );
}
function bc(e, t) {
  if (e.route.shouldRevalidate) {
    let n = e.route.shouldRevalidate(t);
    if (typeof n == "boolean") return n;
  }
  return t.defaultShouldRevalidate;
}
function Yc(e, t, n, r, i) {
  var o;
  let l;
  if (e) {
    let u = r[e];
    G(u, "No route found to patch children into: routeId = " + e),
      u.children || (u.children = []),
      (l = u.children);
  } else l = n;
  let s = t.filter((u) => !l.some((d) => PA(u, d))),
    a = Ko(s, i, [e || "_", "patch", String(((o = l) == null ? void 0 : o.length) || "0")], r);
  l.push(...a);
}
function PA(e, t) {
  return "id" in e && "id" in t && e.id === t.id
    ? !0
    : e.index === t.index && e.path === t.path && e.caseSensitive === t.caseSensitive
    ? (!e.children || e.children.length === 0) && (!t.children || t.children.length === 0)
      ? !0
      : e.children.every((n, r) => {
          var i;
          return (i = t.children) == null ? void 0 : i.some((o) => PA(n, o));
        })
    : !1;
}
async function Um(e, t, n) {
  if (!e.lazy) return;
  let r = await e.lazy();
  if (!e.lazy) return;
  let i = n[e.id];
  G(i, "No route found in manifest");
  let o = {};
  for (let l in r) {
    let a = i[l] !== void 0 && l !== "hasErrorBoundary";
    Er(
      !a,
      'Route "' +
        i.id +
        '" has a static property "' +
        l +
        '" defined but its lazy function is also returning a value for this property. ' +
        ('The lazy route property "' + l + '" will be ignored.')
    ),
      !a && !rm.has(l) && (o[l] = r[l]);
  }
  Object.assign(i, o), Object.assign(i, de({}, t(i), { lazy: void 0 }));
}
async function Pm(e) {
  let { matches: t } = e,
    n = t.filter((i) => i.shouldLoad);
  return (await Promise.all(n.map((i) => i.resolve()))).reduce(
    (i, o, l) => Object.assign(i, { [n[l].route.id]: o }),
    {}
  );
}
async function Tm(e, t, n, r, i, o, l, s, a, u) {
  let d = o.map((y) => (y.route.lazy ? Um(y.route, a, s) : void 0)),
    f = o.map((y, S) => {
      let B = d[S],
        D = i.some((c) => c.route.id === y.route.id);
      return de({}, y, {
        shouldLoad: D,
        resolve: async (c) => (
          c && r.method === "GET" && (y.route.lazy || y.route.loader) && (D = !0),
          D ? Mm(t, r, y, B, c, u) : Promise.resolve({ type: re.data, result: void 0 })
        ),
      });
    }),
    A = await e({ matches: f, request: r, params: o[0].params, fetcherKey: l, context: u });
  try {
    await Promise.all(d);
  } catch {}
  return A;
}
async function Mm(e, t, n, r, i, o) {
  let l,
    s,
    a = (u) => {
      let d,
        f = new Promise((S, B) => (d = B));
      (s = () => d()), t.signal.addEventListener("abort", s);
      let A = (S) =>
          typeof u != "function"
            ? Promise.reject(
                new Error(
                  "You cannot call the handler for a route which defines a boolean " +
                    ('"' + e + '" [routeId: ' + n.route.id + "]")
                )
              )
            : u({ request: t, params: n.params, context: o }, ...(S !== void 0 ? [S] : [])),
        y = (async () => {
          try {
            return { type: "data", result: await (i ? i((B) => A(B)) : A()) };
          } catch (S) {
            return { type: "error", result: S };
          }
        })();
      return Promise.race([y, f]);
    };
  try {
    let u = n.route[e];
    if (r)
      if (u) {
        let d,
          [f] = await Promise.all([
            a(u).catch((A) => {
              d = A;
            }),
            r,
          ]);
        if (d !== void 0) throw d;
        l = f;
      } else if ((await r, (u = n.route[e]), u)) l = await a(u);
      else if (e === "action") {
        let d = new URL(t.url),
          f = d.pathname + d.search;
        throw We(405, { method: t.method, pathname: f, routeId: n.route.id });
      } else return { type: re.data, result: void 0 };
    else if (u) l = await a(u);
    else {
      let d = new URL(t.url),
        f = d.pathname + d.search;
      throw We(404, { pathname: f });
    }
    G(
      l.result !== void 0,
      "You defined " +
        (e === "action" ? "an action" : "a loader") +
        " for route " +
        ('"' + n.route.id + "\" but didn't return anything from your `" + e + "` ") +
        "function. Please return a value or `null`."
    );
  } catch (u) {
    return { type: re.error, result: u };
  } finally {
    s && t.signal.removeEventListener("abort", s);
  }
  return l;
}
async function Om(e) {
  let { result: t, type: n } = e;
  if (MA(t)) {
    let u;
    try {
      let d = t.headers.get("Content-Type");
      d && /\bapplication\/json\b/.test(d)
        ? t.body == null
          ? (u = null)
          : (u = await t.json())
        : (u = await t.text());
    } catch (d) {
      return { type: re.error, error: d };
    }
    return n === re.error
      ? {
          type: re.error,
          error: new Wo(t.status, t.statusText, u),
          statusCode: t.status,
          headers: t.headers,
        }
      : { type: re.data, data: u, statusCode: t.status, headers: t.headers };
  }
  if (n === re.error) {
    if (qc(t)) {
      var r;
      if (t.data instanceof Error) {
        var i;
        return {
          type: re.error,
          error: t.data,
          statusCode: (i = t.init) == null ? void 0 : i.status,
        };
      }
      t = new Wo(((r = t.init) == null ? void 0 : r.status) || 500, void 0, t.data);
    }
    return { type: re.error, error: t, statusCode: Al(t) ? t.status : void 0 };
  }
  if (bm(t)) {
    var o, l;
    return {
      type: re.deferred,
      deferredData: t,
      statusCode: (o = t.init) == null ? void 0 : o.status,
      headers: ((l = t.init) == null ? void 0 : l.headers) && new Headers(t.init.headers),
    };
  }
  if (qc(t)) {
    var s, a;
    return {
      type: re.data,
      data: t.data,
      statusCode: (s = t.init) == null ? void 0 : s.status,
      headers: (a = t.init) != null && a.headers ? new Headers(t.init.headers) : void 0,
    };
  }
  return { type: re.data, data: t };
}
function Fm(e, t, n, r, i, o) {
  let l = e.headers.get("Location");
  if (
    (G(l, "Redirects returned/thrown from loaders/actions must have a Location header"),
    !ru.test(l))
  ) {
    let s = r.slice(0, r.findIndex((a) => a.route.id === n) + 1);
    (l = _s(new URL(t.url), s, i, !0, l, o)), e.headers.set("Location", l);
  }
  return e;
}
function Vc(e, t, n) {
  if (ru.test(e)) {
    let r = e,
      i = r.startsWith("//") ? new URL(t.protocol + r) : new URL(r),
      o = Di(i.pathname, n) != null;
    if (i.origin === t.origin && o) return i.pathname + i.search + i.hash;
  }
  return e;
}
function Wn(e, t, n, r) {
  let i = e.createURL(TA(t)).toString(),
    o = { signal: n };
  if (r && mt(r.formMethod)) {
    let { formMethod: l, formEncType: s } = r;
    (o.method = l.toUpperCase()),
      s === "application/json"
        ? ((o.headers = new Headers({ "Content-Type": s })), (o.body = JSON.stringify(r.json)))
        : s === "text/plain"
        ? (o.body = r.text)
        : s === "application/x-www-form-urlencoded" && r.formData
        ? (o.body = $s(r.formData))
        : (o.body = r.formData);
  }
  return new Request(i, o);
}
function $s(e) {
  let t = new URLSearchParams();
  for (let [n, r] of e.entries()) t.append(n, typeof r == "string" ? r : r.name);
  return t;
}
function Gc(e) {
  let t = new FormData();
  for (let [n, r] of e.entries()) t.append(n, r);
  return t;
}
function jm(e, t, n, r, i) {
  let o = {},
    l = null,
    s,
    a = !1,
    u = {},
    d = n && et(n[1]) ? n[1].error : void 0;
  return (
    e.forEach((f) => {
      if (!(f.route.id in t)) return;
      let A = f.route.id,
        y = t[A];
      if ((G(!xn(y), "Cannot handle redirect results in processLoaderData"), et(y))) {
        let S = y.error;
        if ((d !== void 0 && ((S = d), (d = void 0)), (l = l || {}), i)) l[A] = S;
        else {
          let B = Qn(e, A);
          l[B.route.id] == null && (l[B.route.id] = S);
        }
        (o[A] = void 0),
          a || ((a = !0), (s = Al(y.error) ? y.error.status : 500)),
          y.headers && (u[A] = y.headers);
      } else
        nn(y)
          ? (r.set(A, y.deferredData),
            (o[A] = y.deferredData.data),
            y.statusCode != null && y.statusCode !== 200 && !a && (s = y.statusCode),
            y.headers && (u[A] = y.headers))
          : ((o[A] = y.data),
            y.statusCode && y.statusCode !== 200 && !a && (s = y.statusCode),
            y.headers && (u[A] = y.headers));
    }),
    d !== void 0 && n && ((l = { [n[0]]: d }), (o[n[0]] = void 0)),
    { loaderData: o, errors: l, statusCode: s || 200, loaderHeaders: u }
  );
}
function Kc(e, t, n, r, i, o, l) {
  let { loaderData: s, errors: a } = jm(t, n, r, l, !1);
  return (
    i.forEach((u) => {
      let { key: d, match: f, controller: A } = u,
        y = o[d];
      if ((G(y, "Did not find corresponding fetcher result"), !(A && A.signal.aborted)))
        if (et(y)) {
          let S = Qn(e.matches, f == null ? void 0 : f.route.id);
          (a && a[S.route.id]) || (a = de({}, a, { [S.route.id]: y.error })), e.fetchers.delete(d);
        } else if (xn(y)) G(!1, "Unhandled fetcher revalidation redirect");
        else if (nn(y)) G(!1, "Unhandled fetcher deferred data");
        else {
          let S = Xt(y.data);
          e.fetchers.set(d, S);
        }
    }),
    { loaderData: s, errors: a }
  );
}
function Wc(e, t, n, r) {
  let i = de({}, t);
  for (let o of n) {
    let l = o.route.id;
    if (
      (t.hasOwnProperty(l)
        ? t[l] !== void 0 && (i[l] = t[l])
        : e[l] !== void 0 && o.route.loader && (i[l] = e[l]),
      r && r.hasOwnProperty(l))
    )
      break;
  }
  return i;
}
function Jc(e) {
  return e ? (et(e[1]) ? { actionData: {} } : { actionData: { [e[0]]: e[1].data } }) : {};
}
function Qn(e, t) {
  return (
    (t ? e.slice(0, e.findIndex((r) => r.route.id === t) + 1) : [...e])
      .reverse()
      .find((r) => r.route.hasErrorBoundary === !0) || e[0]
  );
}
function Xc(e) {
  let t =
    e.length === 1
      ? e[0]
      : e.find((n) => n.index || !n.path || n.path === "/") || { id: "__shim-error-route__" };
  return { matches: [{ params: {}, pathname: "", pathnameBase: "", route: t }], route: t };
}
function We(e, t) {
  let { pathname: n, routeId: r, method: i, type: o, message: l } = t === void 0 ? {} : t,
    s = "Unknown Server Error",
    a = "Unknown @remix-run/router error";
  return (
    e === 400
      ? ((s = "Bad Request"),
        i && n && r
          ? (a =
              "You made a " +
              i +
              ' request to "' +
              n +
              '" but ' +
              ('did not provide a `loader` for route "' + r + '", ') +
              "so there is no way to handle the request.")
          : o === "defer-action"
          ? (a = "defer() is not supported in actions")
          : o === "invalid-body" && (a = "Unable to encode submission body"))
      : e === 403
      ? ((s = "Forbidden"), (a = 'Route "' + r + '" does not match URL "' + n + '"'))
      : e === 404
      ? ((s = "Not Found"), (a = 'No route matches URL "' + n + '"'))
      : e === 405 &&
        ((s = "Method Not Allowed"),
        i && n && r
          ? (a =
              "You made a " +
              i.toUpperCase() +
              ' request to "' +
              n +
              '" but ' +
              ('did not provide an `action` for route "' + r + '", ') +
              "so there is no way to handle the request.")
          : i && (a = 'Invalid request method "' + i.toUpperCase() + '"')),
    new Wo(e || 500, s, new Error(a), !0)
  );
}
function $i(e) {
  let t = Object.entries(e);
  for (let n = t.length - 1; n >= 0; n--) {
    let [r, i] = t[n];
    if (xn(i)) return { key: r, result: i };
  }
}
function TA(e) {
  let t = typeof e == "string" ? Gt(e) : e;
  return Ii(de({}, t, { hash: "" }));
}
function zm(e, t) {
  return e.pathname !== t.pathname || e.search !== t.search
    ? !1
    : e.hash === ""
    ? t.hash !== ""
    : e.hash === t.hash
    ? !0
    : t.hash !== "";
}
function Hm(e) {
  return MA(e.result) && Qm.has(e.result.status);
}
function nn(e) {
  return e.type === re.deferred;
}
function et(e) {
  return e.type === re.error;
}
function xn(e) {
  return (e && e.type) === re.redirect;
}
function qc(e) {
  return (
    typeof e == "object" &&
    e != null &&
    "type" in e &&
    "data" in e &&
    "init" in e &&
    e.type === "DataWithResponseInit"
  );
}
function bm(e) {
  let t = e;
  return (
    t &&
    typeof t == "object" &&
    typeof t.data == "object" &&
    typeof t.subscribe == "function" &&
    typeof t.cancel == "function" &&
    typeof t.resolveData == "function"
  );
}
function MA(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.headers == "object" &&
    typeof e.body < "u"
  );
}
function Ym(e) {
  return km.has(e.toLowerCase());
}
function mt(e) {
  return Bm.has(e.toLowerCase());
}
async function Vm(e, t, n, r, i) {
  let o = Object.entries(t);
  for (let l = 0; l < o.length; l++) {
    let [s, a] = o[l],
      u = e.find((A) => (A == null ? void 0 : A.route.id) === s);
    if (!u) continue;
    let d = r.find((A) => A.route.id === u.route.id),
      f = d != null && !UA(d, u) && (i && i[u.route.id]) !== void 0;
    nn(a) &&
      f &&
      (await iu(a, n, !1).then((A) => {
        A && (t[s] = A);
      }));
  }
}
async function Gm(e, t, n) {
  for (let r = 0; r < n.length; r++) {
    let { key: i, routeId: o, controller: l } = n[r],
      s = t[i];
    e.find((u) => (u == null ? void 0 : u.route.id) === o) &&
      nn(s) &&
      (G(l, "Expected an AbortController for revalidating fetcher deferred result"),
      await iu(s, l.signal, !0).then((u) => {
        u && (t[i] = u);
      }));
  }
}
async function iu(e, t, n) {
  if ((n === void 0 && (n = !1), !(await e.deferredData.resolveData(t)))) {
    if (n)
      try {
        return { type: re.data, data: e.deferredData.unwrappedData };
      } catch (i) {
        return { type: re.error, error: i };
      }
    return { type: re.data, data: e.deferredData.data };
  }
}
function ou(e) {
  return new URLSearchParams(e).getAll("index").some((t) => t === "");
}
function Kr(e, t) {
  let n = typeof t == "string" ? Gt(t).search : t.search;
  if (e[e.length - 1].route.index && ou(n || "")) return e[e.length - 1];
  let r = IA(e);
  return r[r.length - 1];
}
function _c(e) {
  let { formMethod: t, formAction: n, formEncType: r, text: i, formData: o, json: l } = e;
  if (!(!t || !n || !r)) {
    if (i != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: void 0,
        text: i,
      };
    if (o != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: o,
        json: void 0,
        text: void 0,
      };
    if (l !== void 0)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: l,
        text: void 0,
      };
  }
}
function Zl(e, t) {
  return t
    ? {
        state: "loading",
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text,
      }
    : {
        state: "loading",
        location: e,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
      };
}
function Km(e, t) {
  return {
    state: "submitting",
    location: e,
    formMethod: t.formMethod,
    formAction: t.formAction,
    formEncType: t.formEncType,
    formData: t.formData,
    json: t.json,
    text: t.text,
  };
}
function jr(e, t) {
  return e
    ? {
        state: "loading",
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t,
      }
    : {
        state: "loading",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: t,
      };
}
function Wm(e, t) {
  return {
    state: "submitting",
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
    data: t ? t.data : void 0,
  };
}
function Xt(e) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: e,
  };
}
function Jm(e, t) {
  try {
    let n = e.sessionStorage.getItem(NA);
    if (n) {
      let r = JSON.parse(n);
      for (let [i, o] of Object.entries(r || {}))
        o && Array.isArray(o) && t.set(i, new Set(o || []));
    }
  } catch {}
}
function Xm(e, t) {
  if (t.size > 0) {
    let n = {};
    for (let [r, i] of t) n[r] = [...i];
    try {
      e.sessionStorage.setItem(NA, JSON.stringify(n));
    } catch (r) {
      Er(!1, "Failed to save applied view transitions in sessionStorage (" + r + ").");
    }
  }
}
/**
 * React Router v6.28.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function wi() {
  return (
    (wi = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    wi.apply(this, arguments)
  );
}
const hl = E.createContext(null),
  OA = E.createContext(null),
  gl = E.createContext(null),
  pl = E.createContext(null),
  yn = E.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  FA = E.createContext(null);
function ml() {
  return E.useContext(pl) != null;
}
function jA() {
  return ml() || G(!1), E.useContext(pl).location;
}
function zA(e) {
  E.useContext(gl).static || E.useLayoutEffect(e);
}
function HA() {
  let { isDataRoute: e } = E.useContext(yn);
  return e ? uv() : qm();
}
function qm() {
  ml() || G(!1);
  let e = E.useContext(hl),
    { basename: t, future: n, navigator: r } = E.useContext(gl),
    { matches: i } = E.useContext(yn),
    { pathname: o } = jA(),
    l = JSON.stringify(DA(i, n.v7_relativeSplatPath)),
    s = E.useRef(!1);
  return (
    zA(() => {
      s.current = !0;
    }),
    E.useCallback(
      function (u, d) {
        if ((d === void 0 && (d = {}), !s.current)) return;
        if (typeof u == "number") {
          r.go(u);
          return;
        }
        let f = xA(u, JSON.parse(l), o, d.relative === "path");
        e == null && t !== "/" && (f.pathname = f.pathname === "/" ? t : fn([t, f.pathname])),
          (d.replace ? r.replace : r.push)(f, d.state, d);
      },
      [t, r, l, o, e]
    )
  );
}
const _m = E.createContext(null);
function Zm(e) {
  let t = E.useContext(yn).outlet;
  return t && E.createElement(_m.Provider, { value: e }, t);
}
function bA() {
  let { matches: e } = E.useContext(yn),
    t = e[e.length - 1];
  return t ? t.params : {};
}
function $m(e, t, n, r) {
  ml() || G(!1);
  let { navigator: i } = E.useContext(gl),
    { matches: o } = E.useContext(yn),
    l = o[o.length - 1],
    s = l ? l.params : {};
  l && l.pathname;
  let a = l ? l.pathnameBase : "/";
  l && l.route;
  let u = jA(),
    d;
  if (t) {
    var f;
    let D = typeof t == "string" ? Gt(t) : t;
    a === "/" || ((f = D.pathname) != null && f.startsWith(a)) || G(!1), (d = D);
  } else d = u;
  let A = d.pathname || "/",
    y = A;
  if (a !== "/") {
    let D = a.replace(/^\//, "").split("/");
    y = "/" + A.replace(/^\//, "").split("/").slice(D.length).join("/");
  }
  let S = kn(e, { pathname: y }),
    B = iv(
      S &&
        S.map((D) =>
          Object.assign({}, D, {
            params: Object.assign({}, s, D.params),
            pathname: fn([
              a,
              i.encodeLocation ? i.encodeLocation(D.pathname).pathname : D.pathname,
            ]),
            pathnameBase:
              D.pathnameBase === "/"
                ? a
                : fn([
                    a,
                    i.encodeLocation ? i.encodeLocation(D.pathnameBase).pathname : D.pathnameBase,
                  ]),
          })
        ),
      o,
      n,
      r
    );
  return t && B
    ? E.createElement(
        pl.Provider,
        {
          value: {
            location: wi({ pathname: "/", search: "", hash: "", state: null, key: "default" }, d),
            navigationType: Ce.Pop,
          },
        },
        B
      )
    : B;
}
function ev() {
  let e = av(),
    t = Al(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    i = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" },
    o = null;
  return E.createElement(
    E.Fragment,
    null,
    E.createElement("h2", null, "Unexpected Application Error!"),
    E.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? E.createElement("pre", { style: i }, n) : null,
    o
  );
}
const tv = E.createElement(ev, null);
class nv extends E.Component {
  constructor(t) {
    super(t), (this.state = { location: t.location, revalidation: t.revalidation, error: t.error });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location || (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error("React Router caught the following error during render", t, n);
  }
  render() {
    return this.state.error !== void 0
      ? E.createElement(
          yn.Provider,
          { value: this.props.routeContext },
          E.createElement(FA.Provider, { value: this.state.error, children: this.props.component })
        )
      : this.props.children;
  }
}
function rv(e) {
  let { routeContext: t, match: n, children: r } = e,
    i = E.useContext(hl);
  return (
    i &&
      i.static &&
      i.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (i.staticContext._deepestRenderedBoundaryId = n.route.id),
    E.createElement(yn.Provider, { value: t }, r)
  );
}
function iv(e, t, n, r) {
  var i;
  if (
    (t === void 0 && (t = []), n === void 0 && (n = null), r === void 0 && (r = null), e == null)
  ) {
    var o;
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (
      (o = r) != null &&
      o.v7_partialHydration &&
      t.length === 0 &&
      !n.initialized &&
      n.matches.length > 0
    )
      e = n.matches;
    else return null;
  }
  let l = e,
    s = (i = n) == null ? void 0 : i.errors;
  if (s != null) {
    let d = l.findIndex((f) => f.route.id && (s == null ? void 0 : s[f.route.id]) !== void 0);
    d >= 0 || G(!1), (l = l.slice(0, Math.min(l.length, d + 1)));
  }
  let a = !1,
    u = -1;
  if (n && r && r.v7_partialHydration)
    for (let d = 0; d < l.length; d++) {
      let f = l[d];
      if (((f.route.HydrateFallback || f.route.hydrateFallbackElement) && (u = d), f.route.id)) {
        let { loaderData: A, errors: y } = n,
          S = f.route.loader && A[f.route.id] === void 0 && (!y || y[f.route.id] === void 0);
        if (f.route.lazy || S) {
          (a = !0), u >= 0 ? (l = l.slice(0, u + 1)) : (l = [l[0]]);
          break;
        }
      }
    }
  return l.reduceRight((d, f, A) => {
    let y,
      S = !1,
      B = null,
      D = null;
    n &&
      ((y = s && f.route.id ? s[f.route.id] : void 0),
      (B = f.route.errorElement || tv),
      a &&
        (u < 0 && A === 0
          ? (cv("route-fallback", !1), (S = !0), (D = null))
          : u === A && ((S = !0), (D = f.route.hydrateFallbackElement || null))));
    let g = t.concat(l.slice(0, A + 1)),
      c = () => {
        let p;
        return (
          y
            ? (p = B)
            : S
            ? (p = D)
            : f.route.Component
            ? (p = E.createElement(f.route.Component, null))
            : f.route.element
            ? (p = f.route.element)
            : (p = d),
          E.createElement(rv, {
            match: f,
            routeContext: { outlet: d, matches: g, isDataRoute: n != null },
            children: p,
          })
        );
      };
    return n && (f.route.ErrorBoundary || f.route.errorElement || A === 0)
      ? E.createElement(nv, {
          location: n.location,
          revalidation: n.revalidation,
          component: B,
          error: y,
          children: c(),
          routeContext: { outlet: null, matches: g, isDataRoute: !0 },
        })
      : c();
  }, null);
}
var YA = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(YA || {}),
  Jo = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(Jo || {});
function ov(e) {
  let t = E.useContext(hl);
  return t || G(!1), t;
}
function lv(e) {
  let t = E.useContext(OA);
  return t || G(!1), t;
}
function sv(e) {
  let t = E.useContext(yn);
  return t || G(!1), t;
}
function VA(e) {
  let t = sv(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || G(!1), n.route.id;
}
function av() {
  var e;
  let t = E.useContext(FA),
    n = lv(Jo.UseRouteError),
    r = VA(Jo.UseRouteError);
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function uv() {
  let { router: e } = ov(YA.UseNavigateStable),
    t = VA(Jo.UseNavigateStable),
    n = E.useRef(!1);
  return (
    zA(() => {
      n.current = !0;
    }),
    E.useCallback(
      function (i, o) {
        o === void 0 && (o = {}),
          n.current &&
            (typeof i == "number" ? e.navigate(i) : e.navigate(i, wi({ fromRouteId: t }, o)));
      },
      [e, t]
    )
  );
}
const Zc = {};
function cv(e, t, n) {
  !t && !Zc[e] && (Zc[e] = !0);
}
const $c = {};
function dv(e, t) {
  $c[t] || (($c[t] = !0), console.warn(t));
}
const Jn = (e, t, n) =>
  dv(
    e,
    "⚠️ React Router Future Flag Warning: " +
      t +
      ". " +
      ("You can use the `" + e + "` future flag to opt-in early. ") +
      ("For more information, see " + n + ".")
  );
function fv(e, t) {
  (e == null ? void 0 : e.v7_startTransition) === void 0 &&
    Jn(
      "v7_startTransition",
      "React Router will begin wrapping state updates in `React.startTransition` in v7",
      "https://reactrouter.com/v6/upgrading/future#v7_starttransition"
    ),
    (e == null ? void 0 : e.v7_relativeSplatPath) === void 0 &&
      (!t || !t.v7_relativeSplatPath) &&
      Jn(
        "v7_relativeSplatPath",
        "Relative route resolution within Splat routes is changing in v7",
        "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath"
      ),
    t &&
      (t.v7_fetcherPersist === void 0 &&
        Jn(
          "v7_fetcherPersist",
          "The persistence behavior of fetchers is changing in v7",
          "https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist"
        ),
      t.v7_normalizeFormMethod === void 0 &&
        Jn(
          "v7_normalizeFormMethod",
          "Casing of `formMethod` fields is being normalized to uppercase in v7",
          "https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod"
        ),
      t.v7_partialHydration === void 0 &&
        Jn(
          "v7_partialHydration",
          "`RouterProvider` hydration behavior is changing in v7",
          "https://reactrouter.com/v6/upgrading/future#v7_partialhydration"
        ),
      t.v7_skipActionErrorRevalidation === void 0 &&
        Jn(
          "v7_skipActionErrorRevalidation",
          "The revalidation behavior after 4xx/5xx `action` responses is changing in v7",
          "https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation"
        ));
}
function Av(e) {
  return Zm(e.context);
}
function Wr(e) {
  G(!1);
}
function hv(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: i = Ce.Pop,
    navigator: o,
    static: l = !1,
    future: s,
  } = e;
  ml() && G(!1);
  let a = t.replace(/^\/*/, "/"),
    u = E.useMemo(
      () => ({ basename: a, navigator: o, static: l, future: wi({ v7_relativeSplatPath: !1 }, s) }),
      [a, s, o, l]
    );
  typeof r == "string" && (r = Gt(r));
  let { pathname: d = "/", search: f = "", hash: A = "", state: y = null, key: S = "default" } = r,
    B = E.useMemo(() => {
      let D = Di(d, a);
      return D == null
        ? null
        : { location: { pathname: D, search: f, hash: A, state: y, key: S }, navigationType: i };
    }, [a, d, f, A, y, S, i]);
  return B == null
    ? null
    : E.createElement(
        gl.Provider,
        { value: u },
        E.createElement(pl.Provider, { children: n, value: B })
      );
}
new Promise(() => {});
function ea(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    E.Children.forEach(e, (r, i) => {
      if (!E.isValidElement(r)) return;
      let o = [...t, i];
      if (r.type === E.Fragment) {
        n.push.apply(n, ea(r.props.children, o));
        return;
      }
      r.type !== Wr && G(!1), !r.props.index || !r.props.children || G(!1);
      let l = {
        id: r.props.id || o.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary: r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (l.children = ea(r.props.children, o)), n.push(l);
    }),
    n
  );
}
function gv(e) {
  let t = { hasErrorBoundary: e.ErrorBoundary != null || e.errorElement != null };
  return (
    e.Component && Object.assign(t, { element: E.createElement(e.Component), Component: void 0 }),
    e.HydrateFallback &&
      Object.assign(t, {
        hydrateFallbackElement: E.createElement(e.HydrateFallback),
        HydrateFallback: void 0,
      }),
    e.ErrorBoundary &&
      Object.assign(t, { errorElement: E.createElement(e.ErrorBoundary), ErrorBoundary: void 0 }),
    t
  );
}
/**
 * React Router DOM v6.28.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Xo() {
  return (
    (Xo = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Xo.apply(this, arguments)
  );
}
const pv = "6";
try {
  window.__reactRouterVersion = pv;
} catch {}
function mv(e, t) {
  return xm({
    basename: t == null ? void 0 : t.basename,
    future: Xo({}, t == null ? void 0 : t.future, { v7_prependBasename: !0 }),
    history: em({ window: t == null ? void 0 : t.window }),
    hydrationData: (t == null ? void 0 : t.hydrationData) || vv(),
    routes: e,
    mapRouteProperties: gv,
    dataStrategy: t == null ? void 0 : t.dataStrategy,
    patchRoutesOnNavigation: t == null ? void 0 : t.patchRoutesOnNavigation,
    window: t == null ? void 0 : t.window,
  }).initialize();
}
function vv() {
  var e;
  let t = (e = window) == null ? void 0 : e.__staticRouterHydrationData;
  return t && t.errors && (t = Xo({}, t, { errors: yv(t.errors) })), t;
}
function yv(e) {
  if (!e) return null;
  let t = Object.entries(e),
    n = {};
  for (let [r, i] of t)
    if (i && i.__type === "RouteErrorResponse")
      n[r] = new Wo(i.status, i.statusText, i.data, i.internal === !0);
    else if (i && i.__type === "Error") {
      if (i.__subType) {
        let o = window[i.__subType];
        if (typeof o == "function")
          try {
            let l = new o(i.message);
            (l.stack = ""), (n[r] = l);
          } catch {}
      }
      if (n[r] == null) {
        let o = new Error(i.message);
        (o.stack = ""), (n[r] = o);
      }
    } else n[r] = i;
  return n;
}
const Cv = E.createContext({ isTransitioning: !1 }),
  Ev = E.createContext(new Map()),
  wv = "startTransition",
  ed = Hh[wv],
  Bv = "flushSync",
  td = $p[Bv];
function Sv(e) {
  ed ? ed(e) : e();
}
function zr(e) {
  td ? td(e) : e();
}
class kv {
  constructor() {
    (this.status = "pending"),
      (this.promise = new Promise((t, n) => {
        (this.resolve = (r) => {
          this.status === "pending" && ((this.status = "resolved"), t(r));
        }),
          (this.reject = (r) => {
            this.status === "pending" && ((this.status = "rejected"), n(r));
          });
      }));
  }
}
function Qv(e) {
  let { fallbackElement: t, router: n, future: r } = e,
    [i, o] = E.useState(n.state),
    [l, s] = E.useState(),
    [a, u] = E.useState({ isTransitioning: !1 }),
    [d, f] = E.useState(),
    [A, y] = E.useState(),
    [S, B] = E.useState(),
    D = E.useRef(new Map()),
    { v7_startTransition: g } = r || {},
    c = E.useCallback(
      (I) => {
        g ? Sv(I) : I();
      },
      [g]
    ),
    p = E.useCallback(
      (I, j) => {
        let { deletedFetchers: P, flushSync: _, viewTransitionOpts: ie } = j;
        P.forEach((te) => D.current.delete(te)),
          I.fetchers.forEach((te, Te) => {
            te.data !== void 0 && D.current.set(Te, te.data);
          });
        let ce =
          n.window == null ||
          n.window.document == null ||
          typeof n.window.document.startViewTransition != "function";
        if (!ie || ce) {
          _ ? zr(() => o(I)) : c(() => o(I));
          return;
        }
        if (_) {
          zr(() => {
            A && (d && d.resolve(), A.skipTransition()),
              u({
                isTransitioning: !0,
                flushSync: !0,
                currentLocation: ie.currentLocation,
                nextLocation: ie.nextLocation,
              });
          });
          let te = n.window.document.startViewTransition(() => {
            zr(() => o(I));
          });
          te.finished.finally(() => {
            zr(() => {
              f(void 0), y(void 0), s(void 0), u({ isTransitioning: !1 });
            });
          }),
            zr(() => y(te));
          return;
        }
        A
          ? (d && d.resolve(),
            A.skipTransition(),
            B({ state: I, currentLocation: ie.currentLocation, nextLocation: ie.nextLocation }))
          : (s(I),
            u({
              isTransitioning: !0,
              flushSync: !1,
              currentLocation: ie.currentLocation,
              nextLocation: ie.nextLocation,
            }));
      },
      [n.window, A, d, D, c]
    );
  E.useLayoutEffect(() => n.subscribe(p), [n, p]),
    E.useEffect(() => {
      a.isTransitioning && !a.flushSync && f(new kv());
    }, [a]),
    E.useEffect(() => {
      if (d && l && n.window) {
        let I = l,
          j = d.promise,
          P = n.window.document.startViewTransition(async () => {
            c(() => o(I)), await j;
          });
        P.finished.finally(() => {
          f(void 0), y(void 0), s(void 0), u({ isTransitioning: !1 });
        }),
          y(P);
      }
    }, [c, l, d, n.window]),
    E.useEffect(() => {
      d && l && i.location.key === l.location.key && d.resolve();
    }, [d, A, i.location, l]),
    E.useEffect(() => {
      !a.isTransitioning &&
        S &&
        (s(S.state),
        u({
          isTransitioning: !0,
          flushSync: !1,
          currentLocation: S.currentLocation,
          nextLocation: S.nextLocation,
        }),
        B(void 0));
    }, [a.isTransitioning, S]),
    E.useEffect(() => {}, []);
  let k = E.useMemo(
      () => ({
        createHref: n.createHref,
        encodeLocation: n.encodeLocation,
        go: (I) => n.navigate(I),
        push: (I, j, P) =>
          n.navigate(I, {
            state: j,
            preventScrollReset: P == null ? void 0 : P.preventScrollReset,
          }),
        replace: (I, j, P) =>
          n.navigate(I, {
            replace: !0,
            state: j,
            preventScrollReset: P == null ? void 0 : P.preventScrollReset,
          }),
      }),
      [n]
    ),
    Q = n.basename || "/",
    m = E.useMemo(() => ({ router: n, navigator: k, static: !1, basename: Q }), [n, k, Q]),
    L = E.useMemo(
      () => ({ v7_relativeSplatPath: n.future.v7_relativeSplatPath }),
      [n.future.v7_relativeSplatPath]
    );
  return (
    E.useEffect(() => fv(r, n.future), [r, n.future]),
    E.createElement(
      E.Fragment,
      null,
      E.createElement(
        hl.Provider,
        { value: m },
        E.createElement(
          OA.Provider,
          { value: i },
          E.createElement(
            Ev.Provider,
            { value: D.current },
            E.createElement(
              Cv.Provider,
              { value: a },
              E.createElement(
                hv,
                {
                  basename: Q,
                  location: i.location,
                  navigationType: i.historyAction,
                  navigator: k,
                  future: L,
                },
                i.initialized || n.future.v7_partialHydration
                  ? E.createElement(Rv, { routes: n.routes, future: n.future, state: i })
                  : t
              )
            )
          )
        )
      ),
      null
    )
  );
}
const Rv = E.memo(Iv);
function Iv(e) {
  let { routes: t, future: n, state: r } = e;
  return $m(t, void 0, r, n);
}
var nd;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState");
})(nd || (nd = {}));
var rd;
(function (e) {
  (e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(rd || (rd = {}));
function ta(e) {
  this.message = e;
}
(ta.prototype = new Error()), (ta.prototype.name = "InvalidCharacterError");
var id =
  (typeof window < "u" && window.atob && window.atob.bind(window)) ||
  function (e) {
    var t = String(e).replace(/=+$/, "");
    if (t.length % 4 == 1)
      throw new ta("'atob' failed: The string to be decoded is not correctly encoded.");
    for (
      var n, r, i = 0, o = 0, l = "";
      (r = t.charAt(o++));
      ~r && ((n = i % 4 ? 64 * n + r : r), i++ % 4)
        ? (l += String.fromCharCode(255 & (n >> ((-2 * i) & 6))))
        : 0
    )
      r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(r);
    return l;
  };
function Dv(e) {
  var t = e.replace(/-/g, "+").replace(/_/g, "/");
  switch (t.length % 4) {
    case 0:
      break;
    case 2:
      t += "==";
      break;
    case 3:
      t += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }
  try {
    return (function (n) {
      return decodeURIComponent(
        id(n).replace(/(.)/g, function (r, i) {
          var o = i.charCodeAt(0).toString(16).toUpperCase();
          return o.length < 2 && (o = "0" + o), "%" + o;
        })
      );
    })(t);
  } catch {
    return id(t);
  }
}
function qo(e) {
  this.message = e;
}
function xv(e, t) {
  if (typeof e != "string") throw new qo("Invalid token specified");
  var n = (t = t || {}).header === !0 ? 0 : 1;
  try {
    return JSON.parse(Dv(e.split(".")[n]));
  } catch (r) {
    throw new qo("Invalid token specified: " + r.message);
  }
}
(qo.prototype = new Error()), (qo.prototype.name = "InvalidTokenError");
const xt = Object.create(null);
xt.open = "0";
xt.close = "1";
xt.ping = "2";
xt.pong = "3";
xt.message = "4";
xt.upgrade = "5";
xt.noop = "6";
const mo = Object.create(null);
Object.keys(xt).forEach((e) => {
  mo[xt[e]] = e;
});
const na = { type: "error", data: "parser error" },
  GA =
    typeof Blob == "function" ||
    (typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]"),
  KA = typeof ArrayBuffer == "function",
  WA = (e) =>
    typeof ArrayBuffer.isView == "function"
      ? ArrayBuffer.isView(e)
      : e && e.buffer instanceof ArrayBuffer,
  lu = ({ type: e, data: t }, n, r) =>
    GA && t instanceof Blob
      ? n
        ? r(t)
        : od(t, r)
      : KA && (t instanceof ArrayBuffer || WA(t))
      ? n
        ? r(t)
        : od(new Blob([t]), r)
      : r(xt[e] + (t || "")),
  od = (e, t) => {
    const n = new FileReader();
    return (
      (n.onload = function () {
        const r = n.result.split(",")[1];
        t("b" + (r || ""));
      }),
      n.readAsDataURL(e)
    );
  };
function ld(e) {
  return e instanceof Uint8Array
    ? e
    : e instanceof ArrayBuffer
    ? new Uint8Array(e)
    : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
}
let $l;
function Lv(e, t) {
  if (GA && e.data instanceof Blob) return e.data.arrayBuffer().then(ld).then(t);
  if (KA && (e.data instanceof ArrayBuffer || WA(e.data))) return t(ld(e.data));
  lu(e, !1, (n) => {
    $l || ($l = new TextEncoder()), t($l.encode(n));
  });
}
const sd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  Jr = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let e = 0; e < sd.length; e++) Jr[sd.charCodeAt(e)] = e;
const Nv = (e) => {
    let t = e.length * 0.75,
      n = e.length,
      r,
      i = 0,
      o,
      l,
      s,
      a;
    e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
    const u = new ArrayBuffer(t),
      d = new Uint8Array(u);
    for (r = 0; r < n; r += 4)
      (o = Jr[e.charCodeAt(r)]),
        (l = Jr[e.charCodeAt(r + 1)]),
        (s = Jr[e.charCodeAt(r + 2)]),
        (a = Jr[e.charCodeAt(r + 3)]),
        (d[i++] = (o << 2) | (l >> 4)),
        (d[i++] = ((l & 15) << 4) | (s >> 2)),
        (d[i++] = ((s & 3) << 6) | (a & 63));
    return u;
  },
  Uv = typeof ArrayBuffer == "function",
  su = (e, t) => {
    if (typeof e != "string") return { type: "message", data: JA(e, t) };
    const n = e.charAt(0);
    return n === "b"
      ? { type: "message", data: Pv(e.substring(1), t) }
      : mo[n]
      ? e.length > 1
        ? { type: mo[n], data: e.substring(1) }
        : { type: mo[n] }
      : na;
  },
  Pv = (e, t) => {
    if (Uv) {
      const n = Nv(e);
      return JA(n, t);
    } else return { base64: !0, data: e };
  },
  JA = (e, t) => {
    switch (t) {
      case "blob":
        return e instanceof Blob ? e : new Blob([e]);
      case "arraybuffer":
      default:
        return e instanceof ArrayBuffer ? e : e.buffer;
    }
  },
  XA = String.fromCharCode(30),
  Tv = (e, t) => {
    const n = e.length,
      r = new Array(n);
    let i = 0;
    e.forEach((o, l) => {
      lu(o, !1, (s) => {
        (r[l] = s), ++i === n && t(r.join(XA));
      });
    });
  },
  Mv = (e, t) => {
    const n = e.split(XA),
      r = [];
    for (let i = 0; i < n.length; i++) {
      const o = su(n[i], t);
      if ((r.push(o), o.type === "error")) break;
    }
    return r;
  };
function Ov() {
  return new TransformStream({
    transform(e, t) {
      Lv(e, (n) => {
        const r = n.length;
        let i;
        if (r < 126) (i = new Uint8Array(1)), new DataView(i.buffer).setUint8(0, r);
        else if (r < 65536) {
          i = new Uint8Array(3);
          const o = new DataView(i.buffer);
          o.setUint8(0, 126), o.setUint16(1, r);
        } else {
          i = new Uint8Array(9);
          const o = new DataView(i.buffer);
          o.setUint8(0, 127), o.setBigUint64(1, BigInt(r));
        }
        e.data && typeof e.data != "string" && (i[0] |= 128), t.enqueue(i), t.enqueue(n);
      });
    },
  });
}
let es;
function eo(e) {
  return e.reduce((t, n) => t + n.length, 0);
}
function to(e, t) {
  if (e[0].length === t) return e.shift();
  const n = new Uint8Array(t);
  let r = 0;
  for (let i = 0; i < t; i++) (n[i] = e[0][r++]), r === e[0].length && (e.shift(), (r = 0));
  return e.length && r < e[0].length && (e[0] = e[0].slice(r)), n;
}
function Fv(e, t) {
  es || (es = new TextDecoder());
  const n = [];
  let r = 0,
    i = -1,
    o = !1;
  return new TransformStream({
    transform(l, s) {
      for (n.push(l); ; ) {
        if (r === 0) {
          if (eo(n) < 1) break;
          const a = to(n, 1);
          (o = (a[0] & 128) === 128),
            (i = a[0] & 127),
            i < 126 ? (r = 3) : i === 126 ? (r = 1) : (r = 2);
        } else if (r === 1) {
          if (eo(n) < 2) break;
          const a = to(n, 2);
          (i = new DataView(a.buffer, a.byteOffset, a.length).getUint16(0)), (r = 3);
        } else if (r === 2) {
          if (eo(n) < 8) break;
          const a = to(n, 8),
            u = new DataView(a.buffer, a.byteOffset, a.length),
            d = u.getUint32(0);
          if (d > Math.pow(2, 53 - 32) - 1) {
            s.enqueue(na);
            break;
          }
          (i = d * Math.pow(2, 32) + u.getUint32(4)), (r = 3);
        } else {
          if (eo(n) < i) break;
          const a = to(n, i);
          s.enqueue(su(o ? a : es.decode(a), t)), (r = 0);
        }
        if (i === 0 || i > e) {
          s.enqueue(na);
          break;
        }
      }
    },
  });
}
const qA = 4;
function ke(e) {
  if (e) return jv(e);
}
function jv(e) {
  for (var t in ke.prototype) e[t] = ke.prototype[t];
  return e;
}
ke.prototype.on = ke.prototype.addEventListener = function (e, t) {
  return (
    (this._callbacks = this._callbacks || {}),
    (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t),
    this
  );
};
ke.prototype.once = function (e, t) {
  function n() {
    this.off(e, n), t.apply(this, arguments);
  }
  return (n.fn = t), this.on(e, n), this;
};
ke.prototype.off =
  ke.prototype.removeListener =
  ke.prototype.removeAllListeners =
  ke.prototype.removeEventListener =
    function (e, t) {
      if (((this._callbacks = this._callbacks || {}), arguments.length == 0))
        return (this._callbacks = {}), this;
      var n = this._callbacks["$" + e];
      if (!n) return this;
      if (arguments.length == 1) return delete this._callbacks["$" + e], this;
      for (var r, i = 0; i < n.length; i++)
        if (((r = n[i]), r === t || r.fn === t)) {
          n.splice(i, 1);
          break;
        }
      return n.length === 0 && delete this._callbacks["$" + e], this;
    };
ke.prototype.emit = function (e) {
  this._callbacks = this._callbacks || {};
  for (
    var t = new Array(arguments.length - 1), n = this._callbacks["$" + e], r = 1;
    r < arguments.length;
    r++
  )
    t[r - 1] = arguments[r];
  if (n) {
    n = n.slice(0);
    for (var r = 0, i = n.length; r < i; ++r) n[r].apply(this, t);
  }
  return this;
};
ke.prototype.emitReserved = ke.prototype.emit;
ke.prototype.listeners = function (e) {
  return (this._callbacks = this._callbacks || {}), this._callbacks["$" + e] || [];
};
ke.prototype.hasListeners = function (e) {
  return !!this.listeners(e).length;
};
const vl = (() =>
    typeof Promise == "function" && typeof Promise.resolve == "function"
      ? (t) => Promise.resolve().then(t)
      : (t, n) => n(t, 0))(),
  at = (() =>
    typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")())(),
  zv = "arraybuffer";
function _A(e, ...t) {
  return t.reduce((n, r) => (e.hasOwnProperty(r) && (n[r] = e[r]), n), {});
}
const Hv = at.setTimeout,
  bv = at.clearTimeout;
function yl(e, t) {
  t.useNativeTimers
    ? ((e.setTimeoutFn = Hv.bind(at)), (e.clearTimeoutFn = bv.bind(at)))
    : ((e.setTimeoutFn = at.setTimeout.bind(at)), (e.clearTimeoutFn = at.clearTimeout.bind(at)));
}
const Yv = 1.33;
function Vv(e) {
  return typeof e == "string" ? Gv(e) : Math.ceil((e.byteLength || e.size) * Yv);
}
function Gv(e) {
  let t = 0,
    n = 0;
  for (let r = 0, i = e.length; r < i; r++)
    (t = e.charCodeAt(r)),
      t < 128
        ? (n += 1)
        : t < 2048
        ? (n += 2)
        : t < 55296 || t >= 57344
        ? (n += 3)
        : (r++, (n += 4));
  return n;
}
function ZA() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function Kv(e) {
  let t = "";
  for (let n in e)
    e.hasOwnProperty(n) &&
      (t.length && (t += "&"), (t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n])));
  return t;
}
function Wv(e) {
  let t = {},
    n = e.split("&");
  for (let r = 0, i = n.length; r < i; r++) {
    let o = n[r].split("=");
    t[decodeURIComponent(o[0])] = decodeURIComponent(o[1]);
  }
  return t;
}
class Jv extends Error {
  constructor(t, n, r) {
    super(t), (this.description = n), (this.context = r), (this.type = "TransportError");
  }
}
class au extends ke {
  constructor(t) {
    super(),
      (this.writable = !1),
      yl(this, t),
      (this.opts = t),
      (this.query = t.query),
      (this.socket = t.socket),
      (this.supportsBinary = !t.forceBase64);
  }
  onError(t, n, r) {
    return super.emitReserved("error", new Jv(t, n, r)), this;
  }
  open() {
    return (this.readyState = "opening"), this.doOpen(), this;
  }
  close() {
    return (
      (this.readyState === "opening" || this.readyState === "open") &&
        (this.doClose(), this.onClose()),
      this
    );
  }
  send(t) {
    this.readyState === "open" && this.write(t);
  }
  onOpen() {
    (this.readyState = "open"), (this.writable = !0), super.emitReserved("open");
  }
  onData(t) {
    const n = su(t, this.socket.binaryType);
    this.onPacket(n);
  }
  onPacket(t) {
    super.emitReserved("packet", t);
  }
  onClose(t) {
    (this.readyState = "closed"), super.emitReserved("close", t);
  }
  pause(t) {}
  createUri(t, n = {}) {
    return t + "://" + this._hostname() + this._port() + this.opts.path + this._query(n);
  }
  _hostname() {
    const t = this.opts.hostname;
    return t.indexOf(":") === -1 ? t : "[" + t + "]";
  }
  _port() {
    return this.opts.port &&
      ((this.opts.secure && +(this.opts.port !== 443)) ||
        (!this.opts.secure && Number(this.opts.port) !== 80))
      ? ":" + this.opts.port
      : "";
  }
  _query(t) {
    const n = Kv(t);
    return n.length ? "?" + n : "";
  }
}
class Xv extends au {
  constructor() {
    super(...arguments), (this._polling = !1);
  }
  get name() {
    return "polling";
  }
  doOpen() {
    this._poll();
  }
  pause(t) {
    this.readyState = "pausing";
    const n = () => {
      (this.readyState = "paused"), t();
    };
    if (this._polling || !this.writable) {
      let r = 0;
      this._polling &&
        (r++,
        this.once("pollComplete", function () {
          --r || n();
        })),
        this.writable ||
          (r++,
          this.once("drain", function () {
            --r || n();
          }));
    } else n();
  }
  _poll() {
    (this._polling = !0), this.doPoll(), this.emitReserved("poll");
  }
  onData(t) {
    const n = (r) => {
      if ((this.readyState === "opening" && r.type === "open" && this.onOpen(), r.type === "close"))
        return this.onClose({ description: "transport closed by the server" }), !1;
      this.onPacket(r);
    };
    Mv(t, this.socket.binaryType).forEach(n),
      this.readyState !== "closed" &&
        ((this._polling = !1),
        this.emitReserved("pollComplete"),
        this.readyState === "open" && this._poll());
  }
  doClose() {
    const t = () => {
      this.write([{ type: "close" }]);
    };
    this.readyState === "open" ? t() : this.once("open", t);
  }
  write(t) {
    (this.writable = !1),
      Tv(t, (n) => {
        this.doWrite(n, () => {
          (this.writable = !0), this.emitReserved("drain");
        });
      });
  }
  uri() {
    const t = this.opts.secure ? "https" : "http",
      n = this.query || {};
    return (
      this.opts.timestampRequests !== !1 && (n[this.opts.timestampParam] = ZA()),
      !this.supportsBinary && !n.sid && (n.b64 = 1),
      this.createUri(t, n)
    );
  }
}
let $A = !1;
try {
  $A = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {}
const qv = $A;
function _v() {}
class Zv extends Xv {
  constructor(t) {
    if ((super(t), typeof location < "u")) {
      const n = location.protocol === "https:";
      let r = location.port;
      r || (r = n ? "443" : "80"),
        (this.xd = (typeof location < "u" && t.hostname !== location.hostname) || r !== t.port);
    }
  }
  doWrite(t, n) {
    const r = this.request({ method: "POST", data: t });
    r.on("success", n),
      r.on("error", (i, o) => {
        this.onError("xhr post error", i, o);
      });
  }
  doPoll() {
    const t = this.request();
    t.on("data", this.onData.bind(this)),
      t.on("error", (n, r) => {
        this.onError("xhr poll error", n, r);
      }),
      (this.pollXhr = t);
  }
}
let Ar = class vo extends ke {
  constructor(t, n, r) {
    super(),
      (this.createRequest = t),
      yl(this, r),
      (this._opts = r),
      (this._method = r.method || "GET"),
      (this._uri = n),
      (this._data = r.data !== void 0 ? r.data : null),
      this._create();
  }
  _create() {
    var t;
    const n = _A(
      this._opts,
      "agent",
      "pfx",
      "key",
      "passphrase",
      "cert",
      "ca",
      "ciphers",
      "rejectUnauthorized",
      "autoUnref"
    );
    n.xdomain = !!this._opts.xd;
    const r = (this._xhr = this.createRequest(n));
    try {
      r.open(this._method, this._uri, !0);
      try {
        if (this._opts.extraHeaders) {
          r.setDisableHeaderCheck && r.setDisableHeaderCheck(!0);
          for (let i in this._opts.extraHeaders)
            this._opts.extraHeaders.hasOwnProperty(i) &&
              r.setRequestHeader(i, this._opts.extraHeaders[i]);
        }
      } catch {}
      if (this._method === "POST")
        try {
          r.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch {}
      try {
        r.setRequestHeader("Accept", "*/*");
      } catch {}
      (t = this._opts.cookieJar) === null || t === void 0 || t.addCookies(r),
        "withCredentials" in r && (r.withCredentials = this._opts.withCredentials),
        this._opts.requestTimeout && (r.timeout = this._opts.requestTimeout),
        (r.onreadystatechange = () => {
          var i;
          r.readyState === 3 &&
            ((i = this._opts.cookieJar) === null ||
              i === void 0 ||
              i.parseCookies(r.getResponseHeader("set-cookie"))),
            r.readyState === 4 &&
              (r.status === 200 || r.status === 1223
                ? this._onLoad()
                : this.setTimeoutFn(() => {
                    this._onError(typeof r.status == "number" ? r.status : 0);
                  }, 0));
        }),
        r.send(this._data);
    } catch (i) {
      this.setTimeoutFn(() => {
        this._onError(i);
      }, 0);
      return;
    }
    typeof document < "u" &&
      ((this._index = vo.requestsCount++), (vo.requests[this._index] = this));
  }
  _onError(t) {
    this.emitReserved("error", t, this._xhr), this._cleanup(!0);
  }
  _cleanup(t) {
    if (!(typeof this._xhr > "u" || this._xhr === null)) {
      if (((this._xhr.onreadystatechange = _v), t))
        try {
          this._xhr.abort();
        } catch {}
      typeof document < "u" && delete vo.requests[this._index], (this._xhr = null);
    }
  }
  _onLoad() {
    const t = this._xhr.responseText;
    t !== null && (this.emitReserved("data", t), this.emitReserved("success"), this._cleanup());
  }
  abort() {
    this._cleanup();
  }
};
Ar.requestsCount = 0;
Ar.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function") attachEvent("onunload", ad);
  else if (typeof addEventListener == "function") {
    const e = "onpagehide" in at ? "pagehide" : "unload";
    addEventListener(e, ad, !1);
  }
}
function ad() {
  for (let e in Ar.requests) Ar.requests.hasOwnProperty(e) && Ar.requests[e].abort();
}
const $v = (function () {
  const e = eh({ xdomain: !1 });
  return e && e.responseType !== null;
})();
class ey extends Zv {
  constructor(t) {
    super(t);
    const n = t && t.forceBase64;
    this.supportsBinary = $v && !n;
  }
  request(t = {}) {
    return Object.assign(t, { xd: this.xd }, this.opts), new Ar(eh, this.uri(), t);
  }
}
function eh(e) {
  const t = e.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!t || qv)) return new XMLHttpRequest();
  } catch {}
  if (!t)
    try {
      return new at[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {}
}
const th =
  typeof navigator < "u" &&
  typeof navigator.product == "string" &&
  navigator.product.toLowerCase() === "reactnative";
class ty extends au {
  get name() {
    return "websocket";
  }
  doOpen() {
    const t = this.uri(),
      n = this.opts.protocols,
      r = th
        ? {}
        : _A(
            this.opts,
            "agent",
            "perMessageDeflate",
            "pfx",
            "key",
            "passphrase",
            "cert",
            "ca",
            "ciphers",
            "rejectUnauthorized",
            "localAddress",
            "protocolVersion",
            "origin",
            "maxPayload",
            "family",
            "checkServerIdentity"
          );
    this.opts.extraHeaders && (r.headers = this.opts.extraHeaders);
    try {
      this.ws = this.createSocket(t, n, r);
    } catch (i) {
      return this.emitReserved("error", i);
    }
    (this.ws.binaryType = this.socket.binaryType), this.addEventListeners();
  }
  addEventListeners() {
    (this.ws.onopen = () => {
      this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
    }),
      (this.ws.onclose = (t) =>
        this.onClose({ description: "websocket connection closed", context: t })),
      (this.ws.onmessage = (t) => this.onData(t.data)),
      (this.ws.onerror = (t) => this.onError("websocket error", t));
  }
  write(t) {
    this.writable = !1;
    for (let n = 0; n < t.length; n++) {
      const r = t[n],
        i = n === t.length - 1;
      lu(r, this.supportsBinary, (o) => {
        try {
          this.doWrite(r, o);
        } catch {}
        i &&
          vl(() => {
            (this.writable = !0), this.emitReserved("drain");
          }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    typeof this.ws < "u" && ((this.ws.onerror = () => {}), this.ws.close(), (this.ws = null));
  }
  uri() {
    const t = this.opts.secure ? "wss" : "ws",
      n = this.query || {};
    return (
      this.opts.timestampRequests && (n[this.opts.timestampParam] = ZA()),
      this.supportsBinary || (n.b64 = 1),
      this.createUri(t, n)
    );
  }
}
const ts = at.WebSocket || at.MozWebSocket;
class ny extends ty {
  createSocket(t, n, r) {
    return th ? new ts(t, n, r) : n ? new ts(t, n) : new ts(t);
  }
  doWrite(t, n) {
    this.ws.send(n);
  }
}
class ry extends au {
  get name() {
    return "webtransport";
  }
  doOpen() {
    try {
      this._transport = new WebTransport(
        this.createUri("https"),
        this.opts.transportOptions[this.name]
      );
    } catch (t) {
      return this.emitReserved("error", t);
    }
    this._transport.closed
      .then(() => {
        this.onClose();
      })
      .catch((t) => {
        this.onError("webtransport error", t);
      }),
      this._transport.ready.then(() => {
        this._transport.createBidirectionalStream().then((t) => {
          const n = Fv(Number.MAX_SAFE_INTEGER, this.socket.binaryType),
            r = t.readable.pipeThrough(n).getReader(),
            i = Ov();
          i.readable.pipeTo(t.writable), (this._writer = i.writable.getWriter());
          const o = () => {
            r.read()
              .then(({ done: s, value: a }) => {
                s || (this.onPacket(a), o());
              })
              .catch((s) => {});
          };
          o();
          const l = { type: "open" };
          this.query.sid && (l.data = `{"sid":"${this.query.sid}"}`),
            this._writer.write(l).then(() => this.onOpen());
        });
      });
  }
  write(t) {
    this.writable = !1;
    for (let n = 0; n < t.length; n++) {
      const r = t[n],
        i = n === t.length - 1;
      this._writer.write(r).then(() => {
        i &&
          vl(() => {
            (this.writable = !0), this.emitReserved("drain");
          }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    var t;
    (t = this._transport) === null || t === void 0 || t.close();
  }
}
const iy = { websocket: ny, webtransport: ry, polling: ey },
  oy =
    /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
  ly = [
    "source",
    "protocol",
    "authority",
    "userInfo",
    "user",
    "password",
    "host",
    "port",
    "relative",
    "path",
    "directory",
    "file",
    "query",
    "anchor",
  ];
function ra(e) {
  if (e.length > 8e3) throw "URI too long";
  const t = e,
    n = e.indexOf("["),
    r = e.indexOf("]");
  n != -1 &&
    r != -1 &&
    (e = e.substring(0, n) + e.substring(n, r).replace(/:/g, ";") + e.substring(r, e.length));
  let i = oy.exec(e || ""),
    o = {},
    l = 14;
  for (; l--; ) o[ly[l]] = i[l] || "";
  return (
    n != -1 &&
      r != -1 &&
      ((o.source = t),
      (o.host = o.host.substring(1, o.host.length - 1).replace(/;/g, ":")),
      (o.authority = o.authority.replace("[", "").replace("]", "").replace(/;/g, ":")),
      (o.ipv6uri = !0)),
    (o.pathNames = sy(o, o.path)),
    (o.queryKey = ay(o, o.query)),
    o
  );
}
function sy(e, t) {
  const n = /\/{2,9}/g,
    r = t.replace(n, "/").split("/");
  return (
    (t.slice(0, 1) == "/" || t.length === 0) && r.splice(0, 1),
    t.slice(-1) == "/" && r.splice(r.length - 1, 1),
    r
  );
}
function ay(e, t) {
  const n = {};
  return (
    t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (r, i, o) {
      i && (n[i] = o);
    }),
    n
  );
}
const ia = typeof addEventListener == "function" && typeof removeEventListener == "function",
  yo = [];
ia &&
  addEventListener(
    "offline",
    () => {
      yo.forEach((e) => e());
    },
    !1
  );
class An extends ke {
  constructor(t, n) {
    if (
      (super(),
      (this.binaryType = zv),
      (this.writeBuffer = []),
      (this._prevBufferLen = 0),
      (this._pingInterval = -1),
      (this._pingTimeout = -1),
      (this._maxPayload = -1),
      (this._pingTimeoutTime = 1 / 0),
      t && typeof t == "object" && ((n = t), (t = null)),
      t)
    ) {
      const r = ra(t);
      (n.hostname = r.host),
        (n.secure = r.protocol === "https" || r.protocol === "wss"),
        (n.port = r.port),
        r.query && (n.query = r.query);
    } else n.host && (n.hostname = ra(n.host).host);
    yl(this, n),
      (this.secure =
        n.secure != null ? n.secure : typeof location < "u" && location.protocol === "https:"),
      n.hostname && !n.port && (n.port = this.secure ? "443" : "80"),
      (this.hostname = n.hostname || (typeof location < "u" ? location.hostname : "localhost")),
      (this.port =
        n.port ||
        (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80")),
      (this.transports = []),
      (this._transportsByName = {}),
      n.transports.forEach((r) => {
        const i = r.prototype.name;
        this.transports.push(i), (this._transportsByName[i] = r);
      }),
      (this.opts = Object.assign(
        {
          path: "/engine.io",
          agent: !1,
          withCredentials: !1,
          upgrade: !0,
          timestampParam: "t",
          rememberUpgrade: !1,
          addTrailingSlash: !0,
          rejectUnauthorized: !0,
          perMessageDeflate: { threshold: 1024 },
          transportOptions: {},
          closeOnBeforeunload: !1,
        },
        n
      )),
      (this.opts.path =
        this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : "")),
      typeof this.opts.query == "string" && (this.opts.query = Wv(this.opts.query)),
      ia &&
        (this.opts.closeOnBeforeunload &&
          ((this._beforeunloadEventListener = () => {
            this.transport && (this.transport.removeAllListeners(), this.transport.close());
          }),
          addEventListener("beforeunload", this._beforeunloadEventListener, !1)),
        this.hostname !== "localhost" &&
          ((this._offlineEventListener = () => {
            this._onClose("transport close", { description: "network connection lost" });
          }),
          yo.push(this._offlineEventListener))),
      this.opts.withCredentials && (this._cookieJar = void 0),
      this._open();
  }
  createTransport(t) {
    const n = Object.assign({}, this.opts.query);
    (n.EIO = qA), (n.transport = t), this.id && (n.sid = this.id);
    const r = Object.assign(
      {},
      this.opts,
      { query: n, socket: this, hostname: this.hostname, secure: this.secure, port: this.port },
      this.opts.transportOptions[t]
    );
    return new this._transportsByName[t](r);
  }
  _open() {
    if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    }
    const t =
      this.opts.rememberUpgrade &&
      An.priorWebsocketSuccess &&
      this.transports.indexOf("websocket") !== -1
        ? "websocket"
        : this.transports[0];
    this.readyState = "opening";
    const n = this.createTransport(t);
    n.open(), this.setTransport(n);
  }
  setTransport(t) {
    this.transport && this.transport.removeAllListeners(),
      (this.transport = t),
      t
        .on("drain", this._onDrain.bind(this))
        .on("packet", this._onPacket.bind(this))
        .on("error", this._onError.bind(this))
        .on("close", (n) => this._onClose("transport close", n));
  }
  onOpen() {
    (this.readyState = "open"),
      (An.priorWebsocketSuccess = this.transport.name === "websocket"),
      this.emitReserved("open"),
      this.flush();
  }
  _onPacket(t) {
    if (
      this.readyState === "opening" ||
      this.readyState === "open" ||
      this.readyState === "closing"
    )
      switch ((this.emitReserved("packet", t), this.emitReserved("heartbeat"), t.type)) {
        case "open":
          this.onHandshake(JSON.parse(t.data));
          break;
        case "ping":
          this._sendPacket("pong"),
            this.emitReserved("ping"),
            this.emitReserved("pong"),
            this._resetPingTimeout();
          break;
        case "error":
          const n = new Error("server error");
          (n.code = t.data), this._onError(n);
          break;
        case "message":
          this.emitReserved("data", t.data), this.emitReserved("message", t.data);
          break;
      }
  }
  onHandshake(t) {
    this.emitReserved("handshake", t),
      (this.id = t.sid),
      (this.transport.query.sid = t.sid),
      (this._pingInterval = t.pingInterval),
      (this._pingTimeout = t.pingTimeout),
      (this._maxPayload = t.maxPayload),
      this.onOpen(),
      this.readyState !== "closed" && this._resetPingTimeout();
  }
  _resetPingTimeout() {
    this.clearTimeoutFn(this._pingTimeoutTimer);
    const t = this._pingInterval + this._pingTimeout;
    (this._pingTimeoutTime = Date.now() + t),
      (this._pingTimeoutTimer = this.setTimeoutFn(() => {
        this._onClose("ping timeout");
      }, t)),
      this.opts.autoUnref && this._pingTimeoutTimer.unref();
  }
  _onDrain() {
    this.writeBuffer.splice(0, this._prevBufferLen),
      (this._prevBufferLen = 0),
      this.writeBuffer.length === 0 ? this.emitReserved("drain") : this.flush();
  }
  flush() {
    if (
      this.readyState !== "closed" &&
      this.transport.writable &&
      !this.upgrading &&
      this.writeBuffer.length
    ) {
      const t = this._getWritablePackets();
      this.transport.send(t), (this._prevBufferLen = t.length), this.emitReserved("flush");
    }
  }
  _getWritablePackets() {
    if (!(this._maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1))
      return this.writeBuffer;
    let n = 1;
    for (let r = 0; r < this.writeBuffer.length; r++) {
      const i = this.writeBuffer[r].data;
      if ((i && (n += Vv(i)), r > 0 && n > this._maxPayload)) return this.writeBuffer.slice(0, r);
      n += 2;
    }
    return this.writeBuffer;
  }
  _hasPingExpired() {
    if (!this._pingTimeoutTime) return !0;
    const t = Date.now() > this._pingTimeoutTime;
    return (
      t &&
        ((this._pingTimeoutTime = 0),
        vl(() => {
          this._onClose("ping timeout");
        }, this.setTimeoutFn)),
      t
    );
  }
  write(t, n, r) {
    return this._sendPacket("message", t, n, r), this;
  }
  send(t, n, r) {
    return this._sendPacket("message", t, n, r), this;
  }
  _sendPacket(t, n, r, i) {
    if (
      (typeof n == "function" && ((i = n), (n = void 0)),
      typeof r == "function" && ((i = r), (r = null)),
      this.readyState === "closing" || this.readyState === "closed")
    )
      return;
    (r = r || {}), (r.compress = r.compress !== !1);
    const o = { type: t, data: n, options: r };
    this.emitReserved("packetCreate", o),
      this.writeBuffer.push(o),
      i && this.once("flush", i),
      this.flush();
  }
  close() {
    const t = () => {
        this._onClose("forced close"), this.transport.close();
      },
      n = () => {
        this.off("upgrade", n), this.off("upgradeError", n), t();
      },
      r = () => {
        this.once("upgrade", n), this.once("upgradeError", n);
      };
    return (
      (this.readyState === "opening" || this.readyState === "open") &&
        ((this.readyState = "closing"),
        this.writeBuffer.length
          ? this.once("drain", () => {
              this.upgrading ? r() : t();
            })
          : this.upgrading
          ? r()
          : t()),
      this
    );
  }
  _onError(t) {
    if (
      ((An.priorWebsocketSuccess = !1),
      this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening")
    )
      return this.transports.shift(), this._open();
    this.emitReserved("error", t), this._onClose("transport error", t);
  }
  _onClose(t, n) {
    if (
      this.readyState === "opening" ||
      this.readyState === "open" ||
      this.readyState === "closing"
    ) {
      if (
        (this.clearTimeoutFn(this._pingTimeoutTimer),
        this.transport.removeAllListeners("close"),
        this.transport.close(),
        this.transport.removeAllListeners(),
        ia &&
          (this._beforeunloadEventListener &&
            removeEventListener("beforeunload", this._beforeunloadEventListener, !1),
          this._offlineEventListener))
      ) {
        const r = yo.indexOf(this._offlineEventListener);
        r !== -1 && yo.splice(r, 1);
      }
      (this.readyState = "closed"),
        (this.id = null),
        this.emitReserved("close", t, n),
        (this.writeBuffer = []),
        (this._prevBufferLen = 0);
    }
  }
}
An.protocol = qA;
class uy extends An {
  constructor() {
    super(...arguments), (this._upgrades = []);
  }
  onOpen() {
    if ((super.onOpen(), this.readyState === "open" && this.opts.upgrade))
      for (let t = 0; t < this._upgrades.length; t++) this._probe(this._upgrades[t]);
  }
  _probe(t) {
    let n = this.createTransport(t),
      r = !1;
    An.priorWebsocketSuccess = !1;
    const i = () => {
      r ||
        (n.send([{ type: "ping", data: "probe" }]),
        n.once("packet", (f) => {
          if (!r)
            if (f.type === "pong" && f.data === "probe") {
              if (((this.upgrading = !0), this.emitReserved("upgrading", n), !n)) return;
              (An.priorWebsocketSuccess = n.name === "websocket"),
                this.transport.pause(() => {
                  r ||
                    (this.readyState !== "closed" &&
                      (d(),
                      this.setTransport(n),
                      n.send([{ type: "upgrade" }]),
                      this.emitReserved("upgrade", n),
                      (n = null),
                      (this.upgrading = !1),
                      this.flush()));
                });
            } else {
              const A = new Error("probe error");
              (A.transport = n.name), this.emitReserved("upgradeError", A);
            }
        }));
    };
    function o() {
      r || ((r = !0), d(), n.close(), (n = null));
    }
    const l = (f) => {
      const A = new Error("probe error: " + f);
      (A.transport = n.name), o(), this.emitReserved("upgradeError", A);
    };
    function s() {
      l("transport closed");
    }
    function a() {
      l("socket closed");
    }
    function u(f) {
      n && f.name !== n.name && o();
    }
    const d = () => {
      n.removeListener("open", i),
        n.removeListener("error", l),
        n.removeListener("close", s),
        this.off("close", a),
        this.off("upgrading", u);
    };
    n.once("open", i),
      n.once("error", l),
      n.once("close", s),
      this.once("close", a),
      this.once("upgrading", u),
      this._upgrades.indexOf("webtransport") !== -1 && t !== "webtransport"
        ? this.setTimeoutFn(() => {
            r || n.open();
          }, 200)
        : n.open();
  }
  onHandshake(t) {
    (this._upgrades = this._filterUpgrades(t.upgrades)), super.onHandshake(t);
  }
  _filterUpgrades(t) {
    const n = [];
    for (let r = 0; r < t.length; r++) ~this.transports.indexOf(t[r]) && n.push(t[r]);
    return n;
  }
}
let cy = class extends uy {
  constructor(t, n = {}) {
    const r = typeof t == "object" ? t : n;
    (!r.transports || (r.transports && typeof r.transports[0] == "string")) &&
      (r.transports = (r.transports || ["polling", "websocket", "webtransport"])
        .map((i) => iy[i])
        .filter((i) => !!i)),
      super(t, r);
  }
};
function dy(e, t = "", n) {
  let r = e;
  (n = n || (typeof location < "u" && location)),
    e == null && (e = n.protocol + "//" + n.host),
    typeof e == "string" &&
      (e.charAt(0) === "/" && (e.charAt(1) === "/" ? (e = n.protocol + e) : (e = n.host + e)),
      /^(https?|wss?):\/\//.test(e) ||
        (typeof n < "u" ? (e = n.protocol + "//" + e) : (e = "https://" + e)),
      (r = ra(e))),
    r.port ||
      (/^(http|ws)$/.test(r.protocol)
        ? (r.port = "80")
        : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")),
    (r.path = r.path || "/");
  const o = r.host.indexOf(":") !== -1 ? "[" + r.host + "]" : r.host;
  return (
    (r.id = r.protocol + "://" + o + ":" + r.port + t),
    (r.href = r.protocol + "://" + o + (n && n.port === r.port ? "" : ":" + r.port)),
    r
  );
}
const fy = typeof ArrayBuffer == "function",
  Ay = (e) =>
    typeof ArrayBuffer.isView == "function"
      ? ArrayBuffer.isView(e)
      : e.buffer instanceof ArrayBuffer,
  nh = Object.prototype.toString,
  hy =
    typeof Blob == "function" ||
    (typeof Blob < "u" && nh.call(Blob) === "[object BlobConstructor]"),
  gy =
    typeof File == "function" ||
    (typeof File < "u" && nh.call(File) === "[object FileConstructor]");
function uu(e) {
  return (
    (fy && (e instanceof ArrayBuffer || Ay(e))) ||
    (hy && e instanceof Blob) ||
    (gy && e instanceof File)
  );
}
function Co(e, t) {
  if (!e || typeof e != "object") return !1;
  if (Array.isArray(e)) {
    for (let n = 0, r = e.length; n < r; n++) if (Co(e[n])) return !0;
    return !1;
  }
  if (uu(e)) return !0;
  if (e.toJSON && typeof e.toJSON == "function" && arguments.length === 1)
    return Co(e.toJSON(), !0);
  for (const n in e) if (Object.prototype.hasOwnProperty.call(e, n) && Co(e[n])) return !0;
  return !1;
}
function py(e) {
  const t = [],
    n = e.data,
    r = e;
  return (r.data = oa(n, t)), (r.attachments = t.length), { packet: r, buffers: t };
}
function oa(e, t) {
  if (!e) return e;
  if (uu(e)) {
    const n = { _placeholder: !0, num: t.length };
    return t.push(e), n;
  } else if (Array.isArray(e)) {
    const n = new Array(e.length);
    for (let r = 0; r < e.length; r++) n[r] = oa(e[r], t);
    return n;
  } else if (typeof e == "object" && !(e instanceof Date)) {
    const n = {};
    for (const r in e) Object.prototype.hasOwnProperty.call(e, r) && (n[r] = oa(e[r], t));
    return n;
  }
  return e;
}
function my(e, t) {
  return (e.data = la(e.data, t)), delete e.attachments, e;
}
function la(e, t) {
  if (!e) return e;
  if (e && e._placeholder === !0) {
    if (typeof e.num == "number" && e.num >= 0 && e.num < t.length) return t[e.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(e)) for (let n = 0; n < e.length; n++) e[n] = la(e[n], t);
  else if (typeof e == "object")
    for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && (e[n] = la(e[n], t));
  return e;
}
const vy = [
    "connect",
    "connect_error",
    "disconnect",
    "disconnecting",
    "newListener",
    "removeListener",
  ],
  yy = 5;
var J;
(function (e) {
  (e[(e.CONNECT = 0)] = "CONNECT"),
    (e[(e.DISCONNECT = 1)] = "DISCONNECT"),
    (e[(e.EVENT = 2)] = "EVENT"),
    (e[(e.ACK = 3)] = "ACK"),
    (e[(e.CONNECT_ERROR = 4)] = "CONNECT_ERROR"),
    (e[(e.BINARY_EVENT = 5)] = "BINARY_EVENT"),
    (e[(e.BINARY_ACK = 6)] = "BINARY_ACK");
})(J || (J = {}));
class Cy {
  constructor(t) {
    this.replacer = t;
  }
  encode(t) {
    return (t.type === J.EVENT || t.type === J.ACK) && Co(t)
      ? this.encodeAsBinary({
          type: t.type === J.EVENT ? J.BINARY_EVENT : J.BINARY_ACK,
          nsp: t.nsp,
          data: t.data,
          id: t.id,
        })
      : [this.encodeAsString(t)];
  }
  encodeAsString(t) {
    let n = "" + t.type;
    return (
      (t.type === J.BINARY_EVENT || t.type === J.BINARY_ACK) && (n += t.attachments + "-"),
      t.nsp && t.nsp !== "/" && (n += t.nsp + ","),
      t.id != null && (n += t.id),
      t.data != null && (n += JSON.stringify(t.data, this.replacer)),
      n
    );
  }
  encodeAsBinary(t) {
    const n = py(t),
      r = this.encodeAsString(n.packet),
      i = n.buffers;
    return i.unshift(r), i;
  }
}
function ud(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
class cu extends ke {
  constructor(t) {
    super(), (this.reviver = t);
  }
  add(t) {
    let n;
    if (typeof t == "string") {
      if (this.reconstructor) throw new Error("got plaintext data when reconstructing a packet");
      n = this.decodeString(t);
      const r = n.type === J.BINARY_EVENT;
      r || n.type === J.BINARY_ACK
        ? ((n.type = r ? J.EVENT : J.ACK),
          (this.reconstructor = new Ey(n)),
          n.attachments === 0 && super.emitReserved("decoded", n))
        : super.emitReserved("decoded", n);
    } else if (uu(t) || t.base64)
      if (this.reconstructor)
        (n = this.reconstructor.takeBinaryData(t)),
          n && ((this.reconstructor = null), super.emitReserved("decoded", n));
      else throw new Error("got binary data when not reconstructing a packet");
    else throw new Error("Unknown type: " + t);
  }
  decodeString(t) {
    let n = 0;
    const r = { type: Number(t.charAt(0)) };
    if (J[r.type] === void 0) throw new Error("unknown packet type " + r.type);
    if (r.type === J.BINARY_EVENT || r.type === J.BINARY_ACK) {
      const o = n + 1;
      for (; t.charAt(++n) !== "-" && n != t.length; );
      const l = t.substring(o, n);
      if (l != Number(l) || t.charAt(n) !== "-") throw new Error("Illegal attachments");
      r.attachments = Number(l);
    }
    if (t.charAt(n + 1) === "/") {
      const o = n + 1;
      for (; ++n && !(t.charAt(n) === "," || n === t.length); );
      r.nsp = t.substring(o, n);
    } else r.nsp = "/";
    const i = t.charAt(n + 1);
    if (i !== "" && Number(i) == i) {
      const o = n + 1;
      for (; ++n; ) {
        const l = t.charAt(n);
        if (l == null || Number(l) != l) {
          --n;
          break;
        }
        if (n === t.length) break;
      }
      r.id = Number(t.substring(o, n + 1));
    }
    if (t.charAt(++n)) {
      const o = this.tryParse(t.substr(n));
      if (cu.isPayloadValid(r.type, o)) r.data = o;
      else throw new Error("invalid payload");
    }
    return r;
  }
  tryParse(t) {
    try {
      return JSON.parse(t, this.reviver);
    } catch {
      return !1;
    }
  }
  static isPayloadValid(t, n) {
    switch (t) {
      case J.CONNECT:
        return ud(n);
      case J.DISCONNECT:
        return n === void 0;
      case J.CONNECT_ERROR:
        return typeof n == "string" || ud(n);
      case J.EVENT:
      case J.BINARY_EVENT:
        return (
          Array.isArray(n) &&
          (typeof n[0] == "number" || (typeof n[0] == "string" && vy.indexOf(n[0]) === -1))
        );
      case J.ACK:
      case J.BINARY_ACK:
        return Array.isArray(n);
    }
  }
  destroy() {
    this.reconstructor &&
      (this.reconstructor.finishedReconstruction(), (this.reconstructor = null));
  }
}
class Ey {
  constructor(t) {
    (this.packet = t), (this.buffers = []), (this.reconPack = t);
  }
  takeBinaryData(t) {
    if ((this.buffers.push(t), this.buffers.length === this.reconPack.attachments)) {
      const n = my(this.reconPack, this.buffers);
      return this.finishedReconstruction(), n;
    }
    return null;
  }
  finishedReconstruction() {
    (this.reconPack = null), (this.buffers = []);
  }
}
const wy = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      Decoder: cu,
      Encoder: Cy,
      get PacketType() {
        return J;
      },
      protocol: yy,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
function vt(e, t, n) {
  return (
    e.on(t, n),
    function () {
      e.off(t, n);
    }
  );
}
const By = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  newListener: 1,
  removeListener: 1,
});
class rh extends ke {
  constructor(t, n, r) {
    super(),
      (this.connected = !1),
      (this.recovered = !1),
      (this.receiveBuffer = []),
      (this.sendBuffer = []),
      (this._queue = []),
      (this._queueSeq = 0),
      (this.ids = 0),
      (this.acks = {}),
      (this.flags = {}),
      (this.io = t),
      (this.nsp = n),
      r && r.auth && (this.auth = r.auth),
      (this._opts = Object.assign({}, r)),
      this.io._autoConnect && this.open();
  }
  get disconnected() {
    return !this.connected;
  }
  subEvents() {
    if (this.subs) return;
    const t = this.io;
    this.subs = [
      vt(t, "open", this.onopen.bind(this)),
      vt(t, "packet", this.onpacket.bind(this)),
      vt(t, "error", this.onerror.bind(this)),
      vt(t, "close", this.onclose.bind(this)),
    ];
  }
  get active() {
    return !!this.subs;
  }
  connect() {
    return this.connected
      ? this
      : (this.subEvents(),
        this.io._reconnecting || this.io.open(),
        this.io._readyState === "open" && this.onopen(),
        this);
  }
  open() {
    return this.connect();
  }
  send(...t) {
    return t.unshift("message"), this.emit.apply(this, t), this;
  }
  emit(t, ...n) {
    var r, i, o;
    if (By.hasOwnProperty(t)) throw new Error('"' + t.toString() + '" is a reserved event name');
    if ((n.unshift(t), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile))
      return this._addToQueue(n), this;
    const l = { type: J.EVENT, data: n };
    if (
      ((l.options = {}),
      (l.options.compress = this.flags.compress !== !1),
      typeof n[n.length - 1] == "function")
    ) {
      const d = this.ids++,
        f = n.pop();
      this._registerAckCallback(d, f), (l.id = d);
    }
    const s =
        (i = (r = this.io.engine) === null || r === void 0 ? void 0 : r.transport) === null ||
        i === void 0
          ? void 0
          : i.writable,
      a =
        this.connected &&
        !(!((o = this.io.engine) === null || o === void 0) && o._hasPingExpired());
    return (
      (this.flags.volatile && !s) ||
        (a ? (this.notifyOutgoingListeners(l), this.packet(l)) : this.sendBuffer.push(l)),
      (this.flags = {}),
      this
    );
  }
  _registerAckCallback(t, n) {
    var r;
    const i = (r = this.flags.timeout) !== null && r !== void 0 ? r : this._opts.ackTimeout;
    if (i === void 0) {
      this.acks[t] = n;
      return;
    }
    const o = this.io.setTimeoutFn(() => {
        delete this.acks[t];
        for (let s = 0; s < this.sendBuffer.length; s++)
          this.sendBuffer[s].id === t && this.sendBuffer.splice(s, 1);
        n.call(this, new Error("operation has timed out"));
      }, i),
      l = (...s) => {
        this.io.clearTimeoutFn(o), n.apply(this, s);
      };
    (l.withError = !0), (this.acks[t] = l);
  }
  emitWithAck(t, ...n) {
    return new Promise((r, i) => {
      const o = (l, s) => (l ? i(l) : r(s));
      (o.withError = !0), n.push(o), this.emit(t, ...n);
    });
  }
  _addToQueue(t) {
    let n;
    typeof t[t.length - 1] == "function" && (n = t.pop());
    const r = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: !1,
      args: t,
      flags: Object.assign({ fromQueue: !0 }, this.flags),
    };
    t.push((i, ...o) =>
      r !== this._queue[0]
        ? void 0
        : (i !== null
            ? r.tryCount > this._opts.retries && (this._queue.shift(), n && n(i))
            : (this._queue.shift(), n && n(null, ...o)),
          (r.pending = !1),
          this._drainQueue())
    ),
      this._queue.push(r),
      this._drainQueue();
  }
  _drainQueue(t = !1) {
    if (!this.connected || this._queue.length === 0) return;
    const n = this._queue[0];
    (n.pending && !t) ||
      ((n.pending = !0), n.tryCount++, (this.flags = n.flags), this.emit.apply(this, n.args));
  }
  packet(t) {
    (t.nsp = this.nsp), this.io._packet(t);
  }
  onopen() {
    typeof this.auth == "function"
      ? this.auth((t) => {
          this._sendConnectPacket(t);
        })
      : this._sendConnectPacket(this.auth);
  }
  _sendConnectPacket(t) {
    this.packet({
      type: J.CONNECT,
      data: this._pid ? Object.assign({ pid: this._pid, offset: this._lastOffset }, t) : t,
    });
  }
  onerror(t) {
    this.connected || this.emitReserved("connect_error", t);
  }
  onclose(t, n) {
    (this.connected = !1), delete this.id, this.emitReserved("disconnect", t, n), this._clearAcks();
  }
  _clearAcks() {
    Object.keys(this.acks).forEach((t) => {
      if (!this.sendBuffer.some((r) => String(r.id) === t)) {
        const r = this.acks[t];
        delete this.acks[t], r.withError && r.call(this, new Error("socket has been disconnected"));
      }
    });
  }
  onpacket(t) {
    if (t.nsp === this.nsp)
      switch (t.type) {
        case J.CONNECT:
          t.data && t.data.sid
            ? this.onconnect(t.data.sid, t.data.pid)
            : this.emitReserved(
                "connect_error",
                new Error(
                  "It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"
                )
              );
          break;
        case J.EVENT:
        case J.BINARY_EVENT:
          this.onevent(t);
          break;
        case J.ACK:
        case J.BINARY_ACK:
          this.onack(t);
          break;
        case J.DISCONNECT:
          this.ondisconnect();
          break;
        case J.CONNECT_ERROR:
          this.destroy();
          const r = new Error(t.data.message);
          (r.data = t.data.data), this.emitReserved("connect_error", r);
          break;
      }
  }
  onevent(t) {
    const n = t.data || [];
    t.id != null && n.push(this.ack(t.id)),
      this.connected ? this.emitEvent(n) : this.receiveBuffer.push(Object.freeze(n));
  }
  emitEvent(t) {
    if (this._anyListeners && this._anyListeners.length) {
      const n = this._anyListeners.slice();
      for (const r of n) r.apply(this, t);
    }
    super.emit.apply(this, t),
      this._pid &&
        t.length &&
        typeof t[t.length - 1] == "string" &&
        (this._lastOffset = t[t.length - 1]);
  }
  ack(t) {
    const n = this;
    let r = !1;
    return function (...i) {
      r || ((r = !0), n.packet({ type: J.ACK, id: t, data: i }));
    };
  }
  onack(t) {
    const n = this.acks[t.id];
    typeof n == "function" &&
      (delete this.acks[t.id], n.withError && t.data.unshift(null), n.apply(this, t.data));
  }
  onconnect(t, n) {
    (this.id = t),
      (this.recovered = n && this._pid === n),
      (this._pid = n),
      (this.connected = !0),
      this.emitBuffered(),
      this.emitReserved("connect"),
      this._drainQueue(!0);
  }
  emitBuffered() {
    this.receiveBuffer.forEach((t) => this.emitEvent(t)),
      (this.receiveBuffer = []),
      this.sendBuffer.forEach((t) => {
        this.notifyOutgoingListeners(t), this.packet(t);
      }),
      (this.sendBuffer = []);
  }
  ondisconnect() {
    this.destroy(), this.onclose("io server disconnect");
  }
  destroy() {
    this.subs && (this.subs.forEach((t) => t()), (this.subs = void 0)), this.io._destroy(this);
  }
  disconnect() {
    return (
      this.connected && this.packet({ type: J.DISCONNECT }),
      this.destroy(),
      this.connected && this.onclose("io client disconnect"),
      this
    );
  }
  close() {
    return this.disconnect();
  }
  compress(t) {
    return (this.flags.compress = t), this;
  }
  get volatile() {
    return (this.flags.volatile = !0), this;
  }
  timeout(t) {
    return (this.flags.timeout = t), this;
  }
  onAny(t) {
    return (this._anyListeners = this._anyListeners || []), this._anyListeners.push(t), this;
  }
  prependAny(t) {
    return (this._anyListeners = this._anyListeners || []), this._anyListeners.unshift(t), this;
  }
  offAny(t) {
    if (!this._anyListeners) return this;
    if (t) {
      const n = this._anyListeners;
      for (let r = 0; r < n.length; r++) if (t === n[r]) return n.splice(r, 1), this;
    } else this._anyListeners = [];
    return this;
  }
  listenersAny() {
    return this._anyListeners || [];
  }
  onAnyOutgoing(t) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.push(t),
      this
    );
  }
  prependAnyOutgoing(t) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.unshift(t),
      this
    );
  }
  offAnyOutgoing(t) {
    if (!this._anyOutgoingListeners) return this;
    if (t) {
      const n = this._anyOutgoingListeners;
      for (let r = 0; r < n.length; r++) if (t === n[r]) return n.splice(r, 1), this;
    } else this._anyOutgoingListeners = [];
    return this;
  }
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  notifyOutgoingListeners(t) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const n = this._anyOutgoingListeners.slice();
      for (const r of n) r.apply(this, t.data);
    }
  }
}
function kr(e) {
  (e = e || {}),
    (this.ms = e.min || 100),
    (this.max = e.max || 1e4),
    (this.factor = e.factor || 2),
    (this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0),
    (this.attempts = 0);
}
kr.prototype.duration = function () {
  var e = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var t = Math.random(),
      n = Math.floor(t * this.jitter * e);
    e = Math.floor(t * 10) & 1 ? e + n : e - n;
  }
  return Math.min(e, this.max) | 0;
};
kr.prototype.reset = function () {
  this.attempts = 0;
};
kr.prototype.setMin = function (e) {
  this.ms = e;
};
kr.prototype.setMax = function (e) {
  this.max = e;
};
kr.prototype.setJitter = function (e) {
  this.jitter = e;
};
class sa extends ke {
  constructor(t, n) {
    var r;
    super(),
      (this.nsps = {}),
      (this.subs = []),
      t && typeof t == "object" && ((n = t), (t = void 0)),
      (n = n || {}),
      (n.path = n.path || "/socket.io"),
      (this.opts = n),
      yl(this, n),
      this.reconnection(n.reconnection !== !1),
      this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0),
      this.reconnectionDelay(n.reconnectionDelay || 1e3),
      this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3),
      this.randomizationFactor((r = n.randomizationFactor) !== null && r !== void 0 ? r : 0.5),
      (this.backoff = new kr({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor(),
      })),
      this.timeout(n.timeout == null ? 2e4 : n.timeout),
      (this._readyState = "closed"),
      (this.uri = t);
    const i = n.parser || wy;
    (this.encoder = new i.Encoder()),
      (this.decoder = new i.Decoder()),
      (this._autoConnect = n.autoConnect !== !1),
      this._autoConnect && this.open();
  }
  reconnection(t) {
    return arguments.length
      ? ((this._reconnection = !!t), t || (this.skipReconnect = !0), this)
      : this._reconnection;
  }
  reconnectionAttempts(t) {
    return t === void 0 ? this._reconnectionAttempts : ((this._reconnectionAttempts = t), this);
  }
  reconnectionDelay(t) {
    var n;
    return t === void 0
      ? this._reconnectionDelay
      : ((this._reconnectionDelay = t),
        (n = this.backoff) === null || n === void 0 || n.setMin(t),
        this);
  }
  randomizationFactor(t) {
    var n;
    return t === void 0
      ? this._randomizationFactor
      : ((this._randomizationFactor = t),
        (n = this.backoff) === null || n === void 0 || n.setJitter(t),
        this);
  }
  reconnectionDelayMax(t) {
    var n;
    return t === void 0
      ? this._reconnectionDelayMax
      : ((this._reconnectionDelayMax = t),
        (n = this.backoff) === null || n === void 0 || n.setMax(t),
        this);
  }
  timeout(t) {
    return arguments.length ? ((this._timeout = t), this) : this._timeout;
  }
  maybeReconnectOnOpen() {
    !this._reconnecting && this._reconnection && this.backoff.attempts === 0 && this.reconnect();
  }
  open(t) {
    if (~this._readyState.indexOf("open")) return this;
    this.engine = new cy(this.uri, this.opts);
    const n = this.engine,
      r = this;
    (this._readyState = "opening"), (this.skipReconnect = !1);
    const i = vt(n, "open", function () {
        r.onopen(), t && t();
      }),
      o = (s) => {
        this.cleanup(),
          (this._readyState = "closed"),
          this.emitReserved("error", s),
          t ? t(s) : this.maybeReconnectOnOpen();
      },
      l = vt(n, "error", o);
    if (this._timeout !== !1) {
      const s = this._timeout,
        a = this.setTimeoutFn(() => {
          i(), o(new Error("timeout")), n.close();
        }, s);
      this.opts.autoUnref && a.unref(),
        this.subs.push(() => {
          this.clearTimeoutFn(a);
        });
    }
    return this.subs.push(i), this.subs.push(l), this;
  }
  connect(t) {
    return this.open(t);
  }
  onopen() {
    this.cleanup(), (this._readyState = "open"), this.emitReserved("open");
    const t = this.engine;
    this.subs.push(
      vt(t, "ping", this.onping.bind(this)),
      vt(t, "data", this.ondata.bind(this)),
      vt(t, "error", this.onerror.bind(this)),
      vt(t, "close", this.onclose.bind(this)),
      vt(this.decoder, "decoded", this.ondecoded.bind(this))
    );
  }
  onping() {
    this.emitReserved("ping");
  }
  ondata(t) {
    try {
      this.decoder.add(t);
    } catch (n) {
      this.onclose("parse error", n);
    }
  }
  ondecoded(t) {
    vl(() => {
      this.emitReserved("packet", t);
    }, this.setTimeoutFn);
  }
  onerror(t) {
    this.emitReserved("error", t);
  }
  socket(t, n) {
    let r = this.nsps[t];
    return (
      r
        ? this._autoConnect && !r.active && r.connect()
        : ((r = new rh(this, t, n)), (this.nsps[t] = r)),
      r
    );
  }
  _destroy(t) {
    const n = Object.keys(this.nsps);
    for (const r of n) if (this.nsps[r].active) return;
    this._close();
  }
  _packet(t) {
    const n = this.encoder.encode(t);
    for (let r = 0; r < n.length; r++) this.engine.write(n[r], t.options);
  }
  cleanup() {
    this.subs.forEach((t) => t()), (this.subs.length = 0), this.decoder.destroy();
  }
  _close() {
    (this.skipReconnect = !0), (this._reconnecting = !1), this.onclose("forced close");
  }
  disconnect() {
    return this._close();
  }
  onclose(t, n) {
    var r;
    this.cleanup(),
      (r = this.engine) === null || r === void 0 || r.close(),
      this.backoff.reset(),
      (this._readyState = "closed"),
      this.emitReserved("close", t, n),
      this._reconnection && !this.skipReconnect && this.reconnect();
  }
  reconnect() {
    if (this._reconnecting || this.skipReconnect) return this;
    const t = this;
    if (this.backoff.attempts >= this._reconnectionAttempts)
      this.backoff.reset(), this.emitReserved("reconnect_failed"), (this._reconnecting = !1);
    else {
      const n = this.backoff.duration();
      this._reconnecting = !0;
      const r = this.setTimeoutFn(() => {
        t.skipReconnect ||
          (this.emitReserved("reconnect_attempt", t.backoff.attempts),
          !t.skipReconnect &&
            t.open((i) => {
              i
                ? ((t._reconnecting = !1), t.reconnect(), this.emitReserved("reconnect_error", i))
                : t.onreconnect();
            }));
      }, n);
      this.opts.autoUnref && r.unref(),
        this.subs.push(() => {
          this.clearTimeoutFn(r);
        });
    }
  }
  onreconnect() {
    const t = this.backoff.attempts;
    (this._reconnecting = !1), this.backoff.reset(), this.emitReserved("reconnect", t);
  }
}
const Hr = {};
function Eo(e, t) {
  typeof e == "object" && ((t = e), (e = void 0)), (t = t || {});
  const n = dy(e, t.path || "/socket.io"),
    r = n.source,
    i = n.id,
    o = n.path,
    l = Hr[i] && o in Hr[i].nsps,
    s = t.forceNew || t["force new connection"] || t.multiplex === !1 || l;
  let a;
  return (
    s ? (a = new sa(r, t)) : (Hr[i] || (Hr[i] = new sa(r, t)), (a = Hr[i])),
    n.query && !t.query && (t.query = n.queryKey),
    a.socket(n.path, t)
  );
}
Object.assign(Eo, { Manager: sa, Socket: rh, io: Eo, connect: Eo });
function Sy(e) {
  return Object.keys(e)
    .map((t) => t + "=" + encodeURIComponent(e[t]))
    .join("&");
}
function ih(e) {
  if (!e.ok) throw `API request failed with response status ${e.status} and text: ${e.statusText}`;
  return e
    .clone()
    .json()
    .catch((t) =>
      e.text().then((n) => {
        throw `API request's result could not be converted to a JSON object: 
${n}`;
      })
    );
}
function Ln(e, t = {}) {
  const n = e + "?" + Sy(t);
  return fetch(n)
    .then(ih)
    .catch((r) => {
      throw `GET request to ${n} failed with error:
${r}`;
    });
}
function jt(e, t = {}) {
  return fetch(e, {
    method: "post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(t),
  })
    .then(ih)
    .catch((n) => {
      throw `POST request to ${e} failed with error:
${n}`;
    });
}
const ky = window.location.hostname + ":" + window.location.port,
  Be = Eo(ky);
Be.on("connect", () => {
  jt("/api/initsocket", { socketid: Be.id });
});
const Qy = "/assets/Theme1LetterGrove-f3a657d3.mp3",
  Ry = "/assets/ThemeTwoLetterGrove-9ad21c2c.mp3",
  ns = [Qy, Ry],
  Iy = () => {
    const e = E.useRef(null);
    E.useContext(du);
    const [t, n] = E.useState(0),
      [r, i] = E.useState(!1),
      o = () => {
        ns.length > 0 && n((l) => (l + 1) % ns.length);
      };
    return (
      E.useEffect(() => {
        const l = () => {
          !r &&
            e.current &&
            (i(!0),
            (e.current.volume = 0.5),
            e.current.play().catch((s) => {
              console.error("Error playing audio:", s);
            }));
        };
        return (
          document.addEventListener("click", l), () => document.removeEventListener("click", l)
        );
      }, [r]),
      E.useEffect(() => {
        if (e.current) {
          e.current.volume = 0.5;
          const l = () => {},
            s = () => {
              o();
            },
            a = (u) => {
              console.error("Audio error:", u);
            };
          return (
            e.current.addEventListener("playing", l),
            e.current.addEventListener("ended", s),
            e.current.addEventListener("error", a),
            r &&
              e.current.play().catch((u) => {
                console.error("Error playing new theme:", u);
              }),
            () => {
              e.current &&
                (e.current.removeEventListener("playing", l),
                e.current.removeEventListener("ended", s),
                e.current.removeEventListener("error", a));
            }
          );
        }
      }, [t, r]),
      v.jsx("audio", { ref: e, src: ns[t], preload: "auto", loop: !1 })
    );
  };
const du = E.createContext(null),
  Dy = () => {
    const [e, t] = E.useState(void 0);
    E.useEffect(() => {
      Ln("/api/whoami").then((o) => {
        o._id && t(o._id);
      });
    }, []);
    const i = {
      userId: e,
      handleLogin: (o) => {
        const l = o.credential,
          s = xv(l);
        console.log(`Logged in as ${s.name}`),
          jt("/api/login", { token: l }).then((a) => {
            t(a._id), jt("/api/initsocket", { socketid: Be.id });
          });
      },
      handleLogout: () => {
        t(void 0), jt("/api/logout");
      },
    };
    return v.jsxs(du.Provider, { value: i, children: [v.jsx(Iy, {}), v.jsx(Av, {})] });
  };
function xy(e = {}) {
  const { nonce: t, onScriptLoadSuccess: n, onScriptLoadError: r } = e,
    [i, o] = E.useState(!1),
    l = E.useRef(n);
  l.current = n;
  const s = E.useRef(r);
  return (
    (s.current = r),
    E.useEffect(() => {
      const a = document.createElement("script");
      return (
        (a.src = "https://accounts.google.com/gsi/client"),
        (a.async = !0),
        (a.defer = !0),
        (a.nonce = t),
        (a.onload = () => {
          var u;
          o(!0), (u = l.current) === null || u === void 0 || u.call(l);
        }),
        (a.onerror = () => {
          var u;
          o(!1), (u = s.current) === null || u === void 0 || u.call(s);
        }),
        document.body.appendChild(a),
        () => {
          document.body.removeChild(a);
        }
      );
    }, [t]),
    i
  );
}
const oh = E.createContext(null);
function Ly({ clientId: e, nonce: t, onScriptLoadSuccess: n, onScriptLoadError: r, children: i }) {
  const o = xy({ nonce: t, onScriptLoadSuccess: n, onScriptLoadError: r }),
    l = E.useMemo(() => ({ clientId: e, scriptLoadedSuccessfully: o }), [e, o]);
  return Pn.createElement(oh.Provider, { value: l }, i);
}
function Ny() {
  const e = E.useContext(oh);
  if (!e) throw new Error("Google OAuth components must be used within GoogleOAuthProvider");
  return e;
}
function Uy(e) {
  var t;
  return (t = e == null ? void 0 : e.clientId) !== null && t !== void 0
    ? t
    : e == null
    ? void 0
    : e.client_id;
}
const Py = { large: 40, medium: 32, small: 20 };
function Ty({
  onSuccess: e,
  onError: t,
  useOneTap: n,
  promptMomentNotification: r,
  type: i = "standard",
  theme: o = "outline",
  size: l = "large",
  text: s,
  shape: a,
  logo_alignment: u,
  width: d,
  locale: f,
  click_listener: A,
  containerProps: y,
  ...S
}) {
  const B = E.useRef(null),
    { clientId: D, scriptLoadedSuccessfully: g } = Ny(),
    c = E.useRef(e);
  c.current = e;
  const p = E.useRef(t);
  p.current = t;
  const k = E.useRef(r);
  return (
    (k.current = r),
    E.useEffect(() => {
      var Q, m, L, I, j, P, _, ie, ce;
      if (g)
        return (
          (L =
            (m =
              (Q = window == null ? void 0 : window.google) === null || Q === void 0
                ? void 0
                : Q.accounts) === null || m === void 0
              ? void 0
              : m.id) === null ||
            L === void 0 ||
            L.initialize({
              client_id: D,
              callback: (te) => {
                var Te;
                if (!(te != null && te.credential))
                  return (Te = p.current) === null || Te === void 0 ? void 0 : Te.call(p);
                const { credential: Ke, select_by: Ae } = te;
                c.current({ credential: Ke, clientId: Uy(te), select_by: Ae });
              },
              ...S,
            }),
          (P =
            (j =
              (I = window == null ? void 0 : window.google) === null || I === void 0
                ? void 0
                : I.accounts) === null || j === void 0
              ? void 0
              : j.id) === null ||
            P === void 0 ||
            P.renderButton(B.current, {
              type: i,
              theme: o,
              size: l,
              text: s,
              shape: a,
              logo_alignment: u,
              width: d,
              locale: f,
              click_listener: A,
            }),
          n &&
            ((ce =
              (ie =
                (_ = window == null ? void 0 : window.google) === null || _ === void 0
                  ? void 0
                  : _.accounts) === null || ie === void 0
                ? void 0
                : ie.id) === null ||
              ce === void 0 ||
              ce.prompt(k.current)),
          () => {
            var te, Te, Ke;
            n &&
              ((Ke =
                (Te =
                  (te = window == null ? void 0 : window.google) === null || te === void 0
                    ? void 0
                    : te.accounts) === null || Te === void 0
                  ? void 0
                  : Te.id) === null ||
                Ke === void 0 ||
                Ke.cancel());
          }
        );
    }, [D, g, n, i, o, l, s, a, u, d, f]),
    Pn.createElement("div", {
      ...y,
      ref: B,
      style: { height: Py[l], ...(y == null ? void 0 : y.style) },
    })
  );
}
function My() {
  var e, t, n;
  (n =
    (t =
      (e = window == null ? void 0 : window.google) === null || e === void 0
        ? void 0
        : e.accounts) === null || t === void 0
      ? void 0
      : t.id) === null ||
    n === void 0 ||
    n.disableAutoSelect();
}
const Oy =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAABACAYAAACKusa+AAAI8UlEQVR4Xu3dra9lVxnH8VuJIIeSvrgROFQdCWRsVTN/QSvwaEJSV9N/oeAQiIqqNlW1JA2gCAKHuA4aUi6IwQ25hnTvSc9znq6119v+jJuctdfL9/mtvb+z77pnXrkb7M/lcnmRmdLlcsk01xYBBBAYhsDDw8PVubi/DVMqE0GgmMD9/f0rxZ1U7GCoyTyuiwBWrK6uEEBgaAIEcOjymBwCVQkQwAAnAayaN50hgMDABAjgwMUxNQQqEyCABLBypHSHAAKzEiCAs1bOvBHIEyCAO2b7N35//Pw3mxbP//3VVcrPH8o+z5fQFQgggAACCCCAQI7Azz/8fHNBbyHsfgaQAOYCpDUCCCCAAAIIzEeAAHoDOF9qzRgBBBBAAAEEiggQQAJYFCAXI4AAAggggMB8BAjgrmZPnjzZfO/fp7/+5dWq7s/8RX+fLyJmjAACCCCAAAKrEXjnV5/sl9T1GF7XwR9JEMDVIm49CCCAAAIIILAnQAC9AbQrEEAAAQQQQOBkBAggATxZ5C0XAQQQQAABBAhgUgD3Z/xe/PefV1P09T/+LmUI3Ezg1Tfe3LT97Isvb772uzR8+taPvstlrkEAAQQQmJwAASSAk0d4rekTwLXqaTUIIIDAqAQIIAEcNZunnBcBPGXZLRoBBBBoToAAEsDmoTPgtxMggNKBAAIIINCCAAEMBPDdp68V1WG1M1Z7QdnDceaxKC4vXVzKOyuUq+W1bjX0hgACGQKl96/MWCO2jdbf+/lJAAlgat9EgSaAKZxh41LeBDBErAECCBxEoPT+ddC0mnUbrZ8AbgkM90XQ3gBuCxQFmgDWvbeU8iaAdeuhNwQQuJ1A6f3r9pHGbBmtnwASwDGT+y2zigJNAOuWs5Q3AaxbD70hgMDtBErvX7ePNGbLaP0EcHAB/PiDZ1eTtbrwHC0Q0QZZnW/r2xberYn3HU+9+/KfbfTf//lvTac8+5nj2Xk5A7iL+/7/AiaAuS8mzm5oD6im99s7vNvy7j2aeveuwFzjzy40rWnPzosAEsCre8YbwNa3lGPHIwTH8h2td/UerSJjz2d2oWlNd3ZeBJAAEsDWd42O4xGCjvA7DK3eHaBPPOTsQtMa/ey8CGAggL99/51Ni/3/Bdw6cKONl31DmJ1/9kfK2f61R2BlAkc/oOzPldOTX1v2eTB7fqJ/YO0JjnamnQASwPwu/8YV2Q2fHWz2G0R2vdojUJMAAaxJU18RgezzYPb7OwGMEpH7fLjvAfQG8HoBsxs+F4e7u9lvENn1ao9ATQIEsCZNfUUEss+D2e/vBDBKRO5zApjj1b11dsNnJzz7DSK7Xu0RqEmAANakqa+IQPZ5MPv9nQBGich9TgBzvIZrHW2I0c5ADAfQhA4lIJ+5N/pRMc62n6P8RLz2n6/OL+K1+vqzeWjd3hnAHfH99wD6EXAukjZ8jpfWbQnIJwEsSVyUn2zfqwtQxGv19Wfz0Lo9ASSAVTNnw1fFqbPKBOSTAJZEKspPtu/VBSjitfr6s3lo3Z4AEsCqmbPhq+LUWWUC8kkASyIV5Sfb9+oCFPFaff3ZPLRuTwADAfzoFz9pXRPjIXBaAtlD5LVBPXv7p6kuPcBSuA5vfPQvvRy+gN0As/+SRGtepePt7z+r728CSABL94zrEahGgABWQ3nKjgjgKctebdEE8K7rL+J2HfwxRftfAvEGsNre0hECIQECGCLS4AoBAigeJQQIIAF88c0AEcCS7eRaBHIECGCOl9ZbAgRQIkoIEEACSABLdpBrEahIoPUh8toC4QxXxTDc0FWUlxu6KGqy+pmxIjgDXhz9g3P1/esM4C6UfgQ84C41pdMSiB7otR+4BHDuqEV5OXp1tfN49HzP3j8B/GQfga7H8LoO/kiCAJ79lmD9IxGIHui1H7gEcKTq5+cS5SXfY+6K2nnMja51lgABJICbzBDA7BbSHoHjCEQP9NoPXAJ4XC1b9Bzl5eg51M7j0fM9e/8EkAASwBPfBaIHxuo39LMdej5x1C0dgdMTiIRvdEC1zyQ6A7iruDeAo2+BuvMjgG9ugK4uvHXTozcEEJiJAAHcVosAEsCZ9m/1uRJAAlg9VDpEAIEhCRBAAng1mN4ADrlvD5sUASSAh4VLxwggMBQBAkgAUwL44Xs/3rR/9fL9oQI922RaH7IvHa/2mYvW9cquf/b1tuZrPAQQOA+B6IVBKYnWR3D8CDj4ETABLI309vqskESjR8JSOl7UfzS/3p9n1z/7envzNj4CCKxLgAAeW9vhvgeQANYteFZIotEjYSkdL+o/ml/vz7Prn329vXkbHwEE1iVAAI+tLQE8lm/33rNCEk04EpbS8aL+o/n1/jy7/tnX25u38RFAYF0CBPDY2g4ngO8+fS21Yg/QFK6XGmc32GdffJka8Oz1ifi2PoOSKp7GCCCAAALVCDgDuEO5/y1gAlgtazd1FAnKvhMCeBPW/zeK+BLAHE+tEUAAgVkJEEACOFR2I0EhgGXlivgSwDK+rkYAAQRmIUAACeBQWY0EhQCWlSviSwDL+LoaAQQQmIUAAQwE8OMPnm1a/OFPf9n8/fUffG/zd98T2Db6hKYtb6MhMDKBrx/+03V67v9d8Rs8SYAAEsBkZMZqTgDHqofZINCTAAHsSd/YsxEggARwtsxu37i+sf2vzPaL8SPNqctr8gikCBDAFC6NT06AABLAqbeAN4BTl8/kEahKgABWxamzxQkQwEAA3/vZ9g3T6z/cnvnb52N/JnDx/FgeAgicmMBX/3p+4tW/vHT3f3GYicD7v/vrZrr39/ddv4u56+CPJPbfA0gAZ4qzuSKAQEsCBHBLmwC2TJ+xSgkQQG8ASzPkegQQOCkBAkgATxr9JZZNAAngEkG2CAQQaE+AABLA9qkzYi0CBDAguf+RcC3w+kEAAQQeHh5AWJjA5XJZeHWWNjuB3mf+9vy6nwHcT4gAzh5x80dgXAIEcNza1JgZAaxBUR9HESCA3gAelS39IoBAQIAArh0RArh2fWdfHQEkgLNn2PwRmJYAAZy2dDdNnADehEmjTgRGE8D/AebIuG7OwozRAAAAAElFTkSuQmCC";
const fu =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABLElEQVRYR92XQQqDMBAAI37Bg9DfeOlD+o/+pN8o9Au9VeoTQj0IehbEskJKSDbJaraNNODFmJ3JZqMxE4lblpgvdiswfyEz6GSxm/Orqhb+ta7ZPE5dB7EsnnljgU9SiucwsMEhkJwmgUmgAo+mYYWvErgUhTjk+SJwbNuPyK0syVLYOHIGXAJAp0jocH0Mi0BIwoRHC5jLoNYAy4QPvrkGFDAUPNQfLeDLBAXOIuCSMLeGq1A3FSG277AZ+2pD9bEJrClMfQL/I5B0CXzwUB1EL4Fru/1kG4Ygof6o9wAlOGVnbFoCKpzyymYRSPo5psCxTKhx93EU5763zoXWkUw/kJCPQIEHIf1wUQQg1AwSXA3A0DC4lQ4NmvS/gGvypDi7/TUj2XM8lDwDbwT9CTCdRwYpAAAAAElFTkSuQmCC";
const rs = (e) => {
    const [t, n] = E.useState("");
    return v.jsxs("div", {
      className: "settings-row",
      children: [
        v.jsx("span", { className: "settings-label", children: e.text }),
        v.jsx("input", {
          type: "number",
          placeholder: e.placeholder,
          className: e.className,
          onChange: (r) => {
            n(r.target.value), e.setGameSettings({ ...e.gameSettings, [e.id]: r.target.value });
          },
        }),
      ],
    });
  },
  Fy = (e) => {
    const [t, n] = E.useState("Time");
    return v.jsxs("div", {
      className: "settings-row",
      children: [
        v.jsx("span", { className: "settings-label", children: "Mode" }),
        v.jsxs("select", {
          onChange: (r) => {
            n(r.target.value), e.setGameSettings({ ...e.gameSettings, mode: r.target.value });
          },
          defaultValue: "Time",
          children: [
            v.jsx("option", { value: "Time", children: "Time (s)" }),
            v.jsx("option", { value: "Words", children: "Words" }),
            v.jsx("option", { value: "Letters", children: "Letters" }),
          ],
        }),
      ],
    });
  },
  jy = (e) =>
    v.jsxs("div", {
      className: "settings-container",
      children: [
        v.jsx(Fy, { gameSettings: e.gameSettings, setGameSettings: e.setGameSettings }),
        v.jsx(rs, {
          text: e.gameSettings.mode,
          id: "steps",
          className: "steps-input",
          gameSettings: e.gameSettings,
          setGameSettings: e.setGameSettings,
          placeholder: e.gameSettings.steps,
        }),
        v.jsx(rs, {
          text: "Points Modifier",
          id: "pointsModifier",
          gameSettings: e.gameSettings,
          setGameSettings: e.setGameSettings,
          placeholder: e.gameSettings.pointsModifier,
        }),
        v.jsx(rs, {
          text: "Min Word Length",
          id: "minWordLength",
          gameSettings: e.gameSettings,
          setGameSettings: e.setGameSettings,
          placeholder: e.gameSettings.minWordLength,
        }),
      ],
    });
const zy =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAAkCAYAAABmOOTyAAACGElEQVR4Xu3dMS9DYRQGYAYxGC0WP8bib1jFhF1ilBiYsImFyR+wGCwM7CYSCxIJEYJKSD5uohRN3RynzdPlppXb897npG+bDtrf9/X20uIxDxEg0BsC/R8vo+nO+x8UQG8s2lUQaCXwbQGUF/7R9mLTSTcXJ+V+4+kOJwECXS4wPr1RXUEpgo9toAC6fLniE/hN4NcCONicL89xf335drx9O7oRINC9AgODQyW8AujeHUpOoGOBtgtgd2XKO3/HzE4kkFPg7PyqBJtc2v35OwAFkHOBUhH4i0DbBbCzPFHmNB596/8XcOcSyCSgADJtQxYCwQIKIBjcOAKZBBRApm3IQiBYQAEEgxtHIJOAAsi0DVkIBAsogGBw4whkElAAmbYhC4FgAQUQDG4cgUwCCiDTNmQhECygAILBjSOQSUABZNqGLASCBRRAMLhxBDIJKIBM25CFQLCAAggGN45AJgEFkGkbshAIFlAAweDGEcgkoAAybUMWAsECCiAY3DgCmQQUQKZtyEIgWEABBIMbRyCTwPHpRYkzu7pXxWr9y0D+KWimtclCoB6BtgtgbWasTBwdGa5nsmchQODfBKoX/t1Do2SYW9//+ROAAvi3XRlMoHaBjgug9iSekACBMIH7h+cyq3rnr44LW4ftfQIIS2oQAQK1C3RSAFWI8jPhbgQI9KRA+fa/6WPAp8tUAD25dxdFoAg0FcAr1YBKNGhdABAAAAAASUVORK5CYIIA",
  Hy =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAFaklEQVR4Xu2dsW4UMRCGLxIlUtIiikAReqh4AhqooIeKmkfgPeighwoKHoAWekCCSAhEgxKRDqQgpEDWzp09s57ZeHc+unD27M4/3/5jO3uwteJPaAW2QmdP8isACA4BAABAcAWCp48DAEBwBYKnjwMAQHAFgqePAwBAcAWCp48DAEBwBYKnjwMAQHAFgqePAwBAcAWCp48DAEBwBYKnjwMAQHAFgqePAwBAcAWCp48DAEBwBYKnjwMAQHAFgqePAwDA5AocK684d0i7zvc8xO1aECWckuFd5wsAkhK2jQGATL+uBWmr9drZXeeLAzhUfE7AAwAA+CswpyfCQQ1aAACosJrUlT0uViT++5vHiRq/jr4Wf75671VNPY8catccfl7M9/3T68VYPw5+Jp/ffPSxdm3TfE2Dndw5AAxKCAAZzzhAKggOQAuI1QK+vH6YJHz51pPk588v7iQ/L20NsHf/bZLfh2c3kp+vPXi37DUAAAAADjBQAAegBcyuBTRt8/KeX2t4+ZogHy9YI9Qu0fT5p+e3i/Ov3H2pip87gvcuYcw5AAAMSgoAyn0+DlA2BBwg04cW4HtUbN4C8m1eftav7YnRAMjzzfWzPicAANUS7exg6zUAAARvAQAAAIkCi2sBjY4bbjoAhCt5mjAAAIDrUfHku4Dg9VSn34MDJEe/2jd68oxr5wC1fb9awc4mtOafAyH4XUHxIZc4AAAYQgQAld+O4QDpG1E5eziA4dN4HqFm7wC1s35tz8/HR3cArR6CRaLtGgAA2nyj5gAAkL0V3CZ3f7MBoFITWkAqUE0PjxZQfOVL2wL6ewaXdUcCAPKEkzXBugUCAMyIkVkCoH2Tt/bSRa/10ub54enpt4QuXLwkSgsARDKdzyAA2KC7VhgcYDPAs3GAYdG1Vjec2zsMLXmO8SkAGKOa4xwAENg+DmBH4CwdYGjjv4++/Vdj78HpV6eHY+baAjblsKn82gfjbxwAsHuYTCJtglWy8AUAHOA/hIs7B5A8GZtW+EtrAZZ5zr4FSIorGWPi3wZBpgYdAAyKZhkCAATbwClWx5ZF1cTaBIDXbmdRDmC5PdIUzXLs4gCwOnqVWCMAnP67yB66n+irex/A40bG7Hctn1LPWC1HwR6L3TXnDwAAAKcKVN8IwgF0uOAAAr0kx6LDMKWWoX3LVnB7qiGllza1eVo9bMMEumkBlZsqig4AKiaTwQAwXjvRTBxAJJPfoJ5bgF/W8sjNDnB8nL4lXvuigvzWZCNrBd7aknzDXXatMaNyffIY563XGn1020AAKGMBAGMeG8UcHEAh1mq1yvXCAXT6qUeHcwC1Qs4Tel8DOKdfDW/uANUrTjwAAMqCA4AzkLUW4Hz5angAqErUNgAA2vQzn+3dEnoveC7o4h1AkLApZABgKqd9MBwg1RQHMGYMBzAW1DocDoADWDOVxMMBXOVtD44D4ADtFBUi4ACu8voHrzmEdYHz61nHrykWbhcwQhDXHg8AtYpM/DkOsGp7I2jieplfDgBmBkCtYDkheY/Vzi8RNyb21D1fcDQ+LwfQFnBMkaQ2MyY2AEjV3TAOANoEnP0uAACCA6BN33Pb5Rlbm6d0/OwdQJrov3GeRfKMrc1TOh4Asm82SYVbNw4AWtSbaK5nkTxje8nT7AAHBwfJvW1vb3vdK3ENFDg8PEyi7OzsnDkaGP5F9V8IAQCDqkwYAgAmFLvHSwFAj1WZ8J7MAdjf31etAVgj+FY7L3B+tfzz3d3dtjUAAPgWVBsdALSKLWw8ACysoNp0pgAgv6fifyWbbxO1CTG+TYE1+/xiz1d9eDIYANpq5DobAFzl7T84APRfI9c7bAXgDwzDDMzwcV4XAAAAAElFTkSuQmCC",
  Au = (e) => {
    const [t, n] = E.useState(!1);
    E.useEffect(() => {
      const i = (l) => {
        l.key === "Escape" && r();
      };
      document.addEventListener("keydown", i);
      const o = setTimeout(r, e.timeout || 3e3);
      return () => {
        document.removeEventListener("keydown", i), clearTimeout(o);
      };
    }, [e.timeout]);
    const r = () => {
      t ||
        (n(!0),
        setTimeout(() => {
          e.setShowAlert(!1);
        }, 800));
    };
    return v.jsxs("div", {
      className: `alert-box ${t ? "hiding" : ""}`,
      children: [
        v.jsx("img", { src: zy, alt: "Alert Sign", className: "alert-sign" }),
        v.jsx("img", { src: Hy, alt: "Confusion Shiba", className: "confusion-shiba" }),
        v.jsx("p", { children: e.message }),
      ],
    });
  },
  by =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAABACAYAAABr564eAAAE6ElEQVR4Xu2dMWtUQRCATSESJDwjpLSxsE0rIloJprRQMPYi3A8QVDCVYGeKCHY2po2FwUJsRETs0gpRsJMUekaIYBEJNrcb2LnNvH07u/ulS97btzPfzH15N7nLzRwTvrqu25fO4TgEIAABiwTG4/FMKK7gwYOFCNBiWYkJAhCYhgACnIYS50AAAlUSQIBVlpWkIACBaQhEC9B/yvtp81lwn92db87xvfHONHEd+Zy/f34feS0LIQCBsgnMdgvBBPzjl28+cM73hXhoBogAy24QoodAzQQQIHeANfc3uUEg6g7PP5k7QBoIAhColsDgd4AfNp4EZ3z+zM+f0aWeCVZbaRKDAAQOEfAFKAnx6p1V3QwQAdKFEICAFQII0EoliAMCEBicAAIcHDkbQgACVggMLsC3z+8HZ4A+mF/fv1phRRwQgEDlBCQhqmeACLDyDiI9CBRMAAEWXDxChwAEdAQQoI4fqyEAgYIJJBfgq9XbQTzM/AruHkKHQGUEfCFeu7vuZBj9XmAEWFmHkA4EKiaAACsuLqlBAAJhAgiQDoEABJolkFyAzPya7S0Sh4B5AsdPnHRivP7wZb8zQARovgcIEALNEkCAzZaexCEAAQRID0AAAs0SQIDGSj/Xzaki2h3vqtbXvvj91hfTKV5cPGs6vtqDW370hhlgziIjwLT0EWBavqVfHQFmriACTFsABJiWb+lXR4CZK4gA0xYAAablW/rV1QLceLzsMEj9GR9+Qy9dWnT2H3omxgNM9xDIzc/vH102h1f33Y/aX5iv320FU2xtJokAlR2f+wEshW+9oXPzQ4BuB1nvF6nfY48jwFhi3vm5H8BS+NYbOjc/BIgAJwlE/zcYngLzMgtJwqHjCDCOHk+B43hJZ5u/A/QLnnuGIc0gJeCxx/ueIcXub+18rQCkfGJ55xa4lI9/nGcELpGnm9vOD8zdASJAXug82aEIMFZ5ZT3FHfoXCgKM7CfuACOB9Xw6AtQB5Q6QO0BVByFAFT71YgSoQ4gACxOgdEuc+3WAunZkNQRcAtYEP3R9+s5fmuma/yMIAhy6BdkvJ4G+BeDnIgkhZ+4He/edv5QvAsxdcfaHwASBvgWAAMN/RESAPPwgYIgAAtT9e7hY4asFuH7vStL2kRpCusVNGhwXhwAEiiaAAIsuH8FDAAIaAghQQ4+1EIBA0QQQYNHlI3gIQEBDQC3AtdF5Z/955WdcaJJpYa00E7XGgBmttYq0Hc8P7zN0RmsfHSDR7wVGgMM2FAIclje71UUAARZeTwRYeAEJPysBBJgVv35zBKhnyBXaJdC7AFduuZ/JsXBqlplgoL+kt/a125r/M7f+Zv3W61Na/r7w/PjVM0AEGNcSCDDMCwHG9RNnhwkgQGMdggARoLGWrDocBGisvAgQARpryarDSS7A0dI5B+DCaXcGyEyw6v4iOQiYIiAJb+fnnhPvygv3c5KjXweIAE3Vn2Ag0DQBBNh0+UkeAm0TQIBt15/sIdA0gcEFeOPCGXcGOB+eAfozwaarRfIQgEBSAv7Mz/9+bfOzs3/0DBABJq0fF4cABBQEEKACHkshAIGyCSDAsutH9BCAgIJA7wL0Y+m6bl8RH0shAAEIZCPgz/z8QGakyBCgRIjjEICAVQII0GpliAsCEEhOAAEmR8wGEICAVQKSAP8B+oKgbnTrnjsAAAAASUVORK5CYII=";
const Yy = (e) => {
    const t = HA(),
      [n, r] = Pn.useState(!1),
      [i, o] = Pn.useState(""),
      l = () => {
        if (e.username === "") {
          e.setAlertMessage("A username is required to create a lobby!"), e.setShowAlert(!0);
          return;
        }
        e.gameSettings.minWordLength,
          e.gameSettings.pointsModifier,
          e.gameSettings.mode,
          e.gameSettings.steps,
          e.gameSettings.defaultLetters,
          console.log("Attempting to create lobby with settings:", e.gameSettings),
          jt("/api/openLobby", {
            lobbyCode: e.lobbyCode,
            gameSettings: e.gameSettings,
            username: e.username,
          })
            .then((s) => {
              r(!1),
                console.log("Server response:", s),
                s.message === "Lobby Created" &&
                  (e.onLobbyCreated && e.onLobbyCreated(), t(`/${e.lobbyCode}`));
            })
            .catch((s) => {
              console.log("Error creating lobby:", s),
                s.status === 401
                  ? (o("Please log in to create a lobby."), r(!0))
                  : (o("Failed to create lobby. Please try again."), r(!0));
            });
      };
    return v.jsx("div", {
      children: v.jsxs("div", {
        onClick: l,
        className: "start-lobby-container",
        children: [
          v.jsx("img", { src: by, alt: "Start Lobby", style: { cursor: "pointer" } }),
          v.jsx("h2", { className: "startlobbytext", children: "Start Lobby" }),
        ],
      }),
    });
  },
  Vy = (e) => {
    const [t, n] = E.useState(!1),
      [r, i] = E.useState("");
    return v.jsxs(v.Fragment, {
      children: [
        t && v.jsx(Au, { message: r, setShowAlert: n, timeout: 1500 }),
        v.jsx("div", {
          className: "createdmainboard",
          children: v.jsxs("div", {
            className: "content-wrapper",
            children: [
              v.jsx("img", {
                src: fu,
                onClick: () => e.hideLobby(),
                className: "createdcloseButton",
              }),
              v.jsxs("div", {
                className: "lobby-code-container",
                children: [
                  v.jsx("div", { className: "lobby-code-title", children: "YOUR LOBBY CODE IS:" }),
                  v.jsx("div", { className: "lobbycreationlobbycode", children: e.lobbyCode }),
                ],
              }),
              v.jsx("input", {
                type: "text",
                placeholder: "Enter your username",
                className: "createdusername-input",
                onChange: (o) => {
                  e.setUsername(o.target.value);
                },
              }),
              v.jsx(jy, { gameSettings: e.gameSettings, setGameSettings: e.setGameSettings }),
              v.jsx(Yy, {
                lobbyCode: e.lobbyCode,
                gameSettings: e.gameSettings,
                setGameSettings: e.setGameSettings,
                username: e.username,
                setAlertMessage: i,
                setShowAlert: n,
              }),
            ],
          }),
        }),
      ],
    });
  },
  Gy = (e) => {
    const [t, n] = E.useState(!1),
      [r, i] = E.useState(""),
      [o, l] = E.useState(""),
      [s, a] = E.useState({
        minWordLength: 3,
        pointsModifier: 1,
        mode: "Time",
        steps: 180,
        difficulty: "Easy",
        powerups: [],
        sameBoard: !1,
      }),
      u = () => {
        Ln("/api/generateLobbyCode")
          .then((f) => {
            i(f.lobbyCodeGenerated), console.log(f);
          })
          .catch(i("ERROR")),
          n(!0),
          e.onShowLobby && e.onShowLobby(),
          e.setPopupShowing(!0);
      },
      d = () => {
        n(!1), i(""), l(""), e.onHideLobby && e.onHideLobby(), e.setPopupShowing(!1);
      };
    return v.jsxs("div", {
      children: [
        !t &&
          !e.popupShowing &&
          v.jsxs("div", {
            onClick: u,
            className: "button-container",
            children: [
              v.jsx("img", { src: Oy, className: "homepagesign", alt: "Wooden Sign" }),
              v.jsx("h2", { className: "homepagesigntext", children: "Create Lobby" }),
            ],
          }),
        t &&
          e.popupShowing &&
          v.jsx(Vy, {
            lobbyCode: r,
            hideLobby: d,
            setUsername: l,
            setGameSettings: a,
            gameSettings: s,
            username: o,
          }),
      ],
    });
  },
  Ky = "/assets/lettergrovelogo-4c707ca8.gif",
  Wy = "/assets/cloudanimation000-236366e9.png",
  Jy =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAABACAYAAACKusa+AAAJH0lEQVR4Xu3dMYhdxxWA4d10LoRkgXCKoAg3BrtQYewqUZEmKGotCNiVG9txH4MKl4aoSZFCSWNcJCQQtZFI48IRpApYjcGNKjfGYOMY40AIMoYlaO5a7+zszNyZefdTt3rnzpz7nzPzft03ent4MN6fh+OlJCMEEEAAAQQQQKCIwGHR1ZUvHiqZo3sjgJWLbDgEEEAAAQQQ6E5gKOcaKhkC2L05JYAAAggggAACbQgM5VxDJUMA23ScURFAAAEEEECgO4GhnGuEZJKPfD++95ekQt/8+7OdFfvmy7LXu7eDBBBAAAEEEEBg7wn87PVby3vs6mBdJ/++J34EcO/XgBtEAAEEEEBgcwQI4PGSewK4uWXghhFAAAEEENgWAQJIALfV8e4WAQQQQAABBA4IYCCAH9753c42WZ75i35eDvaLX/+1qA3v3LxedL2LEUAAAQQQQGB7BK69dXt5012P4XWd/IhE8hEwAdzeonDHCCCAAAII7DsBAugJ4L73uPtDAAEEEEAAgQUBAkgALQoEEEAAAQQQ2BgBApgpgNEZv+h7AJfTOQO4sRXndhMCZ86eqUrkqy+/qjqewVIC5y8+m/xFtB+Oxk+/jVYR+fQkQAAJYM/+M/fGCXhDnqsBCGBaL//gmKt/ZZsSIIAE0JpAoBsBAtgN/akmJoAE8FSN46IhCRBAAjhkY0pqGwQI4Fx1JoAEcK6Ole0uAgQwEMB//vntJKL1mZfoTODye/9y4/dtOUQC4SOasorfu/+gbIDBrv7J5acHy2jsdL5YnKn86MHnScIPf/C/5OfnLl1Ifn6y8hnPiNbs/ao/owp7vSYBAkgAa/bT6mMRwLbIZ39DXdLxBpvXLwQwj1dptP4sJej6HAIEkADm9MtwsQSwbUkIYFu+o49OANetEAFcl/fWZyOABHDqNUAA25aPALblO/roBHDdChHAdXlvfTYC2FgAl4Ly09fe3dlzN15+Pqsn3/nTv6qOlzX5hME22LKiRcJdNnp8tTOdMaOaEbkCeOmH55Lpf/TU+ZrpDD/Wcn3c/eD+qjnb31bFXTxZtJ+23u8IIAEsbuKZBrBBllUr2rDKRo+vbr0hxhlsK4IA5tWbAObx2np0tJ+23u8IIAHc1BokgGXljjasstHjq1tviHEG24oggHn1JoB5vLYeHe2nrfc7AkgAN7UGCWBZuaMNq2z0+OrWG2KcwbYiCGBevQlgHq+tR0f7aev9jgAGAvj+799IInJ/1+9y+Oh7+/7xh1eTS6Izg8v43AXVusFy81nG21BLCboegXoEPvk0/R7Ar//z32TwZ378VL3J9mCk6A1+eYuj78d7UJKdtxDVq7Q+td/PSh9oEEACOPSarr1gcm+2dIHlzicegZEJEMC86kRCQQDzeLaOjupFANtW4LDt8Cca/eGjUZ4AnohZsyAC2AytgRHIJkAA85BFQkEA83i2jo7qRQDbVoAA+gg46TAC2HbBGR2BHAIEMIfWwUEkFAQwj2fr6KheBLBtBboL4MWLF5MngO/duJbccekZwFx80ZnB5e8Gzh1/tvhogUb3U7qAo/G9jgACCCAwB4HeDxgiSlevXE5Car9/OQO4qAABjFqy7+sEsC9/syOAAAL7QoAA3l6WsutDuK6Tf0eCAI69tAng2PWRHQIIIDALAQJIAJNeJYBjL10COHZ9ZIcAAgjMQoAAEsCdAnjrzRdn6WV5IoAAAggggMAkBKIHGtGZv9L/I+AM4KJRlk8ACeAkK0maCCCAAAIITESAAKbFGu4MIAGcaDVJFQEEEEAAgUkIEEACOEmrShMBBBBAAAEEahEggIMJ4MHBQfI9gH/7zUu1ar0X40QNm3uT0RmH3PFmi699CNmvruvbAct65vb3vfsP+t5AMLv+Gro8kpucQO6Zvtz4JR5nAI83DAHcsYgIYN0dhgDW5dl7NALYuwLmR2BeArlClxtPAOPeIIAEMO6SShEEsBLIQYYhgIMUQhoITEggV+hy4wlg3BQEkADGXVIpggBWAjnIMARwkEJIA4EJCeQKXW48AYybYmoBrC0UMa6xIkY7o7T2ma7R7j+3O2ofMcidvzT+7gf3S4dIrp+9nlVhnGCwUgE/wRRCEGhGoFTololF4x0eHvvila7fxNJ18iN4BLBZe7cfeLQ3TAKYV3MCmPIarZ/zqrl+NAFcn7kZ6xGIhO3OzetZk0XjEcDjOAlgVouNFTzaGyYBzOsPAkgA8zomjSaAJfRc25tAJGwEsH2FCGB7xs1mIIBPN2O7xsAEkACW9BkBLKHn2t4ECGDvCiy+B/CPN36eZPTk2TP9M8zIoPcbau73oGXc2iZCc+s3G++1n5DO1jRXr1xOUp6tvq15tz7zPNo/KFvzXI4f7T/OvK5bkVxBjOJ9BBx8BEwAyxrcG1YZv2gDXo4+G28CuLs/COBuPgSwbH+Jro72HwIYEaz7eiR0y4+Io3gCSADrduhitNmEpCmMUwwebcAE8BRQJ7qEABLAnu0a7T8EcN3qREJHAMvrkZwB9ASwDCgBLOMXbcAEsIzv6FcTQALYs0ej/YcArlsdAtiedyKAv/3VlWTGC+eeSH6e7Uxge3xmQACBxxGI3lBnF/q1Kx99BEyg04q0PnKBd90VEAlfNFv0v4b9LuDjBAlg1FVeRwCBUxEggKfC9tiLCGAeTwKYx6t3NAFcvwIEcH3mZkRgEwQIYN0yE8A8ngQwj1fvaAK4fgUI4PrMzYjAJggQwLplJoB5PAlgHq/e0QRw/QrsFMBlOs4Erl8gMyKAAAIIILDvBAjg+hUmgOszNyMCCCCAAAIIPEKAAK7fDgRwfeZmRAABBBBAAAEC2LUHCGBX/CZHAAEEEEAAAU8A1++BRABv/PKFJIML59PvAVymtzwTuH76ZkQAAQQQQAABBHYTeOWdvy8DDnsy6zr50Y0TwJ4dYG4EEEAAAQQQaE6AAB5HTACbt50JEEAAAQQQQKAnAQJIAHv2n7kRQAABBBBAoAMBAhhDT54IxuEiEEAAAQQQQACB4QmMcOzu/5CGSuYoKwI4fA9LEAEEEEAAAQQyCQzlXEMlQwAzW0k4AggggAACCMxCYCjnGioZAjhLD8sTAQQQQAABBDIJDOVc3wIgCXx9Hux6zAAAAABJRU5ErkJggg==";
const Xy =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAABACAYAAABr564eAAAG40lEQVR4Xu2dbWhWVRzAN0hy2HZLcL1QX3pDklwjyWpWLBlmRtHEhA38FCGuUgZ9yA9NQwKVVpGzoKIPlULrBXozNiGUGvlBx4pBlIa0WDZ162kbGygu/JT/M7hnx3POfc6597dv/91zzv2f3/nf3/Ps7N7nqazQ/CRJMpPW5KGfG8ThQ3f+oBuS4xCAAAQui0D9wFLRr7/up9RxSqVSZVqD1IMXOyLAy1onOkEAAh4IIEAPUBkSAhCIgwACjGOdyBICEPBAwLsA1T95D+3fkTqNpxe/J46/drhJxOemJzxgYEgIQKAIBKqSRWKazy7/QsT7hl8U8bz5C0Rcv7JVxOqe4Kw9QARYhLJijhCIgwACjGOdyBICEPBAAAF6gMqQEIBAHATKLsDa7xYKUsnViYh39dwn4qnS6TjIkiUEIBAdgS1NR0XO3afaRVxVUyvie9Y8Y7cHiACjqxEShkBuCSDA3C4tE4MABHQEEKCOEMchAIHcEshcgN++vVnAfE65D2d7962Zwq5Oqo3ON14aN2pPYwiETECt/7zXtyq813vvFsvT3twv4gvjF0Q80jhqtweIAEO+HMitaAQQIAI0qvm8v0IawaBx9AQQIAI0KmIEaISLxoETQIAZC/DznS2iJNT7/DrWHRfHO3vqRWwroO8HfvdakqsfrHOar9dkGbxwBFzX/4q6m3PF8CXFP3uOPC7m98jGN+z2ABFgruqFyURGAAGmLxgCtCxo3gFaAqS7VwIIEAF6LTAE6BUvg1sSQIBlFuCmNbekZrC/RT77O++GK0R79b4dy3qY1d30vkB1ANs9StfzUcfTzS/0/H3zKdr4unrIur51+biuz7pjW8UUzw9Pi3jwsU4Rt7zSa7cHiADLe4llXWDlnS1n1xHQ1QMCRIC6GhLHXb9CGZ18Do11BR96/nOYIk0MCOjqAQEiQINyqqgIXSC6gg89f6PFoLGWgK4eEKBjAX65szl1UTbceFAc7xpcrl3EIjdQC/jA4QGnOPJ2n5dTOAxmTKDc/4RR9/wm9r4q5jB5blDENQ1SgMvOPGm3B4gAjWsmtQMCdMuT0fwSQIC8A3RaYQjQKU4G80wAASJApyWGAJ3iZDDPBAovwH1b5ff8ti05wp6fw6ILbVPb4dRyOZTuBSxve7Dlrs8lX8nv/DjbvUnU1dTU3yIeWvGCiDdObLfbA0SAfq/jcheY39nlb3QEmL6mru9KQID5u4bEjBBgXAuMABEgfwI7vGYRoEOYGQyFAAsuwFXXy2fvZqZLgkjP2LUZlCGngIAbArab/HyYhpt1mOsoV+1dK5oOn/9LxDXP94nY+llgdQ8QAc51qWgXAwEEGMMq/Z8jAoxrvcg2cAIIMPAFUtJDgHGtF9kGTgABBr5A5Rbg2TcfECls/lrelzM0fEIc/3TdHrknOHVbXITJttAE+KdUXMuvfiT+y8r3lFvvASLAuAqCbO0IIEA7fln3RoBZE+d8uSaAAONaXgQY13qRbeAEEGDgC6Sk512AZ3YvFadc+8EGEU9Ojoj4w8ZtIj5W+0RQRIv2xdJBwSeZWQR0wnX9aFnsS9De3C+m0PmZ/B5ydX7We4AIMPaSIf+QCSBAs9VBgGa8tK+4vMJaAqW7FQEEaIYPAZrxQoCWvOjulwACNOObuQC72u4VGa6/7pSIZ/75Q8S9V640m5Hn1rqH121Pn7fPf7Ploeuvu/E4Np66+eh46I7zrLEktKXpqPiF+r3jY6Vxcbyt60cRl0qlykt/IYKLB5Ikmbm0AQJML9HYLljdBef7uE4YsfHUzceWJwJEgFY1xDtAK3zOO+uEgQAlcgSIAK0uQgRohc95ZwRohhQBllmA21rrRAa77vpNxO+ONZitaMatdQKkwOSC6ATlevnyxl/3Tw0dP9PviY7tHbNu/qbH1T1Btf9I46jdHiACNF2SuNsjQLv1Q4B2/Ex7I0ANMd4BmpUUAjTjpbZGgHb8THsjQARoWjOp7RGgHU4EaMfPtLd3Abatvl3k9P7Df4p490n5rPA1SbXpHGgfMQHbC54nceTi86y65KEKruMT6aOOVb+IDuvfqhVx14Ff7fYAEWDEdsogdQToFjICRIBuK4rRvBJAgG7xIkAE6LaiGM0rAQToFi8CDEyAT91/k8hoUVIl4ncWnxTxgmXzRbyj7w63FcJoEIBAYQno9vxOl6YEm4/7huz2ABFgYWuNiUMgOAIIMLglISEIQCArAggwK9KcBwIQCI6AdwGqM1Y/Hks9Xvmo/EStmW/Ep2kFB5CEIACBeAks/KhGJD/a+m/qZNTP/5vlLx0KBKgjxHEIQCArAggwK9KcBwIQCI4AAgxuSUgIAhDIioBrAf4HraNcjPDSGTsAAAAASUVORK5CYII=",
  qy = (e) => {
    const [t, n] = E.useState(!1),
      [r, i] = E.useState(""),
      o = HA();
    return v.jsxs("div", {
      children: [
        t && v.jsx(Au, { message: r, setShowAlert: n, timeout: 1500 }),
        v.jsxs("div", {
          className: "mainboard",
          children: [
            v.jsx("img", { src: fu, onClick: () => e.hideJoin(), className: "closeButton" }),
            v.jsx("input", {
              type: "text",
              placeholder: "Lobby Code",
              value: e.lobbyCode,
              onChange: (l) => e.setLobbyCode(l.target.value),
              className: "username-input",
            }),
            v.jsx("input", {
              type: "text",
              placeholder: "Username",
              value: e.username,
              onChange: (l) => e.setUsername(l.target.value),
              className: "username-input",
            }),
            v.jsxs("div", {
              className: "join-lobby-container",
              onClick: () => {
                if (e.username === "") {
                  i("A username is required to join a lobby!"), n(!0);
                  return;
                }
                jt("/api/joinLobby", { lobbyCode: e.lobbyCode, username: e.username })
                  .then((l) => {
                    n(!1),
                      console.log("Joining lobby:", e.lobbyCode, "as", e.username),
                      o(`/${e.lobbyCode}`);
                  })
                  .catch((l) => {
                    i("An error has occurred while joining the lobby!"), n(!0);
                  });
              },
              children: [
                v.jsx("img", { src: Xy, alt: "Start Lobby", style: { cursor: "pointer" } }),
                v.jsx("h2", { className: "joinlobbytext", children: "Join Lobby" }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  _y = (e) => {
    const [t, n] = E.useState(""),
      [r, i] = E.useState(""),
      [o, l] = E.useState(!1),
      s = () => {
        e.setPopupShowing(!0), l(!0), e.onShowJoin && e.onShowJoin();
      },
      a = () => {
        e.setPopupShowing(!1), l(!1), n(""), i(""), e.onHideJoin && e.onHideJoin();
      };
    return v.jsxs("div", {
      children: [
        !o &&
          !e.popupShowing &&
          v.jsxs("div", {
            onClick: s,
            className: "button-container",
            children: [
              v.jsx("img", { src: Jy, className: "homepagesign", alt: "Wooden Sign" }),
              v.jsx("h2", { className: "homepagesigntext", children: "Join Lobby" }),
            ],
          }),
        e.popupShowing &&
          o &&
          v.jsx(qy, {
            username: t,
            setUsername: n,
            lobbyCode: r,
            setLobbyCode: i,
            hideJoin: a,
            setPopupShowing: e.setPopupShowing,
          }),
      ],
    });
  },
  Zy =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAABACAYAAACKusa+AAALmUlEQVR4Xu2dXYhd1RXHb4pgi5XbWJKoCWPogyI0CUEr8aNpHzTQfLxIBSEKLWkqpYoKtkpEUPAjFqQPQdKaFkopJdCQh9rEj2heIkn6STIXK1YimUsmVRuVm+B3yMgI6qxlelYWe5+z9z7nN29n9tfav7X2nv/ss+6+s3qZ/fT7/SmPSf1+31M9uG7/sjdFH6N/ft3V58TEhKg/GAzE8+rVq139URkCECiXwGg0qjS+6f2tXJJYDoH8CQyHw1k5WZmVMdNgEIAIwJwWCLZAoE4CCMA66dI3BPIigAA0/IEARADmtWSxBgL1EUAA1seWniGQGwEEIAKQV8C5rUrsgUAiAgjAROAZFgIJCCAAFXR94ve3Hb8WNd47/r9KN703Ciu3YuD2Z34vqowmT4rn5760VDz/99gx8bz8lVcqBd/WjetE+bXLL7dMohwCEIAABCAAgcII/ODhHcLi1IIweQ4gAhABWNgaxlwIQAACEICAmwACkBNAQYATQPcaogEEIAABCECgOAIIQAQgArC4ZYvBEIAABCAAgTACCEDFb2xsTNz79+df/aySsM7508+bPtom2v/o3e+EeUy1vuC34+I3J06dEs/enL+rl1wU1T46gwAEIAABCJRAYGrzPyrNXH34sCjf8ej3o07LGn/WT+Lm5K+6W+qTXq+XNA0v6eDTnkQAIgCjrmg6gwAEIACBIghYAgwBWK8bEYBOvpwAOoFRHQIQgAAEIHAaAghATgB5BczWAAEIQAACEOgYAQQgArBSAOocv7eG/xZL5LG3nxfPH5yQOXkbxq6LuqS+uuWA6M/K+du/cqWof3j5BeKZHMCo7qEzCEAAAhAohIAWgEdPynt2LzzrLDGT0FfC3vHIAaw5kKwcQARgzQ6gewhAAAIQgEACAl5BhgCM66TscwARgHEdTm8QgAAEIACBHAggAHkFzCvgHFYiNkAAAhCAAAQaJIAARAAKAfi7DatE+OkTQCvn7/hRmUOwcdn3oobzyp//SfQ3GAzEMzl/Ptyz587zNWi49ttvvN7oiBaPpu1pdPIMBgEIFEUg9n41uWl/5fytnEDd+C8LF4pf6RxDXf/HR46IX8W+d5B7ABVxnQOIACxq/Qcba20gwQMEdtC04LJ4NG1PID6aQwACLSYQe79CADYbLNnlACIAmw2A1KNZG0hq+5oWXBaPpu1JzZ/xIQCBfAnE3q8QgM36GgHo5M0rYCcwo7q1gcQdzd9b04LL4tG0PX5itIAABLpCIPZ+hQBsNnKKE4Aazz37nxK/Gk3KHMC/3rpGlJ88Pimex9+ZX0ncEnxbN64T7bnXrzqAXzj4arMR3vBo1yz5hmvEUB7e8VzGURkCECiKQOh+Enuya667UnRp/QOrc+SeWLCg0iSdE6grWzl/y3buFE0WL14snskBjB0Rqj9vDiACsGaH1Nx9bhtU7Ol6BVkoD+94sedLfxCAQD4EQveT2DNBAEqifAgEARh7jRXVX24bVGx4XkEWysM7Xuz50h8EIJAPgdD9JPZMEIAIwMqY4gQw9pLLu7/cNqjYtLyCLJSHd7zY86U/CEAgHwKh+0nsmSAAEYC1CkDd+eJzZI7f1PsnKsef9eVzRfl562VO4aGXh6K8tJw/K0nXWvBWzobVvrRyi1dsHnrD1hum5vfkrn3iVwjAuBFm+d87mvaXt72u3zZ/5yZYQv3jbZ+bP634D43nR/74Lxei8fFxUV/fs+vqrNfrnX3gHtFk6dHl4lnnAFr9e3MEeQWsiIaeACIAq0PUWtBWgMcWPNZ4qcstXrF5IABTe1yOb/nfa23oH0wEoJd4WfURgNX+QgDWG8/FfwoYAYgAjLlELAGAAIxJO7++LP97LUYAVhPjBNB3a4A3/rz1rfgPjWdOALdplyTVYEkHnybBCaB3ifrqWwva6i224LHGS11u8YrNgxPA1B7nBDClBxCACMCq+OMEsN7V2ToB2D8mc6TG5s0WBE99IHMC59x1UJTv2yu/i3D3lvtEeW73/GnBEvofmhVuub2ysOwtvdzyb9f9kbuAsHI6Y/9DUXq8h9pv/QMX2r+3fdv8G8pX/33S6+OqHz5eidi6F1Df+2fdE6i/+1cP7s3xs+KDHEBFKPYJIAJQCmArIL3lXRccXl6h9RGA1QQRgKER1q72oQIlNg0EoCSKAOQVsIgIBGDYlmMJhLDev9gaARibaHV/ln+77g8EYLPxmPtoCMB6PRTKFwGIAEQARlyjlkCIONQnXXVdcMTmafVn+bfr/kAAWhHUrfJQgRKbFieAnADOJMArYOMV8OafXiFq6O/i3fmLG1xrVL8SXvrgi6K9zvm75MUHRPnmvfK7hXPLAbQ+RNC2Dcjl/BZW1n/gSvNvbMFm5dh5Q6A0nt75UR8CORE4jSAS5nlz/q5/9lnRfvuKFeI5dU4gAhABGHX9IQCj4sy+MwSgdBECMPuQxUAI/F8CCMBe0g/iJh18Oip0DiAngL7dAgHo41V6bQQgArD0GMZ+CHxKAAGIAJyauRwQgL7NAQHo41V6bQQgArD0GMZ+CCAAP4uBpIdwSQc/3Qngnj17xOro9/uVz1ZO4Hfv+I1or3P+5u5eX7kaZ89bIMpzywksXRCwFXaLgJWkTw5et+KB2UJgJoHJTfIeXk1H3/N3/2uvuQDef/75or6VEzj/tmWu/q3K5AAqQvoVMALQCiFZjgD08aJ2WgIIwLT8GR0CORNAADbrHU4AOQFsNuIYrdMEEICddj+Th0AlAQRgswGCAEQANhtxjNZpAgjATrufyUMAASgJJNVgSQef5mB9CvibNz4mcFk5ge9+OBL1D708FM9bN64TzyvnH3UtyZ2TF4r6ud0L6JpMCyrHvleuaSRdv8i5ad6MBwEI5EPAe+L3rTuviWr833/5guhP5wTqnMPQ8ckBVO5DAEaN5851hgDsnMuZMAQg0BICCECugam8BoYTwJas9JqmgQCsCSzdQgACEKiZAAIQAYgArHmRtbl7BGCbvcvcIACBNhNAACIAhQB8+KZLRbzP7p8rnvWJ4NjYmCgfDAbiWef8WTl7/5l4o3K9XXzR3Davx87PzfqQQmxAT+7aF7vLpP2R05gUf3aDl/4PWmygsb+6MNS+pu/dbDrnzstH26fbkwPoJWrU1zmACMDIgOnORQAB6ML1hcoIwDB+bWuNAJQeRQA2+6EL73pCAHqJBdZHAAYCpHlUAgjAMJwIwDB+bWuNAEQAziTACeA2vcST3sSSdPBpEgjAtm35Zc8HARjmPwRgGL+2tUYAIgARgJ8T4BoYtcNZAnDtQ09X7ok652/RokWV9e9de4Uot3IC27YhM5+8CDQtOPXsm84Byos+1kDARyB0vbYt59dHr9c7e3f1vbuhOXZee5qujwBEADYdc4yXMYHQPyihU0MAhhKkfZcIhK5XBCACUK2XpG9hkw4+DYITwC5tn8xVEwj9gxJKFAEYSpD2XSIQul4RgAhABOAMAgjALm2fzBUBSAxAoFwCCMAw3/EKmA+BiAjSAnBiYkKUW/f66XC85REJ2PruYHICwxY0rSEAAQhAAAIQsAmQA6gYIQDtoKEGBCAAAQhAAAJlE0AAIgDLjmCshwAEIAABCEDATQABiAB0Bw0NIAABCEAAAhAomwACUPlvampKfBewlfM352tfET3oZx0e377lCfGr7Y/e7GpfdrhhPQQgAAEIQAACORDY8IeXhBnD4TDpTSxJB58mgQDMISyxAQIQgAAEIACBOgkgADkBrDO+6BsCEIAABCAAgQwJIAARgBmGJSZBAAIQgAAEIFAnAQSgQVdfC1OnM+gbAhDoFoHRaNStCXdstvre145Nn+lmTiB1zp/GkzwHUBuEAMw8gjEPAgUTQAAW7LwzMB0BeAaQqJKMAAKQE8BkwcfAEOg6AQRguyMAAdhu/5Y+OwQgArD0GMZ+CBRLAAFYrOvOyHAE4BlholIiArkJwI8BaGq0qnzxfqEAAAAASUVORK5CYII=";
const $y = (e) =>
    v.jsxs("div", {
      className: "creditsmainboard",
      children: [
        v.jsx("img", { src: fu, onClick: () => e.hideCredits(), className: "createdcloseButton" }),
        v.jsx("div", {
          className: "credits",
          children: v.jsxs("h3", {
            children: [
              v.jsx("span", { style: { color: "rgb(94, 129, 255)" }, children: "CREATED BY: " }),
              v.jsx("span", {
                style: { color: "rgb(94, 129, 255)" },
                children: "Thomas Cong, Leon Chen, Steve Zhang",
              }),
              v.jsx("div", {
                style: { color: "rgb(94, 129, 255)" },
                children:
                  "In order to preserve the authenticity of our game, we have chosen to use only original artwork and music. Artistically, we hope that the game is not only fun, but also visually attractive and cohesive.",
              }),
              v.jsx("h3", {
                children: v.jsx("div", {
                  style: { color: "rgb(94, 129, 255)" },
                  children:
                    "All artwork, including the logo and game pieces, was handdrawn by Thomas Cong over the course of Weblab 2025. All music was composed by Thomas Cong.",
                }),
              }),
              v.jsx("div", {
                style: { color: "rgb(94, 129, 255)" },
                children:
                  "Game logic was implemented by Steve Zhang, and frontend development was completed by Leon Chen and Thomas Cong.",
              }),
              v.jsx("div", {
                style: { color: "rgb(94, 129, 255)" },
                children: "We hope you enjoy playing LetterGrove!",
              }),
            ],
          }),
        }),
      ],
    }),
  e0 = (e) => {
    const [t, n] = E.useState(!1),
      r = () => {
        e.setPopupShowing(!0), n(!0), e.onShowCredits && e.onShowCredits();
      },
      i = () => {
        e.setPopupShowing(!1), n(!1), e.onHideCredits && e.onHideCredits();
      };
    return v.jsxs("div", {
      children: [
        !t &&
          !e.popupShowing &&
          v.jsxs("div", {
            onClick: r,
            className: "button-container",
            children: [
              v.jsx("img", { src: Zy, className: "homepagesign", alt: "Wooden Sign" }),
              v.jsx("h2", { className: "homepagesigntext", children: "Credits" }),
            ],
          }),
        e.popupShowing && t && v.jsx($y, { hideCredits: i, setPopupShowing: e.setPopupShowing }),
      ],
    });
  };
const t0 = () => {
    const { userId: e, handleLogin: t, handleLogout: n } = E.useContext(du),
      [r, i] = E.useState(!0),
      [o, l] = E.useState(!1);
    return v.jsxs("div", {
      className: "home-container",
      children: [
        v.jsx("div", {
          className: "background-animation",
          style: { backgroundImage: `url(${Wy})` },
        }),
        r && v.jsx("img", { src: Ky, alt: "LetterGrove Logo", className: "lettergrove-logo" }),
        e &&
          v.jsxs("div", {
            className: "buttonscontainer",
            children: [
              v.jsx(Gy, {
                onShowLobby: () => i(!1),
                onHideLobby: () => i(!0),
                popupShowing: o,
                setPopupShowing: l,
              }),
              v.jsx(_y, {
                onShowJoin: () => i(!1),
                onHideJoin: () => i(!0),
                popupShowing: o,
                setPopupShowing: l,
              }),
              v.jsx(e0, {
                onShowCredits: () => i(!1),
                onHideCredits: () => i(!0),
                popupShowing: o,
                setPopupShowing: l,
              }),
            ],
          }),
        v.jsx("div", {
          children: e
            ? v.jsx("div", {
                className: "home-logoutbutton-container",
                onClick: () => {
                  My(), n();
                },
                children: v.jsx("div", {
                  className: "home-logoutButton",
                  children: v.jsx("div", { className: "logouttext", children: "Logout" }),
                }),
              })
            : v.jsx("div", {
                className: "google-login-container",
                children: v.jsx(Ty, { onSuccess: t }),
              }),
        }),
      ],
    });
  },
  n0 = "/assets/404animation-2854a8a5.gif",
  cd = () =>
    v.jsx("div", {
      style: {
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${n0})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      },
      children: v.jsxs("div", {
        style: { position: "absolute", top: "20px", left: "20px" },
        children: [
          v.jsx("h1", {
            style: {
              color: "#1B4B7A",
              textShadow: "2px 2px 4px rgba(255,255,255,0.7)",
              margin: "0 0 10px 0",
            },
            children: "404 Not Found",
          }),
          v.jsx("p", {
            style: { color: "#1B4B7A", textShadow: "2px 2px 4px rgba(255,255,255,0.7)", margin: 0 },
            children: "The page you requested couldn't be found.",
          }),
        ],
      }),
    });
const lh =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAABACAYAAABr564eAAAGAElEQVR4Xu2dXYhVVRSAZx5SJORqMQWRiQb10IMKQSKDYw+h4pOg/Rj9vQWTFBUKIZYvRSGTgSM+DCKCwyiBPSQhYVZUVgyUWcEoJg6N0PQ3F0e95IUJH4RZ+8LZs2efvffa537ztuecs89a31r3mztr5t7b2WH5qtVqU9NPWfPQbnHFZGNcrDdcmiPW586OiPVwY1ise1Y8KtYDHQdsIXEcAhCAwIwI1Ov1zqITCw/evBABzogzJ0EAAgoJIECFRSEkCEAgDgEEGIczd4EABBQScBag+Svvqgd3ibQ+3nFerKcmRsV67Z6VYr38wl9iPdYcE+ve/sVO2G40Jp3O52QIQKA6BObVugqTMY/3PLVDnG8KsWUGiACr0yxkAoGqEUCAPAOsWk+TDwRmTAABIsAZNwsnQqBqBKIL8OH7twmGJ175tnAG2L1/jTi+8zk586taQcgHAhCIR8AUoE2I6178wG8GiADjFZc7QQACxQQQIB0CAQi0LQEE2LalJ3EIQCC4AO9eckS89rd5Q87wlt91XVTBfC0wMz+aFAIQiEXAJkTnGSACjFU67gMBCPgSQIC+BLkeAhDIlgACzLZ0BA4BCPgSKF2AO7eeFjPAv8flzG/o6x9FzIe2fuObA9dDAAIQKIWAKcSN2wfFvtbXAiPAUurAJhCAQAICCDABdG4JAQjoIIAAddSBKCAAgQQEvAXY+8RnYgb47z/y/feO//SFSGvw1UsJ0uSWEIAABFoJ3Db3dvHNzW9+5DYDRIC0FQQgkCsBBJhr5YgbAhDwJoAAvRGyAQQgkCsBbwHeeW+fmAE2rn0vWBzd3syVTZK459fme933Sv2K1/VVv/irM7+pTrF72VLV8VU9uC1vf+o2A0SA5bYEAiyXp7kbAgzLN/fdEWDiCiLAsAVAgGH55r47AkxcQQQYtgAIMCzf3Hd3FqD5sZjH3t0iGFyv/xmUidnQ61cvE/eLPRPjAeZX7tT8zP7xy6b16rL70fcH5idfnilMsd1mkgjQs+NTP4Bt4Wtv6NT8EKDsIO39Yut31+MI0JWYcX7qB7AtfO0NnZofAkSA0wlY3w2GX4Flw6R+ACNAG4Hi4wgQAaoWoDnzSD3DsM0g/R6O4WdIZccXez/fGZgtXteZnfYfgGa+/EYgiew7fkF8Q90zQATIPzpP71AEaFN48XEEiAC9OohngF74vC9GgH4IESAC9OogBOiFz/tiBOiHEAFmJkDbjCX1/wH6tSNXQ0AS0Cb42PUpO39zpjvZt1Gk9F1jWKz76u93Tv+GWNw8EPuvwAgwdgtyv5QEyhaAmYvrH3lisyg7fwQYu4LcDwIeBMoWAAKUf0TkGaBHc3IpBEITQIB+bw9nE37pAhx847GgPWFrCO1P6YPCYXMIQKCQgCm8Uz+cKjx//z0DbjNABEgHQgACWgkgQK2VIS4IQCA4AQQYHDE3gAAEtBIILsD+3pUi94Wen3GhFaSWuGwzUS1x3oqDGa22irRXPCPvPSISPnd2RKxP/nFSrM+vuOg2A0SAcRsKAcblzd3yJoAA865fS/QIsGIFJZ2gBBBgULzxN0eA8Zlzx3wJBBfgW0/Lz+ToWjCPmWBBv9he2pdvq5UTufYX65eTJbuEInD4xDNi66uNcbHuGZkQ69+bl8Xa+bXACNCtlAiwmBcCdOsnzpYEEKDyjkCACFB5i2YdHgJUXj4EiACVt2jW4UUXYO/6BwSwrjvkDJCZYNb9RPAQUE3AFN6h5wdEvFMTo2K9aeglsf78l9fF2vkzQRCg6v4gOAhUmgACrHR5SQ4CECgigADpDwhAoG0JJBfg46sWyRngwuIZoDkTbNvKkTgEIGAl8NrQC+Kc5n/y//a675NvoPrhk3vlnsYMcPXQs+L4r2MH/WaACNBaQ06AAARmSQABzhIcl0EAAvkTQID515AMIACBWRJQJ0AzD/NjMmeZJ5dBAAIQ6JizYLeg8M7L8v1GRy9OiuP9x06LtTkTHJ/42WnmZ5ag5XOBESBdCgEIhCKAAEORZV8IQEA9AQSovkQECAEIhCKgTYD/AyHAZH2wYVMfAAAAAElFTkSuQmCC",
  r0 = (e) => {
    const [t, n] = E.useState(null);
    return (
      E.useEffect(() => {
        Ln("/api/gameSettings", { lobbyCode: e.lobbyCode }).then((r) => {
          n(r);
        });
      }, [e.lobbyCode]),
      t
        ? v.jsxs("div", {
            children: [
              v.jsxs("p", { children: ["Mode: ", t.mode] }),
              v.jsxs("p", { children: ["Steps: ", t.steps] }),
              v.jsxs("p", { children: ["Min Word Length: ", t.minWordLength] }),
              v.jsxs("p", { children: ["Points Modifier: ", t.pointsModifier] }),
              v.jsxs("p", { children: ["Power-ups: ", t.powerups.join(", ") || "None"] }),
            ],
          })
        : v.jsx("div", { children: "Loading settings..." })
    );
  };
const sh = (e) => {
    const n = `playerDisplay ${e.playerId === e.currentUserId ? "current-user" : ""}`.trim();
    return v.jsxs("div", {
      className: n,
      children: [
        v.jsx("img", {
          src: e.profilePicture,
          alt: "Profile Picture",
          className: "profilePicture",
        }),
        v.jsx("p", { className: "playerName", children: e.name }),
      ],
    });
  },
  ah =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAB0ElEQVR4Xu2asXHDMAxFrTIZILWKzOAhMnCmSZEp3NqngncyjyQg4APmWT9lSJHAwwdAyVw+vq73y4n/FgKgAvJTYPlcL/fb/1Pi7f/39/s89v2zhiVpSAoUByyG185vnlvW0RKDA9g7UAzXAMl2vAAKBdCKQi+aLXDaKHrmQQG0olgb97YA6gj2YGgA9CIaUQtgCtACkIraSEVTA6ijNiqGEoSyVkY7hCkADSCrK4QBOFqZj9aMo+v35k8NICLnaxBuABl5ujcavR8BeF+H0RGRchu9HxVABTg/iKAlyRQQCKCBswawBrAG+D6KonOSRZBFcEwArTh2AXYBdgF2AdfP4+iixDbINsg2OCSATjn3OUDK2d442hGrHQTgPQhZyVMBiddgRkF6WQpYlYN+jgBeVQPQkbSuRwVQAc7X4U16mTe80HtBUiDjNkfUHgSAqAHR11si1w9TgPaCpPZlqTUPcYUGAqAuhKOeLBmtuW26rS+toz0XpAPQGibNmw7AERVIzknjKOe3fWAKKEZrJSw52RtHOh8CoDbcCwTtcG0fXAGtyFkhRDufogCr1LOeS1FAljOWfQgAcRS2kJ/lGSqACgB8EJlFzhY7mAJnT4EHKcFgUFeFH+4AAAAASUVORK5CYIIA",
  i0 = (e) => {
    const [t, n] = E.useState([]);
    return (
      E.useEffect(() => {
        const r = (i) => {
          let o = [];
          for (let l in i) o.push({ playerId: l, username: i[l] });
          n(o);
        };
        return (
          Be.on("update lobby user list", r),
          () => {
            Be.off("update lobby user list", r);
          }
        );
      }, []),
      v.jsx("div", {
        children: t.map((r, i) =>
          v.jsx(
            sh,
            { name: r.username, profilePicture: ah, playerId: r.playerId, currentUserId: e.userId },
            i
          )
        ),
      })
    );
  };
const o0 = (e) => {
  const t = () => {
    jt("/api/lobbyToGameTransition", { lobbyCode: e.lobbyCode });
  };
  return v.jsx("div", {
    className: "start-game-button",
    children: v.jsxs("div", {
      className: "sign-container",
      onClick: t,
      children: [
        v.jsx("img", { src: lh, className: "sign", alt: "Wooden Sign" }),
        v.jsx("h2", { className: "sign-text", children: "Start Game" }),
      ],
    }),
  });
};
const l0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEZUlEQVRYR8VXbUiUWRQ+b1kOUzlmtqaFWhRpn4JCtQvRtxEI0cf+WFhqoR8WfVj4p+jHQh9QBMJuf7YNKpKoCAkiyKIioYLQ0PpR7i6RQ4y6Gc3oOI0avvGcmfPOfd+578zkj7ow8N57zz3nOeee+5wzxqryPLMnNEQzfNn0LYfYNGbleUwY37T0h5T2z75aw/t7yx+MGaeq4/qzAM0t8JJRNdtnuhmXA06LYwHh1AUd//SEycAVrJw/LckrHBBD6uHzG9tYdtedyq+Khg5AS+eHBICKEh8r1uVDd2iICn3ZbFQAqIhxhs8Go3ZHDIMqinNs5yB79OmPtHfBQ2p53RcDcGL7AuoNRanA52EF+FaBYL3m2kI6vuIJJyvm2bkzaCjYY8njA+uqHtE1b+lylnXK/3H3TTwCZfmM1Dna/f1EphlbNgw2jl9xSamlrPnl/8lJGT8jUZXISqTEVgKAmgOGkVAoxuMAnCDbu0LUaF6nz5EA7ZxUp38dhkENrfN572Dla0sG4PQAUj0yw6CL4QY2SLWPaLizl0YHhsjT+ivtmn7a9WRDW1kSACzYkjCVXXXvXGA3jdv3nJcEgOxntayl2pJGnopR1XMnkDEBOL91mdb46ECUo1E3EkkCICAyAuAWLihxGs/59zhF+1opuugqG8fIeX+YhkOd9Kmv1RZU9f5lQxsBNwBItmDpARo3JdsyNvHpZs6H4fJ7lDf4J4OJlFwib9cOGux+aAGAcR2VWwDawj/ZhPHkJHNPrX3Le793bKMsbxFFqy5bshJ2WfD8t4Wic5sI64c8o7YIZAwApy5t6aYdTYWsAN8YzGC+qfzt7dhDoyMDFC46q81dAPD2/sLREebEk3UObQRUo/gWduzwhxjA50CIQwwA8JZlzBs04L9F4by/eC75MN6/mB2Acbx7JjYM0+S5xQPqFdz57SNtvBDzFIeF9UCxOwMjWo8RegCK+G7QzMJ79OHlGYrmN1NjVb5WXmjeAoBagAF+x1jdEMtoABB+x1wA5AZPUjD3iKVczQVPXzWvH1vxhAuYWl9UNHCs/u8HsVqwf8Mc3kOIhG6dVVGd17bUsHyk4Iot5KqB+ukTOMxyjYigDKkxVg4AgPN+dLGDN80veql6SQFvr7//LknMLey6PEjwQFn8rtTio729DBbjPQBH1Jn5KHSmadF05eTH7h2RmErFjM6uSe2g0HBIKXfWBZlrAbgJ66jUrW1z9oyqTjgmulJSsURAZ1i9CF3jmgkAgEobAUGb6hogo2s4VZBupTkBAEkYT8BM6rgzFVUA8F69Gqes6kzaV5DOc1Huloy6N2PprOq0d8WqsDSaUhFBz5kO8IQOGNaEP/ANYmIqzvVmmbfrl2ekP6e0wpKTFtvtYLp90P66ozfJKCuaxP8NpR7oFAKtMJnsg8uhpP9te1rw6n8I1fv2rv4YEYHnf142k6oXJ/9BVUOKw8LvAODvijUrtv8PKpx4iy/1RZVDAsJxC8D3+nv+BaKgxDjQbxVYAAAAAElFTkSuQmCC",
  s0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD0ElEQVRYR8VXTWgTURCetWLSFpr0RxNbmzQiGAvaHApFD8WLLehF8OfsQUEQxaPgpRfBg3gQBQ8inlu8eFNPVmhtUUirlCpim4g1wb8kbdpEqyvf7M727WbTNKjxwbL79s3OfDNv3jez2sE9LXoqW6Sgz0O1HGJT29Hi1WH8cM+2Wtqn4ckF2hVoIK034tNrbVw8fZNaIg1b0L+79Z96H/R7WX8qU7DZGX39xQ5gcF+A0tkCYX/U4cwRKBJZkYsnsvwouYRvYmGfYThbpJ6Qj6aShgwD0TQanf1sALgwsJMCPi95/EG+MHLzcb4DENYwoAAGZC6yxUzKkg2Fu0jmWMezyEFI1qBreOKDGYFoGw3uNZKwqStmCUF4KpHh97qmkWZ6CACqnCj+yGA99ClToIC/3mYYMgBS+LZA3uZ2ejr6RAFg5gDCqo6H0+m1qaZRLNTEczUC4hHeQ162oCfsZ1kYvT4yzs/nDkXYIY6iv54uj8xUmYSaRqTrrGxdsET0Nr1sGb31eI6fcezUUZKEttU/nAgA1ajz3T8FIPhVozUHIAYFzF/bgnvnB2h1wTjTp+9P0M3wdn729oZ47vS+IgDwgBAJCyvJhimYTGWxO8f62NDt/VEampmjS8t1dPHHMs/Pjs9uOHusHAAADIBQ2YuNm8QDQsK6WjWHuiNUeJ7kb682/GSg8WSOj6vokjvYsCwVCwAVupx1Ocu4T07NkpzvA52bKPDVR0sPXlL+VIjG3v+yPgfLwRicUfWoTAqHbjx6Z/DAlRPdTLkYKsmoVCqEI3cAaH1FHIH8UZ3GFjtdQy/0LtSuCllEJBFw8xofqGwnCgCARybB14vW4yVyam2BDqeeEgDYL2E4tQjBjswlvG5MKGUXlU8tVBLJdGaFQl0Rmk/M03QiS7YkRPIIzaphglIknu2UlMlzASDLzqRDTrAdDF1fA9AfbbNeuul2o9WyZ00pWiWgHcd7w1S8Hp26AoEh08uyQImUCJRpyTZSUNYzUGmtYgSq9rySRcd6RQAiX6moVGnXEncF4KRiZLIbADc5J5BKMmsAzFMgLZcworCjs0tW64GQl9QKASHGpdkVQrPaPGdXLB+iq5XhZC4BJACdDayTvISMhIi4yTU7a+jgWuBv2KzfPROjjuBWWl1ZtFpzlftFsbMNdwJwywUxLmvq/Mi1Z6RF2xv53xD1INhcR1uaOm2cnS8WqdHjofz3Ai2tGGqEslVlCK2EXWTcckB+aOB9PJEzqiH2+GRfh1XHrX0023BWmMxZdcLWrldzBBQmRALCcQvA//o9/w0/1HM4LDGMfwAAAABJRU5ErkJgggAA",
  a0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEL0lEQVRYR8VXTUhUURQ+rx8sK5+a5mDqjP1ajToLI4pB3KRQK6HaBS0qgqA27SoiqE24ahHRQoI2US3bWEQhA0W1MI3IH8rRqCktnSlsJGriO2/Oe/de38xYgV0Y3pv7zr3fd75z7rn3Wm1byjOJ5CwF7CJayCaYVk35sgzA9zSvWUh8uvX0PW2oKiarpd7OLDS4eDqU+EYWQtC6eXVh7y2LquwiitTZrm1P/8fC4/JY9A5+9ggESpexqV8u9I2lKFJXwt+rbMdO2sdk2n3viyd1OMtyx+ED4s7P6TSRZVHv60mHwIn2de7kRaUBmp1OkDqxOmtdMMR/YYOWy07I4jvGwP7FmENQnLx8701WgYYK6mjUkxAD4TllMg5+1hsoAJJj8VH2SLzSXM+O6WiqYoIYI/ONfJhh0307AuQRUHPAsry5BFwhIB+ZnDTVTg8CExfQDYHlNJL4zhbH20N0+varP0jCLAko0n0oSr++zvLv6L1+nvByeRmd+DJlwvN/AQUBaeh7n5z5QwJEdHXnZjr2eJDnudbexM/083EG75r4Qacql/qSMIn8NQFz9ivhEM08HM4LrILLeKihLcOctH0+7LaHKRptpVis13fY/eTGOf0Shn8iAGCzRcNBir2MU7SGKPaOqHYV0fhXx0olkpcA6oBWRIwC0hkuZm/Fa4CiMbBBAERQj0BCyPgpgvFuCKQQqRUPBli/u2oXaeDoF1B+z3qOJ5NSVBACeHa/mxsWjYBaUFCpAF4SilD4Z39u7xVQkwDIQIW3U0T1ZUQTpS1OYUPLZCgStL1CdHH/Vq5UQkJKpSo9TcdZ8kejXhaciXpeg8CFmPftYKNOAERW1rewgZwF3EqIEJgKwDAfAQEXSEivkihEoLnO9iqhmQNSu10CRtIBdGA4To2VngJqPiDmZgigwPqII1nPwCcOg5YDZnxYgZoJPdOzRDgcisfI+qBNBFUkCf0IIAQqjleIGiq0DUNkPb9t2AViwHCQLtyNu0CSeIi9mg9QoHfMST5JQjxHFm/ydld1GeJEpG4Y8p5Ipen89klvqUGB6biWbF7a6W9tIacOCJFzzyoouqlMM3IVqLaLydypOFtTaXrQOamrkGPpFUrA6yPzIOC3bcaGplwSQj9X8bkx4DmInJAQ+IHDUtuM/Go1V7Yhb49X1ZCqZ+4BUicQAsjukjbk1wkoSSgD1JCoJJAT6pLzy4FCwDglacuwtQABU4lciWf2m0mH7yjBaFiOc07FMoF53sMgOY6fvfN6Xvh+4DikSkPp51JcWrwk030kwv3mmR99cuyWzUkmONl105fIpcNt3C/H9nxs93Y9IauhegXfDVGO8xHAeUFVAkdz/FKjfQUVkbuG6X1fPOUcSrERHdixVrvFuOEwbjsio3qB0e4PKp3sEV9uVaodliAcdwn8r+v5b/nVqzhOxvJ4AAAAAElFTkSuQmCC",
  u0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFO0lEQVRYR71XfUyVZRQ/L4GSmBcI5YrIRQMFHR+lQSzDr5laK0ok/yhHf6Rzo6z1ZSvbbNXSYquZbUxdS51/qDFitZWVM0CHUC3ARAVr9zI+LgjEvUDxcblv+517n+c+7+UG9/YHZ3v3vu/znuec3znPeX7nebV16bG63TFKZtNsmkkRPrXE2Egdzh/JWjCT/ulsfSelxM8hbfUSkz7TzkWkLfYh0rAE+cvvnj56TaPj23LI1emgss4u1m+wOfh+ODaW9vb3T2/DT6P6Zp8PgDk6Un72r4eGNic733+hkXUOpCfTgetWKqr5m1LXxlFFRQsVlawmV6eTv0swmhawtuwDI0SaRtU3ej0A9j68lFAUWUkmA8Zux4h835OwkJ3CuXvQM15b9hu1T0xQu9tNLxSm0c+Vtyj3mZX0w6nfybZzKesIu8OjLnZ6yz4kxyWA/LQ4yk6aR/EmXxagdf5qDxVU9dLWfQ/St4cuU93ji+i9jVl0rtVKjW0OSq9sZ+cA8c+mBNZ16jpfv66bT9kWEwPgjIZpRKSRfWCISL+DQZyt6whQAxoUvaLrtL6ql19g9IHwcMp4LY+OfVBDE8UpXANleWm0p/YG60BXAGhd791VsKfrk+oD4A5//+f0RVhQ3cdRwnBiWBjf8d69IZ6NHi/MpefK6/gZYFCk7sHRoIrSUITBlHDqxR5We+XNfHYUnmDiC88Q3J+3ddEnEVH00vjwtCZDBqBGCUeB3jGmAthZ089Zq8yfvNVDBqCuNxy9HLmKlt07TJc/qqVTa2IYkHAObsCuEDUhClNNS0gAEInYYiKakkt/yfq4uDaOoHN/QQpd+KqVI0b9wDEEdSML04tCAgAPCFbjb5pGmzOMvSHySLOMpuOJxay26ZsuujI+Tk4U5UazdKhGu+qn2zzP3znmSwDvF62g2dFmstqslGxJptEB+6QCGvv0mtwB2jYLfwcnuDr7aeSXDvoiIYJiTv4hQUY9m2qwYQjQPwMAADlR08b3LZkLDKQEcPVNN2WWsIchYEVUPq6DUW7p0J9RG20DBKoHpbPoOpOU5IHSXRt4/OjX9RLAd02eLbf7sRzOTk11FQMQzvebYngLQq4dbaZ77ptLlT+20fWCRMrJXM7j/plUqR3fJYBl5rk8ofihJL5DUQUAQ6BeCBrQyt0r6MzBS7TjjTUcfd3pZtkTBp9MoqzFd9GsaDONOXoYvACjAgDtv3Wu2cOEAkCWxUSN3hYLMGIyDGAJwOkZp63SmSCk8pNXZU8wbV9C5nmz2Gl89J18hx0EIQDwUui6rwj5PKChUfi6n5oRkRWgRjFiS8E5ZKoagEPMUTMq2/4kAN7WKSuJaMpz4hHLQqZdIaW3x+nV+REcCDorRCwjMoeuCFHPGpOISCgJo8EcVN8ur6UxVwcd2rHdh93bUUVGVTsqkJCYUM0MnoVjMW4A4KesOg0awDsVLeRy99G7hXnSHJxCELEqwTgPlNUpM/BfzlQAHz/9IpWceJ1tf1b8oX+S+H2qZfUBSIsLeGqBgX1nvpSGETmchiIBAXhPSUYAsOp3dILz/+N0KoCCScEFhlOxOklytheUmIRX/4MrxlSGC9R0hO3NmZ5jnJjDVBw9J1z/fFc2GxbMJ+5Oa4PBeJIl2UCtwpjgfJU5A3VUlZYx99HSK6SlJUTxv6FoyfgQCIBoRCID0MGlggyUHWEPgITdNpuVG1GDzenpBSiUp3IXyX8DFen5pm7Dkoo0Cn7HR/w/BDp6gxUhghlFD8AYChCBSwDBsF4o1T+drvhh+RfMdStHKRvXdgAAAABJRU5ErkJgggAA",
  c0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABjklEQVRYR+1XsU7DMBC9SG2J1FJ1oQss7J0YGPgGJqZ+Dzs7v8TOirowhQ4VpGpoK7V6Vp5lOXFC0tRhyElWlMS+93z2PfuC+evDYbveC5pPG01DGQx7Ejy93GsCl9PQC4efKFHgIBE8Pt8pAnXAr25H8rWIBc/vKJHfClEkCUXgYtjTM4czOIJDGEFcocHYKsCmH4zLEGAHOj4FwATLm0ghAQxGBzM6dTfION1b8GdGq5RAXUB7XJguMZcVG/BmNpGPt6V7CZoCz/MTiMghjbBzD5yTAH17WwLXZDoCXQScESiT36YyJJcAVMtWrKYAbWn+fF+1I0Q88HCStiJEvPxADVsh8D+VEKcTNoVPy2QBMoBHpg8iGQK4p13PJt5IdFLsJQJFsn52AgCHraJEdlbNgH+lUnxKaiKjeKXfrPeaACOC/1qKAYQX2/CdB5OdnkWh5TWc/paLWJViMBKDPzRdmqGDWQMAGLUbzQwhAcyZ/VU3eEXHhGsVp32jjIvT8q1q8cK6UBFoqzwHONoRJD84uI63k04AAAAASUVORK5CYIIA",
  d0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACcklEQVRYR+1XvUoDQRDeBcGg4IUoJqgkKoLRJikEO7Gy0FrfwNYXsLaz8gF8AH0CLa3UKlqIWogJKAkoJMHCVCezudnMbvbnjCRY5JqQu9mZb2a/+WaXb66kwmqjxTLBKBvkgzH5XCoRQvDtwvQg47Oz23e2lB5jfG0hCAcdHDN9rn4xDluwsTzpz55zYVPMTkjbUrnhX+ewuHr67ADIJBNWU9gvCAy/rqda/1Y/c27klrDjnF09frQBHGwtCudIRD0QfW+zgcgmIoOvQjZgtcZ3VwJnN29RBfJTSmkxjVKlyVgYtv9G2UCQdJBgd5V2+Y1VidYUc4FMDOzQFoF2AFAORHstvGPwCADdf3gViwPoj/oCLuUCdnL58gsSRiAUUH+iIGMKCf/oq6flQwD/pwKgAwqjLQKib7TSghrL45BCVgAAiLaqNKUe+FTPJjzUBwVhalkFgCsgCAd8RyfQw/i4lFEKWrkh+l7GCENVB452V41SSYMgABocvqPMWlXRshcAXAoRzgLd1padTdtpxjDcYL3Lx+H5Q2cYmThAhwsOK9OvDlzfKn1I4YxROCBeRvqvlxkDwBC6uK+J/UPAvqMcfgdQsI7G6ehAfkoGj9M+ThvOZSd1MR8GE2nX/gmRZQLqwPsHIGYZhwBUEvag5TEr3W0WkbE/XeBBRVtYORUrgwM1waMLpliuc6KuL0KKk2Mj4el+MVY1s7l5adeqV51r4BjuekDUdo6vGc/PjIu7IY5k2yJUMqqKo8kMq5RfveAhmA4Isi+Vm+1ZAPq+tz5rvhto1y8sI3Wq3B8oHO06R+2AgJC4BODTdG+avzTAofYDIkOQKQLhdm0AAAAASUVORK5CYIIA",
  f0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABmUlEQVR4Xu2ZPQ7CMAyFm6lXqcTCKbgDKwdiYGRH4irMgNSRa3QqakUqNQyOY7dJmsdI/uz3Ppu0mKrwjyk8/woCgIDCFUAJFA4AmiBKACVQuAIoASkAfdf20j0k603diEwULR4CL1aA2Im71ISSEExAsQJoJW7qZmZi37WSVjCt5ZLAJgACCLu+67xru5SE5AmAAE7tgwBHgc2WANX1qXHfn4hkewCVIDUOATwVAAHMh6PVLkIU4tS4JwAVCEiNAK6z3PnSp8LFS4CbEHd+dgL41rKdx70YJdcDqLs/JcjmBKAS2nwJFCOAgpNBb4yS6QEQQPjOL1RAEJDKTTDUQVv4oetBQCoEUBecpcaTIWCpBKl9Fxfg9biM/wbv9gcqllXH77freN7xdGY94LEmDwdAgB8B1t7YJFjnbTyrEQABVq3w/8Oe78/sS67z032Dm4ftAdx12vOjCWATiS2EFSDU+WACIIA2y5H3Y98DIserfjwEUJc0sw1BQGaGqYcLAtQlzWxDEJCZYerhggB1STPbEARkZph6uF+F/ChQwfI2YgAAAABJRU5ErkJggg==",
  A0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABg0lEQVR4Xu2ZMQ7CMAxF26lXqcTCKbgDKwdiYGRH4irMgNSRa3QqakUQVFSxHdMk9Wet49jfz05Ky8L4rzSefwEBQIBxBdACxgHAEEQLoAWMK4AWCAWga5su1EfI+rKqg4oYtLgP3KwAsRMfUyMlQUyAWQGkiZdVTWr1rm1IdlNGXBLYBEAA5tSnVn5cUSkJyREAAUa9P1XZsVCLJQACTEx5EEBsFd8ZmfwQRAtYbwEfwtLp7/wm3wIQwKMACFjayxD1fKfa+Voo+RmAY9D6MQgCQMDvv7zMDEHfFHfPpfeB5E8BcwJ83NFJuUsrn+y7AAQg1V3PKLkZoJcazdPfBbhdDsPX4NV6Q4toJqvz6TjstN3tWR97WMb9BhDgRYArbGwSXOVdPLMRAAFm6u2pba73x9cjbuXfxzM3DzcDuOu07aMJ4BKJLYQTQFp5MQEQQJvlyP7Y94DI8apvDwHUJc3MIQjIrGDq4YIAdUkzcwgCMiuYerggQF3SzByCgMwKph7uE3UcHFAiSIQrAAAAAElFTkSuQmCC",
  h0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABfUlEQVR4Xu1YOw7CMAxtJq5SiYVTcAdWDsTAyI7EVZgBqSPX6FTUiqA2S/MchzTNY8V17PeeP4mpCv+ZwvOvCAAVUDgCLIHCBcAmyBJgCRSOAEsgVABd23ShPkK+N5s6iMSgj/vAiwUgdeKuaqRKECugWACkiZtNDZV61zaQvTVGlQArgACAXR9l3jK5GgUQAKf2pcz6NoTF9QBXAQRA2N2pAE8EWALg3SD6HsAewCkwXYE5BTgFZJcczyFQcQpwCmBPZByDvrU1uqZCj6DcA7gHcA9Aq2ywly5Mix+DvmisBoDRa61v7utSAAGAeA83XlwPCE8J8xAdgOf9PCxC290eiyyy9e16GU44HE/QdgsZ9wcQgK8CLKGplWCZt/H8TQEEIHJNz7l/vN4TE5T533ieO8j93/YA9Dtt+2QA2ERSA2EBkDIvVgAB0NZyYn/wHpA4XvXjCYA6pJk5pAIyI0w9XCpAHdLMHFIBmRGmHi4VoA5pZg6pgMwIUw/3A5kd+EFu5yYcAAAAAElFTkSuQmCC",
  g0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABdklEQVR4Xu2ZOw7CMAyGm6lXqcTCKbgDKwdiYGRH4irMgNSRa3QqakWQWqiCHZOXf0ZoHfv350eLqZR/jPL4KwgAApQrgBJQDgCaIEoAJaBcAZSALwB91/a+NnzuN3XjlUSvmwfH1QoQO/A5NVwS2ASoFYAauKkbUon3XUu63pcEMgEQgNj1qQTYjHJJoPaC5AgoXoClzM5JKZYACLDQ5UHAbFyiBJj7QPJTAD0APeD7qosmiCY4fWjCFMAU4D0WYwwS3xEGfxrEHoA9QPke8OsLv2LHIARwKMDNvDWb/Bh0EVCcAK6ApX9PjgDpAF32/i7A7XIY/w1erTcuX4L+fj4dx/O2uz1puSNdPBwAAV4E2PTGJsFm3voTjAAIELTCPw+73h+TL6mZf+8N1DhsD6DeJ319NAFsILGFsAJwM88mAAJIsxzZHnkPiOyv+PEQQFzSzAyCgMwSJu4uCBCXNDODICCzhIm7CwLEJc3MIAjILGHi7j4BhoooUP/udQQAAAAASUVORK5CYII=",
  p0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABdklEQVR4Xu2ZMQ7CMAxFm6lXqcTCKbgDKwdiYGRH4irMgNSRa3QqaoUHOpDaDq1lf1biEP///BWFVAX/pOD9VxAABARXACMQHACEIEYAIxBcAYyAFoC+a3vtHpr6VDcqE1XFw8HDCrB241NqpCSICQgrALfxVDesEe+7lrVeSwKbAAjATH0uAeSolARuFpgjwL0AUmfnBoN5AiCAMuVzJIAA5tV48RDECEQfgdwMawkxnwEQIKMACFBmhPkR0DqcGyEIgHsA740QF6HcTE2/1z6IIAOUKZ8zzHwI5hpw/yACAXAT/K2ANiTNZcBc5EutgwD/vgk+bqfx3+DNdlfKtCL7XC/ncZ/94ci63LEWDz8AAT4EkG1rk0DO03kWIwACFJlc+Sb35+urmOs8FYszQH70MpWrCUDHpzAs0w5/FxJA6ryYAAjAN8t0BTsDTHcjOBwEEIjmqgQEuLJT0AwIEIjmqgQEuLJT0AwIEIjmqgQEuLJT0MwbkQ74QcLIwDkAAAAASUVORK5CYII=",
  m0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABgElEQVR4Xu1ZOQ7CMBCMq3wlEg2v4A+0PIiCkh6Jr1ADUkq+kSooEUZKKJzxbnzgoST2endm9ohjqsJ/pvD4KwJABRSOAFOgcAGwCDIFmAKFI8AUkAqg79peakOy39SNiETR5sHxYgGIHfhcNb5K8FZAsQD4Bm7qBkr1vmuh9XYxqgRYAQQArPoo85bJv1EAAZjlvi+zSwtCcjVgrgAC4FndqYCFCDAFwHeD1ecA1oBAE2CykyA6B0i7RPI1wFXLCICwTSavACnDLgURALZB7I6Qc4Arp+bP0QsRDkJ8HZ7eBbILCPu8K2XZBtkGE2uDLslqP08uBbQDdNlbHYDH7TR+Dd5sdy5fgj6/Xs7jefvDERruoMXDAQTgowBLb2wlWOatP8EUQACCZvjvYffna/Inyvz3DhGNw9YAdJ/2+mgA2EBiA2EB8GXeWwEEQFvLke3Bc0Bkf9WPJwDqkGZmkArIjDB1d6kAdUgzM0gFZEaYurtUgDqkmRmkAjIjTN3dN/Yd+EEcR1rSAAAAAElFTkSuQmCC",
  v0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABkklEQVR4Xu2ZPQ7CMAyFm6lXqcTCKbgDKwdiYGRH4irMgNSRa3QqatUgWlE1dhxSJ48Rua79+dn5qSky/5nM8y8AAArInABaIHMBYAiiBdACmRNAC/gKoG3q1teHz/OmrLyK6PVwF3i2AGInPlUNVwlsBWQLgJu4KStSq7dNTbK3xlQlkBUAAMSpT628rWQyCgCASe9zK+s6EFY3A6YKAADmdIcCHAmgBYhng+D7AMwArALjLTBWgWEVmNsg+QJSMwQBYOF0yFWCegUkfxiaq6zUcqlGAT+utEZ/Jd8CADAhkE0LOJ5puut2V9OR3epngGtWyQD4uq11yp2beDK3wskCcCq/gNHqZoBATiQXwQE8bqf+a/BmuyMFFtr4ejn3r9gfjqRLHpJx9wIAGBRgKxpbCbbyNp6/KQAAQjf1gv/78zWyoFb+s2+g5mFnAPU5aftoAGwisUFYANzKsxUAANJajuyPvA+IHK/46wFAHKkyh1CAsoKJhwsFiCNV5hAKUFYw8XChAHGkyhxCAcoKJh7uG+AsEFBmYOU0AAAAAElFTkSuQmCC",
  y0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABgElEQVR4Xu2ZPQ7CMAyF26lXQWLhFNyBlQMxMLIjcRVmQOrINZiKWpGhBeQ4aetAPkbixPbz88tPyyLzX5l5/gUAwIDMEaAFMicAIkgL0AKZI0ALxBKgedRN7Box88tqEVXEqMlt4NkCYJ34kDWhTAhmQLYAaBMvq0WvWM2j/tjyvnaSXmiZoGYAAChV37eyvnYwQECAFlCeC9AAqaeG44ggIqg7+/uqu6+dxFhEEBHU3Q7ZBaSeGnsX8PX37c4gzU9eA6QE3DgAfLk1SgDCAHYBdgHVzqYyDnkE9T3h+dr9vAbwJMabII+ivAp/QuBvRVBS7bHHkzsJjp2gtN7kAFzP++5r8HK1lmKZdfx0PHT+Ntud6myjMm4dAMCLAa681kxwlXfxzMYAAJi1w9+dXW733p/ayrvJwRpgnH9hBoBL3ImhFRAOgNDKBzMAAKxKPpFftQZMFIfZsgBgBn0ijmFAIoUwCwMGmEGfiGMYkEghzMKAAWbQJ+IYBiRSCLMwnqtgNFDLDuxuAAAAAElFTkSuQmCC",
  C0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABcElEQVR4Xu2ZsW3DQAxFpUqrCHCTKbKD2wzkwqX7AFkldWwgZdZwZUNCrpAQBfgkY+nC59ZHmvz8n8ej2yb5p02efwMAMCA5AkggOQFogkgACSRHAAl4CXC7ft68Pjz2bde7iugyHgJPC8Daic9ZY2WCmQFpAVATb7veI/FBYpK9ygSZAQAgdn0YkF0CSwKeM0PV+i9+JVlLhyPvfQCYSQMGiNcdElhAYHNzAE1wuVKTb+gB9ABt5qcJ0gR/RoBbQFyRMQpL24bAHSBvAd4C01XZvx2E2Ahl3wjBgOwMUK9Z7/lqJkFvoqs9hs7vx/Hf4N3T81/lYPL79noa7fYvB2m6lQ4PPwAA3wwoZVqbCaXyJZ6HMQAATEqNM/q4fE2cqZUvxuYeEJeKzdNqAJRwSzO0he+3KgBYK29mAAD4i7cpD3IP2FT0AcEAQACIVbuAAVWXLyB4GBAAYtUuYEDV5QsIHgYEgFi1CxhQdfkCgr8DatL4QU0miTwAAAAASUVORK5CYII=",
  E0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABgUlEQVR4Xu1ZMQ7CMAxspn6lEguv4A+sPIiBkR2JrzADUke+0amoFUY0LVLtmITU15E6iX2+c1zjCuOPMx5/AQDAAOMIQALGCYAiCAlAAsYRgARCCdA2dRu6R8h6V1ZBSQxa3DluFoDUgfuskTJBzACzAEgDd2XFknrb1Cx7MuYygc0AACCs+mCAdQlMVO3BT1LNh94G0WoAAPAQ8GsCGCC89iCBMbNYsmYZa/b+kIB3LaIGoAbIen8UQRTBIQJ/+zWIThCd4IiqNj6GqOHx73kzjRAAmDkIWWwnOHcUtlgAPqa1k1NercCznQqbAUA05BcsyqYTFMQ2a8nPAbhdDv2/wav1ZpZDsYzOp2N/1Ha3Zw15WMbdAQDgxQDKbGomUObJn2gMAACxxP3lnOv9MXjDzfy7b+DGQTWAu07bPhkAFEhqIAgAaebFDAAA2lxOvB+7D0jsr/rxAEAd0sw2BAMyS5i6u2CAOqSZbQgGZJYwdXfBAHVIM9sQDMgsYeruPgE5Mf5BWshHlAAAAABJRU5ErkJggg==",
  w0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABmklEQVR4Xu2ZMQ7CMAxF6cRVkFg4BXdg5UAMjOxIXIUZkBi5RqeiAkYQtUqcfJqafNYmbvL+t52UalL4ryp8/xMCoAMKJ8AUKNwALIJMAaZA4QSYAqkGaOprkxojZX41nSWJmDS5XXixAHJv3HVNrBOiHVAsAO3Gq+nsS6ymvnamfOg4X73QOkHtAAJQVn2fsu5zUbjPKX/nAAIIrBE+5eW5uRrgS5HQjZsDgLY+AbwIjD4F+iwdW/VTT4SDnwMIwCGAUt5MDXAdQAA9dwNt+6MD2AWeBNgGlZ/IBm+DUvR4EnQuQanXYDNF0G17xV6GPhQL+mQW2hZHXwR9DkhNBQKw0gU6bnGQVDDnAHQtGB2A0OKFGkcAv64B5+P28W/wfLFEiQaJc9jvHnFW643qdKsa3L6AAF4OENlyO0GUl/UM5gACgGRufJDT5fY1Wav8u/1qlyA1QDsPPT4bANlIbhACIFb5aAcQANrLmeOpzwGZ1wt/PQHAkRoLSAcYEwy+XDoAjtRYQDrAmGDw5dIBcKTGAtIBxgSDL/cOuqgoUBg/WIMAAAAASUVORK5CYII=",
  B0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABWUlEQVR4Xu2ZMQ6CQBBF2YqrkNh4Cu9g64EsLO1NvIq1mlB6DSoMxE3ABmZmFbLzrPePO///GWYgFM5/wXn+BQTgAOcMUALODUATpAQoAecMUAJWA7RN3VpjWPChrEwimsDdxd0SsHTi367ROkHtALcESBMPZTUSq21qS8lPYqVOEDsAAoRdHwdQAvQAmuCQAZ4CPAaZAyaHGcsBBiHhdsgkKLUbozCjsOwNELsAuwC7ALsAu8CAAffL0Ny5Q0vU6kdhCJjJAA5QvjdYXQnMFDzZMQj49Tr8uJ36r8Gb7S6ZaikCXS/nPsz+cBSt+KLD3R9AwMcBUbWlnRCVj/f5mwMgIEXhGmLcn68RWqp8BKt7gOHuSaCLERBvH5thkmwUQSIBWuXVDoAAhVprhoh7wJqT0dwNAjSs5YTBATmpqckFB2hYywmDA3JSU5MLDtCwlhMGB+SkpiaXN2E7+EHAyhv+AAAAAElFTkSuQmCC",
  S0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABr0lEQVR4Xu2YMW7DMAxF48lXMZAlp+gduvZAHTJmD9CrdG4LeOw1PDmwIRatUpWkRFtS9TNGEk1+PlKEukPjv67x+A8QAAQ0rgBKoHEA0ARRAiiBxhVACaQCME/jnGoj5XzXD0lJTDq8ON6sALkD96mJJSGagGYFiA2864c1afM0/lny0n0hI1oS1ARAAGXXp4z6GfNJkO7jboziCJAGJt0HARgFQIByMNq8CXJoh9Yp0dytkToPQACuqfzSvVWzPwhwA1DoGmy2BCLIEx2p5hYQRfNtk7QZFiOAjzYFIEU+dJ4TDgKUMgeAAK/7owTcOwB6QGAu8Efff9sEKVAuQG69+BchLoDUdQgQUKD4OQAl4BRACQTmBCkhxfcAbmbfar2YHrBVgJzdzQV4fz2vL0LH0wPny67rL9fL+r3Hp2fVM59q8/IBCOAIoPTmJoEyT/7sRgAE2LXC7z/29vH5409t5r+uW20c1AO056z3ZxOAAsktBAkQm/loAiCANcuZ7anngMz+mn8eAphLWplBEFBZwszdBQHmklZmEARUljBzd0GAuaSVGQQBlSXM3N0bo51eUASHNsQAAAAASUVORK5CYII=",
  k0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABpElEQVR4Xu2ZwQ6CMAyG4cSrkHjxKXwHrz6QB4/eTXwVz2rC0dfghIFQIwjpuhW2ud+jwNZ+/du1kGeJ//LE/c8AAApInABSIHEBoAgiBZACiRNACrgKoKmrxnUNl+fzonQKotPDreHJAvDt+Fg1tkqwVkCyAFwdz4tyELymriZLgOl9rkoQKwAALKv+OKIUuWQUAACj3IcCegJ/nwJz0h9XbwIhTZXgTwEAmDn358552/OflCDtCBfvA6SOAoBhpzg3QUIBwvEYKSB9GSGdBVADcApMj79SZZgqNZgiyHV00gYJAAwJBKsA06GHmxI5DgAQSh9g2tJytYKLeLDTIAAIe3pTYJwioqsBX2Os0evyaABwhi51PRgFLOUgt+7iAB63U/c1eLPdcbasev16OXf77Q9H0YQrurndAAB6BVB4fSuBIk/2rKYAAFg1w383uz9fgz+lkf8cv1I/qAZIn9O+3xsAcsQ3CAJgG3lrBQCAtpY9ryfuAzzbq749AKgjjWxBKCCygKmbCwWoI41sQSggsoCpmwsFqCONbEEoILKAqZv7BlIGWFBWzeeYAAAAAElFTkSuQmCC",
  Q0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABjElEQVR4Xu1ZMQ7CMAwkU79SiYVX8AdWHsTAyI7EV5gBqSPf6FTUQhCNWtV2HNI019lxnPOd47hmlflnMj//CgCAAZkjAAlkTgAUQUgAEsgcAUjAlwBNXTW+PnzWm6L0SqLX4jbwbAGIfXCXNVImiBmQLQDSg5uiJEm9qSuS3ZgRlwlsBgAAZtWnZt7NqJQJs2MAAHC0P5ZZF6jFMgAAjFR5MIAolak7cvZFEBKABIY7PdQA1ID+WwF9gPBRhFuAOSEK/hqkFjeqHfqACQQgAUiANyVGDZgqKgOTGtZ/AAxEiMPQxY7E7MGoTJB2gD/7sGTNMvb5E5Q9ANxaI7WfXR8gPYh0XXAA7tdjdwusN1tpjEHWXc6nzu9uf2DJmmXcbgAAPgywaYzNBJt5G8/fGAAAgiiZ7vT2ePaMuZn/9g30Ld+WtgZw12nbRwPAHiQ2EBYAaebFDAAA2lyO7I/dB0SOV317AKAOaWIOwYDEEqYeLhigDmliDsGAxBKmHi4YoA5pYg7BgMQSph7uC4CKKFAFWHb4AAAAAElFTkSuQmCC",
  R0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABfElEQVR4Xu2ZPQ6CQBCF2YqrkNh4Cu9g64EsLO1NvIq1mlB6DSoMxDERQ8bZHfeHeZYCszNvvnks4CrjP2e8/goCgADjCmAEjAMAE8QIYASMK4ARCAWg79o+NEbI9a5ugpoYdPGQuFkBUhc+pcaXBG8CzAogLdzVjWjE+64VnR9KgpgACCB0fSkB1FFfEqRekB0BixdgrrNTUhZLAASYcXkQMLldYgQ89wPZ3wXMe8Cv27zFjgAEYBTw7TyFzd4DOAIWL0BogZyA2RMAATzv71zni/EAEAACwl55caMAExR+J4j+RggeAA8w5gGcaWkfz84EtQvk4v1dgNvlMH4NXq03XC5Rj59Px3G97W4vMnbRycMCEOBFALU3NQnUeconGgEQIOqEfy92vT8+/pR2/v30KK2DPEB6nfb5yQSgQlILQQL4dt6bAAigzXLieOJ9QOJ81ZeHAOqSFhYQBBTWMPV0QYC6pIUFBAGFNUw9XRCgLmlhAUFAYQ1TT/cJTXkKUNwKWukAAAAASUVORK5CYII=",
  I0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABgklEQVR4Xu2ZMQ7CMAxF6dSrVGLhFNyBlQMxMLIjcRVmQOrINToVtcJIrSiJY9Mk9e9aJ7G/n52kLVbGn8J4/CsIAAKMK4ASMA4AmiBKACVgXAGUgBSAtqlb6RyS8UVZiZIoGtw5blaA2IGPqQklIZgAswKEBl6UlVept03tZTdlxCWBTQAEYHZ938yPMxpKQnIEQIBR7U9ldizUYgmAABNdHgR4loprj0y+CaIEUALfT3roAegBw7sCzgGBl6JsdgHXEXnxBEAAx/cBELD0HkBH2qlSWDwBZgVwXWakX4aS3wbNCeBCnd5TzUvvBMkRAAG4zAvtkyVAGJf38L8LcL8e+7/B683W26k5DC/nU7/Mbn9g/exhGXcLQIA3AZTV2CRQ5smf2QiAAHMU9o81bo/n4C0385/tmRsH9QDuOG37aAJQILGFIAFCMx9MAATQZjnyfOxzQGR/1ZeHAOqSZjYhCMgsYeruggB1STObEARkljB1d0GAuqSZTQgCMkuYursva1QuUMOJWjAAAAAASUVORK5CYII=",
  D0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABi0lEQVR4Xu2ZPc7CMAyG6dSrVGLhFNyBlQMxMLIjcRVmQOrINToVtaoRVESqY9PE9futX5qfx49dpxQr53+F8/OvAAAGOCeAFHAuAIogUgAp4JwAUkAqQNvUrXQOyfNFWYmCKHq427hbAKkPPrYm1oRoA9wC4B68KCtWirdNzRovNYFtAAAwqz7XAIporAncWpCdAYsHEIrs2JTFGgAAgSoPA0avy8WmwNSXPABENkTmX4OxkSezAIB5PU7eCEkjbv4u4B6AtPU1b4A7AKS8VudnzgAAGBqc0HcCaVHMvg8IGaBVC8wA+Ojcfl4PYk0AgNw7QXwQ8fZBZOr9X2tcdjVA62BT5/k7gPv12P8avN5sp+5plnGX86lfZ7c/sG64rMHdAgAwGEBhTW0CRZ72M5sBADBLZocXuT2eX//kRv7diXLPQTWA+5z2+GQA6CCpQRCA2MhHGwAA2i4nno/dByTer/ryAKCO1NiEMMBYwNS3CwPUkRqbEAYYC5j6dmGAOlJjE8IAYwFT3+4LGSMcUD2CIEAAAAAASUVORK5CYII=",
  x0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABiklEQVR4Xu2ZPQ7CMAyF26lXqcTCKbgDKwdiYGRH4irMgNSRa3QqamkQFKHEjpuf+jFCmjjfe3acUhbKP6Xy/RcAAAcoJ4AUUG4AFEGkAFJAOQGkgK8BurbpfOfweb6sai8RvR7uA1cLIPbGp67hOoHtALUAuBsvq5qU6l3bkMabwVQnkB0AAMSqT1XeKLkYBwDAJPe5yroWhORqwNQBAMCs7nCAIwGkAPFuMHsfgBoQqANMthOk9gG+p0RyNeBDGccy9hrGBQEAqRVBV9mlimWyDrCBAAChOwMcgBpAe0s8eydoy/1/x+RijkFqI4Q3QiMBtQ7gbhx3gZFAtsega7G0jQOAufuA2+Uw/Bu8Wm9sYgT9/Xw6Duttd3vS0U4a3C8AAKMDjLyxnWCUN/EEcwAABM3w38Wu98fXl1Tl330DdR+mBlCfkx4fDYDZSGwQBgBXebYDAEDay5HnI/cBkeMVXx4AxJFmNiEckJlg4uHCAeJIM5sQDshMMPFw4QBxpJlNCAdkJph4uE9g4fhBiZ77aAAAAABJRU5ErkJggg==",
  L0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABa0lEQVR4Xu2ZPQ7CMAyF6cRVkFg4BXdg5UAMjOxIXIUZkBi5BlNRERlatUjPMbRWvq7ErvN+HDdUs8KfqvD9zwAABRSOABYoXAA0QSyABQpHAAvkCqB+3uvcHDnx1XyRRWJWcFN4sQCMvfGuaqxKMCugWADUjVfzRY7FG4tJ8aoSZAUAgNj1UUDpFhgycFcZqte/5JVsLS32PPcBoGMNFCAed1hgAIHJzQE0wWGmWr/QA+gB2sxPE6QJ9iPAKSBekTEKS7cNjneAfAvwLdC+KmMQYhBiEFL7ce965oAoc4AL3T1JwiggLADX8/79b/Bytf7VHkx5T8fDO26z3UnTrbS4eQEAfBSQaBpbCYn5VM/fFAAAJqf6BV1uj1YylfkUbO4BfluxZRoNgFRuaoa28vOjEgBW5s0KAIB88iaVQe4Bk6reoRgAcAAxdAoUEJo+h+JRgAOIoVOggND0ORSPAhxADJ0CBYSmz6H4F2bh+EE/TTs4AAAAAElFTkSuQmCC",
  N0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABj0lEQVR4Xu2YMU4DQQxFs1WuEomGU3CHtDkQRUp6JK5CTSKl5BqpNkrEILIC7D9jdjLMS7sej/39v+3MsOj8N3Se/wIAYEDnCCCBzglAE0QCSKBzBJBAKQHG42Es9VFyfliuiopYdPgceLcA1E58yppcJmQzoFsA1MSH5eqqWOPx8K3kvXZWv1CZIDMAAMSu762s1w4GGAggAXEvoAdYmpp+pwnSBLXd39vdvXYWY2mCNEHt3yFTwNIUU2CCAGOQMcgYlN4AvfPda2f1LPYA9gD2AGm3kYxznsGn2rY0nL7/9HZonb/5HmAl8O8ASAl5mZBb+S/3SKyWjHMkAABezgfZ3VwPCMrL7ebPAdi9bi+b4N39gzuoOQxfnp8u16w3j5KsJePzBQDwwYBU1dpMSJVP8czGAACYQ9i/3PG2f7/6qlb+czyreaQeoJ6Ltq8GQEqkNhAJgNzKZzMAAKK5XNmfvAdUjjf8egAIh7QxhzCgsYKFhwsDwiFtzCEMaKxg4eHCgHBIG3MIAxorWHi4JzsPNFAV42YFAAAAAElFTkSuQmCC",
  U0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABtklEQVR4Xu1ZO04DQQydrXKVSDScgjvQciAKSnokrkINSCm5RqpFiTKIXWVkv7E3s955qT1e+33sGWVInf+GzvtPBIAK6BwBWqBzAXAI0gK0QOcI0AJWAYzHw2jNYTk/7PYmEk2HT4V3C0DrxueqqVVCtQK6BQBtfNjtJ2SNx4PK8oZzEKlQcI3nDY3UAgf1BAUTgIqpTwXMZkDWdWkWzAGT4q3b4OYWkBraHAC5Ya0VtHGlVYLeBxZXAAG4IKBlVhtHBRQQCGOB+TC0Mv/PapCtoeCai1BpBnQHgDQMN68AAlDYBqVprn01rv4meKVA1XO4WwBqG1/9FpC2gfRGUMkmpbTaewABUA7BzVtAWodaqYd7C0jbwMp8mCFIBYDPY9QSq98CaENoPAEA/yyFn8NfHy/nf4Pv7h9QchaNf397Ped/fHqGeoKCTx8gABcFZDpbKyEzn+u5mQIIwKKOlpN/fv9MglDm/+4j8qemEXkGoOe845sBkBtpDUQGoJb5agUQAG8tN84H3wMa1+v+eQLgDmmwhFRAMMLcy6UC3CENlpAKCEaYe7lUgDukwRJSAcEIcy/3F/sDIlDvuYnNAAAAAElFTkSuQmCC",
  P0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABqElEQVR4Xu2ZPQ7CMAyF24mrVGLhFNyBlQMxMLIjcRVmQGLkGkxFoBpBpZA8xzSJ8hipkzifn38KbVP5p638/g0BUAGVE2AKVC4AFkGmAFOgcgJMgVgB9PdrH7tHzPp21kUFMWrx0/FqAaS++Fg1WiWoFVAtgNCLt7PuK0j9/QqlunY9qgRYAQQQWPV9EYx97pJTMQogAE+N8AGiAhwEsk0B8Ve6gSvC4+/H63ythADA0fhvbVAiFRppnzJ8kf84D7oTZKyZ/QnAUe1RMFRAIIFsiiBrwEAAlbp2ACqmCAYq+W2meIuECjtkbNEFCAAkQAXgP6RAqoaMNSng6gah7wagYJrs2iABONohFTAQsHoJynYOYAowBdA6HmefbReIu1b46r8DOB+3r3+D54tluFcTWB72u9cpq/UGmm0g4+cBBDAoQIKaWgkSefFnMgUQwAR5/euI0+X29RiN/Hs+Qe8hNQBdZ22fDIBcJDUIAaCNvFoBBGCt5cT7wXNAYn/NjycAc6SFbUgFFBYwc3epAHOkhW1IBRQWMHN3qQBzpIVtSAUUFjBzdx+cRlhQmOxV4AAAAABJRU5ErkJggg==",
  T0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABuUlEQVR4Xu1ZO24CQQxlK66yUhpOwR3S5kApUqZH4irUSSTKXINqIxCDYMTKXzIe/GjX9trP79mzw7BI/huS178AAGBAcgQggeQEwBCEBCCB5AhAAlYCTIf9ZI1h8R+Wo6mJJudj4mkBaF14zRotE9QMSAsAt/BhOd40aTrsWVLX+pXgUiaIGQAAmFO/7mTp0BwTpPZzdArLgHQAXGmSNQus2g83AwDAGQFK29Rz1uq4MgozA+YYUM+CpweAAqLuMPe8EH4L3Dmqstj8tABQTLAWHnYLcJkAAJjfCpSOwm0BMIA4D2ALVAhYZ0E4CVAHHeo5pXnrzdDD7gO4ay8dANz7AK0UwksgDQBSakvtw38LSAuS2ncHAFfT1puhMDNAW4jWr5uPIelel9qHYYA0cS/7hwPwvfs4/Rv8slp75ewSZ7v5PMV5fXsXHe5ExscXAIAzA0rbWjOhdL7k828MAAAuytUH+fr5vXGWdv6yNqUplBkg9fO2bwZAKaQ1EAUAbefVDAAA3lxuHE98Dmicr/vrAYA7pJ0FBAM6a5h7umCAO6SdBQQDOmuYe7pggDuknQUEAzprmHu6f4CKKFDAwtpkAAAAAElFTkSuQmCC",
  M0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABpklEQVR4Xu1ZMQ7CMAxsJ75SiYVX8AdWHsTAyI7EV5gBqSPf6FTUqqloaaiduCTBx+w4zt354oY8U/7LlZ8/AwBQgHIE0ALKBQATRAugBZQjgBbwFUBdlbVvDp/1+arwItFrcVO4WgBCH3ysGlclOCtALQDUg+erYkBSXZWkVnddZ5JzlcBWAAAguv6YScOQTQm+zEevAHUAvDEy2ftjJfydAgDAiHcbw1LMR+cBE4PK5LWoFgDbUECdF2zro5kD5hSgDgCuKZLGxomgaBUAADoEpE3P96twsW+BLybl9JFEbYnkWsDX9aGAz4GLpWpWsMQTGDzA8aEEHkBEACbIfCaHBxCV1YdR3wQxB1gQwC2g/Rbgthw3PvpbgHsgbvziANyvx/bf4PVmy61t0fjL+dTm3+0PrJuNFdxsAAA6BRg6QyvBMG/q+ZkCAMCiHT2f/PZ4DoK4zPdPdPNbDSOMB3DXSccHA8AcJDQQBgBX5p0VAACktRw4H3sOCFyv+PYAQBzSxBJCAYkRJl4uFCAOaWIJoYDECBMvFwoQhzSxhFBAYoSJl/sChxsQUCf4xD4AAAAASUVORK5CYII=",
  O0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABcElEQVR4Xu2ZPQ7CMAyFm6lXqcTCKbgDKwdiYGRH4irMgMTINZiKWhEkKqHGP2li+bESu/bzZ+OG0Dj/BOf5NxAABDhXAC3gHAAMQbQAWsC5AmgBKQD969FLfUjsQ9uJiigyHgJ3K0DpxKfUcElgE+BWgNTEQ9tJWntoLZY9lQQyARAgceqDAO8tQG3gKTHmZwAESFTg36xwQ4BbAbQTj8BVswfMdYBbAXIlboYAtwLkTrx6AiDAZDXm/s4nDFfSCx7psOQGSGvVNSfAUuhXOwPcCrB04tURAAG8X4jgSgwEOL8Wn1tYcn1v5j7ArAC3y2H8N3i13uTKgeX3fDqOdtvdnrTekw4PD4AAHwJimUqTECsf41mMAAjA6lQ9o+v9+eOMWvnvuwM1pDgDqHba54sJEBMpLUQUgFt5NgEQQJvlwv7Ie0DheNUfDwHUJTXmEAQYK5h6uCBAXVJjDkGAsYKphwsC1CU15hAEGCuYerhvzOH4QXEtmWEAAAAASUVORK5CYII=",
  F0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABlklEQVR4Xu2ZwQ3CMAxFyzRZosshWKMnEDvlBGIRUBFGECFcxy516s81ibHf/3ZT2HTBP5vg9XcAAAcEJ4AWCG4ADEG0AFogOAG0gNYAOeebNobmfEpJJaLq8Jh4WABLF166ptYJ1Q4IC8Cq8JTSh4g5Z80oeJ2VOkHsAABQTv1S+VJ2rRPcOwAAit6HAwoCq20Bbupz61MfEW5nAFcgtw4AEwnAAcKXo79dhDiLc+sTDdDBAd4cIFVWul/7Vjh7C0gLku5vDsDUXqZ90ouRuxnA3f05IKsDwBW0+hYIA8BAyapfjNzMgLkBjPG/uSkEAIIbEgApH9oB43AAAO8zgLvgaNfdO0Bb4K/z70+YchDO/hQYhuHxb3Df93PWKI59PB0eZ3bbvegFT7R5/AIAeDqAJFraCaQ85fM3BwCAuEttD1yu54+AUuXpcPUMsC1HHm0xAJQqDUN56jYnCECt8tUOAAAbAd1EEc8AN5kbJQIARiCbDQMHNCudUeJwgBHIZsPAAc1KZ5Q4HGAEstkwcECz0hklfgfgGkBQny7ZWgAAAABJRU5ErkJggg==",
  j0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABiUlEQVR4Xu2ZUQ6CMAyG4TS7BJczeg2eNN5pTxovooHYBBdw7RZoob+PUtbu7/d3KG3j/NM6338DAUCAcwVgAecAYAjCArCAcwVggVoAYozv2jVq7g8hVDWx6uahcLcCaG88paaUhGIC3ApQuvEQAsvqMUZW3FKQlAQxARBAOPW5nU87WkqCOQIgQOL9pc6mQh2WAAiwMOVBANMquTPS/BCEBbxbIIdw6fSndc1bAAJkFAABR/sxxD3fuXE5C5mfATgGvR+DIAAEzP/lJRmCFDtHk/khmJvidP2fVejaIEQad3gBpgLuQoDJMzqr+ZwnwV1ZYA0BpmuatwCr7YKgKfa7soBgj9lQVQv0fT++De66LlvolgG3+3VMdz5dRC97RMFDAgjwJYC6q00CdZ7q2YwACLClwWdyPV+Pn2+lnaebi2eA8v4bNQFo4zQMtYQgAUo7X0wABNBq+Up5xTNgpTrUloUAatIbSQwCjDRCrQwQoCa9kcQgwEgj1MoAAWrSG0kMAow0Qq2MDwWEN1DRyheEAAAAAElFTkSuQmCC",
  z0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABi0lEQVR4Xu1Y2w3CMAxsp8kSXQ7BGv0CsVO+QCwCaoWltAJkOxi75PiqhJPYd+dH0neN//rG4+8AABTQOAJIgcYFgCKIFEAKNI4AUqBWADnne+0eNetTSlUkVi2eHG8WAO/A16rRKkGtgGYB0AaeUhKles5ZZE/GUiWIFQAAhFVfyjwx+TcKAACr3Ncyyy0I4WrAWgEAQFndoQAmAkgB4d3AfA5ADUAXWI7A6ALoArpLDrMJdOgC6AKyJzK0QW5uFddU0SMo5gDMAd+fA0hVr2aK8F2Am3LvBqYpePqv/A77Jmj5IrQJAApmuOTPdp9G5k2lgAUA5Z5roMLVABHtDOPN1QBGTGIT1xQYx3EehIZhEDtuueB0Ps7b73cH0XQrMp4OAABPBRCb3kog5smfnykAAFgmNGPv6+2ysJIyT4vVNYDho6mJGwAUFRVD0yg/bE4AaJlXKwAAeFFudK64Bhj54bYtAHCDPsjBUEAQItzcgALcoA9yMBQQhAg3N6AAN+iDHAwFBCHCzY0H29YTUOmvZR4AAAAASUVORK5CYII=",
  H0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABf0lEQVR4Xu1ZwQ3CMAxsp8kSXQ7BGn2B2CkvEIuAUmGJRk1TJ0pt6uPb1LHvzhen9J3xX2+8/g4AQAHGEUALGBcATBAtgBYwjgBaoFYA3vt3bYya951zVSRWvRwSNwuAdOGxakqVUKwAswBwC3fOsVrce89aX6sEtgIAANP1uQogRkuVwPUCdQo4PAApZmOlHFYBACDh8lBAdFyiBQrnAfWnADwAHrA86sIEYYLzSxNOAZwCZddiHIPMb4S73wYxB2AOqJ8DaGZYUpN6D9j6wW+tVehZACJeBwC0m2BOAVsHoCX2Q+y/V8AWAFLFqwQgxzj3+VrxZgD4BW13ExzHcfo3eBgGLnlN19/u1yn++XRhDXesxWEDAPBVANEprQRinvLZTQEAoGlH54M/X4/ZIi7z9HKxB+RTbLtCDAAqi8ywbZnp6ARAKfPFCgAAUpQ32pftAY3yEAsLAMSgV7IxFKCECLE0oAAx6JVsDAUoIUIsDShADHolG0MBSogQS+MDSa1DUAh96wgAAAAASUVORK5CYII=",
  b0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABfklEQVR4Xu2Z0Q3CMAxE22myRJdDsEa/QOyULxCLgFphCSpEYluN3fr4bYqd87sjCn0X/NMH338HAUBAcAVggeAAIARhAVgguAKwgBaAnPNT+x2a91NKqiGqXp4aDyuA9caX1EhJEBMQVgDuxlNKLIvnnFnrtSSwCYAAzNTnEkATlZLAzQJ3BOxeAOlka4PBPQEQQJnyJRJAAPNo3DwEYYHoFih5WEuI+wyAAAUFQIAyI9xbQDvhkoUgAM4BvDtCHIRKnlo+116IIAOUKU8DmS5afonpPgRriftHCt0yhRSAJr9bAmozAgJsJQNqPc9dtxkCuBurWf951b60zOq/AuM4zv8GD8NQ02uzNZfrea51PJxYhzvW4qkABHgTQKO1JoEmT/00IwACNHP370L3x+3rAXfy9LI4A4z335kJQBunMLQSggSQTl5MAASwGvlKddkZsFIfZl8LAcykd1IYBDgZhFkbIMBMeieFQYCTQZi1AQLMpHdSGAQ4GYRZGy/rLBBQOfqSQgAAAABJRU5ErkJggg==",
  Y0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABe0lEQVR4Xu1ZQQ6CQAyE1+wn+JzRb3DS+Kc9afyIBmMT3IMwW5dWO55MLLQ7M50W7Lvgnz74+TsCQAUER4AtEFwANEG2AFsgOAJsAa0Acs537T0016eUVCSqLp4KDwuA9cFL1dQqoVoBYQGoPXhKCWr1nDMUL8GoEmAFEADQ9VHmhcm/UQABKHq/ltm1huDOA0oFEIBKd6cCViLAFgCfDZrvAfSAjTZAt5sgugdop4R7D1jyMgKgHJPuFaBleElBBIBjEHtHyD1gqafK39EXIlyEvvw4PAEqRjr//jOLkHYKEIDoCpikPveVUlGh9oCf8AB0yiDxBGDmB5tNgXEcn/8GD8OAkNU89nQ+PnPsdwdouYOCpwQE4KUAodRaCcK81LOZAghA867+nOB6u7wFoMzLxdUeYHz+zgwAObiYoRUQAkAt89UKIABWlDfKC3tAozrMbksAzKB3kpgKcEKEWRlUgBn0ThJTAU6IMCuDCjCD3kliKsAJEWZlPABUFxZQZjD81AAAAABJRU5ErkJggg==",
  V0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABmklEQVR4Xu2ZUQ6CMAyG8TS7BJczeg2eNN5pTxovopmxCSxD147Rwn6fDA66fv/fjs1D1/jn0Hj+HQDAAY0TQAk0bgA0QZQASqBxAiiBUgN471+lzyi53zlXJGLRzWHizQLQTjx2jdQJYgc0C0CauHOOVeree9Z4Gsx1AtsBAMDs+lzlScndOAAAotqXKpvbEMz1gNgBACDs7nBAJgGUAHNvUP09AD0Aq8D0FRirwHcVmHtBKgW0mSYIAH92h1InbN4Bu98MzSm71HK5GQckjrQml3ZfAgAQEeCUAI1NucR8CWTuacJxe3JoSJ5+G383eya49InQ5gCMlMkSP7f5pdQPAcyVQA0Ac8mbBpAlf8agX8k3A2DMKS6Z6iUwDMPn3+C+7zP0Wm/I9Xb5BDsdz6xDHtbgEAAAvg4gbbWdQMrTfFZzAACsV97JSI/nfXKdqzzdLO4Byvl3agAocWqGWiAIgFR5sQMAQEvySnHZPaDSPNQeCwBq6I0EhgOMCKE2DThADb2RwHCAESHUpgEHqKE3EhgOMCKE2jTeiW8rUMHeMcIAAAAASUVORK5CYII=",
  G0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABiUlEQVR4Xu1ZWw7CMAxjp+kldjkE19gXiDv1C8RFQJuItE1McZpqj9Z8IS3tGttx2q45Vf5rKs//RACogMoRYAlULgCaIEuAJVA5AiwBrwBijB/vHJ7xIQQXia7B/cKrBWDrxOeqSVVCsgKqBcCaeAhhQlaM8W/Jo3GaX1iVYFYAATC6PsosGkcFKAiwBIz7AnqAVlPz5zRBmqBt74+6OxqnKZYmSBO0nQ7ZBbSayt0F0PctnRm08bv3AC0BeU4AFk6NGoBUALsAu4Cps5mCUy5B0R0eGnd4D/BeifVAyRzj/wLM7k2QADgvRatXQC/1sV/MFVV8CYxN8BAeoLm25zkBGHWE1bpA13XD1+C2bT3kZR97f9yGOS/nq2lvYwruX0AAfgoQCrdWgjAv61lNAQQgexXbJny9n5MBVuZlcLIH2JabP3ozACQVMcP8qWEzCgCpzCcrgABgBB0myuwBh8kMXCgBAIEqNowKKJZaMDEqAASq2DAqoFhqwcSoABCoYsOogGKpBRP7AkFqUlBevs8wAAAAAElFTkSuQmCC",
  K0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABdElEQVR4Xu1ZwQ3CMAxsp8kSXQ7BGn2B2KkvEIuAUmGJRm3VSxrsyscXJ7bPd5cQ2sb5p3Xef0MAyADnCFACzglAE6QEKAHnCFACpQQYhuFdukfJ+hBC0RCLFsfC3QKg3XjKmlwmZDPALQBo4yGEEolHiUHrUSbADCAAoOuTAd4lsCTglBmo1lf2hWQNBe957hOARBpkAHjcUQILCJi7B9AElyc1+YYeQA/A7vw0QZrgPAI8BcAnMl6FodeGHd8A+VuAvwWmT2XoRSgyaG6NOROs8SIke7oEQCbvmgHRuAnAUTwAPWa3xh+GAVsbQuJ+jTU1wuqnQN/347/BXdchNVePvd2vY47z6QLdbqHgmIAAfBkgI9Vmgkxe6vkbAwhAdVWvJ3i+HpMAdPKyONsDlPtv1ACQxsUMtYAQAHInn80AAqA18kp5YQ+oVIfatgRADXojickAI4NQK4MMUIPeSGIywMgg1MogA9SgN5KYDDAyCLUyPrxQEFDHCk4UAAAAAElFTkSuQmCC",
  W0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABiElEQVR4Xu1ZWw6DMAyD0/QSXG7arsHXpt2pX5t2kU0gIo3CHnEqqBrvEzVZYztuKG3j/Nc6r78hAFSAcwTYAs4FQBNkC7AFnCPAFrAKIMb4tOawxIcQTCSagoeNuwVg78JT1aBKgBXgFgC08BCCqtVjjKr1slirBLUCCADo+lSA9xZYce3ZI7TnrafBZh5AABIEUk+gAsBjjy2wVJaqrVWLc87+bIHkWKQH0AOw2Z8mSBOcI1Ds2yAnQU6CC6n6eBmSgSc9590MQrkB+AVccSb4700QMgkOuVeUpRrvVYuRdwH3ALzd1q7e8iLMD4nW2J+eq0hVLUYUQACg2/3vQZ/YL1oBOXHYFYC+78evwV3X5azJnOtyPY85joeTqq1Vi4c/IACTAoSyvZUgzMt+NlMAATB3rS3B/XGbJdAyL8GwB9i2b4/eDQDZupihvRQsgwCAMg8rgABghBUbpfaAYisBN0YAQOCqCaMCqqESLIQKAIGrJowKqIZKsBAqAASumjAqoBoqwUJeJcoTUMufqVIAAAAASUVORK5CYII=",
  J0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABoklEQVR4Xu2ZQa7CMAxE4TS5RC+HPtfoCsSdsuKLi4BaagmilsR2aGM8bKlD/GbsOGW/c/7ZO89/BwBwgHMCKAHnBkATRAmgBJwTQAloDRBjvGvX0MSHEFQiqoKHjbsFsHXiqWukThA7wC0AbuIhhDexYoyzJV/6XK5fcJ3AdgAAMLt+Ttn0e1J4ySk/5wAAKOwROeXpe3M9IFcipYmbA1Db+gAwEWi+BJYsLe362olw9TkAABICtZQ30wNSBwDAwt2Ae/zBATgFngRwDDJfka1+DFLTwySYXIK012AzTTA99txehl4UK3plVvp8800w54BcKQyO+TQ8uQDwCZI5AKXWnpsM59wAAK3NAdKZfinuVXUTDqgNYBp3x2XnmuHXS6Dv+/Hf4K7rvpGbeM3z5TTG/h2OrOmW9fDwAwAwOYCk2toJpDztZzUHAIC4WusE/t+ubwtxladgcQ+ok4Z8lc0A0JapGcpT0EUSAKnyYgcAgE645qLZPaC5DJQbAgAlQPPhcIB5CZUJwAFKgObD4QDzEioTgAOUAM2HwwHmJVQm8AAWCkBQyFvnKgAAAABJRU5ErkJggg==",
  X0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABYklEQVR4Xu2ZUQ6CMAyG4TS7BJczeg2eNN5pTxovooHYBAgRugkd6eer3dr+/9+u1bpy/qmd518BAApwjgAl4FwANEFKgBJwjgAlkCuAGOM7946c8yGELBKzDneBuwXAOvGpalKVkKwAtwBoEw8hjMiKMeaU/OJZrRLUCgAAZddHAZQAPYAmOESAV4BnkDlgcZjJMWAQUm6HTIJauTEKMwrrfgFiF2AXYBdgF2AXGCDwr2Woa65zdxU/Ca6dO34BJS+LSwCEedcK6FQEAEfpAWtrXmt3GAVoE1tjPxyvp41w81egbdv+3+CmadbEupvN7X7tfZ1PF9WKrzLuHADAVwFCrbUShHmJZzcFAMBu1T3v6Pl6jL7QMi+Hk3uAcf6VGQCSuDRDKyAEgFTmkxUAAFaUb+RX3QM2isPsWgAwg74QxyigECLMwkABZtAX4hgFFEKEWRgowAz6QhyjgEKIMAvjA3ZZEFBBFptfAAAAAElFTkSuQmCC",
  q0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABu0lEQVR4Xu1ZQW7EMAjMvsafyOeq9hs5teqffGrVj2yVKEiuFS9gK4Et06shwDCMWfc2Bf+7Ba9/AgBgQHAEMALBCQARxAhgBIIjgBEYJUDO+T76jRH/lNJQE4ec18TDAmBdeM2aXiZ0MyAsAL2Fp5S2puWcH4681K71ES0T1AwAAErVp47WHauZILXjbgx3DJAWJrUDAAwCYIByMTpdBDlqt86p0dytMboPAABOVA7UW7X7gwH7AtS6BsOOQAfzRC5PcwuIqimMpGLoBoCa2lSAlPItfw44AOBlDwADKvXHCOzvANCAxl5Qr77/VgSpUK5A7tz9ixBXwMj5o2cz99fgKAPW4ktBPXhZUv3AUxlr/g8w0uE1DudPNiEBCD0CpfiV41CMlorVKmPNCHA7e+/502hAb4ESP9MRWJZlexGa51mS62U2H5/vW6zXlzcVq1XGawAAsDOAWmvNBOo85XMZAwDAZdN9HOj75+vPgbbz5NytAcb1T2YAUOEkhlZAEAC9ne9mAACwavlJcdUacFIeZp8FAGbQOwkMBjhphFkaYIAZ9E4CgwFOGmGWBhhgBr2TwGCAk0aYpfELhfV5UMLWkF0AAAAASUVORK5CYII=",
  _0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABnUlEQVR4Xu2ZUW6DMAyGy2lyCS43tdfgadPulKdVvUgnqlqCCEb+2IwE/30tdu3Pv52Ydhfnn855/hcCoAKcE2ALOBcAhyBbgC3gnABbQCuAGONT60NjH0JQFVFlPAbuFsDRiaeqKVVCsQLcAtAmHkKYFS/GuDgCcp/TKgFWAAEUTv20olI5NwoggKT3qYA3gdO3wJr00+ktINBWqf4UIICVc3/tnC89/0UJ6I1w93sAmigBZN4U1zZIKgBcj9kC6MsIdBfgDOApsLz+osrIVWo1Q3DrRodekAggk0C1Cshdera2xC0ObgCMLbQE1QUAmR8uAUjlT6OAyRaX9bZ4+vwpFHBaAFvTWvt99S2gTfAv++klKm2D3U+BYRhe/wb3fb9njrDvr+/Pl8314wZtuNDD4w8QwFsBUqKjlSCVl3j+TQEEAHeprcH98TNziFZejItngG06uLfDAEioMgzx0G0sBEBp5YsVQAA2BazGCzwDqoncKBACMALZrBsqoNnSGQVOBRiBbNYNFdBs6YwCpwKMQDbrhgpotnRGgf8C+cRwUG3jGaIAAAAASUVORK5CYII=",
  Z0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABgklEQVR4Xu1ZyQ3CMBAk1biJNIegjbxA9OQXiEZAQaxErBy7s0Ace/jiNd65fNDsKv80lfe/IwBUQOUI0AKVC4AhSAvQApUjQAt4BRBjfHjn8NSHEFwkuor7hVcLwNqNp6pBlQAroFoA0MZDCCqrxxhV46YGWZVgVgABMKa+lvmUUVQJ2SmAACTen2I2BapYBRCAiZSnApRWWdojsw9BWoAWGD/pMQOYAcO7As8B4KWIu4Dxhejnt0FtuGnH8RywgAAtQAvYXok3mwF9ZoxtldlbYCnE5Pu5c4AEZpUACPObUYAwqn0a054ACcBWMkDreeu4zSnA2uDc+E87pZb5+S7Qdd3r3+C2bb/Zk3uu8+X0muOwP5q2dtPg/gcIwFsBQtnaShDmZT1/UwABcLvWN8Htfh1MYGVeiuEM8C3fX70aALJ0CUN/K9gMAgDKPKwAAoARlm2VOQOy7QRcGAEAgSumjAoohkqwESoABK6YMiqgGCrBRqgAELhiyqiAYqgEG3kC9IhAUMKuLdIAAAAASUVORK5CYII=",
  $0 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABeklEQVR4Xu2ZwQ3CMAxF22myRJdDsEZPIHbKCcQioFRYKhUltaNgN/6cOCSx/f38U0rfOf/0zuvvIAAIcK4ARsA5ADBBjABGwLkCGIFSAGKMz9IzSvaHEIqaWLQ5Je5WAO3Cl9RISRAT4FYAbuEhBNaIxxhZ60tJYBMAAZiuzyWAOiolgesF5ghoXoC1zi5JaZYACLDi8iBgcV1iBITPA+ZvAfcesPUxr9kRgAAZBaSdp2PNe0COgOYFKC0wJ6B5AiCA8H7PdX43HgACQEDZK6+EOv1w+kZT8yaYiqfC599deoBbAVyPwPw63AUBW+/vret25wFbC+OsUx2BcRynf4OHYeDkXH3t5XqeYhwPJ9arftbiFAACvAmglmqTQJ2nfP5GAASoPtW/A9wft48F3M7TZrEHKNffqQlAhZMZaglBAkg7LyYAAmi1vFJctgdUykPtWAigJr2RwCDASCPU0gABatIbCQwCjDRCLQ0QoCa9kcAgwEgj1NJ4AaoSJVAiT3eHAAAAAElFTkSuQmCC",
  eC =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABoElEQVR4Xu2ZUW6DMAyG4TS5BJertmvwtGp3ylOnXaQTqJ7SiMixI7Ahf58qYUj8/b+dBMah89/Yef4DAMABnRNACXRuADRBlABKoHMCKIFWA8QYn63PaLk/hNAkYtPNy8S7BWCdeO4arRPUDugWgDbxEEJVqccYq+JKQVIniB0AAMKuX6t8rqjWCe4cAABZ7ZeUzUFd1gEAUOjycEBlqXBrpPsmiBJACWzv9NAD0APezwrYBygPRadZBbgt8uUdAADM+wE44Oo9gLa0pVK4vANaABC0LUjuVwHuMMO9GVqSp8TT/wlQ0Ws+UbDmOwDX7TkgucqnA8BZna6nqqZQCjb/D9kAJBJVFKxxwB4A0meeBgBn9drrpy2B2gRr4kxXgXme16/B0zTVzPWwmPv31zrWx+1TVNai4GUAAHg5gKS1dgIpT/M5zAEAcFh1bw/08/t4uyBVnm5W9wDj/AczAJQ4NUMrEARAq7zaAQBgJflO44p7wE7zMHssAJihdzIwHOBECLNpwAFm6J0MDAc4EcJsGnCAGXonA8MBToQwm8YfM/VMUGO1X2AAAAAASUVORK5CYII=",
  tC =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABjklEQVR4Xu2ZwQ3CMAxFyzRZosshWKMnEDvlBGIRUKtaKlEDcUzrJP5cSWvn/2fHgUNn/HMwvv8OAoAA4wqgBIwDgCaIEkAJGFcAJSAFwHv/kr5D8rxzTmSi6OExcbMCaG88pCaXhGwCzArA3bhzjlXi3nvWeikJbAIgALPrcwkgR3NJ4PaC4ghoXoCYsyEpzRIAASJdHgQEx2WzJZB6yEOAzIGo+mMw13kiCwIwr8fqg5DU8ervAuYFkI6+1RNgTgBC/l+TX3UEQIB5wIn9TiBtisXPATECuL1gFHBNrGoEWExuq9eDbyQQPSYFIOebISBGwq9eAAFq6QGp93/uumoI4G4sZf3yCA1LZfNTYBiG6d/gvu9Tct1tzfV2mWKdjmfWDZe1eAwAAWYCyFptEsh5ymc3AiDAbtW9HujxvH98wXWeHs7uAcr779QEoI1TM9QSggTIdT6bAAigZflGcdk9YKM81F4LAdSkLyQwCCjECLU0QICa9IUEBgGFGKGWBghQk76QwCCgECPU0ngDorE0UKcM5FwAAAAASUVORK5CYII=",
  nC =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABkElEQVR4Xu1ZwQ3CMAxsp8kSXQ7BGn2B2CkvEIuAWrBUoqLGThOb5PjixPbd+ZK2fdf4r2+8/w4AQAGNI4ARaFwAMEGMAEagcQQwAqkC8N4/U/dIWe+cSyIxafFUeLMAaDceqkaqBLECmgVA2rhzjjXq3ntWPAVzlcBWAABguj6XeWKyGgUAgGD2pczGGoI5DwgVAACE7g4FRCKAEWA+G2S/B8ADCt0Azd4EufeA1FPCnAcsmIm0sXeYFAgAYM0EY2nfyyzNKmALCACw0zMDFAAP4L0lzn4T3Jr9X8fk1jE4ecZajLkR4F6EYt4I0Z5NAkDMV6uALekvR6ZKBVQHQKwJcuP+ZgS4jcXEL401VEz2U2Acx/lr8DAMMbUWi7lcz3Ou4+HEOtpZwVMCAPBRAFGrrQRinuoppgAAUGy61xPdH7evP7jM02KxByj336kBQI2TGWoBQQBImRcrAABoUZ4pL9sDMtWhti0AUIPeSGIowAgRamVAAWrQG0kMBRghQq0MKEANeiOJoQAjRKiV8QK6/xBQt2w89gAAAABJRU5ErkJggg==",
  rC =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABc0lEQVR4Xu1ZwQ3CMAyk02SJLodgjb5A7NQXiEVAqbBEoxb54kBJfHxrh/h8d3HTbuf81zmvf0cAyADnCFACzglAE6QEKAHnCFACVgKM4/iwrmHJDyGYmmhKjht3C8DWhaesyWVCNgPcAoAWHkKwSDxKDMpHmQAzgACArk8GeJfAmoBTZqBa/7AuJGsouOS5TwASaZAB4HFHCawg8HdzAE1wvVOzJ/QAegA289MEaYLLCPAUAK/IOApDtw0F7wD5LsB3gflVGToIRQYt5bgwQZGPSwCk864ZEI2bANTuAejxu/AlqG4TtADwPkOkRvj1U2AYhulrcN/3lhqK554vp2nNw/4ITbdQcPwDAvBigLRwayZI52U/P2MAASiuYmzB2/06S0A7L8nZHoBtt3z0ZgBIKWKG5UvTrSgA5HY+mwEEQNegaqJgD6imMuVGCYASqGbDyIBmW6ssjAxQAtVsGBnQbGuVhZEBSqCaDSMDmm2tsrAnhJ8QUHRVl3EAAAAASUVORK5CYII=",
  iC =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABgklEQVR4Xu1YSw6CMBCV0/QSXM7oNVhpvFNXGi+iKXESaIDORwU6zy0ztfN+LTQH57/G+fwHAAAFOEcAFnAuAIQgLAALOEcAFrAKIMb4sq5h6Q8hmEg0NaeNuwVg7cFz1WiVoFaAWwCkg4cQRmTFGCctz60r5YVUCWIFAABh6nOZ5dZBAQUEYAHhvQAZUPJU/hwhiBCU3f256c6tKykWIYgQlL0d4hQoeQqnQIYAjkEcgzgGRd8Auec7t66UWbgH4B7g5B6QLDP1eW3zFih5mJ7PfTtMzykvXAJAzO9GAcRonvJzSlhiftgDAPaSAVzPS+t2pwDpgEv1Qzvllvn5KdB1XX8TbNv2mzOZ17reLv0ap+NZ9IovKk5/AAA+CiDK1lYCMU/7+ZsCAIDZtbYFHs/7aAEp89SszgDb9u3dqwFAW6cwtI+iW4EA0DKvVgAA0BG22S5xBmx2EuXGAIASuGraoIBqqFQOAgUogaumDQqohkrlIFCAErhq2qCAaqhUDvIGnc1MUC/59SgAAAAASUVORK5CYII=",
  oC =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABtUlEQVR4Xu1ZW47CMAwMp8klejm0e41+gbhTvljtRRYVYQmqhviRpa09fPHhhMx4ZpyIQwr+OQTHn0AAFBCcAVgguAAQgrAALBCcAVjAKoBSyp91D8v6nLOpiabF08HDErA28LlqtEpQKyAsAVLgOeeXZpVSWJY3rBM1VVSs8bwBiJY4ESZRMQhQpD4UMMsA0nUtC+aEteqt0+DjFmgBckcAAeZagVtXGyXS+8C/KwAEPBjgdpZbBwVUGNiNBeZhaO38k9VEthYVay5CtQwIR0ArDN0rAARUpkEtzbmvxs3fBBcOyHoOhyVAC3zzU6A1DVpvBJZsUkqbvQeAAGYIcixAI3OpdvMKaI3DltQn8AT8+ftuMqAnAUtkhVDAu8AMQYALC7S8/ua97yMDtARM61adAuM43v8NHobBgqH72vPldN/z6/gteuKLiqcfAAEPBVAL11YCdZ7O8zEFgIDuLpZt+PN7fVkg7TwtVmeA7Lj9q1cjgKBQGPaHxtuRCNB2Xq0AEMBr0G6qxBmwG2TMg4IAJlFuy6AAt61lAoMCmES5LYMC3LaWCQwKYBLltgwKcNtaJrAbrJpAUGlopqgAAAAASUVORK5CYII=",
  lC =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABqUlEQVR4Xu1ZQY7CMAxsX5NP9HOr3W/0BNo/5bSr/QioqEahUjYZh2CjDEdwsDMzHrswT4O/5sHvPxEAKmBwBNgCgwuAJsgWYAsMjgBboFUAMcZL63e0nA8hNJHYdHgrfFgArC9+VI1WCWoFDAtA7cVDCA8kxRihVteeR5UAK4AAVLp+icHWz3NyehsFEICCR5QAogIyCLhtAalXpkGO4eP7x3OlUUIAwNW42xgUpmqZLimjxHySD7oTFKzZ/QlAxu1RYKiASgTcmCA9YEcAlbp2AXobE6xU8j1M8RQJGTsU/IwpQABABKgA/IcUSNVQsKYFctOg9tkAFMzkbgw+G4BtSqRr87FFCIC3hyEqILMQtXhAuiwN1wKpKaZ+4HYTRF0ciScAyUR4mQLWdb39G7wsC0JW99jz9+mW4/PjC9ptoOAtAQHYFSCUWitBmJd6XqYAAtC9q/9P8Pv38xCAMi+H1R5gfP/JDAC5uJihFRACgJZ5tQIIgBXlnfLCHtCpDrOvJQBm0DtJTAU4IcKsDCrADHoniakAJ0SYlUEFmEHvJDEV4IQIszKuhEB2UCjTkC8AAAAASUVORK5CYII=",
  sC =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABuElEQVR4Xu2ZUW7CMAyGy2lyiV5u2q7RpyHulKdNuwhTEZZKRGU7prWLf56Q6jTx5/93QjgNyT+n5PkPAAAFJCcACyQXAJogLAALJCcAC1gFUGu9Wt9hGV9KMRXRNHheeFoA3om3qulVQrcC0gKQJl5KeShSrVVk9d5x9HKtEtQKAABh128rSRVaU4I2fk1OYRWQDsDCk6JeYPV+uB4AAHcCnLe556KtYxEUpgesKaDtBW8PgAPRVlh6Xgi/Czw5qorU/LYAOCVYEw+7C0iVAADC3wqcj8LtAlAAcx7ALtAQsPaCcBbgDjrcc87z1puhze4DpNteOgDS+4BeK4S3wCsAkGqevSsMAK20pfFzHCW+/B7uJChNSNorlnGHBCD1tORm6JAWeBWAw1hAu39L49MDmEG5WmCaptu/weM4Sou2S9z58n2b5/PjS3W4UwXPEwDAXQFUVm8lUOVpPbspAAB2cfb6JL9/Pw8PtZWnwd09wDn/wQ0AJU7N0AsEAeitfLcCAMCr5BvNq+4BG63D7bUA4IY+yMRQQJBCuC0DCnBDH2RiKCBIIdyWAQW4oQ8yMRQQpBBuy/gHZEJJUEl+IWAAAAAASUVORK5CYII=",
  aC =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABqklEQVR4Xu1ZQXLCMAyE1/gT+Vyn/UZO7fRPPtHpR2DCoJkQ7KC1DHGs5SwZa3e1lp3jwfnv6Lz+AwGgApwjwBZwLgCaIFuALeAcAbaAVQAxxrN1DUt+CMFEoil52rhbALYufKmaUiUUK8AtANrCQwh3JMUYVa1emieLo0qAFUAAlK6/ZFIYyinBynzzCnAHwIyRZO8vldCdAgjAgvccw7WYb84DEoNK8lh0C0BuKNDOC7n8ZuaAZwpwBwBqiqqxMRHUrAIIwA2B2qZnvRW+7C6wYlJFlyRtS+yuBayuTwU8DlyQqqHgGk9g9IDChxJ6gBKB7k3wWQu5AGDt5HABwNrrUvcAzK1gaofEyxJ0skHBrR2DuwRAaebZsHnRLgGYkJGTIGWGL/eAcRyvX4OHYbCSWTX/5/f7ut7nxxfU1lDw9AcE4KYAoW9rJQjzsp+3KYAAVO1gfLG//9NdEsq8JBd7AL7luhmbASBliBnWLUu/mgBQynyxAgiAnqRdRMIesIuqgE0SAACsLkOpgC5pBYqiAgCwugylArqkFSiKCgDA6jKUCuiSVqCoC51uKFCD43BiAAAAAElFTkSuQmCC",
  uC =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABiUlEQVR4Xu2ZzQ3CMAxG22myRJdDsEZPIHbqCcQioFRYKhWlcVLXDv44IZE/Pz+7AdrG+at1Hn8DADDAOQGUgHMB0ARRAigB5wRQAqUCDMPwLF2jZH4IoSiJRZPjwd0C0A58bk2uCdkGuAWQGngIoaS0Y2llzeeawDYAABK7PgzwXgLcAp4bU30PAIBEAku9wo0BbgFsHTgJZ+YesFYBbgFIBV6NAW4BSAdu3gAAmF2Nc5/zCc2V9QWPNbjkF6CtrrrVAdhLfbM9wC2AvQM3Z4AkAFr7WyM1cxWW+kUorkuBT99XY8BaF6fPlx6T7gFEQFO75qD+vgSmBpkugVTVueOqKQFuYJzxqk+Bvu/Hf4O7ruOcWXzs5Xoe9zgeTqzrPWtw3AAA3gZQSrVNoMzTeXYzAADEq/r3BvfH7WMAN/M0ObsHKMffqAGgwKkZaoEgALmZzzYAALRSLrQvuwcInUNtWQBQQ29kYxhgJBFqx4ABauiNbAwDjCRC7RgwQA29kY1hgJFEqB3jBW6yFlD3JuYqAAAAAElFTkSuQmCC",
  cC = {
    A: f0,
    B: A0,
    C: h0,
    D: g0,
    E: p0,
    F: m0,
    G: v0,
    H: y0,
    I: C0,
    J: E0,
    K: w0,
    L: B0,
    M: S0,
    N: k0,
    O: Q0,
    P: R0,
    Q: I0,
    R: D0,
    S: x0,
    T: L0,
    U: N0,
    V: U0,
    W: P0,
    X: T0,
    Y: M0,
    Z: O0,
  },
  dC = {
    A: F0,
    B: j0,
    C: z0,
    D: H0,
    E: b0,
    F: Y0,
    G: V0,
    H: G0,
    I: K0,
    J: W0,
    K: J0,
    L: X0,
    M: q0,
    N: _0,
    O: Z0,
    P: $0,
    Q: eC,
    R: tC,
    S: nC,
    T: rC,
    U: iC,
    V: oC,
    W: lC,
    X: sC,
    Y: aC,
    Z: uC,
  },
  fC = (e, t) => (e ? ((e = e.toUpperCase()), t ? dC[e] : cC[e]) : null),
  AC = (e) => {
    switch (e.toLowerCase()) {
      case "carrot":
        return s0;
      case "tomato":
        return u0;
      case "blueberry":
        return l0;
      case "pumpkin":
        return a0;
      default:
        return null;
    }
  },
  hC = (e) => {
    const t = e.tileX === e.selectedX && e.tileY === e.selectedY && e.isEndpoint;
    let { lobbyId: n } = bA();
    const [r, i] = E.useState(!0);
    E.useEffect(() => {
      const s = (a) => {
        a.key === "Escape" &&
          t &&
          e.suggestedWord.length > 0 &&
          (e.setSuggestions([]), e.setEndPointSelected(!1));
      };
      if (t)
        return (
          window.addEventListener("keydown", s), () => window.removeEventListener("keydown", s)
        );
    }, [t, e.suggestedWord, e.setSuggestions, e.setEndPointSelected]);
    const o = () => {
        !t || e.suggestedWord.length === 0 || (e.setSuggestions([]), e.setEndPointSelected(!1));
      },
      l = (s) => {
        if (
          (o(),
          console.log("tile info:", s),
          s.isEndpoint
            ? (console.log("Endpoint found at:", s.tileX, s.tileY),
              e.setEndPointSelected(!0),
              e.setSelectedX(s.tileX),
              e.setSelectedY(s.tileY))
            : (console.log("No endpoint found at:", s.tileX, s.tileY), e.setEndPointSelected(!1)),
          s.isSuggestionEnd)
        ) {
          let a = Math.sign(s.tileX - e.selectedX),
            u = Math.sign(s.tileY - e.selectedY);
          console.log(a, u),
            Be.emit("confirm word", {
              lobbyCode: n,
              x: e.selectedX,
              y: e.selectedY,
              x_one_step: a,
              y_one_step: u,
              word: e.suggestedWord,
            });
        } else return;
      };
    return (
      E.useEffect(() => {
        if (e.cell.isSuggestion) i(!1);
        else {
          i(!0);
          const s = setTimeout(() => i(!1), 500);
          return () => clearTimeout(s);
        }
      }, [e.cell.letter]),
      v.jsxs("div", {
        className: `tile ${e.cell.visited ? "visited" : ""} ${
          e.cell.isSuggestion ? "suggestion" : ""
        } ${e.cell.isSuggestionEnd ? "suggestion-end" : ""}`,
        children: [
          v.jsx("img", { src: c0, alt: "grass", className: "grass-background" }),
          !e.cell.letter && v.jsx("img", { src: d0, alt: "null", className: "tile-background" }),
          e.cell.letter &&
            v.jsx("img", {
              src: fC(e.cell.letter, !e.cell.isSuggestion && e.cell.default),
              alt: e.cell.letter,
              className: `letter-tile ${r ? "falling" : ""} ${
                e.cell.isSuggestion ? "suggestion-letter" : ""
              } ${e.cell.isSuggestionEnd ? "suggestion-end-letter" : ""}`,
              onClick: () =>
                l({
                  isEndpoint: e.isEndpoint,
                  isSuggestionEnd: e.cell.isSuggestionEnd,
                  tileX: e.tileX,
                  tileY: e.tileY,
                }),
            }),
          e.cell.crop &&
            v.jsx("img", {
              src: AC(e.cell.crop),
              alt: e.cell.crop,
              className: "crop-image",
              onClick: () =>
                l({
                  isEndpoint: e.isEndpoint,
                  isSuggestionEnd: e.cell.isSuggestionEnd,
                  tileX: e.tileX,
                  tileY: e.tileY,
                }),
            }),
        ],
      })
    );
  };
const no = (e) => {
    let t = [];
    for (let n = 0; n < e.board.length; n++) {
      let r = [];
      for (let i = 0; i < e.board[n].length; i++) {
        let o = e.board[n][i];
        const l = [i, n],
          s = e.endpoints.some(([a, u]) => a === l[0] && u === l[1]);
        r.push(
          v.jsx(
            hC,
            {
              cell: o,
              tileX: i,
              tileY: n,
              isEndpoint: s,
              endPointSelected: e.endPointSelected,
              setEndPointSelected: e.setEndPointSelected,
              selectedX: e.selectedX,
              selectedY: e.selectedY,
              setSelectedX: e.setSelectedX,
              setSelectedY: e.setSelectedY,
              suggestedWord: e.suggestedWord,
              setSuggestions: e.setSuggestions,
            },
            `${n}-${i}`
          )
        );
      }
      t.push(v.jsx("div", { className: "board-row", children: r }, `row-${n}`));
    }
    return t;
  },
  gC = (e) => {
    const [t, n] = E.useState(
      no({
        board: e.board,
        endpoints: e.endpoints,
        endPointSelected: e.endPointSelected,
        setEndPointSelected: e.setEndPointSelected,
        selectedX: e.selectedX,
        selectedY: e.selectedY,
        setSelectedX: e.setSelectedX,
        setSelectedY: e.setSelectedY,
        suggestedWord: "",
        setSuggestions: e.setSuggestions,
      })
    );
    return (
      E.useEffect(() => {
        const r = (i) => {
          console.log("Suggestions:", i), e.setSuggestions(i);
        };
        return (
          Be.on("suggestions", r),
          () => {
            Be.off("suggestions", r);
          }
        );
      }, []),
      E.useEffect(() => {
        n(
          no({
            board: e.board,
            endpoints: e.endpoints,
            endPointSelected: e.endPointSelected,
            setEndPointSelected: e.setEndPointSelected,
            selectedX: e.selectedX,
            selectedY: e.selectedY,
            setSelectedX: e.setSelectedX,
            setSelectedY: e.setSelectedY,
            suggestedWord: "",
            setSuggestions: e.setSuggestions,
          })
        );
      }, [e.board]),
      E.useEffect(() => {
        if (e.suggestions.length > 0) {
          const r = JSON.parse(JSON.stringify(e.board)),
            i = e.suggestions[0] ? e.suggestions[0].map(([o, l, s]) => s).join("") : "";
          e.suggestions.forEach((o) => {
            o.forEach(([l, s, a], u) => {
              (r[s][l].letter === "" || r[s][l].letter === a) &&
                (r[s][l].letter === "" && (r[s][l].letter = a),
                (r[s][l].isSuggestion = !0),
                (r[s][l].isSuggestionEnd = u === o.length - 1));
            });
          }),
            n(
              no({
                board: r,
                endpoints: e.endpoints,
                endPointSelected: e.endPointSelected,
                setEndPointSelected: e.setEndPointSelected,
                selectedX: e.selectedX,
                selectedY: e.selectedY,
                setSelectedX: e.setSelectedX,
                setSelectedY: e.setSelectedY,
                suggestedWord: i,
                setSuggestions: e.setSuggestions,
              })
            );
        } else
          n(
            no({
              board: e.board,
              endpoints: e.endpoints,
              endPointSelected: e.endPointSelected,
              setEndPointSelected: e.setEndPointSelected,
              selectedX: e.selectedX,
              selectedY: e.selectedY,
              setSelectedX: e.setSelectedX,
              setSelectedY: e.setSelectedY,
              suggestedWord: "",
              setSuggestions: e.setSuggestions,
            })
          );
      }, [e.suggestions]),
      v.jsx("div", { className: "board-container", children: t })
    );
  },
  pC =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABIElEQVRYR2NkQID/SGx6MBlBloAJBgaG/0mv0xie/n1KD4vBduyU2Aq2H+QAuOWkOuCy1HmGR48eMVg8t2UQlhUi2fFXpC+AQ+C/+wtvsO9fX31DtCEvXB/D1YIcYbDelIFNi40o/X+e/GH49+kfw/uCV+Q5ANlymI2kOIIiB2CznFRHkO0AfJaT4giyHECM5cQ6gmQHkGI5MY4gyQHkWE7IEUQ7gBLL8Tli6DgA5AtyQgFUJsAAtgKK6BBAL9aIcQysQILpxVY6ku0AQiFCbGk46oDREBgNgdEQGA2B0RCgKARAFdIp9aNY2//E9g0odsCva7+wOoDsjonwPAmiejTUUgTqFYHwx7o3iM6p4AQxaplP0ByY5bDOKUzDgHTPAZtkYCNm3H+7AAAAAElFTkSuQmCC",
  mC = (e) => {
    const [t, n] = E.useState("Enter a word"),
      [r, i] = E.useState(!1),
      [o, l] = E.useState(""),
      s = () => {
        if ((console.log(e.endpointSelected), !e.endpointSelected)) {
          l("Select an endpoint first..."), i(!0);
          return;
        }
        console.log("Submitting word:", e.word),
          Be.emit("enter word", {
            lobbyCode: e.lobbyCode,
            x: e.selectedX,
            y: e.selectedY,
            word: e.word,
            board: e.board,
          });
      };
    return (
      E.useEffect(() => {
        e.endpointSelected ? n("Enter a word") : n("Select an endpoint first...");
      }, [e.endpointSelected]),
      v.jsxs("div", {
        children: [
          v.jsx("div", {
            children: r && v.jsx(Au, { message: o, setShowAlert: i, timeout: 1500 }),
          }),
          v.jsxs("div", {
            className: "word-input-container",
            children: [
              v.jsx("input", {
                type: "text",
                value: e.word,
                onChange: (a) => e.setWord(a.target.value.toUpperCase()),
                placeholder: t,
                onKeyPress: (a) => {
                  a.key === "Enter" && s();
                },
              }),
              v.jsx("button", { onClick: s, children: v.jsx("img", { src: pC, alt: "Confirm" }) }),
            ],
          }),
        ],
      })
    );
  },
  vC = () => {
    const [e, t] = E.useState(""),
      [n, r] = E.useState("");
    return (
      E.useEffect(() => {
        console.log("Counter mounted");
        const i = (o) => {
          t(o.stepsRemaining), r("Time");
        };
        return (
          Be.on("time update", i),
          () => {
            Be.off("time update", i);
          }
        );
      }, []),
      v.jsxs("div", {
        className: "counter",
        children: [
          v.jsxs("span", { className: "counter-label", children: [n, " Remaining:"] }),
          v.jsx("span", { className: "counter-value", children: e }),
        ],
      })
    );
  },
  yC = (e) =>
    v.jsxs("div", {
      children: [v.jsx("span", { children: "Points:" }), v.jsx("span", { children: e.points })],
    });
const CC = ({ rankings: e = [], currentUserId: t }) =>
  v.jsxs("div", {
    className: "rankings-container",
    children: [
      v.jsx("h3", { children: "Rankings" }),
      e &&
        e.map((n, r) =>
          v.jsx(
            sh,
            {
              name: `${n.username} - ${n.score} pts`,
              profilePicture: ah,
              playerId: n.playerId,
              currentUserId: t,
            },
            r
          )
        ),
    ],
  });
const EC = ({ log: e = [] }) => {
  const t = E.useRef(null);
  return (
    E.useEffect(() => {
      t.current && (t.current.scrollTop = t.current.scrollHeight);
    }, [e]),
    v.jsxs("div", {
      className: "log-container",
      children: [
        v.jsx("h3", { children: "Game Log" }),
        v.jsx("div", {
          className: "log-messages",
          ref: t,
          children: e.map((n, r) => v.jsx("div", { className: "log-message", children: n }, r)),
        }),
      ],
    })
  );
};
const wC = (e) => {
    const [t, n] = E.useState(""),
      [r, i] = E.useState([]),
      [o, l] = E.useState(!0),
      [s, a] = E.useState(0),
      [u, d] = E.useState(0),
      [f, A] = E.useState([[0, 0]]),
      [y, S] = E.useState([]),
      [B, D] = E.useState({
        lobbyCode: "",
        username: "",
        board: [],
        points: 0,
        powerups: [],
        counter: 0,
        rankings: [],
        log: [],
      }),
      g = (c) => {
        let p = c.lettersUpdated;
        console.log("Updated letters:"), console.log(p);
        let k = JSON.parse(JSON.stringify(c.board));
        for (let Q = 0; Q < p.length; Q++) {
          let m = p[Q].x,
            L = p[Q].y,
            I = p[Q].letter;
          k[L][m] = {
            ...k[L][m],
            letter: I,
            crop: "",
            powerup: "",
            visited: !0,
            default: !1,
            isSuggestion: !1,
            isSuggestionEnd: !1,
          };
        }
        D((Q) => ({ ...Q, board: k }));
      };
    return (
      E.useEffect(() => {
        const c = (Q) => {
            D(Q);
          },
          p = (Q) => {
            i([]),
              console.log("User update:", Q),
              D((m) => ({ ...m, points: Q.totalPoints })),
              S(Q.letterUpdates),
              A(Q.endpoints);
          },
          k = (Q) => {
            console.log("Global update:", Q),
              D((m) => ({ ...m, rankings: Q.updatedRankings, log: [...m.log, ...Q.logMessages] }));
          };
        return (
          Be.on("initial game", c),
          Be.on("user update", p),
          Be.on("global update", k),
          () => {
            Be.off("initial game", c), Be.off("user update", p), Be.off("global update", k);
          }
        );
      }, []),
      E.useEffect(() => {
        g({ lettersUpdated: y, board: B.board });
      }, [y]),
      v.jsxs("div", {
        children: [
          v.jsx(gC, {
            className: "gamecomponentboard",
            board: B.board,
            points: B.points,
            username: B.username,
            endpoints: f,
            endPointSelected: o,
            setEndPointSelected: l,
            selectedX: s,
            selectedY: u,
            setSelectedX: a,
            setSelectedY: d,
            lettersUpdated: y,
            setLettersUpdated: S,
            setSuggestions: i,
            suggestions: r,
          }),
          v.jsx(mC, {
            word: t,
            setWord: n,
            selectedX: s,
            selectedY: u,
            endpointSelected: o,
            lobbyCode: e.lobbyCode,
            board: B.board,
            suggestions: r,
          }),
          v.jsx(vC, {}),
          v.jsx(yC, { points: B.points }),
          v.jsx(CC, { rankings: B.rankings, currentUserId: e.userId }),
          v.jsx(EC, { log: B.log }),
        ],
      })
    );
  },
  BC = (e) => {};
const SC = ({ isActive: e, cloudImages: t, reverse: n }) => {
    const [r, i] = E.useState(!1);
    return (
      E.useEffect(() => {
        i(!!e);
      }, [e]),
      n
        ? (console.log("reverse"),
          v.jsx("div", {
            className: `cloud-animation-reverse-container ${e ? "active" : ""}`,
            children: t.map((o, l) =>
              v.jsxs(
                Pn.Fragment,
                {
                  children: [
                    v.jsx("img", {
                      src: o.bottom,
                      alt: `Cloud Layer ${l + 1} Bottom Left`,
                      className: `cloud-layer-reverse bottom-left ${r ? "animate" : ""}`,
                      style: { animationDelay: `${l * 0.2}s` },
                    }),
                    v.jsx("img", {
                      src: o.top,
                      alt: `Cloud Layer ${l + 1} Top Right`,
                      className: `cloud-layer-reverse top-right ${r ? "animate" : ""}`,
                      style: { animationDelay: `${l * 0.2}s` },
                    }),
                  ],
                },
                l
              )
            ),
          }))
        : v.jsx("div", {
            className: `cloud-animation-container ${e ? "active" : ""}`,
            children: t.map((o, l) =>
              v.jsxs(
                Pn.Fragment,
                {
                  children: [
                    v.jsx("img", {
                      src: o.bottom,
                      alt: `Cloud Layer ${l + 1} Bottom Left`,
                      className: `cloud-layer bottom-left ${r ? "animate" : ""}`,
                      style: { animationDelay: `${l * 0.2}s` },
                    }),
                    v.jsx("img", {
                      src: o.top,
                      alt: `Cloud Layer ${l + 1} Top Right`,
                      className: `cloud-layer top-right ${r ? "animate" : ""}`,
                      style: { animationDelay: `${l * 0.2}s` },
                    }),
                  ],
                },
                l
              )
            ),
          })
    );
  },
  kC = "/assets/FIRST_CLOUDENTERING_BOTTOM_LEFT-0cd11b0e.png",
  QC = "/assets/FIRST_CLOUDENTERING_TOP_RIGHT-2f090e2f.png",
  RC = "/assets/SECOND_CLOUDENTERING_BOTTOM_LEFT-31a05215.png",
  IC = "/assets/SECOND_CLOUDENTERING_TOP_RIGHT-d1f592af.png",
  DC = "/assets/THIRD_CLOUDENTERING_BOTTOM_LEFT-ce226a31.png",
  xC = "/assets/THIRD_CLOUDENTERING_TOP_RIGHT-bb40f6be.png",
  LC = "/assets/LAST_CLOUDENTERING_BOTTOM_LEFT-a8ce7403.png",
  NC = "/assets/LAST_CLOUDENTERING_TOP_RIGHT-dd2e26c3.png",
  UC = () => {
    let { lobbyId: e } = bA();
    const [t, n] = E.useState(""),
      [r, i] = E.useState("lobby"),
      [o, l] = E.useState(!1),
      [s, a] = E.useState(!1),
      [u, d] = E.useState(!1),
      f = [
        { bottom: kC, top: QC },
        { bottom: RC, top: IC },
        { bottom: DC, top: xC },
        { bottom: LC, top: NC },
      ];
    E.useEffect(() => {
      Ln("/api/whoami").then((y) => {
        y._id || ((window.location.href = "/"), console.log("not logged in")),
          n(String(y._id)),
          Be.emit("join socket", { lobbyCode: e });
      }),
        Ln("/api/isLobbyOwner", { lobbyCode: e }).then((y) => {
          console.log(y), d(y);
        });
    }, []),
      E.useEffect(() => {
        const y = () => {
          console.log("received lobby to game transition"),
            l(!0),
            a(!1),
            setTimeout(() => {
              i("game"), jt("/api/startGame", { lobbyCode: e });
            }, 1300),
            setTimeout(() => {
              a(!0);
            }, 1500);
        };
        return (
          Be.on("lobby to game transition", y),
          () => {
            Be.off("lobby to game transition", y);
          }
        );
      }, []);
    const A = () => {
      l(!0),
        a(!1),
        setTimeout(() => {
          i("game"), jt("/api/startGame", { lobbyCode: e });
        }, 1300),
        setTimeout(() => {
          a(!0);
        }, 1500);
    };
    return (
      t &&
        Ln("/api/players", { lobbyCode: e }).then((y) => {
          let S = !1;
          for (const B of y) B == t && (console.log("found it"), (S = !0));
          S || (window.location.href = "/");
        }),
      Ln("/api/lobbyCheck", { lobbyCode: e }).catch((y) => {
        window.location.href = "/LobbyNotFound";
      }),
      v.jsxs(v.Fragment, {
        children: [
          r === "lobby" &&
            v.jsx("div", {
              className: "lobby-container",
              children: v.jsxs("div", {
                className: "lobby-content",
                children: [
                  v.jsxs("div", { className: "lobby-code", children: ["Lobby Code: ", e] }),
                  v.jsxs("div", {
                    className: "lobby-sections",
                    children: [
                      v.jsxs("div", {
                        className: "lobby-section",
                        children: [
                          v.jsx("div", {
                            style: { color: "rgb(94, 129, 255)", fontSize: "40px" },
                            children: "Players",
                          }),
                          v.jsx(i0, { lobbyCode: e, userId: t }),
                        ],
                      }),
                      v.jsxs("div", {
                        className: "lobby-section",
                        children: [
                          v.jsx("div", {
                            style: { color: "rgb(94, 129, 255)", fontSize: "40px" },
                            children: "Game Settings",
                          }),
                          v.jsx(r0, { lobbyCode: e }),
                        ],
                      }),
                    ],
                  }),
                  u &&
                    v.jsx("div", {
                      className: "start-button-container",
                      children: v.jsx(o0, {
                        lobbyCode: e,
                        setLobbyState: i,
                        lobbyState: r,
                        startGameRequest: A,
                      }),
                    }),
                  !u &&
                    v.jsx("div", {
                      className: "waiting-button",
                      children: v.jsxs("div", {
                        className: "waiting-sign-container",
                        children: [
                          v.jsx("img", { src: lh, className: "waiting-sign", alt: "Wooden Sign" }),
                          v.jsxs("h2", {
                            className: "waiting-sign-text",
                            children: [
                              "Waiting",
                              v.jsx("span", { className: "dot-1", children: "." }),
                              v.jsx("span", { className: "dot-2", children: "." }),
                              v.jsx("span", { className: "dot-3", children: "." }),
                            ],
                          }),
                        ],
                      }),
                    }),
                ],
              }),
            }),
          v.jsx(SC, { isActive: o, cloudImages: f, reverse: s }),
          r === "game" &&
            v.jsx("div", {
              children: v.jsx(wC, { lobbyCode: e, setLobbyState: i, lobbyState: r, userId: t }),
            }),
          r === "end" && v.jsx(BC, {}),
        ],
      })
    );
  },
  PC = "443045181173-qrllkl1b6itjv8vgcdj9hdcrlkuc0ogp.apps.googleusercontent.com",
  TC = mv(
    ea(
      v.jsxs(Wr, {
        errorElement: v.jsx(cd, {}),
        element: v.jsx(Dy, {}),
        children: [
          v.jsx(Wr, { path: "/", element: v.jsx(t0, {}) }),
          v.jsx(Wr, { path: "/:lobbyId", element: v.jsx(UC, {}) }),
          v.jsx(Wr, { path: "/LobbyNotFound", element: v.jsx(cd, {}) }),
        ],
      })
    )
  );
is.createRoot(document.getElementById("root")).render(
  v.jsx(Ly, { clientId: PC, children: v.jsx(Qv, { router: TC }) })
);
