
export default function Footer() {

  return (
    <footer className="flex justify-center items-center h-max lg:h-12">
      <p className="text-center">This website was built during Encode Club's Layer Hack
        <a href="https://twitter.com/Oo_Tsun" target="_blank" rel="noreferrer" className="ml-2 align-middle">
          <img
            src="/twitter.svg"
            alt="Twitter"
            className="align-sub inline"
            width={24}
            height={24}
          />
        </a>
        <a href="https://github.com/ootsun/laydger-client" target="_blank" rel="noreferrer" className="ml-2 align-middle">
          <img
            src="/github.svg"
            alt="Github"
            className="align-sub inline"
            width={24}
            height={24}
          />
        </a>
      </p>
    </footer>
  );
}
