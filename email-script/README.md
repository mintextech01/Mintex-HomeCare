# MintexCare form emails (Google Apps Script, free)

Every website form (contact, free consultation, staffing request, job application) is saved to
Firestore, and the website also posts it to this script. The script builds the branded email and
sends it through Gmail from the Google account that deployed it, with the resume attached for job
applications. No Vercel, no SMTP password, no paid Firebase plan.

- `Code.gs`: the script (checks the form, 30 emails/hour limit, email design).
- `Logo.gs`: the logo embedded in each email.

Gmail limits: about 100 emails a day on a normal Gmail account, about 1,500 on Google Workspace.

## Setup (once)

1. Go to https://script.google.com and sign in with the Google account that should **send** the
   emails. Click **New project** and name it "MintexCare emails".
2. Replace everything in `Code.gs` with this folder's `Code.gs`.
3. Click **+** next to Files, choose **Script**, name it `Logo`, and paste this folder's `Logo.gs`.
4. Optional: in `Code.gs`, set `MAIL_TO` to the inbox that should receive alerts (several:
   comma-separated). Left empty, alerts go to the account from step 1.
5. Click **Save**. Choose `testSend` in the function list at the top and click **Run**. Google
   asks for permission: **Review permissions**, pick the account, then **Advanced** >
   **Go to MintexCare emails (unsafe)** > **Allow**. (Google shows "unsafe" for any script you
   wrote yourself.) A test email should arrive.
6. Click **Deploy** > **New deployment**. Gear icon > **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   Click **Deploy** and copy the **Web app URL** (ends in `/exec`).
7. In the website's `.env`, set `VITE_EMAIL_SCRIPT_URL=` to that URL. Then `npm run build` and
   `firebase deploy` the website.

## Changing the script later

Edit and save, then **Deploy** > **Manage deployments** > pencil icon > Version: **New version** >
**Deploy**. This keeps the same URL, so the website needs no change.
