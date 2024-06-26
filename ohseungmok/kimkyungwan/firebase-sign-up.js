import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js';


// Firebase 구성
const firebaseConfig = {
  apiKey: "AIzaSyCRDJ4CRCg5bFCNRwH_pnfxbUNlcZbcM1k",
  authDomain: "greenissue-2a081.firebaseapp.com",
  projectId: "greenissue-2a081",
  storageBucket: "greenissue-2a081.appspot.com",
  messagingSenderId: "155412299179",
  appId: "1:155412299179:web:890f117a1c5ed80d0826ee",
  measurementId: "G-HZ30WZEM8J"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

function showAlertRed(message) {
  var alertBox = document.createElement('div');
  alertBox.textContent = message;
  alertBox.style.backgroundColor = 'red';
  alertBox.style.fontWeight = 'bold';
  alertBox.style.border = '1px solid red';
  alertBox.style.position = 'fixed';
  alertBox.style.top = '10%';
  alertBox.style.left = '50%';
  alertBox.style.transform = 'translate(-50%, -50%)';
  alertBox.style.padding = '10px 20px';
  alertBox.style.borderRadius = '5px';
  alertBox.style.color = 'white';
  document.body.appendChild(alertBox);

  setTimeout(function() {
      alertBox.remove();
  }, 2000); // 2초 후에 다이얼로그가 자동으로 사라지도록 설정
}

// 회원가입 함수
const signUp = async (email, password) => {
  try {
    // Firebase를 통한 이메일 및 비밀번호로 사용자 생성
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    userCredential.
    console.log('사용자가 생성되었으며, 데이터베이스에 저장되었습니다.');
    toggle(); // toggle 함수를 호출하여 화면을 로그인 화면으로 변경
  } catch (error) {
    console.error('회원가입 중 오류 발생:', error.message);
  }
};

// 이벤트 핸들러
const signUpButton = document.getElementById('sign-up-btn');

signUpButton.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  //이메일 유효성 검사
  function isValidEmail(email) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  // 이메일 유효성 검사 후 처리
  if (!isValidEmail(email)) {
    showAlertRed('올바른 이메일 주소를 입력해주세요.');
    document.getElementById('email').focus();
    return;
  }

  //비밀번호 검사
  if (password === '' || password.length < 6) {
    showAlertRed('비밀번호는 6자 이상이어야 합니다.');
    document.getElementById('password').focus();
    return;
  }

  //비밀번호 null 일경우
  if (confirmPassword === '') {
    showAlertRed('비밀번호를 입력하세요.');
    document.getElementById('confirm-password').focus();
    return;
  }

  //비밀번호 일치
  if (password !== confirmPassword) {
    showAlertRed('비밀번호가 일치하지 않습니다.');
    return;
  }

  signUp(email, password); // 회원가입 함수 호출
});