import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import type { MapSpotLocation, WeekendAnnouncement } from '../../../types/location.types';
import { locationApi } from '../../../services/api/location.api';
import { LASON_COLORS, LASON_FONTS } from '../../../theme';

export const AdminSchedulePage: React.FC = () => {
  const [announcement, setAnnouncement] = useState<WeekendAnnouncement | null>(null);
  const [spots, setSpots] = useState<MapSpotLocation[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    locationApi.getWeekendAnnouncement().then(setAnnouncement);
    locationApi.getMapSpots().then(setSpots);
  }, []);

  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcement) return;
    await locationApi.updateAnnouncementAdmin(announcement);
    setToastMsg('Đã cập nhật Thanh thông báo lịch Xe Lưu Động đầu trang!');
  };

  const handleSpotFieldChange = (
    idx: number,
    field: keyof MapSpotLocation,
    val: string,
  ) => {
    setSpots((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, [field]: val } : s)),
    );
  };

  const handleSaveSpot = async (spot: MapSpotLocation) => {
    await locationApi.updateMapSpotAdmin(spot);
    setToastMsg(`Đã lưu thông tin địa điểm: ${spot.title}`);
  };

  return (
    <Stack spacing={4}>
      <Box>
        <Typography
          variant="h3"
          sx={{ fontFamily: LASON_FONTS.serif, fontSize: { xs: '1.5rem', sm: '1.85rem' } }}
        >
          Quản Lý Lịch Trình &amp; Tọa Độ Xe Cà Phê Lưu Động
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', color: LASON_COLORS.stoneMuted }}>
          Cập nhật địa điểm đỗ xe Thứ 7 &amp; Chủ Nhật hằng tuần. Thay đổi sẽ hiển thị ngay trên
          Top Bar và Bản Đồ của khách hàng.
        </Typography>
      </Box>

      {/* Top Announcement Bar Editor */}
      {announcement && (
        <Paper
          component="form"
          onSubmit={handleSaveAnnouncement}
          sx={{ p: 3, borderRadius: '20px', border: `1px solid ${LASON_COLORS.stoneBorder}` }}
        >
          <Stack spacing={2.5}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ fontFamily: LASON_FONTS.serif, fontSize: '1.2rem', fontWeight: 700 }}>
                1. Thanh Thông Báo Đầu Trang (Top Announcement Bar)
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={announcement.isActive}
                    onChange={(e) =>
                      setAnnouncement({ ...announcement, isActive: e.target.checked })
                    }
                  />
                }
                label="Hiển thị trên đầu trang"
              />
            </Box>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Nhãn huy hiệu"
                  fullWidth
                  size="small"
                  value={announcement.badgeText}
                  onChange={(e) =>
                    setAnnouncement({ ...announcement, badgeText: e.target.value })
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Lịch Thứ 7"
                  fullWidth
                  size="small"
                  value={announcement.saturdaySchedule}
                  onChange={(e) =>
                    setAnnouncement({ ...announcement, saturdaySchedule: e.target.value })
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Lịch Chủ Nhật"
                  fullWidth
                  size="small"
                  value={announcement.sundaySchedule}
                  onChange={(e) =>
                    setAnnouncement({ ...announcement, sundaySchedule: e.target.value })
                  }
                />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" variant="contained">
                Lưu Thanh Thông Báo
              </Button>
            </Box>
          </Stack>
        </Paper>
      )}

      {/* Map Spots Editor */}
      <Stack spacing={2.5}>
        <Typography sx={{ fontFamily: LASON_FONTS.serif, fontSize: '1.2rem', fontWeight: 700 }}>
          2. Các Điểm Đỗ Trên Bản Đồ Tương Tác Mộc Châu - Sơn La
        </Typography>

        <Grid container spacing={3}>
          {spots.map((spot, idx) => (
            <Grid size={{ xs: 12, md: 4 }} key={spot.id}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: '20px',
                  border: `1px solid ${LASON_COLORS.stoneBorder}`,
                  height: '100%',
                }}
              >
                <Stack spacing={2}>
                  <Typography sx={{ fontWeight: 700, color: LASON_COLORS.brown }}>
                    {spot.title}
                  </Typography>
                  <TextField
                    label="Khung giờ hoạt động"
                    fullWidth
                    size="small"
                    value={spot.time}
                    onChange={(e) => handleSpotFieldChange(idx, 'time', e.target.value)}
                  />
                  <TextField
                    label="Địa chỉ chi tiết"
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                    value={spot.address}
                    onChange={(e) => handleSpotFieldChange(idx, 'address', e.target.value)}
                  />
                  <TextField
                    label="Ghi chú trải nghiệm"
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                    value={spot.note}
                    onChange={(e) => handleSpotFieldChange(idx, 'note', e.target.value)}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => handleSaveSpot(spot)}
                    sx={{ borderColor: LASON_COLORS.brown, color: LASON_COLORS.brown }}
                  >
                    Cập Nhật Điểm Này
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Stack>

      <Snackbar
        open={Boolean(toastMsg)}
        autoHideDuration={3500}
        onClose={() => setToastMsg(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setToastMsg(null)}>
          {toastMsg}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

