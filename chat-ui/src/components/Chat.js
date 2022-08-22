import { useState } from "react";

const Chat = ({ socket, userName, room, goback }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message !== "") {
      console.log(message);
      setMessage("");
    }
  };

  const leaveChatRoom = () => {
    goback();
  };

  return (
    <div className="container w-6/12 p-3 border border-slate-900 rounded-md">
      <div className="mb-6 flex justify-between">
        <h2 className="text-2xl font-bold">Room: {room}</h2>
        <h2 className="text-3xl font-bold">Chat.io</h2>
        <button
          className="text-xl px-4  rounded-full border border-slate-900 hover:border-teal-500"
          onClick={leaveChatRoom}
        >
          Leave
        </button>
      </div>

      <div className="flex h-96 gap-x-6 ">
        <div className="flex flex-col items-center border border-zinc-800 w-1/6">
          <h2 className="text-base font-bold">Users Online</h2>
          <ul>
            <li>Ari</li>
          </ul>
        </div>

        <div className=" w-5/6">
          <div className="h-[90%] overflow-auto border border-stone-700">
            <div className="mx-2 my-1 flex justify-start">
              <div className="p-1 w-72 border border-zinc-800 rounded-md">
                <div className="flex justify-between text-sm font-medium">
                  <p>Chat bot</p>
                  <p>17:46</p>
                </div>
                <p>Welcome to Chat.io</p>
              </div>
            </div>
          </div>
          <div className="h-[10%] mt-1 flex justify-around">
            <input
              className="w-4/6 p-1 border border-slate-900"
              type="text"
              placeholder="Enter message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="w-1/6 rounded-full border border-slate-900 hover:border-teal-500"
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
