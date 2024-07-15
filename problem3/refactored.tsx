import { HTMLAttributes, memo, useMemo, useState } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain?: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

type BoxProps = HTMLAttributes<HTMLDivElement>;
// if you want to use children -> ```PropsWithChildren<HTMLAttributes<HTMLDivElement>>```

interface WalletPageProps extends BoxProps {}

interface WalletRowProps {
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

const PRIORITY_BASED_ON_BLOCK_CHAIN: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
  default: -99,
};

const getPriority = (blockchain?: string): number =>
  PRIORITY_BASED_ON_BLOCK_CHAIN[blockchain ?? "default"];

// --------------- This just a test ---------------
const useWalletBalances = (): WalletBalance[] => [];
const usePrices = (): Record<string, number> => ({
  BLUR: 0.20811525423728813,
});
const classes = { row: "" };
// ------------------------------------------------

const WalletRow = memo(
  ({ amount, usdValue, formattedAmount }: WalletRowProps) => {
    console.log("🚀 ~ RE-RENDER ~ WalletRow");
    return (
      <div className={classes.row}>
        <p>{amount}</p>
        <p>{usdValue}</p>
        <p>{formattedAmount}</p>
      </div>
    );
  }
);

const WalletList = memo(({ data }: { data?: FormattedWalletBalance[] }) => {
  const prices = usePrices();
  console.log("🚀 ~ RE-RENDER ~ WalletList");

  return (
    <>
      {data?.map((balance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow
            key={index}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      })}
    </>
  );
});

export const WalletPage = (props?: WalletPageProps) => {
  const balances = useWalletBalances();
  const [count, setCount] = useState(0);
  console.log("🚀 ~ RE-RENDER ~ WalletPage");

  const sortedBalances: FormattedWalletBalance[] = useMemo(
    () =>
      balances
        .filter((balance) => {
          const balancePriority = getPriority(balance.blockchain);
          return balancePriority > -99 && balance.amount <= 0;
        })
        .sort((lhs, rhs) => {
          const leftPriority = getPriority(lhs.blockchain);
          const rightPriority = getPriority(rhs.blockchain);
          return rightPriority > leftPriority ? 1 : -1;
        })
        .map((balance: WalletBalance) => ({
          ...balance,
          formatted: balance.amount.toFixed(),
        })),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [balances.length] // you can use ```JSON.stringify(balances)``` instead of ```balances.length``` if you want a deep comparison.
  );

  return (
    <div {...props}>
      <WalletList data={sortedBalances} />
      <h1>Count: {count}</h1>
      <button type="button" onClick={() => setCount((p) => p + 1)}>
        Re-render
      </button>
    </div>
  );
};
