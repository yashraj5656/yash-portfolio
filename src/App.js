import React, { useState, useEffect, useRef } from "react";
import './App.css';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isHireHovered, setIsHireHovered] = useState(false);
  const [hoveredViewButton, setHoveredViewButton] = useState(null);
  const animatedRefs = useRef([]);

  useEffect(() => {
    document.body.style.margin = 0;
    document.body.style.padding = 0;
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "#fff";
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const refsSnapshot = [...animatedRefs.current];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.2 }
    );

    refsSnapshot.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refsSnapshot.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 5vw",
      backgroundColor: "#000",
      color: "#fff",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    navLinks: {
      display: "flex",
      gap: "20px",
      fontSize: "1rem",
    },
    navLink: {
      color: "#fff",
      textDecoration: "none",
      cursor: "pointer",
    },
    container: {
      fontFamily: "'Outfit', sans-serif",
      backgroundColor: "#000",
      color: "#fff",
      padding: 0,
      margin: 0,
    },
    header: {
      position: "relative",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      textAlign: "center",
      padding: "0 5vw",
      overflow: "hidden",
      zIndex: 0,
    },
    hireButton: (hovered) => ({
      marginTop: "30px",
      backgroundColor: hovered ? "#fff" : "#000",
      color: hovered ? "#000" : "#fff",
      border: "1px solid #fff",
      padding: "12px 32px",
      borderRadius: "40px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
    }),
    section: {
      padding: "60px 5vw",
      backgroundColor: "#fff",
      color: "#000",
    },
    aboutSection: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      gap: "40px",
    },
    aboutTextBox: {
      flex: 1,
    },
    heading: {
      fontSize: "2rem",
      marginBottom: "16px",
      borderBottom: "2px solid #000",
      display: "inline-block",
    },
    text: {
      fontSize: "1rem",
      lineHeight: "1.6",
      color: "#000",
    },
    projectGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: "20px",
      marginTop: "40px",
    },
    projectCard: (hovered) => ({
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      transition: "all 0.4s ease",
      transform: hovered ? "translateY(-8px) scale(1.03)" : "translateY(0) scale(1)",
      boxShadow: hovered
        ? "0 12px 24px rgba(0, 0, 0, 0.2)"
        : "0 4px 10px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      border: "1px solid #000",
    }),
    viewButton: (hovered) => ({
      marginTop: "10px",
      backgroundColor: hovered ? "#000" : "#fff",
      color: hovered ? "#fff" : "#000",
      border: "1px solid #000",
      padding: "8px 20px",
      borderRadius: "20px",
      fontSize: "0.9rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
    }),
    contact: {
      textAlign: "center",
      padding: "40px 5vw",
      backgroundColor: "#f1f1f1",
      color: "#000",
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap');

        .fade-in-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 1s ease-out;
        }
        .zoom-in {
          opacity: 0;
          transform: scale(0.8);
          transition: all 1s ease-out;
        }
        .animate {
          opacity: 1 !important;
          transform: none !important;
        }
        .background-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
        }
        .card {
          width: 270px;
          height: 350px;
          background: lightgrey;
          border-radius: 20px;
          box-shadow: -8px 8px 0px 5px rgba(50, 50, 50, 0.2);
          border: solid 2px white;
          overflow: hidden;
          position: relative;
          transition: all 0.5s ease;
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          transform: rotate(3deg) skewX(3deg);
        }
        #cardtop {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.1s ease;
          color: #fc6969;
        }
        #cardbrightfilter {
          width: 450px;
          height: 200px;
          background-color: rgba(255, 255, 255, 0.5);
          position: absolute;
          transform: rotate(-40deg) translateX(-15%) translateY(-160%);
          transition: all 0.5s ease;
          z-index: 1;
        }
        .card:hover {
          transform: translateY(-5%);
          box-shadow: 0px 20px 10px rgba(50, 50, 50, 0.2);
        }
        .card:hover #cardbrightfilter {
          transform: rotate(-42deg) translateX(-15%) translateY(-79%);
        }
        .card:active #cardtop {
          transform: scale(1.05);
        }
        .card:active #cardbottom {
          background-color: #fc6969;
          color: white;
        }
        .card:active #cardbottom hr {
          background-color: white;
        }
      `}</style>

      <main style={styles.container}>
        <nav style={styles.nav}>
          <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Yashraj</div>
          <div style={styles.navLinks}>
            <a href="#about" style={styles.navLink}>About</a>
            <a href="#projects" style={styles.navLink}>Portfolio</a>
            <a href="#contact" style={styles.navLink}>Contact</a>
          </div>
        </nav>

        <header style={styles.header}>
          <video className="background-video" autoPlay loop muted playsInline>
            <source src="/bg.mp4" type="video/mp4" />
          </video>
          <h1 ref={(el) => (animatedRefs.current[0] = el)} className="zoom-in" style={{ fontSize: isMobile ? "2.5rem" : "4.5rem", fontWeight: 800, letterSpacing: "-1px", lineHeight: 1.1 }}>
            Yashraj Singh Chundawat
          </h1>
          <p ref={(el) => (animatedRefs.current[1] = el)} className="fade-in-left" style={{ fontSize: isMobile ? "1rem" : "1.5rem", fontWeight: 400, marginTop: "20px" }}>
            Showcasing Expertise in Web Development
          </p>
          <a href="#projects" style={{ textDecoration: "none", marginTop: "30px" }}>
            <button
              style={styles.hireButton(isHireHovered)}
              onMouseEnter={() => setIsHireHovered(true)}
              onMouseLeave={() => setIsHireHovered(false)}
              ref={(el) => (animatedRefs.current[2] = el)}
              className="zoom-in"
            >
              Explore
            </button>
          </a>
        </header>

         <section id="about" style={styles.section}>
          <div style={styles.aboutSection}>
            <div
              style={styles.aboutTextBox}
              ref={(el) => (animatedRefs.current[3] = el)}
              className="fade-in-left"
            >
              <h2 style={styles.heading}>Introduction About Me</h2>
                 <p style={styles.text}>
              Hi, I'm Yashraj Singh — a MERN Stack Web Developer. I specialize
              in building modern, responsive, and scalable websites using
              MongoDB, Express.js, React, and Node.js. From interactive user
              interfaces to powerful backend systems, I craft full-stack web
              solutions that deliver real impact.
            </p>
            <p style={styles.text}>
              From developing sleek and responsive UI components to building
              secure APIs and managing databases, I handle every layer of web
              development with precision and creativity.
            </p>
            <p style={styles.text}>
              Over the years, I’ve worked on diverse projects including
              e-commerce sites, dashboards, SaaS platforms, and portfolio
              websites — each tailored to meet the unique needs of clients and
              users.
            </p>
            <p style={styles.text}>
              If you're looking for someone to turn your web ideas into reality
              with robust, maintainable code and a strong focus on user
              experience — I'm here to help.
            </p>
            </div>
          </div>
       

        



        </section>


        <section id="skills" style={styles.section}>
  <div
    ref={(el) => (animatedRefs.current[11] = el)}
    className="fade-in-left"
  >
    <h2 style={styles.heading}>Skills & Expertise</h2>

    <div style={{
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: "40px",
      marginTop: "30px"
    }}>
      <div>
        <h3 style={{ ...styles.text, fontWeight: "600", marginBottom: "10px" }}>Technical Skills</h3>
        <ul style={{ ...styles.text, paddingLeft: "20px" }}>
          <li>HTML, CSS, JavaScript, PHP, MySQL</li>
          <li>MERN Stack (MongoDB, Express.js, React.js, Node.js)</li>
          <li>SEO Techniques & Web Performance Optimization</li>
          <li>Social Media Management & Digital Marketing</li>
          <li>Graphic Design & Video Editing</li>
        </ul>
      </div>

      <div>
        <h3 style={{ ...styles.text, fontWeight: "600", marginBottom: "10px" }}>Soft Skills</h3>
        <ul style={{ ...styles.text, paddingLeft: "20px" }}>
          <li>Leadership & Team Management</li>
          <li>Problem Solving & Critical Thinking</li>
          <li>Time Management & Adaptability</li>
          <li>Effective Communication</li>
          <li>Client Collaboration & Business Insight</li>
        </ul>
      </div>
    </div>
  </div>
</section>

        

        

        <section id="projects" style={styles.section}>
          <h2
            style={styles.heading}
            ref={(el) => (animatedRefs.current[4] = el)}
            className="zoom-in"
          >
            Portfolio
          </h2>
          <div style={styles.projectGrid}>
  {[
    {
      title: "Zenqentra - Developer Roadmaps",
      description: "A modern learning platform providing structured developer roadmaps and best practices.",
      details: "Tech: React.js, React Router, Netlify. Features: Role-based learning paths, SEO-friendly pages, responsive UI.",
      imageUrl: "/devpath.png",
      url: "https://zyqentra.netlify.app/"
    },
    
    {
      title: "WenGenX",
      description: "Immerse yourself in thrilling web built using React & JavaScript.",
      details: "Tech: React, HTML5 Canvas, Netlify. Features: Keyboard & touch controls, animations.",
      imageUrl: "/wengenx.png",  // Add image paths in your public folder
      url: "https://webgenx.netlify.app/"
    },
    {
      title: "E-Commerce",
      description: "A modern e-commerce UI that offers a seamless shopping experience.",
      details: "Tech: React, Context API, Stripe (mock), Netlify.",
      imageUrl: "/stayyoung.png",
      url: "https://stayyoung.netlify.app/"
    },
    {
      title: "Personal Blog (MERN)",
      description: "Dynamic blogging platform with Markdown posts.",
      details: "Tech: MERN, JWT Auth, MongoDB Atlas. Features: CRUD blogs, comments, rich editor.",
      imageUrl: "/tyj.png",
      url: "https://theinyt7878imes.netlify.app/"
    }

  ].map((project, index) => (
    <div
      key={index}
      ref={(el) => (animatedRefs.current[5 + index] = el)}
      className="fade-in-left"
      style={styles.projectCard(hoveredCard === index)}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div style={{ overflow: "hidden", borderRadius: "8px", marginBottom: "10px" }}>
  <img
    src={project.imageUrl}
    alt={project.title}
    style={{
      width: "100%",
      height: "180px",
      objectFit: "cover",
      transition: "transform 0.5s ease",
      transform: hoveredCard === index ? "scale(1.1)" : "scale(1)",
    }}
  />
</div>

      <h3 style={{ marginBottom: "8px", color: "#000" }}>{project.title}</h3>
      <p style={styles.text}>{project.description}</p>
      <p style={{ ...styles.text, fontSize: "0.85rem", color: "#333" }}>{project.details}</p>
      <a href={project.url} target="_blank" rel="noopener noreferrer">
        <button
          style={styles.viewButton(hoveredViewButton === index)}
          onMouseEnter={() => setHoveredViewButton(index)}
          onMouseLeave={() => setHoveredViewButton(null)}
        >
          View Project
        </button>
      </a>
    </div>
  ))}
</div>

        </section>

        <section
  id="contact"
  style={{
    ...styles.contact,
    backgroundColor: "#000",
    color: "#fff",
    padding: "80px 5vw",
  }}
  ref={(el) => (animatedRefs.current[10] = el)}
  className="fade-in-left"
>
  <h2 style={{ ...styles.heading, color: "#fff", borderBottom: "2px solid #fff" }}>Let's Connect</h2>
  <p style={{ fontSize: "1rem", marginTop: "10px", marginBottom: "30px", color: "#ccc" }}>
    Feel free to reach out via email or connect on LinkedIn.
  </p>

  <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  }}>
    <a
      href="mailto:yashrajsingh3876@gmail.com"
      style={{
        color: "#fff",
        textDecoration: "none",
        fontSize: "1.1rem",
        border: "1px solid #fff",
        padding: "12px 24px",
        borderRadius: "30px",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = "#fff"}
      onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
    >
      ✉️ yashrajsingh3876@gmail.com
    </a>

    <a
      href="https://www.linkedin.com/in/yashraj-singh-17205a294"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "#fff",
        textDecoration: "none",
        fontSize: "1.1rem",
        border: "1px solid #fff",
        padding: "12px 24px",
        borderRadius: "30px",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = "#fff"}
      onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
    >
      🔗 LinkedIn Profile
    </a>
  </div>
</section>

      </main>
    </>
  );
}

export default App;
