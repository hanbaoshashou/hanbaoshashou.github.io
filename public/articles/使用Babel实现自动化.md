# 使用Babel自动化修改代码

使用Babel我们可以很轻松的将一些重复的体力劳动自动化，比如重复修改相似的代码，今天我就有这样一个需求。

## 需求

首先我有一个 ts 文件`accumulate.ts`是这样的

```javascript
import { combineRoot } from '@src/util/lib/reducerHelper'

export const ACCUMULATE_ADD = 'ACCUMULATE_ADD'

export interface I_Accumulate {
  add: I_ReducerState;
}

export default combineRoot({
  add: ACCUMULATE_ADD
})
```

然后我期望在这个文件中自动添加几行代码, 当然需要添加的变量名我都有

```javascript
import { combineRoot } from '@src/util/lib/reducerHelper'

export const ACCUMULATE_ADD = 'ACCUMULATE_ADD'

export const ACCUMULATE_HAS = 'ACCUMULATE_HAS' // +

export interface I_Accumulate {
  add: I_ReducerState;
  has: I_ReducerState; // +
}

export default combineRoot({
  add: ACCUMULATE_ADD,
  has: ACCUMULATE_HAS // +
})
```

要完成这个需求的步骤其实很简单。<br>
怎么做？3 步

1. code 转 ast
2. 修改 ast
3. ast 转 code

## 生成 ast

第一件事就是需要把旧的文件转成 ast（抽象语法树），这里要用到`babel/parser`。
`@babel/parser` 是解析 js 文件生成 ast 的一个包，同时也支持 ts，通过传一些参数，就能得到需要的 ast。

```javascript
const babelParser = require('@babel/parser')

const ast = babelParser.parse(code, {
  sourceType: 'module',
  plugins: ['typescript']
})

// 得到这样一个复杂的树结构，（嵌套很深就不全部写出来了）
/*
- programmer
  - node ImportDeclaration
    - source node StringLiteral
    - specifiers [node ImportSpecifier]
    - ...
  - node ExportNamedDeclaration
    - ...
  - node ExportNamedDeclaration
    - ...
  - node ExportDefaultDeclaration
    - ...
*/
```

## 遍历 ast

得到 ast 以后，就需要遍历 ast，在合适的位置，对这颗树的节点做增删改查，得到我们想要的 ast

```javascript
const traverse = require('@babel/traverse').default
const t = require('@babel/types')

traverse(ast, {
  // 我希望在遍历到ExportNamedDeclaration类型的节点的时候，做点什么
  ExportNamedDeclaration(path) {
    // 使用t来定义一个新的节点 const A = 'A'
    const actionType = t.exportNamedDeclaration(
      t.variableDeclaration('const', [
        t.variableDeclarator(
          t.identifier(reducerType),
          t.stringLiteral(reducerType)
        )
      ]),
      []
    )

    // 在 export interface {} 之前插入新节点
    if (path.node.declaration.type === 'TSInterfaceDeclaration') {
      path.insertBefore(actionType)
    }
  }
})
```

- `@babel/traverse` 是用来遍历 ast 的一个包
- 第二个参数是个对象，对象的每个方法，会在遍历到对应类型节点的时候被调用，而 path 就描述了当前节点的信息
- `@babel/types` 是一个类似 lodash 的工具库，方便我们快速生成需要的节点
- 这段代码实现的就是在`export interface {...}` 上面插入`export const ACCUMULATE_HAS = 'ACCUMULATE_HAS'`

## 生成 code

```javascript
const generate = require('@babel/generator').default

const { code, map } = generate(ast, options, code)
```

- options 配置生成代码时的一些设置
- code 就是源码
- 生成的对象中包含新的代码和 sourcemap

就这样简单几步，就可以做到自动化的修改代码。唯一繁琐的事就是，在修改的时候，要不断的查看当前的树的结构，保证是在正确的位置， 对树做出了正确的修改，是个体力活。

## 参考资料

[babel-handbook](https://github.com/jamiebuilds/babel-handbook)
