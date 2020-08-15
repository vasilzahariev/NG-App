import React from 'react';
import StatusLinkBtn from '../status-link-btn';

const UserCollectionBtns = (props) => {
    return (
        <div>
            <StatusLinkBtn status={1} value='Want to play' to={`/u/${props.user._id}/collections/wantToPlay`} />
            <StatusLinkBtn status={2} value='Playing' to={`/u/${props.user._id}/collections/playing`} />
            <StatusLinkBtn status={3} value='Finished' to={`/u/${props.user._id}/collections/finished`} />
            <StatusLinkBtn status={4} value='Abandoned' to={`/u/${props.user._id}/collections/abandoned`} />
        </div>
    )
}

export default UserCollectionBtns;
