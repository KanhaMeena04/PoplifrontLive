import React from 'react';
import PolicyLayout, { PolicyBlock } from './PolicyLayout';
import legalData from '../../json/legal.json';

/**
 * Keeps the existing /cookies route working with the cookie notice content
 * already stored in src/json/legal.json (no content is invented here).
 */
const cookiesDoc = legalData.cookies;

const blocks: PolicyBlock[] = cookiesDoc.content.flatMap(
  (block): PolicyBlock[] => {
    if (block.type === 'h2') {
      return [{ type: 'h2', text: block.text }];
    }
    if (block.type === 'p') {
      return [{ type: 'p', text: block.text }];
    }
    if (block.type === 'ul' && 'items' in block && Array.isArray(block.items)) {
      return [
        {
          type: 'ul',
          items: block.items.filter(
            (item: unknown): item is string => typeof item === 'string'
          )
        }
      ];
    }
    return [];
  }
);

const CookiesPolicy: React.FC = () => {
  return (
    <PolicyLayout
      title={cookiesDoc.title}
      metaDescription="Popli Cookie Policy: information about cookies and how Popli manages consent, tracking, and telemetry data."
      currentPath="/cookies"
      blocks={[
        ...blocks,
        { type: 'meta', lines: [`**Last Updated:** ${cookiesDoc.lastUpdated}`] }
      ]}
    />
  );
};

export default CookiesPolicy;
