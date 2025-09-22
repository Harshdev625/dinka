"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
const SocketContext = createContext<any>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [remoteUser, setRemoteUser] = useState<string | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const { data: session }: any = useSession();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [peerConnection, setPeerConection] = useState<RTCPeerConnection | null>(null);
  useEffect(()=>{
    console.log("remote user changed to: ",remoteUser)
  },[remoteUser])
  const remoteUserRef = useRef<string | null>(null);

useEffect(() => {
  remoteUserRef.current = remoteUser;
}, [remoteUser]);
  useEffect(() => {
    if (session?.user?.id) {
      const ws = new WebSocket(`${process.env.NEXT_PUBLIC_BACKEND}`);
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" }
        ]
      });
      setPeerConection(pc);
      ws.onopen = () => {
        ws.send(JSON.stringify({ type: "register", userID: session.user.id }));
        console.log("WebSocket connected");
      }
      pc.onicecandidate = (event) => {
        console.log("Remote user", remoteUser)
        if (event.candidate) {
          ws.send(JSON.stringify({
            type: "ice_candidate",
            candidate: event.candidate,
            targetUserID: remoteUserRef.current,  // ✅ send correct target
            userID: session.user.id,
          }));
        }
      };
      pc.ontrack = (event) => {
        console.log("Remote track received");
        const [remoteStreamObj] = event.streams;
        setRemoteStream(remoteStreamObj);
      };

      ws.onmessage = async (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "incoming_call") {
          setRemoteUser(message.fromUserID);
          console.log("Incoming call from:", message.fromUserID);
          const askuser = confirm(`Incoming call from ${message.fromUserID}. Accept?`);

          if (askuser && pc) {
            pc.setRemoteDescription(new RTCSessionDescription(message.offer));
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setLocalStream(stream)
            stream.getTracks().forEach(track => {
              pc.addTrack(track, stream); 
            });

            pc.createAnswer().then(answer => {
              pc.setLocalDescription(answer);
              ws.send(JSON.stringify({ type: "answer", targetUserID: message.fromUserID, userID: session.user.id, answer }));
            }
            ).catch(err => console.error(err));

          }
        }
        else if (message.type === "call_answered") {
          console.log("Call answered by:", message.fromUserID);
          pc?.setRemoteDescription(new RTCSessionDescription(message.answer));
        }

        else if (message.type === "ice_candidate") {
          console.log("Received ICE candidate from:", message.fromUserID);
          pc?.addIceCandidate(new RTCIceCandidate(message.candidate)).catch(err => console.error(err));
        }

      }

      ws.onclose = () => {
        console.log("WebSocket disconnected");
      }
      setSocket(ws);

      return () => {
        ws.close();
        pc.close();

        setSocket(null);
        setPeerConection(null);
      }

    }

  }, [session?.user?.id]);


  const createCall = async (targetUserID: string) => {
    console.log(targetUserID)
    if(targetUserID){console.log(targetUserID); setRemoteUser(targetUserID);}

    if (!peerConnection) {
      console.error("PeerConnection is not established");
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setLocalStream(stream);
    stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "call", targetUserID, userID: session.user.id, offer }));
    } else {
      console.error("WebSocket is not connected");
    }
  }
  if (localStream || remoteStream) {
    return (
      <>   {localStream && (
        <video
          autoPlay
          muted // mute your own stream to avoid echo
          playsInline
          ref={(videoEl) => {
            if (videoEl) videoEl.srcObject = localStream;
          }}
        />
      )}

        {remoteStream && (
          <video
            autoPlay
            playsInline
            ref={(videoEl) => {
              if (videoEl) videoEl.srcObject = remoteStream;
            }}
          />
        )}
      </>
    );
  }


  return (
    <SocketContext.Provider value={{ createCall }}>{children}</SocketContext.Provider>
  );
}

// Custom hook
export function useSocket() {
  return useContext(SocketContext);
}
