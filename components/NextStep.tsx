import Link from "next/link";

type NextStepLink = {
  href: string;
  label: string;
  external?: boolean;
};

function ArrowIcon({ external = false }: { external?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
      {external ? (
        <path d="M5 3h8v8M12.5 3.5l-9 9" />
      ) : (
        <path d="M2.5 8h11M9.5 4l4 4-4 4" />
      )}
    </svg>
  );
}

export function NextStep({
  title,
  description,
  links,
}: {
  title: string;
  description: string;
  links: NextStepLink[];
}) {
  return (
    <aside className="next-step" aria-labelledby="next-step-title">
      <div className="next-step__copy">
        <h2 id="next-step-title">{title}</h2>
        <p>{description}</p>
      </div>
      <div className="next-step__actions">
        {links.map((link, index) =>
          link.external ? (
            <a
              className={index === 0 ? "next-step__primary" : "next-step__secondary"}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              key={link.href}
            >
              {link.label}
              <ArrowIcon external />
            </a>
          ) : (
            <Link
              className={index === 0 ? "next-step__primary" : "next-step__secondary"}
              href={link.href}
              key={link.href}
            >
              {link.label}
              <ArrowIcon />
            </Link>
          ),
        )}
      </div>
    </aside>
  );
}
