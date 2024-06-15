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
const auth = firebase.auth();
const database = firebase.database();

// 회원가입 함수
function signUp() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // 아이디가 공백인지 확인
  if (username.trim() === '') {
    alert('아이디를 입력해주세요.');
    document.getElementById('username').focus();
    return false;
  }

  // 이메일 유효성 검사 함수
  function isValidEmail(email) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  // 이메일 유효성 검사
  if (!isValidEmail(email)) {
    alert('올바른 이메일 주소를 입력해주세요.');
    document.getElementById('email').focus();
    return false;
  }

  // 비밀번호 검사
  if (password === '' || password.length < 6) {
    alert('비밀번호는 6자 이상이어야 합니다.');
    document.getElementById('password').focus();
    return false;
  }

  // 확인 비밀번호 검사
  if (confirmPassword === '') {
    alert('비밀번호를 입력하세요.');
    document.getElementById('confirm-password').focus();
    return false;
  }

  // 비밀번호 일치 여부 확인
  if (password !== confirmPassword) {
    alert('비밀번호가 일치하지 않습니다.');
    document.getElementById('confirm-password').focus();
    return false;
  }

  // Firebase Authentication을 통해 이메일 및 비밀번호로 사용자 생성
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // 사용자 정보를 Realtime Database에 저장
      database.ref('users/' + user.uid).set({
        username: username,
        email: email,
        password: password // 비밀번호도 저장
      });
      alert("회원가입 성공!");
      window.location.href = 'login.html'; // 로그인 페이지로 이동
    })
    .catch((error) => {
      alert("회원가입 실패: " + error.message);
    });

  return true;
}

// 로그인 함수
function signIn() {
  const usernameInput = document.getElementById('signin-username');
  const passwordInput = document.getElementById('signin-password');

  if (usernameInput && passwordInput) {
    const username = usernameInput.value;
    const password = passwordInput.value;

    database.ref('users').orderByChild('username').equalTo(username).once('value', snapshot => {
      if (snapshot.exists()) {
        snapshot.forEach(childSnapshot => {
          const userData = childSnapshot.val();
          if (userData.password === password) {
            alert("로그인 성공!");
            localStorage.setItem('username', username); // 유저 아이디를 로컬 스토리지에 저장
            window.location.href = '../ohseungmok/index.html'; // 메인페이지로 이동
          } else {
            alert("아이디 또는 비밀번호가 올바르지 않습니다.");
          }
        });
      } else {
        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    });
  } else {
    console.error('아이디 또는 비밀번호가 존재하지 않습니다.');
  }
}

// 비밀번호 재설정 함수
function resetPassword() {
  const email = prompt("이메일을 입력하세요:");

  // 이메일 유효성 검사 함수
  function isValidEmail(email) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  if (email) {
    if (isValidEmail(email)) {
      auth.sendPasswordResetEmail(email)
        .then(() => {
          alert(`재설정 링크가 ${email}로 전송되었습니다.`);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert('올바른 이메일 주소를 입력해주세요.');
    }
  } else {
    alert("이메일을 입력해주세요.");
  }
}

// 이벤트 리스너 등록
document.getElementById('sign-up-btn')?.addEventListener('click', signUp);
document.getElementById('sign-in-btn')?.addEventListener('click', signIn);
document.querySelector('b.pointer')?.addEventListener('click', resetPassword);
