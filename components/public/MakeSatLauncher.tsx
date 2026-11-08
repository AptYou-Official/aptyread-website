"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./make-sat-launcher.css";

type Props = { language?: "en" | "ml" };

export default function MakeSatLauncher({ language = "en" }: Props) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const malayalam = language === "ml";

  const finishClose = useCallback(() => {
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  }, []);

  const closePreview = useCallback(() => {
    // Removing the iframe stops its sound and discards this unsaved activity.
    setOpen(false);
    dialog.current?.close();
    trigger.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const root = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousRootOverflow = root.style.overflow;
    body.style.overflow = "hidden";
    root.style.overflow = "hidden";

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === "aptyread-preview-close") closePreview();
    };
    window.addEventListener("message", onMessage);
    return () => {
      body.style.overflow = previousBodyOverflow;
      root.style.overflow = previousRootOverflow;
      window.removeEventListener("message", onMessage);
    };
  }, [open, closePreview]);

  function openPreview() {
    dialog.current?.showModal();
    setOpen(true);
    closeButton.current?.focus({ preventScroll: true });
  }

  return <div className="make-sat-launcher" lang={language}>
    <button ref={trigger} type="button" className="make-sat-launch-button" onClick={openPreview} aria-haspopup="dialog">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true"><path d="m9 5 10 7-10 7V5Z" /></svg>
      {malayalam ? "ഒരു പ്രവർത്തനം ചെയ്തു നോക്കാം" : "Try one activity"}
    </button>
    <p className="make-sat-launch-note">{malayalam ? <>sat ഉണ്ടാക്കി വായിക്കാം. ശബ്ദം ഓണാക്കൂ.</> : "Make and read sat. Sound on."}</p>
    <dialog ref={dialog} className="make-sat-dialog" aria-labelledby="make-sat-dialog-title" onCancel={event => { event.preventDefault(); closePreview(); }} onClose={finishClose}>
      <header className="make-sat-dialog-header">
        <p id="make-sat-dialog-title">{malayalam ? "AptyRead ഒന്നു പരിചയപ്പെടാം" : "A little look inside AptyRead"}</p>
        <button ref={closeButton} type="button" className="make-sat-dialog-close" onClick={closePreview} aria-label={malayalam ? "പ്രവർത്തനം അടയ്ക്കുക" : "Close activity preview"}>
          <svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </button>
      </header>
      {open && <iframe ref={frame} className="make-sat-frame" src="/try/sat?embedded=1" title="Make and read sat activity preview" allow="autoplay" />}
    </dialog>
  </div>;
}
