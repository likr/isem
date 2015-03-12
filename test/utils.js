'use strict';

export function allReset(stubs) {
  Object.keys(stubs).forEach(v => stubs[v].reset());
}