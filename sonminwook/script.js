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
  
  // 회원가입 함수
  function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    if (password === confirmPassword) {
      auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // 회원가입 성공
          const user = userCredential.user;
          alert("회원가입 성공!");
          console.log("User signed up:", user);
        })
        .catch((error) => {
          // 회원가입 실패
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Error: " + errorMessage);
          console.log("Error code:", errorCode, "Error message:", errorMessage);
        });
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  }
  
  // 로그인 함수
  function signIn() {
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // 로그인 성공
        const user = userCredential.user;
        alert("로그인 성공!");
        console.log("User signed in:", user);
      })
      .catch((error) => {
        // 로그인 실패
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Error: " + errorMessage);
        console.log("Error code:", errorCode, "Error message:", errorMessage);
      });
  }
  
  // 로그아웃 함수
  function signOut() {
    auth.signOut().then(() => {
      // 로그아웃 성공
      alert("로그아웃 성공!");
      console.log("User signed out");
    }).catch((error) => {
      // 로그아웃 실패
      alert("로그아웃 중 오류가 발생했습니다.");
      console.log("Error:", error);
    });
  }
  
  // 이벤트 리스너 등록
  document.getElementById('sign-up-btn').addEventListener('click', signUp);
  document.getElementById('sign-in-btn').addEventListener('click', signIn);
  document.getElementById('sign-out-btn').addEventListener('click', signOut);
  