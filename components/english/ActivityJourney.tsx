import Icon from './Icons';

export default function ActivityJourney({ step, review = false, application = false, sentence = false }: { step: number; review?: boolean; application?: boolean; sentence?: boolean }) {
  const labels = application ? ['Read', 'Explore', 'Build', 'Celebrate'] : sentence ? ['Listen', 'Find sat', 'Find at', 'Celebrate'] : review ? ['Listen', 'Choose', 'Read', 'Celebrate'] : ['Build', 'Read', 'Explore', 'Celebrate'];
  const icons = application ? ['book', 'sound', 'pencil', 'star'] as const : sentence ? ['sound', 'book', 'book', 'star'] as const : review ? ['sound', 'check', 'book', 'star'] as const : ['pencil', 'sound', 'book', 'star'] as const;
  return <ol className="en-word-journey" aria-label={labels.join(', ')}>{icons.map((icon, i) => <li key={icon} className={i < step ? 'is-complete' : i === step ? 'is-current' : ''} aria-current={i === step ? 'step' : undefined}><span><Icon name={i < step ? 'check' : icon} size={17} /></span><span className="en-sr-only">{labels[i]}</span></li>)}</ol>;
}
