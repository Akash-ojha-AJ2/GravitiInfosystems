
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { Parallax } from "react-scroll-parallax";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const socialLinks = [
    { icon: <FaFacebook />, label: "Facebook", color: "#1877F2", link: "https://facebook.com" },
    { icon: <FaTwitter />, label: "Twitter", color: "#1DA1F2", link: "https://twitter.com" },
    { icon: <FaInstagram />, label: "Instagram", color: "#E4405F", link: "https://instagram.com" },
    { icon: <FaLinkedin />, label: "LinkedIn", color: "#0A66C2", link: "https://linkedin.com" },
  ];

  const quickLinks = [
    { name: "Home", link: "/" },
    { name: "Events", link: "/events" },
    { name: "Featured", link: "/featured" },
    { name: "About Us", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "FAQ", link: "/faq" },
  ];

  return (
    <Parallax speed={-5}>
      <footer className="bg-dark text-white pt-5 pb-3">
        <div className="container">
          
          <motion.div
            className="row g-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            
            <motion.div 
              className="col-12 col-lg-4"
              variants={itemVariants}
            >
              <div className="mb-4">
                <motion.h2 
                  className="fw-bold mb-3 text-primary"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  EventHub
                </motion.h2>
                <motion.p 
                  className="text-light opacity-75 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Your gateway to the best events and experiences. 
                  Book tickets for concerts, conferences, workshops, and more.
                </motion.p>
                
                <motion.div 
                  className="d-flex gap-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: 40,
                        height: 40,
                        background: social.color,
                        textDecoration: 'none'
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -5, 5, -5, 0],
                        transition: { duration: 0.3 }
                      }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              className="col-12 col-md-6 col-lg-3"
              variants={itemVariants}
            >
              <motion.h5 
                className="fw-bold mb-4 text-white"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                Quick Links
              </motion.h5>
              <motion.ul 
                className="list-unstyled"
                variants={containerVariants}
              >
                {quickLinks.map((link, index) => (
                  <motion.li 
                    key={index}
                    variants={itemVariants}
                    className="mb-2"
                  >
                    <motion.a
                      href={link.link}
                      className="text-light opacity-75 text-decoration-none d-flex align-items-center gap-2"
                      whileHover={{ 
                        x: 5,
                        color: "#0d6efd",
                        opacity: 1 
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <span 
                        className="bg-primary rounded-circle"
                        style={{ width: 6, height: 6 }}
                      />
                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div 
              className="col-12 col-md-6 col-lg-4"
              variants={itemVariants}
            >
              <motion.h5 
                className="fw-bold mb-4 text-white"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Contact Us
              </motion.h5>
              
              <motion.div 
                className="d-flex flex-column gap-3"
                variants={containerVariants}
              >
                <motion.div 
                  className="d-flex align-items-center gap-3"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: 40, height: 40 }}>
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="mb-0 text-light opacity-75">Email</p>
                    <a 
                      href="mailto:info@eventhub.com"
                      className="text-white text-decoration-none"
                    >
                      info@eventhub.com
                    </a>
                  </div>
                </motion.div>

                
                <motion.div 
                  className="d-flex align-items-center gap-3"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: 40, height: 40 }}>
                    <FaPhone />
                  </div>
                  <div>
                    <p className="mb-0 text-light opacity-75">Phone</p>
                    <a 
                      href="tel:+919876543210"
                      className="text-white text-decoration-none"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </motion.div>

               
                <motion.div 
                  className="d-flex align-items-center gap-3"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: 40, height: 40 }}>
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="mb-0 text-light opacity-75">Office</p>
                    <p className="mb-0 text-white">Mumbai, India</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div 
                className="mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="text-light opacity-75 mb-2">Subscribe to our newsletter</p>
                <div className="input-group">
                  <input 
                    type="email" 
                    className="form-control bg-dark border-secondary text-white" 
                    placeholder="Your email"
                    aria-label="Email for newsletter"
                  />
                  <motion.button 
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.hr 
            className="my-4 opacity-25"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          />

          <motion.div 
            className="d-flex flex-column flex-md-row justify-content-between align-items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            
            <p className="mb-2 mb-md-0 text-light opacity-75">
              © {currentYear} EventHub. All rights reserved.
            </p>
            
            
            <div className="d-flex gap-4">
              <motion.a 
                href="/privacy"
                className="text-light opacity-75 text-decoration-none"
                whileHover={{ color: "#0d6efd", opacity: 1 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a 
                href="/terms"
                className="text-light opacity-75 text-decoration-none"
                whileHover={{ color: "#0d6efd", opacity: 1 }}
              >
                Terms of Service
              </motion.a>
              <motion.a 
                href="/sitemap"
                className="text-light opacity-75 text-decoration-none"
                whileHover={{ color: "#0d6efd", opacity: 1 }}
              >
                Sitemap
              </motion.a>
            </div>
          </motion.div>

          
          <motion.button
            className="btn btn-primary rounded-circle position-fixed"
            style={{
              bottom: 20,
              right: 20,
              width: 50,
              height: 50,
              zIndex: 1000
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { delay: 1 }
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: 360,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
          >
            ↑
          </motion.button>
        </div>
      </footer>
    </Parallax>
  );
};

export default Footer;