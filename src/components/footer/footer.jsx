import React from "react";
import { Box, Container, Grid, Typography, Link, Divider } from "@mui/material";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { MdLanguage } from "react-icons/md";

const Footer = () => {
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
              Support
            </Typography>
            <FooterLink text="Help Center" />
            <FooterLink text="AirCover" />
            <FooterLink text="Anti-discrimination" />
            <FooterLink text="Disability support" />
            <FooterLink text="Cancellation options" />
            <FooterLink text="Report neighborhood concern" />
          </Grid>

          {/* Hosting Section */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "black" }}
            >
              Hosting
            </Typography>
            <FooterLink text="Airbnb your home" />
            <FooterLink text="AirCover for Hosts" />
            <FooterLink text="Hosting resources" />
            <FooterLink text="Community forum" />
            <FooterLink text="Hosting responsibly" />
            <FooterLink text="Airbnb-friendly apartments" />
            <FooterLink text="Join a free Hosting class" />
            <FooterLink text="Find a co-host" />
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
            <FooterLink  text="Newsroom" />
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
              <Typography variant="body2" color="text.secondary">
                English (US)
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              $ USD
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
    </Box>
  );
};

// Footer Link Helper Component
const FooterLink = ({ text }) => (
  <Typography
    variant="body2"
    color="text.secondary"
    sx={{ mb: 0.5 }}
  >
    <Link href="#" color="inherit" underline="hover">
      {text}
    </Link>
  </Typography>
);

export default Footer;
