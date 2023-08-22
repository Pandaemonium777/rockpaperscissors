import {Component} from 'react'

import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import {
  MainScore,
  MainHeading,
  ScoreCard,
  Skore,
  GameOptionImage,
  Resultz,
  GameOptionCard,
  Options,
  MainCard,
  RulesButtonContainer,
  MainContainer,
  MainOptionButton,
  GameOptionContainer,
} from './styledComponents'

class RockPaperScissors extends Component {
  state = {
    score: 0,
    isGamePaused: false,
    yourChoiceId: '',
    oppChoiceId: '',
  }

  componentDidMount() {
    const {choicesList} = this.props
    const oppChoiceIndex = Math.floor(Math.random() * 10) % 3
    const oppChoiceId = choicesList[oppChoiceIndex].id
    this.setState({oppChoiceId})
  }

  playGame = event => {
    console.log(event)
    const yourChoiceId = event.target.id
    const {oppChoiceId} = this.state
    let x
    switch (yourChoiceId) {
      case 'ROCK':
        if (oppChoiceId === 'SCISSORS') {
          x = 1
          break
        }
        if (oppChoiceId === 'PAPER') {
          x = -1
          break
        } else {
          x = 0
          break
        }

      case 'PAPER':
        if (oppChoiceId === 'SCISSORS') {
          x = -1
          break
        }
        if (oppChoiceId === 'ROCK') {
          x = 1
          break
        } else {
          x = 0
          break
        }
      case 'SCISSORS':
        if (oppChoiceId === 'PAPER') {
          x = 1
          break
        }
        if (oppChoiceId === 'ROCK') {
          x = -1
          break
        } else {
          x = 0
          break
        }
      default:
        x = 0
    }

    this.setState(prevState => ({
      score: prevState.score + x,
      yourChoiceId,
      isGamePaused: true,
    }))
  }

  renderResultsCard = () => {
    const {yourChoiceId, oppChoiceId} = this.state
    const {choicesList} = this.props
    const yourChoiceItem = choicesList.filter(
      eachItem => eachItem.id === yourChoiceId,
    )

    const yourChoiceUrl = yourChoiceItem[0].imageUrl

    const oppChoiceItem = choicesList.filter(
      eachItem => eachItem.id === oppChoiceId,
    )

    const oppChoiceUrl = oppChoiceItem[0].imageUrl

    return (
      <div>
        <Options>
          <GameOptionCard>
            <h1>YOU</h1>
            <GameOptionImage src={yourChoiceUrl} alt="your choice" />
          </GameOptionCard>
          <GameOptionCard>
            <h1>OPPONENT</h1>
            <GameOptionImage src={oppChoiceUrl} alt="opponent choice" />
          </GameOptionCard>
        </Options>
        {this.renderCurrentRoundResults()}
      </div>
    )
  }

  playAgain = () => {
    const {choicesList} = this.props
    const oppChoiceIndex = Math.floor(Math.random() * 10) % 3
    const oppChoiceId = choicesList[oppChoiceIndex].id
    this.setState({yourChoiceId: '', oppChoiceId, isGamePaused: false})
  }

  wonRoundView = () => (
    <Resultz>
      <p>YOU WON</p>
      <button onClick={this.playAgain}>PLAY AGAIN</button>
    </Resultz>
  )

  lostRoundView = () => (
    <Resultz>
      <p>YOU LOSE</p>
      <button onClick={this.playAgain}>PLAY AGAIN</button>
    </Resultz>
  )

  drawRoundView = () => (
    <Resultz>
      <p>IT IS DRAW</p>
      <button onClick={this.playAgain}>PLAY AGAIN</button>
    </Resultz>
  )

  renderCurrentRoundResults = () => {
    const {yourChoiceId, oppChoiceId} = this.state
    console.log(yourChoiceId)
    switch (yourChoiceId) {
      case 'ROCK':
        if (oppChoiceId === 'SCISSORS') {
          return this.wonRoundView()
        }
        if (oppChoiceId === 'PAPER') {
          return this.lostRoundView()
        }
        return this.drawRoundView()
      case 'PAPER':
        if (oppChoiceId === 'SCISSORS') {
          return this.lostRoundView()
        }
        if (oppChoiceId === 'ROCK') {
          return this.wonRoundView()
        }
        return this.drawRoundView()

      case 'SCISSORS':
        if (oppChoiceId === 'PAPER') {
          return this.wonRoundView()
        }
        if (oppChoiceId === 'ROCK') {
          return this.lostRoundView()
        }
        return this.drawRoundView()

      default:
        return null
    }
  }

  getMainComp = () => {
    const {isGamePaused, yourChoice, score} = this.state
    const {choicesList} = this.props

    if (isGamePaused === false) {
      return (
        <MainContainer>
          <MainCard>
            <ScoreCard>
              <MainHeading>Rock Paper Scissors</MainHeading>
              <MainScore>
                <p>Score</p>
                <Skore>{score}</Skore>
              </MainScore>
            </ScoreCard>
            <GameOptionContainer>
              <Options>
                <MainOptionButton
                  onClick={this.playGame}
                  data-testid="rockButton"
                  type="submit"
                >
                  <GameOptionImage
                    src={choicesList[0].imageUrl}
                    id={choicesList[0].id}
                    alt={choicesList[0].id}
                  />
                </MainOptionButton>
                <MainOptionButton
                  data-testid="paperButton"
                  onClick={this.playGame}
                >
                  <GameOptionImage
                    src={choicesList[1].imageUrl}
                    id={choicesList[1].id}
                    alt={choicesList[1].id}
                  />
                </MainOptionButton>
              </Options>
              <Options>
                <MainOptionButton
                  data-testid="scissorsButton"
                  onClick={this.playGame}
                >
                  <GameOptionImage
                    src={choicesList[2].imageUrl}
                    id={choicesList[2].id}
                    alt={choicesList[2].id}
                  />
                </MainOptionButton>
              </Options>
            </GameOptionContainer>
          </MainCard>
          <Popup
            modal
            trigger={
              <RulesButtonContainer>
                <button>Rules</button>
              </RulesButtonContainer>
            }
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
              alt="rules"
            />
          </Popup>
        </MainContainer>
      )
    }
    return (
      <MainContainer>
        <MainCard>
          <ScoreCard>
            <MainHeading>Rock Paper Scissors</MainHeading>
            <MainScore>
              <p>Score</p>
              <Skore>{score}</Skore>
            </MainScore>
          </ScoreCard>
          <GameOptionContainer>{this.renderResultsCard()}</GameOptionContainer>
        </MainCard>
        <Popup
          modal
          trigger={
            <RulesButtonContainer>
              <button>Rules</button>
            </RulesButtonContainer>
          }
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
            alt="rules"
          />
        </Popup>
      </MainContainer>
    )
  }

  render() {
    const {score} = this.state
    return this.getMainComp()
  }
}

export default RockPaperScissors
