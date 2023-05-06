# Electorn里的Session

今天来讲讲Electorn里的session

官网是这么介绍的

> 管理浏览器会话、cookie、缓存、代理设置等。

session 就是浏览器用来管理窗口的各种状态的，像cookie, 我们知道cookie是在多个窗口间是通用的，所以session一个很重要的特点就是在多个窗口之间共享的（默认情况下）。
electron 给所有窗口指定了一个默认的session,就是`sessin.defaultSession`

```js
const { session } = require('electron')

session.defaultSession
```

除了这种方式可以获取到窗口的session，也可以通过窗口的webcontent获取

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```
这个时候，获取到的session其实就是defaultSession（如果你没有给这个窗口特殊指定session的话），所以我们对这个session的任何行为的修改，都会影响到所有的窗口的session,比如我要拦截`will-download`事件

```js
const { session } = require('electron')

session.defaultSession.on('will-download', (event, item, webContents) => {
  event.preventDefault()
  require('got')(item.getURL()).then((response) => {
    require('fs').writeFileSync('/somewhere', response.body)
  })
})
```
写完后，所有的窗口的下载事件都会被拦截

## Session的作用

### cookie
最常用的跟cookie相关的，都可以通过session控制，获取某个url的cookie，这个时候，就跟开了上帝视角一样，可以做很多js不能做的事情
```js
const { session } = require('electron')

// 查询所有 cookies。
session.defaultSession.cookies.get({})
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })

// 查询所有与设置的 URL 相关的所有 cookies.
session.defaultSession.cookies.get({ url: 'http://www.github.com' })
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })

// 设置一个 cookie，使用设置的名称；
// 如果存在，则会覆盖原先 cookie.
const cookie = { url: 'http://www.github.com', name: 'dummy_name', value: 'dummy' }
session.defaultSession.cookies.set(cookie)
  .then(() => {
    // success
  }, (error) => {
    console.error(error)
  })
```
清空所有cookie
```js
session.defaultSession.cookies.get({})
  .then((cookies) => {
    cookies.forEach(cookie => {
      let url = '';

      // get prefix, like https://www.
      url += cookie.secure ? 'https://' : 'http://';
      url += cookie.domain.charAt(0) === '.' ? 'www' : '';

      // append domain and path
      url += cookie.domain;
      url += cookie.path;

      session.defaultSession.cookies.remove(url, cookie.name)
    })
  })
```

### 修改浏览器默认行为

比如静默下载文件

```js
session.defaultSession.on('will-download', (event, item, webContents) => {
  const filePath = path.join(app.getPath('downloads'), item.getFilename());
  item.setSavePath(filePath);
})
```

### 监听请求
```js
const { session } = require('electron')

// Modify the user agent for all requests to the following urls.
const filter = {
  urls: ['https://*.github.com/*', '*://electron.github.io/*']
}

session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  details.requestHeaders['User-Agent'] = 'MyAgent'
  callback({ requestHeaders: details.requestHeaders })
})
```

等等

在我看来，session跟webcontent两个api提供的都是js以外的控制窗口的能力，webcontent用来渲染以及控制web页面，session就是管理窗口的状态，分不清也没关系，想实现某种功能，webcontent里找不到对于的api，那就去session里找找
