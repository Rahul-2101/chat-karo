import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import LeftNav from "@/components/LeftNav";
import Chats from "@/components/Chats";
import Chat from "@/components/Chat";
import { useChatContext } from "@/context/chatContext";

const Home = () => {
  const router = useRouter();
  const { signOut, currentUser, isLoading } = useAuth();
  const { data } = useChatContext();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, isLoading, router]);

  return !currentUser ? (
    <Loader />
  ) : (
    <div className="bg-c1 flex h-[100vh]">
      <div className="flex w-full shrink-0">
        <LeftNav />

        <div className="flex bg-c2 grow">
          <div
            className={`w-[260px] p-5 glass-effect overflow-auto scrollbar shrink-0 border-r border-white/[0.05] transition-all duration-300 ${
              isHovered ? "w-[400px]" : "w-[260px]"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            // style={{
            //   backgroundImage: "url('/wallpaper.jpg')",
            //   backgroundSize: "cover",
            //   backgroundPosition: "center",
            // }}
          >
            <div className="flex flex-col min-h-full">
              <Chats isHovered={isHovered} />
            </div>
          </div>
          {data.user && <Chat />}
        </div>
      </div>
    </div>
  );
};

export default Home;
