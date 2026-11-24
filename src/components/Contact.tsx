import { useState } from 'react';
import { contactTypes } from '../data/content';

// Messages are delivered to your inbox by Web3Forms (https://web3forms.com).
// Your email address never appears in the site's code: Web3Forms maps the
// access key below to the inbox you signed up with. The key is safe to be public.
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

type Toast = { text: string; ok: boolean } | null;

export default function Contact() {
  const [type, setType] = useState(contactTypes[0]);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<Toast>(null);

  const show = (t: Toast) => { setToast(t); setTimeout(() => setToast(null), 4000); };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!ACCESS_KEY) { show({ text: 'Contact form isn’t set up yet — please try again later.', ok: false }); return; }

    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setSending(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio: ${type} request from ${data.name}`,
          from_name: 'Kingsley Portfolio',
          replyto: data.email,
          type,
          ...data,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error(json.message || `HTTP ${res.status}`);
      show({ text: 'Message sent — I’ll get back to you within 48 hours ✦', ok: true });
      form.reset(); setType(contactTypes[0]);
    } catch {
      show({ text: 'Couldn’t send your message. Please try again in a moment.', ok: false });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="book">
      <div className="book reveal">
        <div>
          <h3>Let's build something that <em>slaps</em>.</h3>
          <p>Open to full-time roles, contract work and interesting side projects. Tell me what you're building and I'll get back within 48 hours.</p>
        </div>
        <form onSubmit={submit}>
          {/* spam honeypot: real people never fill this in */}
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />
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
          <label>Details<textarea name="message" rows={3} required placeholder="The project, the stack, the timeline…" /></label>
          <button className="btn hotpink" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send request →'}</button>
        </form>
      </div>
      <div className={`toast${toast ? ' show' : ''}${toast && !toast.ok ? ' err' : ''}`} role="status" aria-live="polite">{toast?.text}</div>
    </section>
  );
}
