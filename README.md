# SAP ERP Portfolio — Navigator Shell

새 포트폴리오 구조의 초안입니다. 기존 GitHub Pages의 `main` 사이트는 Pull Request가 병합되기 전까지 변경하지 않습니다.

## 화면 구조

- 왼쪽: SAP Object Navigator를 참고한 메뉴 트리
- 오른쪽: 선택한 메뉴의 상세 콘텐츠
- 첫 진입: **About Me**
- 프로젝트: 프로젝트별 고유 해시 URL (`#/projects/rap-sd-o2c` 등)
- 모바일: 왼쪽 메뉴 접기 / 열기
- GitHub Pages: 정적 HTML + CSS + JavaScript (빌드 도구 불필요)

## 파일

```text
index.html
style.css
app.js
pages/
  about.html
  certifications.html
  projects.html
  projects/
    nongshim-e2e.html
    transys-e2e.html
    rap-sd-o2c.html
    abap-rental.html
    kt-safeline.html
assets/
  projects/                 # 스크린샷 / 흐름도 / 발표 자료 정리 예정
```

프로젝트마다 Repository를 새로 만들 필요는 없습니다. 현재 사이트에서 고유 URL을 제공하며, 실제 소스코드를 공개할 경우에만 별도 Repository로 분리해 연결하는 방향입니다.

## 콘텐츠 추가 방법

- 소개 수정: `pages/about.html`
- 자격증 링크 수정: `pages/certifications.html`
- 프로젝트 목록 수정: `pages/projects.html`
- 프로젝트 상세 수정: `pages/projects/<slug>.html`
- 사진 / 도식 추가: `assets/projects/<slug>/`에 파일을 올리고 상세 페이지의 placeholder를 실제 이미지로 교체
- 페이지 경로 수정: `app.js`의 `routes`

주의: 학교 SAP 서버의 접속정보, 인증자료, 계정, 회사 내부 자료, 권한 없는 SAP 소스코드를 공개 저장소에 올리지 마세요.

## 로컬 확인

정적 HTTP 서버에서 열어야 합니다. 예: `python -m http.server 8000` 실행 후 `http://localhost:8000/` 접속.
