'use strict';

export function resetAll(stubs) {
  Object.keys(stubs).forEach(v => stubs[v].reset());
}

export function restoreAll(stubs) {
  Object.keys(stubs).forEach(v => stubs[v].restore());
}