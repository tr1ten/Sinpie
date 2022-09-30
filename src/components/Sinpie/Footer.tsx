import { AiFillGithub, AiFillInstagram } from "solid-icons/ai"
import { FaBrandsFacebook, FaBrandsTwitter } from "solid-icons/fa"

export const Footer = () => {
    return <footer class="footer-container">
       <div class="footer-main">
       <div class="links-section">
       <div class="links support-links">
            <h4 class="footer-title">Support</h4>
            <a class="footer-item" href="#">FAQ</a>
            <a class="footer-item" href="#">Return Policy</a>
            <a class="footer-item" href="#">Track Order</a>
            <a class="footer-item" href="#">Contact Us</a>
        </div>
        <div class="links quick-links">
            <h4 class="footer-title">Quick Links</h4>
            <a class="footer-item" href="#">Trending</a>
            <a class="footer-item" href="#">New Arrivals</a>
            <a class="footer-item" href="#">Anime</a>
            <a class="footer-item" href="#">Manga</a>
            <a class="footer-item" href="#">About Us</a>
        </div>
        <div class="links stores-link">
            <h4 class="footer-title">Stores</h4>
            <a class="footer-item" href="#">Amazon</a>
            <a class="footer-item" href="#">Ebay</a>
            <a class="footer-item" href="#">Walmart</a>
            <a class="footer-item" href="#">Best Buy</a>
        </div>
       </div>
       <div class="social-links flex flex-row justify-center">
        <a class="social-link" href="#"> <FaBrandsFacebook /></a>
        <a class="social-link" href="#"> <FaBrandsTwitter /></a>
        <a class="social-link" href="#"> <AiFillInstagram /></a>
        </div>
       </div>
    <div class="footer-bottom">
        <p>Sinpie is an Open Source Project created for fun by tr1ten, hosted on </p>
        <a href="https://github.com/tr1ten/Sinpie" class="font-bold ml-1 justify-center">Github <AiFillGithub class="s-icon" size="1.3rem" /></a>
    </div>

    </footer>
}