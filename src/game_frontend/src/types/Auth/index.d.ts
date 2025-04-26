interface AuthProviderProps{
    login: (method: "ii" | "plug") => Promise<any>;
    logout: () => Promise<void>;
    isAuthenticated: {
        ii: boolean;
        plug: boolean;
    };
    identity: any;
    principal: any;
    actors: ActorSubclass<_SERVICE>;
}