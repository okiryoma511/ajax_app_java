// レスポンスからHTMLを作成
const buildHTML = (XHR) => {
  const item = XHR.response;
  const html = `
        <div class = "post">
          <div class = "post-date">
            投稿日時：${item.createdAt}
          </div>
          <div class = "post-content">
            ${item.content}
          </div>
        </div>`;
  return html;
};

function post() {
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
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`ERROR ${XHR.status}: ${XHR.response.error}`);
        return null;
      };
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      // 作成したHTMLを挿入
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      formText.value = "";
    };
  });
};

window.addEventListener('load', post);