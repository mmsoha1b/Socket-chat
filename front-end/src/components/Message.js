import blankPfp from "../assests/blank-pfp.png";
const Message = ({ text, user }) => {
  return (
    <>
      <div className='ms-2 me-2'>
        <div className='message-container'>
          <div className='image-box mt-2 me-2'>
            <img
              src={blankPfp}
              style={{ borderRadius: "50%" }}
              height='50px'
              width='50px'
              alt=''
            ></img>
          </div>
          <div className='message-box'>
            <span className='user-name-box'>
              {user?.username === "" ? "Unknown" : user?.username}
            </span>
            <div>{text}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Message;
