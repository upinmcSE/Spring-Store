import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLanguage } from '../../context/LanguageContext';
import { LASON_COLORS, LASON_FONTS } from '../../theme';

interface BrandLogoProps {
  onClick?: () => void;
  size?: 'sm' | 'md';
  lightText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  onClick,
  size = 'md',
  lightText = false,
}) => {
  const { t } = useLanguage();
  const boxSize = size === 'sm' ? 36 : 44;

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.5,
        cursor: onClick ? 'pointer' : 'default',
        textAlign: 'left',
        userSelect: 'none',
        flexShrink: 0,
        '&:hover .logo-badge': {
          transform: onClick ? 'scale(1.04)' : 'none',
        },
      }}
    >
      <Box
        className="logo-badge"
        sx={{
          width: boxSize,
          height: boxSize,
          borderRadius: '10px',
          bgcolor: LASON_COLORS.brown,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(61, 35, 20, 0.16)',
          transition: 'transform 0.2s ease',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <svg viewBox="0 0 100 100" style={{ width: boxSize - 4, height: boxSize - 4 }}>
          <rect width="100" height="100" fill={LASON_COLORS.brown} />
          <path
            d="M26 14 C28 14, 31 15, 31 19 L28 60 C32 59, 36 60, 39 62 L38 64 C32 61, 25 61, 19 64 L18 61 C20 60, 22 60, 23 59 L25 18 C25 15, 25 14, 26 14 Z"
            fill="#FFFFFF"
          />
          <path
            d="M62 46 L48 46 C40 46, 35 51, 35 59 C35 67, 40 71, 49 71 L53 71 C55 71, 56 72, 56 74 C56 76, 55 77, 52 77 L36 77 L36 87 L53 87 C62 87, 67 82, 67 73 C67 65, 62 61, 53 61 L49 61 C47 61, 46 60, 46 58 C46 56, 47 55, 50 55 L62 55 Z"
            fill="#FFFFFF"
          />
          <path
            d="M72 36 L81 36 C83 36, 83 44, 81 49 C79 53, 75 56, 72 56 L71 51 C74 50, 76 48, 76 45 L72 45 Z"
            fill="#FFFFFF"
          />
        </svg>
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontFamily: LASON_FONTS.serif,
            fontSize: size === 'sm' ? '1.05rem' : { xs: '1.15rem', sm: '1.35rem' },
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            whiteSpace: 'nowrap',
            color: lightText ? LASON_COLORS.white : LASON_COLORS.dark,
          }}
        >
          LASONCOFFEE
        </Typography>
        <Typography
          sx={{
            fontSize: '0.72rem',
            fontWeight: 500,
            lineHeight: 1.3,
            whiteSpace: 'nowrap',
            color: lightText ? 'rgba(255,255,255,0.72)' : LASON_COLORS.stoneMuted,
          }}
        >
          {t.brand.subtitle}
        </Typography>
      </Box>
    </Box>
  );
};
