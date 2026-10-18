import React, { useEffect, useState } from 'react';
import { Box, ButtonBase, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { WeekendAnnouncement } from '../../types/location.types';
import { locationApi } from '../../services/api/location.api';
import { useLanguage } from '../../context/LanguageContext';
import { localizeAnnouncement } from '../../i18n/translations';
import { LASON_COLORS } from '../../theme';

export const TopAnnouncementBar: React.FC = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const [rawAnnouncement, setRawAnnouncement] = useState<WeekendAnnouncement | null>(null);

  useEffect(() => {
    locationApi.getWeekendAnnouncement().then(setRawAnnouncement).catch(() => null);
  }, []);

  if (!rawAnnouncement || !rawAnnouncement.isActive) {
    return null;
  }

  const announcement = localizeAnnouncement(rawAnnouncement, lang);

  return (
    <Box
      sx={{
        bgcolor: LASON_COLORS.dark,
        color: '#FEF3C7',
        py: 1.1,
        px: 2,
        textAlign: 'center',
        borderBottom: '1px solid rgba(120, 53, 15, 0.4)',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        <Box
          component="span"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            bgcolor: LASON_COLORS.brown,
            color: LASON_COLORS.white,
            px: 1.5,
            py: 0.35,
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}
        >
          {announcement.badgeText}
        </Box>

        <Typography
          component="span"
          sx={{
            fontSize: { xs: '0.75rem', sm: '0.85rem' },
            fontWeight: 500,
          }}
        >
          {t.announcement.saturdayPrefix} <strong>{announcement.saturdaySchedule}</strong> •{' '}
          {t.announcement.sundayPrefix} <strong>{announcement.sundaySchedule}</strong>
        </Typography>

        <ButtonBase
          onClick={() => navigate('/gear-map?spot=1')}
          sx={{
            fontSize: { xs: '0.75rem', sm: '0.85rem' },
            fontWeight: 700,
            color: '#FCD34D',
            textDecoration: 'underline',
            ml: 0.5,
            '&:hover': {
              color: LASON_COLORS.white,
            },
          }}
        >
          {announcement.ctaLabel}
        </ButtonBase>
      </Container>
    </Box>
  );
};
