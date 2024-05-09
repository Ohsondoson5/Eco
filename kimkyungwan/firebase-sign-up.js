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

// 회원가입 함수
const signUp = async (email, password, username) => {
  try {
    // Firebase를 통한 이메일 및 비밀번호로 사용자 생성
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firebase 실시간 데이터베이스에 사용자 정보 저장
    await set(ref(db, 'users/' + user.uid), {
      email: email,
      username: username
    });

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
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    console.error('비밀번호가 일치하지 않습니다.');
    return;
  }

  signUp(email, password, username); // 회원가입 함수 호출
});
