import styled from "styled-components";
import {useEffect, useState} from "react";

/**
 * All the constant values required for the game to work.
 * By changing these values we can effect the working of the game.
 */
const BIRD_HEIGHT = 38;
const BIRD_WIDTH = 43;
const WALL_HEIGHT = 600;
const WALL_WIDTH = 400;
const GRAVITY = 5.5;
const OBJ_WIDTH = 56;
const OBJ_SPEED = 6;
const OBJ_GAP = 200;

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
    const [displayCloud, setdisplayCloud] = useState('flex');


    //End the game when the player hits the bottom of the screen.
    useEffect(() => {
        let intVal;
        let intVal2;
        if (isStart && birdpos < WALL_HEIGHT - BIRD_HEIGHT) {
            intVal = setInterval(() => {
                setBirdpos((birdpos) => birdpos + GRAVITY);
            }, 18);
        } else {
            if (isStart) {
                setGameOver(50)
                setBirdpos(3000);
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
            clearInterval(intVal2);
        }
    });

    //Generating the pipes(obstacles) for the game.
    useEffect(() => {
        let objval;
        if (isStart && objPos >= -OBJ_WIDTH) {
            objval = setInterval(() => {
                setObjPos((objPos) => objPos - OBJ_SPEED);
            }, 24);

            return () => {
                clearInterval(objval);
            };
        } else {
            setObjPos(WALL_WIDTH);
            setObjHeight(Math.floor(Math.random() * (WALL_HEIGHT - OBJ_GAP)));
            if (isStart) setScore((score) => score + 1);
        }
    }, [isStart, objPos]);

    // const [time, setTime] = useState(700)

    //Ends the game of the player hits one of the obstacles.
    useEffect(() => {
        let topObj = birdpos >= 0 && birdpos < objHeight;
        let bottomObj =
            birdpos <= WALL_HEIGHT &&
            birdpos >=
            WALL_HEIGHT - (WALL_HEIGHT - OBJ_GAP - objHeight) - BIRD_HEIGHT;
        let intVal2;
        if (
            objPos >= OBJ_WIDTH &&
            objPos <= OBJ_WIDTH + 80 &&
            (topObj || bottomObj)
        ) {

            if (isStart) {
                setGameOver(50)
                setBirdpos(3000);
                setIsStart(false);
            }
            intVal2 = setInterval(() => {
                console.log('popali v useEffect')

                setBirdpos(300);
                setGameOver(-150)
                setModal('flex')
            }, 7000);

        }
        return () => {
            clearInterval(intVal2);
        }
    }, [isStart, birdpos, objHeight, objPos, modal]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.code === 'Space') {
                setIsStart(true);
                setModal('none')
                setGameOver(-150)
                setBirdpos((prev) => prev - 100);
            }
        };

        window.addEventListener('keypress', handleKeyPress);

        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, [isStart, birdpos]); // Add isStart and birdpos to the dependency list

    //useEffect with dependency Time
    // useEffect(() => {
    //     let timer;
    //
    //     if (gameOver === 50) {
    //         timer = setInterval(() => {
    //             console.log('popali v useEffect')
    //             if (time !== 0) {
    //                 setTime(time - 1)
    //                 return
    //             } else if (time === 0) {
    //                 setBirdpos(300);
    //                 setGameOver(-150)
    //                 setModal('flex')
    //                 setTime(7000)
    //             }
    //
    //
    //         }, 1000);
    //     }
    //     return () => {
    //         clearInterval(timer);
    //     }
    // }, [gameOver, time])


    //Handles the player movements.
    const handler = () => {
        if (!isStart) {
            setIsStart(true);
            setModal('none')
            setGameOver(-150)
            setpositionCurtain(-100)
            setdisplayCloud("none")
            // setModal('flex')
            setBirdpos(300);
            setScore(0);
        } else if (birdpos < BIRD_HEIGHT) setBirdpos(0);
        else setBirdpos((birdpos) => birdpos - 105);
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
        <Home onClick={handler} onKeyDown={handleKeyDown} tabIndex="0">
            <Background height={WALL_HEIGHT} width={WALL_WIDTH}>
                {
                    isStart ? <ScoreShow>Очки: {score}</ScoreShow> : ''
                }
                {/*<Modal display={modal}>*/}
                {/*    <h3>Chizhik Game</h3>*/}
                {/*</Modal>*/}
                <Curtain bottom={positionCurtain}>
                    <SubscribeLink onClick={handler} style={{top: "-17%", maxWidth: "240px"}} display={"block"}>
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
                            setBirdpos(300);
                            setGameOver(-150)
                            setModal('flex')
                        }}>
                            Подписаться
                        </SubscribeLink>
                        <SubscribeLink onClick={handler} display={"none"}>
                            Играть
                        </SubscribeLink>
                    </Modal>
                }
                {(!isStart && birdpos === 300) ? <Startboard>Играть</Startboard> : null}
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
                    left={95}
                />
                <Obj
                    height={WALL_HEIGHT - OBJ_GAP - objHeight}
                    width={OBJ_WIDTH}
                    left={objPos}
                    top={WALL_HEIGHT - (objHeight + (WALL_HEIGHT - OBJ_GAP - objHeight))}
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

const Background = styled.div`
    // background-image: url("/flappy_bird/images/background-day.png");
    // background-repeat: no-repeat; 
        // background-size: ${(props) => props.width}px ${(props) => props.height}px;
    background: #FFD900;
    //background: #303f9c;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border: 2px dashed orchid;
    position: relative;
    overflow: hidden;
    //border: 3px solid #ff0059;
`;

const Bird = styled.div`
    position: absolute;
    background-image: url("/flappy_bird/images/yellowBird.svg");
    background-repeat: no-repeat;
    background-size: ${(props) => props.width}px ${(props) => props.height}px;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    top: ${(props) => props.top}px;
    left: ${(props) => props.left}px;
    transition: all 0.05s ease-in;
`;
const Modal = styled.div`
    position: absolute;
    top: ${(props) => props.top ?? 50}%;
    z-index: 999999999;
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
`;

const Obj = styled.div`
    position: relative;
    bordee:2px dashed orange;
    background-image: url("/flappy_bird/images/column4.svg");
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
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translate(-50%, 0%);
    z-index: 1;
    font-weight: bold;
    font-size: 30px;
    color: #000000;
    //width: 0;
    //height: 0;
    //opacity: 0;
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
    position: relative;
    color: black;
    text-decoration: none;
    text-align: center;

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

    &:after {
        content: "";
        background: url("/flappy_bird/images/CutBird.svg") no-repeat;
        background-size: cover;
        width: 200px;
        height: 160px;
        bottom: 0;
        position: absolute;
        left: -1px;
    }
`