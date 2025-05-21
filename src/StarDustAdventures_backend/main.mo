import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Error "mo:base/Error";
import Constants "constants";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Timer "mo:base/Timer";
import Text "mo:base/Text";
import _Array "mo:base/Array";
import Nat "mo:base/Nat";
import _Prelude "mo:base/Prelude";
import Bool "mo:base/Bool";
import Types "types";
import Ledger "canister:icrc1_ledger_canister";

actor {
  // this map contains list of users
  let userMap=TrieMap.TrieMap<Principal,Types.User>(Principal.equal,Principal.hash); 

  // referral map, contains list of people referred by user
  let friendMap=TrieMap.TrieMap<Principal,[(Principal,Text)]>(Principal.equal,Principal.hash); 

  let errorLogs:Buffer.Buffer<Text> = Buffer.fromArray([]);

  let ALL_CARDS: Buffer.Buffer<Types.Card> = Buffer.fromArray([
    {id=1; name="Market Manipulation"; subtitle="You control the price"; points=30; time=0; level=0; image="/assets/images/mine01.svg"; cost=200},
    {id=2; name="Day Trading"; subtitle="Quick profits, high risk"; points=500; time=0; level=0; image="/assets/images/mine02.svg"; cost=300},
    {id=3; name="Crypto Mining"; subtitle="Digital gold rush"; points=700; time=0; level=0; image="/assets/images/mine03.svg"; cost=400},
    {id=4; name="Stock Analysis Pro"; subtitle="Advanced market insights"; points=120; time=0; level=0; image="/assets/images/mine01.svg"; cost=500},
    {id=5; name="AI Trading Bot"; subtitle="Automated trading system"; points=150; time=0; level=0; image="/assets/images/mine02.svg"; cost=600},
    {id=6; name="Quantum Analytics"; subtitle="Future of trading"; points=200; time=0; level=0; image="/assets/images/mine03.svg"; cost=800}
  ]);

  let ALL_GAMES: Buffer.Buffer<Types.GameCard> = Buffer.fromArray([
    {id = 1; title = "Rocket Rush" ; description = "Rocket Rush" ; gimage = "/assets/images/game1/bg-1.png" ; gameType = "scorebased"},
    {id = 2; title = "Space Runner" ; description = "Space Runner" ; gimage = "/assets/images/game1/bg-1.png" ; gameType = "scorebased"},
{id = 3; title = "Space Shooter" ; description = "Space Shooter" ; gimage = "/assets/images/game1/bg-1.png" ; gameType = "scorebased"},
{id = 4; title = "Terra Gaurd" ; description = "Terra Gaurd" ; gimage = "/assets/images/game1/bg-1.png" ; gameType = "scorebased"},
  ]);
  private func get_game_list() :[Types.GameCard]{
    return Buffer.toArray(ALL_GAMES);
  };
  public shared query func getGameCards():async Result.Result<[Types.GameCard] , Text>{
      return #ok(get_game_list());
  };

  public func isUser(id :Principal):async Result.Result<Bool,Text>{
    try{
      let user = userMap.get(id);
      if(user!=null){
        return #ok(true);
      };
      return #ok(false);
    }catch(err){
      return #err(Error.message(err));
    }
  };
  // Registering new users
  public shared({caller}) func createUser(user:Types.UserInput,refBy:?Principal):async Result.Result<Types.User,Text>{
    try{
      Debug.print("Creating user with name: " # user.name);
      let oldUser=userMap.get(caller);
      if(oldUser!=null){
        return #err(Constants.ERRORS.useralreadyExists # Principal.toText(caller));
      };

      let newUser:Types.User={
        id=caller;
        name=user.name;
        points=0;
        clickLimitHour=1000;
        prizePerHour=300;
        status=#active;
        boost_value=0;
        cards=[];
      
      };

      switch(refBy){
        case(null){
          userMap.put(caller,newUser);
          return #ok(newUser);
        };
        case(?val){
          let addFriendResponse=await addFriend(val,newUser);
          switch(addFriendResponse){
            case(#ok){
              userMap.put(caller,newUser);
              return #ok(newUser)
            };
            case(#err(error)){
              return #err(error);
            }
          }
        }
      };
    }catch(err){
      Debug.print("Error in creating user: " # Error.message(err));
      return #err(Error.message(err));
    }
  };

  public shared({caller}) func incrementPoints():async Result.Result<Text,Text> {
    try{
      let incrementResult = await addPointsToUser(caller,1);
      switch(incrementResult){
        case(#ok){
          return #ok("Points added successfully");
        };
        case(#err(error)){
          return #err(error);
        }
      }
    }catch(err){
      return #err(Error.message(err));
    }
  };
  public shared({caller}) func incrementScore(score : Nat):async Result.Result<Text,Text> {
    try{
      let incrementResult = await addPointsToUser(caller,score);
      switch(incrementResult){
        case(#ok){
          return #ok("Points added successfully");
        };
        case(#err(error)){
          return #err(error);
        }
      }
    }catch(err){
      return #err(Error.message(err));
    }
  };
  /*public shared({caller}) func incrementScore(score : Nat):async Result.Result<Text,Text>{
    try{
      let result = await addPointsToUser(caller,score);
      switch(result){
        case(#ok){
          return #ok("Score Added");
        }
        case(#err(error)){
          return #err(error);
        }
      }catch(err){
        return #err(Error.message(err));
      }
    }
  };*/

  public shared query ({caller}) func getUser() : async Result.Result<Types.User, Text> {
    try{
      let user = userMap.get(caller);

      switch user {
        case(null){
          return #err(Constants.ERRORS.userNotFound)
        };
        case(?value) {
          if(caller!=value.id){
            return #err(Constants.ERRORS.notAuthorized);
          };
          return #ok(value);
        };
      }
    } catch(err){
      return #err(Error.message(err));
    }
  };

  // Update user meant to be called by user himself (if needed)
  public shared({caller}) func updateUser(user:Types.User):async Result.Result<Types.User,Text>{
    try{
      let oldUser=userMap.get(caller);
      
      switch(oldUser) {
        case(null) { 
          return #err(Constants.ERRORS.userNotFound)
        };
        case(?val) {

          if(caller!=val.id){
            return #err(Constants.ERRORS.cannotUpdateOtherUser)
          };

          let updatedUser:Types.User={
            id=caller;
            name=user.name;
            points=val.points;
            clickLimitHour=val.clickLimitHour;
            prizePerHour=val.prizePerHour;
            status=user.status;
            boost_value=user.boost_value;
            cards=user.cards;
         
          };
          ignore userMap.replace(caller,updatedUser);
          return #ok(updatedUser)
        };
      };
    }catch(err){
      return #err(Error.message(err));
    }
  };

  // Disables the user, can be used as 'delete user'
  public shared({caller}) func disableUser():async Result.Result<Text,Text>{
    try{
      let oldUser=userMap.get(caller);
      
      switch(oldUser) {
        case(null) { 
          return #err(Constants.ERRORS.userNotFound)
        };
        case(?val){

          if(caller!=val.id){
            return #err(Constants.ERRORS.cannotUpdateOtherUser)
          };

          let user:Types.User={
            id=caller;
            name=val.name;
            points=val.points;
            clickLimitHour=val.clickLimitHour;
            prizePerHour=val.prizePerHour;
            status=#disabled;
            boost_value=val.boost_value;
            cards=val.cards;
       
          };

          ignore userMap.replace(caller,user);
          return #ok(Constants.RESPONSES.disabledUser);
        }
      }
    }catch(err){
      return #err(Error.message(err));
    }
  };

  private func get_card_list(): [Types.Card]{
    return Buffer.toArray(ALL_CARDS);
  };

  private func get_card_by_id(id:Nat): ?Types.Card{
    let ALL_CARDS_ARR = get_card_list();
    for(i in Iter.range(0,ALL_CARDS.size()-1)){
      if(ALL_CARDS_ARR[i].id==id){
        return ?ALL_CARDS_ARR[i];
      }
    };
    return null;
  };

 private func get_user_card(user_id : Principal) : [Types.Card] {
  switch (userMap.get(user_id)) {
    case (?user) {
      return user.cards;
    };
    case (null) {
      return []; // or handle as needed, maybe throw an error
    };
  }
};


  private func add_card_to_user(user_id: Principal, card_id: Nat): async Result.Result<(), Text> {
    let ?user = userMap.get(user_id) else return #err(Constants.ERRORS.userNotFound);
    let ?card = get_card_by_id(card_id) else return #err(Constants.ERRORS.invalidCard);

    let user_cards = get_user_card(user_id);

    let new_card_list = Buffer.fromArray<Types.Card>(user_cards);

    let new_boost_val = card.points + user.boost_value;

    new_card_list.add(card);

    let updated_user: Types.User = {
      id = user_id;
      name = user.name;
      points = user.points;
      clickLimitHour = user.clickLimitHour;
      prizePerHour = user.prizePerHour;
      status = user.status;
      boost_value = new_boost_val;
      cards = Buffer.toArray<Types.Card>(new_card_list);
    
    };

    ignore userMap.replace(user_id, updated_user);

    return #ok();
};

  private func check_if_card_exist_in_user(user : Types.User, card_id: Nat): Bool {
    let ?card = get_card_by_id(card_id);

    if (user.cards.size() == 0) {
      return false;
    };

    var flag = false;

    label checker for (i in Iter.range(0, user.cards.size() - 1)) {
      if (user.cards[i].id == card_id) {
        flag := true;
        break checker;
      };
    };

    return flag;
  };

  public shared query func get_all_cards(): async Result.Result<[Types.Card], Text> {
    return #ok(get_card_list());
  };

  public shared query func get_user_cards(user_id : Principal): async Result.Result<[Types.Card], Text> {
    try{
      let user = userMap.get(user_id);

      switch user {
        case(null){
          return #err(Constants.ERRORS.userNotFound)
        };
        case(?value) {
          return #ok(value.cards);
        };
      }
    } catch(err){
      return #err(Error.message(err));
    }
  };

  private func decrementPoints(user: Types.User, points: Nat): Result.Result<Types.User, Text> {
    if (user.points < points) {
      return #err("Insufficient points");
    };
    let updatedUser: Types.User = {
      id = user.id;
      name = user.name;
      points = user.points - points;
      clickLimitHour = user.clickLimitHour;
      prizePerHour = user.prizePerHour;
      status = user.status;
      boost_value = user.boost_value;
      cards = user.cards;
   
    };
    return #ok(updatedUser);
  };

  public shared({caller}) func mineCard(card_id : Nat) : async Result.Result<Text, Text>{
    try{
      let ?user = userMap.get(caller) else return #err(Constants.ERRORS.userNotFound);
      let ?card = get_card_by_id(card_id) else return #err(Constants.ERRORS.invalidCard);

      if (check_if_card_exist_in_user(user, card_id)) {
        return #err("Card already mined");
      };

      switch (decrementPoints(user, card.cost)) {
        case (#ok(updatedUser)) {
          ignore userMap.replace(caller, updatedUser);
        };
        case (#err(error)) {
          return #err(error);
        };
      };

      let add_card_result = await add_card_to_user(caller, card_id);

      switch(add_card_result){
        case(#ok){
          return #ok("Card mined successfully");
        };
        case(#err(error)){
          return #err(error);
        }
      }
    }catch(err){
      return #err(Error.message(err));
    }
  };


  public shared query ({caller}) func getPoints():async Result.Result<Nat, Text>{
    try{
      let user = userMap.get(caller);

      switch user {
        case(null){
          return #err(Constants.ERRORS.userNotFound)
        };
        case(?value) {
          if(caller!=value.id){
            return #err(Constants.ERRORS.cannotUpdateOtherUser)
          };
          return #ok(value.points);
        };
      }
    } catch(err){
      return #err(Error.message(err));
    }
  };


  // returns the list of friends of the caller
  public shared query({caller}) func getUserFriends():async Result.Result<?[(Principal,Text)],Text>{
    try{
       let oldUser=userMap.get(caller);
        switch(oldUser) {
          case(null) { return #err(Constants.ERRORS.userNotFound) };
          case(_) {
            let friendList=friendMap.get(caller);
            return #ok(friendList)
          }
        };
    }catch(err){
      return #err(Error.message(err));
    }
  };

  public shared({caller}) func generateRefId(): async Result.Result<Text, Text>{
    try {
      let user = userMap.get(caller);

      switch user {
        case(null){
          return #err(Constants.ERRORS.userNotFound)
        };
        case(?value) {
          if(caller!=value.id){
            return #err(Constants.ERRORS.notAuthorized);
          };
          return #ok(generateReferralId(caller));
        }
      };
    } catch(err){
      return #err(Error.message(err));
    }
  };


    // internal function, adds new points. will be used in future improvements
    //Future : New Map for Points <Principal, Nat>
  private func addPointsToUser(id:Principal,points:Nat):async Result.Result<(),Text>{
    try{
      let oldUser=userMap.get(id);
      switch(oldUser) {
        case(null) { return #err(Constants.ERRORS.userNotFound) };
        case(?val) {
          assert(val.clickLimitHour > 0);
          let user:Types.User={
            id=id;
            name=val.name;
            points=val.points + points;
            clickLimitHour=val.clickLimitHour - 1;
            prizePerHour=val.prizePerHour;
            status=val.status;
            boost_value=val.boost_value;
            cards=val.cards;
         
          };

          ignore userMap.replace(id,user);
          return #ok();
        };
      };
    }catch(err){
      return #err(Error.message(err));
    }
  };

  // adding new friends in referral map
  func addFriend(user:Principal,friend:Types.User):async Result.Result<(),Text>{
    try{
        let oldUser=userMap.get(user);

        if(oldUser==null){
          return #err(Constants.ERRORS.invalidReferral);
        };

        let oldFriendList=friendMap.get(user);
        switch(oldFriendList){
          case(null){
            friendMap.put(user,[(friend.id,friend.name)]);
            return #ok(())
          };
          case(?list){
            let newList:Buffer.Buffer<(Principal,Text)> = Buffer.fromArray(list);
            newList.add((friend.id,friend.name));
            ignore friendMap.replace(user,Buffer.toArray(newList));
            return #ok(());
          }
        }
    }catch(err){
       return #err(Error.message(err));
    }

  };

  private func generateReferralId(id : Principal):  Text {
    return Text.concat("ref_", Principal.toText(id));
  };

  func getAllUserIds():async [Principal]{
      return Iter.toArray(userMap.keys());
  };

  func updatePointsHourly():async (){
    try{
      let userIdList=await getAllUserIds();

      for(i in Iter.range(0,userIdList.size()-1)){
        let oldUser=userMap.get(userIdList[i]);
        switch(oldUser) {
          case(null) {
            errorLogs.add( Constants.ERRORS.userNotFound # "_" # Int.toText(Time.now()));
          };
          case(?val) {
            let user:Types.User={
              id=userIdList[i];
              name=val.name;
              points=val.points + val.prizePerHour + val.boost_value;
              clickLimitHour=1000;
              prizePerHour=val.prizePerHour;
              status=val.status;
              boost_value=val.boost_value;
              cards=val.cards;
          
            };

            ignore userMap.replace(userIdList[i],user);
          };
        };
      }

    }catch(err){
      errorLogs.add(Error.message(err) # "_" # Int.toText(Time.now()));
    }
  };

  public shared query({caller}) func whoami():async Text{
    return Principal.toText(caller);
  };

  ignore Timer.setTimer<system>(#seconds (Constants.SECONDS_IN_HOUR - Int.abs(Time.now() / 1_000_000_000) % Constants.SECONDS_IN_HOUR),

    func () : async () {
      let nextTime=Constants.SECONDS_IN_HOUR;
      ignore Timer.recurringTimer<system>(#seconds nextTime, updatePointsHourly);
      await updatePointsHourly();
    }
  );


  //ICRC TOKENS IMPLEMENTATION

  public shared({caller}) func convertToTokens(points : Nat) : async Result.Result<Text,Text>{
    let tokensPerPoint : Nat = 1000;
    let tokensToTransfer = points*tokensPerPoint;
    let result = await Ledger.icrc1_transfer({
      from_subaccount = null;
      to = {
        owner = caller;
        subaccount = null;
      };
      amount = tokensToTransfer;
      fee= null;
      memo = null;
      created_at_time = null;
    });
    switch(result){
      case(#Ok(blockIndex)){
        return #ok("Transferred Successfully at block " # Nat.toText(blockIndex));
      };
      case(#Err(e)){
        return #err("Transfer failed: " # debug_show(e));
      }
    }
  };

  public shared({caller}) func getMyTokenBalance() : async Nat{
    let result = await Ledger.icrc1_balance_of({
      owner = caller;
      subaccount = null;
    });
    return result;
  }

};
