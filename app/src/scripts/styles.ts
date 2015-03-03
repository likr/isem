'use strict';
var styles: any = {};

styles.isemHeader = {};
styles.isemHeader.heightRaw = 48;
styles.isemHeader.height = styles.isemHeader.heightRaw + 'px';

styles.isemFooter = {};
styles.isemFooter.heightRaw = 24;
styles.isemFooter.height = styles.isemFooter.heightRaw + 'px';

styles.mainDisplay = {};
styles.mainDisplay.heightRawExp = ['(100vh', '-', styles.isemHeader.height, '-', styles.isemFooter.height, ')'].join(' ');
styles.mainDisplay.height = 'calc' + styles.mainDisplay.heightRawExp

styles.clearBootstrapMargin = {
  'margin-left': '-15px'
};

styles.colors = {
  footerBackground:    '#e0e0e0',
  footerBorder:        '#a3a3a3',
  subColumnBackground: '#dde2e8',
  subColumnBorder:     '#b8b8b8',
  headerText:          '#f7f7f7',
  headerGradation:     'linear-gradient(#585858, #434343)'
};

export = styles;