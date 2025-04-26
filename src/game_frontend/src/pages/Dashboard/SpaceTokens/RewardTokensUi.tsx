import React from 'react';


// Types
interface TokenData {
    tokens: number;
    image: string;
    title: string;
    subtitle: string;
}

// TokensUI Component
interface RewardTokensUiProps {
    data: TokenData[];
}

const RewardTokensUi: React.FC<RewardTokensUiProps> = ({ data }) => {
    return (
        <div className="relative">
            <div className="relative">
                {data.map((item, index) => (
                    <div key={index} className="text-center space-y-4">
                        <div className="flex items-center justify-center mb-2">
                            <span className="text-white text-8xl font-coin">
                                {item.tokens}
                            </span>
                            {item.image && (
                                <div className="flex justify-center items-center m-2">
                                    <img
                                        src={item.image}
                                        alt="Token Image"
                                        width={85}
                                        height={85}
                                        className=""
                                    />
                                </div>
                            )}
                        </div>
                        <div className="">
                            <h2 className="text-white w-64 text-2xl mb-24 font-coin">
                                {item.title}
                            </h2>
                            <p className="text-white text-sm font-coin opacity-80">
                                {item.subtitle}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RewardTokensUi;