function Decoder() {
    if(ProtoCoderPath.root == null){
        return null;
    }
}



Decoder.prototype.decode = function (byteArr) {

    var ChannelObjectResponse = ProtoCoderPath.root.lookup("ChannelObjectResponse");
    var obj = ChannelObjectResponse.decode(byteArr);
    return obj;
};