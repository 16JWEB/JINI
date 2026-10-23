# JINI English / Korean 분리 운영 안내

## 주소
- 통합 선택 화면: https://16jweb.github.io/JINI/
- 영어: https://16jweb.github.io/JINI/english/
- 한국어: https://16jweb.github.io/JINI/korean/

각 언어에는 별도의 웹앱 manifest(id/start_url/scope)와 Service Worker가 있다.
공통 JS/CSS 파일은 저장소 루트에서 재사용하고, 필요 없는 다른 언어 학습 데이터는 지연 로더에서 제외한다.

## 코드 수정 원칙
- 공통 JS, CSS 수정: 루트의 원본만 수정하면 양쪽에 적용된다.
- 사이트 HTML 수정: `legacy.html`을 편집하고 `node scripts/build-split-sites.cjs`를 실행한다.
- 생성 결과: `english/index.html`, `korean/index.html` 둘 다 함께 커밋한다.
- 기존 통합 인터페이스 `legacy.html`은 비상 복구용으로만 유지한다.
- 검증: `node --test tests/*.test.cjs` (기존 테스트 포함).

## 학습 기록과 Google Drive
- URL은 다르지만 동일한 `16jweb.github.io` origin이므로 브라우저 localStorage는 공유된다.
- 기존 XP·캐릭터 키는 언어별로 이미 분리되어 있고, 사이트 진입 시 기존 데이터를 삭제하지 않는다.
- 공유된 학습시간(`jini-study-time-v1`) 및 책갈피(`jini-learning-bookmarks`)는 Drive로 보낼 때 해당 언어의 부분만 분리한다.
- 복원 및 병합 시 반대 언어의 학습시간/책갈피를 유지한다.
- Google Drive / JINI 폴더에 `jini-english-backup.json`, `jini-korean-backup.json` 파일을 개별 사용한다.
- 이전 `jini-backup.json`은 읽어 복사할 뿐 수정하거나 삭제하지 않는다.
- 각 사이트는 같은 Google OAuth Client ID를 사용할 수 있으나 각 사이트에서 연결을 별도로 수행해야 할 수 있다.
- 기존 OAuth 앱이 '테스트' 상태라면 승인된 테스트 사용자만 구글 연동 가능하다. 사이트 분리만으로 Google의 403 제한이 없어지지는 않는다.
- Google Drive 백업을 삭제하면 해당 언어 파일만 삭제한다. 기존 통합 백업과 반대 언어 백업에는 영향을 주지 않는다.

## 배포 후 수동 확인
1. 기존 사이트에서 XP/캐릭터/시간/책갈피를 기록하고 필요하면 JSON 백업 다운로드.
2. `/english/` 와 `/korean/` 에서 각각 메뉴와 캐릭터를 확인.
3. 각 사이트 Google Drive에 차례로 연결, 파일 이름과 비교 화면 확인.
4. 영어 XP 증가 → 영어만 동기화되는지 확인, 같은 순서로 한국어도 확인.
5. 기기 간 복원은 빈 테스트 기기에서 먼저 확인하고, 원래 기기 기록은 유지.
6. Chrome 모바일에서 두 주소를 홈화면에 각각 추가하여 제목/실행 주소/뒤로가기/새로고침 확인.

## 롤백
Git으로 이전 커밋을 되돌리거나 `legacy.html` 통합 인터페이스를 임시로 사용한다.
롤백 시 학습 데이터/Drive 원본을 임의 삭제하지 말 것.
