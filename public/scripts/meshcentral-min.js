var MeshServerCreateControl=function(t,e){var o={State:0,connectstate:0,pingTimer:null};return o.authCookie=e,o.trace=!1,o.xxStateChange=function(e,t){if(o.State!=e){var n=o.State;o.State=e,o.onStateChanged&&o.onStateChanged(o,o.State,n,t)}},o.Start=function(){if(0==o.connectstate){o.connectstate=0;var e=window.location.protocol.replace("http","ws")+"//"+window.location.host+t+"control.ashx";o.authCookie&&""!=o.authCookie&&(e+="?auth="+o.authCookie),o.socket=new WebSocket(e),o.socket.onopen=function(e){o.connectstate=1},o.socket.onmessage=o.xxOnMessage,o.socket.onclose=function(e){o.Stop(e.code)},o.xxStateChange(1,0),null!=o.pingTimer&&clearInterval(o.pingTimer),o.pingTimer=setInterval(function(){o.send({action:"ping"})},29e3)}},o.Stop=function(e){o.connectstate=0,o.socket&&(o.socket.close(),delete o.socket),null!=o.pingTimer&&(clearInterval(o.pingTimer),o.pingTimer=null),o.xxStateChange(0,e)},o.xxOnMessage=function(e){var t;1==o.State&&o.xxStateChange(2);try{t=JSON.parse(e.data)}catch(e){return}if("object"==typeof t&&"pong"!=t.action){if("close"==t.action)return t.msg&&console.log(t.msg),void o.Stop(t.cause);o.trace&&console.log("RECV",t),o.onMessage&&o.onMessage(o,t)}},o.send=function(e){null!=o.socket&&1==o.connectstate&&(o.trace&&"ping"!=e.action&&console.log("SEND",e),o.socket.send(JSON.stringify(e)))},o}