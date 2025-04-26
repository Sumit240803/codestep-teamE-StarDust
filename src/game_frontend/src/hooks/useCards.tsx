import { useCallback, useEffect, useState } from "react";
import { GET_ALL_CARDS, GET_USER_CARDS } from "../utils/api/query";
import { useAuth } from "./useAuth";
import { get_difference } from "../utils";

export const useAllCards = () => {
  const auth = useAuth();
  const [allCards, setAllCards] = useState<Cards[]>([]);
  const [userCards, setUserCards] = useState<Cards[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {data : ALL_CARDS} = GET_ALL_CARDS(auth?.actors)
  const {data : USER_CARDS} = GET_USER_CARDS(auth?.actors, auth?.principal)

  const fetchCards = useCallback(async () => {
    try {
      setIsLoading(true);
      // Extract card data
      const allCardsData : Array<Cards> = (ALL_CARDS as any)?.ok;
      const userCardsData : Array<Cards> = (USER_CARDS as any)?.ok;

      // Find missing cards
      const missingCards = get_difference(allCardsData, userCardsData);

      // Update states
      setAllCards(missingCards);
      setUserCards(userCardsData);
    } catch (err) {
      console.error("Error fetching cards:", err);
    } finally {
      setIsLoading(false);
      console.info("Data fetched")
    }
  }, [auth, ALL_CARDS, USER_CARDS]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards,, ALL_CARDS, USER_CARDS]);

  return { allCards, userCards, isLoading};
};
