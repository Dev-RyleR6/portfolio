import Link from "next/link";

export default function NotFound() {
  return (
    <main className="error-page">
      <div className="error-card">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>This URL does not exist or may have moved.</p>
        <Link href="/" className="button button-primary">Back to profile</Link>
      </div>
    </main>
  );
}
