import Layout from "../components/layout.jsx";

export default function Root() {

  return (
    <>
      <Layout>
        <main className="flex flex-col lg:items-center p-3">
          <h1 className="mb-6 text-3xl font-bold">Hey! We're DLay Pay</h1>
          <p className="mb-3 font-light max-w-max">DLay Pay allows anonymous payments thanks to its
            &#8239;<strong className="font-semibold">simple wallet plugin</strong>.
          </p>
          <p className="mb-3 font-light max-w-max">Make sure you added the plugin to your wallet.
          </p>
          <p className="mb-3 font-light max-w-max">For now, ETH is the only supported asset.
          </p>
          <p className="mb-3 font-light max-w-max">The merchant will be paid by us as soon as you sign the transaction.
          </p>
          <p className="mb-3 font-light max-w-max">We will store your signed transaction and submit it to the blockchain later so that
            &#8239;<strong className="font-semibold">nobody can track your purchase</strong>.
          </p>
          <p className="mb-3 font-light max-w-max">Head over to <a
            href={process.env.REACT_APP_LAYDGER_HOME_PAGE}
            className="font-medium text-blue-600 underline hover:text-blue-700 hover:no-underline">
            {process.env.REACT_APP_LAYDGER_HOME_PAGE}
          </a> and start shopping now!
          </p>
        </main>
      </Layout>
    </>
  );
}
