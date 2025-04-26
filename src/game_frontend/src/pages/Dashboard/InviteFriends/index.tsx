import React, { useCallback } from 'react';
import TagContainer from '../../../components/ui/TagContainer';
import Button from '../../../components/ui/Button';
import FriendsList from './FriendsList';
import useReferral from '../../../hooks/useReferral';
import { copyToClipBoard, share } from '../../../utils';
import './index.css'

const InviteFriends: React.FC = () => {
  const {generateReferralId,isLoading} = useReferral()
  const referralLink = generateReferralId()

  const handleCopy=useCallback(async()=>{
    try{
      await copyToClipBoard(referralLink)
    }catch(err){
      console.error(err)
    }
  },[referralLink])

  const handleShare = useCallback(async()=>{
    try{
      await share({title:"Join Us", text : "At SpaceAdventures",url : referralLink})
    }catch(err){
      console.error(err)
    }
  },[referralLink])

  return (
    <div className="invite-friends-container">
      <div className="invite-friends-background">
      </div>

      <div className="invite-friends-content">
        {/* Header */}
        <div className="invite-friends-header">
          <h1 className="invite-friends-title">Invite Friends</h1>
          <p className="invite-friends-subtitle">You and your friend will receive bonuses</p>
        </div>

        {/* Invite buttons */}
        <div className="invite-buttons-container">
          <TagContainer>
            <div className="tag-content">
              <div className="tag-image-container">
                <img 
                  src="/assets/images/Winner.svg" 
                  className="winner-image"
                  loading="lazy"
                  alt="winner-imgs" 
                />
              </div>
              <div className="tag-info-container">
                <span><h2 className="tag-title">Invite a friend</h2></span>
                <span className="tag-reward-container">
                  <span className="reward-dot">.</span>
                  <img 
                    src="/assets/ufo.svg"
                    className="ufo-image"
                    loading="lazy"
                    alt="ufo"
                  />
                  <span className="reward-amount">+0.3</span>
                  <span className="reward-description">for you and your friend</span>
                </span>
              </div>
            </div>
          </TagContainer>
          
          <TagContainer>
            <div className="tag-content">
              <div className="tag-image-container">
                <img 
                  src="/assets/images/Winner.svg" 
                  className="winner-image"
                  loading="lazy"
                  alt="winner-imgs" 
                />
              </div>
              <div className="tag-info-container">
                <span><h2 className="tag-title">Invite a friend with Telegram Premium</h2></span>
                <span className="tag-reward-container">
                  <span className="reward-dot">.</span>
                  <img 
                    src="/assets/ufo.svg"
                    className="ufo-image"
                    loading="lazy"
                    alt="ufo"
                  />
                  <span className="reward-amount">+0.3</span>
                  <span className="reward-description">for you and your friend</span>
                </span>
              </div>
            </div>
          </TagContainer>
        </div>

        <div className="referral-button-container">
          <Button className="text-responsive">
            BECOME A REFERRAL
          </Button>
        </div>

        <FriendsList />

        <div className="bottom-buttons-container">

          <Button className="text-responsive" disabled={isLoading} onClick={handleShare} size={'sm'}>
            INVITE A FRIEND
          </Button>

          <Button disabled={isLoading} onClick={handleCopy} size={'xs'}>

            <img 
              src="/assets/images/text-copy.svg" 
              className="copy-image"
              loading="lazy"
              alt="winner-imgs" 
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InviteFriends;
