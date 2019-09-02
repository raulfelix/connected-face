import React from 'react';
import Responsive from 'react-responsive';

export const Desktop = props => <Responsive {...props} minWidth={992} />;
export const Tablet = props => <Responsive {...props} minWidth={768} />;
export const Mobile = props => <Responsive {...props} maxWidth={767} />;
export const Tiny = props => <Responsive {...props} minWidth={481} />;

export default {
  tiny: 'only screen and (max-width: 481px)',
  mobile: 'only screen and (max-width: 767px)',
  tablet: 'only screen and (min-width: 768px)',
};
