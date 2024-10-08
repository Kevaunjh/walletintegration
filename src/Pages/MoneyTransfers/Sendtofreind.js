import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import friends from '../Datafiles/Friends';

function Sendtofreind() {
  const [selectedAmount, setSelectedAmount] = useState(0); 
  const [customAmount, setCustomAmount] = useState(''); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);

  const [selectedFriend, setSelectedFriend] = useState(''); 
  const [showMoreFriends, setShowMoreFriends] = useState(false); 
  const [contactType, setContactType] = useState('phone');
  const [contactInfo, setContactInfo] = useState('');
  const [friendName, setFriendName] = useState('');
  
  const navigate = useNavigate();

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (event) => {
    setCustomAmount(event.target.value);
  };

  const handleSaveCustomAmount = () => {
    setSelectedAmount(customAmount);
    setIsModalOpen(false);
  };

  
  const isMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const handleFriendSelect = (friendId) => {
    setSelectedFriend(friendId);
  };

  const toggleMoreFriends = () => {
    setShowMoreFriends((prevState) => !prevState);
  };

  const handleProceedClick = () => {
    if (selectedAmount && selectedFriend) {
      navigate('/MyQRCode');
    }
  };

  const handleAddFriendClick = () => {
    setIsAddFriendModalOpen(true);
  };

  const handleAddFriendSubmit = (event) => {
    event.preventDefault();

    setFriendName('');
    setContactType('phone');
    setContactInfo('');
    setIsAddFriendModalOpen(false);
    window.location.reload(); 
  };

  const renderFriend = (friend) => (
    <div
      key={friend.id}
      className={`flex flex-col items-center p-4 rounded-lg cursor-pointer border ${
        selectedFriend === friend.id ? 'border-[#467a4d]' : 'border-transparent'
      }`}
      onClick={() => handleFriendSelect(friend.id)}
      style={{ backgroundColor: `${friend.color}22` }}
    >
      <div
        className="rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl"
        style={{ backgroundColor: friend.color }}
      >
        {friend.name[0]}
      </div>
      <p className="mt-2 text-center">{friend.name}</p>
    </div>
  );

  const renderAddFriendButton = () => (
    <div
      className="flex flex-col items-center p-4 rounded-lg cursor-pointer border border-[#467a4d]"
      onClick={handleAddFriendClick}
    >
      <div className="rounded-full w-16 h-16 flex items-center justify-center text-[#467a4d] text-2xl">
        +
      </div>
      <p className="mt-2 text-center text-[#467a4d]">Add Friend</p>
    </div>
  );

  const isProceedEnabled = selectedFriend && selectedAmount; 


  return (
    <div className="Profile bg-white min-h-screen flex flex-col items-center relative">
      <div className="w-full bg-[#faf7f7] p-6 flex flex-col items-center relative min-h-screen h-auto">
        <Link to="/Transfermoney" className="absolute top-8 left-8 rounded-full p-2 bg-[#467a4d] text-white">
          &larr; Back
        </Link>
        <h1 className="text-5xl font-bold text-center mt-20 mb-8">Send Money</h1>

        <div className="text-center mb-6 2xl:w-8/12 mt-10 max-w-lg">
          <div className="text-2xl md:text-3xl font-bold mb-4 text-black">
            ${selectedAmount || customAmount}
          </div>
          <hr className="mb-6 border-gray-400" />
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {[5, 10, 15].map((amount) => (
              <button
                key={amount}
                className={`px-4 md:px-6 py-2 md:py-3 border-2 border-[#467a4d] text-base md:text-lg rounded-lg ${
                  selectedAmount === amount ? 'bg-[#d0e8d1] text-[#467a4d]' : 'bg-white text-[#467a4d]'
                }`}
                onClick={() => handleAmountClick(amount)}
              >
                ${amount}
              </button>
            ))}
            <button
              className={`px-4 md:px-6 py-2 md:py-3 border-2 border-[#467a4d] text-base md:text-lg rounded-lg ${
                customAmount !== '' || ![5, 10, 15].includes(selectedAmount) ? 'bg-[#d0e8d1] text-[#467a4d]' : 'bg-white text-[#467a4d]'
              }`}
              onClick={() => setIsModalOpen(true)}
            >
              Custom
            </button>
          </div>
        </div>

        <div className="container mx-auto py-10">
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-8">Choose Friend</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {friends.slice(0, 3).map(renderFriend)}
            {!showMoreFriends && renderAddFriendButton()}
            {showMoreFriends && friends.slice(3).map(renderFriend)}
            {showMoreFriends && renderAddFriendButton()}
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="text-[#467a4d] font-semibold"
              onClick={toggleMoreFriends}
            >
              {showMoreFriends ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </div>
        <button
          className={`mt-12 text-2xl font-semibold py-3 px-8 rounded-full text-white ${
            isProceedEnabled ? 'bg-[#467a4d] hover:bg-[#37613e]' : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={handleProceedClick}
          disabled={!isProceedEnabled}
        >
          Proceed
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Enter Custom Amount</h2>
            <input
              type="number"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="border-2 border-gray-300 rounded-lg p-2 w-full mb-4"
              placeholder="Enter amount"
            />
            <button
              className="bg-[#467a4d] text-white py-2 px-6 rounded-lg hover:bg-[#37613e]"
              onClick={handleSaveCustomAmount}
            >
              Save
            </button>
          </div>
        </div>
      )}
      {isAddFriendModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div
      className={`bg-white rounded-lg shadow-lg p-8 flex flex-col justify-center ${
        isMobile() ? 'w-full h-full' : 'w-8/12 h-[60vh]'
      } relative`}
    >
      <button
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        onClick={() => setIsAddFriendModalOpen(false)}
      >
        X
      </button>
      <h2 className="text-xl font-semibold mb-4 text-center">Add Friend</h2>
      <form onSubmit={handleAddFriendSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Friend's Name</label>
          <input
            type="text"
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-2 w-full"
            placeholder="Enter friend's name"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Contact Type</label>
          <select
            value={contactType}
            onChange={(e) => setContactType(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="phone">Phone</option>
            <option value="email">Email</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Contact Info</label>
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-2 w-full"
            placeholder={`Enter friend's ${contactType}`}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#467a4d] text-white py-2 px-6 rounded-lg hover:bg-[#37613e]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}

export default Sendtofreind;
