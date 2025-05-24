import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Debug "mo:base/Debug";
import Bool "mo:base/Bool";
import Types "types";
import Ledger "canister:icrc1_ledger_canister";
actor NFTCanister {
    stable var nfts : [Types.NFT] = [];
    stable var nextTokenId = 0;

    public shared func mint(name : Text, mediaUrl : Text, owner : Principal , cost : Nat) : async Types.TokenId {
        let tokenId = nextTokenId;
        nextTokenId += 1;
        let newNft : Types.NFT = {
            id = tokenId;
            owner = owner;
            metadata = {    
                name = name;
                media_url = mediaUrl;
            };
            price = cost;
        };
        nfts := Array.append(nfts, [newNft]);
        return tokenId;
    };

    public query({caller}) func getMarketplaceNfts() : async [Types.NFT] {
  return Array.filter<Types.NFT>(nfts, func(nft) { nft.owner != caller });
};

    public query func ownedNfts(owner : Principal) : async [Types.NFT] {
  Debug.print("ownedNfts called for owner: " # Principal.toText(owner));
  let filtered = Array.filter<Types.NFT>(nfts, func(nft) {
    let match = nft.owner == owner;
    Debug.print("NFT " # Nat.toText(nft.id) # " owned by " # Principal.toText(nft.owner) # " match? " # Bool.toText(match));
    match
  });
  return filtered;
};

/*
public shared({caller}) func buyNft(tokenId: Nat) : async Result.Result<Text, Text> {
  Debug.print("buyNft called by: " # Principal.toText(caller));
  Debug.print("Searching for NFT with ID: " # Nat.toText(tokenId));

  let nftOpt = Array.find<Types.NFT>(nfts, func(nft : Types.NFT) : Bool {
    nft.id == tokenId
  });

  switch (nftOpt) {
    case null {
      Debug.print("NFT not found for ID: " # Nat.toText(tokenId));
      return #err("NFT not found");
    };
    case (?nft) {
      Debug.print("NFT found. Owner: " # Principal.toText(nft.owner));
      
      if (nft.owner == caller) {
        Debug.print("Caller already owns this NFT.");
        return #err("You already own this NFT");
      };

      Debug.print("Fetching balance for caller...");
      let balance = await Ledger.icrc1_balance_of({
        owner = caller;
        subaccount = null;
      });
      Debug.print("Balance: " # Nat.toText(balance));
      Debug.print("NFT price: " # Nat.toText(nft.price));

      Debug.print("Attempting token transfer to: " # Principal.toText(nft.owner));
      let transferResult = await Ledger.icrc1_transfer({
        from_subaccount = null;
        to = {
          owner = nft.owner;
          subaccount = null;
        };
        amount = nft.price;
        fee = null;
        memo = null;
        created_at_time = null;
      });

      Debug.print("Transfer Result: " # debug_show(transferResult));

      switch (transferResult) {
        case (#Ok(_)) {
          Debug.print("Transfer successful. Updating NFT ownership...");
          nfts := Array.map<Types.NFT, Types.NFT>(nfts, func(n : Types.NFT) : Types.NFT {
            if (n.id == tokenId) {
              {
                id = n.id;
                owner = caller;
                metadata = n.metadata;
                price = n.price;
              }
            } else n
          });
          Debug.print("NFT ownership updated.");
          return #ok("NFT purchased successfully");
        };
        case (#Err(e)) {
          Debug.print("Transfer failed: " # debug_show(e));
          return #err("Token transfer failed: " # debug_show(e));
        };
      };
    };
  };
}*/
public shared({caller}) func buyNft(tokenId: Nat) : async Result.Result<Text, Text> {
  Debug.print("Searching for NFT with ID: " # Nat.toText(tokenId));

  let nftOpt = Array.find<Types.NFT>(nfts, func(nft : Types.NFT) : Bool {
    nft.id == tokenId
  });

  switch (nftOpt) {
    case null {
      Debug.print("NFT not found.");
      return #err("NFT not found");
    };
    case (?nft) {
      Debug.print("NFT found. Owner: " # Principal.toText(nft.owner));

      if (nft.owner == caller) {
        return #err("You already own this NFT");
      };

      // Step 1: Use transfer_from to pull tokens from caller
      Debug.print("Attempting transfer_from from caller: " # Principal.toText(caller));
      let transferResult = await Ledger.icrc2_transfer_from({
        spender_subaccount = null;
        from = {
          owner = caller;
          subaccount = null;
        };
        to = {
          owner = nft.owner;
          subaccount = null;
        };
        amount = nft.price;
        fee = null;
        memo = null;
        created_at_time = null;
      });

      Debug.print("Transfer result: " # debug_show(transferResult));

      switch (transferResult) {
        case (#Ok(_)) {
          // Update NFT owner
          nfts := Array.map<Types.NFT, Types.NFT>(nfts, func(n : Types.NFT) : Types.NFT {
            if (n.id == tokenId) {
              {
                id = n.id;
                owner = caller;
                metadata = n.metadata;
                price = n.price;
              }
            } else n
          });

          return #ok("NFT purchased successfully");
        };
        case (#Err(e)) {
          return #err("Token transfer failed: " # debug_show(e));
        };
      };
    };
  };
}



}