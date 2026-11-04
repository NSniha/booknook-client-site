import { Github, Instagram } from "lucide-react";

export default function SocialLinks() {
  return (
    <div className="flex gap-2">
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit Instagram"
        className="icon-button"
      >
        <Instagram size={16} />
      </a>
      <a
        href="https://x.com/"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit X"
        className="icon-button"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.9 1.2h3.7l-8.1 9.3L24 22.8h-7.5l-5.9-7.7-6.7 7.7H.2l8.7-10L0 1.2h7.7l5.4 7.1zm-1.3 19.4h2L6.6 3.3H4.4z" />
        </svg>
      </a>
      <a
        href="https://github.com/"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit GitHub"
        className="icon-button"
      >
        <Github size={16} />
      </a>
    </div>
  );
}
