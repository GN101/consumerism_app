import React from 'react';
import styles from './About.module.css';
import CV from '../../files/CV-Mixail-Malliotakis.pdf';

const About = () => {
  return (
    <>
      <h2 className={styles.Header}> Hello, I am Michael Malliotakis</h2>
      <p className={styles.Text}>
        This is a <u>Development oriented</u> app, I use as a playground, for
        testing things as I learn them.
      </p>
      <h3 className={styles.Text}>Noteworthy aspects of the app:</h3>
      <ol className={styles.Label}>
        <li>Firebase authentication</li>
        <li>Cookies</li>
        <li>
          React state management (colors theme, automatic users average data
          updating, etc)
        </li>
        <li>User input modal (createPortal())</li>
        <li>Form validation</li>
        <li>Responsive CSS (including side menu)</li>
        <li>npm</li>
        <li>React</li>
        <li>Devops (netlify)</li>
      </ol>
      <h3 className={styles.Text}>A brief summary of the app:</h3>
      <p className={styles.Text2}>
        The idea behind this app is that a user (who can either log in or use it
        as a guest and his data are saved in the database and temporarily in a
        cookie) is requested to fill in his input (= personal expenses & his
        desired savings goal & income), then he is provided with the results,
        which compare his input to the averages of other users and is provided
        with a summary (e.g. how much he needs to reduce his expenses in order
        to achieve his goal). Ideally, we'll be comparing them to the national
        averages (mocked data, so far), which is yet not implemented (to be
        implemented in the near future).
      </p>
      <div className={styles.Links}>
        <a target="_blank" href={CV}>
          <p className={styles.Text3}>Download CV</p>
        </a>
        <a target="_blank" href="https://github.com/miskas9/consumerism_app">
          <p className={styles.Text3}>Github Repository</p>
        </a>
      </div>
    </>
  );
};

export default About;
