

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header/Nav */}
      <header className="fixed top-0 w-full bg-gray-800 shadow-md z-10">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Portfolio</h1>
          <ul className="flex space-x-4">
            <li><a href="#hero" className="hover:text-blue-400">Home</a></li>
            <li><a href="#about" className="hover:text-blue-400">About</a></li>
            <li><a href="#projects" className="hover:text-blue-400">Projects</a></li>
            <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
            <li><a href="/travel" className="hover:text-blue-400">Travel Scheduler</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <section id="hero" className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 pt-16">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to My Portfolio</h1>
          <p className="text-lg md:text-xl mb-8">Designer and Developer</p>
          <a href="#about" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-lg transition-colors">Learn More</a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">About Me</h2>
          <p className="text-lg text-center max-w-2xl mx-auto">I am a passionate designer and developer with experience in creating beautiful and functional websites. I love bringing ideas to life through code and design.</p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Project 1</h3>
              <p>Description of project 1.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Project 2</h3>
              <p>Description of project 2.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Project 3</h3>
              <p>Description of project 3.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Contact Me</h2>
          <form className="max-w-md mx-auto">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Name</label>
              <input className="w-full px-3 py-2 bg-gray-700 rounded" type="text" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Email</label>
              <input className="w-full px-3 py-2 bg-gray-700 rounded" type="email" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Message</label>
              <textarea className="w-full px-3 py-2 bg-gray-700 rounded" rows={4}></textarea>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white transition-colors" type="submit">Send</button>
          </form>
        </div>
      </section>
    </div>
  );
}
