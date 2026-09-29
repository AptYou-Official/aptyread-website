'use client';

import type { Activity } from '@/lib/english-curriculum';
import LearningCompanion from './LearningCompanion';
import Icon from './Icons';

/** A short guided preview; the next activity supplies the model to follow. */
export default function ExplorePreview({ activity, onComplete }: { activity: Activity; onComplete: () => void }) {
  const letter = activity.letter!;
  const pair = activity.id.endsWith('-cases');
  const forms = pair ? [letter.toUpperCase(), letter] : [activity.uppercase ? letter.toUpperCase() : letter];
  return <div className="en-guided-word en-explore-preview">
    <LearningCompanion title={pair ? 'Big and small.' : 'Let’s make our mark.'} reaction="try" />
    <div className="en-explore-preview-card">
      <span className="en-intro-video-note"><Icon name="play" size={16} /> Watch and try</span>
      <div className="en-explore-preview-forms" aria-label={activity.title}>{forms.map(form => <span key={form}>{form}</span>)}</div>
      <p>{pair ? 'Let’s explore them together.' : 'Let’s try writing together.'}</p>
    </div>
    <div className="en-word-dock" aria-label="Your next action"><button className="en-button en-next-topic" onClick={onComplete}>Let’s practise <span className="en-cta-arrow"><Icon name="arrow" size={23} /></span></button></div>
    <details className="en-word-support"><summary aria-label="For grown-ups"><Icon name="grownups" size={18} /><span>For grown-ups</span></summary>
      <p>{pair ? 'The next activity models both forms with their recorded sound before listening practice.' : 'The next activity offers a tracing demonstration or a pencil video for practice on paper.'} Continuing records a preview step, not a watched video or assessed learning.</p>
    </details>
  </div>;
}
