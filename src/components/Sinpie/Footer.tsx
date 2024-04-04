import { AiFillGithub, AiFillInstagram } from "solid-icons/ai"
import { FaBrandsFacebook, FaBrandsTwitter } from "solid-icons/fa"

export const Footer = () => {
    return <footer class="footer-container">
       <div class="footer-main">
       <div class="links-section">
       <div class="links support-links">
            <h4 class="footer-title">Contributors</h4>
            <a class="footer-item" href="
                https://github.com/tr1ten
            ">Shubh (tr1ten) </a>
        </div>
        <div class="links quick-links">
            <h4 class="footer-title">Quick Links</h4>
            <a class="footer-item" href="/product-category/hats">Trending</a>
            <a class="footer-item" href="/anime-category/naruto">Anime</a>
            <a class="footer-item" href="/anime-category/one-piece">Manga</a>
            <a class="footer-item" href="https://github.com/tr1ten/Sinpie">About Us</a>
        </div>
        <div class="links stores-link">
            <h4 class="footer-title">Stores</h4>
            <a class="footer-item" href="https://www.redwolf.in/anime-merchandise-india">
                Red Wolfs
            </a>
            <a class="footer-item" href="https://www.kiayaaccessories.com/">Kiaya Accessories    </a>
            <a class="footer-item" href="https://www.comicsense.store/">Comic Sense</a>
        </div>
       </div>
       <div class="social-links flex flex-row justify-center">
        <a class="social-link" href="
            https://www.facebook.com
        "> <FaBrandsFacebook /></a>
        <a class="social-link" href="
            https://www.twitter.com
        "> <FaBrandsTwitter /></a>
        <a class="social-link" href="
            https://www.instagram.com
        "> <AiFillInstagram /></a>
        </div>
       </div>
    <div class="footer-bottom">
        <p>Sinpie is an Open Source Project created for fun by tr1ten, hosted on </p>
        <a href="https://github.com/tr1ten/Sinpie" class="font-bold ml-1 justify-center">Github <AiFillGithub class="s-icon" size="1.3rem" /></a>
    </div>

    </footer>
}