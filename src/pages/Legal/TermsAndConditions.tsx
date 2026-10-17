import React from 'react';
import PolicyLayout, { PolicyBlock } from './PolicyLayout';

const blocks: PolicyBlock[] = [
  {
    type: 'p',
    text: 'THIS DOCUMENT IS AN ELECTRONIC RECORD IN TERMS OF INFORMATION TECHNOLOGY ACT, 2000 AND RULES THEREUNDER AS APPLICABLE AND THE PROVISIONS PERTAINING TO ELECTRONIC RECORDS IN VARIOUS STATUTES AS AMENDED BY THE INFORMATION TECHNOLOGY ACT, 2000.'
  },
  {
    type: 'p',
    text: 'These terms and conditions ("Terms") govern your access, registration, and use of the Popli platform ("Platform"), operated by Popli Technologies Private Limited ("Popli" / "Company" / "we" / "us" / "our"), available via the Popli mobile application. By using the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, please do not access or use the Platform.'
  },

  { type: 'h2', text: 'A. GENERAL TERMS' },

  { type: 'h3', text: 'I. ELIGIBILITY AND AGE RESTRICTION' },
  {
    type: 'ol',
    items: [
      'Popli is strictly intended for individuals who are 18 years of age or older. You must be at least 18 years old to create, register, access, or use a Popli account.',
      'By registering or using the Platform, you represent that you are at least 18 years old and that the information you provide is accurate and complete.',
      "You must not misrepresent your age, use another person's identity, or allow a person under 18 to use your account.",
      'If Popli reasonably believes that an account is operated by a person under 18 or that age information is false, Popli may restrict or suspend the account, investigate the matter, and take appropriate action in accordance with applicable law and its policies.',
      'Age eligibility does not guarantee eligibility for payments, creator rewards, KYC, or withdrawals. Those features may have additional requirements.'
    ]
  },

  { type: 'h3', text: 'II. ACCOUNT REGISTRATION AND SECURITY' },
  {
    type: 'ol',
    items: [
      'You must provide accurate information requested during registration and keep relevant account information up to date.',
      'Registration and sign-in methods are those made available in the current version of the app.',
      'You are responsible for protecting your account credentials, OTPs, passwords, and authentication tokens. Do not share them with anyone.',
      'You must notify Popli at popli.founder@gmail.com if you suspect unauthorised access to your account.',
      'Accounts may not be sold, transferred, or assigned to another person.',
      'Creating duplicate accounts, using fake identities, operating automated accounts, or manipulating referrals or rewards is prohibited.',
      'Popli may apply reasonable security, verification, and anti-abuse measures to protect the Platform and its users.'
    ]
  },

  { type: 'h3', text: 'III. PLATFORM FEATURES' },
  {
    type: 'ol',
    items: [
      'Depending on availability, eligibility, app version, and applicable programme terms, Popli may provide social profiles, video and other content sharing, feeds, likes, comments, follows, notifications, referrals, virtual coins or gifts, creator rewards, and related features.',
      'Features may change, be limited, or be discontinued where reasonably necessary for maintenance, safety, legal compliance, or service improvement. No feature is guaranteed to be available to every user at all times.'
    ]
  },

  { type: 'h3', text: 'IV. USER-GENERATED CONTENT' },
  {
    type: 'ol',
    items: [
      'You retain ownership of content that you create and upload, subject to the rights of any third parties whose material is included.',
      'You are responsible for ensuring that you have the necessary rights and permissions to upload and share videos, images, audio, music, captions, comments, and other material.',
      'By uploading content, you grant Popli a non-exclusive, worldwide, royalty-free licence to host, store, process, encode, reproduce, display, distribute, and make the content available to the extent reasonably necessary to operate, secure, provide, and improve the Platform and to carry out distribution or promotional uses that you have authorised.',
      'This licence does not transfer ownership of your content to Popli.',
      'Content you publish may be visible to other users and may be copied or redistributed by them. Removing content from Popli may not remove copies already held by other users or third parties.',
      'You must not upload content that violates applicable law, these Terms, the Community Guidelines, or another person\'s rights.'
    ]
  },

  { type: 'h3', text: 'V. PROHIBITED USE AND CONDUCT' },
  {
    type: 'p',
    text: 'You must use Popli lawfully and follow these Terms and the Community Guidelines. Prohibited conduct includes, but is not limited to:'
  },
  {
    type: 'ol',
    items: [
      'Child sexual abuse and exploitation (CSAE), child sexual abuse material (CSAM), grooming, sexual solicitation of minors, trafficking, or sexualised depictions of minors.',
      'Harassment, stalking, threats, bullying, hate speech, doxxing, or sharing private information without lawful authority.',
      'Non-consensual intimate imagery or sexual exploitation.',
      'Fraud, scams, impersonation, phishing, malware, spam, or deceptive claims about earnings.',
      'Copyright infringement or violation of intellectual property, privacy, or other legal rights.',
      'Fake views, fake engagement, engagement rings, referral abuse, self-referrals, reward farming, or attempts to bypass eligibility or KYC controls.',
      'Interfering with the security, integrity, or operation of the Platform.',
      'Evading account restrictions or using Popli for unlawful purposes.'
    ]
  },

  { type: 'h3', text: 'VI. VIRTUAL COINS AND GIFTS' },
  {
    type: 'ol',
    items: [
      'Coins are virtual items intended for use within Popli features. They are not legal tender, bank deposits, or securities.',
      'Coins do not have cash value and are not redeemable for cash unless an expressly applicable programme states otherwise.',
      'Purchase prices, available payment methods, coin quantities, and transaction details will be shown in the app before purchase.',
      'Where virtual gifts and creator earnings are available, the applicable creator share and conversion rules are determined by the programme terms or settings disclosed in the app.',
      'Popli may correct erroneous credits or reverse transactions associated with confirmed fraud or refunds, subject to applicable law and the circumstances of the transaction.',
      'Further details are provided in the Refund, Payments & Rewards Policy.'
    ]
  },

  { type: 'h3', text: 'VII. CREATOR REWARDS, REFERRALS, AND CHALLENGES' },
  {
    type: 'ol',
    items: [
      'Creator rewards, view-based rewards, referral bonuses, challenges, and similar programmes are conditional and subject to the relevant programme rules.',
      'A view, like, comment, referral, upload, or other activity does not automatically entitle you to payment.',
      'Popli may exclude activity that is invalid, duplicated, automated, manipulated, self-generated, fraudulent, or otherwise ineligible.',
      'Applicable rates, thresholds, reward calculations, caps, and other programme parameters are those communicated in the applicable programme terms or displayed in the app.',
      'Wallet balances may be provisional until the relevant activity and account have been verified and the amount is final under the programme rules.',
      'Rewards may be paused or cancelled where permitted by law while suspected fraud or policy violations are reviewed.'
    ]
  },

  { type: 'h3', text: 'VIII. PAYMENTS, WITHDRAWALS, AND KYC' },
  {
    type: 'ol',
    items: [
      'Access to purchases, paid gifts, creator rewards, KYC, and withdrawals is restricted to users aged 18 or older.',
      'Withdrawals, where available, may require identity verification, PAN verification, verified bank-account or UPI details, tax information, and additional checks required by the applicable programme or law.',
      'Applicable minimum withdrawal amounts, fees, tax deductions, and other conditions will be disclosed where applicable before you confirm a transaction or withdrawal request.',
      'Incorrect information, incomplete verification, suspected fraud, provider delays, banking issues, or legal restrictions may delay or prevent a payout.',
      'Never share your OTP, password, UPI PIN, or other authentication credentials with anyone claiming to provide support.',
      'Additional details are set out in the KYC & Data Retention Policy and Refund, Payments & Rewards Policy.'
    ]
  },

  { type: 'h3', text: 'IX. REFUNDS AND FAILED TRANSACTIONS' },
  {
    type: 'ol',
    items: [
      "Refund requests are assessed in accordance with applicable law, the relevant payment provider's rules, any applicable app-store billing requirements, and the circumstances of the transaction.",
      'If a payment is debited but the purchase is not credited, or a transaction appears duplicated or unauthorised, contact popli.founder@gmail.com with the transaction reference and relevant details.',
      'Nothing in these Terms removes statutory consumer rights available under applicable law. The detailed process is described in the Refund, Payments & Rewards Policy.'
    ]
  },

  { type: 'h3', text: 'X. CONTENT MODERATION AND ENFORCEMENT' },
  {
    type: 'ol',
    items: [
      'Popli may review reports, restrict or remove content, limit features, issue warnings, suspend or terminate accounts, and cancel rewards associated with fraud or policy violations, subject to applicable law.',
      'Serious safety concerns, including suspected CSAE or CSAM, may be escalated to appropriate authorities or reporting channels as required by law.',
      'Enforcement may depend on the severity of the issue, available evidence, repeated violations, and applicable legal requirements.',
      'You may appeal an enforcement action by emailing popli.founder@gmail.com with your username, the action being appealed, and relevant context.',
      'The Content Moderation Policy, Community Guidelines, and CSAM Reporting Policy provide further information.'
    ]
  },

  { type: 'h3', text: 'XI. INTELLECTUAL PROPERTY' },
  {
    type: 'ol',
    items: [
      'The Popli name, logo, application, interface, software, and other company materials are owned by Popli Technologies Private Limited or its licensors and are protected by applicable law.',
      'You may not copy, modify, reverse engineer, resell, or commercially exploit those materials except as permitted by law or with appropriate authorisation.',
      'Copyright or intellectual property complaints may be submitted in accordance with the Copyright & IP Complaints Policy.'
    ]
  },

  { type: 'h3', text: 'XII. ACCOUNT DELETION' },
  {
    type: 'ol',
    items: [
      'You may request account deletion by emailing popli.founder@gmail.com or by using an in-app support route if one is available. Popli may ask for information reasonably necessary to verify that the request relates to your account.',
      'Following verification, Popli will delete or anonymise personal data as appropriate, except for information that must or may be retained under applicable law or for legitimate purposes such as financial and tax records, KYC obligations, fraud prevention, security, and dispute resolution.',
      'Retained information will be handled in accordance with the Privacy Policy and KYC & Data Retention Policy.'
    ]
  },

  { type: 'h3', text: 'XIII. PRIVACY AND THIRD-PARTY SERVICES' },
  {
    type: 'ol',
    items: [
      'Popli processes personal data in accordance with its Privacy Policy and applicable law.',
      'The Platform may rely on third-party providers for services such as hosting, storage, media delivery, authentication, notifications, email, payments, payouts, and identity verification. The providers used depend on the features actually available and enabled.',
      'Third-party services may have their own terms and privacy policies. Popli remains responsible for its obligations under applicable law.'
    ]
  },

  { type: 'h3', text: 'XIV. SERVICE AVAILABILITY AND DISCLAIMERS' },
  {
    type: 'ol',
    items: [
      'The Platform is provided on an "as available" basis.',
      'Popli does not guarantee uninterrupted or error-free service, continuous availability of every feature, a particular number of views or followers, virality, earnings, challenge outcomes, or creator success.',
      'Nothing in these Terms excludes or limits liability or rights that cannot lawfully be excluded or limited, including rights under applicable consumer-protection law.'
    ]
  },

  { type: 'h3', text: 'XV. LIMITATION OF LIABILITY' },
  {
    type: 'ol',
    items: [
      'To the maximum extent permitted by applicable law, Popli will not be liable for indirect, incidental, special, or consequential losses arising from use of the Platform.',
      'This clause does not exclude or limit any liability where such exclusion or limitation is prohibited by law, or any rights available to users under mandatory consumer-protection law.'
    ]
  },

  { type: 'h3', text: 'XVI. TERM AND TERMINATION' },
  {
    type: 'ol',
    items: [
      'These Terms are concluded for an indefinite period. You may terminate your use at any time by deleting your account.',
      'Popli is entitled to terminate your access to the Platform and/or Services at any time with immediate effect if you: (a) violate or breach any term of these Terms; (b) misuse the Platform or Services; or (c) if there is reason to believe the account is being used fraudulently.',
      'Popli is not obliged to give advance notice of termination. After termination, notice will be given in accordance with these Terms.',
      'Neither party will be responsible for delays or failures resulting from acts beyond reasonable control, including strikes, riots, floods, acts of God, or similar occurrences.'
    ]
  },

  { type: 'h3', text: 'XVII. INDEMNITY' },
  {
    type: 'ol',
    items: [
      'You agree to defend, indemnify, and hold harmless Popli Technologies Private Limited, its affiliates, officers, directors, agents, and employees from any and all claims, losses, liabilities, damages, expenses, and costs (including attorney fees) arising from: (a) your use or misuse of the Platform; (b) your breach of these Terms; or (c) any third-party claims resulting from your use of the Platform.'
    ]
  },

  { type: 'h3', text: 'XVIII. GOVERNING LAW AND JURISDICTION' },
  {
    type: 'ol',
    items: [
      'These Terms are governed by the laws of India.',
      'Subject to applicable law, mandatory consumer protections, and jurisdictional rules, disputes will be subject to the jurisdiction of the competent courts at Bhilwara, Rajasthan.',
      'All disputes will first be settled amicably. If no resolution is reached within 15 (fifteen) days, disputes will be resolved through arbitration under the Arbitration and Conciliation Act, 1996, with the seat of arbitration at Bhilwara, Rajasthan.',
      'Arbitration will be conducted in English by a sole arbitrator mutually appointed by both parties. The award will be final and binding.'
    ]
  },

  { type: 'h3', text: 'XIX. CHANGES TO THESE TERMS' },
  {
    type: 'ol',
    items: [
      'Popli may update these Terms from time to time. The "Last Updated" date will be revised when changes are made.',
      'Where required by law, Popli will provide additional notice or obtain consent before changes take effect.',
      'Continued use of the Platform after changes are posted constitutes acceptance of the revised Terms.'
    ]
  },

  { type: 'h3', text: 'XX. GRIEVANCE REDRESSAL AND CONTACT' },
  { type: 'p', text: 'For questions, complaints, or grievances concerning Popli, contact:' },
  {
    type: 'contact',
    title: 'Himanshu Pandey, Founder / Grievance Contact',
    lines: [
      { label: 'Company', value: 'Popli Technologies Private Limited' },
      { label: 'Email', value: 'popli.founder@gmail.com', href: 'mailto:popli.founder@gmail.com' },
      { label: 'Phone', value: '+91 9462653101', href: 'tel:+919462653101' },
      {
        label: 'Registered Office',
        value: 'NH-27 Kesarganj, Chouraha Fatehpur, Bijolian, Bhilwara, Rajasthan - 311602'
      },
      { label: 'Website', value: 'https://www.popliapp.com', href: 'https://www.popliapp.com' }
    ]
  },
  {
    type: 'p',
    text: 'Please include your username, nature of complaint, and relevant references. Do not send passwords, OTPs, UPI PINs, or unnecessary sensitive information. Complaints will be handled in accordance with applicable law.'
  }
];

const TermsAndConditions: React.FC = () => {
  return (
    <PolicyLayout
      title="Terms and Conditions for Users"
      pageTitle="Terms and Conditions"
      metaDescription="Popli Terms and Conditions for Users: eligibility, account registration, user content, prohibited conduct, virtual coins and gifts, creator rewards, payments and KYC, moderation, intellectual property, liability, governing law, and contact details."
      currentPath="/terms"
      blocks={blocks}
    />
  );
};

export default TermsAndConditions;
