import React from 'react';
import { Box, ButtonBase } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';
import { LASON_COLORS, LASON_FONTS } from '../../theme';

interface LanguageSwitcherProps {
  variant?: 'light' | 'dark';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'light',
}) => {
  const { lang, setLang } = useLanguage();
  const isDark = variant === 'dark';

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        p: 0.4,
        borderRadius: '999px',
        bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(231, 229, 228, 0.75)',
        border: isDark
          ? '1px solid rgba(255,255,255,0.18)'
          : `1px solid ${LASON_COLORS.stoneBorder}`,
      }}
    >
      {(['vi', 'en'] as const).map((code) => {
        const active = lang === code;
        return (
          <ButtonBase
            key={code}
            onClick={() => setLang(code)}
            sx={{
              px: 1.15,
              py: 0.45,
              borderRadius: '999px',
              fontFamily: LASON_FONTS.mono,
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              transition: 'all 0.18s ease',
              bgcolor: active ? LASON_COLORS.brown : 'transparent',
              color: active
                ? LASON_COLORS.white
                : isDark
                  ? 'rgba(255,255,255,0.75)'
                  : LASON_COLORS.dark,
            }}
          >
            {code.toUpperCase()}
          </ButtonBase>
        );
      })}
    </Box>
  );
};

