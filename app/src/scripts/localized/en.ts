'use strict';

export var isemHeader = {
  title: () => 'Interactive Structural Equation Modeling'
};

export var isemNetworkDiagramToolGroup = {
  openAddVariable: () => 'Add Latent Variable…',
  openImportFile:  () => 'Import File…'
};

export var isemDialogAddLatentVariable = {
  title:         () => 'Add Latent Variable',
  inputLabel:    () => 'Name',
  buttonCancel:  () => 'Cancel',
  buttonPrimary: () => 'Add'
};

export var isemDialogAddRelation = {
  title:           () => 'Add Relation',
  inputLabelX:     () => 'Variable X',
  inputLabelY:     () => 'Variable Y',
  directionXtoY:   () => '↓',
  directionMutual: () => '↑↓',
  directionYtoX:   () => '↑',
  buttonCancel:    () => 'Cancel',
  buttonPrimary:   () => 'Add'
};

export var isemDialogManageRelation = {
  title:           () => 'Manage Relation',
  buttonCancel:    () => 'Cancel',
  buttonPrimary:   () => 'Remove Checked'
};

export var isemDialogImportFile = {
  title:           () => 'Import File',
  encodingUTF8:    () => 'UTF-8',
  encodingSJIS:    () => 'Shift_JIS',
  fileInput:       () => 'CSV',
  downloadSample:  () => 'Download a sample',
  buttonCancel:    () => 'Cancel',
  buttonPrimary:   () => 'Import'
};