export interface ContactEmailPayload {
  name: string;
  email: string;
  message: string;
  timestamp?: Date;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Clean, standard subject line with no marketing jargon.
 */
export function buildInquirySubject(name: string, message: string): string {
  const firstLine = message.split(/\r?\n/)[0].trim().slice(0, 60);
  if (firstLine && firstLine.length > 0) {
    return `${name}: "${firstLine}${firstLine.length === 60 ? "…" : ""}"`;
  }
  return `New message from ${name}`;
}

/**
 * Sender naming: "[Name] (Portfolio) <contact@ryleanthony-gabotero.tech>"
 * Identifies the person immediately in your email list.
 */
export function buildInquiryFrom(name: string, fromAddress: string): string {
  const match = fromAddress.match(/<([^>]+)>/);
  const cleanAddress = match ? match[1] : fromAddress.trim();
  const safeName = name.replace(/[\r\n"<>]/g, " ").trim();
  return `${safeName} (Portfolio) <${cleanAddress}>`;
}

/**
 * Minimal, text-first, pleasing HTML template.
 * No heavy banners, no fake badges, no card soup.
 */
export function buildInquiryHtml({
  name,
  email,
  message,
  timestamp = new Date(),
}: ContactEmailPayload): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  const formattedTime = timestamp.toLocaleString("en-US", {
    timeZone: "Asia/Manila",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const replyMailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
    `Re: Portfolio message - ${name}`
  )}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Message from ${safeName}</title>
</head>
<body style="margin: 0; padding: 40px 20px; background-color: #fafafa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #111827;">
  <div style="max-width: 540px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 32px 32px 28px 32px;">
    
    <!-- Sender line -->
    <div style="margin-bottom: 20px; font-size: 15px; line-height: 1.5; color: #111827;">
      <strong>${safeName}</strong> 
      <span style="color: #6b7280;">&bull;</span> 
      <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: none;">${safeEmail}</a>
    </div>

    <!-- Message content -->
    <div style="margin-bottom: 28px; padding: 16px 20px; background-color: #f9fafb; border-left: 2px solid #111827; border-radius: 0 4px 4px 0; font-size: 15px; line-height: 1.6; color: #1f2937; white-space: pre-wrap; word-break: break-word;">${safeMessage}</div>

    <!-- Reply action -->
    <div style="margin-bottom: 32px;">
      <a href="${replyMailto}" style="display: inline-block; padding: 9px 18px; background-color: #111827; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 500; border-radius: 5px;">
        Reply to ${safeName}
      </a>
    </div>

    <!-- Quiet footer -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 18px; padding-top: 18px; border-top: 1px solid #f3f4f6; font-size: 12px; color: #9ca3af;">
      <tr>
        <td style="color: #9ca3af;">${formattedTime} PHT</td>
        <td align="right">
          <a href="https://www.ryleanthony-gabotero.tech" style="color: #9ca3af; text-decoration: none;">ryleanthony-gabotero.tech</a>
        </td>
      </tr>
    </table>

  </div>
</body>
</html>`;
}

/**
 * Clean plain-text fallback.
 */
export function buildInquiryText({
  name,
  email,
  message,
  timestamp = new Date(),
}: ContactEmailPayload): string {
  const formattedTime = timestamp.toLocaleString("en-US", {
    timeZone: "Asia/Manila",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${name} (${email}) sent you a message via your portfolio:

${message}

---
Received: ${formattedTime} PHT
Source: ryleanthony-gabotero.tech
`;
}
