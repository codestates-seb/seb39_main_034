import { FooterContainer } from './FooterStyle'
export default function Footer() {
  return (
    <FooterContainer>
      <div className="department">
        <b>CODE STATES SEB 39기</b>
        <p>TEAM 34조</p>
      </div>
      <div className="info">
        <div className="member">
          <span>
            <b>TEAM LEADER</b>
            <p>BE 김재영</p>
          </span>
          <span>
            <b>TEAM MEMBER</b>
            <p>FE 이솔</p>
          </span>
          <span>
            <b>TEAM MEMBER</b>
            <p>FE 김시라</p>
          </span>
          <span>
            <b>TEAM MEMBER</b>
            <p>BE 안형준</p>
          </span>
        </div>
        <div className="link">
          <div className="logo"></div>
          <div className="icons">
            <div className="icon">G</div>
            <div className="icon">N</div>
            <div className="icon">Y</div>
          </div>
        </div>
      </div>
    </FooterContainer>
  )
}
