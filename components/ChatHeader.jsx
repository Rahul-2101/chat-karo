import { useChatContext } from "@/context/chatContext";
import React, { useState } from "react";
import Avatar from "./Avatar";
import Icon from "./Icon";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import ChatMenu from "./ChatMenu";

const ChatHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { users, data } = useChatContext();

  const online = users[data.user.uid]?.isOnline;
  const user = users[data.user.uid];

  return (
    <div className="flex justify-between items-center pb-5 border-b border-white/[0.05]">
      {user ? (
        <div className="flex items-center gap-3">
          <Avatar size="large" user={user} />
          <div>
            <div className="font-light" style={{ textTransform: "capitalize" }}>
              {user?.displayName}
            </div>
            <p className="text-sm text-c3">{online ? "Online" : "Offline"}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
          <div>
            <div className="font-medium bg-gray-300 text-transparent">
              Placeholder Name
            </div>
            <p className="text-sm text-c3">Offline</p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Icon
          size="large"
          className={`${showMenu ? "bg-c1" : ""}`}
          onClick={() => setShowMenu(true)}
          icon={<IoEllipsisVerticalSharp size={20} className="text-c3" />}
        />
        {showMenu && <ChatMenu setShowMenu={setShowMenu} showMenu={showMenu} />}
      </div>
    </div>
  );
};

export default ChatHeader;
