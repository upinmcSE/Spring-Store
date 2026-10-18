import React from 'react';
import {
  Box,
  Button,
  ButtonBase,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PROCESS_METHODS_STORY } from '../../services/mock/mockData';
import { useLanguage } from '../../context/LanguageContext';
import { localizeProcessMethods } from '../../i18n/translations';
import { LASON_COLORS, LASON_FONTS } from '../../theme';

export const StoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const localizedMethods = localizeProcessMethods(PROCESS_METHODS_STORY, lang);

  return (
    <Box>
      {/* Hero Banner */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          bgcolor: LASON_COLORS.dark,
          color: LASON_COLORS.white,
          py: { xs: 8, lg: 12 },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.25,
            backgroundImage: 'radial-gradient(#D97706 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={5} sx={{ alignItems: 'center' }}>
            {/* Left Hero Column */}
            <Grid size={{ xs: 12, lg: 7 }}>
              <Stack spacing={3}>
                <Box>
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      bgcolor: 'rgba(245, 158, 11, 0.2)',
                      border: '1px solid rgba(251, 191, 36, 0.3)',
                      color: '#FDE68A',
                      px: 2,
                      py: 0.75,
                      borderRadius: '999px',
                      fontFamily: LASON_FONTS.mono,
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {t.storyPage.heroBadge}
                  </Box>
                </Box>

                <Typography
                  variant="h1"
                  sx={{
                    fontFamily: LASON_FONTS.serif,
                    fontSize: { xs: '2.25rem', sm: '3rem', lg: '3.6rem' },
                    fontWeight: 600,
                    lineHeight: 1.15,
                    color: LASON_COLORS.white,
                  }}
                >
                  {t.storyPage.heroTitlePrefix}{' '}
                  <Box component="span" sx={{ color: '#FBBF24', fontStyle: 'italic' }}>
                    {t.storyPage.heroTitleHighlight}
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    color: '#D6D3D1',
                    fontSize: { xs: '0.95rem', sm: '1.1rem' },
                    lineHeight: 1.7,
                    maxWidth: 640,
                  }}
                >
                  {t.storyPage.heroDesc}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: LASON_FONTS.serif,
                    fontStyle: 'italic',
                    fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    color: '#FCD34D',
                  }}
                >
                  {t.storyPage.heroQuote}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, pt: 1 }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/beans')}
                    sx={{
                      height: 46,
                      bgcolor: LASON_COLORS.brown,
                      color: LASON_COLORS.white,
                      px: 3,
                      borderRadius: '999px',
                      fontSize: '0.9rem',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.28)',
                      '&:hover': { bgcolor: '#B45309' },
                    }}
                  >
                    {t.storyPage.ctaBeans}
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => navigate('/gear-map')}
                    sx={{
                      height: 46,
                      bgcolor: 'rgba(255,255,255,0.08)',
                      borderColor: 'rgba(255,255,255,0.25)',
                      color: LASON_COLORS.white,
                      px: 2.75,
                      borderRadius: '999px',
                      fontSize: '0.9rem',
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.18)',
                        borderColor: 'rgba(255,255,255,0.4)',
                      },
                    }}
                  >
                    {t.storyPage.ctaMap}
                  </Button>
                </Box>
              </Stack>
            </Grid>

            {/* Right Summary Card */}
            <Grid size={{ xs: 12, lg: 5 }}>
              <Paper
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  borderRadius: '24px',
                  p: { xs: 3, sm: 4 },
                  color: LASON_COLORS.white,
                }}
              >
                <Stack spacing={3}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      borderBottom: '1px solid rgba(255,255,255,0.15)',
                      pb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '16px',
                        bgcolor: LASON_COLORS.brown,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: LASON_FONTS.serif,
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        color: LASON_COLORS.white,
                        flexShrink: 0,
                      }}
                    >
                      Ls&apos;
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: LASON_FONTS.serif,
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: LASON_COLORS.white,
                        }}
                      >
                        La Sơn Coffee Roastery
                      </Typography>
                      <Typography sx={{ fontSize: '0.78rem', color: '#FDE68A' }}>
                        {t.storyPage.cardAddress}
                      </Typography>
                    </Box>
                  </Box>

                  <Stack spacing={1.5} sx={{ fontSize: '0.875rem', color: '#E7E5E4' }}>
                    <Typography variant="body2" sx={{ color: '#E7E5E4', lineHeight: 1.65 }}>
                      🩺 <strong>{t.storyPage.cardPoint1Title}</strong> {t.storyPage.cardPoint1Body}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#E7E5E4', lineHeight: 1.65 }}>
                      🐶🐱 <strong>{t.storyPage.cardPoint2Title}</strong>{' '}
                      {t.storyPage.cardPoint2Body}
                    </Typography>
                  </Stack>

                  <Box
                    sx={{
                      bgcolor: 'rgba(28, 25, 23, 0.72)',
                      borderRadius: '16px',
                      p: 2,
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: LASON_FONTS.mono,
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#FBBF24',
                        mb: 1,
                      }}
                    >
                      {t.storyPage.scheduleBoxTitle}
                    </Typography>
                    <Stack spacing={1} sx={{ fontSize: '0.78rem' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                        <span>
                          <strong>{t.storyPage.scheduleShopLabel}</strong>
                        </span>
                        <span>{t.storyPage.scheduleShopVal}</span>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: 1,
                          color: '#FCD34D',
                        }}
                      >
                        <span>
                          <strong>{t.storyPage.scheduleSatLabel}</strong>
                        </span>
                        <span>{t.storyPage.scheduleSatVal}</span>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: 1,
                          color: '#FCD34D',
                        }}
                      >
                        <span>
                          <strong>{t.storyPage.scheduleSunLabel}</strong>
                        </span>
                        <span>{t.storyPage.scheduleSunVal}</span>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Detailed Vet Roaster Story & 3 Processing Methods */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Stack spacing={8}>
          <Paper
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: '24px',
              border: `1px solid ${LASON_COLORS.stoneBorder}`,
              bgcolor: LASON_COLORS.white,
            }}
          >
            <Grid container spacing={5} sx={{ alignItems: 'center' }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={2}>
                  <Typography
                    sx={{
                      fontFamily: LASON_FONTS.mono,
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: LASON_COLORS.brown,
                    }}
                  >
                    {t.storyPage.brandStoryEyebrow}
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: '1.75rem', sm: '2rem' },
                      color: LASON_COLORS.dark,
                    }}
                  >
                    {t.storyPage.brandStoryTitle}
                  </Typography>
                  <Typography sx={{ color: '#57534E', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    {t.storyPage.brandStoryP1}
                  </Typography>
                  <Typography sx={{ color: '#57534E', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    {t.storyPage.brandStoryP2}
                  </Typography>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    bgcolor: LASON_COLORS.cream,
                    p: 3,
                    borderRadius: '16px',
                    border: `1px solid ${LASON_COLORS.stoneBorder}`,
                  }}
                >
                  <Stack spacing={2} divider={<Divider />}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Typography sx={{ fontSize: '1.5rem' }}>🔬</Typography>
                      <Box>
                        <Typography sx={{ fontWeight: 700, color: LASON_COLORS.dark }}>
                          {t.storyPage.pillar1Title}
                        </Typography>
                        <Typography sx={{ fontSize: '0.85rem', color: '#57534E', mt: 0.5 }}>
                          {t.storyPage.pillar1Desc}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Typography sx={{ fontSize: '1.5rem' }}>🐾</Typography>
                      <Box>
                        <Typography sx={{ fontWeight: 700, color: LASON_COLORS.dark }}>
                          {t.storyPage.pillar2Title}
                        </Typography>
                        <Typography sx={{ fontSize: '0.85rem', color: '#57534E', mt: 0.5 }}>
                          {t.storyPage.pillar2Desc}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Typography sx={{ fontSize: '1.5rem' }}>🚐</Typography>
                      <Box>
                        <Typography sx={{ fontWeight: 700, color: LASON_COLORS.dark }}>
                          {t.storyPage.pillar3Title}
                        </Typography>
                        <Typography sx={{ fontSize: '0.85rem', color: '#57534E', mt: 0.5 }}>
                          {t.storyPage.pillar3Desc}
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* 3 Processing Methods */}
          <Box>
            <Box sx={{ textAlign: 'center', maxWidth: 680, mx: 'auto', mb: 4 }}>
              <Typography
                sx={{
                  fontFamily: LASON_FONTS.mono,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: LASON_COLORS.brown,
                }}
              >
                {t.storyPage.processEyebrow}
              </Typography>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: '1.75rem', sm: '2rem' }, mt: 0.5 }}
              >
                {t.storyPage.processTitle}
              </Typography>
              <Typography sx={{ fontSize: '0.9rem', color: '#57534E', mt: 1 }}>
                {t.storyPage.processSubtitle}
              </Typography>
            </Box>

            <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
              {localizedMethods.map((method) => (
                <Grid size={{ xs: 12, md: 4 }} key={method.id} sx={{ display: 'flex' }}>
                  <Paper
                    sx={{
                      p: 3,
                      width: '100%',
                      borderRadius: '18px',
                      border: `1px solid ${LASON_COLORS.stoneBorder}`,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Box
                        component="span"
                        sx={{
                          display: 'inline-block',
                          bgcolor: method.badgeBgColor,
                          color: method.badgeTextColor,
                          fontFamily: LASON_FONTS.mono,
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '6px',
                          mb: 1.5,
                        }}
                      >
                        {method.stepBadge}
                      </Box>

                      <Typography
                        variant="h3"
                        sx={{ fontSize: '1.25rem', color: LASON_COLORS.dark }}
                      >
                        {method.representativeName}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: '0.875rem',
                          color: '#57534E',
                          mt: 1,
                          lineHeight: 1.65,
                        }}
                      >
                        {method.description}
                      </Typography>
                    </Box>

                    <Box sx={{ pt: 2.5, mt: 2.5, borderTop: `1px solid ${LASON_COLORS.stoneBorder}` }}>
                      <ButtonBase
                        onClick={() => navigate('/beans')}
                        sx={{
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          color: LASON_COLORS.brown,
                          '&:hover': { textDecoration: 'underline' },
                        }}
                      >
                        {method.ctaText}
                      </ButtonBase>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
