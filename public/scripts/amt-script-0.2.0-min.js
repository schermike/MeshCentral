function script_setup(e,t){var d={startvars:t};return e.length<6?(console.error("Invalid script length"),null):612182341!=ReadInt(e,0)?(console.error("Invalid binary script"),null):1<ReadShort(e,4)?(console.error("Unsupported script version"),null):(d.script=e.substring(6),d.reset=function(e){d.stop(),d.ip=0,d.variables=t,d.state=1},d.start=function(e){d.stop(),0<(d.stepspeed=e)&&(d.timer=setInterval(function(){d.step()},e))},d.stop=function(){null!=d.timer&&clearInterval(d.timer),d.timer=null,d.stepspeed=0},d.getVar=function(e){if(null!=e)return d.getVarEx(e.split("."),d.variables)},d.getVarEx=function(e,t){try{if(null==e)return;return 0==e.length?t:d.getVarEx(e.slice(1),t[e[0]])}catch(e){return null}},d.setVar=function(e,t){d.setVarEx(e.split("."),d.variables,t)},d.setVarEx=function(e,t,r){1==e.length?t[e[0]]=r:d.setVarEx(e.slice(1),t[e[0]],r)},d.step=function(){if(1==d.state){if(d.ip<d.script.length){var e=ReadShort(d.script,d.ip),t=ReadShort(d.script,d.ip+2),r=ReadShort(d.script,d.ip+4),a=d.ip+6,n=[];for(var s in d.variables)s.startsWith("__")&&delete d.variables[s];for(s=0;s<r;s++){var i=ReadShort(d.script,a),o=d.script.substring(a+2,a+2+i),l=o.charCodeAt(0);if(o=o.substring(1),l<2){for(;1<o.split("{").length;){var c=o.split("{").pop().split("}").shift();o=o.replace("{"+c+"}",d.getVar(c))}1==l&&(d.variables["__"+s]=decodeURI(o),o="__"+s),n.push(o)}2!=l&&3!=l||(d.variables["__"+s]=ReadSInt(o,0),n.push("__"+s)),a+=2+i}d.ip+=t;var u,p=[];for(s=0;s<10;s++)p.push(d.getVar(n[s]));try{if(e<1e4)switch(e){case 0:break;case 1:p[2]?("<"==p[2]&&p[1]<p[3]||"<="==p[2]&&p[1]<=p[3]||"!="==p[2]&&p[1]!=p[3]||"="==p[2]&&p[1]==p[3]||">="==p[2]&&p[1]>=p[3]||">"==p[2]&&p[1]>p[3])&&(d.ip=p[0]):d.ip=p[0];break;case 2:null==n[1]?delete d.variables[n[0]]:d.setVar(n[0],p[1]);break;case 3:d.onConsole?d.onConsole(d.toString(p[0]),d):console.log(d.toString(p[0]));break;case 4:d.state=2,d.dialog=!0,setDialogMode(11,p[0],p[2],d.xxStepDialogOk,p[1],d);break;case 5:for(var s in p[1])p[1][s][p[2]]==p[3]&&(u=s);break;case 6:u=p[1].substr(p[2],p[3]);break;case 7:u=p[1].indexOf(p[2]);break;case 8:u=p[1].split(p[2]);break;case 9:u=p[1].join(p[2]);break;case 10:u=p[1].length;break;case 11:u=JSON.parse(p[1]);break;case 12:u=JSON.stringify(p[1]);break;case 13:u=p[1]+p[2];break;case 14:u=p[1]-p[2];break;case 15:u=parseInt(p[1]);break;case 16:d.state=2,d.amtstack.BatchEnum(p[0],p[1],d.xxWsmanReturn,d);break;case 17:d.state=2,d.amtstack.Put(p[0],p[1],d.xxWsmanReturn,d);break;case 18:d.state=2,d.amtstack.Create(p[0],p[1],d.xxWsmanReturn,d);break;case 19:d.state=2,d.amtstack.Delete(p[0],p[1],d.xxWsmanReturn,d);break;case 20:d.state=2,d.amtstack.Exec(p[0],p[1],p[2],d.xxWsmanReturn,d,0,p[3]);break;case 21:d.stepspeed=p[0],null!=d.timer&&(clearInterval(d.timer),d.timer=setInterval(function(){d.step()},d.stepspeed));break;case 22:d.state=2,d.amtstack.Subscribe(p[0],p[1],p[2],d.xxWsmanReturn,d,0,p[3],p[4],p[5],p[6]);break;case 23:d.state=2,d.amtstack.UnSubscribe(p[0],d.xxWsmanReturn,d,0,p[1]);break;case 24:console.log(p[1],p[2],p[1].charCodeAt(p[2])),u=p[1].charCodeAt(p[2]);break;case 25:d.state=2,amtcert_signWithCaKey(p[0],null,p[1],{CN:"Untrusted Root Certificate"},d.xxSignWithDummyCaReturn);break;default:d.state=9,console.error("Script Error, unknown command: "+e)}else e<2e4?u=script_functionTableX2[e-1e4](p[1],p[2],p[3],p[4],p[5],p[6]):script_functionTableX3&&script_functionTableX3[e-2e4]&&(u=script_functionTableX3[e-2e4](d,p[1],p[2],p[3],p[4],p[5],p[6]));null!=u&&d.setVar(n[0],u)}catch(e){"object"==typeof e&&(e=e.message),d.setVar("_exception",e)}}return 1==d.state&&d.ip>=d.script.length&&(d.state=0,d.stop()),d.onStep&&d.onStep(d),d}},d.xxStepDialogOk=function(e){d.variables.DialogSelect=e,d.state=1,d.dialog=!1,d.onStep&&d.onStep(d)},d.xxWsmanReturnFix=function(e){e&&null!=e&&(e.Header&&(e.Header=e.Header,delete e.Header),e.Body&&(e.Body=e.Body,delete e.Body),e.Responses&&(e.Responses=e.Responses,delete e.Responses),e.Response&&(e.Response=e.Response,delete e.Response),e.ReturnValueStr&&(e.ReturnValueStr=e.ReturnValueStr,delete e.ReturnValueStr))},d.xxWsmanReturn=function(e,t,r,a){if(r)for(var n in d.xxWsmanReturnFix(r),r)for(var s in d.xxWsmanReturnFix(r[n]),r[n])d.xxWsmanReturnFix(r[n][s]);d.setVar(t,r),d.setVar("wsman_result",a),d.setVar("wsman_result_str",httpErrorTable[a]?httpErrorTable[a]:"Error #"+a),d.state=1,d.onStep&&d.onStep(d)},d.xxSignWithDummyCaReturn=function(e){d.setVar("signed_cert",btoa(_arrayBufferToString(e))),d.state=1,d.onStep&&d.onStep(d)},d.toString=function(e){return"object"==typeof e?JSON.stringify(e):e},d.reset(),d)}function script_compile(e,t){var r="",a=e.split("\n"),n={},s=[],i=[];for(var o in a){var l=a[o];if(l.startsWith("##SWAP "))3==(c=l.split(" ")).length&&(i[c[1]]=c[2]);if("#"!=l[0]&&0!=l.length){for(var c in i)l=l.split(c).join(i[c]);var u=l.match(/"[^"]*"|[^\s"]+/g);if(0!=u.length)if(":"!=l[0]){var p=script_functionTable1.indexOf(u[0].toLowerCase());if(-1==p&&0<=(p=script_functionTable2.indexOf(u[0].toLowerCase()))&&(p+=1e4),-1==p&&0<=(p=script_functionTable3.indexOf(u[0].toLowerCase()))&&(p+=2e4),-1==p)return t&&t("Unabled to compile, unknown command: "+u[0]),"";var d=ShortToStr(u.length-1);for(var f in u)if(0!=f)if(":"==u[f][0])s.push([u[f],r.length+d.length+7]),d+=ShortToStr(5)+String.fromCharCode(3)+IntToStr(4294967295);else{var h=parseInt(u[f]);h==u[f]?d+=ShortToStr(5)+String.fromCharCode(2)+IntToStr(h):'"'==u[f][0]&&'"'==u[f][u[f].length-1]?d+=ShortToStr(u[f].length-1)+String.fromCharCode(1)+u[f].substring(1,u[f].length-1):d+=ShortToStr(u[f].length+1)+String.fromCharCode(0)+u[f]}r+=d=ShortToStr(p)+ShortToStr(d.length+4)+d}else n[u[0].toUpperCase()]=r.length}}for(o in s){var b=s[o][0].toUpperCase(),g=s[o][1],S=n[b];if(null==S)return t&&t("Unabled to compile, unknown label: "+b),"";r=r.substr(0,g)+IntToStr(S)+r.substr(g+4)}return IntToStr(612182341)+ShortToStr(1)+r}function script_decompile(e,t){var r="",a=6,n={};if(0<=t)a=t;else{if(e.length<6)return"# Invalid script length";var s=ReadInt(e,0),i=ReadShort(e,4);if(612182341!=s)return"# Invalid binary script: "+s;if(1!=i)return"# Invalid script version"}for(;a<e.length;){var o=ReadShort(e,a),l=ReadShort(e,a+2),c=ReadShort(e,a+4),u=a+6,p="";0<=t||(r+=":label"+(a-6)+"\n");for(var d=0;d<c;d++){var f=ReadShort(e,u),h=e.substring(u+2,u+2+f),b=h.charCodeAt(0);if(0==b)p+=" "+h.substring(1);else if(1==b)p+=' "'+h.substring(1)+'"';else if(2==b)p+=" "+ReadInt(h,1);else if(3==b){var g=ReadInt(h,1),S=n[g];S||(n[S=":label"+g]=g),p+=" "+S}u+=2+f}if(r+=o<1e4?script_functionTable1[o]+p+"\n":2e4<=o?script_functionTable3[o-2e4]+p+"\n":script_functionTable2[o-1e4]+p+"\n",a+=l,0<=t)return r}var m=r.split("\n");for(var d in r="",m){var x=m[d];":"!=x[0]?r+=x+"\n":n[x]&&(r+=x+"\n")}return r}script_functionTable1=["nop","jump","set","print","dialog","getitem","substr","indexof","split","join","length","jsonparse","jsonstr","add","substract","parseint","wsbatchenum","wsput","wscreate","wsdelete","wsexec","scriptspeed","wssubscribe","wsunsubscribe","readchar","signwithdummyca"],script_functionTable2=["encodeuri","decodeuri","passwordcheck","atob","btoa","hex2str","str2hex","random","md5","maketoarray","readshort","readshortx","readint","readsint","readintx","shorttostr","shorttostrx","inttostr","inttostrx"],script_functionTableX2=[encodeURI,decodeURI,passwordcheck,window.atob.bind(window),window.btoa.bind(window),hex2rstr,rstr2hex,random,rstr_md5,MakeToArray,ReadShort,ReadShortX,ReadInt,ReadSInt,ReadIntX,ShortToStr,ShortToStrX,IntToStr,IntToStrX],script_functionTable3=["pullsystemstatus","pulleventlog","pullauditlog","pullcertificates","pullwatchdog","pullsystemdefense","pullhardware","pulluserinfo","pullremoteaccess","highlightblock","disconnect","getsidstring","getsidbytearray"],script_functionTableX3=[PullSystemStatus,PullEventLog,PullAuditLog,PullCertificates,PullWatchdog,PullSystemDefense,PullHardware,PullUserInfo,PullRemoteAccess,script_HighlightBlock,disconnect,function(e,t){return GetSidString(t)},function(e,t){return GetSidByteArray(t)}]