/* Generated from client/index.js by scripts/build-client.mjs — do not edit by hand.
 * Regenerate with: npm run build:client
 */
window.__ModuleLoader__.load({
  id: "@weibaohui/dsh-process",
  factory: (require) => {
    var module = { exports: {} }
    var exports = module.exports
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" })
    var React = require("react")
    var YamlLibSrc = "var YamlLib=(()=>{var gs=Object.defineProperty;var Di=Object.getOwnPropertyDescriptor;var Ki=Object.getOwnPropertyNames;var ji=Object.prototype.hasOwnProperty;var g=(s,e,t)=>()=>{if(t)throw t[0];try{return s&&(e=s(s=0)),e}catch(n){throw t=[n],n}};var qi=(s,e)=>()=>{try{return e||s((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}},ys=(s,e)=>{for(var t in e)gs(s,t,{get:e[t],enumerable:!0})},Ri=(s,e,t,n)=>{if(e&&typeof e==\"object\"||typeof e==\"function\")for(let i of Ki(e))!ji.call(s,i)&&i!==t&&gs(s,i,{get:()=>e[i],enumerable:!(n=Di(e,i))||n.enumerable});return s};var Fi=s=>Ri(gs({},\"__esModule\",{value:!0}),s);function v(s){if(s&&typeof s==\"object\")switch(s[R]){case H:case ae:return!0}return!1}function L(s){if(s&&typeof s==\"object\")switch(s[R]){case Nt:case H:case U:case ae:return!0}return!1}var Nt,Ot,H,bs,U,ae,R,V,J,Y,I,E,Q,At,C=g(()=>{Nt=Symbol.for(\"yaml.alias\"),Ot=Symbol.for(\"yaml.document\"),H=Symbol.for(\"yaml.map\"),bs=Symbol.for(\"yaml.pair\"),U=Symbol.for(\"yaml.scalar\"),ae=Symbol.for(\"yaml.seq\"),R=Symbol.for(\"yaml.node.type\"),V=s=>!!s&&typeof s==\"object\"&&s[R]===Nt,J=s=>!!s&&typeof s==\"object\"&&s[R]===Ot,Y=s=>!!s&&typeof s==\"object\"&&s[R]===H,I=s=>!!s&&typeof s==\"object\"&&s[R]===bs,E=s=>!!s&&typeof s==\"object\"&&s[R]===U,Q=s=>!!s&&typeof s==\"object\"&&s[R]===ae;At=s=>(E(s)||v(s))&&!!s.anchor});function G(s,e){let t=bn(e);J(s)?Pe(null,s.contents,t,Object.freeze([s]))===ne&&(s.contents=null):Pe(null,s,t,Object.freeze([]))}function Pe(s,e,t,n){let i=wn(s,e,t,n);if(L(i)||I(i))return Sn(s,n,i),Pe(s,i,t,n);if(typeof i!=\"symbol\"){if(v(e)){n=Object.freeze(n.concat(e));for(let r=0;r<e.items.length;++r){let o=Pe(r,e.items[r],t,n);if(typeof o==\"number\")r=o-1;else{if(o===F)return F;o===ne&&(e.items.splice(r,1),r-=1)}}}else if(I(e)){n=Object.freeze(n.concat(e));let r=Pe(\"key\",e.key,t,n);if(r===F)return F;r===ne&&(e.key=null);let o=Pe(\"value\",e.value,t,n);if(o===F)return F;o===ne&&(e.value=null)}}return i}async function Be(s,e){let t=bn(e);J(s)?await Me(null,s.contents,t,Object.freeze([s]))===ne&&(s.contents=null):await Me(null,s,t,Object.freeze([]))}async function Me(s,e,t,n){let i=await wn(s,e,t,n);if(L(i)||I(i))return Sn(s,n,i),Me(s,i,t,n);if(typeof i!=\"symbol\"){if(v(e)){n=Object.freeze(n.concat(e));for(let r=0;r<e.items.length;++r){let o=await Me(r,e.items[r],t,n);if(typeof o==\"number\")r=o-1;else{if(o===F)return F;o===ne&&(e.items.splice(r,1),r-=1)}}}else if(I(e)){n=Object.freeze(n.concat(e));let r=await Me(\"key\",e.key,t,n);if(r===F)return F;r===ne&&(e.key=null);let o=await Me(\"value\",e.value,t,n);if(o===F)return F;o===ne&&(e.value=null)}}return i}function bn(s){return typeof s==\"object\"&&(s.Collection||s.Node||s.Value)?Object.assign({Alias:s.Node,Map:s.Node,Scalar:s.Node,Seq:s.Node},s.Value&&{Map:s.Value,Scalar:s.Value,Seq:s.Value},s.Collection&&{Map:s.Collection,Seq:s.Collection},s):s}function wn(s,e,t,n){if(typeof t==\"function\")return t(s,e,n);if(Y(e))return t.Map?.(s,e,n);if(Q(e))return t.Seq?.(s,e,n);if(I(e))return t.Pair?.(s,e,n);if(E(e))return t.Scalar?.(s,e,n);if(V(e))return t.Alias?.(s,e,n)}function Sn(s,e,t){let n=e[e.length-1];if(v(n))n.items[s]=t;else if(I(n))s===\"key\"?n.key=t:n.value=t;else if(J(n))n.contents=t;else{let i=V(n)?\"alias\":\"scalar\";throw new Error(`Cannot replace node with ${i} parent`)}}var F,yn,ne,He=g(()=>{C();F=Symbol(\"break visit\"),yn=Symbol(\"skip children\"),ne=Symbol(\"remove node\");G.BREAK=F;G.SKIP=yn;G.REMOVE=ne;Be.BREAK=F;Be.SKIP=yn;Be.REMOVE=ne});var xi,Ui,ie,ws=g(()=>{C();He();xi={\"!\":\"%21\",\",\":\"%2C\",\"[\":\"%5B\",\"]\":\"%5D\",\"{\":\"%7B\",\"}\":\"%7D\"},Ui=s=>s.replace(/[!,[\\]{}]/g,e=>xi[e]),ie=class s{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},s.defaultYaml,e),this.tags=Object.assign({},s.defaultTags,t)}clone(){let e=new s(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){let e=new s(this.yaml,this.tags);switch(this.yaml.version){case\"1.1\":this.atNextDocument=!0;break;case\"1.2\":this.atNextDocument=!1,this.yaml={explicit:s.defaultYaml.explicit,version:\"1.2\"},this.tags=Object.assign({},s.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:s.defaultYaml.explicit,version:\"1.1\"},this.tags=Object.assign({},s.defaultTags),this.atNextDocument=!1);let n=e.trim().split(/[ \\t]+/),i=n.shift();switch(i){case\"%TAG\":{if(n.length!==2&&(t(0,\"%TAG directive should contain exactly two parts\"),n.length<2))return!1;let[r,o]=n;return this.tags[r]=o,!0}case\"%YAML\":{if(this.yaml.explicit=!0,n.length!==1)return t(0,\"%YAML directive should contain exactly one part\"),!1;let[r]=n;if(r===\"1.1\"||r===\"1.2\")return this.yaml.version=r,!0;{let o=/^\\d+\\.\\d+$/.test(r);return t(6,`Unsupported YAML version ${r}`,o),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e===\"!\")return\"!\";if(e[0]!==\"!\")return t(`Not a valid tag: ${e}`),null;if(e[1]===\"<\"){let o=e.slice(2,-1);return o===\"!\"||o===\"!!\"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==\">\"&&t(\"Verbatim tags must end with a >\"),o)}let[,n,i]=e.match(/^(.*!)([^!]*)$/s);i||t(`The ${e} tag has no suffix`);let r=this.tags[n];if(r)try{return r+decodeURIComponent(i)}catch(o){return t(String(o)),null}return n===\"!\"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(let[t,n]of Object.entries(this.tags))if(e.startsWith(n))return t+Ui(e.substring(n.length));return e[0]===\"!\"?e:`!<${e}>`}toString(e){let t=this.yaml.explicit?[`%YAML ${this.yaml.version||\"1.2\"}`]:[],n=Object.entries(this.tags),i;if(e&&n.length>0&&L(e.contents)){let r={};G(e.contents,(o,l)=>{L(l)&&l.tag&&(r[l.tag]=!0)}),i=Object.keys(r)}else i=[];for(let[r,o]of n)r===\"!!\"&&o===\"tag:yaml.org,2002:\"||(!e||i.some(l=>l.startsWith(o)))&&t.push(`%TAG ${r} ${o}`);return t.join(`\n`)}};ie.defaultYaml={explicit:!1,version:\"1.2\"};ie.defaultTags={\"!!\":\"tag:yaml.org,2002:\"}});function Et(s){if(/[\\x00-\\x19\\s,[\\]{}]/.test(s)){let t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(s)}`;throw new Error(t)}return!0}function Ss(s){let e=new Set;return G(s,{Value(t,n){n.anchor&&e.add(n.anchor)}}),e}function ks(s,e){for(let t=1;;++t){let n=`${s}${t}`;if(!e.has(n))return n}}function kn(s,e){let t=[],n=new Map,i=null;return{onAnchor:r=>{t.push(r),i??(i=Ss(s));let o=ks(e,i);return i.add(o),o},setAnchors:()=>{for(let r of t){let o=n.get(r);if(typeof o==\"object\"&&o.anchor&&(E(o.node)||v(o.node)))o.node.anchor=o.anchor;else{let l=new Error(\"Failed to resolve repeated object (this should not happen)\");throw l.source=r,l}}},sourceObjects:n}}var Tt=g(()=>{C();He()});function pe(s,e,t,n){if(n&&typeof n==\"object\")if(Array.isArray(n))for(let i=0,r=n.length;i<r;++i){let o=n[i],l=pe(s,n,String(i),o);l===void 0?delete n[i]:l!==o&&(n[i]=l)}else if(n instanceof Map)for(let i of Array.from(n.keys())){let r=n.get(i),o=pe(s,n,i,r);o===void 0?n.delete(i):o!==r&&n.set(i,o)}else if(n instanceof Set)for(let i of Array.from(n)){let r=pe(s,n,i,i);r===void 0?n.delete(i):r!==i&&(n.delete(i),n.add(r))}else for(let[i,r]of Object.entries(n)){let o=pe(s,n,i,r);o===void 0?delete n[i]:o!==r&&(n[i]=o)}return s.call(e,t,n)}var Ns=g(()=>{});function K(s,e,t){if(Array.isArray(s))return s.map((n,i)=>K(n,String(i),t));if(s&&typeof s.toJSON==\"function\"){if(!t||!At(s))return s.toJSON(e,t);let n={aliasCount:0,count:1,res:void 0};t.anchors.set(s,n),t.onCreate=r=>{n.res=r,delete t.onCreate};let i=s.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof s==\"bigint\"&&!t?.keep?Number(s):s}var me=g(()=>{C()});var de,It=g(()=>{Ns();C();me();de=class{constructor(e){Object.defineProperty(this,R,{value:e})}clone(){let e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:n,onAnchor:i,reviver:r}={}){if(!J(e))throw new TypeError(\"A document argument is required\");let o={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof n==\"number\"?n:100},l=K(this,\"\",o);if(typeof i==\"function\")for(let{count:a,res:c}of o.anchors.values())i(c,a);return typeof r==\"function\"?pe(r,{\"\":l},\"\",l):l}}});function Lt(s,e,t){if(V(e)){let n=e.resolve(s),i=t&&n&&t.get(n);return i?i.count*i.aliasCount:0}else if(v(e)){let n=0;for(let i of e.items){let r=Lt(s,i,t);r>n&&(n=r)}return n}else if(I(e)){let n=Lt(s,e.key,t),i=Lt(s,e.value,t);return Math.max(n,i)}return 1}var X,Xe=g(()=>{Tt();He();C();It();me();X=class extends de{constructor(e){super(Nt),this.source=e,Object.defineProperty(this,\"tag\",{set(){throw new Error(\"Alias nodes cannot have tags\")}})}resolve(e,t){if(t?.maxAliasCount===0)throw new ReferenceError(\"Alias resolution is disabled\");let n;t?.aliasResolveCache?n=t.aliasResolveCache:(n=[],G(e,{Node:(r,o)=>{(V(o)||At(o))&&n.push(o)}}),t&&(t.aliasResolveCache=n));let i;for(let r of n){if(r===this)break;r.anchor===this.source&&(i=r)}return i}toJSON(e,t){if(!t)return{source:this.source};let{anchors:n,doc:i,maxAliasCount:r}=t,o=this.resolve(i,t);if(!o){let a=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(a)}let l=n.get(o);if(l||(K(o,null,t),l=n.get(o)),l?.res===void 0){let a=\"This should not happen: Alias anchor was not resolved?\";throw new ReferenceError(a)}if(r>=0&&(l.count+=1,l.aliasCount===0&&(l.aliasCount=Lt(i,o,n)),l.count*l.aliasCount>r)){let a=\"Excessive alias count indicates a resource exhaustion attack\";throw new ReferenceError(a)}return l.res}toString(e,t,n){let i=`*${this.source}`;if(e){if(Et(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){let r=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(r)}if(e.implicitKey)return`${i} `}return i}}});var Ct,b,M=g(()=>{C();It();me();Ct=s=>!s||typeof s!=\"function\"&&typeof s!=\"object\",b=class extends de{constructor(e){super(U),this.value=e}toJSON(e,t){return t?.keep?this.value:K(this.value,e,t)}toString(){return String(this.value)}};b.BLOCK_FOLDED=\"BLOCK_FOLDED\";b.BLOCK_LITERAL=\"BLOCK_LITERAL\";b.PLAIN=\"PLAIN\";b.QUOTE_DOUBLE=\"QUOTE_DOUBLE\";b.QUOTE_SINGLE=\"QUOTE_SINGLE\"});function Ji(s,e,t){if(e){let n=t.filter(r=>r.tag===e),i=n.find(r=>!r.format)??n[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(n=>n.identify?.(s)&&!n.format)}function ce(s,e,t){if(J(s)&&(s=s.contents),L(s))return s;if(I(s)){let f=t.schema[H].createNode?.(t.schema,null,t);return f.items.push(s),f}(s instanceof String||s instanceof Number||s instanceof Boolean||typeof BigInt<\"u\"&&s instanceof BigInt)&&(s=s.valueOf());let{aliasDuplicateObjects:n,onAnchor:i,onTagObj:r,schema:o,sourceObjects:l}=t,a;if(n&&s&&typeof s==\"object\"){if(a=l.get(s),a)return a.anchor??(a.anchor=i(s)),new X(a.anchor);a={anchor:null,node:null},l.set(s,a)}e?.startsWith(\"!!\")&&(e=Vi+e.slice(2));let c=Ji(s,e,o.tags);if(!c){if(s&&typeof s.toJSON==\"function\"&&(s=s.toJSON()),!s||typeof s!=\"object\"){let f=new b(s);return a&&(a.node=f),f}c=s instanceof Map?o[H]:Symbol.iterator in Object(s)?o[ae]:o[H]}r&&(r(c),delete t.onTagObj);let p=c?.createNode?c.createNode(t.schema,s,t):typeof c?.nodeClass?.from==\"function\"?c.nodeClass.from(t.schema,s,t):new b(s);return e?p.tag=e:c.default||(p.tag=c.tag),a&&(a.node=p),p}var Vi,ze=g(()=>{Xe();C();M();Vi=\"tag:yaml.org,2002:\"});function Ze(s,e,t){let n=t;for(let i=e.length-1;i>=0;--i){let r=e[i];if(typeof r==\"number\"&&Number.isInteger(r)&&r>=0){let o=[];o[r]=n,n=o}else n=new Map([[r,n]])}return ce(n,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error(\"This should not happen, please report a bug.\")},schema:s,sourceObjects:new Map})}var Ke,De,vt=g(()=>{ze();C();It();Ke=s=>s==null||typeof s==\"object\"&&!!s[Symbol.iterator]().next().done,De=class extends de{constructor(e,t){super(e),Object.defineProperty(this,\"schema\",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){let t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(n=>L(n)||I(n)?n.clone(e):n),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(Ke(e))this.add(t);else{let[n,...i]=e,r=this.get(n,!0);if(v(r))r.addIn(i,t);else if(r===void 0&&this.schema)this.set(n,Ze(this.schema,i,t));else throw new Error(`Expected YAML collection at ${n}. Remaining path: ${i}`)}}deleteIn(e){let[t,...n]=e;if(n.length===0)return this.delete(t);let i=this.get(t,!0);if(v(i))return i.deleteIn(n);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${n}`)}getIn(e,t){let[n,...i]=e,r=this.get(n,!0);return i.length===0?!t&&E(r)?r.value:r:v(r)?r.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!I(t))return!1;let n=t.value;return n==null||e&&E(n)&&n.value==null&&!n.commentBefore&&!n.comment&&!n.tag})}hasIn(e){let[t,...n]=e;if(n.length===0)return this.has(t);let i=this.get(t,!0);return v(i)?i.hasIn(n):!1}setIn(e,t){let[n,...i]=e;if(i.length===0)this.set(n,t);else{let r=this.get(n,!0);if(v(r))r.setIn(i,t);else if(r===void 0&&this.schema)this.set(n,Ze(this.schema,i,t));else throw new Error(`Expected YAML collection at ${n}. Remaining path: ${i}`)}}}});function W(s,e){return/^\\n+$/.test(s)?s.substring(1):e?s.replace(/^(?! *$)/gm,e):s}var Nn,re,et=g(()=>{Nn=s=>s.replace(/^(?!$)(?: $)?/gm,\"#\");re=(s,e,t)=>s.endsWith(`\n`)?W(t,e):t.includes(`\n`)?`\n`+W(t,e):(s.endsWith(\" \")?\"\":\" \")+t});function st(s,e,t=\"flow\",{indentAtStart:n,lineWidth:i=80,minContentWidth:r=20,onFold:o,onOverflow:l}={}){if(!i||i<0)return s;i<r&&(r=0);let a=Math.max(1+r,1+i-e.length);if(s.length<=a)return s;let c=[],p={},f=i-e.length;typeof n==\"number\"&&(n>i-Math.max(2,r)?c.push(0):f=i-n);let u,d,y=!1,h=-1,m=-1,S=-1;t===$t&&(h=On(s,h,e.length),h!==-1&&(f=h+a));for(let N;N=s[h+=1];){if(t===tt&&N===\"\\\\\"){switch(m=h,s[h+1]){case\"x\":h+=3;break;case\"u\":h+=5;break;case\"U\":h+=9;break;default:h+=1}S=h}if(N===`\n`)t===$t&&(h=On(s,h,e.length)),f=h+e.length+a,u=void 0;else{if(N===\" \"&&d&&d!==\" \"&&d!==`\n`&&d!==\"\t\"){let O=s[h+1];O&&O!==\" \"&&O!==`\n`&&O!==\"\t\"&&(u=h)}if(h>=f)if(u)c.push(u),f=u+a,u=void 0;else if(t===tt){for(;d===\" \"||d===\"\t\";)d=N,N=s[h+=1],y=!0;let O=h>S+1?h-2:m-1;if(p[O])return s;c.push(O),p[O]=!0,f=O+a,u=void 0}else y=!0}d=N}if(y&&l&&l(),c.length===0)return s;o&&o();let k=s.slice(0,c[0]);for(let N=0;N<c.length;++N){let O=c[N],A=c[N+1]||s.length;O===0?k=`\n${e}${s.slice(0,A)}`:(t===tt&&p[O]&&(k+=`${s[O]}\\\\`),k+=`\n${e}${s.slice(O+1,A)}`)}return k}function On(s,e,t){let n=e,i=e+1,r=s[i];for(;r===\" \"||r===\"\t\";)if(e<i+t)r=s[++e];else{do r=s[++e];while(r&&r!==`\n`);n=e,i=e+1,r=s[i]}return n}var Os,$t,tt,An=g(()=>{Os=\"flow\",$t=\"block\",tt=\"quoted\"});function Yi(s,e,t){if(!e||e<0)return!1;let n=e-t,i=s.length;if(i<=n)return!1;for(let r=0,o=0;r<i;++r)if(s[r]===`\n`){if(r-o>n)return!0;if(o=r+1,i-o<=n)return!1}return!0}function nt(s,e){let t=JSON.stringify(s);if(e.options.doubleQuotedAsJSON)return t;let{implicitKey:n}=e,i=e.options.doubleQuotedMinMultiLineLength,r=e.indent||(Mt(s)?\"  \":\"\"),o=\"\",l=0;for(let a=0,c=t[a];c;c=t[++a])if(c===\" \"&&t[a+1]===\"\\\\\"&&t[a+2]===\"n\"&&(o+=t.slice(l,a)+\"\\\\ \",a+=1,l=a,c=\"\\\\\"),c===\"\\\\\")switch(t[a+1]){case\"u\":{o+=t.slice(l,a);let p=t.substr(a+2,4);switch(p){case\"0000\":o+=\"\\\\0\";break;case\"0007\":o+=\"\\\\a\";break;case\"000b\":o+=\"\\\\v\";break;case\"001b\":o+=\"\\\\e\";break;case\"0085\":o+=\"\\\\N\";break;case\"00a0\":o+=\"\\\\_\";break;case\"2028\":o+=\"\\\\L\";break;case\"2029\":o+=\"\\\\P\";break;default:p.substr(0,2)===\"00\"?o+=\"\\\\x\"+p.substr(2):o+=t.substr(a,6)}a+=5,l=a+1}break;case\"n\":if(n||t[a+2]==='\"'||t.length<i)a+=1;else{for(o+=t.slice(l,a)+`\n\n`;t[a+2]===\"\\\\\"&&t[a+3]===\"n\"&&t[a+4]!=='\"';)o+=`\n`,a+=2;o+=r,t[a+2]===\" \"&&(o+=\"\\\\\"),a+=1,l=a+1}break;default:a+=1}return o=l?o+t.slice(l):t,n?o:st(o,r,tt,Pt(e,!1))}function As(s,e){if(e.options.singleQuote===!1||e.implicitKey&&s.includes(`\n`)||/[ \\t]\\n|\\n[ \\t]/.test(s))return nt(s,e);let t=e.indent||(Mt(s)?\"  \":\"\"),n=\"'\"+s.replace(/'/g,\"''\").replace(/\\n+/g,`$&\n${t}`)+\"'\";return e.implicitKey?n:st(n,t,Os,Pt(e,!1))}function je(s,e){let{singleQuote:t}=e.options,n;if(t===!1)n=nt;else{let i=s.includes('\"'),r=s.includes(\"'\");i&&!r?n=As:r&&!i?n=nt:n=t?As:nt}return n(s,e)}function _t({comment:s,type:e,value:t},n,i,r){let{blockQuote:o,commentString:l,lineWidth:a}=n.options;if(!o||/\\n[\\t ]+$/.test(t))return je(t,n);let c=n.indent||(n.forceBlockIndent||Mt(t)?\"  \":\"\"),p=o===\"literal\"?!0:o===\"folded\"||e===b.BLOCK_FOLDED?!1:e===b.BLOCK_LITERAL?!0:!Yi(t,a,c.length);if(!t)return p?`|\n`:`>\n`;let f,u;for(u=t.length;u>0;--u){let A=t[u-1];if(A!==`\n`&&A!==\"\t\"&&A!==\" \")break}let d=t.substring(u),y=d.indexOf(`\n`);y===-1?f=\"-\":t===d||y!==d.length-1?(f=\"+\",r&&r()):f=\"\",d&&(t=t.slice(0,-d.length),d[d.length-1]===`\n`&&(d=d.slice(0,-1)),d=d.replace(Es,`$&${c}`));let h=!1,m,S=-1;for(m=0;m<t.length;++m){let A=t[m];if(A===\" \")h=!0;else if(A===`\n`)S=m;else break}let k=t.substring(0,S<m?S+1:m);k&&(t=t.substring(k.length),k=k.replace(/\\n+/g,`$&${c}`));let O=(h?c?\"2\":\"1\":\"\")+f;if(s&&(O+=\" \"+l(s.replace(/ ?[\\r\\n]+/g,\" \")),i&&i()),!p){let A=t.replace(/\\n+/g,`\n$&`).replace(/(?:^|\\n)([\\t ].*)(?:([\\n\\t ]*)\\n(?![\\n\\t ]))?/g,\"$1$2\").replace(/\\n+/g,`$&${c}`),T=!1,$=Pt(n,!0);o!==\"folded\"&&e!==b.BLOCK_FOLDED&&($.onOverflow=()=>{T=!0});let w=st(`${k}${A}${d}`,c,$t,$);if(!T)return`>${O}\n${c}${w}`}return t=t.replace(/\\n+/g,`$&${c}`),`|${O}\n${c}${k}${t}${d}`}function Qi(s,e,t,n){let{type:i,value:r}=s,{actualString:o,implicitKey:l,indent:a,indentStep:c,inFlow:p}=e;if(l&&r.includes(`\n`)||p&&/[[\\]{},]/.test(r))return je(r,e);if(/^[\\n\\t ,[\\]{}#&*!|>'\"%@`]|^[?-]$|^[?-][ \\t]|[\\n:][ \\t]|[ \\t]\\n|[\\n\\t ]#|[\\n\\t :]$/.test(r))return l||p||!r.includes(`\n`)?je(r,e):_t(s,e,t,n);if(!l&&!p&&i!==b.PLAIN&&r.includes(`\n`))return _t(s,e,t,n);if(Mt(r)){if(a===\"\")return e.forceBlockIndent=!0,_t(s,e,t,n);if(l&&a===c)return je(r,e)}let f=r.replace(/\\n+/g,`$&\n${a}`);if(o){let u=h=>h.default&&h.tag!==\"tag:yaml.org,2002:str\"&&h.test?.test(f),{compat:d,tags:y}=e.doc.schema;if(y.some(u)||d?.some(u))return je(r,e)}return l?f:st(f,a,Os,Pt(e,!1))}function fe(s,e,t,n){let{implicitKey:i,inFlow:r}=e,o=typeof s.value==\"string\"?s:Object.assign({},s,{value:String(s.value)}),{type:l}=s;l!==b.QUOTE_DOUBLE&&/[\\x00-\\x08\\x0b-\\x1f\\x7f-\\x9f\\u{D800}-\\u{DFFF}]/u.test(o.value)&&(l=b.QUOTE_DOUBLE);let a=p=>{switch(p){case b.BLOCK_FOLDED:case b.BLOCK_LITERAL:return i||r?je(o.value,e):_t(o,e,t,n);case b.QUOTE_DOUBLE:return nt(o.value,e);case b.QUOTE_SINGLE:return As(o.value,e);case b.PLAIN:return Qi(o,e,t,n);default:return null}},c=a(l);if(c===null){let{defaultKeyType:p,defaultStringType:f}=e.options,u=i&&p||f;if(c=a(u),c===null)throw new Error(`Unsupported default string type ${u}`)}return c}var Pt,Mt,Es,it=g(()=>{M();An();Pt=(s,e)=>({indentAtStart:e?s.indent.length:s.indentAtStart,lineWidth:s.options.lineWidth,minContentWidth:s.options.minContentWidth}),Mt=s=>/^(%|---|\\.\\.\\.)/m.test(s);try{Es=new RegExp(`(^|(?<!\n))\n+(?!\n|$)`,\"g\")}catch{Es=/\\n+(?!\\n|$)/g}});function Bt(s,e){let t=Object.assign({blockQuote:!0,commentString:Nn,defaultKeyType:null,defaultStringType:\"PLAIN\",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:\"false\",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:\"null\",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:\"true\",verifyAliasOrder:!0},s.schema.toStringOptions,e),n;switch(t.collectionStyle){case\"block\":n=!1;break;case\"flow\":n=!0;break;default:n=null}return{anchors:new Set,doc:s,flowCollectionPadding:t.flowCollectionPadding?\" \":\"\",indent:\"\",indentStep:typeof t.indent==\"number\"?\" \".repeat(t.indent):\"  \",inFlow:n,options:t}}function Gi(s,e){if(e.tag){let i=s.filter(r=>r.tag===e.tag);if(i.length>0)return i.find(r=>r.format===e.format)??i[0]}let t,n;if(E(e)){n=e.value;let i=s.filter(r=>r.identify?.(n));if(i.length>1){let r=i.filter(o=>o.test);r.length>0&&(i=r)}t=i.find(r=>r.format===e.format)??i.find(r=>!r.format)}else n=e,t=s.find(i=>i.nodeClass&&n instanceof i.nodeClass);if(!t){let i=n?.constructor?.name??(n===null?\"null\":typeof n);throw new Error(`Tag not resolved for ${i} value`)}return t}function Wi(s,e,{anchors:t,doc:n}){if(!n.directives)return\"\";let i=[],r=(E(s)||v(s))&&s.anchor;r&&Et(r)&&(t.add(r),i.push(`&${r}`));let o=s.tag??(e.default?null:e.tag);return o&&i.push(n.directives.tagString(o)),i.join(\" \")}function ue(s,e,t,n){if(I(s))return s.toString(e,t,n);if(V(s)){if(e.doc.directives)return s.toString(e);if(e.resolvedAliases?.has(s))throw new TypeError(\"Cannot stringify circular structure without alias nodes\");e.resolvedAliases?e.resolvedAliases.add(s):e.resolvedAliases=new Set([s]),s=s.resolve(e.doc)}let i,r=L(s)?s:e.doc.createNode(s,{onTagObj:a=>i=a});i??(i=Gi(e.doc.schema.tags,r));let o=Wi(r,i,e);o.length>0&&(e.indentAtStart=(e.indentAtStart??0)+o.length+1);let l=typeof i.stringify==\"function\"?i.stringify(r,e,t,n):E(r)?fe(r,e,t,n):r.toString(e,t,n);return o?E(r)||l[0]===\"{\"||l[0]===\"[\"?`${o} ${l}`:`${o}\n${e.indent}${l}`:l}var rt=g(()=>{Tt();C();et();it()});function En({key:s,value:e},t,n,i){let{allNullValues:r,doc:o,indent:l,indentStep:a,options:{commentString:c,indentSeq:p,simpleKeys:f}}=t,u=L(s)&&s.comment||null;if(f){if(u)throw new Error(\"With simple keys, key nodes cannot have comments\");if(v(s)||!L(s)&&typeof s==\"object\"){let $=\"With simple keys, collection cannot be used as a key value\";throw new Error($)}}let d=!f&&(!s||u&&e==null&&!t.inFlow||v(s)||(E(s)?s.type===b.BLOCK_FOLDED||s.type===b.BLOCK_LITERAL:typeof s==\"object\"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!d&&(f||!r),indent:l+a});let y=!1,h=!1,m=ue(s,t,()=>y=!0,()=>h=!0);if(!d&&!t.inFlow&&m.length>1024){if(f)throw new Error(\"With simple keys, single line scalar must not span more than 1024 characters\");d=!0}if(t.inFlow){if(r||e==null)return y&&n&&n(),m===\"\"?\"?\":d?`? ${m}`:m}else if(r&&!f||e==null&&d)return m=`? ${m}`,u&&!y?m+=re(m,t.indent,c(u)):h&&i&&i(),m;y&&(u=null),d?(u&&(m+=re(m,t.indent,c(u))),m=`? ${m}\n${l}:`):(m=`${m}:`,u&&(m+=re(m,t.indent,c(u))));let S,k,N;L(e)?(S=!!e.spaceBefore,k=e.commentBefore,N=e.comment):(S=!1,k=null,N=null,e&&typeof e==\"object\"&&(e=o.createNode(e))),t.implicitKey=!1,!d&&!u&&E(e)&&(t.indentAtStart=m.length+1),h=!1,!p&&a.length>=2&&!t.inFlow&&!d&&Q(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let O=!1,A=ue(e,t,()=>O=!0,()=>h=!0),T=\" \";if(u||S||k){if(T=S?`\n`:\"\",k){let $=c(k);T+=`\n${W($,t.indent)}`}A===\"\"&&!t.inFlow?T===`\n`&&N&&(T=`\n\n`):T+=`\n${t.indent}`}else if(!d&&v(e)){let $=A[0],w=A.indexOf(`\n`),B=w!==-1,he=t.inFlow??e.flow??e.items.length===0;if(B||!he){let _e=!1;if(B&&($===\"&\"||$===\"!\")){let D=A.indexOf(\" \");$===\"&\"&&D!==-1&&D<w&&A[D+1]===\"!\"&&(D=A.indexOf(\" \",D+1)),(D===-1||w<D)&&(_e=!0)}_e||(T=`\n${t.indent}`)}}else(A===\"\"||A[0]===`\n`)&&(T=\"\");return m+=T+A,t.inFlow?O&&n&&n():N&&!O?m+=re(m,t.indent,c(N)):h&&i&&i(),m}var Tn=g(()=>{C();M();rt();et()});function Dt(s,e){(s===\"debug\"||s===\"warn\")&&console.warn(e)}var Ts=g(()=>{});function Ls(s,e,t){let n=Ln(s,t);if(Q(n))for(let i of n.items)Is(s,e,i);else if(Array.isArray(n))for(let i of n)Is(s,e,i);else Is(s,e,n)}function Is(s,e,t){let n=Ln(s,t);if(!Y(n))throw new Error(\"Merge sources must be maps or map aliases\");let i=n.toJSON(null,s,Map);for(let[r,o]of i)e instanceof Map?e.has(r)||e.set(r,o):e instanceof Set?e.add(r):Object.prototype.hasOwnProperty.call(e,r)||Object.defineProperty(e,r,{value:o,writable:!0,enumerable:!0,configurable:!0});return e}function Ln(s,e){return s&&V(e)?e.resolve(s.doc,s):e}var Kt,z,In,jt=g(()=>{C();M();Kt=\"<<\",z={identify:s=>s===Kt||typeof s==\"symbol\"&&s.description===Kt,default:\"key\",tag:\"tag:yaml.org,2002:merge\",test:/^<<$/,resolve:()=>Object.assign(new b(Symbol(Kt)),{addToJSMap:Ls}),stringify:()=>Kt},In=(s,e)=>(z.identify(e)||E(e)&&(!e.type||e.type===b.PLAIN)&&z.identify(e.value))&&s?.doc.schema.tags.some(t=>t.tag===z.tag&&t.default)});function qt(s,e,{key:t,value:n}){if(L(t)&&t.addToJSMap)t.addToJSMap(s,e,n);else if(In(s,t))Ls(s,e,n);else{let i=K(t,\"\",s);if(e instanceof Map)e.set(i,K(n,i,s));else if(e instanceof Set)e.add(i);else{let r=Hi(t,i,s),o=K(n,r,s);r in e?Object.defineProperty(e,r,{value:o,writable:!0,enumerable:!0,configurable:!0}):e[r]=o}}return e}function Hi(s,e,t){if(e===null)return\"\";if(typeof e!=\"object\")return String(e);if(L(s)&&t?.doc){let n=Bt(t.doc,{});n.anchors=new Set;for(let r of t.anchors.keys())n.anchors.add(r.anchor);n.inFlow=!0,n.inStringifyKey=!0;let i=s.toString(n);if(!t.mapKeyWarned){let r=JSON.stringify(i);r.length>40&&(r=r.substring(0,36)+'...\"'),Dt(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${r}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}var Cs=g(()=>{Ts();jt();rt();C();me()});function qe(s,e,t){let n=ce(s,void 0,t),i=ce(e,void 0,t);return new _(n,i)}var _,ge=g(()=>{ze();Tn();Cs();C();_=class s{constructor(e,t=null){Object.defineProperty(this,R,{value:bs}),this.key=e,this.value=t}clone(e){let{key:t,value:n}=this;return L(t)&&(t=t.clone(e)),L(n)&&(n=n.clone(e)),new s(t,n)}toJSON(e,t){let n=t?.mapAsMap?new Map:{};return qt(t,n,this)}toString(e,t,n){return e?.doc?En(this,e,t,n):JSON.stringify(this)}}});function Ft(s,e,t){return(e.inFlow??s.flow?zi:Xi)(s,e,t)}function Xi({comment:s,items:e},t,{blockItemPrefix:n,flowChars:i,itemIndent:r,onChompKeep:o,onComment:l}){let{indent:a,options:{commentString:c}}=t,p=Object.assign({},t,{indent:r,type:null}),f=!1,u=[];for(let y=0;y<e.length;++y){let h=e[y],m=null;if(L(h))!f&&h.spaceBefore&&u.push(\"\"),Rt(t,u,h.commentBefore,f),h.comment&&(m=h.comment);else if(I(h)){let k=L(h.key)?h.key:null;k&&(!f&&k.spaceBefore&&u.push(\"\"),Rt(t,u,k.commentBefore,f))}f=!1;let S=ue(h,p,()=>m=null,()=>f=!0);m&&(S+=re(S,r,c(m))),f&&m&&(f=!1),u.push(n+S)}let d;if(u.length===0)d=i.start+i.end;else{d=u[0];for(let y=1;y<u.length;++y){let h=u[y];d+=h?`\n${a}${h}`:`\n`}}return s?(d+=`\n`+W(c(s),a),l&&l()):f&&o&&o(),d}function zi({items:s},e,{flowChars:t,itemIndent:n}){let{indent:i,indentStep:r,flowCollectionPadding:o,options:{commentString:l}}=e;n+=r;let a=Object.assign({},e,{indent:n,inFlow:!0,type:null}),c=!1,p=0,f=[];for(let y=0;y<s.length;++y){let h=s[y],m=null;if(L(h))h.spaceBefore&&f.push(\"\"),Rt(e,f,h.commentBefore,!1),h.comment&&(m=h.comment);else if(I(h)){let k=L(h.key)?h.key:null;k&&(k.spaceBefore&&f.push(\"\"),Rt(e,f,k.commentBefore,!1),k.comment&&(c=!0));let N=L(h.value)?h.value:null;N?(N.comment&&(m=N.comment),N.commentBefore&&(c=!0)):h.value==null&&k?.comment&&(m=k.comment)}m&&(c=!0);let S=ue(h,a,()=>m=null);c||(c=f.length>p||S.includes(`\n`)),y<s.length-1?S+=\",\":e.options.trailingComma&&(e.options.lineWidth>0&&(c||(c=f.reduce((k,N)=>k+N.length+2,2)+(S.length+2)>e.options.lineWidth)),c&&(S+=\",\")),m&&(S+=re(S,n,l(m))),f.push(S),p=f.length}let{start:u,end:d}=t;if(f.length===0)return u+d;if(!c){let y=f.reduce((h,m)=>h+m.length+2,2);c=e.options.lineWidth>0&&y>e.options.lineWidth}if(c){let y=u;for(let h of f)y+=h?`\n${r}${i}${h}`:`\n`;return`${y}\n${i}${d}`}else return`${u}${o}${f.join(\" \")}${o}${d}`}function Rt({indent:s,options:{commentString:e}},t,n,i){if(n&&i&&(n=n.replace(/^\\n+/,\"\")),n){let r=W(e(n),s);t.push(r.trimStart())}}var vs=g(()=>{C();rt();et()});function ye(s,e){let t=E(e)?e.value:e;for(let n of s)if(I(n)&&(n.key===e||n.key===t||E(n.key)&&n.key.value===t))return n}var P,be=g(()=>{vs();Cs();vt();C();ge();M();P=class extends De{static get tagName(){return\"tag:yaml.org,2002:map\"}constructor(e){super(H,e),this.items=[]}static from(e,t,n){let{keepUndefined:i,replacer:r}=n,o=new this(e),l=(a,c)=>{if(typeof r==\"function\")c=r.call(t,a,c);else if(Array.isArray(r)&&!r.includes(a))return;(c!==void 0||i)&&o.items.push(qe(a,c,n))};if(t instanceof Map)for(let[a,c]of t)l(a,c);else if(t&&typeof t==\"object\")for(let a of Object.keys(t))l(a,t[a]);return typeof e.sortMapEntries==\"function\"&&o.items.sort(e.sortMapEntries),o}add(e,t){let n;I(e)?n=e:!e||typeof e!=\"object\"||!(\"key\"in e)?n=new _(e,e?.value):n=new _(e.key,e.value);let i=ye(this.items,n.key),r=this.schema?.sortMapEntries;if(i){if(!t)throw new Error(`Key ${n.key} already set`);E(i.value)&&Ct(n.value)?i.value.value=n.value:i.value=n.value}else if(r){let o=this.items.findIndex(l=>r(n,l)<0);o===-1?this.items.push(n):this.items.splice(o,0,n)}else this.items.push(n)}delete(e){let t=ye(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){let i=ye(this.items,e)?.value;return(!t&&E(i)?i.value:i)??void 0}has(e){return!!ye(this.items,e)}set(e,t){this.add(new _(e,t),!0)}toJSON(e,t,n){let i=n?new n:t?.mapAsMap?new Map:{};t?.onCreate&&t.onCreate(i);for(let r of this.items)qt(t,i,r);return i}toString(e,t,n){if(!e)return JSON.stringify(this);for(let i of this.items)if(!I(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),Ft(this,e,{blockItemPrefix:\"\",flowChars:{start:\"{\",end:\"}\"},itemIndent:e.indent||\"\",onChompKeep:n,onComment:t})}}});var Z,Re=g(()=>{C();be();Z={collection:\"map\",default:!0,nodeClass:P,tag:\"tag:yaml.org,2002:map\",resolve(s,e){return Y(s)||e(\"Expected a mapping for this tag\"),s},createNode:(s,e,t)=>P.from(s,e,t)}});function xt(s){let e=E(s)?s.value:s;return e&&typeof e==\"string\"&&(e=Number(e)),typeof e==\"number\"&&Number.isInteger(e)&&e>=0?e:null}var j,we=g(()=>{ze();vs();vt();C();M();me();j=class extends De{static get tagName(){return\"tag:yaml.org,2002:seq\"}constructor(e){super(ae,e),this.items=[]}add(e){this.items.push(e)}delete(e){let t=xt(e);return typeof t!=\"number\"?!1:this.items.splice(t,1).length>0}get(e,t){let n=xt(e);if(typeof n!=\"number\")return;let i=this.items[n];return!t&&E(i)?i.value:i}has(e){let t=xt(e);return typeof t==\"number\"&&t<this.items.length}set(e,t){let n=xt(e);if(typeof n!=\"number\")throw new Error(`Expected a valid index, not ${e}.`);let i=this.items[n];E(i)&&Ct(t)?i.value=t:this.items[n]=t}toJSON(e,t){let n=[];t?.onCreate&&t.onCreate(n);let i=0;for(let r of this.items)n.push(K(r,String(i++),t));return n}toString(e,t,n){return e?Ft(this,e,{blockItemPrefix:\"- \",flowChars:{start:\"[\",end:\"]\"},itemIndent:(e.indent||\"\")+\"  \",onChompKeep:n,onComment:t}):JSON.stringify(this)}static from(e,t,n){let{replacer:i}=n,r=new this(e);if(t&&Symbol.iterator in Object(t)){let o=0;for(let l of t){if(typeof i==\"function\"){let a=t instanceof Set?l:String(o++);l=i.call(t,a,l)}r.items.push(ce(l,void 0,n))}}return r}}});var ee,Fe=g(()=>{C();we();ee={collection:\"seq\",default:!0,nodeClass:j,tag:\"tag:yaml.org,2002:seq\",resolve(s,e){return Q(s)||e(\"Expected a sequence for this tag\"),s},createNode:(s,e,t)=>j.from(s,e,t)}});var Se,ot=g(()=>{it();Se={identify:s=>typeof s==\"string\",default:!0,tag:\"tag:yaml.org,2002:str\",resolve:s=>s,stringify(s,e,t,n){return e=Object.assign({actualString:!0},e),fe(s,e,t,n)}}});var Te,Ut=g(()=>{M();Te={identify:s=>s==null,createNode:()=>new b(null),default:!0,tag:\"tag:yaml.org,2002:null\",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new b(null),stringify:({source:s},e)=>typeof s==\"string\"&&Te.test.test(s)?s:e.options.nullStr}});var lt,$s=g(()=>{M();lt={identify:s=>typeof s==\"boolean\",default:!0,tag:\"tag:yaml.org,2002:bool\",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:s=>new b(s[0]===\"t\"||s[0]===\"T\"),stringify({source:s,value:e},t){if(s&&lt.test.test(s)){let n=s[0]===\"t\"||s[0]===\"T\";if(e===n)return s}return e?t.options.trueStr:t.options.falseStr}}});function q({format:s,minFractionDigits:e,tag:t,value:n}){if(typeof n==\"bigint\")return String(n);let i=typeof n==\"number\"?n:Number(n);if(!isFinite(i))return isNaN(i)?\".nan\":i<0?\"-.inf\":\".inf\";let r=Object.is(n,-0)?\"-0\":JSON.stringify(n);if(!s&&e&&(!t||t===\"tag:yaml.org,2002:float\")&&/^-?\\d/.test(r)&&!r.includes(\"e\")){let o=r.indexOf(\".\");o<0&&(o=r.length,r+=\".\");let l=e-(r.length-o-1);for(;l-- >0;)r+=\"0\"}return r}var xe=g(()=>{});var Vt,Jt,Yt,_s=g(()=>{M();xe();Vt={identify:s=>typeof s==\"number\",default:!0,tag:\"tag:yaml.org,2002:float\",test:/^(?:[-+]?\\.(?:inf|Inf|INF)|\\.nan|\\.NaN|\\.NAN)$/,resolve:s=>s.slice(-3).toLowerCase()===\"nan\"?NaN:s[0]===\"-\"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:q},Jt={identify:s=>typeof s==\"number\",default:!0,tag:\"tag:yaml.org,2002:float\",format:\"EXP\",test:/^[-+]?(?:\\.[0-9]+|[0-9]+(?:\\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:s=>parseFloat(s),stringify(s){let e=Number(s.value);return isFinite(e)?e.toExponential():q(s)}},Yt={identify:s=>typeof s==\"number\",default:!0,tag:\"tag:yaml.org,2002:float\",test:/^[-+]?(?:\\.[0-9]+|[0-9]+\\.[0-9]*)$/,resolve(s){let e=new b(parseFloat(s)),t=s.indexOf(\".\");return t!==-1&&s[s.length-1]===\"0\"&&(e.minFractionDigits=s.length-t-1),e},stringify:q}});function Cn(s,e,t){let{value:n}=s;return Qt(n)&&n>=0?t+n.toString(e):q(s)}var Qt,Ps,Gt,Wt,Ht,Ms=g(()=>{xe();Qt=s=>typeof s==\"bigint\"||Number.isInteger(s),Ps=(s,e,t,{intAsBigInt:n})=>n?BigInt(s):parseInt(s.substring(e),t);Gt={identify:s=>Qt(s)&&s>=0,default:!0,tag:\"tag:yaml.org,2002:int\",format:\"OCT\",test:/^0o[0-7]+$/,resolve:(s,e,t)=>Ps(s,2,8,t),stringify:s=>Cn(s,8,\"0o\")},Wt={identify:Qt,default:!0,tag:\"tag:yaml.org,2002:int\",test:/^[-+]?[0-9]+$/,resolve:(s,e,t)=>Ps(s,0,10,t),stringify:q},Ht={identify:s=>Qt(s)&&s>=0,default:!0,tag:\"tag:yaml.org,2002:int\",format:\"HEX\",test:/^0x[0-9a-fA-F]+$/,resolve:(s,e,t)=>Ps(s,2,16,t),stringify:s=>Cn(s,16,\"0x\")}});var vn,$n=g(()=>{Re();Ut();Fe();ot();$s();_s();Ms();vn=[Z,ee,Se,Te,lt,Gt,Wt,Ht,Vt,Jt,Yt]});function _n(s){return typeof s==\"bigint\"||Number.isInteger(s)}var Xt,Zi,er,Pn,Mn=g(()=>{M();Re();Fe();Xt=({value:s})=>JSON.stringify(s),Zi=[{identify:s=>typeof s==\"string\",default:!0,tag:\"tag:yaml.org,2002:str\",resolve:s=>s,stringify:Xt},{identify:s=>s==null,createNode:()=>new b(null),default:!0,tag:\"tag:yaml.org,2002:null\",test:/^null$/,resolve:()=>null,stringify:Xt},{identify:s=>typeof s==\"boolean\",default:!0,tag:\"tag:yaml.org,2002:bool\",test:/^true$|^false$/,resolve:s=>s===\"true\",stringify:Xt},{identify:_n,default:!0,tag:\"tag:yaml.org,2002:int\",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(s,e,{intAsBigInt:t})=>t?BigInt(s):parseInt(s,10),stringify:({value:s})=>_n(s)?s.toString():JSON.stringify(s)},{identify:s=>typeof s==\"number\",default:!0,tag:\"tag:yaml.org,2002:float\",test:/^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:s=>parseFloat(s),stringify:Xt}],er={default:!0,tag:\"\",test:/^/,resolve(s,e){return e(`Unresolved plain scalar ${JSON.stringify(s)}`),s}},Pn=[Z,ee].concat(Zi,er)});var at,Bs=g(()=>{M();it();at={identify:s=>s instanceof Uint8Array,default:!1,tag:\"tag:yaml.org,2002:binary\",resolve(s,e){if(typeof atob==\"function\"){let t=atob(s.replace(/[\\n\\r]/g,\"\")),n=new Uint8Array(t.length);for(let i=0;i<t.length;++i)n[i]=t.charCodeAt(i);return n}else return e(\"This environment does not support reading binary tags; either Buffer or atob is required\"),s},stringify({comment:s,type:e,value:t},n,i,r){if(!t)return\"\";let o=t,l;if(typeof btoa==\"function\"){let a=\"\";for(let c=0;c<o.length;++c)a+=String.fromCharCode(o[c]);l=btoa(a)}else throw new Error(\"This environment does not support writing binary tags; either Buffer or btoa is required\");if(e??(e=b.BLOCK_LITERAL),e!==b.QUOTE_DOUBLE){let a=Math.max(n.options.lineWidth-n.indent.length,n.options.minContentWidth),c=Math.ceil(l.length/a),p=new Array(c);for(let f=0,u=0;f<c;++f,u+=a)p[f]=l.substr(u,a);l=p.join(e===b.BLOCK_LITERAL?`\n`:\" \")}return fe({comment:s,type:e,value:l},n,i,r)}}});function Ds(s,e){if(Q(s))for(let t=0;t<s.items.length;++t){let n=s.items[t];if(!I(n)){if(Y(n)){n.items.length>1&&e(\"Each pair must have its own sequence indicator\");let i=n.items[0]||new _(new b(null));if(n.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${n.commentBefore}\n${i.key.commentBefore}`:n.commentBefore),n.comment){let r=i.value??i.key;r.comment=r.comment?`${n.comment}\n${r.comment}`:n.comment}n=i}s.items[t]=I(n)?n:new _(n)}}else e(\"Expected a sequence for this tag\");return s}function Ks(s,e,t){let{replacer:n}=t,i=new j(s);i.tag=\"tag:yaml.org,2002:pairs\";let r=0;if(e&&Symbol.iterator in Object(e))for(let o of e){typeof n==\"function\"&&(o=n.call(e,String(r++),o));let l,a;if(Array.isArray(o))if(o.length===2)l=o[0],a=o[1];else throw new TypeError(`Expected [key, value] tuple: ${o}`);else if(o&&o instanceof Object){let c=Object.keys(o);if(c.length===1)l=c[0],a=o[l];else throw new TypeError(`Expected tuple with one key, not ${c.length} keys`)}else l=o;i.items.push(qe(l,a,t))}return i}var ct,zt=g(()=>{C();ge();M();we();ct={collection:\"seq\",default:!1,tag:\"tag:yaml.org,2002:pairs\",resolve:Ds,createNode:Ks}});var Ue,ft,js=g(()=>{C();me();be();we();zt();Ue=class s extends j{constructor(){super(),this.add=P.prototype.add.bind(this),this.delete=P.prototype.delete.bind(this),this.get=P.prototype.get.bind(this),this.has=P.prototype.has.bind(this),this.set=P.prototype.set.bind(this),this.tag=s.tag}toJSON(e,t){if(!t)return super.toJSON(e);let n=new Map;t?.onCreate&&t.onCreate(n);for(let i of this.items){let r,o;if(I(i)?(r=K(i.key,\"\",t),o=K(i.value,r,t)):r=K(i,\"\",t),n.has(r))throw new Error(\"Ordered maps must not include duplicate keys\");n.set(r,o)}return n}static from(e,t,n){let i=Ks(e,t,n),r=new this;return r.items=i.items,r}};Ue.tag=\"tag:yaml.org,2002:omap\";ft={collection:\"seq\",identify:s=>s instanceof Map,nodeClass:Ue,default:!1,tag:\"tag:yaml.org,2002:omap\",resolve(s,e){let t=Ds(s,e),n=[];for(let{key:i}of t.items)E(i)&&(n.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):n.push(i.value));return Object.assign(new Ue,t)},createNode:(s,e,t)=>Ue.from(s,e,t)}});function Bn({value:s,source:e},t){return e&&(s?qs:Rs).test.test(e)?e:s?t.options.trueStr:t.options.falseStr}var qs,Rs,Dn=g(()=>{M();qs={identify:s=>s===!0,default:!0,tag:\"tag:yaml.org,2002:bool\",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new b(!0),stringify:Bn},Rs={identify:s=>s===!1,default:!0,tag:\"tag:yaml.org,2002:bool\",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new b(!1),stringify:Bn}});var Kn,jn,qn,Rn=g(()=>{M();xe();Kn={identify:s=>typeof s==\"number\",default:!0,tag:\"tag:yaml.org,2002:float\",test:/^(?:[-+]?\\.(?:inf|Inf|INF)|\\.nan|\\.NaN|\\.NAN)$/,resolve:s=>s.slice(-3).toLowerCase()===\"nan\"?NaN:s[0]===\"-\"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:q},jn={identify:s=>typeof s==\"number\",default:!0,tag:\"tag:yaml.org,2002:float\",format:\"EXP\",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:s=>parseFloat(s.replace(/_/g,\"\")),stringify(s){let e=Number(s.value);return isFinite(e)?e.toExponential():q(s)}},qn={identify:s=>typeof s==\"number\",default:!0,tag:\"tag:yaml.org,2002:float\",test:/^[-+]?(?:[0-9][0-9_]*)?\\.[0-9_]*$/,resolve(s){let e=new b(parseFloat(s.replace(/_/g,\"\"))),t=s.indexOf(\".\");if(t!==-1){let n=s.substring(t+1).replace(/_/g,\"\");n[n.length-1]===\"0\"&&(e.minFractionDigits=n.length)}return e},stringify:q}});function Zt(s,e,t,{intAsBigInt:n}){let i=s[0];if((i===\"-\"||i===\"+\")&&(e+=1),s=s.substring(e).replace(/_/g,\"\"),n){switch(t){case 2:s=`0b${s}`;break;case 8:s=`0o${s}`;break;case 16:s=`0x${s}`;break}let o=BigInt(s);return i===\"-\"?BigInt(-1)*o:o}let r=parseInt(s,t);return i===\"-\"?-1*r:r}function Fs(s,e,t){let{value:n}=s;if(ut(n)){let i=n.toString(e);return n<0?\"-\"+t+i.substr(1):t+i}return q(s)}var ut,Fn,xn,Un,Vn,Jn=g(()=>{xe();ut=s=>typeof s==\"bigint\"||Number.isInteger(s);Fn={identify:ut,default:!0,tag:\"tag:yaml.org,2002:int\",format:\"BIN\",test:/^[-+]?0b[0-1_]+$/,resolve:(s,e,t)=>Zt(s,2,2,t),stringify:s=>Fs(s,2,\"0b\")},xn={identify:ut,default:!0,tag:\"tag:yaml.org,2002:int\",format:\"OCT\",test:/^[-+]?0[0-7_]+$/,resolve:(s,e,t)=>Zt(s,1,8,t),stringify:s=>Fs(s,8,\"0\")},Un={identify:ut,default:!0,tag:\"tag:yaml.org,2002:int\",test:/^[-+]?[0-9][0-9_]*$/,resolve:(s,e,t)=>Zt(s,0,10,t),stringify:q},Vn={identify:ut,default:!0,tag:\"tag:yaml.org,2002:int\",format:\"HEX\",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(s,e,t)=>Zt(s,2,16,t),stringify:s=>Fs(s,16,\"0x\")}});var Ve,ht,xs=g(()=>{C();ge();be();Ve=class s extends P{constructor(e){super(e),this.tag=s.tag}add(e){let t;I(e)?t=e:e&&typeof e==\"object\"&&\"key\"in e&&\"value\"in e&&e.value===null?t=new _(e.key,null):t=new _(e,null),ye(this.items,t.key)||this.items.push(t)}get(e,t){let n=ye(this.items,e);return!t&&I(n)?E(n.key)?n.key.value:n.key:n}set(e,t){if(typeof t!=\"boolean\")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);let n=ye(this.items,e);n&&!t?this.items.splice(this.items.indexOf(n),1):!n&&t&&this.items.push(new _(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,n){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,n);throw new Error(\"Set items must all have null values\")}static from(e,t,n){let{replacer:i}=n,r=new this(e);if(t&&Symbol.iterator in Object(t))for(let o of t)typeof i==\"function\"&&(o=i.call(t,o,o)),r.items.push(qe(o,null,n));return r}};Ve.tag=\"tag:yaml.org,2002:set\";ht={collection:\"map\",identify:s=>s instanceof Set,nodeClass:Ve,default:!1,tag:\"tag:yaml.org,2002:set\",createNode:(s,e,t)=>Ve.from(s,e,t),resolve(s,e){if(Y(s)){if(s.hasAllNullValues(!0))return Object.assign(new Ve,s);e(\"Set items must all have null values\")}else e(\"Expected a mapping for this tag\");return s}}});function Us(s,e){let t=s[0],n=t===\"-\"||t===\"+\"?s.substring(1):s,i=o=>e?BigInt(o):Number(o),r=n.replace(/_/g,\"\").split(\":\").reduce((o,l)=>o*i(60)+i(l),i(0));return t===\"-\"?i(-1)*r:r}function Yn(s){let{value:e}=s,t=o=>o;if(typeof e==\"bigint\")t=o=>BigInt(o);else if(isNaN(e)||!isFinite(e))return q(s);let n=\"\";e<0&&(n=\"-\",e*=t(-1));let i=t(60),r=[e%i];return e<60?r.unshift(0):(e=(e-r[0])/i,r.unshift(e%i),e>=60&&(e=(e-r[0])/i,r.unshift(e))),n+r.map(o=>String(o).padStart(2,\"0\")).join(\":\").replace(/000000\\d*$/,\"\")}var es,ts,Je,Vs=g(()=>{xe();es={identify:s=>typeof s==\"bigint\"||Number.isInteger(s),default:!0,tag:\"tag:yaml.org,2002:int\",format:\"TIME\",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(s,e,{intAsBigInt:t})=>Us(s,t),stringify:Yn},ts={identify:s=>typeof s==\"number\",default:!0,tag:\"tag:yaml.org,2002:float\",format:\"TIME\",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*$/,resolve:s=>Us(s,!1),stringify:Yn},Je={identify:s=>s instanceof Date,default:!0,tag:\"tag:yaml.org,2002:timestamp\",test:RegExp(\"^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\\\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\\\.[0-9]+)?)(?:[ \\\\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$\"),resolve(s){let e=s.match(Je.test);if(!e)throw new Error(\"!!timestamp expects a date, starting with yyyy-mm-dd\");let[,t,n,i,r,o,l]=e.map(Number),a=e[7]?Number((e[7]+\"00\").substr(1,3)):0,c=Date.UTC(t,n-1,i,r||0,o||0,l||0,a),p=e[8];if(p&&p!==\"Z\"){let f=Us(p,!1);Math.abs(f)<30&&(f*=60),c-=6e4*f}return new Date(c)},stringify:({value:s})=>s?.toISOString().replace(/(T00:00:00)?\\.000Z$/,\"\")??\"\"}});var Js,Qn=g(()=>{Re();Ut();Fe();ot();Bs();Dn();Rn();Jn();jt();js();zt();xs();Vs();Js=[Z,ee,Se,Te,qs,Rs,Fn,xn,Un,Vn,Kn,jn,qn,at,z,ft,ct,ht,es,ts,Je]});function ss(s,e,t){let n=Gn.get(e);if(n&&!s)return t&&!n.includes(z)?n.concat(z):n.slice();let i=n;if(!i)if(Array.isArray(s))i=[];else{let r=Array.from(Gn.keys()).filter(o=>o!==\"yaml11\").map(o=>JSON.stringify(o)).join(\", \");throw new Error(`Unknown schema \"${e}\"; use one of ${r} or define customTags array`)}if(Array.isArray(s))for(let r of s)i=i.concat(r);else typeof s==\"function\"&&(i=s(i.slice()));return t&&(i=i.concat(z)),i.reduce((r,o)=>{let l=typeof o==\"string\"?Wn[o]:o;if(!l){let a=JSON.stringify(o),c=Object.keys(Wn).map(p=>JSON.stringify(p)).join(\", \");throw new Error(`Unknown custom tag ${a}; use one of ${c}`)}return r.includes(l)||r.push(l),r},[])}var Gn,Wn,Hn,Xn=g(()=>{Re();Ut();Fe();ot();$s();_s();Ms();$n();Mn();Bs();jt();js();zt();Qn();xs();Vs();Gn=new Map([[\"core\",vn],[\"failsafe\",[Z,ee,Se]],[\"json\",Pn],[\"yaml11\",Js],[\"yaml-1.1\",Js]]),Wn={binary:at,bool:lt,float:Yt,floatExp:Jt,floatNaN:Vt,floatTime:ts,int:Wt,intHex:Ht,intOct:Gt,intTime:es,map:Z,merge:z,null:Te,omap:ft,pairs:ct,seq:ee,set:ht,timestamp:Je},Hn={\"tag:yaml.org,2002:binary\":at,\"tag:yaml.org,2002:merge\":z,\"tag:yaml.org,2002:omap\":ft,\"tag:yaml.org,2002:pairs\":ct,\"tag:yaml.org,2002:set\":ht,\"tag:yaml.org,2002:timestamp\":Je}});var tr,Ie,Ys=g(()=>{C();Re();Fe();ot();Xn();tr=(s,e)=>s.key<e.key?-1:s.key>e.key?1:0,Ie=class s{constructor({compat:e,customTags:t,merge:n,resolveKnownTags:i,schema:r,sortMapEntries:o,toStringDefaults:l}){this.compat=Array.isArray(e)?ss(e,\"compat\"):e?ss(null,e):null,this.name=typeof r==\"string\"&&r||\"core\",this.knownTags=i?Hn:{},this.tags=ss(t,this.name,n),this.toStringOptions=l??null,Object.defineProperty(this,H,{value:Z}),Object.defineProperty(this,U,{value:Se}),Object.defineProperty(this,ae,{value:ee}),this.sortMapEntries=typeof o==\"function\"?o:o===!0?tr:null}clone(){let e=Object.create(s.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}});function zn(s,e){let t=[],n=e.directives===!0;if(e.directives!==!1&&s.directives){let a=s.directives.toString(s);a?(t.push(a),n=!0):s.directives.docStart&&(n=!0)}n&&t.push(\"---\");let i=Bt(s,e),{commentString:r}=i.options;if(s.commentBefore){t.length!==1&&t.unshift(\"\");let a=r(s.commentBefore);t.unshift(W(a,\"\"))}let o=!1,l=null;if(s.contents){if(L(s.contents)){if(s.contents.spaceBefore&&n&&t.push(\"\"),s.contents.commentBefore){let p=r(s.contents.commentBefore);t.push(W(p,\"\"))}i.forceBlockIndent=!!s.comment,l=s.contents.comment}let a=l?void 0:()=>o=!0,c=ue(s.contents,i,()=>l=null,a);l&&(c+=re(c,\"\",r(l))),(c[0]===\"|\"||c[0]===\">\")&&t[t.length-1]===\"---\"?t[t.length-1]=`--- ${c}`:t.push(c)}else t.push(ue(s.contents,i));if(s.directives?.docEnd)if(s.comment){let a=r(s.comment);a.includes(`\n`)?(t.push(\"...\"),t.push(W(a,\"\"))):t.push(`... ${a}`)}else t.push(\"...\");else{let a=s.comment;a&&o&&(a=a.replace(/^\\n+/,\"\")),a&&((!o||l)&&t[t.length-1]!==\"\"&&t.push(\"\"),t.push(W(r(a),\"\")))}return t.join(`\n`)+`\n`}var Zn=g(()=>{C();rt();et()});function Ye(s){if(v(s))return!0;throw new Error(\"Expected a YAML collection as document contents\")}var te,pt=g(()=>{Xe();vt();C();ge();me();Ys();Zn();Tt();Ns();ze();ws();te=class s{constructor(e,t,n){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,R,{value:Ot});let i=null;typeof t==\"function\"||Array.isArray(t)?i=t:n===void 0&&t&&(n=t,t=void 0);let r=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:\"warn\",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:\"1.2\"},n);this.options=r;let{version:o}=r;n?._directives?(this.directives=n._directives.atDocument(),this.directives.yaml.explicit&&(o=this.directives.yaml.version)):this.directives=new ie({version:o}),this.setSchema(o,n),this.contents=e===void 0?null:this.createNode(e,i,n)}clone(){let e=Object.create(s.prototype,{[R]:{value:Ot}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=L(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){Ye(this.contents)&&this.contents.add(e)}addIn(e,t){Ye(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){let n=Ss(this);e.anchor=!t||n.has(t)?ks(t||\"a\",n):t}return new X(e.anchor)}createNode(e,t,n){let i;if(typeof t==\"function\")e=t.call({\"\":e},\"\",e),i=t;else if(Array.isArray(t)){let m=k=>typeof k==\"number\"||k instanceof String||k instanceof Number,S=t.filter(m).map(String);S.length>0&&(t=t.concat(S)),i=t}else n===void 0&&t&&(n=t,t=void 0);let{aliasDuplicateObjects:r,anchorPrefix:o,flow:l,keepUndefined:a,onTagObj:c,tag:p}=n??{},{onAnchor:f,setAnchors:u,sourceObjects:d}=kn(this,o||\"a\"),y={aliasDuplicateObjects:r??!0,keepUndefined:a??!1,onAnchor:f,onTagObj:c,replacer:i,schema:this.schema,sourceObjects:d},h=ce(e,p,y);return l&&v(h)&&(h.flow=!0),u(),h}createPair(e,t,n={}){let i=this.createNode(e,null,n),r=this.createNode(t,null,n);return new _(i,r)}delete(e){return Ye(this.contents)?this.contents.delete(e):!1}deleteIn(e){return Ke(e)?this.contents==null?!1:(this.contents=null,!0):Ye(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return v(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return Ke(e)?!t&&E(this.contents)?this.contents.value:this.contents:v(this.contents)?this.contents.getIn(e,t):void 0}has(e){return v(this.contents)?this.contents.has(e):!1}hasIn(e){return Ke(e)?this.contents!==void 0:v(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=Ze(this.schema,[e],t):Ye(this.contents)&&this.contents.set(e,t)}setIn(e,t){Ke(e)?this.contents=t:this.contents==null?this.contents=Ze(this.schema,Array.from(e),t):Ye(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e==\"number\"&&(e=String(e));let n;switch(e){case\"1.1\":this.directives?this.directives.yaml.version=\"1.1\":this.directives=new ie({version:\"1.1\"}),n={resolveKnownTags:!1,schema:\"yaml-1.1\"};break;case\"1.2\":case\"next\":this.directives?this.directives.yaml.version=e:this.directives=new ie({version:e}),n={resolveKnownTags:!0,schema:\"core\"};break;case null:this.directives&&delete this.directives,n=null;break;default:{let i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(n)this.schema=new Ie(Object.assign(n,t));else throw new Error(\"With a null YAML version, the { schema: Schema } option is required\")}toJS({json:e,jsonArg:t,mapAsMap:n,maxAliasCount:i,onAnchor:r,reviver:o}={}){let l={anchors:new Map,doc:this,keep:!e,mapAsMap:n===!0,mapKeyWarned:!1,maxAliasCount:typeof i==\"number\"?i:100},a=K(this.contents,t??\"\",l);if(typeof r==\"function\")for(let{count:c,res:p}of l.anchors.values())r(p,c);return typeof o==\"function\"?pe(o,{\"\":a},\"\",a):a}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error(\"Document with errors cannot be stringified\");if(\"indent\"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){let t=JSON.stringify(e.indent);throw new Error(`\"indent\" option must be a positive integer, not ${t}`)}return zn(this,e)}}});var Le,x,Ce,mt,dt=g(()=>{Le=class extends Error{constructor(e,t,n,i){super(),this.name=e,this.code=n,this.message=i,this.pos=t}},x=class extends Le{constructor(e,t,n){super(\"YAMLParseError\",e,t,n)}},Ce=class extends Le{constructor(e,t,n){super(\"YAMLWarning\",e,t,n)}},mt=(s,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(l=>e.linePos(l));let{line:n,col:i}=t.linePos[0];t.message+=` at line ${n}, column ${i}`;let r=i-1,o=s.substring(e.lineStarts[n-1],e.lineStarts[n]).replace(/[\\n\\r]+$/,\"\");if(r>=60&&o.length>80){let l=Math.min(r-39,o.length-79);o=\"\\u2026\"+o.substring(l),r-=l-1}if(o.length>80&&(o=o.substring(0,79)+\"\\u2026\"),n>1&&/^ *$/.test(o.substring(0,r))){let l=s.substring(e.lineStarts[n-2],e.lineStarts[n-1]);l.length>80&&(l=l.substring(0,79)+`\\u2026\n`),o=l+o}if(/[^ ]/.test(o)){let l=1,a=t.linePos[1];a?.line===n&&a.col>i&&(l=Math.max(1,Math.min(a.col-i,80-r)));let c=\" \".repeat(r)+\"^\".repeat(l);t.message+=`:\n\n${o}\n${c}\n`}}});function oe(s,{flow:e,indicator:t,next:n,offset:i,onError:r,parentIndent:o,startOnNewline:l}){let a=!1,c=l,p=l,f=\"\",u=\"\",d=!1,y=!1,h=null,m=null,S=null,k=null,N=null,O=null,A=null;for(let w of s)switch(y&&(w.type!==\"space\"&&w.type!==\"newline\"&&w.type!==\"comma\"&&r(w.offset,\"MISSING_CHAR\",\"Tags and anchors must be separated from the next token by white space\"),y=!1),h&&(c&&w.type!==\"comment\"&&w.type!==\"newline\"&&r(h,\"TAB_AS_INDENT\",\"Tabs are not allowed as indentation\"),h=null),w.type){case\"space\":!e&&(t!==\"doc-start\"||n?.type!==\"flow-collection\")&&w.source.includes(\"\t\")&&(h=w),p=!0;break;case\"comment\":{p||r(w,\"MISSING_CHAR\",\"Comments must be separated from other tokens by white space characters\");let B=w.source.substring(1)||\" \";f?f+=u+B:f=B,u=\"\",c=!1;break}case\"newline\":c?f?f+=w.source:(!O||t!==\"seq-item-ind\")&&(a=!0):u+=w.source,c=!0,d=!0,(m||S)&&(k=w),p=!0;break;case\"anchor\":m&&r(w,\"MULTIPLE_ANCHORS\",\"A node can have at most one anchor\"),w.source.endsWith(\":\")&&r(w.offset+w.source.length-1,\"BAD_ALIAS\",\"Anchor ending in : is ambiguous\",!0),m=w,A??(A=w.offset),c=!1,p=!1,y=!0;break;case\"tag\":{S&&r(w,\"MULTIPLE_TAGS\",\"A node can have at most one tag\"),S=w,A??(A=w.offset),c=!1,p=!1,y=!0;break}case t:(m||S)&&r(w,\"BAD_PROP_ORDER\",`Anchors and tags must be after the ${w.source} indicator`),O&&r(w,\"UNEXPECTED_TOKEN\",`Unexpected ${w.source} in ${e??\"collection\"}`),O=w,c=t===\"seq-item-ind\"||t===\"explicit-key-ind\",p=!1;break;case\"comma\":if(e){N&&r(w,\"UNEXPECTED_TOKEN\",`Unexpected , in ${e}`),N=w,c=!1,p=!1;break}default:r(w,\"UNEXPECTED_TOKEN\",`Unexpected ${w.type} token`),c=!1,p=!1}let T=s[s.length-1],$=T?T.offset+T.source.length:i;return y&&n&&n.type!==\"space\"&&n.type!==\"newline\"&&n.type!==\"comma\"&&(n.type!==\"scalar\"||n.source!==\"\")&&r(n.offset,\"MISSING_CHAR\",\"Tags and anchors must be separated from the next token by white space\"),h&&(c&&h.indent<=o||n?.type===\"block-map\"||n?.type===\"block-seq\")&&r(h,\"TAB_AS_INDENT\",\"Tabs are not allowed as indentation\"),{comma:N,found:O,spaceBefore:a,comment:f,hasNewline:d,anchor:m,tag:S,newlineAfterProp:k,end:$,start:A??$}}var gt=g(()=>{});function ke(s){if(!s)return null;switch(s.type){case\"alias\":case\"scalar\":case\"double-quoted-scalar\":case\"single-quoted-scalar\":if(s.source.includes(`\n`))return!0;if(s.end){for(let e of s.end)if(e.type===\"newline\")return!0}return!1;case\"flow-collection\":for(let e of s.items){for(let t of e.start)if(t.type===\"newline\")return!0;if(e.sep){for(let t of e.sep)if(t.type===\"newline\")return!0}if(ke(e.key)||ke(e.value))return!0}return!1;default:return!0}}var ns=g(()=>{});function yt(s,e,t){if(e?.type===\"flow-collection\"){let n=e.end[0];n.indent===s&&(n.source===\"]\"||n.source===\"}\")&&ke(e)&&t(n,\"BAD_INDENT\",\"Flow end indicator should be more indented than parent\",!0)}}var Qs=g(()=>{ns()});function is(s,e,t){let{uniqueKeys:n}=s.options;if(n===!1)return!1;let i=typeof n==\"function\"?n:(r,o)=>r===o||E(r)&&E(o)&&r.value===o.value;return e.some(r=>i(r.key,t))}var Gs=g(()=>{C()});function ti({composeNode:s,composeEmptyNode:e},t,n,i,r){let o=r?.nodeClass??P,l=new o(t.schema);t.atRoot&&(t.atRoot=!1);let a=n.offset,c=null;for(let p of n.items){let{start:f,key:u,sep:d,value:y}=p,h=oe(f,{indicator:\"explicit-key-ind\",next:u??d?.[0],offset:a,onError:i,parentIndent:n.indent,startOnNewline:!0}),m=!h.found;if(m){if(u&&(u.type===\"block-seq\"?i(a,\"BLOCK_AS_IMPLICIT_KEY\",\"A block sequence may not be used as an implicit map key\"):\"indent\"in u&&u.indent!==n.indent&&i(a,\"BAD_INDENT\",ei)),!h.anchor&&!h.tag&&!d){c=h.end,h.comment&&(l.comment?l.comment+=`\n`+h.comment:l.comment=h.comment);continue}(h.newlineAfterProp||ke(u))&&i(u??f[f.length-1],\"MULTILINE_IMPLICIT_KEY\",\"Implicit keys need to be on a single line\")}else h.found?.indent!==n.indent&&i(a,\"BAD_INDENT\",ei);t.atKey=!0;let S=h.end,k=u?s(t,u,h,i):e(t,S,f,null,h,i);t.schema.compat&&yt(n.indent,u,i),t.atKey=!1,is(t,l.items,k)&&i(S,\"DUPLICATE_KEY\",\"Map keys must be unique\");let N=oe(d??[],{indicator:\"map-value-ind\",next:y,offset:k.range[2],onError:i,parentIndent:n.indent,startOnNewline:!u||u.type===\"block-scalar\"});if(a=N.end,N.found){m&&(y?.type===\"block-map\"&&!N.hasNewline&&i(a,\"BLOCK_AS_IMPLICIT_KEY\",\"Nested mappings are not allowed in compact mappings\"),t.options.strict&&h.start<N.found.offset-1024&&i(k.range,\"KEY_OVER_1024_CHARS\",\"The : indicator must be at most 1024 chars after the start of an implicit block mapping key\"));let O=y?s(t,y,N,i):e(t,a,d,null,N,i);t.schema.compat&&yt(n.indent,y,i),a=O.range[2];let A=new _(k,O);t.options.keepSourceTokens&&(A.srcToken=p),l.items.push(A)}else{m&&i(k.range,\"MISSING_CHAR\",\"Implicit map keys need to be followed by map values\"),N.comment&&(k.comment?k.comment+=`\n`+N.comment:k.comment=N.comment);let O=new _(k);t.options.keepSourceTokens&&(O.srcToken=p),l.items.push(O)}}return c&&c<a&&i(c,\"IMPOSSIBLE\",\"Map comment with trailing content\"),l.range=[n.offset,a,c??a],l}var ei,si=g(()=>{ge();be();gt();ns();Qs();Gs();ei=\"All mapping items must start at the same column\"});function ni({composeNode:s,composeEmptyNode:e},t,n,i,r){let o=r?.nodeClass??j,l=new o(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let a=n.offset,c=null;for(let{start:p,value:f}of n.items){let u=oe(p,{indicator:\"seq-item-ind\",next:f,offset:a,onError:i,parentIndent:n.indent,startOnNewline:!0});if(!u.found)if(u.anchor||u.tag||f)f?.type===\"block-seq\"?i(u.end,\"BAD_INDENT\",\"All sequence items must start at the same column\"):i(a,\"MISSING_CHAR\",\"Sequence item without - indicator\");else{c=u.end,u.comment&&(l.comment=u.comment);continue}let d=f?s(t,f,u,i):e(t,u.end,p,null,u,i);t.schema.compat&&yt(n.indent,f,i),a=d.range[2],l.items.push(d)}return l.range=[n.offset,a,c??a],l}var ii=g(()=>{we();gt();Qs()});function le(s,e,t,n){let i=\"\";if(s){let r=!1,o=\"\";for(let l of s){let{source:a,type:c}=l;switch(c){case\"space\":r=!0;break;case\"comment\":{t&&!r&&n(l,\"MISSING_CHAR\",\"Comments must be separated from other tokens by white space characters\");let p=a.substring(1)||\" \";i?i+=o+p:i=p,o=\"\";break}case\"newline\":i&&(o+=a),r=!0;break;default:n(l,\"UNEXPECTED_TOKEN\",`Unexpected ${c} at node end`)}e+=a.length}}return{comment:i,offset:e}}var Qe=g(()=>{});function ri({composeNode:s,composeEmptyNode:e},t,n,i,r){let o=n.start.source===\"{\",l=o?\"flow map\":\"flow sequence\",a=r?.nodeClass??(o?P:j),c=new a(t.schema);c.flow=!0;let p=t.atRoot;p&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let f=n.offset+n.start.source.length;for(let m=0;m<n.items.length;++m){let S=n.items[m],{start:k,key:N,sep:O,value:A}=S,T=oe(k,{flow:l,indicator:\"explicit-key-ind\",next:N??O?.[0],offset:f,onError:i,parentIndent:n.indent,startOnNewline:!1});if(!T.found){if(!T.anchor&&!T.tag&&!O&&!A){m===0&&T.comma?i(T.comma,\"UNEXPECTED_TOKEN\",`Unexpected , in ${l}`):m<n.items.length-1&&i(T.start,\"UNEXPECTED_TOKEN\",`Unexpected empty item in ${l}`),T.comment&&(c.comment?c.comment+=`\n`+T.comment:c.comment=T.comment),f=T.end;continue}!o&&t.options.strict&&ke(N)&&i(N,\"MULTILINE_IMPLICIT_KEY\",\"Implicit keys of flow sequence pairs need to be on a single line\")}if(m===0)T.comma&&i(T.comma,\"UNEXPECTED_TOKEN\",`Unexpected , in ${l}`);else if(T.comma||i(T.start,\"MISSING_CHAR\",`Missing , between ${l} items`),T.comment){let $=\"\";e:for(let w of k)switch(w.type){case\"comma\":case\"space\":break;case\"comment\":$=w.source.substring(1);break e;default:break e}if($){let w=c.items[c.items.length-1];I(w)&&(w=w.value??w.key),w.comment?w.comment+=`\n`+$:w.comment=$,T.comment=T.comment.substring($.length+1)}}if(!o&&!O&&!T.found){let $=A?s(t,A,T,i):e(t,T.end,O,null,T,i);c.items.push($),f=$.range[2],Hs(A)&&i($.range,\"BLOCK_IN_FLOW\",Ws)}else{t.atKey=!0;let $=T.end,w=N?s(t,N,T,i):e(t,$,k,null,T,i);Hs(N)&&i(w.range,\"BLOCK_IN_FLOW\",Ws),t.atKey=!1;let B=oe(O??[],{flow:l,indicator:\"map-value-ind\",next:A,offset:w.range[2],onError:i,parentIndent:n.indent,startOnNewline:!1});if(B.found){if(!o&&!T.found&&t.options.strict){if(O)for(let D of O){if(D===B.found)break;if(D.type===\"newline\"){i(D,\"MULTILINE_IMPLICIT_KEY\",\"Implicit keys of flow sequence pairs need to be on a single line\");break}}T.start<B.found.offset-1024&&i(B.found,\"KEY_OVER_1024_CHARS\",\"The : indicator must be at most 1024 chars after the start of an implicit flow sequence key\")}}else A&&(\"source\"in A&&A.source?.[0]===\":\"?i(A,\"MISSING_CHAR\",`Missing space after : in ${l}`):i(B.start,\"MISSING_CHAR\",`Missing , or : between ${l} items`));let he=A?s(t,A,B,i):B.found?e(t,B.end,O,null,B,i):null;he?Hs(A)&&i(he.range,\"BLOCK_IN_FLOW\",Ws):B.comment&&(w.comment?w.comment+=`\n`+B.comment:w.comment=B.comment);let _e=new _(w,he);if(t.options.keepSourceTokens&&(_e.srcToken=S),o){let D=c;is(t,D.items,w)&&i($,\"DUPLICATE_KEY\",\"Map keys must be unique\"),D.items.push(_e)}else{let D=new P(t.schema);D.flow=!0,D.items.push(_e);let gn=(he??w).range;D.range=[w.range[0],gn[1],gn[2]],c.items.push(D)}f=he?he.range[2]:B.end}}let u=o?\"}\":\"]\",[d,...y]=n.end,h=f;if(d?.source===u)h=d.offset+d.source.length;else{let m=l[0].toUpperCase()+l.substring(1),S=p?`${m} must end with a ${u}`:`${m} in block collection must be sufficiently indented and end with a ${u}`;i(f,p?\"MISSING_CHAR\":\"BAD_INDENT\",S),d&&d.source.length!==1&&y.unshift(d)}if(y.length>0){let m=le(y,h,t.options.strict,i);m.comment&&(c.comment?c.comment+=`\n`+m.comment:c.comment=m.comment),c.range=[n.offset,h,m.offset]}else c.range=[n.offset,h,h];return c}var Ws,Hs,oi=g(()=>{C();ge();be();we();Qe();gt();ns();Gs();Ws=\"Block collections are not allowed within flow collections\",Hs=s=>s&&(s.type===\"block-map\"||s.type===\"block-seq\")});function Xs(s,e,t,n,i,r){let o=t.type===\"block-map\"?ti(s,e,t,n,r):t.type===\"block-seq\"?ni(s,e,t,n,r):ri(s,e,t,n,r),l=o.constructor;return i===\"!\"||i===l.tagName?(o.tag=l.tagName,o):(i&&(o.tag=i),o)}function li(s,e,t,n,i){let r=n.tag,o=r?e.directives.tagName(r.source,u=>i(r,\"TAG_RESOLVE_FAILED\",u)):null;if(t.type===\"block-seq\"){let{anchor:u,newlineAfterProp:d}=n,y=u&&r?u.offset>r.offset?u:r:u??r;y&&(!d||d.offset<y.offset)&&i(y,\"MISSING_CHAR\",\"Missing newline after block sequence props\")}let l=t.type===\"block-map\"?\"map\":t.type===\"block-seq\"?\"seq\":t.start.source===\"{\"?\"map\":\"seq\";if(!r||!o||o===\"!\"||o===P.tagName&&l===\"map\"||o===j.tagName&&l===\"seq\")return Xs(s,e,t,i,o);let a=e.schema.tags.find(u=>u.tag===o&&u.collection===l);if(!a){let u=e.schema.knownTags[o];if(u?.collection===l)e.schema.tags.push(Object.assign({},u,{default:!1})),a=u;else return u?i(r,\"BAD_COLLECTION_TYPE\",`${u.tag} used for ${l} collection, but expects ${u.collection??\"scalar\"}`,!0):i(r,\"TAG_RESOLVE_FAILED\",`Unresolved tag: ${o}`,!0),Xs(s,e,t,i,o)}let c=Xs(s,e,t,i,o,a),p=a.resolve?.(c,u=>i(r,\"TAG_RESOLVE_FAILED\",u),e.options)??c,f=L(p)?p:new b(p);return f.range=c.range,f.tag=o,a?.format&&(f.format=a.format),f}var ai=g(()=>{C();M();be();we();si();ii();oi()});function rs(s,e,t){let n=e.offset,i=sr(e,s.options.strict,t);if(!i)return{value:\"\",type:null,comment:\"\",range:[n,n,n]};let r=i.mode===\">\"?b.BLOCK_FOLDED:b.BLOCK_LITERAL,o=e.source?nr(e.source):[],l=o.length;for(let h=o.length-1;h>=0;--h){let m=o[h][1];if(m===\"\"||m===\"\\r\")l=h;else break}if(l===0){let h=i.chomp===\"+\"&&o.length>0?`\n`.repeat(Math.max(1,o.length-1)):\"\",m=n+i.length;return e.source&&(m+=e.source.length),{value:h,type:r,comment:i.comment,range:[n,m,m]}}let a=e.indent+i.indent,c=e.offset+i.length,p=0;for(let h=0;h<l;++h){let[m,S]=o[h];if(S===\"\"||S===\"\\r\")i.indent===0&&m.length>a&&(a=m.length);else{m.length<a&&t(c+m.length,\"MISSING_CHAR\",\"Block scalars with more-indented leading empty lines must use an explicit indentation indicator\"),i.indent===0&&(a=m.length),p=h,a===0&&!s.atRoot&&t(c,\"BAD_INDENT\",\"Block scalar values in collections must be indented\");break}c+=m.length+S.length+1}for(let h=o.length-1;h>=l;--h)o[h][0].length>a&&(l=h+1);let f=\"\",u=\"\",d=!1;for(let h=0;h<p;++h)f+=o[h][0].slice(a)+`\n`;for(let h=p;h<l;++h){let[m,S]=o[h];c+=m.length+S.length+1;let k=S[S.length-1]===\"\\r\";if(k&&(S=S.slice(0,-1)),S&&m.length<a){let O=`Block scalar lines must not be less indented than their ${i.indent?\"explicit indentation indicator\":\"first line\"}`;t(c-S.length-(k?2:1),\"BAD_INDENT\",O),m=\"\"}r===b.BLOCK_LITERAL?(f+=u+m.slice(a)+S,u=`\n`):m.length>a||S[0]===\"\t\"?(u===\" \"?u=`\n`:!d&&u===`\n`&&(u=`\n\n`),f+=u+m.slice(a)+S,u=`\n`,d=!0):S===\"\"?u===`\n`?f+=`\n`:u=`\n`:(f+=u+S,u=\" \",d=!1)}switch(i.chomp){case\"-\":break;case\"+\":for(let h=l;h<o.length;++h)f+=`\n`+o[h][0].slice(a);f[f.length-1]!==`\n`&&(f+=`\n`);break;default:f+=`\n`}let y=n+i.length+e.source.length;return{value:f,type:r,comment:i.comment,range:[n,y,y]}}function sr({offset:s,props:e},t,n){if(e[0].type!==\"block-scalar-header\")return n(e[0],\"IMPOSSIBLE\",\"Block scalar header not found\"),null;let{source:i}=e[0],r=i[0],o=0,l=\"\",a=-1;for(let u=1;u<i.length;++u){let d=i[u];if(!l&&(d===\"-\"||d===\"+\"))l=d;else{let y=Number(d);!o&&y?o=y:a===-1&&(a=s+u)}}a!==-1&&n(a,\"UNEXPECTED_TOKEN\",`Block scalar header includes extra characters: ${i}`);let c=!1,p=\"\",f=i.length;for(let u=1;u<e.length;++u){let d=e[u];switch(d.type){case\"space\":c=!0;case\"newline\":f+=d.source.length;break;case\"comment\":t&&!c&&n(d,\"MISSING_CHAR\",\"Comments must be separated from other tokens by white space characters\"),f+=d.source.length,p=d.source.substring(1);break;case\"error\":n(d,\"UNEXPECTED_TOKEN\",d.message),f+=d.source.length;break;default:{let y=`Unexpected token in block scalar header: ${d.type}`;n(d,\"UNEXPECTED_TOKEN\",y);let h=d.source;h&&typeof h==\"string\"&&(f+=h.length)}}}return{mode:r,indent:o,chomp:l,comment:p,length:f}}function nr(s){let e=s.split(/\\n( *)/),t=e[0],n=t.match(/^( *)/),r=[n?.[1]?[n[1],t.slice(n[1].length)]:[\"\",t]];for(let o=1;o<e.length;o+=2)r.push([e[o],e[o+1]]);return r}var zs=g(()=>{M()});function os(s,e,t){let{offset:n,type:i,source:r,end:o}=s,l,a,c=(u,d,y)=>t(n+u,d,y);switch(i){case\"scalar\":l=b.PLAIN,a=ir(r,c);break;case\"single-quoted-scalar\":l=b.QUOTE_SINGLE,a=rr(r,c);break;case\"double-quoted-scalar\":l=b.QUOTE_DOUBLE,a=or(r,c);break;default:return t(s,\"UNEXPECTED_TOKEN\",`Expected a flow scalar value, but found: ${i}`),{value:\"\",type:null,comment:\"\",range:[n,n+r.length,n+r.length]}}let p=n+r.length,f=le(o,p,e,t);return{value:a,type:l,comment:f.comment,range:[n,p,f.offset]}}function ir(s,e){let t=\"\";switch(s[0]){case\"\t\":t=\"a tab character\";break;case\",\":t=\"flow indicator character ,\";break;case\"%\":t=\"directive indicator character %\";break;case\"|\":case\">\":{t=`block scalar indicator ${s[0]}`;break}case\"@\":case\"`\":{t=`reserved character ${s[0]}`;break}}return t&&e(0,\"BAD_SCALAR_START\",`Plain value cannot start with ${t}`),ci(s)}function rr(s,e){return(s[s.length-1]!==\"'\"||s.length===1)&&e(s.length,\"MISSING_CHAR\",\"Missing closing 'quote\"),ci(s.slice(1,-1)).replace(/''/g,\"'\")}function ci(s){let e,t;try{e=new RegExp(`(.*?)(?<![ \t])[ \t]*\\r?\n`,\"sy\"),t=new RegExp(`[ \t]*(.*?)(?:(?<![ \t])[ \t]*)?\\r?\n`,\"sy\")}catch{e=/(.*?)[ \\t]*\\r?\\n/sy,t=/[ \\t]*(.*?)[ \\t]*\\r?\\n/sy}let n=e.exec(s);if(!n)return s;let i=n[1],r=\" \",o=e.lastIndex;for(t.lastIndex=o;n=t.exec(s);)n[1]===\"\"?r===`\n`?i+=r:r=`\n`:(i+=r+n[1],r=\" \"),o=t.lastIndex;let l=/[ \\t]*(.*)/sy;return l.lastIndex=o,n=l.exec(s),i+r+(n?.[1]??\"\")}function or(s,e){let t=\"\";for(let n=1;n<s.length-1;++n){let i=s[n];if(!(i===\"\\r\"&&s[n+1]===`\n`))if(i===`\n`){let{fold:r,offset:o}=lr(s,n);t+=r,n=o}else if(i===\"\\\\\"){let r=s[++n],o=ar[r];if(o)t+=o;else if(r===`\n`)for(r=s[n+1];r===\" \"||r===\"\t\";)r=s[++n+1];else if(r===\"\\r\"&&s[n+1]===`\n`)for(r=s[++n+1];r===\" \"||r===\"\t\";)r=s[++n+1];else if(r===\"x\"||r===\"u\"||r===\"U\"){let l=r===\"x\"?2:r===\"u\"?4:8;t+=cr(s,n+1,l,e),n+=l}else{let l=s.substr(n-1,2);e(n-1,\"BAD_DQ_ESCAPE\",`Invalid escape sequence ${l}`),t+=l}}else if(i===\" \"||i===\"\t\"){let r=n,o=s[n+1];for(;o===\" \"||o===\"\t\";)o=s[++n+1];o!==`\n`&&!(o===\"\\r\"&&s[n+2]===`\n`)&&(t+=n>r?s.slice(r,n+1):i)}else t+=i}return(s[s.length-1]!=='\"'||s.length===1)&&e(s.length,\"MISSING_CHAR\",'Missing closing \"quote'),t}function lr(s,e){let t=\"\",n=s[e+1];for(;(n===\" \"||n===\"\t\"||n===`\n`||n===\"\\r\")&&!(n===\"\\r\"&&s[e+2]!==`\n`);)n===`\n`&&(t+=`\n`),e+=1,n=s[e+1];return t||(t=\" \"),{fold:t,offset:e}}function cr(s,e,t,n){let i=s.substr(e,t),o=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;try{return String.fromCodePoint(o)}catch{let l=s.substr(e-2,t+2);return n(e-2,\"BAD_DQ_ESCAPE\",`Invalid escape sequence ${l}`),l}}var ar,Zs=g(()=>{M();Qe();ar={0:\"\\0\",a:\"\\x07\",b:\"\\b\",e:\"\\x1B\",f:\"\\f\",n:`\n`,r:\"\\r\",t:\"\t\",v:\"\\v\",N:\"\\x85\",_:\"\\xA0\",L:\"\\u2028\",P:\"\\u2029\",\" \":\" \",'\"':'\"',\"/\":\"/\",\"\\\\\":\"\\\\\",\"\t\":\"\t\"}});function en(s,e,t,n){let{value:i,type:r,comment:o,range:l}=e.type===\"block-scalar\"?rs(s,e,n):os(e,s.options.strict,n),a=t?s.directives.tagName(t.source,f=>n(t,\"TAG_RESOLVE_FAILED\",f)):null,c;s.options.stringKeys&&s.atKey?c=s.schema[U]:a?c=fr(s.schema,i,a,t,n):e.type===\"scalar\"?c=ur(s,i,e,n):c=s.schema[U];let p;try{let f=c.resolve(i,u=>n(t??e,\"TAG_RESOLVE_FAILED\",u),s.options);p=E(f)?f:new b(f)}catch(f){let u=f instanceof Error?f.message:String(f);n(t??e,\"TAG_RESOLVE_FAILED\",u),p=new b(i)}return p.range=l,p.source=i,r&&(p.type=r),a&&(p.tag=a),c.format&&(p.format=c.format),o&&(p.comment=o),p}function fr(s,e,t,n,i){if(t===\"!\")return s[U];let r=[];for(let l of s.tags)if(!l.collection&&l.tag===t)if(l.default&&l.test)r.push(l);else return l;for(let l of r)if(l.test?.test(e))return l;let o=s.knownTags[t];return o&&!o.collection?(s.tags.push(Object.assign({},o,{default:!1,test:void 0})),o):(i(n,\"TAG_RESOLVE_FAILED\",`Unresolved tag: ${t}`,t!==\"tag:yaml.org,2002:str\"),s[U])}function ur({atKey:s,directives:e,schema:t},n,i,r){let o=t.tags.find(l=>(l.default===!0||s&&l.default===\"key\")&&l.test?.test(n))||t[U];if(t.compat){let l=t.compat.find(a=>a.default&&a.test?.test(n))??t[U];if(o.tag!==l.tag){let a=e.tagString(o.tag),c=e.tagString(l.tag),p=`Value may be parsed as either ${a} or ${c}`;r(i,\"TAG_RESOLVE_FAILED\",p,!0)}}return o}var fi=g(()=>{C();M();zs();Zs()});function ui(s,e,t){if(e){t??(t=e.length);for(let n=t-1;n>=0;--n){let i=e[n];switch(i.type){case\"space\":case\"comment\":case\"newline\":s-=i.source.length;continue}for(i=e[++n];i?.type===\"space\";)s+=i.source.length,i=e[++n];break}}return s}var hi=g(()=>{});function tn(s,e,t,n){let i=s.atKey,{spaceBefore:r,comment:o,anchor:l,tag:a}=t,c,p=!0;switch(e.type){case\"alias\":c=pr(s,e,n),(l||a)&&n(e,\"ALIAS_PROPS\",\"An alias node must not specify any properties\");break;case\"scalar\":case\"single-quoted-scalar\":case\"double-quoted-scalar\":case\"block-scalar\":c=en(s,e,a,n),l&&(c.anchor=l.source.substring(1));break;case\"block-map\":case\"block-seq\":case\"flow-collection\":try{c=li(hr,s,e,t,n),l&&(c.anchor=l.source.substring(1))}catch(f){let u=f instanceof Error?f.message:String(f);n(e,\"RESOURCE_EXHAUSTION\",u)}break;default:{let f=e.type===\"error\"?e.message:`Unsupported token (type: ${e.type})`;n(e,\"UNEXPECTED_TOKEN\",f),p=!1}}return c??(c=ls(s,e.offset,void 0,null,t,n)),l&&c.anchor===\"\"&&n(l,\"BAD_ALIAS\",\"Anchor cannot be an empty string\"),i&&s.options.stringKeys&&(!E(c)||typeof c.value!=\"string\"||c.tag&&c.tag!==\"tag:yaml.org,2002:str\")&&n(a??e,\"NON_STRING_KEY\",\"With stringKeys, all keys must be strings\"),r&&(c.spaceBefore=!0),o&&(e.type===\"scalar\"&&e.source===\"\"?c.comment=o:c.commentBefore=o),s.options.keepSourceTokens&&p&&(c.srcToken=e),c}function ls(s,e,t,n,{spaceBefore:i,comment:r,anchor:o,tag:l,end:a},c){let p={type:\"scalar\",offset:ui(e,t,n),indent:-1,source:\"\"},f=en(s,p,l,c);return o&&(f.anchor=o.source.substring(1),f.anchor===\"\"&&c(o,\"BAD_ALIAS\",\"Anchor cannot be an empty string\")),i&&(f.spaceBefore=!0),r&&(f.comment=r,f.range[2]=a),f}function pr({options:s},{offset:e,source:t,end:n},i){let r=new X(t.substring(1));r.source===\"\"&&i(e,\"BAD_ALIAS\",\"Alias cannot be an empty string\"),r.source.endsWith(\":\")&&i(e+t.length-1,\"BAD_ALIAS\",\"Alias ending in : is ambiguous\",!0);let o=e+t.length,l=le(n,o,s.strict,i);return r.range=[e,o,l.offset],l.comment&&(r.comment=l.comment),r}var hr,pi=g(()=>{Xe();C();ai();fi();Qe();hi();hr={composeNode:tn,composeEmptyNode:ls}});function mi(s,e,{offset:t,start:n,value:i,end:r},o){let l=Object.assign({_directives:e},s),a=new te(void 0,l),c={atKey:!1,atRoot:!0,directives:a.directives,options:a.options,schema:a.schema},p=oe(n,{indicator:\"doc-start\",next:i??r?.[0],offset:t,onError:o,parentIndent:0,startOnNewline:!0});p.found&&(a.directives.docStart=!0,i&&(i.type===\"block-map\"||i.type===\"block-seq\")&&!p.hasNewline&&o(p.end,\"MISSING_CHAR\",\"Block collection cannot start on same line with directives-end marker\")),a.contents=i?tn(c,i,p,o):ls(c,p.end,n,null,p,o);let f=a.contents.range[2],u=le(r,f,!1,o);return u.comment&&(a.comment=u.comment),a.range=[t,f,u.offset],a}var di=g(()=>{pt();pi();Qe();gt()});function bt(s){if(typeof s==\"number\")return[s,s+1];if(Array.isArray(s))return s.length===2?s:[s[0],s[1]];let{offset:e,source:t}=s;return[e,e+(typeof t==\"string\"?t.length:1)]}function gi(s){let e=\"\",t=!1,n=!1;for(let i=0;i<s.length;++i){let r=s[i];switch(r[0]){case\"#\":e+=(e===\"\"?\"\":n?`\n\n`:`\n`)+(r.substring(1)||\" \"),t=!0,n=!1;break;case\"%\":s[i+1]?.[0]!==\"#\"&&(i+=1),t=!1;break;default:t||(n=!0),t=!1}}return{comment:e,afterEmptyLine:n}}var Ne,sn=g(()=>{ws();pt();dt();C();di();Qe();Ne=class{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,n,i,r)=>{let o=bt(t);r?this.warnings.push(new Ce(o,n,i)):this.errors.push(new x(o,n,i))},this.directives=new ie({version:e.version||\"1.2\"}),this.options=e}decorate(e,t){let{comment:n,afterEmptyLine:i}=gi(this.prelude);if(n){let r=e.contents;if(t)e.comment=e.comment?`${e.comment}\n${n}`:n;else if(i||e.directives.docStart||!r)e.commentBefore=n;else if(v(r)&&!r.flow&&r.items.length>0){let o=r.items[0];I(o)&&(o=o.key);let l=o.commentBefore;o.commentBefore=l?`${n}\n${l}`:n}else{let o=r.commentBefore;r.commentBefore=o?`${n}\n${o}`:n}}if(t){for(let r=0;r<this.errors.length;++r)e.errors.push(this.errors[r]);for(let r=0;r<this.warnings.length;++r)e.warnings.push(this.warnings[r])}else e.errors=this.errors,e.warnings=this.warnings;this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:gi(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,n=-1){for(let i of e)yield*this.next(i);yield*this.end(t,n)}*next(e){switch(e.type){case\"directive\":this.directives.add(e.source,(t,n,i)=>{let r=bt(e);r[0]+=t,this.onError(r,\"BAD_DIRECTIVE\",n,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case\"document\":{let t=mi(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,\"MISSING_CHAR\",\"Missing directives-end/doc-start indicator line\"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case\"byte-order-mark\":case\"space\":break;case\"comment\":case\"newline\":this.prelude.push(e.source);break;case\"error\":{let t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,n=new x(bt(e),\"UNEXPECTED_TOKEN\",t);this.atDirectives||!this.doc?this.errors.push(n):this.doc.errors.push(n);break}case\"doc-end\":{if(!this.doc){let n=\"Unexpected doc-end without preceding document\";this.errors.push(new x(bt(e),\"UNEXPECTED_TOKEN\",n));break}this.doc.directives.docEnd=!0;let t=le(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){let n=this.doc.comment;this.doc.comment=n?`${n}\n${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new x(bt(e),\"UNEXPECTED_TOKEN\",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){let n=Object.assign({_directives:this.directives},this.options),i=new te(void 0,n);this.atDirectives&&this.onError(t,\"MISSING_CHAR\",\"Missing directives-end indicator line\"),i.range=[0,t,t],this.decorate(i,!1),yield i}}}});function yi(s,e=!0,t){if(s){let n=(i,r,o)=>{let l=typeof i==\"number\"?i:Array.isArray(i)?i[0]:i.offset;if(t)t(l,r,o);else throw new x([l,l+1],r,o)};switch(s.type){case\"scalar\":case\"single-quoted-scalar\":case\"double-quoted-scalar\":return os(s,e,n);case\"block-scalar\":return rs({options:{strict:e}},s,n)}}return null}function bi(s,e){let{implicitKey:t=!1,indent:n,inFlow:i=!1,offset:r=-1,type:o=\"PLAIN\"}=e,l=fe({type:o,value:s},{implicitKey:t,indent:n>0?\" \".repeat(n):\"\",inFlow:i,options:{blockQuote:!0,lineWidth:-1}}),a=e.end??[{type:\"newline\",offset:-1,indent:n,source:`\n`}];switch(l[0]){case\"|\":case\">\":{let c=l.indexOf(`\n`),p=l.substring(0,c),f=l.substring(c+1)+`\n`,u=[{type:\"block-scalar-header\",offset:r,indent:n,source:p}];return Si(u,a)||u.push({type:\"newline\",offset:-1,indent:n,source:`\n`}),{type:\"block-scalar\",offset:r,indent:n,props:u,source:f}}case'\"':return{type:\"double-quoted-scalar\",offset:r,indent:n,source:l,end:a};case\"'\":return{type:\"single-quoted-scalar\",offset:r,indent:n,source:l,end:a};default:return{type:\"scalar\",offset:r,indent:n,source:l,end:a}}}function wi(s,e,t={}){let{afterKey:n=!1,implicitKey:i=!1,inFlow:r=!1,type:o}=t,l=\"indent\"in s?s.indent:null;if(n&&typeof l==\"number\"&&(l+=2),!o)switch(s.type){case\"single-quoted-scalar\":o=\"QUOTE_SINGLE\";break;case\"double-quoted-scalar\":o=\"QUOTE_DOUBLE\";break;case\"block-scalar\":{let c=s.props[0];if(c.type!==\"block-scalar-header\")throw new Error(\"Invalid block scalar header\");o=c.source[0]===\">\"?\"BLOCK_FOLDED\":\"BLOCK_LITERAL\";break}default:o=\"PLAIN\"}let a=fe({type:o,value:e},{implicitKey:i||l===null,indent:l!==null&&l>0?\" \".repeat(l):\"\",inFlow:r,options:{blockQuote:!0,lineWidth:-1}});switch(a[0]){case\"|\":case\">\":mr(s,a);break;case'\"':nn(s,a,\"double-quoted-scalar\");break;case\"'\":nn(s,a,\"single-quoted-scalar\");break;default:nn(s,a,\"scalar\")}}function mr(s,e){let t=e.indexOf(`\n`),n=e.substring(0,t),i=e.substring(t+1)+`\n`;if(s.type===\"block-scalar\"){let r=s.props[0];if(r.type!==\"block-scalar-header\")throw new Error(\"Invalid block scalar header\");r.source=n,s.source=i}else{let{offset:r}=s,o=\"indent\"in s?s.indent:-1,l=[{type:\"block-scalar-header\",offset:r,indent:o,source:n}];Si(l,\"end\"in s?s.end:void 0)||l.push({type:\"newline\",offset:-1,indent:o,source:`\n`});for(let a of Object.keys(s))a!==\"type\"&&a!==\"offset\"&&delete s[a];Object.assign(s,{type:\"block-scalar\",indent:o,props:l,source:i})}}function Si(s,e){if(e)for(let t of e)switch(t.type){case\"space\":case\"comment\":s.push(t);break;case\"newline\":return s.push(t),!0}return!1}function nn(s,e,t){switch(s.type){case\"scalar\":case\"double-quoted-scalar\":case\"single-quoted-scalar\":s.type=t,s.source=e;break;case\"block-scalar\":{let n=s.props.slice(1),i=e.length;s.props[0].type===\"block-scalar-header\"&&(i-=s.props[0].source.length);for(let r of n)r.offset+=i;delete s.props,Object.assign(s,{type:t,source:e,end:n});break}case\"block-map\":case\"block-seq\":{let i={type:\"newline\",offset:s.offset+e.length,indent:s.indent,source:`\n`};delete s.items,Object.assign(s,{type:t,source:e,end:[i]});break}default:{let n=\"indent\"in s?s.indent:-1,i=\"end\"in s&&Array.isArray(s.end)?s.end.filter(r=>r.type===\"space\"||r.type===\"comment\"||r.type===\"newline\"):[];for(let r of Object.keys(s))r!==\"type\"&&r!==\"offset\"&&delete s[r];Object.assign(s,{type:t,indent:n,source:e,end:i})}}}var ki=g(()=>{zs();Zs();dt();it()});function cs(s){switch(s.type){case\"block-scalar\":{let e=\"\";for(let t of s.props)e+=cs(t);return e+s.source}case\"block-map\":case\"block-seq\":{let e=\"\";for(let t of s.items)e+=as(t);return e}case\"flow-collection\":{let e=s.start.source;for(let t of s.items)e+=as(t);for(let t of s.end)e+=t.source;return e}case\"document\":{let e=as(s);if(s.end)for(let t of s.end)e+=t.source;return e}default:{let e=s.source;if(\"end\"in s&&s.end)for(let t of s.end)e+=t.source;return e}}}function as({start:s,key:e,sep:t,value:n}){let i=\"\";for(let r of s)i+=r.source;if(e&&(i+=cs(e)),t)for(let r of t)i+=r.source;return n&&(i+=cs(n)),i}var Ni,Oi=g(()=>{Ni=s=>\"type\"in s?cs(s):as(s)});function Oe(s,e){\"type\"in s&&s.type===\"document\"&&(s={start:s.start,value:s.value}),Ei(Object.freeze([]),s,e)}function Ei(s,e,t){let n=t(e,s);if(typeof n==\"symbol\")return n;for(let i of[\"key\",\"value\"]){let r=e[i];if(r&&\"items\"in r){for(let o=0;o<r.items.length;++o){let l=Ei(Object.freeze(s.concat([[i,o]])),r.items[o],t);if(typeof l==\"number\")o=l-1;else{if(l===rn)return rn;l===Ai&&(r.items.splice(o,1),o-=1)}}typeof n==\"function\"&&i===\"key\"&&(n=n(e,s))}}return typeof n==\"function\"?n(e,s):n}var rn,dr,Ai,Ti=g(()=>{rn=Symbol(\"break visit\"),dr=Symbol(\"skip children\"),Ai=Symbol(\"remove item\");Oe.BREAK=rn;Oe.SKIP=dr;Oe.REMOVE=Ai;Oe.itemAtPath=(s,e)=>{let t=s;for(let[n,i]of e){let r=t?.[n];if(r&&\"items\"in r)t=r.items[i];else return}return t};Oe.parentCollection=(s,e)=>{let t=Oe.itemAtPath(s,e.slice(0,-1)),n=e[e.length-1][0],i=t?.[n];if(i&&\"items\"in i)return i;throw new Error(\"Parent collection not found\")}});var fs={};ys(fs,{BOM:()=>wt,DOCUMENT:()=>St,FLOW_END:()=>kt,SCALAR:()=>Ge,createScalarToken:()=>bi,isCollection:()=>gr,isScalar:()=>yr,prettyToken:()=>br,resolveAsScalar:()=>yi,setScalarValue:()=>wi,stringify:()=>Ni,tokenType:()=>on,visit:()=>Oe});function br(s){switch(s){case wt:return\"<BOM>\";case St:return\"<DOC>\";case kt:return\"<FLOW_END>\";case Ge:return\"<SCALAR>\";default:return JSON.stringify(s)}}function on(s){switch(s){case wt:return\"byte-order-mark\";case St:return\"doc-mode\";case kt:return\"flow-error-end\";case Ge:return\"scalar\";case\"---\":return\"doc-start\";case\"...\":return\"doc-end\";case\"\":case`\n`:case`\\r\n`:return\"newline\";case\"-\":return\"seq-item-ind\";case\"?\":return\"explicit-key-ind\";case\":\":return\"map-value-ind\";case\"{\":return\"flow-map-start\";case\"}\":return\"flow-map-end\";case\"[\":return\"flow-seq-start\";case\"]\":return\"flow-seq-end\";case\",\":return\"comma\"}switch(s[0]){case\" \":case\"\t\":return\"space\";case\"#\":return\"comment\";case\"%\":return\"directive-line\";case\"*\":return\"alias\";case\"&\":return\"anchor\";case\"!\":return\"tag\";case\"'\":return\"single-quoted-scalar\";case'\"':return\"double-quoted-scalar\";case\"|\":case\">\":return\"block-scalar-header\"}return null}var wt,St,kt,Ge,gr,yr,us=g(()=>{ki();Oi();Ti();wt=\"\\uFEFF\",St=\"\u0002\",kt=\"\u0018\",Ge=\"\u001f\",gr=s=>!!s&&\"items\"in s,yr=s=>!!s&&(s.type===\"scalar\"||s.type===\"single-quoted-scalar\"||s.type===\"double-quoted-scalar\"||s.type===\"block-scalar\")});function se(s){switch(s){case void 0:case\" \":case`\n`:case\"\\r\":case\"\t\":return!0;default:return!1}}var Ii,wr,hs,Sr,ln,ve,an=g(()=>{us();Ii=new Set(\"0123456789ABCDEFabcdef\"),wr=new Set(\"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()\"),hs=new Set(\",[]{}\"),Sr=new Set(` ,[]{}\n\\r\t`),ln=s=>!s||Sr.has(s),ve=class{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer=\"\",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!=\"string\")throw TypeError(\"source is not a string\");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let n=this.next??\"stream\";for(;n&&(t||this.hasChars(1));)n=yield*this.parseNext(n)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===\" \"||t===\"\t\";)t=this.buffer[++e];return!t||t===\"#\"||t===`\n`?!0:t===\"\\r\"?this.buffer[e+1]===`\n`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let n=0;for(;t===\" \";)t=this.buffer[++n+e];if(t===\"\\r\"){let i=this.buffer[n+e+1];if(i===`\n`||!i&&!this.atEnd)return e+n+1}return t===`\n`||n>=this.indentNext||!t&&!this.atEnd?e+n:-1}if(t===\"-\"||t===\".\"){let n=this.buffer.substr(e,3);if((n===\"---\"||n===\"...\")&&se(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!=\"number\"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`\n`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]===\"\\r\"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case\"stream\":return yield*this.parseStream();case\"line-start\":return yield*this.parseLineStart();case\"block-start\":return yield*this.parseBlockStart();case\"doc\":return yield*this.parseDocument();case\"flow\":return yield*this.parseFlowCollection();case\"quoted-scalar\":return yield*this.parseQuotedScalar();case\"block-scalar\":return yield*this.parseBlockScalar();case\"plain-scalar\":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext(\"stream\");if(e[0]===wt&&(yield*this.pushCount(1),e=e.substring(1)),e[0]===\"%\"){let t=e.length,n=e.indexOf(\"#\");for(;n!==-1;){let r=e[n-1];if(r===\" \"||r===\"\t\"){t=n-1;break}else n=e.indexOf(\"#\",n+1)}for(;;){let r=e[t-1];if(r===\" \"||r===\"\t\")t-=1;else break}let i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),\"stream\"}if(this.atLineEnd()){let t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),\"stream\"}return yield St,yield*this.parseLineStart()}*parseLineStart(){let e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext(\"line-start\");if(e===\"-\"||e===\".\"){if(!this.atEnd&&!this.hasChars(4))return this.setNext(\"line-start\");let t=this.peek(3);if((t===\"---\"||t===\"...\")&&se(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t===\"---\"?\"doc\":\"stream\"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!se(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){let[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext(\"block-start\");if((e===\"-\"||e===\"?\"||e===\":\")&&se(t)){let n=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=n,\"block-start\"}return\"doc\"}*parseDocument(){yield*this.pushSpaces(!0);let e=this.getLine();if(e===null)return this.setNext(\"doc\");let t=yield*this.pushIndicators();switch(e[t]){case\"#\":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case\"{\":case\"[\":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,\"flow\";case\"}\":case\"]\":return yield*this.pushCount(1),\"doc\";case\"*\":return yield*this.pushUntil(ln),\"doc\";case'\"':case\"'\":return yield*this.parseQuotedScalar();case\"|\":case\">\":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,n=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=n=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);let i=this.getLine();if(i===null)return this.setNext(\"flow\");if((n!==-1&&n<this.indentNext&&i[0]!==\"#\"||n===0&&(i.startsWith(\"---\")||i.startsWith(\"...\"))&&se(i[3]))&&!(n===this.indentNext-1&&this.flowLevel===1&&(i[0]===\"]\"||i[0]===\"}\")))return this.flowLevel=0,yield kt,yield*this.parseLineStart();let r=0;for(;i[r]===\",\";)r+=yield*this.pushCount(1),r+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(r+=yield*this.pushIndicators(),i[r]){case void 0:return\"flow\";case\"#\":return yield*this.pushCount(i.length-r),\"flow\";case\"{\":case\"[\":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,\"flow\";case\"}\":case\"]\":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?\"flow\":\"doc\";case\"*\":return yield*this.pushUntil(ln),\"flow\";case'\"':case\"'\":return this.flowKey=!0,yield*this.parseQuotedScalar();case\":\":{let o=this.charAt(1);if(this.flowKey||se(o)||o===\",\")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),\"flow\"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){let e=this.charAt(0),t=this.buffer.indexOf(e,this.pos+1);if(e===\"'\")for(;t!==-1&&this.buffer[t+1]===\"'\";)t=this.buffer.indexOf(\"'\",t+2);else for(;t!==-1;){let r=0;for(;this.buffer[t-1-r]===\"\\\\\";)r+=1;if(r%2===0)break;t=this.buffer.indexOf('\"',t+1)}let n=this.buffer.substring(0,t),i=n.indexOf(`\n`,this.pos);if(i!==-1){for(;i!==-1;){let r=this.continueScalar(i+1);if(r===-1)break;i=n.indexOf(`\n`,r)}i!==-1&&(t=i-(n[i-1]===\"\\r\"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext(\"quoted-scalar\");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?\"flow\":\"doc\"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){let t=this.buffer[++e];if(t===\"+\")this.blockScalarKeep=!0;else if(t>\"0\"&&t<=\"9\")this.blockScalarIndent=Number(t)-1;else if(t!==\"-\")break}return yield*this.pushUntil(t=>se(t)||t===\"#\")}*parseBlockScalar(){let e=this.pos-1,t=0,n;e:for(let r=this.pos;n=this.buffer[r];++r)switch(n){case\" \":t+=1;break;case`\n`:e=r,t=0;break;case\"\\r\":{let o=this.buffer[r+1];if(!o&&!this.atEnd)return this.setNext(\"block-scalar\");if(o===`\n`)break}default:break e}if(!n&&!this.atEnd)return this.setNext(\"block-scalar\");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{let r=this.continueScalar(e+1);if(r===-1)break;e=this.buffer.indexOf(`\n`,r)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext(\"block-scalar\");e=this.buffer.length}}let i=e+1;for(n=this.buffer[i];n===\" \";)n=this.buffer[++i];if(n===\"\t\"){for(;n===\"\t\"||n===\" \"||n===\"\\r\"||n===`\n`;)n=this.buffer[++i];e=i-1}else if(!this.blockScalarKeep)do{let r=e-1,o=this.buffer[r];o===\"\\r\"&&(o=this.buffer[--r]);let l=r;for(;o===\" \";)o=this.buffer[--r];if(o===`\n`&&r>=this.pos&&r+1+t>l)e=r;else break}while(!0);return yield Ge,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){let e=this.flowLevel>0,t=this.pos-1,n=this.pos-1,i;for(;i=this.buffer[++n];)if(i===\":\"){let r=this.buffer[n+1];if(se(r)||e&&hs.has(r))break;t=n}else if(se(i)){let r=this.buffer[n+1];if(i===\"\\r\"&&(r===`\n`?(n+=1,i=`\n`,r=this.buffer[n+1]):t=n),r===\"#\"||e&&hs.has(r))break;if(i===`\n`){let o=this.continueScalar(n+1);if(o===-1)break;n=Math.max(n,o-2)}}else{if(e&&hs.has(i))break;t=n}return!i&&!this.atEnd?this.setNext(\"plain-scalar\"):(yield Ge,yield*this.pushToIndex(t+1,!0),e?\"flow\":\"doc\")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){let n=this.buffer.slice(this.pos,e);return n?(yield n,this.pos+=n.length,n.length):(t&&(yield\"\"),0)}*pushIndicators(){let e=0;e:for(;;){switch(this.charAt(0)){case\"!\":e+=yield*this.pushTag(),e+=yield*this.pushSpaces(!0);continue e;case\"&\":e+=yield*this.pushUntil(ln),e+=yield*this.pushSpaces(!0);continue e;case\"-\":case\"?\":case\":\":{let t=this.flowLevel>0,n=this.charAt(1);if(se(n)||t&&hs.has(n)){t?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,e+=yield*this.pushCount(1),e+=yield*this.pushSpaces(!0);continue e}}}break e}return e}*pushTag(){if(this.charAt(1)===\"<\"){let e=this.pos+2,t=this.buffer[e];for(;!se(t)&&t!==\">\";)t=this.buffer[++e];return yield*this.pushToIndex(t===\">\"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(wr.has(t))t=this.buffer[++e];else if(t===\"%\"&&Ii.has(this.buffer[e+1])&&Ii.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){let e=this.buffer[this.pos];return e===`\n`?yield*this.pushCount(1):e===\"\\r\"&&this.charAt(1)===`\n`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,n;do n=this.buffer[++t];while(n===\" \"||e&&n===\"\t\");let i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,n=this.buffer[t];for(;!e(n);)n=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}});var $e,cn=g(()=>{$e=class{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,n=this.lineStarts.length;for(;t<n;){let r=t+n>>1;this.lineStarts[r]<e?t=r+1:n=r}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};let i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}}});function Ae(s,e){for(let t=0;t<s.length;++t)if(s[t].type===e)return!0;return!1}function Li(s){for(let e=0;e<s.length;++e)switch(s[e].type){case\"space\":case\"comment\":case\"newline\":break;default:return e}return-1}function vi(s){switch(s?.type){case\"alias\":case\"scalar\":case\"single-quoted-scalar\":case\"double-quoted-scalar\":case\"flow-collection\":return!0;default:return!1}}function ps(s){switch(s.type){case\"document\":return s.start;case\"block-map\":{let e=s.items[s.items.length-1];return e.sep??e.start}case\"block-seq\":return s.items[s.items.length-1].start;default:return[]}}function We(s){if(s.length===0)return[];let e=s.length;e:for(;--e>=0;)switch(s[e].type){case\"doc-start\":case\"explicit-key-ind\":case\"map-value-ind\":case\"seq-item-ind\":case\"newline\":break e}for(;s[++e]?.type===\"space\";);return s.splice(e,s.length)}function ms(s,e){if(e.length<1e5)Array.prototype.push.apply(s,e);else for(let t=0;t<e.length;++t)s.push(e[t])}function Ci(s){if(s.start.type===\"flow-seq-start\")for(let e of s.items)e.sep&&!e.value&&!Ae(e.start,\"explicit-key-ind\")&&!Ae(e.sep,\"map-value-ind\")&&(e.key&&(e.value=e.key),delete e.key,vi(e.value)?e.value.end?ms(e.value.end,e.sep):e.value.end=e.sep:ms(e.start,e.sep),delete e.sep)}var Ee,fn=g(()=>{us();an();Ee=class{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source=\"\",this.type=\"\",this.lexer=new ve,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(let n of this.lexer.lex(e,t))yield*this.next(n);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}let t=on(e);if(t)if(t===\"scalar\")this.atNewLine=!1,this.atScalar=!0,this.type=\"scalar\";else{switch(this.type=t,yield*this.step(),t){case\"newline\":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case\"space\":this.atNewLine&&e[0]===\" \"&&(this.indent+=e.length);break;case\"explicit-key-ind\":case\"map-value-ind\":case\"seq-item-ind\":this.atNewLine&&(this.indent+=e.length);break;case\"doc-mode\":case\"flow-error-end\":return;default:this.atNewLine=!1}this.offset+=e.length}else{let n=`Not a YAML token: ${e}`;yield*this.pop({type:\"error\",offset:this.offset,message:n,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){let e=this.peek(1);if(this.type===\"doc-end\"&&e?.type!==\"doc-end\"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:\"doc-end\",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case\"document\":return yield*this.document(e);case\"alias\":case\"scalar\":case\"single-quoted-scalar\":case\"double-quoted-scalar\":return yield*this.scalar(e);case\"block-scalar\":return yield*this.blockScalar(e);case\"block-map\":return yield*this.blockMap(e);case\"block-seq\":return yield*this.blockSequence(e);case\"flow-collection\":return yield*this.flowCollection(e);case\"doc-end\":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){let t=e??this.stack.pop();if(!t)yield{type:\"error\",offset:this.offset,source:\"\",message:\"Tried to pop an empty stack\"};else if(this.stack.length===0)yield t;else{let n=this.peek(1);switch(t.type===\"block-scalar\"?t.indent=\"indent\"in n?n.indent:0:t.type===\"flow-collection\"&&n.type===\"document\"&&(t.indent=0),t.type===\"flow-collection\"&&Ci(t),n.type){case\"document\":n.value=t;break;case\"block-scalar\":n.props.push(t);break;case\"block-map\":{let i=n.items[n.items.length-1];if(i.value){n.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case\"block-seq\":{let i=n.items[n.items.length-1];i.value?n.items.push({start:[],value:t}):i.value=t;break}case\"flow-collection\":{let i=n.items[n.items.length-1];!i||i.value?n.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((n.type===\"document\"||n.type===\"block-map\"||n.type===\"block-seq\")&&(t.type===\"block-map\"||t.type===\"block-seq\")){let i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&Li(i.start)===-1&&(t.indent===0||i.start.every(r=>r.type!==\"comment\"||r.indent<t.indent))&&(n.type===\"document\"?n.end=i.start:n.items.push({start:i.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case\"directive-line\":yield{type:\"directive\",offset:this.offset,source:this.source};return;case\"byte-order-mark\":case\"space\":case\"comment\":case\"newline\":yield this.sourceToken;return;case\"doc-mode\":case\"doc-start\":{let e={type:\"document\",offset:this.offset,start:[]};this.type===\"doc-start\"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:\"error\",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case\"doc-start\":{Li(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case\"anchor\":case\"tag\":case\"space\":case\"comment\":case\"newline\":e.start.push(this.sourceToken);return}let t=this.startBlockValue(e);t?this.stack.push(t):yield{type:\"error\",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type===\"map-value-ind\"){let t=ps(this.peek(2)),n=We(t),i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];let r={type:\"block-map\",offset:e.offset,indent:e.indent,items:[{start:n,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=r}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case\"space\":case\"comment\":case\"newline\":e.props.push(this.sourceToken);return;case\"scalar\":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`\n`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`\n`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){let t=e.items[e.items.length-1];switch(this.type){case\"newline\":if(this.onKeyLine=!1,t.value){let n=\"end\"in t.value?t.value.end:void 0;(Array.isArray(n)?n[n.length-1]:void 0)?.type===\"comment\"?n?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case\"space\":case\"comment\":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){let i=e.items[e.items.length-2]?.value?.end;if(Array.isArray(i)){ms(i,t.start),i.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){let n=!this.onKeyLine&&this.indent===e.indent,i=n&&(t.sep||t.explicitKey)&&this.type!==\"seq-item-ind\",r=[];if(i&&t.sep&&!t.value){let o=[];for(let l=0;l<t.sep.length;++l){let a=t.sep[l];switch(a.type){case\"newline\":o.push(l);break;case\"space\":break;case\"comment\":a.indent>e.indent&&(o.length=0);break;default:o.length=0}}o.length>=2&&(r=t.sep.splice(o[1]))}switch(this.type){case\"anchor\":case\"tag\":i||t.value?(r.push(this.sourceToken),e.items.push({start:r}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case\"explicit-key-ind\":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):i||t.value?(r.push(this.sourceToken),e.items.push({start:r,explicitKey:!0})):this.stack.push({type:\"block-map\",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case\"map-value-ind\":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(Ae(t.sep,\"map-value-ind\"))this.stack.push({type:\"block-map\",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]});else if(vi(t.key)&&!Ae(t.sep,\"newline\")){let o=We(t.start),l=t.key,a=t.sep;a.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:\"block-map\",offset:this.offset,indent:this.indent,items:[{start:o,key:l,sep:a}]})}else r.length>0?t.sep=t.sep.concat(r,this.sourceToken):t.sep.push(this.sourceToken);else if(Ae(t.start,\"newline\"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{let o=We(t.start);this.stack.push({type:\"block-map\",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||i?e.items.push({start:r,key:null,sep:[this.sourceToken]}):Ae(t.sep,\"map-value-ind\")?this.stack.push({type:\"block-map\",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case\"alias\":case\"scalar\":case\"single-quoted-scalar\":case\"double-quoted-scalar\":{let o=this.flowScalar(this.type);i||t.value?(e.items.push({start:r,key:o,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(o):(Object.assign(t,{key:o,sep:[]}),this.onKeyLine=!0);return}default:{let o=this.startBlockValue(e);if(o){if(o.type===\"block-seq\"){if(!t.explicitKey&&t.sep&&!Ae(t.sep,\"newline\")){yield*this.pop({type:\"error\",offset:this.offset,message:\"Unexpected block-seq-ind on same line with key\",source:this.source});return}}else n&&e.items.push({start:r});this.stack.push(o);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){let t=e.items[e.items.length-1];switch(this.type){case\"newline\":if(t.value){let n=\"end\"in t.value?t.value.end:void 0;(Array.isArray(n)?n[n.length-1]:void 0)?.type===\"comment\"?n?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case\"space\":case\"comment\":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){let i=e.items[e.items.length-2]?.value?.end;if(Array.isArray(i)){ms(i,t.start),i.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case\"anchor\":case\"tag\":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case\"seq-item-ind\":if(this.indent!==e.indent)break;t.value||Ae(t.start,\"seq-item-ind\")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){let n=this.startBlockValue(e);if(n){this.stack.push(n);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){let t=e.items[e.items.length-1];if(this.type===\"flow-error-end\"){let n;do yield*this.pop(),n=this.peek(1);while(n?.type===\"flow-collection\")}else if(e.end.length===0){switch(this.type){case\"comma\":case\"explicit-key-ind\":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case\"map-value-ind\":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case\"space\":case\"comment\":case\"newline\":case\"anchor\":case\"tag\":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case\"alias\":case\"scalar\":case\"single-quoted-scalar\":case\"double-quoted-scalar\":{let i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case\"flow-map-end\":case\"flow-seq-end\":e.end.push(this.sourceToken);return}let n=this.startBlockValue(e);n?this.stack.push(n):(yield*this.pop(),yield*this.step())}else{let n=this.peek(2);if(n.type===\"block-map\"&&(this.type===\"map-value-ind\"&&n.indent===e.indent||this.type===\"newline\"&&!n.items[n.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type===\"map-value-ind\"&&n.type!==\"flow-collection\"){let i=ps(n),r=We(i);Ci(e);let o=e.end.splice(1,e.end.length);o.push(this.sourceToken);let l={type:\"block-map\",offset:e.offset,indent:e.indent,items:[{start:r,key:e,sep:o}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=l}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`\n`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`\n`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case\"alias\":case\"scalar\":case\"single-quoted-scalar\":case\"double-quoted-scalar\":return this.flowScalar(this.type);case\"block-scalar-header\":return{type:\"block-scalar\",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:\"\"};case\"flow-map-start\":case\"flow-seq-start\":return{type:\"flow-collection\",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case\"seq-item-ind\":return{type:\"block-seq\",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case\"explicit-key-ind\":{this.onKeyLine=!0;let t=ps(e),n=We(t);return n.push(this.sourceToken),{type:\"block-map\",offset:this.offset,indent:this.indent,items:[{start:n,explicitKey:!0}]}}case\"map-value-ind\":{this.onKeyLine=!0;let t=ps(e),n=We(t);return{type:\"block-map\",offset:this.offset,indent:this.indent,items:[{start:n,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!==\"comment\"||this.indent<=t?!1:e.every(n=>n.type===\"newline\"||n.type===\"space\")}*documentEnd(e){this.type!==\"doc-mode\"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type===\"newline\"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case\"comma\":case\"doc-start\":case\"doc-end\":case\"flow-seq-end\":case\"flow-map-end\":case\"map-value-ind\":yield*this.pop(),yield*this.step();break;case\"newline\":this.onKeyLine=!1;default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type===\"newline\"&&(yield*this.pop())}}}});function $i(s){let e=s.prettyErrors!==!1;return{lineCounter:s.lineCounter||e&&new $e||null,prettyErrors:e}}function un(s,e={}){let{lineCounter:t,prettyErrors:n}=$i(e),i=new Ee(t?.addNewLine),r=new Ne(e),o=Array.from(r.compose(i.parse(s)));if(n&&t)for(let l of o)l.errors.forEach(mt(s,t)),l.warnings.forEach(mt(s,t));return o.length>0?o:Object.assign([],{empty:!0},r.streamInfo())}function ds(s,e={}){let{lineCounter:t,prettyErrors:n}=$i(e),i=new Ee(t?.addNewLine),r=new Ne(e),o=null;for(let l of r.compose(i.parse(s),!0,s.length))if(!o)o=l;else if(o.options.logLevel!==\"silent\"){o.errors.push(new x(l.range.slice(0,2),\"MULTIPLE_DOCS\",\"Source contains multiple documents; please use YAML.parseAllDocuments()\"));break}return n&&t&&(o.errors.forEach(mt(s,t)),o.warnings.forEach(mt(s,t))),o}function hn(s,e,t){let n;typeof e==\"function\"?n=e:t===void 0&&e&&typeof e==\"object\"&&(t=e);let i=ds(s,t);if(!i)return null;if(i.warnings.forEach(r=>Dt(i.options.logLevel,r)),i.errors.length>0){if(i.options.logLevel!==\"silent\")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:n},t))}function pn(s,e,t){let n=null;if(typeof e==\"function\"||Array.isArray(e)?n=e:t===void 0&&e&&(t=e),typeof t==\"string\"&&(t=t.length),typeof t==\"number\"){let i=Math.round(t);t=i<1?void 0:i>8?{indent:8}:{indent:i}}if(s===void 0){let{keepUndefined:i}=t??e??{};if(!i)return}return J(s)&&!n?s.toString(t):new te(s,n,t).toString(t)}var _i=g(()=>{sn();pt();dt();Ts();C();cn();fn()});var mn={};ys(mn,{Alias:()=>X,CST:()=>fs,Composer:()=>Ne,Document:()=>te,Lexer:()=>ve,LineCounter:()=>$e,Pair:()=>_,Parser:()=>Ee,Scalar:()=>b,Schema:()=>Ie,YAMLError:()=>Le,YAMLMap:()=>P,YAMLParseError:()=>x,YAMLSeq:()=>j,YAMLWarning:()=>Ce,isAlias:()=>V,isCollection:()=>v,isDocument:()=>J,isMap:()=>Y,isNode:()=>L,isPair:()=>I,isScalar:()=>E,isSeq:()=>Q,parse:()=>hn,parseAllDocuments:()=>un,parseDocument:()=>ds,stringify:()=>pn,visit:()=>G,visitAsync:()=>Be});var dn=g(()=>{sn();pt();Ys();dt();Xe();C();ge();M();be();we();us();an();cn();fn();_i();He()});var Pi={};ys(Pi,{Alias:()=>X,CST:()=>fs,Composer:()=>Ne,Document:()=>te,Lexer:()=>ve,LineCounter:()=>$e,Pair:()=>_,Parser:()=>Ee,Scalar:()=>b,Schema:()=>Ie,YAMLError:()=>Le,YAMLMap:()=>P,YAMLParseError:()=>x,YAMLSeq:()=>j,YAMLWarning:()=>Ce,default:()=>kr,isAlias:()=>V,isCollection:()=>v,isDocument:()=>J,isMap:()=>Y,isNode:()=>L,isPair:()=>I,isScalar:()=>E,isSeq:()=>Q,parse:()=>hn,parseAllDocuments:()=>un,parseDocument:()=>ds,stringify:()=>pn,visit:()=>G,visitAsync:()=>Be});var kr,Mi=g(()=>{dn();dn();kr=mn});var Nr=qi((eu,Bi)=>{Bi.exports=(Mi(),Fi(Pi))});return Nr();})();\n";
    var YamlLib = null;
    function makeYamlLibIsolated() { return new Function(YamlLibSrc + "\n;return YamlLib")() }

    /**
     * @weibaohui/dsh-plugin-kit — client source（由消费者构建脚本内联进 bundle，
     * 不经 loader 运行时加载）。对外暴露 PluginKit：
     *
     *   PluginKit.substituteParams(template, params)   — {{key}} 模板插值
     *   PluginKit.makeActionShareDialog(React, opts)   — 返回 ActionShareDialog 组件
     *
     * ActionShareDialog props：
     *   title / hint / rows: [[label, value], ...] / initialPrompt
     *   params: [{ key, label?, placeholder?, multiline?, value? }]  — 可选；模板参数
     *     输入区（idle 态渲染在 prompt 上方），值实时替换进 prompt 的 {{key}} 占位符
     *   completedView: ({ job, output, close, retry }) => node  — 可选；完成态插槽，
     *     提供后 job done 不再渲染默认「输出原文」，改由插槽全权负责（如解析 AI 输出
     *     成可编辑表单 + 创建按钮），Dialog footer 同时置空，操作按钮由插槽自承
     *   run: async (prompt) => { jobId }      — 发起执行
     *   poll: async (jobId) => { status, output, code }
     *   labels: { copy, copied, run, running, done, failed, outputLabel, openSession, close }
     *   onOpenSession: (sessionId) => void                — 可选；job 出现 sessionId 时渲染「打开会话」
     *   onClose
     *
     * 全部样式内联（主题 token + 回退值），消费者无需自带 CSS。
     */
    var PluginKit = (function () {
      function substituteParams(template, params) {
        var out = String(template || '')
        for (var key in (params || {})) out = out.split('{{' + key + '}}').join(String(params[key]))
        return out
      }

      function makeActionShareDialog(React, options) {
        options = options || {}
        var h = React.createElement
        var useState = React.useState
        var useEffect = React.useEffect
        var useRef = React.useRef
        var doFetch = options.fetch || (typeof fetch !== 'undefined' ? fetch : null)
        var inputStyle = { width: '100%', minHeight: 190, resize: 'vertical', fontFamily: 'var(--dsw-font-family)', lineHeight: 1.6, fontSize: 12, background: 'var(--dsw-alias-bg-layer-2,transparent)', color: 'inherit', border: '1px solid var(--dsw-alias-border-l2,rgba(128,128,128,.3))', borderRadius: '8px', padding: '10px', boxSizing: 'border-box' }
        var paramStyle = { width: '100%', fontFamily: 'var(--dsw-font-family)', lineHeight: 1.5, fontSize: 13, background: 'var(--dsw-alias-bg-layer-2,transparent)', color: 'inherit', border: '1px solid var(--dsw-alias-border-l2,rgba(128,128,128,.3))', borderRadius: '8px', padding: '6px 10px', boxSizing: 'border-box' }
        var btnStyle = { background: 'transparent', color: 'inherit', border: '1px solid var(--dsw-alias-border-l2,rgba(128,128,128,.3))', borderRadius: '8px', padding: '5px 12px', fontSize: 13, cursor: 'pointer', font: 'inherit' }
        // 主按钮亮暗跟随：与 skills-management .sk-btn-primary 同款 token 组合
        var primaryStyle = Object.assign({}, btnStyle, { background: 'var(--dsw-alias-state-business-primary,var(--dsw-alias-brand-primary,#4a7dff))', borderColor: 'transparent', color: 'var(--dsw-alias-label-primary-inverted,#fff)' })

        return function ActionShareDialog(props) {
          var title = props.title
          var hint = props.hint
          var labels = props.labels || {}
          // 模板参数定义（[{key,label,placeholder,multiline,value}]）→ 值表
          var paramDefs = Array.isArray(props.params) ? props.params : []
          var initialParamValues = {}
          for (var pi = 0; pi < paramDefs.length; pi++) {
            var def = paramDefs[pi]
            initialParamValues[def.key] = def.value !== undefined && def.value !== null ? String(def.value) : ''
          }
          var _pv = useState(initialParamValues)
          var paramValues = _pv[0]; var setParamValues = _pv[1]
          var _p = useState(props.initialPrompt || '')
          var prompt = _p[0]; var setPrompt = _p[1]
          // 「上次自动生成的 prompt」ref 镜像：effect 里比较当前 prompt 是否等于它，
          // 判断用户是否手动编辑过——未手改则参数/模板变化可安全覆盖，手改过则保留
          // 手动编辑（ntd ActionButton 的 lastGenerated 同款规则）。旧 dirty 单标记
          // 无法表达「手改后又想让参数替换生效」的场景，且要同时服务 initialPrompt
          // 异步到位的跟随行为，故统一收敛到这一处比较。
          var lastGeneratedRef = useRef(null)
          var _j = useState(null)
          var job = _j[0]; var setJob = _j[1]
          var _b = useState(false)
          var busy = _b[0]; var setBusy = _b[1]
          var _c = useState(false)
          var copied = _c[0]; var setCopied = _c[1]
          var _e = useState('')
          var error = _e[0]; var setError = _e[1]

          // 参数值/模板变化 → 重新生成 prompt；仅当用户未手改时覆盖
          useEffect(function () {
            var generated = substituteParams(props.initialPrompt || '', paramValues)
            var userEdited = lastGeneratedRef.current !== null && prompt !== lastGeneratedRef.current
            lastGeneratedRef.current = generated
            if (!userEdited) setPrompt(generated)
          }, [props.initialPrompt, paramValues])

          useEffect(function () {
            if (job === null || job.status !== 'running' || typeof props.poll !== 'function') return
            var timer = setInterval(function () {
              props.poll(job.jobId).then(function (d) {
                setJob({ jobId: job.jobId, status: d.status, output: d.output || '', code: d.code !== undefined ? d.code : null, sessionId: d.sessionId })
              }).catch(function () {})
            }, 1500)
            return function () { clearInterval(timer) }
          }, [job !== null && job.jobId])

          var setParam = function (key, value) {
            setParamValues(function (prev) {
              var next = {}
              for (var k in prev) next[k] = prev[k]
              next[key] = value
              return next
            })
          }

          var doRun = function () {
            if (typeof props.run !== 'function') return
            setBusy(true); setError('')
            props.run(prompt).then(function (r) {
              setJob({ jobId: r.jobId, status: 'running', output: '', code: null })
            }).catch(function (e) { setError(String(e && e.message)) }).finally(function () { setBusy(false) })
          }
          var canOpenSession = typeof props.onOpenSession === 'function' && job !== null && job.sessionId
          var openSession = function () { props.onOpenSession(job.sessionId) }
          var copy = function () {
            if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(prompt).then(function () { setCopied(true); setTimeout(function () { setCopied(false) }, 1500) }).catch(function () {})
            }
          }
          var statusText = job === null ? '' : job.status === 'running' ? (labels.running || 'running') : job.status === 'done' ? (labels.done || 'done') : (labels.failed || 'failed') + (job.code != null ? ' (' + job.code + ')' : '')
          // 完成态插槽：提供后 job done 由插槽全权渲染（footer 置空，操作按钮插槽自承）
          var completedSlot = typeof props.completedView === 'function' && job !== null && job.status === 'done'

          return h('div', { onClick: function (e) { if (e.target === e.currentTarget && props.onClose) props.onClose() }, style: { position: 'fixed', inset: 0, zIndex: 2147483000, background: 'rgba(0,0,0,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            h('div', { style: { width: 'min(640px,92vw)', maxHeight: '86vh', overflow: 'auto', background: 'var(--dsw-alias-bg-layer-1,#fff)', border: '1px solid var(--dsw-alias-border-l2,rgba(128,128,128,.3))', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: 12, color: 'var(--dsw-alias-label-primary,inherit)', font: 'var(--dsw-font-family,inherit)' } },
              h('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                h('div', { style: { fontSize: 17, fontWeight: 600 } }, title || ''),
                h('button', { onClick: props.onClose, style: Object.assign({}, btnStyle, { marginLeft: 'auto', width: 28, height: 28, padding: 0, borderRadius: 28 }) }, '✕')),
              hint ? h('div', { style: { fontSize: 12, opacity: .7 } }, hint) : null,
              // 模板参数输入区（idle 态；值实时替换进 prompt，位于 prompt 上方与 ntd 同布局）
              paramDefs.length > 0 ? h('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
                paramDefs.map(function (d) {
                  return h('label', { key: d.key, style: { display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, opacity: .85 } },
                    h('span', null, d.label || d.key),
                    d.multiline
                      ? h('textarea', { value: paramValues[d.key] || '', placeholder: d.placeholder || '', onChange: function (e) { setParam(d.key, e.target.value) }, spellCheck: false, style: Object.assign({}, paramStyle, { minHeight: 64, resize: 'vertical' }) })
                      : h('input', { value: paramValues[d.key] || '', placeholder: d.placeholder || '', onChange: function (e) { setParam(d.key, e.target.value) }, style: paramStyle }))
                })) : null,
              (props.rows || []).length > 0 ? h('div', { style: { display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13 } },
                props.rows.map(function (r, i) {
                  return r[1] ? h('div', { key: i }, h('b', null, r[0] + '：'), h('span', null, r[1])) : null
                })) : null,
              h('textarea', { value: prompt, onChange: function (e) { setPrompt(e.target.value) }, spellCheck: false, style: inputStyle }),
              error !== '' ? h('div', { style: { fontSize: 12, color: 'var(--dsw-alias-state-error,#c75050)' } }, error) : null,
              completedSlot
                ? props.completedView({ job: job, output: job.output || '', close: props.onClose, retry: doRun })
                : (job !== null ? h('div', null,
                    h('div', { style: { fontSize: 12, opacity: .7, margin: '4px 0' } }, (labels.outputLabel || 'Output') + ' · ' + statusText),
                    h('pre', { style: { maxHeight: 220, margin: 0, overflow: 'auto', whiteSpace: 'pre-wrap', fontSize: 12, background: 'var(--dsw-alias-bg-layer-2,transparent)', border: '1px solid var(--dsw-alias-border-l2,rgba(128,128,128,.2))', borderRadius: '8px', padding: '8px' } }, job.output || '…')) : null),
              completedSlot ? null : h('div', { style: { display: 'flex', gap: 8 } },
                canOpenSession ? h('button', { onClick: openSession, style: btnStyle }, labels.openSession || 'Open chat') : null,
                h('button', { onClick: copy, style: btnStyle }, copied ? (labels.copied || 'Copied') : (labels.copy || 'Copy')),
                h('button', { onClick: doRun, disabled: busy || (job !== null && job.status === 'running'), style: primaryStyle }, job !== null && job.status === 'running' ? (labels.running || 'Running…') : (labels.run || 'Run')))))
        }
      }

      return { substituteParams: substituteParams, makeActionShareDialog: makeActionShareDialog }
    })()

    /**
     * @weibaohui/dsh-process — Browser half（工艺管理）。
     *
     * 三个挂载面：
     * - 侧栏入口行（DOM 注入「新会话」下方，与任务看板同一家族块；滚动数字 = 我的 | 内置）。
     * - 主页面：官方 root 级 `shell.overlay` slot（列表+详情/编辑器全页工作台；侧栏保持可点；
     *   Esc / 点会话行 / 与其他面板互斥时关闭）。
     * - 兜底：shell.overlay 未渲染的壳层组合下，开面板 450ms 自动改走中栏注入。
     *
     * 数据流：EventSource /dsh-process/events 变更帧 → 全量 refetch + revision 追赶
     * （taskboard S16 同款）；编辑走 baseHash 乐观锁，409 给「重新加载 / 仍然覆盖」。
     *
     * React 是 loader 平台模块；plain Node（契约测试）下降级为最小 shim。
     */

    let __React = null
    try { __React = require('react') } catch {}
    if (!__React || typeof __React.createElement !== 'function') {
      __React = {
        createElement(type, props, ...kids) {
          return { type, props: props || {}, kids: kids.flat(9).filter(k => k !== null && k !== undefined && k !== false && k !== true) }
        },
        useState(init) { const v = [typeof init === 'function' ? init() : init]; return [v[0], x => { v[0] = typeof x === 'function' ? x(v[0]) : x }] },
        useEffect() {}, useMemo(fn) { return fn() }, useRef(v = null) { return { current: v } },
      }
    }
    const { createElement: h, useState, useEffect, useMemo, useRef, useCallback } = __React

    const CLIENT_NAME = '@weibaohui/dsh-process'
    const API = '/dsh-process'
    const NS = 'dshProcess'
    const PANEL_NAME = 'dsh-process'
    const ACTIVATE_EVENT = 'dsh-panel-activate'
    const ENTRY_ATTR = 'data-dsh-prc-entry'
    const PREFS_KEY = 'dsh-prc:prefs'

    // ── i18n ─────────────────────────────────────────────────────────────────

    const ZH = {
      title: '工艺库',
      entryAria: '打开工艺库',
      entryTitle: '工艺库 — 我的 {user} · 内置 {bundled}',
      count: '我的 {user} · 内置 {bundled}',
      searchPlaceholder: '搜索名称 / 描述…',
      filterAll: '全部来源', filterUser: '我的', filterBundled: '内置',
      categoryAll: '全部分类', complexityAll: '全部复杂度',
      sortDefault: '按名称', sortUpdated: '按更新时间', sortComplexity: '按复杂度', sortLinks: '按环节数',
      newTask: '新建', newBlank: '空白工艺', newFromExisting: '复制现有…',
      importBtn: '导入', exportBtn: '导出', exportAll: '全部（zip）', exportUser: '我的库（zip）', exportOne: '本工艺（yaml）',
      settingsBtn: '设置', aiBtn: 'AI 生成',
      close: '关闭', cancel: '取消', save: '保存', confirm: '确认', delete: '删除', edit: '编辑', copy: '复制', rename: '重命名',
      copyToMine: '复制到我的库', reload: '重新加载', overwrite: '仍然覆盖', discard: '放弃修改', keepEditing: '继续编辑',
      tabOverview: '概览', tabStructure: '结构', tabYaml: 'YAML',
      loading: '加载中…', emptyList: '没有匹配的工艺', emptyListHint: '试试清空筛选，或「新建 / 导入」一个工艺',
      emptyDetail: '从左侧选择一个工艺', selectFirst: '左侧选择工艺后在这里看概览、结构与 YAML',
      errOne: '处错误', warnOne: '处警告',
      readOnly: '内置 · 只读', mine: '我的', bundled: '内置',
      limits: '限额', steps: '环节执行上限', tokens: 'token 上限', unlimited: '不限',
      abnormal: '异常触发', phases: '阶段', links: '环节',
      diagnostics: '诊断', noIssues: '校验通过，没有发现问题',
      name: '名称', displayName: '显示名', guid: 'GUID', version: '版本', category: '分类', complexity: '复杂度',
      prompt: '指令 prompt', executor: '执行器', expert: '专家', skills: '技能', model: '模型',
      artifacts: '期望产物', gates: '门禁', flow: '流转', rework: '返工上限', acceptance: '验收标准', reviewPrompt: '复核提示词', reviewType: '复核方式',
      onSuccess: '成功后', onGateFail: '门禁不过', onRatingFail: '评级不过',
      flowNext: '下一环节', flowEnd: '结束', flowBreak: '中止（询问用户）',
      editorTitle: '编辑', editorCreate: '新建工艺', editorCopy: '复制工艺',
      unsaved: '未保存', saved: '已保存', validating: '校验中…',
      saveConflict: '文件已被外部修改（可能是 ntd 或其他编辑器）。', forcedHint: '覆盖将丢弃外部改动。',
      dirtyGuard: '有未保存的修改，确定放弃吗？',
      deleteConfirm: '删除后移入回收站（.trash），确定删除',
      createName: '工艺名（文件名，不含 .yaml）', createDir: '子目录（可选，如 software）', createDisplayName: '显示名（可选）',
      copyName: '新工艺名', importTitle: '导入工艺', importHint: '选择或拖入 .yaml / .yml（可多选），导入到我的库',
      importOverwrite: '覆盖同名文件', importPick: '选择文件', importResults: '导入结果',
      importCreated: '已导入', importOverwritten: '已覆盖', importExists: '同名已存在（未导入）', importInvalid: '校验未通过',
      settingsTitle: '工艺库设置', settingsUserRoot: '我的库根目录', settingsBundledRoot: '内置库根目录（只读）',
      settingsMaxDepth: '扫描深度', settingsCheckRefs: '校验专家/技能引用', settingsSaved: '设置已保存，正在重扫',
      renameTitle: '重命名工艺', newName: '新名称',
      aiTitle: 'AI 生成工艺', aiHint: '描述要解决的需求，AI 会产出一版工艺 YAML；生成后可校验并写入我的库',
      aiRequirement: '要做什么（需求描述）', aiComplexity: '复杂度（light/standard/complex…）', aiReference: '参考工艺（可选）',
      aiPreviewTitle: '生成结果预览', aiSaveName: '写入名称', aiSave: '写入我的库', aiParseFail: '输出里没有找到 YAML 代码块',
      copied: '已复制', copyYaml: '复制 YAML',
      openSession: '打开会话', aiRunning: '生成中…', aiDone: '生成完成',
      openLib: '打开工艺库', settingsSectionHint: '工艺 = ntd 的多阶段 agent 工作流模板；此处配置工艺库根目录。',
      validate: '校验', linesCount: '{n} 行',
      toastSaved: '已保存', toastForceSaved: '已覆盖保存', toastCopied: '已复制到我的库', toastRenamed: '已重命名',
      toastTrashed: '已移入回收站（.trash）', toastImported: '{n} 个工艺已导入', toastAiSaved: '已写入我的库',
      copyPrompt: '复制 Prompt', aiOutput: '输出', aiFailed: '失败', aiRequirementPh: '例如：把口头需求整理成 PRD 并拆解成开发任务',
      kitMissing: 'dsh-plugin-kit 未内联（构建问题）', nameRule: '名称不能为空、不能含 / 或 \\、不能以点开头',
      sessionUnavailable: '当前页面拿不到会话服务，无法跳转',
      atAgent: '给 agent', atAgentTitle: '@ 进对话框，让 agent 帮你修改这个工艺（输入你的修改要求后发送）',
      atAgentBundledTitle: '@ 进对话框（内置只读，agent 会改完存成你的新工艺）',
      atAgentBundledHint: '（这是内置只读工艺——请改完用 process_save 存成我的库里的新工艺）',
      atInserted: '已 @ 进对话框：输入你的修改要求后发送', atCopied: '没找到输入框，已复制引用到剪贴板',
      viewLib: '工艺库', viewExec: '执行',
      runCreate: '▶ 按工艺执行', runWorkspace: '工作区（可选）', runStarted: '运行已发起',
      workspaceDefault: '默认（不绑定）',
      statusQueued: '排队中', statusRunning: '运行中', statusPaused: '已暂停', statusAwaiting: '等待裁决',
      statusDone: '已完成', statusStopped: '已停止', statusFailed: '失败',
      pause: '暂停', resume: '继续', stopRun: '停止运行', stopConfirm: '停止后当前环节结果作废，确定停止？',
      noRuns: '还没有运行记录', noRunsHint: '到「工艺库」打开一个工艺，点「▶ 按工艺执行」发起一次运行',
      emptyRun: '左侧选择一次运行查看看板',
      progress: '{done}/{total} 环节', attemptN: '第 {n} 次尝试', reworkN: '返工 ×{n}',
      gateLabel: '门禁', gateScore: '{score} 分（线 {min}）',
      openSession: '打开会话', outputLabel: '实时输出', retryLink: '重跑本环节', skipLink: '跳过本环节',
      breakTitle: '门禁未过，等待你的裁决', decisionRetry: '重试本环节', decisionSkip: '跳过本环节', decisionStop: '中止运行',
      linkPending: '待跑', linkDone: '完成', linkRunning: '进行中', linkGateFailed: '门禁未过', linkSkipped: '跳过', linkFailed: '失败', linkAbandoned: '中断',
      currentStep: '当前', runError: '运行异常',
      runUserInput: '需求 / 要处理的问题（必填，会注入每个环节）', runUserInputPh: '例如：把「XX」这条口头需求整理成 PRD 并拆解任务',
      formMode: '表单', yamlMode: 'YAML', formUnparseable: '当前 YAML 有语法错误，请切到 YAML 模式修复后再用表单',
      formBasic: '基本信息', formLimits: '限额', formPhases: '阶段', formAddPhase: '+ 添加阶段', formAddLink: '+ 添加环节',
      formDelPhase: '删除阶段', formDelLink: '删除环节', formAddGate: '+ 添加门禁', formGateName: '门禁名（如 产物存在）', formGateMin: '分数线',
      formName: '环节名', formGates: '门禁', formGateType: '门禁类型', formGateArtifact: '产物名',
      formSkillsPh: '技能1, 技能2', formIdHint: 'id 被流转引用，改动会自动级联更新引用',
      formDisplayName: '显示名', formVersion: '版本', formCategory: '分类', formComplexity: '复杂度', formDescription: '描述',
      formMaxSteps: '环节执行上限（空=不限）', formMaxTokens: 'token 上限（空=不限）', formPrompt: '指令 prompt',
      formAcceptance: '验收标准', formPhaseName: '阶段名', formPhaseSpec: '阶段说明', formExecutor: '执行器', formExpert: '专家',
      formModel: '模型', formReviewType: '复核方式', formMaxRework: '返工上限', formOnSuccess: '成功后',
      formOnGateFail: '门禁不过', formOnRatingFail: '评级不过', formNewLinkName: '新环节',
      tabFlow: '流程图',
      flowGate: '门禁 ≥{min}', flowRework: '返工≤{n}', flowNoGate: '无门禁',
      flowLegendForward: '正常流转', flowLegendJump: '跳转', flowLegendFail: '门禁未过回跳', flowLegendBreak: '中止（不连线）',
      flowRunCurrent: '当前环节', flowRunDone: '已完成', flowRunGateFailed: '门禁未过', flowRunSkipped: '跳过', flowRunFailed: '失败',
      flowNoParsed: '工艺无法解析，无法绘制流程图',
    }

    const EN = {
      title: 'Processes', entryAria: 'Open process library', entryTitle: 'Processes — mine {user} · bundled {bundled}',
      count: 'mine {user} · bundled {bundled}', searchPlaceholder: 'Search name / description…',
      filterAll: 'All sources', filterUser: 'Mine', filterBundled: 'Bundled',
      categoryAll: 'All categories', complexityAll: 'All complexities',
      sortDefault: 'By name', sortUpdated: 'By updated', sortComplexity: 'By complexity', sortLinks: 'By links',
      newTask: 'New', newBlank: 'Blank process', newFromExisting: 'Duplicate existing…',
      importBtn: 'Import', exportBtn: 'Export', exportAll: 'All (zip)', exportUser: 'Mine (zip)', exportOne: 'This one (yaml)',
      settingsBtn: 'Settings', aiBtn: 'AI generate',
      close: 'Close', cancel: 'Cancel', save: 'Save', confirm: 'OK', delete: 'Delete', edit: 'Edit', copy: 'Duplicate', rename: 'Rename',
      copyToMine: 'Copy to my library', reload: 'Reload', overwrite: 'Overwrite anyway', discard: 'Discard', keepEditing: 'Keep editing',
      tabOverview: 'Overview', tabStructure: 'Structure', tabYaml: 'YAML',
      loading: 'Loading…', emptyList: 'No matching processes', emptyListHint: 'Try clearing filters, or create / import one',
      emptyDetail: 'Pick a process on the left', selectFirst: 'Overview, structure and YAML show up here after you select one',
      errOne: ' error(s)', warnOne: ' warning(s)',
      readOnly: 'Bundled · read-only', mine: 'Mine', bundled: 'Bundled',
      limits: 'Limits', steps: 'max step runs', tokens: 'max tokens', unlimited: 'unlimited',
      abnormal: 'Abnormal trigger', phases: 'phases', links: 'links',
      diagnostics: 'Diagnostics', noIssues: 'No issues found',
      name: 'Name', displayName: 'Display name', guid: 'GUID', version: 'Version', category: 'Category', complexity: 'Complexity',
      prompt: 'Prompt', executor: 'Executor', expert: 'Expert', skills: 'Skills', model: 'Model',
      artifacts: 'Expected artifacts', gates: 'Gates', flow: 'Flow', rework: 'Max rework', acceptance: 'Acceptance', reviewPrompt: 'Review prompt', reviewType: 'Review',
      onSuccess: 'On success', onGateFail: 'On gate fail', onRatingFail: 'On rating fail',
      flowNext: 'next link', flowEnd: 'end', flowBreak: 'break (ask user)',
      editorTitle: 'Edit', editorCreate: 'New process', editorCopy: 'Duplicate process',
      unsaved: 'Unsaved', saved: 'Saved', validating: 'Validating…',
      saveConflict: 'The file was changed externally (ntd or another editor).', forcedHint: 'Overwriting discards those changes.',
      dirtyGuard: 'Discard unsaved changes?',
      deleteConfirm: 'Delete moves the file into .trash. Delete',
      createName: 'Process name (file name, no .yaml)', createDir: 'Sub-directory (optional, e.g. software)', createDisplayName: 'Display name (optional)',
      copyName: 'New process name', importTitle: 'Import processes', importHint: 'Pick or drop .yaml / .yml files (multi-select) into MY library',
      importOverwrite: 'Overwrite existing files', importPick: 'Choose files', importResults: 'Results',
      importCreated: 'imported', importOverwritten: 'overwritten', importExists: 'skipped (exists)', importInvalid: 'invalid',
      settingsTitle: 'Process library settings', settingsUserRoot: 'My library root', settingsBundledRoot: 'Bundled library root (read-only)',
      settingsMaxDepth: 'Scan depth', settingsCheckRefs: 'Validate expert/skill references', settingsSaved: 'Settings saved; rescanning',
      renameTitle: 'Rename process', newName: 'New name',
      aiTitle: 'AI generate process', aiHint: 'Describe the need; AI drafts a process YAML you can validate and save into MY library',
      aiRequirement: 'What should it do', aiComplexity: 'Complexity (light/standard/complex…)', aiReference: 'Reference process (optional)',
      aiPreviewTitle: 'Generated preview', aiSaveName: 'Save as', aiSave: 'Save to my library', aiParseFail: 'No YAML code block found in the output',
      copied: 'Copied', copyYaml: 'Copy YAML',
      openSession: 'Open chat', aiRunning: 'Generating…', aiDone: 'Generated',
      openLib: 'Open process library', settingsSectionHint: 'A process is an ntd multi-phase agent workflow template; configure library roots here.',
      validate: 'Validate', linesCount: '{n} lines',
      toastSaved: 'Saved', toastForceSaved: 'Overwritten and saved', toastCopied: 'Copied to my library', toastRenamed: 'Renamed',
      toastTrashed: 'Moved to .trash', toastImported: '{n} process(es) imported', toastAiSaved: 'Saved to my library',
      copyPrompt: 'Copy prompt', aiOutput: 'Output', aiFailed: 'Failed', aiRequirementPh: 'e.g. turn a verbal requirement into a PRD and split it into dev tasks',
      kitMissing: 'dsh-plugin-kit not inlined (build issue)', nameRule: 'Name must be non-empty, without / or \\, and not start with a dot',
      sessionUnavailable: 'Session service unavailable on this page',
      atAgent: 'Ask agent', atAgentTitle: '@-reference into the composer and let an agent modify this process',
      atAgentBundledTitle: '@-reference (bundled is read-only; the agent will save a new process into your library)',
      atAgentBundledHint: '(this is a read-only bundled process — save your edited version as a new process in MY library via process_save)',
      atInserted: '@-referenced in the composer: type your change request and send', atCopied: 'Composer not found — reference copied to clipboard',
      viewLib: 'Library', viewExec: 'Runs',
      runCreate: '▶ Run process', runWorkspace: 'Workspace (optional)', runStarted: 'Run started',
      workspaceDefault: 'Default (unbound)',
      statusQueued: 'Queued', statusRunning: 'Running', statusPaused: 'Paused', statusAwaiting: 'Awaiting decision',
      statusDone: 'Done', statusStopped: 'Stopped', statusFailed: 'Failed',
      pause: 'Pause', resume: 'Resume', stopRun: 'Stop run', stopConfirm: 'The running link result will be discarded. Stop?',
      noRuns: 'No runs yet', noRunsHint: 'Open a process in "Library" and click "▶ Run process"',
      emptyRun: 'Pick a run on the left to see its board',
      progress: '{done}/{total} links', attemptN: 'attempt {n}', reworkN: 'rework ×{n}',
      gateLabel: 'Gate', gateScore: '{score} (min {min})',
      openSession: 'Open chat', outputLabel: 'Live output', retryLink: 'Retry link', skipLink: 'Skip link',
      breakTitle: 'Gate failed — awaiting your decision', decisionRetry: 'Retry this link', decisionSkip: 'Skip this link', decisionStop: 'Stop run',
      linkPending: 'pending', linkDone: 'done', linkRunning: 'running', linkGateFailed: 'gate failed', linkSkipped: 'skipped', linkFailed: 'failed', linkAbandoned: 'abandoned',
      currentStep: 'current', runError: 'run error',
      runUserInput: 'Requirement / what to work on (required, injected into every link)', runUserInputPh: 'e.g. turn requirement XX into a PRD and split tasks',
      formMode: 'Form', yamlMode: 'YAML', formUnparseable: 'YAML has syntax errors — fix them in YAML mode before using the form',
      formBasic: 'Basics', formLimits: 'Limits', formPhases: 'Phases', formAddPhase: '+ Add phase', formAddLink: '+ Add link',
      formDelPhase: 'Delete phase', formDelLink: 'Delete link', formAddGate: '+ Add gate', formGateName: 'Gate name (e.g. artifact exists)', formGateMin: 'Min score',
      formName: 'Link name', formGates: 'Gates', formGateType: 'Gate type', formGateArtifact: 'Artifact',
      formSkillsPh: 'skill1, skill2', formIdHint: 'id is referenced by flows; edits cascade to all references',
      formDisplayName: 'Display name', formVersion: 'Version', formCategory: 'Category', formComplexity: 'Complexity', formDescription: 'Description',
      formMaxSteps: 'Max step runs (empty = unlimited)', formMaxTokens: 'Max tokens (empty = unlimited)', formPrompt: 'Prompt',
      formAcceptance: 'Acceptance', formPhaseName: 'Phase name', formPhaseSpec: 'Phase spec', formExecutor: 'Executor', formExpert: 'Expert',
      formModel: 'Model', formReviewType: 'Review', formMaxRework: 'Max rework', formOnSuccess: 'On success',
      formOnGateFail: 'On gate fail', formOnRatingFail: 'On rating fail', formNewLinkName: 'New link',
      tabFlow: 'Flow',
      flowGate: 'gate ≥{min}', flowRework: 'rework≤{n}', flowNoGate: 'no gate',
      flowLegendForward: 'forward', flowLegendJump: 'jump', flowLegendFail: 'gate-fail back', flowLegendBreak: 'break (no edge)',
      flowRunCurrent: 'current', flowRunDone: 'done', flowRunGateFailed: 'gate failed', flowRunSkipped: 'skipped', flowRunFailed: 'failed',
      flowNoParsed: 'Process cannot be parsed — cannot draw flow',
    }

    function makeT(bound) {
      return (key, vars) => {
        let out = (bound && bound(key)) || EN[key] || ZH[key] || key
        if (vars) for (const [k, v] of Object.entries(vars)) out = out.split('{' + k + '}').join(String(v))
        return out
      }
    }

    // ── 样式 ─────────────────────────────────────────────────────────────────

    const STYLE = `
    .dsh-prc-entry { display:flex; align-items:center; gap:8px; position:relative; width:calc(100% - 8px); margin:2px 4px; padding:6px 10px; border:none; border-radius:8px; background:transparent; color:var(--dsw-text-secondary, inherit); font:inherit; font-size:13px; cursor:pointer; text-align:left; }
    .dsh-prc-entry:hover { background:var(--dsw-hover, rgba(128,128,128,.12)); color:var(--dsw-text-primary, inherit); }
    .dsh-prc-entry[data-active="true"] { background:var(--dsw-active, rgba(128,128,128,.18)); color:var(--dsw-text-primary, inherit); font-weight:500; }
    .dsh-prc-entry svg { flex:none; }
    .dsh-prc-entry-stats { margin-left:auto; display:inline-flex; align-items:center; gap:3px; font-size:11px; line-height:1; color:var(--dsw-text-secondary, gray); font-variant-numeric:tabular-nums; white-space:nowrap; }
    .dsh-prc-entry-sep { opacity:.5; }
    .dsh-prc-roll { position:relative; display:inline-block; overflow:hidden; height:12px; min-width:1ch; text-align:center; vertical-align:middle; }
    .dsh-prc-roll[data-stat="user"] { color:#3e63dd; }
    .dsh-prc-roll[data-stat="bundled"] { color:#8e8e93; }
    .dsh-prc-rn { display:block; height:12px; line-height:12px; text-align:center; }
    .dsh-prc-rn-next { position:absolute; left:0; right:0; top:100%; }
    .dsh-prc-roll[data-dir="down"] .dsh-prc-rn-next { top:auto; bottom:100%; }
    .dsh-prc-roll .dsh-prc-rn { transition:transform .3s cubic-bezier(.25,.1,.25,1); }
    .dsh-prc-roll[data-anim="1"][data-dir="up"] .dsh-prc-rn { transform:translateY(-100%); }
    .dsh-prc-roll[data-anim="1"][data-dir="down"] .dsh-prc-rn { transform:translateY(100%); }
    @media (prefers-reduced-motion: reduce) { .dsh-prc-roll .dsh-prc-rn { transition:none; } }
    [data-sidebar-collapsed] [data-dsh-prc-entry], [class*="_collapsed"] [data-dsh-prc-entry] { width:36px; height:36px; min-width:36px; margin:0 0 12px; padding:0; justify-content:center; gap:0; text-align:center; }
    [data-sidebar-collapsed] [data-dsh-prc-entry] .dsh-prc-entry-label, [data-sidebar-collapsed] [data-dsh-prc-entry] .dsh-prc-entry-stats,
    [class*="_collapsed"] [data-dsh-prc-entry] .dsh-prc-entry-label, [class*="_collapsed"] [data-dsh-prc-entry] .dsh-prc-entry-stats { display:none; }

    .dsh-prc-panel { position:absolute; top:0; bottom:0; right:0; display:flex; flex-direction:column; overflow:hidden; pointer-events:auto; background:var(--dsw-alias-bg-base, var(--dsw-bg, #fff)); color:var(--dsw-alias-label-primary, var(--dsw-text-primary, inherit)); font:var(--dsw-font-family, inherit); font-size:13px; z-index:1; }
    .dsh-prc-toolbar { display:flex; align-items:center; gap:8px; flex-wrap:wrap; padding:10px 14px; border-bottom:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.35)); background:var(--dsw-alias-bg-layer-1, transparent); }
    .dsh-prc-title { font-size:15px; font-weight:600; margin:0; }
    .dsh-prc-count { font-size:12px; color:var(--dsw-text-secondary, gray); }
    .dsh-prc-spacer { flex:1; }
    .dsh-prc-btn { border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.35)); background:transparent; color:inherit; border-radius:8px; padding:5px 10px; font:inherit; font-size:13px; cursor:pointer; white-space:nowrap; }
    .dsh-prc-btn:hover { background:var(--dsw-hover, rgba(128,128,128,.12)); }
    .dsh-prc-btn[data-primary="true"] { background:var(--dsw-alias-button-primary-fill, var(--dsw-alias-brand-primary, #1f2328)); border-color:transparent; color:var(--dsw-alias-label-primary-inverted, #fff); }
    .dsh-prc-btn[data-danger="true"] { color:var(--dsw-alias-state-error, #c75050); border-color:var(--dsw-alias-state-error, #c75050); }
    .dsh-prc-btn:disabled { opacity:.5; cursor:default; }
    .dsh-prc-input, .dsh-prc-select { border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.35)); background:var(--dsw-alias-bg-layer-2, transparent); color:inherit; border-radius:8px; padding:5px 8px; font:inherit; font-size:13px; }
    .dsh-prc-search { width:170px; }
    .dsh-prc-body { flex:1; display:flex; min-height:0; }
    .dsh-prc-list { width:300px; min-width:240px; overflow-y:auto; border-right:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.35)); padding:6px; box-sizing:border-box; }
    .dsh-prc-group { margin:8px 2px 4px; font-size:11px; color:var(--dsw-text-secondary, gray); display:flex; align-items:center; gap:6px; }
    .dsh-prc-row { display:flex; flex-direction:column; gap:3px; width:100%; text-align:left; border:1px solid transparent; border-left-width:3px; border-radius:8px; background:transparent; color:inherit; padding:7px 9px; margin:2px 0; cursor:pointer; font:inherit; font-size:13px; position:relative; box-sizing:border-box; }
    .dsh-prc-row:hover { background:var(--dsw-hover, rgba(128,128,128,.1)); }
    .dsh-prc-row[data-selected="true"] { background:var(--dsw-active, rgba(128,128,128,.16)); border-color:var(--dsw-alias-border-l2, rgba(128,128,128,.3)); }
    .dsh-prc-row[data-complexity="light"] { border-left-color:#3e63dd; }
    .dsh-prc-row[data-complexity="lightweight"] { border-left-color:#2aa198; }
    .dsh-prc-row[data-complexity="standard"] { border-left-color:#8e8e93; }
    .dsh-prc-row[data-complexity="medium"] { border-left-color:#d9822b; }
    .dsh-prc-row[data-complexity="complex"] { border-left-color:#8e4ec6; }
    .dsh-prc-row[data-source="bundled"] { border-left-style:dashed; }
    .dsh-prc-row-name { font-weight:500; display:flex; align-items:center; gap:6px; min-width:0; }
    .dsh-prc-row-name span.lbl { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .dsh-prc-row-meta { display:flex; gap:6px; align-items:center; font-size:11px; color:var(--dsw-text-secondary, gray); flex-wrap:wrap; }
    .dsh-prc-badge { border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); border-radius:6px; padding:0 5px; font-size:10px; line-height:16px; white-space:nowrap; }
    .dsh-prc-badge[data-kind="err"] { color:var(--dsw-alias-state-error, #c75050); border-color:var(--dsw-alias-state-error, #c75050); }
    .dsh-prc-badge[data-kind="warn"] { color:#b8860b; border-color:#b8860b; }
    .dsh-prc-dot { width:6px; height:6px; border-radius:6px; display:inline-block; }
    .dsh-prc-dot[data-kind="err"] { background:var(--dsw-alias-state-error, #c75050); }
    .dsh-prc-dot[data-kind="warn"] { background:#d9a514; }
    .dsh-prc-detail { flex:1; min-width:0; overflow-y:auto; padding:14px 18px; box-sizing:border-box; }
    .dsh-prc-detail-head { display:flex; align-items:flex-start; gap:10px; flex-wrap:wrap; margin-bottom:10px; }
    .dsh-prc-detail-title { font-size:17px; font-weight:600; margin:0; }
    .dsh-prc-chips { display:flex; gap:6px; align-items:center; flex-wrap:wrap; margin:6px 0 12px; }
    .dsh-prc-chip { border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); border-radius:999px; padding:1px 9px; font-size:11px; white-space:nowrap; }
    .dsh-prc-actions { margin-left:auto; display:flex; gap:6px; flex-wrap:wrap; }
    .dsh-prc-tabs { display:flex; gap:2px; border-bottom:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); margin-bottom:12px; }
    .dsh-prc-tab { border:none; background:transparent; color:var(--dsw-text-secondary, inherit); padding:7px 12px; font:inherit; font-size:13px; cursor:pointer; border-bottom:2px solid transparent; }
    .dsh-prc-tab[data-on="true"] { color:var(--dsw-text-primary, inherit); font-weight:600; border-bottom-color:var(--dsw-alias-brand-primary, currentColor); }
    .dsh-prc-desc { white-space:pre-wrap; line-height:1.65; margin:0 0 12px; }
    .dsh-prc-kv { display:flex; gap:8px; font-size:12px; margin:3px 0; flex-wrap:wrap; }
    .dsh-prc-kv b { opacity:.7; font-weight:500; }
    .dsh-prc-diag { border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); border-radius:8px; padding:8px 10px; margin:6px 0; display:flex; flex-direction:column; gap:4px; }
    .dsh-prc-diag-item { display:flex; gap:8px; align-items:baseline; cursor:pointer; font-size:12px; border:none; background:transparent; color:inherit; padding:2px 4px; border-radius:6px; text-align:left; font:inherit; width:100%; box-sizing:border-box; }
    .dsh-prc-diag-item:hover { background:var(--dsw-hover, rgba(128,128,128,.1)); }
    .dsh-prc-diag-item[data-kind="err"] .dsh-prc-diag-code { color:var(--dsw-alias-state-error, #c75050); }
    .dsh-prc-diag-item[data-kind="warn"] .dsh-prc-diag-code { color:#b8860b; }
    .dsh-prc-diag-code { font-weight:600; flex:none; }
    .dsh-prc-diag-line { opacity:.6; flex:none; min-width:34px; }
    .dsh-prc-phase { border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); border-radius:10px; padding:10px 12px; margin:8px 0; }
    .dsh-prc-phase-head { display:flex; align-items:baseline; gap:8px; font-weight:600; }
    .dsh-prc-phase-spec { white-space:pre-wrap; font-size:12px; opacity:.8; margin:6px 0; }
    .dsh-prc-link { border-top:1px dashed var(--dsw-alias-border-l1, rgba(128,128,128,.2)); margin-top:6px; padding-top:6px; }
    .dsh-prc-link-row { display:flex; align-items:baseline; gap:8px; width:100%; border:none; background:transparent; color:inherit; font:inherit; font-size:13px; cursor:pointer; padding:4px 2px; border-radius:6px; text-align:left; box-sizing:border-box; }
    .dsh-prc-link-row:hover { background:var(--dsw-hover, rgba(128,128,128,.1)); }
    .dsh-prc-link-id { font-family:ui-monospace, SFMono-Regular, Menlo, monospace; font-size:11px; opacity:.75; flex:none; }
    .dsh-prc-link-meta { font-size:11px; color:var(--dsw-text-secondary, gray); margin-left:auto; display:flex; gap:6px; flex-wrap:wrap; }
    .dsh-prc-link-body { padding:6px 8px 2px; display:flex; flex-direction:column; gap:6px; }
    .dsh-prc-pre { white-space:pre-wrap; line-height:1.6; font-size:12px; background:var(--dsw-alias-bg-layer-2, rgba(128,128,128,.07)); border:1px solid var(--dsw-alias-border-l1, rgba(128,128,128,.2)); border-radius:8px; padding:8px 10px; margin:0; overflow-x:auto; }
    .dsh-prc-code { font-family:ui-monospace, SFMono-Regular, Menlo, monospace; font-size:12px; line-height:1.55; border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); border-radius:10px; overflow:auto; max-height:calc(100vh - 260px); background:var(--dsw-alias-bg-layer-2, rgba(128,128,128,.05)); }
    .dsh-prc-code-line { display:flex; }
    .dsh-prc-code-line[data-hl="true"] { background:rgba(217,130,43,.18); }
    .dsh-prc-code-no { flex:none; width:44px; text-align:right; padding-right:10px; color:var(--dsw-text-secondary, gray); user-select:none; opacity:.7; }
    .dsh-prc-code-tx { white-space:pre; padding-right:16px; }
    .dsh-prc-cm { color:var(--dsw-text-secondary, gray); font-style:italic; }
    .dsh-prc-key { color:#3e63dd; }
    .dsh-prc-editor { display:flex; flex-direction:column; gap:8px; flex:1; min-height:0; }
    .dsh-prc-editor-wrap { display:flex; flex:1; min-height:0; border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.35)); border-radius:10px; overflow:hidden; background:var(--dsw-alias-bg-layer-2, rgba(128,128,128,.05)); }
    .dsh-prc-gutter { flex:none; width:46px; text-align:right; padding:8px 10px 8px 0; font-family:ui-monospace, SFMono-Regular, Menlo, monospace; font-size:12px; line-height:19px; color:var(--dsw-text-secondary, gray); overflow:hidden; user-select:none; opacity:.7; box-sizing:border-box; }
    .dsh-prc-textarea { flex:1; border:none; outline:none; resize:none; background:transparent; color:inherit; font-family:ui-monospace, SFMono-Regular, Menlo, monospace; font-size:12px; line-height:19px; padding:8px 12px; white-space:pre; overflow:auto; tab-size:2; }
    .dsh-prc-status { display:flex; gap:10px; align-items:center; font-size:12px; color:var(--dsw-text-secondary, gray); flex-wrap:wrap; }
    .dsh-prc-conflict { border:1px solid var(--dsw-alias-state-error, #c75050); border-radius:8px; padding:8px 10px; display:flex; gap:8px; align-items:center; flex-wrap:wrap; font-size:12px; }
    .dsh-prc-modal-backdrop { position:fixed; inset:0; z-index:2147482900; background:rgba(0,0,0,.45); display:flex; align-items:center; justify-content:center; }
    .dsh-prc-modal { width:min(560px, 92vw); max-height:86vh; overflow:auto; background:var(--dsw-alias-bg-layer-1, #fff); color:var(--dsw-alias-label-primary, inherit); border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); border-radius:14px; padding:18px; display:flex; flex-direction:column; gap:12px; font:var(--dsw-font-family, inherit); }
    .dsh-prc-modal h3 { margin:0; font-size:16px; }
    .dsh-prc-field { display:flex; flex-direction:column; gap:4px; font-size:12px; }
    .dsh-prc-field input, .dsh-prc-field select, .dsh-prc-field textarea { border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); background:var(--dsw-alias-bg-layer-2, transparent); color:inherit; border-radius:8px; padding:6px 10px; font:inherit; font-size:13px; }
    .dsh-prc-field textarea { resize:vertical; min-height:52px; width:100%; box-sizing:border-box; line-height:1.5; }
    .dsh-prc-menuback { position:fixed; inset:0; z-index:2147482800; }
    .dsh-prc-menu { position:fixed; z-index:2147482850; background:var(--dsw-alias-bg-overlay, var(--dsw-alias-bg-layer-1, #252830)); color:var(--dsw-alias-label-primary, inherit); border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); border-radius:10px; padding:4px; display:flex; flex-direction:column; min-width:150px; box-shadow:0 8px 30px rgba(0,0,0,.25); }
    .dsh-prc-menu button { border:none; background:transparent; color:inherit; text-align:left; padding:7px 10px; border-radius:7px; font:inherit; font-size:13px; cursor:pointer; white-space:nowrap; }
    .dsh-prc-menu button:hover { background:var(--dsw-hover, rgba(128,128,128,.15)); }
    .dsh-prc-toast { position:fixed; left:50%; bottom:26px; transform:translateX(-50%); z-index:2147483000; background:var(--dsw-alias-bg-overlay, #252830); color:var(--dsw-alias-label-primary, #fff); border-radius:10px; padding:8px 14px; font-size:13px; box-shadow:0 6px 24px rgba(0,0,0,.3); max-width:70vw; }
    .dsh-prc-toast[data-kind="err"] { outline:1px solid var(--dsw-alias-state-error, #c75050); }
    .dsh-prc-empty { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; color:var(--dsw-text-secondary, gray); text-align:center; padding:20px; }
    .dsh-prc-error { margin:8px 14px 0; border:1px solid var(--dsw-alias-state-error, #c75050); color:var(--dsw-alias-state-error, #c75050); border-radius:8px; padding:6px 10px; font-size:12px; }
    .dsh-prc-drop { border:2px dashed var(--dsw-alias-border-l2, rgba(128,128,128,.4)); border-radius:10px; padding:22px; text-align:center; font-size:12px; color:var(--dsw-text-secondary, gray); }
    .dsh-prc-drop[data-over="true"] { border-color:var(--dsw-alias-brand-primary, #3e63dd); }
    .dsh-prc-sec { margin:10px 0; }
    .dsh-prc-sec h4 { margin:0 0 6px; font-size:13px; }

    .dsh-prc-runlist { width:280px; min-width:220px; overflow-y:auto; border-right:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.35)); padding:6px; box-sizing:border-box; }
    .dsh-prc-runrow { display:flex; flex-direction:column; gap:3px; width:100%; text-align:left; border:1px solid transparent; border-radius:8px; background:transparent; color:inherit; padding:7px 9px; margin:2px 0; cursor:pointer; font:inherit; font-size:12px; box-sizing:border-box; }
    .dsh-prc-runrow:hover { background:var(--dsw-hover, rgba(128,128,128,.1)); }
    .dsh-prc-runrow[data-selected="true"] { background:var(--dsw-active, rgba(128,128,128,.16)); border-color:var(--dsw-alias-border-l2, rgba(128,128,128,.3)); }
    .dsh-prc-pill { border-radius:999px; padding:1px 8px; font-size:10px; white-space:nowrap; border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); }
    .dsh-prc-pill[data-status="running"] { color:#d9822b; border-color:#d9822b; }
    .dsh-prc-pill[data-status="queued"] { color:#3e63dd; border-color:#3e63dd; }
    .dsh-prc-pill[data-status="awaiting"] { color:#c75050; border-color:#c75050; }
    .dsh-prc-pill[data-status="paused"] { color:#b8860b; border-color:#b8860b; }
    .dsh-prc-pill[data-status="done"] { color:#2e9e5b; border-color:#2e9e5b; }
    .dsh-prc-pill[data-status="stopped"] { color:var(--dsw-text-secondary, gray); }
    .dsh-prc-pill[data-status="failed"] { color:var(--dsw-alias-state-error, #c75050); border-color:var(--dsw-alias-state-error, #c75050); }
    .dsh-prc-board { flex:1; min-width:0; overflow-y:auto; padding:14px 18px; box-sizing:border-box; }
    .dsh-prc-runhead { display:flex; align-items:flex-start; gap:10px; flex-wrap:wrap; margin-bottom:8px; }
    .dsh-prc-break { border:1px solid var(--dsw-alias-state-error, #c75050); border-radius:10px; padding:10px 12px; margin:8px 0; display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
    .dsh-prc-linkcard { border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); border-radius:8px; padding:6px 9px; margin:4px 0; display:flex; flex-direction:column; gap:4px; }
    .dsh-prc-linkcard[data-state="running"] { border-color:#d9822b; }
    .dsh-prc-linkcard[data-state="done"] { opacity:.82; }
    .dsh-prc-linkcard[data-state="gate_failed"] { border-color:var(--dsw-alias-state-error, #c75050); }
    .dsh-prc-linktop { display:flex; align-items:baseline; gap:8px; flex-wrap:wrap; }
    .dsh-prc-linktop .grow { flex:1; }
    .dsh-prc-mini { border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); background:transparent; color:inherit; border-radius:6px; padding:2px 7px; font:inherit; font-size:11px; cursor:pointer; white-space:nowrap; }
    .dsh-prc-mini:hover { background:var(--dsw-hover, rgba(128,128,128,.12)); }
    .dsh-prc-tail { max-height:180px; overflow:auto; margin:0; }
    .dsh-prc-flowwrap { border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); border-radius:10px; background:var(--dsw-alias-bg-layer-2, rgba(128,128,128,.05)); overflow:auto; max-height:460px; }
    .dsh-prc-flowlegend { display:flex; gap:14px; flex-wrap:wrap; font-size:11px; color:var(--dsw-text-secondary, gray); margin:6px 2px 10px; align-items:center; }
    .dsh-prc-flowlegend .sw { display:inline-block; width:18px; height:0; border-top:2px solid; margin-right:4px; vertical-align:middle; }
    .dsh-prc-flowlegend .sw.fwd { border-color:var(--dsw-text-secondary, #94a3b8); }
    .dsh-prc-flowlegend .sw.jump { border-color:#22c55e; }
    .dsh-prc-flowlegend .sw.fail { border-color:var(--dsw-alias-state-error, #ef4444); border-top-style:dashed; }
    .dsh-prc-form { flex:1; min-height:0; overflow-y:auto; padding:12px 16px; box-sizing:border-box; }
    .dsh-prc-fsec { margin:0 0 14px; }
    .dsh-prc-fsec h4 { margin:0 0 8px; font-size:13px; }
    .dsh-prc-fgrid { display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:8px 12px; }
    .dsh-prc-fphase { border:1px solid var(--dsw-alias-border-l2, rgba(128,128,128,.3)); border-radius:10px; padding:10px 12px; margin:8px 0; background:var(--dsw-alias-bg-layer-1, transparent); }
    .dsh-prc-flink { border:1px solid var(--dsw-alias-border-l1, rgba(128,128,128,.2)); border-radius:8px; padding:8px 10px; margin:8px 0; background:var(--dsw-alias-bg-layer-2, rgba(128,128,128,.04)); }
    .dsh-prc-flink .dsh-prc-field { margin:6px 0; }
    .dsh-prc-fgates { border-top:1px dashed var(--dsw-alias-border-l1, rgba(128,128,128,.2)); padding-top:6px; }
    `

    let stylesInjected = false
    function ensureStyles() {
      if (stylesInjected || typeof document === 'undefined') return
      const el = document.createElement('style')
      el.id = 'dsh-prc-styles'
      el.textContent = STYLE
      document.head.appendChild(el)
      stylesInjected = true
    }

    // ── API 帮手 ─────────────────────────────────────────────────────────────

    async function api(path, opts) {
      const res = await fetch(API + path, {
        method: (opts && opts.method) || 'GET',
        headers: opts && opts.body ? { 'content-type': 'application/json' } : undefined,
        body: opts && opts.body ? JSON.stringify(opts.body) : undefined,
        signal: AbortSignal.timeout ? AbortSignal.timeout(30000) : undefined,
      })
      let data = {}
      try { data = await res.json() } catch { /* 空响应 */ }
      if (!res.ok) {
        const e = new Error(data.error || (res.statusText + ' (' + res.status + ')'))
        e.code = data.code
        e.status = res.status
        e.data = data
        throw e
      }
      return data
    }

    function loadPrefs() {
      try { return JSON.parse(localStorage.getItem(PREFS_KEY)) || {} } catch { return {} }
    }
    function savePrefs(prefs) {
      try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)) } catch { /* 隐身模式等 */ }
    }

    // ── Controller ───────────────────────────────────────────────────────────

    function initialState() {
      const prefs = loadPrefs()
      return {
        loaded: false, revision: 0, roots: { user: '', bundled: '' }, processes: [], lastError: undefined, error: undefined,
        panelOpen: false,
        selectedId: prefs.selectedId, tab: prefs.tab || 'overview',
        item: undefined, itemLoading: false, highlightLine: undefined,
        search: '', filters: Object.assign({ source: 'all', category: '', complexity: '' }, prefs.filters || {}),
        sortBy: prefs.sortBy || 'default',
        editor: null,
        dialog: null,
        toast: null,
        settings: undefined,
        view: prefs.view || 'lib',
        runs: { revision: -1, list: [] },
        runId: prefs.runId, run: undefined, runLoading: false,
      }
    }

    class Controller {
      constructor() {
        this.state = initialState()
        this.subs = new Set()
        this.es = null
        this.seenRevision = undefined
        this.seenRunsRevision = undefined
        this.refreshInFlight = null
        this.validateTimer = null
        this.toastTimer = null
        this.disposed = false
      }
      getSnapshot() { return this.state }
      subscribe(fn) { this.subs.add(fn); return () => { this.subs.delete(fn) } }
      setState(patch) { this.state = { ...this.state, ...patch }; this.emit() }
      emit() { if (this.disposed) return; for (const fn of this.subs) { try { fn() } catch {} } }
      persist() {
        const s = this.state
        savePrefs({ selectedId: s.selectedId, tab: s.tab, filters: s.filters, sortBy: s.sortBy, view: s.view, runId: s.runId })
      }
      toast(text, kind) {
        this.setState({ toast: { text, kind: kind || 'ok' } })
        if (this.toastTimer) clearTimeout(this.toastTimer)
        this.toastTimer = setTimeout(() => { if (!this.disposed) this.setState({ toast: null }) }, 2600)
      }

      start() {
        void this.refresh()
        try { this.connectStream() } catch { /* EventSource 不可用：仅手动刷新 */ }
      }
      connectStream() {
        const es = new EventSource(API + '/events')
        this.es = es
        const onFrame = (e) => {
          try { const d = JSON.parse(e.data); this.seenRevision = d.revision; this.seenRunsRevision = d.runsRevision } catch {}
          void this.refresh()
        }
        es.addEventListener('hello', onFrame)
        es.addEventListener('change', onFrame)
        es.onerror = () => { /* EventSource 自动重连；hello 里对齐 gap */ }
      }
      async refresh() {
        if (this.refreshInFlight) return this.refreshInFlight
        this.refreshInFlight = (async () => {
          try {
            let snap
            // revision 追赶：变更帧落在请求飞行中时，旧响应可能落后（taskboard S16）
            for (let round = 0; round < 3; round++) {
              const [stateRsp, runsRsp] = await Promise.all([api('/state'), api('/runs')])
              snap = stateRsp
              const keep = this.state.selectedId && snap.processes.some((p) => p.id === this.state.selectedId)
                ? this.state.selectedId : undefined
              this.setState({
                loaded: true, revision: snap.revision, roots: snap.roots, processes: snap.processes,
                lastError: snap.lastError, error: undefined, selectedId: keep,
                runs: { revision: runsRsp.revision, list: runsRsp.runs },
              })
              const libCaughtUp = this.seenRevision === undefined || snap.revision >= this.seenRevision
              const runsCaughtUp = this.seenRunsRevision === undefined || runsRsp.revision >= this.seenRunsRevision
              if (libCaughtUp && runsCaughtUp) break
            }
            // 运行看板：活跃运行随帧刷新；静态运行只取一次
            if (this.state.view === 'exec' && this.state.runId) {
              const active = ['queued', 'running', 'awaiting'].includes((this.state.run && this.state.run.status) || '')
              if (active || !this.state.run) void this.loadRun(this.state.runId)
            }
            // 选中项跟随外部改动：非编辑态自动刷新；编辑态不打断（保存时乐观锁兜底）
            if (this.state.selectedId && !this.state.itemLoading) {
              if (this.state.editor && this.state.editor.id === this.state.selectedId) { /* 编辑中：跳过 */ }
              else if (this.state.item && this.state.item.meta.id === this.state.selectedId) {
                const fresh = snap.processes.find((p) => p.id === this.state.selectedId)
                if (fresh && this.state.item.meta.hash !== fresh.hash) void this.loadItem(this.state.selectedId)
              } else void this.loadItem(this.state.selectedId)
            }
          } catch (error) {
            this.setState({ error: String(error && error.message || error) })
          } finally {
            this.refreshInFlight = null
          }
        })()
        return this.refreshInFlight
      }
      dispose() {
        this.disposed = true
        if (this.es) { try { this.es.close() } catch {} }
        if (this.validateTimer) clearTimeout(this.validateTimer)
        if (this.toastTimer) clearTimeout(this.toastTimer)
        this.subs.clear()
      }

      // ── 面板 ──
      openPanel() {
        this.setState({ panelOpen: true })
        try { document.dispatchEvent(new CustomEvent(ACTIVATE_EVENT, { detail: PANEL_NAME })) } catch {}
        if (!this.state.loaded) void this.refresh()
        // 兜底：shell.overlay 在某些壳层组合下不渲染 → 450ms 后仍无面板就改走中栏注入，
        // 保证侧栏入口点击永远有响应
        setTimeout(() => {
          if (this.disposed) return
          const s = this.getSnapshot()
          if (s.panelOpen && typeof document !== 'undefined' && !document.querySelector('[data-dsh-prc-panel]')) {
            mountFallbackPanel(this)
          }
        }, 450)
      }
      closePanel() { this.setState({ panelOpen: false, dialog: null }) }
      togglePanel() { if (this.state.panelOpen) this.closePanel(); else this.openPanel() }

      // ── 选择 / 筛选 ──
      select(id) {
        if (!id) return
        const ed = this.state.editor
        if (ed && ed.id !== id) {
          // 编辑中切换：脏了先确认，干净直接关编辑器
          if (ed.dirty) {
            this.setState({ dialog: { type: 'confirm', message: this.tr('dirtyGuard'), danger: true, yes: 'discard', onYes: () => { this.setState({ editor: null, dialog: null }); this.select(id) } } })
            return
          }
          this.setState({ editor: null })
        }
        this.setState({ selectedId: id, item: undefined, itemLoading: true, highlightLine: undefined })
        this.persist()
        void this.loadItem(id)
      }
      async loadItem(id) {
        try {
          const item = await api('/item?id=' + encodeURIComponent(id))
          if (this.state.selectedId !== id) return
          this.setState({ item, itemLoading: false })
        } catch (error) {
          if (this.state.selectedId === id) this.setState({ itemLoading: false, error: String(error && error.message || error) })
        }
      }
      /** 跳到某个会话（AI 生成任务的会话）：客户端 sessions 服务 open(id)，逐次懒解析。 */
      openSession(sessionId) {
        const svc = this.sessionsSvc
        if (!svc || typeof svc.open !== 'function') { this.toast(this.tr('sessionUnavailable'), 'err'); return }
        try { svc.open(sessionId); this.closePanel() } catch (error) { this.toast(String(error && error.message || error), 'err') }
      }
      tr(key, vars) { return this.t ? this.t(key, vars) : (ZH[key] || key) }
      setTab(tab) { this.setState({ tab }); this.persist() }
      setSearch(search) { this.setState({ search }) }
      setFilter(key, value) {
        const filters = { ...this.state.filters, [key]: value }
        this.setState({ filters }); this.persist()
      }
      setSortBy(sortBy) { this.setState({ sortBy }); this.persist() }

      // ── 编辑器 ──
      openEditor(payload) {
        this.setState({
          editor: {
            mode: payload.mode, id: payload.id || null, name: payload.name || '', dir: payload.dir || '',
            text: payload.text || '', baseHash: payload.baseHash || null, original: payload.text || '',
            dirty: false, diagnostics: payload.diagnostics || null, busy: false, conflict: null, error: null,
          },
        })
        this.scheduleValidate(50)
      }
      async editSelected() {
        const item = this.state.item
        if (!item) return
        const t0 = Date.now()
        this.openEditor({ mode: 'update', id: item.meta.id, text: item.yaml, baseHash: item.hash, diagnostics: item.diagnostics })
      }
      async createBlank(name, dir, displayName) {
        try {
          const q = '?name=' + encodeURIComponent(name) + (displayName ? '&displayName=' + encodeURIComponent(displayName) : '')
          const { yaml } = await api('/skeleton' + q)
          this.setState({ dialog: null })
          this.openEditor({ mode: 'create', name, dir, text: yaml })
        } catch (error) { this.toast(String(error && error.message || error), 'err') }
      }
      setEditorText(text) {
        const ed = this.state.editor
        if (!ed) return
        this.setState({ editor: { ...ed, text, dirty: text !== ed.original, conflict: null } })
        this.scheduleValidate()
      }
      scheduleValidate(delay) {
        if (this.validateTimer) clearTimeout(this.validateTimer)
        this.validateTimer = setTimeout(() => { this.validateTimer = null; void this.validateEditor() }, delay === undefined ? 400 : delay)
      }
      async validateEditor() {
        const ed = this.state.editor
        if (!ed || ed.text.trim() === '') return
        try {
          const d = await api('/validate', { method: 'POST', body: { yaml: ed.text } })
          const cur = this.state.editor
          if (cur && cur.text === ed.text) this.setState({ editor: { ...cur, diagnostics: { errors: d.errors, warnings: d.warnings } } })
        } catch { /* 校验失败不打断输入 */ }
      }
      async saveEditor(force) {
        const ed = this.state.editor
        if (!ed || ed.busy) return
        this.setState({ editor: { ...ed, busy: true, error: null } })
        try {
          let body
          if (ed.mode === 'create') body = { mode: 'create', name: ed.name, dir: ed.dir, yaml: ed.text }
          else body = { mode: 'update', id: ed.id, yaml: ed.text, baseHash: force && ed.conflict ? ed.conflict.currentHash : ed.baseHash }
          const result = await api('/save', { method: 'POST', body })
          this.setState({ editor: null, dialog: null })
          this.select(result.id)
          void this.refresh()
          this.toast(force ? this.tr('toastForceSaved') : this.tr('toastSaved'))
        } catch (error) {
          const cur = this.state.editor
          if (!cur) return
          if (error.code === 'conflict') this.setState({ editor: { ...cur, busy: false, conflict: { currentHash: error.data && error.data.currentHash }, error: null } })
          else if (error.data && error.data.diagnostics) this.setState({ editor: { ...cur, busy: false, diagnostics: error.data.diagnostics, error: String(error.message) } })
          else this.setState({ editor: { ...cur, busy: false, error: String(error && error.message || error) } })
        }
      }
      async reloadEditor() {
        const ed = this.state.editor
        if (!ed || !ed.id) return
        try {
          const item = await api('/item?id=' + encodeURIComponent(ed.id))
          this.setState({ editor: { ...ed, text: item.yaml, original: item.yaml, baseHash: item.hash, dirty: false, conflict: null, diagnostics: item.diagnostics, error: null } })
        } catch (error) { this.toast(String(error && error.message || error), 'err') }
      }
      requestCloseEditor() {
        const ed = this.state.editor
        if (ed && ed.dirty) this.setState({ dialog: { type: 'confirm', message: this.tr('dirtyGuard'), danger: true, yes: 'discard', onYes: () => this.setState({ editor: null, dialog: null }) } })
        else this.setState({ editor: null })
      }

      // ── 动作 ──
      async copyProcess(fromId, name, dir) {
        try {
          const result = await api('/save', { method: 'POST', body: { mode: 'copy', fromId, name, dir } })
          this.setState({ dialog: null })
          this.select(result.id)
          void this.refresh()
          this.toast(this.tr('toastCopied'))
        } catch (error) { this.toast(String(error && error.message || error), 'err') }
      }
      async renameProcess(id, newName) {
        try {
          const result = await api('/rename', { method: 'POST', body: { id, newName } })
          this.setState({ dialog: null })
          this.select(result.id || id)
          void this.refresh()
          this.toast(this.tr('toastRenamed'))
        } catch (error) { this.toast(String(error && error.message || error), 'err') }
      }
      async removeProcess(id) {
        try {
          await api('/delete', { method: 'POST', body: { id } })
          this.setState({ dialog: null, selectedId: undefined, item: undefined, editor: null })
          await this.refresh()
          this.toast(this.tr('toastTrashed'))
        } catch (error) { this.toast(String(error && error.message || error), 'err') }
      }
      async importFiles(files, overwrite) {
        const results = await api('/import', { method: 'POST', body: { files, overwrite } }).then((d) => d.results)
        await this.refresh()
        return results
      }
      async loadSettings() {
        const d = await api('/settings')
        this.setState({ settings: d.settings })
        return d.settings
      }
      async saveSettings(patch) {
        const d = await api('/settings', { method: 'POST', body: patch })
        this.setState({ settings: d.settings })
        await this.refresh()
        return d.settings
      }
      aiRun(prompt) { return api('/ai-generate', { method: 'POST', body: { prompt } }).then((d) => d.jobId) }
      aiPoll(jobId) { return api('/jobs?id=' + encodeURIComponent(jobId)) }

      /**
       * @ 给 agent：把工艺文件以 @绝对路径 引用进当前会话的 composer（file-share 同款
       * 双形态写入 + 剪贴板兜底），用户接着输入修改要求发送即可——agent 会用
       * process_get/process_validate/process_save 工具完成修改。
       */
      atAgent(meta) {
        const root = meta.source === 'user' ? this.state.roots.user : this.state.roots.bundled
        const abs = (root || '').replace(/\/+$/, '') + '/' + meta.relPath
        const hint = meta.source === 'bundled' ? this.tr('atAgentBundledHint') : ''
        const text = '@' + abs + ' ' + hint
        const result = insertComposerText(text)
        this.closePanel()
        if (result === 'ok') this.toast(this.tr('atInserted'))
        else this.toast(this.tr('atCopied'), 'err')
      }

      // ── 执行视图（v0.2）──
      setView(view) { this.setState({ view }); this.persist() }
      selectRun(id) {
        if (!id) return
        this.setState({ runId: id, run: undefined, runLoading: true })
        this.persist()
        void this.loadRun(id)
      }
      async loadRun(id) {
        try {
          const d = await api('/run?id=' + encodeURIComponent(id))
          if (this.state.runId !== id) return
          this.setState({ run: d.run, runLoading: false })
        } catch (error) {
          if (this.state.runId === id) this.setState({ runLoading: false, error: String(error && error.message || error) })
        }
      }
      async runAction(action, body) {
        const d = await api('/run-action', { method: 'POST', body: { action, ...body } })
        if (this.state.runId === d.run.id) void this.loadRun(d.run.id)
        void this.refresh()
        return d.run
      }
      async createRun(body) {
        const d = await api('/run-create', { method: 'POST', body })
        this.setState({ dialog: null, view: 'exec', runId: d.run.id, run: undefined, runLoading: true })
        this.persist()
        void this.loadRun(d.run.id)
        this.toast(this.tr('runStarted'))
        return d.run
      }
    }

    // ── 侧栏入口行（DOM 注入，taskboard 家族同款） ─────────────────────────────

    /** 把文本写进当前会话的 composer（file-share 同款双形态 + 剪贴板兜底）。
     *  返回 'ok'（已写入输入框）或 'copied'（退化为剪贴板）。 */
    function insertComposerText(text) {
      try {
        const card = document.querySelector('[data-composer-card]')
        const ta = card && card.querySelector('textarea')
        const ce = card && (card.querySelector('[contenteditable="true"]') || card.querySelector('[contenteditable=""]'))
        if (typeof document.execCommand === 'function' && (ta || ce)) {
          if (ta) {
            ta.focus()
            const len = ta.value ? ta.value.length : 0
            try { ta.setSelectionRange(len, len) } catch {}
          } else if (ce) {
            ce.focus()
            const sel = window.getSelection()
            const range = document.createRange()
            range.selectNodeContents(ce)
            range.collapse(false)
            sel.removeAllRanges()
            sel.addRange(range)
          }
          if (document.execCommand('insertText', false, text)) return 'ok'
        }
      } catch {}
      try { navigator.clipboard.writeText(text) } catch {}
      return 'copied'
    }


    // ── 表单编辑：Document API 双向同步（v0.4）──────────────────────────────

    /** yaml 库：bundle 内 YamlLibSrc 源经 new Function 隔离构造（懒加载，避开其他插件
     * 加载期的全局污染窗口）；plain Node（单测）退回 require('yaml')。 */
    function getYamlLib() {
      try { if (typeof YamlLib !== 'undefined' && YamlLib) return YamlLib } catch {}
      try { if (typeof makeYamlLibIsolated === 'function') { YamlLib = makeYamlLibIsolated(); return YamlLib } } catch {}
      try { return require('yaml') } catch { return null }
    }

    /** 解析编辑器文本为 Document；语法错误返回 null（表单不可用）。 */
    function fmDoc(text) {
      const lib = getYamlLib()
      if (!lib) return null
      try {
        const doc = lib.parseDocument(String(text || ''), { keepSourceTokens: true })
        return doc.errors.length === 0 ? doc : null
      } catch { return null }
    }

    /** setIn：写标量/对象；中间节点缺失自动创建。返回新文本。 */
    function fmSet(text, path, value) {
      const doc = fmDoc(text)
      if (!doc) return text
      try { doc.setIn(path, value) } catch { return text }
      return doc.toString()
    }

    /** deleteIn：删除键或序列项。返回新文本。 */
    function fmDel(text, path) {
      const doc = fmDoc(text)
      if (!doc) return text
      try { doc.deleteIn(path) } catch { return text }
      return doc.toString()
    }

    /** 向序列（如 phases / links / gates）追加一个普通对象。 */
    function fmAppend(text, path, value) {
      const doc = fmDoc(text)
      if (!doc) return text
      try {
        const seq = doc.getIn(path, true)
        if (seq && typeof seq.add === 'function') seq.add(value)
        else doc.setIn(path, [value])
      } catch { return text }
      return doc.toString()
    }

    /** 读路径上的 JS 值（缺失 → dflt）。 */
    function fmGet(text, path, dflt) {
      const doc = fmDoc(text)
      if (!doc) return dflt
      const v = doc.getIn(path)
      return v === undefined || v === null ? dflt : v
    }

    const fmSeqLen = (doc, path) => { const s = doc.getIn(path, true); return s && s.items ? s.items.length : 0 }

    /** 删除环节 + 级联：所有指向被删 id 的 on_success/on_gate_fail 重置（next/break）。 */
    function fmDeleteLink(text, phaseIndex, linkIndex) {
      const doc = fmDoc(text)
      if (!doc) return text
      const linksPath = ['phases', phaseIndex, 'links']
      const deletedId = String(doc.getIn([...linksPath, linkIndex, 'id']) ?? '')
      try { doc.getIn(linksPath, true).delete(linkIndex) } catch { return text }
      if (deletedId) {
        const pc = fmSeqLen(doc, ['phases'])
        for (let pi = 0; pi < pc; pi++) {
          const lc = fmSeqLen(doc, ['phases', pi, 'links'])
          for (let li = 0; li < lc; li++) {
            for (const field of ['on_success', 'on_gate_fail']) {
              const v = doc.getIn(['phases', pi, 'links', li, field])
              if (v === deletedId || v === 'goto:' + deletedId) {
                doc.setIn(['phases', pi, 'links', li, field], field === 'on_success' ? 'next' : 'break')
              }
            }
          }
        }
      }
      return doc.toString()
    }

    /** 删除阶段 + 级联重置其下所有环节 id 的引用。 */
    function fmDeletePhase(text, phaseIndex) {
      const doc = fmDoc(text)
      if (!doc) return text
      const deletedIds = []
      const lc0 = fmSeqLen(doc, ['phases', phaseIndex, 'links'])
      for (let li = 0; li < lc0; li++) {
        const id = doc.getIn(['phases', phaseIndex, 'links', li, 'id'])
        if (id) deletedIds.push(String(id))
      }
      try { doc.getIn(['phases'], true).delete(phaseIndex) } catch { return text }
      const pc = fmSeqLen(doc, ['phases'])
      for (let pi = 0; pi < pc; pi++) {
        const lc = fmSeqLen(doc, ['phases', pi, 'links'])
        for (let li = 0; li < lc; li++) {
          for (const field of ['on_success', 'on_gate_fail']) {
            const v = doc.getIn(['phases', pi, 'links', li, field])
            if (v && (deletedIds.includes(v) || deletedIds.includes(String(v).replace(/^goto:/, '')))) {
              doc.setIn(['phases', pi, 'links', li, field], field === 'on_success' ? 'next' : 'break')
            }
          }
        }
      }
      return doc.toString()
    }

    /** 环节改 id + 级联：所有引用旧 id 的流转值同步替换（含 goto: 前缀）。 */
    function fmSetLinkId(text, phaseIndex, linkIndex, newId) {
      const doc = fmDoc(text)
      if (!doc) return text
      const oldId = String(doc.getIn(['phases', phaseIndex, 'links', linkIndex, 'id']) ?? '')
      doc.setIn(['phases', phaseIndex, 'links', linkIndex, 'id'], newId)
      if (!oldId || oldId === newId) return doc.toString()
      const pc = fmSeqLen(doc, ['phases'])
      for (let pi = 0; pi < pc; pi++) {
        const lc = fmSeqLen(doc, ['phases', pi, 'links'])
        for (let li = 0; li < lc; li++) {
          for (const field of ['on_success', 'on_gate_fail']) {
            const v = doc.getIn(['phases', pi, 'links', li, field])
            if (v === oldId) doc.setIn(['phases', pi, 'links', li, field], newId)
            else if (v === 'goto:' + oldId) doc.setIn(['phases', pi, 'links', li, field], 'goto:' + newId)
          }
        }
      }
      return doc.toString()
    }

    const ICON = '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1.5" y="1.5" width="5" height="4.5" rx="1"/><rect x="9.5" y="10" width="5" height="4.5" rx="1"/><path d="M4 6v3.5A1.5 1.5 0 0 0 5.5 11h4"/></svg>'

    function sidebarRoot() {
      const column = document.querySelector('[data-pane="sidebar"], [class*="sidebarCol"], .dshDesktopUpstreamSidebar, .dshDesktopSidebarSurface')
      if (column === null) return undefined
      const logoOwner = column.querySelector('[class*="logoRow"]') && column.querySelector('[class*="logoRow"]').parentElement
      return logoOwner || (column.firstElementChild || undefined)
    }

    function newSessionButton(root) {
      const nested = root.querySelector('button[class*="newSession"]')
      if (nested) return nested
      for (const child of root.children) {
        if (child instanceof HTMLButtonElement && !child.matches('[' + ENTRY_ATTR + ']')) return child
      }
      const byAria = root.querySelector('button[aria-label="新建会话"], button[aria-label="New Session"], button[aria-label*="新会话"], button[aria-label*="new session" i]')
      if (byAria) return byAria
      const buttons = Array.from(root.querySelectorAll('button'))
      return buttons.find((b) => !b.matches('[' + ENTRY_ATTR + ']') && /新会话|新建会话|new session/i.test(b.textContent || ''))
    }

    function createEntry(controller, t) {
      const entry = document.createElement('button')
      entry.type = 'button'
      entry.setAttribute(ENTRY_ATTR, '')
      entry.className = 'dsh-prc-entry'
      entry.setAttribute('aria-label', t('entryAria'))
      entry.innerHTML = '<span class="dsh-prc-entry-icon">' + ICON + '</span><span class="dsh-prc-entry-label"></span><span class="dsh-prc-entry-stats"></span>'
      entry.addEventListener('click', () => controller.togglePanel())
      return entry
    }

    function setRollValue(slot, value) {
      const text = String(value)
      if (slot.dataset.value === text) return
      const previous = slot.dataset.value
      slot.dataset.value = text
      slot.style.minWidth = text.length + 'ch'
      if (previous === undefined) { slot.textContent = text; return }
      if (slot.dataset.busy === '1') { slot.dataset.busy = ''; slot.dataset.anim = '' }
      const oldEl = document.createElement('span'); oldEl.className = 'dsh-prc-rn'; oldEl.textContent = previous
      const newEl = document.createElement('span'); newEl.className = 'dsh-prc-rn dsh-prc-rn-next'; newEl.textContent = text
      slot.replaceChildren(oldEl, newEl)
      slot.dataset.dir = value > Number(previous) ? 'up' : 'down'
      slot.dataset.busy = '1'
      requestAnimationFrame(() => { slot.dataset.anim = '1' })
      const finish = () => {
        if (slot.dataset.busy !== '1') return
        slot.dataset.busy = ''; slot.dataset.anim = ''
        slot.textContent = slot.dataset.value || ''
      }
      slot.addEventListener('transitionend', finish, { once: true })
      setTimeout(finish, 400)
    }

    function wireEntrySync(entry, controller, t) {
      const stats = entry.querySelector('.dsh-prc-entry-stats')
      const label = entry.querySelector('.dsh-prc-entry-label')
      const slots = []
      if (stats) {
        for (let i = 0; i < 2; i++) {
          if (i > 0) { const sep = document.createElement('span'); sep.className = 'dsh-prc-entry-sep'; sep.textContent = '|'; stats.append(sep) }
          const slot = document.createElement('span')
          slot.className = 'dsh-prc-roll'
          slot.dataset.stat = i === 0 ? 'user' : 'bundled'
          stats.append(slot); slots.push(slot)
        }
      }
      const sync = () => {
        const s = controller.getSnapshot()
        if (s.panelOpen) entry.dataset.active = 'true'; else delete entry.dataset.active
        const user = s.processes.filter((p) => p.source === 'user').length
        const bundled = s.processes.filter((p) => p.source === 'bundled').length
        if (slots[0]) setRollValue(slots[0], user)
        if (slots[1]) setRollValue(slots[1], bundled)
        if (label) label.textContent = t('title')
        entry.setAttribute('aria-label', t('entryAria'))
        entry.title = t('entryTitle', { user, bundled })
      }
      return sync
    }

    function placeEntry(root, entry) {
      const button = newSessionButton(root)
      if (!button) return false
      if (entry.parentElement !== root) {
        const family = Array.from(root.children).filter((el) => el instanceof HTMLElement
          && el.matches('[' + ENTRY_ATTR + '], [data-dsh-atb-entry], [data-dsh-taskboard-entry], [data-dsh-ssh-entry]'))
        if (family.length > 0) {
          const last = family[family.length - 1]
          last.parentElement.insertBefore(entry, last.nextSibling)
        } else {
          const row = button.closest('[class*="logoRow"]')
          const base = (row && row.parentElement === root) ? row : button
          root.insertBefore(entry, base.nextSibling)
        }
      }
      return true
    }

    function mountSidebarEntry(controller, t) {
      const entry = createEntry(controller, t)
      const debug = { attempts: 0, found: false, placed: false }
      try {
        const host = globalThis.location && globalThis.location.hostname
        if (host === 'localhost' || host === '127.0.0.1') window.__prcDebug = debug
      } catch {}
      let root
      let placed = false
      const tryPlace = () => {
        debug.attempts++
        if (root && !root.isConnected) { rootObserver.disconnect(); root = undefined; placed = false }
        if (placed) {
          if (document.body.contains(entry)) return
          rootObserver.disconnect(); root = undefined; placed = false
        }
        root = root || sidebarRoot()
        if (!root) return
        debug.found = !!newSessionButton(root)
        placed = placeEntry(root, entry)
        debug.placed = placed
        if (placed) rootObserver.observe(root, { childList: true, subtree: true })
      }
      const waitObserver = new MutationObserver(() => tryPlace())
      waitObserver.observe(document.body, { childList: true, subtree: true })
      const rootObserver = new MutationObserver(() => {
        if (!root || !root.isConnected) { placed = false; tryPlace(); return }
        if (!root.contains(entry)) placed = placeEntry(root, entry)
      })
      const retry = setInterval(() => tryPlace(), 2000)
      const sync = wireEntrySync(entry, controller, t)
      const unsubscribe = controller.subscribe(sync)
      sync()
      tryPlace()
      return () => {
        clearInterval(retry)
        waitObserver.disconnect()
        rootObserver.disconnect()
        unsubscribe()
        entry.remove()
      }
    }

    // ── 工具函数 ─────────────────────────────────────────────────────────────

    function filterProcesses(state) {
      const q = state.search.trim().toLowerCase()
      const rows = state.processes.filter((p) =>
        (state.filters.source === 'all' || p.source === state.filters.source)
        && (state.filters.category === '' || p.category === state.filters.category)
        && (state.filters.complexity === '' || p.complexity === state.filters.complexity)
        && (q === '' || (p.name + ' ' + (p.display_name || '') + ' ' + (p.description || '')).toLowerCase().includes(q)))
      const rank = { light: 0, lightweight: 1, standard: 2, medium: 3, complex: 4 }
      const sorted = [...rows]
      if (state.sortBy === 'updated') sorted.sort((a, b) => b.mtime - a.mtime)
      else if (state.sortBy === 'complexity') sorted.sort((a, b) => (rank[a.complexity] ?? 9) - (rank[b.complexity] ?? 9) || a.relPath.localeCompare(b.relPath))
      else if (state.sortBy === 'links') sorted.sort((a, b) => b.linkCount - a.linkCount)
      else sorted.sort((a, b) => a.relPath.localeCompare(b.relPath))
      return sorted
    }

    const COMPLEXITY_LABEL = { light: 'light', lightweight: 'lightweight', standard: 'standard', medium: 'medium', complex: 'complex' }

    function flowLabel(t, v) {
      if (v === 'next') return t('flowNext')
      if (v === 'end') return t('flowEnd')
      if (v === 'break') return t('flowBreak')
      return String(v)
    }

    function linkExpert(ln) { return (ln && (ln.expert_name || ln.expert)) || undefined }

    /** 极轻量 YAML 着色：注释灰、键蓝、其余默认。 */
    function colorizeLine(line) {
      const trimmed = line.trimStart()
      if (trimmed.startsWith('#')) return [h('span', { className: 'dsh-prc-cm' }, line)]
      const m = line.match(/^(\s*(?:-\s+)?)([A-Za-z_][\w.-]*)(:)(.*)$/)
      if (m) {
        return [m[1], h('span', { className: 'dsh-prc-key' }, m[2] + ':'), m[4] ? colorizeScalar(m[4]) : '']
      }
      return [line]
    }
    function colorizeScalar(rest) {
      const t = rest.trim()
      if (t === '' || t === '|' || t === '>' || t === '|-' || t === '>-') return rest
      if (t.startsWith('#')) return [h('span', { className: 'dsh-prc-cm' }, rest)]
      return rest
    }

    // ── 组件 ─────────────────────────────────────────────────────────────────

    function useControllerState(controller) {
      const getSnap = useCallback(() => controller.getSnapshot(), [controller])
      const subscribe = useCallback((cb) => controller.subscribe(cb), [controller])
      return useSyncExternalStore(subscribe, getSnap)
    }
    let useSyncExternalStore = __React.useSyncExternalStore
      || ((subscribe, getSnap) => {
        const [v, setV] = useState(getSnap)
        useEffect(() => subscribe(() => setV(getSnap())), [subscribe, getSnap])
        return v
      })

    function Menu({ x, y, items, onClose }) {
      return h('div', null,
        h('div', { className: 'dsh-prc-menuback', onClick: onClose, onContextMenu: (e) => { e.preventDefault(); onClose() } }),
        h('div', { className: 'dsh-prc-menu', style: { left: Math.max(4, x) + 'px', top: Math.max(4, y) + 'px' } },
          items.map((it, i) => h('button', { key: i, onClick: () => { onClose(); it.onClick() } }, it.label))))
    }

    function anchorMenu(btn, items, onClose) {
      let pos = { x: 100, y: 100 }
      try { const r = btn.getBoundingClientRect(); pos = { x: r.left, y: r.bottom + 4 } } catch {}
      return h(Menu, { x: pos.x, y: pos.y, items, onClose })
    }

    function Toolbar({ state, controller, t }) {
      const [menu, setMenu] = useState(null) // {kind, btn}
      const categories = useMemo(() => [...new Set(state.processes.map((p) => p.category).filter(Boolean))].sort(), [state.processes])
      const user = state.processes.filter((p) => p.source === 'user').length
      const bundled = state.processes.filter((p) => p.source === 'bundled').length
      const sel = state.item && state.item.meta
      const openMenu = (kind) => (e) => setMenu(menu && menu.kind === kind ? null : { kind, btn: e.currentTarget })
      return h('div', { className: 'dsh-prc-toolbar' },
        h('h2', { className: 'dsh-prc-title' }, t('title')),
        h('span', { className: 'dsh-prc-count' }, t('count', { user, bundled })),
        h('div', { className: 'dsh-prc-tabs', style: { borderBottom: 'none', margin: '0 4px' } },
          h('button', { className: 'dsh-prc-tab', 'data-on': state.view === 'lib' ? 'true' : undefined, onClick: () => controller.setView('lib') }, t('viewLib')),
          h('button', { className: 'dsh-prc-tab', 'data-on': state.view === 'exec' ? 'true' : undefined, onClick: () => controller.setView('exec') }, t('viewExec'))),
        h('input', { className: 'dsh-prc-input dsh-prc-search', value: state.search, placeholder: t('searchPlaceholder'), spellCheck: false, onChange: (e) => controller.setSearch(e.target.value) }),
        h('select', { className: 'dsh-prc-select', value: state.filters.source, onChange: (e) => controller.setFilter('source', e.target.value) },
          h('option', { value: 'all' }, t('filterAll')), h('option', { value: 'user' }, t('filterUser')), h('option', { value: 'bundled' }, t('filterBundled'))),
        h('select', { className: 'dsh-prc-select', value: state.filters.category, onChange: (e) => controller.setFilter('category', e.target.value) },
          h('option', { value: '' }, t('categoryAll')), categories.map((c) => h('option', { key: c, value: c }, c))),
        h('select', { className: 'dsh-prc-select', value: state.filters.complexity, onChange: (e) => controller.setFilter('complexity', e.target.value) },
          h('option', { value: '' }, t('complexityAll')), ['light', 'lightweight', 'standard', 'medium', 'complex'].map((c) => h('option', { key: c, value: c }, c))),
        h('select', { className: 'dsh-prc-select', value: state.sortBy, title: t('sortDefault'), onChange: (e) => controller.setSortBy(e.target.value) },
          h('option', { value: 'default' }, t('sortDefault')), h('option', { value: 'updated' }, t('sortUpdated')),
          h('option', { value: 'complexity' }, t('sortComplexity')), h('option', { value: 'links' }, t('sortLinks'))),
        h('div', { className: 'dsh-prc-spacer' }),
        h('button', { className: 'dsh-prc-btn', title: t('aiBtn'), onClick: () => controller.setState({ dialog: { type: 'ai' } }) }, '⚡ ' + t('aiBtn')),
        h('button', { className: 'dsh-prc-btn', 'data-primary': 'true', onClick: openMenu('new') }, '+ ' + t('newTask')),
        h('button', { className: 'dsh-prc-btn', onClick: () => controller.setState({ dialog: { type: 'import' } }) }, t('importBtn')),
        h('button', { className: 'dsh-prc-btn', onClick: openMenu('export') }, t('exportBtn')),
        h('button', { className: 'dsh-prc-btn', title: t('settingsBtn'), onClick: () => controller.setState({ dialog: { type: 'settings' } }) }, '⚙'),
        h('button', { className: 'dsh-prc-btn', title: t('close'), onClick: () => controller.closePanel() }, '✕'),
        menu === null ? null
          : menu.kind === 'new'
            ? anchorMenu(menu.btn, [
              { label: t('newBlank'), onClick: () => controller.setState({ dialog: { type: 'create' } }) },
              { label: t('newFromExisting'), onClick: () => controller.setState({ dialog: { type: 'copy', fromId: sel ? sel.id : undefined } }) },
            ], () => setMenu(null))
            : anchorMenu(menu.btn, [
              { label: t('exportAll'), onClick: () => download(API + '/export?all=1') },
              { label: t('exportUser'), onClick: () => download(API + '/export?source=user') },
              { label: t('exportOne'), onClick: () => { if (sel) download(API + '/export?id=' + encodeURIComponent(sel.id)) } },
            ], () => setMenu(null)))
    }

    function download(url) {
      const a = document.createElement('a')
      a.href = url
      a.rel = 'noopener'
      document.body.appendChild(a)
      a.click()
      a.remove()
    }

    function ListPane({ state, controller, t }) {
      const rows = filterProcesses(state)
      const userRows = rows.filter((p) => p.source === 'user')
      const bundledRows = rows.filter((p) => p.source === 'bundled')
      const onKey = (e) => {
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
        e.preventDefault()
        const ids = rows.map((p) => p.id)
        if (ids.length === 0) return
        const idx = ids.indexOf(state.selectedId)
        const next = e.key === 'ArrowDown' ? ids[Math.min(ids.length - 1, idx + 1)] || ids[0] : ids[Math.max(0, idx - 1)]
        controller.select(next)
      }
      const row = (p) => h('button', {
        key: p.id, className: 'dsh-prc-row', role: 'button', tabIndex: 0,
        'data-selected': state.selectedId === p.id ? 'true' : undefined,
        'data-source': p.source, 'data-complexity': p.complexity || 'standard',
        onClick: () => controller.select(p.id),
        onKeyDown: (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) { e.preventDefault(); controller.select(p.id) } },
      },
        h('div', { className: 'dsh-prc-row-name' },
          h('span', { className: 'lbl' }, p.display_name || p.name),
          p.errors > 0 ? h('span', { className: 'dsh-prc-dot', 'data-kind': 'err', title: p.errors + t('errOne') }) : null,
          p.warnings > 0 ? h('span', { className: 'dsh-prc-dot', 'data-kind': 'warn', title: p.warnings + t('warnOne') }) : null),
        h('div', { className: 'dsh-prc-row-meta' },
          h('span', null, p.name),
          p.complexity ? h('span', { className: 'dsh-prc-badge' }, p.complexity) : null,
          p.version ? h('span', null, 'v' + p.version) : null,
          h('span', null, p.phaseCount + t('phases') + ' · ' + p.linkCount + t('links'))))
      const group = (label, items) => h('div', null,
        h('div', { className: 'dsh-prc-group' }, label, h('span', null, items.length)),
        items.map(row))
      return h('div', { className: 'dsh-prc-list', onKeyDown: onKey, tabIndex: 0 },
        rows.length === 0
          ? h('div', { style: { padding: '18px 8px', color: 'var(--dsw-text-secondary, gray)', fontSize: 12 } }, t('emptyList'), h('div', { style: { marginTop: 4, opacity: .8 } }, t('emptyListHint')))
          : [group(t('mine'), userRows), group(t('bundled'), bundledRows)])
    }

    function DiagList({ diagnostics, t, onJump }) {
      const items = [...(diagnostics.errors || []).map((d) => ({ ...d, kind: 'err' })), ...(diagnostics.warnings || []).map((d) => ({ ...d, kind: 'warn' }))]
      if (items.length === 0) return h('div', { className: 'dsh-prc-diag', style: { opacity: .75 } }, t('noIssues'))
      return h('div', { className: 'dsh-prc-diag' }, items.map((d, i) => h('button', {
        key: i, className: 'dsh-prc-diag-item', 'data-kind': d.kind,
        onClick: () => onJump && d.line && onJump(d.line),
      },
        h('span', { className: 'dsh-prc-diag-line' }, d.line ? 'L' + d.line : ''),
        h('span', { className: 'dsh-prc-diag-code' }, d.kind === 'err' ? '✗' : '⚠'),
        h('span', null, d.message),
        h('span', { style: { opacity: .5, marginLeft: 'auto', flex: 'none' } }, d.code))))
    }

    function StructureLinkCard({ t, ln, phaseId }) {
      const [open, setOpen] = useState(false)
      const meta = []
      if (ln.executor) meta.push(ln.executor)
      if (linkExpert(ln)) meta.push(linkExpert(ln))
      if (Array.isArray(ln.skills) && ln.skills.length) meta.push(ln.skills.join(', '))
      if (ln.model) meta.push(ln.model)
      if (Array.isArray(ln.gates) && ln.gates.length) meta.push('gate×' + ln.gates.length)
      if (ln.max_rework !== undefined && ln.max_rework !== null) meta.push('rework ' + ln.max_rework)
      return h('div', { className: 'dsh-prc-link' },
        h('button', { className: 'dsh-prc-link-row', onClick: () => setOpen(!open), 'aria-expanded': open },
          h('span', { className: 'dsh-prc-link-id' }, ln.id),
          h('span', null, ln.name || ''),
          h('span', { className: 'dsh-prc-link-meta' }, meta.join(' · '))),
        !open ? null : h('div', { className: 'dsh-prc-link-body' },
          ln.prompt ? h('div', null, h('div', { style: { fontSize: 11, opacity: .65, marginBottom: 3 } }, t('prompt')), h('pre', { className: 'dsh-prc-pre' }, ln.prompt)) : null,
          h('div', { className: 'dsh-prc-kv' }, h('b', null, t('onSuccess') + ':'), flowLabel(t, ln.on_success || '—')),
          h('div', { className: 'dsh-prc-kv' }, h('b', null, t('onGateFail') + ':'), flowLabel(t, ln.on_gate_fail || '—')),
          h('div', { className: 'dsh-prc-kv' }, h('b', null, t('onRatingFail') + ':'), flowLabel(t, ln.on_rating_fail || '—')),
          ln.review_type ? h('div', { className: 'dsh-prc-kv' }, h('b', null, t('reviewType') + ':'), ln.review_type) : null,
          ln.review_prompt ? h('div', { className: 'dsh-prc-kv' }, h('b', null, t('reviewPrompt') + ':'), h('span', { style: { whiteSpace: 'pre-wrap' } }, ln.review_prompt)) : null,
          ln.acceptance_criteria ? h('div', { className: 'dsh-prc-kv' }, h('b', null, t('acceptance') + ':'), h('span', { style: { whiteSpace: 'pre-wrap' } }, ln.acceptance_criteria)) : null,
          Array.isArray(ln.expected_artifacts) && ln.expected_artifacts.length > 0 ? h('div', { className: 'dsh-prc-kv' },
            h('b', null, t('artifacts') + ':'),
            h('span', null, ln.expected_artifacts.map((a) => (a && (a.path || a.name)) || '').filter(Boolean).join(' · '))) : null,
          Array.isArray(ln.gates) && ln.gates.length > 0 ? h('div', { className: 'dsh-prc-kv' },
            h('b', null, t('gates') + ':'),
            h('span', null, ln.gates.map((g) => (g ? (g.name || '?') + (g.min_score !== undefined && g.min_score !== null ? ' ≥' + g.min_score : '') : '')).join(' · '))) : null,
          h('div', { style: { fontSize: 11, opacity: .55 } }, phaseId)))
    }

    function StructureTab({ t, parsed }) {
      const phases = parsed && Array.isArray(parsed.phases) ? parsed.phases : []
      if (phases.length === 0) return h('div', { className: 'dsh-prc-empty' }, '—')
      return h('div', null, phases.map((ph, i) => h('div', { className: 'dsh-prc-phase', key: ph.id || i },
        h('div', { className: 'dsh-prc-phase-head' },
          h('span', { className: 'dsh-prc-link-id' }, ph.id || i + 1),
          h('span', null, ph.name || ''),
          h('span', { className: 'dsh-prc-link-meta' }, (Array.isArray(ph.links) ? ph.links.length : 0) + ' ' + t('links'))),
        ph.spec ? h('div', { className: 'dsh-prc-phase-spec' }, ph.spec) : null,
        ph.acceptance_criteria ? h('div', { className: 'dsh-prc-kv' }, h('b', null, t('acceptance') + ':'), h('span', { style: { whiteSpace: 'pre-wrap' } }, ph.acceptance_criteria)) : null,
        (Array.isArray(ph.links) ? ph.links : []).map((ln, j) => h(StructureLinkCard, { key: ln.id || j, t, ln, phaseId: ph.id })))))
    }

    function YamlView({ yaml, highlightLine }) {
      const boxRef = useRef(null)
      const lines = useMemo(() => String(yaml || '').split('\n'), [yaml])
      useEffect(() => {
        if (!highlightLine || !boxRef.current) return
        const el = boxRef.current.querySelector('[data-line="' + highlightLine + '"]')
        if (el) el.scrollIntoView({ block: 'center' })
      }, [highlightLine, yaml])
      return h('div', { className: 'dsh-prc-code', ref: boxRef },
        lines.map((line, i) => h('div', { key: i, className: 'dsh-prc-code-line', 'data-line': i + 1, 'data-hl': highlightLine === i + 1 ? 'true' : undefined },
          h('span', { className: 'dsh-prc-code-no' }, i + 1),
          h('span', { className: 'dsh-prc-code-tx' }, colorizeLine(line)))))
    }

    function OverviewTab({ t, meta, parsed, diagnostics, onJump }) {
      const limits = parsed && parsed.limits
      const abnormal = parsed && parsed.abnormal_handler
      return h('div', null,
        meta.description ? h('p', { className: 'dsh-prc-desc' }, meta.description) : null,
        h('div', { className: 'dsh-prc-kv' }, h('b', null, t('name') + ':'), meta.name),
        meta.guid ? h('div', { className: 'dsh-prc-kv' }, h('b', null, t('guid') + ':'), h('code', null, meta.guid)) : null,
        limits ? h('div', { className: 'dsh-prc-kv' }, h('b', null, t('limits') + ':'),
          (limits.max_step_executions == null ? t('unlimited') : limits.max_step_executions + ' ' + t('steps')) + ' · '
          + (limits.max_total_tokens == null ? t('unlimited') : limits.max_total_tokens + ' ' + t('tokens'))) : null,
        abnormal && Array.isArray(abnormal.trigger_on) ? h('div', { className: 'dsh-prc-kv' }, h('b', null, t('abnormal') + ':'), abnormal.trigger_on.join(', ')) : null,
        h('div', { className: 'dsh-prc-sec' }, h('h4', null, t('diagnostics')), h(DiagList, { t, diagnostics, onJump })))
    }

    function DetailPane({ state, controller, t }) {
      const item = state.item
      const meta = item && item.meta
      const isUser = meta && meta.source === 'user'
      const [confirmDelete, setConfirmDelete] = useState(false)
      const jump = (line) => { controller.setState({ highlightLine: line }); controller.setTab('yaml') }
      const copyYaml = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(item.yaml).then(() => controller.toast(t('copied'))).catch(() => {})
      }
      const atAgent = () => controller.atAgent(meta)
      if (state.itemLoading) return h('div', { className: 'dsh-prc-detail' }, t('loading'))
      if (!item || !meta) return h('div', { className: 'dsh-prc-empty' }, h('div', null, t('emptyDetail')), h('div', { style: { fontSize: 12, opacity: .8 } }, t('selectFirst')))
      return h('div', { className: 'dsh-prc-detail' },
        h('div', { className: 'dsh-prc-detail-head' },
          h('h3', { className: 'dsh-prc-detail-title' }, meta.display_name || meta.name),
          h('div', { className: 'dsh-prc-actions' },
            isUser ? [
              h('button', { key: 'e', className: 'dsh-prc-btn', 'data-primary': 'true', onClick: () => controller.editSelected() }, '✎ ' + t('edit')),
              h('button', { key: 'a', className: 'dsh-prc-btn', title: t('atAgentTitle'), onClick: atAgent }, '@ ' + t('atAgent')),
              h('button', { key: 'r', className: 'dsh-prc-btn', onClick: () => controller.setState({ dialog: { type: 'rename', id: meta.id, name: meta.fileName } }) }, t('rename')),
              !confirmDelete
                ? h('button', { key: 'd', className: 'dsh-prc-btn', onClick: () => setConfirmDelete(true) }, '🗑 ' + t('delete'))
                : h('span', { key: 'dc', style: { display: 'inline-flex', gap: 6, alignItems: 'center' } },
                  h('span', { style: { fontSize: 12 } }, t('deleteConfirm') + '？'),
                  h('button', { className: 'dsh-prc-btn', 'data-danger': 'true', onClick: () => { setConfirmDelete(false); controller.removeProcess(meta.id) } }, t('confirm')),
                  h('button', { className: 'dsh-prc-btn', onClick: () => setConfirmDelete(false) }, t('cancel'))),
            ] : [
              h('button', { key: 'a', className: 'dsh-prc-btn', title: t('atAgentBundledTitle'), onClick: atAgent }, '@ ' + t('atAgent')),
              h('button', { key: 'c', className: 'dsh-prc-btn', 'data-primary': 'true', onClick: () => controller.setState({ dialog: { type: 'copy', fromId: meta.id } }) }, '⧉ ' + t('copyToMine')),
            ],
            h('button', { key: 'run', className: 'dsh-prc-btn', 'data-primary': 'true', title: t('runCreate'), onClick: () => controller.setState({ dialog: { type: 'newrun', processId: meta.id } }) }, t('runCreate')),
            h('button', { key: 'x', className: 'dsh-prc-btn', onClick: copyYaml }, t('copyYaml')))),
        h('div', { className: 'dsh-prc-chips' },
          h('span', { className: 'dsh-prc-chip' }, isUser ? t('mine') : t('readOnly')),
          meta.complexity ? h('span', { className: 'dsh-prc-chip' }, t('complexity') + ': ' + meta.complexity) : null,
          meta.category ? h('span', { className: 'dsh-prc-chip' }, t('category') + ': ' + meta.category) : null,
          meta.version ? h('span', { className: 'dsh-prc-chip' }, 'v' + meta.version) : null,
          h('span', { className: 'dsh-prc-chip' }, meta.phaseCount + ' ' + t('phases') + ' · ' + meta.linkCount + ' ' + t('links')),
          item.diagnostics && item.diagnostics.errors.length > 0 ? h('span', { className: 'dsh-prc-badge', 'data-kind': 'err' }, item.diagnostics.errors.length + t('errOne')) : null,
          item.diagnostics && item.diagnostics.warnings.length > 0 ? h('span', { className: 'dsh-prc-badge', 'data-kind': 'warn' }, item.diagnostics.warnings.length + t('warnOne')) : null,
          h('span', { style: { fontSize: 11, opacity: .6 } }, meta.relPath)),
        h('div', { className: 'dsh-prc-tabs' },
          ['overview', 'flow', 'structure', 'yaml'].map((tab) => h('button', { key: tab, className: 'dsh-prc-tab', 'data-on': state.tab === tab ? 'true' : undefined, onClick: () => controller.setTab(tab) },
            t('tab' + tab[0].toUpperCase() + tab.slice(1))))),
        state.tab === 'overview' ? h(OverviewTab, { t, meta, parsed: item.parsed, diagnostics: item.diagnostics, onJump: jump })
          : state.tab === 'flow' ? h(FlowGraph, { t, parsed: item.parsed })
            : state.tab === 'structure' ? h(StructureTab, { t, parsed: item.parsed })
            : h(YamlView, { yaml: item.yaml, highlightLine: state.highlightLine }))
    }

    // ── 编辑器 ───────────────────────────────────────────────────────────────

    // ── 表单编辑器（v0.4）：与 YAML 实时双向同步 ───────────────────────────
    // 单一数据源 = 编辑器文本（ed.text）。表单字段修改：解析当前文本 →
    // Document setIn/deleteIn/append → toString 写回 ed.text；YAML 子模式
    // 的每次输入同样写回 ed.text——两个视图天然互相同步。

    function FormField({ label, children }) {
      return h('label', { className: 'dsh-prc-field' },
        h('span', { style: { fontSize: 11, opacity: .75 } }, label),
        children)
    }

    function FormText({ value, onChange, placeholder, multiline, rows, type }) {
      const style = { width: '100%', fontFamily: type === 'mono' ? 'ui-monospace, Menlo, monospace' : 'var(--dsw-font-family, inherit)', fontSize: 12.5, lineHeight: multiline ? 1.55 : 1.4, border: '1px solid var(--dsw-alias-border-l2,rgba(128,128,128,.3))', borderRadius: 8, padding: multiline ? '7px 9px' : '5px 9px', background: 'var(--dsw-alias-bg-layer-2,transparent)', color: 'inherit', boxSizing: 'border-box', whiteSpace: multiline ? 'pre-wrap' : undefined }
      return multiline
        ? h('textarea', { value, placeholder: placeholder || '', spellCheck: false, rows: rows || 2, style: Object.assign({ resize: 'vertical' }, style), onChange: (e) => onChange(e.target.value) })
        : h('input', { value, type: type || 'text', placeholder: placeholder || '', spellCheck: false, style, onChange: (e) => onChange(e.target.value) })
    }

    function FormSelect({ value, onChange, options }) {
      return h('select', { value, onChange: (e) => onChange(e.target.value), style: { width: '100%', border: '1px solid var(--dsw-alias-border-l2,rgba(128,128,128,.3))', background: 'var(--dsw-alias-bg-layer-2,transparent)', color: 'inherit', borderRadius: 8, padding: '5px 8px', font: 'inherit', fontSize: 12.5 } },
        options.map((o) => h('option', { key: o[0], value: o[0] }, o[1])))
    }

    // ── FormEditor（可视化表单，与 YAML 双向实时同步）─────────────────────────
    // 单一数据源 = ed.text：表单改动经 Document API（fmSet 等，注释/未知字段不丢）
    // 写回 ed.text；YAML 手改后表单随 useMemo 重新解析实时反映。

    function FormField({ label, children }) {
      return h('label', { className: 'dsh-prc-field' }, label, children)
    }

    function FormText({ value, onChange, placeholder, mono }) {
      return h('input', { value: String(value ?? ''), spellCheck: false, placeholder,
        style: mono ? { fontFamily: 'ui-monospace, monospace' } : undefined,
        onChange: (e) => onChange(e.target.value) })
    }

    function FormNum({ value, onChange, placeholder, min }) {
      return h('input', { type: 'number', value: value === null || value === undefined || value === '' ? '' : String(value), min, placeholder, spellCheck: false,
        onChange: (e) => onChange(e.target.value === '' ? null : Number(e.target.value)) })
    }

    function FormArea({ value, onChange, rows, placeholder }) {
      return h('textarea', { value: String(value ?? ''), rows: rows || 3, spellCheck: false, placeholder,
        onChange: (e) => onChange(e.target.value) })
    }

    function FormSelect({ value, options, onChange }) {
      const cur = String(value ?? '')
      const opts = options.includes(cur) ? options : [cur].concat(options)
      return h('select', { value: cur, onChange: (e) => onChange(e.target.value) },
        opts.map((o) => h('option', { key: o, value: o }, o)))
    }

    function FormEditor({ state, controller, t, ed }) {
      const doc = useMemo(() => fmDoc(ed.text), [ed.text])
      if (!doc) {
        return h('div', { className: 'dsh-prc-form' },
          h('div', { className: 'dsh-prc-error' }, t('formUnparseable')))
      }
      const P = (path, dflt) => { const v = doc.getIn(path); return v === undefined || v === null ? dflt : v }
      const set = (path, value) => controller.setEditorText(fmSet(ed.text, path, value))

      // 全库环节 id（流转目标下拉用）
      const phaseCount = fmSeqLen(doc, ['phases'])
      const allLinkIds = []
      for (let pi = 0; pi < phaseCount; pi++) {
        const lc = fmSeqLen(doc, ['phases', pi, 'links'])
        for (let li = 0; li < lc; li++) {
          const id = P(['phases', pi, 'links', li, 'id'], '')
          if (id) allLinkIds.push(String(id))
        }
      }
      const flowOptions = (fixed) => fixed.concat(allLinkIds.map((id) => 'goto:' + id)).concat(allLinkIds)

      const addPhase = () => {
        let n = phaseCount + 1
        let pid = 'phase-' + n
        while (allLinkIds.some((id) => id.startsWith(pid))) { n += 1; pid = 'phase-' + n }
        controller.setEditorText(fmAppend(ed.text, ['phases'], { id: pid, name: '', spec: '', links: [] }))
      }
      const addLink = (pi) => {
        let n = allLinkIds.length + 1
        let lid = 'link-' + n
        while (allLinkIds.includes(lid)) { n += 1; lid = 'link-' + n }
        controller.setEditorText(fmAppend(ed.text, ['phases', pi, 'links'], {
          id: lid, name: t('formNewLinkName'), prompt: '', executor: null, expert: null, skills: [],
          model: null, review_type: 'ai', gates: [], on_success: 'next', on_gate_fail: 'break',
          on_rating_fail: 'break', max_rework: null,
        }))
      }
      const setSkills = (pi, li, text) => {
        const arr = text.split(/[,，]/).map((s) => s.trim()).filter((s) => s !== '')
        controller.setEditorText(fmSet(ed.text, ['phases', pi, 'links', li, 'skills'], arr))
      }

      const sec = (title, extra) => h('div', { className: 'dsh-prc-fsec' },
        h('h4', null, title), extra || null)

      // ── 环节卡片 ──
      const linkCard = (pi, li) => {
        const lp = ['phases', pi, 'links', li]
        const gatesPath = [...lp, 'gates']
        const gateCount = fmSeqLen(doc, gatesPath)
        const metaFields = [
          ['id', 'id', true], [t('formName'), 'name', false], [t('formExecutor'), 'executor', false],
          [t('formExpert'), 'expert', false], [t('formModel'), 'model', false],
        ]
        const gridKids = metaFields.map(([label, key, mono], i) => h(FormField, { label, key: 'm' + i },
          h(FormText, {
            value: key === 'id' ? String(P([...lp, 'id'], '')) : P([...lp, key], ''),
            mono,
            placeholder: key === 'id' ? 'req-01' : undefined,
            onChange: (v) => {
              if (key === 'id') { if (v.trim() !== '') controller.setEditorText(fmSetLinkId(ed.text, pi, li, v.trim())) }
              else set([...lp, key], v === '' ? null : v)
            },
          })))
        gridKids.push(h(FormField, { label: t('formReviewType'), key: 'rt' },
          h(FormSelect, { value: P([...lp, 'review_type'], 'ai'), options: ['ai', 'human', 'none'], onChange: (v) => set([...lp, 'review_type'], v) })))
        // getIn 对序列返回 YAMLSeq 节点而非数组——展示前解包 items
        const skillsText = (v) => Array.isArray(v) ? v.join(', ')
          : (v && Array.isArray(v.items)) ? v.items.map((n) => String(n && n.value !== undefined ? n.value : n)).join(', ')
          : String(v ?? '')
        gridKids.push(h(FormField, { label: t('formSkillsPh'), key: 'sk' },
          h(FormText, { value: skillsText(P([...lp, 'skills'], [])), placeholder: t('formSkillsPh'), onChange: (v) => setSkills(pi, li, v) })))
        gridKids.push(h(FormField, { label: t('formMaxRework'), key: 'mr' },
          h(FormNum, { value: P([...lp, 'max_rework'], null), min: 0, onChange: (v) => set([...lp, 'max_rework'], v) })))

        const gateKids = []
        gateKids.push(h('div', { style: { display: 'flex', alignItems: 'center', margin: '6px 0' }, key: 'ghd' },
          h('b', { style: { fontSize: 12 } }, t('formGates') + '（' + gateCount + '）'),
          h('button', { className: 'dsh-prc-btn', style: { marginLeft: 'auto' }, onClick: () => controller.setEditorText(fmAppend(ed.text, gatesPath, { name: '', type: 'artifact_present', artifact: '', criteria_ref: null, min_score: null, script: null })) }, t('formAddGate'))))
        for (let gi = 0; gi < gateCount; gi++) {
          const gp = [...gatesPath, gi]
          gateKids.push(h('div', { className: 'dsh-prc-fgrid', key: 'g' + gi, style: { alignItems: 'end' } },
            h(FormField, { label: t('formGateName') }, h(FormText, { value: P([...gp, 'name'], ''), onChange: (v) => set([...gp, 'name'], v) })),
            h(FormField, { label: t('formGateType') }, h(FormSelect, { value: P([...gp, 'type'], 'artifact_present'), options: ['artifact_present', 'ai_criteria_review', 'script'], onChange: (v) => set([...gp, 'type'], v) })),
            h(FormField, { label: t('formGateArtifact') }, h(FormText, { value: P([...gp, 'artifact'], ''), onChange: (v) => set([...gp, 'artifact'], v || null) })),
            h(FormField, { label: t('formGateMin') }, h(FormNum, { value: P([...gp, 'min_score'], null), min: 0, onChange: (v) => set([...gp, 'min_score'], v) })),
            h('button', { className: 'dsh-prc-btn', 'data-danger': 'true', onClick: () => controller.setEditorText(fmDel(ed.text, gp)) }, '✕')))
        }

        const kids = []
        kids.push(h('div', { className: 'dsh-prc-fgrid', key: 'meta' }, gridKids))
        kids.push(h(FormField, { label: t('formPrompt'), key: 'prompt' },
          h(FormArea, { value: P([...lp, 'prompt'], ''), rows: 4, onChange: (v) => set([...lp, 'prompt'], v) })))
        kids.push(h(FormField, { label: t('formAcceptance'), key: 'acc' },
          h(FormArea, { value: P([...lp, 'acceptance_criteria'], ''), rows: 2, onChange: (v) => set([...lp, 'acceptance_criteria'], v) })))
        kids.push(h('div', { className: 'dsh-prc-fgrid', style: { marginTop: 6 }, key: 'flow' },
          h(FormField, { label: t('formOnSuccess') }, h(FormSelect, { value: P([...lp, 'on_success'], 'next'), options: flowOptions(['next', 'end']), onChange: (v) => set([...lp, 'on_success'], v) })),
          h(FormField, { label: t('formOnGateFail') }, h(FormSelect, { value: P([...lp, 'on_gate_fail'], 'break'), options: flowOptions(['break']), onChange: (v) => set([...lp, 'on_gate_fail'], v) })),
          h(FormField, { label: t('formOnRatingFail') }, h(FormSelect, { value: P([...lp, 'on_rating_fail'], 'break'), options: flowOptions(['break', 'next']), onChange: (v) => set([...lp, 'on_rating_fail'], v) }))))
        kids.push(h('div', { style: { fontSize: 11, opacity: .55, margin: '2px 0 4px' }, key: 'idhint' }, t('formIdHint')))
        kids.push(h('div', { className: 'dsh-prc-fgates', key: 'gates' }, gateKids))
        kids.push(h('div', { style: { marginTop: 8, textAlign: 'right' }, key: 'dellk' },
          h('button', { className: 'dsh-prc-btn', 'data-danger': 'true', onClick: () => controller.setEditorText(fmDeleteLink(ed.text, pi, li)) }, t('formDelLink'))))
        return h('div', { className: 'dsh-prc-flink', key: 'lk' + pi + '-' + li }, kids)
      }

      // ── 阶段卡片 ──
      const phaseCard = (pi) => {
        const linkCount = fmSeqLen(doc, ['phases', pi, 'links'])
        const kids = []
        kids.push(h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }, key: 'hd' },
          h('span', { style: { fontSize: 12, opacity: .65 } }, '#' + (pi + 1)),
          h('div', { className: 'dsh-prc-field', style: { flex: 1 } },
            h(FormText, { value: P(['phases', pi, 'name'], ''), placeholder: t('formPhaseName'), onChange: (v) => set(['phases', pi, 'name'], v) })),
          h('button', { className: 'dsh-prc-btn', 'data-danger': 'true', onClick: () => controller.setEditorText(fmDeletePhase(ed.text, pi)) }, t('formDelPhase'))))
        kids.push(h(FormField, { label: t('formPhaseSpec'), key: 'spec' },
          h(FormArea, { value: P(['phases', pi, 'spec'], ''), rows: 2, onChange: (v) => set(['phases', pi, 'spec'], v) })))
        for (let li = 0; li < linkCount; li++) kids.push(linkCard(pi, li))
        kids.push(h('div', { style: { marginTop: 6 }, key: 'addlk' },
          h('button', { className: 'dsh-prc-btn', onClick: () => addLink(pi) }, t('formAddLink'))))
        return h('div', { className: 'dsh-prc-fphase', key: 'ph' + pi }, kids)
      }

      const phaseKids = []
      for (let pi = 0; pi < phaseCount; pi++) phaseKids.push(phaseCard(pi))

      return h('div', { className: 'dsh-prc-form' },
        sec(t('formBasic')),
        h('div', { className: 'dsh-prc-fsec' },
          h('div', { className: 'dsh-prc-fgrid' },
            h(FormField, { label: t('formDisplayName') }, h(FormText, { value: P(['process', 'display_name'], ''), onChange: (v) => set(['process', 'display_name'], v) })),
            h(FormField, { label: t('formVersion') }, h(FormText, { value: P(['process', 'version'], ''), onChange: (v) => set(['process', 'version'], v) })),
            h(FormField, { label: t('formCategory') }, h(FormText, { value: P(['process', 'category'], ''), onChange: (v) => set(['process', 'category'], v) })),
            h(FormField, { label: t('formComplexity') }, h(FormSelect, { value: P(['process', 'complexity'], 'light'), options: ['light', 'lightweight', 'standard', 'medium', 'complex'], onChange: (v) => set(['process', 'complexity'], v) }))),
          h('div', { style: { height: 8 } }),
          h(FormField, { label: t('formDescription') }, h(FormArea, { value: P(['process', 'description'], ''), rows: 3, onChange: (v) => set(['process', 'description'], v) }))),
        sec(t('formLimits')),
        h('div', { className: 'dsh-prc-fsec' },
          h('div', { className: 'dsh-prc-fgrid' },
            h(FormField, { label: t('formMaxSteps') }, h(FormNum, { value: P(['limits', 'max_step_executions'], null), min: 1, onChange: (v) => set(['limits', 'max_step_executions'], v) })),
            h(FormField, { label: t('formMaxTokens') }, h(FormNum, { value: P(['limits', 'max_total_tokens'], null), min: 1, onChange: (v) => set(['limits', 'max_total_tokens'], v) }))),
          h('div', { style: { height: 8 } })),
        sec(t('formPhases') + '（' + phaseCount + '）',
          h('button', { className: 'dsh-prc-btn', style: { marginLeft: 'auto' }, onClick: addPhase }, t('formAddPhase'))),
        phaseCount === 0 ? h('div', { style: { opacity: .6, fontSize: 12 } }, '—') : null,
        h('div', null, phaseKids))
    }

    function EditorPane({ state, controller, t }) {
      const ed = state.editor
      const taRef = useRef(null)
      const gutterRef = useRef(null)
      // 子模式：'form'（可视化表单）| 'yaml'（YAML 文本）——同一份 ed.text 双向实时同步
      const [subMode, setSubMode] = useState('yaml')
      const docOk = useMemo(() => !!fmDoc(ed ? ed.text : ''), [ed && ed.text])
      const mode = subMode === 'form' && !docOk ? 'yaml' : subMode
      if (!ed) return null
      const lines = ed.text.split('\n')
      const diag = ed.diagnostics || { errors: [], warnings: [] }
      const errCount = diag.errors.length
      const warnCount = diag.warnings.length
      const onScroll = () => { if (gutterRef.current && taRef.current) gutterRef.current.scrollTop = taRef.current.scrollTop }
      const jump = (line) => {
        const ta = taRef.current
        if (!ta) return
        const pos = lines.slice(0, line - 1).reduce((acc, l) => acc + l.length + 1, 0)
        ta.focus()
        ta.setSelectionRange(pos, pos)
        ta.scrollTop = Math.max(0, (line - 6) * 19)
      }
      const onKeyDown = (e) => {
        const ta = taRef.current
        if (!ta) return
        if (e.key === 'Tab') {
          e.preventDefault()
          const s = ta.selectionStart
          const next = ed.text.slice(0, s) + '  ' + ed.text.slice(ta.selectionEnd)
          controller.setEditorText(next)
          requestAnimationFrame(() => { ta.setSelectionRange(s + 2, s + 2) })
        } else if ((e.metaKey || e.ctrlKey) && (e.key === 's' || e.key === 'S')) {
          e.preventDefault()
          void controller.saveEditor(false)
        }
      }
      return h('div', { className: 'dsh-prc-detail dsh-prc-editor' },
        h('div', { className: 'dsh-prc-detail-head' },
          h('h3', { className: 'dsh-prc-detail-title' }, (ed.mode === 'create' ? t('editorCreate') : t('editorTitle')) + (ed.name ? '：' + ed.name : '')),
          h('div', { className: 'dsh-prc-tabs', style: { borderBottom: 'none', margin: '0 6px 0 0' } },
            h('button', { className: 'dsh-prc-tab', 'data-on': mode === 'form' ? 'true' : undefined, onClick: () => setSubMode('form'), disabled: !docOk, title: !docOk ? t('formUnparseable') : undefined }, t('formMode')),
            h('button', { className: 'dsh-prc-tab', 'data-on': mode === 'yaml' ? 'true' : undefined, onClick: () => setSubMode('yaml') }, t('yamlMode'))),
          h('div', { className: 'dsh-prc-actions' },
            ed.dirty ? h('span', { className: 'dsh-prc-badge', 'data-kind': 'warn' }, t('unsaved')) : null,
            h('button', { className: 'dsh-prc-btn', onClick: () => void controller.validateEditor(), disabled: ed.busy }, '✓ ' + t('validate')),
            h('button', { className: 'dsh-prc-btn', 'data-primary': 'true', onClick: () => void controller.saveEditor(false), disabled: ed.busy || errCount > 0 }, '💾 ' + t('save')),
            h('button', { className: 'dsh-prc-btn', onClick: () => controller.requestCloseEditor() }, t('cancel')))),
        ed.conflict ? h('div', { className: 'dsh-prc-conflict' },
          h('span', null, '⚠ ' + t('saveConflict') + ' ' + t('forcedHint')),
          h('button', { className: 'dsh-prc-btn', onClick: () => void controller.reloadEditor() }, t('reload')),
          h('button', { className: 'dsh-prc-btn', 'data-danger': 'true', onClick: () => void controller.saveEditor(true) }, t('overwrite'))) : null,
        ed.error ? h('div', { className: 'dsh-prc-error' }, ed.error) : null,
        mode === 'form'
          ? h(FormEditor, { state, controller, t, ed })
          : h('div', { className: 'dsh-prc-editor-wrap' },
            h('div', { className: 'dsh-prc-gutter', ref: gutterRef }, lines.map((_, i) => h('div', { key: i }, i + 1))),
            h('textarea', {
              className: 'dsh-prc-textarea', ref: taRef, value: ed.text, spellCheck: false,
              onChange: (e) => controller.setEditorText(e.target.value),
              onScroll, onKeyDown,
            })),
        h('div', { className: 'dsh-prc-status' },
          h('span', null, t('linesCount', { n: lines.length })),
          ed.dirty ? null : h('span', null, t('saved')),
          errCount > 0 ? h('span', { className: 'dsh-prc-badge', 'data-kind': 'err' }, errCount + t('errOne')) : null,
          warnCount > 0 ? h('span', { className: 'dsh-prc-badge', 'data-kind': 'warn' }, warnCount + t('warnOne')) : null,
          errCount === 0 && warnCount === 0 && !ed.dirty ? h('span', { style: { opacity: .7 } }, t('noIssues')) : null),
        (errCount > 0 || warnCount > 0) ? h(DiagList, { t, diagnostics: diag, onJump: jump }) : null)
    }

    // ── 弹窗 ─────────────────────────────────────────────────────────────────

    function Modal({ title, onClose, children, width }) {
      useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
      }, [onClose])
      return h('div', { className: 'dsh-prc-modal-backdrop', onMouseDown: (e) => { if (e.target === e.currentTarget) onClose() } },
        h('div', { className: 'dsh-prc-modal', style: width ? { width: 'min(' + width + 'px, 94vw)' } : undefined, role: 'dialog', 'aria-modal': 'true' },
          h('div', { style: { display: 'flex', alignItems: 'center' } },
            h('h3', null, title),
            h('button', { className: 'dsh-prc-btn', style: { marginLeft: 'auto', width: 28, height: 28, padding: 0, borderRadius: 28 }, onClick: onClose }, '✕')),
          children))
    }

    function FieldInput({ label, value, onChange, placeholder, type }) {
      return h('label', { className: 'dsh-prc-field' }, label,
        h('input', { value, type: type || 'text', placeholder, spellCheck: false, onChange: (e) => onChange(e.target.value) }))
    }

    function CreateDialog({ state, controller, t }) {
      const [name, setName] = useState('')
      const [dir, setDir] = useState('')
      const [display, setDisplay] = useState('')
      const ok = /^[^\\/\0\r\n.][^\\/\0\r\n]{0,79}$/.test(name.trim())
      return h(Modal, { title: t('editorCreate'), onClose: () => controller.setState({ dialog: null }) },
        h(FieldInput, { label: t('createName'), value: name, onChange: setName, placeholder: 'my-process' }),
        h(FieldInput, { label: t('createDir'), value: dir, onChange: setDir, placeholder: 'software' }),
        h(FieldInput, { label: t('createDisplayName'), value: display, onChange: setDisplay }),
        h('div', { style: { display: 'flex', gap: 8, justifyContent: 'flex-end' } },
          h('button', { className: 'dsh-prc-btn', onClick: () => controller.setState({ dialog: null }) }, t('cancel')),
          h('button', { className: 'dsh-prc-btn', 'data-primary': 'true', disabled: !ok || name.trim() === '', onClick: () => void controller.createBlank(name.trim(), dir.trim(), display.trim()) }, t('confirm'))),
        !ok && name.trim() !== '' ? h('div', { className: 'dsh-prc-error' }, t('nameRule')) : null)
    }

    function CopyDialog({ state, controller, t }) {
      const dlg = state.dialog
      const from = dlg && dlg.fromId ? state.processes.find((p) => p.id === dlg.fromId) : undefined
      const [name, setName] = useState(from ? from.fileName + '-copy' : '')
      const [dir, setDir] = useState(from && from.source === 'user' ? (from.relPath.includes('/') ? from.relPath.split('/').slice(0, -1).join('/') : '') : '')
      return h(Modal, { title: t('editorCopy'), onClose: () => controller.setState({ dialog: null }) },
        h('div', { className: 'dsh-prc-kv' }, h('b', null, t('name') + ':'), from ? (from.display_name || from.name) + '（' + from.relPath + '）' : '—'),
        h(FieldInput, { label: t('copyName'), value: name, onChange: setName, placeholder: 'my-process' }),
        h(FieldInput, { label: t('createDir'), value: dir, onChange: setDir }),
        h('div', { style: { display: 'flex', gap: 8, justifyContent: 'flex-end' } },
          h('button', { className: 'dsh-prc-btn', onClick: () => controller.setState({ dialog: null }) }, t('cancel')),
          h('button', { className: 'dsh-prc-btn', 'data-primary': 'true', disabled: !from || name.trim() === '', onClick: () => void controller.copyProcess(from.id, name.trim(), dir.trim()) }, t('copy'))))
    }

    function RenameDialog({ state, controller, t }) {
      const dlg = state.dialog
      const [name, setName] = useState(dlg ? dlg.name : '')
      return h(Modal, { title: t('renameTitle'), onClose: () => controller.setState({ dialog: null }) },
        h(FieldInput, { label: t('newName'), value: name, onChange: setName }),
        h('div', { style: { display: 'flex', gap: 8, justifyContent: 'flex-end' } },
          h('button', { className: 'dsh-prc-btn', onClick: () => controller.setState({ dialog: null }) }, t('cancel')),
          h('button', { className: 'dsh-prc-btn', 'data-primary': 'true', disabled: name.trim() === '', onClick: () => void controller.renameProcess(dlg.id, name.trim()) }, t('confirm'))))
    }

    function ConfirmDialog({ state, controller, t }) {
      const dlg = state.dialog
      return h(Modal, { title: t('confirm'), onClose: () => controller.setState({ dialog: null }) },
        h('div', null, dlg.message),
        h('div', { style: { display: 'flex', gap: 8, justifyContent: 'flex-end' } },
          h('button', { className: 'dsh-prc-btn', onClick: () => controller.setState({ dialog: null }) }, dlg.yes === 'discard' ? t('keepEditing') : t('cancel')),
          h('button', { className: 'dsh-prc-btn', 'data-danger': dlg.danger ? 'true' : undefined, onClick: () => dlg.onYes() }, dlg.yes === 'discard' ? t('discard') : t('confirm'))))
    }

    function ImportDialog({ state, controller, t }) {
      const [over, setOver] = useState(false)
      const [dragOver, setDragOver] = useState(false)
      const [results, setResults] = useState(null)
      const [busy, setBusy] = useState(false)
      const doImport = async (fileList) => {
        const files = []
        for (const f of fileList) {
          if (f.size > 1024 * 1024) { files.push({ name: f.name, content: '' }); continue }
          // eslint-disable-next-line no-await-in-loop
          files.push({ name: f.name, content: await f.text() })
        }
        setBusy(true)
        try {
          const r = await controller.importFiles(files, over)
          setResults(r)
          controller.toast(t('toastImported', { n: r.filter((x) => x.status === 'created' || x.status === 'overwritten').length }))
        } catch (error) { controller.toast(String(error && error.message || error), 'err') } finally { setBusy(false) }
      }
      const statusLabel = { created: t('importCreated'), overwritten: t('importOverwritten'), exists: t('importExists'), invalid: t('importInvalid') }
      return h(Modal, { title: t('importTitle'), onClose: () => controller.setState({ dialog: null }), width: 620 },
        h('div', null, t('importHint')),
        h('label', { style: { display: 'flex', gap: 6, alignItems: 'center', fontSize: 12 } },
          h('input', { type: 'checkbox', checked: over, onChange: (e) => setOver(e.target.checked) }), t('importOverwrite')),
        h('div', {
          className: 'dsh-prc-drop', 'data-over': dragOver ? 'true' : undefined,
          onDragOver: (e) => { e.preventDefault(); setDragOver(true) },
          onDragLeave: () => setDragOver(false),
          onDrop: (e) => { e.preventDefault(); setDragOver(false); if (!busy) void doImport(Array.from(e.dataTransfer.files)) },
        },
          t('importHint'),
          h('div', { style: { marginTop: 10 } },
            h('input', { type: 'file', accept: '.yaml,.yml', multiple: true, disabled: busy, onChange: (e) => { const list = Array.from(e.target.files || []); e.target.value = ''; if (!busy) void doImport(list) } }))),
        busy ? h('div', null, t('loading')) : null,
        results ? h('div', { className: 'dsh-prc-diag' },
          h('div', { style: { fontWeight: 600 } }, t('importResults')),
          results.map((r, i) => h('div', { key: i, style: { display: 'flex', gap: 8, fontSize: 12 } },
            h('span', { style: { flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, r.name),
            h('span', { style: { color: r.status === 'created' || r.status === 'overwritten' ? 'var(--dsw-alias-state-success, #2e9e5b)' : r.status === 'invalid' ? 'var(--dsw-alias-state-error, #c75050)' : 'inherit' } },
              statusLabel[r.status] || r.status),
            r.errors && r.errors.length ? h('span', { style: { opacity: .7 } }, r.errors[0].message) : null))) : null)
    }

    function SettingsDialog({ state, controller, t }) {
      const [form, setForm] = useState(state.settings)
      const [busy, setBusy] = useState(false)
      useEffect(() => { if (!state.settings) void controller.loadSettings() }, [])
      useEffect(() => { if (state.settings && !form) setForm(state.settings) }, [state.settings])
      if (!form) return h(Modal, { title: t('settingsTitle'), onClose: () => controller.setState({ dialog: null }) }, t('loading'))
      const set = (k) => (v) => setForm({ ...form, [k]: v })
      return h(Modal, { title: t('settingsTitle'), onClose: () => controller.setState({ dialog: null }) },
        h(FieldInput, { label: t('settingsUserRoot'), value: form.userRoot, onChange: set('userRoot') }),
        h(FieldInput, { label: t('settingsBundledRoot'), value: form.bundledRoot, onChange: set('bundledRoot') }),
        h('label', { className: 'dsh-prc-field' }, t('settingsMaxDepth'),
          h('select', { value: String(form.maxDepth), onChange: (e) => set('maxDepth')(Number(e.target.value)) },
            [1, 2, 3, 4, 5, 6].map((n) => h('option', { key: n, value: n }, n)))),
        h('label', { style: { display: 'flex', gap: 6, alignItems: 'center', fontSize: 12 } },
          h('input', { type: 'checkbox', checked: !!form.checkRefs, onChange: (e) => set('checkRefs')(e.target.checked) }), t('settingsCheckRefs')),
        h('div', { style: { display: 'flex', gap: 8, justifyContent: 'flex-end' } },
          h('button', { className: 'dsh-prc-btn', onClick: () => controller.setState({ dialog: null }) }, t('cancel')),
          h('button', { className: 'dsh-prc-btn', 'data-primary': 'true', disabled: busy, onClick: async () => {
            setBusy(true)
            try { await controller.saveSettings(form); controller.toast(t('settingsSaved')); controller.setState({ dialog: null }) }
            catch (error) { controller.toast(String(error && error.message || error), 'err') } finally { setBusy(false) }
          } }, t('save'))))
    }

    // ── ⚡ AI 生成（kit ActionShareDialog + completedView 预览确认） ────────────

    const AI_PROMPT = `请为下面的需求设计一个 ntd 工艺（Process：多阶段 phase、多环节 link 的 agent 工作流模板），输出严格的 YAML。

    需求：{{requirement}}
    复杂度：{{complexity}}
    {{reference}}

    硬性要求：
    1. 只输出一个 \`\`\`yaml 代码块，不要任何其他解释文字。
    2. 顶层结构：process（name / guid：生成一个 uuid v4 / display_name / description / category: software / complexity / version: 1.0.0）+ limits（max_step_executions / max_total_tokens，可为 null）+ abnormal_handler（可为 null）+ phases 列表。
    3. 每个 phase：id、name、spec、acceptance_criteria、links 列表。每个 link：id（全工艺唯一，建议简短助记如 req-01）、name、prompt（明确可执行的指令，含产物落点）、executor、expert（专家库里的名字，不确定就 null）、skills（列表）、expected_artifacts（[{name, type: file, path}]）、gates（[{name, type: ai_criteria_review, min_score}]，可选）、on_success（next / end / <环节id>）、on_gate_fail（break / <环节id> / goto:<环节id>）、on_rating_fail: break、max_rework（0-3）。
    4. on_success / on_gate_fail 引用的环节 id 必须真实存在；最后一步用 on_success: end。
    5. 阶段数量与环节粒度贴合复杂度：轻需求 1-2 阶段 3-6 环节；复杂需求 3+ 阶段。`

    function AiPreview({ controller, t, output, close }) {
      const parsedBlock = useMemo(() => {
        const blocks = [...String(output || '').matchAll(/```(?:yaml|yml)?\s*\n([\s\S]*?)```/g)]
        if (blocks.length > 0) return blocks[blocks.length - 1][1].trim()
        const s = String(output || '').trim()
        return s.startsWith('process:') || s.startsWith('#') ? s : ''
      }, [output])
      const [yaml, setYaml] = useState(parsedBlock)
      const [diag, setDiag] = useState(null)
      const [name, setName] = useState('')
      const [busy, setBusy] = useState(false)
      useEffect(() => {
        if (!yaml) { setDiag(null); return }
        let live = true
        api('/validate', { method: 'POST', body: { yaml } }).then((d) => { if (live) setDiag({ errors: d.errors, warnings: d.warnings, meta: d.meta }) }).catch(() => {})
        return () => { live = false }
      }, [yaml])
      useEffect(() => {
        if (diag && diag.meta && diag.meta.name && !name) setName(diag.meta.name)
      }, [diag])
      if (!parsedBlock) {
        return h('div', null, h('div', { className: 'dsh-prc-error' }, t('aiParseFail')), h('pre', { className: 'dsh-prc-pre', style: { maxHeight: 200 } }, String(output || '')))
      }
      const errCount = diag ? diag.errors.length : 0
      return h('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, minWidth: 'min(680px, 80vw)' } },
        h('div', { style: { fontWeight: 600 } }, t('aiPreviewTitle')),
        h('textarea', { value: yaml, onChange: (e) => setYaml(e.target.value), spellCheck: false, style: { minHeight: 260, fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 12, lineHeight: 1.5, border: '1px solid var(--dsw-alias-border-l2,rgba(128,128,128,.3))', borderRadius: 8, padding: 8, background: 'var(--dsw-alias-bg-layer-2,transparent)', color: 'inherit', whiteSpace: 'pre' } }),
        diag ? h(DiagList, { t, diagnostics: diag, onJump: () => {} }) : h('div', { style: { fontSize: 12, opacity: .7 } }, t('validating')),
        h('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
          h('input', { value: name, onChange: (e) => setName(e.target.value), placeholder: t('aiSaveName'), spellCheck: false, style: { flex: 1, border: '1px solid var(--dsw-alias-border-l2,rgba(128,128,128,.3))', background: 'var(--dsw-alias-bg-layer-2,transparent)', color: 'inherit', borderRadius: 8, padding: '6px 10px', font: 'inherit' } }),
          h('button', {
            className: 'dsh-prc-btn', 'data-primary': 'true', disabled: busy || errCount > 0 || name.trim() === '',
            onClick: async () => {
              setBusy(true)
              try {
                const result = await api('/save', { method: 'POST', body: { mode: 'create', name: name.trim(), yaml } })
                await controller.refresh()
                controller.select(result.id)
                controller.toast(t('toastAiSaved'))
                close()
              } catch (error) { controller.toast(String(error && error.message || error), 'err') } finally { setBusy(false) }
            },
          }, t('aiSave'))))
    }

    function AiDialog({ state, controller, t }) {
      const Dialog = useMemo(() => { const kit = getKit(); return kit ? kit.makeActionShareDialog(ReactGlobal || __React, {}) : null }, [])
      if (!Dialog) return h(Modal, { title: t('aiTitle'), onClose: () => controller.setState({ dialog: null }) }, h('div', { className: 'dsh-prc-error' }, t('kitMissing')))
      return h(Dialog, {
        title: '⚡ ' + t('aiTitle'),
        hint: t('aiHint'),
        params: [
          { key: 'requirement', label: t('aiRequirement'), multiline: true, placeholder: t('aiRequirementPh') },
          { key: 'complexity', label: t('aiComplexity'), placeholder: 'light' },
          { key: 'reference', label: t('aiReference'), placeholder: '' },
        ],
        initialPrompt: AI_PROMPT,
        run: (prompt) => controller.aiRun(prompt).then((jobId) => ({ jobId })),
        poll: (jobId) => controller.aiPoll(jobId),
        labels: { run: t('aiBtn'), running: t('aiRunning'), done: t('aiDone'), failed: t('aiFailed'), copy: t('copyPrompt'), copied: t('copied'), outputLabel: t('aiOutput'), openSession: t('openSession') },
        onOpenSession: (sessionId) => controller.openSession(sessionId),
        completedView: ({ job, output, close }) => h(AiPreview, { controller, t, output, close }),
        onClose: () => controller.setState({ dialog: null }),
      })
    }

    // ── 面板根 ───────────────────────────────────────────────────────────────

    function ProcessPanel({ controller, t, slotProps }) {
      const state = useControllerState(controller)
      const [left, setLeft] = useState(280)
      useEffect(() => {
        const update = () => {
          const col = document.querySelector('[class*="sidebarCol"], [data-pane="sidebar"]')
          if (col) setLeft(Math.max(0, col.getBoundingClientRect().width))
        }
        update()
        let ro
        try { ro = new ResizeObserver(update); const col = document.querySelector('[class*="sidebarCol"], [data-pane="sidebar"]'); if (col) ro.observe(col) } catch {}
        window.addEventListener('resize', update)
        return () => { if (ro) try { ro.disconnect() } catch {} ; window.removeEventListener('resize', update) }
      }, [])
      // 当前会话变化（点侧栏会话行/新会话）→ 关面板
      const useSess = slotProps && slotProps.useSessions
      const current = useSess ? useSess((s) => s.current) : undefined
      const prevCurrent = useRef(current)
      useEffect(() => {
        if (prevCurrent.current !== current && prevCurrent.current !== undefined && controller.getSnapshot().panelOpen) controller.closePanel()
        prevCurrent.current = current
      }, [current])
      // Esc 关面板（弹窗自己处理 Esc，开着弹窗时不抢）
      useEffect(() => {
        if (!state.panelOpen) return
        const onKey = (e) => {
          if (e.key !== 'Escape') return
          const s = controller.getSnapshot()
          if (s.dialog) return
          // 编辑器里按 Esc 先离开文本框（再按一次才关面板）；其他地方直接关
          if (e.target && e.target.tagName === 'TEXTAREA') { e.target.blur(); return }
          controller.closePanel()
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
      }, [state.panelOpen])
      // 面板打开时重新量一次侧栏宽（侧栏节点可能已被重建）
      useEffect(() => {
        if (!state.panelOpen) return
        const col = document.querySelector('[class*="sidebarCol"], [data-pane="sidebar"]')
        if (col) setLeft(Math.max(0, col.getBoundingClientRect().width))
      }, [state.panelOpen])
      if (!state.panelOpen) return null
      const detail = state.editor ? h(EditorPane, { state, controller, t }) : h(DetailPane, { state, controller, t })
      return h('div', { className: 'dsh-prc-panel', style: { left: left + 'px' }, 'data-dsh-prc-panel': '' },
        h(Toolbar, { state, controller, t }),
        state.error ? h('div', { className: 'dsh-prc-error' }, state.error) : null,
        state.lastError ? h('div', { className: 'dsh-prc-error' }, 'store: ' + state.lastError) : null,
        h('div', { className: 'dsh-prc-body' },
          state.view === 'exec' ? h(ExecView, { state, controller, t }) : h('div', { style: { display: 'contents' } }, h(ListPane, { state, controller, t }), detail)),
        state.dialog && state.dialog.type === 'create' ? h(CreateDialog, { state, controller, t }) : null,
        state.dialog && state.dialog.type === 'copy' ? h(CopyDialog, { state, controller, t }) : null,
        state.dialog && state.dialog.type === 'rename' ? h(RenameDialog, { state, controller, t }) : null,
        state.dialog && state.dialog.type === 'confirm' ? h(ConfirmDialog, { state, controller, t }) : null,
        state.dialog && state.dialog.type === 'import' ? h(ImportDialog, { state, controller, t }) : null,
        state.dialog && state.dialog.type === 'settings' ? h(SettingsDialog, { state, controller, t }) : null,
        state.dialog && state.dialog.type === 'ai' ? h(AiDialog, { state, controller, t }) : null,
        state.dialog && state.dialog.type === 'newrun' ? h(NewRunDialog, { state, controller, t }) : null,
        state.toast ? h('div', { className: 'dsh-prc-toast', 'data-kind': state.toast.kind }, state.toast.text) : null)
    }

    // ── 执行视图（v0.2）─────────────────────────────────────────────────────

    const LINK_STATE_KEY = { running: 'linkRunning', done: 'linkDone', gate_failed: 'linkGateFailed', skipped: 'linkSkipped', failed: 'linkFailed', abandoned: 'linkAbandoned' }

    function StatusPill({ t, status }) {
      return h('span', { className: 'dsh-prc-pill', 'data-status': status }, t('status' + status[0].toUpperCase() + status.slice(1)))
    }

    /** 每个环节的最新一次执行记录。 */
    function latestAttempts(run) {
      const map = new Map()
      for (const t of run.trail || []) {
        const prev = map.get(t.linkId)
        if (!prev || t.startedAt >= prev.startedAt) {
          // 最新记录缺 sessionId（如 skip 记录）时继承上一次的，跳转会话不丢
          map.set(t.linkId, !t.sessionId && prev && prev.sessionId ? { ...t, sessionId: prev.sessionId } : t)
        }
      }
      return map
    }

    function runProgress(run) {
      const latest = latestAttempts(run)
      const total = new Set([...indexLinksOf(run).keys()]).size
      let done = 0
      for (const [linkId] of indexLinksOf(run)) {
        const st = latest.get(linkId) && latest.get(linkId).status
        if (st === 'done' || st === 'skipped') done++
      }
      return { done, total }
    }
    function indexLinksOf(run) {
      const phases = run.snapshot && Array.isArray(run.snapshot.phases) ? run.snapshot.phases : []
      const map = new Map()
      for (const ph of phases) for (const ln of (Array.isArray(ph.links) ? ph.links : [])) if (ln.id) map.set(ln.id, { phase: ph, link: ln })
      return map
    }

    function RunList({ state, controller, t }) {
      const runs = state.runs.list
      return h('div', { className: 'dsh-prc-runlist' },
        runs.length === 0
          ? h('div', { style: { padding: '16px 8px', color: 'var(--dsw-text-secondary, gray)', fontSize: 12 } }, t('noRuns'), h('div', { style: { marginTop: 4, opacity: .8 } }, t('noRunsHint')))
          : runs.map((r) => h('button', {
            key: r.id, className: 'dsh-prc-runrow', 'data-selected': state.runId === r.id ? 'true' : undefined,
            onClick: () => controller.selectRun(r.id),
          },
          h('div', { style: { display: 'flex', gap: 6, alignItems: 'center' } },
            h('span', { className: 'dsh-prc-pill', 'data-status': r.status }, t('status' + r.status[0].toUpperCase() + r.status.slice(1))),
            h('span', { style: { flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 } }, r.displayName || r.processName)),
          h('div', { style: { display: 'flex', gap: 6, color: 'var(--dsw-text-secondary, gray)', fontSize: 11 } },
            h('span', null, t('progress', { done: r.doneLinks, total: r.totalLinks })),
            h('span', null, new Date(r.updatedAt).toLocaleTimeString())))))
    }

    function RunLinkCard({ t, run, phase, link, attempt, controller }) {
      const [open, setOpen] = useState(false)
      const st = attempt ? attempt.status : 'pending'
      const isCurrent = run.current && run.current.linkId === link.id && ['running', 'queued', 'awaiting'].includes(run.status)
      const rework = (run.rework && run.rework[link.id]) || 0
      const active = ['queued', 'running', 'awaiting', 'paused'].includes(run.status)
      return h('div', { className: 'dsh-prc-linkcard', 'data-state': st },
        h('div', { className: 'dsh-prc-linktop' },
          h('span', { className: 'dsh-prc-link-id' }, link.id),
          h('span', { style: { fontWeight: 500 } }, link.name || ''),
          isCurrent ? h('span', { className: 'dsh-prc-badge', 'data-kind': 'warn' }, t('currentStep')) : null,
          h('span', { className: 'grow' }),
          attempt && attempt.attempt > 1 ? h('span', { style: { fontSize: 11, opacity: .7 } }, t('attemptN', { n: attempt.attempt })) : null,
          rework > 0 ? h('span', { style: { fontSize: 11, color: '#b8860b' } }, t('reworkN', { n: rework })) : null,
          attempt && attempt.gate && attempt.gate.score !== null && attempt.gate.score !== undefined
            ? h('span', { className: 'dsh-prc-badge', 'data-kind': attempt.gate.score >= (attempt.gate.minScore || 0) ? 'ok' : 'err', title: attempt.gate.reason },
              t('gateLabel') + ' ' + attempt.gate.score + ' / ' + (attempt.gate.minScore || 0)) : null,
          h('span', { style: { fontSize: 11, opacity: .75 } }, t(LINK_STATE_KEY[st] || 'linkPending'))),
        h('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
          attempt && attempt.sessionId ? h('button', { className: 'dsh-prc-mini', onClick: () => controller.openSession(attempt.sessionId) }, t('openSession')) : null,
          attempt && attempt.outputTail ? h('button', { className: 'dsh-prc-mini', onClick: () => setOpen(!open) }, (open ? '▾ ' : '▸ ') + t('outputLabel')) : null,
          !active && attempt ? h('button', { className: 'dsh-prc-mini', onClick: () => void controller.runAction('retry-link', { id: run.id, linkId: link.id }) }, t('retryLink')) : null,
          !active && st !== 'pending' ? h('button', { className: 'dsh-prc-mini', onClick: () => void controller.runAction('skip-link', { id: run.id, linkId: link.id }) }, t('skipLink')) : null),
        open && attempt && attempt.outputTail ? h('pre', { className: 'dsh-prc-pre dsh-prc-tail' }, attempt.outputTail) : null)
    }

    function RunBoard({ state, controller, t }) {
      const run = state.run
      if (state.runLoading) return h('div', { className: 'dsh-prc-board' }, t('loading'))
      if (!run) return h('div', { className: 'dsh-prc-empty' }, t('emptyRun'))
      const latest = latestAttempts(run)
      const phases = Array.isArray(run.snapshot && run.snapshot.phases) ? run.snapshot.phases : []
      const { done, total } = runProgress(run)
      const active = ['queued', 'running', 'awaiting', 'paused'].includes(run.status)
      const children = [
        h('div', { className: 'dsh-prc-runhead' },
          h('h3', { className: 'dsh-prc-detail-title' }, run.displayName || run.processName),
          h(StatusPill, { t, status: run.status }),
          h('span', { className: 'dsh-prc-count' }, t('progress', { done, total })),
          h('div', { className: 'dsh-prc-actions' },
            run.status === 'running' || run.status === 'queued' ? h('button', { className: 'dsh-prc-btn', onClick: () => void controller.runAction('pause', { id: run.id }) }, t('pause')) : null,
            run.status === 'paused' ? h('button', { className: 'dsh-prc-btn', 'data-primary': 'true', onClick: () => void controller.runAction('resume', { id: run.id }) }, t('resume')) : null,
            active ? h('button', { className: 'dsh-prc-btn', 'data-danger': 'true', onClick: () => void controller.runAction('stop', { id: run.id }) }, t('stopRun')) : null)),
        h('div', { className: 'dsh-prc-chips' },
          h('span', { className: 'dsh-prc-chip' }, run.processId),
          run.error ? h('span', { className: 'dsh-prc-badge', 'data-kind': 'err' }, t('runError') + ': ' + run.error) : null,
          h('span', { style: { fontSize: 11, opacity: .6 } }, new Date(run.updatedAt).toLocaleString())),
      ]
      if (run.userInput) children.push(h('div', { className: 'dsh-prc-kv', style: { background: 'var(--dsw-alias-bg-layer-2, rgba(128,128,128,.06))', border: '1px solid var(--dsw-alias-border-l1, rgba(128,128,128,.2))', borderRadius: 8, padding: '6px 10px' } }, h('b', null, '📌 ' + t('runUserInput') + '：'), h('span', { style: { whiteSpace: 'pre-wrap' } }, run.userInput)))
      children.push(h('div', { className: 'dsh-prc-sec' }, h(FlowGraph, { t, parsed: run.snapshot, run })))
      if (run.pendingBreak) {
        children.push(h('div', { className: 'dsh-prc-break' },
          h('span', { style: { fontWeight: 600 } }, '⚠ ' + t('breakTitle')),
          h('span', { style: { fontSize: 12 } },
            run.pendingBreak.linkId
            + (run.pendingBreak.gate && run.pendingBreak.gate.score !== null && run.pendingBreak.gate.score !== undefined
              ? ' · ' + t('gateLabel') + ' ' + run.pendingBreak.gate.score + ' / ' + (run.pendingBreak.gate.minScore || 0) : '')
            + ' · ' + (run.pendingBreak.reason || '')),
          h('div', { className: 'dsh-prc-actions' },
            h('button', { className: 'dsh-prc-btn', 'data-primary': 'true', onClick: () => void controller.runAction('resolve-break', { id: run.id, decision: 'retry' }) }, t('decisionRetry')),
            h('button', { className: 'dsh-prc-btn', onClick: () => void controller.runAction('resolve-break', { id: run.id, decision: 'skip' }) }, t('decisionSkip')),
            h('button', { className: 'dsh-prc-btn', 'data-danger': 'true', onClick: () => void controller.runAction('resolve-break', { id: run.id, decision: 'stop' }) }, t('decisionStop')))))
      }
      for (let i = 0; i < phases.length; i++) {
        const ph = phases[i]
        const links = Array.isArray(ph.links) ? ph.links : []
        children.push(h('div', { className: 'dsh-prc-phase', key: ph.id || i },
          h('div', { className: 'dsh-prc-phase-head' },
            h('span', { className: 'dsh-prc-link-id' }, ph.id || i + 1),
            h('span', null, ph.name || ''),
            h('span', { className: 'dsh-prc-link-meta' }, links.length + ' ' + t('links'))),
          links.map((ln) => h(RunLinkCard, { key: ln.id, t, run, phase: ph, link: ln, attempt: latest.get(ln.id), controller }))))
      }
      return h('div', { className: 'dsh-prc-board' }, children)
    }

    function ExecView({ state, controller, t }) {
      return h('div', { style: { display: 'contents' } },
        h(RunList, { state, controller, t }),
        state.runId && (state.runLoading || state.run) ? h(RunBoard, { state, controller, t })
          : state.runId ? h('div', { className: 'dsh-prc-empty' }, t('loading')) : h('div', { className: 'dsh-prc-empty' }, t('emptyRun')))
    }

    function NewRunDialog({ state, controller, t }) {
      const dlg = state.dialog
      const [workspaces, setWorkspaces] = useState(null)
      const [ws, setWs] = useState('')
      const [req, setReq] = useState('')
      useEffect(() => {
        api('/workspaces').then((d) => setWorkspaces(d.workspaces || [])).catch(() => setWorkspaces([]))
      }, [])
      const proc = state.processes.find((p) => p.id === dlg.processId)
      const [busy, setBusy] = useState(false)
      const reqOk = req.trim() !== ''
      return h(Modal, { title: t('runCreate') + '：' + (proc ? (proc.display_name || proc.name) : ''), onClose: () => controller.setState({ dialog: null }) },
        h('div', { className: 'dsh-prc-kv' }, h('b', null, t('name') + ':'), proc ? proc.relPath : '—'),
        h('label', { className: 'dsh-prc-field' }, t('runUserInput'),
          h('textarea', {
            value: req, placeholder: t('runUserInputPh'), spellCheck: false, rows: 4,
            style: { width: '100%', resize: 'vertical', fontFamily: 'var(--dsw-font-family, inherit)', fontSize: 13, lineHeight: 1.6, border: '1px solid var(--dsw-alias-border-l2,rgba(128,128,128,.3))', borderRadius: 8, padding: '8px 10px', background: 'var(--dsw-alias-bg-layer-2,transparent)', color: 'inherit', boxSizing: 'border-box' },
            onChange: (e) => setReq(e.target.value),
          })),
        h('label', { className: 'dsh-prc-field' }, t('runWorkspace'),
          h('select', { value: ws, onChange: (e) => setWs(e.target.value) },
            workspaces === null ? h('option', { value: '' }, t('loading')) : [
              h('option', { key: '_', value: '' }, t('workspaceDefault')),
              workspaces.map((w) => h('option', { key: w.id, value: w.id }, w.title)),
            ])),
        h('div', { style: { fontSize: 12, opacity: .7 } }, '每个环节开一个全新会话执行；用户需求会注入每个环节；门禁由评审会话打分，不过按 on_gate_fail 流转，返工不超过 max_rework。'),
        h('div', { style: { display: 'flex', gap: 8, justifyContent: 'flex-end' } },
          h('button', { className: 'dsh-prc-btn', onClick: () => controller.setState({ dialog: null }) }, t('cancel')),
          h('button', { className: 'dsh-prc-btn', 'data-primary': 'true', disabled: busy || !proc || !reqOk, onClick: async () => {
            setBusy(true)
            try { await controller.createRun({ processId: dlg.processId, workspaceId: ws || undefined, userInput: req.trim() }) } catch (error) { controller.toast(String(error && error.message || error), 'err') } finally { setBusy(false) }
          } }, t('runCreate'))))
    }

    /**
     * 流程图可视化（v0.3）：工艺 YAML → 有向图 → 零依赖分层布局 → SVG 渲染。
     *
     * 建模对齐 ntd（nothing-todo）ProcessFlowGraph 的视觉语言：
     * - START → 第一个环节 → … → END；on_success 实线（forward 灰 / goto 跳转绿），
     *   on_gate_fail 红色虚线 + 「门禁未过 → <id>」标签，break 不连线只在节点上标注，
     *   回边（指向更早环节）从节点上沿绕行，自环画右侧小环。
     * - 节点卡：序号徽标、环节名、executor/expert、门禁徽标（最低分数线）、返工上限。
     * - 运行态叠加：attempt 状态映射节点描边/徽标（当前橙、完成绿+实际门禁得分、
     *   门禁未过红、跳过灰虚、中断深灰）。
     *
     * 布局是纯函数（rank 用 forward 边最长路径，层内按声明序），可在 plain Node 下单测。
     */


    const START_ID = '__start'
    const END_ID = '__end'

    /** 解析流转值（host validate.flowTarget 的客户端镜像）：'next'|'end'|'break'|{jump}。 */
    function clientFlowTarget(value) {
      if (value === undefined || value === null || value === '') return null
      const v = String(value).trim()
      if (v === 'next' || v === 'end' || v === 'break') return v
      if (v.startsWith('goto:')) return { jump: v.slice(5).trim() }
      return { jump: v }
    }

    /**
     * 解析后的工艺对象 → 流程图模型。
     * @returns {{ nodes: Array, edges: Array, breaks: Array, warnings: string[] } | null}
     *  nodes: { id, no, name, phaseId, phaseName, executor, expert, gateMin, gateCount, maxRework, skills }
     *  edges: { from, to, kind: 'forward'|'jump'|'fail', label }
     *  breaks: { linkId, field, value }（break 不连线，节点上标注）
     */
    function buildFlowModel(parsed) {
      if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.phases)) return null
      const nodes = []
      const byId = new Map()
      for (const ph of parsed.phases) {
        if (!ph || typeof ph !== 'object') continue
        const links = Array.isArray(ph.links) ? ph.links : []
        for (const ln of links) {
          if (!ln || typeof ln !== 'object' || !ln.id) continue
          const gates = Array.isArray(ln.gates) ? ln.gates.filter((g) => g && typeof g === 'object') : []
          const gateMin = gates.reduce((min, g) => (typeof g.min_score === 'number' ? Math.min(min, g.min_score) : min), Infinity)
          const node = {
            id: String(ln.id),
            no: nodes.length + 1,
            name: ln.name || ln.id,
            phaseId: ph.id || '',
            phaseName: ph.name || ph.id || '',
            executor: ln.executor || null,
            expert: (ln.expert_name || ln.expert) || null,
            gateCount: gates.length,
            gateMin: Number.isFinite(gateMin) ? gateMin : null,
            maxRework: Number.isInteger(ln.max_rework) ? ln.max_rework : null,
            skills: Array.isArray(ln.skills) ? ln.skills : [],
            onSuccess: ln.on_success || 'next',
            onGateFail: ln.on_gate_fail == null ? null : String(ln.on_gate_fail),
          }
          nodes.push(node)
          byId.set(node.id, node)
        }
      }
      if (nodes.length === 0) return null

      const edges = []
      const breaks = []
      const warnings = []
      if (nodes.length > 0) edges.push({ from: START_ID, to: nodes[0].id, kind: 'forward', label: '' })
      const resolve = (value, fromNode) => {
        const t = clientFlowTarget(value)
        if (t === null) return null
        if (t === 'next' || t === 'end' || t === 'break') return t
        return byId.has(t.jump) ? t.jump : null
      }
      nodes.forEach((node, i) => {
        // on_success
        const ok = resolve(node.onSuccess)
        if (ok === 'next') {
          const nextNode = nodes[i + 1]
          if (nextNode) edges.push({ from: node.id, to: nextNode.id, kind: 'forward', label: '' })
          else edges.push({ from: node.id, to: END_ID, kind: 'forward', label: '' })
        } else if (ok === 'end') {
          edges.push({ from: node.id, to: END_ID, kind: 'forward', label: '' })
        } else if (typeof ok === 'string') {
          edges.push({ from: node.id, to: ok, kind: 'jump', label: node.onSuccess })
        } else {
          warnings.push(`环节 "${node.id}" 的 on_success 无法解析`)
        }
        // on_gate_fail（与成功策略不同才画；显式 break 才记标注，缺省不标）
        const gf = node.onGateFail == null ? null : resolve(node.onGateFail)
        if (node.onGateFail === 'break') {
          breaks.push({ linkId: node.id, field: 'on_gate_fail', value: 'break' })
        } else if (typeof gf === 'string' && gf !== ok) {
          edges.push({ from: node.id, to: gf, kind: 'fail', label: `门禁未过 → ${gf}` })
        }
      })
      return { nodes, edges, breaks, warnings }
    }

    // ── 布局（纯函数）────────────────────────────────────────────────────────

    const FLOW_NODE_W = 196
    const FLOW_NODE_H = 74
    const FLOW_GAP_X = 64
    const FLOW_GAP_Y = 28
    const FLOW_PAD = 26
    const LOOP_BACK_PAD = 34

    /**
     * 分层布局：START=rank0；沿 forward/jump 前向边做最长路径分层；回边(to.rank≤from.rank)
     * 不参与分层、渲染为顶部绕行弧线。层内按声明序排布。
     * @returns {{ positions: Map, width: number, height: number, backEdges: Set<string>, loops: Set<string> }}
     *  positions: id → {x, y}（节点左上角；含 START/END 虚拟节点）
     */
    function layoutFlowGraph(model) {
      const { nodes, edges } = model
      const positions = new Map()
      const backEdges = new Set()
      const loops = new Set()
      const meta = new Map() // id → { row, col, dir }（蛇形排布信息，边路由用）
      const n = nodes.length
      if (n === 0) return { positions, width: 200, height: 120, backEdges, loops, meta }

      // 蛇形排布：每行 K 个（3-5，按 n 取平方根级别），奇数行反向，图变紧凑可读
      const K = Math.max(3, Math.min(5, Math.ceil(Math.sqrt(n))))
      const rowH = FLOW_NODE_H + FLOW_GAP_Y * 2
      nodes.forEach((nd, i) => {
        const row = Math.floor(i / K)
        const colInRow = i % K
        const dir = row % 2 === 0 ? 1 : -1
        const col = dir === 1 ? colInRow : K - 1 - colInRow
        positions.set(nd.id, {
          x: FLOW_PAD + col * (FLOW_NODE_W + FLOW_GAP_X),
          y: FLOW_PAD + LOOP_BACK_PAD + row * rowH,
        })
        meta.set(nd.id, { row, col, dir })
      })
      const rows = Math.ceil(n / K)
      const first = nodes[0].id, last = nodes[n - 1].id
      const firstPos = positions.get(first), lastPos = positions.get(last)
      positions.set(START_ID, { x: firstPos.x + FLOW_NODE_W / 2 - 60, y: firstPos.y - 52 })
      positions.set(END_ID, { x: lastPos.x + FLOW_NODE_W / 2 - 60, y: lastPos.y + FLOW_NODE_H + 22 })
      for (const e of edges) {
        const key = e.from + '→' + e.to
        if (e.from === e.to) loops.add(key)
      }
      const width = FLOW_PAD * 2 + K * (FLOW_NODE_W + FLOW_GAP_X) - FLOW_GAP_X
      const height = FLOW_PAD * 2 + LOOP_BACK_PAD + rows * rowH + 60
      return { positions, width, height, backEdges, loops, meta }
    }


    // ── 流程图 SVG 组件（v0.3）──────────────────────────────────────────────

    function flowPhaseColor(phaseId) {
      let h = 0
      for (let i = 0; i < String(phaseId || '').length; i++) h = (h * 31 + String(phaseId).charCodeAt(i)) >>> 0
      return 'hsl(' + (h % 360) + ' 45% 55%)'
    }

    function escXml(text) {
      return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    }

    /**
     * 流程图 SVG。model/layout 来自 flow-model；runState 可选（运行态高亮）：
     * { latestByLink: Map<linkId, attempt>, currentLinkId, pendingLinkId }
     */
    function FlowGraph({ t, parsed, run }) {
      const [zoom, setZoom] = useState(1)
      const wrapRef = useRef(null)
      const fittedRef = useRef(false)
      const model = useMemo(() => buildFlowModel(parsed), [parsed])
      const layout = useMemo(() => (model ? layoutFlowGraph(model) : null), [model])
      // 首屏自适应：整图铺满容器宽度（最多放大到 100%），之后用户手动缩放不被覆盖
      useEffect(() => {
        if (!layout || fittedRef.current || !wrapRef.current) return
        fittedRef.current = true
        const avail = wrapRef.current.clientWidth - 4
        if (layout.width > avail && avail > 100) setZoom(Math.max(0.3, avail / layout.width))
      }, [layout])
      const latest = useMemo(() => (run ? latestAttempts(run) : null), [run])
      if (!model || !layout) return h('div', { className: 'dsh-prc-empty' }, t('flowNoParsed'))

      const pos = layout.positions
      const nodeById = new Map([[START_ID, { id: START_ID, name: 'START', phaseName: '' }], [END_ID, { id: END_ID, name: 'END', phaseName: '' }], ...model.nodes.map((n) => [n.id, n])])
      const currentLinkId = run && run.current && run.current.linkId
      const stateOf = (linkId) => {
        if (!run) return null
        if (run.pendingBreak && run.pendingBreak.linkId === linkId) return 'awaiting'
        if (currentLinkId === linkId && ['running', 'queued', 'awaiting'].includes(run.status)) return 'current'
        const a = latest && latest.get(linkId)
        return a ? a.status : null
      }
      const STROKE = { forward: 'var(--dsw-text-secondary, #94a3b8)', jump: '#22c55e', fail: 'var(--dsw-alias-state-error, #ef4444)' }
      const edgePath = (e) => {
        const from = pos.get(e.from)
        const to = pos.get(e.to)
        if (!from || !to) return null
        const isLoop = layout.loops.has(e.from + '→' + e.to)
        if (e.from === START_ID) return { d: 'M' + (from.x + FLOW_NODE_W / 2) + ' ' + (from.y + 30) + ' L' + (to.x + FLOW_NODE_W / 2) + ' ' + to.y, label: null }
        if (e.to === END_ID) return { d: 'M' + (from.x + FLOW_NODE_W / 2) + ' ' + (from.y + FLOW_NODE_H) + ' L' + (to.x + FLOW_NODE_W / 2) + ' ' + to.y, label: null }
        if (isLoop) {
          const sx = from.x + FLOW_NODE_W, sy = from.y + 18
          return { d: 'M' + sx + ' ' + sy + ' C' + (sx + 46) + ' ' + sy + ' ' + (sx + 46) + ' ' + (sy + 30) + ' ' + sx + ' ' + (sy + 34), label: null }
        }
        const mf = layout.meta.get(e.from), mt = layout.meta.get(e.to)
        if (!mf || !mt) return null
        // 同行：顺向直线；逆向/跨列走节点上方弧线（含 fail 回边）
        if (mf.row === mt.row) {
          const toRight = mt.col > mf.col
          const inFlowDir = toRight === (mf.dir === 1)
          const sx = toRight ? from.x + FLOW_NODE_W : from.x
          const tx = toRight ? to.x : to.x + FLOW_NODE_W
          const y = from.y + FLOW_NODE_H / 2
          if (Math.abs(mt.col - mf.col) === 1 && inFlowDir) return { d: 'M' + sx + ' ' + y + ' L' + tx + ' ' + y, label: e.label || null }
          const ax = (sx + tx) / 2
          return { d: 'M' + sx + ' ' + (from.y) + ' C' + sx + ' ' + (from.y - 34) + ' ' + tx + ' ' + (to.y - 34) + ' ' + tx + ' ' + to.y, label: e.label || null, arcY: Math.min(from.y, to.y) - 24, ax }
        }
        // 相邻行的同列：垂直直落
        if (mt.row === mf.row + 1 && mt.col === mf.col) {
          return { d: 'M' + (from.x + FLOW_NODE_W / 2) + ' ' + (from.y + FLOW_NODE_H) + ' L' + (to.x + FLOW_NODE_W / 2) + ' ' + to.y, label: e.label || null }
        }
        // 跨行任意：经两行间隙的 S 曲线（fail 回到更早行则走上方）
        const sx = from.x + FLOW_NODE_W / 2
        const sy = mt.row > mf.row ? from.y + FLOW_NODE_H : from.y
        const tx = to.x + FLOW_NODE_W / 2
        const ty = mt.row > mf.row ? to.y : to.y + FLOW_NODE_H
        const midY = (sy + ty) / 2
        return { d: 'M' + sx + ' ' + sy + ' C' + sx + ' ' + midY + ' ' + tx + ' ' + midY + ' ' + tx + ' ' + ty, label: e.label || null }
      }

      const nodeSvg = (id) => {
        const p = pos.get(id)
        if (!p) return null
        if (id === START_ID || id === END_ID) {
          const isStart = id === START_ID
          return h('g', { key: id },
            h('rect', { x: p.x, y: p.y, width: FLOW_NODE_W, height: 30, rx: 15, fill: 'var(--dsw-alias-bg-layer-1, transparent)', stroke: 'var(--dsw-alias-border-l2, rgba(128,128,128,.4))' }),
            h('text', { x: p.x + FLOW_NODE_W / 2, y: p.y + 20, textAnchor: 'middle', fontSize: 12, fontWeight: 700, fill: 'var(--dsw-text-secondary, gray)', style: { fontFamily: 'monospace', letterSpacing: 2 } }, isStart ? '▶ START' : '■ END'))
        }
        const node = nodeById.get(id)
        const st = stateOf(id)
        const att = run && latest && latest.get(id)
        const border = st === 'current' ? '#d9822b'
          : st === 'done' || st === 'skipped' ? '#2e9e5b'
            : st === 'gate_failed' || st === 'awaiting' ? 'var(--dsw-alias-state-error, #ef4444)'
              : st === 'failed' ? 'var(--dsw-alias-state-error, #ef4444)' : 'var(--dsw-alias-border-l2, rgba(128,128,128,.35))'
        const badge = []
        if (node.gateCount > 0) badge.push(t('flowGate', { min: node.gateMin === null ? '?' : node.gateMin }))
        else badge.push(t('flowNoGate'))
        if (node.maxRework !== null) badge.push(t('flowRework', { n: node.maxRework }))
        let runBadge = null
        if (att && att.gate && att.gate.score !== null && att.gate.score !== undefined) {
          runBadge = att.gate.score + '/' + (att.gate.minScore || 0)
        }
        const meta = [node.executor, node.expert].filter(Boolean).join(' · ')
        const w = FLOW_NODE_W, hgt = FLOW_NODE_H
        return h('g', { key: id },
          h('rect', { x: p.x + 3, y: p.y + 6, width: 6, height: hgt - 12, rx: 3, fill: flowPhaseColor(node.phaseId) }),
          h('rect', { x: p.x, y: p.y, width: w, height: hgt, rx: 10, fill: 'var(--dsw-alias-bg-layer-1, #fff)', stroke: border, strokeWidth: st === 'current' ? 2.5 : 1.2 }),
          h('rect', { x: p.x - 9, y: p.y - 9, width: 22, height: 18, rx: 9, fill: 'var(--dsw-alias-bg-layer-2, #f1f5f9)', stroke: 'var(--dsw-alias-border-l1, rgba(128,128,128,.2))' }),
          h('text', { x: p.x + 2, y: p.y + 4, textAnchor: 'middle', fontSize: 10, fontWeight: 700, fill: 'var(--dsw-text-secondary, gray)', style: { fontFamily: 'monospace' } }, String(node.no).padStart(2, '0')),
          h('text', { x: p.x + 14, y: p.y + 24, fontSize: 13, fontWeight: 600, fill: 'var(--dsw-alias-label-primary, currentColor)' }, escXml(node.name.slice(0, 16))),
          h('text', { x: p.x + 14, y: p.y + 41, fontSize: 10, fill: 'var(--dsw-text-secondary, gray)' }, escXml((meta || node.phaseName || '').slice(0, 26))),
          h('text', { x: p.x + 14, y: p.y + hgt - 10, fontSize: 10, fill: node.gateCount > 0 ? '#b8860b' : 'var(--dsw-text-secondary, gray)' }, escXml(badge.join(' · ')).slice(0, 34)),
          runBadge ? h('rect', { x: p.x + w - 66, y: p.y + hgt + 6, width: 64, height: 18, rx: 9, fill: 'var(--dsw-alias-bg-layer-1, #fff)', stroke: '#2e9e5b' }) : null,
          runBadge ? h('text', { x: p.x + w - 34, y: p.y + hgt + 19, textAnchor: 'middle', fontSize: 10, fontWeight: 700, fill: '#2e9e5b' }, runBadge) : null,
          st === 'current' ? h('circle', { cx: p.x + w - 12, cy: p.y + 12, r: 5, fill: '#d9822b' }) : null,
          st === 'done' ? h('circle', { cx: p.x + w - 12, cy: p.y + 12, r: 5, fill: '#2e9e5b' }) : null,
          (st === 'gate_failed' || st === 'awaiting' || st === 'failed') ? h('circle', { cx: p.x + w - 12, cy: p.y + 12, r: 5, fill: 'var(--dsw-alias-state-error, #ef4444)' }) : null)
      }

      const edgeSvgs = []
      for (const e of model.edges) {
        const path = edgePath(e)
        if (!path) continue
        const color = e.kind === 'fail' ? STROKE.fail : e.kind === 'jump' ? STROKE.jump : STROKE.forward
        const dashed = e.kind === 'fail' ? '6,4' : undefined
        edgeSvgs.push(h('path', { key: e.from + '→' + e.to + e.kind, d: path.d, fill: 'none', stroke: color, strokeWidth: e.kind === 'fail' ? 1.8 : 1.4, strokeDasharray: dashed, markerEnd: 'url(#dsh-prc-arrow-' + (e.kind === 'fail' ? 'f' : e.kind === 'jump' ? 'j' : 'n') + ')' }))
        if (path.label) {
          const from = pos.get(e.from), to = pos.get(e.to)
          const mx = path.ax !== undefined ? path.ax : (from.x + to.x + FLOW_NODE_W) / 2
          const my = path.arcY !== undefined ? path.arcY - 8 : Math.min(from.y, to.y) - 6
          edgeSvgs.push(h('text', { key: e.from + '→' + e.to + e.kind + 'lbl', x: mx, y: my, textAnchor: 'middle', fontSize: 10, fill: e.kind === 'fail' ? 'var(--dsw-alias-state-error, #ef4444)' : '#16a34a', fontWeight: 600 }, escXml(path.label).slice(0, 30)))
        }
      }

      return h('div', null,
        h('div', { className: 'dsh-prc-flowlegend' },
          h('span', null, h('span', { className: 'sw fwd' }), t('flowLegendForward')),
          h('span', null, h('span', { className: 'sw jump' }), t('flowLegendJump')),
          h('span', null, h('span', { className: 'sw fail' }), t('flowLegendFail')),
          h('span', null, t('flowLegendBreak')),
          h('span', { style: { marginLeft: 'auto' } },
            h('button', { className: 'dsh-prc-mini', onClick: () => setZoom(Math.max(0.5, zoom - 0.2)) }, '−'),
            h('span', { style: { margin: '0 6px' } }, Math.round(zoom * 100) + '%'),
            h('button', { className: 'dsh-prc-mini', onClick: () => setZoom(Math.min(2, zoom + 0.2)) }, '+'))),
        h('div', { className: 'dsh-prc-flowwrap', ref: wrapRef },
          h('svg', { width: layout.width * zoom, height: layout.height * zoom, viewBox: '0 0 ' + layout.width + ' ' + layout.height },
            h('defs', null,
              h('marker', { id: 'dsh-prc-arrow-n', viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' }, h('path', { d: 'M0 0L10 5L0 10z', fill: 'var(--dsw-text-secondary, #94a3b8)' })),
              h('marker', { id: 'dsh-prc-arrow-j', viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' }, h('path', { d: 'M0 0L10 5L0 10z', fill: '#22c55e' })),
              h('marker', { id: 'dsh-prc-arrow-f', viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' }, h('path', { d: 'M0 0L10 5L0 10z', fill: 'var(--dsw-alias-state-error, #ef4444)' }))),
            edgeSvgs,
            [START_ID, ...model.nodes.map((n) => n.id), END_ID].map((id) => nodeSvg(id)))))
    }

    function FlowTab({ t, parsed }) {
      return h('div', null, h(FlowGraph, { t, parsed }))
    }



    // ── 挂载 ─────────────────────────────────────────────────────────────────

    const name = CLIENT_NAME
    const inject = ['slots', 'locale']

    function mountOverlaySlot(ctx, controller, t) {
      ctx.effect(() => {
        try {
          ctx.slots.inject('shell.overlay', () => ctx.slots.register(
            { name: 'shell.overlay', id: 'dsh-process', order: 100, locale: NS, label: () => t('title'), inject: () => ({}) },
            function ProcessOverlaySlot(slotProps) {
              return h(ProcessPanel, { controller, t, slotProps })
            },
          ))
        } catch (e) { (globalThis.__prcErrors = globalThis.__prcErrors || []).push('overlay:' + (e && e.message)); console.error('[dsh-process] overlay slot:', e) }
      }, 'dsh-process: overlay slot')
    }

    let ReactGlobal = null
    try { ReactGlobal = require('react') } catch {}

    /** 同页重复 apply 防护：上一次挂载的 teardown（apply 内赋值）。 */
    let activeApplyTeardown = null

    /** overlay 未渲染时的兜底挂载（taskboard 式中栏注入；仅开面板 450ms 后仍无面板才走）。 */
    let fallbackMount = null
    function mountFallbackPanel(controller) {
      if (fallbackMount) return
      try {
        const column = document.querySelector('[data-pane="conversation"], [class*="centerCol"], .dshDesktopConversationSurface')
        if (!column) return
        const container = document.createElement('div')
        container.style.cssText = 'position:fixed;inset:0;z-index:30;pointer-events:none;'
        column.appendChild(container)
        const root = require('react-dom/client').createRoot(container)
        root.render(h('div', { style: { pointerEvents: 'auto', display: 'contents' } },
          h(ProcessPanel, { controller, t: controller.t || makeT(null), slotProps: null })))
        fallbackMount = { container, root }
      } catch (e) { console.error('[dsh-process] fallback mount:', e) }
    }
    function unmountFallbackPanel() {
      if (!fallbackMount) return
      try { fallbackMount.root.unmount() } catch {}
      try { fallbackMount.container.remove() } catch {}
      fallbackMount = null
    }

    const moduleExports = {
      name,
      inject,
      __internals: { Controller, filterProcesses, ZH, EN, AI_PROMPT, colorizeLine, buildFlowModel, layoutFlowGraph, clientFlowTarget },
      __boot(container, opts = {}) {
        ensureStyles()
        const t = makeT(null)
        const controller = new Controller()
        controller.t = t
        if (opts.autostart !== false) controller.start()
        if (opts.open !== false) controller.openPanel()
        const root = require('react-dom/client').createRoot(container)
        root.render(h(ProcessPanel, { controller, t, slotProps: null }))
        return { controller, root }
      },
      apply(ctx) {
        ensureStyles()
        let t = makeT(null)
        try {
          if (ctx.locale && typeof ctx.locale.register === 'function') {
            ctx.locale.register(NS, 'zh', ZH)
            ctx.locale.register(NS, 'en', EN)
            const bound = typeof ctx.locale.bind === 'function' ? ctx.locale.bind(NS) : null
            if (bound) t = makeT(bound)
          }
        } catch (e) { try { console.error('[dsh-process] locale init:', e) } catch {} }
        const controller = new Controller()
        controller.t = t
        controller.start()
        try {
          const host = globalThis.location && globalThis.location.hostname
          if (host === 'localhost' || host === '127.0.0.1') window.__prc = controller
        } catch {}
        // 会话服务：动态 inject（客户端 ctx 支持；缺席时「打开会话」降级提示）
        try {
          if (typeof ctx.inject === 'function') ctx.inject(['sessions'], (scope) => { controller.sessionsSvc = scope && scope.sessions })
        } catch (e) { console.error('[dsh-process] sessions inject:', e) }
        // 同页重复 apply（重建/热重载）：先拆掉上一次挂载，避免残留失效的入口行
        if (typeof activeApplyTeardown === 'function') { try { activeApplyTeardown() } catch {} activeApplyTeardown = null }
        const disposers = []
        try { disposers.push(mountSidebarEntry(controller, t)) } catch (e) { console.error('[dsh-process] sidebar mount:', e) }
        mountOverlaySlot(ctx, controller, t)
        // 与其他面板互斥
        const onActivate = (event) => { if (event.detail !== PANEL_NAME && controller.getSnapshot().panelOpen) controller.closePanel() }
        document.addEventListener(ACTIVATE_EVENT, onActivate)
        const teardown = () => {
          document.removeEventListener(ACTIVATE_EVENT, onActivate)
          unmountFallbackPanel()
          for (const d of disposers) { try { d() } catch {} }
          controller.dispose()
        }
        activeApplyTeardown = teardown
        ctx.effect(() => teardown, 'dsh-process: client mount')
      },
    }

    // kit 内联（构建期注入到同一 factory 作用域的 var PluginKit；plain Node 测试下缺失 → AI 对话框降级提示）
    function getKit() {
      try { return typeof PluginKit !== 'undefined' ? PluginKit : null } catch { return null }
    }

    module.exports = moduleExports

    return module.exports
  }
})
