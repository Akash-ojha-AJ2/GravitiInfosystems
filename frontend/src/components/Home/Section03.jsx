import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { FaFilter, FaBolt, FaStar } from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaFilter />,
    title: "Smart Filters",
    desc: "Find exactly what you're looking for with our advanced filtering options by location, category, date, and price.",
  },
  {
    id: 2,
    icon: <FaBolt />,
    title: "Instant Booking",
    desc: "Book events instantly with our secure payment system. Get e-tickets delivered directly to your email.",
  },
  {
    id: 3,
    icon: <FaStar />,
    title: "Curated Events",
    desc: "We handpick the best events in your city so you never miss out on the hottest experiences.",
  },
];

const Section03 = () => {
  return (
    <Parallax speed={-8}>
      <section className="py-5 bg-light">
        <div className="container">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-5"
          >
            <h2 className="fw-bold">
              Why Choose EventHub?
              <span
                className="d-block mt-2 bg-primary rounded"
                style={{ width: 70, height: 4 }}
              />
            </h2>
          </motion.div>

          {/* Cards */}
          <div className="row g-4">
            {features.map((item, i) => (
              <motion.div
                key={item.id}
                className="col-12 col-md-6 col-lg-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="card h-100 border-0 shadow-sm rounded-4 text-center p-4">

                  {/* Icon */}
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle bg-primary text-white"
                    style={{ width: 70, height: 70, fontSize: 26 }}
                  >
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h5 className="fw-bold mb-2">{item.title}</h5>

                  {/* Description */}
                  <p className="text-muted mb-0">
                    {item.desc}
                  </p>

                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </Parallax>
  );
};

export default Section03;
