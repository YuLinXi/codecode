## TypeScript 类型体操通关秘籍

### 基础类型运算

- 条件：`extends ? : `
- 推导：`infer`
- 联合：`|`
- 交叉：`&`
- 映射：`[Key in keyof T as ... ]`、

### 套路一 模式匹配做提取

主要以 `extends` 、`infer` 、`keyof` 配合实现；

#### 数组类型

##### First、Last

```typescript
type GetFirst<Arr extends unknown[]> = 
  Arr extends [infer First, ...unknown[]] ? First : never

type GetLast<Arr extends unknown[]> = 
  Arr extends [... unknown[], infer Last] ? Last : never
```

##### Pop、Shift

```typescript
type PopArr<Arr extends unknown[]> = 
  Arr extends [] ? [] 
    : Arr extends [...infer Rest, unknown] ? Rest : never;

type ShiftArr<Arr extends unknown[]> = 
  Arr extends [] ? [] 
    : Arr extends [unknown, ...infer Rest] ? Rest : never;
```

#### 字符串类型

##### StartsWith

```typescript
type StartsWith<Str extends string, Prefix extends string> = 
  Str extends `${Prefix}${string}` ? true : false;
```

##### Replace

```typescript
type ReplaceStr<
    Str extends string,
    From extends string,
    To extends string
> = Str extends `${infer Prefix}${From}${infer Suffix}` 
        ? `${Prefix}${To}${Suffix}` : Str;
```

##### Trim

```typescript
type TrimStrRight<Str extends string> = 
  Str extends `${infer Rest}${' ' | '\n' | '\t'}` 
    ? TrimStrRight<Rest> : Str;

type TrimStrLeft<Str extends string> = 
  Str extends `${' ' | '\n' | '\t'}${infer Rest}` 
    ? TrimStrLeft<Rest> : Str;

type TrimStr<Str extends string> =TrimStrRight<TrimStrLeft<Str>>;
```

#### 函数

##### GetParameters

```typescript
type GetParameters<Func extends Function> = 
  Func extends (...args: infer Args) => unknown ? Args : never;
```

##### GetReturnType

```typescript
type GetReturnType<Func extends Function> = 
  Func extends (...args: any[]) => infer ReturnType 
    ? ReturnType : never;
```

##### GetThisParameterType

**方法里可以调用 this**

```typescript
// 代码
class Dong {
  name: string;
  constructor() {
    this.name = "dong";
  }
  hello(this: Dong) {
    return 'hello, I\'m ' + this.name;
  }
}

const dong = new Dong();

// 类型
type GetThisParameterType<T> 
  = T extends (this: infer ThisType, ...args: any[]) => any 
    ? ThisType 
    : unknown;

type res = GetThisParameterType<typeof dong.hello>;
```

#### 构造器

##### GetInstanceType

```typescript

interface Person {
    name: string;
}

interface PersonConstructor {
    new(name: string): Person;
}

type GetInstanceType<
  T extends new (...args: any) => any
> = T extends new (...args: any) => infer InstanceType 
    ? InstanceType 
      : any;

// 使用
type res = GetInstanceType<PersonConstructor>
```

##### GetConstructorParameters

```typescript 
type GetConstructorParameters<
    T extends new (...args: any) => any
> = T extends new (...args: infer ParametersType) => any
    ? ParametersType
    : never;
```
#### 索引类型

##### GetRefProps

```typescript
type GetRefProps<Props> = 
  'ref' extends keyof Props
    ? Props extends { ref?: infer Value | undefined}
      ? Value
      : never
    : never;
```

### 套路二 重新构造做变换

#### 数组的重新构造

##### Push、Unshift

```typescript
type Push<Arr extends  unknown[], Ele> = [...Arr, Ele];

type Unshift<Arr extends  unknown[], Ele> = [Ele, ...Arr];
```

##### Zip

```typescript
// [1,2]、['guang', 'dong'] => [[1, 'guang'], [2, 'dong']]
type Zip<One extends unknown[], Other extends unknown[]> = 
  One extends [infer OneFirst, ...infer OneRest]
    ? Other extends [infer OtherFirst, ...infer OtherRest]
      ? [[OneFirst, OtherFirst], ...Zip<OneRest, OtherRest>]: []
        : [];
```

#### 字符串类型的重新构造

##### CapitalizeStr

```typescript
type UpFirstLetter<Str extends string> = 
  Str extends `${infer First}${infer Rest}` 
    ? `${Uppercase<First>}${Rest}` : Str;
```

##### CamelCase

```typescript
// dong_dong_dong => dongDongDong 
type CamelCase<Str extends string> = 
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
    : Str;
```

##### DropSubStr

```typescript
type DropSubStr<Str extends string, SubStr extends string> = 
  Str extends `${infer Prefix}${SubStr}${infer Suffix}` 
    ? DropSubStr<`${Prefix}${Suffix}`, SubStr>
    : Str;
```

#### 函数类型的重新构造

```typescript
type AppendArgument<Func extends Function, Arg> = 
  Func extends (...args: infer Args) => infer ReturnType 
    ? (...args: [...Args, Arg]) => ReturnType : never;
```

#### 索引类型的重新构造

##### Mapping

```typescript
type Mapping<Obj extends object> = { 
    [Key in keyof Obj]: [Obj[Key], Obj[Key], Obj[Key]]
}
```

##### UppercaseKey

```typescript
// { aa: string } => { AA: string }
type UppercaseKey<T extends Record<string, any>> = { 
  [Key in keyof T as Uppercase<Key & string>]: T[Key]
}
```

##### ToReadonly、ToPartial、ToMutable、ToRequired

```typescript
type ToReadonly<T> =  {
  readonly [Key in keyof T]: T[Key];
}

type ToPartial<T> = {
  [Key in keyof T]?: T[Key]
}

// { readonly a: string } => { a: string }
type ToMutable<T> = {
  -readonly [Key in keyof T]: T[Key]
}

// { name?: string; age: number } => { name: string; age: number }
type ToRequired<T> = {
  [Key in keyof T]-?: T[Key]
}
```
##### FilterByValueType

```typescript
type FilterByValueType<
  T extends Record<string, any>, 
  ValueType
> = {
  [Key in keyof T 
    as T[Key] extends ValueType ? Key : never]: T[Key]
}
```
