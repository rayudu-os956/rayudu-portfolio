import { useEffect, useState } from "react";
import "./App.css";
import GrandLine3D from "./GrandLine3D";

/* =========================================================
   PROJECT DATA
========================================================= */

const projects = [
  {
    id: "01",
    icon: "AI",
    title: "Sleep Stage Recognition",
    date: "JUN 2025 — NOV 2025",
    accent: "gold",

    github:
      "https://github.com/rayudu-os956/MOP-AI-IOT-Code/tree/master/artificial-intelligence/T2_2025/Health%20Behaviour",

    summary:
      "Developed a sleep pattern recognition system using EEG and ECG time-series data.",

    description:
      "Built a machine-learning based system for analysing EEG and ECG time-series data, classifying sleep stages and identifying abnormalities across sleep-cycle patterns.",

    technologies: [
      "Python",
      "Machine Learning",
      "EEG",
      "ECG",
      "Data Analysis",
    ],

    highlights: [
      "Worked with EEG and ECG time-series data",
      "Implemented machine learning classification models",
      "Classified different sleep stages",
      "Evaluated models using accuracy and F1-score",
      "Analysed results using confusion matrices",
    ],
  },

  {
    id: "02",
    icon: "</>",
    title: "Online Shopping Website",
    date: "APR 2024 — MAY 2024",
    accent: "cyan",

    summary:
      "Designed and developed a full-stack shopping website with product browsing, cart and checkout functionality.",

    description:
      "Developed a full-stack e-commerce application using C# and .NET with a responsive Blazor-based frontend and database-backed product and order management.",

    technologies: [
      "C#",
      ".NET",
      "Blazor",
      "HTML",
      "CSS",
      "Database",
    ],

    highlights: [
      "Built product browsing functionality",
      "Implemented shopping cart functionality",
      "Developed checkout workflow",
      "Built backend logic using C# and .NET",
      "Integrated database storage",
      "Implemented validation and error handling",
    ],
  },

  {
    id: "03",
    icon: "BIO",
    title: "Biometric Authentication System",
    date: "JAN 2022 — MAY 2022",
    accent: "gold",

    summary:
      "Designed and implemented a biometric authentication system using Raspberry Pi for secure access control.",

    description:
      "Created a hardware-software authentication system integrating biometric sensors with a Raspberry Pi to capture, process and verify identity before granting system access.",

    technologies: [
      "Raspberry Pi",
      "Embedded Systems",
      "Biometrics",
      "Hardware",
      "Software Integration",
    ],

    highlights: [
      "Integrated biometric sensors with Raspberry Pi",
      "Captured and processed biometric information",
      "Implemented identity verification logic",
      "Developed access grant and denial decisions",
      "Performed hardware-software integration and debugging",
    ],
  },

  {
    id: "04",
    icon: "SAT",
    title: "Satellite Communication & Networking",
    date: "NOV 2021 — DEC 2021",
    accent: "cyan",

    summary:
      "Analysed SpaceX's Starlink LEO satellite constellation and its role in global broadband connectivity.",

    description:
      "Prepared and presented a technical seminar exploring LEO satellite networking, Starlink architecture and the potential role of satellite broadband in improving rural connectivity.",

    technologies: [
      "Networking",
      "LEO Satellites",
      "Starlink",
      "Communication Systems",
    ],

    highlights: [
      "Studied LEO satellite communication",
      "Analysed the Starlink constellation",
      "Explored rural internet-access challenges in India",
      "Explained satellites, ground stations and user terminals",
      "Discussed benefits, limitations and future scope",
    ],
  },

  {
    id: "05",
    icon: "IC",
    title: "2-Bit Magnitude Comparator",
    date: "SEP 2021 — DEC 2022",
    accent: "gold",

    summary:
      "Designed a 45 nm CMOS two-bit magnitude comparator using multiple transistor-level logic techniques.",

    description:
      "Designed and simulated a two-bit magnitude comparator using Pass Transistor Logic, Transmission Gate Logic and conventional CMOS techniques in 45 nm technology.",

    technologies: [
      "VLSI",
      "45 nm CMOS",
      "Tanner EDA",
      "T-SPICE",
      "PTL",
      "TGL",
    ],

    highlights: [
      "Designed a two-bit magnitude comparator",
      "Used PTL, TGL and conventional CMOS techniques",
      "Modelled the circuit using Tanner S-Edit",
      "Performed T-SPICE simulations",
      "Conducted DC analysis and waveform validation",
      "Compared delay, power and Power Delay Product",
    ],
  },
];

/* =========================================================
   PROJECT MODAL
========================================================= */

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="projectModalOverlay"
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        className={`projectModal ${
          project.accent === "cyan" ? "projectModalCyan" : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modalDecorLine"></div>

        <div className="projectModalHeader">
          <div>
            <small>PROJECT / {project.id}</small>
            <span>ENGINEERING LOG</span>
          </div>

          <button
            className="projectModalClose"
            type="button"
            onClick={onClose}
            aria-label="Close project details"
          >
            ×
          </button>
        </div>

        <div className="projectModalHero">
          <div className="projectModalIcon">
            {project.icon}
          </div>

          <div>
            <p className="projectModalDate">
              {project.date}
            </p>

            <h2 id="project-modal-title">
              {project.title}
            </h2>

            <div className="projectModalTags">
              {project.technologies.map((technology) => (
                <span key={technology}>
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="projectModalGrid">
          <div className="projectModalOverview">
            <small>01 / OVERVIEW</small>
            <p>{project.description}</p>
          </div>

          <div className="projectModalBuild">
            <small>02 / WHAT I BUILT</small>

            <ul>
              {project.highlights.map((highlight) => (
                <li key={highlight}>
                  <span>→</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="projectModalFooter">
          <div className="modalStatus">
            <i></i>
            PROJECT ARCHIVE
          </div>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              View Project on GitHub
              <span>↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   APP
========================================================= */

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("rayudu-theme") || "dark";
  });

  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("rayudu-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) =>
      current === "dark" ? "light" : "dark"
    );
  };

  return (
    <div className="site">

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brandMark">R</span>

          <div>
            <strong>RAYUDU</strong>
            <small>CODE · CONNECT · EXPLORE</small>
          </div>
        </a>

        <nav className="navLinks">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#ccna">CCNA</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="navActions">
          <button
            className="themeToggle"
            onClick={toggleTheme}
            aria-label="Toggle light and dark mode"
          >
            <span className={theme === "dark" ? "selected" : ""}>
              ☾
            </span>

            <div className="toggleTrack">
              <div
                className={`toggleBall ${
                  theme === "light" ? "lightPosition" : ""
                }`}
              />
            </div>

            <span className={theme === "light" ? "selected" : ""}>
              ☀
            </span>
          </button>

          <a
            className="resumeButton"
            href="/Rayudu_Resume.pdf"
            download="Leela_Venkata_Subba_Rayudu_Gudipalli_Resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Resume <span>↗</span>
          </a>
        </div>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <main className="hero" id="home">
        <section className="heroContent">
          <div className="heroMeta">
            <span className="metaLine"></span>
            <span>SOFTWARE ENGINEER</span>
            <b>/</b>
            <span>CCNA · NETWORKING</span>
          </div>

          <h1>
            BUILD.
            <br />

            <span className="goldText">
              CONNECT.
            </span>

            <br />

            EXPLORE
            <br />

            <span className="cyanText">
              BEYOND.
            </span>
          </h1>

          <p className="heroDescription">
            I'm Rayudu — a Software Engineer with a foundation
            in C# and .NET, cloud technologies and engineering
            systems, now expanding into network engineering
            through CCNA and hands-on Cisco labs.
          </p>

          <div className="techStack">
            <span><i></i>C# / .NET</span>
            <span><i></i>AZURE</span>
            <span><i></i>CCNA</span>
            <span><i></i>NETWORKING</span>
            <span><i></i>PYTHON</span>
          </div>

          <div className="heroButtons">
            <a className="workButton" href="#projects">
              Explore My Work
              <span>→</span>
            </a>

            <a className="contactButton" href="#ccna">
              My CCNA Journey
              <span>↗</span>
            </a>
          </div>

          <div className="miniTerminal">
            <div className="terminalTop">
              <span></span>
              <span></span>
              <span></span>
              <small>rayudu@portfolio</small>
            </div>

            <div className="terminalContent">
              <p>
                <b>$</b> whoami
              </p>

              <p>
                <span>role</span>
                Software Engineer
              </p>

              <p>
                <span>stack</span>
                C# · .NET · Azure
              </p>

              <p>
                <span>current</span>
                CCNA · Network Engineering
              </p>

              <p>
                <span>status</span>
                <strong>always_learning</strong>
                <i className="terminalCursor"></i>
              </p>
            </div>
          </div>
        </section>

        {/* 3D GRAND LINE */}

        <section className="visualArea">
          <div className="visualHeader">
            <div>
              <span>THE GRAND LINE</span>
              <small>ENGINEERING JOURNEY</small>
            </div>

            <span className="coordinates">
              LOG / 001
            </span>
          </div>

          <div className="threeContainer">
            <GrandLine3D />
          </div>

          <div className="corner cornerTL"></div>
          <div className="corner cornerTR"></div>
          <div className="corner cornerBL"></div>
          <div className="corner cornerBR"></div>

          <div className="journeyMessage">
            <span>01</span>

            <div>
              <small>CURRENT COURSE</small>

              <strong>
                SOFTWARE → CLOUD → CCNA → NETWORKS
              </strong>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          BOTTOM STRIP
      ===================================================== */}

      <div className="bottomStrip">
        <span>SOFTWARE ENGINEERING</span>
        <i></i>

        <span>CLOUD</span>
        <i></i>

        <span>CCNA</span>
        <i></i>

        <span>NETWORK ENGINEERING</span>

        <div className="scrollHint">
          SCROLL TO EXPLORE <b>↓</b>
        </div>
      </div>

      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section
        className="contentSection aboutSection"
        id="about"
      >
        <div className="sectionNumber">
          01 / ABOUT
        </div>

        <div className="sectionHeading">
          <p className="eyebrow">
            THE PERSON BEHIND THE TERMINAL
          </p>

          <h2>
            I build software.
            <br />

            <span>
              Then I explore what powers it.
            </span>
          </h2>
        </div>

        <div className="aboutGrid">
          <div className="aboutStory">
            <p className="largeParagraph">
              My engineering journey started with software
              development and has grown into cloud, systems
              and networking.
            </p>

            <p>
              My software foundation is centred around C#,
              .NET and web development, with experience
              working across applications, APIs, databases
              and cloud technologies.
            </p>

            <p>
              My engineering projects have also taken me
              into machine learning, Raspberry Pi,
              biometric authentication, satellite
              communication and VLSI design.
            </p>

            <p>
              I'm now building my network engineering
              foundation through CCNA study and hands-on
              Cisco labs, connecting my software knowledge
              with the infrastructure underneath it.
            </p>
          </div>

          <div className="aboutCode">
            <div className="codeHeader">
              <span>journey.cs</span>
              <small>C#</small>
            </div>

            <pre>
{`public class Rayudu
{
    string Role =
        "Software Engineer";

    string Foundation =
        "C# / .NET";

    string[] Journey =
    {
        "Software",
        "Cloud",
        "CCNA",
        "Networks"
    };

    string CurrentFocus =
        "Network Engineering";

    string Mission =>
        "Build. Connect. Explore.";
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* =====================================================
          JOURNEY
      ===================================================== */}

      <section
        className="contentSection journeySection"
        id="journey"
      >
        <div className="sectionNumber">
          02 / JOURNEY
        </div>

        <div className="sectionHeading">
          <p className="eyebrow">
            MY ENGINEERING GRAND LINE
          </p>

          <h2>
            One foundation.
            <br />

            <span>
              A journey across systems.
            </span>
          </h2>
        </div>

        <div className="journeyTimeline">

          <a href="#projects" className="journeyCard">
            <span className="journeyIndex">01</span>
            <div className="journeyDot goldDot"></div>

            <small>FOUNDATION</small>

            <h3>.NET</h3>

            <p>
              C#, .NET, backend development,
              web applications, APIs and
              database-driven systems.
            </p>

            <strong>BUILD →</strong>
          </a>

          <a href="#cloud" className="journeyCard">
            <span className="journeyIndex">02</span>
            <div className="journeyDot cyanDot"></div>

            <small>SCALE</small>

            <h3>CLOUD</h3>

            <p>
              Azure, cloud services and
              application infrastructure
              supporting modern systems.
            </p>

            <strong>DEPLOY →</strong>
          </a>

          <a href="#ccna" className="journeyCard">
            <span className="journeyIndex">03</span>
            <div className="journeyDot goldDot"></div>

            <small>CURRENT JOURNEY</small>

            <h3>CCNA</h3>

            <p>
              Subnetting, VLANs, switching,
              routing, OSPF, ACLs, NAT,
              DHCP and troubleshooting.
            </p>

            <strong>ROUTE →</strong>
          </a>

          <a href="#ccna" className="journeyCard">
            <span className="journeyIndex">04</span>
            <div className="journeyDot cyanDot"></div>

            <small>DESTINATION</small>

            <h3>NETWORKS</h3>

            <p>
              Connecting software, cloud
              and infrastructure through
              practical network engineering.
            </p>

            <strong>CONNECT →</strong>
          </a>

        </div>
      </section>

      {/* =====================================================
          PROJECTS
      ===================================================== */}

      <section
        className="contentSection projectsSection"
        id="projects"
      >
        <div className="sectionNumber">
          03 / PROJECTS
        </div>

        <div className="sectionHeading">
          <p className="eyebrow">
            ENGINEERING PROJECTS
          </p>

          <h2>
            From software
            <br />

            <span>
              to intelligent systems.
            </span>
          </h2>
        </div>

        <div className="projectsGrid">
          {projects.map((project) => (
            <article
              className={`projectCard clickableProject ${
                project.id === "05" ? "vlsiProject" : ""
              }`}
              key={project.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedProject(project)}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  event.preventDefault();
                  setSelectedProject(project);
                }
              }}
            >
              <div className="projectTop">
                <span>
                  PROJECT / {project.id}
                </span>

                <span className="projectArrow">
                  ↗
                </span>
              </div>

              <div
                className={`projectIcon ${
                  project.accent === "cyan"
                    ? "cyanIcon"
                    : ""
                }`}
              >
                {project.icon}
              </div>

              <small className="projectDate">
                {project.date}
              </small>

              <h3>
                {project.title}
              </h3>

              <p>
                {project.summary}
              </p>

              <div className="projectTags">
                {project.technologies
                  .slice(0, 5)
                  .map((technology) => (
                    <span key={technology}>
                      {technology}
                    </span>
                  ))}
              </div>

              <div className="projectExplore">
                VIEW PROJECT LOG
                <span>→</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================================
          SOFTWARE & CLOUD
      ===================================================== */}

      <section
        className="contentSection cloudSection"
        id="cloud"
      >
        <div className="sectionNumber">
          04 / SOFTWARE & CLOUD
        </div>

        <div className="splitSection">
          <div className="sectionHeading">
            <p className="eyebrow">
              CORE TECHNOLOGIES
            </p>

            <h2>
              Code.
              <br />

              <span>
                Build. Deploy.
              </span>
            </h2>
          </div>

          <div className="skillMatrix">
            <div className="skillRow">
              <span>01</span>
              <strong>C# / .NET</strong>
              <small>SOFTWARE ENGINEERING</small>
            </div>

            <div className="skillRow">
              <span>02</span>
              <strong>ASP.NET Core</strong>
              <small>WEB & APIs</small>
            </div>

            <div className="skillRow">
              <span>03</span>
              <strong>Azure</strong>
              <small>CLOUD</small>
            </div>

            <div className="skillRow">
              <span>04</span>
              <strong>SQL / PostgreSQL</strong>
              <small>DATABASES</small>
            </div>

            <div className="skillRow">
              <span>05</span>
              <strong>Git / CI/CD</strong>
              <small>DEVELOPMENT WORKFLOW</small>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CCNA
      ===================================================== */}

      <section
        className="contentSection ccnaSection"
        id="ccna"
      >
        <div className="sectionNumber">
          05 / CCNA
        </div>

        <div className="splitSection">
          <div className="sectionHeading">
            <p className="eyebrow">
              CURRENT NETWORK ENGINEERING JOURNEY
            </p>

            <h2>
              From software
              <br />

              <span>
                into the network.
              </span>
            </h2>
          </div>

          <div className="networkStatement">
            <p>
              I'm currently building my network
              engineering foundation through CCNA
              study and hands-on Cisco labs.
            </p>

            <p>
              My focus includes subnetting, VLANs,
              trunking, inter-VLAN routing, switching,
              STP, EtherChannel, static routing, OSPF,
              ACLs, NAT/PAT, DHCP, SSH and
              troubleshooting.
            </p>

            <div className="packetJourney">
              <span>SOFTWARE</span>
              <i>→</i>

              <span>CLOUD</span>
              <i>→</i>

              <span className="activeJourney">
                CCNA
              </span>

              <i>→</i>

              <span>NETWORK ENGINEERING</span>
            </div>
          </div>
        </div>

        {/* CISCO TERMINAL */}

        <div className="networkTerminal ccnaTerminal">
          <div className="networkTerminalTop">
            <div>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <small>
              R1 — CISCO IOS LAB
            </small>
          </div>

          <div className="networkCLI">
            <p>
              <b>R1#</b> show ip route
            </p>

            <p className="cliMuted">
              Codes: C - connected,
              S - static,
              O - OSPF
            </p>

            <p>
              <span>O</span>
              10.10.20.0/24 [110/2] via 10.0.0.2
            </p>

            <p>
              <span>C</span>
              192.168.10.0/24 is directly connected
            </p>

            <p>
              <b>R1#</b>
              <i className="terminalCursor"></i>
            </p>
          </div>
        </div>

        {/* NETWORK LAB COMMAND CENTER */}

        <div className="ccnaCommandCenter">

          <div className="ccnaCommandHeader">
            <div>
              <small>NETWORK LAB / CCNA</small>
              <h3>Lab Command Center</h3>
            </div>

            <div className="labOnline">
              <span></span>
              LAB ENVIRONMENT ACTIVE
            </div>
          </div>

          {/* TOPOLOGY */}

          <div className="networkTopology">
            <div className="topologyTitle">
              <span>TOPOLOGY / 001</span>
              <small>PACKET TRACER</small>
            </div>

            <div className="topologyCanvas">

              <div className="topologyDevice routerDevice routerOne">
                <span>R1</span>
                <small>ROUTER</small>
              </div>

              <div className="topologyLine lineR1Sw"></div>

              <div className="topologyDevice switchDevice switchOne">
                <span>SW1</span>
                <small>SWITCH</small>
              </div>

              <div className="topologyLine lineSwPc"></div>

              <div className="topologyDevice pcDevice pcOne">
                <span>PC-A</span>
                <small>VLAN 10</small>
              </div>

              <div className="topologyLine lineSwPcTwo"></div>

              <div className="topologyDevice pcDevice pcTwo">
                <span>PC-B</span>
                <small>VLAN 20</small>
              </div>

              <div className="topologyLine lineR1R2"></div>

              <div className="topologyDevice routerDevice routerTwo">
                <span>R2</span>
                <small>ROUTER</small>
              </div>

              <div className="packet packetOne"></div>
              <div className="packet packetTwo"></div>

            </div>

            <div className="topologyLegend">
              <span>
                <i className="legendRouter"></i>
                ROUTER
              </span>

              <span>
                <i className="legendSwitch"></i>
                SWITCH
              </span>

              <span>
                <i className="legendHost"></i>
                HOST
              </span>
            </div>
          </div>

          {/* LAB PROGRESS */}

          <div className="labStatusPanel">
            <div className="labStatusHeader">
              <span>LAB PROGRESS</span>
              <small>CCNA JOURNEY</small>
            </div>

            <div className="labStatusList">

              <div className="labStatusItem completedLab">
                <div>
                  <span className="labIndicator"></span>

                  <div>
                    <strong>IP & Subnetting</strong>
                    <small>IPv4 · CIDR · VLSM</small>
                  </div>
                </div>

                <b>LEARNING</b>
              </div>

              <div className="labStatusItem completedLab">
                <div>
                  <span className="labIndicator"></span>

                  <div>
                    <strong>VLANs & Trunking</strong>
                    <small>
                      802.1Q · ACCESS · TRUNK
                    </small>
                  </div>
                </div>

                <b>LEARNING</b>
              </div>

              <div className="labStatusItem completedLab">
                <div>
                  <span className="labIndicator"></span>

                  <div>
                    <strong>
                      Inter-VLAN Routing
                    </strong>

                    <small>
                      ROAS · SVI
                    </small>
                  </div>
                </div>

                <b>LEARNING</b>
              </div>

              <div className="labStatusItem buildingLab">
                <div>
                  <span className="labIndicator"></span>

                  <div>
                    <strong>
                      STP & EtherChannel
                    </strong>

                    <small>
                      STP · LACP · PAgP
                    </small>
                  </div>
                </div>

                <b>BUILDING</b>
              </div>

              <div className="labStatusItem buildingLab">
                <div>
                  <span className="labIndicator"></span>

                  <div>
                    <strong>Routing</strong>

                    <small>
                      STATIC · DEFAULT · OSPF
                    </small>
                  </div>
                </div>

                <b>BUILDING</b>
              </div>

              <div className="labStatusItem nextLab">
                <div>
                  <span className="labIndicator"></span>

                  <div>
                    <strong>ACL & NAT</strong>

                    <small>
                      ACL · NAT · PAT
                    </small>
                  </div>
                </div>

                <b>NEXT</b>
              </div>

            </div>
          </div>

          {/* COMMAND CENTER FOOTER */}

          <div className="ccnaToolBar">
            <div>
              <span>CISCO IOS</span>
              <span>PACKET TRACER</span>
              <span>CLI</span>
              <span>GITHUB LABS</span>
            </div>

            <a
              href="https://github.com/rayudu-os956/CCNA-Labs"
              target="_blank"
              rel="noreferrer"
            >
              OPEN LAB REPOSITORY
              <span>↗</span>
            </a>
          </div>

        </div>

        {/* CURRENT STATUS */}

        <div className="ccnaProgress">
          <div>
            <small>
              CURRENT STATUS
            </small>

            <h3>
              CCNA Labs — In Progress
            </h3>

            <p>
              Building and documenting Cisco Packet
              Tracer labs while developing practical
              routing, switching and troubleshooting
              skills.
            </p>
          </div>

          <div className="ccnaProgressStatus">
            <span className="statusPulse"></span>
            ACTIVELY BUILDING
          </div>
        </div>

      </section>

      {/* =====================================================
          EXPERIENCE
      ===================================================== */}

      <section
        className="contentSection experienceSection"
        id="experience"
      >
        <div className="sectionNumber">
          06 / EXPERIENCE
        </div>

        <div className="sectionHeading">
          <p className="eyebrow">
            PROFESSIONAL EXPERIENCE
          </p>

          <h2>
            Software meets
            <br />

            <span>
              real-world systems.
            </span>
          </h2>
        </div>

        <div className="experienceTimeline">

          <article>
            <div className="experienceYear">
              2022 — 2024
            </div>

            <div className="experienceBody">
              <small>
                ENSAR SOLUTIONS · HYDERABAD
              </small>

              <h3>
                DOTNET Developer
              </h3>

              <p>
                Developed and modernised applications
                using C# and .NET while working across
                APIs, database integration, Azure and
                AWS cloud environments.
              </p>

              <p>
                Contributed to projects including
                Kalibr8 and LimoLink, worked with
                gRPC, automated testing, Azure DevOps
                CI/CD and application performance
                optimisation.
              </p>

              <div className="experienceTags">
                <span>C#</span>
                <span>.NET</span>
                <span>Azure</span>
                <span>AWS</span>
                <span>gRPC</span>
                <span>SQL</span>
                <span>CI/CD</span>
              </div>
            </div>
          </article>

        </div>
      </section>

      {/* =====================================================
          EDUCATION
      ===================================================== */}

      <section
        className="contentSection educationSection"
        id="education"
      >
        <div className="sectionNumber">
          07 / EDUCATION
        </div>

        <div className="educationGrid">
          <div className="sectionHeading">
            <p className="eyebrow">
              EDUCATION
            </p>

            <h2>
              Learning never
              <br />

              <span>
                reaches the final island.
              </span>
            </h2>
          </div>

          <div className="educationList">

            <article>
              <span>
                COMPLETED 2025
              </span>

              <h3>
                Master of Information Technology
              </h3>

              <p>
                Deakin University
              </p>

              <small>
                SOFTWARE DEVELOPMENT
              </small>
            </article>

            <article>
              <span>
                2018 — 2022
              </span>

              <h3>
                Bachelor of Electronics &
                Communication Engineering
              </h3>

              <p>
                Jawaharlal Nehru Technological University
              </p>

              <small>
                ELECTRONICS & COMMUNICATION
              </small>
            </article>

          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section
        className="contactSection"
        id="contact"
      >
      <div className="onePieceEasterEgg">
  <button
    className="strawHatTrigger"
    type="button"
    onClick={(event) => {
      const easterEgg = event.currentTarget.parentElement;
      easterEgg.classList.toggle("grandLineActive");
    }}
    aria-label="Activate Grand Line mode"
  >
    <span className="strawHat">☠</span>
  </button>

  <div className="grandLineSecret">
    <small>PERSONAL LOG / EASTER EGG</small>

    <h3>THE JOURNEY CONTINUES...</h3>

    <div className="secretTerminal">
      <p>
        <span>&gt;</span> grand_line_mode:{" "}
        <strong>ACTIVE</strong>
      </p>

      <p>
        <span>&gt;</span> next_destination:{" "}
        <strong>UNKNOWN</strong>
      </p>

      <p>
        <span>&gt;</span> status:{" "}
        <strong>EXPLORING</strong>
      </p>
    </div>

    <p className="onePieceNote">
      Inspired by adventure, curiosity and the drive
      to keep exploring beyond the next horizon.
    </p>
  </div>
</div>

        <p className="eyebrow">
          NEXT DESTINATION
        </p>

        <h2>
          Let's build something
          <br />

          <span>
            worth exploring.
          </span>
        </h2>

        <p className="contactText">
          I'm interested in software engineering,
          .NET, cloud and network engineering
          opportunities where I can keep building
          across both software and infrastructure.
        </p>

        <div className="contactActions">

          <a
            href="https://www.linkedin.com/in/glvs-rayudu-ba0218190/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>

          <a
            href="https://github.com/rayudu-os956"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>

          <a href="mailto:glvsrayudu956@gmail.com">
            Email ↗
          </a>

       <a
  href="/Rayudu_Resume.pdf"
  download="Leela_Venkata_Subba_Rayudu_Gudipalli_Resume.pdf"
>
  Download Resume ↓
</a>
        </div>

        <div className="footerLine"></div>

        <footer>
          <span>
            © 2026 RAYUDU
          </span>

          <span>
            REACT · THREE.JS · NETWORKS
          </span>

          <span>
            BUILD · CONNECT · EXPLORE
          </span>
        </footer>
      </section>

      {/* =====================================================
          PROJECT POPUP
      ===================================================== */}

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
}

export default App;