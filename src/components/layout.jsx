import Header from "./header.jsx";
import Footer from "./footer.jsx";

export default function Layout({children}) {
  return (
      <div className="flex flex-col justify-between content-between h-screen">
        <Header />
        { children }
        <Footer />
      </div>
    );
}
