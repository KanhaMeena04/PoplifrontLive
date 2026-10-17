import React from 'react';
import PolicyLayout, { PolicyBlock } from './PolicyLayout';

const blocks: PolicyBlock[] = [
  {
    type: 'p',
    text: 'Your privacy matters to Popli Technologies Private Limited ("Company", "Popli", "we", "us" or "our").'
  },
  {
    type: 'p',
    text: 'This Privacy Policy ("Policy") describes the policies and procedures on the collection, use, processing, storage, retrieval, disclosure, transfer and protection of your information, including personal information ("Information"), that Popli may receive through your access, interaction or use of the Popli mobile application ("Popli App") or website available at https://www.popliapp.com (collectively, "Platform"), or through your offline interaction with us.'
  },
  {
    type: 'p',
    text: 'The terms "you" and "your" refer to any user of the Platform or availing the Services.'
  },
  {
    type: 'p',
    text: 'The term "Services" refers to any services offered by Popli in accordance with the Terms and Conditions available on the Platform.'
  },
  {
    type: 'p',
    text: 'Please read this Policy before using the Platform or submitting any Information to Popli. This Policy is incorporated within and to be read along with the Terms and Conditions available on the Platform.'
  },

  { type: 'h2', text: 'A. USER ACCEPTANCE' },
  {
    type: 'p',
    text: 'By accessing or using the Platform or the Services, you agree and consent to this Policy, along with any amendments made by the Company at its sole discretion and posted on the Platform from time to time.'
  },
  {
    type: 'p',
    text: 'Any collection, processing, retrieval, transfer, use, storage, disclosure and protection of your Information will be in accordance with this Policy and applicable laws including but not limited to the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 and the rules framed thereunder ("Applicable Laws"). If you do not agree with the Policy, please do not use or access the Platform.'
  },
  { type: 'p', text: 'You hereby represent to Popli that:' },
  {
    type: 'ol',
    items: [
      'The Information you provide to Popli from time to time is and will be authentic, correct, current and updated, and you have all the rights, permissions and consents as may be required to provide such Information to Popli.',
      "Your providing of the Information as well as Popli's consequent storage, collection, usage, transfer, access or processing of such Information will not be in violation of any agreement, Applicable Laws, charter documents, judgments, orders or decrees.",
      'If you disclose to us any Information relating to other people, you represent that you have the authority to do so and to permit us to use such Information in accordance with this Policy.'
    ]
  },

  { type: 'h2', text: 'B. DEFINITIONS' },
  {
    type: 'p',
    text: 'Unless otherwise provided in this Policy, the terms capitalised in the Policy shall have the meaning as provided hereunder:'
  },
  {
    type: 'ol',
    items: [
      '**"Device"** shall mean a computer, mobile or other device used to access the Services.',
      '**"Device Identifier"** shall mean the IP address or other unique identifier of the Device.',
      '**"KYC Information"** shall mean identity and financial verification data including legal name, date of birth, address, PAN, Aadhaar, bank account number, IFSC code, UPI ID and verification results.',
      '**"Personal Information"** shall mean such categories of information that could reasonably be used to identify you personally, including your name, email address, phone number and date of birth.',
      '**"Promotion"** shall mean any contest and other promotions offered by Popli.',
      '**"TPSP"** shall mean a third-party service provider.',
      '**"Usage Information"** shall have the meaning assigned to the term in Section D(II) hereto.'
    ]
  },

  { type: 'h2', text: 'C. WHAT INFORMATION DO WE COLLECT?' },
  { type: 'h3', text: 'I. INFORMATION YOU PROVIDE TO US' },
  {
    type: 'ol',
    items: [
      '**Account and Profile Information:** We collect information you provide when creating or updating your Popli account. This includes your phone number (verified via one-time passcode), Google account details (name, email address and profile identifier, if you sign in with Google), email address (if provided for password reset), date of birth (collected at sign-up to enforce minimum age requirements), and profile information such as name, username, profile photograph, biography, gender and city.',
      '**Referral Information:** If you register with a referral code or through an invite link, we collect an attribution record linking your account to the referrer.',
      '**User Content and Activity:** We collect videos (reels), stories, photographs, captions, comments, audio or music attached to content, hashtags, challenge entries and other material you upload. We also collect private messages and images exchanged in in-app chat, likes, saves, follows, views, comments, story reactions, watch history, blocked accounts and support tickets.',
      '**Wallet, Payments and Identity Information:** We collect wallet balances, ledger entries, transactions, coin purchases, gift transactions, reward eligibility and withdrawal requests. We collect payment transaction references and payment status provided by our payment provider. We do not receive or store your full card number or UPI PIN. For withdrawals and creator payouts, we collect KYC Information as detailed in the KYC & Data Retention Policy.',
      '**Support and Moderation Records:** We collect support tickets, ticket messages and their resolution status, as well as moderation records relating to reports, warnings and enforcement actions.'
    ]
  },

  { type: 'h3', text: 'II. INFORMATION WE COLLECT AS YOU ACCESS AND USE THE POPLI APP' },
  {
    type: 'ol',
    items: [
      '**Location Information:** During onboarding, you may search for a city (the search query is sent to a third-party geocoding service) or tap "Use My Current Location", which requests the device\'s foreground GPS location and converts it to a city name. Only the city name is stored on your profile. If you attach a location to a reel, post or story, the location name and its coordinates are uploaded with that content. Location permission is optional and can be denied. Popli does not request background-location permission and does not collect location when the app is not in use.',
      '**Device, Technical and Diagnostic Information ("Usage Information"):** We collect a device identifier generated by the app, app version, device and OS type, IP address and session records. We also collect push-notification tokens (FCM tokens) used to deliver notifications, crash logs and diagnostics through Sentry, usage and interaction events through Firebase Analytics, and fraud-prevention signals including IP clusters, device fingerprints and bot-protection state used to detect fake accounts and reward abuse.',
      '**Cookies:** Usage Information may be collected using cookies. You may control cookie preferences through your browser or device settings. Disabling cookies may affect the functionality of certain features.'
    ]
  },

  { type: 'h3', text: 'III. INFORMATION THIRD PARTIES PROVIDE ABOUT YOU' },
  {
    type: 'p',
    text: 'We may, from time to time, receive Information about you from our affiliates or TPSPs such as technical sub-contractors, payment service providers, verification providers, analytics providers and authentication services, as well as from publicly available sources.'
  },

  { type: 'h2', text: 'D. PERMISSIONS THE APP REQUESTS' },
  {
    type: 'ol',
    items: [
      '**Camera:** for recording reels, stories, posts and chat photos. Optional and deniable; core creation features require it.',
      '**Microphone:** for recording video audio and voiceovers. Optional and deniable.',
      '**Photos/Media Access:** for uploading gallery media to posts, stories, profile and chat. Optional and deniable.',
      '**Notifications:** for gift, comment, recharge and reward push notifications. Optional and deniable.',
      '**Location (Foreground):** for city selection at onboarding, location tags on posts and KYC address assistance. Optional and deniable; city can be typed manually.'
    ]
  },
  {
    type: 'p',
    text: 'All runtime permissions can be declined and can later be changed in device settings. Declining a permission does not block basic use of the app.'
  },

  { type: 'h2', text: 'E. USE OF INFORMATION COLLECTED' },
  {
    type: 'p',
    text: 'Our primary goal in collecting your Information is to provide you with an enhanced experience when using the Services. We may use your Information for the following purposes:'
  },
  {
    type: 'ol',
    items: [
      'To create and secure your account and verify your identity.',
      'To provide video, social, chat and content creation features.',
      'To display and personalise feeds, recommendations and search results.',
      'To calculate and pay eligible rewards, gifts, referrals and withdrawals.',
      'To operate coin purchases, refunds and the wallet economy.',
      'To verify identity and payment accounts (KYC) for financial features.',
      'To detect and prevent fraud, fake accounts, bots and reward manipulation.',
      'To moderate content and enforce our Terms and Community Guidelines.',
      'To operate reporting and grievance handling.',
      'To send service, reward and transactional notifications you are entitled to receive.',
      'To provide customer support and resolve disputes.',
      'To maintain security, audit and financial records.',
      'To comply with legal, tax and accounting obligations.',
      'To improve the reliability, safety and performance of the Platform.',
      'To fulfil any other purpose for which you provide us the Information and/or with your consent.'
    ]
  },
  {
    type: 'p',
    text: 'Where Applicable Law requires a lawful basis, we rely on: consent (for optional features such as location, optional profile fields and certain communications); performance of a contract (providing the account, wallet, rewards and payout services you request); legal obligation (tax, accounting, KYC and law enforcement requirements); and legitimate interests (security, fraud prevention, service improvement and enforcement of our rules), balanced against your rights.'
  },

  { type: 'h2', text: 'F. HOW AND WHEN DO WE DISCLOSE INFORMATION TO THIRD PARTIES' },
  {
    type: 'p',
    text: 'We do not sell, share, rent or trade the Information we have collected about you, other than as disclosed within this Policy or at the time you provide your Information. The following are the situations when Information may be shared:'
  },

  { type: 'h3', text: 'I. THIRD PARTIES PROVIDING SERVICES ON OUR BEHALF' },
  {
    type: 'nestedOl',
    items: [
      {
        text: 'We may share Information with our TPSPs who provide services on our behalf. These include:',
        children: [
          '**Cashfree:** for payment processing, payouts, identity verification, bank and UPI verification. Payment references and KYC identifiers are shared as required.',
          '**Cloudflare:** for video streaming and object storage. Uploaded media and content URLs are shared for video delivery and storage.',
          '**Google Firebase:** for authentication, push notifications and analytics. Phone verification signals, push tokens and limited diagnostics are shared.',
          '**Brevo:** for email delivery. Email addresses and one-time passcodes are shared for password-reset emails.',
          '**Photon / komoot:** for geocoding. City text entered in location search is shared.',
          '**Sentry:** for error monitoring. Crash and diagnostic events are shared for stability and security.'
        ]
      },
      {
        text: 'These TPSPs will have access to Information only to carry out the services they are performing for you or for us. We require each TPSP to maintain the same level of data protection and impose contractual obligations not to disclose or use Personal Information for any other purpose.'
      }
    ]
  },

  { type: 'h3', text: 'II. ADMINISTRATIVE AND LEGAL REASONS' },
  {
    type: 'p',
    text: 'We cooperate with Government and law enforcement officials and private parties to enforce and comply with Applicable Laws. We may access, use, preserve, transfer and disclose your Information to government or law enforcement officials or private parties as we reasonably determine is necessary and appropriate to:'
  },
  {
    type: 'ol',
    items: [
      'Satisfy any Applicable Law, regulation, subpoena, governmental request or legal process.',
      'Protect and/or defend the Terms and Conditions applicable to use of the Platform.',
      'Protect the safety, rights, property or security of the Company, our Services or any third party.',
      'Detect, prevent or otherwise address fraud, security or technical issues.',
      'Prevent or stop activity we may consider to be, or to pose a risk of being, an illegal, unethical or legally actionable activity.'
    ]
  },

  { type: 'h3', text: 'III. AFFILIATES AND BUSINESS TRANSFER' },
  {
    type: 'p',
    text: 'We may share your Information, including Personal Information, with our parent entities, subsidiaries and affiliates for internal business and operational purposes. We also reserve the right to disclose and transfer all such information: (i) to a subsequent owner, co-owner or operator of the Services or applicable database; or (ii) in connection with a corporate merger, consolidation, restructuring, sale of substantially all of our assets or other corporate change, including during the course of any due diligence process.'
  },

  { type: 'h3', text: 'IV. OTHER USERS' },
  {
    type: 'p',
    text: 'Other users see your profile, content and activity according to your settings and the nature of the feature. For example, chat messages are visible to the participants, and public reels are visible to all users.'
  },

  { type: 'h2', text: 'G. INTERNATIONAL TRANSFERS' },
  {
    type: 'p',
    text: 'Some of our TPSPs process Information outside India, for example in Singapore or other regions where the provider operates. We take reasonable steps to ensure such processing is consistent with Applicable Laws, including the Digital Personal Data Protection Act, 2023, and appropriate contractual or organisational safeguards.'
  },

  { type: 'h2', text: 'H. SECURITY' },
  {
    type: 'ol',
    items: [
      'We use transport encryption for data in transit, hashed storage of session and email-verification secrets, access-controlled administrative systems, role-based admin permissions, audit logging of sensitive administrative actions, and web-verification of payment and payout webhooks.',
      'However, no security system is impenetrable. We cannot guarantee the security of our databases, nor can we guarantee that Information you transmit to us will not be intercepted. Any Information you transmit to us, you do so at your own risk.',
      'We recommend that you do not disclose your passcodes, OTPs or UPI PINs to anyone.'
    ]
  },

  { type: 'h2', text: 'I. RETENTION AND DELETION' },
  {
    type: 'ol',
    items: [
      'We keep Personal Information for as long as necessary for the purposes described in this Policy (account operation, rewards and payouts, fraud prevention, security, disputes and legal, tax and accounting obligations), and then delete or irreversibly de-identify it.',
      'Content you delete from the app is removed from active systems. Copies may remain with users who saved or shared it, or in protected backups that expire on the backup cycle.',
      'Specific retention periods for identity and financial records are provided in the KYC & Data Retention Policy.'
    ]
  },

  { type: 'h2', text: 'J. INFORMATION OF CHILDREN' },
  {
    type: 'ol',
    items: [
      'Popli is not directed at children. The app enforces a minimum account age of 13 at sign-up and restricts real-money features, including coin purchases, gifts, creator rewards, KYC and withdrawals, to users aged 18 or above.',
      'We do not knowingly collect Personal Information from anyone below the applicable minimum age. If we learn that we have collected data from such a user, we will take steps to delete it.',
      'Refer to the Child Safety & CSAE Policy for further details.'
    ]
  },

  { type: 'h2', text: 'K. YOUR CHOICES AND RIGHTS' },
  { type: 'p', text: 'Subject to Applicable Law, you may:' },
  {
    type: 'ol',
    items: [
      'Access, correct or update your profile information in the app.',
      'Control notification settings and device permissions at any time.',
      'Block other users.',
      'Clear watch history from your device.',
      'Request a copy of your data, correction of your data, or deletion of your account and Personal Information.',
      'Withdraw consent for optional processing.',
      'Raise a grievance with our Grievance Officer.'
    ]
  },
  {
    type: 'p',
    text: 'To make a data request, email popli.founder@gmail.com from the address associated with your account, or include your registered username. We may verify your identity before acting on a request. Never send passwords, OTPs or UPI PINs.'
  },

  { type: 'h2', text: 'L. ACCOUNT DELETION' },
  {
    type: 'ol',
    items: [
      'You may request deletion of your account and associated Personal Information by emailing popli.founder@gmail.com or by raising a support ticket in the app via Settings → Report a Problem.',
      'After verification, Popli will delete or anonymise your account and Personal Information, except records we are legally required or reasonably entitled to retain, including financial, tax, KYC, fraud-prevention, security and dispute records.',
      'Retained records will continue to be processed only for those specified purposes.',
      'An in-app account-deletion control is planned. Until it is available, the email and support-ticket routes are the official channels.'
    ]
  },

  { type: 'h2', text: 'M. GRIEVANCE OFFICER' },
  {
    type: 'p',
    text: 'If you would like to ask about, make a request relating to, or complain about how we process your Information, please contact our Grievance Officer. We will attempt to expeditiously redress your grievances.'
  },
  {
    type: 'contact',
    title: 'Himanshu Pandey, Grievance Officer / Founder',
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

  { type: 'h2', text: 'N. CHANGES TO THIS POLICY' },
  {
    type: 'ol',
    items: [
      'We reserve the right to update or modify this Policy from time to time to reflect changes to our information practices. The "Last Updated" date will be revised when changes are made.',
      'Where required by law, we will provide additional notice or obtain consent before changes take effect.',
      'Your continued use of the Platform after an updated Policy becomes effective will indicate your acceptance of the updated Policy.'
    ]
  },

  {
    type: 'meta',
    lines: ['**Effective Date:** 16 October 2026', '**Last Updated:** 16 October 2026']
  }
];

const PrivacyPolicy: React.FC = () => {
  return (
    <PolicyLayout
      title="Privacy Policy"
      metaDescription="Popli Privacy Policy: how Popli Technologies Private Limited collects, uses, stores, shares and protects your information, your choices and rights, account deletion, and grievance officer contact details."
      currentPath="/privacy-policy"
      blocks={blocks}
    />
  );
};

export default PrivacyPolicy;
