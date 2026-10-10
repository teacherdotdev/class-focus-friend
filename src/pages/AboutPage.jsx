import edtechathonLogo from "../assets/edtechathon-logo.svg";
import participants from "../assets/edtechathon-2026-participants.jpg";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const AboutPage = () => (
  <div className="app-shell page-shell">
    <Header rightLink={{ href: "/", label: "← Back to the classroom" }} />

    <main className="page">
      <h1 className="page-title">About</h1>
      <p className="page-intro">
        A shared focus tool for classrooms, built for teachers and the students they
        sit with every day.
      </p>

      <section className="card page-section">
        <div className="page-section-heading">
          <img className="edtechathon-logo" src={edtechathonLogo} alt="" />
          <h2>From the EdTech-a-thon</h2>
        </div>
        <p>
          On-task Otter is a project from the{" "}
          <a href="https://edtechathon.com" target="_blank" rel="noopener noreferrer">
            EdTech-a-thon
          </a>
          , a community of builders making free tools for classrooms. Learn more about
          who we are and what else we are building at{" "}
          <a href="https://edtechathon.com" target="_blank" rel="noopener noreferrer">
            edtechathon.com
          </a>
          .
        </p>

        <figure className="participants-photo">
          <img src={participants} alt="Participants of the 2026 EdTech-a-thon" />
          <figcaption className="handwriting">EdTech-a-thon 2026</figcaption>
        </figure>
      </section>

      <section className="card page-section">
        <h2>Our promise</h2>
        <ul className="promise-list">
          <li><b>Zero paywalls.</b></li>
          <li><b>Zero ads.</b></li>
          <li><b>Zero tracking of personal data.</b></li>
        </ul>
      </section>

      <section className="card page-section">
        <h2>Feedback &amp; ideas</h2>
        <p>
          We would love to hear from you. Tell us what is working, what is not, or pitch
          us an idea for a tool you wish existed. We are here to help.
        </p>
        <a
          className="primary page-button"
          href="mailto:support@teacher.dev?subject=On-task%20Otter%20feedback"
        >
          Email support@teacher.dev
        </a>
      </section>
    </main>

    <Footer />
  </div>
);

export default AboutPage;
