import React from "react";
import TextType from "../reactBits/TextType.jsx";

const AuthImagePattern = ({
  title = "PingMe",
  subtitle = "Messages arrive instantly. Always connected.",
}) => {
  return (
    <div className="hidden lg:flex items-center justify-center p-8">
      <div className="max-w-sm text-center space-y-6 font-sans">
        {/* Brand Title at Top */}

        <TextType
          text={["PingMe!!", "Connect with Friends"]}
          as="h1"
          typingSpeed={170}
          deletingSpeed={100}
          pauseDuration={2000}
          loop={true}
          textColors={["#eeeee4"]}
          className="text-2xl font-bold tracking-tight text-white"
        />

        {/* Subtitle */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          {subtitle}
        </p>

        {/* Chat Simulation */}
        {/* <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mx-auto p-4 max-w-xs"> */}
        {/* Contact Header */}
        <div className="flex items-center gap-3 text-left mb-4 px-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
            AY
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
              Ahmed Yar
            </p>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
              Online
            </p>
          </div>
        </div>

        {/* Incoming Message */}
        <div className="flex items-end gap-2 mb-3 justify-start">
          <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-xl rounded-tl-none px-3.5 py-2 text-sm max-w-[180px] leading-relaxed break-words">
            Hey! How’s it going?
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            10:42 AM
          </span>
        </div>

        {/* Outgoing Message */}
        <div className="flex items-end gap-2 mb-3 justify-end">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            10:43 AM
          </span>
          <div className="bg-blue-600 text-white rounded-xl rounded-tr-none px-3.5 py-2 text-sm max-w-[190px] leading-relaxed break-words">
            All good! Just checking in 👍
          </div>
        </div>

        {/* Typing Indicator - Simulates reply being composed */}
        <div className="flex items-center gap-2 justify-start">
          <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs text-gray-500">
            ?
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-xl rounded-tl-none px-3.5 py-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-gray-400 dark:bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}></div>
              <div
                className="w-2 h-2 bg-gray-400 dark:bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
        </div>
        {/* </div> */}

        {/* Active Users Indicator */}
        <div className="flex justify-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === 0 || i === 2
                    ? "bg-green-500 animate-pulse"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
            <span className="ml-1">Active Now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
