# PF (pf-test-v1)

이 레포는 PF 프로젝트의 **버전 스냅샷(fix 단위)**을 관리한다.  
작업은 사람/AI 모두가 동일한 규칙으로 진행한다.

---

## 0) 필수 규칙 (고정)
1) 결과물은 항상 **zip 파일로 제공**한다.  
2) zip 이름은 **fix0, fix1, fix2... 숫자만 증가**한다. (설명 붙이지 않음)  
3) 작업은 **요구사항 우선**으로 이행한다.  
4) **TROUBLESHOOTING 구조**를 사용한다.  
5) 오류가 있으면 **md에 먼저 기록 → 수정 → 수정 후 1회 추가 업데이트**한다.  
6) 업데이트(수정)할 땐 반드시 **TROUBLESHOOTING.md → README.md** 순서로 읽고 진행한다.

---

## 1) 목표 / 범위
- 목표: 포트폴리오(또는 PF 웹) 프로젝트를 안정적으로 배포/관리한다.
- 이번 버전 목표: (여기에 작성)
- 하지 않는 것(스코프): (여기에 작성)

---

## 2) 폴더/경로 규칙 (중요)
- **상대경로만 사용** (절대경로 금지)
- 권장 구조:
  - `/assets/` : 이미지/폰트/아이콘
  - `/data/` : 게시글/설정/컨텐츠 JSON 등
- 파일명은 가급적 **영문 소문자 + 하이픈(-)** 권장

---

## 3) 실행 방법
### 로컬(가장 단순)
- `index.html`을 브라우저로 열거나, VSCode Live Server로 실행

### 배포(Netlify 기준)
- Drag & Drop 배포 또는 GitHub 연동 배포
- 정적 사이트면 보통 빌드 명령 없이 동작

---

## 4) 업데이트 절차 (체크리스트)
- [ ] TROUBLESHOOTING.md 확인(기존 오류/주의사항/재발방지)
- [ ] README.md 확인(규칙/폴더/경로)
- [ ] 요구사항 반영(우선순위 유지)
- [ ] 오류 발생 시 TROUBLESHOOTING.md에 먼저 기록
- [ ] 수정 후 동작 검증(재현/검증 체크)
- [ ] CHANGELOG.md 업데이트(아래 형식 준수)
- [ ] zip 생성: `fixN.zip` (숫자만 +1)
- [ ] GitHub 커밋/업로드

---

## 5) 커밋 메시지 규칙 (최소형)
Conventional Commits “최소 타입”만 사용한다.
- feat: 기능 추가
- fix: 버그 수정
- docs: 문서
- refactor: 리팩토링
- chore: 잡일(설정/빌드/정리)

예)
- `fix(ui): 창 드래그 범위 제한`
- `feat(admin): Works 컨텐츠 편집 추가`
- `docs: update troubleshooting`

---

## 6) 문서 구조
- README.md : 규칙/가이드/실행
- CHANGELOG.md : 변경 기록(버전 스냅샷 단위)
- TROUBLESHOOTING.md : 오류/함정/재발방지 로그

---

## 7) AI 작업 프롬프트 고정문 (필수)
아래 문장을 **프롬프트 첫 줄**로 고정한다:

"README.md 먼저 읽고, 그 다음 index.html → styles.css → app.js → content.js 순서로 확인해. README의 주의사항/오류 로그를 준수하면서 수정해."
