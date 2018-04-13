function CoderBuilder(protoPath){
    this.protoPath = protoPath;
}

CoderBuilder.instance = null;

CoderBuilder.getInstance = function(protoPath){

    if(CoderBuilder.instance != null){
        return CoderBuilder.instance;
    }
    else{
        if(protoPath == null){
            return null;
        }
        else {
            CoderBuilder.instance = new CoderBuilder(protoPath);
        }
    }

    return CoderBuilder.instance;
};


CoderBuilder.prototype.getEncoder = function(){
    return new Encoder(this.protoPath);
};

CoderBuilder.prototype.getDecoder = function(){
    return null;
};