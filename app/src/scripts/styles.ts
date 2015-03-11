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
styles.mainDisplay.height = 'calc' + styles.mainDisplay.heightRawExp;

styles.subToolGroup = {};
styles.subToolGroup.heightRaw = 48;
styles.subToolGroup.height = styles.subToolGroup.heightRaw + 'px';

styles.subColumn = {};
styles.subColumn.widthRaw = 300;
styles.subColumn.width = styles.subColumn.widthRaw + 'px';

styles.window = {};
styles.window.marginRaw = 12;
styles.window.margin = styles.window.marginRaw + 'px';

styles.colors = {
  // egrid colors
  diagramBackground:  '#ffffff',
  latentBackground:   '#f2cee0',
  observedBackground: '#e3f6fd',
  selectedStroke:     '#daf984',
  stroke:             '#1f1d1e',
  edgeColor1:         '#71a9f7', // ugly property name!!
  edgeColor2:         '#df3b57'
};

export = styles;