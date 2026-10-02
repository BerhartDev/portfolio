"use client";

import { useId, useState, type FormEvent, type MouseEvent, type ReactNode } from "react";
import {
  fieldErrors,
  isTopic,
  overLimit,
  recordSend,
  stripLinks,
  tooFast,
  type FieldError,
  type FieldErrors,
  type Topic,
} from "@/lib/contact";
import styles from "./Contact.module.css";

export type ContactFormLabels = {
  name: string;
  email: string;
  message: string;
  whatsapp: string;
  emailSubmit: string;
  sending: string;
  sent: string;
  error: string;
  subject: string;
  template: string;
  topic: string;
  topicPlaceholder: string;
  topicJob: string;
  topicProject: string;
  topicOther: string;
  errName: string;
  errEmail: string;
  errEmailDomain: string;
  errMessage: string;
  errMessageLong: string;
  errTopic: string;
  errFast: string;
  errLimit: string;
  linksRemoved: string;
};

type Props = {
  labels: ContactFormLabels;
  whatsappNumber: string;
  accessKey: string | undefined;
};

type Notice = "fast" | "limit" | "links" | "sent" | "sentLinks" | "error";
type FieldName = "name" | "email" | "message" | "topic";

const ENDPOINT = "https://api.web3forms.com/submit";
const openedAt = Date.now();

const TOPIC_LABEL: Record<Topic, keyof ContactFormLabels> = {
  job: "topicJob",
  project: "topicProject",
  other: "topicOther",
};

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/%(name|email|topic|message)%/g, (_, key: string) => values[key] ?? "");
}

function succeeded(value: unknown): boolean {
  return typeof value === "object" && value !== null && "success" in value && value.success === true;
}

export function ContactForm({ labels, whatsappNumber, accessKey }: Props) {
  const baseId = useId();
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState<Notice | null>(null);

  function messageFor(code: FieldError): string {
    const map: Record<FieldError, string> = {
      name: labels.errName,
      email: labels.errEmail,
      emailDomain: labels.errEmailDomain,
      message: labels.errMessage,
      messageLong: labels.errMessageLong,
      topic: labels.errTopic,
    };
    return map[code];
  }

  function read(form: HTMLFormElement) {
    const data = new FormData(form);
    return {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      topic: String(data.get("topic") ?? ""),
      botcheck: data.get("botcheck") ? "yes" : "",
    };
  }

  function prepare(form: HTMLFormElement) {
    const draft = read(form);
    const next = fieldErrors(draft);
    setErrors(next);
    if (Object.keys(next).length > 0 || !isTopic(draft.topic)) {
      setNotice(null);
      return null;
    }
    if (tooFast(openedAt)) {
      setNotice("fast");
      return null;
    }
    if (overLimit()) {
      setNotice("limit");
      return null;
    }
    const { text: message, stripped } = stripLinks(draft.message);
    const topicLabel = labels[TOPIC_LABEL[draft.topic]];
    recordSend();
    return {
      name: draft.name,
      email: draft.email,
      topicLabel,
      botcheck: draft.botcheck,
      stripped,
      text: fill(labels.template, { name: draft.name, email: draft.email, topic: topicLabel, message }),
    };
  }

  function onWhatsApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const ready = prepare(event.currentTarget);
    if (!ready) return;
    setNotice(ready.stripped ? "links" : null);
    const popup = window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(ready.text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    if (popup) popup.opener = null;
    else setNotice("error");
  }

  async function onEmail(event: MouseEvent<HTMLButtonElement>) {
    const form = event.currentTarget.form;
    if (!form || !accessKey) return;
    const ready = prepare(form);
    if (!ready) return;
    setSending(true);
    setNotice(null);
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `${labels.subject} · ${ready.topicLabel}`,
          name: ready.name,
          email: ready.email,
          message: ready.text,
          botcheck: ready.botcheck,
        }),
      });
      setNotice(succeeded(await response.json()) ? (ready.stripped ? "sentLinks" : "sent") : "error");
    } catch {
      setNotice("error");
    } finally {
      setSending(false);
    }
  }

  const noticeText =
    notice === "fast"
      ? labels.errFast
      : notice === "limit"
        ? labels.errLimit
        : notice === "links"
          ? labels.linksRemoved
          : notice === "sent"
            ? labels.sent
            : notice === "sentLinks"
              ? `${labels.sent} ${labels.linksRemoved}`
              : notice === "error"
                ? labels.error
                : null;

  function field(name: FieldName, label: string, control: ReactNode) {
    const code = errors[name];
    const errorId = `${baseId}-${name}-error`;
    return (
      <div className={styles.field} key={name}>
        <label className={styles.fieldLabel} htmlFor={`${baseId}-${name}`}>
          {label}
        </label>
        {control}
        {code ? (
          <span className={styles.hint} id={errorId}>
            {messageFor(code)}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onWhatsApp} aria-busy={sending} noValidate>
      <div className={styles.honeypot} aria-hidden="true">
        <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
      </div>
      {field(
        "topic",
        labels.topic,
        <select
          className={styles.input}
          id={`${baseId}-topic`}
          name="topic"
          defaultValue=""
          required
          aria-invalid={errors.topic ? true : undefined}
          aria-describedby={errors.topic ? `${baseId}-topic-error` : undefined}
        >
          <option value="" disabled>
            {labels.topicPlaceholder}
          </option>
          <option value="job">{labels.topicJob}</option>
          <option value="project">{labels.topicProject}</option>
          <option value="other">{labels.topicOther}</option>
        </select>,
      )}
      {field(
        "name",
        labels.name,
        <input
          className={styles.input}
          id={`${baseId}-name`}
          name="name"
          type="text"
          required
          autoComplete="name"
          maxLength={80}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? `${baseId}-name-error` : undefined}
        />,
      )}
      {field(
        "email",
        labels.email,
        <input
          className={styles.input}
          id={`${baseId}-email`}
          name="email"
          type="text"
          inputMode="email"
          required
          autoComplete="email"
          maxLength={254}
          spellCheck={false}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${baseId}-email-error` : undefined}
        />,
      )}
      {field(
        "message",
        labels.message,
        <textarea
          className={styles.textarea}
          id={`${baseId}-message`}
          name="message"
          required
          rows={5}
          maxLength={2000}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${baseId}-message-error` : undefined}
        />,
      )}
      <div className={styles.actions}>
        <button className={styles.submit} type="submit" disabled={sending}>
          {labels.whatsapp}
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </button>
        <button className={styles.submit} type="button" disabled={sending || !accessKey} onClick={onEmail}>
          {sending ? labels.sending : labels.emailSubmit}
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </button>
      </div>
      <p className={styles.status} role="status">
        {noticeText}
      </p>
    </form>
  );
}
