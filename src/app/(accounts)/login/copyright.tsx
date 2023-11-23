// Borrowed (mostly) from https://github.com/mui/material-ui/blob/v5.14.18/docs/data/material/getting-started/templates/sign-in/SignIn.tsx

import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/James-wc-Field/Napky">
        Napky
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
