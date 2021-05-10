!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app"],e):e((t=t||self).firebase)}(this,function(lt){"use strict";try{(function(){lt=lt&&lt.hasOwnProperty("default")?lt.default:lt;var n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};var a=function(){return(a=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};function c(i,a,s,u){return new(s=s||Promise)(function(t,e){function n(t){try{o(u.next(t))}catch(t){e(t)}}function r(t){try{o(u.throw(t))}catch(t){e(t)}}function o(e){e.done?t(e.value):new s(function(t){t(e.value)}).then(n,r)}o((u=u.apply(i,a||[])).next())})}function f(n,r){var o,i,a,t,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return t={next:e(0),throw:e(1),return:e(2)},"function"==typeof Symbol&&(t[Symbol.iterator]=function(){return this}),t;function e(e){return function(t){return function(e){if(o)throw new TypeError("Generator is already executing.");for(;s;)try{if(o=1,i&&(a=2&e[0]?i.return:e[0]?i.throw||((a=i.return)&&a.call(i),0):i.next)&&!(a=a.call(i,e[1])).done)return a;switch(i=0,a&&(e=[2&e[0],a.value]),e[0]){case 0:case 1:a=e;break;case 4:return s.label++,{value:e[1],done:!1};case 5:s.label++,i=e[1],e=[0];continue;case 7:e=s.ops.pop(),s.trys.pop();continue;default:if(!(a=0<(a=s.trys).length&&a[a.length-1])&&(6===e[0]||2===e[0])){s=0;continue}if(3===e[0]&&(!a||e[1]>a[0]&&e[1]<a[3])){s.label=e[1];break}if(6===e[0]&&s.label<a[1]){s.label=a[1],a=e;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(e);break}a[2]&&s.ops.pop(),s.trys.pop();continue}e=r.call(n,s)}catch(t){e=[6,t],i=0}finally{o=a=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}([e,t])}}}function r(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,o,i=n.call(t),a=[];try{for(;(void 0===e||0<e--)&&!(r=i.next()).done;)a.push(r.value)}catch(t){o={error:t}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a}var t,e,o,p=(o=Error,n(t=s,e=o),void(t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)),s);function i(){this.constructor=t}function s(t,e){var n=o.call(this,e)||this;return n.code=t,n.name="FirebaseError",Object.setPrototypeOf(n,s.prototype),Error.captureStackTrace&&Error.captureStackTrace(n,u.prototype.create),n}var u=(l.prototype.create=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];for(var r=e[0]||{},o=this.service+"/"+t,i=this.errors[t],a=i?function(t,r){return t.replace(h,function(t,e){var n=r[e];return null!=n?n.toString():"<"+e+"?>"})}(i,r):"Error",s=this.serviceName+": "+a+" ("+o+").",u=new p(o,s),c=0,f=Object.keys(r);c<f.length;c++){var l=f[c];"_"!==l.slice(-1)&&(l in u&&console.warn('Overwriting FirebaseError base field "'+l+'" can cause unexpected behavior.'),u[l]=r[l])}return u},l);function l(t,e,n){this.service=t,this.serviceName=e,this.errors=n}var h=/\{\$([^}]+)}/g;function d(n){return new Promise(function(t,e){n.onsuccess=function(){t(n.result)},n.onerror=function(){e(n.error)}})}function v(n,r,o){var i,t=new Promise(function(t,e){d(i=n[r].apply(n,o)).then(t,e)});return t.request=i,t}function y(t,n,e){e.forEach(function(e){Object.defineProperty(t.prototype,e,{get:function(){return this[n][e]},set:function(t){this[n][e]=t}})})}function b(e,n,r,t){t.forEach(function(t){t in r.prototype&&(e.prototype[t]=function(){return v(this[n],t,arguments)})})}function g(e,n,r,t){t.forEach(function(t){t in r.prototype&&(e.prototype[t]=function(){return this[n][t].apply(this[n],arguments)})})}function w(e,n,r,t){t.forEach(function(t){t in r.prototype&&(e.prototype[t]=function(){return function(t,e,n){var r=v(t,e,n);return r.then(function(t){if(t)return new S(t,r.request)})}(this[n],t,arguments)})})}function m(t){this._index=t}function S(t,e){this._cursor=t,this._request=e}function _(t){this._store=t}function k(n){this._tx=n,this.complete=new Promise(function(t,e){n.oncomplete=function(){t()},n.onerror=function(){e(n.error)},n.onabort=function(){e(n.error)}})}function I(t,e,n){this._db=t,this.oldVersion=e,this.transaction=new k(n)}function T(t){this._db=t}y(m,"_index",["name","keyPath","multiEntry","unique"]),b(m,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),w(m,"_index",IDBIndex,["openCursor","openKeyCursor"]),y(S,"_cursor",["direction","key","primaryKey","value"]),b(S,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(n){n in IDBCursor.prototype&&(S.prototype[n]=function(){var e=this,t=arguments;return Promise.resolve().then(function(){return e._cursor[n].apply(e._cursor,t),d(e._request).then(function(t){if(t)return new S(t,e._request)})})})}),_.prototype.createIndex=function(){return new m(this._store.createIndex.apply(this._store,arguments))},_.prototype.index=function(){return new m(this._store.index.apply(this._store,arguments))},y(_,"_store",["name","keyPath","indexNames","autoIncrement"]),b(_,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),w(_,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),g(_,"_store",IDBObjectStore,["deleteIndex"]),k.prototype.objectStore=function(){return new _(this._tx.objectStore.apply(this._tx,arguments))},y(k,"_tx",["objectStoreNames","mode"]),g(k,"_tx",IDBTransaction,["abort"]),I.prototype.createObjectStore=function(){return new _(this._db.createObjectStore.apply(this._db,arguments))},y(I,"_db",["name","version","objectStoreNames"]),g(I,"_db",IDBDatabase,["deleteObjectStore","close"]),T.prototype.transaction=function(){return new k(this._db.transaction.apply(this._db,arguments))},y(T,"_db",["name","version","objectStoreNames"]),g(T,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(o){[_,m].forEach(function(t){o in t.prototype&&(t.prototype[o.replace("open","iterate")]=function(){var t=function(t){return Array.prototype.slice.call(t)}(arguments),e=t[t.length-1],n=this._store||this._index,r=n[o].apply(n,t.slice(0,-1));r.onsuccess=function(){e(r.result)}})})}),[m,_].forEach(function(t){t.prototype.getAll||(t.prototype.getAll=function(t,n){var r=this,o=[];return new Promise(function(e){r.iterateCursor(t,function(t){t?(o.push(t.value),void 0===n||o.length!=n?t.continue():e(o)):e(o)})})})});var j,x=1e4,E="w:0.2.4",q="FIS_v2",P="https://firebaseinstallations.googleapis.com/v1",C=36e5,O=((j={})["missing-app-config-values"]="Missing App configuration values.",j["create-installation-failed"]="Could not register Firebase Installation.",j["generate-token-failed"]="Could not generate Auth Token.",j["not-registered"]="Firebase Installation is not registered.",j["installation-not-found"]="Firebase Installation not found.",j["request-failed"]='{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',j["app-offline"]="Could not process request. Application offline.",j["delete-pending-registration"]="Can't delete installation while there is a pending registration request.",j),D=new u("installations","Installations",O);function A(t){return t instanceof p&&t.code.includes("request-failed")}function N(t){if(!t||!t.options)throw D.create("missing-app-config-values");var e=t.name,n=t.options,r=n.projectId,o=n.apiKey,i=n.appId;if(!(e&&r&&o&&i))throw D.create("missing-app-config-values");return{appName:e,projectId:r,apiKey:o,appId:i}}function K(t){var e=t.projectId;return P+"/projects/"+e+"/installations"}function B(t){return{token:t.token,requestStatus:2,expiresIn:function(t){return Number(t.replace("s","000"))}(t.expiresIn),creationTime:Date.now()}}function V(r,o){return c(this,void 0,void 0,function(){var e,n;return f(this,function(t){switch(t.label){case 0:return[4,o.json()];case 1:return e=t.sent(),n=e.error,[2,D.create("request-failed",{requestName:r,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})]}})})}function F(t){var e=t.apiKey;return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function $(t,e){var n=e.refreshToken,r=F(t);return r.append("Authorization",function(t){return q+" "+t}(n)),r}function L(n){return c(this,void 0,void 0,function(){var e;return f(this,function(t){switch(t.label){case 0:return[4,n()];case 1:return 500<=(e=t.sent()).status&&e.status<600?[2,n()]:[2,e]}})})}function M(e){return new Promise(function(t){setTimeout(t,e)})}function G(t){return btoa(String.fromCharCode.apply(String,function(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(r(arguments[e]));return t}(t))).replace(/\+/g,"-").replace(/\//g,"_")}var J=/^[cdef][\w-]{21}$/,R="";function z(){try{var t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;var e=function(t){return G(t).substr(0,22)}(t);return J.test(e)?e:R}catch(t){return R}}var H="firebase-installations-database",U=1,Q="firebase-installations-store",W=null;function X(){return W=W||function(t,e,n){var r=v(indexedDB,"open",[t,e]),o=r.request;return o&&(o.onupgradeneeded=function(t){n&&n(new I(o.result,t.oldVersion,o.transaction))}),r.then(function(t){return new T(t)})}(H,U,function(t){switch(t.oldVersion){case 0:t.createObjectStore(Q)}})}function Y(o,i){return c(this,void 0,void 0,function(){var e,n,r;return f(this,function(t){switch(t.label){case 0:return e=et(o),[4,X()];case 1:return n=t.sent(),[4,(r=n.transaction(Q,"readwrite")).objectStore(Q).put(i,e)];case 2:return t.sent(),[4,r.complete];case 3:return t.sent(),[2,i]}})})}function Z(o){return c(this,void 0,void 0,function(){var e,n,r;return f(this,function(t){switch(t.label){case 0:return e=et(o),[4,X()];case 1:return n=t.sent(),[4,(r=n.transaction(Q,"readwrite")).objectStore(Q).delete(e)];case 2:return t.sent(),[4,r.complete];case 3:return t.sent(),[2]}})})}function tt(s,u){return c(this,void 0,void 0,function(){var e,n,r,o,i,a;return f(this,function(t){switch(t.label){case 0:return e=et(s),[4,X()];case 1:return n=t.sent(),r=n.transaction(Q,"readwrite"),[4,(o=r.objectStore(Q)).get(e)];case 2:return i=t.sent(),(a=u(i))===i?[2,a]:void 0!==a?[3,4]:[4,o.delete(e)];case 3:return t.sent(),[3,6];case 4:return[4,o.put(a,e)];case 5:t.sent(),t.label=6;case 6:return[4,r.complete];case 7:return t.sent(),[2,a]}})})}function et(t){return t.appName+"!"+t.appId}function nt(o){return c(this,void 0,void 0,function(){var r,e,n;return f(this,function(t){switch(t.label){case 0:return[4,tt(o,function(t){var e=function(t){var e=t||{fid:z(),registrationStatus:0};if(ot(e))return{fid:e.fid,registrationStatus:0};return e}(t),n=function(t,e){{if(0!==e.registrationStatus)return 1===e.registrationStatus?{installationEntry:e,registrationPromise:function(n){return c(this,void 0,void 0,function(){var e;return f(this,function(t){switch(t.label){case 0:return[4,rt(n)];case 1:e=t.sent(),t.label=2;case 2:return 1!==e.registrationStatus?[3,5]:[4,M(100)];case 3:return t.sent(),[4,rt(n)];case 4:return e=t.sent(),[3,2];case 5:if(0===e.registrationStatus)throw D.create("create-installation-failed");return[2,e]}})})}(t)}:{installationEntry:e};if(!navigator.onLine){var n=Promise.reject(D.create("app-offline"));return{installationEntry:e,registrationPromise:n}}var r={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},o=function(r,o){return c(this,void 0,void 0,function(){var e,n;return f(this,function(t){switch(t.label){case 0:return t.trys.push([0,2,,7]),[4,function(s,t){var u=t.fid;return c(this,void 0,void 0,function(){var e,n,r,o,i,a;return f(this,function(t){switch(t.label){case 0:return e=K(s),n=F(s),r={fid:u,authVersion:q,appId:s.appId,sdkVersion:E},o={method:"POST",headers:n,body:JSON.stringify(r)},[4,L(function(){return fetch(e,o)})];case 1:return(i=t.sent()).ok?[4,i.json()]:[3,3];case 2:return a=t.sent(),[2,{fid:a.fid||u,registrationStatus:2,refreshToken:a.refreshToken,authToken:B(a.authToken)}];case 3:return[4,V("Create Installation",i)];case 4:throw t.sent()}})})}(r,o)];case 1:return e=t.sent(),[2,Y(r,e)];case 2:return A(n=t.sent())&&409===n.serverCode?[4,Z(r)]:[3,4];case 3:return t.sent(),[3,6];case 4:return[4,Y(r,{fid:o.fid,registrationStatus:0})];case 5:t.sent(),t.label=6;case 6:throw n;case 7:return[2]}})})}(t,r);return{installationEntry:r,registrationPromise:o}}}(o,e);return r=n.registrationPromise,n.installationEntry})];case 1:return(e=t.sent()).fid!==R?[3,3]:(n={},[4,r]);case 2:return[2,(n.installationEntry=t.sent(),n)];case 3:return[2,{installationEntry:e,registrationPromise:r}]}})})}function rt(t){return tt(t,function(t){if(!t)throw D.create("installation-not-found");return ot(t)?{fid:t.fid,registrationStatus:0}:t})}function ot(t){return 1===t.registrationStatus&&t.registrationTime+x<Date.now()}function it(s,u){return c(this,void 0,void 0,function(){var e,n,r,o,i,a;return f(this,function(t){switch(t.label){case 0:return e=function(t,e){var n=e.fid;return K(t)+"/"+n+"/authTokens:generate"}(s,u),n=$(s,u),r={installation:{sdkVersion:E}},o={method:"POST",headers:n,body:JSON.stringify(r)},[4,L(function(){return fetch(e,o)})];case 1:return(i=t.sent()).ok?[4,i.json()]:[3,3];case 2:return a=t.sent(),[2,B(a)];case 3:return[4,V("Generate Auth Token",i)];case 4:throw t.sent()}})})}function at(o){return c(this,void 0,void 0,function(){var r,e,n;return f(this,function(t){switch(t.label){case 0:return[4,tt(o,function(t){if(!ut(t))throw D.create("not-registered");var e=t.authToken;if(function(t){return 2===t.requestStatus&&!function(t){var e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+C}(t)}(e))return t;if(1===e.requestStatus)return r=function(r){return c(this,void 0,void 0,function(){var e,n;return f(this,function(t){switch(t.label){case 0:return[4,st(r)];case 1:e=t.sent(),t.label=2;case 2:return 1!==e.authToken.requestStatus?[3,5]:[4,M(100)];case 3:return t.sent(),[4,st(r)];case 4:return e=t.sent(),[3,2];case 5:if(0===(n=e.authToken).requestStatus)throw D.create("generate-token-failed");return[2,n]}})})}(o),t;if(!navigator.onLine)throw D.create("app-offline");var n=function(t){var e={requestStatus:1,requestTime:Date.now()};return a({},t,{authToken:e})}(t);return r=function(o,i){return c(this,void 0,void 0,function(){var e,n,r;return f(this,function(t){switch(t.label){case 0:return t.trys.push([0,3,,8]),[4,it(o,i)];case 1:return e=t.sent(),r=a({},i,{authToken:e}),[4,Y(o,r)];case 2:return t.sent(),[2,e];case 3:return!A(n=t.sent())||401!==n.serverCode&&404!==n.serverCode?[3,5]:[4,Z(o)];case 4:return t.sent(),[3,7];case 5:return r=a({},i,{authToken:{requestStatus:0}}),[4,Y(o,r)];case 6:t.sent(),t.label=7;case 7:throw n;case 8:return[2]}})})}(o,n),n})];case 1:return e=t.sent(),r?[4,r]:[3,3];case 2:return n=t.sent(),[3,4];case 3:n=e.authToken,t.label=4;case 4:return[2,n.token]}})})}function st(t){return tt(t,function(t){if(!ut(t))throw D.create("not-registered");return function(t){return 1===t.requestStatus&&t.requestTime+x<Date.now()}(t.authToken)?a({},t,{authToken:{requestStatus:0}}):t})}function ut(t){return void 0!==t&&2===t.registrationStatus}function ct(n){return c(this,void 0,void 0,function(){var e;return f(this,function(t){switch(t.label){case 0:return[4,function(o){return c(this,void 0,void 0,function(){var e,n,r;return f(this,function(t){switch(t.label){case 0:return[4,nt(o)];case 1:return e=t.sent(),n=e.installationEntry,(r=e.registrationPromise)?[4,r]:[3,3];case 2:return t.sent(),[3,4];case 3:if(2!==n.registrationStatus)throw D.create("create-installation-failed");t.label=4;case 4:return[2]}})})}(e=N(n))];case 1:return t.sent(),[2,at(e)]}})})}function ft(i,a){return c(this,void 0,void 0,function(){var e,n,r,o;return f(this,function(t){switch(t.label){case 0:return e=function(t,e){var n=e.fid;return K(t)+"/"+n}(i,a),n=$(i,a),r={method:"DELETE",headers:n},[4,L(function(){return fetch(e,r)})];case 1:return(o=t.sent()).ok?[3,3]:[4,V("Delete Installation",o)];case 2:throw t.sent();case 3:return[2]}})})}lt.INTERNAL.registerService("installations",function(t){return N(t),{app:t,getId:function(){return function(i){return c(this,void 0,void 0,function(){var e,n,r,o;return f(this,function(t){switch(t.label){case 0:return[4,nt(e=N(i))];case 1:return n=t.sent(),r=n.installationEntry,(o=n.registrationPromise)&&o.catch(function(){}),2===r.registrationStatus&&at(e).catch(function(){}),[2,r.fid]}})})}(t)},getToken:function(){return ct(t)},delete:function(){return function(r){return c(this,void 0,void 0,function(){var e,n;return f(this,function(t){switch(t.label){case 0:return[4,tt(e=N(r),function(t){if(!t||0!==t.registrationStatus)return t})];case 1:if(!(n=t.sent()))return[3,6];if(1!==n.registrationStatus)return[3,2];throw D.create("delete-pending-registration");case 2:if(2!==n.registrationStatus)return[3,6];if(navigator.onLine)return[3,3];throw D.create("app-offline");case 3:return[4,ft(e,n)];case 4:return t.sent(),[4,Z(e)];case 5:t.sent(),t.label=6;case 6:return[2]}})})}(t)}}})}).apply(this,arguments)}catch(t){throw console.error(t),new Error("Cannot instantiate firebase-installations - be sure to load firebase-app.js first.")}});
//# sourceMappingURL=firebase-installations.js.map