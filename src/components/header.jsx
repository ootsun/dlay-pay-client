
export default function Header() {

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="https://dlay-pay.xyz" className="flex items-center">
            <img src="/logo.png" className="mr-3 h-24" alt="DLay Pay Logo"/>
          </a>
          <div className="hidden lg:flex items-center lg:order-2">
            <a href="#"
               className="text-[#4E529A] hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Log
              in</a>
          </div>
          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a href="/"
                   className="block py-2 pr-4 pl-3 text-[#8C8DFC] border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0">Our solutions</a>
              </li>
              <li>
                <a href="#"
                   className="block py-2 pr-4 pl-3 text-[#8C8DFC] border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0">Support</a>
              </li>
              <li>
                <a href="#"
                   className="block py-2 pr-4 pl-3 text-[#8C8DFC] border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0">Team</a>
              </li>
              <li>
                <a href="#"
                   className="block py-2 pr-4 pl-3 text-[#8C8DFC] border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
