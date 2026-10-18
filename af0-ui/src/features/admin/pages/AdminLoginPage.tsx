import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { Navigate, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../../../components/common/BrandLogo';
import { useAuth } from '../../../context/AuthContext';
import { getAdminBasePath, isMockApiEnabled } from '../../../services/api/httpClient';
import { LASON_COLORS, LASON_FONTS } from '../../../theme';

export const AdminLoginPage: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const adminBase = getAdminBasePath();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('lason2026');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (isAuthenticated) {
    return <Navigate to={adminBase} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);
    try {
      await login({ username, password });
      navigate(adminBase, { replace: true });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Đăng nhập thất bại.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: LASON_COLORS.dark,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.2,
          backgroundImage: 'radial-gradient(#D97706 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 2 }}>
        <Paper
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: '24px',
            bgcolor: LASON_COLORS.cream,
            border: `1px solid ${LASON_COLORS.stoneBorder}`,
            boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
          }}
        >
          <Stack spacing={2.5}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <BrandLogo />
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.75,
                  bgcolor: '#FEF3C7',
                  color: '#92400E',
                  px: 1.5,
                  py: 0.4,
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                <LockOutlinedIcon sx={{ fontSize: 14 }} />
                CỔNG QUẢN TRỊ NỘI BỘ
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: LASON_FONTS.serif,
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: LASON_COLORS.dark,
                }}
              >
                Đăng Nhập Quản Lý Cửa Hàng
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', color: LASON_COLORS.stoneMuted, mt: 0.5 }}>
                Khu vực dành riêng cho Dr. Thắng &amp; Quản trị viên La Sơn Coffee Roastery
              </Typography>
            </Box>

            {errorMsg && (
              <Alert severity="error" sx={{ borderRadius: 2 }}>
                {errorMsg}
              </Alert>
            )}

            {isMockApiEnabled() && (
              <Alert severity="info" sx={{ borderRadius: 2, fontSize: '0.78rem' }}>
                <strong>Chế độ Demo:</strong> Tài khoản <code>admin</code> / Mật khẩu{' '}
                <code>lason2026</code>
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <Box>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, mb: 0.5 }}>
                    Tên đăng nhập hoặc Email *
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    size="small"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                  />
                </Box>

                <Box>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, mb: 0.5 }}>
                    Mật khẩu *
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    type="password"
                    size="small"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={submitting}
                  sx={{ py: 1.4, fontSize: '0.9rem', fontWeight: 700 }}
                >
                  {submitting ? 'Đang xác thực...' : 'Đăng Nhập Dashboard →'}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};
