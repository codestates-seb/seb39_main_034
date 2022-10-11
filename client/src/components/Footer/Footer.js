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
            <a
              target={'_blank'}
              rel="noreferrer"
              href="https://github.com/jyoungkim"
            >
              <span>
                <b>TEAM LEADER</b>
                <p>BE 김재영</p>
              </span>
            </a>
            <a
              target={'_blank'}
              rel="noreferrer"
              href="https://github.com/sol-namoo"
            >
              <span>
                <b>TEAM MEMBER</b>
                <p>FE 이솔</p>
              </span>
            </a>
            <a
              target={'_blank'}
              rel="noreferrer"
              href="https://github.com/SiraKim0"
            >
              <span>
                <b>TEAM MEMBER</b>
                <p>FE 김시라</p>
              </span>
            </a>
            <a
              target={'_blank'}
              rel="noreferrer"
              href="https://github.com/AhnHyungJoon"
            >
              <span>
                <b>TEAM MEMBER</b>
                <p>BE 안형준</p>
              </span>
            </a>
          </div>
          <div className="link">
            <div className="logo"></div>
            <div className="icons">
              <a
                aria-label="깃허브 링크"
                target={'_blank'}
                rel="noreferrer"
                href="https://github.com/codestates-seb/seb39_main_034"
              >
                <IconBtn>
                  <BsGithub size={25} />
                </IconBtn>
              </a>
              <a
                target={'_blank'}
                rel="noreferrer"
                href="https://www.notion.so/codestates/39-Team034-TODO-3b9ac7c8ce484a3a93b76931a75e78df"
              >
                <IconBtn>
                  <SiNotion size={25} />
                </IconBtn>
              </a>
              <a
                target={'_blank'}
                rel="noreferrer"
                href="https://www.youtube.com/"
              >
                <IconBtn>
                  <BsYoutube size={25} />
                </IconBtn>
              </a>
            </div>
          </div>
        </div>
      </article>
      <div className="copyright">© 2022 TEAM 034. All rights reserved.</div>
    </FooterContainer>
  )
}
