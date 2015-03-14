'use strict';
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
  directionXtoY:   () => '↑',
  directionMutual: () => '↑↓',
  directionYtoX:   () => '↓',
  buttonCancel:    () => 'キャンセル',
  buttonClose:     () => '閉じる',
  buttonPrimary:   () => '追加'
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

export var isemDialogManageRelation = {
  title:           () => 'パスの管理',
  buttonCancel:    () => 'キャンセル',
  buttonPrimary:   () => 'チェックしたパスを削除'
};

export var isemDialogRenameVariable = {
  title:         () => '変数名を変更',
  inputLabel:    () => '変数名',
  buttonCancel:  () => 'キャンセル',
  buttonPrimary: () => 'OK'
};

export var isemGuiNewLatentVariable = {
  defaultVariableName: () => '名称未設定',
  label:               () => '新規潜在変数'
};

export var isemHeader = {
  title: () => '共分散構造分析'
};

export var isemNetworkDiagramToolGroup = {
  openAddVariable:     () => '潜在変数を追加…',
  openImportFile:      () => '読み込み…',
  updateDiagram:       () => '更新'
};