import './footer.scss';

interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={className}>
            <p className="footer">&copy; {currentYear} BullRun. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;