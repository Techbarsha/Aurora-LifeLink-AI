import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Form submitted:', formData);
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions? We're here to help and answer any question you might have.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="label">Name</label>
              <input
                type="text"
                id="name"
                className="input-field"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="label">Email</label>
              <input
                type="email"
                id="email"
                className="input-field"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="label">Subject</label>
              <input
                type="text"
                id="subject"
                className="input-field"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="label">Message</label>
              <textarea
                id="message"
                rows={5}
                className="input-field"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              <Send size={16} className="mr-2" />
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-8 text-white mb-8">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Visit Us</h3>
                  <p className="text-red-100">
                    MAKAUT, Haringhata<br />
                    West Bengal, India
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-6 h-6 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Call Us</h3>
                  <p className="text-red-100">+91 (800) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-6 h-6 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Email Us</h3>
                  <p className="text-red-100">contact@auroralifelink.ai</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="w-6 h-6 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Working Hours</h3>
                  <p className="text-red-100">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 1:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">How can I become a blood donor?</h3>
                <p className="text-gray-600">
                  Register on our platform, complete your health profile, and schedule your first donation appointment.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How often can I donate blood?</h3>
                <p className="text-gray-600">
                  Most people can donate whole blood every 12 weeks. The exact interval depends on your health status and previous donations.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is the AI cancer detection service free?</h3>
                <p className="text-gray-600">
                  Basic screening is free for registered users. Advanced analysis may require a subscription or per-use fee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;