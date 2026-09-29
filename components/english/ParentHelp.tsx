'use client';

import { type ReactNode, useId } from 'react';
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

  return <details className={`en-word-support en-parent-help ${className}`.trim()} translate="no" onToggle={event => { if (event.currentTarget.open) onOpen?.(); }} onKeyDown={event => {
    if (event.key === 'Escape') {
      event.currentTarget.open = false;
      event.currentTarget.querySelector('summary')?.focus();
    }
  }}>
    <summary aria-label={copy.summary}><span className="en-parent-help-symbol"><Icon name="grownups" size={19} /></span><span>{copy.summary}</span><small>{parentHelpLanguages.find(item => item.id === language)?.label}</small><Icon name="chevron" size={16} /></summary>
    <div className="en-help-language"><label htmlFor={selectId}>{copy.languageLabel}</label><select id={selectId} value={language} onChange={event => update(p => updateParentHelpLanguage(p, event.target.value as typeof language))}>{parentHelpLanguages.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></div>
    {copy.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    {promptText && <p><strong>{copy.audioLabel || 'Child audio'}:</strong> {promptText}</p>}
    {children}
  </details>;
}
