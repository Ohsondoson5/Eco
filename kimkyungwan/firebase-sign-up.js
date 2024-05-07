import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

// Firebase 구성
const firebaseConfig = {
    apiKey: "AIzaSyAzB8dtkIxFAq1PSDf1IawowHOcEF2GfB0",
    authDomain: "webproject-7bbac.firebaseapp.com",
    databaseURL: "https://webproject-7bbac-default-rtdb.firebaseio.com",
    projectId: "webproject-7bbac",
    storageBucket: "webproject-7bbac.appspot.com",
    messagingSenderId: "149573232901",
    appId: "1:149573232901:web:cd3c3e6c4cc07b07f2af6c",
    measurementId: "G-26XF6G9VGW"
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
