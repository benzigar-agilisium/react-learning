import React from "react";

const EmiCalculator = () => {
  const [input, setInput] = React.useState({
    amount: 0,
    interest: 0,
    month: 0,
  });

  const [result, setResult] = React.useState({
    emi: 0,
    interest: 0,
    total: 0,
  });

  const calculate = () => {
    const amount = parseInt(input.amount);
    const interest = parseInt(input.interest);
    const noOfMonth = parseInt(input.month);

    const totalInterest = (amount * (interest * 0.01)) / noOfMonth;
    const eachMonthInterest = totalInterest / noOfMonth;
    const totalAmount = amount / noOfMonth + totalInterest;
    const eachMonthAmount = amount / noOfMonth;

    setResult({
      emi: totalAmount,
      interest: totalInterest,
      total: totalAmount * noOfMonth,
    });
  };

  return (
    <>
      <div className="mt-10 flex flex-wrap container mx-auto px-5">
        <div className="w-full lg:w-1/3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              calculate();
            }}
            className="flex flex-col"
          >
            <h1 className="font-bold text-xl">Loan Amount : </h1>
            <input
              onChange={(e) => {
                setInput({
                  ...input,
                  amount: e.target.value,
                });
              }}
              value={input.amount}
              placeholder="Start typing..."
              className="bg-zinc-800 rounded-md mt-2 py-2 px-3"
              type="number"
            />
            <h1 className="mt-8 font-bold text-xl">
              Interest Percentage:{" "}
            </h1>
            <input
              onChange={(e) => {
                setInput({
                  ...input,
                  interest: e.target.value,
                });
              }}
              value={input.interest}
              placeholder="Start typing..."
              className="bg-zinc-800 rounded-md mt-2 py-2 px-3"
              type="number"
            />
            <h1 className="mt-8 font-bold text-xl">Duration Month : </h1>
            <input
              onChange={(e) => {
                setInput({
                  ...input,
                  month: e.target.value,
                });
              }}
              value={input.month}
              placeholder="Start typing..."
              className="bg-zinc-800 rounded-md mt-2 py-2 px-3"
              type="number"
            />
            <button
              onClick={calculate}
              className="mt-8 bg-white text-black px-3 py-2 rounded-full font-bold"
            >
              Calculate
            </button>
          </form>
        </div>
        {result.emi ? (
          <div className="mt-5 lg:mt-0 lg:pl-10 flex flex-col">
            <h1 className="font-bold text-xl">Result : </h1>
            <div className="mt-2 bg-zinc-800 p-5 rounded-md flex flex-col">
              <h1 className="font-bold text-xl">
                Monthly EMI : Rs. {parseInt(result.emi).toLocaleString()}{" "}
              </h1>
              <h1 className="mt-3 font-bold text-xl">
                Total Interest : Rs. {parseInt(result.interest).toLocaleString()}
              </h1>
              <h1 className="mt-3 font-bold text-xl">
                Total Amount : Rs. {parseInt(result.total).toLocaleString()}
              </h1>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default EmiCalculator;
