import { Link } from 'react-router-dom';
import { Coffee, ArrowRight, Clock, Smartphone, CheckCircle } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Coffee className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">QueueLess</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900 px-3 py-2 hover:bg-gray-50 rounded-md">
            Log in
          </Link>
          <Link to="/signup" className="text-sm font-semibold leading-6 text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md transition-colors">
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative px-6 pt-14 lg:px-8 max-w-7xl mx-auto">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Smart Canteen Pre-Order System
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Skip the lines and save time. Pre-order your meals from the college canteen, track the status in real-time, and pick up exactly when it's ready.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/signup"
                className="flex items-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Order Faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for a better lunch break
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  Order from anywhere
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Browse the menu and place your order right from your phone before your class ends.</dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  Save time
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Get an estimated wait time and real-time updates on your order status so you never wait in line.</dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  Easy Pickup
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Just show your auto-generated token number at the counter when your food is ready.</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
