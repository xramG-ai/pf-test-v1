# PF (pf-test-v1)

포트폴리오 v1 MVP 정적 웹 프로젝트.

## Setup / Run
- Install: 의존성 없음
- Dev: `python3 -m http.server 4173` 실행 후 `http://localhost:4173`
- Build: 없음(정적 파일)
- Check:
  - `node --check app.js`
  - `python3 -m json.tool public/data/gallery.json`

## Project Structure
- `index.html`: 엔트리, 오프닝 UI, 패널 템플릿
- `styles.css`: 전체 스타일
- `content.js`: 텍스트 컨텐츠 상수
- `app.js`: 랜덤 갤러리/오프닝/패널 UX/HELP 영구기억
- `public/data/gallery.json`: 갤러리 데이터 계약(JSON)
- `assets/gallery/`: 갤러리 이미지
- `TROUBLESHOOTING.md`: 이슈 로그
- `CHANGELOG.md`: 변경 이력

## MVP Scope
- 연출 오프닝(타이핑 + THIS IS ME 고정 + Play/Skip)
- 홈 랜덤 9개 갤러리(중복 없이)
- 패널 UX(드래그 + 경계 clamp + ESC 닫기)
- HELP(★) 1회성 반짝임 영구기억(localStorage)
- ABOUT 문구 반영
- CONTACT UI placeholder만 제공

## Rules
- 상대경로만 사용
- 패널 닫기 버튼(X) 금지, ESC만 닫기 허용
- 오류 발생 시 `TROUBLESHOOTING.md` 선기록 후 수정
- 변경 시 `CHANGELOG.md` `[Unreleased]` 업데이트
