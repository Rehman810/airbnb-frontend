import { Box, Container, Grid, Typography, Link, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import Language from "../language/Language";
import { useState } from "react";
import { useAppContext } from "../../context/context";

const Footer = () => {
  const { t } = useTranslation("footer");
  const [open, setOpen] = useState(false);
  const { langauge } = useAppContext();

  const toggleModal = () => {
    setOpen(!open);
  };
  
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f7f7f7",
        py: 4,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Support Section */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "black" }}
            >
              {t("support.support")}
            </Typography>
            <FooterLink text={t("support.helpCenter")} />
            <FooterLink text={t("support.airCover")} />
            <FooterLink text={t("support.antiDiscrimination")} />
            <FooterLink text={t("support.disabilitySupport")} />
            <FooterLink text={t("support.cancellationOptions")} />
            <FooterLink text={t("support.reportNeighborhoodConcern")} />
          </Grid>

          {/* Hosting Section */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "black" }}
            >
            {t("Hosting.hosting")}
            </Typography>
            <FooterLink text={t("Hosting.airbnbYourHome")} />
            <FooterLink text={t("Hosting.airCoverForHosts")}/>
            <FooterLink text={t("Hosting.hostingResources")} />
            <FooterLink text={t("Hosting.CommunityForum")} />
            <FooterLink text={t("Hosting.hostingResponsibly")} />
            <FooterLink text={t("Hosting.airbnbFriendlyApartments")} />
            <FooterLink text={t("Hosting.joinAFreeHostingClass")} />
            <FooterLink text={t("Hosting.findACoHost")} />
          </Grid>

          {/* Airbnb Section */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "black" }}
            >
              Airbnb
            </Typography>
            <FooterLink text="Newsroom" />
            <FooterLink text="New features" />
            <FooterLink text="Careers" />
            <FooterLink text="Investors" />
            <FooterLink text="Gift cards" />
            <FooterLink text="Airbnb.org emergency stays" />
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 3 }} />

        {/* Bottom Section */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Left Side */}
          <Typography variant="body2" color="text.secondary">
            © 2024 Airbnb, Inc. · Terms · Sitemap · Privacy
          </Typography>

          {/* Right Side */}
          <Box display="flex" alignItems="center" gap={2}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <MdLanguage size={18} />
              <Typography
                variant="body2"
                color="text.secondary"
                onClick={toggleModal}
                sx={{ cursor: "pointer" }}
              >
                {langauge.lang || "English"} ({langauge.code || "en"})
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Rs PKR
            </Typography>

            {/* Social Media Icons */}
            <Link href="#" color="inherit">
              <FaFacebookF size={18} />
            </Link>
            <Link href="#" color="inherit">
              <FaTwitter size={18} />
            </Link>
            <Link href="#" color="inherit">
              <FaInstagram size={18} />
            </Link>
          </Box>
        </Box>
      </Container>
      <Language open={open} toggleModal={toggleModal} />
    </Box>
  );
};

// Footer Link Helper Component
const FooterLink = ({ text }) => (
  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
    <Link href="#" color="inherit" underline="hover">
      {text}
    </Link>
  </Typography>
);

export default Footer;
