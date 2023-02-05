![React Book List App](./banner.jpg)

# React Book List App

간단한 CRUD 기능을 갖춘 나만의 책장 애플리케이션

**웹 배포 : [https://prototypebooks.netlify.app/](https://prototypebooks.netlify.app/)**

#### Made with 🐥 by [Pazival8971](https://github.com/Parzival8971)

---

## 프로젝트 설명

이 프로젝트는 Todo 애플리케이션을 활용하여, `나만의 책장`를 만듭니다.
간단한 CURD 기능을 갖추고 작업을 수행하였습니다. `React.js`를 사용하고, 상태를 관리와 비동기 처리를 위해 `Redux-saga`를 사용하였습니다. UI 부분은 `Emotion, Antd`을 사용하였습니다. 이 앱을 만들면서 소규모이지만, 실무에서 사용되는 경험을 익히기 위해 redux + saga의 전역 상태 관리와 비동기 처리의 사용법과 학습 및 적용에 중점을 두고 만들었습니다.

---

## 사용한 라이브러리

- [React](https://reactjs.org/)
- [react-router-dom v6](https://reactrouter.com/)
- [React Redux](https://redux.js.org/)
- [React Redux-saga](https://redux-saga.js.org/)
- [react-error-boundary](https://www.npmjs.com/package/react-error-boundary)
- [Ant Design](https://ant.design/)
- [Emotion](https://emotion.sh/docs/introduction)
- [TypeScript](https://www.typescriptlang.org/)

---

## 구조도

```
🖥
├─ src
│  ├─ components
│  │  ├─ Signin.styles.ts
│  │  └─ Signin.tsx
│  ├─ containers
│  │  └─ SigninContainer.tsx
│  ├─ hooks
│  │  └─ useScrollToTop.ts
│  │  └─ useToken.ts
│  ├─ pages
│  │  └─ Signin.tsx
│  ├─ redux
│  │  ├─ create.ts
│  │  └─ modules
│  │     ├─ auth.ts
│  │     ├─ rootReducer.ts
│  │     └─ rootSaga.ts
│  ├─ services
│  │  └─ UserService.ts
│  ├─ Router.tsx
│  ├─ index.tsx
│  └─ types.ts
└─ tsconfig.json
```

---

## Design Pattern - Container, Presentational

- 구조도처럼 관심사의 분리를 Logic과 View로 구분하게 작성하였습니다.

```jsx
⏬ :src/pages/Signin.tsx //하향식으로 내려감

const Signin = () => {
  const token = useToken();
  if (token !== null) {
    return <Navigate replace to='/' />;
  }
  return <SigninContainer />;
};

⏬ :src/containers/SigninContainer.tsx //하향식으로 내려감

const SigninContainer = () => {
  const error = useSelector<RootState, Error | null>(
    (state) => state.auth.error
  );
  const loading = useSelector<RootState, boolean>(
    (state) => state.auth.loading
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useCallback(
    (reqData: LoginReqType) => {
      dispatch(loginSagaStart(reqData));
      if (localStorage.getItem('token')) {
        navigate('/');
      }
    },
    [dispatch, navigate]
  );
  return <Signin login={login} error={error} loading={loading} />;
};

⏬ :src/components/Signin.tsx //하향식으로 내려감
const Signin = ({ login, error, loading }: SigninProps) => {
  ....
  return (
    <S.SigninRow align='middle'>
      <S.BgSignin src='/bg_book.jpg' alt='books' />
      <Col span={24}>
        <S.SigninContents>
         .....
        </S.SigninContents>
      </Col>
    </S.SigninRow>
  );
};

```

## 제어,비제어 컴포넌트 - Controlled, Uncontrolled Component

- 로그인은 실시간 동적 오류 메세지가 필요없고, 불필요한 리렌더링을 최소화 하기위해 제출시에만 관리가 되도록 useRef로 비제어 컴포넌트로 작성하였습니다.

```jsx
⏺ :src/components/Signin.tsx

const Signin = ({ login, error, loading }: SigninProps) => {
  // antd의 Input tpye 바인딩
  const emailRef = useRef<Input>(null);
  const passwordRef = useRef<Input>(null);

  useEffect(() => {
    if (error === null) return;
    // 에러 관련 메세지
    switch (error.message) {
      case 'USER_NOT_EXIST':
        message.error('존재하지 않는 아이디입니다.');
        break;
      case 'PASSWORD_NOT_MATCH':
        message.error('비밀번호가 틀렸습니다.');
        break;
      default:
        message.error('알 수 없는 에러입니다.');
    }
  }, [error]);

  const handleSubmit = () => {
    // antd의 value값은 state에 있음
    const email = emailRef.current!.state.value;
    const password = passwordRef.current!.state.value;
    login({ email, password });
  };

  return (
    <S.SigninRow align='middle'>
      <S.BgSignin src='/bg_book.jpg' alt='books' />
      <Col span={24}>
        <S.SigninContents>
          <Col span={24}>
            <S.SigninTitle>나만의 책장</S.SigninTitle>
            <S.SigninSubtitle>올해는 책 좀 읽자</S.SigninSubtitle>
            <div />
            <S.SigninUnderline />
            <S.EmailTitle>
              이메일 주소
              <S.Required> *</S.Required>
            </S.EmailTitle>
            <S.InputArea>
              <S.SigninInput
                placeholder='이메일을 입력해주세요.'
                autoComplete='email'
                name='email'
                prefix={<UserOutlined />}
                ref={emailRef}
                defaultValue='mark@test.com'
              />
            </S.InputArea>
            <S.PasswordTitle>
              비밀번호
              <S.Required> *</S.Required>
            </S.PasswordTitle>
            <S.InputArea>
              <S.SigninInput
                placeholder='비밀번호를 입력해주세요.'
                type='password'
                autoComplete='current-password'
                ref={passwordRef}
                defaultValue='fastcampus'
              />
            </S.InputArea>
            <S.ButtonArea>
              <S.SigninButton
                loading={loading}
                size='large'
                onClick={handleSubmit}
                disabled={false}
              >
                로그인
              </S.SigninButton>
            </S.ButtonArea>
          </Col>
        </S.SigninContents>
      </Col>
    </S.SigninRow>
  );
};

```

## Duck pattern + redux-actions 라이브러리의 조합

- 실무에서 사용하는 duck pattern 적용을 위해 modules파일에 액션타입, 액션생성함수, 리듀서를 모두 관리하도록 작성하였습니다.
- redux-actions 라이브러리의 사용으로 액션함수를 더 쉽고 간결한 문장으로 코드를 작성할 수 있었습니다. 단점은 TypeScript와 적용하는 문제점이 어렵다는 것이였고, 구글링을 참고하여 기존보다 타입에 적용이 간편한 typesafe-actions를 사용하는 것을 확인하였습니다.

```jsx
⏺ :src/redux/modules/auth.ts

export interface BooksState {
  books: BookResType[] | null;
  loading: boolean;
  error: Error | null;
}

const options = { prefix: 'mybooks/auth' };
// export const success = (token) => ({type:PENDING, payload: token})과 같은 형식
export const { success, pending, fail } = createActions(
  {
    SUCCESS: (token: string) => token,
  },
  'PENDING',
  'FAIL',
  options
);

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};
// 사가패턴 -> 요청인 PENDING과 성공인 SUCCESS 실패인 FAIL로 작성
const reducer = handleActions<AuthState, string>(
  {
    PENDING: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      ...state,
      token: action.payload,
      loading: false,
      error: null,
    }),
    // token은 string이지만 error는 보류 -> Type에러에 관해 더 공부해야 함
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  options
);

export default reducer;

// login, logout 액션생성함수
export const { login, logout } = createActions(
  {
    LOGIN: ({ email, password }: LoginReqType) => ({
      email,
      password,
    }),
  },
  'LOGOUT',
  options
);

interface LoginSagaAction extends AnyAction {
  payload: LoginReqType;
}

// redux-saga 로직
function* loginSaga(action: LoginSagaAction) {
  try {
    yield put(pending());
    // 토큰 api
    const token: string = yield call(UserService.login, action.payload);
    // 로컬에 저장
    TokenSerivce.set(token);
    // 지연시간 생성
    yield delay(1000);
    // 성공
    yield put(success(token));
    // 확인용
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.error('error message: ', error);
      console.error('error message: ', error?.response?.data?.error);
      yield put(
        fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR'))
      );
    } else {
      console.error('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

function* logoutSaga() {
  try {
    yield put(pending());
    // 로컬 토큰 get
    // state는 auth.ts파일을 뜻함
    const token: string = yield select((state) => state.auth.token);
    yield call(UserService.logout, token);
  } catch (error) {
  } finally {
    // 로컬 토큰 삭제
    TokenSerivce.remove();
    yield put(success(null));
  }
}
// 비동기 처리 액션 감지를 위해 모든 액션을 실행
// 이 부분은 더 공부가 필요함
export function* authSagas() {
  yield takeEvery(`${options.prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${options.prefix}/LOGOUT`, logoutSaga);
}


```

## API 관한 로직은 services 파일로 객체형태로 관리하였습니다.

- 필요한 부분만 꺼내어 사용할 수 있도록 작성하였습니다.
- 이 모음을 무엇이라 부르는건지...공부가 더 필요해 보입니다. 😂

```jsx
⏺ :src/services/BookService.ts

export const BookService = {
  async getBooks(token: string): Promise<BookResType[]> {
    const response = await axios.get(BOOK_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async addBook(token: string, book: BookReqType): Promise<BookResType> {
    const response = await axios.post(BOOK_API_URL, book, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async deleteBook(token: string, bookId: number): Promise<void> {
    await axios.delete(`${BOOK_API_URL}/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async editBook(
    token: string,
    bookId: number,
    book: BookReqType
  ): Promise<BookResType> {
    const response = await axios.patch(`${BOOK_API_URL}/${bookId}`, book, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};


```

## react-error-boundary를 적용하여 에러의 기록을 fallback UI로 적용시켜주었습니다.

- 에러경계로서 내부상태 훼손과 암호와 에러 방출의 이유로 React16에서 개념이 도입이 되었습니다.
- 처음 학습해보는 부분이였고, 기존 에러가 일어나 페이지가 중단이 되는데, error의 이유와 함께 fallback으로 중단되지 않고 확인할 수 있었습니다.

```jsx
⏺ :Router.tsx

function Router() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/add' element={<Add />} />
          <Route path='/book/:id' element={<Detail />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

⏺ :scr/pages/Error.tsx

const Error = ({ error }: FallbackProps) => {
  if (error === undefined) {
    return <div>알수 없는 에러가 발생하였습니다.</div>;
  }
  return (
    <div>
      <h1>{`${error.message}의 에러가 발생하였습니다.`}</h1>
    </div>
  );
};
```

## 🐥 개인 회고

<br/>

> 🧐 : 상태관리와 비동기처리? Redux-saga - Ducks Pattern

- 리덕스 사가는 애플리케이션에서 비동기적으로 API를 호출하여 데이터를 가져오는 일과 같은 부수 효과를 가독성 있게 동기 코드처럼 보이게 하는 라이브러리라는 점을 고려해서 실제 학습을 하며 적용하니 적응만 된다면 좋은 방식이라고 생각이 들었습니다. Duck 패턴의 modules 파일에 보기 편하게 정리가 되어있어 가독성이 좋다고 생각이 들었습니다.

<br/>

> 🧐 : 디자인 패턴? Container - Presentational

- 기능과 UI의 부분을 나눠 작성한 결과 확실히 폴더 구조를 잡기에 이해하기 쉽게 되었습니다. Presentational 컴포넌트에서는 오직 Props으로 받아서 사용하기 때문에 UI에만 집중할 수 있어서 다른 컴포넌트와 의존도가 낮음을 알 수 있었습니다. 기존에 페이지와 공용 컴포넌트들로 작성을 했었지만 디자인 패턴이란 것을 알게 되었고 Atomic 등 더 다양한 패턴에 대해 학습해야겠다고 느꼈습니다.

<br/>

> 🧐 : 제어,비제어 컴포넌트? - Controlled, Uncontrolled Component

- 결과를 눌렀을 때만 행위를 보여준다면 확실히 비제어 컴포넌트가 리렌더링이 발생하지 않고 좋다고 이번 학습을 통해 인지하였습니다. 기존에는 방법을 몰랐기에 리액트에게 위임해 제어컴포넌트로 로그인, 회원가입 페이지를 만들었습니다만 성능 최적화에 대해 학습하게 되어 필요에 따라 구분해서 사용해야 하는 이유에 대해서 알게 되었습니다.

<br/>

## 😂 Self Feedback

<br/>

> 🧑🏻‍💻 : 학습하며 개발과정 중 어려웠던 부분

- antd와 eomotion을 혼합해서 사용하였는데 아직 공식문서를 읽고 따라 하는 정도이고 커스텀하기가 어려웠습니다. 디자인 라이브러리도 적극 사용 하면 빠르고 좋은 퍼포먼스를 낸다는 것을 알게 되었습니다.

- Redux-saga를 처음 접하는 입장에서는 사가 패턴과 Flux 구조의 흐름을 이해하기에 어려움을 느꼈습니다. 왜 초심자에게 러닝커브가 크다는 것인지와 현재는 다양한 형태의 recoil과 react-query 등의 조합으로 사용하는지에 대해서도 공부를 해야하는지에 대해 알게되었습니다.

- TypeScript의 error를 지정하는 것에 대해서 부족했습니다. error를 적극적으로 다룬 경험이 없기에 axios.isAxiosError(error)를 적용하여 처리하였지만, 이해하지 못하고 적용한 것에 대해 더 error 핸들링에 대해 공부해야 한다고 생각합니다

- 실업에선 분업과 협업을 통해서 일하기 때문에 어느 정도 백엔드의 DB를 다루는 기초 지식 정도를 다뤄야 한다고 생각이 들었습니다. 직접 만들어보지 않고 공용 API를 사용하다 보니 어느 정도 기능구현에 제한이 있다는 생각이 듭니다.
