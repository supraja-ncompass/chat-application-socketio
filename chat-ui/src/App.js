import { useState } from "react";
import Chat from "./components/Chat";

const App = () => {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  const joinUserToRoom = (e) => {
    e.preventDefault();
    if (userName !== "" && room !== "") {
      setIsJoined(true);
    }
  };

  const goback = () => {
    setIsJoined(false);
    setUserName("");
    setRoom("");
  };
  return (
    <div className="w-screen h-[36rem] flex justify-center items-center">
      {!isJoined ? (
        <form
          onSubmit={joinUserToRoom}
          className="container w-4/12 p-8  grid gap-y-7 justify-items-center border border-slate-900 rounded-md"
        >
          <h2 className="text-3xl font-bold text-center">Chat.io</h2>
          <input
            className="border border-slate-900 rounded-sm w-72 p-2"
            type="text"
            placeholder="Name...."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <input
            className="border border-slate-900 rounded-sm w-72 p-2"
            type="text"
            placeholder="Room...."
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-4 py-1 rounded-full border border-slate-900 hover:border-teal-500"
          >
            Join Room
          </button>
        </form>
      ) : (
        <Chat userName={userName} room={room} goback={goback} />
      )}
    </div>
  );
};

export default App;
