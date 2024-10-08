import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const SetupSuccess = () => {
  const [codeResent, setCodeResent] = useState(false);
  const inputRefs = useRef([]);

  const handleResendCode = () => {
    setCodeResent(true);
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      e.target.value = '';
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && !e.target.value) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white w-full h-screen p-4 sm:p-10 flex flex-col items-center relative">
        <div className="absolute top-8 left-8">
          <Link to="/AccountInfo/BiometricSetup" className="rounded-full p-2 bg-[#467a4d] text-white">
            ← Back
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center flex-grow mt-16 sm:mt-0 w-full">
          <h2 className="text-[#467a4d] text-xl font-bold mb-8 text-center">Enter the OTP you received</h2>

          <div className="flex gap-2 sm:gap-4 mb-8">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => inputRefs.current[index] = el}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 sm:w-24 sm:h-24 border border-gray-600 rounded-lg bg-gray-100 text-center text-xl sm:text-2xl font-bold focus:outline-none text-black"
                aria-label={`OTP digit ${index + 1}`}
                inputMode="numeric"
              />
            ))}
          </div>
          <div className="text-center mb-12">
            <p
              onClick={handleResendCode}
              className="text-blue-500 text-sm cursor-pointer"
            >
              Didn't receive the code?
            </p>
            {!codeResent && (
              <p className="text-[#467a4d] text-sm mt-2 opacity-0">Code Resent</p>
            )}
            {codeResent && (
              <p className="text-[#467a4d] text-sm mt-2">Code Resent</p>
            )}
          </div>
        </div>

        <div className="absolute bottom-10 text-center mx-auto">
          <Link to="/Main">
            <button className="bg-[#467a4d] text-white px-6 py-3 rounded-lg text-lg w-full sm:w-auto">
              Confirm
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SetupSuccess;
