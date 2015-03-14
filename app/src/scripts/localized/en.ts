'use strict';
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
  directionXtoY:   () => '↑',
  directionMutual: () => '↑↓',
  directionYtoX:   () => '↓',
  buttonCancel:    () => 'Cancel',
  buttonClose:     () => 'Close',
  buttonPrimary:   () => 'Add'
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

export var isemDialogManageRelation = {
  title:           () => 'Manage Relation',
  buttonCancel:    () => 'Cancel',
  buttonPrimary:   () => 'Remove Checked'
};

export var isemDialogRenameVariable = {
  title:         () => 'Rename Variable',
  inputLabel:    () => 'Name',
  buttonCancel:  () => 'Cancel',
  buttonPrimary: () => 'Rename'
};

export var isemGuiNewLatentVariable = {
  defaultVariableName: () => 'Untitled',
  label:               () => 'New Latent Variable'
};

export var isemHeader = {
  title: () => 'Interactive Structural Equation Modeling'
};

export var isemNetworkDiagramToolGroup = {
  openAddVariable: () => 'Add Latent Variable…',
  openImportFile:  () => 'Import File…',
  updateDiagram:   () => 'Update'
};