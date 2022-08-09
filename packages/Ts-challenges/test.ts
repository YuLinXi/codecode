type GetReturnType<Func extends Function> =
    Func extends (...args: any[]) => infer ReturnType
        ? ReturnType : never;

class Dong {
  name: string;

  constructor() {
    this.name = 'dong';
  }

  hello(this: Dong) {
    return `hello, I'm ${this.name}`;
  }
}

const dong = new Dong();

type GetThisParameterType<T>
  = T extends (this: infer ThisType, ...args: any[]) => any
    ? ThisType
    : unknown;

type DongThis = GetThisParameterType<typeof dong.hello>

type CapitalizeStr<Str extends string> =
    Str extends `${infer First}${infer Rest}`
        ? `${Uppercase<First>}${Rest}` : Str;

type CamelCase<Str extends string> =
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Right}${Rest}`
    : '';

type t = CamelCase<'_dong_dong'>

type ToMutable<T> = {
  -readonly [Key in keyof T]: T[Key]
}

type a = ToMutable<{readonly a: string}>
