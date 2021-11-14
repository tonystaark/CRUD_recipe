import React from 'react';
import { PageHeader } from 'antd';

interface CustomPageHeaderProps {
  title: string;
  subtitle: string;
  onClickAction?: () => void;
}


const CustomPageHeader = ({title, subtitle, onClickAction}: CustomPageHeaderProps) => {

  return (
    <PageHeader
      className="site-page-header"
      onBack={onClickAction}
      title={title}
      subTitle={subtitle}
    />)
}

export default CustomPageHeader;