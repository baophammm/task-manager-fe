import * as React from "react";
import { Divider, Grid, SvgIcon } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import { styled } from "@mui/material/styles";

import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import UserProfilePicture from "../features/user/UserProfilePicture";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { RouterContext } from "../routes";

import NotificationContainer from "../features/notification/NotificationContainer";

import TextLogo from "../components/TextLogo";
import LogoTextCompound from "../components/LogoTextCompound";

const pages = [
  {
    value: "project",
    title: "Home",
    icon: <ListAltIcon />,
    link: "/projects",
  },
  {
    value: "task",
    title: "My Tasks",
    icon: <AssignmentTurnedInIcon />,
    link: "/tasks",
  },
  {
    value: "invitation",
    title: "My Invitations",
    icon: <MoveToInboxIcon />,
    link: "/invitations",
  },
];

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.secondary,
}));

function MainHeader() {
  const { isDisplayingFeaturedProjects, setIsDisplayingFeaturedProjects } =
    useContext(RouterContext);

  const auth = useAuth();
  const userId = auth.user._id;

  const location = useLocation();
  const navigate = useNavigate();

  const currentUrlPath = window.location.pathname;
  const [currentNavPage, setCurrentNavPage] = useState("project");

  useEffect(() => {
    if (currentUrlPath) {
      if (currentUrlPath.includes("projects")) {
        setCurrentNavPage("project");
      } else if (currentUrlPath.includes("tasks")) {
        setCurrentNavPage("task");
      } else if (currentUrlPath.includes("invitations")) {
        setCurrentNavPage("invitation");
      } else {
        setCurrentNavPage(null);
      }
    }
  }, [currentUrlPath]);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElAddNew, setAnchorElAddNew] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotificationList, setAnchorElNotificationList] =
    useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenAddNewMenu = (event) => {
    setAnchorElAddNew(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNotificationListMenu = (event) => {
    setAnchorElNotificationList(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseAddNewMenu = () => {
    setAnchorElAddNew(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseNotificationListMenu = () => {
    setAnchorElNotificationList(null);
  };

  const handleLogout = async () => {
    try {
      handleCloseUserMenu();
      await auth.logout(() => {
        navigate("/login");
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const AccountMenu = (
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
  );

  const NavPagesMenu = (
    <Menu
      id="menu-nav"
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
        <MenuItem key={page.value}>
          <Box width={1}>
            <Link
              to={page.link}
              onClick={() => {
                handleCloseNavMenu();
              }}
              style={{
                textDecoration: "none",

                color: "inherit",
              }}
            >
              <Button
                fullWidth
                sx={{
                  backgroundColor:
                    currentNavPage === page.value
                      ? "background.secondary"
                      : "transparent",
                  color:
                    currentNavPage === page.value
                      ? "text.secondary"
                      : "inherit",
                  display: "block",
                }}
                style={{ justifyContent: "flex-start" }}
                onClick={
                  page.value === "project"
                    ? () => setIsDisplayingFeaturedProjects(true)
                    : () => {}
                }
              >
                {page.title}
              </Button>
            </Link>
          </Box>
        </MenuItem>
      ))}
    </Menu>
  );

  const AddNewMenu = (
    <Menu
      id="menu-addnew"
      anchorEl={anchorElAddNew}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(anchorElAddNew)}
      onClose={handleCloseAddNewMenu}
      sx={{
        display: { xs: "block", md: "none" },
      }}
    >
      <MenuItem>
        <Box width={1}>
          <Link
            to={`/projects/new`}
            state={{ backgroundLocation: location }}
            style={{ textDecoration: "none" }}
          >
            <Button
              fullWidth
              startIcon={
                <SvgIcon fontSize="small">
                  <PlusIcon />
                </SvgIcon>
              }
              variant="contained"
              sx={{ borderRadius: "4px" }}
              style={{ justifyContent: "flex-start" }}
            >
              Project
            </Button>
          </Link>
        </Box>
      </MenuItem>

      <MenuItem>
        <Box width={1}>
          <Link
            to={`/tasks/new`}
            state={{ backgroundLocation: location }}
            style={{ textDecoration: "none" }}
          >
            <Button
              fullWidth
              startIcon={
                <SvgIcon fontSize="small">
                  <PlusIcon />
                </SvgIcon>
              }
              variant="contained"
              sx={{
                borderRadius: "4px",
              }}
              style={{ justifyContent: "flex-start" }}
            >
              Task
            </Button>
          </Link>
        </Box>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="static">
      <StyledContainer
        maxWidth={"100dvw"}
        sx={{
          p: { xs: 0, md: -3 },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            width: "100dvw",
            px: 1,
          }}
        >
          <Grid
            container
            sx={{
              height: 1,
              // width: "100vw",
              width: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Grid
              item
              md={3}
              xl={2.5}
              sx={{
                // border: "1px solid red",
                pb: 1,
                display: "flex",

                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <LogoTextCompound
                sx={{
                  height: 40,
                  mr: 1,
                  pb: 1,
                  display: { xs: "none", md: "flex" },
                }}
              />
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
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mr: 1,
                    }}
                  >
                    {pages.map((page) => (
                      <div key={page.value}>
                        <Link
                          to={page.link}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <Button
                            onClick={
                              page.value === "project"
                                ? () => setIsDisplayingFeaturedProjects(true)
                                : () => {}
                            }
                            sx={{
                              backgroundColor:
                                currentNavPage === page.value
                                  ? "background.default"
                                  : "transparent",
                              color:
                                currentNavPage === page.value
                                  ? "text.primary"
                                  : "inherit",
                              my: 2,
                              display: "block",
                            }}
                          >
                            {page.title}
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
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
                </Box>

                <NotificationContainer />
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <UserProfilePicture targetUser={auth.user} />
                    </IconButton>
                  </Tooltip>

                  {AccountMenu}
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-nav"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              {NavPagesMenu}
            </Box>
            <Box>
              <IconButton
                size="large"
                aria-label="add new buttons"
                aria-controls="menu-addnew"
                aria-haspopup="true"
                onClick={handleOpenAddNewMenu}
                color="inherit"
              >
                <SvgIcon>
                  <PlusIcon />
                </SvgIcon>
              </IconButton>
              {AddNewMenu}
            </Box>
          </Box>

          <LogoTextCompound
            sx={{ height: 40, mr: 1, display: { xs: "flex", md: "none" } }}
          />
          <NotificationContainer sx={{ display: { xs: "flex", md: "none" } }} />
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <UserProfilePicture targetUser={auth.user} />
              </IconButton>
            </Tooltip>
            {AccountMenu}
          </Box>
        </Toolbar>
      </StyledContainer>
    </AppBar>
  );
}
export default MainHeader;
