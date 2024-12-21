
function Header(){
  
  return (

    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 pl-3">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">VibeBoost</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="hover:text-gray-200">Home</a>
            </li>
            <li>
              <a href="#about" className="hover:text-gray-200 pr-3">About Us</a>
            </li>
            
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
