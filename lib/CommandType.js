function CommandType(){
    this.loginCommand = new CommandGroup("login");
    this.joinRoomCommand = new CommandGroup("joinroom");
    this.createRoomCommand = new CommandGroup("createroom");
}

CommandType.instance = null;

CommandType.getInstance = function(){

    if(CommandType.instance !== null){
        return CommandType.instance;
    }
    else{
        CommandType.instance = new CommandType();

    }

    return CommandType.instance;
};



CommandType.prototype.LOGIN_COMMAND = function(){
    return this.loginCommand;
};
CommandType.prototype.JOINROOM_COMMAND = function(){
    return this.joinRoomCommand;
};
CommandType.prototype.CREATEROOM_COMMAND = function(){
    return this.createRoomCommand;
};


