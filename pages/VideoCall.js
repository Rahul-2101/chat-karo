import React, { useEffect } from "react";
import { useAuth } from "@/context/authContext"; // Assuming you have an Auth context
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

const VideoCall = () => {
  const { currentUser, isLoading } = useAuth(); // Check authentication
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [currentUser, isLoading, router]);

  useEffect(() => {
    if (currentUser) {
      const appID = 447853875;
      const serverSecret = "3505f4367127c208007af27717088865";

      const getUrlParams = (url) => {
        let urlStr = url.split("?")[1];
        const urlSearchParams = new URLSearchParams(urlStr);
        return Object.fromEntries(urlSearchParams.entries());
      };

      const roomID =
        getUrlParams(window.location.href)["roomID"] || "defaultRoomID";
      const userID = currentUser.uid;
      const userName = currentUser.displayName || "Anonymous";

      const script = document.createElement("script");
      script.src =
        "https://unpkg.com/@zegocloud/zego-uikit-prebuilt/zego-uikit-prebuilt.js";
      script.async = true;
      script.onload = () => {
        const kitToken = window.ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomID,
          userID,
          userName
        );

        const zp = window.ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
          container: document.querySelector("#video-call-container"),
          sharedLinks: [
            {
              name: "Personal link",
              url: `${window.location.origin}/VideoCall?roomID=${roomID}`,
            },
          ],
          scenario: {
            mode: window.ZegoUIKitPrebuilt.VideoConference,
          },
          turnOnMicrophoneWhenJoining: true,
          turnOnCameraWhenJoining: true,
          showMyCameraToggleButton: true,
          showMyMicrophoneToggleButton: true,
          showAudioVideoSettingsButton: true,
          showScreenSharingButton: true,
          showTextChat: true,
          showUserList: true,
          maxUsers: 2,
          layout: "Auto",
          showLayoutButton: false,
        });
      };

      document.head.appendChild(script);
    }
  }, [currentUser]);

  if (isLoading || !currentUser) return <Loader />;

  return (
    <div
      id="video-call-container"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f0f0f0", // Light background for better contrast
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/wallpaper2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* The video call interface will be injected here */}

      <div
        style={{
          width: "100vw",
          height: "100vh",
          display:"flex",
        }}
      >
        <Loader/>
      </div>
    </div>
  );
};

export default VideoCall;
