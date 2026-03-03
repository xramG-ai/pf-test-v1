# AGENTS.md (PF Rules for Codex / Agents)

너는 이 저장소에서 작업하는 에이전트다. 아래 규칙을 최우선으로 따른다.

---

## 0) 작업 시작 순서 (필수)
1) **TROUBLESHOOTING.md 먼저 읽고**, 기존 오류/주의사항/재발방지를 확인한다.
2) **README.md를 읽고**, 프로젝트 규칙/폴더/경로/업데이트 절차를 확인한다.
3) 관련 파일을 이 순서로 확인한다:
   - index.html → styles.css → app.js → content.js
4) 작업 중 오류/의심/리스크가 생기면 즉시 TROUBLESHOOTING.md에 먼저 기록한다(수정 전에).

---

## 1) 필수 운영 규칙 (고정)
1) 결과물은 항상 **zip**으로 제공해야 한다.
2) zip 파일 이름은 반드시 **fix0, fix1, fix2…** 처럼 숫자만 1씩 증가한다.  
   - 설명/문장/날짜를 zip 이름에 붙이지 않는다.
3) 작업은 **요구사항을 우선 이행**한다.
4) **TROUBLESHOOTING 구조**를 사용한다.
5) 오류가 있으면:
   - (a) TROUBLESHOOTING.md에 먼저 작성  
   - (b) 수정  
   - (c) 검증(Verification) 기록  
   - (d) **한 번 더 업데이트(정리 커밋/문서 반영)** 한다.
6) 업데이트할 때는 항상:
   - **TROUBLESHOOTING.md → README.md** 순서로 읽고 진행한다.

---

## 2) 경로/자산 규칙 (중요)
- **상대경로만 사용**한다. 절대경로(도메인 루트 기준 `/...`)로 고정하지 않는다.
- 이미지/폰트/아이콘은 가능한 한 `/assets/` 아래로 정리한다.
- 파일명은 영문 소문자/하이픈(-)을 권장한다.

---

## 3) 변경 기록 규칙
- 변경사항이 있으면 반드시 **CHANGELOG.md**를 업데이트한다.
- CHANGELOG는 Keep a Changelog 스타일 섹션을 따른다:
  - Added / Changed / Deprecated / Removed / Fixed / Security
- 원칙:
  - 작업 중에는 `[Unreleased]`에 누적
  - fix 스냅샷이 확정되면 `[fixN] - YYYY-MM-DD`로 옮긴다.

---

## 4) 트러블슈팅 기록 규칙 (수정 전에 먼저)
- TROUBLESHOOTING.md에 아래 필드를 채운다:
  - Symptom / Steps to Reproduce / Expected / Actual / Suspected Cause
  - Fix Plan / Fix Applied / Verification / Impact / Prevention
- “Verification(검증)”이 비어있으면 해결 완료로 간주하지 않는다.

---

## 5) 작업 결과 제출 방식 (권장)
가능하면 **PR(Pull Request)** 로 제출한다.
- PR 본문에는 무엇을 바꿨는지 + 검증 방법 + 영향 범위를 간단히 적는다.
- PR 템플릿 체크리스트를 모두 채운다.

PR이 불가능한 환경이라면, 최소한:
- 변경 파일 목록
- 변경 이유
- 검증 방법
- 남은 리스크
를 리포트로 남긴다.

---

## 6) zip(fixN) 제공 규칙 (중요)
- 에이전트 환경에서 zip을 직접 “레포에 커밋”하는 방식은 지양한다(레포 오염).
- 대신 아래 중 1개를 반드시 제공한다:
  1) **fixN.zip**을 생성해 전달(가능한 채널로 제공)  
  2) zip 생성 커맨드/절차를 리포트에 명시하고, 사용자가 그대로 재현 가능하게 한다
- fix 번호는 반드시 이전 fix에서 +1만 허용한다.

---

## 7) 커밋 메시지 최소 규칙
가능하면 Conventional Commits 최소 타입을 사용한다:
- feat / fix / docs / refactor / chore

예)
- fix(ui): restrict drag area
- docs: update troubleshooting
- docs: init CHANGELOG

---

## 8) “요구사항 외 변경” 보고 (필수)
요구사항 외로 추가/변경한 것이 있다면, 반드시 따로 명시한다.
- EXTRA_CHANGES.md : 요구사항 외에 추가/변경한 것만 정리
- EXTRA_FORBIDDEN.md : 요구사항 외에 하지 않은 것 + 이유(금지 항목 + 금지 이유)

(해당 사항이 없으면 “없음”이라고 짧게라도 적는다.)
