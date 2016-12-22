# React.js

### # props
* 컴포넌트 내부의 Immutable Data
* JSX 내부에 `{this.props.propsName}`
* 컴포넌트를 사용할 때, <> 괄호 안에 `propsName='value'`
* `this.props.children` 은 기본적으로 갖고있는 props로서,<br>
  `<Cpnt>여기에 있는 값이 들어간다.</Cpnt>`

### # state
* 유동적인 데이터
* JSX 내부에 `{this.state.stateName}`
* 초기값 설정이 필수, 생성자(constructor) 에서 `this.state={}` 으로 설정
* 값을 수정 할 때에는 `this.setState({..})`, 렌더링 된 다음엔 <br>
  `this.state=` 절대 사용하지 말것

<br>

#### 참고) Javascript - Map()
 - 파라미터로 전달 된 함수를 통하여 배열 내의 각 요소를 처리해서 그 결과로<br>
새로운 배열을 생성.
`arr.map(callback[,Context])`

```js
var numbers = [1,2,3,4,5];
var processed = numbers.map(function(num) {
    return num*num;
}); // [1,4,9,16,25]
```

---

## IDE Setting

#### 1. webpack 설치
```sh
npm install -g webpack webpack-dev-server
```
* webpack : 브라우저 위에서 import(require)를 할 수 있게 해주고 자바스크립트 파일들을 하나로 합쳐줌.
* webpack-dev-server : 별도의 서버를 구축하지 않고도 static 파일을 다루는 웹서버를 열 수 있으며 hot-loader를 통하여 코드가 수정 될 때마다 자동으로 리로드 하도록 함.

#### 2. 프로젝트 생성
```sh
mkdir project-folder
cd project-folder
npm init
```

#### 3. 의존모듈 및 플러그인 설치
```sh
npm install --save react react-dom
npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react
npm install --save-dev react-hot-loader webpack webpack-dev-server
```

#### 4. webpack 설정
`webpack.config.js`

---

## # [Immutability Helpers](https://facebook.github.io/react/docs/update.html)

* 컴포넌트의 내부 state값은 직접 수정하여서는 안되고 setState 메소드를 통해서 값을 설정해야 한다.
* 배열이나 객체 데이터는 이 규칙을 따르기 위해서는 어려움이 있다.

```js
// push를 이용하면 원래 배열의 값이 변경되기때문에 사용하면 안된다.
this.setState({
    arr: this.state.arr.push(obj)
})

// concat 메소드는 결과로 새배열을 반환함.
this.setState({
    arr: this.state.arr.concat(obj)
})
```

* _immutable.js_ 는 객체나 배열을 쉽게 수정할 수 있게 해준다.  
`npm install --save react-addons-update`  
`import update from 'react-addons-update`
<br>
```js
// list 배열에 Obj1, Obj2를 추가함
this.setState({
    list: update(
                this.state.list,
                {
                    $push: [Obj1, Obj2]
                }
            )
})

// list 객체의 index 아이템 또는 키값을 수정
this.setState({
    list: update(
                this.state.list,
                {
                    [index | key] : {
                        $set: "value"
                    }
                }
            )
})
```

---

## # Component Life Cycle API

#### 1. componentWillMount
    - 렌더링이 되기 전
    - 컴포넌트가 DOM 위에 만들어지기 전에 실행 

#### 2. componentDidMount
    - 첫 렌더링 마치고 실행
    - 이 안에서 다른 js 프레임워크 연동 및 setTimeout, setInterval, ajax 사용 

#### 3. componentWillReceiveProps
    - 새로운 props를 받았을 때
    - props에 따라 state를 업데이트 할 때 사용하면 유용
    - 이 안에서 setState를 해도 괜찮다

#### 4. shouldComponentUpdate
    - props/state 가 변경되었을 때 re-rendering을 할지 말지 결정
    - __return nextProps.id !== this.props.id__
    - JSON.stringify 를 사용하여 여러 field를 편하게 비교
    
#### 5. componentWillUpdate
    - 컴포넌트가 업데이트 되기 전
    - 여기서 setState 사용하지 말 것!

#### 6. componentDidUpdate
    - 컴포넌트가 업데이트 되고 난 후
    - 여기서 setState 사용하지 말 것!

#### 7. componentWillUnmount
    - 컴포넌트가 DOM에서 사라진 후 실행

##### [[jsFiddle 예제]](https://jsfiddle.net/velopert/ccoj0moe/?utm_source=website&utm_medium=embed&utm_campaign=ccoj0moe)

<br>

--- 

## Redux

- __Flux ?__ 
    > MVC패턴으로 작성된 대규모의 어플리케이션에서는 데이터의 흐름이 매우 복잡하여 지고, 결과 예측이 어려워지고 이로 인하여 발생한 문제를 해결하기 또한 어렵다. 이를 해결하기 위해 facebook은  Flux 아키텍쳐를 도입하였다.  
 [[참고 - Flux로의 카툰 안내서]](http://bestalign.github.io/2015/10/06/cartoon-guide-to-flux/)

- Redux는 Flux의 개념을 개선

### # Redux의 3가지 원칙
1. Single Source of Truth  
 : 어플리케이션의 state 를 위해 단 한 개의 store 를 사용. (Flux는 여러개의 store 를 사용)  

2. State is Read-only  
 : 어플리케이션에서 store 의 state 를 직접 변경할 수 없으며, state 를 변경하기 위해서는 반드시 __action__ 이 __dispatch__ 되어야 함.  

3. Changes are made with pure Functions  
 : action 객체를 처리하는 함수를 __reducer__ 라 하며, reducer 는 정보를 받아서 상태를 어떻게 업데이트 할지 정의한다.   
 : reduce 는 '순수함수' 로 작성되어야 한다.

## Redux 의 주요 개체 

### a. Action
 - 작업에 대한 정보를 지니고 있는 객체.
 - `type` 필드는 필수.
 ```js
    {
        type: "SET_COLOR",
        color: [200, 200, 200]
    }
 ```

### b. Dispatch

### c. Reducer
 - 변화를 일으키는 함수
 - 순수해야함 
    - 비동기 작업 X
    - 인수 변경 X
    - 동일한 인수 = 동일한 결과
 - 이전 상태와 액션을 받아서 다음 상태를 반환한다. `(previousState, action) => newState`   
 - 이전 상태를 변경하는게 아니라, 그저 __새로운 상태를 반환__하는 것!!

### d. Store
 - 어플리케이션의 현재상태를 지니고 있음
 - `createStore` > 스토어를 생성.
 - `dispatch(action)` > 액션을 리듀서로 보냄. 
 - `getState()` > 현재 상태를 반환.
 - `subscribe(listener)` > 상태가 바뀔때마다 실행할 함수를 등록. callback 함수
 - subscribe 함수는 결과로 subscribe를 해제하는 함수를 반환하므로, 해제를 원하면 그 함수를 실행시킨다.
    ```js
    const unsubscribe = store.subscribe( () => console.log('action!!!') );

    unsubscribe(); // > subscribe 해제
    ```
 
---

## react-redux
 - 뷰 레이어 바인딩을 돕는 도구

### # Provider
 - 컴포넌트에서 store 를 참조할 수 있도록 제공
```js
<Provider store={store}>
    <App/>
</Provider>
```

### # connect([...options])
 - 컴포넌트를 Redux에 연결하는 함수를 반환
 - `connect()(Counter)` : Counter컴포넌트가 store에 연결되어 새로운 컴포넌트 클래스가 반환됨
 - 옵션이 없으면 `this.props.store` 로 접근 가능
```js
// option이 없으면 컴포넌트에서 store 에 접근 시,
//  > this.props.store.getState().counter.number 
export default connect()(Counter);

// mapping 을 하였으므로 컴포넌트에서 store 에 접근 시,
//  > this.props.number
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

![test](https://cdn.css-tricks.com/wp-content/uploads/2016/03/redux-article-3-03.svg)
_출처: https://css-tricks.com/learning-react-redux/_

 - __mapStateToProps__: 그림에서 파란색 화살표의 역할을 하는 함수로 컴포넌트에 필요한 값을 store로부터 직접 조회하는 역할을 한다.
 - __mapDispatchToProps__: 그림에서 녹색 화살표의 역할을 하는 함수로 사용자의 액션에서 발생하는 store의 변화를 구현한다.





---

## 데이터 흐름 

### 1. store.dispatch(action) 을 호출

### 2. Redux 스토어가 지정한 리듀서 함수들을 호출
 - 스토어는 리듀서에 현재의 상태 트리와 액션의 두 가지 인수를 넘김

### 3. 루트 리듀서가 각 리듀서의 출력을 합쳐서 하나의 상태 트리로 만듬
 - __combineReducers()__ 헬퍼 함수로 여러 개의 리듀서로 나눌 수 있다
 - 액션을 보내면, __combineReducers()__ 가 반환한 모든 리듀서를 호출한다
 - 호출한 결과를 합쳐 하나의 상태 트리로 만듬

### 4. Redux 스토어가 루트 리듀서에 의해 반환된 상태 트리를 저장
 - __store.subscribe(listener)__ 로 등록한 모든 리스너가 호출
 - 각 리스너는 __store.getState()__ 를 호출하여 현재 상태를 얻는다
 - 새 상태를 반영하여 UI가 변경 
 - react-redux 를 사용하여 바인딩 했다면, __component.setState(newState)__ 가 호출



<br>  

--- 

참고사이트)  
- https://velopert.com/reactjs-tutorials
- https://dobbit.github.io/redux/
- http://meetup.toast.com/posts/100