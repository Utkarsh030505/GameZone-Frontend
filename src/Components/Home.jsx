import React from 'react'
import FeatureCard from './FeatureCard';
import ContactBox from './ContactBox';
import GameCard from './GameCard';
import InfoBox from './InfoBox';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const Home = () => {
  function handleConfirmation(event) {
    event.preventDefault();
    document.getElementById("confirmationMessage").style.display = "block";
    event.target.reset();
  }
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className='Head'>
        <header className="header">
          <section className="flex">
            <div className="icon">
              <svg className="gamepad" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 512 512 " id="game">
                <path
                  d="M135.123 204.568c-10.688 0-19.343 8.717-19.343 19.441 0 10.727 8.655 19.447 19.343 19.447 10.641 0 19.297-8.721 19.297-19.447 0-10.724-8.656-19.441-19.297-19.441z"
                  fill="#e056fd" className="color000000 svgShape"></path>
                <path
                  d="M466.279 248.866c-21.157-88.471-43.631-135.489-88.454-148.83C368.06 97.135 359.748 96 352.076 96c-27.598 0-46.938 14.683-96.08 14.683-49.174 0-68.502-14.681-96.062-14.683-7.665 0-15.963 1.135-25.721 4.036-44.869 13.341-67.342 60.359-88.461 148.83-21.181 88.473-17.334 152.363 7.679 164.289C57.502 415.1 61.662 416 65.885 416c21.694 0 45.139-23.838 67.659-52.047C159.198 331.848 165.658 331 243.822 331h24.343c78.147 0 84.628.846 110.282 32.953 22.526 28.207 45.97 52.004 67.665 52.004 4.226 0 8.384-.879 12.457-2.823 25.005-11.926 28.852-75.795 7.71-164.268zm-331.045 14.767c-21.64 0-39.234-17.758-39.234-39.623 0-21.84 17.594-39.643 39.234-39.643 21.655 0 39.249 17.803 39.249 39.643 0 21.865-17.593 39.623-39.249 39.623zm172.842-19.493c-11.058 0-20.076-9.019-20.076-20.107 0-11.09 9.019-20.104 20.076-20.104 11.131 0 20.148 9.014 20.148 20.104.001 11.088-9.017 20.107-20.148 20.107zM351.988 288c-11.058 0-20.053-8.951-20.053-20.016 0-11.157 8.995-20.106 20.053-20.106 11.146 0 20.148 8.949 20.148 20.106.001 11.065-9.002 20.016-20.148 20.016zm0-87.81c-11.058 0-20.053-8.993-20.053-20.083 0-11.094 8.995-20.107 20.053-20.107 11.146 0 20.148 9.014 20.148 20.107.001 11.09-9.002 20.083-20.148 20.083zm43.959 43.95c-11.105 0-20.101-9.019-20.101-20.107 0-11.09 8.995-20.104 20.101-20.104 11.059 0 20.053 9.014 20.053 20.104 0 11.088-8.994 20.107-20.053 20.107z"
                  fill="#e056fd" className="color000000 svgShape"></path>
              </svg>
              <a href="#" className="logo"><span className='special'>Game</span> Zone</a>
            </div>
                <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>

          <nav className={`navbar ${menuOpen ? "active" : ""}`}>
            <a onClick={() => {setMenuOpen(false);document.getElementById("home").scrollIntoView();}}>Home</a>
           <a onClick={() => {setMenuOpen(false);document.getElementById("about").scrollIntoView();}}>About</a>

             <a onClick={() => {setMenuOpen(false);document.getElementById("topgames").scrollIntoView();}}>Discover</a>
             <a onClick={() => {setMenuOpen(false);document.getElementById("pricing").scrollIntoView();}}>Subscriptions</a>
              <a onClick={() => {setMenuOpen(false);document.getElementById("contact").scrollIntoView();}}>Contact</a>

          </nav>
            <div className="btnbox">
              {user ? (
                <>
                  <span style={{ color: "white", marginRight: "1rem" }}>
                   <b>{user.name}</b>
                  </span>
                  <button
                    className="btn"
                    onClick={() => {
                      localStorage.removeItem("user");
                      window.location.reload();
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="login btn">Sign in</Link>
                </>
              )}
            </div>

          </section>
        </header>
      </div>
      { /* header ends */}

      { /* home section starts */}
      <div className="home" style={{
        background: "url('/bg.jpg')", backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        textAlign: "center"
      }}>
        <section className="flex">
          <div className="content">
            <h3>Unlimited <span>Gaming</span></h3>
            <p>Endless Adventures, One Click Away - Dive Into the World of Gaming Today!</p>
            <a href="#" className=" btn" onClick={() => { document.getElementById('topgames').scrollIntoView() }}>Play Now</a>
          </div>

        </section>
      </div>

      { /* home section ends */}

      {/*feature section starts*/}
      <div className="features">
          <div className="container" id="custom-cards" >
            <h1 className="featuretitle">Our <span>features</span></h1>
            <div className="row">
              <FeatureCard className="featurecard box1" style={{ background: "url('/character-playing-video-games-eating-snacks_23-2148537996.jpg')" }} title={"New Challenges Everyday"} />
              <FeatureCard className="featurecard box2" style={{ background: "url('/multiplayerimg.jpg')" }} title={"Enjoy Multiplayer with Friends"} />
              <FeatureCard className="featurecard box3" style={{ background: "url('/mobilegamer.jpg')" }} title={"Multiple Game Modes"} />
            </div>
          </div>
      </div>

      { /* about section starts */}
      <div className="about" id="about">
        <section className="flex" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/aboutbg.jpg')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply',
          minHeight: '40rem'
        }}
        >
          <div className="content" style={{ marginTop: "3rem" }}>
            <h3>About <span>us</span></h3>
            <p>Welcome to GameZone, your ultimate destination for thrilling and engaging gaming experiences! At GameZone, we bring together a vast collection of games across genres, ensuring there's something for every gamer out there.
              Whether you're a casual player seeking quick entertainment or a dedicated gamer looking for your next big
              adventure, we've got you covered.

              Our mission is to create a platform that delivers endless fun, challenges, and connections to our gaming
              community. From action-packed adventures to brain-teasing puzzles, our library is constantly expanding to
              include the latest and greatest in the gaming world.

              For our most passionate players, we offer exclusive premium subscription plans that unlock special benefits
              such as upcoming early game access, free daily rewards, exclusive skins, and premium features to enhance your experience.

              At GameZone, we believe that gaming is more than just entertainment -it's a way to connect, learn, and have
              fun. Our mission is to create a platform that brings people together, ignites creativity, and challenges the
              mind. With a focus on quality, innovation, and user satisfaction, we aim to become the go-to destination for
              gamers of all ages and interests.

              So, what are you waiting for? Dive into world of, where adventure, and thrill await you at every
              click. Start playing today and discover why we're the ultimate gaming paradise!
            </p>
            <a className="btn" onClick={() => document.getElementById('foot').scrollIntoView()}>Read More</a>
          </div>
        </section>
      </div>
      { /* about section ends */}

      { /* games section starts */}
      <div className="topgames" id="topgames">
        <section className="grid">
          <h1 className="heading"><span>Top </span>Games</h1>
          <div className="box-container">
            <GameCard links="/games/Rock Paper Scissors/index.html" name="Rock Paper Scissor" img="/rockpaperscissor1.jpg" />
            <GameCard links="/games/Tik Tac Toe/index.html" name="Tik Tac Toe" img="/tictactoe1.png" />
            <GameCard links="/games/Simon game/Simon Game Challenge Starting Files/index.html" name="Simon Game" img="/Simongame.png" />
            <GameCard links="/games/Recall Rush/index.html" name="Recall Rush" img="/recallrush.png" />
            <GameCard links="/games/2048/index.html" name="2048" img="/2048.png" />
            <GameCard links="/games/Hangman Game/index.html" name="Hangman Game" img="/hangman.png" />
            <GameCard links="/games/Nom Nom snake/index.html" name="Nom Nom Snake" img="/snake.jpg" />
            <GameCard links="/games/Word Scramble Game/index.html" name="Word Scramble Game" 
            img="/word.jpg" />

          </div>
        </section>
      </div>
      { /* games section ends */}
      { /* info section starts */}
      <div className="info">
        <section className="grid">
          <InfoBox name="Unlimited Games" img="/Horror video game-bro.svg" />
          <InfoBox name="Multiple Accounts" img="/Account-rafiki.svg" />
          <InfoBox name="Daily Rewards" img="/Piggy bank-amico.svg" />
          <InfoBox name="Secured Payments" img="/E-Wallet-amico.svg" />

        </section>
      </div>
      { /* info section ends */}

      { /* pricing section starts */}
      <div className="pricing" id="pricing">
        <section className="grid">
          <h1 className="heading">Our <span>Plans</span></h1>
          <div className="box-container">
            <div className="box">
              <h3>silver</h3>
              <div className="amount">$<span>3.99</span></div>
              <div className="date">for 3 months</div>
              <div className="list">
                <p><i className="fa fa-check"></i>Ad-Free Gaming</p>
                <p><i className="fa fa-check"></i>Exclusive skins</p>
                <p><i className="fa fa-check"></i>Priority 24/7 support</p>
                <p><i className="fa-sharp fa-solid fa-xmark" style={{ color: "#e70407" }}></i>Daily Login Rewards</p>
                <p><i className="fa-sharp fa-solid fa-xmark" style={{ color: "#e70407" }}></i>Early access to new games</p>
              </div>
                  <div className="btnbox">
                <button className="btn" onClick={() => navigate("/payment")}>Check Out</button>
              </div>

            </div>

            <div className="box">
              <h3>Gold</h3>
              <div className="amount">$<span>6.99</span></div>
              <div className="date">for 6 months</div>
              <div className="list">
                <p><i className="fa fa-check" ></i>Ad-Free Gaming</p>
                <p><i className="fa fa-check"></i>Exclusive skins</p>
                <p><i className="fa fa-check"></i>Priority 24/7 support</p>
                <p><i className="fa fa-check"></i>Daily Login Rewards</p>
                <p><i className="fa-sharp fa-solid fa-xmark" style={{ color: "#e70407" }}></i>Early access to new games</p>
              </div>
              <div className="btnbox">
                <button className="btn" onClick={() => navigate("/payment")}>Check Out</button>
              </div>
                 

            </div>
            <div className="box">
              <h3>Diamond</h3>
              <div className="amount">$<span>9.99</span></div>
              <div className="date">for 12 months</div>
              <div className="list">
                <p><i className="fa fa-check"></i>Ad-Free Gaming</p>
                <p><i className="fa fa-check"></i>Exclusive skins</p>
                <p><i className="fa fa-check"></i>Priority 24/7 support</p>
                <p><i className="fa fa-check"></i>Daily Login Rewards</p>
                <p><i className="fa fa-check"></i>Early access to new games</p>
              </div>
              <div className="btnbox">
                <button className="btn" onClick={() => navigate("/payment")}>Check Out</button>
              </div>

            </div>
          </div>
        </section>
      </div>
      { /* pricing section ends */}


      { /* contact section starts */}

      <div className="contact" id="contact">
        <h1 className="heading">Contact <span>Us</span></h1>
        <div className="box-container">
          <ContactBox name="Email" svg="/Mail-amico.svg" links="mailto:shaktikkr05@gmail.com" info="shaktikkr05@gmail.com" />
          <ContactBox name="Phone" svg="/telephone.svg" links="tel:+918656759823" info="+91-8656759823" />
          <ContactBox name="Address" svg="/map.svg" links="#" info="Jiit 62, Noida, India" />
        </div>
        {/*Contact us */}
        <div>
          <form action="" className="form" id="getintouch" onSubmit={handleConfirmation}>
            <h1 className="heading"><span>Get </span>in touch</h1>
            <div className="flex">
              <input type="text" placeholder="Username" className="input" required />
              <input type="email" placeholder="Email" className="input" required />
              <textarea name="textarea" className="input" placeholder="Your message" required></textarea>
            </div>
            <input type="submit" name="submit" className="btn" value="Send Message" />
            <div id="confirmationMessage" style={{ display: "none", marginTop: "20px", color: "var(--royalpink)", fontSize: "1.2em" }}>
              Thank you for contacting us! We will get back to you shortly.
            </div>
          </form>
        </div>
      </div>
      { /* contact section ends */}

      { /* Footer Section Starts */}
      <div className="footer-container">
        { /* Footer */}
        <footer className="footer" id="footer">
          { /* Links Section */}
          <div className="footer-links" id="foot">
            <div className="footer-link-item">
              <h6><a onClick={() => { document.getElementById('about').scrollIntoView() }}>About us</a></h6>
            </div>
            <div className="footer-link-item">
              <h6><a onClick={() => { document.getElementById('topgames').scrollIntoView() }}>Discover</a></h6>
            </div>
            <div className="footer-link-item">
              <h6><a onClick={() => { document.getElementById('pricing').scrollIntoView() }}>Subscriptions</a></h6>
            </div>
            <div className="footer-link-item">
              <h6><a onClick={() => { document.getElementById('contact').scrollIntoView() }}>Contact</a></h6>
            </div>
            <div className="footer-link-item">
              <h6><a onClick={() => { document.getElementById('getintouch').scrollIntoView() }}>Help</a></h6>
            </div>
          </div>
          { /* Links Section Ends */}

          <hr className="footer-divider" />

          { /* Description Section */}
          <div className="footer-description">
            <p>
              Established in 2024, Game Zone has been a leading platform for gaming enthusiasts worldwide. We are dedicated to providing the latest in gaming trends, top-rated games, and a thriving community for players of all levels.Explore, discover, and immerse yourself in the world of gaming with Game Zone – where passion meets innovation.
            </p>
          </div>
          { /* Description Section Ends */}

          { /* Social Icons Section */}
          <div className="footer-social">
            <a href=""><i className="fab fa-facebook-f"></i></a>
            <a href=""><i className="fab fa-twitter"></i></a>
            <a href=""><i className="fab fa-google"></i></a>
            <a href=""><i className="fab fa-instagram"></i></a>
            <a href=""><i className="fab fa-linkedin"></i></a>
            <a href=""><i className="fab fa-github"></i></a>
          </div>
          { /* Social Icons Section Ends */}

          { /* Copyright */}
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} Copyright {" "}
            <a href="#">GameZone.com</a>
          </div>
          { /* Copyright Ends */}
        </footer>
        { /* Footer Ends */}
      </div>
      { /* Confirmation Message */}

      { /* contact section ends */}
    </>
  );

}

export default Home
