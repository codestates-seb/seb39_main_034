# Codestates 39기 - Team 034 - Main Project - 함께TODO(TogetherTodo)
![logo_combination_sm](https://user-images.githubusercontent.com/11794683/194974127-caa0cb02-cf8d-4a54-ba26-3b8df1829291.png)
## 팀 소개
- **팀명**: Team 034
- **프로젝트명**: 함께투두 (TogetherTodo)
- **팀 구성**:
    - **프론트엔드 /**
      - 김시라 / dosira686@gmail.com
      - 이솔 / sollee922@gmail.com
    - **백엔드 /** 
      - 김재영 / iamjyoungkim@gmail.com
      - 안형준 / evelynnness@gmail.com

#### **서비스 배포 링크**:  [https://client.myplayground.shop/](https://client.myplayground.shop/)

<br />

## 서비스 소개

```
😥 혹시 이런 경험 없으셨나요?
어떤 목표를 달성하고 싶어서 마음속으로 목표도 세우고, 목표에 맟춰 할일(To do) 목록도 만들어보게 되지만…
결국 할일 관리도 흐지부지해지고 목표달성도 실패한 경험!

함께투두(TogetherTodo)는 달성하기 어려운 목표, 할일 관리를 쉽고 재미있게 할 수 있는 방법을 고민하며 만들어진 서비스 입니다.
```

## 서비스 특징
📝 **목표를 설정합니다**
- 목표 작성 시 종료일, 달성 시 보상, 실패 시 벌칙을 함께 작성해 동기를 부여합니다.
작성 후 수정이 불가하므로, 현실적인 여건을 고려해 목표를 설정하도록 합니다.
- 세부적인 To-do를 필요에 따라 추가하고 수정할 수 있습니다.

💬 **과정을 기록하며 수시로 회고합니다**
- 목표를 진행하는 과정을 일기와 같은 콘텐츠로 남기고 타임라인 형태로 확인할 수 있습니다.
- 목표 날짜에 도달하면 달성/실패 여부에 관계없이 후기를 작성합니다.

📢 **다른 사용자들과 응원을 주고 받습니다**
- 다른 사용자가 목표를 잘 완료할 수 있도록 응원 버튼을 누르거나 코멘트를 남길 수 있습니다.
- 다른 사용자의 목표를 팔로우할 시, 목표의 타임라인이 업데이트 되었을 때 피드에서 확인할 수 있습니다.


<br />

## 시스템 아키텍처(System Architecture)
![TogetherTodo Sys Architecture](https://user-images.githubusercontent.com/11794683/194974131-b6de98ad-7c4b-4e82-a685-b73ab9fc81d0.png)

<br />

## 테크 스택(Tech Stack)
![Together Todo - Architecture (4)](https://user-images.githubusercontent.com/11794683/194974171-21e7a0b3-4ecd-4e81-8e08-88739e6b5c2d.png)

**1. 프론트엔드**

`JavaScript`, `React`, `React-router`, `css`, `Styled-Component`, `Redux`, `Axios`

**2. 백엔드**

`Java`, `Spring Boot`, `MySQL`, `H2`, `JWT`, `QueryDSL`, `Spring Data JPA`, `Spring Security`, `Redis`

**3. 운영/배포 환경**

`EC2`, `S3`, `RDS`, `Cloud Front`, `Elastic Load Balancer`, `Route53`

**4. 기타 커뮤니케이션 및 보조 툴**

`VS Code`, `GIT`, `Github`, `Postman`, `Figma`, `ERD Cloud`, `Discord`

<br />

## 팀원별 담당 업무
#### ✍️ 김재영's Works

- 서비스 기획 지원
    - 기능 요구사항 정의서 작성
- 데이터베이스(Database) Schema 설계
    - 필요 도메인(Domain) 정의
    - 데이터베이스 ERD 작성
- API 설계 및 개발
    - 서비스 전체 API 설계 및 개발
    - 컨트롤러(Controller, API) 계층, 서비스(Servcei) 계층, 데이터(Data) 계층의 전체 소스코드 작성
    - Postman의 Documentation 기능을 활용하여 전체 API에 대한 문서화 작업 진행
- 스프링 시큐리티를 통한 인증과 인가 구현
    - JWT(Json Web Token)을 활용한 전체 서비스 인증, 인가 기능 개발과 구현
    - 인증 과정에서 발행되는 Refresh Token을 관리하고 토큰을 재발행하는데 활용하기 위해 Redis를 도입하여 활용
- 서비스 아키텍쳐 설계 및 배포
    - AWS 서비스(EC2, S3, RDS)를 통한 함께투두 서비스 운영환경 구성 및 배포
    - 추가적으로 CloudFront와 Route 53, Amazon Certificate Manager(ACM)을 통해 CDN을 도입하고 프론트엔드 통신 환경을 Https로 구성
    - EC2 인스턴스에도 Load Balancer와 Route 53, Amazon Certificate Manager(ACM)을 통해 백엔드 통신 환경을 Https로 구성
    
#### ✍️ 김시라's Works

- 랜딩 페이지 구현
    - 원페이지 스크롤 제작
    - 캐러셀 제작
    - 탭메뉴 제작
- 개별 목표 생성 페이지 구현
    - 캘린더(라이브러리)
    - 이미지 업로드
- 개별 목표 상세 조회 페이지 구현
    - 목표 컴포넌트 제작 (`+` 응원, 팔로우, D-DAY)
    - 투두 체크리스트 제작
    - 타임라인 리스트 제작(`+` 후기창, 이미지, 이모지 라이브러리, 모달창)
    - 코멘트 리스트 제작(`+` 이모지 라이브러리)
- 푸터 컴포넌트 제작
- 명예의 전당 페이지 제작

#### 이솔's Works

- 로그인 / 회원가입 기능
    - 입력값 유효성 검증
    - JWT 토큰을 이용한 로그인 유지
    - 세부 기능별 인가 확인
- 글 목록 구현
    - 무한스크롤 페이지네이션
    - LNB 카테고리 선택에 따른 필터링
- 마이페이지
    - 내 글 목록 보기
    - 구독중인 글 피드
    - 안내 팝업 모달 + 일정 기간 띄우지 않기 설정 (쿠키 이용)
- 기타 뷰 작업
    - 랜딩페이지 애니메이션
    - GNB 사용자 프로필과 툴팁
    - 목표 진행도를 나타내는 프로그래스 바 애니메이션
    - 이벤트 페이지 및 명예의 전당 뷰

#### ✍️ 안형준's Works

- 엔티티(entity)
    - 데이터베이스 ERD 참고 후 엔티티 클래스 작성
- API 문서
    - API 문서 작성 및 요청, 응답 테스트
- 유효성 검증
    - Post dto, Patch dto 작업
- Comment API
    - 작업 중 Controller, Service 클래스 맵핑 문제로 현재 복습하며 진행중

<br />

---

### 본 README 문서에서 작성되지 않은 핵심 기능에 대한 시연 영상과 더 자세한 서비스 소개 및 기술 내용은 아래 노션페이지에서 확인할 수 있습니다.

https://codestates.notion.site/39-Team034-TODO-3b9ac7c8ce484a3a93b76931a75e78df
