function WebSocketHandler(host, port, url, delegate){  //192.168.2.87  8009   /ws
    this.host = host;
    this.port = port;
    this.url = url;
    this.websocket = null;
    WebSocketHandler.delegate = delegate;
}

WebSocketHandler.prototype.start = function(){
    if(this.url == null){
        this.websocket = new WebSocket("ws://" + this.host + ":" + this.port);
    }
    else{
        this.websocket = new WebSocket("ws://" + this.host + ":" + this.port + this.url);
    }
    this.websocket.binaryType = "arraybuffer";//二进制数据模式
    this.websocket.onerror = WebSocketHandler.prototype.onError;
    this.websocket.onopen = WebSocketHandler.prototype.onOpen;
    this.websocket.onmessage = WebSocketHandler.prototype.onMessage;
    this.websocket.onclose = WebSocketHandler.prototype.onClose;
    return true;
};




WebSocketHandler.prototype.onError = function(event){

    console.log(JSON.stringify(event));
};

WebSocketHandler.prototype.onOpen = function(){

};

WebSocketHandler.prototype.onMessage = function(event){
   // console.log( event.data);
    var msg = new Uint8Array(event.data);

    var sub = msg.subarray(1, msg.length);
    console.log(sub);
    WebSocketHandler.delegate.onRead(sub);
};

WebSocketHandler.prototype.onClose = function(event){
    console.log(JSON.stringify(event));
};

WebSocketHandler.prototype.sendObject = function(bytes){
    console.log("send^~^" + bytes);
    this.websocket.send(bytes);
};


