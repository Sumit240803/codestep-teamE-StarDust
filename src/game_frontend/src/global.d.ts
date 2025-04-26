import { Actor, HttpAgent } from "@dfinity/agent";
import { InterfaceFactory } from "@dfinity/candid/lib/cjs/idl";

declare global {
    interface Window {
      ic: {
        [key: string]: any; // Replace `any` with specific methods/properties
        plug : {
            agent : HttpAgent,
            requestConnect : (options:{whitelist:string[],host:string})=>Promise<boolean>,
            createActor : ({canisterId : string, interfaceFactory:InterfaceFactory})=>ActorSubclass<_SERVICE>
        }
      };
    }

    interface User{
      name:string;
      id:Principal;
      points:bigint;
      clickLimitHour:bigint;
      prizePerHour:bigint;
      status:{active:null, banned:null};
      boost_value:bigint;
      cards : Cards[]
    }
  }