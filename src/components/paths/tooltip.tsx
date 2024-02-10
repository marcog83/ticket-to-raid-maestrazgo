import { FC } from 'react';
import RCTooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

export const Tooltip:FC<{ tooltip:string }> = ({ children, tooltip }) => (
  <RCTooltip overlay={tooltip}>
    {children}
  </RCTooltip>
);
