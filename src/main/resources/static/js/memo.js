function post () {
  // 要素の取得
  const submit = document.getElementById("submit");
  // 送信ボタンのクリックを無効化
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    // FormDataオブジェクトを作成
    const formData = new FormData(form);
    // XMLHttpRequestオブジェクトを生成
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
  });
};

window.addEventListener('load', post);