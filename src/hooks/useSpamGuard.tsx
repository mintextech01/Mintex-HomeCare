import { useRef, useState } from "react";

// Real people take several seconds to fill in a form; bots submit almost instantly.
const MIN_FILL_MS = 3000;

/**
 * Lightweight bot protection for public forms.
 * - Honeypot: a hidden field real visitors never see or fill in, but form bots do.
 * - Timing: submissions faster than MIN_FILL_MS after the form appeared are treated as bots.
 * When isSpam() is true, callers should pretend the submission succeeded and not save it,
 * so the bot gets no signal to retry.
 */
export const useSpamGuard = () => {
  const startedAt = useRef(Date.now());
  const [honeypot, setHoneypot] = useState("");

  const isSpam = () => honeypot.trim() !== "" || Date.now() - startedAt.current < MIN_FILL_MS;

  const reset = () => {
    setHoneypot("");
    startedAt.current = Date.now();
  };

  const honeypotField = (
    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
      {/* Name/label chosen so browser autofill and password managers never fill it in for real
          visitors (a filled field silently drops the message). Was "company_website". */}
      <label>
        Leave this field empty
        <input
          type="text"
          name="hp_field_check"
          tabIndex={-1}
          autoComplete="off"
          data-1p-ignore=""
          data-lpignore="true"
          data-form-type="other"
          value={honeypot}
          onChange={e => setHoneypot(e.target.value)}
        />
      </label>
    </div>
  );

  return { honeypotField, isSpam, reset };
};
