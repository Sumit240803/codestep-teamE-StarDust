import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { GET_TOKEN_BALANCE } from "../utils/api/query";
import { pointsToToken } from "../utils/api/update";

export const useTokens = () => {
  const auth = useAuth();

  // Ensure actor is defined before using
  const actor = auth?.actors;

  const {
    data: tokenBalance,
    isLoading,
    isError,
    refetch,
  } = actor ? GET_TOKEN_BALANCE(actor) : { data: undefined, isLoading: true, isError: false, refetch: () => {} };
  const convertPointsToToken = actor ? pointsToToken(actor) : {
    mutate : ()=>{},
    isLoading: false,
      isError: false,
      isSuccess: false,
  }
  return {
    tokens: tokenBalance ?? BigInt(0),
    isLoading,
    isError,
    refetch,
    convertPointsToToken
  };
};


