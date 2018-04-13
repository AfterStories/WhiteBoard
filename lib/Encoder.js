function Encoder(protoPath){
    this.protoPath = protoPath;
    this.name = null;
    this.token = null;
    this.loginObject = null;
    this.joinRoomObject = null;
    this.createRoomObject = null;

    this.id = 2;
}

Encoder.prototype.addCommand = function(command){
    this.command = command;
    return this;
};

Encoder.prototype.addLoginObject = function(name, token){
    if(ProtoCoderPath.root == null){
        this.name = name;
        this.token = token;
    }
    else{
        Login = ProtoCoderPath.root.lookup("Login");
        this.loginObject = Login.create({name: name, token: token});

    }
    return this;
};

Encoder.prototype.addJoinRoomObject = function(name, roomName){

    var JoinRoom = ProtoCoderPath.root.lookup("JoinRoom");
    this.joinRoomObject = JoinRoom.create({name: name, roomName: roomName});

    return this;
};

Encoder.prototype.addCreateRoomObject = function(userName, roomName){

    var CreateRoom = ProtoCoderPath.root.lookup("CreateRoom");
    this.createRoomObject = CreateRoom.create({roomName: roomName, name: userName});

    return this;
};


Encoder.prototype.build = function(callBack){
    var ChannelObjectRequest;
    var request = null;
    var command = this.command;
    var name = this.name;
    var token = this.token;
    var loginObject = this.loginObject;
    var protoPath = this.protoPath;
    if(command == "login"){
        if(ProtoCoderPath.root == null){
            protobuf.load(protoPath, function (err, root) {
                if (err) {throw err;}
                ProtoCoderPath.root = root;
                Login = root.lookup("Login");
                loginObject = Login.create({name: name, token: token});
                onSubObjectBuildFinish();
            });
            return;
        }
        else{

        }
    }

    ChannelObjectRequest = ProtoCoderPath.root.lookup("ChannelObjectRequest");
    switch(command) {
        case CommandType.getInstance().LOGIN_COMMAND().requestName:
            request = ChannelObjectRequest.create({ id: this.id ++, command:command, loginObject:loginObject});
            break;
        case CommandType.getInstance().JOINROOM_COMMAND().requestName:
            request = ChannelObjectRequest.create({ id: this.id ++, command:command, joinRoomObject:this.joinRoomObject});
            break;
        case CommandType.getInstance().CREATEROOM_COMMAND().requestName:
            request = ChannelObjectRequest.create({ id: this.id ++, command:command, createRoomObject:this.createRoomObject});
    }
    var ret = addLengthToBuffer(ChannelObjectRequest.encode(request).finish());
    var retStr = "";
    for(var i = 0; i < ret.length; i ++){
        retStr += (ret[i] + " ");
    }
    console.log(ret);
    return ret;


    function onSubObjectBuildFinish(){

        protobuf.load(protoPath, function (err, root) {
            if (err) {throw err;}
            ProtoCoderPath.root = root;
            ChannelObjectRequest = root.lookup("ChannelObjectRequest");
            request = ChannelObjectRequest.create({ id: 1, command:command, loginObject:loginObject});
            var ret = addLengthToBuffer(ChannelObjectRequest.encode(request).finish());
            var retStr = "";
            for(var i = 0; i < ret.length; i ++){
                retStr += (ret[i] + " ");
            }
            console.log(ret);
            callBack(ret);
        });
    }


    function addLengthToBuffer(buffer){
        var retArr = new Uint8Array(buffer.length + 1);
        for(var i = 0; i < buffer.length; i ++){
            retArr[i + 1] =  buffer[i];
        }
        retArr[0] = buffer.length;
        return retArr;
    }
};






