import React, { useEffect, useState } from 'react';
import {
  Box,
  Chip,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import type { ContactRecord, ContactStatus } from '../../../types/order.types';
import { contactApi } from '../../../services/api/contact.api';
import { formatDateTimeVN } from '../../../utils/formatters';
import { LASON_COLORS, LASON_FONTS } from '../../../theme';

const CONTACT_STATUS_LABELS: Record<
  ContactStatus,
  { label: string; color: 'warning' | 'info' | 'success' }
> = {
  NEW: { label: 'Mới nhận', color: 'warning' },
  CONTACTED: { label: 'Đã liên hệ Zalo', color: 'info' },
  RESOLVED: { label: 'Đã giải quyết', color: 'success' },
};

export const AdminContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<ContactRecord[]>([]);

  const loadContacts = () => {
    contactApi.getContactsAdmin().then(setContacts);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleStatusChange = async (id: string, status: ContactStatus) => {
    await contactApi.updateContactStatusAdmin(id, status);
    loadContacts();
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography
          variant="h3"
          sx={{ fontFamily: LASON_FONTS.serif, fontSize: { xs: '1.5rem', sm: '1.85rem' } }}
        >
          Lời Nhắn Tư Vấn &amp; Đặt Lịch Giao Lưu
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', color: LASON_COLORS.stoneMuted }}>
          Danh sách khách hàng gửi câu hỏi tư vấn hạt cà phê, hỏi mua sỉ hoặc đặt lịch giao lưu cùng
          Dr. Thắng.
        </Typography>
      </Box>

      <Paper sx={{ borderRadius: '20px', border: `1px solid ${LASON_COLORS.stoneBorder}`, overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Khách Hàng</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Số Điện Thoại / Zalo</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Nội Dung Lời Nhắn</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Thời Gian Gửi</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Trạng Thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((c) => {
                const cfg = CONTACT_STATUS_LABELS[c.status];
                return (
                  <TableRow key={c.id} hover>
                    <TableCell sx={{ fontWeight: 700 }}>{c.fullName}</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: LASON_COLORS.brown }}>
                      📞 {c.phone}
                    </TableCell>
                    <TableCell sx={{ maxWidth: 420, fontSize: '0.85rem' }}>{c.message}</TableCell>
                    <TableCell sx={{ fontSize: '0.78rem', color: LASON_COLORS.stoneMuted }}>
                      {formatDateTimeVN(c.createdAt)}
                    </TableCell>
                    <TableCell>
                      <FormControl size="small" sx={{ minWidth: 155 }}>
                        <Select
                          value={c.status}
                          onChange={(e) =>
                            handleStatusChange(c.id, e.target.value as ContactStatus)
                          }
                          sx={{ fontSize: '0.78rem', fontWeight: 600 }}
                        >
                          {Object.entries(CONTACT_STATUS_LABELS).map(([k, v]) => (
                            <MenuItem key={k} value={k} sx={{ fontSize: '0.78rem' }}>
                              {v.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Box sx={{ mt: 0.5 }}>
                        <Chip label={cfg.label} color={cfg.color} size="small" />
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  );
};

