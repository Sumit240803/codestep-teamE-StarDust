import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Types "types";

actor NFTCanister {
    stable var nfts : [Types.NFT] = [];
    stable var nextTokenId = 0;

    public shared func mint(name : Text, mediaUrl : Text, owner : Principal) : async Types.TokenId {
        let tokenId = nextTokenId;
        nextTokenId += 1;
        let newNft : Types.NFT = {
            id = tokenId;
            owner = owner;
            metadata = {    
                name = name;
                media_url = mediaUrl;
            };
        };
        nfts := Array.append(nfts, [newNft]);
        return tokenId;
    };

    public query func getAllNfts() : async [Types.NFT]{
        return nfts;
    };
    public query func ownedNfts(owner : Principal) : async [Types.NFT]{
        return Array.filter<Types.NFT>(nfts,func(nft){nft.owner == owner});
    };


}