import ActivitySticker from './ActivitySticker';

export default function WritingCelebration({ label, letter }: { label: string; letter: string }) {
  return <ActivitySticker kind="write" title="Nice try!" detail={`You practised ${label}.`} sticker={letter} />;
}
