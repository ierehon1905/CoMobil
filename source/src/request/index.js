

export default function request(path, body) {
  return fetch(`http://localhost:4000${path}`, { body, method: 'post', credentials: 'include' }).then((res) => { // eslint-disable-line
    if (res.ok) {
      return res.json().catch(e => res.statusText);
    }
    console.log(res);
  }).catch((e) => {
    console.log(e);
  });
}

request('/ping').then(res => console.log(res));
