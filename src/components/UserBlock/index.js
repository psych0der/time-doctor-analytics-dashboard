import React from 'react'

import './index.css';

// User Block dumb component
const UserBlock = props => {
    let {userid, name, activity} = props;
    // use user id for referencing image from public dirctory
    const src = `${process.env.PUBLIC_URL}/user-avatars/${userid}.png`;
    return (
        <div className="userRow" userid={userid}>
            <div className="profilePicture">
                <img  width="100%" src={src} alt={name} />
            </div>
            <div className="userName">{name}</div>
            <div className="rightShifted">
                <div id="progressbar"><div style={{width: activity+'%'}}></div></div>
                <div className="userActivity">{activity+'%'}</div>
            </div>

        </div>
    );
}
export default UserBlock;