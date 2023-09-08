/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import React, { FC, useCallback } from 'react';
import { Typography } from 'antd';

interface CopyableTextProps {
  text?: string,
  href?: string,
  target?: string,
  ellipsis?: boolean
}
const CopyableText: FC<CopyableTextProps> = ({ text, href, target = '_self', ellipsis = false }) => {
  const stopPropagation = useCallback(e => {
    e.stopPropagation();
  }, []);

  if (!text) {
    return <></>;
  }

  if (href) {
    return (
      <Typography.Link ellipsis={ellipsis} copyable href={href} target={target} onClick={stopPropagation}>
        {text}
      </Typography.Link>
    );
  }

  return (
    <Typography.Text ellipsis={ellipsis} copyable onClick={stopPropagation}>
      {text}
    </Typography.Text>
  );
};

export default CopyableText;
