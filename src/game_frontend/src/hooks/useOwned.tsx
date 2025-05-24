import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { OWNED } from "../utils/api/query";

export const useOwned = () => {
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [allNft, setAllNft] = useState<MarketData[]>([]);
    const { data: ALL_NFT } = OWNED(auth?.nftActors, auth?.principal);
    const fetchAllNFT = useCallback(async () => {
        try {
            setIsLoading(true);

            const mappedNft: MarketData[] = (ALL_NFT ?? []).map((nft: any) => ({
                id: BigInt(nft.id),
                name: nft.metadata.name,
                img: nft.metadata.media_url,
                price: BigInt(nft.price),
            }));
            setAllNft(mappedNft)
        } catch (err) {
            console.log("Error fetching nft : ", err);
        } finally {
            setIsLoading(false);
        }
    }, [ALL_NFT]);
    useEffect(() => {
        fetchAllNFT();

    }, [fetchAllNFT]);
    return {
        isLoading,
        owned: allNft

    }
}