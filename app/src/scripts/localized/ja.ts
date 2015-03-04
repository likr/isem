'use strict';

export var isemHeader = {
  title: () => '共分散構造分析'
};

export var isemDialogAddLatentVariable = {
  title:         () => '潜在変数を追加',
  inputLabel:    () => '変数名',
  buttonCancel:  () => 'キャンセル',
  buttonPrimary: () => '追加'
};

export var isemDialogAddRelation = {
  title:           () => 'パスを追加',
  inputLabelX:     () => '変数X',
  inputLabelY:     () => '変数Y',
  directionXtoY:   () => '↓',
  directionMutual: () => '↑↓',
  directionYtoX:   () => '↑',
  buttonCancel:    () => 'キャンセル',
  buttonPrimary:   () => '追加'
};