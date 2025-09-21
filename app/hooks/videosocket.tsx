"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import { vi } from "zod/v4/locales";

const SocketContext = createContext<any>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [remoteUser, setRemoteUser] = useState<string | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const { data: session }: any = useSession();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [peerConnection, setPeerConection ] = useState<RTCPeerConnection|null>(null);
  useEffect(() => {
    if (session?.user?.id) {
      const ws = new WebSocket(`ws://${process.env.NEXT_PUBLIC_BACKEND}`);
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
  if (event.candidate) {
    ws.send(JSON.stringify({
      type: "ice_candidate",
      candidate: event.candidate,
      targetUserID: remoteUser,  // ✅ send correct target
      userID: session.user.id,
    }));
  }
};
   pc.ontrack = (event) => {
  console.log("Remote track received");
  const [remoteStreamObj] = event.streams;
  setRemoteStream(remoteStreamObj);
};

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "incoming_call") {
           setRemoteUser(message.fromUserID);
          console.log("Incoming call from:", message.fromUserID);
          const askuser = confirm(`Incoming call from ${message.fromUserID}. Accept?`);
          if(askuser && pc){
            pc.setRemoteDescription(new RTCSessionDescription(message.offer));
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


  const createCall = async(targetUserID: string) => {
    setRemoteUser(targetUserID); 
    if(!peerConnection){
      console.error("PeerConnection is not established");
      return;
    }
    
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setLocalStream(stream);
    stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

    console.log(peerConnection)
      
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log(targetUserID)

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
    <SocketContext.Provider value={{createCall}}>{children}</SocketContext.Provider>
  );
}

// Custom hook
export function useSocket() {
  return useContext(SocketContext);
}
