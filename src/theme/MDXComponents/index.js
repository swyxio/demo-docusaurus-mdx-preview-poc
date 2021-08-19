/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { isValidElement } from 'react';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';
import Details from '@theme/Details';
const MDXComponents = {
  code: (props) => {
    const { children } = props; // For retrocompatibility purposes (pretty rare use case)
    // See https://github.com/facebook/docusaurus/pull/1584

    if (isValidElement(children)) {
      return children;
    }

    return !children.includes('\n') ? (
      <code {...props} />
    ) : (
      <CodeBlock {...props} />
    );
  },
  a: (props) => <Link {...props} />,
  pre: (props) => {
    const { children } = props; // See comment for `code` above

    if (isValidElement(children?.props?.children)) {
      return children?.props.children;
    }

    return (
      <CodeBlock
        {...(isValidElement(children) ? children?.props : { ...props })}
      />
    );
  },
  details: (props) => {
    const items = React.Children.toArray(props.children); // Split summary item from the rest to pass it as a separate prop to the Detais theme component

    const summary = items.find((item) => item?.props?.mdxType === 'summary');
    const children = <>{items.filter((item) => item !== summary)}</>;
    return (
      <Details {...props} summary={summary}>
        {children}
      </Details>
    );
  },
  h1: Heading('h1'),
  h2: Heading('h2'),
  h3: Heading('h3'),
  h4: Heading('h4'),
  h5: Heading('h5'),
  h6: Heading('h6'),
  preview: Preview,
};
export default MDXComponents;


function Preview({ page: {
  frontMatter,
  metadata,
  // contentTitle // doesnt seem to work yet
}, children }) {
  const [show, setShow] = React.useState(false)
  return <span
    onMouseEnter={() => setShow(true)}
    onMouseLeave={() => setShow(false)}
    style={{ position: 'relative', display: 'inline-block' }}
  ><a href={metadata.permalink}>{children} <InfoIcon /></a>
    {show && <div
      style={{
        position: 'absolute',
        zIndex: 1,
        width: 200,
        borderRadius: 6,
      }}>
      <div style={{ padding: 2, fontSize: '1.5rem', fontStyle: 'bold', backgroundColor: 'black', color: '#f2f2f2' }}>{frontMatter.title}</div>
      <div
        style={{
          backgroundColor: '#f2f2f2',
          padding: 10,
        }}
      >
        <span>{metadata.description}</span>
        <span style={{ marginTop: '1rem', display: 'block' }}> <a href={metadata.permalink}>see full article >></a> </span>
      </div></div>}
  </span>
}

function InfoIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" height="1rem" width="1rem" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
}