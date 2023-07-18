import "./mailList.css";

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money !</h1>
      <span className="mailDesc">Sign up to Get Our last offers</span>
      <div className="mailInputContainer">
        <input type="text" placeholder="example@mail.com" />
        <button>Send</button>
      </div>
    </div>
  );
};

export default MailList;
