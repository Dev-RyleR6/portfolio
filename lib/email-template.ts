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
 * Minimal, responsive, accessible HTML email template.
 * Works seamlessly across mobile, tablet, desktop, light & dark modes.
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
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Message from ${safeName}</title>
  <style>
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
    /* Mobile responsiveness */
    @media only screen and (max-width: 600px) {
      .email-wrapper {
        padding: 16px 12px !important;
      }
      .email-container {
        padding: 24px 20px !important;
        border-radius: 8px !important;
      }
      .reply-button {
        display: block !important;
        width: 100% !important;
        text-align: center !important;
        box-sizing: border-box !important;
        padding: 14px 20px !important;
      }
      .footer-cell {
        display: block !important;
        width: 100% !important;
        text-align: left !important;
        padding: 3px 0 !important;
      }
      .footer-cell-right {
        text-align: left !important;
        margin-top: 4px !important;
      }
    }
    /* Dark mode styles */
    @media (prefers-color-scheme: dark) {
      body, .email-wrapper {
        background-color: #09090b !important;
      }
      .email-container {
        background-color: #18181b !important;
        border-color: #27272a !important;
        color: #f4f4f5 !important;
      }
      .sender-name {
        color: #ffffff !important;
      }
      .sender-email, .sender-email a {
        color: #a1a1aa !important;
      }
      .message-box {
        background-color: #27272a !important;
        border-color: #3f3f46 !important;
        border-left-color: #10b981 !important;
        color: #f4f4f5 !important;
      }
      .reply-button {
        background-color: #f4f4f5 !important;
        color: #09090b !important;
      }
      .footer-row {
        border-top-color: #27272a !important;
      }
      .footer-text, .footer-link {
        color: #71717a !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; color: #18181b;">
  <!-- Outer wrapper table for client-wide centering -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="email-wrapper" style="background-color: #f4f4f5; padding: 36px 16px; width: 100%;">
    <tr>
      <td align="center">
        <!-- Main card table -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="email-container" style="max-width: 540px; width: 100%; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 10px; padding: 32px 32px 28px 32px; box-sizing: border-box;">
          
          <!-- Small category eyebrow -->
          <tr>
            <td style="padding-bottom: 6px;">
              <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #059669;">
                Portfolio Contact
              </span>
            </td>
          </tr>

          <!-- Sender line -->
          <tr>
            <td style="padding-bottom: 20px;">
              <div class="sender-name" style="font-size: 17px; font-weight: 700; color: #09090b; line-height: 1.35; margin-bottom: 2px;">
                ${safeName}
              </div>
              <div class="sender-email" style="font-size: 14px; color: #71717a;">
                <a href="mailto:${safeEmail}" style="color: #71717a; text-decoration: none;">
                  ${safeEmail}
                </a>
              </div>
            </td>
          </tr>

          <!-- Message box -->
          <tr>
            <td style="padding-bottom: 28px;">
              <div class="message-box" style="padding: 18px 20px; background-color: #fafafa; border: 1px solid #f4f4f5; border-left: 3px solid #10b981; border-radius: 0 6px 6px 0; font-size: 15px; line-height: 1.65; color: #18181b; white-space: pre-wrap; word-break: break-word; overflow-wrap: break-word;">${safeMessage}</div>
            </td>
          </tr>

          <!-- Action button -->
          <tr>
            <td style="padding-bottom: 24px;">
              <a href="${replyMailto}" class="reply-button" style="display: inline-block; padding: 11px 22px; background-color: #18181b; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 500; border-radius: 6px; line-height: 1.2;">
                Reply to ${safeName} &rarr;
              </a>
            </td>
          </tr>

          <!-- Minimal footer -->
          <tr>
            <td class="footer-row" style="padding-top: 20px; border-top: 1px solid #f4f4f5;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td class="footer-cell footer-text" style="font-size: 12px; color: #a1a1aa;">
                    ${formattedTime} PHT
                  </td>
                  <td class="footer-cell footer-cell-right" align="right" style="font-size: 12px;">
                    <a href="https://www.ryleanthony-gabotero.tech" class="footer-link" style="color: #a1a1aa; text-decoration: none;">
                      ryleanthony-gabotero.tech
                    </a>
                  </td>
                </tr>
              </table>
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
 * Clean plain-text fallback for text-only clients and smartwatch notifications.
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
