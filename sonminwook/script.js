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
    } else {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  });
}



// 이벤트 리스너 등록
document.getElementById('sign-up-btn').addEventListener('click', signUp);
document.getElementById('sign-in-btn').addEventListener('click', signIn);
