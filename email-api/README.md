# MintexCare email API (SMTP, free on Vercel)

Sends every website form submission (contact, free consultation, staffing request, job
application with resume) to MintexCare's inbox through SMTP, in the website's design.
`api/send.js` is the server, `lib/template.js` is the email design.

The website calls it after saving the submission (src/lib/emailAlert.ts, `VITE_EMAIL_API_URL`).
Only mintexcare.com may use it; it ignores invalid entries and stops after 30 emails an hour.

## Settings (Vercel ▸ project ▸ Settings ▸ Environment Variables)
| Name | Example |
|---|---|
| SMTP_HOST | smtp.gmail.com |
| SMTP_PORT | 465 |
| SMTP_USER | s.goswami@plentycart.com |
| SMTP_PASS | Google App Password (myaccount.google.com/apppasswords) |
| MAIL_TO | s.goswami@plentycart.com (several: comma-separated) |
| MAIL_FROM | optional, defaults to SMTP_USER |

## Deploy
From this folder: `npx vercel login` (once), then `npx vercel deploy --prod`.
The API address is `https://<project>.vercel.app/api/send`; put it in the website's `.env` as
`VITE_EMAIL_API_URL`, then `npm run build` and `firebase deploy` the website.
