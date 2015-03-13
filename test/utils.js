'use strict';

export function allReset(stubs) {
  Object.keys(stubs).forEach(v => stubs[v].reset());
}

export function allRestore(stubs) {
  Object.keys(stubs).forEach(v => stubs[v].restore());
}