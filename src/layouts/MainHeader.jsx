import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import Logo from "../components/Logo";

import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import useAuth from "../hooks/useAuth";
import UserProfilePicture from "../features/user/UserProfilePicture";
import { Divider, Grid, SvgIcon } from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

const pages = [
  // {
  //   value: "home",
  //   title: "Home",
  //   icon: <SpaceDashboardIcon />,
  //   link: "/",
  // },
  {
    value: "project",
    title: "Project",
    icon: <ListAltIcon />,
    link: "/projects",
    // link: "/",
  },
  {
    value: "task",
    title: "Task",
    icon: <AssignmentTurnedInIcon />,
    link: "/tasks",
  },
  {
    value: "invitation",
    title: "Invitation",
    icon: <MoveToInboxIcon />,
    link: "/invitations",
  },
];

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.secondary,
}));

function MainHeader() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      handleCloseUserMenu();
      await auth.logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AppBar position="static">
      <StyledContainer maxWidth={1}>
        <Toolbar disableGutters>
          <Grid
            container
            sx={{
              height: 1,
              width: "100vw",
              display: { xs: "none", md: "flex" },
            }}
          >
            <Grid
              item
              md={3}
              xl={2.5}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Logo sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                TASK MANAGER
              </Typography>
            </Grid>
            <Grid item md={9} xl={9.5}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                  }}
                >
                  {pages.map((page) => (
                    <Button
                      key={page.value}
                      onClick={() => navigate(page.link)}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page.title}
                    </Button>
                  ))}

                  <div>
                    <Link
                      to={`/projects/new`}
                      state={{ backgroundLocation: location }}
                    >
                      <Button
                        startIcon={
                          <SvgIcon fontSize="small">
                            <PlusIcon />
                          </SvgIcon>
                        }
                        variant="contained"
                        sx={{ p: 1, borderRadius: "4px" }}
                      >
                        Project
                      </Button>
                    </Link>
                  </div>

                  <div>
                    <Link
                      to={`/tasks/new`}
                      state={{ backgroundLocation: location }}
                    >
                      <Button
                        startIcon={
                          <SvgIcon fontSize="small">
                            <PlusIcon />
                          </SvgIcon>
                        }
                        variant="contained"
                        sx={{ ml: 1, p: 1, borderRadius: "4px" }}
                      >
                        Task
                      </Button>
                    </Link>
                  </div>
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <UserProfilePicture targetUser={auth.user} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <Box sx={{ my: 1.5, px: 2.5 }}>
                      <Typography variant="subtitle2" noWrap>
                        {auth.user?.firstName} {auth.user?.lastName}
                      </Typography>
                      <Typography variant="subtitle2" noWrap>
                        {auth.user?.email}
                      </Typography>
                    </Box>
                    <Divider sx={{ borderStyle: "dashed" }} />
                    <MenuItem
                      onClick={() => {
                        navigate("/settings");
                        handleCloseUserMenu();
                      }}
                      sx={{ mx: 1 }}
                    >
                      <Typography textAlign="center">Account</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout} sx={{ mx: 1 }}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.value}
                  onClick={() => {
                    navigate(page.link);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Logo sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TASK MANAGER
          </Typography>
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <UserProfilePicture targetUser={auth.user} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box sx={{ my: 1.5, px: 2.5 }}>
                <Typography variant="subtitle2" noWrap>
                  {auth.user?.firstName} {auth.user?.lastName}
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  {auth.user?.email}
                </Typography>
              </Box>
              <Divider sx={{ borderStyle: "dashed" }} />
              <MenuItem
                onClick={() => {
                  navigate("/settings");
                  handleCloseUserMenu();
                }}
                sx={{ mx: 1 }}
              >
                <Typography textAlign="center">Account</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={{ mx: 1 }}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </StyledContainer>
    </AppBar>
  );
}
export default MainHeader;
