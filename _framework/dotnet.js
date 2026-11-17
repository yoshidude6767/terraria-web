//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!0;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||qe(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g;function p(e){g=e}function h(e){if(Ne.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function w(e,...t){console.info(d+e,...t)}function b(e,...t){console.info(e,...t)}function y(e,...t){console.warn(d+e,...t)}function v(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}let _,E,T="",x=(new Date).valueOf();function j(t,o,n){return function(...r){try{let i=r[0];if(void 0===i)i="undefined";else if(null===i)i="null";else if("function"==typeof i)i=i.toString();else if("string"!=typeof i)try{i=JSON.stringify(i)}catch(e){i=i.toString()}if("string"==typeof i&&e){if(Pe&&-1!==i.indexOf("keeping the worker alive for asynchronous operation"))return;if(0===i.indexOf("MONO_WASM: ")||0===i.indexOf("[MONO]")){const e=new Date;x!==e.valueOf()&&(T=e.toISOString().substring(11,23),x=e.valueOf()),i=`[${g} ${T}] ${i}`}}o(n?JSON.stringify({method:t,payload:i,arguments:r.slice(1)}):[t+i,...r.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function R(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",O),u.addEventListener("close",D),function(){for(const e of c)f[e]=j(`console.${e}`,A,!0)}()}function S(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&b(e),function(){for(const e of c)f[e]=j(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",O),u.removeEventListener("close",D),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function A(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function O(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function D(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function k(){Ne.preferredIcuAsset=I(Ne.config);let e="invariant"==Ne.config.globalizationMode;if(!e)if(Ne.preferredIcuAsset)Ne.diagnosticTracing&&h("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Ne.config.globalizationMode||"all"===Ne.config.globalizationMode||"sharded"===Ne.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw v(`ERROR: ${e}`),new Error(e)}Ne.diagnosticTracing&&h("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Ne.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Ne.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){w("failed to detect timezone, will fallback to UTC")}}function I(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(Ce?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}const P=class{constructor(e){this.url=e}toString(){return this.url}};async function C(e,t){try{const o="function"==typeof globalThis.fetch;if(De){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});_||(E=ze.require("url"),_=ze.require("fs")),n&&(e=E.fileURLToPath(e));const r=await _.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function M(e){return"string"!=typeof e&&qe(!1,"url must be a string"),!L(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,N=/[a-zA-Z]:[\\/]/;function L(e){return De||Me?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||N.test(e):U.test(e)}let $,z=0;const W=[],F=[],B=new Map,V={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},q={...V,"js-module-library-initializer":!0},J={...V,dotnetwasm:!0,heap:!0,manifest:!0},H={...q,manifest:!0},Z={...q,dotnetwasm:!0},Q={dotnetwasm:!0,symbols:!0},G={...q,dotnetwasm:!0,symbols:!0},K={symbols:!0};function X(e){return!("icu"==e.behavior&&e.name!=Ne.preferredIcuAsset)}function Y(e,t,o){null!=t||(t=[]),qe(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,ee(n),e.push(n),n}function ee(e){J[e.behavior]&&B.set(e.behavior,e)}function te(e){qe(J[e],`Unknown single asset behavior ${e}`);const t=B.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Ne.locateFile(t.name),V[t.behavior]){const e=he(t);e?("string"!=typeof e&&qe(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ue(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function oe(e){const t=te(e);return qe(t,`Single asset for ${e} not found`),t}let ne=!1;async function re(){if(!ne){ne=!0,Ne.diagnosticTracing&&h("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!G[e.behavior]&&X(e)&&Ne.expected_instantiated_assets_count++,!Z[e.behavior]&&X(e)&&(Ne.expected_downloaded_assets_count++,t.push(le(e)))};for(const t of W)o(t,e);for(const e of F)o(e,t);Ne.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Ne.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Ne.err("Error in mono_download_assets: "+e),et(1,e),e})),await Ne.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!G[t.behavior]){t.buffer&&"object"==typeof t.buffer||qe(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&qe(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);we(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else Q[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),we(t)),Q[t.behavior]&&++Ne.actual_downloaded_assets_count):(t.isOptional||qe(!1,"Expected asset to have the downloaded buffer"),!Z[t.behavior]&&X(t)&&Ne.expected_downloaded_assets_count--,!G[t.behavior]&&X(t)&&Ne.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Pe||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Ne.err("Error in mono_download_assets: "+e),et(1,e),e})),Promise.all(i).then((async()=>{Pe||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Ne.err("Error in mono_download_assets: "+e),et(1,e),e}))}catch(e){throw Ne.err("Error in mono_download_assets: "+e),e}}}let ie=!1;function se(){if(ie)return;ie=!0;const e=Ne.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&qe(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&qe(!1,"asset behavior must be known string"),"string"!=typeof t.name&&qe(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&qe(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&qe(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&qe(!1,"asset pendingDownload could be object"),t.isCore?W.push(t):F.push(t),ee(t);else if(e.resources){const o=e.resources;o.wasmNative||qe(!1,"resources.wasmNative must be defined"),o.jsModuleNative||qe(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||qe(!1,"resources.jsModuleRuntime must be defined"),o.jsModuleWorker||qe(!1,"resources.jsModuleWorker must be defined"),Y(F,o.wasmNative,"dotnetwasm"),Y(t,o.jsModuleNative,"js-module-native"),Y(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&Y(t,o.jsModuleDiagnostics,"js-module-diagnostics"),Y(t,o.jsModuleWorker,"js-module-threads");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,W.push(n)):F.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Ne.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=I(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=be(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||F.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...W,...F,...t]}async function ae(e){const t=await le(e);return await t.pendingDownloadInternal.response,t.buffer}async function le(e){try{return await ce(e)}catch(t){if(!Ne.enableDownloadRetry)throw t;if(Me||De)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Ne.allDownloadsQueued.promise;try{return Ne.diagnosticTracing&&h(`Retrying download '${e.name}'`),await ce(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Ne.diagnosticTracing&&h(`Retrying download (2) '${e.name}' after delay`),await ce(e)}}}async function ce(e){for(;$;)await $.promise;try{++z,z==Ne.maxParallelDownloads&&(Ne.diagnosticTracing&&h("Throttling further parallel downloads"),$=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Ne.config.remoteSources?Ne.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=de(e,n);e.name===t?Ne.diagnosticTracing&&h(`Attempting to download '${t}'`):Ne.diagnosticTracing&&h(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=ge(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Ne.config.ignorePdbLoadErrors;if(o||qe(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}w(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(Q[e.behavior]||(e.buffer=await t.arrayBuffer(),++Ne.actual_downloaded_assets_count),e):e}finally{if(--z,$&&z==Ne.maxParallelDownloads-1){Ne.diagnosticTracing&&h("Resuming more parallel downloads");const e=$;$=void 0,e.promise_control.resolve()}}}function de(e,t){let o;return null==t&&qe(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ue(Ne.locateFile(o),e.behavior)),o&&"string"==typeof o||qe(!1,"attemptUrl need to be path or url string"),o}function ue(e,t){return Ne.modulesUniqueQuery&&H[t]&&(e+=Ne.modulesUniqueQuery),e}let fe=0;const me=new Set;function ge(e){try{e.resolvedUrl||qe(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Ne.loadBootResource){const o=he(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Ne.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Ne.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Ne.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return me.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Ne.loadedAssemblies.push(e.name),fe++,Ne.onDownloadResourceProgress&&Ne.onDownloadResourceProgress(fe,me.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const pe={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function he(e){var t;if(Ne.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=pe[e.behavior];if(r){const t=Ne.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?M(t):t}}}function we(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function be(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function ye(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ue(Ne.locateFile(t),"js-module-library-initializer");Ne.diagnosticTracing&&h(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Ne.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){y(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function ve(e,t){if(!Ne.libraryInitializers)return;const o=[];for(let n=0;n<Ne.libraryInitializers.length;n++){const r=Ne.libraryInitializers[n];r.exports[e]&&o.push(_e(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function _e(e,t,o){try{await o()}catch(o){throw y(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),et(1,o),o}}function Ee(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=xe(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Te(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=Ee(e.config,o.config)),Object.assign(e,o)}function xe(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function je(){const e=Ne.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Ne.diagnosticTracing&&h("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}xe(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),Number.isInteger(e.pthreadPoolInitialSize)||(e.pthreadPoolInitialSize=5),Number.isInteger(e.pthreadPoolUnusedSize)||(e.pthreadPoolUnusedSize=1),null==e.jsThreadBlockingMode&&(e.jsThreadBlockingMode="PreventSynchronousJSExport"),void 0===e.environmentVariables.MONO_SLEEP_ABORT_LIMIT&&(e.environmentVariables.MONO_SLEEP_ABORT_LIMIT="5000"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Ne.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Ne.maxParallelDownloads=e.maxParallelDownloads||Ne.maxParallelDownloads,Ne.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Ne.enableDownloadRetry}let Re=!1;async function Se(e){var t;if(Re)return void await Ne.afterConfigLoaded.promise;let o;try{if(e.configSrc||Ne.config&&0!==Object.keys(Ne.config).length&&(Ne.config.assets||Ne.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,Re=!0,o&&(Ne.diagnosticTracing&&h("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Ne.locateFile(t);let n=null;void 0!==Ne.loadBootResource&&(n=Ne.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(M(n)),r=await Oe(i)):r=(await import(M(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Oe(i)):r=e.config}else o.includes(".json")?(i=await s(ue(o,"manifest")),r=await Oe(i)):r=(await import(ue(o,"manifest"))).config;function s(e){return Ne.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Ne.config.applicationEnvironment&&(r.applicationEnvironment=Ne.config.applicationEnvironment),Ee(Ne.config,r)}(e)),je(),await ye(null===(t=Ne.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await ve("onRuntimeConfigLoaded",[Ne.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Ne.config,$e),je()}catch(e){throw v("onConfigLoaded() failed",e),e}je(),Ne.afterConfigLoaded.promise_control.resolve(Ne.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Ne.config=e.config=Object.assign(Ne.config,{message:n,error:t,isError:!0}),et(1,new Error(n)),t}}function Ae(){return!!globalThis.navigator&&(Ne.isChromium||Ne.isFirefox)}async function Oe(e){const t=Ne.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const De="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,ke="function"==typeof importScripts,Ie=ke&&"undefined"!=typeof dotnetSidecar,Pe=ke&&!Ie,Ce="object"==typeof window||ke&&!De,Me=!Ce&&!De;let Ue={},Ne={},Le={},$e={},ze={},We=!1;const Fe={},Be={config:Fe},Ve={mono:{},binding:{},internal:ze,module:Be,loaderHelpers:Ne,runtimeHelpers:Ue,diagnosticHelpers:Le,api:$e};function qe(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);v(o,n),Ue.nativeAbort(n)}function Je(){return void 0!==Ne.exitCode}function He(){return Ue.runtimeReady&&!Je()}function Ze(){Je()&&qe(!1,`.NET runtime already exited with ${Ne.exitCode} ${Ne.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Pe?Ue.runtimeReady||qe(!1,"The WebWorker is not attached to the runtime. See https://github.com/dotnet/runtime/blob/main/src/mono/wasm/threads.md#JS-interop-on-dedicated-threads"):Ue.runtimeReady||qe(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Qe(){Ce&&(globalThis.addEventListener("unhandledrejection",ot),globalThis.addEventListener("error",nt))}let Ge,Ke;function Xe(e){Ke&&Ke(e),et(e,Ne.exitReason)}function Ye(e){var t;if(Ge&&Ge(e||Ne.exitReason),(null===(t=Ne.config)||void 0===t?void 0:t.dumpThreadsOnNonZeroExit)&&Ue.mono_wasm_print_thread_dump&&void 0===Ne.exitCode)try{Ue.mono_wasm_print_thread_dump()}catch(e){}et(1,e||Ne.exitReason)}function et(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Je())Ne.diagnosticTracing&&h("mono_exit called after exit");else{try{Be.onAbort==Ye&&(Be.onAbort=Ge),Be.onExit==Xe&&(Be.onExit=Ke),Ce&&(globalThis.removeEventListener("unhandledrejection",ot),globalThis.removeEventListener("error",nt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Ne.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Ne.config)||void 0===r?void 0:r.dumpThreadsOnNonZeroExit)&&Ue.dumpThreads()):(Ne.diagnosticTracing&&h(`abort_startup, reason: ${o}`),function(e){Ne.allDownloadsQueued.promise_control.reject(e),Ne.allDownloadsFinished.promise_control.reject(e),Ne.afterConfigLoaded.promise_control.reject(e),Ne.wasmCompilePromise.promise_control.reject(e),Ne.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){y("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?h:v;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Pe&&Ne.config&&(Ne.config.logExitCode?Ne.config.forwardConsoleLogsToWS?S("WASM EXIT "+e):b("WASM EXIT "+e):Ne.config.forwardConsoleLogsToWS&&S())}(t,o),function(e){if(Ce&&!Pe&&Ne.config&&Ne.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){y("mono_exit B failed",e)}Ne.exitCode=t,Ne.exitReason||(Ne.exitReason=o),!Pe&&Ue.runtimeReady&&Be.runtimeKeepalivePop()}if(Ne.config&&Ne.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){v(`flushing std* streams failed: ${e}`)}}()}finally{tt(t,o)}})(),o;tt(t,o)}function tt(e,t){if(Pe&&Ue.runtimeReady&&Ue.nativeAbort)throw Ue.nativeAbort(t),t;if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||y("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!Ce)throw De&&ze.process?ze.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function ot(e){rt(e,e.reason,"rejection")}function nt(e){rt(e,e.error,"error")}function rt(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(v("Unhandled error:",t),et(1,t))}catch(e){}}!function(e){if(We)throw new Error("Loader module already loaded");We=!0,Ue=e.runtimeHelpers,Ne=e.loaderHelpers,Le=e.diagnosticHelpers,$e=e.api,ze=e.internal,Object.assign($e,{INTERNAL:ze,invokeLibraryInitializers:ve}),Object.assign(e.module,{config:Ee(Fe,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"8e0f8ed2312954727f8919d7d1c2f78b483b4ee7",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Je,is_runtime_running:He,assert_runtime_running:Ze,mono_exit:et,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:re,resolve_single_asset_path:oe,setup_proxy_console:R,set_thread_prefix:p,installUnhandledErrorHandler:Qe,retrieve_asset_download:ae,invokeLibraryInitializers:ve,isDebuggingSupported:Ae,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Ne,l)}(Ve);let it,st,at,lt=!1,ct=!1;async function dt(e){if(!ct){if(ct=!0,Ce&&Ne.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&R("main",globalThis.console,globalThis.location.origin),Be||qe(!1,"Null moduleConfig"),Ne.config||qe(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Ve.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(Be,t),Te(Be,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Te(Be,e)}await async function(e){if(De){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Ne.modulesUniqueQuery=t.substring(o)),Ne.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Ne.scriptDirectory=(n=Ne.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Ne.locateFile=e=>"URL"in globalThis&&globalThis.URL!==P?new URL(e,Ne.scriptDirectory).toString():L(e)?e:Ne.scriptDirectory+e,Ne.fetch_like=C,Ne.out=console.log,Ne.err=console.error,Ne.onDownloadResourceProgress=e.onDownloadResourceProgress,Ce&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Ne.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Ne.isChromium=e.userAgent.includes("Chrome"),Ne.isFirefox=e.userAgent.includes("Firefox"))}ze.require=De?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=P)}(Be)}}async function ut(e){return await dt(e),Ge=Be.onAbort,Ke=Be.onExit,Be.onAbort=Ye,Be.onExit=Xe,Be.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),lt?Ne.diagnosticTracing&&h("mono config already received"):(Ee(Ne.config,n),Ue.monoThreadInfo=r,je(),Ne.diagnosticTracing&&h("mono config received"),lt=!0,Ne.afterConfigLoaded.promise_control.resolve(Ne.config),Ce&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Ne.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Ne.afterConfigLoaded.promise,function(){const e=Ne.config;e.assets||qe(!1,"config.assets must be defined");for(const t of e.assets)ee(t),K[t.behavior]&&F.push(t)}(),setTimeout((async()=>{try{await re()}catch(e){et(1,e)}}),0);const e=ft(),t=await Promise.all(e);return await mt(t),Be}():async function(){var e;await Se(Be),se();const t=ft();(async function(){try{const e=oe("dotnetwasm");await le(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||qe(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{Ce&&"application/wasm"!==o&&y('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Ne.diagnosticTracing&&h("instantiate_wasm_module buffered"),n=Me?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Ne.wasmCompilePromise.promise_control.resolve(n)}catch(e){Ne.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{k(),function(){const e=oe("js-module-threads"),t=[];for(let o=0;o<Ne.config.pthreadPoolInitialSize;o++){const o=Ne.workerNextNumber++,n=new Worker(e.resolvedUrl,{name:"dotnet-worker-"+o.toString().padStart(3,"0"),type:"module"});n.info={workerNumber:o,pthreadId:0,reuseCount:0,updateCount:0,threadPrefix:"          -    ",threadName:"emscripten-pool"},t.push(n)}Ne.loadingWorkers.promise_control.resolve(t)}(),await re()}catch(e){et(1,e)}}),0);const o=await Promise.all(t);return await mt(o),await Ue.dotnetReady.promise,await ye(null===(e=Ne.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await ve("onRuntimeReady",[Ve.api]),$e}()}function ft(){const e=oe("js-module-runtime"),t=oe("js-module-native");if(it&&st)return[it,st,at];"object"==typeof e.moduleExports?it=e.moduleExports:(Ne.diagnosticTracing&&h(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),it=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?st=t.moduleExports:(Ne.diagnosticTracing&&h(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),st=import(/*! webpackIgnore: true */t.resolvedUrl));const o=te("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?at=o.moduleExports:(Ne.diagnosticTracing&&h(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),at=import(/*! webpackIgnore: true */o.resolvedUrl))),[it,st,at]}async function mt(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Ve),t(Ve),c&&c.setRuntimeGlobals(Ve),await n(Be),Ne.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(Be,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),Be))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const gt=new class{withModuleConfig(e){try{return Te(Be,e),this}catch(e){throw et(1,e),e}}withOnConfigLoaded(e){try{return Te(Be,{onConfigLoaded:e}),this}catch(e){throw et(1,e),e}}withConsoleForwarding(){try{return Ee(Fe,{forwardConsoleLogsToWS:!0}),this}catch(e){throw et(1,e),e}}withExitOnUnhandledError(){try{return Ee(Fe,{exitOnUnhandledError:!0}),Qe(),this}catch(e){throw et(1,e),e}}withAsyncFlushOnExit(){try{return Ee(Fe,{asyncFlushOnExit:!0}),this}catch(e){throw et(1,e),e}}withExitCodeLogging(){try{return Ee(Fe,{logExitCode:!0}),this}catch(e){throw et(1,e),e}}withElementOnExit(){try{return Ee(Fe,{appendElementOnExit:!0}),this}catch(e){throw et(1,e),e}}withInteropCleanupOnExit(){try{return Ee(Fe,{interopCleanupOnExit:!0}),this}catch(e){throw et(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return Ee(Fe,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw et(1,e),e}}withWaitingForDebugger(e){try{return Ee(Fe,{waitForDebugger:e}),this}catch(e){throw et(1,e),e}}withInterpreterPgo(e,t){try{return Ee(Fe,{interpreterPgo:e,interpreterPgoSaveDelay:t}),Fe.runtimeOptions?Fe.runtimeOptions.push("--interp-pgo-recording"):Fe.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw et(1,e),e}}withConfig(e){try{return Ee(Fe,e),this}catch(e){throw et(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||qe(!1,"must be file path or URL"),Te(Be,{configSrc:e}),this}catch(e){throw et(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||qe(!1,"must be directory path"),Ee(Fe,{virtualWorkingDirectory:e}),this}catch(e){throw et(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,Ee(Fe,{environmentVariables:o}),this}catch(e){throw et(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||qe(!1,"must be dictionary object"),Ee(Fe,{environmentVariables:e}),this}catch(e){throw et(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&qe(!1,"must be boolean"),Ee(Fe,{diagnosticTracing:e}),this}catch(e){throw et(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||qe(!1,"must be number"),Ee(Fe,{debugLevel:e}),this}catch(e){throw et(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||qe(!1,"must be array of strings"),Ee(Fe,{applicationArguments:e}),this}catch(e){throw et(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||qe(!1,"must be array of strings"),Fe.runtimeOptions?Fe.runtimeOptions.push(...e):Fe.runtimeOptions=e,this}catch(e){throw et(1,e),e}}withMainAssembly(e){try{return Ee(Fe,{mainAssemblyName:e}),this}catch(e){throw et(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw et(1,e),e}}withApplicationEnvironment(e){try{return Ee(Fe,{applicationEnvironment:e}),this}catch(e){throw et(1,e),e}}withApplicationCulture(e){try{return Ee(Fe,{applicationCulture:e}),this}catch(e){throw et(1,e),e}}withResourceLoader(e){try{return Ne.loadBootResource=e,this}catch(e){throw et(1,e),e}}async download(){try{await async function(){dt(Be),await Se(Be),se(),k(),re(),await Ne.allDownloadsFinished.promise}()}catch(e){throw et(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ut(Be),Ve.api}()),this.instance}catch(e){throw et(1,e),e}}async run(){try{return Be.config||qe(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw et(1,e),e}}},pt=et,ht=ut;Me||"function"==typeof globalThis.URL||qe(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&qe(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),(Me||De)&&qe(!1,"This build of dotnet is multi-threaded, it doesn't support shell environments like V8 or NodeJS. See also https://aka.ms/dotnet-wasm-features"),void 0===globalThis.SharedArrayBuffer&&qe(!1,"SharedArrayBuffer is not enabled on this page. Please use a modern browser and set Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy http headers. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.EventTarget&&qe(!1,"This browser/engine doesn't support EventTarget API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),gt.withConfig(/*json-start*/{
  "mainAssemblyName": "TerrariaWebLoader",
  "resources": {
    "hash": "sha256-JRjR4ppHfWXxhmN1zrsuEwMYm3GSaTnrWrPqhqb0JlQ=",
    "jsModuleWorker": [
      {
        "name": "dotnet.native.worker.7hlzjx50fa.mjs"
      }
    ],
    "jsModuleNative": [
      {
        "name": "dotnet.native.7x5go0bysi.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.njhzbyt8kw.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.0rfzz8typj.wasm",
        "hash": "sha256-hFIyoMpvH1iEzKvbmxz9BLqaUxrCU9GB8F6YvjVmAng=",
        "cache": "force-cache"
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.tjcz0u77k5.dat",
        "hash": "sha256-SZLtQnRc0JkwqHab0VUVP7T3uBPSeYzxzDnpxPpUnHk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.tptq2av103.dat",
        "hash": "sha256-8fItetYY8kQ0ww6oxwTLiT3oXlBwHKumbeP2pRF4yTc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.lfu7j35m59.dat",
        "hash": "sha256-L7sV7NEYP37/Qr2FPCePo5cJqRgTXRwGHuwF5Q+0Nfs=",
        "cache": "force-cache"
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.r9dr3feod5.wasm",
        "hash": "sha256-79pZn++EkGppMOm7TYYjOreD7332Ai5kIC27kk63OFI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.ra6o51igzv.wasm",
        "hash": "sha256-4x5+GxLs3h4gP9bpu4tGXpk8l59CsbdZ4ox5m7kvWO8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.0sss404731.wasm",
        "hash": "sha256-sAQytUWyiF5Xh5Klc90WsF62IqFJgFWMs3ucM0lqZz4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.v84js5b87c.wasm",
        "hash": "sha256-weOgqk1PyhXsEwyo0a1H3mTolYVrW233SyQKgIDQMwo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Channels.wasm",
        "name": "System.Threading.Channels.ewt62bdcpm.wasm",
        "hash": "sha256-IgVDDafn4JDXozxPIsjPMLm5R5nJfai95e7I4QnDa8Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.ThreadPool.wasm",
        "name": "System.Threading.ThreadPool.gi3wp1xebi.wasm",
        "hash": "sha256-ODlyDWOgqHaCE8oYD3h/VJkBcbDVy+45Q28HSMWdCBU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.pyxiupzd7r.wasm",
        "hash": "sha256-cc7TELysqaFMjgb+qdb3AggyOyEOs2O/4L+fxd9dzwk=",
        "cache": "force-cache"
      }
    ],
    "assembly": [
      {
        "virtualPath": "FNA.wasm",
        "name": "FNA.z6smueanio.wasm",
        "hash": "sha256-O25WEZpwukQsbIWhQLbMhmZTaIc+m7OC1mMJ3dj1uY0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.1zdxgb4i6c.wasm",
        "hash": "sha256-/aD5aoAPdJ0+VWK29BCwyPKikrETw/5L9RX5w11VqL4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.VisualBasic.wasm",
        "name": "Microsoft.VisualBasic.8p7acm0ol9.wasm",
        "hash": "sha256-hBbsdszuvNjfobDQ8ndRZiARjWwJoqEQZiKQaqhg1oI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.VisualBasic.Core.wasm",
        "name": "Microsoft.VisualBasic.Core.oa0ivpxjss.wasm",
        "hash": "sha256-ANtiyRGv1V3UXu5e+7N0yRNdc46M6D/lFyFYA0QoaXM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Primitives.wasm",
        "name": "Microsoft.Win32.Primitives.urtvs81r7n.wasm",
        "hash": "sha256-hssDCxHvhvCUodaYjtvzxBfVq3myU8cEZ4wYtlSPuls=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Registry.wasm",
        "name": "Microsoft.Win32.Registry.22ncz2iyf9.wasm",
        "hash": "sha256-uurlWJMm3o9KIatGfBd00MmACPJ35iRHId8WkB9gmgQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Mono.Cecil.Mdb.wasm",
        "name": "Mono.Cecil.Mdb.429tb82tx1.wasm",
        "hash": "sha256-5MFrAshP4u3t9BrLEnpT4v3lcXoWj0avnxo3PkMoVaI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Mono.Cecil.Pdb.wasm",
        "name": "Mono.Cecil.Pdb.b129czsraf.wasm",
        "hash": "sha256-j+oaBhb0AS0BXkKoBnT8JlXEYkQsFu+tDz1ie6MVess=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Mono.Cecil.Rocks.wasm",
        "name": "Mono.Cecil.Rocks.9i3lw3h19g.wasm",
        "hash": "sha256-/551Wf0QfYmHbR/t178FbPNJ2IrjMIVQC6RUE77W/lY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Mono.Cecil.wasm",
        "name": "Mono.Cecil.danupkle3u.wasm",
        "hash": "sha256-ZSpqLykYee8D52LatgELxnJL5ka2lVtt77MkdTE6wpk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.6tf31dnsfp.wasm",
        "hash": "sha256-ytdSWITIEDATcVCXTMwsj5oTp2GKwTrornMjmfhm21g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.AppContext.wasm",
        "name": "System.AppContext.2dp0f0ejq7.wasm",
        "hash": "sha256-Zo9YIYie+8Y/nusOB6zG4ljnLLzzVZDtlqEGwPq9Lfo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Buffers.wasm",
        "name": "System.Buffers.8vidsi8mmx.wasm",
        "hash": "sha256-xMTiecIP3/EAwVylZUJjz/RX/hge27pODh2rN1emUpc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.to6qdoyt18.wasm",
        "hash": "sha256-o26ieG8vFyPaktRgfNmtC2uSnn2+aAm49kAHL7NjZvw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.p70gjjw8w1.wasm",
        "hash": "sha256-63s7PJ0GOWeO9u2u4R+uiU44l/9a45C8k6h29cZrxzA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.vnnt3ky8uo.wasm",
        "hash": "sha256-C/DGmbxbR99ivF9ZRwil/81uIMiVS2vg5p1cZ6Kd8ZI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.zhcplxg4oy.wasm",
        "hash": "sha256-h2QFXWtsPH0ZWOqFCw6BG6zGGT4sO5gU3r7FXVPLYfY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.DataAnnotations.wasm",
        "name": "System.ComponentModel.DataAnnotations.788hkt1ewv.wasm",
        "hash": "sha256-5/sDVM3ltwFfRRf1MLc5UJTxoUGAN3oXKrkGXoOXKGM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.EventBasedAsync.wasm",
        "name": "System.ComponentModel.EventBasedAsync.lbc2n1ye5z.wasm",
        "hash": "sha256-H5pdyMo0uNKuVVvdhHCo2Z0AdA8/azj7Ty6yR6IFwZA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.pex3ixe3ao.wasm",
        "hash": "sha256-Hx5pnLVJ4waO2eI7dBX8k4LdlO2y+w+HIpGvXu78QH8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.hhn7an7dkt.wasm",
        "hash": "sha256-pSgFReG3UiACBN7EziMhiM6t2TbkyJv7P0MDiil4CSw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.aawix4lw4j.wasm",
        "hash": "sha256-8hRq9TVKCCZk5twD3yT/b1rZXWILl2n+71ynBRRv090=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Configuration.wasm",
        "name": "System.Configuration.tmaxdexzhp.wasm",
        "hash": "sha256-61at8UuJijrguXr3iRmVGhSIIdyQzHZ2bmEqEKHMQLQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.yqhk4diokz.wasm",
        "hash": "sha256-JnFLlR9N2crxYuNdGY9e9jTqD1Q0SXil7s2V6uofYVo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Core.wasm",
        "name": "System.Core.lllp0w8mi3.wasm",
        "hash": "sha256-Z0Y5oaoWnwW7dnNYxmprxfiS7iWgJ7jYVTgucms7FKE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.snwlj9vh2i.wasm",
        "hash": "sha256-mH+FlLAlPfNM49PQh1mPm3by6dp2b4ZpCb5KowtWZwU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.DataSetExtensions.wasm",
        "name": "System.Data.DataSetExtensions.97w5uv4ky2.wasm",
        "hash": "sha256-u9OtqSNlYMLpcRbWPtc0gu9J0926+qix52F/bpobACU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.wasm",
        "name": "System.Data.fcngdiynlr.wasm",
        "hash": "sha256-0ZDuoc642jC0keL6T7f4p+oO9qLUjavGRojADx4t4eM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Contracts.wasm",
        "name": "System.Diagnostics.Contracts.z0ptfo4f1g.wasm",
        "hash": "sha256-8/InVtm/PhBGXslMpYPuNzHWRxk/ffbkdOqKsEdgcGQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Debug.wasm",
        "name": "System.Diagnostics.Debug.ssebekbvl8.wasm",
        "hash": "sha256-VNLXTTQmtLCNKVsiWamELFiG4zPJ3yzu8G42C4wZrMQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.avg0tantl3.wasm",
        "hash": "sha256-Zqo6Yj52dyROQRbI6elj++SH8YPvjsqtKmOtt3zGEgE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.FileVersionInfo.wasm",
        "name": "System.Diagnostics.FileVersionInfo.5rdbnjxo9x.wasm",
        "hash": "sha256-Yc1DWVLxn9os5gAjx6+DzlAM2hRezUlTVaX6I4HI9oI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Process.wasm",
        "name": "System.Diagnostics.Process.71tldatimy.wasm",
        "hash": "sha256-xZQl6zew1Mf617j5+nP64zsxbhsT8yUPt5qALh7T+ok=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.StackTrace.wasm",
        "name": "System.Diagnostics.StackTrace.9ldcmpszko.wasm",
        "hash": "sha256-M9bMPPN1o+O9Tc8fKnOBGGeU+EHfJ2W1CPB2EJxB6xM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TextWriterTraceListener.wasm",
        "name": "System.Diagnostics.TextWriterTraceListener.2lpqdrbyvj.wasm",
        "hash": "sha256-+lJ7oiA++eLN+/4f9UXr5wB3YdNGgFwvyC86yeWQWUw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tools.wasm",
        "name": "System.Diagnostics.Tools.8r0w546mgb.wasm",
        "hash": "sha256-1GAxK9apArVuGjNIawzInskxa9PtmhwGp7OC0ftzaSI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.yx7ovvupvh.wasm",
        "hash": "sha256-Nrngj58sg3cfBrlr7tpBpqMBAIUqjC5Y0GHMRvR39VE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.9rl5sgg49i.wasm",
        "hash": "sha256-ZdmW8BD0+t5FfbIv5MyUw8KUSZTXZYj2hS1UdGJgD5o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.dsyadcp7bc.wasm",
        "hash": "sha256-YwREpJzMyty2yDFvVd95m8v1AZdFjXt6zl4iZ6qIrlI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.r8ctzqfz3s.wasm",
        "hash": "sha256-xcFtav2p7V6nwhqDW+HRrCgkKHblS0jB8Eu7BVofRLE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Dynamic.Runtime.wasm",
        "name": "System.Dynamic.Runtime.2jg3ea504o.wasm",
        "hash": "sha256-kgO9JijE5Y+nsKBdosN7lh9Eva58t/x6kw+gobco3+g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Formats.Asn1.wasm",
        "name": "System.Formats.Asn1.tj27qbtyne.wasm",
        "hash": "sha256-V0EjnZ0rFgT7wVDuY9zYI+cX3mbKPRFcj9HYK0j0h+o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Formats.Tar.wasm",
        "name": "System.Formats.Tar.jrl9x1kdrb.wasm",
        "hash": "sha256-kURjHhVansLXSpaOYOxC47B+vjC/627FHWa5iVD4fqQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Globalization.wasm",
        "name": "System.Globalization.8ol83agd9k.wasm",
        "hash": "sha256-SFVfAZup5GziScH1bye7oV9MouRFWD2CH+987eaP6M0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Globalization.Calendars.wasm",
        "name": "System.Globalization.Calendars.432uu2gifj.wasm",
        "hash": "sha256-8PO3Yx4RSUuWgiaNtbvba2JyFvcEgE9f/Y2LkphxNu8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Globalization.Extensions.wasm",
        "name": "System.Globalization.Extensions.os94lb91vi.wasm",
        "hash": "sha256-aOSw7PQHq0LyOdMAzEnt+rOC3u7FvK1pQNHh6uq48Lk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.4j0xorrkai.wasm",
        "hash": "sha256-8JSDGy3FyM886NSTQp/J3wtegbnB09j9EX8mU7ogD2o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.Brotli.wasm",
        "name": "System.IO.Compression.Brotli.j05vktvklp.wasm",
        "hash": "sha256-3bwbUD5VA0DRaypOhUHZYBEjpDjx1zHDFxhVcFoRMBg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.FileSystem.wasm",
        "name": "System.IO.Compression.FileSystem.7zrgwijmmi.wasm",
        "hash": "sha256-XbaKxqupgD2Qn+Br7Ng0qWwLVQFEQT5CHklG6o+OXG0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.ZipFile.wasm",
        "name": "System.IO.Compression.ZipFile.emark595wb.wasm",
        "hash": "sha256-hgZEZCNbsUN0bVCFRXyqiGeq8JARv6S34fgynQ0476c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.AccessControl.wasm",
        "name": "System.IO.FileSystem.AccessControl.rewhgl76z1.wasm",
        "hash": "sha256-rc0zsxh36QDco7ks/eBafJilmLGei68KGFqwAJC3Fag=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.DriveInfo.wasm",
        "name": "System.IO.FileSystem.DriveInfo.dmvxxorjba.wasm",
        "hash": "sha256-Va/dcC4JaRV8TFx/qxlYrCqWfMxPSbz6pRP387em4Oo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.Primitives.wasm",
        "name": "System.IO.FileSystem.Primitives.5t9eqnsoiz.wasm",
        "hash": "sha256-1wD9/aMvUd7TdK9CZlxqYq+vOhUrrDsVDhC/J17IizM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.Watcher.wasm",
        "name": "System.IO.FileSystem.Watcher.2pss0nqamx.wasm",
        "hash": "sha256-uqNG4cjRwPqXEGUKkwf3qL+5fP+7hbLTII6r6hP+czo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.wasm",
        "name": "System.IO.FileSystem.cty81b1k5j.wasm",
        "hash": "sha256-wOANApo8vqGR+jdzfCDshct1HCbV1RptnyHfii1RdmE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.IsolatedStorage.wasm",
        "name": "System.IO.IsolatedStorage.c9c0rheycm.wasm",
        "hash": "sha256-EH2U3UhFhL0b2QMPJUmZMm+irz8MsUlpbzOJVahsSFc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.sv95d7u6qw.wasm",
        "hash": "sha256-SMoee8W2YYxivEz2VrSNij5QeVGF7qKw8Yng9D8ALnI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.65ffzjinb2.wasm",
        "hash": "sha256-agngjqQXQ3B6CCmtyVPfexoqr9luROMcBevSMYZqeUY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipes.AccessControl.wasm",
        "name": "System.IO.Pipes.AccessControl.kbihw8uqqq.wasm",
        "hash": "sha256-AOlh7RlkYU2fvPlmXaUUbDwLNXVovqesjBvBgpSjLao=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipes.wasm",
        "name": "System.IO.Pipes.cihgde06uy.wasm",
        "hash": "sha256-pGHpYJXMARMqBC0dIJPFUE5SUB0HMbyv1bo12yKrDw4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.UnmanagedMemoryStream.wasm",
        "name": "System.IO.UnmanagedMemoryStream.88ect3m4l0.wasm",
        "hash": "sha256-+KPmXbjEi6iNQqhbf4uYM3MQQg61fcFt4frNieSxnGg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.wasm",
        "name": "System.IO.a9sbv9nbp4.wasm",
        "hash": "sha256-ztaSsMeNblw3WYm7xL+F7YpB1uK4PIwxPmnbmnSwpGU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.AsyncEnumerable.wasm",
        "name": "System.Linq.AsyncEnumerable.pyln97q6bg.wasm",
        "hash": "sha256-8RN68HBBeU5ck8cq7jZOcJ0CjVfs0kxJjn0paYtl+Qk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.womfyvgnun.wasm",
        "hash": "sha256-oB5P74hL5b8Mk0WvX3yFp+PGJK1HuA9H1DaBHxAzj1k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Parallel.wasm",
        "name": "System.Linq.Parallel.u8rgeubswi.wasm",
        "hash": "sha256-7qNucXF+2oEd22B9/414o8S+2htAiWmawruK8k+Bnts=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.ns0hmyg188.wasm",
        "hash": "sha256-R/zg8bYP5RZNHiZm9W87Sez9t7MvTCZSFgHGuWEAEEA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.ppcgmf9c7o.wasm",
        "hash": "sha256-XaZItiE9ZTMZfqStlgfLPn3cBQFQRzrg7iKuFTM6NVg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.8ht4l661tu.wasm",
        "hash": "sha256-PBu7sECSkPooshlGqN29/RN3zfC9PDG5OYW9jhtvWm0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.Json.wasm",
        "name": "System.Net.Http.Json.alujhet4mx.wasm",
        "hash": "sha256-npr+tzzLaVkH5+yTA6QWfzuAhIP4b9JJDVvyKmQ3lDY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.y7c3y8m9nk.wasm",
        "hash": "sha256-noJxnfw2O8wgzgsxkH17Tc6Xvm/+6iNU6VJqUbNHsHU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.HttpListener.wasm",
        "name": "System.Net.HttpListener.i7i9ejbld8.wasm",
        "hash": "sha256-bq6l6UJJw3Eakf+E952DXq/uoJIws947yLT3oxi5Cd8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Mail.wasm",
        "name": "System.Net.Mail.v3rf5dawse.wasm",
        "hash": "sha256-BbBXVntO13KI704IAEAVH5KRZP3VUz1RoA9OJh7kDcY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.NameResolution.wasm",
        "name": "System.Net.NameResolution.mx92xvj4oh.wasm",
        "hash": "sha256-ymuMKkgxDMc/pGqJK+ptslSt6kY6pFMnpsPzMb4Ukq4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.NetworkInformation.wasm",
        "name": "System.Net.NetworkInformation.7k7slt7v8s.wasm",
        "hash": "sha256-ufFRDK/1ZYur1amURrtNMqYRe0PqhBB0XjCVfgQ11hU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Ping.wasm",
        "name": "System.Net.Ping.mirbj3r46e.wasm",
        "hash": "sha256-8hBzVH5/hjSL4gC2ZcrBCyLy9C+KoI+NzZRG8623SRs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.345a7xrlba.wasm",
        "hash": "sha256-nUxBYNvIw3nPUihCnA8buHCcRtclq4lw8Sg9hoDWVMU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Quic.wasm",
        "name": "System.Net.Quic.cazmxplxyh.wasm",
        "hash": "sha256-JLFQYeZx9QlLzWuwCmjnbUv36Nfa8KS6q0kV55yDo+8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.npv5tzyfx8.wasm",
        "hash": "sha256-NUcZ/ff5Jr7NavJ6JEGlh19xPjy0W7yGVMjs4xG6K5s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Security.wasm",
        "name": "System.Net.Security.lmkjqh58aa.wasm",
        "hash": "sha256-04Kj/kQOg6X1cnzOmJk65wykXibJjn7Xk3XARK+2hX0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.ServerSentEvents.wasm",
        "name": "System.Net.ServerSentEvents.8f8940kwv2.wasm",
        "hash": "sha256-HKkmlGCigrOc1zIbYzSnpr/5AJY0V6LJ7IMCngc8K+s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.ServicePoint.wasm",
        "name": "System.Net.ServicePoint.8yy2rp8t01.wasm",
        "hash": "sha256-cNz53r8/oekbKCq83D+TmT/XCaYMN83X7VQCzywAM7w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Sockets.wasm",
        "name": "System.Net.Sockets.tiddtar9xc.wasm",
        "hash": "sha256-S+XskPMPk1nnT+dJuF3ty+zsKy4uGzop8tLDZo1pS90=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebClient.wasm",
        "name": "System.Net.WebClient.spdi7a3o7b.wasm",
        "hash": "sha256-EOvuJxZLoxi7m8DNUAi071I1yglO0atgv2WJK+4tFWQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.wasm",
        "name": "System.Net.WebHeaderCollection.qzik1b5uyx.wasm",
        "hash": "sha256-2uVF5uIDYZftqlGxBQn9uYxcOwHucZfm1UQLKseQk+E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebProxy.wasm",
        "name": "System.Net.WebProxy.g7xor81jet.wasm",
        "hash": "sha256-HKl6L357SQ0Fdz2XJMqhRInUo43EdtTDoYlLHQEjmG0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebSockets.Client.wasm",
        "name": "System.Net.WebSockets.Client.b1njgu5bhb.wasm",
        "hash": "sha256-oawDZwRWc4HGvhraadb6uH1+KNwq+M7uIS7oybe23v0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebSockets.wasm",
        "name": "System.Net.WebSockets.perfrb39i1.wasm",
        "hash": "sha256-f1DIPIx+SQ3k5461TV7cIC+gy9k2WmpCnqJgmVyLdFI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.wasm",
        "name": "System.Net.vg2l3oaa6h.wasm",
        "hash": "sha256-QZ0FZpQMUFqgkwWqty1gabA1pFMZkXpgPhpclMmCxA4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Numerics.Vectors.wasm",
        "name": "System.Numerics.Vectors.2u0ecpra9e.wasm",
        "hash": "sha256-RkTSN6jVJaLP2PZxSAKyvinc7BVuke95lax749k5XG0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Numerics.wasm",
        "name": "System.Numerics.k1ch8jsbnr.wasm",
        "hash": "sha256-yPT2Zsh3bQa3luoXUdhi91Sh/9uDVl+k9fR7PttoRG8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.m28eg6rhv7.wasm",
        "hash": "sha256-ogco2Rm75SCdpnY7HaOh3kDtLRoXov9OG4GEh9Rl2f0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.DataContractSerialization.wasm",
        "name": "System.Private.DataContractSerialization.j63mailp75.wasm",
        "hash": "sha256-mxt7gVrgcoJiyWQ5jI7FR0JI47W9uxw+r+J2poMlhkc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.dxi1iu8qdy.wasm",
        "hash": "sha256-EaCNTXX8NWUQkdmQRd6Ma8mv7V2HYcQDZ3eDy9l2rM0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.3kom3rm40g.wasm",
        "hash": "sha256-LUvfhi6uKYykdy6aDHYlXjpPSe91RcTZELn+xa0aiS4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.ltl4x0v9fz.wasm",
        "hash": "sha256-h8fgSN7afuGw2Ddl522xD2eDKbC9CsPYUJSw6RsxtBY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.DispatchProxy.wasm",
        "name": "System.Reflection.DispatchProxy.hipc1t5afe.wasm",
        "hash": "sha256-1+4HtsjCurDORFog9wjQ0OTdIQH3uoBqeaJr2lr3E/g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.hnq66nrpmc.wasm",
        "hash": "sha256-bT40OZBgbPs+eCq91gCo/9QOXuHrp+TyUdR/Xe1CMn4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.Lightweight.wasm",
        "name": "System.Reflection.Emit.Lightweight.3dwwzdnyn4.wasm",
        "hash": "sha256-KU03c3pAGhrqFFtbYGyvvLpCfzZE2FfqeM3fhP32TZk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.wasm",
        "name": "System.Reflection.Emit.lt3jq97qy6.wasm",
        "hash": "sha256-Gai9aMRJHschJ7a1GjdgNrtcNfsNjqYoXoYEqSnemCY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Extensions.wasm",
        "name": "System.Reflection.Extensions.722avyn84q.wasm",
        "hash": "sha256-79/jHhuFx7g7TxvkEi2L6XCThjpJwD4ivHzngX//0xI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.id4kv16n5e.wasm",
        "hash": "sha256-2mnN4HE+CsaTpk7QOlRkWxYMdOjpakfEntLhBdO2Z9I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.lkmehiqj3z.wasm",
        "hash": "sha256-xQKTlOON0J0MWnhahHSKdfmx1OYGZXD3kmLlc7vq3vw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.TypeExtensions.wasm",
        "name": "System.Reflection.TypeExtensions.yufc2u0vic.wasm",
        "hash": "sha256-tuq4X0fmUXTxSD+4T4mgN0Q2f0QngfvZ5qofCGWRS3c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.wasm",
        "name": "System.Reflection.whj3ck3k4k.wasm",
        "hash": "sha256-jO5GcguGvW+fxCShIe5UGy6ZanvdqSRBkByseW453Lo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Resources.Reader.wasm",
        "name": "System.Resources.Reader.ga6bbtgeda.wasm",
        "hash": "sha256-mPOTPydK9UN7rC3IOqEzH+3ZDSF8nzplu4bKzO+T9jk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Resources.ResourceManager.wasm",
        "name": "System.Resources.ResourceManager.phcxz1g8t7.wasm",
        "hash": "sha256-g5swGb99D8/hB5Kxn6G7StKW2YacAA1493LeOMwsXnE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Resources.Writer.wasm",
        "name": "System.Resources.Writer.h7pzlmlqa2.wasm",
        "hash": "sha256-o3jRaOw9MVrvXErrA5IGOOFgKeKisI2oFHAd+MUr7rs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.7eqliots9r.wasm",
        "hash": "sha256-IQU77jKQulTdJg5ZGX8WAfC/cnO41dPOiYoio1Ze3LE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.Unsafe.wasm",
        "name": "System.Runtime.CompilerServices.Unsafe.v0xu6afmuv.wasm",
        "hash": "sha256-r6Af4luoE2hZtpcbQTfGFXKkqnomABHPtYaUDj3LeXQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.VisualC.wasm",
        "name": "System.Runtime.CompilerServices.VisualC.c0vk7qfuq7.wasm",
        "hash": "sha256-BKc1dy78OnT7+fOb/CXRCTIHdmf706x5QvhIe+RTGBs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Extensions.wasm",
        "name": "System.Runtime.Extensions.7gffmsy02e.wasm",
        "hash": "sha256-9+EyL1/iNUhLgBdm/geEcRnZeLLijXR9VbeBZMdXEvs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Handles.wasm",
        "name": "System.Runtime.Handles.b3j4lhbvsp.wasm",
        "hash": "sha256-WT1++1u4nOuomaywciPZaf//nO6Kl1xXjoZkptRdQYc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.6v5cjx02vr.wasm",
        "hash": "sha256-TsB5wr58kvLlGdl3R7MrTlfNFjwaBOz4jHk6I+eB3XE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "name": "System.Runtime.InteropServices.RuntimeInformation.k6or61xhbq.wasm",
        "hash": "sha256-1JJBlP3gLUqVnk++R2xzQqyWEdGaietWYMhYPUJrr5Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Intrinsics.wasm",
        "name": "System.Runtime.Intrinsics.0jgjms6inn.wasm",
        "hash": "sha256-bIA5NymWooVXk8uOLwrrX2CzdQldwKX8/RNqXU0PwNQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Loader.wasm",
        "name": "System.Runtime.Loader.y337w86rqm.wasm",
        "hash": "sha256-gpRkUdOisObZa2+fKcRBLOjcN6TK+tiAD2Nj8EXwYow=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.s1noleq393.wasm",
        "hash": "sha256-sBfo4vXj80VyISeQRn8AHzTgFW1HanbVl66K1Y6VK18=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.p4z95ijflm.wasm",
        "hash": "sha256-50hoQYLKXdKQX3kuPj2VEDlGgu/4CmzcPMoe7pezZcE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Json.wasm",
        "name": "System.Runtime.Serialization.Json.yi5ad2zufu.wasm",
        "hash": "sha256-hqBkUxtUElKbBifCwrTjG4adyoJCiOnPXngqLMSDNZw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.p1sm98x571.wasm",
        "hash": "sha256-fVC/s4Ykt3dMgosW9IIRKB30/iT2kLDqEkZPT7nVUDc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Xml.wasm",
        "name": "System.Runtime.Serialization.Xml.zmzxax7gye.wasm",
        "hash": "sha256-Ve8QXbbhNCDC2b43uWGqXNEIz9eDQJGikQLKv4zFrMA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.wasm",
        "name": "System.Runtime.Serialization.ctyzgyrihi.wasm",
        "hash": "sha256-AKM9pgxv/8U07LpITuXuVt77+EuR7ZaStMJ92EbH7kA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.AccessControl.wasm",
        "name": "System.Security.AccessControl.pkgtz5qfy7.wasm",
        "hash": "sha256-KZAGGg7+N9wkDirlFr7jfR0du370I9OV7th5hT653lc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.rnvmznsmir.wasm",
        "hash": "sha256-x0gT5/HgCHESQly8wWA2it5PBULHdedHxHdiOwzTSzs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.8o6pmvyg53.wasm",
        "hash": "sha256-+D8bMDbdvqmYo6wMJP43GgSjeoqNUk7NI0oNg3ta2Dk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Algorithms.wasm",
        "name": "System.Security.Cryptography.Algorithms.rgzswqy8le.wasm",
        "hash": "sha256-dXWz1JqgZBHZHnaARsrzmSPtaJ1SNZU6ZDWOBDiRulU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Cng.wasm",
        "name": "System.Security.Cryptography.Cng.4nz59bj525.wasm",
        "hash": "sha256-sGi7XypXEJBcJ6OHfe0F2HlGUTLd63fELgadDXEXoxk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Csp.wasm",
        "name": "System.Security.Cryptography.Csp.jut03xkfhr.wasm",
        "hash": "sha256-G57sEcL8eZpvERKZkPekb+NcblzLHuBR2gYWbmhMS+c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Encoding.wasm",
        "name": "System.Security.Cryptography.Encoding.x6tsax21dj.wasm",
        "hash": "sha256-N6/2c9lWQkKgsHcOt2kOpB2R1A+K2AobtBD3/d+JfD0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.OpenSsl.wasm",
        "name": "System.Security.Cryptography.OpenSsl.8cwnuqry2l.wasm",
        "hash": "sha256-iEboWVTuH6eJrmFQEe0pjm4H+H/ag87aFAbzkXIzp00=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Primitives.wasm",
        "name": "System.Security.Cryptography.Primitives.wz8g0roqk9.wasm",
        "hash": "sha256-dCKR/WoscH+7IIgI4mr5MU1iM9qK2vkYs7X1QIQ37KQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.X509Certificates.wasm",
        "name": "System.Security.Cryptography.X509Certificates.cm5h86j3m5.wasm",
        "hash": "sha256-tAasxmYDwC9a+Z8VKcCiqHMhVui2j9zi9aWOATYUBv0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Principal.Windows.wasm",
        "name": "System.Security.Principal.Windows.etrnujb4wy.wasm",
        "hash": "sha256-blkNqVYE8hnR0xvxKn7p5zJP9dYTGOSMT2Bdwd/V5Rs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Principal.wasm",
        "name": "System.Security.Principal.xu056u1ch5.wasm",
        "hash": "sha256-Z17U2NcXRkivjCFP3aburtHr6Xn9bczn9v4r6jTh1KY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.SecureString.wasm",
        "name": "System.Security.SecureString.0k442d6jgp.wasm",
        "hash": "sha256-8FmSuWLe0/uScELWAgeo3o+4UifvmMSTpvFIB2dVfNU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.wasm",
        "name": "System.Security.u84awx1pgv.wasm",
        "hash": "sha256-AjiGnqRsHrGioyUdTxy2ua5jPkw9ztWYolE6Wh/d1BE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.Web.wasm",
        "name": "System.ServiceModel.Web.f93tj7eoea.wasm",
        "hash": "sha256-PfuKSy3+KlT4bRXA5zzeV3Cz8J+NELIKqPxsRxvI3u0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceProcess.wasm",
        "name": "System.ServiceProcess.3r2kdm8pcz.wasm",
        "hash": "sha256-709a0ToqNMU81HSxDTNrIWJIOG1PH964JhfcXugxsYc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.wasm",
        "name": "System.Text.Encoding.5vojv66xcx.wasm",
        "hash": "sha256-XwS3/mr0TGne1JhURMmHzcKPsF5LoRw2md+8h1/xCek=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.CodePages.wasm",
        "name": "System.Text.Encoding.CodePages.nnghcjkvki.wasm",
        "hash": "sha256-bdkSQFxoXwXtfyKI3a9hFc6T9WmgpMzyXYkPMW5TwlQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.nccejuxb6n.wasm",
        "hash": "sha256-BzHQ6IYhMCx44n97YBxHPe31v2jSxEfV2uLo0sI3qq8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.zl3zqgk0vk.wasm",
        "hash": "sha256-B9fZ9iQQRklbzmogxHfgUdLzYY8gPiVb8hdpSFhvZy4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.vo1qjih7nn.wasm",
        "hash": "sha256-D9YvwmXyarIdQisxZ72t5M005DmIT2XMuAQULBOUSRs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.u8qsrbg2k7.wasm",
        "hash": "sha256-3vp6A+TAbglqHXSq5Y8F7klLq3M4V7EzAA2Cd4Ocz58=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.AccessControl.wasm",
        "name": "System.Threading.AccessControl.skdizhbtk3.wasm",
        "hash": "sha256-POw1tOXUyg5RVjL8NI55j9TXGxkB2/GUlgInSYPFMO8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Overlapped.wasm",
        "name": "System.Threading.Overlapped.qr66memvjc.wasm",
        "hash": "sha256-xlUF5gvECwkNgUo+dCGvMmwt6cigJmRErLkqAXUvxGg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Dataflow.wasm",
        "name": "System.Threading.Tasks.Dataflow.1ik1l1b41h.wasm",
        "hash": "sha256-CafZa3tvF6NQBwNCpx7/9npHgftS7FLkrkbVrUfgdO4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Extensions.wasm",
        "name": "System.Threading.Tasks.Extensions.sfgggatu9l.wasm",
        "hash": "sha256-yIBymsiGe52tgpIGkEBuJneYB0CXAjSR25l+DiWZazk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Parallel.wasm",
        "name": "System.Threading.Tasks.Parallel.0xz1dql9lx.wasm",
        "hash": "sha256-7C532L3gQeXMM9xGJXWmRxcT59HE8TvfqKVWzUrPj+Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.wasm",
        "name": "System.Threading.Tasks.jyaf0nnrau.wasm",
        "hash": "sha256-xS4DUvxMrU3nEwdfdtHObZiyE/NreJgZ4CQGFxyzewg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.qngcszi8ia.wasm",
        "hash": "sha256-Vge287AMfLZPjswG1MnJ9DilxhLccSP4iKnMxyv2ims=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Timer.wasm",
        "name": "System.Threading.Timer.h77bpk4usf.wasm",
        "hash": "sha256-PUKtww3hFnJXuSqY0f1E/mCQGH/upjfg3E+8FDUKauM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Transactions.Local.wasm",
        "name": "System.Transactions.Local.vjy1w7nhuq.wasm",
        "hash": "sha256-1U5d3PtmFrKLipHdM+eLItqix6JPm6NZHHGHkbSHUk4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Transactions.wasm",
        "name": "System.Transactions.lm95w86y0x.wasm",
        "hash": "sha256-/d+/JaNupGp5c8uTos/s6EbPaGG7wwZhzZCxC+7GFa4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ValueTuple.wasm",
        "name": "System.ValueTuple.37yuez73dj.wasm",
        "hash": "sha256-n3KO71CVRvMuAq4YbQccEXZL37wyd9LYtKBBXRTf3vE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Web.wasm",
        "name": "System.Web.6pm7jhgcbu.wasm",
        "hash": "sha256-Vrr/U1dzKmvS0GxU6dgx5LfpeVHXI9d2XV45SlhLhRc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Web.HttpUtility.wasm",
        "name": "System.Web.HttpUtility.uo8hwcfq94.wasm",
        "hash": "sha256-PoadJ9NvaWQs9lfeIBQKJsLeEcctmF8YXt1or/o8NO4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Windows.wasm",
        "name": "System.Windows.f7q1laww5j.wasm",
        "hash": "sha256-FSiP4eP2qSzsWE0glMg+POSNdsPCVSmqUrynsLNqWdU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.wasm",
        "name": "System.Xml.420qqu8b94.wasm",
        "hash": "sha256-NKv1jPqEC8zBtqIRVJa233VYsw6sfJDTx2bdZHpkTZ4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.oywnbte638.wasm",
        "hash": "sha256-oOV6VC1H5wxp8Amp2NxmQF5yjzZw4DI6vnbNycDRDcM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.io8dfhiylc.wasm",
        "hash": "sha256-zp8IT5s8HY33gvp/VWNAGlOp4oUOsOSFgXOLHSxf5JQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Serialization.wasm",
        "name": "System.Xml.Serialization.23tmlr7zbu.wasm",
        "hash": "sha256-QhKnJ0/SStHigpS+Pji/bmty+fzZtDMJ1HmsRsvmF/U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XDocument.wasm",
        "name": "System.Xml.XDocument.52qckfyt8d.wasm",
        "hash": "sha256-E2Gd5wVfNjCvi0JpOODmTm+FyUE0f0zDswKd2MusNF4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XPath.XDocument.wasm",
        "name": "System.Xml.XPath.XDocument.odpp5i46n6.wasm",
        "hash": "sha256-REbtDFR2VGrsgGzGw/8eIIL4n4cl9xoGdR8lAF/ILPk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XPath.wasm",
        "name": "System.Xml.XPath.kq6o8cuziq.wasm",
        "hash": "sha256-HJDOan11IUBzlzrjdelYiVvckcMokde4lmDTEh9EAaQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XmlDocument.wasm",
        "name": "System.Xml.XmlDocument.4t4sexnyaw.wasm",
        "hash": "sha256-WOlilfEatXFFoIQysrPiHWTjPgKgkmUENMgj/8nsEKE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XmlSerializer.wasm",
        "name": "System.Xml.XmlSerializer.za5mns16iy.wasm",
        "hash": "sha256-W7uFjr/TMK4csyBQLgbzysGPtQfUCj/Oa/4FlFnWGnE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TerrariaWebLoader.wasm",
        "name": "TerrariaWebLoader.hbywjb56lk.wasm",
        "hash": "sha256-Q7umwpVwRYS30jY+vWAezACMzL4TQP5nhmrsAP08t4U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "WindowsBase.wasm",
        "name": "WindowsBase.6306p4b7y4.wasm",
        "hash": "sha256-8v7qB30Hns8d3u/8m80jAp75yP8uPJPbYWLQUnCwFQA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "mscorlib.wasm",
        "name": "mscorlib.pvl5zziixz.wasm",
        "hash": "sha256-+/I58ZYn+lKbd3g29M5DYH4OI/RK8LptEXS62hr1XGo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.g3bgk0npxm.wasm",
        "hash": "sha256-1B/8tUJ3y2WSXudlJAtP3HnsVB5924hZUZrqw+7+vpY=",
        "cache": "force-cache"
      }
    ]
  },
  "debugLevel": 0,
  "globalizationMode": "sharded",
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "System.Diagnostics.Debugger.IsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": true,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false
      }
    }
  }
}/*json-end*/);export{ht as default,gt as dotnet,pt as exit};
