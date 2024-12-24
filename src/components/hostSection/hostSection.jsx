import React from "react";
import { Box, Typography, Avatar, Button, Divider, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";

const HostSection = ({data}) => {
  return (
    <Box sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Meet your Host
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 2,
              border: "1px solid #ddd",
              borderRadius: "12px",
              maxWidth: "350px",
              boxShadow: 2
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                src="https://via.placeholder.com/80" 
                alt="Host"
                sx={{ width: 80, height: 80 }}
              />
              <Box>
                <Typography
                  variant="h6"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  Manolis
                  <VerifiedIcon
                    color="primary"
                    sx={{
                      fontSize: "1.2rem",
                      ml: 1,
                      verticalAlign: "middle",
                    }}
                  />
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Superhost
                </Typography>
              </Box>
            </Box>

            <Box mt={2}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <b>227</b> Reviews
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <StarIcon
                  color="warning"
                  sx={{ fontSize: "1rem", verticalAlign: "middle", mr: 0.5 }}
                />
                <b>4.9</b> Rating
              </Typography>
              <Typography variant="body1">
                <b>9</b> Years hosting
              </Typography>
            </Box>

            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mt: 2, display: "flex", alignItems: "center" }}
            >
              Lives in Heraklion, Greece
            </Typography>

            <Typography
              variant="body2"
              color="primary"
              sx={{
                mt: 1,
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Show more
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Manolis is a Superhost
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Superhosts are experienced, highly rated hosts who are committed to
            providing great stays for guests.
          </Typography>

          <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
            Co-Hosts
          </Typography>
          <Box display="flex" gap={1}>
            <Avatar
              src="https://via.placeholder.com/50" 
              alt="Co-host 1"
              sx={{ width: 50, height: 50 }}
            />
            <Avatar
              src="https://via.placeholder.com/50" 
              alt="Co-host 2"
              sx={{ width: 50, height: 50 }}
            />
          </Box>

          <Typography variant="body1" sx={{ mt: 3, mb: 1 }}>
            Host details
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Response rate: 100%
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Responds within an hour
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              textTransform: "none",
              width: "200px",
              borderRadius: "8px",
            }}
          >
            Message Host
          </Button>

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mt: 2, textDecoration: "underline", cursor: "pointer" }}
          >
            Individual Host
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Registration number: 00001759425
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HostSection;
