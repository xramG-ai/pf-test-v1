# Troubleshooting Log

규칙:
- 오류가 발생하면 **수정 전에 먼저 기록**한다.
- 수정 후에는 **Verification(검증)** 을 채운다.
- 같은 문제가 재발하면 **Prevention(재발 방지)** 를 강화한다.

---

## Template (복사해서 사용)

### [ID: TS-YYYYMMDD-001] 제목
- Date:
- Symptom(증상):
- Steps to Reproduce(재현 방법):
- Expected(정상 기대값):
- Actual(실제 결과):
- Suspected Cause(원인 가설):
- Fix Plan(수정 계획):
- Fix Applied(적용한 수정):
- Verification(검증):
- Impact(영향 범위):
- Prevention(재발 방지):
- Related Commits/Files:

---

## Active Issues (현재 진행중)
- 없음

---

## Resolved (해결됨)
### [ID: TS-20260303-001] 기본 엔트리 파일/데이터 부재로 MVP 구현 불가
- Date: 2026-03-03
- Symptom(증상): 요구된 엔트리 파일(index.html, styles.css, app.js, content.js)과 gallery 데이터가 존재하지 않아 기능 검증이 불가능함.
- Steps to Reproduce(재현 방법): 저장소 루트에서 `rg --files` 및 `cat index.html` 실행.
- Expected(정상 기대값): 정적 웹 앱 엔트리와 데이터 파일이 존재하여 실행 가능해야 함.
- Actual(실제 결과): 문서 파일만 존재하고 앱 파일이 없어 실행할 UI가 없음.
- Suspected Cause(원인 가설): 초기 스냅샷만 생성된 상태로 MVP 구현이 아직 시작되지 않음.
- Fix Plan(수정 계획): 엔트리 파일/데이터/스타일/스크립트를 새로 생성해 R1~R9를 충족하고 검증 명령을 수행함.
- Fix Applied(적용한 수정): `index.html`, `styles.css`, `app.js`, `content.js`, `public/data/gallery.json`, `assets/gallery/*.svg`를 추가하고 문서/기록 파일을 갱신함.
- Verification(검증):
  - `node --check app.js` 통과
  - `python3 -m json.tool public/data/gallery.json >/dev/null` 통과
  - `python3 -m http.server 4173` + Playwright 접속으로 오프닝 skip/홈 랜덤 갤러리 렌더링 확인
- Impact(영향 범위): 전체 프런트엔드 기능(오프닝, 홈, 패널 UX, HELP, ABOUT/CONTACT).
- Prevention(재발 방지): AGENTS/README에 엔트리 파일/검증 커맨드/스펙 금지사항을 명시하고, 문서 우선 점검 절차를 고정함.
- Related Commits/Files: index.html, styles.css, app.js, content.js, public/data/gallery.json, README.md, AGENTS.md, CHANGELOG.md
