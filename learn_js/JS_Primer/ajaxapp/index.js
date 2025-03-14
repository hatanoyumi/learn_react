// const userId = ("js-primer-example");


//// Promiseチェーン
// function main () {
//   fetchUserInfo("js-primer-example")
//     // ここではJSONオブジェクトで解決されるPromise
//     .then((userInfo) => createView(userInfo))
//     // ここではHTML文字列で解決されるPromise
//     .then((view) => displayView(view))
//     // Promiseチェーンでエラーがあった場合はキャッチされる
//     .catch((error) => {
//       console.error(`エラーが発生しました (${error})`);
//     });
// }

// Async Functionへの置き換え
async function main() {
  try {
    const userId = getUserId();
    // const userInfo = await fetchUserInfo("js-primer-example");
    const userInfo = await fetchUserInfo(userId);
    const view = createView(userInfo);
    displayView(view);
  } catch (error) {
    console.log(`エラーが発生しました (${error})`);
  }
}


function fetchUserInfo(userId) {
  // fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
  // fetchの返り値のPromiseをreturnする
  return fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then(response => {
      if (!response.ok) {
        // エラーレスポンスからRejectedなPromiseを作成して返す
        return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
      } else {
        // return response.json().then(userInfo => {
        //   // htmlの組み立て
        //   // const view = escapeHTML`
        //   // <h4>${userInfo.name} (@${userInfo.login})</h4>
        //   // <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
        //   // <dl>
        //   //   <dt>Location</dt>
        //   //   <dd>${userInfo.location}</dd>
        //   //   <dt>Repositories</dt>
        //   //   <dd>${userInfo.public_repos}</dd>
        //   // </dl>
        //   // `;
        //   const view = createView(userInfo);

        //   // htmlの挿入
        //   // const result = document.getElementById("result");
        //   // result.innerHTML = view;
        //   displayView(view);
        // });

        // JSONオブジェクトで解決されるPromiseを返す
        return response.json();
      }
    // })
    // .catch(err => {
    //   return Promise.reject(new Error(`failed fetch user(id: ${userId}) info`, { cause: err }));
    });
}

function getUserId() {
  return document.getElementById("userId").value;
}

function createView(userInfo) {
  return escapeHTML`
    <h4>${userInfo.name} (@${userInfo.login})</h4>
    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
    <dl>
      <dt>Location</dt>
      <dd>${userInfo.location}</dd>
      <dt>Repositories</dt>
      <dd>${userInfo.public_repos}</dd>
    </dl>
  `;
}

function displayView(view) {
  const result = document.getElementById("result");
  result.innerHTML = view;
}

function escapeSpecialChars(str) {
  return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value =values[i - 1];
    if (typeof value === "string") {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
}
