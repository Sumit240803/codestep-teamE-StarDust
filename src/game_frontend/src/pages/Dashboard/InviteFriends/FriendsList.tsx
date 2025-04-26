import React from "react";
import useFriendList from "../../../hooks/useFriendList";
import List from "../../../components/dashboard/invite/List";


const FriendsList: React.FC = () => {
  const { count, refreshList } = useFriendList()

  return (
    <div className="flex justify-start w-full">
      <div className="space-y-2 w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-coin">
            List of your friends ({count})
          </h2>
          <button
            className="text-gray-400 hover:text-white"
            onClick={refreshList}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
        <List/>
      </div>
    </div>
  );
};

export default FriendsList;
