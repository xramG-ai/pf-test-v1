# AGENTS.md (PF Rules for Codex / Agents)

너는 이 저장소에서 작업하는 에이전트다. 아래 규칙을 최우선으로 따른다.

## 0) 작업 시작 순서 (필수)
1) **TROUBLESHOOTING.md 먼저 읽기**
2) **README.md 읽기**
3) 관련 파일을 이 순서로 확인: `index.html → styles.css → app.js → content.js`
4) 오류/의심/리스크는 **수정 전에 TROUBLESHOOTING.md에 먼저 기록**

## 1) Setup Commands
- install: 정적 사이트(의존성 없음)
- dev: `python3 -m http.server 4173`
- build: 없음(정적 파일 그대로 배포)
- test/check:
  - `node --check app.js`
  - `python3 -m json.tool public/data/gallery.json`

## 2) Project Structure
- `index.html`: 앱 엔트리 + 오프닝 + 패널 템플릿
- `styles.css`: 전체 UI 스타일(오프닝/홈/패널/HELP 반짝임)
- `content.js`: ABOUT/HELP/CONTACT/오프닝 텍스트 상수
- `app.js`: 갤러리 랜덤/오프닝/패널 드래그+ESC/help 영구기억 로직
- `public/data/gallery.json`: 홈 랜덤 렌더링용 데이터 소스
- `assets/gallery/`: 갤러리 이미지 자산
- `TROUBLESHOOTING.md`: 이슈 기록/검증
- `CHANGELOG.md`: Keep a Changelog 형식 변경 이력

## 3) Conventions
- 상대 경로만 사용한다.
- 파일명은 영문 소문자 + 하이픈 권장(기존 스펙 파일명은 유지).
- localStorage key는 `pf.<domain>.<action>.v<major>` 패턴 사용.
  - 예: `pf.help.clicked.v1`, `pf.opening.done.v1`
- 라이브러리 추가 없이 vanilla JS로 구현.
- 패널 닫기 UI(X 버튼) 금지, ESC만 닫기 허용.

## 4) 절대 어기면 안 되는 금지사항 (스펙 고정)
- R1: 패널에 닫기 버튼/아이콘 추가 금지.
- R2: ESC 외 닫기 동작(오버레이 클릭, 버튼 등) 구현 금지.
- R3: 드래그 중 패널이 화면 밖으로 나가게 두는 구현 금지.
- R4: 홈 갤러리에서 중복 랜덤/고정 순서 강제 금지.
- R5: HELP 반짝임 상태를 메모리만 유지하고 영구 저장 누락 금지.
- R6: 오프닝 문구/위치 요건 미준수 금지.
- R7: Play/Skip의 체감 속도 차이 없는 동일 동작 금지.
- R8: ABOUT 말미 문구 누락 금지.
- R9: CONTACT 전송/폼/백엔드 기능 구현 금지.

## 5) 운영/기록 규칙
- 변경사항 발생 시 `CHANGELOG.md`의 `[Unreleased]` 업데이트 필수.
- 오류 발생 시 TROUBLESHOOTING에 먼저 기록하고 수정 후 Verification 채움.
- 요구사항 외 변경사항 보고:
  - `EXTRA_CHANGES.md`
  - `EXTRA_FORBIDDEN.md`
- zip 결과물은 `fixN.zip` 규칙 사용(숫자 증가만 허용).
- 커밋 메시지는 Conventional Commits(`feat/fix/docs/refactor/chore`) 권장.
