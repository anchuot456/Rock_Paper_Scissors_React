import React, { useEffect, useState } from "react";
import {
  FaRegHandPaper,
  FaRegHandRock,
  FaRegHandScissors,
} from "react-icons/fa";
import { BsFillQuestionSquareFill } from "react-icons/bs";

const Home = () => {
  const [money, setMoney] = useState<number>(5000);
  const [enemyMoney, setEmenyMoney] = useState<number>(5000);
  const [betMoney, setBetMoney] = useState<number>(0);
  const [chosenValue, setChosenValue] = useState<number>(-1);
  const [enemyValue, setEnemyValue] = useState<number>(-1);

  useEffect(() => {
    console.log(enemyValue);
    if (Number.isNaN(betMoney)) {
      setBetMoney(0);
    }
    if (money <= 0) {
      alert("You Lose!!!");
    }
    if (enemyMoney <= 0) {
      alert("You Win!!!");
    }
  }, [money, betMoney, chosenValue, enemyValue]);

  /**
   * Game Logic Table
   *         |Rock   |Paper  |Scissor
   * Rock    |Draw   |Lose   |Win
   * Paper   |Win    |Draw   |Lose
   * Scissor |Lose   |Win    |Draw
   */
  const valueTable: number[][] = [
    [0, -1, 1],
    [1, 0, -1],
    [-1, 1, 0],
  ];

  /**
   * Icon button clicked event handler
   */
  const IconButtonClickedHandler = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    let chosenId: string = (event.target as HTMLDivElement).id;
    setChosenValue(parseInt(chosenId));
  };

  /**
   * Icon style if it is clicked
   */
  const getDivStyle = (id: number) => {
    return {
      backgroundColor: chosenValue === id ? "lightblue" : "white",
    };
  };

  /**
   * Bet button clicked event handler
   */
  const BetButtonClickedHandler = () => {
    if (chosenValue < 0) {
      alert("You have to choose rock or paper or scissor");
      return;
    }
    if (betMoney === 0) {
      alert("You have to bet money");
      return;
    }
    if (betMoney > money) {
      alert("You don't have enough money");
      return;
    }
    let randomNumber: number = RandomGenerator(0, 2);
    let result: number = valueTable[chosenValue][randomNumber];
    setEnemyValue(randomNumber);
    console.log(result);
    switch (result) {
      case -1: //Lose
        setMoney(money - betMoney);
        setEmenyMoney(enemyMoney + betMoney);
        break;
      case 0: //Draw
        break;
      default: //Win
        setMoney(money + betMoney);
        setEmenyMoney(enemyMoney - betMoney);
        break;
    }

    setBetMoney(0);

    const timer: NodeJS.Timeout = setTimeout(() => {
      setEnemyValue(-1);
      setChosenValue(-1);
    }, 5000);
    return () => clearTimeout(timer);
  };

  /*
  Generate random value for enemy
   */
  const RandomGenerator = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  /**
   * Display enemy value
   * Rock if 0
   * Paper if 1
   * Scissor if 2
   */
  const DisplayEnemyValue = (value: number) => {
    switch (value) {
      case 0:
        return <FaRegHandRock id="0" className="w-40 h-40" />;
      case 1:
        return <FaRegHandPaper id="1" className="w-40 h-40" />;
      case 2:
        return <FaRegHandScissors id="2" className="w-40 h-40" />;
      default:
        return <BsFillQuestionSquareFill className="w-40 h-40" />;
    }
  };

  /**
   * New game button clicked handler
   */
  const NewGameButtonClickedHandler = () => {
    setBetMoney(0);
    setChosenValue(-1);
    setEnemyValue(-1);
    setMoney(5000);
    setEmenyMoney(5000);
    alert("Game restarted!");
  };

  return (
    <div className="home">
      <button
        className="fixed text-xl bg-slate-200 m-2 px-2 font-semibold rounded-md right-0 border-2"
        onClick={NewGameButtonClickedHandler}>
        New Game
      </button>
      <div className="text-center text-2xl m-2 px-5 text-center relative w-40 top-0 left-0">
        <div>I Have</div>
        <div className="border-2">{enemyMoney}</div>
      </div>
      <div className="w-full h-full text-center flex justify-center m-10">
        {DisplayEnemyValue(enemyValue)}
      </div>
      <div className="w-full h-full text-center flex justify-center m-10">
        {DisplayEnemyValue(chosenValue)}
      </div>
      <div className="w-full h-full text-center flex justify-center">
        <label className="text-2xl">
          You bet:{" "}
          <input
            id="betMoney"
            name="myInput"
            className="border-2"
            value={betMoney}
            onChange={(e) => setBetMoney(parseInt(e.target.value))}
          />
        </label>
        <button
          className="text-2xl bg-amber-300 m-2 px-5 font-semibold rounded-md text-center"
          onClick={BetButtonClickedHandler}>
          Bet
        </button>
        <div id="userChoose" className="flex">
          <div
            id="0"
            className="w-10 h-10 p-2 hover:bg-slate-200"
            onClick={IconButtonClickedHandler}
            style={getDivStyle(0)}>
            <FaRegHandRock id="0" className="w-full h-full" />
          </div>
          <div
            id="1"
            className="w-10 h-10 p-2 hover:bg-slate-200"
            onClick={IconButtonClickedHandler}
            style={getDivStyle(1)}>
            <FaRegHandPaper id="1" className="w-full h-full" />
          </div>
          <div
            id="2"
            className="w-10 h-10 p-2 hover:bg-slate-200"
            onClick={IconButtonClickedHandler}
            style={getDivStyle(2)}>
            <FaRegHandScissors id="2" className="w-full h-full" />
          </div>
        </div>
      </div>
      <div className="text-center text-2xl m-2 px-5 text-center absolute bottom-0 left-0">
        <div>You Have</div>
        <div className="border-2">{money}</div>
      </div>
    </div>
  );
};

export { Home };
