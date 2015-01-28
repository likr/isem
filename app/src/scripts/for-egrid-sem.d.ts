declare module Svg {
  export class Point {
    x: number;
    y: number;
  }
}

declare module egrid {
  /**
   * @see {@link https://github.com/likr/egrid-core/blob/cce2cd81a30c098cb5d4a4cd38be92be5105b941/ts/egrid/grid.ts#L8}
   */
  export interface NodeInstance {
    index : number;
    x : number;
    y : number;
    baseWidth : number;
    baseHeight : number;
    width : number;
    height : number;
    theta : number;
    text : string;
    dagre : any;
    weight : number;
    key : number;
    original : boolean;
    isTop : boolean;
    isBottom : boolean;
    active : boolean;
    participants : string[];
  }

  export interface NodeConstructor {
    new(text: string, weight?: number, original?: boolean, participants?: string[]): NodeInstance;
  }

  /**
   * @see {@link https://github.com/likr/egrid-core/blob/cce2cd81a30c098cb5d4a4cd38be92be5105b941/ts/egrid/grid.ts#L82}
   */
  export interface LinkInstance {
    index : number;
    points : Svg.Point[];
    previousPoints : Svg.Point[];
    dagre : any;
    weight : number;
    key : number;
    source: NodeInstance;
    target: NodeInstance;
    coef: any;
  }

  export interface LinkConstructor {
    new(source: NodeInstance, target: NodeInstance, weight?: number): LinkInstance;
  }

  /**
   * @see {@link https://github.com/likr/egrid-core/blob/cce2cd81a30c098cb5d4a4cd38be92be5105b941/ts/egrid/sem.ts}
   */
  export interface SEMInstance {
    // extends from egrid.DAG
    nodes(): NodeInstance[];
    nodes(nodes: NodeInstance[]): SEMInstance;

    links() : LinkInstance[];
    links(links: LinkInstance[]): SEMInstance;

    registerUiCallback(callback: () => void): SEMInstance;
    display(regionWidth?: number, regionHeight?: number): (selection: D3.Selection) => void

    // declaration by egrid.SEM
    activeNodes(): NodeInstance[];
    activeLinks(): LinkInstance[];
    draw(): egrid.SEMInstance;
    focusCenter(): egrid.SEMInstance;
  }

}

/**
 * from root/app/lib/egrid.js
 */
interface ModuleEgrid {
  sem(): egrid.SEMInstance;
  Node: egrid.NodeConstructor;
  Link: egrid.LinkConstructor;
}

/**
 * @see {@link http://hyperinfo.viz.media.kyoto-u.ac.jp/wsgi/websem/static/sem.js}
 */
declare var sem: (
  n: number,
  alpha: [number, number][],
  sigma: [number, number][],
  S: number[][],
  callback: Function
) => void;

declare var cov: (data: string[][], callback: Function) => void;

declare var typeSDict: {
  [node1Text: string]: {
    [node2Text: string]: number
  }
};

declare var typeNodesDict: {[nodeText: string]: number};

declare var typeLink: {source: number; target: number};

interface SemResult {
  GFI: number;
  alpha: number[][];
  sigma: number[][];
}

interface Scope extends ng.IScope {
  gfiValue: any;
  linkText: string;
  loadFile: Function;
  removeNode: Function;
  items: any;
}

declare module egrid {
  export interface EventAltered extends Event {
    target: TargetAltered;
  }

  interface TargetAltered extends EventTarget {
    result: string;
  }
}