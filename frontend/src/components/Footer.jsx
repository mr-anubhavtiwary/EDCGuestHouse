import Logo from "../assets/images/Logo.png";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

const Footer = () => {
	return (
		<div className='footer-wrapper'>
			<div className='footer-section-one'>
				<div className='footer-logo-container'>
					<img src={Logo} alt='' />
				</div>
				<div className='footer-icons'>
					<BsTwitter />
					<SiLinkedin />
					<BsYoutube />
					<FaFacebookF />
				</div>
			</div>
			<div className='footer-section-two'>
				<div className='footer-section-columns'>
					<span>EDC GuestHouse</span>
					<span>MNNIT Campus
					<br />Teliyarganj
					<br />Prayagraj
					<br />Uttar Pradesh</span>
					<span><FmdGoodIcon />211004</span>
				</div>
				<div className='footer-section-columns'>
					<span>MNNIT Allahabad</span>
					<span>Safety</span>
					<span>Security</span>
					<span>Feedback</span>
					<span>Virtual Tour</span>
					<span>Institute Hospital</span>
				</div>
				<div className='footer-section-columns'>
					<span><CallIcon fontSize="small"/>
						0532-227-1093
						<br />
						0532-227-1093
					</span>
					<span><CallIcon fontSize="small"/>
						Support Staff:
						<br />
						8687170178
					</span>
					<span><CallIcon fontSize="small"/>
						Reception: <br />
						7783907141
					</span>
					<span><EmailIcon fontSize="small"/>edc@mnnit.ac.in</span>
				</div>
				<div className='footer-section-columns'>
					<span>Terms & Conditions</span>
					<span>Privacy Policy</span>
				</div>
			</div>
		</div>
	);
};

export default Footer;
