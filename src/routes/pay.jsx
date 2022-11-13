import axios from "axios";
import * as zksync from "zksync-web3";
import {useEffect, useState} from "react";
import Layout from "../components/layout.jsx";
import {useLoaderData, useLocation, useNavigate} from "react-router-dom";
import {FormattedNumber, IntlProvider} from "react-intl";
import {BigNumber, ethers} from "ethers";
import {Web3Provider} from "zksync-web3";

export async function loader({params}) {
  const res = await axios.get(`${process.env.REACT_APP_DLAY_PAY_API_BASE_URL}/payments/${params.paymentId}`);
  return res.data;
}

export default function Pay() {

  let [provider, setProvider] = useState(null);
  let [defaultAccount, setDefaultAccount] = useState(null);
  let [userBalance, setUserBalance] = useState(null);
  let [signer, setSigner] = useState(null);
  let [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const payment = useLoaderData();

  useEffect(() => {
    if (!payment) {
      navigate('/');
    }
  }, []);

  const pay = async (e) => {
    if (window.ethereum) {
      const p = new Web3Provider(window.ethereum);
      setProvider(p);
      const s = p.getSigner();
      setSigner(s);
      await p.send('eth_requestAccounts', [])
        .catch((e) => console.error(e));
      const address = await s.getAddress();
      setDefaultAccount(address);
      const balance = BigNumber.from(await p.getBalance(address, 'latest'));
      setUserBalance(balance);
      const toPay = BigNumber.from(payment.amountInWei);
      if (balance.gte(toPay)) {
        try {
          const signedTx = await s.signTransaction({
            to: process.env.REACT_APP_DLAY_PAY_ETH_ADDRESS,
            amount: toPay,
          });
          //TODO fix "signing transactions is unsupported" error then send the tx to the server
        } catch (error) {
          if(error.message?.includes('signing transactions is unsupported')) {
            setErrorMessage('Unfortunately, I could not fully implement the button because "signers.signTransaction()" returns "Error: signing transactions is unsupported (operation="signTransaction", code=UNSUPPORTED_OPERATION, version=providers/5.7.2)"');
          }
        }
      } else {
        setErrorMessage('Not enough fund')
      }
    } else {
      setErrorMessage("Please, install MetaMask");
    }
  }

  const paySimulation = async () => {
    const res = await axios.put(`${process.env.REACT_APP_DLAY_PAY_API_BASE_URL}/payments/${payment._id}`, {serializedSignedTx: null});
    window.location.href = res.data;
  }

  return (
    <>
      <Layout>
        <main className="flex justify-evenly max-w-[100vw]">
          {payment && <div
            className="my-4 mx-3 p-4 w-full lg:w-max bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8">
            <h5 className="text-xl font-medium text-gray-900 mb-6">{payment.merchantId} - Payment
              step</h5>
            <div className="flex p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg w-full lg:w-max" role="alert">
              <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor"
                   viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"></path>
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span
                  className="font-medium">DLay Pay allows anonymous payments thanks to its simple wallet plugin :</span>
                <ul className="mt-1.5 ml-4 pr-3 text-blue-700 list-disc list-inside w-full lg:w-max">
                  <li>Make sure you added the plugin to your wallet</li>
                  <li>You need at least <IntlProvider locale='en'>
                    <FormattedNumber value={payment.amountInWei * 0.0042}
                                     style="currency"
                                     currency={'USD'}
                                     minimumFractionDigits="2"
                                     maximumFractionDigits="2"/>
                  </IntlProvider> in ETH
                  </li>
                  <li>The merchant will be paid by us as soon as you sign the transaction</li>
                  <li>We will store your signed transaction and submit it to the blockchain later so that nobody can
                    track your purchase
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-between">
              <button onClick={pay}
                      className="mb-4 mr-4 min-w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Pay <IntlProvider locale='en'>
                <FormattedNumber value={payment.amountInWei * 0.0042}
                                 style="currency"
                                 currency={'USD'}
                                 minimumFractionDigits="2"
                                 maximumFractionDigits="2"/>
              </IntlProvider>
              </button>
              <button onClick={paySimulation}
                      className="mb-4 min-w-1/3 py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                Pay (simulation) <IntlProvider locale='en'>
                <FormattedNumber value={payment.amountInWei * 0.0042}
                                 style="currency"
                                 currency={'USD'}
                                 minimumFractionDigits="2"
                                 maximumFractionDigits="2"/>
              </IntlProvider>
              </button>
            </div>
            {errorMessage &&
            <div className="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
                 role="alert">
              <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor"
                   viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"></path>
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Error: </span>{errorMessage}
              </div>
            </div>
            }
          </div>
          }
        </main>
      </Layout>
    </>
  );
}
