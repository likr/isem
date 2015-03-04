'use strict';

export var isemHeader = {
  title: () => 'Interactive Structural Equation Modeling'
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