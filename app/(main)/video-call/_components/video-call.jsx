"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Mic, MicOff, PhoneOff, User, Video, VideoOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const VideoCall = ({ sessionId, token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const sessionRef = useRef(null);
  const publisherRef = useRef(null);

  const router = useRouter();

  const appId = process.env.NEXT_PUBLIC_VONAGE_APPLICATION_ID;

  // Handle script load
  const handleScriptLoad = () => {
    setScriptLoaded(true);
    if (!window.OT) {
      toast.error("Failed to load Vonage Video API");
      setIsLoading(false);
      return;
    }
    // Initialize the video session once script is loaded
    initializeSession();
  };

  // initialize video session
  const initializeSession = () => {

if (!appId || !sessionId || !token) {
      toast.error("Missing required video call parameters");
      router.push("/appointments");
      return;
    }
 try {
      // Initialize the session
      sessionRef.current = window.OT.initSession(appId, sessionId);

      // Subscribe to new streams
      sessionRef.current.on("streamCreated", (event) => {
        console.log(event, "New stream created");

        sessionRef.current.subscribe(
          event.stream,
          "subscriber",
          {
            insertMode: "append",
            width: "100%",
            height: "100%",
          },
          (error) => {
            if (error) {
              toast.error("Error connecting to other participant's stream");
            }
          }
        );
      });

      // Handle session events
      sessionRef.current.on("sessionConnected", () => {
        setIsConnected(true);
        setIsLoading(false);

        // THIS IS THE FIX - Initialize publisher AFTER session connects
        publisherRef.current = window.OT.initPublisher(
          "publisher", // This targets the div with id="publisher"
          {
            insertMode: "replace", // Change from "append" to "replace"
            width: "100%",
            height: "100%",
            publishAudio: isAudioEnabled,
            publishVideo: isVideoEnabled,
          },
          (error) => {
            if (error) {
              console.error("Publisher error:", error);
              toast.error("Error initializing your camera and microphone");
            } else {
              console.log(
                "Publisher initialized successfully - you should see your video now"
              );
            }
          }
        );
      });

      sessionRef.current.on("sessionDisconnected", () => {
        setIsConnected(false);
      });

      // Connect to the session
      sessionRef.current.connect(token, (error) => {
        if (error) {
          toast.error("Error connecting to video session");
        } else {
          // Publish your stream AFTER connecting
          if (publisherRef.current) {
            sessionRef.current.publish(publisherRef.current, (error) => {
              if (error) {
                console.log("Error publishing stream:", error);
                toast.error("Error publishing your stream");
              } else {
                console.log("Stream published successfully");
              }
            });
          }
        }
      });
    } catch (error) {
      toast.error("Failed to initialize video call");
      setIsLoading(false);
    }



  };

  const toggleVideo=()=>{
    if(publisherRef.current){
        publisherRef.current.publishVideo(!isVideoEnabled);
        setIsVideoEnabled((prev)=>!prev);
    }
  };

  // Toggle audio
  const toggleAudio = () => {
    if (publisherRef.current) {
      publisherRef.current.publishAudio(!isAudioEnabled);
      setIsAudioEnabled((prev) => !prev);
    }
  };

  // End call
  const endCall = () => {
    // Properly destroy publisher
    if (publisherRef.current) {
      publisherRef.current.destroy();
      publisherRef.current = null;
    }
 // Disconnect session
    if (sessionRef.current) {
      sessionRef.current.disconnect();
      sessionRef.current = null;
    }

    router.push("/appointments");
  };


// Cleanup on unmount
  useEffect(() => {
    return () => {
      if (publisherRef.current) {
        publisherRef.current.destroy();
      }
      if (sessionRef.current) {
        sessionRef.current.disconnect();
      }
    };
  }, []);



  if (!sessionId || !token || !appId) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Invalid Video Call
        </h1>
        <p className="text-muted-foreground mb-6">
          Missing required parameters for the video call.
        </p>
        <Button
          onClick={() => router.push("/appointments")}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Back to Appointments
        </Button>
      </div>
    );
  }

  return (
   <>
  <Script
    src="https://unpkg.com/@vonage/client-sdk-video@latest/dist/js/opentok.js"
    onLoad={handleScriptLoad}
    onError={() => {
      toast.error("Failed to load video components");
      setIsLoading(false);
    }}
  />

  <div className="container mx-auto px-4 py-10">
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-white tracking-wide">
        Live Video Consultation
      </h1>
      <p className="text-emerald-300 mt-2 text-sm">
        {isConnected
          ? "You're connected with the participant."
          : isLoading
          ? "Establishing secure connection..."
          : "Unable to connect. Please refresh."}
      </p>
    </div>

    {isLoading && !scriptLoaded ? (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-14 w-14 text-emerald-400 animate-spin mb-6" />
        <p className="text-xl text-white">Initializing video environment...</p>
      </div>
    ) : (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Publisher (You) */}
          <div className="relative border border-emerald-800 rounded-2xl overflow-hidden shadow-md group hover:scale-[1.02] transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 to-emerald-900/30 opacity-60 z-10 pointer-events-none" />
            <div className="bg-emerald-950/20 px-4 py-2 text-emerald-400 text-base font-semibold z-20 relative">
              You
            </div>
            <div
              id="publisher"
              className="w-full h-[320px] md:h-[400px] relative z-20 bg-muted/20"
            >
              {!scriptLoaded && (
                <div className="flex items-center justify-center h-full">
                  <div className="bg-muted/10 rounded-full p-8">
                    <User className="h-12 w-12 text-emerald-400" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Subscriber (Other Person) */}
          <div className="relative border border-emerald-800 rounded-2xl overflow-hidden shadow-md group hover:scale-[1.02] transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 to-emerald-900/30 opacity-60 z-10 pointer-events-none" />
            <div className="bg-emerald-950/20 px-4 py-2 text-emerald-400 text-base font-semibold z-20 relative">
              Participant
            </div>
            <div
              id="subscriber"
              className="w-full h-[320px] md:h-[400px] relative z-20 bg-muted/20"
            >
              {(!isConnected || !scriptLoaded) && (
                <div className="flex items-center justify-center h-full">
                  <div className="bg-muted/10 rounded-full p-8">
                    <User className="h-12 w-12 text-emerald-400" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center space-x-6 mt-6">
          <Button
            onClick={toggleVideo}
            size="lg"
            className={`rounded-full h-16 w-16 flex items-center justify-center shadow-lg transition-all duration-300 ${
              isVideoEnabled
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
            disabled={!publisherRef.current}
          >
            {isVideoEnabled ? (
              <Video className="h-6 w-6 text-white" />
            ) : (
              <VideoOff className="h-6 w-6 text-white" />
            )}
          </Button>

          <Button
            onClick={toggleAudio}
            size="lg"
            className={`rounded-full h-16 w-16 flex items-center justify-center shadow-lg transition-all duration-300 ${
              isAudioEnabled
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
            disabled={!publisherRef.current}
          >
            {isAudioEnabled ? (
              <Mic className="h-6 w-6 text-white" />
            ) : (
              <MicOff className="h-6 w-6 text-white" />
            )}
          </Button>

          <Button
            onClick={endCall}
            size="lg"
            className="rounded-full h-16 w-16 flex items-center justify-center bg-gradient-to-br from-red-600 to-red-700 shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <PhoneOff className="h-6 w-6 text-white" />
          </Button>
        </div>

        <div className="text-center mt-6">
          <p className="text-emerald-300 text-sm">
            {isVideoEnabled ? "Camera On" : "Camera Off"} •{" "}
            {isAudioEnabled ? "Microphone Active" : "Microphone Muted"}
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            Click the red button to end the call once the consultation is over.
          </p>
        </div>
      </div>
    )}
  </div>
</>
  );
};

export default VideoCall;
