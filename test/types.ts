export type Foo = {
  bar1: string;
  bar2: number;
  bar3: boolean;
};

export interface Bar {
  foo1: string;
}

const val: string = 'here';
export { val };
