# TypeScript 中常用的内置函数


# as T

类型断言

```typescript
const a = 1 as any

type A = typeof a // any
```

# extends

1. 继承
2. 条件判断

```typescript
T extends U ? X : Y
// 上面的类型意思是，若T能够赋值给U，那么类型是X，否则为Y。


type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "function" :
  "object";

type T0 = TypeName<string>;  // "string"
type T1 = TypeName<"a">;  // "string"
type T2 = TypeName<true>;  // "boolean"
type T3 = TypeName<() => void>;  // "function"
type T4 = TypeName<string[]>;  // "object"
```

# typeof T

获取 T 的类型

```typescript
type A = typeof 'a' // string
type B = typeof A // A
```

# keyof T

获取 T 中的 key

```typescript
interface A {
  a: string
  b: number
}

type T = keyof A //  "a" | "b"
```

# readonly

将属性设为只读

```typescript
interface A {
  readonly a: string
}
```

# in T

获取存在于 T 中的 key

```typescript
type A = 'a' | 'b'

type B = {
  [x in A]: string
}
//{a: string, b: string}
```

# ReadOnly

将 T 的属性变为只读选项

```typescript
interface A {
  a?: number
}

type B = Readonly<A>
/*
{
  readonly a?: number
}
*/
```

# Partial

把 T 的 key 都设置为可选

```typescript
interface A {
  a: string
  b: string
}

type B = Partial<A>
/*
{
  a?: string
  b?: string
}
*/
```

# Required

将 T 的属性变为必选项

```typescript
interface A {
  a?: number
}

type B = Required<A>
// {a: number}
```

# Record

将 T 中所有的属性的值转化为 K 类型

```typescript
interface A {
  a: number
}

type B = Record<keyof A, string>
// {a: string}
```

# Pick

```typescript
interface T {
  a: number
  b: number
}

interface U {
  a: string
}

type A = Pick<T, keyof U>
// {a: number}
```

# Exclude

从 T 中剔除可以赋值给 U 的类型

```typescript
type T00 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'> // "b" | "d"
```

# Extract

提取 T 中可以赋值给 U 的类型

```typescript
type T01 = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'> // "a" | "c"
```

# NonNullable

从 T 中剔除 null 和 undefined

```typescript
type T04 = NonNullable<string | number | undefined> // string | number
```

# ReturnType

获取函数返回值类型

```typescript
type T10 = ReturnType<() => string> // string
```

# InstanceType

获取构造函数类型的实例类型

```typescript
type T20 = InstanceType<typeof C> // C
type T21 = InstanceType<any> // any
type T22 = InstanceType<never> // any
type T23 = InstanceType<string> // Error
type T24 = InstanceType<Function> // Error
```

# 实现 Omit

ts 中不存在 Omit，但是可以通过现有的函数实现

```typescript
type A = Pick<T, Exclude<keyof T, K>>
```

# 最后

欢迎在留言中补充指正
