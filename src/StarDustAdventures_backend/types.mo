import Principal "mo:base/Principal";
module{

    public type Card={
        id:Nat;
        name:Text;
        subtitle : Text;
        points:Nat;
        time : Nat;
        level : Nat;
        image : Text;
        cost : Nat;
    };

    public type UserStatus={
        #active;
        #disabled;
    };

    public type User={
        name:Text;
        id:Principal;
        points:Nat;
        clickLimitHour:Nat;
        prizePerHour:Nat;
        status:UserStatus;
        boost_value : Nat;
        cards : [Card];
    };

    public type UserInput={
        name : Text;
    }
}