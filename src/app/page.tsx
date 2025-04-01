import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-gradient-radial from-apple-darkgray to-black text-white">
        <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-medium mb-6 leading-tight">Hi, I'm Andrew Van</h1>
            <p className="text-xl text-apple-gray mb-8">Innovative Data Scientist with 9 years of experience in developing advanced medical applications</p>
            <div className="flex space-x-4">
              <Button href="/contact" variant="primary" size="large">Contact Me</Button>
              <Button href="/projects" variant="outline" size="large">View My Work</Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-2 border-white/20 backdrop-blur-sm">
              {/* Replace with your profile image */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg">
                Profile Image
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
