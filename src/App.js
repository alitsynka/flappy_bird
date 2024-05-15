import styled from "styled-components";
import {useEffect, useState} from "react";

/**
 * All the constant values required for the game to work.
 * By changing these values we can effect the working of the game.
 */
const BIRD_HEIGHT = 33;
const BIRD_WIDTH = 36;
const BIRD_POSITION = 95;
const WALL_HEIGHT = 700;
const WALL_WIDTH = 400;
const GRAVITY = 7;
const OBJ_WIDTH = 110;
const OBJ_SPEED = 6;
const OBJ_GAP = 200;
const BIRD_SPEED = 28;
const WALL_SPEED = BIRD_SPEED;

let currentSpeed = -5;

let upSteps = 0;

/**
 * This function is the main component which renders all the game objects.
 * @returns None
 */
function App() {

    //Changing the game values based on the activities done in the game.
    const [isStart, setIsStart] = useState(false);
    const [birdpos, setBirdpos] = useState(300);
    const [objHeight, setObjHeight] = useState(0);
    const [objPos, setObjPos] = useState(WALL_WIDTH);
    const [score, setScore] = useState(0);
    const [modal, setModal] = useState('flex');
    const [gameOver, setGameOver] = useState(-150);
    const [positionCurtain, setpositionCurtain] = useState(0);
    const [positionCutBird, setpositionCutBird] = useState(-1);
    const [positionRunBird, setpositionRunBird] = useState(-100);
    const [displayCloud, setdisplayCloud] = useState('flex');


    //End the game when the player hits the bottom of the screen.
    useEffect(() => {
        let intVal;
        if (isStart && birdpos < WALL_HEIGHT - BIRD_HEIGHT) {


            intVal = setInterval(() => {

                setBirdpos(birdpos + currentSpeed);
                currentSpeed += 2
                // if (upSteps) {
                //     setBirdpos(birdpos => birdpos - 10)
                //     upSteps--
                // } else {
                //     setBirdpos((birdpos) => birdpos + GRAVITY);
                //
                // }
            }, BIRD_SPEED);


        } else {

            if (isStart) {
                setGameOver(50)
                setBirdpos(300);
                setpositionCutBird(-1)
                setpositionRunBird(10)
            }
            // intVal2 = setInterval(() => {
            //     console.log('ksklsd')
            //     setBirdpos(300);
            //     setGameOver(-150)
            //     setModal('flex')
            // }, 7000);
            setIsStart(false);
        }
        return () => {
            clearInterval(intVal);
        }
    });

    const customRandom = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //Generating the pipes(obstacles) for the game.
    useEffect(() => {
        let objval;
        if (isStart && objPos >= -OBJ_WIDTH) {
            objval = setInterval(() => {
                setObjPos((objPos) => objPos - OBJ_SPEED);
            }, WALL_SPEED);

            return () => {
                clearInterval(objval);
            };
        } else {
            setObjPos(WALL_WIDTH);
            setObjHeight(Math.floor(customRandom(10, 90) * 0.01 * (WALL_HEIGHT - OBJ_GAP)));
            if (isStart) setScore((score) => score + 1);
        }
    }, [isStart, objPos]);

    const [time, setTime] = useState(7)

    //Ends the game of the player hits one of the obstacles.
    useEffect(() => {
        let topObj = birdpos >= 0 && birdpos < objHeight;

        let bottomObj =
            birdpos <= WALL_HEIGHT &&
            birdpos >= OBJ_GAP + objHeight - BIRD_HEIGHT;

        let intVal2;

        console.log('--------------------------')
        console.log(topObj)
        console.log(bottomObj)
        console.log(birdpos)
        console.log(objHeight)

        if (
            objPos >= BIRD_POSITION - OBJ_WIDTH + 7 &&
            objPos <= BIRD_POSITION + BIRD_WIDTH - 7 &&
            (topObj || bottomObj)
        ) {


            if (isStart) {
                // debugger
                console.log('skdjfksdjfjsdfksd')
                setGameOver(50)
                setpositionCutBird(-1)
                setpositionRunBird(10)
                // setBirdpos(300);
                setIsStart(false);
            }
            intVal2 = setInterval(() => {
                console.log('popali v useEffect')
                // setBirdpos(300);
                setGameOver(-150)
                setModal('flex')
            }, 7000);

        } else {

            // console.log(objPos);
            // console.log(topObj)
            // console.log(bottomObj)
            // console.log(objHeight)
            // console.log(birdpos)
            // console.log(WALL_HEIGHT - (WALL_HEIGHT - OBJ_GAP - objHeight) - BIRD_HEIGHT)
        }
        return () => {
            clearInterval(intVal2);
            // clearTimeout(intVal3);
        }
    }, [isStart, birdpos, objHeight, objPos]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.code === 'Space') {
                handler()
                // setIsStart(true);
                // setModal('none')
                // setGameOver(-150)
                //
                // setBirdpos((prev) => prev - 100);
            }
        };

        window.addEventListener('keypress', handleKeyPress);

        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, [isStart, birdpos]); // Add isStart and birdpos to the dependency list

    //useEffect with dependency Time
    useEffect(() => {
        let timer;

        if (gameOver === 50) {
            timer = setInterval(() => {
                console.log('popali v useEffect')
                if (time !== 0) {
                    setTime(time - 1)
                    return
                } else if (time === 0) {
                    setpositionCurtain(0)
                    setdisplayCloud("flex")
                    setGameOver(-150)
                    setpositionCutBird(-1)
                    setpositionRunBird(-100)
                    setModal('flex')
                    setTime(7)
                }


            }, 1000);
        }
        return () => {
            clearInterval(timer);
        }
    }, [gameOver, time])


    //Handles the player movements.
    const handler = () => {
        console.log(birdpos)
        if (!isStart) {
            setIsStart(true);
            setModal('none')
            setGameOver(-150)
            setpositionCurtain(-100)
            setpositionCutBird(-100)
            setpositionRunBird(-100)
            setdisplayCloud("none")
            setBirdpos(300);
            setScore(0);
            currentSpeed = -5
        } else if (birdpos < BIRD_HEIGHT) {
            console.log('0000')
            setBirdpos(0);
        } else {
            // upSteps = 5
            currentSpeed = -15
            // setBirdpos((birdpos) => birdpos - 40);
            // setTimeout(() => {
            //     setBirdpos((birdpos) => birdpos - 50);
            // }, BIRD_SPEED)

        }
    };

    const handleKeyDown = (event) => {
        // Check if the pressed key is the spacebar
        if (event.key === ' ' || event.key === 'Spacebar') {
            // Prevent the default behavior to avoid scrolling the page
            event.preventDefault();

            // Trigger the click event
            handler();
        }
    };

    return (
        //Whole body of the game.
        <Home tabIndex="0">
            {
                isStart && <ClickBackground onClick={handler} onKeyDown={handleKeyDown}></ClickBackground>
            }
            <Background height={WALL_HEIGHT} width={WALL_WIDTH}>
                {
                    isStart ? <ScoreShow>Очки: {score}</ScoreShow> : ''
                }
                {/*<Modal display={modal}>*/}
                {/*    <h3>Chizhik Game</h3>*/}
                {/*</Modal>*/}
                <Curtain bottom={positionCurtain}>
                    <SubscribeLink onClick={handler} style={{top: "-17%", maxWidth: "240px"}}
                                   display={"block"}>
                        Играть
                    </SubscribeLink>
                </Curtain>
                <Cloud display={displayCloud}>
                    <p>Сыграй</p>
                    <p>полетай!</p>
                </Cloud>

                {
                    gameOver
                    && <Modal top={gameOver}>
                        <ScoreText>Очки: {score}</ScoreText>
                        {/*<h5 style={{marginTop: '0px', marginBottom: "15px"}}> Restart in {time} seconds</h5>*/}
                        <DescText>Подпишись на телеграм канал чижик, чтобы не пропустить товары недели и следить за
                            новостями
                            магазина</DescText>
                        <SubscribeLink href="https://cpa.socialjet.link/VO7cSV"
                                       display={"none"}
                                       target={"_blank"} onClick={(e) => {
                            e.stopPropagation()
                            // setBirdpos(300);
                            // setGameOver(-150)
                            // setModal('flex')
                            setpositionCurtain(0)
                            setdisplayCloud("flex")
                            setGameOver(-150)
                            setpositionCutBird(-1)
                            setpositionRunBird(-100)
                            setModal('flex')
                        }}>
                            Подписаться
                        </SubscribeLink>
                        <SubscribeLink onClick={handler} display={"none"}>
                            Играть
                        </SubscribeLink>

                    </Modal>
                }
                <CutBird bottom={positionCutBird}/>
                <RunBird right={positionRunBird}/>
                <Obj
                    height={objHeight}
                    width={OBJ_WIDTH}
                    left={objPos}
                    top={0}
                    deg={180}
                />
                <Bird
                    height={BIRD_HEIGHT}
                    width={BIRD_WIDTH}
                    top={birdpos}
                    left={BIRD_POSITION}
                />
                <Obj
                    height={WALL_HEIGHT - OBJ_GAP - objHeight}
                    width={OBJ_WIDTH}
                    left={objPos}
                    top={OBJ_GAP}
                    deg={0}
                />
            </Background>
        </Home>
    )
        ;
}

export default App;

//All the stylesheets required for the game.
const Home = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flexDirection: 'column';
    overflow: hidden;
`;
const ClickBackground = styled.div`
    position: absolute;
    background: rgba(10, 35, 66, 0);
    z-index: 99999999;
    width: 100%;
    height: 100%;
`

const Background = styled.div`
    // background-image: url("/flappy_bird/images/background-day.png");
    // background-repeat: no-repeat; 
        // background-size: ${(props) => props.width}px ${(props) => props.height}px;
    background: #FFD900;
    //background: #303f9c;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    //border: 2px dashed orchid;
    position: relative;
    overflow: hidden;
`;

const Bird = styled.div`
    position: absolute;
    background-image: url("/flappy_bird/images/BirdWithoutTail.svg");
    //border: 1px dashed black;
    background-repeat: no-repeat;
    background-size: contain;
    width: 36px;
    height: 33px;
    border-radius: 30%;
    top: ${(props) => props.top}px;
    left: ${(props) => props.left}px;
    transition: all ${BIRD_SPEED}ms ease-in;
`;
const Modal = styled.div`
    position: absolute;
    top: ${(props) => props.top ?? 50}%;
    z-index: 99;
    width: 80%;
    padding: 50px 35px 35px 35px;
    background-color: #ffffff;
    display: ${(props) => props.display || 'flex'};
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 17px;
    color: #000000;
    border-radius: 20px;
    font-weight: 700;
    font-size: 24px;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.6s ease-in-out;

    &:after {
        content: '';
        position: absolute;
        width: 70px;
        height: 65px;
        background: url("/flappy_bird/images/cloudBird.svg") no-repeat;
        background-size: cover;
        top: -60px;
        right: -10px;
    }
`;

const Obj = styled.div`
    position: relative;
    //border: 1px dashed #0a3e61;
    background-image: url("/flappy_bird/images/col3.png");
    //background-repeat: repeat-y;
    //background-size: cover;
    //background-position: top;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    left: ${(props) => props.left}px;
    top: ${(props) => props.top}px;
    transform: rotate(${(props) => props.deg}deg);
`;

const Startboard = styled.div`
    position: relative;
    top: 48%;
    background-color: black;
    padding: 10px;
    width: 100px;
    left: 50%;
    margin-left: -50px;
    text-align: center;
    font-size: 20px;
    border-radius: 10px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;

`;

const ScoreShow = styled.div`
    width: 100%;
    max-width: 185px;
    height: 52px;
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translate(-50%, 0%);
    font-weight: bold;
    font-size: 30px;
    line-height: 30px;
    color: #000000;
    background: white;
    border-radius: 19px;
    z-index: 9999999999999999;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 3px 4px black
`;

const SubscribeLink = styled.a`
    background: #FFD900;
    width: 100%;
    max-width: 250px;
    font-size: 25px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 35px;
    border-radius: 25px;
    padding: 15px 30px;
    text-align: center;
    position: relative;
    color: black;
    text-decoration: none;


    &:after {
        content: '';
        position: absolute;
        background: black;
        width: 100%;
        height: 100%;
        top: 4px;
        left: 4px;
        z-index: -2;
        border-radius: 25px;
    }

    &:before {
        content: "";
        display: ${props => props.display};
        background: url("/flappy_bird/images/runBird.svg") no-repeat;
        width: 63px;
        height: 60px;
        position: absolute;
        right: -23px;
        top: -56px;
    }
`
const DescText = styled.p`
    font-size: 15px;
    font-weight: 700;
    line-height: 20.18px;
    text-align: center;
`
const ScoreText = styled.h2`
    font-size: 35px;
    font-weight: 700;
    line-height: 40px;
    text-align: center;
    text-transform: uppercase;
`
const Cloud = styled.div`
    background: url("/flappy_bird/images/cloud.svg") no-repeat;
    display: ${(props) => props.display};
    background-size: contain;
    width: 220px;
    height: 100px;
    position: relative;
    left: 50%;
    top: 20%;
    transform: translate(-50%, -20%);
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > p {
        text-transform: uppercase;
        font-size: 28px;
        font-weight: 700;
        line-height: 30px;
        text-align: center;
    }

    &:after {
        content: "";
        width: 70px;
        height: 65px;
        background: url("/flappy_bird/images/cloudBird.svg") no-repeat;
        background-size: cover;
        position: absolute;
        right: -66px;
        top: -39px;
        transform: rotate(355deg);
    }
`
const Curtain = styled.div`
    background: white;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    bottom: 0;
    width: 100%;
    height: 50%;
    bottom: ${props => props.bottom}%;
    transition: all 0.3s ease-in-out;
`
const CutBird = styled.div`
    background: url("/flappy_bird/images/CutBird.svg") no-repeat;
    background-size: cover;
    width: 200px;
    height: 160px;
    bottom: ${props => props.bottom}%;
    transition: all 0.5s ease-in-out;
    position: absolute;
    left: -1px;
    z-index: 9999999;
`
const RunBird = styled.div`
    background: url("/flappy_bird/images/runBird.svg") no-repeat;
    background-size: cover;
    width: 108px;
    height: 100px;
    bottom: 30px;
    transition: all 0.7s ease-in-out;
    position: absolute;
    right: ${props => props.right}%;
    //border:2px dashed purple;
    z-index: 9999999;
`