# Gravo website — complete GitHub Pages repository

A responsive, multi-page brand and app-download website for **https://gravo.live**.

## Pages included

- `index.html` — homepage and app highlights
- `about.html` — Gravo story and brand values
- `app.html` — screenshots, lightbox gallery, interactive sample catalogue and order timeline
- `how-it-works.html` — address selection, shopping and order flow
- `faq.html` — common customer questions
- `contact.html` — contact information and an email-draft form
- `privacy-policy.html` — refreshed, structured privacy policy
- `terms.html` — basic terms of use
- `delete-account.html` — guided account/data deletion request form
- `404.html` — branded not-found page

## Publish to your existing GitHub Pages repository

1. Download and extract the ZIP archive.
2. Open the **root** of your `GravoWeb` repository (`fareedkhancoder/GravoWeb`).
3. Replace the repository contents with the contents of this extracted folder. Keep the existing repository's GitHub Pages configuration.
4. Commit the files to the branch currently used by GitHub Pages (the repository was previously configured for `main`).
5. In **Settings → Pages**, confirm the source branch/folder is unchanged and the custom domain is `gravo.live`.
6. Confirm the root `CNAME` file still contains exactly `gravo.live`.
7. After deployment, test `https://gravo.live/`, `/privacy-policy.html`, and `/delete-account.html`.

The ZIP is structured with website files at its root, so it can replace the repository's website files directly.

## Brand and screenshots

- `assets/images/gravo-official-logo.jpg` and `gravo-icon.webp` are derived from the official Gravo logo supplied for this project.
- App screenshots are supplied by the owner. Sensitive visible account details, delivery address text and order identifiers have been obscured for public display.
- Screenshots are labelled as interface previews. The interactive product catalogue and order tracker on `app.html` use **dummy data only** and do not connect to inventory, customer accounts or order services.

## Forms and backend limitations

The contact and account-deletion forms are front-end only. They validate the form and prepare a message for the visitor to send using their own email app. They do **not** transmit or store form data, call Firebase, create a support ticket, or delete an account automatically.

On the account deletion page, the visitor must explicitly choose **Open email app to send**. The page clearly states that a request has not been submitted until the email is sent and the support team has verified and processed it. To automate requests, connect a secure backend (for example, a Firebase callable function/HTTPS endpoint) with server-side authentication, abuse protection, verification and audit logging. Never place Firebase Admin credentials or private API keys in this static repository.

## Before publishing

Please review the legal text against the app's current production behaviour, data flows, payment integrations, retention practices and actual legal business/service-provider name. The privacy page is based on the information disclosed in the previously published Gravo policy, but it is not legal advice. Update the effective date and contact details when your practices change.

## Technical notes

- Static HTML, CSS and vanilla JavaScript; no build step or package installation required.
- Uses relative links and assets, suitable for a GitHub Pages custom domain at the repository root.
- No external font or JavaScript library is required.
- The Google Play link points to `com.gravo.Meher` as configured on the existing website.
