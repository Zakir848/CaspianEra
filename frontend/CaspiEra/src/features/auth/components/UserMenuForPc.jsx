import { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export default function UserMenuForPc({ user, onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    onLogout();
  };

  if (!user) {
    return null;
  }

  const firstLetter =
    user?.firstName?.trim()?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0.3,
        }}
      >
        <Avatar
          src={user?.profileImageUrl || undefined}
          alt={user?.firstName || "User"}
          sx={{
            width: 38,
            height: 38,

            bgcolor: "secondary.main",
            color: "primary.dark",

            fontSize: 15,
            fontWeight: 800,

            border: "2px solid rgba(255,255,255,.8)",
          }}
        >
          {!user?.profileImageUrl && firstLetter}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 220,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 12px 35px rgba(0,0,0,.12)",
            },
          },
        }}
      >
        {/* USER INFO */}
        <Box
          sx={{
            px: 2,
            py: 1.3,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            {user?.firstName} {user?.lastName}
          </Typography>

          <Typography
            sx={{
              mt: 0.2,
              fontSize: 12,
              color: "text.secondary",
            }}
          >
            {user?.email}
          </Typography>
        </Box>

        <Divider />

        {/* PROFILE */}
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonOutlineRoundedIcon fontSize="small" />
          </ListItemIcon>
          Profil
        </MenuItem>

        {/* LOGOUT */}
        <MenuItem
          onClick={handleLogout}
          sx={{
            color: "error.main",
          }}
        >
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" color="error" />
          </ListItemIcon>
          Çıxış et
        </MenuItem>
      </Menu>
    </>
  );
}
