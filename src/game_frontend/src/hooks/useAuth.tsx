import React, { createContext, useContext, useEffect, useState } from 'react';
import { canisterId, StarDustAdventures_backend } from '../../../declarations/StarDustAdventures_backend';
import { AuthClient } from '@dfinity/auth-client';
import { idlFactory } from '../../../declarations/StarDustAdventures_backend';
import { createActor } from '../../../declarations/StarDustAdventures_backend';


const AuthContext = createContext<AuthProviderProps | undefined>(undefined);

const canID = canisterId;

const useAuthClient = () => {

  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState({ ii: false, plug: false });
  const [identity, setIdentity] = useState<any>(null);
  const [principal, setPrincipal] = useState<any>(null);
  const [actors, setActors] = useState(StarDustAdventures_backend);

  const initializeClient = async () => {
    const client = await AuthClient.create();
    setAuthClient(client);
  };

  useEffect(() => {
    initializeClient();
  }, []);

  const clientInfo = async (client : (AuthClient)) => {
    const isAuthenticated = await client.isAuthenticated();
    const identity = client.getIdentity();
    const principal = identity.getPrincipal();

    setAuthClient(client);
    setIsAuthenticated(prev => ({ ...prev, ii: true }));
    setIdentity(identity);
    setPrincipal(principal);

    if (isAuthenticated && identity && principal && principal.isAnonymous() === false) {
      let userActor = createActor(canID, { agentOptions: { identity: identity } });
      setActors(userActor)
      return userActor
    }
  }

  const handleIIlogin = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (authClient && (await authClient.isAuthenticated()) && ((await authClient.getIdentity().getPrincipal().isAnonymous()) === false)) {
          resolve(clientInfo(authClient));
        } else {
          if (!authClient) {
            throw new Error("AuthClient is not initialized");
          }
          await authClient.login({
            identityProvider: process.env.DFX_NETWORK === "ic"
              ? "https://identity.ic0.app/#authorize"
              : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943/`,
            onError: (error) => reject((error)),
            onSuccess: () => resolve(clientInfo(authClient)),
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const handlePlugLogin = async () => {
    if (!window.ic?.plug) throw new Error("Plug not installed");

    const whitelist = [canID];
    const host = process.env.DFX_NETWORK === "ic" ? "https://icp0.io" : "http://127.0.0.1:4943";
    const isConnected = await window.ic.plug.requestConnect({ whitelist, host });

    if (isConnected) {
      const principal = await window.ic.plug.agent.getPrincipal();
      const identity = window.ic.plug.agent;

      setIsAuthenticated(prev => ({ ...prev, plug: true }));
      setIdentity(identity);
      setPrincipal(principal);

      const userActor = await window.ic.plug.createActor({
        canisterId: canID,
        interfaceFactory: idlFactory
      });
      setActors(userActor);
      return userActor
    } else {
      throw new Error("Plug connection refused");
    }
  };

  const logout = async () => {
    if(authClient){
      await authClient.logout();
      setIsAuthenticated({ ii: false, plug: false });
      setIdentity(null);
      setPrincipal(null);
      setActors(StarDustAdventures_backend);
    } else{
      throw new Error("AuthClient is not initialized");
    }
  };

  return {
    login: async (method : "ii" | "plug") => {
      if (method === "ii") {
        return handleIIlogin();
      } else if (method === "plug") {
        return handlePlugLogin();
      }
    },
    logout,
    isAuthenticated,
    identity,
    principal,
    actors,
  };
};

export const AuthProvider = ({ children } : React.PropsWithChildren) => {
  const auth = useAuthClient();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);