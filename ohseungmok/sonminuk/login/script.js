// Firebase 프로젝트 설정
const firebaseConfig = {
  apiKey: "AIzaSyAbNYchKcFia8-uIdjlBUOAfalqBwStJdY",
  authDomain: "my-eco-prj.firebaseapp.com",
  databaseURL: "https://my-eco-prj-default-rtdb.firebaseio.com",
  projectId: "my-eco-prj",
  storageBucket: "my-eco-prj.appspot.com",
  messagingSenderId: "322109404527",
  appId: "1:322109404527:web:ab160e33c4927336fc249a",
  measurementId: "G-LGEKHFM498"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 회원가입 함수
function signUp() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password === confirmPassword) {
    // 사용자 정보를 Realtime Database에 저장
    database.ref('users/' + username).set({
      email: email,
      password: password
    });
    alert("회원가입 성공!");
    window.location.href = 'login.html'; // 로그인 페이지로 이동
  } else {
    alert("비밀번호가 일치하지 않습니다.");
  }
}



// 로그인 함수
function signIn() {
  const username = document.getElementById('signin-username').value;
  const password = document.getElementById('signin-password').value;

  // 사용자의 아이디를 기반으로 사용자의 정보를 가져와서 비밀번호를 확인
  database.ref('users/' + username).once('value', (snapshot) => {
    const user = snapshot.val();
    if (user && user.password === password) {
      alert("로그인 성공!");
      localStorage.setItem('username', username); // 유저 아이디를 로컬 스토리지에 저장
      //window.location.href = '/kimkyungwan/main.html'; // 메인페이지로 이동
      setCookie('user', user.email)
      window.location.href = '/sonminuk/notice_board/index.html'; // 글쓰기 index 페이지로 이동
    } else {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  });
}

//쿠키 가져오기
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

//쿠키 설정
function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    // 필요한 경우, 옵션 기본값을 설정할 수도 있습니다.
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

// 이벤트 리스너 등록
document.getElementById('sign-up-btn').addEventListener('click', signUp);
document.getElementById('sign-in-btn').addEventListener('click', signIn);
