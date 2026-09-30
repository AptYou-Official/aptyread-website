'use client';

import { englishLessons, englishVideos, isEnglishLessonPublished, type Activity } from '@/lib/english-curriculum';
import { getProgrammeActivity } from '@/lib/english-programme';
import { getFormationLetter, getLessonLearningSummary } from '@/lib/english-learning-journey';
import { englishAccess } from '@/lib/english-progress';
import { useEnglish } from './EnglishProvider';
import Link from './AppLink';
import Icon from './Icons';
import PwaInstall from './PwaInstall';

function mediaLabel(activity: Activity) {
  if (activity.kind === 'practice') return 'Interactive prototype · device voice';
  if (activity.kind === 'video') return englishVideos[activity.id] ? 'Teaching video linked' : activity.audioIntroduction ? 'Sound introduction · teaching video pending' : activity.practicePreview ? 'Practice demonstration · teaching video pending' : 'Teaching media pending';
  if (activity.kind === 'sound') return 'Recorded sound and mouth model';
  if (activity.kind === 'write' || activity.kind === 'formation') return 'Screen or paper practice';
  return 'Interactive practice';
}

export default function ParentProgramme({ onShowLevels }: { onShowLevels: () => void }) {
  const { progress, ready } = useEnglish();
  const access = englishAccess(progress);
  const lessons = englishLessons.filter(isEnglishLessonPublished);
  const core = lessons.filter(lesson => !lesson.supplemental);
  const optional = lessons.filter(lesson => lesson.supplemental);
  const coreActivities = core.flatMap(lesson => lesson.activities);
  const optionalActivities = optional.flatMap(lesson => lesson.activities);
  const completed = coreActivities.filter(activity => access.completed.has(activity.id)).length;
  const practised = optionalActivities.filter(activity => access.completed.has(activity.id)).length;
  const knownIds = new Set(lessons.flatMap(lesson => lesson.activities.map(activity => activity.id)));
  // A replay can reopen an invitation while retaining the forms already tried.
  // Merely offering it, or choosing Later without practising, adds no practice.
  const practisedOffers = Object.entries(progress.formationOffers || {}).flatMap(([activityId, offer]) => {
    const letter = getFormationLetter(activityId);
    return knownIds.has(activityId) && letter && offer.forms.length ? [{ activityId, letter, forms: offer.forms }] : [];
  });
  // Count a task once using its latest observation. Retrying is welcome and
  // must not inflate a parent's view of how many different tasks were tried.
  const latest = new Map<string, NonNullable<typeof progress.evidence>[number]>();
  for (const evidence of progress.evidence || []) {
    if (knownIds.has(evidence.activityId)) {
      const key = `${evidence.activityId}:${evidence.taskId}`;
      if (!latest.has(key) || latest.get(key)!.at <= evidence.at) latest.set(key, evidence);
    }
  }
  const observations = [...latest.values()];
  const independent = observations.filter(item => item.outcome === 'independent').length;
  const supported = observations.filter(item => item.outcome === 'supported').length;
  const supportedActivities = [...new Set(observations.filter(item => item.outcome === 'supported' && access.activities.has(item.activityId)).sort((a, b) => b.at.localeCompare(a.at)).map(item => item.activityId))].slice(0, 3).flatMap(id => {
    const lesson = lessons.find(item => item.activities.some(activity => activity.id === id));
    const activity = lesson?.activities.find(item => item.id === id);
    return lesson && activity ? [{ lesson, activity }] : [];
  });

  function programmeList(items: typeof lessons) {
    return <div className="en-programme-list">{items.map((lesson, index) => {
      const done = lesson.activities.filter(activity => access.completed.has(activity.id)).length;
      const available = ready && access.lessons.has(lesson.id);
      const recorded = observations.filter(item => lesson.activities.some(activity => activity.id === item.activityId));
      const learning = getLessonLearningSummary(lesson.id);
      const formationLetters = lesson.supplemental && lesson.requiredLetter ? [lesson.requiredLetter] : [...new Set(lesson.activities.flatMap(activity => getFormationLetter(activity.id) ? [getFormationLetter(activity.id)!] : []))];
      return <details key={lesson.id} className="en-programme-lesson">
        <summary><span className="en-programme-number" aria-hidden="true">{lesson.supplemental ? <Icon name="pencil" size={22} /> : index + 1}</span><span><strong>{lesson.title}</strong><small>{done} / {lesson.activities.length} activities completed · {available ? 'Open on child’s path' : 'Opens later on child’s path'}</small></span><Icon name="chevron" size={20} /></summary>
        <div className="en-programme-lesson-body">
          <p>{learning.focus}</p>
          <dl className="en-parent-learning-summary">
            {learning.sounds.length > 0 && <div><dt><Icon name="sound" size={18} /> Sounds</dt><dd>{learning.sounds.join(' · ')}</dd></div>}
            {learning.words.length > 0 && <div><dt><Icon name="hand" size={18} /> Words to use</dt><dd>{learning.words.join(' · ')}</dd></div>}
            {formationLetters.length > 0 && <div><dt><Icon name="pencil" size={18} /> Optional letter making</dt><dd>{formationLetters.map(letter => `${letter} / ${letter.toUpperCase()}`).join(' · ')}</dd></div>}
            {learning.book && <div><dt><Icon name="book" size={18} /> Little book</dt><dd>{learning.book}</dd></div>}
            <div className="en-parent-learning-revisit"><dt><Icon name="redo" size={18} /> Revisit</dt><dd>{learning.revisit}</dd></div>
          </dl>
          {recorded.length > 0 && <p className="en-programme-evidence-line">Latest on-screen observations: {recorded.filter(item => item.outcome === 'independent').length} independent; {recorded.filter(item => item.outcome === 'supported').length} with support.</p>}
          <ol>{lesson.activities.map(activity => <li key={activity.id}>
            <div><strong>{activity.title}</strong><span>{mediaLabel(activity)}</span>{getProgrammeActivity(activity.id)?.objective && <p>{getProgrammeActivity(activity.id)?.objective}</p>}{activity.id === 'our-first-words' && <p>Listen to a sentence, then find a familiar word with support. This records word finding, not independent sentence reading.</p>}{getFormationLetter(activity.id) && <p className="en-parent-invitation-note"><Icon name="pencil" size={16} /> Then an optional turn to make {getFormationLetter(activity.id)}. Choose paper, screen or Keep reading.</p>}</div>
            <Link href={`/english/learn/${lesson.id}?preview=1&activity=${activity.id}`} className="en-programme-preview" aria-label={`Preview ${activity.title} without changing child progress`}>Preview <Icon name="play" size={18} /></Link>
          </li>)}</ol>
        </div>
      </details>;
    })}</div>;
  }

  return <section className="en-grownups en-parent-programme" translate="yes">
    <h1>For grown-ups</h1>
    <p className="en-intro">Their learning path, practice and next steps.</p>
    <section className="en-parent-learning-route" aria-labelledby="en-learning-route-title">
      <h2 id="en-learning-route-title">A lesson can take several little visits</h2>
      <p>Follow one sound into useful words, make its letter when your child is ready, then use familiar learning in a little book. Stop at a comfortable point and come back another day.</p>
      <ol>
        <li><Icon name="sound" size={26} /><strong>Hear a sound</strong><span>Listen, say and find its letter.</span></li>
        <li><Icon name="hand" size={26} /><strong>Use it in words</strong><span>Build, try reading and find meaning.</span></li>
        <li><Icon name="pencil" size={26} /><strong>Make the letter</strong><span>Optional screen or paper turn.</span></li>
        <li><Icon name="book" size={26} /><strong>Enjoy a book</strong><span>Prepare, read and talk together.</span></li>
        <li><Icon name="redo" size={26} /><strong>Come back to it</strong><span>Mix familiar sounds, words and stories.</span></li>
      </ol>
      <p className="en-parent-route-note">Letter making is offered at sound stops along the way. Choosing Keep reading moves to the next topic; it does not count as handwriting practice. The lesson details below show where each part appears.</p>
    </section>
    <div className="en-parent-progress-grid" aria-label="Participation and on-screen observations">
      <article><Icon name="book" size={26} /><strong>{ready ? `${completed} / ${coreActivities.length}` : '…'}</strong><h2>Activities completed</h2><p>Participation in the main Level 1 path.</p></article>
      <article><Icon name="pencil" size={26} /><strong>{ready ? practisedOffers.length : '…'}</strong><h2>Letter invitations practised</h2><p>At least one form tried. Choosing Keep reading without trying adds none.</p><p>{ready ? practised : '…'} optional letter activities completed separately. Handwriting is not scored.</p></article>
      <article><Icon name="hand" size={26} /><strong>{ready ? independent : '…'}</strong><h2>Independent on-screen tasks</h2><p>Recorded choices or builds completed without in-app support.</p></article>
      <article><Icon name="grownups" size={26} /><strong>{ready ? supported : '…'}</strong><h2>Tasks with support</h2><p>Latest recorded attempts that used a hint or model.</p></article>
    </div>
    {ready && practisedOffers.length > 0 && <details className="en-parent-formation-record"><summary><Icon name="pencil" size={21} /> Letter forms tried <Icon name="chevron" size={18} /></summary><ul>{practisedOffers.map(offer => <li key={offer.activityId}><strong>{offer.forms.join(' · ')}</strong><span>Practised in the {offer.letter} invitation</span></li>)}</ul><p>These are participation records for the forms chosen on screen or paper. They do not assess the marks your child made.</p></details>}
    <p className="en-parent-evidence-note">Completed does not mean mastered. On-screen observations count each recorded task once using its latest attempt. They do not verify spoken reading, pronunciation, handwriting or help given beside the screen. Older activities may have participation records only.</p>
    {supportedActivities.length > 0 && <section className="en-parent-revisit" aria-labelledby="en-revisit-title"><h2 id="en-revisit-title">An option for another day</h2><p>These activities included supported responses. Revisit together when useful, or enjoy a familiar book again. This is optional practice.</p><div>{supportedActivities.map(({ lesson, activity }) => <Link key={activity.id} className="en-overview-secondary" href={`/english/learn/${lesson.id}?activity=${activity.id}`}>Practise {activity.title} <Icon name="redo" size={18} /></Link>)}</div></section>}

    <section className="en-parent-programme-section" aria-labelledby="en-full-programme-title">
      <div className="en-parent-section-heading"><h2 id="en-full-programme-title">The full Level 1 programme</h2><span>{core.length} lessons</span></div>
      <p>The child’s path opens in order. Each lesson can span short visits; there is no need to finish its activity list at once. You can preview every authored activity below without adding to the child’s progress or observations.</p>
      <div className="en-programme-media-note"><Icon name="sound" size={22} /><p>New lessons are interactive prototypes. They use device narration and illustrated practice while final recordings are prepared. A linked video may need internet; a practice demonstration is not a finished teaching video.</p></div>
      {programmeList(core)}
      <details className="en-parent-optional"><summary><Icon name="pencil" size={22} /> Optional letter formation <span>{optional.length} choices</span></summary><p>These activities open as their sounds are introduced. They do not block the main reading path. Choose screen or paper practice to suit your child.</p>{programmeList(optional)}</details>
    </section>

    <section className="en-parent-programme-section en-parent-readiness" aria-labelledby="en-readiness-title"><h2 id="en-readiness-title">After Level 1</h2><p>Finishing the path does not automatically decide readiness. Read together and notice whether your child can use taught sounds in a new decodable word, understand a short book, and return to it comfortably. More practice and adult support are welcome.</p><p>Levels 2–5 are planned stages. They are not playable or unlocked by finishing this prototype.</p><button className="en-overview-secondary" onClick={onShowLevels}>See the planned stages <Icon name="arrow" size={18} /></button></section>

    <div className="en-parent-grid"><article><Icon name="home" size={28} /><h2>Saved on this device</h2><p>One learning record is saved in this browser. Clearing browser data clears it. It is not a separate profile for each child.</p></article><article><Icon name="leaf" size={28} /><h2>Keep it comfortable</h2><p>Pause whenever your child is ready. Listening, reading and pencil control can develop at different rates. Talk in your home language and use the replay or help options when useful.</p></article></div>
    <div className="en-parent-install"><div><h2>Ready on your home screen</h2><p>Add AptyRead for easy access.</p></div><PwaInstall /></div>
    <div className="en-parent-links"><a href="/privacy">Privacy</a><a href="/contact">Contact</a><a href="/malayalam">Malayalam <Icon name="arrow" size={16} /></a><a href="/">AptyRead home <Icon name="home" size={16} /></a></div>
  </section>;
}
