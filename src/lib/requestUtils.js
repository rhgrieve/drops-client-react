const types = {
  NOTE: "NOTE",
  LIST: "LIST"
};

const methods = {
  PUT: "PUT",
  DELETE: "DELETE",
  POST: "POST",
  GET: "GET"
};

function execute(url, method, params = null) {
  let xhr = new XMLHttpRequest();
  let data;

  xhr.addEventListener("load", () => {
    return xhr.responseText;
  });

  if (params) {
    data = new URLSearchParams();
    const paramList = Object.entries(params);

    for (let param in paramList) {
      const key = paramList[param][0];
      const value = paramList[param][1];
      data.append(key, value);
    }
  }

  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;

      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr);
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      }
    };

    xhr.open(method || "GET", url, true);
    if (data) {
      xhr.send(data);
    } else xhr.send();
  });
}

async function put(url, type, params) {
  if (type === types.NOTE) {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      return xhr.responseText;
    });

    let data = new URLSearchParams();
    data.append("title", params.title);
    data.append("message", params.message);

    xhr.open("PUT", url);
    xhr.send(data);
  }
}

async function del(url) {
  let xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    return xhr.responseText;
  });

  xhr.open("DELETE", url);
  xhr.send();
}

module.exports = { types, methods, execute };
