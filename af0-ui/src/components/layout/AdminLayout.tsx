import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  DashboardOutlined as DashboardOutlinedIcon,
  ShoppingBagOutlined as ShoppingBagOutlinedIcon,
  Inventory2Outlined as Inventory2OutlinedIcon,
  MapOutlined as MapOutlinedIcon,
  ForumOutlined as ForumOutlinedIcon,
  OpenInNew as OpenInNewIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { getAdminBasePath } from '../../services/api/httpClient';
import { LASON_COLORS } from '../../theme';

const SIDEBAR_WIDTH = 272;

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const adminBase = getAdminBasePath();

  const menuItems = [
    {
      label: t.admin.navOverview,
      path: adminBase,
      exact: true,
      icon: <DashboardOutlinedIcon fontSize="small" />,
    },
    {
      label: t.admin.navOrders,
      path: `${adminBase}/orders`,
      icon: <ShoppingBagOutlinedIcon fontSize="small" />,
    },
    {
      label: t.admin.navProducts,
      path: `${adminBase}/products`,
      icon: <Inventory2OutlinedIcon fontSize="small" />,
    },
    {
      label: t.admin.navSchedule,
      path: `${adminBase}/schedule`,
      icon: <MapOutlinedIcon fontSize="small" />,
    },
    {
      label: t.admin.navContacts,
      path: `${adminBase}/contacts`,
      icon: <ForumOutlinedIcon fontSize="small" />,
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate(`${adminBase}/login`, { replace: true });
  };

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: LASON_COLORS.dark,
        color: LASON_COLORS.white,
      }}
    >
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <BrandLogo size="sm" lightText onClick={() => navigate(adminBase)} />
        <Chip
          label="ADMIN"
          size="small"
          sx={{
            bgcolor: 'rgba(217, 119, 6, 0.25)',
            color: '#FCD34D',
            fontSize: '0.68rem',
            fontWeight: 800,
          }}
        />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

      <List sx={{ px: 1.5, py: 2, flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = item.exact
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);
          return (
            <ListItemButton
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              sx={{
                borderRadius: '12px',
                mb: 0.75,
                py: 1.2,
                bgcolor: isActive ? LASON_COLORS.brown : 'transparent',
                color: isActive ? LASON_COLORS.white : 'rgba(255,255,255,0.75)',
                '&:hover': {
                  bgcolor: isActive ? LASON_COLORS.brown : 'rgba(255,255,255,0.08)',
                  color: LASON_COLORS.white,
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    sx: { fontSize: '0.875rem', fontWeight: isActive ? 700 : 500 },
                  },
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          size="small"
          startIcon={<OpenInNewIcon fontSize="small" />}
          onClick={() => window.open('/', '_blank')}
          sx={{
            mb: 1.5,
            borderColor: 'rgba(255,255,255,0.25)',
            color: '#FEF3C7',
            '&:hover': { borderColor: '#FEF3C7', bgcolor: 'rgba(255,255,255,0.06)' },
          }}
        >
          Xem Trang Khách Hàng
        </Button>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1.25,
            borderRadius: '12px',
            bgcolor: 'rgba(255,255,255,0.06)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, overflow: 'hidden' }}>
            <Avatar sx={{ width: 34, height: 34, bgcolor: LASON_COLORS.brown, fontSize: '0.875rem', fontWeight: 700 }}>
              {user?.fullName?.charAt(0) || 'A'}
            </Avatar>
            <Box sx={{ overflow: 'hidden' }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {user?.fullName || 'Dr. Thắng'}
              </Typography>
              <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>
                {user?.role || 'OWNER'}
              </Typography>
            </Box>
          </Box>
          <IconButton
            size="small"
            onClick={handleLogout}
            title="Đăng xuất"
            sx={{ color: '#FCA5A5', '&:hover': { bgcolor: 'rgba(248,113,113,0.15)' } }}
          >
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: LASON_COLORS.cream }}>
      {/* Mobile Sidebar */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH, boxSizing: 'border-box', border: 'none' },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Sidebar */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH, boxSizing: 'border-box', border: 'none' },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: 'rgba(250, 246, 240, 0.92)',
            backdropFilter: 'blur(10px)',
            borderBottom: `1px solid ${LASON_COLORS.stoneBorder}`,
            color: LASON_COLORS.dark,
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <IconButton
                edge="start"
                onClick={() => setMobileOpen(true)}
                sx={{ display: { md: 'none' }, color: LASON_COLORS.dark }}
              >
                <MenuIcon />
              </IconButton>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: '0.95rem', sm: '1.1rem' } }}>
                {t.admin.headerTitle}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <LanguageSwitcher />
              <Chip
                label={`URL: ${adminBase}`}
                size="small"
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  bgcolor: LASON_COLORS.sand,
                  color: LASON_COLORS.dark,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              />
            </Box>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ flex: 1, p: { xs: 2, sm: 3, lg: 4 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
