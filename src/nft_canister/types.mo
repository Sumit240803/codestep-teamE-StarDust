import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Principal "mo:base/Principal";

module {

    public type TokenId = Nat;
    
    public type MetaData = {
        name : Text;
        media_url : Text;
    };
    
    public type NFT = {
        id : TokenId;
        owner : Principal;
        metadata : MetaData;
    };
}