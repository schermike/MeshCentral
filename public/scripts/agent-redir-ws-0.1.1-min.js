var CreateAgentRedirect=function(e,t,n,o,a,c){var s={};function l(){1==s.webSwitchOk&&1==s.webRtcActive&&(s.latency.current=-1,s.sendCtrlMsg('{"ctrlChannel":"102938","type":"webrtc0"}'),s.sendCtrlMsg('{"ctrlChannel":"102938","type":"webrtc1"}'),null!=s.onStateChanged&&s.onStateChanged(s,s.State))}((s.m=t).parent=s).meshserver=e,s.authCookie=o,s.rauthCookie=a,s.State=0,s.nodeid=null,s.options=null,s.socket=null,s.connectstate=-1,s.tunnelid=Math.random().toString(36).substring(2),s.protocol=t.protocol,s.onStateChanged=null,s.ctrlMsgAllowed=!0,s.attemptWebRTC=!1,s.webRtcActive=!1,s.webSwitchOk=!1,s.webchannel=null,s.webrtc=null,s.debugmode=0,s.serverIsRecording=!1,s.urlname="meshrelay.ashx",s.latency={lastSend:null,current:-1,callback:null},null==c&&(c="/"),s.consoleMessage=null,s.onConsoleMessageChange=null,s.metadata=null,s.onMetadataChange=null,s.Start=function(e){var t=window.location.protocol.replace("http","ws")+"//"+window.location.host+window.location.pathname.substring(0,window.location.pathname.lastIndexOf("/"))+"/"+s.urlname+"?browser=1&p="+s.protocol+(e?"&nodeid="+e:"")+"&id="+s.tunnelid;null!=o&&""!=o&&(t+="&auth="+o),null!=urlargs&&null!=urlargs.slowrelay&&(t+="&slowrelay="+urlargs.slowrelay),s.nodeid=e,s.connectstate=0,s.socket=new WebSocket(t),s.socket.binaryType="arraybuffer",s.socket.onopen=s.xxOnSocketConnected,s.socket.onmessage=s.xxOnMessage,s.socket.onerror=function(e){},s.socket.onclose=s.xxOnSocketClosed,s.xxStateChange(1),null!=s.meshserver&&(e="*"+c+"meshrelay.ashx?p="+s.protocol+"&nodeid="+e+"&id="+s.tunnelid,null!=a&&""!=a&&(e+="&rauth="+a),s.meshserver.send({action:"msg",type:"tunnel",nodeid:s.nodeid,value:e,usage:s.protocol}))},s.xxOnSocketConnected=function(){1==s.debugmode&&console.log("onSocketConnected"),s.xxStateChange(2)},s.xxOnControlCommand=function(e){var t;try{t=JSON.parse(e)}catch(e){return}"102938"==t.ctrlChannel?("undefined"!=typeof args&&args.redirtrace&&console.log("RedirRecv",t),"console"==t.type?s.setConsoleMessage(t.msg,t.msgid,t.msgargs,t.timeout):"metadata"==t.type?(s.metadata=t,s.onMetadataChange&&s.onMetadataChange(s.metadata)):"rtt"==t.type&&"number"==typeof t.time?(s.latency.current=(new Date).getTime()-t.time,null!=s.latency.callbacks&&s.latency.callback(s.latency.current)):null!=s.webrtc&&("answer"==t.type?s.webrtc.setRemoteDescription(new RTCSessionDescription(t),function(){},s.xxCloseWebRTC):"webrtc0"==t.type?(s.webSwitchOk=!0,l()):"webrtc1"==t.type?s.sendCtrlMsg('{"ctrlChannel":"102938","type":"webrtc2"}'):t.type)):s.m.ProcessData?s.m.ProcessData(e):console.log(e)},s.setConsoleMessage=function(e,t,n,o){s.consoleMessage!=e&&(s.consoleMessage=e,s.consoleMessageId=t,s.consoleMessageArgs=n,s.consoleMessageTimeout=o,s.onConsoleMessageChange&&s.onConsoleMessageChange(s,s.consoleMessage,s.consoleMessageId))},s.sendCtrlMsg=function(e){if(1==s.ctrlMsgAllowed){"undefined"!=typeof args&&args.redirtrace&&console.log("RedirSend",typeof e,e);try{s.socket.send(e)}catch(e){}}},s.xxOnMessage=function(e){if(s.State<3&&("c"==e.data||"cr"==e.data)){if("cr"==e.data&&(s.serverIsRecording=!0),null!=s.options){delete s.options.action,s.options.type="options";try{s.sendCtrlMsg(JSON.stringify(s.options))}catch(e){}}try{s.socket.send(s.protocol)}catch(e){}return s.xxStateChange(3),void(1==s.attemptWebRTC&&(r=null,"undefined"!=typeof RTCPeerConnection?s.webrtc=new RTCPeerConnection(r):"undefined"!=typeof webkitRTCPeerConnection&&(s.webrtc=new webkitRTCPeerConnection(r)),null!=s.webrtc&&s.webrtc.createDataChannel&&(s.webchannel=s.webrtc.createDataChannel("DataChannel",{}),s.webchannel.binaryType="arraybuffer",s.webchannel.onmessage=s.xxOnMessage,s.webchannel.onopen=function(){s.webRtcActive=!0,l()},s.webchannel.onclose=function(e){s.webRtcActive&&s.Stop()},s.webrtc.onicecandidate=function(e){if(null==e.candidate)try{s.sendCtrlMsg(JSON.stringify(s.webrtcoffer))}catch(e){}else s.webrtcoffer.sdp+="a="+e.candidate.candidate+"\r\n"},s.webrtc.oniceconnectionstatechange=function(){null!=s.webrtc&&("disconnected"==s.webrtc.iceConnectionState?1==s.webRtcActive?s.Stop():s.xxCloseWebRTC():"failed"==s.webrtc.iceConnectionState&&s.xxCloseWebRTC())},s.webrtc.createOffer(function(e){s.webrtcoffer=e,s.webrtc.setLocalDescription(e,function(){},s.xxCloseWebRTC)},s.xxCloseWebRTC,{mandatory:{OfferToReceiveAudio:!1,OfferToReceiveVideo:!1}}))))}if("string"==typeof e.data)"~"==e.data[0]?s.m.ProcessData(e.data):s.xxOnControlCommand(e.data);else if(s.m.ProcessBinaryCommand){if(!(0==u&&e.data.byteLength<4))if(0!=u){var t=new Uint8Array(e.data);if(g.push(t),u+=t.byteLength,d<=u){var n,o=new Uint8Array(u),a=0;for(n in g)o.set(g[n],a),a+=g[n].byteLength;s.m.ProcessBinaryCommand(i,d,o),u=d=i=0,g=[]}}else{var c=((t=new Uint8Array(e.data))[0]<<8)+t[1],r=(t[2]<<8)+t[3];27==c&&8==r&&(c=(t[8]<<8)+t[9],r=(t[5]<<16)+(t[6]<<8)+t[7],t=t.slice(8)),r!=t.byteLength?(i=c,d=r,u=t.byteLength,g=[t]):s.m.ProcessBinaryCommand(c,r,t)}}else s.m.ProcessBinaryData?s.m.ProcessBinaryData(new Uint8Array(e.data)):e.data.byteLength<16e3?s.m.ProcessData(String.fromCharCode.apply(null,new Uint8Array(e.data))):(t=new Blob([new Uint8Array(e.data)]),(e=new FileReader).onload=function(e){s.m.ProcessData(e.target.result)},e.readAsBinaryString(t))};var i=0,d=0,u=0,g=[];return s.sendText=function(e){"string"!=typeof e&&(e=JSON.stringify(e)),s.send(encode_utf8(e))},s.send=function(e){"undefined"!=typeof args&&args.redirtrace&&console.log("RedirSend",typeof e,e.length,"{"==e[0]?e:rstr2hex(e).substring(0,64));try{if(null!=s.socket&&s.socket.readyState==WebSocket.OPEN)if("string"==typeof e)if(1==s.debugmode){for(var t=new Uint8Array(e.length),n=[],o=0;o<e.length;++o)t[o]=e.charCodeAt(o),n.push(e.charCodeAt(o));(1==s.webRtcActive?s.webchannel:s.socket).send(t.buffer)}else{for(t=new Uint8Array(e.length),o=0;o<e.length;++o)t[o]=e.charCodeAt(o);(1==s.webRtcActive?s.webchannel:s.socket).send(t.buffer)}else(1==s.webRtcActive?s.webchannel:s.socket).send(e)}catch(e){}},s.xxOnSocketClosed=function(){s.Stop(1)},s.xxStateChange=function(e){s.State!=e&&(s.State=e,s.m.xxStateChange(s.State),null!=s.onStateChanged&&s.onStateChanged(s,s.State))},s.xxCloseWebRTC=function(){if(null!=s.webchannel){try{s.webchannel.close()}catch(e){}s.webchannel=null}if(null!=s.webrtc){try{s.webrtc.close()}catch(e){}s.webrtc=null}s.webRtcActive=!1},s.Stop=function(e){if(1==s.debugmode&&console.log("stop",e),s.xxCloseWebRTC(),s.connectstate=-1,null!=s.socket){try{1==s.socket.readyState&&(s.sendCtrlMsg('{"ctrlChannel":"102938","type":"close"}'),s.socket.close())}catch(e){}s.socket=null}s.xxStateChange(0)},s}