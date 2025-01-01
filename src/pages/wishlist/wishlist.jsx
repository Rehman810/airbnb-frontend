import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import Card from "../../components/cards/cards";
import { useWishlist } from "../../context/wishlistProvider";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        {wishlist.length > 0 ? (
          <Grid container spacing={2}>
            {wishlist.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={item._id}>
                <Card data={item} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              p: 4,
              bgcolor: "background.default",
              borderRadius: 2,
              boxShadow: 1,
            }}>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 2 }}>
              Your wishlist is empty.
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3 }}>
              Browse and add items to your
              wishlist to see them here.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/")}>
              Book your next Trip!
            </Button>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Wishlist;
