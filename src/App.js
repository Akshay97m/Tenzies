    import React from "react"
    import Die from "./Die";
    import { nanoid } from 'nanoid'
    import Confetti from "react-confetti";

    function App() {

      const [dice, setDice] = React.useState(allNewDice())
      const [tenzies, setTenzies] = React.useState(false)

      React.useEffect(() => {
          const allHeld = dice.every(die => die.isHeld)
          const firstValue = dice[0].value
          const allSameValue = dice.every(die => die.value === firstValue)
          if(allHeld && allSameValue) {
            setTenzies(true)
          }
      }, [dice])

      function gernerateNewDie() {
        return {
          value : Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
      }
      }

      function allNewDice () {
          const newDice = []
          for (let i=0; i<10; i++) {
              newDice.push(gernerateNewDie())
          }
          return newDice
      }

      function holdDice (id) {
        setDice((oldDie) => oldDie.map(die => 
            die.id === id ? {...die, isHeld:!die.isHeld} : die
          ))
      }

      function rollDice () {
        if (!tenzies) {
            setDice(oldDie => oldDie.map(die => {
            return die.isHeld ? die : gernerateNewDie()
          }))
        } else {
          setTenzies(false)
          setDice(allNewDice())
        }
      }
      
      const diceElements = dice.map (die => <Die 
                                  key={die.id} 
                                  value={die.value} 
                                  isHeld={die.isHeld}
                                  holdDice={()=>holdDice(die.id)}
                            />)

      return (
        <main >
          {tenzies && <Confetti />}
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are same. Click each die to
            freeze it at its current value between rolls
          </p>
          <div className="dice-container">
          {diceElements}
          </div>
          {tenzies && <h1>You have won</h1>}
          <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll Dice"}</button>
        </main>
      );
    }

    export default App;
