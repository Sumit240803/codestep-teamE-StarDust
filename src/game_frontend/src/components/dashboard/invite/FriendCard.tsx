const FriendCards = ({name}:{name : string})=>{
    return (
        <div className="flex items-center gap-3 p-2">
                <img
                  src="/assets/character.svg"
                  alt={`${name}'s character`} // Improved alt text
                  className="character-image w-6 h-6" // Using Tailwind for dimensions
                  height={24}
                  width={24}
                />
            <span className="font-coin text-sm">{name}</span>
        </div>
    )
}
export default FriendCards;