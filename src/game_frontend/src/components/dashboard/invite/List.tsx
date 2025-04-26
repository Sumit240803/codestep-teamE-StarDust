import React from "react"
import useFriendList from "../../../hooks/useFriendList"
import FriendCard from "./FriendCard"
import { isArray } from "../../../utils"
import Loader from "../../ui/Loader"

const List = ()=>{
    const {friendList, isRefetching, isLoading, count} = useFriendList()
    console.log(friendList)
    if(isLoading) return <Loader/>
    if(isRefetching) return <p>Refreshing...</p>
    if(count === 0) return <p>No friends found</p>
    else
    return (
        <div className="space-y-2 min-h-20">
          {friendList?.map(([principal, name], index) =>{
            return (
              <React.Fragment key={index}>
                <FriendCard name={name} />
                {index < friendList.length - 1 && (
                  <div className="w-full border-t border-gray-600 my-8" />
                )}
              </React.Fragment>
            )
          })}
        </div>
    )
}

export default List