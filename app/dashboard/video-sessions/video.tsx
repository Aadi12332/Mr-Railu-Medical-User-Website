import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect } from "react";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });


export default function VideoCall({ connection }: { connection: any }) {
  useEffect(() => {
    const init = async () => {
      await client.join(connection?.appId, connection?.channelName, connection?.token, null);

      const localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

      await client.publish(localTracks);

      localTracks[1].play("local-player"); // video
    };

    init();

    client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);

      if (mediaType === "video" && user.videoTrack) {
        user.videoTrack.play("remote-player");
      }

      if (mediaType === "audio" && user.audioTrack) {
        user.audioTrack.play();
      }
    });
  }, []);

  return (
    <div>
      <div id="local-player" style={{ width: "300px", height: "200px" }} />
      <div id="remote-player" style={{ width: "300px", height: "200px" }} />
    </div>
  );
}