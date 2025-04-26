import { useAuth } from "./useAuth";
import { useMemo } from "react";

const useWallet = (): string | undefined => {
  const auth = useAuth();

  // Map wallet types to image paths
  const WALLETS: Record<WalletName, string> = {
    PLUG: "/assets/images/wallets/plug.png",
    INTERNETIDENTITY: "/assets/images/wallets/ii.png",
    BIFINITY: "/assets/images/wallets/bifinity.png",
    NFID: "/assets/images/wallets/nfid.png",
  };

  // Memoize the wallet image path
  const walletImage = useMemo(()=>{
    // Determine the current authenticated wallet
    const currentWallet = (() => {
      if (auth?.isAuthenticated.plug) return "PLUG";
      if (auth?.isAuthenticated.ii) return "INTERNETIDENTITY";
      return undefined; 
    })()

    return currentWallet ? WALLETS[currentWallet] : "/assets/images/do-not-disturb.svg";

  },[auth?.isAuthenticated])
  return walletImage;
};

export default useWallet;
