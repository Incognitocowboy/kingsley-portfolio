import { useState } from 'react';
import { contactTypes } from '../data/content';

// NOTE: this form doesn't send anything yet. To make it real, post the
// form data to a service like Formspree / Resend / your own API in onSubmit.
export default function Contact() {
  const [type, setType] = useState(contactTypes[0]);
  const [toast, setToast] = useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setToast(true); setTimeout(() => setToast(false), 3000);
    e.currentTarget.reset(); setType(contactTypes[0]);
  };
  return (
    <section id="book">
      <div className="book reveal">
        <div>
          <h3>Let's build something that <em>slaps</em>.</h3>
          <p>Open to full-time roles, contract work and interesting side projects. Tell me what you're building and I'll get back within 48 hours.</p>
        </div>
        <form onSubmit={submit}>
          <label>Name<input type="text" name="name" required placeholder="Your name" /></label>
          <label>Email<input type="email" name="email" required placeholder="you@company.com" /></label>
          <label>Company<input type="text" name="company" placeholder="Where you work" /></label>
          <label>What's this about?
            <div className="chips">
              {contactTypes.map((t) => (
                <button key={t} type="button" className={`btn chip${t === type ? ' sel' : ''}`} onClick={() => setType(t)}>{t}</button>
              ))}
            </div>
          </label>
          <label>Details<textarea name="details" rows={3} placeholder="The project, the stack, the timeline…" /></label>
          <button className="btn hotpink" type="submit">Send request →</button>
        </form>
      </div>
      <div className={`toast${toast ? ' show' : ''}`}>Message sent (mockup) — talk soon ✦</div>
    </section>
  );
}
