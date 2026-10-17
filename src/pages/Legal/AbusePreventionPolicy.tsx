import React from 'react';
import PolicyLayout, { PolicyBlock } from './PolicyLayout';

const blocks: PolicyBlock[] = [
  {
    type: 'p',
    text: 'Popli is a platform built to bring joy, creativity, and connection to our users. We are committed to building strong policies and tools that make Popli a safe space, especially when it comes to protecting children from exploitation and abuse.'
  },
  {
    type: 'p',
    text: 'Our approach to user safety spans policies, practices, product, people, and partners. We want to be transparent about our efforts to prevent and remove Child Sexual Abuse Material (CSAM) and any content that exploits or endangers minors.'
  },
  {
    type: 'p',
    text: 'This area is critically important, and Popli maintains a zero tolerance policy for predatory or grooming behaviour of any kind.'
  },

  { type: 'h2', text: 'Policies' },
  {
    type: 'p',
    text: 'We strictly prohibit any content that depicts, promotes, or disseminates child abuse, child nudity, or the sexual exploitation of children, in digital or real-world format.'
  },
  {
    type: 'p',
    text: 'If we become aware of any such content, which is in direct violation of our Terms and Conditions and Community Guidelines, we will take immediate action to:'
  },
  {
    type: 'ul',
    items: [
      'Remove the content from the Platform without delay.',
      'Terminate the account(s) involved.',
      'Report the case to the Cyber Crime Unit, National Commission for Protection of Child Rights (NCPCR), and other relevant law enforcement agencies as required under applicable Indian law.'
    ]
  },
  {
    type: 'p',
    text: 'We are committed to supporting global and national frameworks that address online child sexual exploitation and abuse, including collaboration with governments, NGOs, and industry bodies to promote a safer online environment for all users.'
  },

  { type: 'h2', text: 'People' },
  {
    type: 'p',
    text: 'Our Trust and Safety function includes team members with backgrounds in product, policy, compliance, child safety, and law. We work to ensure that our moderation policies are designed and executed with both Indian legal requirements and local cultural context in mind.'
  },
  {
    type: 'p',
    text: 'Our safety leads collaborate with regulators, policymakers, and law enforcement agencies to uphold the highest possible standards of user safety on the Platform.'
  },

  { type: 'h2', text: 'Practices' },
  {
    type: 'p',
    text: 'We employ a combination of human review and automated detection tools to identify and remove exploitative content. Our measures include:'
  },
  {
    type: 'ul',
    items: [
      'Filtering red-flag language and behaviour patterns associated with grooming.',
      'Reviewing reported accounts and content on priority.',
      'Escalating confirmed or suspected CSAM cases to appropriate authorities as required by law.',
      'Maintaining moderation records for enforcement and audit purposes.'
    ]
  },
  {
    type: 'p',
    text: 'We are mindful that publicly disclosing every detail of our detection methods risks tipping off bad actors. We share what we can while protecting the integrity of our safety systems.'
  },

  { type: 'h2', text: 'Product' },
  {
    type: 'p',
    text: 'Popli is a platform intended for users aged 13 and above. Real-money features, including coin purchases, virtual gifts, creator rewards, and withdrawals, are restricted to users aged 18 and above.'
  },
  {
    type: 'p',
    text: 'We have built several controls directly into the app to give users and families greater safety and peace of mind:'
  },
  {
    type: 'ul',
    items: [
      'Ability to make your account private.',
      'Controls to restrict who can comment on or interact with your content.',
      'Ability to block any user.',
      'In-app reporting tools to flag content or accounts that may violate our guidelines.'
    ]
  },
  {
    type: 'p',
    text: 'We encourage our community to actively report content or accounts that appear to be in violation of our Community Guidelines. Every report is reviewed and taken seriously.'
  },

  { type: 'h2', text: 'Partners' },
  {
    type: 'p',
    text: 'We are committed to working with organisations that support child safety and online protection. We align our policies and practices with national and international frameworks addressing child sexual exploitation and abuse online, and we continue to build partnerships with NGOs, legal experts, and safety-focused bodies to strengthen our approach over time.'
  },

  { type: 'h2', text: 'Our Commitment' },
  {
    type: 'p',
    text: 'There is no finish line when it comes to safety on Popli. We work every day to learn, adapt, and improve our policies, tools, and practices to keep our community, especially our youngest and most vulnerable users, protected.'
  },
  {
    type: 'p',
    text: 'If you come across any content or behaviour on Popli that you believe violates our child safety policies, please report it immediately through the app or contact us directly at **popli.founder@gmail.com**.'
  },
  {
    type: 'p',
    text: '**Related Policies:** Child Safety & CSAE Policy · CSAM Reporting Policy · Community Guidelines · Content Moderation Policy · Terms and Conditions'
  }
];

const AbusePreventionPolicy: React.FC = () => {
  return (
    <PolicyLayout
      title="Protecting Against Exploitative Content"
      byline="By Himanshu Pandey, Founder, Popli"
      metaDescription="How Popli protects users, and children in particular, from exploitation and abuse: policies, people, practices, product controls, partners, and our commitment to safety."
      currentPath="/abuse-prevention-policy"
      blocks={blocks}
    />
  );
};

export default AbusePreventionPolicy;
