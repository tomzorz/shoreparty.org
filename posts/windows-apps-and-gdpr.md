---
title: Windows apps and GDPR
description: "A quick disclaimer before venturing in: I’m not a legal expert, and the following is not legal advice. The purpose of this post is to give an overview of GDPR’s influence upon your average Windows App Developer."
date: 2018-03-17
tags:
  - privacy
  - uwp
  - windows
  - development
  - law
  - gdpr
layout: layouts/post.njk
---
A quick disclaimer before venturing in: I’m not a legal expert, and the following is not legal advice. The purpose of this post is to give an overview of GDPR’s influence upon your average Windows App Developer.

### What is GDPR, and why should you care?

GDPR, or General Data Protection Regulation is the new European Union law/ regulation covering data protection. It’s replacing the old Data Protection Directive from 1995, and it aims to give control back to the users while also unifying the regulation within the EU. **If you write software that anyone residing within the EU can use, it affects you. Citizenship or nationality do not matter.** Not complying with the regulation can result in a wide array of consequences, ranging from warnings in writings to a fine up to €20 million or up to 4% to annual worldwide turnover of the preceding financial year of an enterprise.

### What is Personal Data?

The new regulation expands the definition:

* Racial or ethnic origin

* Political opinions

* Religious or philosophical beliefs

* Trade union membership

* Health data

* Sex life or sexual orientation

* Past or spent criminal convictions

* Genetic data

* Biometric data

* **Location data**

* **Pseudonymized data**

* **Online identifiers (such as IP address, mobile hw IDs, browser fingerprints, RFID tags, MAC addresses, telemetry, user account IDs)**

As you can see, the last three points basically make even the simplest apps with online access fall under the GDPR rules.

### Privacy by design

If it wasn’t before, the new data-collection motto should be “privacy by design”. In general, this means:

* the default should be the data protection setting

* the privacy process should be transparent and documented

* the privacy process must be user-centric: granular options, information notices, clear notifications of changes

* logs should indicate changes in consents and personal access

* you should only keep data as long as you need to

* you shouldn’t assume that anyone else is compliant

Obviously certain settings are not in our hands — the Windows Developer Dashboard’s bug collection, or analytics fall under Microsoft’s umbrella. But again, if you add your own analytics that becomes your own responsibility.

### We are often two-in-ones

The GDPR defines two actors for us: the **Data Controller** *decides what data is collected, how is it used, whom is it shared with*. The **Data Processor** is *anyone other than the controller, who processes the data on their behalf*. Rolling your own analytics means that basically you’re both a controller and a processor.

Acting as any of these actors comes with additional responsibilities, such as **mandatory data breach notifications**. Users have to be notified clearly: they need to be informed about what can happen with their data and your actions to protect it.

**You also have to disclose what you share with others.** This can yield interesting lists, such as the one PayPal published recently which spans 42 pages when printed: [https://www.paypal.com/uk/webapps/mpp/ua/third-parties-list](https://www.paypal.com/uk/webapps/mpp/ua/third-parties-list)

### Explicit consent

**Users have to give you explicit consent to use their data. This means, that all privacy defaults must be opt-in, and a lack of action can’t mean opt-in.** Again, Store telemetry is not something you can mess with, but your own analytics is.

### Rights to their own data

A big part of GDPR is giving back the control to “Data Subjects”.

**They have the right to be forgotten / deleted.** This means that you should design your system architecture in a way that makes this possible and write tests to confirm it works as expected by the users. It’s possible that this is hard to implement due to cascading deletes / content depending on this user’s content. 3rd parties also have to be notified of this erasure.

**They have the right to access / download their own data.** Similarly to the previous point: write tests, use proper architecture. To ensure that users can easily understand the data they got, use both structured and unstructured (user readable formats). For the first a json/xml with schema.org ([http://schema.org/docs/schemas.html](http://schema.org/docs/schemas.html)) in mind is a good choice. The second option can be an offline html page, similar to what Twitter produces when downloading your archive.

**They have the right to edit their data.** Not to repeat things again, see the previous points’ details.

### Privacy Impact Assessment

If you’re working with large amounts of data, or on a data intensive project (such as a financial or a fitness tracker app) you need to have a PIA document. This is an open living document that can be requested upon breach or a privacy concern. You can find checklists on what to include in this online.

### Pseudonymization and encryption

Not to be confused with anonymization, pseudonymization only substitutes the identity of a Data Subject — allowing us to later re-identify the data subject based on some other information. Anonymization on the other hand destroys the identifiable data, without a way of getting it back. (Think of this like encryption vs. hashing functions.) In GDPR these two kinds of data have fairly different protection requirements, but as a general rule anything that can be pseudonymized should be, and anything that can be anonymized should be — thus ensuring the “privacy by design” motto from earlier.

Encryption is also an important factor. **As a best practice: encrypt everything, everywhere** — this means:

* data at rest (databases, tables, files…)

* data in transit (use HTTPS, it’s free with Let’s Encrypt)

* backups.

And it’s also important to point out: *base64 is not an encryption*. If you’re not sure what to use, first check your database — they usually have good options built-in.

### Read more

A few links that contain a lot more and helped me write this summary:

[https://www.smashingmagazine.com/2018/02/gdpr-for-web-developers/](https://www.smashingmagazine.com/2018/02/gdpr-for-web-developers/)

[https://techbeacon.com/15-steps-developing-eu-privacy-policy-compliant-apps](https://techbeacon.com/15-steps-developing-eu-privacy-policy-compliant-apps)

[https://sonin.agency/what-does-the-new-eu-gdpr-mean-for-your-app/](https://sonin.agency/what-does-the-new-eu-gdpr-mean-for-your-app/)

[https://cybercounsel.co.uk/data-subjects/](https://cybercounsel.co.uk/data-subjects/)

[General Data Protection Regulation - Wikipedia](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation)
