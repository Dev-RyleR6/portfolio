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
 * Builds an informative, scan-friendly subject line showing the sender name
 * and a short message preview so notifications on mobile/watch are immediately clear.
 */
export function buildInquirySubject(name: string, message: string): string {
  const cleanSnippet = message.replace(/\s+/g, " ").trim().slice(0, 52);
  const snippet = cleanSnippet.length === 52 ? `${cleanSnippet}…` : cleanSnippet;
  return `Inquiry from ${name}: "${snippet}"`;
}

/**
 * Formats sender string for Resend.
 * Shows sender name with "via Portfolio" so inbox lists identify the contact immediately.
 */
export function buildInquiryFrom(name: string, fromAddress: string): string {
  // If fromAddress already includes a display name e.g. "Name <email@domain.com>", extract email
  const match = fromAddress.match(/<([^>]+)>/);
  const cleanAddress = match ? match[1] : fromAddress.trim();
  // Sanitize name for email header (remove newlines, quotes)
  const safeName = name.replace(/[\r\n"<>]/g, " ").trim();
  return `${safeName} via Portfolio <${cleanAddress}>`;
}

/**
 * Generates responsive, high-contrast HTML email styled with the portfolio's
 * modern editorial dark & emerald aesthetic.
 */
export function buildInquiryHtml({
  name,
  email,
  message,
  timestamp = new Date(),
}: ContactEmailPayload): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  
  // Format formatted date in Asia/Manila (PHT) and UTC
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
    `Re: Portfolio inquiry - ${name}`
  )}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Portfolio Message</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #18181b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f5; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 580px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e4e4e7; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #0d0f12; padding: 24px 28px; border-bottom: 2px solid #10b981;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td valign="middle">
                    <div style="display: inline-block; width: 34px; height: 34px; line-height: 34px; text-align: center; background-color: #1a1f26; border-radius: 8px; border: 1px solid #10b981; color: #10b981; font-weight: 800; font-size: 16px; margin-right: 12px; vertical-align: middle;">
                      R
                    </div>
                    <span style="color: #ffffff; font-weight: 700; font-size: 17px; vertical-align: middle; letter-spacing: -0.01em;">
                      Portfolio Inquiry
                    </span>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; padding: 4px 10px; background-color: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 9999px; color: #10b981; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                      Verified Lead
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sender Metadata Table -->
          <tr>
            <td style="padding: 24px 28px 16px 28px; background-color: #fafafa; border-bottom: 1px solid #f0f0f2;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #71717a; width: 70px; font-weight: 500;">From:</td>
                  <td style="padding: 6px 0; color: #09090b; font-weight: 600;">
                    ${safeName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #71717a; width: 70px; font-weight: 500;">Email:</td>
                  <td style="padding: 6px 0;">
                    <a href="${replyMailto}" style="color: #059669; text-decoration: none; font-weight: 600;">
                      ${safeEmail}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #71717a; width: 70px; font-weight: 500;">Received:</td>
                  <td style="padding: 6px 0; color: #71717a; font-size: 13px;">
                    ${formattedTime} PHT
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 28px 28px 20px 28px;">
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #71717a; margin-bottom: 10px;">
                Message Content
              </div>
              <div style="background-color: #f8fafc; border-left: 3px solid #10b981; border-top: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9; border-radius: 4px 8px 8px 4px; padding: 18px 20px; font-size: 15px; line-height: 1.65; color: #0f172a; word-break: break-word;">
                ${safeMessage}
              </div>
            </td>
          </tr>

          <!-- Direct Action Button -->
          <tr>
            <td style="padding: 10px 28px 28px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <a href="${replyMailto}" style="display: inline-block; background-color: #0d0f12; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; padding: 12px 24px; border-radius: 6px; border: 1px solid #27272a;">
                      Reply to ${safeName} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 14px 0 0 0; font-size: 12px; color: #71717a;">
                Tip: Hitting <strong>"Reply"</strong> directly in Gmail or Outlook also replies to ${safeEmail}.
              </p>
            </td>
          </tr>

          <!-- Footer Bar -->
          <tr>
            <td style="background-color: #f9fafb; padding: 16px 28px; border-top: 1px solid #f0f0f2; font-size: 12px; color: #a1a1aa; text-align: center;">
              Sent from the contact form at <a href="https://www.ryleanthony-gabotero.tech" style="color: #71717a; text-decoration: underline;">ryleanthony-gabotero.tech</a> &bull; Powered by Resend
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Generates clean plain-text email for text-only clients or screen readers.
 */
export function buildInquiryText({
  name,
  email,
  message,
  timestamp = new Date(),
}: ContactEmailPayload): string {
  const formattedTime = timestamp.toLocaleString("en-US", {
    timeZone: "Asia/Manila",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `NEW PORTFOLIO INQUIRY
=====================
From:     ${name} <${email}>
Date:     ${formattedTime} PHT
Source:   ryleanthony-gabotero.tech

MESSAGE:
---------------------
${message}
---------------------

Hit "Reply" in your email client to respond directly to ${email}.
`;
}
