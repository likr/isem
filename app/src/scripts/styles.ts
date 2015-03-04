'use strict';
var styles: any = {};

styles.isemHeader = {};
styles.isemHeader.heightRaw = 48;
styles.isemHeader.height = styles.isemHeader.heightRaw + 'px';

styles.isemFooter = {};
styles.isemFooter.heightRaw = 24;
styles.isemFooter.height = styles.isemFooter.heightRaw + 'px';

styles.mainToolGroup = {};
styles.mainToolGroup.heightRaw = 60;
styles.mainToolGroup.height = styles.mainToolGroup.heightRaw + 'px';

styles.mainValueGroup = {};
styles.mainValueGroup.heightRaw = 168;
styles.mainValueGroup.height = styles.mainValueGroup.heightRaw + 'px';

styles.mainDisplay = {};
styles.mainDisplay.heightRawExp = ['(100vh', '-', styles.isemHeader.height, '-', styles.isemFooter.height, ')'].join(' ');
styles.mainDisplay.height = 'calc' + styles.mainDisplay.heightRawExp

styles.subToolGroup = {};
styles.subToolGroup.heightRaw = 48;
styles.subToolGroup.height = styles.subToolGroup.heightRaw + 'px';

styles.subColumn = {};
styles.subColumn.widthRaw = 300;
styles.subColumn.width = styles.subColumn.widthRaw + 'px';

styles.colors = {
  headerText: '#f7f7f7',

  // UI background
  footerBackground:        '#e0e0e0',
  mainToolGroupBackground: '#f5f5f5',
  subColumnBackground:     '#dde2e8',
  toolGroupBackground:     '#e8e9e8',
  valueGroupBackground:    '#f0f1f3',
  headerGradation: 'linear-gradient(#585858, #434343)',

  // UI border
  footerBorder:        '#a3a3a3',
  mainToolGroupBorder: '#c7c7c7',
  subColumnBorder:     '#b8b8b8',
  subToolGroupBorder:  '#c7c7c7',
  valueGroupBorder:    '#dee1e4',

  // egrid colors
  latentBackground:   '#eeffff',
  observedBackground: '#ffeeee',
  selectedStroke:     '#55ff55'
};

export = styles;