const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',  // Desplazamiento suave
    });
  };

  return (
    <>
      <button
        className="fixed bottom-4 right-4 p-6 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-110"
        onClick={scrollToTop}
        aria-label="Ir arriba"
      >
        <img src="/public/scrollTop.svg" alt="Avion despegando" className="w-6 h-6" />
      </button>
    </>
  );
};

export default ScrollToTopButton;