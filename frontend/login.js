const form = document.querySelector('#login-form');

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get('password'));
  formData.set('password', sha256Password);

  const res = await fetch('/login', {
    method: 'post',
    body: formData,
  });
  const data = await res.json();
  const accessToken = data.access_token;
  window.localStorage.setItem('token', accessToken);
  alert('로그인 되었습니다 :)');

  const infoDiv = document.querySelector('#info');
  if (!infoDiv) return;
  infoDiv.innerText = '로그인이 되었습니다!';

  window.location.pathname = '/';
};

form.addEventListener('submit', handleSubmit);
