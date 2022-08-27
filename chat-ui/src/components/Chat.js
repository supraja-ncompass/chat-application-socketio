import { useState, useEffect, useRef } from "react";

const Chat = ({ socket, userName, room, goback }) => {
  const [message, setMessage] = useState("");
  const [allMessageInfo, setAllMessageInfo] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (message !== "") {
      await socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  const leaveChatRoom = async () => {
    await socket.disconnect();
    goback();
  };

  useEffect(() => {
    socket.on("message", (msgInfo) =>
      setAllMessageInfo((prev) => [...prev, msgInfo])
    );
    socket.on("online-users", (usersInfo) => {
      setAllUsers(usersInfo);
    });
  }, [socket]);

  useEffect(() => {
    chatEndRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [allMessageInfo]);

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
            {allUsers.map((u) => (
              <li key={u.id}>{u.name}</li>
            ))}
          </ul>
        </div>

        <div className=" w-5/6">
          <div className="h-[90%] overflow-auto border border-stone-700">
            {allMessageInfo.map((msgInfo, i) => {
              return (
                <div
                  key={i}
                  className={`mx-2 my-1 flex ${
                    msgInfo.user === userName ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="p-1 w-72 border border-zinc-800 rounded-md">
                    <div className="flex justify-between text-sm font-medium">
                      <p>{msgInfo.user}</p>
                      <p>{msgInfo.time}</p>
                    </div>
                    <p>{msgInfo.text}</p>
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
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
