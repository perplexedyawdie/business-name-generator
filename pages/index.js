import { useRef, useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import landingImg from '../public/assets/side-img.png'
import Reward from 'react-rewards';
import axios from 'axios';
import ScrollToTop from "react-scroll-to-top";
import ReactTooltip from 'react-tooltip';

export default function Home() {
  const reward = useRef();
  const [generatedNames, setGeneratedNames] = useState(null);
  const [userInput, setUserInput] = useState("")
  const nameListRef = useRef();
  async function getNames() {
    if (userInput && userInput !== "") {
      reward.current.rewardMe();
      const { data } = await axios.post('/api/generate', { userInput })
      setGeneratedNames(data?.names);
      nameListRef.current.scrollIntoView({ behavior: 'smooth' })
    } else {
      reward.current.punishMe();
    }

  }
  return (
    <>
      <ScrollToTop smooth />
      <ReactTooltip />
      <section className="hero is-fullheight"
        style={{ backgroundColor: "#271140" }}>
        <div className="hero-body">
          <div className="columns" style={{ width: "100%" }}>
            <div className="column is-half is-flex is-flex-direction-column is-justify-content-space-between">
              <div>
                <p className="title is-size-1 has-text-white mb-6">
                  Your business <span style={{ color: "#e6d350" }}>deserves</span><br />
                  a unique name
                </p>
                <p className="subtitle has-text-grey-lighter">
                  Enter a word or two that captures the spirit <br />
                  of your business then watch the magic unfold!
                </p>
              </div>
              <div className="field has-addons">
                <div className="control">
                  <input
                    className="input is-large"
                    type="text"
                    placeholder="E.g: gym burger"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                </div>
                <div className="control">
                  <Reward
                    ref={(ref) => { reward.current = ref }}
                    type='confetti'
                  >
                    <a className="button is-large has-text-white"
                      style={{
                        backgroundColor: "#3cbed0",
                        borderColor: "transparent"
                      }}
                      onClick={() => getNames()}>
                      Get Names!
                    </a>
                  </Reward>
                </div>
              </div>
            </div>
            <div className="column is-half">
              <a data-tip="Illustration: SALY - 3D Illustration Pack by Alzea" href="https://www.figma.com/community/file/890095002328610853/SALY---3D-Illustration-Pack">
                <Image src={landingImg} alt="hands scribbling" layout="intrinsic" />
              </a>
            </div>

          </div>
        </div>
      </section>
      {
        generatedNames ?
          <section
            className="hero is-fullheight"
            style={{ backgroundColor: "#e6d350" }}
          >
            <div className="hero-body">
              <div ref={nameListRef} className="content" style={{ width: "100%" }}>
                <div className="tile is-ancestor is-vertical is-align-items-center">

                  {
                    generatedNames.map((name, idx) => {
                      return (
                        <div key={idx} className="tile box is-4 is-flex is-justify-content-center">
                          <span>{name} </span>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </section> : null
      }
    </>
  )
}
