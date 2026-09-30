'use client';

import { type ReactNode, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { parentHelpContent, parentHelpLanguages, type ParentHelpKind } from '@/lib/english-parent-help';
import { updateParentHelpLanguage } from '@/lib/english-progress';
import { useEnglish } from './EnglishProvider';
import Icon from './Icons';

export default function ParentHelp({ kind, onOpen, promptText, className = '', children }: {
  kind: ParentHelpKind;
  onOpen?: () => void;
  promptText?: string;
  className?: string;
  children?: ReactNode;
}) {
  const { progress, update } = useEnglish();
  const language = progress.parentHelpLanguage || 'en';
  const copy = parentHelpContent[kind][language];
  const selectId = `parent-help-language-${useId().replace(/:/g, '')}`;
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [host, setHost] = useState<HTMLElement | null>(null);
  useEffect(() => { setHost(document.getElementById('en-player-grownups')); }, []);

  // Keep adult guidance in the reserved header, outside the child's prompt.
  // A native modal contains keyboard focus and supports Escape to return.
  const help = <>
    <button ref={trigger} type="button" className="en-grownup-trigger" aria-label={copy.summary} aria-haspopup="dialog" onClick={() => { onOpen?.(); dialog.current?.showModal(); }}>
      <Icon name="grownups" size={22} /><span>Grown-ups</span>
    </button>
    <dialog ref={dialog} className={`en-grownup-dialog ${className}`.trim()} translate="no" aria-labelledby={`${selectId}-title`} onClose={() => trigger.current?.focus()} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
    <header><h2 id={`${selectId}-title`}>{copy.summary}</h2><button type="button" className="en-icon-button" autoFocus aria-label="Close grown-up help" onClick={() => dialog.current?.close()}><Icon name="close" /></button></header>
    <div className="en-grownup-dialog-body">
    <div className="en-help-language"><label htmlFor={selectId}>{copy.languageLabel}</label><select id={selectId} value={language} onChange={event => update(p => updateParentHelpLanguage(p, event.target.value as typeof language))}>{parentHelpLanguages.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></div>
    {copy.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    {promptText && <p><strong>{copy.audioLabel || 'Child audio'}:</strong> {promptText}</p>}
    {children}
    </div>
    </dialog>
  </>;
  return host ? createPortal(help, host) : <div className="en-grownup-fallback">{help}</div>;
}
