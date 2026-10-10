import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const PrivacyPage = () => (
  <div className="app-shell page-shell">
    <Header rightLink={{ href: "/", label: "← Back to the classroom" }} />

    <main className="page">
      <h1 className="page-title">Privacy</h1>
      <p className="page-intro">What we collect, what we do not, and why.</p>

      <section className="card page-section">
        <h2>Students</h2>
        <p>
          On-task Otter collects no personal information about students. Students never
          sign in, and nothing that identifies a child is asked for, stored, or sent
          anywhere.
        </p>
      </section>

      <section className="card page-section">
        <h2>The noise meter</h2>
        <p>
          With your permission, the noise meter listens through the computer's microphone
          to measure how loud the room is. The sound is measured on the computer as it
          happens and is never recorded, saved, or sent anywhere. Turning the noise meter
          off, or declining the microphone permission, stops the listening entirely.
        </p>
      </section>

      <section className="card page-section">
        <h2>Your classroom's progress</h2>
        <p>
          Class points, timer settings, unlocked rewards, the otter's house, and the
          history of finished sessions are saved in the browser's local storage on the
          computer you use them on. That information never leaves the device unless you
          save it to a file yourself, or sign in to a teacher account.
        </p>
      </section>

      <section className="card page-section">
        <h2>Teacher accounts</h2>
        <p>
          A teacher account is optional, and On-task Otter works fully without one. If you
          make one, we store the email address and password you choose, along with the
          classroom setup and progress described above, so your classroom can follow you
          to another computer. The email address is used only for signing in to the
          account. Deleting the saved classroom from within the app also empties what is
          stored with the account.
        </p>
      </section>

      <section className="card page-section">
        <h2>Visits to the site</h2>
        <p>
          We use Cloudflare Web Analytics to anonymously count visits, which helps us
          understand how On-task Otter is being used in classrooms. It is cookieless, does
          not fingerprint visitors, and does not track people across other sites. See
          Cloudflare's{" "}
          <a
            href="https://www.cloudflare.com/privacypolicy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            privacy policy
          </a>{" "}
          for details. We do not share, sell, or otherwise transfer any visitor data to
          third parties.
        </p>
      </section>

      <section className="card page-section">
        <h2>Questions</h2>
        <p>
          Questions or concerns? Email{" "}
          <a href="mailto:support@teacher.dev?subject=On-task%20Otter%20privacy">
            support@teacher.dev
          </a>
          .
        </p>
      </section>
    </main>

    <Footer />
  </div>
);

export default PrivacyPage;
