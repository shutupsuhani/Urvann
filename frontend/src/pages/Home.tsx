import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Shield, Truck, Heart } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Premium Quality",
      description: "Hand-picked plants from the finest nurseries"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Plant Health Guarantee",
      description: "30-day health guarantee on all purchases"
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Fast Delivery",
      description: "Quick and safe delivery to your doorstep"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Expert Care Tips",
      description: "Free care guides with every plant"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Bring Nature{' '}
                <span className="text-emerald-600">Home</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Transform your space with our premium collection of healthy, 
                beautiful plants. From beginners to experts, we have the perfect 
                green companions for everyone.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-all duration-200"
                >
                  Browse Collection
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 p-8 shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Beautiful plants collection"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-4 -left-4 bg-white rounded-full p-3 shadow-lg animate-pulse">
                <Leaf className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="absolute bottom-8 -right-4 bg-white rounded-full p-3 shadow-lg animate-pulse delay-1000">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Urvann?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to bringing you the healthiest plants with 
              exceptional service and expert guidance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center space-y-4 p-6 rounded-xl hover:bg-emerald-50 transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full text-emerald-600 group-hover:bg-emerald-200 transition-colors">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Plant Journey?
          </h2>
          
          <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
            Join thousands of happy plant parents who've transformed their homes 
            with our premium plant collection.
          </p>
          
          <Link
            to="/shop"
            className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Explore Our Plants
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;