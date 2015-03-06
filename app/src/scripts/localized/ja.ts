'use strict';

export var isemHeader = {
  title: () => '共分散構造分析'
};

export var isemNetworkDiagramToolGroup = {
  openAddVariable: () => '潜在変数を追加…',
  openImportFile:  () => '読み込み…'
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

export var isemDialogManageRelation = {
  title:           () => 'パスの管理',
  buttonCancel:    () => 'キャンセル',
  buttonPrimary:   () => 'チェックしたパスを削除'
};

export var isemDialogImportFile = {
  title:           () => 'ファイル読み込み',
  encodingUTF8:    () => 'UTF-8',
  encodingSJIS:    () => 'Shift_JIS',
  fileInput:       () => 'CSVファイル',
  downloadSample:  () => 'サンプルファイル',
  buttonCancel:    () => 'キャンセル',
  buttonPrimary:   () => 'OK'
};