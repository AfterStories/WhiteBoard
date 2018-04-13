

function WhiteBoardHandler(){
    this.webSocketHandler = new WebSocketHandler("192.168.2.87", 8009, "/ws", this);
    this.coderBuilder = CoderBuilder.getInstance("lib/protoSrc/whiteBoard.proto");
    this.isCoderInitFinish = false;
	this.callBackList = {};
}

WhiteBoardHandler.prototype.addEventCallBack = function(commandName, callBackFunction){
		this.callBackList[commandName] = callBackFunction;
};

WhiteBoardHandler.prototype.connectServer = function(){
    this.webSocketHandler.start();
};



WhiteBoardHandler.prototype.login = function(userName, passord){
    var handler = this.webSocketHandler;
    var _this = this;
    if(this.isCoderInitFinish == false){
	    this.coderBuilder.getEncoder().addCommand(CommandType.getInstance().LOGIN_COMMAND().requestName).addLoginObject(userName, passord).build(function(bytes){
	        _this.isCoderInitFinish = true;
	        console.log(bytes);
	        handler.sendObject(bytes);
    	});
	}
	else{
		handler.sendObject(this.coderBuilder.getEncoder().addCommand(CommandType.getInstance().LOGIN_COMMAND().requestName).addLoginObject(userName, passord).build());
	}
};

WhiteBoardHandler.prototype.joinRoom = function(userName, roomName){
    this.webSocketHandler.sendObject(this.coderBuilder.getEncoder().addCommand(CommandType.getInstance().JOINROOM_COMMAND().requestName).addJoinRoomObject(userName, roomName).build());
};

WhiteBoardHandler.prototype.createRoom = function(userName, roomName){
    this.webSocketHandler.sendObject(this.coderBuilder.getEncoder().addCommand(CommandType.getInstance().CREATEROOM_COMMAND().requestName).addCreateRoomObject( userName, roomName).build());
};

WhiteBoardHandler.prototype.onRead = function(data){
	var obj = (new Decoder()).decode(data);
    console.log(obj.command);
    this.callBackList[obj.command]();
};
