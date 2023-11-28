import QuestionMark from '@mui/icons-material/QuestionMark';
import {
  Typography, Container, Box, Grid,
  Button, Avatar, CssBaseline, TextField
} from '@mui/material';

import Link from 'next/link';

import Copyright from '@/app/components/Copyright'

export default function Page() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <QuestionMark />
        </Avatar>
        <Typography variant="h5">
          Reset Password
        </Typography>
        {/* Create horizontal space then text to tell user what to do */}
        <Box sx={{ mt: 3, width: '100%', alignItems: 'center' }}>
          <Typography variant="body2">
            Enter your email address and we will send you a link to reset your password.
          </Typography>
        </Box>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Email me
          </Button>

        <Grid container justifyContent="center">
          <Grid item>
          <Link href="/signin">
            Back to Login
          </Link>
          </Grid>
        </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}