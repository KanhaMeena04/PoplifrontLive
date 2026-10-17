import React from 'react';
import PolicyLayout, { PolicyBlock } from './PolicyLayout';

const blocks: PolicyBlock[] = [
  {
    type: 'p',
    text: 'These Guidelines apply to everything on Popli: videos, stories, captions, comments, chat messages, usernames, profile information, challenge entries, gifts, referrals, and all other activity. They exist to keep Popli safe and enjoyable for everyone. Breaching them may result in content removal, feature restrictions, reward cancellation, warnings, shadow-bans, suspension, or permanent termination.'
  },

  { type: 'h2', text: '1. Child Safety: Zero Tolerance' },
  {
    type: 'p',
    text: 'The following are absolutely prohibited and treated as urgent safety matters:'
  },
  {
    type: 'ul',
    items: [
      'Creating, requesting, uploading, possessing, sharing, promoting, or linking to child sexual abuse material (CSAM)',
      'Child sexual abuse and exploitation (CSAE) in any form, including grooming, sexual solicitation of a minor, sexual exploitation, child trafficking, and sexualised depictions of minors, including synthetic, AI-generated, or manipulated material',
      'Using Popli to locate, contact, groom, exploit, or endanger a child'
    ]
  },
  {
    type: 'notice',
    text: 'Accounts involved in CSAE or CSAM will be permanently terminated and escalated to competent authorities as required by law.'
  },

  { type: 'h2', text: '2. Respect People' },
  {
    type: 'p',
    text: 'No threats, stalking, bullying, targeted harassment, humiliating campaigns, intimidation, or sharing of private personal information (doxxing). Encouraging others to harass a person is equally prohibited.'
  },

  { type: 'h2', text: '3. Hate and Violence' },
  {
    type: 'p',
    text: 'Do not promote hatred, dehumanisation, discrimination, or abuse against people on the basis of religion, caste, ethnicity, nationality, gender, gender identity, sexual orientation, disability, or disease. Do not post credible threats of violence, violent extremist content, or graphic violence intended to shock or harass.'
  },

  { type: 'h2', text: '4. Intimate Privacy' },
  {
    type: 'p',
    text: 'Non-consensual intimate or sexual imagery, sexual exploitation or coercion, and manipulated intimate imagery (including deepfakes or AI-altered content) shared without consent are strictly prohibited.'
  },

  { type: 'h2', text: '5. Illegal and Dangerous Activity' },
  {
    type: 'p',
    text: 'Do not use Popli to facilitate crime, trafficking, exploitation, self-harm, suicide, or dangerous activities or challenges likely to cause serious physical harm. Do not provide instructions for weapons, drugs, or other illegal goods and services.'
  },

  { type: 'h2', text: '6. Deception, Scams and Impersonation' },
  {
    type: 'ul',
    items: [
      'No scams, phishing, fraudulent schemes, fake giveaways, or fabricated endorsements',
      'No impersonation of real people, brands, or other accounts in a way that misleads others',
      'Do not promise guaranteed earnings, guaranteed virality, or fixed income from Popli: any description of Popli earning features must be accurate and reflect current rules as shown in the app',
      'Disclose synthetic or materially edited media where required by law or by in-app labelling features'
    ]
  },

  { type: 'h2', text: '7. Spam and Platform Integrity' },
  {
    type: 'p',
    text: 'The following are prohibited: spam, repetitive or unsolicited posting, comment flooding, mass following, malware, and deceptive links. Also prohibited: fake accounts, bots, automated engagement, fake or purchased views, engagement rings, self-viewing for rewards, referral abuse including self-referral and duplicate-account farming, and any attempt to bypass KYC, minimum-age, or withdrawal controls.'
  },

  { type: 'h2', text: '8. Intellectual Property' },
  {
    type: 'p',
    text: 'Upload only content you created, own, or are authorised to use, including music, footage, images, performances, and artwork. Giving credit does not substitute for permission.'
  },

  { type: 'h2', text: '9. Promotions and Commercial Content' },
  {
    type: 'p',
    text: 'No misleading advertising or prohibited promotions. Any sponsored or commercial content must comply with applicable law and must not make unsupported earning or investment claims about Popli or any other service.'
  },

  { type: 'h2', text: '10. How to Report' },
  {
    type: 'p',
    text: '**In-app:** Settings → Report a Problem → raise a support ticket with the username, content link or identifier, and a brief description.'
  },
  {
    type: 'p',
    text: '**Email:** popli.founder@gmail.com: include the username, content link or identifier, and a short description.'
  },
  {
    type: 'p',
    text: 'For suspected CSAM or CSAE, follow the dedicated instructions in our CSAM Reporting Policy. Do not download, screenshot, copy, attach, or forward suspected CSAM.'
  },
  {
    type: 'p',
    text: 'You may also block any user directly from their profile or from a chat conversation to prevent further contact.'
  },
  {
    type: 'notice',
    text: 'Note: The report option currently shown on individual posts and stories is being upgraded. Until it is fully connected, please use the support ticket or email route: both are monitored and reach a human reviewer.'
  },

  { type: 'h2', text: '11. Appeals' },
  {
    type: 'p',
    text: 'If you believe an enforcement action was made in error, email popli.founder@gmail.com with your username, the action taken, and relevant context. We review all appeals and may uphold, modify, or reverse a decision. Restoration is not guaranteed. Retaliation against anyone who reports concerns in good faith is prohibited.'
  },

  { type: 'h2', text: '12. Contact' },
  {
    type: 'contact',
    title: 'Himanshu Pandey, Grievance Officer / Founder',
    lines: [
      { label: 'Email', value: 'popli.founder@gmail.com', href: 'mailto:popli.founder@gmail.com' },
      { label: 'Phone', value: '+91 9462653101', href: 'tel:+919462653101' },
      {
        label: 'Registered Address',
        value: 'NH-27 Kesarganj, Chouraha Fatehpur, Bijolian, Bhilwara, Rajasthan - 311602'
      }
    ]
  }
];

const CommunityGuidelines: React.FC = () => {
  return (
    <PolicyLayout
      title="Community Guidelines"
      metaDescription="Popli Community Guidelines: rules covering child safety, respect, hate and violence, intimate privacy, illegal activity, deception, spam, intellectual property, promotions, reporting, appeals, and contact details."
      currentPath="/community-guidelines"
      blocks={blocks}
    />
  );
};

export default CommunityGuidelines;
