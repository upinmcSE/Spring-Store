import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  ButtonBase,
  Card,
  Container,
  Grid,
  Link,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import L from 'leaflet';
import { useSearchParams } from 'react-router-dom';
import type { MapSpotLocation } from '../../types/location.types';
import type { GearProduct } from '../../types/product.types';
import { locationApi } from '../../services/api/location.api';
import { productApi } from '../../services/api/product.api';
import { contactApi } from '../../services/api/contact.api';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { localizeGear, localizeMapSpots } from '../../i18n/translations';
import { formatVND } from '../../utils/formatters';
import { LASON_COLORS, LASON_FONTS } from '../../theme';

const defaultLeafletIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const GearMapPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { addGearToCart } = useCart();
  const { lang, t } = useLanguage();

  const [rawSpots, setRawSpots] = useState<MapSpotLocation[]>([]);
  const [selectedSpotIndex, setSelectedSpotIndex] = useState<number>(0);
  const [rawGearList, setRawGearList] = useState<GearProduct[]>([]);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactToast, setContactToast] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    locationApi.getMapSpots().then((loadedSpots) => {
      setRawSpots(loadedSpots);
      const spotParam = Number(searchParams.get('spot'));
      if (!Number.isNaN(spotParam) && spotParam >= 0 && spotParam < loadedSpots.length) {
        setSelectedSpotIndex(spotParam);
      }
    });
    productApi.getGear().then(setRawGearList);
  }, [searchParams]);

  const spots = localizeMapSpots(rawSpots, lang);
  const gearList = localizeGear(rawGearList, lang);

  useEffect(() => {
    if (!mapContainerRef.current || spots.length === 0) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView(spots[0].coords, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap • La Sơn Coffee Roastery',
      }).addTo(map);
      mapInstanceRef.current = map;
    }

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = spots.map((spot) => {
      const marker = L.marker(spot.coords, { icon: defaultLeafletIcon })
        .addTo(mapInstanceRef.current!)
        .bindPopup(
          `<strong>${spot.title}</strong><br/>${spot.time}<br/><em>${spot.address}</em>`,
        );
      return marker;
    });

    const targetSpot = spots[selectedSpotIndex] || spots[0];
    mapInstanceRef.current.setView(targetSpot.coords, 14, { animate: true });
    markersRef.current[selectedSpotIndex]?.openPopup();

    setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 150);
  }, [spots, selectedSpotIndex]);

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleSelectSpot = (index: number) => {
    setSelectedSpotIndex(index);
    const spot = spots[index];
    if (spot && mapInstanceRef.current) {
      mapInstanceRef.current.setView(spot.coords, 15, { animate: true });
      markersRef.current[index]?.openPopup();
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);
    try {
      await contactApi.submitContact({
        fullName: fullName.trim(),
        phone: phone.trim(),
        message: message.trim(),
      });
      setContactToast(true);
      setFullName('');
      setPhone('');
      setMessage('');
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack spacing={7}>
        {/* Section 1: Interactive Map + Equal-Height Location Cards */}
        <Paper
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: '20px',
            border: `1px solid ${LASON_COLORS.stoneBorder}`,
            bgcolor: LASON_COLORS.white,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              alignItems: { xs: 'flex-start', lg: 'flex-end' },
              justifyContent: 'space-between',
              gap: 2,
              mb: 3,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: LASON_FONTS.mono,
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: LASON_COLORS.brown,
                }}
              >
                {t.gearMapPage.mapEyebrow}
              </Typography>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: '1.5rem', sm: '1.85rem' }, mt: 0.5 }}
              >
                {t.gearMapPage.mapTitle}
              </Typography>
              <Typography sx={{ fontSize: '0.875rem', color: '#57534E', mt: 0.25 }}>
                {t.gearMapPage.mapSubtitle}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, flexShrink: 0 }}>
              {spots.map((spot, idx) => {
                const isSelected = selectedSpotIndex === idx;
                return (
                  <ButtonBase
                    key={spot.id}
                    onClick={() => handleSelectSpot(idx)}
                    sx={{
                      px: 1.75,
                      height: 36,
                      borderRadius: '10px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      transition: 'all 0.18s ease',
                      bgcolor: isSelected
                        ? LASON_COLORS.brown
                        : spot.spotType === 'truck'
                          ? '#FEF3C7'
                          : '#F5F5F4',
                      color: isSelected
                        ? LASON_COLORS.white
                        : spot.spotType === 'truck'
                          ? '#78350F'
                          : LASON_COLORS.dark,
                      '&:hover': {
                        bgcolor: LASON_COLORS.brown,
                        color: LASON_COLORS.white,
                      },
                    }}
                  >
                    {spot.shortLabel}
                  </ButtonBase>
                );
              })}
            </Box>
          </Box>

          {/* 2-Column Aligned Grid: Map on Left, 3 Equal-Height Cards on Right */}
          <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
            <Grid size={{ xs: 12, lg: 8 }} sx={{ display: 'flex' }}>
              <Box
                ref={mapContainerRef}
                sx={{
                  minHeight: { xs: 340, sm: 400, lg: 432 },
                  height: '100%',
                  width: '100%',
                  borderRadius: '14px',
                  border: `1px solid ${LASON_COLORS.stoneBorder}`,
                  overflow: 'hidden',
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, lg: 4 }} sx={{ display: 'flex' }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateRows: { xs: 'auto', lg: 'repeat(3, 1fr)' },
                  gap: 1.75,
                  width: '100%',
                }}
              >
                {spots.map((spot, idx) => {
                  const active = selectedSpotIndex === idx;
                  return (
                    <Box
                      key={spot.id}
                      onClick={() => handleSelectSpot(idx)}
                      sx={{
                        cursor: 'pointer',
                        p: 2,
                        borderRadius: '14px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        border: active
                          ? `2px solid ${LASON_COLORS.brown}`
                          : `1px solid ${LASON_COLORS.stoneBorder}`,
                        bgcolor: active ? '#FFFBEB' : 'rgba(250, 246, 240, 0.7)',
                        transition: 'all 0.18s ease',
                        '&:hover': {
                          borderColor: LASON_COLORS.brown,
                        },
                      }}
                    >
                      <Typography
                        sx={{ fontWeight: 700, fontSize: '0.86rem', color: LASON_COLORS.dark }}
                      >
                        {spot.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: LASON_FONTS.mono,
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          color: LASON_COLORS.brown,
                          mt: 0.35,
                        }}
                      >
                        {spot.time}
                      </Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: '#57534E', mt: 0.35 }}>
                        {spot.address}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.7rem',
                          color: LASON_COLORS.stoneMuted,
                          fontStyle: 'italic',
                          mt: 0.5,
                        }}
                      >
                        {spot.note}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Section 2: Manual Brewing Gear — Strictly Aligned 4-Column Row */}
        <Box component="section">
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontFamily: LASON_FONTS.mono,
                fontSize: '0.72rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: LASON_COLORS.brown,
              }}
            >
              {t.gearMapPage.gearEyebrow}
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '1.5rem', sm: '1.85rem' }, mt: 0.5 }}
            >
              {t.gearMapPage.gearTitle}
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: '#57534E', mt: 0.25 }}>
              {t.gearMapPage.gearSubtitle}
            </Typography>
          </Box>

          <Grid container spacing={2.5} sx={{ alignItems: 'stretch' }}>
            {gearList.map((gear) => (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={gear.id}>
                <Card
                  sx={{
                    p: 2,
                    height: '100%',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(61, 35, 20, 0.08)',
                    },
                  }}
                >
                  <Box>
                    <Box
                      component="img"
                      src={gear.image}
                      alt={gear.name}
                      sx={{
                        width: '100%',
                        height: 172,
                        objectFit: 'cover',
                        borderRadius: '10px',
                        mb: 1.5,
                        display: 'block',
                      }}
                    />
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: LASON_FONTS.serif,
                        fontSize: '1.02rem',
                        fontWeight: 600,
                        lineHeight: 1.32,
                        color: LASON_COLORS.dark,
                        minHeight: '2.7rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {gear.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.78rem',
                        color: '#57534E',
                        lineHeight: 1.55,
                        mt: 0.75,
                        minHeight: '2.45rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {gear.desc}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      pt: 1.75,
                      mt: 2,
                      borderTop: `1px solid ${LASON_COLORS.stoneBorder}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: LASON_FONTS.mono,
                        fontWeight: 700,
                        color: LASON_COLORS.brown,
                        fontSize: '0.88rem',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {formatVND(gear.price)}
                    </Typography>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => addGearToCart(gear)}
                      sx={{
                        height: 34,
                        bgcolor: '#1C1917',
                        color: LASON_COLORS.white,
                        fontSize: '0.74rem',
                        px: 1.5,
                        whiteSpace: 'nowrap',
                        borderRadius: '8px',
                        '&:hover': { bgcolor: LASON_COLORS.brown },
                      }}
                    >
                      {t.gearMapPage.buyGearBtn}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Section 3: Contact Info & Form */}
        <Paper
          sx={{
            p: { xs: 3, sm: 4.5 },
            borderRadius: '20px',
            bgcolor: 'rgba(239, 230, 216, 0.72)',
            border: `1px solid ${LASON_COLORS.stoneBorder}`,
          }}
        >
          <Grid container spacing={4} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={2}>
                <Typography
                  sx={{
                    fontFamily: LASON_FONTS.mono,
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: LASON_COLORS.brown,
                  }}
                >
                  {t.gearMapPage.contactEyebrow}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontSize: { xs: '1.5rem', sm: '1.85rem' }, color: LASON_COLORS.dark }}
                >
                  {t.gearMapPage.contactTitle}
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: '#57534E', lineHeight: 1.65 }}>
                  {t.gearMapPage.contactDesc}
                </Typography>

                <Stack spacing={1.25} sx={{ fontSize: '0.875rem', pt: 0.5 }}>
                  <Typography variant="body2">
                    📍 <strong>{t.gearMapPage.addressLabel}</strong>{' '}
                    {t.gearMapPage.addressValue}
                  </Typography>
                  <Typography variant="body2">
                    📞 <strong>{t.gearMapPage.hotlineLabel}</strong>{' '}
                    <Link
                      href="https://zalo.me/0386423993"
                      target="_blank"
                      rel="noreferrer"
                      sx={{ color: LASON_COLORS.brown, fontWeight: 700, fontFamily: LASON_FONTS.mono }}
                    >
                      0386 423 993
                    </Link>
                  </Typography>
                  <Typography variant="body2">
                    ✉️ <strong>Email:</strong>{' '}
                    <Link href="mailto:lasonroastery@gmail.com" sx={{ color: LASON_COLORS.dark }}>
                      lasonroastery@gmail.com
                    </Link>
                  </Typography>
                  <Typography variant="body2">
                    🎵 <strong>TikTok:</strong>{' '}
                    <Link
                      href="https://www.tiktok.com/@drthangrangca"
                      target="_blank"
                      rel="noreferrer"
                      sx={{ color: LASON_COLORS.brown, fontWeight: 600 }}
                    >
                      @drthangrangca (DrThắng Rang Cà)
                    </Link>{' '}
                    • <span>@lasoncofferoastery</span>
                  </Typography>
                  <Typography variant="body2">
                    📘 <strong>Facebook:</strong>{' '}
                    <Link
                      href="https://www.facebook.com/lasoncofferoastery"
                      target="_blank"
                      rel="noreferrer"
                      sx={{ color: LASON_COLORS.brown, fontWeight: 600 }}
                    >
                      facebook.com/lasoncofferoastery
                    </Link>
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                component="form"
                onSubmit={handleContactSubmit}
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  bgcolor: LASON_COLORS.white,
                  border: `1px solid ${LASON_COLORS.stoneBorder}`,
                }}
              >
                <Stack spacing={2}>
                  <Typography
                    sx={{
                      fontFamily: LASON_FONTS.serif,
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      color: LASON_COLORS.dark,
                    }}
                  >
                    {t.gearMapPage.formTitle}
                  </Typography>

                  <Grid container spacing={1.5}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        required
                        size="small"
                        placeholder={t.gearMapPage.namePlaceholder}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        required
                        type="tel"
                        size="small"
                        placeholder={t.gearMapPage.phonePlaceholder}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    required
                    multiline
                    rows={3}
                    size="small"
                    placeholder={t.gearMapPage.msgPlaceholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={contactSubmitting}
                    sx={{ height: 42, fontSize: '0.875rem', fontWeight: 600 }}
                  >
                    {contactSubmitting ? t.gearMapPage.submittingBtn : t.gearMapPage.submitBtn}
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Stack>

      <Snackbar
        open={contactToast}
        autoHideDuration={5000}
        onClose={() => setContactToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setContactToast(false)}
          sx={{ borderRadius: 3 }}
        >
          {t.gearMapPage.contactSuccessToast}
        </Alert>
      </Snackbar>
    </Container>
  );
};
