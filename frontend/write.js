document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const insertAtInput = document.getElementById('insertAt');
  const imageInput = document.getElementById('image');

  // 현재 시간(timestamp) 자동 입력
  insertAtInput.value = Date.now();

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // 기본 폼 제출 막음

    const formData = new FormData(form);

    // 유효성 검사 예시 (빈 값 확인)
    if (
      !formData.get('title') ||
      !formData.get('price') ||
      !formData.get('place')
    ) {
      alert('필수 입력값이 비어 있습니다.');
      return;
    }

    try {
      const res = await fetch('/items', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('상품이 성공적으로 등록되었습니다.');
        window.location.href = '/'; // 홈으로 이동
      } else {
        const err = await res.text();
        alert('등록 실패: ' + err);
      }
    } catch (err) {
      alert('오류 발생: ' + err.message);
    }
  });
});
