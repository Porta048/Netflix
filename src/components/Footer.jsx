import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="row justify-content-center mt-5">
        <div className="col col-6">
          <div className="row">
            <div className="col mb-2">
              <i className="bi bi-facebook footer-icon me-2"></i>
              <i className="bi bi-instagram footer-icon me-2"></i>
              <i className="bi bi-twitter-x footer-icon me-2"></i>
              <i className="bi bi-youtube footer-icon"></i>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg 4">
            <div className="col">
              <div className="row">
                <div className="col footer-links">
                  <p><a href="#" alt="footer link">Audio and Subtitles</a></p>
                  <p><a href="#" alt="footer link">Media Center</a></p>
                  <p><a href="#" alt="footer link">Privacy</a></p>
                  <p><a href="#" alt="footer link">Contact us</a></p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col footer-links">
                  <p><a href="#" alt="footer link">Audio Description</a></p>
                  <p><a href="#" alt="footer link">Investor Relations</a></p>
                  <p><a href="#" alt="footer link">Legal Notices</a></p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col footer-links">
                  <p><a href="#" alt="footer link">Help Center</a></p>
                  <p><a href="#" alt="footer link">Jobs</a></p>
                  <p><a href="#" alt="footer link">Cookie Preferences</a></p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col footer-links">
                  <p><a href="#" alt="footer link">Gift Cards</a></p>
                  <p><a href="#" alt="footer link">Terms of Use</a></p>
                  <p><a href="#" alt="footer link">Corporate Information</a></p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col mb-2">
              <button type="button" className="btn btn-sm footer-button rounded-0 mt-3">Service Code</button>
            </div>
          </div>
          <div className="row">
            <div className="col mb-2 mt-2 copyright">© 1997-2023 Netflix, Inc.</div>
          </div>
        </div>
      </div>
    </footer>
  );
} 