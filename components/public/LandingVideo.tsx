"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics/react";

type LandingVideoProps = {
  title?: string;
  subtitle?: string;
};

const VIDEO_ID = "d3O3uDjoTrc";
const VIDEO_URL = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
    __aptyYoutubeApiReady?: Promise<void>;
  }
}

function loadYoutubeApi(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.YT?.Player) {
    return Promise.resolve();
  }

  if (window.__aptyYoutubeApiReady) {
    return window.__aptyYoutubeApiReady;
  }

  window.__aptyYoutubeApiReady = new Promise<void>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    window.onYouTubeIframeAPIReady = () => resolve();
    document.head.appendChild(script);
  });

  return window.__aptyYoutubeApiReady;
}

export default function LandingVideo({
  title = "See AptyRead in 30 seconds.",
  subtitle = "The feeling of a real lesson. Then they read.",
}: LandingVideoProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    let intervalId: number | null = null;
    let player: any = null;
    let didTrackPlay = false;
    let didTrack50 = false;
    let didTrackComplete = false;

    const stopProgressCheck = () => {
      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    };

    const startProgressCheck = () => {
      if (!player || intervalId) return;
      intervalId = window.setInterval(() => {
        const duration = player.getDuration?.() ?? 0;
        const current = player.getCurrentTime?.() ?? 0;
        if (!didTrack50 && duration > 0 && current / duration >= 0.5) {
          didTrack50 = true;
          track("video_50", { video_id: VIDEO_ID, path: window.location.pathname });
        }
      }, 1000);
    };

    loadYoutubeApi().then(() => {
      if (!iframeRef.current || !window.YT?.Player) return;

      player = new window.YT.Player(iframeRef.current, {
        events: {
          onStateChange: (event: { data: number }) => {
            const YT = window.YT;
            if (!YT) return;

            if (event.data === YT.PlayerState.PLAYING) {
              if (!didTrackPlay) {
                didTrackPlay = true;
                track("video_play", { video_id: VIDEO_ID, path: window.location.pathname });
              }
              startProgressCheck();
            } else if (event.data === YT.PlayerState.ENDED) {
              stopProgressCheck();
              if (!didTrackComplete) {
                didTrackComplete = true;
                track("video_complete", { video_id: VIDEO_ID, path: window.location.pathname });
              }
            } else if (
              event.data === YT.PlayerState.PAUSED ||
              event.data === YT.PlayerState.BUFFERING
            ) {
              stopProgressCheck();
            }
          },
        },
      });
    });

    return () => {
      stopProgressCheck();
      if (player?.destroy) {
        player.destroy();
      }
    };
  }, []);

  return (
    <section className="py-8 md:py-12 px-4 bg-apty-warm">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-2">{title}</h2>
          <p className="text-apty-gray">{subtitle}</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-apty-coral-accent shadow-sm bg-black">
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              ref={iframeRef}
              className="absolute inset-0 w-full h-full"
              src={VIDEO_URL}
              title="AptyRead in 30 seconds"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
