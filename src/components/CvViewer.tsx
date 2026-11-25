import { useEffect, useRef, useState } from 'react';
import { links } from '../data/content';

const OPEN_EVENT = 'cv:open';

/** Opens the in-site resume viewer. */
export function openCv() {
  dispatchEvent(new Event(OPEN_EVENT));
}

/** Props for any link that should open the CV viewer instead of navigating. */
export function cvLinkProps() {
  return {
    href: links.resume,
    onClick: (e: React.MouseEvent) => {
      // Let cmd/ctrl/shift/middle-click open the page in a new tab as usual.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      openCv();
    },
  };
}

export default function CvViewer() {
  const [open, setOpen] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<Element | null>(null);

  useEffect(() => {
    const onOpen = () => { lastFocus.current = document.activeElement; setOpen(true); };
    addEventListener(OPEN_EVENT, onOpen);
    return () => removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add('cv-open');
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('cv-open');
      removeEventListener('keydown', onKey);
      (lastFocus.current as HTMLElement | null)?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="cv-overlay" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="cv-modal" role="dialog" aria-modal="true" aria-label="Resume">
        <div className="cv-bar">
          <span className="cv-title"><i /> RESUME<span className="cv-name"> · KINGSLEY ANI</span></span>
          <div className="cv-actions">
            <a className="btn" href={links.cv} download="Kingsley-Ani-Resume.pdf">↓ PDF</a>
            <a className="btn" href={links.resume} target="_blank" rel="noopener">Open ↗</a>
            <button className="btn" ref={closeBtn} onClick={() => setOpen(false)} aria-label="Close resume">✕</button>
          </div>
        </div>
        <iframe className="cv-frame" src={links.resume} title="Kingsley Ani resume" />
      </div>
    </div>
  );
}
