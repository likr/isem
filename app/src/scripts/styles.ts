'use strict';
var styles: any = {};

styles.isemHeader = {
  height: '5em'
};

styles.isemFooter = {
  height: '120px'
};

var heightRawExp = '(100vh - ' + styles.isemHeader.height + ' - ' + styles.isemFooter.height + ')';
styles.mainDisplay = {
  heightRawExp: heightRawExp,
  height:       'calc' + heightRawExp
};

styles.clearBootstrapMargin = {
  'margin-left': '-15px'
};

export = styles;