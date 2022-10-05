import { FooterContainer, IconBtn } from './FooterStyle'
import { BsGithub, BsYoutube } from 'react-icons/bs'
import { SiNotion } from 'react-icons/si'

export default function Footer() {
  return (
    <FooterContainer>
      <article>
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
              <IconBtn>
                <BsGithub size={25} />
              </IconBtn>
              <IconBtn>
                <SiNotion size={25} />
              </IconBtn>
              <IconBtn>
                <BsYoutube size={25} />
              </IconBtn>
            </div>
          </div>
        </div>
      </article>
      <div className="copyright">© 2022 TEAM 034. All rights reserved.</div>
    </FooterContainer>
  )
}
