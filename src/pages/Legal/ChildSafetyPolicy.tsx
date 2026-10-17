import React from 'react';
import PolicyLayout, { PolicyBlock } from './PolicyLayout';

const blocks: PolicyBlock[] = [
  { type: 'h2', text: '1. Our Position' },
  {
    type: 'p',
    text: 'CSAM and all forms of CSAE are strictly prohibited on Popli: no exceptions. Reports involving CSAM, grooming, sexual solicitation of minors, or imminent danger to a child are treated as emergency safety matters and take absolute priority over all other reports.'
  },

  { type: 'h2', text: '2. How to Report' },
  {
    type: 'p',
    text: '**In-app:** Settings → Report a Problem → subject: "Child Safety / CSAM"'
  },
  {
    type: 'p',
    text: '**Email:** popli.founder@gmail.com → subject: "Child safety report"'
  },
  { type: 'p', text: '**External (India):** cybercrime.gov.in · Helpline: 1930' },
  {
    type: 'notice',
    text: 'If a child is in immediate danger, contact local police or emergency services first: do not wait for an online report to be processed.'
  },

  { type: 'h2', text: '3. What to Include' },
  { type: 'p', text: '**Provide:**' },
  {
    type: 'ul',
    items: [
      'Username or profile link of the account involved',
      'Link or identifier of the content (reel, comment, chat)',
      'Brief factual description of what you saw and where',
      'Your contact details (optional)'
    ]
  },
  { type: 'p', text: '**Do not:**' },
  {
    type: 'ul',
    items: [
      'Screenshot, save, copy, forward, or repost suspected CSAM: this may itself be a criminal offence under Indian law',
      'Confront the account or conduct your own investigation',
      'Send passwords, OTPs, UPI PINs, or unrelated personal data'
    ]
  },

  { type: 'h2', text: '4. How We Handle Reports' },
  {
    type: 'p',
    text: 'On receiving a credible report, authorised personnel act in this order:'
  },
  {
    type: 'ol',
    items: [
      '**Restrict:** remove or disable the reported content immediately',
      '**Contain:** suspend or terminate the account and block further contact',
      '**Prevent spread:** stop further distribution within the Platform',
      '**Preserve evidence:** securely retain records, logs, and metadata; access limited to authorised personnel only',
      '**Escalate:** report to law enforcement where required under POCSO Act, 2012 and IT Act, 2000',
      '**Document:** record the report, actions taken, and outcome'
    ]
  },
  {
    type: 'p',
    text: 'Popli does not operate an automated CSAM-detection classifier at this time. Human review of reports is our primary control.'
  },

  { type: 'h2', text: '5. Response Time' },
  {
    type: 'p',
    text: 'Child-safety reports are prioritised above all other moderation work. We do not publish a guaranteed response time as our ability to act depends on the nature and circumstances of each report. We commit to reviewing every child-safety report urgently and acting as quickly as we reasonably can.'
  },

  { type: 'h2', text: '6. Confidentiality' },
  {
    type: 'p',
    text: 'Access to reports is limited to authorised personnel only. We do not retaliate against anyone who makes a good-faith report. Absolute confidentiality cannot be guaranteed where disclosure is required by law or necessary to protect a child.'
  }
];

const ChildSafetyPolicy: React.FC = () => {
  return (
    <PolicyLayout
      title="Child Sexual Abuse and Exploitation (CSAE): Reporting Policy"
      pageTitle="Child Safety Policy"
      metaDescription="Popli Child Sexual Abuse and Exploitation (CSAE) reporting policy: our position, how to report CSAM and child safety concerns, what to include, how reports are handled, response time, and confidentiality."
      currentPath="/child-safety-policy"
      blocks={blocks}
    />
  );
};

export default ChildSafetyPolicy;
