import React from 'react'

const posts = [
    {
        id: 1,
        title: 'How to Build a Minimal Blog Layout',
        excerpt: 'A practical guide to creating a clean, readable blog landing page inspired by Medium.',
        author: 'Aarav Sharma',
        readTime: '6 min',
        date: 'Oct 29, 2025',
        cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=60'
    },
    {
        id: 2,
        title: 'Design Systems for Indie Writers',
        excerpt: 'Design tokens and simple components that scale with your writing.',
        author: 'Meera Patel',
        readTime: '9 min',
        date: 'Oct 26, 2025',
        cover: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=60'
    },
    {
        id: 3,
        title: 'SEO Tips for Long-form Content',
        excerpt: 'Actionable tips to help your long articles gain traction in search.',
        author: 'Rohan Verma',
        readTime: '7 min',
        date: 'Oct 22, 2025',
        cover: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=60'
    }
];
 export default function LandingPage() {
    
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navigation */}
      {/* <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-extrabold">Mediumish</div>
            <nav className="hidden md:flex items-center space-x-4 text-sm text-gray-700">
              <a className="hover:underline" href="#">Home</a>
              <a className="hover:underline" href="#">Topics</a>
              <a className="hover:underline" href="#">About</a>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <button className="hidden md:inline-block px-4 py-2 border rounded-full text-sm">Sign in</button>
            <button className="bg-black text-white px-4 py-2 rounded-full text-sm">Get started</button>
          </div>
        </div>
      </header> */}

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Write what matters. Read what matters.</h1>
            <p className="mt-4 text-lg text-gray-700">A clean, focused place for long-form writing — built to showcase ideas and stories. Get started with writing, exploring curated topics, and growing your audience.</p>

            {/* <div className="mt-6 flex flex-wrap gap-3">
              <input className="flex-1 min-w-[200px] px-4 py-3 border rounded-md" placeholder="Search articles, topics or authors" />
              <button className="px-5 py-3 bg-black text-white rounded-md">Explore top stories</button>
            </div> */}

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {posts.map(p => (
                <article key={p.id} className="flex bg-white border rounded-lg overflow-hidden shadow-sm">
                  <img src={p.cover} alt="cover" className="w-32 h-32 object-cover hidden sm:block" />
                  <div className="p-4 flex-1">
                    <h3 className="font-semibold text-lg">{p.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{p.excerpt}</p>
                    <div className="mt-3 text-xs text-gray-500">{p.author} · {p.readTime} · {p.date}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden md:block">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white p-4 border rounded-lg">
                <h4 className="font-semibold">Subscribe</h4>
                <p className="text-sm text-gray-600 mt-2">Get weekly highlights and writing tips.</p>
                {/* <form className="mt-3 flex flex-col gap-2">
                  <input className="px-3 py-2 border rounded" placeholder="Your email" />
                  <button className="px-3 py-2 bg-black text-white rounded">Subscribe</button>
                </form> */}
              </div>

              <div className="bg-white p-4 border rounded-lg">
                <h4 className="font-semibold">Top topics</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['Design','Tech','Startups','Product','Marketing','Career'].map(t => (
                    <span key={t} className="px-3 py-1 border rounded-full text-sm">{t}</span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 border rounded-lg">
                <h4 className="font-semibold">About</h4>
                <p className="text-sm text-gray-600 mt-2">Medium is a minimal blog platform for writers and readers.</p>
              </div>
            </div>
          </aside>
        </section>

        {/* Featured grid */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold">Featured</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(p => (
              <div key={p.id} className="bg-white border rounded-lg overflow-hidden">
                <div className="h-44 bg-gray-200">
                  <img src={p.cover} alt="cover" className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{p.excerpt}</p>
                  <div className="mt-3 text-xs text-gray-500">{p.author} · {p.readTime}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

     
      </main>
    </div>
  );
}
