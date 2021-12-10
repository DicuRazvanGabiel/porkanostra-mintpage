import { useEffect, useState } from "react";
import styled from "styled-components";
import Countdown from "react-countdown";
import { Button, CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import * as anchor from "@project-serum/anchor";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import leftImage from './left.png'
import porkaGif from './porka.gif'

// import {
//   CandyMachine,
//   awaitTransactionSignatureConfirmation,
//   getCandyMachineState,
//   mintOneToken,
//   shortenAddress,
// } from "./candy-machine";

import {
  shortenAddress,
} from "./candy-machine";

const ConnectButton = styled(WalletDialogButton)``;

const CounterText = styled.span``; // add your styles here

const MintContainer = styled.div``; // add your styles here

const MintButton = styled(Button)``; // add your styles here

export interface HomeProps {
  candyMachineId: anchor.web3.PublicKey;
  config: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  treasury: anchor.web3.PublicKey;
  txTimeout: number;
}

const Home = (props: HomeProps) => {
  const [balance, setBalance] = useState<number>();
  const [isActive, setIsActive] = useState(false); // true when countdown completes
  const [isSoldOut, setIsSoldOut] = useState(false); // true when items remaining is zero
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT

  const [itemsAvailable, setItemsAvailable] = useState(0);
  const [itemsRedeemed, setItemsRedeemed] = useState(0);
  const [itemsRemaining, setItemsRemaining] = useState(0);

  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const [startDate, setStartDate] = useState(new Date(props.startDate));

  const wallet = useAnchorWallet();
  // const [candyMachine, setCandyMachine] = useState<CandyMachine>();

  // const refreshCandyMachineState = () => {
  //   (async () => {
  //     if (!wallet) return;

  //     const {
  //       candyMachine,
  //       goLiveDate,
  //       itemsAvailable,
  //       itemsRemaining,
  //       itemsRedeemed,
  //     } = await getCandyMachineState(
  //       wallet as anchor.Wallet,
  //       props.candyMachineId,
  //       props.connection
  //     );

  //     setItemsAvailable(itemsAvailable);
  //     setItemsRemaining(itemsRemaining);
  //     setItemsRedeemed(itemsRedeemed);

  //     setIsSoldOut(itemsRemaining === 0);
  //     setStartDate(goLiveDate);
  //     setCandyMachine(candyMachine);
  //   })();
  // };

  // const onMint = async () => {
  //   try {
  //     setIsMinting(true);
  //     if (wallet && candyMachine?.program) {
  //       const mintTxId = await mintOneToken(
  //         candyMachine,
  //         props.config,
  //         wallet.publicKey,
  //         props.treasury
  //       );

  //       const status = await awaitTransactionSignatureConfirmation(
  //         mintTxId,
  //         props.txTimeout,
  //         props.connection,
  //         "singleGossip",
  //         false
  //       );

  //       if (!status?.err) {
  //         setAlertState({
  //           open: true,
  //           message: "Congratulations! Mint succeeded!",
  //           severity: "success",
  //         });
  //       } else {
  //         setAlertState({
  //           open: true,
  //           message: "Mint failed! Please try again!",
  //           severity: "error",
  //         });
  //       }
  //     }
  //   } catch (error: any) {
  //     // TODO: blech:
  //     let message = error.msg || "Minting failed! Please try again!";
  //     if (!error.msg) {
  //       if (error.message.indexOf("0x138")) {
  //       } else if (error.message.indexOf("0x137")) {
  //         message = `SOLD OUT!`;
  //       } else if (error.message.indexOf("0x135")) {
  //         message = `Insufficient funds to mint. Please fund your wallet.`;
  //       }
  //     } else {
  //       if (error.code === 311) {
  //         message = `SOLD OUT!`;
  //         setIsSoldOut(true);
  //       } else if (error.code === 312) {
  //         message = `Minting period hasn't started yet.`;
  //       }
  //     }

  //     setAlertState({
  //       open: true,
  //       message,
  //       severity: "error",
  //     });
  //   } finally {
  //     if (wallet) {
  //       const balance = await props.connection.getBalance(wallet.publicKey);
  //       setBalance(balance / LAMPORTS_PER_SOL);
  //     }
  //     setIsMinting(false);
  //     refreshCandyMachineState();
  //   }
  // };

  useEffect(() => {
    (async () => {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet, props.connection]);

  // useEffect(refreshCandyMachineState, [
  //   wallet,
  //   props.candyMachineId,
  //   props.connection,
  // ]);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <main style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
          <div style={{ textAlign: 'left', fontSize: '25px', fontFamily: 'sans-serif', fontWeight: 'bold' }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              {wallet && (
                <div style={{ marginBottom: '5px' }}>Wallet: {shortenAddress(wallet.publicKey.toBase58() || "")}</div>
              )}

              {wallet && <div style={{ marginBottom: '5px' }}>Balance: {(balance || 0).toLocaleString()} SOL</div>}

              {/* {wallet && <div style={{ marginBottom: '5px' }}>Total Available: {itemsAvailable}</div>} */}

              {wallet && <div style={{ marginBottom: '5px' }}>Total Available: 9996</div>}
              {wallet && <div style={{ marginBottom: '5px' }}>Redeemed: {itemsRedeemed}</div>}

              {/* {wallet && <div style={{ marginBottom: '5px' }}>Remaining: {itemsRemaining}</div>} */}
              {wallet && <div style={{ marginBottom: '5px' }}>Remaining: 9996</div>}
            </div>
            {wallet && <div style={{ width: '350px', height: '5px', background: '#E9AC0E', marginTop: '60px' }} />}

            <MintContainer>
              {!wallet ? (
                <ConnectButton>Connect Wallet</ConnectButton>
              ) : (
                <MintButton
                  style={{ justifyContent: 'center', fontSize: '28px', position: 'absolute', width: '300px', background: '#E22AFE', fontWeight: 'bold', left: '260px', marginTop: '80px' }}
                  disabled={isSoldOut || isMinting || !isActive}
                  // onClick={onMint}
                  variant="outlined"
                >
                  {isSoldOut ? (
                    "SOLD OUT"
                  ) : isActive ? (
                    isMinting ? (
                      <CircularProgress />
                    ) : (
                      "MINT SOON"
                    )
                  ) : (
                    <Countdown
                      date={startDate}
                      onMount={({ completed }) => completed && setIsActive(true)}
                      onComplete={() => setIsActive(true)}
                      renderer={renderCounter}
                    />
                  )}
                </MintButton>
              )}
            </MintContainer>

            <Snackbar
              open={alertState.open}
              autoHideDuration={6000}
              onClose={() => setAlertState({ ...alertState, open: false })}
            >
              <Alert
                onClose={() => setAlertState({ ...alertState, open: false })}
                severity={alertState.severity}
              >
                {alertState.message}
              </Alert>
            </Snackbar>
          </div>
        </main>
        <img src={leftImage} alt="Porka Nostra" style={{ paddingLeft: '200px', height: '700px', transform: 'scaleX(-1)', marginTop: '70px' }} />

      </div>
      <div style={{ width: '100%', textAlign: 'center', fontSize: '50px', marginTop: '50px' }}>
        <Countdown
          date={1639778400000}
          onMount={({ completed }) => completed && setIsActive(true)}
          onComplete={() => setIsActive(true)}
          daysInHours={false}
          renderer={renderCounter}
        />
      </div>
    </div>
  );
};

interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

const renderCounter = ({ days, hours, minutes, seconds, completed }: any) => {
  return (
    <CounterText>
      {hours + (days || 0) * 24} hours, {minutes} minutes, {seconds} seconds
    </CounterText>
  );
};

export default Home;
