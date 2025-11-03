// Footer.jsx
 

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t ">
      <div className="max-w-screen-xl mx-auto p-8 flex flex-col md:flex-row items-center md:justify-between gap-4">
        <div className="text-sm text-gray-600 text-center md:text-left">
          © {year} Girdhari Patel <span aria-hidden="true">❤️</span>
        </div>

        <nav aria-label="Footer links">
          <ul className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-sm">
            {/* Use target="_blank" rel="noopener noreferrer" for external links */}
            <li>
              <a
                href="#privacy"
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded"
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                href="#terms"
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded"
              >
                Terms
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;



  