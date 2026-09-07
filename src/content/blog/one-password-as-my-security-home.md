---
title: Making 1Password My Security Home
pubDatetime: 2026-07-12T00:00:00+08:00
description: A practical approach to consolidating passwords, passkeys, and one-time codes without creating a single point of failure.
tags:
  - Personal
---


      Passwords, passkeys, and two-factor codes are easier to live with when they have one deliberate home. The important word is deliberate.

      For a long time, my credentials were spread across browser autofill, Apple Passwords, and separate authenticator apps. None of those tools was inherently wrong. The friction came from not knowing which one would appear, which copy was current, or where the recovery material lived. I wanted one everyday interface: 1Password.

      One home, not one careless dependency

      The goal is not to put every security decision on autopilot. It is to make the normal path reliable enough that I stop reusing passwords or postponing two-factor authentication. A password manager gives each account a unique password, remembers it, and makes the secure option less annoying than the shortcut.

      1Password can keep three things that used to be scattered: Login items, passkeys, and time-based one-time passwords (TOTP). Passkeys saved in 1Password can be used to sign in in the browser, and a passkey can live in an existing Login item or as its own item. TOTP codes can also be stored with a Login, so the six-digit code is ready after the password is filled.

      The migration rule: change the default, preserve the escape hatch

      The untidy part of the transition is browser autofill. When Chrome and 1Password both offer credentials, the page feels noisy and it becomes easy to save an updated password in the wrong place. My preferred end state is simple: 1Password is the only tool that offers to fill and save passwords in the browser.

      That does not require deleting everything on day one. First import or verify the important logins, then disable the browser's save-and-fill prompts. Keep the old store as a read-only fallback during the transition. Only after testing key accounts, recovery methods, and passkeys should it be cleaned up. A CSV export is useful as a password inventory, but it is not a complete migration format: treat passkeys and TOTP secrets as items that need individual verification.

      A small cleanup standard
      
        One Login item per account whenever possible, with the primary domain in its website field.
        Add a specific sign-in URL only when a service genuinely needs a different subdomain or flow.
        After changing a password, confirm the saved item before closing the site. A confirmation click is cheaper than an account-recovery flow.
        On iPhone and iPad, make 1Password the chosen password and passkey provider, then test one ordinary login on each device.
      

      TOTP is convenient, but recovery codes still matter

      Putting a password and its one-time code in the same manager makes everyday sign-in wonderfully smooth. It also means that access to that manager becomes more important. For low-friction accounts, that trade-off is often exactly what I want. For email, financial services, developer infrastructure, and anything that can reset other accounts, I keep the service's recovery codes separately and record which recovery path exists.

      When a site shows a QR code for two-factor setup, the reliable method is to edit the matching Login item in 1Password, add a one-time-password field, and scan the code or enter the setup secret. Before leaving the setup screen, copy the generated code from 1Password and complete the website's confirmation step. If scanning is awkward, choosing the site's manual setup option is usually clearer than repeatedly trying the camera.

      Security is also recoverability

      The reason I am comfortable centralizing daily use is not that a password manager is magic. It is that 1Password combines an account password with a Secret Key when protecting account data. The Secret Key is not a substitute for the account password and it is not a recovery code. It is an additional secret required when signing in on a new device, so it deserves a backup plan of its own.

      My baseline is an Emergency Kit stored offline, plus a tested recovery path for the primary email account. The kit should be available if every familiar device disappears, but it should not be casually photographed, pasted into chat, or left in a public cloud folder. A sealed paper copy in a controlled physical location is boring, which is part of why it works.

      An exit plan makes the setup stronger

      A subscription is not a trap if I can inspect and export my own data. According to 1Password's current policy, a frozen account after cancellation can still be used to view and export data, provided the account is not deleted. That is reassuring, but I would rather not discover the details during an emergency. Once a year, I plan to review the Emergency Kit, the primary-email recovery path, and a current export stored safely for reference.

      If I ever move to another 1Password account, I will keep both accounts available long enough to copy or move items and test them in the new account. Passwords are only one part of the job. TOTP, passkeys, recovery codes, and shared-vault permissions all need a deliberate check. Migration is finished when the new setup signs in successfully, not when a CSV file exists.

      The setup I actually want
      One password manager for daily work. One clear autofill provider per device. Unique passwords everywhere. Passkeys when a service supports them. TOTP for convenience, with recovery codes kept separately for the accounts that matter most. And a boring, offline Emergency Kit that can get me back in when convenience fails. Centralization is useful only when it comes with verification, recovery, and an exit plan.

      References
      
        1Password Support: Save and sign in with passkeys
        1Password Support: Use 1Password as an authenticator
        1Password Support: About your Secret Key
        1Password Support: Subscription billing policy
      
      12 Jul 2026" data-zh="发布于 2026 年 7 月 12 日">Published 12 Jul 2026
    
