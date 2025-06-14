import React, { useState, useEffect } from "react";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isHireHovered, setIsHireHovered] = useState(false);
  const [hoveredViewButton, setHoveredViewButton] = useState(null);

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
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#000",
      color: "#fff",
      padding: 0,
      margin: 0,
    },
    header: {
      background: "url('/yashraj.jpg') center/cover no-repeat",
      height: "110vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      textAlign: "center",
      padding: "0 5vw",
      backgroundColor: "#000",
    },
    hireButton: (hovered) => ({
      marginTop: "20px",
      backgroundColor: hovered ? "#fff" : "#000",
      color: hovered ? "#000" : "#fff",
      border: "1px solid #fff",
      padding: "12px 28px",
      borderRadius: "25px",
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
      transition: "all 0.3s ease",
      transform: hovered ? "translateY(-5px)" : "translateY(0)",
      boxShadow: hovered
        ? "0 8px 20px rgba(0, 0, 0, 0.2)"
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
        <h1>Hi, I’m Yashraj Singh</h1>
        <p>Freelance Creative & Professional Web Developer</p>
        <a href="mailto:yashrajsingh3876@gmail.com" style={{ textDecoration: "none" }}>
          <button
            style={styles.hireButton(isHireHovered)}
            onMouseEnter={() => setIsHireHovered(true)}
            onMouseLeave={() => setIsHireHovered(false)}
          >
            HIRE ME
          </button>
        </a>
      </header>

      <section id="about" style={styles.section}>
        <div style={styles.aboutSection}>
          <div style={styles.aboutTextBox}>
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

      <section id="projects" style={styles.section}>
        <h2 style={styles.heading}>Portfolio</h2>
        <div style={styles.projectGrid}>
          {[
            {
              title: "GamesOnWeb",
              description: "Immerse yourself in thrilling web games—experience fun, challenge, and adventure!",
              url: "https://gamesonweb.netlify.app/",
            },
            {
              title: "E-Commerce",
              description: "A modern e-commerce UI with a clean, responsive layout.",
              url: "https://stayyoung.netlify.app/",
            },
            {
              title: "Personal Blog (MERN)",
              description: "MERN Chronicles: Scalable, Dynamic Blogs for the Modern Web.",
              url: "https://theinytimes.netlify.app/",
            },
            {
              title: "Landing Page Design",
              description: "High-converting landing page layout built to boost results.",
              url: "https://landingpagedd.netlify.app/",
            },
          ].map((project, index) => (
            <div
              key={index}
              style={styles.projectCard(hoveredCard === index)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h3 style={{ marginBottom: "10px", color: "#000" }}>
                {project.title}
              </h3>
              <p style={styles.text}>{project.description}</p>
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

      <section id="contact" style={styles.contact}>
        <h2 style={styles.heading}>Contact</h2>
        <p>
          Email: <a href="mailto:yashrajsingh3876@gmail.com">yashrajsingh3876@gmail.com</a>
        </p>
        <p>
          LinkedIn: <a href="https://www.linkedin.com/in/yashraj-singh-17205a294">linkedin.com/in/yashraj-singh</a>
        </p>
      </section>
    </main>
  );
}

export default App;
